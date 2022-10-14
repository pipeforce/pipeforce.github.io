---
title: Property Tags
sidebar_label: Property Tags
---
<p class="theme-doc-version-badge badge badge--secondary">Since Version: 7.0</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A **Property Tag** can be used to group a set of **Properties** in the **Property Store** and build relations between them.

Each Property can be assigned to one or more Property Tags:

![](../../img/property-tags.png)

A Tag has a `name` unqiue within the namespace. Additionally an optional `value` can be set which can contain additional metadata about the relation.

## Create a Tag

In order to create a Tag and add it to a Property, you can use the command [`property.tag.put`](/docs/api/commands#propertytagput-v1). Here is an example:

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl -u 'username:password' \
  -X POST 'https://hub-<your-domain>/api/v3/command/property.tag.put?key=global/app/jobs/applicant/1&name=invite'
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
pi command property.tag.put key=global/app/jobs/applicant/1 name=invite
```

</TabItem>
<TabItem value="http" label="HTTP">

```
POST /api/v3/command/property.tag.put?key=global/app/jobs/applicant/1&name=invite HTTP/1.1
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
  url: 'https://hub-<your-domain>/api/v3/command/property.tag.put?key=global/app/jobs/applicant/1&name=invite',
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

url = "https://hub-<your-domain>/api/v3/command/property.tag.put?key=global/app/jobs/applicant/1&name=invite"

headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU=',
}

response = requests.request("POST", url, headers=headers, data=None)
```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.post("https://hub-<your-domain>/api/v3/command/property.tag.put?key=global/app/jobs/applicant/1&name=invite")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .asString();
```

</TabItem>
</Tabs>

For more tag options, like listing and managing tags, see the [`property.tag.*`](/docs/api/commands#propertytagput-v1) commands.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::