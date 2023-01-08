---
id: messaging

title: 9. Messaging
sidebar_label: Basics
slug: /messaging
---

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 7.0</p>

PIPEFORCE has a built-in messaging system, where application messages can be routed between microservices based on conditions like routing
keys for example.

By default, as internal message broker RabbitMQ is used as a service module: https://www.rabbitmq.com/documentation.html. It's one of the most advanced and most widely used messaging broker in the world.

In order to send and receive messages to/from this messaging broker, you have two options:

- Develop a microservice using a RabbitMQ client library and deploy it to PIPEFORCE using the [service.deploy](../api/commands#servicedeploy-v1) command.
  For details about writing such a microservice which produces and consumes messages, see the
  section [messaging and microservices](microservices/messaging).
- Write a pipeline using the [message.receive](../api/commands#messagereceive-v1)
  and [message.send](../api/commands#messagesend-v1) commands and let PIPEORCE manage connections, exchanges, queues, bindings and consumers for you.

This section will cover the second part: How to write pipelines which send and receive messages to/from the messaging
broker.

## Receiving messages

Receiving messages in a pipeline is simple: Use the command [message.receive](../api/commands#messagereceive-v1) and specify the message key of interest. After you have stored the pipeline, it will be executed every time this key occurs. No need to manage connections, queues, bindings or similar.

Let's assume you have a pipeline, which sends an email like this:

```yaml
pipeline:

  - mail.send:
      to: "sales@company.tld"
      subject: "New Sales Order"
      message: "Hello, a new sales order has been created!"
```

Now you would like to listen for new sales orders. Every time a new such sales order has been
created, we would like to send this email.

Let's assume, the unique messaging key `sales.order.created` was defined for this.

With this information we can now extend our pipeline easily to listen to messages with this key and automatically send
an email, every time such a message appears:

```yaml
pipeline:

  - message.receive:
      key: "sales.order.created"

  - mail.send:
      to: "sales@company.tld"
      subject: "New Sales Order"
      message: "Hello, a new sales order has been created!"
```

As you can see, we added the command `message.receive` at the very beginning. It's important that this command is always
at the very beginning and its the only `message.receive` command in the pipeline. After the pipeline has been stored in the property stores, Any command below `message.receive`
will then be executed every time a message with the given key appears.

After you stored it, the pipeline then starts to listen: Any time a message with key `sales.order.created` happens, this pipeline will be informed about this and executes any command below `message.receive`. So in this example this will send a new email any time this message happens.

### Managed Queue

PIPEFORCE can manage the creation, registration and deletion of exchanges, consumers, queues and bindings automatically for you.

As soon as you save a pipeline containing a `message.receive` command to the property store, by default a new queue with a name given by parameter `queue` will be automatically created for you, if not already exists. In case no `queue` parameter is given, the queue name will be automtically derived from the pipeline name (= default name). This default name has the format `APPNAME_pipline_PIPELINENAME`, whereas `APPNAME` will be replaced by the name of the app, the pipeline resides in and `PIPELINENAME` by the name of the pipeline which contains the `message.receive` command.

Additionally, a binding and a consumer listening to the given message key will be automatically created for you and linked with the queue. So no queue, binding or consumer management is required by default.

If you delete or change a `message.receive` command inside a pipeline, the according consumer will be removed, but the queue and bindings will **not** be deleted by default. 

:::tip How to change the default?
You can change this default behaviour by using the parameter `manageQueue` which can be set to these values:

- `false` = No message entities like queues and bindings will be created or deleted automatically. You have to manage all of this by your own (not recommended).
- `create` = This is the default. In this case, the queue will be created automatically in case it doesn't exist yet and the bindings will be attached to it. But it **wont** be altered or deleted automatically aftwards.
- `delete` = In this case, the queue will be deleted in case the `message.receive` command has been changed or removed from the pipeline or the pipeline got deleted. The creation of queue and bindings is **not** automated.
- `create,delete` = This combines automation of creation and deletion as described above.

Regardless of the parameter `manageQueue`, the creation, deletion and scaling of the according **consumer** is always done automatically.
:::

### Accessing Payload

It's also possible to send message with additional data: Which is called the **payload**.

Let's assume, the data structure of a sales order was defined by the integration team and looks like this:

```json
{
  "id": "someSalesOrderId",
  "date": "23.05.2022, 13:45",
  "amount": "234 EUR",
  "customer": "Acme Inc."
}
```

This is the payload of a message. Such a payload will be automatically provided in the pipeline body to all commands below `message.receive`.

So let's use this payload in order to send more information with our email, like this:

```yaml
  pipeline:

    - message.receive:
        key: "sales.order.created"

    - mail.send:
        to: "sales@company.tld"
        subject: "New Sales Order"
        message: |
          Hello, a new sales order has been created:
          Id:       #{body.id}
          Date:     #{body.date}
          Amount:   #{body.amount}
          Customer: #{body.customer}
```

:::tip Non JSON payload
In case you're sending a message in a **non** JSON format, for example as a simple text string `Hello World!`, it will be internally wrapped into a JSON envelope using this structure:
```json
{
  "status": 200,
  "valueType": "string",
  "value": "Hello World!"
}
```
:::

### Using Wildcard Keys

In some situations you probably would like to listen to all messages of a certain type. So lets assume you would like to
be informed about any sales order changes in the sales department and let's assume the integration team publishes all
changes to a message key structure like this:

- sales.order.created
- sales.order.closed
- sales.lead.created
- sales.lead.converted
- sales.incident.created

Now in case you would like to listen to all messages according to sales orders, but not the other ones, you can use a
key pattern like this: `sales.order.*`. Note the asterisk `*` which indicates that you're interested in any message
starting with `sales.order`. The asterisk means anything of the third section. So you will be informed about:

- sales.order.created
- sales.order.closed

But you won't be informed about:

- sales.lead.created
- sales.lead.converted
- sales.incident.created

This is how the pipeline could look like for example to listen to all sales order actions:

```yaml
pipeline:

  - message.receive:
      key: "sales.order.*"

  # Commands to be executed go here...
```

And in this example we listen to all messages which are related to create something in the sales department:

```yaml
pipeline:

  - message.receive:
      key: "sales.*.created"

  # Commands to be executed go here...
```

Furthermore, you can use the hash `#` in order to indicate any level. So for example if we would like to listen to anything
inside the sales department, we could use a pipeline like this:

```yaml
pipeline:

  - message.receive:
      key: "sales.#"

  # Commands to be executed go here...
```

The hash `#` matches any level of the message key regardless of the number of periods (sections) in it.

### Batched Messages

Sometimes it is required to execute the message listener only for a bunch of messages, not for each single one. This is useful for example for performance reasons in case you have a lot of tiny messages or in case the target accepts only groups of messages. For this you can use the messaging batching feature of PIPEFORCE using these parameters on the `message.receive` command:

- `maxBatchSize`: Buffers messages up to the given size in bytes and then processes this pipeline with all of these messages. The messages will be provided as array to the body. The maximum size is 200KB (204800).
- `maxBatchItems`: Buffers the amount of messages up to the given number and then processes this pipeline with all of these messages. The messages will be provided as array to the body.

If both parameters are given, the one which matches first is considered.

The messages in the buffer are not acknowledged until they got delivered to the pipeline. 

## Sending Messages

To send messages in a pipeline, you can use the command [message.send](../api/commands#messagesend-v1).

Here is an example:

```yaml
pipeline:

  - message.send: 
     key: "sales.order.created"
     payload: |
       {
          "id": "someSalesOrderId",
          "date": "23.05.2022, 13:45",
          "amount": "234 EUR",
          "customer": "Acme Inc."
        }
```

This example sends a new message with key `sales.order.created` and the given JSON document as payload to the default exchange. By default, the content type of the payload is `application/json`. You can change this by using the parameter `contentType`. In case the payload is different from a JSON document, it will be automatically wrapped into a JSON envelope in order to make sure, the consumers can always expect a valid JSON. The structure of this JSON envelope looks like this example:

```json
{
  "status": 200,
  "valueType": "string",
  "value": "Hello World!"
}
```

The field `status` status indicates whether the value is OK or not. In case there was some problem with the value (for example too big, conversion error or similar), this will be indicated here. The status code is similar to the HTTP status codes. In cases of an error status, also the field `statusMessage` is used which has more information about the error occured.

The field `valueType` specifies the content type of the `value` field which can be one of the default JSON types like:

- `string`
- `object`
- `integer`
- `number`
- `boolean`
- `array`

Or any specific content type, defined by the `contentType` parameter of the command `message.send`.

The `payload` can also be set to `null` or empty string in case the message has no payload at all. In case the parameter `payload` is missing, the current body content of the pipeline is used as payload.


## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::