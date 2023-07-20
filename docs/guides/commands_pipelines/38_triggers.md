# Triggers

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 4.0</p>

A trigger is an external action which causes a **persisted** pipeline to be executed. 

These triggers are the common ones in PIPEFORCE:

### Job
Triggers a pipeline as a job which must be executed after a certain amount of time. For more details see [Jobs](/docs/guides/jobs).

### Message 
Triggers a pipeline in case a message of interest is on the message queue / bus. For more details see [Message](/docs/messaging).

### Event 
Triggers a pipeline in case an internal event of interest has occured. Events are quite similar to messages, except that their origin is always the hub backend. For more details see [Events](/docs/guides/messaging/events). Common event examples are:

- `property.created` = A new property has been created in the [Property Store](/docs/propertystore).
- `property.deleted` = A new property has been deleted from the [Property Store](/docs/propertystore).
- `iam.bruteforce.detected` = A potential brute force attack has been detected. 
- See [Events Reference](/docs/api/events) for more events.

### Webhook
Triggers a pipeline in case an external system sends a request to one of the custom webhook endpoints. For more details see [Webhhooks](/docs/guides/messaging/webhooks).

### API Gateway
Triggers a pipeline in case a HTTP request to an API Gateway endpoint was made which in term is linked to a pipeline. For more details see [API Gateway](/docs/apigateway).

### HTTP POST
Triggers a pipeline in case a HTTP POST request to the endpoint `/api/v3/pipeline` was done. For more details see [HTTP API](/docs/guides/commands_pipelines/http_api).

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::

