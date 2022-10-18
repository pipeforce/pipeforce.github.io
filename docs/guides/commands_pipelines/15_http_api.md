---
title: HTTP API - Commands & Pipeline
sidebar_label: HTTP API
---
<p class="theme-doc-version-badge badge badge--secondary">Since Version: 1.0</p>

:::tip Also see 
 - [Introduction to Commands & Pipelines](/docs/commands_pipelines)
 - [PIPEFORCE HTTP API Reference](http://docs.pipeforce.io/api.html)
 - [Commands Reference](/docs/api/commands)
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

 Commands and pipelines can be executed using a HTTP API which is similar to RESTful endpoints. The HTTP request methods `POST` and `GET`, the HTTP header `Content-Type` and the request body define, how commands and pipelines are executed and which parameters and message body values are set.

 The return value depends on the command or the pipeline and is mostly a JSON document.  

 It's important to understand, that you have two options to call the backend using the HTTP API:

   - A single Command
   - A chain of Commands using a Pipeline script

Below, these two options will be explained in more detail.


## HTTP API for single commands calls 

 You can call a single command using a HTTP request with the endpoint 
 ```
 /api/v3/command/<name>
 ``` 
 Whereas `<name>` needs to be replaced by the name of the command. The optional request parameters will become the command parameters. See [here](/docs/api/commands) for a reference of all built-in commands and their parameters. Using the request header `Content-Type` and the request body, you can optionally set the message body for the command.

### HTTP Methods 

In order to execute a command on the backend, you need to send a HTTP request to the endpoint `/api/v3/command/<name>` by using one of these HTTP options:

|HTTP Method|`Content-Type` |Request Body|Message Body|Execution|
|---|---|---|-----|---|
|*is set to*|*is set to*|*is set to*|*will become*|*is*|
|`GET`|*None*|*None* |*None*|A single command given by `<name>` with parameters set from request parameters and a `null` body. See [Example](#example-1-no-body).
|`POST`|`application/json`|A JSON data document|A parsed JSON data object|A single command given by `<name>` with parameters set from request parameters and the JSON object in the body. See [Example](#example-2-with-json-in-body).
|`POST`|*Any*|Any (binary) data format as specified by the `Content-Type` Note: Additionally the header `Content-Length` is mandatory in this case. |[Content Object](/docs/guides/contentobject) referencing the data in the request body as a stream.|A single command given by `<name>` with parameters set from request parameters and a content object in the body. This is the most effective way of uploading large data to a command. See [Example](#example-3-with-binary-data-in-body)
|`POST`|`multipart/form-data`|One or more parts with `name="file"` in the content disposition header. See [how HTTP multipart works](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST). |[Content Collection](/docs/guides/contentobject) with each entry referencing a part data.|A single command given by `<name>` with parameters set from request parameters and a content collection in the body. See [Example](#example-4-with-multipart-body)


### Example 1: No body

In case you would like to execute a single command without a body, you could run it like this:


<Tabs>
<TabItem value="curl" label="Curl">

```bash
curl -u 'username:password' \
  'https://hub-try.pipeforce.org/api/v3/command/message.send?key=slack&payload=HELLO'
```

</TabItem>
<TabItem value="http" label="HTTP">

```
GET /api/v3/command/message.send?key=slack&payload=HELLO HTTP/1.1
Host: hub-try.pipeforce.org
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://hub-try.pipeforce.org/api/v3/command/message.send?key=slack&payload=HELLO',
  headers: { 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://hub-try.pipeforce.org/api/v3/command/message.send?key=slack&payload=HELLO"

payload = {}
headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
}

response = requests.request("GET", url, headers=headers, data=payload)

```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.get("https://hub-try.pipeforce.org/api/v3/command/message.send?key=slack&payload=HELLO")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .asString();
```

</TabItem>
</Tabs>

This example simply sends a new message to the message broker with key `slack` and with message payload `HELLO`. 

### Example 2: With JSON in body

In case you would like to execute a single command with a JSON document as body data, you could execute this curl:

<Tabs>
<TabItem value="curl" label="Curl">

```bash
curl -u 'username:password' \
  -H 'Content-Type: application/json' \
  -X POST 'https://hub-try.pipeforce.org/api/v3/command/property.put?key=some/key' \
  -d '{"name": "someValue"}'
```

</TabItem>
<TabItem value="http" label="HTTP">

```
POST /api/v3/command/property.put?key=some/key HTTP/1.1
Host: hub-try.pipeforce.org
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
Content-Type: application/json
Content-Length: 21

{"name": "someValue"}
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');
var data = JSON.stringify({
  "name": "someValue"
});

var config = {
  method: 'post',
  url: 'https://hub-try.pipeforce.org/api/v3/command/property.put?key=some/key',
  headers: { 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests
import json

url = "https://hub-try.pipeforce.org/api/v3/command/property.put?key=some/key"

payload = json.dumps({
  "name": "someValue"
})
headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)
```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-try.pipeforce.org/api/v3/command/property.put?key=some/key")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .header("Content-Type", "application/json")
  .body("{\"name\": \"someValue\"}")
  .asString();
```

</TabItem>
</Tabs>

### Example 3: With binary data in body

In case you would like to execute a single command with a binary data in the body, you could execute this curl, which uploads the content of a local PDF file to a command:

<Tabs>
<TabItem value="curl" label="Curl">

```bash
curl -u 'username:password' \
  -H 'Content-Type: application/pdf' \
  -X POST 'https://hub-try.pipeforce.org/api/v3/command/property.attachment.put?key=some/key&name=my.pdf' \
  --data-binary "@my.pdf"
```

</TabItem>
<TabItem value="http" label="HTTP">

```
POST /api/v3/command/property.attachment.put?key=some/key&name=my.pdf HTTP/1.1
Host: hub-try.pipeforce.org
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
Content-Type: application/pdf
Content-Length: 22

<raw data of my.pdf here>
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');
var data = '<raw data of my.pdf here>';

var config = {
  method: 'post',
  url: 'https://hub-try.pipeforce.org/api/v3/command/property.attachment.put?key=some/key&name=my.pdf',
  headers: { 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=', 
    'Content-Type': 'application/pdf'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://hub-try.pipeforce.org/api/v3/command/property.attachment.put?key=some/key&name=my.pdf"

payload = "<raw data of my.pdf here>"
headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=',
  'Content-Type': 'application/pdf'
}

response = requests.request("POST", url, headers=headers, data=payload)
```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-try.pipeforce.org/api/v3/command/property.attachment.put?key=some/key&name=my.pdf")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .header("Content-Type", "application/pdf")
  .body("<raw data of my.pdf here>")
  .asString();
```

</TabItem>
</Tabs>

### Example 4: With multipart body

In case you would like to execute a single command with multiple parts (files) uploaded and provided in the body, you can run this:

<Tabs>
<TabItem value="curl" label="Curl">

```bash
curl -u 'username:password' \
  -X POST 'https://hub-try.pipeforce.org/api/v3/command/property.attachment.put?key=some/key'  \
  -F file=@my1.pdf \
  -F file=@my2.pdf
```

</TabItem>
<TabItem value="http" label="HTTP">

```http
POST /api/v3/command/property.attachment.put?key=some/key HTTP/1.1
Host: hub-try.pipeforce.org
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
Content-Length: 318
Content-Type: multipart/form-data; boundary=----Boundary7MA4YWxkTrZu0gW

----Boundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="my1.pdf"
Content-Type: application/pdf

<raw data of my1.pdf here>
----Boundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="my2.pdf"
Content-Type: application/pdf

<raw data of my2.pdf here>
----Boundary7MA4YWxkTrZu0gW--

```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('file', fs.createReadStream('/my1.pdf'));
data.append('file', fs.createReadStream('/my2.pdf'));

var config = {
  method: 'post',
  url: 'https://hub-try.pipeforce.org/api/v3/command/property.attachment.put?key=some/key',
  headers: { 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://hub-try.pipeforce.org/api/v3/command/property.attachment.put?key=some/key"

payload={}
files=[
  ('file',('my1.pdf',open('/my1.pdf','rb'),'application/pdf')),
  ('file',('my2.pdf',open('/my2.pdf','rb'),'application/pdf'))
]
headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
}

response = requests.request("POST", url, headers=headers, data=payload, files=files)
```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-try.pipeforce.org/api/v3/command/property.attachment.put?key=some/key")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .field("file", new File("/my1.pdf"))
  .field("file", new File("/my2.pdf"))
  .asString();
```

</TabItem>
</Tabs>

This example will upload two files `my1.pdf` and `my2.pdf` and add them as attachments to the property with key `some/key`. For more details, how multipart HTTP POST requests work, see the [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST).

## HTTP API for adhoc pipeline calls

  Another option to call the backend is to define a chain of commands to be executed in an adhoc pipeline and run this by sending it via HTTP `POST` request to 
  ```
  /api/v3/pipeline
  ```
  Again by using the request header `Content-Type` and the request body, you can optionally set the body data for the pipeline.

### HTTP Methods

In order to execute a pipeline script on the backend, you need to send via HTTP POST request to the endpoint `/api/v3/pipeline` by using one of these HTTP options:

|HTTP Method|`Content-Type` |Request Body|Message Body|Execution|
|---|---|---|-----|---|
|*is set to*|*is set to*|*is set to*|*will become*|*is*|
|`POST`|`application/json`|A JSON pipeline document.|`null` or the value set by the `body` section of the pipeline.|A pipeline set as JSON from the request body. 
|`POST`|`application/yaml`|A YAML pipeline document.|`null` or the value set by the `body` section of the pipeline.|A pipeline set as YAML from the request body. See examples with [no body](#example-5-no-body) and [embedded body](#example-6-with-body-embedded).
|`POST`|`application/x-www-form-urlencoded`|The pipeline as URL encoded request query string whereas the key of each parameter is the command name and the value defines the parameters to the command. Key and value must be separated by a colon `:`. Multiple command parameters are separated by semicolon `;`. Example (before url encoding): `log=message:'Hello World!';level:INFO`|`null`|A pipeline set as URL encoded query string from the request body. See example with [url encoded query](#example-7-with-url-encoded-pipeline).
|`POST`|*None*|A YAML pipeline document (same as with `application/yaml`).|`null` or the value set by the `body` section of the pipeline.|A pipeline set as YAML from the request body. Any other format in the body will throw an `400` bad request error.
|`POST`|`multipart/form-data`|One part with `name="pipeline"` with a YAML pipeline and one or more parts with `name="file"` in the content disposition header. See [how HTTP multipart works](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST).|Content Collection referencing all `file`parts. |A pipeline set as YAML from the `pipeline` part and with a content collection in the body created from all `file` parts of the request body. See [Example](#example-8-with-multipart-body).

:::warning Note
Using the HTTP methd `GET` with the `/pipeline` endpoint is not possible and will cause an error.
:::


### Example 5: No body

In case you would like to execute a pipeline YAML script without a message body, you can run this:

<Tabs>
<TabItem value="curl" label="Curl">

```bash
curl -u 'username:password' \
  -X POST "https://hub-try.pipeforce.org/api/v3/pipeline" \
  -H "Content-Type: application/yaml" \
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

</TabItem>
<TabItem value="http" label="HTTP">

```
POST /api/v3/pipeline HTTP/1.1
Host: hub-try.pipeforce.org
Content-Type: application/yaml
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
Content-Length: 143

pipeline:
    - drive.read:
        path: /my.pdf
    - pdf.stamp:
        text: "Hello World!"
    - drive.save:
        path: /my-stamped.pdf
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');
var data = "pipeline:\n" +
            "    - drive.read:\n" +
            "        path: /my.pdf\n" +
            "    - pdf.stamp:\n" +
            "        text: \"Hello World!\"\n" +
            "    - drive.save:\n" +
            "        path: /my-stamped.pdf";

var config = {
  method: 'post',
  url: 'https://hub-try.pipeforce.org/api/v3/pipeline',
  headers: { 
    'Content-Type': 'application/yaml', 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://hub-try.pipeforce.org/api/v3/pipeline"

payload = """pipeline:
  - drive.read:       
      path: /my.pdf    
  - pdf.stamp:        
      text: "Hello World!"    
  - drive.save:        
      path: "/my-stamped.pdf" """

headers = {
  'Content-Type': 'application/yaml',
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
}

response = requests.request("POST", url, headers=headers, data=payload)

```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-try.pipeforce.org/api/v3/pipeline")
  .header("Content-Type", "application/yaml")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .body("pipeline:\n" +
            "    - drive.read:\n" +
            "        path: /my.pdf\n" +
            "    - pdf.stamp:\n" +
            "        text: \"Hello World!\"\n" +
            "    - drive.save:\n" +
            "        path: /my-stamped.pdf")
  .asString();
```

</TabItem>
</Tabs>

### Example 6: With body embedded

In case you would like to execute a pipeline YAML script with message body, which is embedded inside the YAML, you can run this:

<Tabs>
<TabItem value="curl" label="Curl">

```bash
curl -u 'username:password' \
  -X POST "https://hub-try.pipeforce.org/api/v3/pipeline" \
  -H "Content-Type: application/yaml" \
  --data-binary @- << EOF
pipeline:
  - log:
      message: "BODY: #{body.text}"

body: {"text": "Hello World!"}
EOF
```

</TabItem>
<TabItem value="http" label="HTTP">

```
POST /api/v3/pipeline HTTP/1.1
Host: hub-try.pipeforce.org
Content-Type: application/yaml
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
Content-Length: 86

pipeline:
  - log:
      message: "BODY: #{body.text}"

body: {"text": "Hello World!"}
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');
var data = 'pipeline:\n  - log:\n      message: "BODY: #{body.text}"\n\nbody: {"text": "Hello World!"}';

var config = {
  method: 'post',
  url: 'https://hub-try.pipeforce.org/api/v3/pipeline',
  headers: { 
    'Content-Type': 'application/yaml', 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://hub-try.pipeforce.org/api/v3/pipeline"

payload = """pipeline:  
  - log:      
      message: "BODY: #{body.text}"
  body: {"text": "Hello World!"}"""
headers = {
  'Content-Type': 'application/yaml',
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
}

response = requests.request("POST", url, headers=headers, data=payload)
```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-try.pipeforce.org/api/v3/pipeline")
  .header("Content-Type", "application/yaml")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .body("pipeline:\n  " + 
          "- log:\n" +
          "      message: \"BODY: #{body.text}\"\n\n" + 
          "body: {\"text\": \"Hello World!\"}")
  .asString();
```

</TabItem>
</Tabs>


### Example 7: With url encoded pipeline  

In this example, a simple adhoc pipeline is called using an [url encoded query string](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST). 

The query string before encoding looks like this:

```
datetime=format:dd.MM.YY&set.body=value:"Today is: #{body}"
```
 - Multiple commands are separated by `&`.
 - The query parameter name is the command name (for example `datetime`).
 - The query parameter value specify the parameters to the command as `<key>:<value>` pairs. The value can optionally be put into 'single' or "double" quotes.
 - Multiple `<key>:<value>` pairs must be separated by `;`

Below you can find the example with the url encoded query string (only values parts must be encoded!):
 
<Tabs>
<TabItem value="curl" label="Curl">

```bash
curl -u 'username:password' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -X POST 'https://hub-<your-domain>/api/v3/pipeline' \
  -d 'datetime=format%3Add.MM.YY&set.body=value%3A%20%22Today%20is%3A%20%23%7Bbody%7D%22'
```

</TabItem>
<TabItem value="http" label="HTTP">

```
POST /api/v3/pipeline HTTP/1.1
Host: hub-<your-domain>
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
Content-Type: application/x-www-form-urlencoded
Content-Length: 82

datetime=format%3Add.MM.YY&set.body=value%3A%20%22Today%20is%3A%20%23%7Bbody%7D%22
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');
var data = 'datetime=format%3Add.MM.YY&set.body=value%3A%20%22Today%20is%3A%20%23%7Bbody%7D%22';

var config = {
  method: 'post',
  url: 'https://hub-<your-domain>/api/v3/pipeline',
  headers: { 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=', 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests
import json

url = "https://hub-<your-domain>/api/v3/pipeline"

payload = "datetime=format%3Add.MM.YY&set.body=value%3A%20%22Today%20is%3A%20%23%7Bbody%7D%22"
headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=',
  'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("POST", url, headers=headers, data=payload)
```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-<your-domain>/api/v3/pipeline")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .header("Content-Type", "application/x-www-form-urlencoded")
  .body("datetime=format%3Add.MM.YY&set.body=value%3A%20%22Today%20is%3A%20%23%7Bbody%7D%22")
  .asString();
```

</TabItem>
</Tabs>

### Example 8: With multipart body

Let's assume you would like to execute a pipeline script and additionally processing one or more files in this same pipeline which must be placed in the body.

Here’s an example of an HTTP multipart request as defined by the HTTP specification. This example does multiple steps in one request: It uploads a PDF, puts a new text on this PDF and finally stores it at server side:

<Tabs>
<TabItem value="curl" label="Curl">

```bash
curl -u 'username:password' \
  -X POST 'https://hub-try.pipeforce.org/api/v3/pipeline' \
  -F 'pipeline="pipeline:
        - pdf.stamp:
            text: \"Hello World!\"
        - drive.save:
            path: /my-stamped.pdf "' \
  -F 'file=@/my1.pdf' \
```

</TabItem>
<TabItem value="http" label="HTTP">

```
POST /api/v3/pipeline HTTP/1.1 
Host: hub-acme.pipefore.net
Content-Type: multipart/form-data;boundary="boundary" 

--boundary 
Content-Disposition: form-data; name="pipeline" 

pipeline:
 - pdf.stamp:
     text: "Hello World!"
 - drive.save:
     path: /my-stamped.pdf 
--boundary 
Content-Disposition: form-data; name="file"; filename="my1.pdf" 

<raw data of my1.pdf here>
--boundary--
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('pipeline', "pipeline:\n" +
            " - pdf.stamp:\n" +
            "     text: \"Hello World!\"\n" +
            " - drive.save:\n" +
            "     path: /my-stamped.pdf");
data.append('file', fs.createReadStream('/my1.pdf'));

var config = {
  method: 'post',
  url: 'https://hub-try.pipeforce.org/api/v3/pipeline',
  headers: { 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://hub-try.pipeforce.org/api/v3/pipeline"

payload = {'pipeline': '''pipeline:
 - pdf.stamp:
     text: "Hello World!"
 - drive.save:
     path: /my-stamped.pdf '''}
files=[
  ('file',('my1.pdf',open('/my1.pdf','rb'),'application/pdf')),
]
headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-try.pipeforce.org/api/v3/pipeline")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .field("pipeline", "pipeline:\n" +
            " - pdf.stamp:\n" +
            "     text: \"Hello World!\"\n" +
            " - drive.save:\n" +
            "     path: /my-stamped.pdf")
  .field("file", new File("/my1.pdf"))
  .asString();
```

</TabItem>
</Tabs>

:::tip Note
Note that the pipeline has the part name `pipeline` and one or more files must all have the name `file`.
:::

## HTTP API for persisted pipeline calls

It is also possible to load and execute a pipline stored in the property store by sending a HTTP POST request to 

```
/api/v3/pipeline:<key>
```
Whereas `<key>` must be replaced by the property key of the pipeline to be executed.

Instead of using the property key, you can also set the uuid of the pipeline property:

```
/api/v3/pipeline:uuid:<uuid>
```

Whereas `<uuid>` must be replaced by the uuid of the pipeline property to be loaded and executed. This approach has the advantage that it will work even if the pipeline has been moved / renamed to a different key.

Any request parameter given will be set as variables to the pipeline.

In case there is a body in the request, it will be set as body to the pipeline. If header `ContentType` is set to `application/json` the body will be parsed to a JSON object and provided as such as pipeline body. Otherwise, the body will be provided as [content object](/docs/guides/contentobject).

### HTTP Methods

In order to execute a persisted pipeline on the backend, you need to send a HTTP POST request to the endpoint `/api/v3/pipeline:<key>` or `/api/v3/pipeline:uuid:<uuid>` by using one of these HTTP options:

|HTTP Method|`Content-Type` |Request Body|Message Body|Execution|
|---|---|---|-----|---|
|*is set to*|*is set to*|*is set to*|*will become*|*is*|
|`POST`|`application/json`|A JSON data document.|The JSON data document parsed to a JSON instance. | The persisted pipeline loaded from the property store using its key or uuid.
|`POST`|*Any*|Any data.|The data from the body provided as a content object|The persisted pipeline loaded from the property store using its key or uuid.
|`POST`|*None*|*None*|`null`|The persisted pipeline loaded from the property store using its key or uuid.


### Example 9: Execute persisted pipeline

In this example a pipeline persisted under key `global/app/myapp/pipeline/mypipeline` will be loaded and executed at the backend without any body an request parameters:

<Tabs>
<TabItem value="curl" label="Curl">

```bash
curl -u 'username:password' \
  -X POST 'https://hub-<your-domain>/api/v3/pipeline:global/app/myapp/pipeline/mypipeline'
```

</TabItem>
<TabItem value="http" label="HTTP">

```
POST /api/v3/pipeline:global/app/myapp/pipeline/mypipeline HTTP/1.1 
Host: hub-<your-domain>
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');
var FormData = require('form-data');

var config = {
  method: 'post',
  url: 'https://hub-<your-domain>/api/v3/pipeline:global/app/myapp/pipeline/mypipeline',
  headers: { 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://hub-<your-domain>/api/v3/pipeline:global/app/myapp/pipeline/mypipeline"

headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
}

response = requests.request("POST", url, headers=headers)

```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-<your-domain>/api/v3/pipeline:global/app/myapp/pipeline/mypipeline")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .asString();
```

</TabItem>
</Tabs>

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::