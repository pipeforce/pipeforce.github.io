# Error Handling

In case an error occurs during execution of a command, the execution of the command and/or the according pipeline stops by default and an error message is sent back to the caller. You have different options to adjust this default behaviour.

## Stop (default)

If you would like to stop execuction of the command and/or the pipeline in case an error occurs, you need to set the `action` of the pipeline header `onError` to `THROW`. In this case, the full stacktrace message about the error will be logged and after this, the execution of the command and/or the pipeline will stop. 

:::info Default
In case the optional header/parameter `onError` is missing, `THROW` is used as the default behaviour.
:::

Here is an example to set this header in a pipeline:

```yaml
headers:
  onError: {"action": "THROW"}

pipeline:
  command.a:
    paramA: valueA
  command.b:
    paramB: valueB
```

You can also use the short form like this:

```yaml
headers:
  onError: "THROW"

pipeline:
  command.a:
    paramA: valueA
  command.b:
    paramB: valueB
```

You can specify this also as parameter per command:

```yaml
pipeline:
  command.a:
    paramA: valueA
    onError: {"action": "THROW"}
  command.b:
    paramB: valueB
```

Or in short:

```yaml
pipeline:
  command.a:
    paramA: valueA
    onError: "THROW"
  command.b:
    paramB: valueB
```

## Ignore

In order to ignore the error, you can set the `action` of the pipeline header `onError` to `IGNORE`. In this case, a short message about the error will be logged and after this, the pipeline will go on with the next command. Here is an example to set this header globally for all commands in a pipeline:

```yaml
headers:
  onError: {"action": "IGNORE"}

pipeline:
  command.a:
    paramA: valueA
  command.b:
    paramB: valueB
```

You can also use the short form like this:

```yaml
headers:
  onError: "IGNORE"

pipeline:
  command.a:
    paramA: valueA
  command.b:
    paramB: valueB
```

You can specify this also as parameter per command:

```yaml
pipeline:
  command.a:
    paramA: valueA
    onError: {"action": "IGNORE"}
  command.b:
    paramB: valueB
```

Or in short:

```yaml
pipeline:
  command.a:
    paramA: valueA
    onError: "IGNORE"
  command.b:
    paramB: valueB
```

In case you specify `onError` as Pipeline header **and** as Command parameter, the parameter will have precendence.

## Ignore + log stacktrace

In order to ignore the error, but log the full stacktrace with all detail information, you can set the `action` of the pipeline header `onError` to `LOG`. In this case, the full stacktrace message about the error will be logged and after this, the pipeline will go on with the next command. Here is an example to set this header in a pipeline:

```yaml
headers:
  onError: {"action": "LOG"}

pipeline:
  command.a:
    paramA: valueA
  command.b:
    paramB: valueB
```

You can also use the short form like this:

```yaml
headers:
  onError: "LOG"

pipeline:
  command.a:
    paramA: valueA
  command.b:
    paramB: valueB
```

You can specify this also as parameter per command:

```yaml
pipeline:
  command.a:
    paramA: valueA
    onError: {"action": "LOG"}
  command.b:
    paramB: valueB
```

Or in short:

```yaml
pipeline:
  command.a:
    paramA: valueA
    onError: "LOG"
  command.b:
    paramB: valueB
```

In case you specify `onError` as Pipeline header **and** as Command parameter, the parameter will have precendence.

## Rollback `preview`

:::warning
This action is currently a preview and not activated in main branch. Please give feedback! Thank you.
:::

If you would like to execute some rollback actions in case an error occured in a command, you need to set the `action` parameter of the pipeline header `onError` to `ROLLBACK` and additionally specify the parameter `pipeline`. In this case, the full stacktrace message about the error will be logged and after this, the given pipeline will be executed which contains the rollback logics. Here is an example to set this header in a pipeline:

```yaml
headers:
  onError: {"action": "ROLLBACK",  "pipeline": "uri:property:global/app/myapp/pipeline/rollback"}

pipeline:
  command.a:
    paramA: valueA
  command.b:
    paramB: valueB
```

In case an error occurs, the persisted pipeline `global/app/myapp/pipeline/rollback` will be loaded from the property store and executed.

You can specify this also as parameter per command:

```yaml
pipeline:
  command.a:
    paramA: valueA
    onError: {"action": "ROLLBACK",  "pipeline": "uri:property:global/app/myapp/pipeline/rollback"}
  command.b:
    paramB: valueB
```

In case you specify `onError` as Pipeline header **and** as Command parameter, the parameter will have precendence.

There is no short form for this action.

## Retry

It's also possible to retry a command after an error has been occured, executing it. In this case, after the `wait` amount of seconds, the command will be re-executed the configured amount of `times`. And finally, if the error still exists, a final action will be executed, defined by `then`. Here is an example to set this header in a pipeline:

```yaml
headers:
  onError: {"action": "RETRY", "times": 3,  "wait": 2,  "then": {"action": "THROW"} }

pipeline:
  command.a:
    paramA: valueA
  command.b:
    paramB: valueB
```

Or shorter:

```yaml
headers:
  onError: {"action": "RETRY", "times": 3,  "wait": 2,  "then": "THROW" }

pipeline:
  command.a:
    paramA: valueA
  command.b:
    paramB: valueB
```

You can specify this also as parameter per command:

```yaml
pipeline:
  command.a:
    paramA: valueA
      onError: {"action": "RETRY", "times": 3,  "wait": 2,  "then": {"action": "THROW"} }
  command.b:
    paramB: valueB
```

Or shorter:

```yaml
pipeline:
  command.a:
    paramA: valueA
      onError: {"action": "RETRY", "times": 3,  "wait": 2,  "then": "THROW" }
  command.b:
    paramB: valueB
```

In case you specify `onError` as Pipeline header **and** as Command parameter, the parameter will have precendence.

In case an error happens in this example, the system will wait for `2` seconds and then will re-execute the same command. This will be repeated for `3` times. And if after 3 times the error still occurs, then the `THROW` action will be executed, which logs the error stacktrace and then stops executing the command/pipeline. Instead of `THROW` you can also define any of the other actions mentioned before in short or long form including their parameters, except the `RETRY` action.

### Parameters

The optional parameters of the `RETRY` action are:

-  `wait`: The time to wait in seconds before the next retry starts. Defaults to `3` seconds.
 - `times`: The number of retries before giving up and executing the `then` action. Defaults to `1`.
 - `then`: The final action to do in case the error still occurs after the given amount of retries. Can be one of `IGNORE`, `LOG`, `THROW` or `ROLLBACK`. Defaults to `THROW`.

## Finally

Sometimes it is necessary to do some tasks at the very end of a pipeline, even if an error has been occurred. For example to cleanup data. In such a case you can use the [`finally`](/docs/api/commands#finally-v1) command: Every command which is defined after the `finally` command will be executed in any case at the very and of a pipeline. Here is an example:

```yaml
pipeline:

  - command.with.error:

  - finally:

  - mail.send:
      to: admin@company.com
      subject: "Pipeline finished"
      message: "Pipeline finished with result: #{body}"
```

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::