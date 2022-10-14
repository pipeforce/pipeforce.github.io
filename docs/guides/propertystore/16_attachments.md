---
title: Property Attachments
sidebar_label: Property Attachments
---
<p class="theme-doc-version-badge badge badge--secondary">Since Version: 1.0</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Properties** in the **Property Store** are objects of metadata. Sometimes, it is necessary to enrich this metadata and link it with binary data like documents or images for example. This is where **Property Attachments** come in place: Property Attachments (or just Attachments for short) contain binary block data and are always linked to exactly one Property. The storage of the binary data of Attachments can heavily scale and its data size be theoretically be unlimited. Each Property can have `0..n` Attachments assigned.

![](../../img/property-attachments.png)

:::note
Even if it is possible to store binary data as Base64 encoded metadata value to a Property, you should consider to add them as Attachment to a Property instead. Especially if the size of this data is > 100KB, since data in Attachments can be organized in a much more effective way in the backend so performance is better.
:::

## Create an Attachment (<=10MB)

Before you can add binary data to an Attachment, you have to create it first and link it to an existing Property, using the command [`property.attachment.put`](/docs/api/commands#propertyattachmentput-v1). 

Let's consider an example of a an job applicant, which is modelled as a Property and exists inside the Property Store under key `global/app/jobs/applicant/1`. For this applicant now a CV given as PDF local file `my-cv.pdf`  must be added as Attachment. You can do so, by executing the command `property.attachment.put` like one of these calls:

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl -u 'username:password' \
  -H 'Content-Type: application/pdf' \
  -X POST 'https://hub-<your-domain>/api/v3/command/property.attachment.put?key=global/app/jobs/applicant/1&name=my-cv.pdf' \
  --data-binary "@/local/path/my-cv.pdf"
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
pi command property.attachment.put key=global/app/jobs/applicant/1 name=my-cv.pdf -files /local/path/my-cv.pdf
```

</TabItem>
<TabItem value="http" label="HTTP">

```
POST /api/v3/command/property.attachment.put?key=global/app/jobs/applicant/1&name=my-cv.pdf HTTP/1.1
Host: hub-<your-domain>
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
Content-Type: application/pdf
Content-Length: 22

<raw data of my-cv.pdf here>
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');
var data = '<raw data of my-cv.pdf here>';

var config = {
  method: 'post',
  url: 'https://hub-<your-domain>/api/v3/command/property.attachment.put?key=global/app/jobs/applicant/1&name=my-cv.pdf',
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

url = "https://hub-<your-domain>/api/v3/command/property.attachment.put?key=global/app/jobs/applicant/1&name=my-cv.pdf"

payload = "<raw data of my-cv.pdf here>"
headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=',
  'Content-Type': 'application/pdf'
}

response = requests.request("POST", url, headers=headers, data=payload)
```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-<your-domain>/api/v3/command/property.attachment.put?key=global/app/jobs/applicant/1&name=my-cv.pdf")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .header("Content-Type", "application/pdf")
  .body("<raw data of my-cv.pdf here>")
  .asString();
```

</TabItem>
</Tabs>

Such a call will do two things at once: It creates a new Attachment object with name `my-cv.pdf` and attaches it to the Property with key `global/app/jobs/applicant/1`. Then, it uploads and stores the PDF data at server side by reading the content from the body.

This approach is fast and easy for files with size up to 10 MB. For files bigger than 10 MB, you need chunked uploads.

## Create an Attachment (>10MB)

Since the size of a single request is limited to max. 10 MB, in case you need to add Attachments with content size bigger than this, you must use chunked uploads instead.

In the backend, the binary data of an Attachment is always split up into blocks, called **chunks**. Each Attachment will have one to many chunks assigned. Each chunk is by default up to 10 MB. In case an Attachment has no chunk assigned, it's size is `0`:

![](../../img/property-attachments-chunks.png)

Where content is finally saved, depends on the backend implementation. This picture should give you just a basic understanding about the relation between these core objects of the Property Store. 

When it comes to uploading Attachments of size > 10 MB, you need to implement in your client code a routine similar to this:

:::tip Chunked Upload
 1. Create an empty attachment using the command [`property.attachment.put`](/docs/api/commands#propertyattachmentput-v1).
 2. Read the local file to be uploaded, extract a chunk up to 10 MB from it and upload it using the command [`property.attachment.chunk.put`](/docs/api/commands#propertyattachmentchunkput-v1).
 3. Repeat 2. until all chunks are uploaded. 
:::

Let's use the job applicant example from above and let's assume, the applicant wants to add an introduction movie as Attachment which is around 100 MB big in size. Creating an empty Attachment for this could look liks this example:

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl -u 'username:password' \
  -X POST 'https://hub-<your-domain>/api/v3/command/property.attachment.put?key=global/app/jobs/applicant/1&name=my-cv.mp4&contentType=video/mp4'
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
pi command property.attachment.put key=global/app/jobs/applicant/1 name=my-cv.mp4
```

</TabItem>
<TabItem value="http" label="HTTP">

```
POST /api/v3/command/property.attachment.put?key=global/app/jobs/applicant/1&name=my-cv.mp4&contentType=video/mp4 HTTP/1.1
Host: hub-<your-domain>
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
Content-Length: 0

```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');

var config = {
  method: 'post',
  url: 'https://hub-<your-domain>/api/v3/command/property.attachment.put?key=global/app/jobs/applicant/1&name=my-cv.mp4&contentType=video/mp4',
  headers: { 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=', 
  },
  data : null
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

url = "https://hub-<your-domain>/api/v3/command/property.attachment.put?key=global/app/jobs/applicant/1&name=my-cv.mp4&contentType=video/mp4"

headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=',
}

response = requests.request("POST", url, headers=headers, data=None)
```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-<your-domain>/api/v3/command/property.attachment.put?key=global/app/jobs/applicant/1&name=my-cv.mp4&contentType=video/mp4")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .asString();
```

</TabItem>
</Tabs>

Instead of sending this as HTTP POST, you could also use an HTTP GET. See [HTTP API](/docs/guides/commands_pipelines/http_api) for more options. After the empty Attachment has been created, sending a single chunk could look like this example:

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl -u 'username:password' \
  -H 'Content-Type: application/octet-stream' \
  -X POST 'https://hub-<your-domain>/api/v3/command/property.attachment.chunk.put?key=global/app/jobs/applicant/1&name=my-cv.pdf' \
  --data-binary "@/local/path/chunk01"
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
pi command property.attachment.chunk.put key=global/app/jobs/applicant/1 name=my-cv.pdf -files /local/path/chunk01
```

</TabItem>
<TabItem value="http" label="HTTP">

```
POST /api/v3/command/property.attachment.put?key=global/app/jobs/applicant/1&name=my-cv.pdf HTTP/1.1
Host: hub-<your-domain>
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
Content-Type: application/octet-stream
Content-Length: 22

<raw data of chunk01 here>
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');
var data = '<raw data of chunk01 here>';

var config = {
  method: 'post',
  url: 'https://hub-<your-domain>/api/v3/command/property.attachment.chunk.put?key=global/app/jobs/applicant/1&name=my-cv.pdf',
  headers: { 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=', 
    'Content-Type': 'application/octet-stream'
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

url = "https://hub-<your-domain>/api/v3/command/property.attachment.chunk.put?key=global/app/jobs/applicant/1&name=my-cv.pdf"

payload = "<raw data of chunk01 here>"
headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=',
  'Content-Type': 'application/octet-stream'
}

response = requests.request("POST", url, headers=headers, data=payload)
```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-<your-domain>/api/v3/command/property.attachment.chunk.put?key=global/app/jobs/applicant/1&name=my-cv.pdf")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .header("Content-Type", "application/octet-stream")
  .body("<raw data of chunk01 here>")
  .asString();
```

</TabItem>
</Tabs>

This needs to be repeated until all content has been uploaded. In this example, the parameter `index` is omitted. In this case, the chunk index is automatically calculated. Also note to set the `Content-Type` to `application/octet-stream`.

## Download Attachment

In order to download the content of an Attachment, you can use the command `property.attachment.content` which will stream the whole content of the Attachment as as one single file to the client. The chunks will be concatenated automatically in the backend.

Here is an example to download the file `my-cv.pdf` from the upload example above as one single content stream:

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl -u 'username:password' \
  -X GET 'https://hub-<your-domain>/api/v3/command/property.attachment.content?key=global/app/jobs/applicant/1&name=my-cv.pdf'
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
pi command property.attachment.content key=global/app/jobs/applicant/1 name=my-cv.pdf
```

</TabItem>
<TabItem value="http" label="HTTP">

```
GET /api/v3/command/property.attachment.content?key=global/app/jobs/applicant/1&name=my-cv.pdf HTTP/1.1
Host: hub-<your-domain>
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://hub-<your-domain>/api/v3/command/property.attachment.content?key=global/app/jobs/applicant/1&name=my-cv.pdf',
  headers: { 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=', 
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

url = "https://hub-<your-domain>/api/v3/command/property.attachment.content?key=global/app/jobs/applicant/1&name=my-cv.pdf"

headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
}

response = requests.request("GET", url, headers=headers, data=None)
```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<File> response = Unirest.get("https://hub-<your-domain>/api/v3/command/property.attachment.content?key=global/app/jobs/applicant/1&name=my-cv.pdf")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .asFile("/local/path/my-cv.pdf");
```

</TabItem>
</Tabs>


## Download Attachment (chunked)

For big Attachments > ~20 MB it makes sense to use chunked download, if possible in order to reduce system load and increase download speed. Furthermore you can easily implemnt pause and resume and do integrity checks per chunk. In this approach you first have to load the number of chunks of the Attachment using the command `property.attachment.get` and then you can call the command `property.attachment.chunk.content` for each index. At client side you have to merge the chunks finally into a single file. Here is an example how to download a the chunk at index `0`:

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl -u 'username:password' \
  -X GET 'https://hub-<your-domain>/api/v3/command/property.attachment.chunk.content?key=global/app/jobs/applicant/1&name=my-cv.pdf&index=0'
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
pi command property.attachment.chunk.content key=global/app/jobs/applicant/1 name=my-cv.pdf index=0
```

</TabItem>
<TabItem value="http" label="HTTP">

```
GET /api/v3/command/property.attachment.chunk.content?key=global/app/jobs/applicant/1&name=my-cv.pdf&index=0 HTTP/1.1
Host: hub-<your-domain>
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://hub-<your-domain>/api/v3/command/property.attachment.chunk.content?key=global/app/jobs/applicant/1&name=my-cv.pdf&index=0',
  headers: { 
    'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=', 
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

url = "https://hub-<your-domain>/api/v3/command/property.attachment.chunk.content?key=global/app/jobs/applicant/1&name=my-cv.pdf&index=0"

headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
}

response = requests.request("GET", url, headers=headers, data=None)
```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<File> response = Unirest.get("https://hub-<your-domain>/api/v3/command/property.attachment.chunk.content?key=global/app/jobs/applicant/1&name=my-cv.pdf&index=0")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .asFile("/local/path/chunk1");
```

</TabItem>
</Tabs>

### Integrity check

In order to do an integrity check of the chunks downloaded, you can use response header `Digest` which is sent with the response and contains the MD5 checksum of the downloaded chunk in format `md5=<hexadecimal>`, for example `Digest: md5=3ead0df0186e96d94d5ab025c282ed1f`.

You can then calculate the same checksum of your downloaded chunk and compare it with the digest value from the header. If they do not match, delete the local chunk and download again.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::