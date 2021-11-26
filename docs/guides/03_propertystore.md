# Property Store

The property store is a data repository in PIPEFORCE to save all your application data. You can upload, download and delete resources from the property store using pipeline commands or the online low-code workbench.

## What is a Property?
----------

Each entry stored in the property store is called a **property**. Other names could also be **asset**, **object** or **entity** for example. But we will stick with the name **property** here.

Every property has a unique key.

Properties in the property store are structured in an **hierarchical way**, whereas the key of a property is also its **path** in the tree structure. Here is an example of such a key of a property:

```
global/app/myapp/settings
```

Each property contains attributes. The most important ones are:

| Attribute     | Description 
| ---           | ---         
| `uuid`        | A unqiue identificator of the property. Differently to the key, once created this **will never change**.  |  
| `key`         | The unique key of the property. This value can change over time. For example if a property was moved to another virtual location.
| `value`       | This attribute contains the payload of the property.
| `type`        | This attribute contains the mime type of the value. If this attribute is ```null```, it is expected that the mime type of the value is of the default type: `text/plain`.
| `reated`      | A unix epoch timestamp in millis when this property was created.
| `updated`     | A unix epoch timestamp in millis when this property was updated last.
| `timeToLive`  |The time to live (ttl) in minutes of this property since creation. If the time to live has been expired, the property is eligable to be deleted. Usually one of the next cleanup jobs will then delete this property. If the value of **timeToLive** is `0` or `null`, the property will never be deleted.
    

