# 8. Content Handling

In order to load and save files from and to storage locations in PIPEFORCE in an performance optimized way, you have to deal with "content objects". This is a wrapper around a resource like a file for example, which provides all required information in order to read, write and get metadata from it. Such a content object is in some cases also "streamable" and "cacheable", so you can also process large data in an well perfoming way. 

:::info
In most cases it is not required that you have to deal with content objects since most commands and utilities handle this automatically for you. But if you need to, this page gives you an overview about the basics.
:::

By default such a content object provides these attributes which you can access inside your pipeline:

## Attributes

| **Attribute** | **Type** | **Description** | 
| --- | --- | --- |
| `name` | string | Optional. The name of the document. |
| `created` | long | Optional. The unix timestamp in millis when this document was created. |
| `lastUpdated` | long | Optional. The unix timetsmap in millis when this document was last modified. |
| `contentType` | string | Optional. The content type of the file. If `null` or attribute doesn't exist, it is assumed to be `text/plain` by default. See here for a list of official content types: [https://www.iana.org/assignments/media-types/media-types.xhtml](https://www.iana.org/assignments/media-types/media-types.xhtml) |
| `contentLength` | long | Optional. The length of the file in bytes or -1 or null in case the length cannot be determined. |
| `contentEncoding` | string | Optional. The (optional) encoding used to encode the content field. For example `base64`. |
| `content` | object | Required. The content (data) of the file. Which format the data has depends on its content type and encoding. For example, if contentType is `application/json`, then the data object returns a JSON document which can be encoded as string, node or base64 for example. |
| `checksum` | string | Optional. The checksum of the content (before encoding). |

Here is an example to load a file from the drive service into the body scope and then access its attributes of the content object from there:

```yaml
pipeline:
  # Load document from drive and set it as content object in the body
  - drive.read:
      path: "invoice.pdf"
  # Access the attributes of the content object in the body
  - log:
      message: "Name: #{body.name}, Size: #{body.contentLength}" 
```

Since it would not make much sense to read the PDF "binary" content into the pipeline as JSON, this data is wrapped in the `content` attribute of the content object. You can write such a content object easily back to any supported target sink:

```yaml
pipeline:
  - drive.read:
      path: "invoice.pdf"
  - drive.save:
      path: "invoice-copy.pdf" 
```

## Reading content

In order to read the data of such a content object, it depends on how this content was made available which in turn depends on the way,
how such a content object was loaded.

When a content object has been loaded, this doesn't mean that the content data was also already loaded. So a stream content object for 
example could read bytewise from the source when accessing the content. But this depends on the implementation of the content object in the backend.

In order to load the whole data of a content into memory at once, you can use the pipeline util `@convert`. 

:::warning
Dont do this for big files since this could lead to an out of memory! So a content object is also a "gatekeeper" in order to make sure, big data is only loaded when required and then by default in a streamed way. Not as a whole.
:::

Here is an example in order to load a small, well known document:


```yaml
pipeline:
  - drive.read:
      path: "person.json"
  - set.body:
        value: "#{@convert.toJson(body.content)}"
```

:::info
If not configured otherwise, by default, the data of a content object in the body of a pipeline is automatically streamed to the caller at the end of the pipeline.
:::

## Writing content

When it comes to writing content, you can use a command which can convert a given object to an internal content object like `drive.save` for example or you can convert explicitely to a content object using one of the `@content` utility methods.

Some examples:

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

This base64 encoded document is automatically converted to target format and then stored at drive. The name of the is read from the embedded content JSON. Therefore there is no need to specify the `path` attribute here. If we would like to store the document at a specific folder we could additionally set this using the `path` attribute:

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


## Collection

In case multiple files are loaded into a pipeline, such documents are grouped together in a so called content object **collection**. Such a collection has a similar meaning like a folder has in a local file system.

|     |     |     |
| --- | --- | --- |
| **Attribute** | **Type** | **Description** |
| `parent` | ContentCollection | Returns the parent collection if this is a nested collection, or null in case this is the root collection. |
| `path` | string | Returns the path to this collection, whereas `/` is returned in case it is the root collection. Example: `/rootCol/subCol`. |
| `children` | ContentObject | Returns a list of all content objects which are contained in the collection. This can not only be a document, but also another content collection in case they are nested. |

A Content Collection is also a [Content Object](#) and therefore it also has all attributes of the Content Object.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::
