
# Events

In PIPEFORCE an event is represented by a JSON object with a certain structure like this:

```json
{
  "eventKey": "string",
  "namespace": "string",
  "payload": {JSON},
  "async": true|false,
  "headers": {
    "key": "value",
    ...
  }
}
```

This event JSON object is automatically provided to you in the `body` of the pipeline and can be accessed from there by a pipeline expression (PE).

## eventKey

Contains a unique key for this event type. The event keys are typically written lower case and in a dot notation where each part is separated by a dot.

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

## namespace

The namespace (= tenant) where this event happened. If null or empty, the event was fired by a global instance.

## payload

The optional payload of the event as JSON object. The structure of this payload depends on the event type.

**Note:** Every event also has the virtual properties `origin` and `target` whereas each in term point to the `origin` or `target` properties inside the `payload` (if there exists any). Virtual means, these properties are not serialized to JSON and can only be accessed by a pipeline expression (PE). This is handy for filters, since no null check for `payload` is necessary here.

So these paths point to the same whereas the left part will never raise a null exception:

*   `origin = payload.origin` (the origin value **BEFORE** an event happened)
    
*   `target = payload.target` (the final value **AFTER** an event happened)
    

It depends on the event whether `origin` and / or `target` is provided and which structure they have. Please consult the documentation for the certain event.

## async

`true`, in case this event was sent in asynchronous way. Otherwise `false`.

## headers

Optional name-value-pairs to describe the event. Its good practise to filter events based on header values and avoid filtering on payload because of performance.

# Listening for events

In case a pipeline should be executed when a certain event was fired, the `event.listen` command can be used. When the pipeline is deployed, the `event.listen` registers itself as listener to the event system. Whenever an event is fired which matches the `event.listen` criteria, any subsequent commands of this pipeline are executed then.

Lets assume an example: Whenever a new lead was created in Salesforce, the pipeline must send an email to the sales team:

```yaml
pipeline:
 - event.listen:
     key: webhook.salesforce.lead.created
 - mail:
     to: sales@company.tld
     subject: New lead created!
```

After this pipeline was deployed to the property store, it will be executed automatically any time a new event with key `webhook.salesforce.lead.created` happens. In this case a new email will be sent to `sales@company.tld`.

Note: Each pipeline can define exactly one `event.listen` command an it must be the very first command in the pipeline.

## Deep filtering for events

Beside the event key, each event can also be filtered by its properties. So a pipeline gets executed only in case such a filter evaluated with `true`. To do so, you can use the `filter` parameter of the `event.listen` command and place a pipeline expression here. Since the event object is automatically provided in the `body` for you, you can access it there from inside your pipeline expression (PE). For example:

```yaml
pipeline:
 - event.listen:
     key: webhook.salesforce.lead.created
     filter: "#{body.target.CountryCode == 'DE'}"
 - mail:
     to: sales@company.tld
     subject: New lead created in #{body.target.CountryCode}!
```

In the `filter` parameter you can place a pipeline expression (PE). If this expression evaluates with `true`, all subsequent commands after `event.listen` will be executed.

In this example we assume that the event contains the Salesforce `Lead` object so we can filter for the `CountryCode` here. But this depends on the implementation of the webhook.

# Sending event

In order to send an event, you can use the `event.send` command. Here is an example:

```yaml
pipeline:
  - event.send:
      key: com.company.myevent
```

Every time this pipeline gets executed, it will send a new event with key `com.company.myevent`. Optionally you also set the `payload` of the event using its `payload` parameter. This can be a literal or a pipeline expression (PE) which points to an object to be attached to the payload.

Note: Whenever you send a custom event you need to prefix it with the reversed internet address of your company. In this example it is `com.company`. Otherwise it could be, that your event gets dropped or causes an exception.

# Built-in events

These are events which come out-of-the-box with PIPEFORCE. Here is a list of those officially supported events:

|     |     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --- | --- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Event Key** | **Description** | **Payload**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `property.created` | Fired every time a new property was created in the property store. | Contains as `origin` the value `null` and as `target` the property created before.<br/><br/>```<br/>{<br/>  "payload": {<br/>    "origin": null,<br/>    "target": {<br/>      "uuid": "string",<br/>      "key": "string",<br/>      "type": "string",<br/>      "value": "string",<br/>      "created": timestamp,<br/>      "updated": timestamp<br/>    }<br/>  }<br/>}<br/>```                                                                                                                                                                                                       |
| `property.copied` | Fired every time a property was copied in the property store. | Contains as `origin` the source property and as `target` the property where source was copied to.<br/><br/>```<br/>{<br/>  "payload": {<br/>    "origin": {<br/>      "uuid": "string",<br/>      "key": "string",<br/>      "type": "string",<br/>      "value": "string",<br/>      "created": timestamp,<br/>      "updated": timestamp<br/>    },<br/>    "target": {<br/>      "uuid": "string",<br/>      "key": "string",<br/>      "type": "string",<br/>      "value": "string",<br/>      "created": timestamp,<br/>      "updated": timestamp<br/>    }<br/>  }<br/>}<br/>```  |
| `property.deleted` | Fired every time a property was deleted from the property store. | Contains as `origin` the property which was deleted and as target `null`.<br/><br/>```<br/>{<br/>  "payload": {<br/>    "origin": {<br/>      "uuid": "string",<br/>      "key": "string",<br/>      "type": "string",<br/>      "value": "string",<br/>      "created": timestamp,<br/>      "updated": timestamp<br/>    },<br/>    "target": null<br/>  }<br/>}<br/>```                                                                                                                                                                                                                |
| `property.moved` | Fired every time a property was moved from one key to another key. | Contains as `origin` the key of the source property and as `target` the key of the property where it was moved to.<br/><br/>```<br/>{<br/>  "payload": {<br/>    "origin": "string",<br/>    "target": "string"<br/>  }<br/>}<br/>```                                                                                                                                                                                                                                                                                                                                                     |
| `property.updated` | Fired after a property has been updated in the property store. | Contains as `origin` the property before the update and as `target` the property after the update.<br/><br/>```<br/>{<br/>  "payload": {<br/>    "origin": {<br/>      "uuid": "string",<br/>      "key": "string",<br/>      "type": "string",<br/>      "value": "string",<br/>      "created": timestamp,<br/>      "updated": timestamp<br/>    },<br/>    "target": {<br/>      "uuid": "string",<br/>      "key": "string",<br/>      "type": "string",<br/>      "value": "string",<br/>      "created": timestamp,<br/>      "updated": timestamp<br/>    }<br/>  }<br/>}<br/>``` |
| `setup.finished` | Fired after the hub service was successfully started and all setup scripts have been executed successfully. | This event contains no payload.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `setup.starting` | Fired after the hub service was successfully started but right before all setup scripts will be executed. | This event contains no payload.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `hub.context.started` | Fired after the hub service was successfully started. | Contains as `origin` the configuration of the context as key-value-pairs. The `target` is `null`.<br/><br/>```<br/>{<br/>  "payload": {<br/>    "origin": {<br/>      "key1": "value1",<br/>      "key2": "value2"<br/>    },<br/>    "target": null<br/>  }<br/>}<br/>```                                                                                                                                                                                                                                                                                                                |
| `iam.bruteforce.detected` | Fired every time a potential brute force attempt was detected. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `iam.login.error` | Fired every time a login attempt has been failed. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
