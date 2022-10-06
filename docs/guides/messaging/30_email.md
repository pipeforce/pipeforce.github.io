# Emailing

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 3.0</p>

In PIPEFORCE you can send email messages out-of-the-box using the [mail.send](../api/commands#mailsend-v1) command.

Here is an example pipeline to use this command:

```yaml
pipeline:
 - mail.send:
    to: "recipient@domain.tld"
    subject: "This is the subject"
    message: |
      Hello recipient,
      this is an email sent from a pipeline.
      Greetings
```

## Email Templates

There are different possibilties in PIPEFORCE to set the email data dynamically.

### Using PEL
As usual, you can use the [Pipeline Expression Language (PEL)](../api/pel) in order to define placeholders in the command parameters. For example:


```yaml
vars:
  name: "Sam"
  email: "recipient@domain.tld"

pipeline:
 - mail.send:
    to: "#{var.email}"
    subject: "This is for #{var.name}"
    message: |
      Hello #{var.name},
      this is an email sent from a pipeline.
      Greetings
```

### Using a Transformer Command

You can use a transformer command like [transform.ftl](../guides/transformers/freemarker) in order to render the message. For example:

```yaml
vars:
  name: "Sam"
  email: "recipient@domain.tld"

pipeline:

  - transform.ftl:
      template: |
        Hello ${var.name},
        this is an email sent from a pipeline.
        Greetings

  - mail.send:
      to: "#{var.email}"
      subject: "This is for #{var.name}"
```

In this example, the message is rendered and then stored in the body using `transform.ftl`. The command `mail.send`
then picks up the rendered message from the body and uses it as email message.

And here is an example to load the template from the property store from location `global/app/myapp/template/email`:

```yaml
vars:
  name: "Sam"
  email: "recipient@domain.tld"

pipeline:

  - transform.ftl:
      template: "uri:property:global/app/myapp/template/email"

  - mail.send:
      to: "#{var.email}"
      subject: "This is for #{var.name}"
```

### Using a Custom URI

Instead of defining a separate transformer command in the pipeline, you can use a [Custom URI](../api/uris) which points inline to a template. For example:

```yaml
vars:
  name: "Sam"
  email: "recipient@domain.tld"

pipeline:

  - mail.send:
      to: "#{var.email}"
      subject: "This is for #{var.name}"
      message: "uri:property:global/app/myapp/template/email"
```

In this case, the `mail.send` command loads the template as property from location `global/app/myapp/template/email`, renders it and uses
the result as email message. The variables `var`, `header` and `body` will be provided as default model to the template.

You can replace these default template variables by your custom `model`:

```yaml
pipeline:

  - mail.send:
      to: "recipient@domain.tld"
      subject: "This is a subject"
      message: "uri:property:global/app/myapp/template/email"
      model: {"name": "Sam"}
```

## Email Attachments

In case you would like to add attachments, you can use the parameter `attachments` to do so.
### From Body

One approach is to load the attachments into a scope, like vars or the body first and then refer to them using a PEL inside the parameter `attachments`. For example:

```yaml
pipeline:
  - drive.read:
      path: "contract.docx"

  - mail.send:
      to: "recipient@domain.tld"
      subject: "This is the contract"
      message: "Hello, attached you can find the contract for your reference."
      attachments: "#{body}"
```

In this example the file is first loaded (implicitely) to body using the command `drive.read` and then linked to the `attachments` parameter. You can place any [content object](../guides/contentobject) as attachment. 

Using this approach it is also possible to create the attachments dynamically on-the-fly in the pipeline (for example by using a template engine) and then add them finally to the email.

### From Custom URI

Another approach to add attachments to an email is by using a [Custom URI](../api/uris) which points to the location of the attachments. For example:

```yaml
pipeline:

  - mail.send:
      ...
      attachments: "uri:drive:contract-v1.docx, uri:drive:contract-v2.docx"
```

:::tip
You can add multiple attachments by separating them by comma.
:::


## HTML Emails

Emails are sent by default using a base HTML skeleton. Any message is placed as text inside this HTML skeleton. HTML tags will be escaped by default.

In case you would like to format the text using HTML tags, you need to place the whole message inside a single HTML tag like `<p>` and `</p>` for example.

Here is an example to place a HTML link and HTML bullet points in your email message:

```yaml
pipeline:

  - mail.send:
      to: "recipient@domain.tld"
      subject: "This is the contract"
      message: |
        <p>Hello,
        please click <a href="#">this link</a>.
        <br/>
        These are the reasons:
        <ul>
          <li>Clicking is fun</li>
          <li>Test it</li>
        </ul>
        </p>
```

This will produce an email message output similar to this:

![](../../img/html-email.png)


## Bulk Emails

Sending multiple emails to multiple recipients with dynamic content can be done using the `mail.send` command in combination with the `foreach` command.

```yaml
vars:
  recipients: [
      {"name": "Sam Mayer", "email": "s.mayer@domain.tld"},
      {"name": "Marissa Foley", "email": "m.foley@domain.tld"},
    ]
    
pipeline:

  - foreach:
      in: "#{var.recipients}"
      
  - mail.send:
      to: "#{var.loop.item.email}"
      subject: "Letter to #{var.loop.item.name}"
      message: |
        Hello #{var.loop.item.name},
        this is a letter for you.
        Cheers
      
  - foreach:
      end:
```

:::caution
Depending on your license and/or environment, the number of allowed emails to be send per minute is restricted. 
Please refer to your support in order to get information about this limit.
In case you need to send a higher amount of emails, consider to use one of the email services and integrate
their API using the `http.*` commands.
:::

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::