To query a property with all of its attributes, you can use the  [`property.list`](../api/commands#propertylist) command:

```
pi command property.list filter=global/app/myapp/pipeline/helloworld
```

This command will return a result similar to the result shown below, which describes all important attributes of the property:

```
key: "/pipeforce/enterprise/global/app/myapp/pipeline/helloworld"
uuid: "529a38e7-9188-4135-b87b-3d890f6764f3"
value: "pipeline:\n  - log:        \n      message: \"Hello World\""
defaultValue: null
type: "application/yaml;type=pipeline"
created: 1613397114448
updated: null
timeToLive: null
```

### The Property Value

The `value` attribute of a property is always stored as string (text) value. Which type the text value represents, is defined by the `type` attribute which could be of any supported mime type. For example `application/json` or `text/plain`. The latter is the default if no type is specified.

Furthermore, the `value` attribute can also contain binary data. In this case the field is `base64` encoded. This is marked in the `type` attribute as such using the mime type parameter `encoding=base64`. Example:

```
value: "some base64 encoded value"
type: "application/pdf;encoding=base64"
```

:::note
In case you want to store a bigger amount of binary data, consider to use property attachments instead since they do have a chunked storage handling concept to store a huge amount of binary data very effectively.
:::

## How to use the Property Store?
----------

Typically the property store is managed using one of the [`property.*`](../api/commands#property) commands. This is handy, if you want to manage the property store programmatically.

To get an overview of all available commands to manage the property store in your terminal, you could type in this command using the PIPEFORCE CLI:

```
pi commands property.
```

This will show you all available `property.*` pipeline commands and their description in the terminal.

### Create a new property

To create a new property, you need to use the command [`property.schema.put`](../api/commands#propertyschemaput).

Whenever you create a new a property, an event with key `property.created` is fired which can be used in other pipelines to listen for it.

See this link of your instance for details about this command (only: ENTERPRISE, CORPORATE):  
`https://portal-NAMESPACE.pipeforce.net/#/pipeform?pipe=property.schema.put`

Or use the CLI to get the documentation of this command listed:

```
pi help command property.schema.put
```

### Using a pipeline

Here is an example using a simple pipeline to create a new property:

```
pipeline:
  - property.schema.put:
      key: global/app/myApp/myNewProperty
```

### Using the CLI

Here is an example to use the CLI to create a new property:

```
pi command property.schema.put key=global/app/myApp/myNewProperty
```

### Using a Restful HTTP POST

In this example, a new property is created sending a HTTP POST request with the pipeline in JSON format:

```
POST https://hub-NAMESPACE.pipeforce.org/api/v3/pipeline
Content-Type: application/json

{
  "pipeline": [
    {
      "property.schema.put": {
        "key": "global/app/myApp/myNewProperty"
      }
    }
  ]
}
```

Change the value of a property
------------------------------

To change the value of the property, you can use the command `property.put`.

Whenever you change the value of a property, an event with key `property.changed` is fired which can be used in pipelines to listen for it.

Note: The property must already exist before you set its value. So use `property.schema.put` to define the property and then `property.put` to set its value.

### Documentation reference

See this link of your instance for details about this command (only: ENTERPRISE, CORPORATE):  
`https://portal-NAMESPACE.pipeforce.net/#/pipeform?pipe=property.put`

Or use the CLI to list the documentation:

```
pi help command property.put
```

### Using a pipeline

Here is an example of using a pipeline to set the value of a property:

```
pipeline:
  - property.put:
      key: global/app/myApp/myNewProperty
      value: "someValue"
```

You can also combine two commands to create a property and set its value right after:

```
pipeline:
  - property.schema.put:
      key: global/app/myApp/myNewProperty
  - property.put:
      key: global/app/myApp/myNewProperty
      value: "someValue"
```

**Why are there two different commands to create a property and set its value?**  
Because there are two different security levels with permissions. Those users who are able to change the value of a property with `property.put` not always have the permission to create a new property using `property.schema.put`. Having two commands allows it to differentiate in a pipeline what a user can do since in PIPEFORCE any command can have assigned different permissions.

### Using the CLI

Here is an example using the CLI to set the value of a property manually:

```
pi command property.put key=global/app/myApp/myNewProperty value=someValue
```

#### Uploading multiple files as properties

If you did setup a local low-code workspace with an app with multiple files in it and you want to upload those resources to the property store, you can use the CLI:

```
pi publish src/global/app/myapp
```

This CLI call with automatically “convert” all of your local files stored inside thy `myapp` folder to properties and uploads them to the server afterwards. The content of the files will become the value field of the property. Furthermore the type (mime type) field is automatically detected by inspecting the extension and the content of the file.

This can save you a lot of effort compared to do manual uploads.

Note: In the conversion process the properties will be saved at server side without any file extensions like `.json`, `.pi.yaml` or `.xml` for example. So a local file like this:

`src/global/app/myapp/pipeline/helloworld.pi.yaml`

will get this property store key assigned:

`global/app/myapp/pipeline/helloworld`

See the CLI documentation for more information about the publish action [Command Line Interface (CLI)](https://logabit.atlassian.net/wiki/spaces/DEVEX/pages/2151286739)

### Using a Restful HTTP POST

In this example, a value of a property is changed by sending a HTTP POST request with the pipeline in JSON format:

```
POST https://hub-NAMESPACE.pipeforce.org/api/v3/pipeline
Content-Type: application/json

{
  "pipeline": [
    {
      "property.put": {
        "key": "global/app/myApp/myNewProperty",
        "value": "someValue"
      }
    }
  ]
}
```

Delete a property
-----------------

In order to delete a property from the property store, you can use the command `property.schema.delete` which deletes the property value and all meta data that belong to this property.

**Be careful using this command since once deleted, the property and its value cannot be restored!**

Whenever you change the value of a property, an event with key `property.deleted` is fired which can be used in pipelines to listen for it.

### Documentation reference

See this link of your instance for details about this command (only: ENTERPRISE, CORPORATE):  
`https://portal-NAMESPACE.pipeforce.net/#/pipeform?pipe=property.schema.delete`

Or make this call in your terminal using the CLI:

```
pi help command property.schema.delete
```

### Using a pipeline

Here is an example using a pipeline to delete a property:

```
pipeline:
  - property.schema.delete:
      key: global/app/myApp/myNewProperty
```

### Using the CLI

Here is a call using the CLI to delete a property manually:

```
pi command property.schema.delete key=global/app/myApp/myNewProperty
```

This approach allows to delete a property at any location as long as you have the permission to do so.

#### Deleting multiple properties

With the CLI it is also possible to delete multiple properties with one call:

```
pi delete src/myapp/myresource/somename/**
```

This will delete all properties below the path somename recursively.

```
pi delete src/myapp/myresource/somename/*
```

This will delete only properties inside the “folder” `somename` but will leave all sub folders of it untouched.

### Using a Restful HTTP POST

In this example, the property will be deleted by sending a HTTP POST request with the pipeline in JSON format:

```
POST https://hub-NAMESPACE.pipeforce.org/api/v3/pipeline
Content-Type: application/json

{
  "pipeline": [
    {
      "property.delete": {
        "filter": "global/app/myApp/myNewProperty"
      }
    }
  ]
}
```

### Using a Restful HTTP GET

In this example, the property will be deleted by sending a HTTP GET request :

```
GET https://hub-NAMESPACE.pipeforce.org/api/v3/command:property.delete?key=global/app/myApp/myNewProperty
```

Listing and filtering existing properties
-----------------------------------------

If you want to list all existing properties and their metadata, you can use the command `property.list`.

### Documentation reference

See this link of your instance for details about this command:  
`https://portal-NAMESPACE.pipeforce.net/#/pipeform?pipe=property.list`

Or use the CLI to display the documentation in the command line:

```
pi help command property.list
```

### Using a pipeline

Here is an example using a pipeline to list all properties:

```
pipeline:
  - property.list
```

This will return you all properties from the property store in case you have the permission to do so.

#### Filtering

If you want to list only properties from a certain sub-path, you can use the `filter` parameter.

For example, if you want to see only the properties of your app `myapp`, then use this filter:

```
pipeline:
  - property.list:
      filter: global/app/myapp/**
```

The double asterisk `**` means any sub-path.

The single asterisk `*` means a single folder.

The wildcards (asterisks) can also be used inside a key. If you want to list for example all object schemas of your app `myapp`, you could use this list filter:

```
pipeline:
  - property.list:
      filter: global/app/myapp/object/*/v1/schema
```

### Using the CLI

You can use this CLI to list all properties:

```
pi command property.list
```

And for sure, you can also use the CLI with a filter:

```
pi command property.list filter=global/app/myapp/**
```

### Using a Restful HTTP POST

In this example, the properties will be listed by sending a HTTP POST request with the pipeline in JSON format:

```
POST https://hub-NAMESPACE.pipeforce.org/api/v3/pipeline
Content-Type: application/json

{
  "pipeline": [
    {
      "property.list": {
        "filter": "global/app/myapp/**"
      }
    }
  ]
}
```

### Using a Restful HTTP GET

In this example, the properties will be listed by sending a HTTP GET request:

```
GET https://hub-NAMESPACE.pipeforce.org/api/v3/command:property.list?filter=global/app/myapp/**
```

The top-level folders
=====================

The top-level level folders inside your property store define the access rules for a certain group or users of your instance.

![](https://logabit.atlassian.net/wiki/download/attachments/2151287086/image-20201021-174116.png?api=v2)

global
------

The global root folder contains all data and configuration accessible by any user by default.

This is the default folder where you should put your configuration and application data in most cases.

group
-----

The resources inside this folder are accessible by the defined groups. Any group has its own sub folder here whereas the name of the folder is the uuid of the group.

tenant
------

This root folder contains any resources and application data for tenants. Any tenant has its own sub folder here whereas the name of the folder is the uuid of the tenant.

user
----

This root folder contains user specific resources and application data. Any user has its own sub folder here whereas the name of the folder is the uuid of the user.

The app folder
==============

The app folder contains all resource folders which are required to define a single app. The name of the sub folder of the app folder is the unique name of the app. Here is an example how such a folder structure typically looks like:

![](https://logabit.atlassian.net/wiki/download/attachments/2151287086/grafik-20201022-181615.png?api=v2)

The key of your application would be this:

```
global/app/myApp
```

Since the app `myApp` is stored inside the global `app` folder, it is globally accessible. That means it can be potentially loaded by any user of the system. Whether this is possible additionally depends on the app itself since each app can have its own access rules set in IAM.

In order to make an app available only to a certain tenant, one could move it to the tenant folder as this example shows:

```
tenant/d4969187-42c9-449d-a1a3-594483034092/app/myApp
```

There is a bunch of built-in global apps which cannot be removed or changed by customizers. These names are reserved:

```
global/app/delivery
global/app/dropin
global/app/application
global/app/itrequest
global/app/accessrequest
global/app/travelexpense
global/app/sop
global/app/accountpayable
global/app/sickleave
global/app/vacationrequest
global/app/onboarding
```

The app folder structure
------------------------

Inside of an `app` folder there is a certain folder structure which defines the resources of an app. The typical folder structure looks like this:

![](https://logabit.atlassian.net/wiki/download/attachments/2151287086/grafik-20201022-181638.png?api=v2)

### form

This folder contains all form configuration properties for any form of the app whereas the name of the property is the name of the form. For example:

```
global/app/myApp/form/createUser
global/app/myApp/form/deleteUser
```

### list

This folder contains all list configuration properties for any list of the app whereas the name of the property is the name of the list. For example:

```
global/app/myApp/list/users
global/app/myApp/list/employees
```

### object

This folder contains any application model (schema) and its instances (if there are any).

#### schema

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

The schema property typically contains as value a JSON schema which describes this object. For the person object, the schema could for example look like this:

```
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

#### instance

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

```
{
  "firstName": "Homer",
  "lastName": "Simpson",
  "age": 48,
  "gender": "male"
}
```

### pipeline

This folder contains all pipeline configurations for the given app. A pipeline can be seen as the business logic part of an application.

Find here more about pipelines: [https://logabit.atlassian.net/wiki/spaces/DEVEX/pages/785088596](https://logabit.atlassian.net/wiki/spaces/DEVEX/pages/785088596)

Each property name corresponds with the name of the pipeline and contains as value the pipeline configuration. For example:

```
global/app/myApp/pipeline/informHR
global/app/myApp/pipeline/addToSAP
global/app/myApp/pipeline/addToActiveDirectory
```

Such a pipeline configuration could look like this:

```
pipeline:
  - mail.send:
      to: hr@company.de
      subject: "A new employee was addded!"
```

### script

Inside of the optional script folder, scripts can be placed which can contain more complex business logic if required. By default such scripts are written in JavaScript. Optionally also Python or Groovy are available (ask [support@pipeforce.io](mailto:support@pipeforce.io) if required). For example:

```
global/app/myApp/script/helloworld
```

Such a script could look like this example:

```
function command() {

    pi.message.headers["foo"] = "bar";
    pi.message.body = "HELLO WORLD IN THE BODY";

    var timestamp = pi.util.timestamp();
    pi.log.debug("Command script executed at: " + timestamp);
}
```

You can call such a script from a pipeline, like this example shows:

```
pipeline:
  - script.run:
      path: "global/app/myApp/script/helloworld"
```

### test

This folder typically contains pipelines for tests only. Whenever necessary, PIPEFORCE automatically executes the test pipelines inside this folder to make sure the app is working as expected. Therefore you have to make sure that these tests can be executed at any time and are fully reentrant (once a test has been finished it can be executed again as often as necessary).

For example:

```
global/app/myApp/test/createUserTest
```

The property contains the test pipeline as value. Such a test pipeline could look like this:

```
pipeline:
  - test:
      assertTrue(false)
```

### workflow

This folder contains any BPMN workflow files defining a business process.

For example:

```
global/app/myApp/workflow/approveNewEmployee
```

Setting up a customization workspace
====================================

In its simple case you can manage all properties in the property store with the `property.*` commands and the CLI using `pi pipeline`.

But if you want to develop applications with forms, pipelines or workflows inside, we recommend you to use a local development & customization workspace. This workspace contain the properties of such an app stored as files inside your local path $USER\_HOME/pipeforce/app/myapp. Any file created inside the myapp folder can then easily be synced with the property store with a single command line call using the CLI:

```
pi publish src/global/app/myapp
```

This scans the your local `myapp` folder and uploads only those resources which have been changed since last upload or have been created since then.

See here how to setup such a customization workspace: [Local Low-Code Workspace](https://logabit.atlassian.net/wiki/spaces/DEVEX/pages/2151286786)

See here for a getting started guide how to setup the CLI and use the local workspace: [https://logabit.atlassian.netnull/pages/createpage.action?spaceKey=DEVEX&title=Getting%20Started%20-%20Basics&linkCreation=true&fromPageId=988807265](https://logabit.atlassian.netnull/pages/createpage.action?spaceKey=DEVEX&title=Getting%20Started%20-%20Basics&linkCreation=true&fromPageId=988807265) .

Working with Visual Studio Code
===============================

We recommend you to work with the Visual Studio Code editor to manage your local resources in the customization editor.

Learn more about using VS Code for this here: [https://logabit.atlassian.net/wiki/pages/resumedraft.action?draftId=1008336990](https://logabit.atlassian.net/wiki/pages/resumedraft.action?draftId=1008336990)