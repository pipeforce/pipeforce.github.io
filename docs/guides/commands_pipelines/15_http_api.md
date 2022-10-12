# HTTP API

 Commands and pipelines can be executed using a HTTP API which is similar to RESTful endpoints. The HTTP request methods `POST` and `GET`, the HTTP header `Content-Type` and the request body define, how commands and pipelines are executed and which parameters and message body values are set.

 The return value depends on the command or the pipeline and is mostly a JSON document.  

 It's important to understand, that you have two options to call the backend using the HTTP API:

   - A single Command
   - A chain of Commands using a Pipeline script

Below, these two options will be explained in more detail.

## HTTP API for single commands calls 

 You can call a single command using a HTTP request with the endpoint `/api/v3/command/{name}` wheras `{name}` needs to be replaced by the name of the command. The optional request parameters will become the command parameters. See [here](/docs/api/commands) for a reference of all built-in commands. Using the request header `Content-Type` and the request body, you can optionally set the message body for the command.

### HTTP Methods 

You can call the command endpoint `/command/{name}` using different HTTP options:

|Method|`Content-Type`|Request Body|Message Body|Execution|
|---|---|---|---|---|
|`GET`|*None*|*None* |*None*|A single command given by `{name}` with paremters set from request parameters and a `null` body.
|`POST`|`application/json`|A JSON data document|A parsed JSON data object|A single command given by `{name}` with paremters set from request parameters and the JSON object in the body.
|`POST`|`multipart/form-data`|One or more parts with `name="file"` in the content disposition header. See [how HTTP multipart works](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST). |[Content Collection](/docs/guides/contentobject) with each entry referencing a part data.|A single command given by `{name}` with paremters set from request parameters and a content collection in the body.
|`POST`|*Any*|Any (binary) data format as specified by the `Content-Type` Note: Additionally the header `Content-Length` is mandatory in this case. |[Content Object](/docs/guides/contentobject) referencing the data in the request body as a stream.|A single command given by `{name}` with paremters set from request parameters and a content object in the body. This is the most effective way of uploading large data to a command.

### Example 1: No body

In case you would like to execute a single command without a body, you could execute a curl like this:

```bash
curl -u "username:password" \
  -X GET "https://hub-trial.pipeforce.org/api/v3/command/log?message=HELLO"
```

### Example 2: With JSON in body

In case you would like to execute a single command with a JSON document as body data, you could execute this curl:

```bash
curl -u 'username:password' \
  -H 'Content-Type: application/json'
  -X POST 'https://hub-trial.pipeforce.org/api/v3/command/property.put?key=someKey' \
  -d '{"name": "someValue"}'
```

### Example 3: With binary data in body

In case you would like to execute a single command with a binary data in the body, you could execute this curl, which uploads the content of a local PDF file to a command:

```bash
curl -u 'username:password' \
  -H 'Content-Type: application/pdf'
  -X POST 'https://hub-trial.pipeforce.org/api/v3/command/property.attachment.put?key=someKey&name=my.pdf' \
  --data-binary "@my.pdf"
```

### Example 4: With multipart body

In case you would like to execute a single command with multiple parts (files) uploaded and provided in the body, you can use a curl like this:

TODO

## HTTP API for pipeline calls

  Another option to call the backend is to define a chain of multiple commands to be executed in a pipeline script and run this pipeline script by a single HTTP `POST` to `/pipeline`. Again by using the request header `Content-Type` and the request body, you can optionally set the body data for the pipeline.

### HTTP Methods

You can call the command endpoint `/pipeline` using different HTTP options:

|Method|`Content-Type`|Request Body|Message Body|Execution|
|---|---|---|---|---|
|`POST`|`application/json`|A JSON pipeline document.|`null` or set by the `body` section of the pipeline.|A pipeline set as JSON from the request body.
|`POST`|`application/yaml`|A YAML pipeline document.|`null` or set by the `body` section of the pipeline.|A pipeline set as YAML from the request body.
|`POST`|`multipart/form-data`|One part with `name="pipeline"` with a YAML pipeline and one or more parts with `name="file"` in the content disposition header. See [how HTTP multipart works](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST).|Content Collection referencing all `file`parts. |A pipeline set as YAML from the `pipeline` part and with a content collection created from all `file` parts of the request body.

:::tip Note
Using the HTTP methd `GET` with the `/pipeline` endpoint is not possible and will cause an error.
:::


### Example 1: No body

In case you would like to execute a pipeline YAML script without body, you can use this curl:

```bash
curl -X POST "https://hub-ns.pipeforce.net/api/v3/pipeline" \
  -H "Content-Type: application/yaml" \
  -u "username:password" \
  --data-binary @- << EOF
pipeline:
 - drive.read:
     path: /my.pdf
 - pdf.stamp:
     text: "Hello World!"
 - drive.save:
     path: /my-stamped.pdf
EOF
```

### Example 2: With body embedded

In case you would like to execute a pipeline YAML script with body, which is embedded inside the YAML, you can use this curl:

```bash
curl -X POST "https://hub-ns.pipeforce.net/api/v3/pipeline" \
  -H "Content-Type: application/yaml" \
  -u "username:password" \
  --data-binary @- << EOF
pipeline:
  - log:
      message: "BODY: #{body.text}"

body: {"text": "Hello World!"}
EOF
```

### Example 3: With body

Since a pipeline request with body data always requires at least two parts (pipeline part and at least one data part) in the request body, see [Pipeline YAML (Multipart Body)](#pipeline-yaml-multipart-body) below. 

### Example 4: With multipart body

Here’s an example of an HTTP multipart request as defined by the HTTP specification. This example does multiple steps in one request: It uploads a PDF, puts a new text on the PDF and then stores it at server side:

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

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::