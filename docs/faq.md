# FAQ

## What is a Namespace?

See [Namespaces](guides/namespaces).

## What is a Property?

See [Property Store](propertystore#what-is-a-property).

## What is a Command?

See [Commands](guides/commands_pipelines#command).

## Can I retry a Command on error?

Yes. You can configure this using the pipeline header [`onCommanError`](api/headers#oncommanderror).

## Can I execute a Pipeline conditional?

Yes. You can configure this using the pipeline header [`runWhen`](api/headers#runwhen).

## What is a Pipeline?

See [Pipelines](guides/commands_pipelines#pipeline).

## How to authenticate a Pipeline call?

See [Authorization](guides/security/authorization).

## How can I test a Pipeline?

*Coming soon*

## How can I debug a Pipeline?

*Coming soon*

## How to persist data?

See [Property Store](propertystore#what-is-a-property).

## How can I connect to REST endpoints?

See the [http.*](api/commands#httpget-v1) Commands.

## Do you have flows?

Yes. In PIPEFORCE, flows are called [Pipelines](guides/commands_pipelines#pipeline). We call it pipeline, since in PIPEFORCE a flow is more message orientied. Such a message "walks" thru a pipeline of different tasks. In each step, the message can be be altered in different ways.

## Do you provide Professional Services?

Yes. We provide Consulting, Support and Professional Services around PIPEFORCE. Feel free to [contact us](https://pipeforce.io/kontakt/).