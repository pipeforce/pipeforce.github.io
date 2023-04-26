# Async & Polling

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 9.0</p>

By default, commands are executed in sync mode. This means if the command is executed and once it has finished its task, it returns the result to the caller.

Even if this approach is easy to understand and to use, it has some drawbacks:

 - Long running tasks could timeout (so no return to caller)
 - No parallel execution = lower performance 

Since version `9.0` of PIPEFORCE, these new features have been introduced in order to support the async execution of commands:

 - Optional command parameter `wait` in order to wait for an async command to be finished.
 - You can now list, get, complete and cancel async tasks remotely via command endpoints.
 - Long-polling support in order to poll for an async task to be finished

With this you can start an async task and come back later in order to poll for its finished state and to fetch the computation result:

![](../../img/async-polling-sequence.png)

## Start a command async

See the commands documentation in order to find out, which commands support async execution. Commands which support async execution will be executed in async by default. So no special configuration required.

:::note
In case the caller needs to wait for the result of a command in a synchronous way even if the command is by default executed async, you can use the parameter `wait: true` in order to block the command until the result is available. But note: For long running tasks, this could lead to an HTTP gateway timeout in case calculation of the result takes too long.
:::

When a command runs in async mode, it will create an async task, register this task in the backend and will immediately return with a `correlationId` which is a reference to this async task. The response of such an async command call could look like this example:

```json
{
    "correlationId": "254d7d80-4530-431a-a0cc-c606e8faa406",
    "status": "running",
    "statusCode": 200,
    "created": 1682349730659
}
```

 Async tasks can be listed, fetched, completed or cancelled using the `correlationId` and one of the appropriate commands, explained as follows.

## Polling async task: `async.fetch`

Once an async task has been started, it can be polled in intervalls to check if it has been finished and to return its computation result. This concept is also called long-polling.

For this, you can use the command `async.fetch` with the `correlationId` as parameter and call it in intervals. Example:

```yaml
pipeline:
  - async.fetch:
      correlationId: 254d7d80-4530-431a-a0cc-c606e8faa406
```

This command will behave like this:

### Async task not finished

If the async task is not finished yet (still in `running` state) it will return the HTTP status code `204` (No Content) and in the body, a result JSON will be placed with the `statusCode` attribute set to `204`. Example response body:

```json
{
  "correlationId": "96ce80ba-c43c-48f3-b772-a3bd822634d3",
  "status": "running",
  "statusCode": 204,
  "statusMessage": "No Content",
  "created": 1682438759158
}
```

### Async task finished

If the async task is finished, the computation value of the task will be returned with a HTTP status code 200. Example response body:

```json
{
  "correlationId": "96ce80ba-c43c-48f3-b772-a3bd822634d3",
  "status": "finished",
  "statusCode": 200,
  "value": "someAsyncComputationResult",
  "created": 1682438759158
}
```

### Async task already fetched

In case the result of an async task was already fetched by a previous call of `async.fetch`, the HTTP status code `404` (Not Found) will be returned in header and in the attribute `statusCode` of result JSON. Example response body:

```json
{
  "correlationId": "96ce80ba-c43c-48f3-b772-a3bd822634d3",
  "statusCode": 404,
  "statusMessage": "Not Found",
  "created": 1682438759158
}
```

### Polling frequency

:::caution
The first polling call using `async.fetch` can be executed immediately after starting the task. The time between any subsequet polling calls must be >= 2 seconds. If called in intervals < 2 seconds a punishment time of 2 seconds will be added for each call up to 10 minutes. This means after the task has been finished, it will wait this additional time before it returns. 
:::

## Complete a task

Sometimes an async task must be completed from external since the result could be provided earlier or the design is like this that the compution takes place externally (by a microservice for example).

For this, you you have to options: 

### Via command `async.complete`

You can complete a running async task by calling the command `async.complete` with the `correlationId`. Example:

```yaml:
pipeline:
  - async.complete:
      correlationId: 254d7d80-4530-431a-a0cc-c606e8faa406
      input: "theResultValueOfTheTask"
```

You can optionally specify the result value to be returned to the caller / poller of the task using the `input` parameter or by placing it at the body of the pipeline.

Once the command `async.complete` was called, the async task will change its state to `finished` and the given result will be set as the computation result. The next polling call of `async.fetch` will return this result value and finally removes the async task from the backend queue.

