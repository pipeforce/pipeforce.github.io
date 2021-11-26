# Content Object

Content Object

In order to process documents and other files using a pipeline, you first need to load such a file into the pipeline. After loaded, the file is automatically converted into a so called content object format. This is a wrapper around a document which provides all required information for such a document like its name size, mime type aso., for easier processing inside the pipeline. The content object provides these attributes:

|     |     |     |
| --- | --- | --- |
| **Attribute** | **Type** | **Description** |
| `name` | string | The name of the document. |
| `created` | long | The unix timestamp in millis when this document was created. |
| `lastUpdated` | long | The unix timetsmap in millis when this document was last modified. |
| `mimeType` | string | The mime type of this document. If `null`, it assumed to be t`ext/plain` by default. See here for a list of official mime types: [https://www.iana.org/assignments/media-types/media-types.xhtml](https://www.iana.org/assignments/media-types/media-types.xhtml) |
| `size` | long | The size of the document in bytes or -1 in case the size cannot be determined. |
| `data` | object | The data of the document. Which format the data has, depends on its mime type. For example if mime type is `application/json` then the data object returns here is a JSON document. |

Here is an example to load a file from the drive service into the body scope and access its attributes of the content object afterwards from there:

```
pipeline:
  # Load document from drive and set it as content object in the body
  - drive.read:
      path: "invoice.pdf"
  # Access the attributes of the content object in the body
  - log:
      message: "Name: #{body.name}, Size: #{body.size}" 
```

Content Object Collection
-------------------------

In case multiple documents are loaded into a pipeline, such documents are grouped together in a so called content object collection. Such a collection has a similar meaning like a folder in a local file system.

|     |     |     |
| --- | --- | --- |
| **Attribute** | **Type** | **Description** |
| `parent` | ContentCollection | Returns the parent collection if this is a nested collection or null in case this is the root collection. |
| `path` | string | Returns the path to this collection whereas `/` is returned in case it is the root collection. Example: `/rootCol/subCol`. |
| `children` | ContentObject | Returns a list of all content objects which are contained in the collection. This can be a document but also another content collection in case they are nested. |

A Content Collection is also a Content Object and therefore it also has all attributes of the Content Object.

Uploading a file
================

In order to upload a file and use it inside a command or pipeline you have different possibilities.

Upload a single file to a single command
----------------------------------------

In case a command expects a file as input message in its body, you can execute the command from the client using HTTP POST and put the file content in the body of the request. It will be loaded from the body and provided as input to the command’s body. Here’s an example request using the command `transform.word2pdf` which takes a `.docx` document as input converts it to PDF and sends back the result as response to the client:

```
POST /api/v3/pipe:transform.word2pdf HTTP/1.1 
Host: hub-acme.pipefore.net

BINARY DATA OF my.docx
```

Upload one or more files to a pipeline
--------------------------------------

In order to upload one or multiple files to be executed by a pipeline, you can make a HTTP POST request with header `Content-Type: multipart/form-data` to the pipeline endpoint. This will create a HTTP request with multiple parts in the HTTP request body, whereas the very first part is the pipeline YAML and all other parts are one or more files to be uploaded and used inside this pipeline.

Here’s an example of the body of such an HTTP multipart request as defined by the HTTP specification:

```
POST /api/v3/pipeline HTTP/1.1 
Host: hub-acme.pipefore.net
Content-Type: multipart/form-data;boundary="boundary" 

--boundary 
Content-Disposition: form-data; name="pipeline.yaml" 

pipeline:
 - pdf.stamp:
     text: "Hello World!"
 - drive.save:
     path: /my-stamped.pdf 
--boundary 
Content-Disposition: form-data; name="my.pdf"; filename="my.pdf" 

BINARY DATA OF my.pdf
--boundary--
```

This example defines a pipeline and a file upload in the multipart body. It uploads the file `my.pdf,` ads a stamp to it and then stores the result in the built-in data room called drive.

**The very first part in the body must be the pipeline definition.** Any subsequent part is then treated as a file to be uploaded and gets passed into the pipeline for processing.

### Uploading a file base64 encoded

Another way to upload a file to be used inside a pipeline is to “embed” the file base64 encoded inside the pipeline and upload this pipeline using HTTP POST:

```
POST /api/v3/pipeline HTTP/1.1 
Host: hub-acme.pipefore.net
Content-Type: "application/yaml"  

pipeline:
 - pdf.stamp:
     text: "Hello World!"
 - drive.save:
     path: /my-stamped.pdf 

body: "THE BASE64 ENCODED FILE CONTENT GOES HERE..."
```

The downside of this approach is that the base64 encoding of a file increases its size by about **33% percent**. Therefore you should avoid this approach if possible and use the multipart/form-data upload instead.