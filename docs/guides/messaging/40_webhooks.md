# Webhooks

A webhook is a unique url of your system which is communicated to external services. In case these external services call the webhook url, this triggers an action on your target server.

In PIPEFORCE, you can create **custom** webhooks and link them to predefined pipelines. When called, it produces an internal event message which in turn can execute a pipeline using the commands [`event.listen`](/docs/api/commands#eventlisten-v1) or [`message.receive`](/docs/api/commands#messagereceive-v1).

:::info
Replace any url **``https://hub-try.pipeforce.org``** from the examples shown on this page by the url of [your PIPEFORCE instance](/docs/guides/namespaces).
:::
    
The url of such an PIPEFORCE webhook has a format similar to this:

```
https://hub-try.pipeforce.org/api/v3/command/webhook.receive?token=<token>
```

:::info
*   Replace `<token>` by the token of your webhook. See below to get such an token.
*   The token is sometimes also referred to as the **uuid**, the unique id, of a webhook. 
*   It's also possible to place the `token` param as request header (recommended, because it is more secure).
:::

## Create a Webhook

Before some external service can call your webhook, you have to create and endpoint for it. 

You can create such a webhook using the command [`webhook.put`](/docs/api/commands#webhookput-v1). Here is an example using it in a pipeline:

```yaml
pipeline:
  - webhook.put:
      eventKey: "webhook.lead.created"
```

Alternatively, you can use the CLI to create the Webhook:

```
pi command webhook.put eventKey=webhook.lead.created
```

As `eventKey` define the internal unique name of the webhook. It's good practise that this name is lower case, grouped by periods and starts with prefix `webhook.`. The result after executing the [`webhook.put`](/docs/api/commands#webhookput-v1) command is a JSON document like this:

```json
{
  "eventKey": "webhook.lead.created",
  "webhookUrl": "https://hub-try.pipeforce.org/api/v3/webhook.receive?token=a29a4f16-989d-48c8-ab54-7b6150733ba1",
  "uuid": "a29a4f16-989d-48c8-ab54-7b6150733ba1",
  ...
}
```
The `uuid` (also called **token**) is the unique identifier of your webhook. Since it is very hard to guess this token, it is used to secure your webhook. The external services can use the `webhookUrl` in order to call your webhook.

:::warning
 * Make sure you keep the `uuid` (token) secure and only communicate it to the external partners via a secure channel.
 * Once created, **the uuid cannot be changed afterwards** since it is the link of external services to your internal actions.
:::

In case you're using the PIPEFORCE Developer Portal, you can create a Webhook with a few clicks:

![](../../img/portal-webhook-create.png)

Define an event key in the creation dialog and click "Add":

![](../../img/portal-webhook-create-dialog.png)

Finally, the Webhook gets listed and you can get its token from the list:

![](../../img/portal-webhook-listing.png)

## Trigger a Webhook

After you have setup the Webhook successfully, it can be triggered (called) from the outside. To do so, send a GET or POST HTTP request to the webhook url which was returned when you created it:

`https://hub-try.pipeforce.org/api/v3/command/webhook.receive?token=abcdef`

:::warning
In order to secure the **token** in your url, you should always prefer a **HTTPS** connection between the two systems (which is by default always the case in PIPEFORCE), and send the `token` parameter in the body of a **POST** request, or as **HTTP Header** instead of a request parameter. PIPEFORCE supports all three methods. But it depends on the caller of the webhook, which approach it supports.
:::

## Link a Webhook to a Pipeline

After you have successfully setup the webhook, any time the webhook url is triggered (called) from the outside, a new message is produced inside PIPEFORCE, which can then be consumed by any pipeline. To do so, use the [`event.listen`](/docs/api/commands#eventlisten-v1) or [`message.receive`](/docs/api/commands#messagereceive-v1) command to listen for such new event messages. Here’s an example which sends an email whenever a new lead was created using a webhook with the `eventKey` =`webhook.lead.created`:

```yaml
pipeline:
 - event.listen:
     eventKey: webhook.lead.created
 - mail:
     to: name@company.tld
     subject: "New lead was created!"
     body: "#{@convert.fromBase64(body.origin)}"
```

The input body of the [`event.listen`](/docs/api/commands#eventlisten-v1) command is the payload of the event message submitted from the outside caller.

In case the sender has sent some payload in the body of the webhook request, this payload is made available for you as base64 encoded string in the `origin` field of the event. To access this data, you have to convert this value as shown in this example:

```
#{@convert.fromBase64(body.origin)}
```

For security reasons, by default, the webhook pipeline is executed with very limited `anonymousUser` privileges. So, make sure that you use only commands in your pipeline which can be executed by this user. In case you need more privileges, you can use the [`iam.run.as`](/docs/api/commands#iamrunas-v1) command to switch to the privileges of the given user before executing the command. See the IAM portal for the permissions (or roles) of a given user. Also see [Groups, Roles, and Permissions](/docs/guides/security/permissions) for more details on user privileges / permissions.

:::caution Some words about security and webhooks

Since a Webhook triggers the execution of pipelines, they can be very powerful. This power also comes with **additional responsibility** for you, the app developer. Make sure you have sufficient security testings in place, and you have secured your webhook pipelines accordingly.

:::

## Show existing Webhooks

To list all existing webhooks, you can use the [`webhook.get`](/docs/api/commands#webhookget-v1) command:

```
pi command webhook.get
```

You will see a JSON / YAML list with details about all existing webhooks.

In order to get the details of a single webhook, use the [`webhook.get`](/docs/api/commands#webhookget-v1) with the param `uuid`, where uuid is the token of the webhook you want to list:

```
pi command webhook.get uuid=<yourWebhookUuid>
```

You can also list all existing Webhooks in the Portal:

![](../../img/portal-webhook-listing.png)


## Edit a Webhook

In order to edit an existing webhook, you can use the [`webhook.put`](/docs/api/commands#webhookput-v1) command, and set the uuid (= token) of the webhook to edit. For example:

```
pi command webhook.put uuid=abcdef eventKey=webhook.changed.key
```

## Delete a Webhook

In order to delete an existing webhook, you can use the command [`webhook.delete`](/docs/api/commands#webhookdelete-v1):

```
pi command webhook.delete uuid=abcdef
```

And then, set the uuid of the webhook you want to delete.

You can also delete a Webhook by using the Portal in the "Webhooks" section.

## Receiving Files via Webhook

It is also possible to send files as a playload with a webhook. To do so, execute the request as multipart POST with the body formatted as `multipart/form-data`. For example:

```
POST /api/v3/command/webhook.receive?uuid=abcdef HTTP/1.1 
Host: hub-<NS>.pipefore.net
Content-Type: multipart/form-data;boundary="boundary" 

--boundary 
Content-Disposition: form-data; name="file"; filename="fileA.pdf" 

<CONTENT FILE fileA.pdf GOES HERE...>
--boundary 
Content-Disposition: form-data; name="file"; filename="fileB.pdf" 

<CONTENT FILE fileB.pdf GOES HERE...>
--boundary--
```

More information about multipart POST requests can be found here: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::