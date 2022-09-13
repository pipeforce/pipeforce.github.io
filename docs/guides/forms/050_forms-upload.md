# File Upload

In order to do a file upload using forms, follow these steps:

## Step 1 - Define in schema

Add the properties required for files in your [Forms Schema](../../guides/schema-and-objects). For example:

```json
{
  "type": "object",
  "properties": {
    "myFile": {
      "type": "object",
      "title": "CSV File",
      "piStyle": {
        "hidden": true
      },
      "properties": {
        "filename": {
          "type": "string"
        },
        "contentLength": {
          "type": "number"
        },
        "contentType": {
          "type": "string"
        },
        "contentEncoding": {
          "type": "string"
        },
        "content": {
          "type": "string"
        }
      }
    }
  }
}
```

## Step 2 - Define in form config

Define in the form config to render the file field as `filepicker` widget using the `render` attribute. For example:

```json
{
  "title": "uploadform",
  "description": "Upload example",
  "schema": "property.list?filter=global/app/upload-example/schema/uploadform",
  "output": "global/app/upload-example/data/uploadform/#{var.property.uuid}",
  "layout": {
    "items": [
      {
        "field": "myFile",
        "render": "filepicker"
      }
    ]
  }
}
```

Instead of `filepicker`, you can set the render attribute also to `pdfviewer` in order to show an embedded preview of an uploaded PDF.

## Step 3 - Access the uploaded file

After form submit, the form data (including the file reference) in this example is stored as new entry to the property store under key `global/app/upload-example/data/uploadform/#{var.property.uuid}` (see `output` attribute) whereas `#{var.property.uuid}` will be replaced by the uuid of the property.

The content of the uploaded file is stored separately as (binary) attachment to this property.

In your pipeline you can then listen to the form submit and access the content of the uploaded file by loading it from the property store since it is stored as attachment there.

Storing the content of a file separately as attachment has the advantage that the file can be theoretically unlimited in size since attachments can be stored elsewhere and linked to the properties. 

This example loads the CSV file's content, converts it to JSON, sends it via email and then logs it:

```yaml
pipeline:

  # Listen for the form submit since it will cause a new property entry
  - event.listen:
      key: "property.created"
      filter: "#{body.target.key.contains('global/app/upload-example/data/uploadform')}"

  # Load the file content from the property attachment
  - property.attachment.content:
      key: "#{body.target.key}" # Property key
      name: "#{body.target.value.myFile.content}" # Contains the name of the file
      
  # Do something with uploaded content
  - transform.csv.json:
  
  - mail.send:
      to: "your@email.tld"
      subject: "Upload Example"
      message: "#{body}"
  
  - log:
      message: "CSV to JSON result: #{body}"
```

:::info
Whenever you listen to an event, PIPEFORCE automatically places the event object to the body.
In case of a `property.created` event, this contains information about the property and its attachments.
:::

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::