:::info
Calling `async.complete` several times for the same `correlationId` has no effect since only the first caller wins. Any subsequent such calls will simply be ignored (bot no error is thrown).
:::

### Via message `async.complete.id`

Another option to complete an async task is by sending a message to the PIPEFORCE default exchange `pipeforce.default.topic` with a routing key of this format:

```
async.complete.<CORRELATION_ID>
```
Whereas `<CORRELATION_ID>` must be replaced by the correlation id from the async response.

This is especially handy in case you have a microservice which is working mainly in async mode.

The body of the message will be used as the response value to the async call.

Once the message `async.complete.<CORRELATION_ID>` was send, the async task will change its state to `finished` and the given message body will be set as the computation result. The next polling call of `async.fetch` will return this result value and finally removes the async task from the backend queue.

:::info
Sending the message  `async.complete.<CORRELATION_ID>` several times for the same `correlationId` has no effect since only the first message wins. Any subsequent such message will simply be ignored (bot no error is thrown).
:::

## Cancel a task

In case an async task must be cancelled, you also have two options:

### Via command `async.cancel`

You can use the command `async.cancel` together with the `correlationId` of the task:

```yaml
pipeline:
  - async.cancel:
      correlationId: 254d7d80-4530-431a-a0cc-c606e8faa406
```

This will immediately remove the async task from the backend queue. Any subsequent call of `async.fetch` will result in a `404` (Not found).

:::info
Calling `async.cancel` several times for the same `correlationId` has no effect since only the first caller wins. Any subsequent such calls will simply be ignored (bot no error is thrown).
:::

### Via message `async.cancel.id`

Similar to completing an async task, another option to cancel an async task is by sending a message to the PIPEFORCE default exchange `pipeforce.default.topic` with a routing key of this format:

```
async.cancel.<CORRELATION_ID>
```
Whereas `<CORRELATION_ID>` must be replaced by the correlation id from the async response.

This is especially handy in case you have a microservice which is working mainly in async mode.

The body of the message will be used as the response value to the async call and must be a character array.

This will immediately remove the async task from the backend queue. Any subsequent call of `async.fetch` will result in a `404` (Not found).

:::info
Sending the message  `async.cancel.<CORRELATION_ID>` several times for the same `correlationId` has no effect since only the first message wins. Any subsequent such message will simply be ignored (bot no error is thrown).
:::

## Listing async tasks: `async.list`

In order to list all active async tasks registered in the backend queue, you can use the command `async.list`. Example:
```yaml
pipeline:
  - async.list
```

This command will return you a JSON array with information about all async tasks in `running` or `finished` state. Here is an example:

```json
[
    {
        "correlationId": "254d7d80-4530-431a-a0cc-c606e8faa406",
        "status": "running",
        "statusCode": 200,
        "created": 1682349730659
    },
    {
        "correlationId": "a5dd7d81-3520-791a-c3fc-a706e8faa000",
        "status": "finished",
        "statusCode": 200,
        "created": 16823497312345
    }
]
```

If a task is in `running` state, this means it is still executing or it has been finished but no result has been set so far. So it is not ready to be fetched. 

If a task is in state `finished` it means its execution has been finished **and** the final result has been provided, but the result was not fetched so far.

Once the result of an async task has been fetched (returned) by the caller, the async task will be removed from this list.

:::caution
Do not use this listing of tasks for polling since this is not optimized for this. Calling the command `async.list` too high-frequently will result in a blocking by the backend for some minutes. Use the command `async.fetch` for polling instead. 
:::

## Async task timeout (experimental)

Once an async task has been started, it will by default run a certain amount of time before it will be automatically cancelled, assuming the task cannot be finished and/or the caller has died and therefore cannot fetch it. The concrete timout after an async task will be cancelled depends on the command or user context it is being used in.

In order to avoid a timeout and to prolong the max. execution time, you have to send a "keep alive ping" every minute to the backend in order to signal that there is still interest in the result. This way the async task will not be cancelled in case it still is not finished after the timeout. Example:

```yaml
pipeline:
  - async.ping: 
      correlationId: 254d7d80-4530-431a-a0cc-c606e8faa406
```

 How much an async task can be kept alive overall using this ping approach also depends on the command and your user context. So refer to the documentation of the command or context you would like to use.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::