# 8. Content Reference

Usually you will work with JSON documents in your pipeline most of the time.

But sometimes you need to load such JSON documents from resources like the cloud, remote endpoints, files or streams before you can use them. Or you have to load other data types like images, PDFs or similar. The pointer to all of such resources is called a **content reference**. 

Before this data can be used, it must be read from the content reference bytewise. Then, it can be parsed to JSON for example, copied or otherwise used.

![](../img/content-reference.png)


Each content reference contains optional meta information about the content to be loaded (like the content type or the filename for example) plus the "instruction" how the content can be loaded.

The content reference can be seen as a JSON document with a concrete schema with optional metadata about the data to be loaded. Here is an example of a content reference which points to a file which can be downloaded via HTTP:

```json
{
    "name": "contract.pdf",
    "created": null,
    "contentType": "application/pdf",
    "contentLength": 23000,
    "content": "$uri:https://somehost/contract.pdf"
}
```

As you can see, beside some other information, the content reference contains the name of the file to be downloaded and the uri pointing to the location where the file can be downloaded from. This is also called an **outbound reference** since the data is stored on another location.

Here is an example which uses an **inbound reference** since the data is embedded into the content reference as base64 encoded byte array:

```json
{
    "name": "my.png",
    "created": null,
    "contentType": "image/png",
    "contentEncoding": "base64",
    "content": "YXNkYXNkZGFzYkYXNsamzZGphc2Qg...NkcG9pYXNkYXPYWQgc2Fkc2Fsa2Q="
}
```

Below you can find the attributes of a content reference and their meanings:

## Attributes

| **Attribute** | **Type** | **Description** | 
| --- | --- | --- |
| `name` | string | Optional. The name of the resource. |
| `created` | long | Optional. The unix timestamp in millis when this resource was created. |
| `lastUpdated` | long | Optional. The unix timetsmap in millis when this resource was last modified. |
| `contentType` | string | Optional. The content type of the rsource. If `null` or attribute doesn't exist, it is assumed to be `text/plain` by default. See here for a list of official content types: [https://www.iana.org/assignments/media-types/media-types.xhtml](https://www.iana.org/assignments/media-types/media-types.xhtml) |
| `contentLength` | long | Optional. The length of the resource in bytes or -1 or `null` in case the length cannot be determined. |
| `contentEncoding` | string | Optional. The encoding used to encode the content field. For example `base64`. |
| `content` | object | Required. The content (data) of the resource. Which format the data has, depends on its content type and encoding. For example, if contentType is `application/json`, then the data object returns a JSON document which can be encoded as string, node or base64 for example. |
| `checksum` | string | Optional. The checksum of the content (before encoding). |

Here is an example to load a file from the drive service into the body scope and then access its attributes of the content object from there:

```yaml
pipeline:
  # Load document from drive and set it as content object in the body
  - drive.read:
      path: "invoice.pdf"
  # Access the attributes of the content object in the body
  - log:
      message: "Filename: #{body.name}, Size: #{body.contentLength}" 
```

Since it would not make much sense to read the PDF "binary" content into the pipeline as JSON, this data is wrapped in the `content` attribute of the content object. You can write such a content object easily back to any supported target sink:

```yaml
pipeline:
  - drive.read:
      path: "invoice.pdf"
  - drive.save:
      path: "invoice-copy.pdf" 
```

## Loading content

In order to work with data from a content reference, you have to load (read) such data first.

When a content reference has been created, this doesn't mean that the data of this reference has also already been loaded. See this example again: It is a content reference, pointing to a PDF which is located at a remote server. We have already information about this PDF but the data of this PDF was not loaded yet:

```json
{
    "name": "contract.pdf",
    "created": null,
    "contentType": "application/pdf",
    "contentLength": 23000,
    "content": "$uri:https://somehost/contract.pdf"
}
```

In order to load the data of a content reference, you have multiple options:

- Load into memory using toolings like `@convert` or `@json` for example. 
- Using a command which can do content loading from content references out-of-the-box (see docs wheteher such a command supports this).


Some commands also support a streamed content reference. So data is processed in byte chunks instead of a whole. This way also big data can be processed. But this depends on the implementation of the content object in the backend.


:::warning
Do not load big data into memory! A content reference can also bee seen as a "gatekeeper" in order to make sure, big data is only loaded when required and then by default in a streamed way. Not as a whole.
:::

Here is an example in order to load a small, well known document:


```yaml
pipeline:
  - drive.read:
      path: "person.json"
  - set.body:
        value: "#{@content.load(body.content)}"
```

:::info
If not configured otherwise, by default, the data of a content reference in the body of a pipeline is automatically streamed to the client at the end of the pipeline. This means if you place a content reference in the body of a pipeline without loading it, at the end of the request, the data will be automatically loaded and returned to the client.
:::

## Writing content

When it comes to writing content, you have to use a command which can load data from a given content reference and write it to a given target sink like `drive.save` for exampl.

Another option is to create your own content reference.

Some examples:

Create a content reference from a JSON document in the body and write this to drive:
```yaml
vars:
    someJson: {"name": "Homer"}
pipeline:
    - set.body:
        value: "#{@content.from(vars.someJson)}"
    - drive.save:
        path: "my.json"
```

Since `drive.read` converts any input automatically to a content object internally, we could also do something like this:

```yaml
pipeline:
    - drive.save:
        input: { "name": "Homer" }
        path: "my.json"
```

And in case there is an file embedded in a JSON as base64 for example, we can write this file to drive like this example shows:

```yaml
vars:
    someJsonWithEmbeddedFile: {
            "foo": "bar", 
            "document": {
                "name":"hello.txt",
                "contentEncoding": "base64", 
                "content": "SGVsbG8gV29ybGQ="
            }
        }

pipeline:
    - drive.save:
        input: "#{vars.someJsonWithEmbeddedFile.document}"

```

This base64 encoded document is automatically converted to target format and then stored at drive. The filename is read from the embedded content reference JSON. Therefore, there is no need to specify the `path` attribute here. If we would like to store the document at a specific folder we could additionally set this using the `path` attribute:

```yaml
vars:
    someJsonWithEmbeddedFile: {
            "foo": "bar", 
            "document": {
                "name":"hello.txt",
                "contentEncoding": "base64", 
                "content": "SGVsbG8gV29ybGQ="
            }
        }

pipeline:
    - drive.save:
        input: "#{vars.someJsonWithEmbeddedFile.document}"
        path: "/my/folder/"

```

This would store the document at `/my/folder/hello.txt` in Drive. Any non existing folder will be auto-created.


## Collection (Folder)

In case multiple content references are loaded into a pipeline, such references are grouped together in a so called content reference **collection**. Such a collection has a similar meaning like a folder in a local file system.

|     |     |     |
| --- | --- | --- |
| **Attribute** | **Type** | **Description** |
| `parent` | Content Reference Collection | Returns the parent collection if this is a nested collection, or `null` in case this is the root collection. |
| `path` | string | Returns the path to this collection, whereas `/` is returned in case it is the root collection. Example: `/rootCol/subCol`. |
| `children` | Content Reference | Returns a list of all content references which are contained in this collection. This can not only be a content reference, but also another collection in case they are nested. |

A Content Reference Collection is also a [Content Object](#) and therefore it also has all attributes of the Content Object.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::
