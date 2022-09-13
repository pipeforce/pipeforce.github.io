# Microservice Messaging

The preferred way each microservice inside PIPEFORCE can communicate with each other is by using messaging, whereas
RabbitMQ is the message broker by default.

If you're using one of our microservice templates, setting up a library to connect to RabbitMQ and creating the
default channels and bindings is typically already done for you, or there is a best practise to do so.

Otherwise follow the documentation on the [official RabbitMQ websites](https://www.rabbitmq.com/documentation.html).

If you're interested in how to send and receive messages using pipelines, go [here](../messaging).

## How to connect a microservice with messaging?

In case you have deployed your microservice using the command `service.start`, then these environment variables will be
automatically provided inside your microservice and can be used to connect to the RabbitMQ messaging service:

- `PIPEFORCE_MESSAGING_HOST` = The cluster-internal hostname of the messaging service.
- `PIPEFORCE_MESSAGING_PORT` = The cluster-internal port of the messaging service.
- `PIPEFORCE_MESSAGING_USERNAME` = The default messaging username for connecting internally.
- `PIPEFORCE_MESSAGING_PASSWORD` = The default messaging password for connecting internally.

How to setup your client in order to connect, depends on your programming language the RabbitMQ client.
See the official documentation: https://www.rabbitmq.com/devtools.html

The next step is to create the queues required by your service. See the Default Queue Naming guide below.

Now create a binding between your queues, the default topic `pipeforce.hub.default.topic` and the routing key pattern
of messages your service is interested in.

Also remember to setup the dead leader queue in order to not lose any message as mentioned below.

## Default Queue Naming

By default any microservice is responsible to setup and manage its own queues.

Each queue should contain always equal message types. So, for different messages, create additional queues.

Queues created by a microservice should follow this naming convention:

```
<serviceName>_<queueName>_q
```

Whereas `<serviceName>` is the name of the microservice and `<queueName>` can be any name of the queue. For example:

```
shoppingcart_orders_q
```

Do not use dashes `-` but replace them by underscores `_`. For example instead of:

```
service-shoppingcart_orders_q
```

Use this name:


```
service_shoppingcart_orders_q
```

## Default Topic

PIEPFORCE automatically creates a default topic exchange on startup with this name: `pipeforce.hub.default.topic`.

PIPEFORCE core services are configured in a way that any event which happens there or is sent using the `event.send` command is also send to this default topic.

In case a microservice wants to listen to a certain type of message with a given routing key, it needs to create a binding between the topic `pipeforce.hub.default.topic` and the queue you want to “feed” this message into.

See here for more details about topics, routings and queues: https://www.rabbitmq.com/tutorials/tutorial-five-python.html

## Default Dead Letter Queue

Additionally, a default Dead Letter Queue is automatically configured by PIPEFORCE: `pipeforce_hub_default_dlq`.

Any other queue can be configured in a way to forward messages to this queue if one these rules apply:

- The message has been expired (was not processed within a given time period).
- The message has been declined (nack) by a consumer.
- The maximum amount of messages has been reached for a given queue.

This default dead letter queue is configured in a way to lazy keep the messages and store them into the persistence layer,
so no messages get lost.

Typically in order to setup a dead letter queue for your custom queue, you have to set these arguments accordingly:

```
x-dead-letter-exchange = ""
x-dead-letter-routing-key = "pipeforce_hub_default_dlq"
```

How to set these arguments in your microservice depends on your selected programming language and the RabbitMQ client
implementation you're using. See documentation for details: https://www.rabbitmq.com/dlx.html

In case you're using Java + Spring as microservice language for example, it could look like this:

```
return QueueBuilder.durable(Constants.MY_QUEUE)
    .withArgument("x-dead-letter-exchange", "")
    .withArgument("x-dead-letter-routing-key", "pipeforce_hub_default_dlq)
    .build();
```

## Default Message Keys

Here you can find the default message keys, PIPEFORCE will use for internal events and send messages with these keys
to the default topic `pipeforce.hub.default.topic`. You can subscribe to these keys using a binding between your queue
and this default topic.

You can also describe to multiple keys using the `*` and `#` patterns. For example in order to listen to all property
events, you could subscribe to the key pattern `property.*`.

See here for more details about message key patterns on topics: https://www.rabbitmq.com/tutorials/tutorial-five-python.html

Message / Event Key | Description
--- | ---
`delivery.created` | In case a new delivery was created.
`delivery.publiclink.created` | In case a new public link for a delivery was created.
`delivery.publiclink.deleted` | In case a public link for a delivery has been deleted.
`delivery.attachments.delete.success` | In case the attachments of a delivery have been deleted.
`delivery.attachments.delete.failed` | In case the deletion of the attachments have been failed.
`hub.context.started` | In case hub has context has been started is ready to accept requests but right before the startup phase.
`hub.context.starting` | In case hub context is about to start. Note: This event is not send to the topic queue since at the time of this, the RabbitMQ connector is not setup yet. This event is just for internal use in hub. Its mentioned here just for completeness reasons.
`hub.setup.finished` | In case hub setup has been finished.
`hub.setup.starting` | In case the hub setup is about to be started. This is right after the context has been started but before the setup has been fully finished.
`iam.bruteforce.detected` | In case a potential bruteforce attach has been detected by IAM.
`iam.login.error` | In case a login using IAM has been failed.
`property.copied` | In case a property in the property store has been copied. See PropertyCopiedEvent.java for implementation details.
`property.created` | In case a property in the property store has been created. See PropertyCreatedEvent.java for implementation details.
`property.deleted` | In case a property in the property store has been deleted. See PropertyDeletedEvent.java for implementation details.
`property.moved` | In case a property in the property store has been moved. See PropertyMovedEvent.java for implementation details.
`property.updated` | In case a property in the property store has been moved. See PropertyUpdatedEvent.java for implementation details.
`usagelog.created` | A new usagelog entry was created in the property store. See UsageLogCreatedEvent.java for implementation details.
`webhook.<name_of_webhook>` | In case a webhook call has been occurred. The <name_of_webhook> depends on the setup. You can use the pattern webhook.# to listen to all webhooks.
Depends on key param of command event.send. | Furthermore whenever the command event.send is called, the payload of this event is also forwarded to the default hub topic using the key param of this command as the messaging key and the body as the payload of the message.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::