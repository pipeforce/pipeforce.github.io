---
title: Commands Reference
sidebar_label: Commands
---

<!-- DO NOT EDIT THIS PAGE MANUALLY! IT IS AUTO-GENERATED. CHANGES WILL BE LOST ON NEXT AUTO-GENERATION. -->
<!-- Generated: 26/06/2023 by CommandComplianceTest -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip Also see 
 - [Introduction to Commands & Pipelines](/docs/commands_pipelines)
 - [Introduction to HTTP API](/docs/guides/commands_pipelines/http_api)
 - [PIPEFORCE HTTP API Reference](http://docs.pipeforce.io/api.html)
:::

### Example 1: Execute a command via HTTP

In case you would like to execute a single command, you could run it like this:


<Tabs>
<TabItem value="curl" label="Curl">

```bash
curl -u 'username:password' \
  'https://hub-<your-domain>/api/v3/command/message.send?key=slack&payload=HELLO'
```

</TabItem>
<TabItem value="http" label="HTTP">

```
GET /api/v3/command/message.send?key=slack&payload=HELLO HTTP/1.1
Host: hub-<your-domain>
Authorization: Basic cGFzc3dvcmQ6dXNlcm5hbWU=
```

</TabItem>
<TabItem value="nodejs" label="NodeJs">

```js
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://hub-<your-domain>/api/v3/command/message.send?key=slack&payload=HELLO',
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

url = "https://hub-<your-domain>/api/v3/command/message.send?key=slack&payload=HELLO"

payload = {}
headers = {
  'Authorization': 'Basic cGFzc3dvcmQ6dXNlcm5hbWU='
}

response = requests.request("GET", url, headers=headers, data=payload)

```

</TabItem>
<TabItem value="java" label="Java">

```js
HttpResponse<String> response = Unirest.get("https://hub-<your-domain>/api/v3/command/message.send?key=slack&payload=HELLO")
  .header("Authorization", "Basic cGFzc3dvcmQ6dXNlcm5hbWU=")
  .asString();
```

</TabItem>
</Tabs>

This example simply sends a new message to the message broker with key `slack` and with message payload `HELLO`.

### Example 2: Execute a pipeline via HTTP

In case you would like to execute multiple commands, embedded in a pipeline YAML script, you can run this:

<Tabs>
<TabItem value="curl" label="Curl">

```bash
curl -u 'username:password' \
  -X POST "https://hub-<your-domain>/api/v3/pipeline" \
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
Host: hub-<your-domain>
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
  url: 'https://hub-<your-domain>/api/v3/pipeline',
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

url = "https://hub-<your-domain>/api/v3/pipeline"

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
HttpResponse<String> response = Unirest.post("https://hub-<your-domain>/api/v3/pipeline")
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

## Common Parameters

All commands do have these optional parameters in common:

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | `null` | The optional id of the command. Must be unique within the pipeline. Can be used for example in testing in order to mock certain commands and to refer to them afterwards.
`if` | Boolean | false | `true` | This parameter can disable (`false`) / enable (`true`) the execution of the command. Can be a static boolean value or a PE to be evaluated. If this value is set to `false`, negative number, `null` or empty string, the command is disabled and will be skipped in a pipeline. By default it is set to `true` = command is enabled and will be executed.
`eval` | String | false | `null` | This parameter defines an optional [Pipeline Expression](/docs/guides/commands_pipelines/pel) to be evaluated after the command execution has been finished. This is handy for cleanup-tasks, validity checks or data transformations.
`onError` | String, JSON | false | `THROW` | Defines the action in case an error happens when executing this command. Default is `THROW`: Stops execution and reports the error to the caller. This parameter can also be set for all commands in the header. If set additionally as header, the parameter value has precedence over the header value. Other possibilities are: `IGNORE`, `LOG`, `RETRY` and `ROLLBACK`. For more information see [Error Handling for Commands and Pipelines](/docs/guides/commands_pipelines/error_handling).  

## apidoc.commands ``v1``
----------   
Returns the OpenAPI documentation of commands.

[Try online.](https://try.pipeforce.org/#/commandform?command=apidoc.commands:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - apidoc.commands:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/apidoc.commands?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command apidoc.commands id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## apidoc.pel.utils ``v1``
----------   
Returns the OpenAPI documentation of PEL utils.

[Try online.](https://try.pipeforce.org/#/commandform?command=apidoc.pel.utils:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - apidoc.pel.utils:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/apidoc.pel.utils?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command apidoc.pel.utils id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## app.config.get ``v1``
----------   
Returns the configuration of an app or a list of apps.

[Try online.](https://try.pipeforce.org/#/commandform?command=app.config.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`app` | String | false | null | The name of the app to load the config from. If null or empty, the config of all apps will be returned instead.
`github` | String | false | null | A GitHub repository path (owner/reponame) to download the app resources from. For example acme/myproject. If no credentials are given, the github-default secret will be used if exists. Otherwise, repo is expected to be a public one. If this parameter is missing, the app sources are expected in the body as zip file content instead.
`branch` | String | false | null | The GitHub repo branch, commit or tag reference to be used. If null or empty, the default branch of the GitHub repo will be used. This parameter will be ignored in case no value for github is given.
`runTests` | Boolean | false | false | Run the tests of the app after installation?
`async` | Boolean | false | true | Run the installation async?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 
`secret` | String | false | null | Refers to the name of a stored secret entry to be used by this command. If not null, all other credentials parameters are ignored if there exists any.


**Pipeline example:**  
```yaml  
pipeline:  
  - app.config.get:  
      app: <value>  
      github: <value>  
      branch: <value>  
      runTests: <value>  
      async: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
      secret: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/app.config.get?app=<value>&github=<value>&branch=<value>&runTests=<value>&async=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>&secret=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command app.config.get app=<value> github=<value> branch=<value> runTests=<value> async=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value> secret=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## app.install ``v1``
----------   
Installs an app into the property store. The app can be located on GitHub or can be provided as zip file content in the body. If app is located in a private GitHub repo, the param secret must be set or the default secret github-default-readonly must exist which will be used as fallback in case no secret is set as param here.

[Try online.](https://try.pipeforce.org/#/commandform?command=app.install:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`overwrite` | Boolean | false | false | What to do if app with this key already exists? If true, the existing app will be uninstalled and replaced by this new version. Otherwise, an attempt to install an existing app will cause an error.
`github` | String | false | null | A GitHub repository path (owner/reponame) to download the app resources from. For example acme/myproject. If no credentials are given, the github-default secret will be used if exists. Otherwise, repo is expected to be a public one. If this parameter is missing, the app sources are expected in the body as zip file content instead.
`branch` | String | false | null | The GitHub repo branch, commit or tag reference to be used. If null or empty, the default branch of the GitHub repo will be used. This parameter will be ignored in case no value for github is given.
`runTests` | Boolean | false | false | Run the tests of the app after installation?
`async` | Boolean | false | true | Run the installation async?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 
`secret` | String | false | null | Refers to the name of a stored secret entry to be used by this command. If not null, all other credentials parameters are ignored if there exists any.


**Pipeline example:**  
```yaml  
pipeline:  
  - app.install:  
      overwrite: <value>  
      github: <value>  
      branch: <value>  
      runTests: <value>  
      async: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
      secret: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/app.install?overwrite=<value>&github=<value>&branch=<value>&runTests=<value>&async=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>&secret=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command app.install overwrite=<value> github=<value> branch=<value> runTests=<value> async=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value> secret=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## app.marketplace.search ``v1``
----------   
Searches the marketplace for apps ready to be installed.   
Note: This command is limited to max. 10 calls per minute.

[Try online.](https://try.pipeforce.org/#/commandform?command=app.marketplace.search:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`sort` | String | false |  | Sorts the results by author-date or committer-date or (best-match). If null or empty, best-match will be used as default.
`order` | String | false | desc | Orders the result desc or asc.
`results` | String | false | 30 | Max. number of results per page.
`page` | String | false | 1 | The 1-based page number to return.
`license` | String | false | null | Limit the search to app repos with given exact license keyword only.
`searchString` | String | false | null | The text to search for.
`searchInName` | Boolean | false | true | Search for searchString in the app repo name?
`searchInDesc` | Boolean | false | true | Search for searchString in the app repo description?
`searchInReadme` | Boolean | false | true | Search for searchString in the app repo README file?
`searchInTopics` | Boolean | false | true | Search for searchString in the repo topics?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`secret` | String | false | null | Refers to the name of a stored secret entry to be used by this command. If not null, all other credentials parameters are ignored if there exists any.


**Pipeline example:**  
```yaml  
pipeline:  
  - app.marketplace.search:  
      sort: <value>  
      order: <value>  
      results: <value>  
      page: <value>  
      license: <value>  
      searchString: <value>  
      searchInName: <value>  
      searchInDesc: <value>  
      searchInReadme: <value>  
      searchInTopics: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
      secret: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/app.marketplace.search?sort=<value>&order=<value>&results=<value>&page=<value>&license=<value>&searchString=<value>&searchInName=<value>&searchInDesc=<value>&searchInReadme=<value>&searchInTopics=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>&secret=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command app.marketplace.search sort=<value> order=<value> results=<value> page=<value> license=<value> searchString=<value> searchInName=<value> searchInDesc=<value> searchInReadme=<value> searchInTopics=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value> secret=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## app.resource.get ``v1``
----------   
Returns resources from inside a given app resource folder of the property store.

[Try online.](https://try.pipeforce.org/#/commandform?command=app.resource.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`app` | String | true | null | The name of the app to load the resource from
`path` | String | true | null | The path relative to the app's resource folder of the resource to be returned.
`github` | String | false | null | A GitHub repository path (owner/reponame) to download the app resources from. For example acme/myproject. If no credentials are given, the github-default secret will be used if exists. Otherwise, repo is expected to be a public one. If this parameter is missing, the app sources are expected in the body as zip file content instead.
`branch` | String | false | null | The GitHub repo branch, commit or tag reference to be used. If null or empty, the default branch of the GitHub repo will be used. This parameter will be ignored in case no value for github is given.
`runTests` | Boolean | false | false | Run the tests of the app after installation?
`async` | Boolean | false | true | Run the installation async?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 
`secret` | String | false | null | Refers to the name of a stored secret entry to be used by this command. If not null, all other credentials parameters are ignored if there exists any.


**Pipeline example:**  
```yaml  
pipeline:  
  - app.resource.get:  
      app: <value>  
      path: <value>  
      github: <value>  
      branch: <value>  
      runTests: <value>  
      async: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
      secret: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/app.resource.get?app=<value>&path=<value>&github=<value>&branch=<value>&runTests=<value>&async=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>&secret=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command app.resource.get app=<value> path=<value> github=<value> branch=<value> runTests=<value> async=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value> secret=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## app.uninstall ``v1``
----------   
Uninstalls the given app.

[Try online.](https://try.pipeforce.org/#/commandform?command=app.uninstall:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`appKey` | String | false | null | The key of the app to uninstall. For example: global/app/myapp.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - app.uninstall:  
      appKey: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/app.uninstall?appKey=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command app.uninstall appKey=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## app.update ``v1``
----------   
Deprecated. Use app.install with param update:true instead. Updates the given apps.

[Try online.](https://try.pipeforce.org/#/commandform?command=app.update:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`github` | String | false | null | A GitHub repository path (owner/reponame) to download the app resources from. For example acme/myproject. If no credentials are given, the github-default secret will be used if exists. Otherwise, repo is expected to be a public one. If this parameter is missing, the app sources are expected in the body as zip file content instead.
`branch` | String | false | null | The GitHub repo branch, commit or tag reference to be used. If null or empty, the default branch of the GitHub repo will be used. This parameter will be ignored in case no value for github is given.
`runTests` | Boolean | false | false | Run the tests of the app after installation?
`async` | Boolean | false | true | Run the installation async?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 
`secret` | String | false | null | Refers to the name of a stored secret entry to be used by this command. If not null, all other credentials parameters are ignored if there exists any.


**Pipeline example:**  
```yaml  
pipeline:  
  - app.update:  
      github: <value>  
      branch: <value>  
      runTests: <value>  
      async: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
      secret: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/app.update?github=<value>&branch=<value>&runTests=<value>&async=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>&secret=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command app.update github=<value> branch=<value> runTests=<value> async=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value> secret=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## assert ``v1``
----------   
Evaluates a given PEL conditions and throws an error in case a condition is invalid.

[Try online.](https://try.pipeforce.org/#/commandform?command=assert:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`true` | String | false | null | A PE which must evaluate to true.
`false` | String | false | null | A PE which must evaluate to false.
`body.equals` | String | false | null | The value of this param is compared to the body. If different, exception is thrown. Can be a PE.
`equals` | String | false | null | Compares the result of param value with this. If not equal, throws exception. Can be a PE.
`value` | String | false | null | The value to be used for comparision. Can be a PE.
`message` | String | false | null | An optional message to be used in case of invalid condition. Can be a PE.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - assert:  
      true: <value>  
      false: <value>  
      body.equals: <value>  
      equals: <value>  
      value: <value>  
      message: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/assert?true=<value>&false=<value>&body.equals=<value>&equals=<value>&value=<value>&message=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command assert true=<value> false=<value> body.equals=<value> equals=<value> value=<value> message=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.assert ``v1``
----------   
Applies asserts for a given workflow in the workflow service.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.assert:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`hasPassed` | String | false | null | A comma separated list of task names to check whether they have been passed.
`hasNotPassed` | String | false | null | A comma separated list of task names to check whether they have not yet passed.
`processFinished` | String | false | null | If true, checks whether the process with given id has been finished.
`throwException` | String | false | true | If true, throws exception when assert is false. Otherwise returns the status in the body.
`processInstanceId` | String | true | null | The id of the process instance the task to check belongs to.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.assert:  
      hasPassed: <value>  
      hasNotPassed: <value>  
      processFinished: <value>  
      throwException: <value>  
      processInstanceId: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.assert?hasPassed=<value>&hasNotPassed=<value>&processFinished=<value>&throwException=<value>&processInstanceId=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.assert hasPassed=<value> hasNotPassed=<value> processFinished=<value> throwException=<value> processInstanceId=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## barcode.create ``v1``
----------   
Creates a barcode from a dynamic format.

[Try online.](https://try.pipeforce.org/#/commandform?command=barcode.create:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`text` | String | false | null | The text value to be transformed to a barcode.
`width` | String | false | null | The width of the barcode. If empty, the default size is used.
`height` | String | false | null | The height of the barcode. If empty, the default size is used.
`format` | String | false | PDF_417 | The dynamic format of the barcode to be created. One of: AZTEC, CODABAR, CODE_39, CODE_93, CODE_128, DATA_MATRIX, EAN_8, EAN_13, ITF, PDF_417, QR_CODE, UPC_A, UPC_E
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - barcode.create:  
      text: <value>  
      width: <value>  
      height: <value>  
      format: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/barcode.create?text=<value>&width=<value>&height=<value>&format=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command barcode.create text=<value> width=<value> height=<value> format=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## barcode.read ``v1``
----------   
Reads a barcode from a dynamic PNG format. Expects the barcode image as content object in the body. Detects the barcode type automatically. By default returns the text extracted from the barcode in the body.

[Try online.](https://try.pipeforce.org/#/commandform?command=barcode.read:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - barcode.read:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/barcode.read?id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command barcode.read id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## body.delete ``v1``
----------   
Sets the value in the body to null. Deletes any existing value in the body. 

[Try online.](https://try.pipeforce.org/#/commandform?command=body.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - body.delete:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/body.delete?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command body.delete id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## body.filter ``v1``
----------   
DEPRECATED. Converts the input body to JSON and then filters the input body and removes any properties not matching the given filter. Throws exception if input body cannot be converted to JSON.Does nothing, if input body is null or empty. If the first level of the body is a list, appliesthe filter to each element inside the list. This command can be used for example to filter outsensitive information or to shrink a big result set for performance reasons.

[Try online.](https://try.pipeforce.org/#/commandform?command=body.filter:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`properties` | String | false | null | A comma separated list of first-level properties to be shown. If set, only those properties of the first level will be returned, those are listed here. All other properties will be omitted. For example to filter a user entity in the body with filter: id,username would return only the id and the username of the user. If not set, the body will not be converted and filtered at all and returned unchanged.
`removeKey` | Boolean | false | false | Can only be applied, if the result is a list and contains elements with a single property each. For example: [{name: foo}, {name: bar}]. If set to true, removes the key from the property and converts the result to a simple list like: [foo, bar]. If the result is not a list or elements in the list contain more than one property, this param is ignored.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - body.filter:  
      properties: <value>  
      removeKey: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/body.filter?properties=<value>&removeKey=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command body.filter properties=<value> removeKey=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## bot.prompt ``v1``
----------   
Sends a prompt to a bot endpoint and returns the answer.

[Try online.](https://try.pipeforce.org/#/commandform?command=bot.prompt:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`maxTokens` | Integer | false | 500 | The maximum number of tokens to return in the response.
`secret` | String | false | bot-apitoken | The name of the secret which contains the token to connect to the bot backend. If not given as parameter will lookup in the secret store using the default name.
`engine` | String | false | null | The backend Bot implementation and model to be used. If not given, the default engine will be used.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - bot.prompt:  
      maxTokens: <value>  
      secret: <value>  
      engine: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/bot.prompt?maxTokens=<value>&secret=<value>&engine=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command bot.prompt maxTokens=<value> secret=<value> engine=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## browserstack ``v1``
----------   
Runs a selenium test remotely in browserstack.

[Try online.](https://try.pipeforce.org/#/commandform?command=browserstack:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`capabilities` | String | true | null | The selenium capabilities
`remoteWebDriverUrl` | String | true | null | The url of the remote selenium service
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - browserstack:  
      capabilities: <value>  
      remoteWebDriverUrl: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/browserstack?capabilities=<value>&remoteWebDriverUrl=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command browserstack capabilities=<value> remoteWebDriverUrl=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## cache.clear ``v1``
----------   
Clears the underlying central cache and removes any entry those time to live has been expired. Can also be used to remove a single entry from the cache.

[Try online.](https://try.pipeforce.org/#/commandform?command=cache.clear:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | The key to load the value from the cache to remove. If empty or null, all entries in the cache will be inspected and those time to live has been expired will be removed.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - cache.clear:  
      key: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/cache.clear?key=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command cache.clear key=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## cache.get ``v1``
----------   
Reads a value with given key from the cache and writes it into the output.

[Try online.](https://try.pipeforce.org/#/commandform?command=cache.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key to load the value from the cache.
`remove` | Boolean | false | false | If true, removes the entry after it was successfully returned.
`exit` | Boolean | false | false | If true, exits the pipeline if cache entry exists.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - cache.get:  
      key: <value>  
      remove: <value>  
      exit: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/cache.get?key=<value>&remove=<value>&exit=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command cache.get key=<value> remove=<value> exit=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## cache.has ``v1``
----------   
Checks if cache has given entry

[Try online.](https://try.pipeforce.org/#/commandform?command=cache.has:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Checks, if cache has entry with given key. If yes, puts true in the output. Otherwise false.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - cache.has:  
      key: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/cache.has?key=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command cache.has key=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## cache.info ``v1``
----------   
Returns information about the current state of the cache. Available for system and support users only.

[Try online.](https://try.pipeforce.org/#/commandform?command=cache.info:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Returns the info for a given cache entry. If null or empty, the overall cache info is returned.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - cache.info:  
      key: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/cache.info?key=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command cache.info key=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## cache.list ``v1``
----------   
Lists ALL entries of the cache. Use with care!

[Try online.](https://try.pipeforce.org/#/commandform?command=cache.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - cache.list:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/cache.list?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command cache.list id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## cache.put ``v1``
----------   
Saves the given value under given key into a central cache.  
If no value param is given, uses the body as cache value.  


[Try online.](https://try.pipeforce.org/#/commandform?command=cache.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`timeToLive` | Integer | false | 10000 | The min. time to live for this cache entry in millis.
`key` | String | true | null | The unique key for the cache entry.
`value` | String | false | null | The value for the cache entry. If not set, null is used.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - cache.put:  
      timeToLive: <value>  
      key: <value>  
      value: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/cache.put?timeToLive=<value>&key=<value>&value=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command cache.put timeToLive=<value> key=<value> value=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## call ``v1``
----------   
Calls a pipeline script and returns with the result in the body. Note: Since version 9.0, JavaScript calls are no longer supported.

[Try online.](https://try.pipeforce.org/#/commandform?command=call:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uri` | String | true | null | The uri to be called.
`args` | Object | false | null | Name value pair of arguments to be passed to the script. If the script is a pipeline, the arguments are set as vars overwriting any existing vars.If the script is a remote HTTP URL, the arguments are passed as request parameters, each.If the script is a script in classpath or property store, the arguments are passed via implicit variable: pi.args.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - call:  
      uri: <value>  
      args: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/call?uri=<value>&args=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command call uri=<value> args=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## capture ``v1``
----------   
DEPREACTED (Use the cache.* commands instead). Captures the last pipe message and adds it into a list in the header under key {@link #HEADER_CAPTURED}. This is primarily for testing purposes but also can be used to create a snapshot of a certain pipeline state.

[Try online.](https://try.pipeforce.org/#/commandform?command=capture:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - capture:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/capture?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command capture id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pipe.schema ``v1``
----------   
Returns the JSON schema for all built-in pipes.

[Try online.](https://try.pipeforce.org/#/commandform?command=pipe.schema:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pipe` | String | false | null | The specific pipe name to fetch schema from. If set, only the schema for this specific pipe is returned.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pipe.schema:  
      pipe: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pipe.schema?pipe=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pipe.schema pipe=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pipe.schema.v7 ``v1``
----------   
Returns the V7 compliant JSON schema for all built-in pipes.

[Try online.](https://try.pipeforce.org/#/commandform?command=pipe.schema.v7:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pipe.schema.v7:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pipe.schema.v7?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pipe.schema.v7 id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## config.get ``v1``
----------   
Returns all admin config settings for a given group from the backend as a JSON in this format: {configKey:{value:someValue, canOverwrite:true|false}}. The attribute canOverwrite is only available if param includePermission is set.

[Try online.](https://try.pipeforce.org/#/commandform?command=config.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`group` | String | false | null | The config group to select. If null or empty, all configs will be returned if user has permission to do so.
`key` | String | false | null | The config key inside a given group. If null or empty, all configs from the selected group will be returned.
`includePermission` | String | false | false | If true, additionally shows whether a currently logged-in user can write/change a configuration or not by adding the attribute canOverwrite:true|false. to each config entry.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - config.get:  
      group: <value>  
      key: <value>  
      includePermission: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/config.get?group=<value>&key=<value>&includePermission=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command config.get group=<value> key=<value> includePermission=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## container.registry.delete ``v1``
----------   
Deletes a container registry.

[Try online.](https://try.pipeforce.org/#/commandform?command=container.registry.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url of the registry.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - container.registry.delete:  
      url: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/container.registry.delete?url=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command container.registry.delete url=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## container.registry.list ``v1``
----------   
Lists all container registries.

[Try online.](https://try.pipeforce.org/#/commandform?command=container.registry.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - container.registry.list:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/container.registry.list?id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command container.registry.list id=<value> if=<value> onError=<value> eval=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## container.registry.put ``v1``
----------   
Adds a new container registry.

[Try online.](https://try.pipeforce.org/#/commandform?command=container.registry.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url of the registry.
`username` | String | false | null | The username to access the registry.
`password` | String | false | null | The password to access the registry.
`email` | String | false | null | The email for the registry.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - container.registry.put:  
      url: <value>  
      username: <value>  
      password: <value>  
      email: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/container.registry.put?url=<value>&username=<value>&password=<value>&email=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command container.registry.put url=<value> username=<value> password=<value> email=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## content.get ``v1``
----------   
Deprecated. Use resolve command instead. Reads content from provided uri and puts the result back to body.

[Try online.](https://try.pipeforce.org/#/commandform?command=content.get:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uri` | String | true | null | The content uri of the content to load.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - content.get:  
      uri: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/content.get?uri=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command content.get uri=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## data.decrypt ``v1``
----------   
Decrypts the data previously encrypted using the command data.encrypt in the body using AES-256 in CBC mode by default. Puts the decrypted data into the output.

[Try online.](https://try.pipeforce.org/#/commandform?command=data.decrypt:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`password` | String | true | null | The password to decrypt the body with. The PBKDF2 algorithm will be applied to this password before using it as decryption key.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - data.decrypt:  
      password: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/data.decrypt?password=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command data.decrypt password=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## data.encrypt ``v1``
----------   
Encrypts the data in the body using AES-256 in CBC mode by default and puts the encrypted datainto the output.

[Try online.](https://try.pipeforce.org/#/commandform?command=data.encrypt:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`password` | String | true | null | The password to encrypt the body with. The PBKDF2 algorithm will be applied to this password before using it as encryption key.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - data.encrypt:  
      password: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/data.encrypt?password=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command data.encrypt password=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## data.enrich ``v1``
----------   
Enriches a given data object by applying a given PEL expression on it.

[Try online.](https://try.pipeforce.org/#/commandform?command=data.enrich:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`do` | String | true | null | A PEL which will be executed in order to enrich a selected field of the data object from input. These variables will be provided in the PEL: headers (= the pipeline headers), vars (= the pipeline variables), body (= the pipeline body), input (= the input data)
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - data.enrich:  
      do: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/data.enrich?do=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command data.enrich do=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## data.list.filter ``v1``
----------   
Iterates over a list of items given by input and removes all items matching the given criteria.

[Try online.](https://try.pipeforce.org/#/commandform?command=data.list.filter:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`exclude` | String | true | null | A PEL which will be executed on each iteration item. If the expression results in a true value, the item will be removed from the list. Additionally to the default PEL variables, the variable item (= current iteration item, default name) will be provided.
`iterItemName` | String | false | item | The name of the iteration item value, provided for  exclude
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - data.list.filter:  
      exclude: <value>  
      iterItemName: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/data.list.filter?exclude=<value>&iterItemName=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command data.list.filter exclude=<value> iterItemName=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## data.list.iterate ``v1``
----------   
Iterates over a data list (like JSON array for example) and applies the given do-action on each entry matching given where-condition. If two lists a are given, iterates over both lists whereas listA will be the outer loop and listB will be the inner loop.

[Try online.](https://try.pipeforce.org/#/commandform?command=data.list.iterate:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`listA` | String | false | null | The main list where data must be merged into. If null or empty, the value from input parameter will be used instead. If both are given, the value from listA has precedence.
`listB` | String | false | null | The seconds list where data mast be read from. For each item in listA, this list will be fully iterated.
`where` | String | false | null | Selects the iteration step in listA which must be elected for the do operation. If null or empty, any iteration step will be selected. Additionally to the default PEL variables, the variables itemA (= current iteration item of listA, default name) and itemB (= current iteration item of listB) will be provided.
`do` | String | true | null | A PEL which will be executed on each where-selected iteration item. It is also possible to apply multiple expressions in each iteration. Multiple such expressions must be separated by a semicolon ;Additionally to the default PEL variables, the variables itemA (= current iteration item of listA, default name) and itemB (= current iteration item of listB, default name) will be provided. In case therethere is only one list provided from body or input param, only one iteration item will be provided with name 'item' as default name.
`iterItemName` | String | false | item | The name of the iteration item value in case only single list has been provided via input or body.
`iterItemNameA` | String | false | itemA | The name of the iteration item value of listA provided in the PEL parts
`iterItemNameB` | String | false | itemB | The name of the iteration item value of listB provided in the PEL parts
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - data.list.iterate:  
      listA: <value>  
      listB: <value>  
      where: <value>  
      do: <value>  
      iterItemName: <value>  
      iterItemNameA: <value>  
      iterItemNameB: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/data.list.iterate?listA=<value>&listB=<value>&where=<value>&do=<value>&iterItemName=<value>&iterItemNameA=<value>&iterItemNameB=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command data.list.iterate listA=<value> listB=<value> where=<value> do=<value> iterItemName=<value> iterItemNameA=<value> iterItemNameB=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## data.list.limit ``v1``
----------   
Limits a given list of data to a specific size. Removes any item from the list those index is above given maxLength - 1.

[Try online.](https://try.pipeforce.org/#/commandform?command=data.list.limit:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`maxLength` | String | false | null | Limits the data list from the input to the given max. length.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - data.list.limit:  
      maxLength: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/data.list.limit?maxLength=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command data.list.limit maxLength=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## data.mapping ``v1``
----------   
Converts from one data structure into a another by applying simple mapping rules. Auto-creates nested elements if required.

[Try online.](https://try.pipeforce.org/#/commandform?command=data.mapping:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`rules` | String | false | null | A list of mapping PEL rules to map from the input to the output data set. A rule has the format inputPEL1 -> outputPEL1. Multiple rules are separated by a comma directly followed by a new line.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - data.mapping:  
      rules: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/data.mapping?rules=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command data.mapping rules=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## data.transform ``v1``
----------   
This data transformer converts the input to an output format by applying the given template. By default the current message is provided as model inside the template context so you can access body, vars or headers similar to the default PEL approach.

[Try online.](https://try.pipeforce.org/#/commandform?command=data.transform:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`iterate` | String | false | false | If true, the input is expected to be a list which will be iterated. The template is then applied on each iteration row and the result is added to a target list.
`groupBy` | String | false | null | An expression to apply on the target list in order to group the result of a row into. If the expression returns false, the row result is added to the end of the list.If null or empty, each row result creates a new entry in the target list.
`engine` | String | false | pel | The template engine to be used. Currently 'freemarker' and 'pel' is supported.
`modelName` | String | false | null | The name of the root model under which the input can be accessed inside the template. If null or empty, then the input defines the model names.
`template` | String | true | null | The template to be used for the transformation. It can the template text itself as string or a qualified uri pointing to a template resource like this for example: $uri:property:/my/template/path
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - data.transform:  
      iterate: <value>  
      groupBy: <value>  
      engine: <value>  
      modelName: <value>  
      template: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/data.transform?iterate=<value>&groupBy=<value>&engine=<value>&modelName=<value>&template=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command data.transform iterate=<value> groupBy=<value> engine=<value> modelName=<value> template=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## datetime ``v1``
----------   
Returns the current time at server side.

[Try online.](https://try.pipeforce.org/#/commandform?command=datetime:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`format` | String | false | null | The date time format pattern. If null, the system default format is used.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - datetime:  
      format: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/datetime?format=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command datetime format=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## datetime.zones ``v1``
----------   
Returns all official IANA time-zone names supported by this PIPEFORCE instance: http://www.iana.org/time-zones

[Try online.](https://try.pipeforce.org/#/commandform?command=datetime.zones:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - datetime.zones:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/datetime.zones?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command datetime.zones id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.attachment.add ``v1``
----------   
Adds a single attachment to an existing PIPEFORCE Secure Delivery. Note: Attachments can be added to deliveries only in state DRAFT.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.attachment.add:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of an existing delivery to be updated.
`name` | String | true | null | The name of the attachment.
`mimeType` | String | false | null | The mime type of the attachment.
`length` | String | false | 0 | The length of the attachment in bytes.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.attachment.add:  
      deliveryUuid: <value>  
      name: <value>  
      mimeType: <value>  
      length: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.attachment.add?deliveryUuid=<value>&name=<value>&mimeType=<value>&length=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.attachment.add deliveryUuid=<value> name=<value> mimeType=<value> length=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.create ``v1``
----------   
Creates a new PIPEFORCE Secure Delivery and sets it in the target

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.create:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`subject` | String | false | null | The subject of the delivery. If null or empty, the default subject will be used.
`message` | String | false | null | The message of the delivery. If null or empty, the default message will be used.
`privacyLevel` | Integer | false | 1 | The privacy level to send the delivery. Must be one of 1, 2, 3 or 4.
`recipients` | String | false | null | A comma separated list of email recipients. Also PEL is supported here.
`deleteAfter` | String | false | 0 | Delete the delivery attachments after this date and time given as unix timestamp in millis. If null, empty, 0 or negative, delivery will never be deleted.
`attachments` | String | false | null | The list of attachment file names or a list of JSON objects to be added to this delivery.
`notifySender` | String | false | true | If true, notifies sender when recipients have downloaded delivery.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.create:  
      subject: <value>  
      message: <value>  
      privacyLevel: <value>  
      recipients: <value>  
      deleteAfter: <value>  
      attachments: <value>  
      notifySender: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.create?subject=<value>&message=<value>&privacyLevel=<value>&recipients=<value>&deleteAfter=<value>&attachments=<value>&notifySender=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.create subject=<value> message=<value> privacyLevel=<value> recipients=<value> deleteAfter=<value> attachments=<value> notifySender=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.delete ``v1``
----------   
Deletes a given delivery.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of the delivery to delete.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.delete:  
      deliveryUuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.delete?deliveryUuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.delete deliveryUuid=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.finalize ``v1``
----------   
Finalizes an existing delivery. After finalized, only recipients can be added but message and attachments of delivery can not be changed any longer.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.finalize:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of the delivery to finalize.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.finalize:  
      deliveryUuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.finalize?deliveryUuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.finalize deliveryUuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.get ``v1``
----------   
Returns an existing delivery.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of the delivery.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.get:  
      deliveryUuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.get?deliveryUuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.get deliveryUuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.inbox.details ``v1``
----------   
Returns the details of a given inbox Delivery.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.inbox.details:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of the delivery.
`recipientEmail` | String | false | null | The email of the recipient. If not specified request user email is used
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.inbox.details:  
      deliveryUuid: <value>  
      recipientEmail: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.inbox.details?deliveryUuid=<value>&recipientEmail=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.inbox.details deliveryUuid=<value> recipientEmail=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.inbox.list ``v1``
----------   
Lists all deliveries for the currently logged-in user.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.inbox.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.inbox.list:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.inbox.list?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.inbox.list id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.migration ``v1``
----------   
It returns migrated UUIDs in return body

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.migration:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.migration:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.migration?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.migration id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.outbox.delete ``v1``
----------   
Deletes a delivery from the currently logged-in users outbox.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.outbox.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of the delivery.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.outbox.delete:  
      deliveryUuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.outbox.delete?deliveryUuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.outbox.delete deliveryUuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.outbox.details ``v1``
----------   
Returns the details of a given outbox Delivery.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.outbox.details:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of the delivery.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.outbox.details:  
      deliveryUuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.outbox.details?deliveryUuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.outbox.details deliveryUuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.outbox.list ``v1``
----------   
Lists all deliveries sent by the currently logged-in user.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.outbox.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.outbox.list:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.outbox.list?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.outbox.list id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.recipient.add ``v1``
----------   
Adds recipients to an existing PIPEFORCE Secure Delivery. Note: Recipients can be added to deliveries only in state DRAFT or FINALIZED.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.recipient.add:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | false | null | The uuid of an existing delivery to be updated.
`email` | String | false | null | The email address of the recipient to be added.
`locale` | String | false | null | The locale to be used for this recipient like de, en or fr for example.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.recipient.add:  
      deliveryUuid: <value>  
      email: <value>  
      locale: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.recipient.add?deliveryUuid=<value>&email=<value>&locale=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.recipient.add deliveryUuid=<value> email=<value> locale=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.send ``v1``
----------   
Sends a given PIPEFORCE Secure Delivery. If delivery is in status DRAFT it will be converted to FINALIZED before send.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.send:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of the delivery to send.
`recipients` | String | false | null | The comma separated or PEL list of recipients to (re-)send the delivery to. The recipients must already exist in the delivery. If null or empty, the delivery message is send to all existing recipients of the delivery.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.send:  
      deliveryUuid: <value>  
      recipients: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.send?deliveryUuid=<value>&recipients=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.send deliveryUuid=<value> recipients=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## delivery.update ``v1``
----------   
Updates an existing PIPEFORCE Secure Delivery.

[Try online.](https://try.pipeforce.org/#/commandform?command=delivery.update:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | false | null | The uuid of an existing delivery to be updated with values from the params. Any existing value will be overwritten by parameter set on this command. If null or empty, a new delivery will be created and initialized with values from params. Note: Deliveries can only be fully updated in DRAFT state. In FINALIZED state, only recipients can be updated.
`subject` | String | false | null | The subject of the delivery. If null or empty, this attribute wont be updated.. Overwrites any existing value.
`message` | String | false | null | The message of the delivery. If null or empty, this attribute wont be updated. Overwrites any existing value.
`privacyLevel` | Integer | false | 1 | The privacy level to send the delivery. Must be one of 1, 2, 3 or 4. Overwrites any existing value. If null or empty, this attribute wont be updated.
`recipients` | String | false | null | A comma separated list of email recipients. Overwrites any existing recipients. If null or empty, this attribute wont be updated.
`deleteAfter` | String | false | 0 | Delete the delivery attachments after this date and time given as unix timestamp in millis. If 0 or negative, delivery will never be deleted. If null or empty, this attribute wont be updated. If set overwrites any existing value.
`attachments` | String | false | null | The attachments to be set to this delivery. Overwrites any existing attachments. If null or empty, this attribute wont be updated.
`notifySender` | String | false | true | If true, notifies sender when recipients have downloaded delivery. If null or empty, this attribute wont be updated.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - delivery.update:  
      deliveryUuid: <value>  
      subject: <value>  
      message: <value>  
      privacyLevel: <value>  
      recipients: <value>  
      deleteAfter: <value>  
      attachments: <value>  
      notifySender: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/delivery.update?deliveryUuid=<value>&subject=<value>&message=<value>&privacyLevel=<value>&recipients=<value>&deleteAfter=<value>&attachments=<value>&notifySender=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command delivery.update deliveryUuid=<value> subject=<value> message=<value> privacyLevel=<value> recipients=<value> deleteAfter=<value> attachments=<value> notifySender=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## dev.null ``v1``
----------   
This command simply reads the body (if there is any) and sends its content to '/dev/null'. It is mainly for testing purposes.

[Try online.](https://try.pipeforce.org/#/commandform?command=dev.null:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - dev.null:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/dev.null?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command dev.null id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## doc.api.pelutils ``v1``
----------   
Returns the api doc for the available PEL utils.

[Try online.](https://try.pipeforce.org/#/commandform?command=doc.api.pelutils:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - doc.api.pelutils:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/doc.api.pelutils?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command doc.api.pelutils id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## docusign ``v1``
----------   
Requests a signature of the given document in the body   
via email (remote signing) using DocuSign. See here:   
https://developers.docusign.com/esign-rest-api/code-examples/code-example-request-a-signature-via-email  
Expects the to be signed document in the body with json.file encoding.

[Try online.](https://try.pipeforce.org/#/commandform?command=docusign:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`signerEmail` | String | true | null | The email address of the signer.
`signerName` | String | false | null | The real name of the signer.
`ccEmail` | String | false | null | The email of cc user to get informed about the signing request. If null, no cc mail is sent.
`ccName` | String | false | null | The name of cc email user to get informed about the signing request.
`subject` | String | false | null | The email subject to be send to the signer. If null or empty, the default subject will be set.
`accessToken` | String | false | null | The DocuSign access token. If null or empty, the token will be read from settings.
`accountId` | String | false | null | The docuSign account Id for REST calls. Can be obtained here: https://developers.docusign.com/esign-rest-api/guides/authentication/user-info-endpoints . If not set, the command tries to get the account ID by an additional request from DocuSign
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - docusign:  
      signerEmail: <value>  
      signerName: <value>  
      ccEmail: <value>  
      ccName: <value>  
      subject: <value>  
      accessToken: <value>  
      accountId: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/docusign?signerEmail=<value>&signerName=<value>&ccEmail=<value>&ccName=<value>&subject=<value>&accessToken=<value>&accountId=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command docusign signerEmail=<value> signerName=<value> ccEmail=<value> ccName=<value> subject=<value> accessToken=<value> accountId=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## document.understand ``v1``
----------   
Returns metadata for a given unstructured document like an invoice PDF for example. Expects the document to be in the body by default. Returns the result as JSON in the body (replacing any existing value in the body).

[Try online.](https://try.pipeforce.org/#/commandform?command=document.understand:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`provider` | String | false | null | The name of the provider to process document.
`config` | String | false | null | The config json to process document
`secret` | String | false | null | The name of the secret in secret store.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`apiKey` | String | false | null | The alternative API key to connect to the service. If null or empty, the default one will be used, as defined by the default backend settings.
`restUrl` | String | false | null | The URL to be called by the command. If null or empty, the default url will be used as defined in the backend.
`filter` | String | false | null | A PEL as filter to be applied to the output data before it is returned by this command. If null or empty, no filter is applied.


**Pipeline example:**  
```yaml  
pipeline:  
  - document.understand:  
      provider: <value>  
      config: <value>  
      secret: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
      apiKey: <value>  
      restUrl: <value>  
      filter: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/document.understand?provider=<value>&config=<value>&secret=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>&apiKey=<value>&restUrl=<value>&filter=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command document.understand provider=<value> config=<value> secret=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value> apiKey=<value> restUrl=<value> filter=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.archive.save ``v1``
----------   
Saves the content of the body to the given archive folder in Drive. The content of the body must be a single file. Verifies the integrity of the archive on write. Returns the final archive file name / path (without archive root path) into the output target.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.archive.save:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The root path of the archive folder where the file to be saved to.
`namingPattern` | String | false | null | The PEL pattern to be applied to generate the final archive file name / path. This name / path will be relative to the given archive root path. Additionally, provides these variables in this PEL pattern context: archiveCounter = The last value used as counter as it comes from the .counter file. When not present, is initialized by counting all files in archive folder. counter = The archiveCounter increased by 1.archivePath = The path to the archive root as given by path param. basename = The base filename of the archive file, without extension (for example myfile.pdf = myfile). basenameNoId = Same as basename but without the _ID-123 part in the file name if there is any.ext = The extension of the archive file, without a period (for example myfile.pdf = pdf) filename = The full name of the archive file, with extension (for example myfile.pdf = myfile.pdf). The default pattern is this: basename_counter.ext
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.archive.save:  
      path: <value>  
      namingPattern: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.archive.save?path=<value>&namingPattern=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.archive.save path=<value> namingPattern=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.copy ``v1``
----------   
Copies a folder or file on Drive.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.copy:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the folder or file to be copied.
`to` | String | true | null | The target folder to copy the resource into.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.copy:  
      path: <value>  
      to: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.copy?path=<value>&to=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.copy path=<value> to=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.delete ``v1``
----------   
Deletes a file or folder on Drive. If resource doesnt exist, nothing happens.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the resource to be deleted. If it is a folder, it will be deleted recursively.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.delete:  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.delete?path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.delete path=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.exists ``v1``
----------   
Checks whether a resource in Drive exists. Puts the string true or false in the message body depending whether the resource exists.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.exists:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the resource to check for existence.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.exists:  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.exists?path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.exists path=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.list ``v1``
----------   
Lists all resources from drive folder.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the folder to be listed.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.list:  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.list?path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.list path=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.mkdir ``v1``
----------   
Creates a new dir on Drive if it not already exists.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.mkdir:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the folder the new dir should be created within.
`recurse` | String | false | false | If set to true, any non existing folder in the path will be created.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.mkdir:  
      path: <value>  
      recurse: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.mkdir?path=<value>&recurse=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.mkdir path=<value> recurse=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.move ``v1``
----------   
Moves a folder or file on Drive from one location into another.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.move:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the folder or file to be moved.
`to` | String | true | null | The target folder to move the resource into.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.move:  
      path: <value>  
      to: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.move?path=<value>&to=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.move path=<value> to=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.read ``v1``
----------   
Reads a file from drive and puts its content as a pipeline resource into the body.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.read:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the file to be read from Drive.
`append` | Boolean | false | false | If true, appends the files read from drive to any existing collection in the body. In case the body is no collection but a content (single file), creates a new collection and adds all to this collection (already existing file and read files). In case the body is different from collection or content, an error is thrown. If false (default), overwrites any existing body value.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.read:  
      path: <value>  
      append: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.read?path=<value>&append=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.read path=<value> append=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.save ``v1``
----------   
Saves the content of the body to Drive. The content of the body can be a content object (= single file) or a content collection (= folder of files).In case the body is not a content object, it will be tried to convert it to such a content object.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.save:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | false | null | The path of the file to be saved in drive. If a content collection is in the body, this is the path of the base folder where to store these files recursively. Otherwise, it is expected to be the full path to a single file. If null or empty, the name of the content object is used as path. If content object has also no path set, an exception is thrown.
`namingStrategy` | String | false | null | If defined, applies the given naming strategy to the name of the resource. If null or empty, no naming strategy is applied.
`cleanupBody` | String | false | false | If true, deletes the content from the body after it was saved to drive (default). Note: In case the body content is a stream, this stream will be empty even if this was set to false since streams can be processed only once and was already processed by writing its data to drive here.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.save:  
      path: <value>  
      namingStrategy: <value>  
      cleanupBody: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.save?path=<value>&namingStrategy=<value>&cleanupBody=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.save path=<value> namingStrategy=<value> cleanupBody=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.share ``v1``
----------   
Shares a folder in Drive given by path to users given by recipients.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.share:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`to` | String | true | null | Comma separated list of users, group names or email addresses. Never null. If this is an expression and points to comma separated list, an array or a collection, will create share to any of the entries. If this value is missing, a public share is created instead
`type` | String | false | user | Can be either shared to 'user' or to 'group'. Defaults to 'user'
`path` | String | true | null | The path to the folder to be shared.
`permission` | Integer | false | 1 | The permission for the share: 1 (read), 2 (update), 4 (create), 8 (delete), 16 (share), 31 (all).  Note: Permissions can be combined by additions: For example read (1) + update (2) would be 3. For public shares defaults to 1 (read).
`subject` | String | false | null | Optional subject of the share email to be send to the recipient. If type=user and at least one of subject or message parameter is set, an email will be send to the recipient after it was shared to him.
`message` | String | false | null | Optional message of the share email to be send to the recipient. If type=user and at least one of subject or message parameter is set, an email will be send to the recipient after it was shared to him.
`model` | String | false | null | Optional model for the share email to be send to the recipient.
`expires` | Long | false | null | NOT SUPPORTED YET. A timestamp in millis since 1970 when this share will expire. If -1 share will never expire.
`password` | String | false | null | NOT SUPPORTED YET. A password to protect the share.
`invite` | Boolean | false | null | NOT SUPPORTED YET. Send an invite email to recipients.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.share:  
      to: <value>  
      type: <value>  
      path: <value>  
      permission: <value>  
      subject: <value>  
      message: <value>  
      model: <value>  
      expires: <value>  
      password: <value>  
      invite: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.share?to=<value>&type=<value>&path=<value>&permission=<value>&subject=<value>&message=<value>&model=<value>&expires=<value>&password=<value>&invite=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.share to=<value> type=<value> path=<value> permission=<value> subject=<value> message=<value> model=<value> expires=<value> password=<value> invite=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.tag ``v1``
----------   
Adds or removes a WebDAV tag to a resource on drive.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.tag:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the resource to tag.
`tagname` | String | true | null | The name of the tag to add.
`tagvalue` | String | false | null | The value of the tag to add.
`remove` | Boolean | false | null | If true (or any non empty/null value), removes the given tag.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.tag:  
      path: <value>  
      tagname: <value>  
      tagvalue: <value>  
      remove: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.tag?path=<value>&tagname=<value>&tagvalue=<value>&remove=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.tag path=<value> tagname=<value> tagvalue=<value> remove=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## drive.upload.chunked ``v1``
----------   
Supports chunked uploads of large files into the Drive endpoint. Expects an object in the body which can be converted to an input stream as the chunk data to be uploaded.

[Try online.](https://try.pipeforce.org/#/commandform?command=drive.upload.chunked:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`action` | String | true | null | Defines the action of the chunked upload. One of: create, upload, finalize, cancel
`uuid` | String | false | null | The uuid to refer to the upload session as returned by the create action. Required for upload, finalize and cancel actions.
`path` | String | false | null | The target path where to copy the final file on finalize action. Mandatory for the finalize action.
`index` | Integer | false | null | The index of the chunk. Mandatory for the upload action.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - drive.upload.chunked:  
      action: <value>  
      uuid: <value>  
      path: <value>  
      index: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/drive.upload.chunked?action=<value>&uuid=<value>&path=<value>&index=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command drive.upload.chunked action=<value> uuid=<value> path=<value> index=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## error ``v1``
----------   
This command stops the execution of the current pipeline and returns an error to the caller.

[Try online.](https://try.pipeforce.org/#/commandform?command=error:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`message` | String | true | null | The error message to return to the caller.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - error:  
      message: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/error?message=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command error message=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## eval ``v1``
----------   
Executes a given pipeline expression with the message as context.

[Try online.](https://try.pipeforce.org/#/commandform?command=eval:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`expr` | String | true | null | The pipeline expression to be executed.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - eval:  
      expr: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/eval?expr=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command eval expr=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## event.listen ``v1``
----------   
Listening for events works like this: Add this command at the very first in your pipeline, define the event key you want to listen for and an optional filter expression. Then save this pipeline into the property store. This causes the system to automatically register this pipeline and execute it whenever an event with given key and matching filter is fired. Note: Only one event.listen command per pipeline is allowed and it needs to be the very first command in the pipeline. In the body of the pipeline the event object is provided and can be used for filtering for example.

[Try online.](https://try.pipeforce.org/#/commandform?command=event.listen:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use eventKey instead.
`eventKey` | String | false | null | The key to listen for.
`filter` | String | false | null | DEPRECATED: Use parameter `selector` instead. An optional PEL to execute the pipeline only in case the filter applies.
`selector` | String | false | null | Selects the message to be passed to this listener. Can be a PEL or a selector expression. Note: For performance reasons, using the body payload for filtering is not allowed here and will throw an exception. Use headers for filtering instead. If this parameter is set, filter will be ignored.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - event.listen:  
      key: <value>  
      eventKey: <value>  
      filter: <value>  
      selector: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/event.listen?key=<value>&eventKey=<value>&filter=<value>&selector=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command event.listen key=<value> eventKey=<value> filter=<value> selector=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## event.mapping.get ``v1``
----------   
Returns all event key to pipeline key mappings.

[Try online.](https://try.pipeforce.org/#/commandform?command=event.mapping.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - event.mapping.get:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/event.mapping.get?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command event.mapping.get id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## event.send ``v1``
----------   
Sends a new event to inform listeners in pipelines and microservices.

[Try online.](https://try.pipeforce.org/#/commandform?command=event.send:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key under which to send this event.
`traceId` | String | false | null | The optional tracedId to be used to send this event. If not defined, a random traceId is created automatically.
`payload` | String | false | null | The payload to send with this event. May be null.
`async` | String | false | true | Send the event in ASYNC mode? Note: ASYNC is faster but lacks transaction capability. If false, message is send in SYNC. Slower but can use the current authentication and transaction context.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - event.send:  
      key: <value>  
      traceId: <value>  
      payload: <value>  
      async: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/event.send?key=<value>&traceId=<value>&payload=<value>&async=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command event.send key=<value> traceId=<value> payload=<value> async=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## exit ``v1``
----------   
Exits the current pipeline flow and returns the current body state to the caller.

[Try online.](https://try.pipeforce.org/#/commandform?command=exit:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`if` | String | false | #{true} | The PE to be evaluated. If true, the pipeline will exit.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - exit:  
      if: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/exit?if=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command exit if=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## finally ``v1``
----------   
Any command placed after this finally command will be executed even if the pipeline execution was quit using the exit command or by an exception.

[Try online.](https://try.pipeforce.org/#/commandform?command=finally:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`do` | String | false | null | An optional PE to execute finally.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - finally:  
      do: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/finally?do=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command finally do=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## foreach ``v1``
----------   
Splits a given set of data and repeats the subsequent commands for each entry in a given list until location of `foreach.end` command. The current iteration item can be accessed using the path `vars.[as]` or `vars.loop.[as].item`. The current iteration index can be accessed using the path `vars.loop.[as].index`. In order to find out whether current iteration index is odd or even, use `vars.loop.[as].even`. Whereas [as] stands for the name given by the [as] parameter. Note: Even if not an error, you should prefer to set the `as` parameter for every `foreach` command. Not using it is discouraged and support for not using it will be removed in future versions.

[Try online.](https://try.pipeforce.org/#/commandform?command=foreach:v1)

**Alias:** command:split:v1   
**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`in` | String | false | null | Default parameter which points to a list of items to be iterated over. Each iteration item is placed under `vars.loop.[as].item` and `vars.[as]` whereas `[as]` will be replaced by the name given by the `as` parameter.
`loopName` | String | false | loop | *Deprecated.* Use parameter `as` instead. This parameter is only here for downwards compatibility and will be removed in one of the next releases. If `as` parameter is null or empty, this parameter gets checked. And if not null or empty,  it will change the default loop context name in the vars scope from `vars.loop` to `vars.[loopName]`, so you can access the current iteration item using `vars.[loopName].item`.
`as` | String | false | null | For each iteration/split, puts the current iteration item into the vars scope under this name. If this parameter is null or empty, the item wont be additionally exposed to vars scope. Additionally puts the current loop context under the variable name `vars.loop.NAME.item` whereas `NAME` is the value of this `as` parameter. For example, if you set `as` to `myitem`, then you can access the item using the path `vars.loop.myitem.item` or `vars.myitem`.The loop context contains these objects for each iteration: `item` = The current iteration item. In case the iteration input is a map or a JSON, you can access the key of the item using `item.key` and the value using `item.value`.`index` = The current 0-based iteration index. `even` = A boolean value whether current iteration index is even or not. This is useful for example for layouting.
`item` | String | false | null | *Deprecated*. Contains an optional expression which will be evaluated for each iteration to extract or prepare the iteration item. The result of this expression will be placed as iteration item.
`end` | String | false | null | *Deprecated*. Use the foreach.end command instead. Signals the end of a for each loop.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - foreach:  
      in: <value>  
      loopName: <value>  
      as: <value>  
      item: <value>  
      end: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/foreach?in=<value>&loopName=<value>&as=<value>&item=<value>&end=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command foreach in=<value> loopName=<value> as=<value> item=<value> end=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## foreach.end ``v1``
----------   
Defines the end of a foreach loop.

[Try online.](https://try.pipeforce.org/#/commandform?command=foreach.end:v1)

**Alias:** command:split.end:v1   
**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - foreach.end:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/foreach.end?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command foreach.end id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## function.backend.cache.clear ``v1``
----------   
Clears the cache of the FaaS backend.

[Try online.](https://try.pipeforce.org/#/commandform?command=function.backend.cache.clear:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - function.backend.cache.clear:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/function.backend.cache.clear?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command function.backend.cache.clear id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## function.backend.status ``v1``
----------   
Returns the status of the FaaS backend.

[Try online.](https://try.pipeforce.org/#/commandform?command=function.backend.status:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - function.backend.status:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/function.backend.status?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command function.backend.status id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## function.delete ``v1``
----------   
Undeploys a function from the FaaS backend.

[Try online.](https://try.pipeforce.org/#/commandform?command=function.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the function to undeploy.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - function.delete:  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/function.delete?name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command function.delete name=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## function.get ``v1``
----------   
Returns all deployed functions or a specific one.

[Try online.](https://try.pipeforce.org/#/commandform?command=function.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the function to return. If null or empty, all deployed functions will be returned.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - function.get:  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/function.get?name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command function.get name=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## function.put ``v1``
----------   
Deploys a new function to the FaaS backend. Expects the function code in the body or input of the command.

[Try online.](https://try.pipeforce.org/#/commandform?command=function.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the function to deploy.
`code` | String | false | null | The code of the function to deploy. Can also be a custom uri starting with $uri:... . In this case the function code will be loaded from this uri and then deployed.
`language` | String | false | python | The language of the function (currently only python is supported).
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - function.put:  
      name: <value>  
      code: <value>  
      language: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/function.put?name=<value>&code=<value>&language=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command function.put name=<value> code=<value> language=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## function.run ``v1``
----------   
Executes a function given by name on the FaaS backend.

[Try online.](https://try.pipeforce.org/#/commandform?command=function.run:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name of the function to run.
`args` | String | false | null | The arguments to be passed to the function. Must be serializable to JSON. Can also be a custom uri starting with $uri: pointing to a document which is a JSON document or can be converted to a JSON. 
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - function.run:  
      name: <value>  
      args: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/function.run?name=<value>&args=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command function.run name=<value> args=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## gateway.endpoint.delete ``v1``
----------   
Deletes an endpoint configuration.

[Try online.](https://try.pipeforce.org/#/commandform?command=gateway.endpoint.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | true | null | The uuid of the endpoint to delete.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - gateway.endpoint.delete:  
      uuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/gateway.endpoint.delete?uuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command gateway.endpoint.delete uuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## gateway.endpoint.get ``v1``
----------   
Returns an endpoint configuration.

[Try online.](https://try.pipeforce.org/#/commandform?command=gateway.endpoint.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | true | null | The uuid of the endpoint to return.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - gateway.endpoint.get:  
      uuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/gateway.endpoint.get?uuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command gateway.endpoint.get uuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## gateway.endpoint.list ``v1``
----------   
Lists all existing endpoint configurations.

[Try online.](https://try.pipeforce.org/#/commandform?command=gateway.endpoint.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - gateway.endpoint.list:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/gateway.endpoint.list?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command gateway.endpoint.list id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## gateway.endpoint.put ``v1``
----------   
Adds a new endpoint configuration. Expects the config as JSON in the input. In case no uuid is given, a new entry is created.

[Try online.](https://try.pipeforce.org/#/commandform?command=gateway.endpoint.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | false | null | The uuid of the endpoint to update. This will overwrite the value of the input JSON if there is any.
`methods` | String | false | null | A list of HTTP methods to allow. If this list contains *, all methods are allowed. This will overwrite the value of the input JSON if there is any.
`enabled` | String | false | null | Enables or disables this endpoint temporarily. This will overwrite the value of the input JSON if there is any.
`polling` | String | false | null | In case this endpoints is an async target, should a polling redirect be applied to the request so it polls for the result until has been processed or timed out?
`mocked` | String | false | null | Mocks this endpoint for testing (= doesn't forward to real endpoint). This will overwrite the value of the input JSON if there is any.
`weight` | String | false | null | The weighting of this entry. In case a path matches two entries, the one with higher wight value will win.
`pattern` | String | false | null | The wildcard pattern, the incoming request path must match in order to get called. This will overwrite the value of the input JSON if there is any.
`target` | String | false | null | The target uri to be executed in case the request matches. This will overwrite the value of the input JSON if there is any.
`authenticate` | String | false | null | Is authentication needed for this endpoint? In this case, the Authorization header must exist and must contain a valid authentication token or credentials. This will overwrite the value of the input JSON if there is any.
`roles` | String | false | null | The authenticated user must be assigned to at least one of the roles from this list. If null or empty, no authorization check is done after successful authentication. Authentication is mandatory to be enabled for this. This will overwrite the value of the input JSON if there is any.
`groups` | String | false | null | The authenticated user must be member to at least one of the groups from this list. If null or empty, no authorization check is done after successful authentication. Authentication is mandatory to be enabled for this. This will overwrite the value of the input JSON if there is any.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - gateway.endpoint.put:  
      uuid: <value>  
      methods: <value>  
      enabled: <value>  
      polling: <value>  
      mocked: <value>  
      weight: <value>  
      pattern: <value>  
      target: <value>  
      authenticate: <value>  
      roles: <value>  
      groups: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/gateway.endpoint.put?uuid=<value>&methods=<value>&enabled=<value>&polling=<value>&mocked=<value>&weight=<value>&pattern=<value>&target=<value>&authenticate=<value>&roles=<value>&groups=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command gateway.endpoint.put uuid=<value> methods=<value> enabled=<value> polling=<value> mocked=<value> weight=<value> pattern=<value> target=<value> authenticate=<value> roles=<value> groups=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## gateway.group.list ``v1``
----------   
Lists all groups allowed to be assigned to endpoints.

[Try online.](https://try.pipeforce.org/#/commandform?command=gateway.group.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - gateway.group.list:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/gateway.group.list?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command gateway.group.list id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## gateway.role.list ``v1``
----------   
Lists all roles allowed to be assigned to endpoints.

[Try online.](https://try.pipeforce.org/#/commandform?command=gateway.role.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - gateway.role.list:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/gateway.role.list?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command gateway.role.list id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## header.set ``v1``
----------   
DEPRECATED. Use the set command instead. Sets any parameter value as header. For example header.set?key1=value1&key2=value2 would become the headers: key1: value1 and key2: value2

[Try online.](https://try.pipeforce.org/#/commandform?command=header.set:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - header.set:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/header.set?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command header.set id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## htmlunit.website.form.find ``v1``
----------   
Searches for a form on the page and sets is as vars.form model in PEL. If param 'select' is given, uses this PEL to find the form object. Otherwise tries to detect the form automatically by searching the page and using the first form found. Note: The pipe is BETA and not intended to be used in production!

[Try online.](https://try.pipeforce.org/#/commandform?command=htmlunit.website.form.find:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`select` | String | false | null | A PE to select elements on a website for subsequent RPA commands. If null, form is tried to select automatically.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - htmlunit.website.form.find:  
      select: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/htmlunit.website.form.find?select=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command htmlunit.website.form.find select=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## htmlunit.website.form.input ``v1``
----------   
Searches for an input element with given name and sets the given value on it. Note: The pipe is BETA and not intended to be used in production!

[Try online.](https://try.pipeforce.org/#/commandform?command=htmlunit.website.form.input:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`value` | String | false | null | The value to be set on the selected input field.
`select` | String | false | null | A PE to select elements on a website for subsequent RPA commands. If null, form is tried to select automatically.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - htmlunit.website.form.input:  
      value: <value>  
      select: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/htmlunit.website.form.input?value=<value>&select=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command htmlunit.website.form.input value=<value> select=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## htmlunit.website.form.submit ``v1``
----------   
Searches for a submit button and clicks it. Note: The pipe is BETA and not intended to be used in production!

[Try online.](https://try.pipeforce.org/#/commandform?command=htmlunit.website.form.submit:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`select` | String | false | null | A PE to select elements on a website for subsequent RPA commands. If null, form is tried to select automatically.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - htmlunit.website.form.submit:  
      select: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/htmlunit.website.form.submit?select=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command htmlunit.website.form.submit select=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## htmlunit.website.link.click ``v1``
----------   
Searches for a link on current page and clicks it. Note: The pipe is BETA and not intended to be used in production!

[Try online.](https://try.pipeforce.org/#/commandform?command=htmlunit.website.link.click:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`select` | String | false | null | A PE to select elements on a website for subsequent RPA commands. If null, form is tried to select automatically.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - htmlunit.website.link.click:  
      select: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/htmlunit.website.link.click?select=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command htmlunit.website.link.click select=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## htmlunit.website.open ``v1``
----------   
Opens a website and sets it as 'vars.page' in PEL. Additionally sets the current browser instance as 'vars.browser'. Note: The pipe is BETA and not intended to be used in production!

[Try online.](https://try.pipeforce.org/#/commandform?command=htmlunit.website.open:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | true | null | The url of the web page to open.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - htmlunit.website.open:  
      url: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/htmlunit.website.open?url=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command htmlunit.website.open url=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## htmlunit.website.scrap ``v1``
----------   
Scraps data from the current website and returns the result in the body.Note: The pipe is BETA and not intended to be used in production!

[Try online.](https://try.pipeforce.org/#/commandform?command=htmlunit.website.scrap:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`xpath` | String | true | null | Executes the given xpath expression on the current page and puts the result in the body. In case the xpath returns more than one results, adds an array to the body. Otherwise the body only contains the single result value.
`select` | String | false | null | A PE to select elements on a website for subsequent RPA commands. If null, form is tried to select automatically.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - htmlunit.website.scrap:  
      xpath: <value>  
      select: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/htmlunit.website.scrap?xpath=<value>&select=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command htmlunit.website.scrap xpath=<value> select=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## http.delete ``v1``
----------   
Executes a DELETE HTTP call to the given url.Returns the result from the server in the message body.

[Try online.](https://try.pipeforce.org/#/commandform?command=http.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url for the HTTP call.
`service` | String | false | null | The name of the internal service to be called. If this parameter is given, it will prefix the url parameter, if exists. This parameter can also contain the internal port information separated by a colon like serviceName:port. If no port is given, it will be looked-up automatically.
`headers` | String | false | null | A list of headers to append to the request. Can be a PEL pointing to a map or a list of name-value pair strings name:value or a comma separated string like: name1:value1, name2:value2.
`body` | String | false | null | The value to be set in the body of the request (if it supports a body). If this param is missing, the value from the input parameter is used. If this value is null, no body is used.
`forceContentType` | String | false | null | The value to optionally overwrite content-type header of response and affect response processing.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - http.delete:  
      url: <value>  
      service: <value>  
      headers: <value>  
      body: <value>  
      forceContentType: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/http.delete?url=<value>&service=<value>&headers=<value>&body=<value>&forceContentType=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command http.delete url=<value> service=<value> headers=<value> body=<value> forceContentType=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## http.get ``v1``
----------   
Executes a GET HTTP call to the given url.Returns the result from the server in the message body.

[Try online.](https://try.pipeforce.org/#/commandform?command=http.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url for the HTTP call.
`service` | String | false | null | The name of the internal service to be called. If this parameter is given, it will prefix the url parameter, if exists. This parameter can also contain the internal port information separated by a colon like serviceName:port. If no port is given, it will be looked-up automatically.
`headers` | String | false | null | A list of headers to append to the request. Can be a PEL pointing to a map or a list of name-value pair strings name:value or a comma separated string like: name1:value1, name2:value2.
`body` | String | false | null | The value to be set in the body of the request (if it supports a body). If this param is missing, the value from the input parameter is used. If this value is null, no body is used.
`forceContentType` | String | false | null | The value to optionally overwrite content-type header of response and affect response processing.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - http.get:  
      url: <value>  
      service: <value>  
      headers: <value>  
      body: <value>  
      forceContentType: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/http.get?url=<value>&service=<value>&headers=<value>&body=<value>&forceContentType=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command http.get url=<value> service=<value> headers=<value> body=<value> forceContentType=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## http.patch ``v1``
----------   
Executes a PATCH HTTP call to the given url.Returns the result from the server in the message body.

[Try online.](https://try.pipeforce.org/#/commandform?command=http.patch:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url for the HTTP call.
`service` | String | false | null | The name of the internal service to be called. If this parameter is given, it will prefix the url parameter, if exists. This parameter can also contain the internal port information separated by a colon like serviceName:port. If no port is given, it will be looked-up automatically.
`headers` | String | false | null | A list of headers to append to the request. Can be a PEL pointing to a map or a list of name-value pair strings name:value or a comma separated string like: name1:value1, name2:value2.
`body` | String | false | null | The value to be set in the body of the request (if it supports a body). If this param is missing, the value from the input parameter is used. If this value is null, no body is used.
`forceContentType` | String | false | null | The value to optionally overwrite content-type header of response and affect response processing.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - http.patch:  
      url: <value>  
      service: <value>  
      headers: <value>  
      body: <value>  
      forceContentType: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/http.patch?url=<value>&service=<value>&headers=<value>&body=<value>&forceContentType=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command http.patch url=<value> service=<value> headers=<value> body=<value> forceContentType=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## http.post ``v1``
----------   
Executes a POST HTTP call to the given url.Returns the result from the server in the message body.

[Try online.](https://try.pipeforce.org/#/commandform?command=http.post:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url for the HTTP call.
`service` | String | false | null | The name of the internal service to be called. If this parameter is given, it will prefix the url parameter, if exists. This parameter can also contain the internal port information separated by a colon like serviceName:port. If no port is given, it will be looked-up automatically.
`headers` | String | false | null | A list of headers to append to the request. Can be a PEL pointing to a map or a list of name-value pair strings name:value or a comma separated string like: name1:value1, name2:value2.
`body` | String | false | null | The value to be set in the body of the request (if it supports a body). If this param is missing, the value from the input parameter is used. If this value is null, no body is used.
`forceContentType` | String | false | null | The value to optionally overwrite content-type header of response and affect response processing.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - http.post:  
      url: <value>  
      service: <value>  
      headers: <value>  
      body: <value>  
      forceContentType: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/http.post?url=<value>&service=<value>&headers=<value>&body=<value>&forceContentType=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command http.post url=<value> service=<value> headers=<value> body=<value> forceContentType=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## http.put ``v1``
----------   
Executes a PUT HTTP call to the given url.Returns the result from the server in the message body.

[Try online.](https://try.pipeforce.org/#/commandform?command=http.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url for the HTTP call.
`service` | String | false | null | The name of the internal service to be called. If this parameter is given, it will prefix the url parameter, if exists. This parameter can also contain the internal port information separated by a colon like serviceName:port. If no port is given, it will be looked-up automatically.
`headers` | String | false | null | A list of headers to append to the request. Can be a PEL pointing to a map or a list of name-value pair strings name:value or a comma separated string like: name1:value1, name2:value2.
`body` | String | false | null | The value to be set in the body of the request (if it supports a body). If this param is missing, the value from the input parameter is used. If this value is null, no body is used.
`forceContentType` | String | false | null | The value to optionally overwrite content-type header of response and affect response processing.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - http.put:  
      url: <value>  
      service: <value>  
      headers: <value>  
      body: <value>  
      forceContentType: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/http.put?url=<value>&service=<value>&headers=<value>&body=<value>&forceContentType=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command http.put url=<value> service=<value> headers=<value> body=<value> forceContentType=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## http.response ``v1``
----------   
Prepares the HTTP response in case this pipeline is executed in an HTTP request context. In case the pipeline is not running inside an HTTP request context, nothing happens in executing this command. Note: In case the pipeline was initiated by an HTTP request, you can access the request headers using the headers scope: headers.request.

[Try online.](https://try.pipeforce.org/#/commandform?command=http.response:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`status` | String | false | null | The status code to be set
`headers` | String | false | null | The headers to be add. 
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - http.response:  
      status: <value>  
      headers: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/http.response?status=<value>&headers=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command http.response status=<value> headers=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## i18n.messages ``v1``
----------   
Returns the i18n messages of given app, context and locale.

[Try online.](https://try.pipeforce.org/#/commandform?command=i18n.messages:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`app` | String | false | io.pipeforce.common | The app which contains the i18n messages.
`context` | String | false | default | The context of the i18n messages.
`locale` | String | false | en | The locale of the i18n message. For example: en, de, fr and so on.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - i18n.messages:  
      app: <value>  
      context: <value>  
      locale: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/i18n.messages?app=<value>&context=<value>&locale=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command i18n.messages app=<value> context=<value> locale=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.apitoken ``v1``
----------   
Obtains the apitoken (= offline token) in exchange for user credentials provided and writes it into the output.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.apitoken:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | true | null | The user name.
`password` | String | true | null | The user password.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.apitoken:  
      username: <value>  
      password: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.apitoken?username=<value>&password=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.apitoken username=<value> password=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.authinfo ``v1``
----------   
Adds header 'authUserId' - name of an user authenticated as a sender of the pipe message.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.authinfo:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.authinfo:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.authinfo?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.authinfo id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.authorize ``v1``
----------   
Authorizes pipeline execution and overwrites any existing authentication by this new, successful authentication. Additionally puts the successful authentication token on an internal stack. See iam.logout to pop from stack.Subsequent commands will be executed only if authorization was successful. Tries each existing parameter for authentication in this order. If multiple params are given, first existing one is used from this list: accessToken, refreshToken, basic, username+password. Throws exception and exits pipeline execution on first not matching login try.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.authorize:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`accessToken` | String | false | null | The accessToken (bearer token) to be used for authentication.
`refreshToken` | String | false | null | The refreshToken to be used for authentication.
`basic` | String | false | null | The basic authentication string to be used for authentication.
`username` | String | false | null | The username to be used for authentication.
`password` | String | false | null | The password to be used for authentication.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.authorize:  
      accessToken: <value>  
      refreshToken: <value>  
      basic: <value>  
      username: <value>  
      password: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.authorize?accessToken=<value>&refreshToken=<value>&basic=<value>&username=<value>&password=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.authorize accessToken=<value> refreshToken=<value> basic=<value> username=<value> password=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.bruteforce.release ``v1``
----------   
Releases any bruteforce lock for the given user. If user is not locked, nothing happens.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.bruteforce.release:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | false | null | The name of the user to unlock. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the user to unlock. If set, the param username is ignored.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.bruteforce.release:  
      username: <value>  
      uuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.bruteforce.release?username=<value>&uuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.bruteforce.release username=<value> uuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.bruteforce.status ``v1``
----------   
Returns the bruteforce status for a single user

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.bruteforce.status:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | false | null | The name of the user to return the status for. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the user to return the status for. If set, the param username is ignored.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.bruteforce.status:  
      username: <value>  
      uuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.bruteforce.status?username=<value>&uuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.bruteforce.status username=<value> uuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.cache.clear ``v1``
----------   
Clears the security objects (and reloads roles where required). Note: Since this can be a heavy task and slow down the system, use it only in case really required!

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.cache.clear:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.cache.clear:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.cache.clear?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.cache.clear id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.group.add.roles ``v1``
----------   
Adds roles to a given group. Roles must exist beforehand.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.group.add.roles:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`groupUuid` | String | true | null | The unique group uuid.
`roleNames` | String | true | null | The role names to join. Can be a comma separated list or a PEL pointing to a list.
`groupName` | String | true | null | The unique group name.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.group.add.roles:  
      groupUuid: <value>  
      roleNames: <value>  
      groupName: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.group.add.roles?groupUuid=<value>&roleNames=<value>&groupName=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.group.add.roles groupUuid=<value> roleNames=<value> groupName=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.group.create ``v1``
----------   
Creates a new group and puts its uuid in the body under key groupUuid. Throws exception if group already exists.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.group.create:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The unique group name.
`roleNames` | String | false | null | A list of roles to be assigned to this group on creation.
`attributes` | Map | false | null | A map which holds optional attributes to be added to this group.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.group.create:  
      name: <value>  
      roleNames: <value>  
      attributes: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.group.create?name=<value>&roleNames=<value>&attributes=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.group.create name=<value> roleNames=<value> attributes=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.group.delete ``v1``
----------   
Deletes the group with given uuid.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.group.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | true | null | The uuid of the group to delete.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.group.delete:  
      uuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.group.delete?uuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.group.delete uuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.group.list ``v1``
----------   
Lists all groups. By default, the response is a JSON array with these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_grouprepresentation

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.group.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`filter` | String | false | null | If set, applies the given filter to the search for groups.
`sortByName` | String | false | null | If set, groups are returned as collection with the group name as key.
`max` | Integer | false | 100 | The max number of entries to return. If set to a higher value than 100, will be reset to 100.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.group.list:  
      filter: <value>  
      sortByName: <value>  
      max: <value>  
      offset: <value>  
      filter: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.group.list?filter=<value>&sortByName=<value>&max=<value>&offset=<value>&filter=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.group.list filter=<value> sortByName=<value> max=<value> offset=<value> filter=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.group.list.names ``v1``
----------   
Lists all group names. The response is a JSON array with these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_grouprepresentation

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.group.list.names:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`max` | Integer | false | 100 | The max number of entries to return. If set to a higher value than 100, will be reset to 100.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.group.list.names:  
      max: <value>  
      offset: <value>  
      filter: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.group.list.names?max=<value>&offset=<value>&filter=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.group.list.names max=<value> offset=<value> filter=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.group.members ``v1``
----------   
Lists all users which are member of any of the given groups. The response is a JSON array with these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_userrepresentation

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.group.members:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the group. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the group. If set, the param name is ignored.
`max` | Integer | false | 100 | The max number of entries to return. If set to a higher value than 100, will be reset to 100.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.group.members:  
      name: <value>  
      uuid: <value>  
      max: <value>  
      offset: <value>  
      filter: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.group.members?name=<value>&uuid=<value>&max=<value>&offset=<value>&filter=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.group.members name=<value> uuid=<value> max=<value> offset=<value> filter=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.group.roles ``v1``
----------   
Lists all effective role names, the given group is assigned to.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.group.roles:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`groupName` | String | false | null | The name of the group. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the group. If set, the param username is ignored.
`max` | Integer | false | 100 | The max number of entries to return. If set to a higher value than 100, will be reset to 100.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.group.roles:  
      groupName: <value>  
      uuid: <value>  
      max: <value>  
      offset: <value>  
      filter: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.group.roles?groupName=<value>&uuid=<value>&max=<value>&offset=<value>&filter=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.group.roles groupName=<value> uuid=<value> max=<value> offset=<value> filter=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.realm.create ``v1``
----------   
Creates a new realm. Sets the uuid in the body under key realmUuid. Throws exception if realm already exists. Expects a JSON in the body of this structure: https://www.keycloak.org/docs-api/11.0/rest-api/index.html#_realmrepresentation

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.realm.create:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.realm.create:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.realm.create?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.realm.create id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.role.add.composites ``v1``
----------   
Adds existing composite roles to an existing role.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.role.add.composites:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`roleName` | String | true | null | The unique role name to be loaded.
`composites` | String | true | null | The composite role names to join. Can be a comma separated list or a PEL pointing to a list.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.role.add.composites:  
      roleName: <value>  
      composites: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.role.add.composites?roleName=<value>&composites=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.role.add.composites roleName=<value> composites=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.role.create ``v1``
----------   
Creates a new role and puts its role uuid in the body under key roleUuid. Throws exception if role already exists.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.role.create:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The unique role name.
`composites` | String | false | null | A PEL list of roles names to add to this role as children. Makes this role a composite.
`attributes` | Map | false | null | A map which holds optional attributes to be added to this role.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.role.create:  
      name: <value>  
      composites: <value>  
      attributes: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.role.create?name=<value>&composites=<value>&attributes=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.role.create name=<value> composites=<value> attributes=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.role.members ``v1``
----------   
Lists all users which are member of the given role. The response is a JSON array with these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_userrepresentation

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.role.members:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`roleName` | String | false | null | The name of the role.
`max` | Integer | false | 100 | The max number of entries to return. If set to a higher value than 100, will be reset to 100.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.role.members:  
      roleName: <value>  
      max: <value>  
      offset: <value>  
      filter: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.role.members?roleName=<value>&max=<value>&offset=<value>&filter=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.role.members roleName=<value> max=<value> offset=<value> filter=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.run.as ``v1``
----------   
Executes the subsequent pipeline as different user if following two conditions are met. 1. currently logged-in user has permission CAN_RUN_AS_SOURCE 2. requested user has permission CAN_RUN_AS_TARGET 

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.run.as:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | true | null | The username, subsequent pipe commands must be executed as. This user must has RUN_AS_SOURCE role assigned.
`caching` | String | false | yes | Should the IAM cache used (= much faster)?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.run.as:  
      username: <value>  
      caching: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.run.as?username=<value>&caching=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.run.as username=<value> caching=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.search ``v1``
----------   
Searches for specific entity in the IAM service matching the given filter. Returns the JSON representation of the given type as JSON array. See here for the representation types: https://www.keycloak.org/docs-api/11.0/rest-api/ .For example the type 'USER' would return a list of 'UserRepresentation'.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.search:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`type` | String | true | null | The entity type to search for. Supported values are: ROLE, USER, GROUP, REALM.
`max` | Integer | false | 100 | The max number of entries to return. If set to a higher value than 100, will be reset to 100.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.search:  
      type: <value>  
      max: <value>  
      offset: <value>  
      filter: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.search?type=<value>&max=<value>&offset=<value>&filter=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.search type=<value> max=<value> offset=<value> filter=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.token ``v1``
----------   
Obtains the full offline token response JSON in exchange for user credentials provided and writes into the output.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.token:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | true | null | The user name.
`password` | String | true | null | The user password.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.token:  
      username: <value>  
      password: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.token?username=<value>&password=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.token username=<value> password=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.token.logout ``v1``
----------   
Logs out keycloak session associated with refreshToken and removes any refresh and access tokens from headers.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.token.logout:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`refreshToken` | String | true | null | The refresh token.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.token.logout:  
      refreshToken: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.token.logout?refreshToken=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.token.logout refreshToken=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.token.refresh ``v1``
----------   
Enrich headers with accessToken obtained from authorization server using refreshToken and returns the tokenResponse in the body.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.token.refresh:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`refreshToken` | String | true | null | The refresh token.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.token.refresh:  
      refreshToken: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.token.refresh?refreshToken=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.token.refresh refreshToken=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.user.add.groups ``v1``
----------   
Adds groups to a user by group id or name and returns the group ids added.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.user.add.groups:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | true | null | The unique username as uuid.
`groupNames` | String | false | null | The group names to join. If not given, groupIds is required.
`groupIds` | String | false | null | The group ids to join. If not given, groupNames is required.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.user.add.groups:  
      uuid: <value>  
      groupNames: <value>  
      groupIds: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.user.add.groups?uuid=<value>&groupNames=<value>&groupIds=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.user.add.groups uuid=<value> groupNames=<value> groupIds=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.user.add.roles ``v1``
----------   
Adds roles to a given user. Roles must exist beforehand.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.user.add.roles:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`userUuid` | String | true | null | The unique username as uuid.
`username` | String | true | null | The unique username as uuid.
`roleNames` | String | true | null | The role names to join. Can be a comma separated list or a PEL pointing to a list.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.user.add.roles:  
      userUuid: <value>  
      username: <value>  
      roleNames: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.user.add.roles?userUuid=<value>&username=<value>&roleNames=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.user.add.roles userUuid=<value> username=<value> roleNames=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.user.create ``v1``
----------   
Creates a new user and returns its uuid in the body. Throws exception if user already exists.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.user.create:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The unique username.
`email` | String | true | null | The unique email.
`firstName` | String | false | null | The optional first name.
`lastName` | String | false | null | The optional last name.
`groupNames` | String | false | null | The optional groups the user joins.
`roleNames` | String | false | null | The optional roles (permissions) the user must join.
`password` | String | false | null | The password to be set for this user or null in order to let the user choose one on login.
`attributes` | Map | false | null | A map which holds optional attributes to be added to this user.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.user.create:  
      name: <value>  
      email: <value>  
      firstName: <value>  
      lastName: <value>  
      groupNames: <value>  
      roleNames: <value>  
      password: <value>  
      attributes: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.user.create?name=<value>&email=<value>&firstName=<value>&lastName=<value>&groupNames=<value>&roleNames=<value>&password=<value>&attributes=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.user.create name=<value> email=<value> firstName=<value> lastName=<value> groupNames=<value> roleNames=<value> password=<value> attributes=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.user.delete ``v1``
----------   
Deletes the user with given uuid.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.user.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | true | null | The uuid of the user to delete.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.user.delete:  
      uuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.user.delete?uuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.user.delete uuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.user.get ``v1``
----------   
Looks up a user returns it in the body if exists. The response is a JSON array of these entities: https://www.keycloak.org/docs-api/15.0/rest-api/#_userrepresentation

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.user.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | false | null | The name of the user. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the user. If set, the param username is ignored.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.user.get:  
      username: <value>  
      uuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.user.get?username=<value>&uuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.user.get username=<value> uuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.user.groups ``v1``
----------   
Lists all groups, the given user is member of. By default, the response is a JSON array with these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_grouprepresentation

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.user.groups:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | false | null | The name of the user. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the user. If set, the param username is ignored.
`max` | Integer | false | 100 | The max number of entries to return. If set to a higher value than 100, will be reset to 100.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.user.groups:  
      username: <value>  
      uuid: <value>  
      max: <value>  
      offset: <value>  
      filter: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.user.groups?username=<value>&uuid=<value>&max=<value>&offset=<value>&filter=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.user.groups username=<value> uuid=<value> max=<value> offset=<value> filter=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.user.list ``v1``
----------   
Lists all users. The response is a JSON array of these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_userrepresentation

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.user.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`includeGroups` | Boolean | false | null | Include all groups, for each user he is member of? Note: If true, the command execution becomes significantly slower!
`includeRoles` | Boolean | false | null | Include all realm roles, for each user he is member of? Note: If true, the command execution becomes significantly slower!
`max` | Integer | false | 100 | The max number of entries to return. If set to a higher value than 100, will be reset to 100.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.user.list:  
      includeGroups: <value>  
      includeRoles: <value>  
      max: <value>  
      offset: <value>  
      filter: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.user.list?includeGroups=<value>&includeRoles=<value>&max=<value>&offset=<value>&filter=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.user.list includeGroups=<value> includeRoles=<value> max=<value> offset=<value> filter=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## iam.user.roles ``v1``
----------   
Lists all effective role names, the given user is member of.

[Try online.](https://try.pipeforce.org/#/commandform?command=iam.user.roles:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | false | null | The name of the user. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the user. If set, the param username is ignored.
`max` | Integer | false | 100 | The max number of entries to return. If set to a higher value than 100, will be reset to 100.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - iam.user.roles:  
      username: <value>  
      uuid: <value>  
      max: <value>  
      offset: <value>  
      filter: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/iam.user.roles?username=<value>&uuid=<value>&max=<value>&offset=<value>&filter=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command iam.user.roles username=<value> uuid=<value> max=<value> offset=<value> filter=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## if ``v1``
----------   
Executes the subsequent pipeline only if given condition evaluates to true. Otherwise, jumps to the end of this block given by the `if.end` command. 

[Try online.](https://try.pipeforce.org/#/commandform?command=if:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`true` | String | false | null | The expression which must evaluate to true in order to execute the if block. Otherwise execution flow jumps to the `if.end` command.
`end` | String | false | null | *Deprecated*. Use command `if.end` instead. Defines the end of of the if command block. 
`else` | String | false | null | *Deprecated*. Use the command `if.else` instead. Defines the else part of the if statement. If value of if evaluates to `false`, the section right after this else statement is executed until the `if.end` command. 
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - if:  
      true: <value>  
      end: <value>  
      else: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/if?true=<value>&end=<value>&else=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command if true=<value> end=<value> else=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## if.else ``v1``
----------   
Executes all commands below this command up to the `if.end` command in case initial `if` command did not execute its containing command block.

[Try online.](https://try.pipeforce.org/#/commandform?command=if.else:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - if.else:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/if.else?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command if.else id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## if.end ``v1``
----------   
Defines the end of an `if` command.

[Try online.](https://try.pipeforce.org/#/commandform?command=if.end:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - if.end:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/if.end?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command if.end id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## job ``v1``
----------   
Schedules any subsequent commands of the current pipeline and executes it at the scheduled times.

[Try online.](https://try.pipeforce.org/#/commandform?command=job:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`schedule` | String | true | null | A schedule string which configures the execution of the job. Can be one of: EVERY_2_MIN, EVERY_5_MIN, EVERY_15_MIN, EVERY_30_MIN, EVERY_45_MIN, HOURLY, DAILY, WEEKLY, MONTHLY. Furthermore in development stage also EVERY_1_MIN is allowed. Throws an exception in production stage.
`stop` | String | false | null | Deprecated. Use the command stop.stop instead. If this param is set, all other params are ignored. It contains the id of the job to be canceled.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - job:  
      schedule: <value>  
      stop: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/job?schedule=<value>&stop=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command job schedule=<value> stop=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## job.list ``v1``
----------   
Lists all scheduled pipeline jobs.

[Try online.](https://try.pipeforce.org/#/commandform?command=job.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - job.list:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/job.list?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command job.list id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## job.status ``v1``
----------   
Returns the status of a given job or null in case the job doesnt exist.

[Try online.](https://try.pipeforce.org/#/commandform?command=job.status:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pipelineKey` | String | true | null | The pipelineKey of the job those status to return
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - job.status:  
      pipelineKey: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/job.status?pipelineKey=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command job.status pipelineKey=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## job.stop ``v1``
----------   
Stops the job with given id. Note: Usually it is not required to use this command. In order to stop and unregister a job, simply remove it from the pipeline or delete the pipeline.

[Try online.](https://try.pipeforce.org/#/commandform?command=job.stop:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pipelineKey` | String | true | null | The pipeline key of the job to be cancelled.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - job.stop:  
      pipelineKey: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/job.stop?pipelineKey=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command job.stop pipelineKey=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## jpa.query ``v1``
----------   
Executes a JPA query and returns the result as JSON in the body. NOTE: This pipe is primarily meant for support to monitor the system. Its not accessible by default accounts! This can change at any time without notice!

[Try online.](https://try.pipeforce.org/#/commandform?command=jpa.query:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`query` | String | false | null | The JPA query to be executed.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - jpa.query:  
      query: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/jpa.query?query=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command jpa.query query=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## log ``v1``
----------   
Logs the given input message without changing it. Sets the log message in the body in case body is empty. Doesn't overwrite any existing content in the body.

[Try online.](https://try.pipeforce.org/#/commandform?command=log:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`message` | String | true | null | The message to log. Can be a string or a pipe expression. If null or empty, the full pipe message will be logged.
`level` | String | false | INFO | The log level. Can be one of DEBUG, TRACE, INFO, WARN, ERROR. If null or empty, INFO will be used.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - log:  
      message: <value>  
      level: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/log?message=<value>&level=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command log message=<value> level=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## log.list ``v1``
----------   
Returns the given number of log lines from specified service.

[Try online.](https://try.pipeforce.org/#/commandform?command=log.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`service` | String | false | hub | The service to print logs for. If null or empty, the 'hub' will be used.
`lines` | Integer | false | 100 | The number of lines to print in case format is text. 100 is printed when not specified. 
`format` | String | false | text | The format to be returned. One of: text, json
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - log.list:  
      service: <value>  
      lines: <value>  
      format: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/log.list?service=<value>&lines=<value>&format=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command log.list service=<value> lines=<value> format=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## log.list.email ``v1``
----------   
Returns the email audit log properties. Only available for developers, system or support users.

[Try online.](https://try.pipeforce.org/#/commandform?command=log.list.email:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`auditId` | String | false | null | The audit id (uuid) of the logged email to return. If null or empty, all emails will be returned matching the given parameters.
`createdAfter` | String | false |  | Returns only those emails created after this date in ISO-8601 format. If null or empty, no after filter will be set.
`createdBefore` | String | false |  | Returns only those emails created before this date in ISO-8601 format. If null or empty, no before filter will be set.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - log.list.email:  
      auditId: <value>  
      createdAfter: <value>  
      createdBefore: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/log.list.email?auditId=<value>&createdAfter=<value>&createdBefore=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command log.list.email auditId=<value> createdAfter=<value> createdBefore=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## log.list.environment ``v1``
----------   
Logs the current environment properties. Only available for developers, system or support users.

[Try online.](https://try.pipeforce.org/#/commandform?command=log.list.environment:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`interpolate` | String | false | true | Return all properties with values interpolated? (= ${some.var} is resolved).
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - log.list.environment:  
      interpolate: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/log.list.environment?interpolate=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command log.list.environment interpolate=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## log.search ``v1``
----------   
Searches the cloud logs and returns the last 30 entries per request. Supports pagination toscroll thru the entries. Does not return log.search log entries in order to not repeat itself.

[Try online.](https://try.pipeforce.org/#/commandform?command=log.search:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`service` | String | false | hub | The service to search for log entries. Can be a list or comma separated service names. If null or empty, 'hub' will be used as default.
`severity` | String | false | null | The severity to search inside: DEBUG, INFO, WARNING, ERROR. Can be a list or comma separated text. If null or empty, searches in all severities.
`messageFilter` | String | false | null | Message search string to filter the result by matching this string. Can be null or empty to return any entry.
`typeFilter` | String | false | null | A list of types of message logs to show. Possible values are: command, pipeline, security_audit, event_fired, webhook. If not set, all logs will be shown.
`startDateTime` | String | false | null | An ISO8601 date-time string to start the search at. If null or empty, the date-time string from 24h before will be used.
`endDateTime` | String | false | null | An ISO8601 date-time string to end the search at. If null or empty, all results up to now will be returned.
`nextPageToken` | String | false | null | If this value is given, the next page of results of a previous search is loaded.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - log.search:  
      service: <value>  
      severity: <value>  
      messageFilter: <value>  
      typeFilter: <value>  
      startDateTime: <value>  
      endDateTime: <value>  
      nextPageToken: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/log.search?service=<value>&severity=<value>&messageFilter=<value>&typeFilter=<value>&startDateTime=<value>&endDateTime=<value>&nextPageToken=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command log.search service=<value> severity=<value> messageFilter=<value> typeFilter=<value> startDateTime=<value> endDateTime=<value> nextPageToken=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## log.services ``v1``
----------   
Returns all PIPEFORCE services for those logging is allowed / enabled.

[Try online.](https://try.pipeforce.org/#/commandform?command=log.services:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - log.services:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/log.services?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command log.services id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## log.severities ``v1``
----------   
Returns all severities (for example, DEBUG, INFO,...), supported by the logging system.

[Try online.](https://try.pipeforce.org/#/commandform?command=log.severities:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - log.severities:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/log.severities?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command log.severities id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## macro ``v1``
----------   
Defines a custom macro inside a pipeline. Such a macro can then be re-used by calling the command `macro.run`.

[Try online.](https://try.pipeforce.org/#/commandform?command=macro:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The optional name of the macro. If given, the macro will be registered under this name an can be re-called using the command `macro.run`.
`args` | String | false | null | The args to the macro as name-value pairs. If this macro will be re-called, these args will be default args which can be overwritten by the caller.
`flow` | String | false | null | If set to true, the macro will be called by the pipeline flow even if `name` parameter is set.
`do` | String | false | null | The macro body to be executed as PEL.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - macro:  
      name: <value>  
      args: <value>  
      flow: <value>  
      do: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/macro?name=<value>&args=<value>&flow=<value>&do=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command macro name=<value> args=<value> flow=<value> do=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## macro.run ``v1``
----------   
Calls a defined macro by its name.

[Try online.](https://try.pipeforce.org/#/commandform?command=macro.run:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the macro to call.
`args` | String | false | null | The optional args to the macro as name-value pairs.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - macro.run:  
      name: <value>  
      args: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/macro.run?name=<value>&args=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command macro.run name=<value> args=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## mail.dump ``v1``
----------   
Fetches new emails from given mail inbox and uploads them into a drive folder. Note: This command is for demo purposes only and not intended for production use.

[Try online.](https://try.pipeforce.org/#/commandform?command=mail.dump:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`protocol` | String | false | imap | The email protocol. One of 'imap' or 'pop3'.
`host` | String | true | null | The email host.
`port` | Integer | true | null | The port of the email host.
`inboxUsername` | String | true | null | The username of the email inbox.
`inboxPassword` | String | true | null | The password of the email inbox.
`driveUsername` | String | true | null | The username of the drive account to upload to.
`drivePassword` | String | true | null | The password of the drive account to upload to.
`path` | String | false | null | The remote folder path in drive where to upload the emails into. For each new email a new sub folder will be created inside this path. If null or empty, uploads to the root folder of the logged in user.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - mail.dump:  
      protocol: <value>  
      host: <value>  
      port: <value>  
      inboxUsername: <value>  
      inboxPassword: <value>  
      driveUsername: <value>  
      drivePassword: <value>  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/mail.dump?protocol=<value>&host=<value>&port=<value>&inboxUsername=<value>&inboxPassword=<value>&driveUsername=<value>&drivePassword=<value>&path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command mail.dump protocol=<value> host=<value> port=<value> inboxUsername=<value> inboxPassword=<value> driveUsername=<value> drivePassword=<value> path=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## mail.fetch ``v1``
----------   
Fetches new emails from given mail inbox and returns them as JSON in the output. Note: This command is for demo purposes only and not intended for production use.

[Try online.](https://try.pipeforce.org/#/commandform?command=mail.fetch:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`protocol` | String | false | imap | The email protocol. One of 'imap' or 'pop3'.
`host` | String | true | null | The email host.
`port` | Integer | true | null | The port of the email host.
`inboxUsername` | String | true | null | The username of the email inbox.
`inboxPassword` | String | true | null | The password of the email inbox.
`newMailsOnly` | String | false | false | Download only new mails since last processing? If true, the state of last fetch will be kept in property store. Any new fetch will be checked with this state and email will be downloaded only if not processed yet.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - mail.fetch:  
      protocol: <value>  
      host: <value>  
      port: <value>  
      inboxUsername: <value>  
      inboxPassword: <value>  
      newMailsOnly: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/mail.fetch?protocol=<value>&host=<value>&port=<value>&inboxUsername=<value>&inboxPassword=<value>&newMailsOnly=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command mail.fetch protocol=<value> host=<value> port=<value> inboxUsername=<value> inboxPassword=<value> newMailsOnly=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## mail.send ``v1``
----------   
Sends the given message as email. The message's subject and body will be used for in the email accordingly.

[Try online.](https://try.pipeforce.org/#/commandform?command=mail.send:v1)

**Alias:** pipe.command.mail   
**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`to` | String | true | null | Comma separated list of to email addresses. Never null. If this is an expression and points to comma separated list, an array or a collection, will send an email to any of the entries.
`from` | String | false | Systems default FROM setting. | The from email.
`fromName` | String | false | Systems default FROM name setting. | The from name.
`subject` | String | false | Systems default subject setting. | The subject.
`message` | String | false | null | By default, the body is used as email message. If this param is set, it will be used as message instead. Can also be a PE which points to a value to be used as the mail message.
`replyTo` | String | false | null | Reply-To email address is used when email receiver uses its mail client's 'reply' function. If not used,the from address is used automatically.
`attachments` | String | false | null | Can be a comma separated list of URI Strings (e.g.: uri:drive:file1, uri:property:global/file2, uri:drive:file1, uri:classpath:pipeforce/file3). Also can point via PEL to a content object or a content collection. If the PEL points to an object differently to an uri or content object, serializes the value to string and attaches this as a text file.
`model` | String | false | null | The model to be placed into the template scope. If null, the message is used as model so you can access vars and body the same way as you would do in the pipeline.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - mail.send:  
      to: <value>  
      from: <value>  
      fromName: <value>  
      subject: <value>  
      message: <value>  
      replyTo: <value>  
      attachments: <value>  
      model: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/mail.send?to=<value>&from=<value>&fromName=<value>&subject=<value>&message=<value>&replyTo=<value>&attachments=<value>&model=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command mail.send to=<value> from=<value> fromName=<value> subject=<value> message=<value> replyTo=<value> attachments=<value> model=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## mail.verify ``v1``
----------   
 Protects any subsequent pipe commands: Pipeline is only executed   
 in case the caller has verified that he is the owner of given   
 email address. To do so, a magic link (verification link) is sent   
 to his email account. Only if the user clicks on this link within   
 a certain amount of time (default is 10min), the subsequent pipe   
 commands are executed. From a technical point of view this is done   
 by putting the current state of the message into a cache which deletes   
 any entries older than 10min. Then, the email with the key to this   
 cache entry (=challenge) is send to the user. If the user clicks on   
 this link, the message is loaded from the cache using the challenge as   
 the key. If the user clicked within 10min, the entry is here, can be   
 loaded and the message execution can be resumed. Otherwise if the user   
 clicks after 10min on the link, no more entry in it. Execution fails.   
 User has to re-request the link. Note: This command is for demo purposes only and not intended for production use.

[Try online.](https://try.pipeforce.org/#/commandform?command=mail.verify:v1)

**Alias:** pipe.command.email.verify   
**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`email` | String | true | null | The email address to send the challenge to.
`email.whitelist` | String | false | null | A comma separated list of allowed email addresses. Also supports wildcards *. Example: *@domain.com, my@email.com
`email.blacklist` | String | false | null | A comma separated list of blocked email addresses. Also supports wildcards *. Example: *@domain.com, my@email.com
`challenge` | String | false | null | The challenge which will become part of the link in the email when redirecting back.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - mail.verify:  
      email: <value>  
      email.whitelist: <value>  
      email.blacklist: <value>  
      challenge: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/mail.verify?email=<value>&email.whitelist=<value>&email.blacklist=<value>&challenge=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command mail.verify email=<value> email.whitelist=<value> email.blacklist=<value> challenge=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## map ``v1``
----------   
DEPRECATED. Use the set command instead. Maps, calculates and converts data from fields of the input message to fields of the output message.

[Try online.](https://try.pipeforce.org/#/commandform?command=map:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`reverse` | Boolean | false | false | Reverses the left and right expressions. This is a workaround if for some reason the left sidefor example may not contain special characters.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - map:  
      reverse: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/map?reverse=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command map reverse=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## memory.info ``v1``
----------   
Shows the current system info like memory consumption. Available for system, support and developer users only.

[Try online.](https://try.pipeforce.org/#/commandform?command=memory.info:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - memory.info:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/memory.info?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command memory.info id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## message.info.queue.get ``v1``
----------   
Returns details about a message queue.

[Try online.](https://try.pipeforce.org/#/commandform?command=message.info.queue.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`queueName` | String | true | null | The name of the queue.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - message.info.queue.get:  
      queueName: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/message.info.queue.get?queueName=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command message.info.queue.get queueName=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## message.receive ``v1``
----------   
Listens for cluster internal messages matching the given criteria. If matched, executes the pipeline commands below this command.

[Try online.](https://try.pipeforce.org/#/commandform?command=message.receive:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The routing key pattern to listen for.
`exchange` | String | false | null | The exchange to be used. If null, the default exchange will be used.
`queue` | String | false | null | The name of the queue to receive messages from. If null, the default queue name will be used.
`deleteQueue` | String | false | false | DEPRECATED. Use parameter managed instead. Delete the queue if this receive listener got removed or changed? Note: If this value is set to false, you have to track and cleanup queues manually, those are no longer in use!
`manageQueue` | String | false | create | Auto-manage queue. Possible values are: `false` = Queue must be created and deleted manually. `create` = Queue will be created if not exists (default). `delete` = Queue will be deleted automatically if this command get removed or changed. `create,delete` = Combines create and delete.
`managed` | String | false | null | DEPRECATED. Use param manageQueue instead.
`maxBatchSize` | String | false | null | Collects messages up to the given maxBatchSize in bytes and then processes this pipeline with all collected messages at once. All batched messages will be provided as array into the event body. If this parameter is null, empty or negative, no batching is used at all: Processes each message as single call. Maximum value can be 200KB (204800). If this parameter is used together with `maxBatchItems` the one which matches first is considered.
`maxBatchItems` | String | false | null | Collects the amount of messages up to the given number of maxBatchItems and then processes this pipeline with all collected messages at once. All batched messages will be provided as array into the event body. If this parameter is null, empty or negative, no batching is used at all: Processes each message as single call. If this parameter is used together with `maxBatchSize` the one which matches first is considered.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - message.receive:  
      key: <value>  
      exchange: <value>  
      queue: <value>  
      deleteQueue: <value>  
      manageQueue: <value>  
      managed: <value>  
      maxBatchSize: <value>  
      maxBatchItems: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/message.receive?key=<value>&exchange=<value>&queue=<value>&deleteQueue=<value>&manageQueue=<value>&managed=<value>&maxBatchSize=<value>&maxBatchItems=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command message.receive key=<value> exchange=<value> queue=<value> deleteQueue=<value> manageQueue=<value> managed=<value> maxBatchSize=<value> maxBatchItems=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## message.send ``v1``
----------   
Sends a new message to the message service. Uses the pipeline message body as payload.

[Try online.](https://try.pipeforce.org/#/commandform?command=message.send:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The routing key to send the message as.
`exchange` | String | false | null | The exchange to be used. If null, the default exchange will be used.
`payload` | String | false | null | The payload to be send in the message. If parameter is missing, the message body will be used as payload.
`headers` | String | false | null | The headers to be send with the message. Values in here will overwrite any already existing header values.
`encoding` | String | false | UTF-8 | The encoding of the message payload.
`contentType` | String | false | application/json | Sets the content type of the message payload.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - message.send:  
      key: <value>  
      exchange: <value>  
      payload: <value>  
      headers: <value>  
      encoding: <value>  
      contentType: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/message.send?key=<value>&exchange=<value>&payload=<value>&headers=<value>&encoding=<value>&contentType=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command message.send key=<value> exchange=<value> payload=<value> headers=<value> encoding=<value> contentType=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## microsoft.teams.send ``v1``
----------   
Sends a message to a Microsoft Teams channel.Note: This command needs an additional license + plugin. This is here only for documentation purposes. Ask support@pipeforce.io for more information.

[Try online.](https://try.pipeforce.org/#/commandform?command=microsoft.teams.send:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | true | null | The Teams webhook url to post the message to.
`message` | String | true | null | The text message to be send to Teams.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - microsoft.teams.send:  
      url: <value>  
      message: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/microsoft.teams.send?url=<value>&message=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command microsoft.teams.send url=<value> message=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## mock.command ``v1``
----------   
Mocks a given command of the current pipeline.

[Try online.](https://try.pipeforce.org/#/commandform?command=mock.command:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`enabled` | String | false | true | Is the mock active? Can be a boolean or a PEL returning a boolean
`command` | String | true | null | The name of the command to mock
`when` | String | false | #{true} | The mock expression: When this evaluates to true, the mock will be applied.
`thenSetBody` | String | false | null | The value to be returned in the body when this mock applies. If not defined, the current body will not be changed.
`thenSetVar` | String | false | null | Defines a map which will be set as vars.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - mock.command:  
      enabled: <value>  
      command: <value>  
      when: <value>  
      thenSetBody: <value>  
      thenSetVar: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/mock.command?enabled=<value>&command=<value>&when=<value>&thenSetBody=<value>&thenSetVar=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command mock.command enabled=<value> command=<value> when=<value> thenSetBody=<value> thenSetVar=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pdf.create ``v1``
----------   
Creates a new PDF with blank pages.

[Try online.](https://try.pipeforce.org/#/commandform?command=pdf.create:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pages` | String | false | 1 | The number of pages to create. May not be 0 or negative.
`format` | String | false | A4 | The format of the pages to create. One of: A0, A1, A2, A3, A4, A5, A6, LEGAL, LETTER
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pdf.create:  
      pages: <value>  
      format: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pdf.create?pages=<value>&format=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pdf.create pages=<value> format=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pdf.merge ``v1``
----------   
Takes collection of pdfs that is expected in the body (as pipeline resource) and converts it into single pdf document.

[Try online.](https://try.pipeforce.org/#/commandform?command=pdf.merge:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of resulting document content.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pdf.merge:  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pdf.merge?name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pdf.merge name=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pdf.stamp ``v1``
----------   
Writes both text or images to a pdf file under a specific layer. It expects the word pdf file as a pipeline resource in the body and transforms the result back also as a pipeline resource in the body.

[Try online.](https://try.pipeforce.org/#/commandform?command=pdf.stamp:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`text` | String | false | null | The text to write on the PDF file. It is required to either enter text or image.
`textSize` | String | false | 18 | The size of the font.
`textColor` | String | false | BLUE | The color of the font like GREEN, RED. YELLOW, aso.
`image` | String | false | null | The image to write on the pdf file. One of param text or image is required. The image must be a content uri an existing content object in the message or a built-in stamp name like APPROVED for example.
`pages` | String | false | 0 | The pages to put the stamp on or use 'ALL' for all pages.
`position` | String | false | TOP_RIGHT | The x,y coordinates of the overlay to write. Must be 2 comma separated float values, e.g.: 123,123. Note: Top right corner within an A4 page is 612,792. Alternatively, relative positioning is possible by using one of: CENTER, TOP_RIGHT, TOP_LEFT aso.Alternatively, value PARAGRAPH activate paragraph positioning. All PARAGRAPH positioned stamps will not overlap each other.
`layer` | String | false | null | The name of the layer to be created for the stamp. If null or empty, no layer is created. The stamp is added then directly to the page without any layer.
`opacity` | Float | false | null | Amount of opacity that should be applied (Must be a value between >= 0.0 and <= 1.0, 0.0 means no opacity, 1.0 means invisible.)
`degree` | Float | false | null | Specifies how many degress the element should be rotated. Negative degree means rotated below x-axis, positive degree means above. Must be a value between >= -180.0 and <= 180.0
`margin` | Collection | false | 20 | Considers page margin when applying stamp. Can be a single value or a comma separated list of 4 entries forsetting margin in this order: [top, right, down, left]
`lineNo` | Integer | false | 0 | Enforces that text is written at a specific line
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pdf.stamp:  
      text: <value>  
      textSize: <value>  
      textColor: <value>  
      image: <value>  
      pages: <value>  
      position: <value>  
      layer: <value>  
      opacity: <value>  
      degree: <value>  
      margin: <value>  
      lineNo: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pdf.stamp?text=<value>&textSize=<value>&textColor=<value>&image=<value>&pages=<value>&position=<value>&layer=<value>&opacity=<value>&degree=<value>&margin=<value>&lineNo=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pdf.stamp text=<value> textSize=<value> textColor=<value> image=<value> pages=<value> position=<value> layer=<value> opacity=<value> degree=<value> margin=<value> lineNo=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pinboard.item.delete ``v1``
----------   
Deletes a pinboard item of currently logged-in user.

[Try online.](https://try.pipeforce.org/#/commandform?command=pinboard.item.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | false | null | The uuid of the pinboard item to delete.
`value` | String | false | null | The value of the pinboard item to delete.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pinboard.item.delete:  
      uuid: <value>  
      value: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pinboard.item.delete?uuid=<value>&value=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pinboard.item.delete uuid=<value> value=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pinboard.item.get ``v1``
----------   
Lists all pinboard items or returns a concrete one by uuid.

[Try online.](https://try.pipeforce.org/#/commandform?command=pinboard.item.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | false | null | The uuid of the pinboard item to return. If not given, all pinboard items of currently logged-in user will be returned, ordered by order value.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pinboard.item.get:  
      uuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pinboard.item.get?uuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pinboard.item.get uuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pinboard.item.put ``v1``
----------   
Creates a new pinboard item or updates an existing one.

[Try online.](https://try.pipeforce.org/#/commandform?command=pinboard.item.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | false | null | The uuid of the pinboard item to update. If not given, a new one will be created.
`value` | String | true | null | The pinboard value.
`order` | String | false | null | The order of the item in the pinboard as int value. ASC.
`name` | String | true | null | The name of the pinboard item.
`icon` | String | false | null | The icon of the pinboard item. If null, a default icon will be used.
`color` | String | false | null | The color of the icon. If null, the default color will be used.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pinboard.item.put:  
      uuid: <value>  
      value: <value>  
      order: <value>  
      name: <value>  
      icon: <value>  
      color: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pinboard.item.put?uuid=<value>&value=<value>&order=<value>&name=<value>&icon=<value>&color=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pinboard.item.put uuid=<value> value=<value> order=<value> name=<value> icon=<value> color=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pipeline.debug.status ``v1``
----------   
Returns the status of a running debugging session.

[Try online.](https://try.pipeforce.org/#/commandform?command=pipeline.debug.status:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`sessionId` | String | false | null | The debug session id. If null or empty, a new debugging session is created.
`pipelineKey` | String | false | null | The property key of the pipeline to monitor. Required only on first call. Ignored if sessionId is set.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pipeline.debug.status:  
      sessionId: <value>  
      pipelineKey: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pipeline.debug.status?sessionId=<value>&pipelineKey=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pipeline.debug.status sessionId=<value> pipelineKey=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pipeline.delete ``v1``
----------   
Deletes a persisted pipeline.

[Try online.](https://try.pipeforce.org/#/commandform?command=pipeline.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The exact name of the pipeline to delete.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - pipeline.delete:  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pipeline.delete?name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pipeline.delete name=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pipeline.get ``v1``
----------   
Returns all persisted pipelines matching the given name.

[Try online.](https://try.pipeforce.org/#/commandform?command=pipeline.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the pipeline to search for. Supports wildcard * matching. If null or empty, returns all entries.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pipeline.get:  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pipeline.get?name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pipeline.get name=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pipeline.put ``v1``
----------   
Persists a new pipeline to the system or updates an existing one. The pipeline yaml is expected in the body. Can be null. Returns the updated property in the output.

[Try online.](https://try.pipeforce.org/#/commandform?command=pipeline.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The unique name of this pipeline within this namespace.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pipeline.put:  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pipeline.put?name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pipeline.put name=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## pipeline.run ``v1``
----------   
Loads and executes the persisted pipeline and returns its result in the output.

[Try online.](https://try.pipeforce.org/#/commandform?command=pipeline.run:v1)

**Alias:** command:pipeline.start:v1   
**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the pipeline in the property store to load and executed. Can be relative inside current namespace or qualified.
`path` | String | true | null | The path of the pipeline in the property store to load and executed. Can be relative inside current namespace or qualified.
`name` | String | false | null | DEPRECATED. Use param key instead. The key of the pipeline in the property store to load and executed. Can be relative inside current namespace or qualified.
`vars` | String | false | null | A variables map to be put on this pipeline. Note: Any var in this map will overwrite the var in the target pipeline vars scope.
`headers` | String | false | null | A headers map to be put on this pipeline. Note: Any header in this map will overwrite the header in the target pipeline headers scope.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - pipeline.run:  
      key: <value>  
      path: <value>  
      name: <value>  
      vars: <value>  
      headers: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/pipeline.run?key=<value>&path=<value>&name=<value>&vars=<value>&headers=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command pipeline.run key=<value> path=<value> name=<value> vars=<value> headers=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.app.config ``v1``
----------   
Returns all config resources from apps the current user has access to (role CAN_APP_ is assigned) as a list into the output.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.app.config:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`appNames` | String | false | null | A comma separated list of app names those config must be returned. If null or empty, all configs of all apps are returned, the currently logged in user is assigned to. If there is an app name given which doesnt exist or the current user has no access to, nothing happens for security reasons.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.app.config:  
      appNames: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.app.config?appNames=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.app.config appNames=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.attachment.checksum ``v1``
----------   
Calculates and verifies the checksum of a property attachment. Calculating the checksum of an attachment using this command also means closing it, so that no more chunks can be added. The checksum of an attachment is calculated by concatenating the MD5 of all chunks into a single MD5 digest.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.attachment.checksum:v1)

**Version:** ``v1``  
**Input body type:** ``Byte[]``  
**Output body type:** ``Void``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Depreacted. Use path instead. The key of the property containing the attachments.
`path` | String | false | null | The path of the property containing the attachments.
`uuid` | String | false | null | The uuid of the property containing the attachments. If this is given, path param is ignored.
`name` | String | false | null | The name of the attachment to be checked. 
`checksum` | String | false | null | The checksum to be used for verification. If not given, no verification is done, but checksum of attachment is calculated and stored anyhow.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.attachment.checksum:  
      key: <value>  
      path: <value>  
      uuid: <value>  
      name: <value>  
      checksum: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.attachment.checksum?key=<value>&path=<value>&uuid=<value>&name=<value>&checksum=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.attachment.checksum key=<value> path=<value> uuid=<value> name=<value> checksum=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.attachment.chunk.content ``v1``
----------   
Returns the content (data) of a chunk of an attachment in the output as input stream. Returns empty body if chunk was not found.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.attachment.chunk.content:v1)

**Version:** ``v1``  
**Input body type:** ``Void``  
**Output body type:** ``Byte[]``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | Deprecated. Use path instead. The key of the property this attachment belongs to.
`path` | String | true | null | The path of the property this attachment belongs to.
`name` | String | true | null | The name of the attachment this chunk belongs to.
`index` | String | false | 0 | The index of the chunk to return.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.attachment.chunk.content:  
      key: <value>  
      path: <value>  
      name: <value>  
      index: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.attachment.chunk.content?key=<value>&path=<value>&name=<value>&index=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.attachment.chunk.content key=<value> path=<value> name=<value> index=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.attachment.chunk.get ``v1``
----------   
Returns the metadata of an chunk of an attachment. Throws error in case property or attachment doesn't exist. Return null in case no chunk exists at given index.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.attachment.chunk.get:v1)

**Version:** ``v1``  
**Input body type:** ``Void``  
**Output body type:** ``Byte[]``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property this attachment belongs to.
`path` | String | true | null | The path of the property this attachment belongs to.
`name` | String | true | null | The name of the attachment this chunk belongs to.
`index` | String | false | 0 | The index of the chunk to return.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.attachment.chunk.get:  
      key: <value>  
      path: <value>  
      name: <value>  
      index: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.attachment.chunk.get?key=<value>&path=<value>&name=<value>&index=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.attachment.chunk.get key=<value> path=<value> name=<value> index=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.attachment.chunk.put ``v1``
----------   
Adds a chunk of data to the given attachment. Note: A chunk may not be bigger than 10MB. Otherwise, it gets rejected from the backend.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.attachment.chunk.put:v1)

**Version:** ``v1``  
**Input body type:** ``Void``  
**Output body type:** ``Byte[]``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property this attachment belongs to.
`path` | String | true | null | The path of the property this attachment belongs to.
`name` | String | true | null | The name of the attachment this chunk belongs to.
`index` | String | false | null | The index of the chunk. If given, the content of the chunk at given index is replaced with the new content. If null or empty, a new chunk is added to the attachment.
`content` | String | false | null | The content to be added to the chunk. If this parameter is null or empty, the body will be used as content instead.
`storageId` | String | false | database | The id of the storage to be used in the backend to store the binary data of the attachment. Possible values: database, drive.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.attachment.chunk.put:  
      key: <value>  
      path: <value>  
      name: <value>  
      index: <value>  
      content: <value>  
      storageId: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.attachment.chunk.put?key=<value>&path=<value>&name=<value>&index=<value>&content=<value>&storageId=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.attachment.chunk.put key=<value> path=<value> name=<value> index=<value> content=<value> storageId=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.attachment.content ``v1``
----------   
Returns the content of an property attachment as a byte stream content object into the output.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.attachment.content:v1)

**Version:** ``v1``  
**Input body type:** ``Void``  
**Output body type:** ``Byte[]``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property this attachment belongs to.
`path` | String | true | null | The path of the property this attachment belongs to.
`name` | String | false | null | The name of the attachment.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.attachment.content:  
      key: <value>  
      path: <value>  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.attachment.content?key=<value>&path=<value>&name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.attachment.content key=<value> path=<value> name=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.attachment.delete ``v1``
----------   
Removes an attachment and its content from a property.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.attachment.delete:v1)

**Version:** ``v1``  
**Input body type:** ``Void``  
**Output body type:** ``Void``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property containing the attachment.
`path` | String | true | null | The path of the property containing the attachment.
`name` | String | true | null | The name of the attachment to be deleted.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.attachment.delete:  
      key: <value>  
      path: <value>  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.attachment.delete?key=<value>&path=<value>&name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.attachment.delete key=<value> path=<value> name=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.attachment.get ``v1``
----------   
Returns an attachment of a property (without content).

[Try online.](https://try.pipeforce.org/#/commandform?command=property.attachment.get:v1)

**Version:** ``v1``  
**Input body type:** ``Void``  
**Output body type:** ``Byte[]``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property this attachment belongs to.
`path` | String | true | null | The path of the property this attachment belongs to.
`name` | String | false | null | The name of the attachment to return.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.attachment.get:  
      key: <value>  
      path: <value>  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.attachment.get?key=<value>&path=<value>&name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.attachment.get key=<value> path=<value> name=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.attachment.list ``v1``
----------   
Lists all attachments of a given property. The content is not part of this list. Use property.attachment.chunk.get in order to retrieve the content data.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.attachment.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property to list its attachments for.
`path` | String | true | null | The path of the property to list its attachments for.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.attachment.list:  
      key: <value>  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.attachment.list?key=<value>&path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.attachment.list key=<value> path=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.attachment.put ``v1``
----------   
Creates and adds attachments to a property. Optionally with binary payload data. Overwrites / updates any existing attachments with same name. The attachments can be added in three ways: A) A single content object or a collection of content objects is given in input, then its payload and metadata is used to create the attachment(s). B) Data different to a content object is given in the input. Then this data will be used as the payload for the attachment. C) Input is null or empty. Then an empty attachment without any payload will be created. In case B) and C) the additional parameters name, contentType and length are mandatory. In case A) The parameters name, contentType and length are optional and will be used as fallback value in case a content object is them missing. 

[Try online.](https://try.pipeforce.org/#/commandform?command=property.attachment.put:v1)

**Version:** ``v1``  
**Input body type:** ``Byte[]``  
**Output body type:** ``Void``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property containing the attachments.
`path` | String | false | null | The path of the property containing the attachments.
`uuid` | String | false | null | The uuid of the property containing the attachments. If this is given, path param is ignored.
`name` | String | false | null | The name of the attachment to be created. If an attachment with this name already exists, updates the existing one. This parameter is not required in case the input is a content object or a content collection.
`content` | String | false | null | The content to add. If null, the data in the body will be added. In case you would like to explicitly set no content at all (also not from the body), set this value to: false.
`contentType` | String | false | null | The content type to be used for the attachment. This parameter is optional in case the input is a content object or a content collection.
`length` | String | false | null | The length of the attachment. This parameter is not required in case the input is a content object or content collection.
`storageId` | String | false | database | The id of the storage to be used in the backend to store the binary data of the attachment. Possible values: database, drive.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.attachment.put:  
      key: <value>  
      path: <value>  
      uuid: <value>  
      name: <value>  
      content: <value>  
      contentType: <value>  
      length: <value>  
      storageId: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.attachment.put?key=<value>&path=<value>&uuid=<value>&name=<value>&content=<value>&contentType=<value>&length=<value>&storageId=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.attachment.put key=<value> path=<value> uuid=<value> name=<value> content=<value> contentType=<value> length=<value> storageId=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.attachment.put.uri ``v1``
----------   
Sets property attachment to be symlink to resource referenced by uri.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.attachment.put.uri:v1)

**Version:** ``v1``  
**Input body type:** ``Void``  
**Output body type:** ``Byte[]``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property this attachment belongs to.
`path` | String | true | null | The path of the property this attachment belongs to.
`name` | String | true | null | The name of the attachment.
`uri` | String | true | null | The uri of resource to point symlink to.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.attachment.put.uri:  
      key: <value>  
      path: <value>  
      name: <value>  
      uri: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.attachment.put.uri?key=<value>&path=<value>&name=<value>&uri=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.attachment.put.uri key=<value> path=<value> name=<value> uri=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.copy ``v1``
----------   
Copies a property from one key to another. If target property already exists, overwrites it. NOTE: Doesnt copy the attachments.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.copy:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The origin key of the property.Otherwise a new entry is created.
`path` | String | false | null | The origin path of the property.Otherwise a new entry is created.
`to` | String | true | null | The target key to copy the property to. If a property with this key already exists, it will be overwritten.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.copy:  
      key: <value>  
      path: <value>  
      to: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.copy?key=<value>&path=<value>&to=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.copy key=<value> path=<value> to=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.delete ``v1``
----------   
Deletes one or more existing properties matching the given search pattern. Use this command with care!

[Try online.](https://try.pipeforce.org/#/commandform?command=property.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pattern` | String | true | null | The path pattern of the properties to delete. All matching properties will be deleted!
`trashBin` | String | false | false | In case this parameter is set to true, the property wont be removed but moved to the trash bin instead (= flagged with trash lock).
`trashBinTimeToLive` | String | false | null | The time in millis after the property must be removed from bin and fully deleted. If set to null or empty, the system defaults will apply for final deleting trashed properties. This is typically a value between 30 and 90 days.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.delete:  
      pattern: <value>  
      trashBin: <value>  
      trashBinTimeToLive: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.delete?pattern=<value>&trashBin=<value>&trashBinTimeToLive=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.delete pattern=<value> trashBin=<value> trashBinTimeToLive=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.exists ``v1``
----------   
Checks whether a given property exists and returns the boolean result in the body.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.exists:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The path key of the property to check for. 
`path` | String | true | null | The path of the property to check for. 
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.exists:  
      key: <value>  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.exists?key=<value>&path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.exists key=<value> path=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.get ``v1``
----------   
Returns the property with given key.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The relative or absolute (with namespace) property key. If uuid is given, this parameter is ignored. One of of uuid or path is mandatory.
`path` | String | false | null | The relative or absolute (with namespace) property path. If uuid is given, this parameter is ignored. One of of uuid or path is mandatory.
`uuid` | String | false | null | The uuid of the property. If this parameter is given, parameter key is ignored. On of uuid or key is mandatory.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.get:  
      key: <value>  
      path: <value>  
      uuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.get?key=<value>&path=<value>&uuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.get key=<value> path=<value> uuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.import ``v1``
----------   
Imports properties given as JSON document in the body into the property store.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.import:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`strategy` | String | false | skip | Defines what to do if a property with same path already exists. Possible values are: update = Update existing fields of the property from the import values. rollback = Do not import at all. Also all other properties wont be imported in this case. skip = Skip the already existing entry but log it. 
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.import:  
      strategy: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.import?strategy=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.import strategy=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.list ``v1``
----------   
Lists all properties from the store.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pattern` | String | false | null | The key pattern of the properties to search for. Also supports key pattern matching whereas * matches a single part inside a directory in the key and ** everything. For example '/pipeforce/namespace/user/**' would return all properties of all users in the given namespace. Also sub levels of this key. To avoid sub-leveling use the * instead: '/pipeforce/namespace/user/*'. This would return /pipeforce/namespace/user/max' but not /pipeforce/namespace/user/max/contracts'.
`filter` | String | false | null | This parameter is deprecated. Use param 'pattern' instead.
`includeTrashed` | String | false | false | Include also properties moved to trash bin?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.list:  
      pattern: <value>  
      filter: <value>  
      includeTrashed: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.list?pattern=<value>&filter=<value>&includeTrashed=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.list pattern=<value> filter=<value> includeTrashed=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.lock.create ``v1``
----------   
Creates a lock on a given property. In case someone tries to change or delete a locked property without being part of the exclusive guild, an exception is thrown.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.lock.create:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property to lock.
`path` | String | true | null | The path of the property to lock.
`type` | String | false | global | The type of the lock for which range the lock is exclusive. One of: `user`, `role`, `group`, `namespace`, `global` or 'trash'. If null, empty or different from the types mentioned here, the lock will be global by default.
`ttl` | String | false | null | The time-to-live of the lock in milliseconds. After this amount of time, the lock will be automatically removed or the property will be deleted if lock is of type `trash`. If this value is null or empty, the lock is not limited to a time-to-live and must be removed manually. Note: The lock cleanup job will run any few minutes, so if `ttl` of a lock has been set to a few milliseconds or seconds it can be, that it is fully removed from the metadata returned by reading a property only after some minutes. Writing to the property instead works immediately after the `ttl` has been expired. 
`uuid` | String | false | null | In case the lock is of type `user`, this parameter must contain the uuid of the user this lock is exclusive to. If this parameter is missing, the uuid of the currently logged-in user will be used.
`name` | String | false | null | In case the lock is of type `role` or `group`, this parameter is mandatory and defines the name of the role or group, this lock is exclusive to. In case the type of the lock is `namespace`, this parameter is optional. If given, this name is used as namespace to create the lock for, otherwise the current namespace of the instance is used. In case the type of the lock is `global`, this parameter will be ignored.
`details` | String | false | null | Some optional data to be set on the lock.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.lock.create:  
      key: <value>  
      path: <value>  
      type: <value>  
      ttl: <value>  
      uuid: <value>  
      name: <value>  
      details: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.lock.create?key=<value>&path=<value>&type=<value>&ttl=<value>&uuid=<value>&name=<value>&details=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.lock.create key=<value> path=<value> type=<value> ttl=<value> uuid=<value> name=<value> details=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.lock.get ``v1``
----------   
Returns the lock tag for a given property. In case there is no lock for this property, null is returned.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.lock.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | Deprecated. Use path instead. The key of the property to return the lock tag for.
`path` | String | true | null | The path of the property to return the lock tag for.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.lock.get:  
      key: <value>  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.lock.get?key=<value>&path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.lock.get key=<value> path=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.lock.remove ``v1``
----------   
Removes a lock from a given property.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.lock.remove:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property to remove the lock from.
`path` | String | true | null | The path of the property to remove the lock from.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.lock.remove:  
      key: <value>  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.lock.remove?key=<value>&path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.lock.remove key=<value> path=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.move ``v1``
----------   
Moves a property from one key to another.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.move:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | The origin path key of the property.Otherwise a new entry is created.
`path` | String | true | null | Deprecated. Use path instead. The origin path key of the property.Otherwise a new entry is created.
`to` | String | true | null | The target key to move the property to. If a property with this key already exists, an exception is thrown.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.move:  
      key: <value>  
      path: <value>  
      to: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.move?key=<value>&path=<value>&to=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.move key=<value> path=<value> to=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.path.children ``v1``
----------   
Returns all property child keys for a given parent key. For any child 'folder', returns / at the very end.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.path.children:v1)

**Alias:** command:property.keys.children:v1   
**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pattern` | String | true | null | The key pattern of the parent property or properties. Can be a static suffix like my/parent/path or my/parent/path/ or a pattern like my/parent/path/*.  Nested patterns like my/*/path/* are not supported. 
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.path.children:  
      pattern: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.path.children?pattern=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.path.children pattern=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.path.list ``v1``
----------   
Returns all property paths for a given pattern.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.path.list:v1)

**Alias:** command: property.keys:v1   
**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pattern` | String | true | null | The key pattern of the properties to search for. Also supports path pattern matching whereas * matches a single part inside a directory in the key and ** everything. For example '/pipeforce/namespace/user/**' would return all properties of all users in the given namespace. Also sub levels of this path. To avoid sub-leveling use the * instead: '/pipeforce/namespace/user/*'. This would return /pipeforce/namespace/user/max' but not /pipeforce/namespace/user/max/contracts'. 
`includeTrashed` | String | false | false | Include also properties moved to trash bin in the search?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.path.list:  
      pattern: <value>  
      includeTrashed: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.path.list?pattern=<value>&includeTrashed=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.path.list pattern=<value> includeTrashed=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.put ``v1``
----------   
Saves the value of a property. The property schema must exist in advance (no new property will be created).

[Try online.](https://try.pipeforce.org/#/commandform?command=property.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The path key of the property to save. If property with key already exists, the existing property will be loaded and updated instead. Otherwise a new entry is created.
`path` | String | true | null | The path of the property to save. If property with this path already exists, the existing property will be loaded and updated instead. Otherwise a new entry is created.
`value` | String | false | null | The value of the property. May be null or empty.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.put:  
      key: <value>  
      path: <value>  
      value: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.put?key=<value>&path=<value>&value=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.put key=<value> path=<value> value=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.query ``v1``
----------   
Queries the properties from the backend by using a certain query language.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.query:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dialect` | String | true | null | The query language to be used.
`select` | String | false | null | Selects the attributes / columns / scalars to return. If null or empty, and select all is used.
`from` | String | true | null | Defines the properties by key patterns to be selected for the query. Multiple patterns must be separated by comma. Additionally, each pattern must be assigned to a variable using 'has varName'. For example global/app/** as all. This variable will used in the select and where clause.
`where` | String | false | null | Defines the WHERE clause in order to filter the result based on the supported filter criteria. The syntax of the criteria depends on the selected query language.
`type` | String | false | application/json | The property type to query for. If null, application/json will be used as default. If set to empty string or * all types will be selected.
`params` | String | false | null | A map of parameters an their values to be used in order to execute the query as prepared stament.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.query:  
      dialect: <value>  
      select: <value>  
      from: <value>  
      where: <value>  
      type: <value>  
      params: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.query?dialect=<value>&select=<value>&from=<value>&where=<value>&type=<value>&params=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.query dialect=<value> select=<value> from=<value> where=<value> type=<value> params=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.schema.delete ``v1``
----------   
Deletes any existing property schema and its assigned value matching the given pattern or key.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.schema.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | Deprecated. Use pattern instead. The exact path key of the property to delete. If property with this key doesnt exist, nothing happens.
`pattern` | String | true | null | The path key pattern of the single property or the properties to delete. All matching properties will be deleted!
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.schema.delete:  
      key: <value>  
      pattern: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.schema.delete?key=<value>&pattern=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.schema.delete key=<value> pattern=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.schema.put ``v1``
----------   
Creates or updates a property schema. This command is intended for provisioning, admin and service tasks. Also consider property.put instead. Returns a result JSON indicating the result of the command which usually is one of: create, update or skip.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.schema.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The path key of the property to save. If property with key already exists, it will be updated. Otherwise, a new entry is created.
`path` | String | true | null | The path key of the property to save. If property with key already exists, it will be updated. Otherwise a new entry is created.
`defaultValue` | String | false | null | The default value of the property. May be null.
`value` | String | false | null | The value of the property as a preset. May be null.
`type` | String | false | STRING | The type of the property. One of: STRING, BOOL, INT, LONG, DECIMAL, JSON. This param is considered only in case a new property is created.
`ttl` | Integer | false | null | The time to life of this property in minutes. After this time, the property will be automatically removed from persistence. If null or empty, it wont be deleted. This param is considered only in case a new property is created.
`evalValue` | Boolean | false | true | If true, the value of the property is evaluated before it is stored. Set this to false in order to store the value as it is without any interpretation.
`existStrategy` | String | false | update | In case a property with given key already exists, uses one of these strategies: update = The property is updated/overwritten by the new data. skip = The property is skipped. Nothing is changed in persistence layer. error = An error is thrown in case property already exists.
`attachments` | String | false | null | The attachments to be added to this property. Can be a uri or a PEL. Overwrites existing ones.
`tags` | String | false | null | The initial tags to add to this property. Can be a comma separated list of name value pairs, like this name1:value1, name2:value2.
`encrypted` | Boolean | false | false | Should the value of this property be stored encrypted? If this is set to true, every time before the property value is saved, it will be auto-encrypted using the default access key. This way you can make sure that the sensitive value is always saved in encrypted format at database layer (at rest). This increases security, but also has some drawbacks. For example: JSON queries are no longer possible then. Auto-decryption is not done for lists. You have to decrypt an encrypted value explicitly by calling property.get. Event payloads for encrypted properties are also sent encrypted only. For example for property.updated event, the payload will be the encrypted value of origin and target.
`finalAction` | String | false | null | What should happen with this property finally when pipeline execution has been finished? Available actions: 'persist' (writes the latest state to DB), 'remove' (removes the latest state from DB), null (nothing happens = default)
`retentionStrategy` | String | false | null | The retention strategy is used to decide delete property and it's data, there are two types of strategy (0,1) that decides the deletion.0 = Deletes chunks objects and data from storage if any (keeps property + attachment metadata) 1 = Deletes all (property, attachments, chunks from DB, binary data from storage if any) 
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.schema.put:  
      key: <value>  
      path: <value>  
      defaultValue: <value>  
      value: <value>  
      type: <value>  
      ttl: <value>  
      evalValue: <value>  
      existStrategy: <value>  
      attachments: <value>  
      tags: <value>  
      encrypted: <value>  
      finalAction: <value>  
      retentionStrategy: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.schema.put?key=<value>&path=<value>&defaultValue=<value>&value=<value>&type=<value>&ttl=<value>&evalValue=<value>&existStrategy=<value>&attachments=<value>&tags=<value>&encrypted=<value>&finalAction=<value>&retentionStrategy=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.schema.put key=<value> path=<value> defaultValue=<value> value=<value> type=<value> ttl=<value> evalValue=<value> existStrategy=<value> attachments=<value> tags=<value> encrypted=<value> finalAction=<value> retentionStrategy=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.search ``v1``
----------   
Returns all properties of given search criteria.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.search:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`keyFilter` | String | false | null | Deprecated. USe path instead. They key pattern to pre-select the properties to search in.
`pathFilter` | String | true | null | They path pattern to pre-select the properties to search in.
`valueFilter` | String | false | null | The search filter to search inside the value of the properties. This value is case in-sensitive.
`typeFilter` | String | false | null | The type of the property. Will find any properties containing this type. This value is case in-sensitive.
`offset` | Integer | false | null | The 0-based offset of the search result to return. If not set, no offset is used.
`page` | Integer | false | null | The 1-based index of the page to return. Does the offset calculation automatically. If this param is given, offset will be ignored.
`maxResults` | Integer | false | 30 | The number of results to return. Note: The maximum is 100 results per call because of performance reasons. In case there are more results, use the offset and pagination to retrieve them. If this parameter is set to a value > 100 it will be reset to 100.
`info` | Boolean | false | false | If set to true, the result will also include information about the request. This is useful for example for pagination.
`includeTrashed` | Boolean | false | false | Include the properties moved to trash bin in the search?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.search:  
      keyFilter: <value>  
      pathFilter: <value>  
      valueFilter: <value>  
      typeFilter: <value>  
      offset: <value>  
      page: <value>  
      maxResults: <value>  
      info: <value>  
      includeTrashed: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.search?keyFilter=<value>&pathFilter=<value>&valueFilter=<value>&typeFilter=<value>&offset=<value>&page=<value>&maxResults=<value>&info=<value>&includeTrashed=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.search keyFilter=<value> pathFilter=<value> valueFilter=<value> typeFilter=<value> offset=<value> page=<value> maxResults=<value> info=<value> includeTrashed=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.send.delivery ``v1``
----------   
Sends specified property including attachments as pipeforce delivery.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.send.delivery:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the property to send.
`message` | String | false | null | By default, the body is used as email message. If this param is set, it will be used as message instead. Can also be a PE which points to a value to be used as the mail message.
`privacyLevel` | String | false | null | The privacy level to use for delivery. One of L01_URL_ONLY, L02_CREDENTIALS, L03_ENCRYPT, L04_ENCRYPT_ALL with L01_URL_ONLY as default.
`model` | String | false | null | The optional model to be used in case point to a template.
`subject` | String | true | null | The subject of produced delivery.
`includeProperty` | String | false | null | Specify id to add property value as additional delivery attachment.
`recipients` | String | true | null | The emails of recipients.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.send.delivery:  
      key: <value>  
      message: <value>  
      privacyLevel: <value>  
      model: <value>  
      subject: <value>  
      includeProperty: <value>  
      recipients: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.send.delivery?key=<value>&message=<value>&privacyLevel=<value>&model=<value>&subject=<value>&includeProperty=<value>&recipients=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.send.delivery key=<value> message=<value> privacyLevel=<value> model=<value> subject=<value> includeProperty=<value> recipients=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.tag.list ``v1``
----------   
Returns all tags for a given property in the body as JSON: {name1:value1, name2:value2}.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.tag.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The path key of the property to list the tags for.
`path` | String | true | null | The path of the property to list the tags for.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.tag.list:  
      key: <value>  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.tag.list?key=<value>&path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.tag.list key=<value> path=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.tag.put ``v1``
----------   
Adds a tag to an existing property. Overwrites any existing one.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.tag.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The path key of the property to add the tag to.
`path` | String | true | null | The path of the property to add the tag to.
`tags` | String | false | null | A list of multiple tags to add to the property. Must a be a name-value pair list separated by comma. For example: name1:value1, name2:value2. If no tags are set, nothing happens.
`name` | String | false | null | The name of a single tag to add.
`value` | String | false | null | The value of a single tag to add. Only used in case tag name is not null.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.tag.put:  
      key: <value>  
      path: <value>  
      tags: <value>  
      name: <value>  
      value: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.tag.put?key=<value>&path=<value>&tags=<value>&name=<value>&value=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.tag.put key=<value> path=<value> tags=<value> name=<value> value=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.value.expression ``v1``
----------   
Executes the given expression on persisted properties and returns the matching ones. This type of search for properties is very powerful since it allows to search on any schemaless structures. But be aware it is low performing on a huge amount of properties.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.value.expression:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`select` | String | false | null | Specifies the attributes of each entity to return in the result set. For example person.firstName here would return a list of first names in the result in case the property has an (JSON) object as value which contains such a field. Can be null or set to '*' to return all fields.
`from` | String | true | null | Specifies the properties to be loaded for the search. Can be a relative or absolute property wildcard key path. For example: 'global/object/invoice/*
`where` | String | false | null | Specifies a selection filter to return only the properties those values match the given where filter. For example: invoice.amount > 50 would select only those properties having a field invoice.amount with value bigger than 50. If null, no where filter is applied and all properties values will be selected.
`aggregate` | String | false | null | Defines an expression to be applied on the final result. For example to count all values or to transform them. If null or empty, no aggregation will be applied.
`includeTrashed` | String | false | false | Should properties moved to trash bin included in this search?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.value.expression:  
      select: <value>  
      from: <value>  
      where: <value>  
      aggregate: <value>  
      includeTrashed: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.value.expression?select=<value>&from=<value>&where=<value>&aggregate=<value>&includeTrashed=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.value.expression select=<value> from=<value> where=<value> aggregate=<value> includeTrashed=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.value.get ``v1``
----------   
Returns the value of a given property.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.value.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property to be returned.
`path` | String | true | null | The path of the property to be returned.
`decrypt` | String | false | true | Should the value be auto-decrypted in case it is encrypted? Note: This is only possible, if the value was encrypted using the default encryption. In case this property was not encrypted, nothing happens by setting this to true.
`includeUuidField` | String | false | null | If the resulting property value is a JSON object, adds the property uuid at first level of the JSON using this value as the key name. Overwrites any existing entry with same name. If this parameter is null or empty, no entry will be added (default). If property is not a JSON, ignores this parameter.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.value.get:  
      key: <value>  
      path: <value>  
      decrypt: <value>  
      includeUuidField: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.value.get?key=<value>&path=<value>&decrypt=<value>&includeUuidField=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.value.get key=<value> path=<value> decrypt=<value> includeUuidField=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.value.list ``v1``
----------   
Lists only the values of all matching properties in an array.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.value.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pattern` | String | false | null | The key pattern of the properties to search for. Also supports key pattern matching whereas * matches a single part inside a directory in the key and ** everything. For example '/pipeforce/namespace/user/**' would return all properties of all users in the given namespace. Also sub levels of this key. To avoid sub-leveling use the * instead: '/pipeforce/namespace/user/*'. This would return /pipeforce/namespace/user/max' but not /pipeforce/namespace/user/max/contracts'.
`includeUuidField` | String | false | null | If the resulting property value is a JSON object, adds the property uuid at first level of the JSON using this value as the key name. Overwrites any existing entry with same name. If this parameter is null or empty, no entry will be added (default). If property is not a JSON, ignores this parameter.
`includeKeyField` | String | false | null | If the resulting property value is a JSON object, adds the property key at first level of the JSON using this value as the key name. Overwrites any existing entry with same name. If this parameter is null or empty, no entry will be added (default). If property is not a JSON, ignores this parameter.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.value.list:  
      pattern: <value>  
      includeUuidField: <value>  
      includeKeyField: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.value.list?pattern=<value>&includeUuidField=<value>&includeKeyField=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.value.list pattern=<value> includeUuidField=<value> includeKeyField=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.value.list.put ``v1``
----------   
Saves a list of property values by iterating over this list and storing each value separately in the property store. Each value will be persisted in its own property. The path of this property will be calculated from baseKey/valueOf(primaryKeyField).The property schema for each key must exist in advance (no new properties will be created).

[Try online.](https://try.pipeforce.org/#/commandform?command=property.value.list.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`baseKey` | String | true | null | Deprecated. Use basePath instead. The base key (= folder) of the properties to save. At the end of this key path, the primary key will be appended for each value in the list in order to save it in its property.
`basePath` | String | true | null | The base path (= folder) of the properties to save. At the end of this path, the primary path will be appended for each value in the list in order to save it in its property.
`primaryKeyField` | String | false | null | The field name inside each value item which contains the primary key. Can be a string constant or a PEL. If it is a PEL, will be evaluated for each item in the list separately. The PEL has access to variables: headers (= headers of the pipeline), vars (= pipeline variables), body (= body of the pipeline), value (= the current iteration item value about to be saved).
`iterItemName` | String | false | value | Changes the name of the iteration item value, provided for  primaryKeyField
`ignoreUuidField` | String | false | null | If this parameter contains a non-empty value, and a property value is a JSON type, tries to remove the uuid field with given name, so it is not stored to database. If this parameter is set, but the JSON field doesn't exist or the property value is not a JSON, nothing happens.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.value.list.put:  
      baseKey: <value>  
      basePath: <value>  
      primaryKeyField: <value>  
      iterItemName: <value>  
      ignoreUuidField: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.value.list.put?baseKey=<value>&basePath=<value>&primaryKeyField=<value>&iterItemName=<value>&ignoreUuidField=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.value.list.put baseKey=<value> basePath=<value> primaryKeyField=<value> iterItemName=<value> ignoreUuidField=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## property.value.put ``v1``
----------   
Saves the value of a property. The property schema must exist in advance.

[Try online.](https://try.pipeforce.org/#/commandform?command=property.value.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Deprecated. Use path instead. The key of the property to save the value to.
`path` | String | true | null | The path key of the property to save the value to.
`value` | String | false | null | The value of the property to save. May be null or empty.
`ignoreUuidField` | String | false | null | If this parameter contains a non-empty value, and the property value is a JSON type, tries to remove the uuid field with given name, so it is not stored to database. If this parameter is set but the JSON field doesn't exist or the property value is not a JSON, nothing happens.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - property.value.put:  
      key: <value>  
      path: <value>  
      value: <value>  
      ignoreUuidField: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/property.value.put?key=<value>&path=<value>&value=<value>&ignoreUuidField=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command property.value.put key=<value> path=<value> value=<value> ignoreUuidField=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## provision ``v1``
----------   
Executes a specific provision script targeted for a namespace.

[Try online.](https://try.pipeforce.org/#/commandform?command=provision:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`module` | String | false | null | Looks in the specific module for provision scripts. Using current namespaceas default value to load a namespace-specific module.
`path` | String | false | null | Path of the provision script to call. If not specified, uses default path: main.pipe.yaml
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - provision:  
      module: <value>  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/provision?module=<value>&path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command provision module=<value> path=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## publicform.definition ``v1``
----------   
Returns the form configuration of public form given by id. The schema path in the config will be automatically resolved and contains finally the resolved schema JSON.

[Try online.](https://try.pipeforce.org/#/commandform?command=publicform.definition:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | true | null | The public form id.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - publicform.definition:  
      id: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/publicform.definition?id=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command publicform.definition id=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## publicform.submit ``v1``
----------   
Stores submitted public form data and attachments. All Form definitions are searched for matching id. Additionally form needs to be marked with 'public: true' property.

[Try online.](https://try.pipeforce.org/#/commandform?command=publicform.submit:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | true | null | The public form id.
`value` | String | true | null | The value data of the form as JSON.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - publicform.submit:  
      id: <value>  
      value: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/publicform.submit?id=<value>&value=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command publicform.submit id=<value> value=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## resolve ``v1``
----------   
Resolves a given PIPEFORCE uri to its content and returns it. For example $uri:property:global/app/myapp/mydata will return the value of the mydata property. Also see: https://docs.pipeforce.org/docs/api/uris

[Try online.](https://try.pipeforce.org/#/commandform?command=resolve:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uri` | String | true | null | The PIPEFORCE uri of the content to resolve.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - resolve:  
      uri: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/resolve?uri=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command resolve uri=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## resource ``v1``
----------   
Loads a resource depending on its resource protocol like classpath:, property: or alike.

[Try online.](https://try.pipeforce.org/#/commandform?command=resource:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | false | null | DEPRECATED. Use uri instead.
`uri` | String | true | null | The uri path to load the resource from. If it starts with classpath:pipeforce, a lookup in the classpath subfolder pipeforce is done (other locations are not allowed). If it starts with property: a lookup in the property store is done and the result is thevalue of the property if exists.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - resource:  
      path: <value>  
      uri: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/resource?path=<value>&uri=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command resource path=<value> uri=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## resource.save ``v1``
----------   
Expects a resource base64 encoded in the body and saves it as a resource to hub.

[Try online.](https://try.pipeforce.org/#/commandform?command=resource.save:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path to save the resource to.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - resource.save:  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/resource.save?path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command resource.save path=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## result.complete ``v1``
----------   
Completes a processing result. The input to the command will be set as completion value to the result. In case result with given id doesn't exist or was already completed, nothing happens. So calling this completion multiple times has no effect. First one wins. Also using this for polling (by checking for non-existing exception) will not work for performance and security reasons here. Use command result.poll instead.

[Try online.](https://try.pipeforce.org/#/commandform?command=result.complete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`correlationId` | String | true | null | The id of the result to be completed.
`value` | String | false | null | The optional value to be set on the result.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - result.complete:  
      correlationId: <value>  
      value: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/result.complete?correlationId=<value>&value=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command result.complete correlationId=<value> value=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## result.delete ``v1``
----------   
Cancels and deletes a processing result. If result doesn't exist or was already cancelled, nothing happens. Will return information about the cancelled task if there was any.

[Try online.](https://try.pipeforce.org/#/commandform?command=result.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`correlationId` | String | true | null | The id of the result to be cancelled.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - result.delete:  
      correlationId: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/result.delete?correlationId=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command result.delete correlationId=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## result.get ``v1``
----------   
Returns a result from the cache but without the result value. If the result value is required, use polling instead.

[Try online.](https://try.pipeforce.org/#/commandform?command=result.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`correlationId` | String | true | null | The id of the result to return.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - result.get:  
      correlationId: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/result.get?correlationId=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command result.get correlationId=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## result.list ``v1``
----------   
Returns all existing results  (without result values) from cache.

[Try online.](https://try.pipeforce.org/#/commandform?command=result.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`status` | String | false | null | Returns all results matching this status. If null or empty, all results in any status will be returned.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - result.list:  
      status: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/result.list?status=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command result.list status=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## result.put ``v1``
----------   
Creates a result new result and registers it in the cache. 

[Try online.](https://try.pipeforce.org/#/commandform?command=result.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - result.put:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/result.put?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command result.put id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## rpa.website.close ``v1``
----------   
Closes website and releases all used resources.Note: The pipe is BETA and not intended to be used in production!

[Try online.](https://try.pipeforce.org/#/commandform?command=rpa.website.close:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - rpa.website.close:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/rpa.website.close?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command rpa.website.close id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## rpa.website.open ``v1``
----------   
Opens a website and sets its browser instance as 'vars.browser'. Note: The pipe is BETA and not intended to be used in production!

[Try online.](https://try.pipeforce.org/#/commandform?command=rpa.website.open:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | true | null | The url of the web page to open.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - rpa.website.open:  
      url: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/rpa.website.open?url=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command rpa.website.open url=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## rpa.website.scrap ``v1``
----------   
Scraps data from the current website and returns the result in the body.Note: The pipe is BETA and not intended to be used in production!

[Try online.](https://try.pipeforce.org/#/commandform?command=rpa.website.scrap:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`xpath` | String | true | null | Executes the given xpath expression on the current page and puts the result in the body. In case the xpath returns more than one results, adds an array to the body. Otherwise the body only contains the single result value.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - rpa.website.scrap:  
      xpath: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/rpa.website.scrap?xpath=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command rpa.website.scrap xpath=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## schema.pipeline ``v1``
----------   
Returns the V7 compliant JSON schema for all built-in pipes.

[Try online.](https://try.pipeforce.org/#/commandform?command=schema.pipeline:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - schema.pipeline:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/schema.pipeline?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command schema.pipeline id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## script.run ``v1``
----------   
Removed. This command is not longer supported. Consider to use function.run instead.

[Try online.](https://try.pipeforce.org/#/commandform?command=script.run:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - script.run:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/script.run?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command script.run id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secret.delete ``v1``
----------   
Deletes a credentials entry.

[Try online.](https://try.pipeforce.org/#/commandform?command=secret.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name of the credentials entry to delete.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - secret.delete:  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secret.delete?name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secret.delete name=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secret.get ``v1``
----------   
Lists the metadata (not the secret payload itself) of all available secret entries.

[Try online.](https://try.pipeforce.org/#/commandform?command=secret.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of a single credentials to return. If null or empty, all credentials will be returned.
`includeTrashed` | String | false | false | Also include the secret properties moved to trash bin in the list search?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secret.get:  
      name: <value>  
      includeTrashed: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secret.get?name=<value>&includeTrashed=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secret.get name=<value> includeTrashed=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secret.put ``v1``
----------   
Creates a new credentials entry.

[Try online.](https://try.pipeforce.org/#/commandform?command=secret.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`format` | String | true | null | The format of the secret to store. One of: secret-text, bearer, header, username-password.
`name` | String | true | null | The unique name of the credentials.
`secret` | String | true | null | The secret part (for example the username:password or Bearer TOKEN).
`timeToLive` | String | false | null | The time to live in minutes. After this time, the credentials will be deleted.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - secret.put:  
      format: <value>  
      name: <value>  
      secret: <value>  
      timeToLive: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secret.put?format=<value>&name=<value>&secret=<value>&timeToLive=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secret.put format=<value> name=<value> secret=<value> timeToLive=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.inbox.auth ``v1``
----------   
Creates and verifies a magic link download token to access a given inbox transfer.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.inbox.auth:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | true | null | The uuid of the secret send outbox, the user needs access to.
`recipientEmail` | String | true | null | The email of the recipient to create the token for.
`cookieToken` | String | false | null | In order to improve security, set a cookie value in your browser (client) and make sure on second call of this command, the cookie token is read from client and put into this command. This way you can make sure, that the client which sends the magic token is the same as theone who initially requested it. This token is optional.
`magicToken` | String | false | null | The magic token, sent to the recipient (via email) after he requested it.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.inbox.auth:  
      outboxUuid: <value>  
      recipientEmail: <value>  
      cookieToken: <value>  
      magicToken: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.inbox.auth?outboxUuid=<value>&recipientEmail=<value>&cookieToken=<value>&magicToken=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.inbox.auth outboxUuid=<value> recipientEmail=<value> cookieToken=<value> magicToken=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.inbox.download ``v1``
----------   
Downloads the content of an attachment or a group of attachments.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.inbox.download:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | false | null | The uuid of the outbox transfer to return.
`inboxUuid` | String | false | null | The uuid of the inbox transfer to return.
`filenames` | String | false | null | A list of one or more attachment filenames to be downloaded (comma separated or PEL list object). If this list is null or empty, all files of the inbox will be downloaded as single zip file. If only one file is defined, this file is downloaded plain. If there is more than one file defined, downloads all of these files as a single zip.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.inbox.download:  
      outboxUuid: <value>  
      inboxUuid: <value>  
      filenames: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.inbox.download?outboxUuid=<value>&inboxUuid=<value>&filenames=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.inbox.download outboxUuid=<value> inboxUuid=<value> filenames=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.inbox.get ``v1``
----------   
Returns an inbox transfer by uuid.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.inbox.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`inboxUuid` | String | true | null | The uuid of the inbox transfer to return. 
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.inbox.get:  
      inboxUuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.inbox.get?inboxUuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.inbox.get inboxUuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.inbox.list ``v1``
----------   
Lists all inbox transfers targeted to a given recipient.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.inbox.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`recipientEmail` | String | false | null | The email of the recipient to list the inbox for. If this param is missing, the inboxes for the currently logged-in user will be listed. This parameter can only be set in case the logged-in user has admin, developer or support permissions. Otherwise, an exception is thrown.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.inbox.list:  
      recipientEmail: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.inbox.list?recipientEmail=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.inbox.list recipientEmail=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.attachment.chunk.put ``v1``
----------   
Adds a chunk of data to an existing secret send attachment given by outboxUuid and name parameter.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.attachment.chunk.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | false | null | The uuid of the outbox transfer to add the chunk to.
`name` | String | true | null | The name of the attachment inside the outbox this chunk belongs to.
`index` | String | false | null | The index of the chunk. If given, the content of the chunk at given index is replaced with the new content. If null or empty, a new chunk is added to the attachment.
`content` | String | false | null | The content to be added to the chunk. If this parameter is null or empty, the input will be used as content instead.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.attachment.chunk.put:  
      outboxUuid: <value>  
      name: <value>  
      index: <value>  
      content: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.attachment.chunk.put?outboxUuid=<value>&name=<value>&index=<value>&content=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.attachment.chunk.put outboxUuid=<value> name=<value> index=<value> content=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.attachment.delete ``v1``
----------   
Deletes an attachment from an secret send outbox. Including its content!

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.attachment.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | true | null | The uuid of the outbox transfer to delete the attachment from.
`name` | String | true | null | The name of the attachment to be deleted.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.attachment.delete:  
      outboxUuid: <value>  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.attachment.delete?outboxUuid=<value>&name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.attachment.delete outboxUuid=<value> name=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.attachment.put ``v1``
----------   
Creates a new attachment and adds it to the given secret send outbox. The content of the attachment is expected to be referenced in the content param or - if empty - in the body. It's also possible to add the content later using the command secretsend.outbox.attachment.chunk.put.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.attachment.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | false | null | The uuid of the outbox transfer to add the attachment to.If null or empty, a new one will be created.
`name` | String | false | null | The name of the attachment to be created. If an attachment with this name already exists, updates the existing one.
`contentType` | String | false | null | The content type to be used for this attachment. In case there is a single content object, this value has precedence over the contentType of the content object, if there is any. In case there are multiple content objects, their contentType do have precedence, if set.
`content` | String | false | null | The content to add. If null, the data in the body will be added. In case you would like to explicitly set no content at all, set this value to: false.
`length` | String | false | null | The length of the attachment.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.attachment.put:  
      outboxUuid: <value>  
      name: <value>  
      contentType: <value>  
      content: <value>  
      length: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.attachment.put?outboxUuid=<value>&name=<value>&contentType=<value>&content=<value>&length=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.attachment.put outboxUuid=<value> name=<value> contentType=<value> content=<value> length=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.delete ``v1``
----------   
Deletes an outbox transfer.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | true | null | The uuid of the transfer in the outbox to delete. 
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.delete:  
      outboxUuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.delete?outboxUuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.delete outboxUuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.finalize ``v1``
----------   
Finalizes a given secret send outbox: Creates inboxes for each recipient and sends notification email to each by default.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.finalize:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | false | null | The uuid of the transfer outbox to finalize. 
`sendEmails` | String | false | true | Should the notification emails to the recipients created and send on this finalize?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.finalize:  
      outboxUuid: <value>  
      sendEmails: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.finalize?outboxUuid=<value>&sendEmails=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.finalize outboxUuid=<value> sendEmails=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.get ``v1``
----------   
Returns the outbox by given uuid.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | true | null | The uuid of the transfer outbox to return.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.get:  
      outboxUuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.get?outboxUuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.get outboxUuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.list ``v1``
----------   
Lists all outbox transfer items created by the currently logged-in user.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.list:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.list?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.list id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.preview ``v1``
----------   
Returns the preview for a given outbox, if supported by security settings.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.preview:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | false | null | The uuid of the outbox transfer to return. 
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.preview:  
      outboxUuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.preview?outboxUuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.preview outboxUuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.put ``v1``
----------   
Creates or updates a PIPEFORCE Secret Send with DRAFT status and saves it.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | false | null | The uuid of the transfer in the outbox to update. If null or empty, a new one will be created.
`subject` | String | false | null | The subject of the transfer or null (in order to set it later).
`message` | String | false | null | The message of the transfer or null (in order to set it later)
`locale` | String | false | null | The locale to be used for this secret send system message and number formats (examples: de_DE, de, en_US, ...). If null, the system default one will be used.
`recipients` | String | false | null | A comma separated list of email recipients or null (in order to add it later). Also PEL is supported here.
`expiresOn` | String | false | null | Delete the transfer attachments after this date and time given as unix timestamp in millis. If null, empty, 0 or negative, delivery will never be deleted.
`notifySender` | String | false | true | If true, notifies sender when recipients have downloaded delivery.
`retentionStrategy` | String | false | null | The retention strategy is used to decide delete property and it's data, there are two types of strategy (0,1) that decides the deletion.0 = Deletes chunks objects and data from storage if any (keeps property + attachment metadata) 1 = Deletes all (property, attachments, chunks from DB, binary data from storage if any)
`notifySenderEmailReceipt` | String | false | true | If true, notifies receipt email to the sender when mail has been sent to recipients
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.put:  
      outboxUuid: <value>  
      subject: <value>  
      message: <value>  
      locale: <value>  
      recipients: <value>  
      expiresOn: <value>  
      notifySender: <value>  
      retentionStrategy: <value>  
      notifySenderEmailReceipt: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.put?outboxUuid=<value>&subject=<value>&message=<value>&locale=<value>&recipients=<value>&expiresOn=<value>&notifySender=<value>&retentionStrategy=<value>&notifySenderEmailReceipt=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.put outboxUuid=<value> subject=<value> message=<value> locale=<value> recipients=<value> expiresOn=<value> notifySender=<value> retentionStrategy=<value> notifySenderEmailReceipt=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.recipient.delete ``v1``
----------   
Removes a recipient from a given secret send outbox. Note: This is only possible in case this transfer is in status DRAFT.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.recipient.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | true | null | The uuid of the transfer outbox to add the recipient to.
`recipientEmail` | String | true | null | The email of the recipient to add.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.recipient.delete:  
      outboxUuid: <value>  
      recipientEmail: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.recipient.delete?outboxUuid=<value>&recipientEmail=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.recipient.delete outboxUuid=<value> recipientEmail=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.recipient.email.send ``v1``
----------   
(Re-) sends the secret send notification email to the recipient.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.recipient.email.send:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | true | null | The uuid of the outbox item.
`recipientEmail` | String | true | null | The email of the recipient to send the notification to.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.recipient.email.send:  
      outboxUuid: <value>  
      recipientEmail: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.recipient.email.send?outboxUuid=<value>&recipientEmail=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.recipient.email.send outboxUuid=<value> recipientEmail=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## secretsend.outbox.recipient.put ``v1``
----------   
Adds a new recipient to a secret send. If a recipient with given email already exists, nothing happens. Updating an existing recipient is not yet supported.

[Try online.](https://try.pipeforce.org/#/commandform?command=secretsend.outbox.recipient.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`outboxUuid` | String | true | null | The uuid of the transfer outbox to add the recipient to.
`recipientEmail` | String | true | null | The email of the recipient to add.
`recipientLocale` | String | false | null | The locale to be used for this recipient like de, en or fr for example.
`sendEmail` | String | false | null | Should be an email sent to the recipient?
`enabled` | String | false | true | Is the recipient enabled = can download the transfer?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - secretsend.outbox.recipient.put:  
      outboxUuid: <value>  
      recipientEmail: <value>  
      recipientLocale: <value>  
      sendEmail: <value>  
      enabled: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/secretsend.outbox.recipient.put?outboxUuid=<value>&recipientEmail=<value>&recipientLocale=<value>&sendEmail=<value>&enabled=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command secretsend.outbox.recipient.put outboxUuid=<value> recipientEmail=<value> recipientLocale=<value> sendEmail=<value> enabled=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## server.info ``v1``
----------   
Returns information about the current server. For example the version it is running under. Returns a flat JSON with these keys: status, namespace, domain, edition, stage, tag, build, version, versionMajor, versionMinor, versionBugfix

[Try online.](https://try.pipeforce.org/#/commandform?command=server.info:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - server.info:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/server.info?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command server.info id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## service.job.logs ``v1``
----------   
Returns the logs of a service job in the cluster.

[Try online.](https://try.pipeforce.org/#/commandform?command=service.job.logs:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the service job.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - service.job.logs:  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/service.job.logs?name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command service.job.logs name=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## service.job.start ``v1``
----------   
Starts a new service job in the cluster. The job runs async. Use service.job.status and service.job.logs to check the result of the job.

[Try online.](https://try.pipeforce.org/#/commandform?command=service.job.start:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the service job.
`image` | String | false | null | The repo path of the image to be deployed. In case the image name starts with prefix 'pipeforce-registry/' the image will be loaded from the default PIPEFORCE registry for this namespace.
`imagePullSecret` | String | false | null | The optional name of the registry secret to be used in case it is a private registry.
`imagePullPolicy` | String | false | Always | The policy how to handle non existing image. Can be one of: Always (pull image always from registry, to get latest), IfNotPresent (pull image from registry if not present), Never (pull image never from registry).
`env` | String | false | null | Environment variables to be applied to the job service container. Can contain 'secret-text' secret references with value like '$uri:secret:secretTextName', '$uri:webhook:token:keyToResolve'.
`command` | String | false | null | The list of command to execute on the service job container.
`args` | String | false | null | The list of args to be passed on to the service job container.
`replace` | String | false | false | If true, an existing job with same name will be deleted before this new one is created. If false, an exception is thrown in case a job with same name already exists.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - service.job.start:  
      name: <value>  
      image: <value>  
      imagePullSecret: <value>  
      imagePullPolicy: <value>  
      env: <value>  
      command: <value>  
      args: <value>  
      replace: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/service.job.start?name=<value>&image=<value>&imagePullSecret=<value>&imagePullPolicy=<value>&env=<value>&command=<value>&args=<value>&replace=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command service.job.start name=<value> image=<value> imagePullSecret=<value> imagePullPolicy=<value> env=<value> command=<value> args=<value> replace=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## service.job.status ``v1``
----------   
Returns the status of a service job in the cluster.

[Try online.](https://try.pipeforce.org/#/commandform?command=service.job.status:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the service job.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - service.job.status:  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/service.job.status?name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command service.job.status name=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## service.job.stop ``v1``
----------   
Stops a service job in the cluster even if it is not finished yet.

[Try online.](https://try.pipeforce.org/#/commandform?command=service.job.stop:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the service job.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - service.job.stop:  
      name: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/service.job.stop?name=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command service.job.stop name=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## service.start ``v1``
----------   
Starts a new microservice in the cluster.

[Try online.](https://try.pipeforce.org/#/commandform?command=service.start:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the service.
`image` | String | false | null | The repo path of the image to be deployed. If empty, no image will be deployed (just the service slot created). In case the image name starts with prefix 'pipeforce-registry/' the image will be loaded from the default PIPEFORCE registry for this namespace.
`imagePullPolicy` | String | false | Always | The policy how to handle non existing image. Can be one of: Always (pull image always from registry, to get latest), IfNotPresent (pull image from registry if not present), Never (pull image never from registry).
`port` | Integer | false | null | The port the running service accepts requests.
`ingress` | Boolean | false | null | Expose the given port of the service to the internet? The service is then reachable via HTTPS using the url https://[serviceName]-[namespace].pipeforce.net.
`imagePullSecret` | String | false | null | The optional name of the registry secret to be used in case it is a private registry.
`env` | String | false | null | Map of environment variables to be applied to the service container. Can contain 'secret-text' secret references with value like '$uri:secret:secretTextName' or webhook references like '$uri:webhook:eventKey' which will be resolved and passed to the container.
`command` | String | false | null | The list of command to execute on the service container.
`args` | String | false | null | The list of args to be passed on to the service container.
`replicas` | String | false | 1 | The number of stateless replicas (= scaling instances) of this service to be started in parallel in the cluster by default.
`volumes` | String | false | null | The list of paths inside the container to mount to persisted volumes. This will automatically create a persistent volume and stores the data in the given paths to this volume. By default, the volume will be kept even on stop and start of the container. See service.stop command.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - service.start:  
      name: <value>  
      image: <value>  
      imagePullPolicy: <value>  
      port: <value>  
      ingress: <value>  
      imagePullSecret: <value>  
      env: <value>  
      command: <value>  
      args: <value>  
      replicas: <value>  
      volumes: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/service.start?name=<value>&image=<value>&imagePullPolicy=<value>&port=<value>&ingress=<value>&imagePullSecret=<value>&env=<value>&command=<value>&args=<value>&replicas=<value>&volumes=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command service.start name=<value> image=<value> imagePullPolicy=<value> port=<value> ingress=<value> imagePullSecret=<value> env=<value> command=<value> args=<value> replicas=<value> volumes=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## service.status ``v1``
----------   
Returns the status info of the given PIPEFORCE managed service.

[Try online.](https://try.pipeforce.org/#/commandform?command=service.status:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | Name of the service. If null or empty, the status of all PIPEFORCE managed services in current namespace will be returned.
`format` | String | false | normal | The format of the status output: How much status information must be returned? Can be one of compact, normal, full.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - service.status:  
      name: <value>  
      format: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/service.status?name=<value>&format=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command service.status name=<value> format=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## service.stop ``v1``
----------   
Stops a microservice from the cluster.

[Try online.](https://try.pipeforce.org/#/commandform?command=service.stop:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the microservice to be stopped.
`deleteVolumes` | String | false | false | If set to true, any volume declared on service.start will be deleted.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 


**Pipeline example:**  
```yaml  
pipeline:  
  - service.stop:  
      name: <value>  
      deleteVolumes: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/service.stop?name=<value>&deleteVolumes=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command service.stop name=<value> deleteVolumes=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## set.body ``v1``
----------   
Sets a value in the body. Overwrites any existing value in the body. The value to be set can be a constant or an expression.

[Try online.](https://try.pipeforce.org/#/commandform?command=set.body:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`value` | String | true | null | A string or an expression to be used as the value to be set.
`format` | String | false | auto | Converts a string value to the given target format if possible. If set to 'auto' tries to detect the target format by inspecting the value string. If set to 'none' doesnt apply any conversion.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - set.body:  
      value: <value>  
      format: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/set.body?value=<value>&format=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command set.body value=<value> format=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## set ``v1``
----------   
Sets a value in the pipe message. The value to be set can be a constant or an expression.

[Try online.](https://try.pipeforce.org/#/commandform?command=set:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`value` | String | true | null | A string or an expression to be used as the value to be set.
`to` | String | false | null | DEPRECATED. Use param output instead.
`mapping` | String | false | null | A list of mapping rules to be applied to the given input value.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - set:  
      value: <value>  
      to: <value>  
      mapping: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
      input: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/set?value=<value>&to=<value>&mapping=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>&input=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command set value=<value> to=<value> mapping=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value> input=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## set.var ``v1``
----------   
Sets a value in the vars scope. Overwrites any existing var in the vars scope. The value to be set can be a constant or an expression.

[Try online.](https://try.pipeforce.org/#/commandform?command=set.var:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | A string or an expression to be used as key of the var to be set.
`value` | String | true | null | A string or an expression to be used as the value to be set.
`format` | String | false | auto | Converts a string value to the given target format if possible. If set to 'auto' tries to detect the target format by inspecting the value string. If set to 'none' doesnt apply any conversion.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - set.var:  
      key: <value>  
      value: <value>  
      format: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/set.var?key=<value>&value=<value>&format=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command set.var key=<value> value=<value> format=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## sftp.delete ``v1``
----------   
Deletes a file or folder on the SFTP server.

[Try online.](https://try.pipeforce.org/#/commandform?command=sftp.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | false | null | The path to the file or folder to delete. If path ends with / a folder is expected to be deleted.
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - sftp.delete:  
      path: <value>  
      username: <value>  
      password: <value>  
      host: <value>  
      port: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/sftp.delete?path=<value>&username=<value>&password=<value>&host=<value>&port=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command sftp.delete path=<value> username=<value> password=<value> host=<value> port=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## sftp.download ``v1``
----------   
Downloads a file from a SFTP server. The file is written as content object to output.

[Try online.](https://try.pipeforce.org/#/commandform?command=sftp.download:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the file to download.
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - sftp.download:  
      path: <value>  
      username: <value>  
      password: <value>  
      host: <value>  
      port: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/sftp.download?path=<value>&username=<value>&password=<value>&host=<value>&port=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command sftp.download path=<value> username=<value> password=<value> host=<value> port=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## sftp.list ``v1``
----------   
Lists files of a given folder. If not filter parameter is used all files are returned. The result is written to output.

[Try online.](https://try.pipeforce.org/#/commandform?command=sftp.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | false | / | The path to the folder to list.
`filter` | String | false | null | The filter to apply to files list. '?' - match one character, '*' - match zero o more characters, '\*' to match '*' in filename
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - sftp.list:  
      path: <value>  
      filter: <value>  
      username: <value>  
      password: <value>  
      host: <value>  
      port: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/sftp.list?path=<value>&filter=<value>&username=<value>&password=<value>&host=<value>&port=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command sftp.list path=<value> filter=<value> username=<value> password=<value> host=<value> port=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## sftp.mkdir ``v1``
----------   
Creates a new directory on the SFTP server.

[Try online.](https://try.pipeforce.org/#/commandform?command=sftp.mkdir:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path where to create the folder.
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - sftp.mkdir:  
      path: <value>  
      username: <value>  
      password: <value>  
      host: <value>  
      port: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/sftp.mkdir?path=<value>&username=<value>&password=<value>&host=<value>&port=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command sftp.mkdir path=<value> username=<value> password=<value> host=<value> port=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## sftp.rename ``v1``
----------   
Renames a file or folder on the SFTP server.

[Try online.](https://try.pipeforce.org/#/commandform?command=sftp.rename:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`fromPath` | String | false | null | The origin path to the resource to rename.
`toPath` | String | false | null | The new path / name of the resource.
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - sftp.rename:  
      fromPath: <value>  
      toPath: <value>  
      username: <value>  
      password: <value>  
      host: <value>  
      port: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/sftp.rename?fromPath=<value>&toPath=<value>&username=<value>&password=<value>&host=<value>&port=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command sftp.rename fromPath=<value> toPath=<value> username=<value> password=<value> host=<value> port=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## sftp.upload ``v1``
----------   
Uploads a file to a SFTP server. The file is expected to be in the input.

[Try online.](https://try.pipeforce.org/#/commandform?command=sftp.upload:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | false | / | The path to upload to. If this ends with a slash / it is expected to be a folder name. The file name will be attached from the input file which must be a content object in this case.
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`credentials` | String | false | null | DEPRECATED. Use param secret instead. 
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - sftp.upload:  
      path: <value>  
      username: <value>  
      password: <value>  
      host: <value>  
      port: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      credentials: <value>  
      input: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/sftp.upload?path=<value>&username=<value>&password=<value>&host=<value>&port=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&credentials=<value>&input=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command sftp.upload path=<value> username=<value> password=<value> host=<value> port=<value> id=<value> if=<value> onError=<value> eval=<value> credentials=<value> input=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## slack.send ``v1``
----------   
Sends a text message via webhook url to Slack. Also see: https://api.slack.com/messaging/webhooks

[Try online.](https://try.pipeforce.org/#/commandform?command=slack.send:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | true | null | The Slack webhook url to post the message to. See here to generate one: https://api.slack.com/messaging/webhooks
`text` | String | true | null | The text message to be send to Slack.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - slack.send:  
      url: <value>  
      text: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/slack.send?url=<value>&text=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command slack.send url=<value> text=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## sql.query ``v1``
----------   
Executes a (read-only) SQL query and returns the result as JSON in the body. NOTE: This command is primarily meant for developers and admins to monitor the system. It should not be used in production workflows! It can change at any time without notice!

[Try online.](https://try.pipeforce.org/#/commandform?command=sql.query:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`query` | String | false | null | The SQL query to be executed.
`datasource` | String | false | hub | The name of the datasource to be used.
`columnName` | String | false | inline | How to add the column names. Possible values are inline = with each value, none = No column names at all. Any other value will be interpreted to add the column names in a separate property having exactly this individual name.
`dataField` | String | false | data | If given, places the data inside a separate property with this name.
`columnField` | String | false | columns | If given, places the column names inside a separate property with this name.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - sql.query:  
      query: <value>  
      datasource: <value>  
      columnName: <value>  
      dataField: <value>  
      columnField: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/sql.query?query=<value>&datasource=<value>&columnName=<value>&dataField=<value>&columnField=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command sql.query query=<value> datasource=<value> columnName=<value> dataField=<value> columnField=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## stats ``v1``
----------   
Returns basic status information about the hub service.

[Try online.](https://try.pipeforce.org/#/commandform?command=stats:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - stats:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/stats?id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command stats id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## switch ``v1``
----------   
Evaluates each switch statement. Takes the value part of the first match and writes it to the given output. If no output is given, writes it to the body. Any param key will be the selection expression which needs to evaluate to a boolean true or false and any value will be the selected value.

[Try online.](https://try.pipeforce.org/#/commandform?command=switch:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - switch:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/switch?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command switch id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## terms.delete ``v1``
----------   
Deletes a terms by its name.

[Try online.](https://try.pipeforce.org/#/commandform?command=terms.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name of the terms to delete.
`locale` | String | false | null | The locale of the terms to delete.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - terms.delete:  
      name: <value>  
      locale: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/terms.delete?name=<value>&locale=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command terms.delete name=<value> locale=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## terms.get ``v1``
----------   
Returns a terms by its name and locale.

[Try online.](https://try.pipeforce.org/#/commandform?command=terms.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name of the terms to return.
`locale` | String | false | null | The locale of the terms to return. If this param missing, the default locale will be used.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - terms.get:  
      name: <value>  
      locale: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/terms.get?name=<value>&locale=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command terms.get name=<value> locale=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## terms.list ``v1``
----------   
Returns all terms. The name and and locale, each. But not the text.

[Try online.](https://try.pipeforce.org/#/commandform?command=terms.list:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - terms.list:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/terms.list?id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command terms.list id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## terms.put ``v1``
----------   
Adds a new terms entry to the property store.

[Try online.](https://try.pipeforce.org/#/commandform?command=terms.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name of the terms
`locale` | String | false | null | The locale of the terms
`text` | String | false | null | The terms text. If this parameter is missing, the value from the body will be used.
`system` | String | false | false | Is it a system term? Attention: Cannot be deleted via commands!
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - terms.put:  
      name: <value>  
      locale: <value>  
      text: <value>  
      system: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/terms.put?name=<value>&locale=<value>&text=<value>&system=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command terms.put name=<value> locale=<value> text=<value> system=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## terms.text.get ``v1``
----------   
Returns the terms text by its name and locale.

[Try online.](https://try.pipeforce.org/#/commandform?command=terms.text.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name of the terms to return.
`locale` | String | false | null | The locale of the terms to return.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - terms.text.get:  
      name: <value>  
      locale: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/terms.text.get?name=<value>&locale=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command terms.text.get name=<value> locale=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## test.run ``v1``
----------   
Runs all test scripts defined by given pattern asynchronously.

[Try online.](https://try.pipeforce.org/#/commandform?command=test.run:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`locations` | String | false | global/app/*/function/** | A single or a list of location patterns, selecting all test scripts in the property store to be selected for test runs.
`functionIncludePattern` | String | false | functionName.startsWith('test_') | A PE which defines the test functions to be included. The selected method name is provided as variable: functionName.
`reportFormat` | String | false | json | The format of the resulting test report. Possible values: json (default), junit
`dryRun` | String | false | false | If true, this command will return a simulated failed test report without executing real tests. This is mainly for development and integration tasks in order to make sure such integrations work as expected.
`dryRunSleep` | String | false | null | The time to sleep in ms before the dryRun starts. This is mainly for testing purposes only.
`functionExcludePattern` | String | false | functionName.endsWith('IT') | A PE which defines the test functions to be excluded from the list of included test functions. The function method name is provided as variable: functionName. By default all test functions, ending in IT will be ignored.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - test.run:  
      locations: <value>  
      functionIncludePattern: <value>  
      reportFormat: <value>  
      dryRun: <value>  
      dryRunSleep: <value>  
      functionExcludePattern: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/test.run?locations=<value>&functionIncludePattern=<value>&reportFormat=<value>&dryRun=<value>&dryRunSleep=<value>&functionExcludePattern=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command test.run locations=<value> functionIncludePattern=<value> reportFormat=<value> dryRun=<value> dryRunSleep=<value> functionExcludePattern=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## theme ``v1``
----------   
Returns the resources for a given theme in the body and enrich headers with appropriate Content-type. Caches the resources where applicable.

[Try online.](https://try.pipeforce.org/#/commandform?command=theme:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`clearCache` | Boolean | false | null | If true, the current theme cache is cleared.
`resource` | String | true | logo | The name of resource to be loaded. If it starts with a slash / tries to load the resource from the default location with given name. If resource is one of the default names like: background, logo, pipeforce-logo, tries to load the default resource for these names. If null or invalid value, falls back to default value.
`name` | String | false | null | The name of the theme. If not given, the default theme will be used as configured.
`contentType` | String | false | null | The content type to be returned as fallback in case there is none defined at backend side for the requested resource. If this param is missing, it will be tried to guess the type automatically. If the type could not be guessed, returns application/octet-stream by default.
`ref` | String | false | null | The optional referrer id to this resource request.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - theme:  
      clearCache: <value>  
      resource: <value>  
      name: <value>  
      contentType: <value>  
      ref: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/theme?clearCache=<value>&resource=<value>&name=<value>&contentType=<value>&ref=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command theme clearCache=<value> resource=<value> name=<value> contentType=<value> ref=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## transform ``v1``
----------   
This transformer converts the input to an output format by applying the given template engine. By default the current message is provided as model inside the template context so you can access body, vars or headers similar to the default PEL approach.

[Try online.](https://try.pipeforce.org/#/commandform?command=transform:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`iterate` | String | false | pel | If true, the input is expected to be a list which will be iterated. The template is then applied on each iteration row and the result is added to a target list.
`groupBy` | String | false | null | An expression to apply on the target list in order to group the result of a row into. If the expression returns false, the row result is added to the end of the list.If null or empty, each row result creates a new entry in the target list.
`engine` | String | false | pel | The template engine to be used. Currently 'freemarker' and 'pel' is supported.
`modelName` | String | false | null | The name of the root model under which the input can be accessed inside the template. If null or empty, then the input defines the model names.
`template` | String | true | null | The template to be used for the transformation. It can the template text itself as string or a qualified uri pointing to a template resource like this for example: $uri:property:/my/template/path
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - transform:  
      iterate: <value>  
      groupBy: <value>  
      engine: <value>  
      modelName: <value>  
      template: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/transform?iterate=<value>&groupBy=<value>&engine=<value>&modelName=<value>&template=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command transform iterate=<value> groupBy=<value> engine=<value> modelName=<value> template=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## transform.csv.json ``v1``
----------   
Takes a CSV document in the body and converts it to a JSON. The CSV document must comply with the RFC4180 standard format.

[Try online.](https://try.pipeforce.org/#/commandform?command=transform.csv.json:v1)

**Alias:** pipe.command.transform.csv2json   
**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`delimiter` | String | false | , | The delimiter (separator) to separate the columns of the CSV
`hasHeadersLine` | String | false | true | Does the first line of the input CSV contain the column header names?
`rowsFormat` | String | false | arrays | The JSON format of the rows section: arrays (= array with nested string arrays with each CSV line as such a new nested array), objects (= each CSV line will become a new JSON object in the rows array with the CSV headers as the field keys)
`showColumnsCountField` | String | false | true | Show the number of headers (columns) in element columnsCount?
`showRowsCountField` | String | false | true | Show the number of rows (values) in element rowsCount?
`showHeadersField` | String | false | true | Show the column header names in extra element headers? This is only shown if hasHeaders is true. In this case, the values array doesnt contain a first headers line.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - transform.csv.json:  
      delimiter: <value>  
      hasHeadersLine: <value>  
      rowsFormat: <value>  
      showColumnsCountField: <value>  
      showRowsCountField: <value>  
      showHeadersField: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/transform.csv.json?delimiter=<value>&hasHeadersLine=<value>&rowsFormat=<value>&showColumnsCountField=<value>&showRowsCountField=<value>&showHeadersField=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command transform.csv.json delimiter=<value> hasHeadersLine=<value> rowsFormat=<value> showColumnsCountField=<value> showRowsCountField=<value> showHeadersField=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## transform.ftl ``v1``
----------   
This transformer uses the FreeMarker template engine for its transformation.

[Try online.](https://try.pipeforce.org/#/commandform?command=transform.ftl:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`template` | String | false | null | The template to be used for the transformation. If null, the template is expected in the body. Otherwise this param value is used. It can be a PE, a static string or a qualified uri (for example uri:classpath:/my/template/path) pointing to the template.
`model` | String | false | null | The model to be placed into the template scope. If null, the message is used as model so you can access vars and body the same way as you would do in the pipeline.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - transform.ftl:  
      template: <value>  
      model: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/transform.ftl?template=<value>&model=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command transform.ftl template=<value> model=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## transform.html2docx ``v1``
----------   
Takes html text that is expected in the body, (as pipeline resource) and converts it back to docx document and then writes to output.

[Try online.](https://try.pipeforce.org/#/commandform?command=transform.html2docx:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - transform.html2docx:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/transform.html2docx?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command transform.html2docx id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## transform.json.xml ``v1``
----------   
Takes a JSON document or JSON string in the body and converts it to an XML document.

[Try online.](https://try.pipeforce.org/#/commandform?command=transform.json.xml:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - transform.json.xml:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/transform.json.xml?id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command transform.json.xml id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## transform.pdf2png ``v1``
----------   
Takes pdf that is expected in the body, (as pipeline resource) and converts it back to body (as pipeline resource) as a collection of png images.

[Try online.](https://try.pipeforce.org/#/commandform?command=transform.pdf2png:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dpi` | String | false | null | DPI to use for conversion. 300 DPI is used when not specified.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - transform.pdf2png:  
      dpi: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/transform.pdf2png?dpi=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command transform.pdf2png dpi=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## transform.png2pdf ``v1``
----------   
Takes collection of pngs that is expected in the body (as pipeline resource) and converts it back to body (as pipeline resource) to pdf document.

[Try online.](https://try.pipeforce.org/#/commandform?command=transform.png2pdf:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dpi` | String | false | null | DPI to forcibly use for conversion.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - transform.png2pdf:  
      dpi: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/transform.png2pdf?dpi=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command transform.png2pdf dpi=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## transform.word2pdf ``v1``
----------   
DEPRECATED. Use microsoft.word.export.pdf instead. Takes a word file (.docx) that is expected in the   
body and converts  
it to pdf and stores it back into the body.

[Try online.](https://try.pipeforce.org/#/commandform?command=transform.word2pdf:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | false | null | Provides the URL the word document is located at. If set, it uses REST PDF conversion service instead of library.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - transform.word2pdf:  
      path: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/transform.word2pdf?path=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command transform.word2pdf path=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## transform.wordtemplate ``v1``
----------   
Transforms velocity template expressions in word files. It expects the template to be in the body or in thetemplate param, transforms it and puts the result back to the body as byte array content.

[Try online.](https://try.pipeforce.org/#/commandform?command=transform.wordtemplate:v1)

**Version:** ``v1``  
**Input body type:** ``Raw``  
**Output body type:** ``Raw``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`model` | String | true | null | The model to be placed into the template scope. May not be null.
`template` | String | false | null | The template to be used for the transformation. If null, the template is expected in the body. Otherwise this param is used. It can be a PE, a static string or a qualified uri (for example uri:classpath:/my/template/path.docx) pointing to the template.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - transform.wordtemplate:  
      model: <value>  
      template: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/transform.wordtemplate?model=<value>&template=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command transform.wordtemplate model=<value> template=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## transform.xml.json ``v1``
----------   
Takes an XML document or XML string in the body and converts it to a JSON. By default, the PIPEFORCE XML to JSON conversion rules will be applied (see https://pipeforce.github.io/docs/guides/transformers/xml2json).

[Try online.](https://try.pipeforce.org/#/commandform?command=transform.xml.json:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - transform.xml.json:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/transform.xml.json?id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command transform.xml.json id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## translate ``v1``
----------   
Translates the given text to the given target language. Expects the input by default in the body and writes the result by default back to the body.

[Try online.](https://try.pipeforce.org/#/commandform?command=translate:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`text` | String | true | null | The text to be translated.
`targetLanguage` | String | false | EN | The target language to transform the text to. Supported values: DE, EN, FR, IT, JA, ES, NL, PL, PT, RU, ZH
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`apiKey` | String | false | null | The alternative API key to connect to the service. If null or empty, the default one will be used, as defined by the default backend settings.
`restUrl` | String | false | null | The URL to be called by the command. If null or empty, the default url will be used as defined in the backend.
`filter` | String | false | null | A PEL as filter to be applied to the output data before it is returned by this command. If null or empty, no filter is applied.


**Pipeline example:**  
```yaml  
pipeline:  
  - translate:  
      text: <value>  
      targetLanguage: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
      apiKey: <value>  
      restUrl: <value>  
      filter: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/translate?text=<value>&targetLanguage=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>&apiKey=<value>&restUrl=<value>&filter=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command translate text=<value> targetLanguage=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value> apiKey=<value> restUrl=<value> filter=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## unzip ``v1``
----------   
Unzips a given zipped content from the body and puts the uncompressed content into the output. Note: Currently only files in the root level of the zip are supported.

[Try online.](https://try.pipeforce.org/#/commandform?command=unzip:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - unzip:  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/unzip?id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command unzip id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## json.validate ``v1``
----------   
Validates the syntax of the JSON document given in the body or the input parameter. Can additionally validate the JSON using the given JSON schema. See https://json-schema.org/. 

[Try online.](https://try.pipeforce.org/#/commandform?command=json.validate:v1)

**Alias:** command:validate.json:v1   
**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`schema` | String | false | null | The JSON schema to be used for schema validation. Can be a string, a PEL or a custom uri pointing to the location of the schema. In case no schema is defined, only a JSON syntax validation is performed.
`version` | String | false | V7 | The version of the schema specification to be used.
`throwException` | String | false | false | If `true`, an exception is thrown in case of an syntax or schema validation error and the pipeline execution will be stopped. If set to `false`, the validation result will be returned as JSON in the output having the fields `status` and `message` whereas `status` can be one of `error` or `ok`. In case of an validation error, all validation errors will be put into the `message` field.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - json.validate:  
      schema: <value>  
      version: <value>  
      throwException: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      input: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/json.validate?schema=<value>&version=<value>&throwException=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&input=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command json.validate schema=<value> version=<value> throwException=<value> id=<value> if=<value> onError=<value> eval=<value> input=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## wait ``v1``
----------   
Waits a certain amount of time with next execution.

[Try online.](https://try.pipeforce.org/#/commandform?command=wait:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`ms` | String | false | 100 | The time to wait in milliseconds.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - wait:  
      ms: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/wait?ms=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command wait ms=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## webhook.delete ``v1``
----------   
Deletes an existing webhook. If no such webhook exists, nothing happens.

[Try online.](https://try.pipeforce.org/#/commandform?command=webhook.delete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | true | null | Id of the webhook to delete.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - webhook.delete:  
      uuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/webhook.delete?uuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command webhook.delete uuid=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## webhook.get ``v1``
----------   
Returns all persisted webhooks as a list.

[Try online.](https://try.pipeforce.org/#/commandform?command=webhook.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | false | null | Id of the single webhook to return. If null or empty, all webhooks will be returned.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - webhook.get:  
      uuid: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/webhook.get?uuid=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command webhook.get uuid=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## webhook.put ``v1``
----------   
Creates a new webhook or updates an existing one and returns its metadata.

[Try online.](https://try.pipeforce.org/#/commandform?command=webhook.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`eventKey` | String | true | null | Id of the event to be fired when hook was called.
`pipeline` | String | false | null | DEPRECATED: Link to pipeline via messaging instead.
`uuid` | String | false | null | The id (=token) of an existing webhook. If given, tries to update this webhook. In case no such webhook exists, creates a new one with given token.
`payloadType` | String | false | base64 | How to handle the payload before it gets published into the message broker? Possible values are: `raw` (use the payload as it is), `base64` (encode it base64, = default), `outbound` (save the payload into a tmp cache and refer to it using an outbound url), `ignore` (do not send the payload into the messaging).
`maxPayloadLength` | String | false | 512000 | The max. length of the payload of this webhook in bytes. If this webhook is called with content in body bigger than this, an exception will be thrown.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - webhook.put:  
      eventKey: <value>  
      pipeline: <value>  
      uuid: <value>  
      payloadType: <value>  
      maxPayloadLength: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/webhook.put?eventKey=<value>&pipeline=<value>&uuid=<value>&payloadType=<value>&maxPayloadLength=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command webhook.put eventKey=<value> pipeline=<value> uuid=<value> payloadType=<value> maxPayloadLength=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## webhook.receive ``v1``
----------   
Runs a webhook identified by its uuid.

[Try online.](https://try.pipeforce.org/#/commandform?command=webhook.receive:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | false | null | The uuid of the webhook (deprecated, use token instead).
`token` | String | true | null | The unique token of the webhook. Can passed as request param or as header (recommended) to call the webhook from outside.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - webhook.receive:  
      uuid: <value>  
      token: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/webhook.receive?uuid=<value>&token=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command webhook.receive uuid=<value> token=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## webhook.receive.logs ``v1``
----------   
Returns the receive logs of the given webhook. Note: This command is currently experimental and returns just dummy data.

[Try online.](https://try.pipeforce.org/#/commandform?command=webhook.receive.logs:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`token` | String | true | null | The unique token of the webhook to list logs for.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - webhook.receive.logs:  
      token: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/webhook.receive.logs?token=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command webhook.receive.logs token=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.deploy ``v1``
----------   
Deploys a given BPMN from the body or a given property into the underlying workflow engine.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.deploy:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name to deploy the workflow under.
`appId` | String | false | null | The appId to be used to prefix the process name with: appId_workflowname. If null or empty no prefix is appended.
`propertyKey` | String | false | null | The optional key of a workflow property containing a BPMN as value. If this is given, name and appId will be extracted from this key in case these params are empty. If this propertyKey is missing, the BPMN is expected to be in the body.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.deploy:  
      name: <value>  
      appId: <value>  
      propertyKey: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.deploy?name=<value>&appId=<value>&propertyKey=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.deploy name=<value> appId=<value> propertyKey=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.deployment.find ``v1``
----------   
Finds all deployments from the workflow engine matching given parameters and puts them into the body.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.deployment.find:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``Deployment``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | Name of the deployment. Exact match.
`id` | String | false | null | Id of the deployment. Exact match.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.deployment.find:  
      name: <value>  
      id: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.deployment.find?name=<value>&id=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.deployment.find name=<value> id=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.event ``v1``
----------   
Sends an event message to a message endpoint inside   
a given workflow. As payload of the event message,   
the current pipe message will be used as input.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.event:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`processInstanceId` | String | true | null | The processInstanceId which refers to the process to be notified by this event. One of businessKey or processInstanceId must be given.
`businessKey` | String | false | null | The business key of the process which needs to be informed by the event. One of businessKey or processInstanceId must be given.
`messageName` | String | true | null | The name of this message. It is used to find the endpoint to be triggered in the workflow.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.event:  
      processInstanceId: <value>  
      businessKey: <value>  
      messageName: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.event?processInstanceId=<value>&businessKey=<value>&messageName=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.event processInstanceId=<value> businessKey=<value> messageName=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.find.processinstances ``v1``
----------   
Returns all process instances matching the given criteria.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.find.processinstances:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`processInstanceBusinessKey` | String | false | null | Filter tasks by businessKey.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.find.processinstances:  
      processInstanceBusinessKey: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.find.processinstances?processInstanceBusinessKey=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.find.processinstances processInstanceBusinessKey=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.history.tasks ``v1``
----------   
Returns all finished tasks matching the given criteria.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.history.tasks:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dueBefore` | String | false | null | Shows all tasks that are due before this ISO8601 date. Optional
`assignee` | String | false | null | Filter tasks by assignee.
`includeVariables` | String | false | false | Should each task also list its historic variables?
`processInstanceId` | String | true | null | Filter tasks by process instance id.
`processInstanceBusinessKey` | String | false | null | Filter tasks by businessKey.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.history.tasks:  
      dueBefore: <value>  
      assignee: <value>  
      includeVariables: <value>  
      processInstanceId: <value>  
      processInstanceBusinessKey: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.history.tasks?dueBefore=<value>&assignee=<value>&includeVariables=<value>&processInstanceId=<value>&processInstanceBusinessKey=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.history.tasks dueBefore=<value> assignee=<value> includeVariables=<value> processInstanceId=<value> processInstanceBusinessKey=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.member.message ``v1``
----------   
Sends a message to the given workflow member. In case the workflow member is not already added to the workflow model, adds a new entry to a given workflow model, which is usually a data model (JSON) with a single member structure like this: workflowModel.members[someUserId] whereas in this level user, taskUrl and shareUrl will be added if required.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.member.message:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`workflowModel` | String | true | null | The workflow model where to add the new user at (inside the sub element workflowModel/members/[userId)]. Can be a PEL which points to an loaded instance or a uri which points to a workflow model instance key.
`userId` | String | false | null | The uuid of the user to add as member to the workflow model. One of userId or username is required.
`username` | String | false | null | The username of the user to add as member to the workflow model. One of userId or username is required.
`resourcePath` | String | false | null | The path to a resource or folder to create a share from for the new member. If null or empty, no share is created.
`taskUrl` | String | false | null | The url of a workflow task for the new member. If null or empty, no task is shown.
`subject` | String | false | null | The subject of the invite message.
`message` | String | false | null | The invite message to be used to send an invite email to the new member. Can be a text message, a uri or content object template.
`model` | String | false | null | The model to be used in the invite message template.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.member.message:  
      workflowModel: <value>  
      userId: <value>  
      username: <value>  
      resourcePath: <value>  
      taskUrl: <value>  
      subject: <value>  
      message: <value>  
      model: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.member.message?workflowModel=<value>&userId=<value>&username=<value>&resourcePath=<value>&taskUrl=<value>&subject=<value>&message=<value>&model=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.member.message workflowModel=<value> userId=<value> username=<value> resourcePath=<value> taskUrl=<value> subject=<value> message=<value> model=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.model.attachment.get ``v1``
----------   
Returns property.attachment.content from process model property attachment.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.model.attachment.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`processInstanceId` | String | true | null | The process instance id.
`fileName` | String | true | null | The attachment name.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.model.attachment.get:  
      processInstanceId: <value>  
      fileName: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.model.attachment.get?processInstanceId=<value>&fileName=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.model.attachment.get processInstanceId=<value> fileName=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.model.attachment.put ``v1``
----------   
Does property.attachment.put to process model property attachment. 

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.model.attachment.put:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`processInstanceId` | String | true | null | The process instance id.
`fileName` | String | true | null | The name of the attachment to be created. If an attachment with this name already exists, updates the existing one.
`contentType` | String | false | null | The content type to be used for this attachment.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.model.attachment.put:  
      processInstanceId: <value>  
      fileName: <value>  
      contentType: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.model.attachment.put?processInstanceId=<value>&fileName=<value>&contentType=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.model.attachment.put processInstanceId=<value> fileName=<value> contentType=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.model ``v1``
----------   
Utility command to easier workflow model handling.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.model:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`mappings` | String | false | null | A list of mapping rules to be applied to the given workflow model. See online docs for more details about such mapping rules.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.model:  
      mappings: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.model?mappings=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.model mappings=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.tasks.open ``v1``
----------   
Returns all open tasks grouped by assignee. Returned parameters are dynamically and depend on the underlying workflow engine. Default result format is [{id:taskId, name:taskName, assignee:userId, created:createdDate, due:dueDate, tenant:tenantId}, ...]. For a detailed description about all returned attributes see the default implementation: https://docs.camunda.org/manual/7.7/reference/rest/task/get-query/

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.tasks.open:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dueBefore` | String | false | null | Shows all tasks that are due before this ISO8601 date. Optional
`assignee` | String | false | null | Filter tasks by assignee.
`processInstanceId` | String | false | null | Filter tasks by process instance id.
`processInstanceBusinessKey` | String | false | null | Filter tasks by businessKey.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.tasks.open:  
      dueBefore: <value>  
      assignee: <value>  
      processInstanceId: <value>  
      processInstanceBusinessKey: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.tasks.open?dueBefore=<value>&assignee=<value>&processInstanceId=<value>&processInstanceBusinessKey=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.tasks.open dueBefore=<value> assignee=<value> processInstanceId=<value> processInstanceBusinessKey=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.tasks.open.reminder ``v1``
----------   
Sends a reminder email to each assignee having open tasks matching given criteria.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.tasks.open.reminder:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dueBefore` | String | false | null | Shows all tasks that are due before this ISO8601 date. Optional
`assignee` | String | false | null | Filter tasks by assignee.
`processInstanceId` | String | false | null | Filter tasks by process instance id.
`processInstanceBusinessKey` | String | false | null | Filter tasks by businessKey.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.tasks.open.reminder:  
      dueBefore: <value>  
      assignee: <value>  
      processInstanceId: <value>  
      processInstanceBusinessKey: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.tasks.open.reminder?dueBefore=<value>&assignee=<value>&processInstanceId=<value>&processInstanceBusinessKey=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.tasks.open.reminder dueBefore=<value> assignee=<value> processInstanceId=<value> processInstanceBusinessKey=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.start ``v1``
----------   
Starts a new instance of a process in the workflow engine.   
The given pipe message will be serialized to JSON and  
put as variable <code>pipeJson</code> into context of the   
process (process variables).  
Returns the input message unchanged.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.start:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the process to start in the workflow engine.
`businessKey` | String | false | null | The business key of the process to start in the workflow engine for later references.
`variables` | String | false | null | A map of variables to be send to the workflow process. If this param is missing, the full pipeline message is flattened and then send to the workflow process as variables.
`workflowModelInstanceKey` | String | false | null | The optional property key of the central process model instance to be used. Will be passed under this name to the process engine as process variable.Note: The model instance key must start with an app path followed by an object path. For example global/app/myApp/object/someObject/v1/instance/SOME_UUID.
`workflowStartedBy` | String | false | null | The name of the process variable which holds the uuid of the user who started this process using this command. If null or empty, the currently logged-in user willbe used instead.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.start:  
      key: <value>  
      businessKey: <value>  
      variables: <value>  
      workflowModelInstanceKey: <value>  
      workflowStartedBy: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.start?key=<value>&businessKey=<value>&variables=<value>&workflowModelInstanceKey=<value>&workflowStartedBy=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.start key=<value> businessKey=<value> variables=<value> workflowModelInstanceKey=<value> workflowStartedBy=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.task.complete ``v1``
----------   
Completes a given workflow task and puts any resulting variable from the task in the body.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.task.complete:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`taskId` | String | true | null | The id (not name!) of the task to complete.
`variables` | String | false | null | A map of variables to be passed to the task. Can be null.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.task.complete:  
      taskId: <value>  
      variables: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.task.complete?taskId=<value>&variables=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.task.complete taskId=<value> variables=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.tasks ``v1``
----------   
Returns all tasks for a given workflow. Returned parameters are dynamically and depend on the underlying workflow engine. Default result format is [{id:taskId, name:taskName, assignee:userId, created:createdDate, due:dueDate, tenant:tenantId}, ...]. For a detailed description about all returned attributes see the default implementation: https://docs.camunda.org/manual/7.7/reference/rest/task/get-query/

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.tasks:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dueBefore` | String | false | null | Shows all tasks that are due before this ISO8601 date. Optional
`assignee` | String | false | null | Filter tasks by assignee.
`processInstanceId` | String | false | null | Filter tasks by process instance id.
`processInstanceBusinessKey` | String | false | null | Filter tasks by businessKey.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.tasks:  
      dueBefore: <value>  
      assignee: <value>  
      processInstanceId: <value>  
      processInstanceBusinessKey: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.tasks?dueBefore=<value>&assignee=<value>&processInstanceId=<value>&processInstanceBusinessKey=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.tasks dueBefore=<value> assignee=<value> processInstanceId=<value> processInstanceBusinessKey=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.undeploy ``v1``
----------   
Undeploys a given BPMN from workflow engine.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.undeploy:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name of the deployment to remove.
`onError` | String | false | EXIT | What to do if an error happened in this command?
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.undeploy:  
      name: <value>  
      onError: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.undeploy?name=<value>&onError=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.undeploy name=<value> onError=<value> id=<value> if=<value> onError=<value> eval=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.users ``v1``
----------   
Returns all users eligible to participate in given workflow.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.users:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`processDefinitionId` | String | false | null | The id of the process definition.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.users:  
      processDefinitionId: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.users?processDefinitionId=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.users processDefinitionId=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## workflow.variables.get ``v1``
----------   
Returns the variables of a given process instance from the workflow engine as JSON whereas the name of the variable becomes the JSON attribute name and the value of the variable becomes the JSON attribute value.

[Try online.](https://try.pipeforce.org/#/commandform?command=workflow.variables.get:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`processInstanceId` | String | true | null | The process instance id.
`parseJsonString` | String | false | false | Tests if a workflow variable contains a JSON string and if so, converts this JSON string into a JSON object and sets it as value for the variable in the output JSON.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - workflow.variables.get:  
      processInstanceId: <value>  
      parseJsonString: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/workflow.variables.get?processInstanceId=<value>&parseJsonString=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command workflow.variables.get processInstanceId=<value> parseJsonString=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  

## zip ``v1``
----------   
Compresses a given content in the body and puts the compressed data into the output. If content is a content collection, puts all entries in the resulting zip file. Note: Currently a nested content collection is currently not supported! Any content entry must be at the root level.

[Try online.](https://try.pipeforce.org/#/commandform?command=zip:v1)

**Version:** ``v1``  
**Input body type:** ``JsonNode``  
**Output body type:** ``JsonNode``  
**Parameters:** 

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the final zip file. If not given, the name will be set by this rule: If it is a single entry, uses the name of the entry + .zip. If there are multiple entries, creates a random name + .zip
`level` | String | false | null | Sets the compression level 0-9. If not set, the default level is used which could vary.
`id` | String | false | null | The optional id of this command, unique within the pipeline.
`if` | String | false | null | Is the command enabled (if=true)? Can be a static boolean value of a PE to be evaluated. If this value is set to false, negative number, null or empty string, the command is disabled and will be skipped when defined in a pipeline. By default it is set to true = command is enabled.
`onError` | String | false | null | Defines the action in case an error happens. Default is 'THROW': Stops execution and throws the error to the caller. This parameter has precedence over the optional header with same name.
`eval` | String | false | null | An expression which is evaluated finally, after this command has been executed. This can be used for cleanup-tasks or to simplify data transformations.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.


**Pipeline example:**  
```yaml  
pipeline:  
  - zip:  
      name: <value>  
      level: <value>  
      id: <value>  
      if: <value>  
      onError: <value>  
      eval: <value>  
      output: <value>  
```  
Since ``v1`` is the default version for commands, it is not required to specify it. 

Learn more: [Pipeline](/docs/commands_pipelines). 

**URL example:**  
```yaml  
http://host/api/v3/command/zip?name=<value>&level=<value>&id=<value>&if=<value>&onError=<value>&eval=<value>&output=<value>  
```  

**Command Line Interface (CLI) example:**  
```bash  
pi command zip name=<value> level=<value> id=<value> if=<value> onError=<value> eval=<value> output=<value>  
```  
Learn more: [Command Line Interface (CLI)](/docs/cli). 

  


## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::