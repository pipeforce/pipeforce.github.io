
# Events

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 6.0</p>

## The Event Object

In PIPEFORCE, an event is a special form of a Message.

It is an action which happened inside the hub service and is represented by a JSON object with a certain structure like this:

```json
{
  "eventKey": "string",
  "namespace": "string",
  "payload": {JSON},
  "async": true|false,
  "traceId": "string",
  "headers": {
    "key": "value",
    ...
  }
}
```

This event JSON object is automatically provided to you in the `body` of the pipeline and can be accessed from there by a pipeline expression (PE).

### `eventKey`

Contains a unique key for this event type. The event keys are typically written in a lower case and dot notation, where each part is separated by a dot.

Here are some examples of built-in event keys:

*   `property.created`
    
*   `property.deleted`
    
*   `setup.finished`
    

Events coming from external systems via webhooks must be prefixed with `webhook.systemname.` for example:

```bash
webhook.weclapp.order.created
```

Custom events (not part of the built-in events) must be prefixed with the reversed internet domain name of the creator. For example:

```bash
com.company.eventname
```

### `namespace`

The namespace (= tenant) where this event happened. If null or empty, the event was fired by a global instance.

### `payload`

The optional payload of the event as JSON object. Can be `null` in case the event doesn't contain any additional data. The structure of this payload depends on the event type and the `Content-Type` header.

#### `origin` and `target`

In case the event represents a change of data in the system, usually the attributes `origin` and `target` are placed inside `payload`, whereas:

 - `origin`: Contains the origin value **BEFORE** the change happened or null, if there was no origin value.
 - `target`: Contains the final value **AFTER** the change happened.

Let's consider for example the event type [`property.moved`](../../api/events#propertymoved):
 - `origin` contains here the origin property key before the move. For example: `"origin": "global/app/myapp/old"`
 - `target` contains here the final key, the property was moved to. For example: `"target":"global/app/myapp/new"`. 

It depends on the event type whether `origin` and / or `target` is provided inside `payload` and which structure they have. Consult the [documentation for the certain event types](../../api/events) to learn more about the available built-in event types.

### `async`

It is `true`, in case this event was sent in an asynchronous way. Otherwise, it is `false`.

### `traceId`

This contains a unique id in order to identify the message flow in logs and reports. Any message, origin to this message or successor to this message will contain this id.

### `headers`

These are optional name-value-pairs to describe the event. It is a good practice to filter events based on header values and avoid filtering on payload for better performance.

## Listening to events

In case a pipeline should be executed when a certain event was fired, the `event.listen` command should be used. When the pipeline is deployed, the `event.listen` registers itself as a listener to the event system. Whenever an event is fired that matches the `event.listen` criteria, any subsequent commands of this pipeline gets executed.

Lets assume an example: Whenever a new lead was created in Salesforce, the pipeline must send an email to the sales team:

```yaml
pipeline:
 - event.listen:
     key: "webhook.salesforce.lead.created"
 - mail:
     to: "sales@company.tld"
     subject: "New lead created!"
```

After this pipeline was deployed to the property store, it will be executed automatically any time a new event with key `webhook.salesforce.lead.created` occurs. In this case, a new email will be sent to `sales@company.tld`.

Note: Each pipeline can define exactly one `event.listen` command and it must be the very first command in the pipeline.

### Deep filtering of events

Besides the event key, each event can also be filtered by its properties. So a pipeline gets executed only in case such a filter evaluated with `true`. To do so, you can use the `filter` parameter of the `event.listen` command and place a pipeline expression here. Since the event object is automatically provided in the `body` for you, you can access it there from inside your pipeline expression (PE). For example:

```yaml
pipeline:
 - event.listen:
     key: webhook.salesforce.lead.created
     filter: "#{body.payload.target.CountryCode == 'DE'}"
 - mail:
     to: sales@company.tld
     subject: New lead created in #{body.payload.target.CountryCode}!
```

In the `filter` parameter you can place a pipeline expression (PE). If this expression evaluates with `true`, all subsequent commands after `event.listen` will be executed.

In this example, we assume that the event contains the Salesforce `Lead` object. So, we can filter for the `CountryCode` here. But this depends on the implementation of the webhook.

## Sending event

In order to send an event, you can use the `event.send` command. Here is an example:

```yaml
pipeline:
  - event.send:
      key: "com.company.myevent"
```

Every time this pipeline gets executed, it will send a new event with key `com.company.myevent`. Optionally, you also set the `payload` of the event using its `payload` parameter. This can be a literal or a pipeline expression (PE) which points to an object to be attached to the payload.

Note: Whenever you send a custom event, you need to prefix it with the reversed internet address of your company. In this example it is `com.company`. Otherwise, it could be that your event gets dropped or causes an exception.

## Built-in event types

In order to get a reference about all built-in events, see the [Event Reference](../../api/events)

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::