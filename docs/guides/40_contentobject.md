# Content Object

In order to process documents and other files using a pipeline, you first need to load such a file into the pipeline. After loading, the file is automatically converted into a format called "content object". This is a wrapper around a document which provides all required information for such a document, like its name size, mime type etc., for easier processing inside the pipeline. The content object provides these attributes:

## Attributes

|     |     |     |
| --- | --- | --- |
| **Attribute** | **Type** | **Description** |
| `name` | string | The name of the document. |
| `created` | long | The unix timestamp in millis when this document was created. |
| `lastUpdated` | long | The unix timetsmap in millis when this document was last modified. |
| `mimeType` | string | The mime type of this document. If `null`, it is assumed to be t`ext/plain` by default. See here for a list of official mime types: [https://www.iana.org/assignments/media-types/media-types.xhtml](https://www.iana.org/assignments/media-types/media-types.xhtml) |
| `size` | long | The size of the document in bytes or -1 in case the size cannot be determined. |
| `data` | object | The data of the document. Which format the data has depends on its mime type. For example, if mime type is `application/json`, then the data object returns a JSON document. |

Here is an example to load a file from the drive service into the body scope and then access its attributes of the content object from there:

```yaml
pipeline:
  # Load document from drive and set it as content object in the body
  - drive.read:
      path: "invoice.pdf"
  # Access the attributes of the content object in the body
  - log:
      message: "Name: #{body.name}, Size: #{body.size}" 
```

## Collection

In case multiple documents are loaded into a pipeline, such documents are grouped together in a so called content object **collection**. Such a collection has a similar meaning like a folder has in a local file system.

|     |     |     |
| --- | --- | --- |
| **Attribute** | **Type** | **Description** |
| `parent` | ContentCollection | Returns the parent collection if this is a nested collection, or null in case this is the root collection. |
| `path` | string | Returns the path to this collection, whereas `/` is returned in case it is the root collection. Example: `/rootCol/subCol`. |
| `children` | ContentObject | Returns a list of all content objects which are contained in the collection. This can not only be a document, but also another content collection in case they are nested. |

A Content Collection is also a [Content Object](#) and therefore it also has all attributes of the Content Object.
