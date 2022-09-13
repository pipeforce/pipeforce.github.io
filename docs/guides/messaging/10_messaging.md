---
id: messaging

title: 9. Messaging
sidebar_label: Basics
slug: /messaging
---

PIPEFORCE has a built-in messaging bus where application messages can be routed between microservices based on routing
keys.

As internal message broker RabbitMQ is used: https://www.rabbitmq.com/documentation.html

It's one of the most advanced and most widely used messaging broker in the world.

In order to send and receive messages to/from this messaging bus, you have two options:

- Develop a microservice using a RabbitMQ client library and deploy it to PIPEFORCE using the [service.deploy](../api/commands#servicedeploy-v1) command.
  For details about writing such a microservice which produces and consumes messages, see the
  section [messaging and microservices](microservices/messaging).
- Write pipelines using the [message.receive](../api/commands#messagereceive-v1)
  and [message.send](../api/commands#messagesend-v1) commands.

This section will cover the second part: How to write pipelines which send and receive messages to/from the messaging
bus.

## Receiving messages

To receive messages in a pipeline, you can use the command [message.receive](../api/commands#messagereceive-v1).

Let's assume you have a pipeline, which sends an email like this:

```yaml
pipeline:

  - mail.send:
      to: "sales@company.tld"
      subject: "New Sales Order"
      message: "Hello, a new sales order has been created!"
```

Now you would like to listen for new sales orders on the messaging bus. Every time a new such sales order has been
created, we would like to send this email.

Let's assume, the unique messaging key `sales.order.created` was defined and communicated accordingly by the integration
team. This can be freely designed by the development team.

With this information we can now extend our pipeline easily to listen to messages with this key and automatically send
an email:

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
at the very beginning and its the only `message.receive` command in the pipeline. Any command below `message.receive`
will then be executed every time a message with the given key appears.

As soon as you save the pipeline to the property store, a new queue, a binding and a consumer will be automatically
created for you.

The pipeline then starts to listen: Any time a message with key `sales.order.created` happens in the messaging bus, this
pipeline will be informed about this and executes any command below `message.receive`.

:::caution
Whenever you delete a pipeline with a `message.receive` command in it, the according messaging queue, bindings and
consumers will also automatically be deleted. The same is true in case you remove the `message.receive` command
from the pipeline. In case you rename the pipeline or change parameters of the command, the old queue, binding and
consumer will be replaced by a new one. So make sure to change such a pipeline only in development mode, never in production.
:::

### Accessing payload

It's also possible to send data with any message, it's called the **payload**.

Let's assume, the data structure of such a sales order was defined by the integration team and looks like this:

```json
{
  "id": "someSalesOrderId",
  "date": "23.05.2022, 13:45",
  "amount": "234 EUR",
  "customer": "Acme Inc."
}
```

This is the payload of a message. Such a payload will be automatically provided in the pipeline body to all commands
below `message.receive`.

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

### Using wildcard keys

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

## Sending messages

To send messages in a pipeline, you can use the command [message.send](../api/commands#messagesend-v1).

Here is an example:

```yaml
pipeline:

  - message.send: 
     key: "sales.order.created"
     paloyad: |
       {
          "id": "someSalesOrderId",
          "date": "23.05.2022, 13:45",
          "amount": "234 EUR",
          "customer": "Acme Inc."
        }
```

In case the parameter `payload` is missing, the current body content of the pipeline is used as payload.

This sends a new message with key `sales.order.created` and the given payload to the default exchange.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::