---
id: basics

title: Apps
sidebar_label: Basics
slug: /apps
---

## What is an App?

An app in PIPEFORCE is like an app for mobile phones. Such an app groups together resources like scripts, templates, configurations and others to solve a certain business task. Any pipeline, form or workflow etc. is part of exactly one app. 

An app can be shared with others on the marketplace.

Also see [this tutorial](../docs/tutorials/create-app) to learn how to create an app in PIPEFORCE.

For each app, certain access rules can be specified. Apps can be installed, uninstalled, exported and imported. Furthermore, it is also possible to use staging and versioning for apps. They can be developed online using the workbench or offline using source code files and the [CLI](../../guides/cli). You can think of apps also like “plug-ins” for PIPEFORCE.

## App structure
Typically, all properties (resources) of an app reside in the property store and having a property path with a prefix like this: 

```
global/app/<NAME>
```

The path always starts with prefix `global/app`, followed by the name of the app `<NAME>`, wheras `<NAME>` must be a fully qualified, unique name.

### Qualified App naming

In order to avoid a naming clash with other apps from other users which could probably have the same naming as your app, as best practise, you should give the app always a name which follows the reversed domain name package conventions from the [Java package specification](https://docs.oracle.com/javase/tutorial/java/package/namingpkgs.html):

1. The app name is written in lower case and may not contain any space or special character.
1. Use the reversed internet domain name of your company, project or organisation to begin the app name. For example: `com.logabit.myapp` or `org.myproject.myapp`.
1.  Built-in apps from PIPEFORCE always start with prefix `io.pipeforce.` for example: `io.pipeforce.common`. 
2.  Note: The internet domain names must be valid ones if you want your apps to become trusted in the marketplace.

Here is an example of a property path to a resource inside an app with fully qualified name:

```
global/app/com.logabit.myapp/data/helloworld
```


### App folders


Inside of an app path, there is a certain "folder" structure at app level which defines the main resource types of an app. The typical folder structure looks like this (the folders could vary, depending on your setup):

![](../../img/grafik-20201022-181638.png)

### `form`

This folder contains all form configuration properties for any form of the app, whereas the name of the property is the name of the form. For example:

```
global/app/myApp/form/createUser
global/app/myApp/form/deleteUser
```

### `list`

This folder contains all list configuration properties for any list of the app, whereas the name of the property is the name of the list. For example:

```
global/app/myApp/list/users
global/app/myApp/list/employees
```

### `object`

This folder contains any application model (schema) and its instances (if there are any).

#### `schema`

The schema of an object is stored in a property having this path:

```
global/app/myApp/object/<NAME>/<VERSION>/schema
```

Whereas `<NAME>` is the name of the object.

`<VERSION>` is the version of the object schema.

For example:

```
object/person/v1/schema
```

The schema property typically contains as value a JSON schema, which describes this object. For the person object, the schema could, for example, look like this:

```json
{
  "type": "object",

  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "age": {
      "type": "number"
    },
    "gender": {
      "type": "string",
      "enum": ["male", "female", "neutral"]
    }
  }
}
```

See the JSON schema specification for a description how to define JSON schema documents: [https://json-schema.org/](https://json-schema.org/)

#### `instance`

In case there are object instances based on a schema, they should be typically stored inside this path structure:

```
global/app/myApp/object/<NAME>/<VERSION>/instance/<UUID>
```

Whereas `<NAME>` is the name of the object.

`<VERSION>` is the version of the object schema.

`<UUID>` is the unique id of a single object.

For example:

```
global/app/myApp/object/person/v1/instance/fa471958-fdb7-4bf6-a0a3-c5e8c782893e
```

Each instance property will contain as value the data of the object instance which matches the object schema, for example:

```json
{
  "firstName": "Homer",
  "lastName": "Simpson",
  "age": 48,
  "gender": "male"
}
```

### `pipeline`

This folder contains all pipeline configurations for the given app. A pipeline can be seen as the business logic part of an application.

Find more about pipelines [here](../guides/commands_pipeline)

Each property name corresponds with the name of the pipeline and contains as value the pipeline configuration. For example:

```
global/app/myApp/pipeline/informHR
global/app/myApp/pipeline/addToSAP
global/app/myApp/pipeline/addToActiveDirectory
```

Such a pipeline configuration could look like this:

```yaml
pipeline:
  - mail.send:
      to: hr@company.de
      subject: "A new employee was addded!"
```
### `setup`

This optional folder can contain pipelines. These pipelines will be executed in case the app will be installed using the `app.install` command.

This is handy in case you would like to do some preparation on setup phase of an app.

Note: The pipelines in this folder wont be auto-executed on save in the web UI or publish using the CLI. 


### `script`

Inside of the optional script folder, scripts can be placed which can contain more complex business logic if required. By default, such scripts are written in JavaScript. Optionally also Python or Groovy are available (ask [support@pipeforce.io](mailto:support@pipeforce.io) if required). For example:

```
global/app/myApp/script/helloworld
```

Such a script could look like this example:

```jsx
function command() {

    pi.message.headers["foo"] = "bar";
    pi.message.body = "HELLO WORLD IN THE BODY";

    var timestamp = pi.util.timestamp();
    pi.log.debug("Command script executed at: " + timestamp);
}
```

You can call such a script from a pipeline, like this example shows:

```yaml
pipeline:
  - script.run:
      path: "global/app/myApp/script/helloworld"
```

### `test`

This folder typically contains pipelines for tests only. Whenever necessary, PIPEFORCE automatically executes the test pipelines inside this folder to make sure the app is working as expected. Therefore you have to make sure that these tests can be executed at any time and are fully reentrant (once a test has been finished it can be executed again as often as necessary).

For example:

```
global/app/myApp/test/createUserTest
```

The property contains the test pipeline as value. Such a test pipeline could look like this:

```yaml
pipeline:
  - test:
      assertTrue(false)
```

### `workflow`

This folder contains any BPMN workflow files defining a business process.

For example:

```
global/app/myApp/workflow/approveNewEmployee
```

## App development

In its simple case you can manage all properties of an app in the property store with the `property.*` commands and the CLI using `pi pipeline` or using the online workbench.

But if you want to develop complex apps with forms, pipelines or workflows inside, we recommend you to use a local development & customization workspace. This workspace contains the properties of such an app stored as files inside a local folder. Any file created inside this folder can then easily be uploaded to the property store with a single command line call using the CLI. For example:

```bash
pi publish
```

This CLI command scans your local folder and uploads only those resources which have been changed since the last upload or have been created since then. See here how to setup the CLI and how to create a local worskspace: [Local Low-Code Workspace](cli)

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::


