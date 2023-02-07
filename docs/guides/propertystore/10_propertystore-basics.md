---
id: basics

title: Property Store
sidebar_label: Basics
slug: /propertystore
---

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 3.0</p>

## What is the Property Store?

The property store is a powerful key-value database inside PIPEFORCE to save your application data like sources, attachments or JSON data for example. You can create, update, query and delete data on the property store using the  [`property.*`](../../../api/commands#property-v1) commands. 

## What is a Property?

Each data (for example plain text, JSON, binary data, ...) stored in the property store is wrapped into an envelope called a **property**. 

### Property Attributes

Each property has multiple attributes (the envelope data). The most important ones are:

| Attribute     | Description 
| ---           | ---         
| `path`         | The unique, absolute path of the property. This value can change over time, for example, if a property was moved to another virtual location. <br/><br/>Example value: `/pipeforce/enterprise/global/app/myapp/data/hello`. <br/><br/> Note: Since version 9.0 this attribute was renamed from `key` to `path`. For backwards compatibility, both attributes will be provided, but `key` is deprecated and will be removed in one of the next releases.| 
| `value`       | This attribute contains the payload of the property serialized as string. <br/><br/>Example value: `{\"hello\": \"world\"}`. <br/><br/>Note: If you need to store a huge amount of binary data, consider to use [property attachments](/docs/guides/propertystore/attachments) instead.|
| `uuid`        | A unqiue identificator of the property. Differently to `path`, once created, this **will never change**.  <br/><br/>Example value: `333a38e7-9188-4135-b87b-3d890f676445`|  
| `type`        | This attribute contains the mime type of the value. If this attribute is ```null```, it is expected that the mime type of the value is of the default type: `text/plain`. <br/><br/>Example value: `application/json`
| `created`      | A unix epoch timestamp in millis when this property was created. <br/><br/>Example value: `1613397114448`
| `updated`     | A unix epoch timestamp in millis when this property was updated last or `null` in case it was never updated after creation. <br/><br/>Example value: `null`
| `timeToLive`  | The time to live (ttl) in minutes of this property since creation. If the time to live has been expired, the property is eligable to be deleted. Usually one of the next cleanup jobs will then delete this property. There is no guarantee that the property is deleted exactly after this time has expired. If the value of **timeToLive** is `0` or `null` (default), the property will never be deleted. <br/><br/>Example value: `5`
| `locked`       | A boolean value indicating whether this property has a lock assigned. In case a lock is assigned, the property can only be altered by the user or group, this lock is exclusive to. See section [Property Locking](/docs/guides/propertystore/property_locks) for more details.
| `trashed`       | A boolean value indicating whether this property has been moved to the trash bin. See section [Trash Bin](/docs/guides/propertystore/trash_bin) for more details.
### Property Path

Every property has a unique **path**. Such a property path is structured in an **hierarchical way** and has this base structure:

```
/pipeforce/<namespace>/<localPath>
```
For example:
```
/pipeforce/mynamespace/global/app/myapp/config/app
```

Every property belongs to a certain namespace. If such a path starts with a slash `/` at the beginning, it is interpreted as absolute. Meaning, it must start with `/pipeforce` followed by the namespace, this property belongs to. Properties are always stored with their absolute paths in the property store.

At runtime, property paths can be defined and interpreted relatively. Here is an example of an relative path of a property:

```bash
global/app/myapp/config/app
```

Relative property paths do not start with a slash. They do not contain information about the current namespace. This information is automatically added when a property is loaded or stored.

:::tip Why property path?

 - It defines the **unqiue path** of a property in a tree structure. 
 - It makes it **easier to query** a nested subset of properties "recursively" using path patterns.
 - It allows to **group properties** together under a "path-like" structure.
 - It is also used for declaring nested read and write **permissions**.
 - It defines the **storage location** of the property for performance optimization (for example archive is stored on a different location)

:::

### Property Path Pattern

Since the path of a property is similar to a path in a file tree, it is possible to use path matching techniques in order to easily find and load a nested subset of properties "recursively" from the store. By default, PIPEFORCE uses the so called "ant-style" path matcher. This matcher uses the following rules, applied to a path:


 - The double asterisk `**` matches any character in the path at given position.
 - The single asterisk `*` matches zero or more charachters inside a "directory" of the path (up to the next slash `/`).

The asterisk `*` is often also called **wildcard**. A property path containing wildcards are called a **path pattern**.

**Example 1**
```
global/app/myapp/**
```
This path pattern will select all properties having a path starting with `global/app/myapp` at **any sublevel**. So it will match these paths:
```
global/app/myapp/config/app
global/app/myapp/pipeline/mypipeline
global/app/myapp/sub1/sub2/sub3/sub4/sub5/sub6/file
```
But it won't mach these paths:
```
global/app/ontherapp/config/app
global/something
tmp/data
```
**Example 2**
```
global/app/myapp/*
```
This path pattern will select all properties having a path starting with `global/app/myapp` inside **this level** (meaning inside the "directory" `myapp`) but **not** at any sublevel. So it will match these paths:
```
global/app/myapp/file1
global/app/myapp/file2
global/app/myapp/another
```
But it won't match these paths:
```
global/app/myapp/config/app
global/app/ontherapp/config/app
tmp/data
```
**Example 3**

It is also possible to combine multiple wildcards inside a pattern.

```
global/app/*/data/**
```
This path pattern will match any path starting with prefix `global/app`, followed by any app name (without any slash), followed by `/data/`, followed by any further charachters at any level. It will match these paths:
```
global/app/myapp/data/user
global/app/ontherapp/data/user
global/app/third/data/folder/file
```
But it won't match these paths:
```
global/app/myapp/config/app
tmp/data
```
**Example 4**

```
*
```
This pattern would match any relative path at top level, but not any sub-level. So it will match these paths:
```
resourceA
resourceB
```
But it won't match these paths:
```
folder/file1
folder/folder2/file2
```
**Example 5**
```
**
```
This pattern will match anything at any level. So it will match these paths:

```
resourceA
resourceB
folder/file1
folder/folder2/file2
```
There is no path, this pattern will not match.

:::warning
Since the catch-all pattern `**` (without any additional path information) will match anything, it should be used very rarely. It can cause huge performance impacts. Because of this reason, the catch-all is not everywhere allowed. So think twice before using it.
:::

### Property Value and Type

The `value` attribute of a property defines the **payload** of a property. Such a payload could be a JSON document or a plain text for example. It is always stored as string (text) value. Which type the text value represents, is defined by the `type` attribute which could be of any supported mime type e.g. `application/json` or `text/plain`. The latter is the default, if no type is specified. Important mime types, used by PIPEFORCE are:

|Mime Type | Description
|--- | ---
|	`application/javascript` | A JavaScript script (deprecated, use `text/javascript` whenever possible).
|	`application/json` | JSON document.
|	`application/yaml` | YAML document (not IANA listed).
|	`application/xml` | XML document as part of an application.
|	`text/html` | HTML document.
|	`text/javascript` | A JavaScript script.
|	`text/plain` | Plain text document (string). This is the default, if no `type` has been specified for a property.
|	`text/xml` | XML document.


See the IANA.org websites for a full list of official mime types:
https://www.iana.org/assignments/media-types/media-types.xhtml

Property types can additionally contain parameters. Example:

```
text/plain; charset=UTF8
```
Multiple parameters are separated by a colon `;`. See the [IANA specification](https://www.iana.org/assignments/media-types-parameters/media-types-parameters.xhtml) for details. PIPEFORCE uses custom type parameters in some situations. Some examples:

| Type |Description
|--- |---
|`text/plain; encoding=base64`| Indicates, that the property value is a base64 encoded string.
|`application/yaml; type=pipeline`| The property value is a pipeline script, written in YAML.
|`application/xml; type=workflow`| The property value is an XML document defining a workflow (for example BPMN).
|`application/json; type=form`| The property value is a JSON document defining a PIPEFORCE form config.
|`application/json; type=list`| The property value is a JSON document defining a PIPEFORCE list config.
|`application/json; type=schema`| The property value is a JSON document defining a JSON schema which complies with the definition from [json-schema.org](https://json-schema.org/).
|`text/plain; type=template; format=freemarker`| The property value is a [FreeMarker](https://freemarker.apache.org/) template .
|`text/plain; type=template; format=velocity`| The property value is a [Velocity](https://velocity.apache.org/) template .

### Binary Value

The `value` attribute contains always values of type `string`. In order to store binary data there, it must be `base64` encoded before it gets persisted. In this case, the property must be marked as a base64 value. This is done in the `type` attribute using the mime type parameter `encoding=base64`. Example:

```yaml
value: "<some base64 encoded value>"
type: "application/pdf;encoding=base64"
```

In this case the property can be automatically converted back into a "binary" file when loaded.

:::caution
The base64 encoding approach is only meant for small files, not bigger than a few KB and not that many. In case you want to store more and bigger files, consider storing them as **property attachments** instead, since they do have a chunked storage handling concept and can store a huge amount of binary data more effectively.
:::

## Create a Property

To create a new property in the property store, you need to define a property schema first using the command [`property.schema.put`](../api/commands#propertyschemaput-v1). Example:

```yaml
pipeline:
  - property.schema.put:
      path: "global/app/myapp/data/mydata"
      type: "application/json"
```

This schema defines the base envelope data for the new property like its `path`, `uuid` and `type`. After the schema has been created, the property payload can be added and edited.

To simplify these steps, you can create the schema and add the payload value in one single step:

```yaml
pipeline:
  - property.schema.put:
      path: "global/app/myapp/data/mydata"
      type: "application/json"
      value: {"hello": "world"}
```
### Property created event
Whenever you create a new a property, an event with key `property.created` is fired with the created property stored in `payload.target` of the event object. This way you can listen in your pipelines for properties created newly. See the [reference documentation](../api/events#propertycreated-v1) for details. Here is an example how to listen to such an event in a **persisted** pipeline:
```yaml
pipeline:
  - event.listen:
      key: "property.created"
      filter: "#{body.payload.target.path.contains('global/app/myapp/data/mydata')}"

  # Do something here
```
This persisted pipeline gets automatically executed whever a new property with a path containing `global/app/myapp/data/mydata` has been created.

## Update a Property

To change the **value** of the property, you can use the command [`property.put`](../api/commands#propertyput-v1). The property must already exist beforehand. Example:

```yaml
pipeline:
 - property.put: 
     path: "global/app/myapp/data/mydata"
     value: {"new": "value"}
```

In order to change the envelope data (attributes) of a property, you need to use the  [`property.schema.put`](../api/commands#propertyput-v1) command:

```yaml
pipeline:
 - property.schema.put: 
     path: "global/app/myapp/data/mydata"
     timeToLive: 5
```

If you would like to change the path of an existing property, you can use the [`property.move`](../api/commands#propertymove-v1) command:

```yaml
pipeline:
 - property.move: 
     path: "global/app/myapp/data/mydata"
     to: "global/app/myapp/data/newlocation"
```

:::info  
**Why are there two different commands to create a property and set its value?**

Because there are two different security levels with permissions. Those users who are able to change the value of a property with `property.put`, not always have the permission to create a new property or changing its other attributes using `property.schema.put`. Having two commands allows it to differentiate in a pipeline what a user can do, since in PIPEFORCE any command can have assigned different permissions.
:::


### Property changed event

Whenever you update a property value or one of its other attributes, an event with key `property.updated` is fired with the origin property stored in `origin` of the event object and the final version of the property in `target`. This way you can listen in your pipelines for property changes. See the [reference documentation](../api/events#propertyupdated) for details. Here is an example how to listen to such an event in a **persisted** pipeline:
```yaml
pipeline:
  - event.listen:
      key: "property.updated"
      filter: "#{body.payload.origin.path.contains('global/app/myapp/data/mydata')}"

  # Do something here
```

### Property moved event

Whenever you move a property by changing its origin path, an event with key `property.moved` is fired with the origin path of the property stored in `origin` of the event object and the final path of the property in `target`. This way you can listen in your pipelines for property movements. See the [reference documentation](../api/events#propertymoved) for details. Here is an example how to listen to such an event in a **persisted** pipeline:
```yaml
pipeline:
  - event.listen:
      key: "property.moved"
      filter: "#{body.payload.origin.contains('global/app/myapp/data/mydata')}"

  # Do something here
```
## Delete a Property

In order to delete a property from the property store, you can use the command `property.schema.delete`, which deletes the property value and all metadata that belongs to this property. Example:
```yaml
pipeline:
 - property.schema.delete:
     path: "global/app/myapp/data/mydata"
```

:::warning
Be careful using this command since once deleted, the property and its value cannot be restored!
:::

You can also delete multiple properties at once using a pattern. Example:

```yaml
pipeline:
 - property.schema.delete:
     pattern: "global/app/myapp/**"
```
This example will delete all properties of the app `myapp` recursively.
### Property deleted event

Whenever you delete a property, an event with key `property.deleted` is fired with the origin property stored in `payload.origin` of the event object. This way you can listen in your pipelines for property deletions. See the [reference documentation](../api/events#propertydeleted) for details. Here is an example how to listen to such an event in a **persisted** pipeline:
```yaml
pipeline:
  - event.listen:
      key: "property.deleted"
      filter: "#{body.payload.origin.path.contains('global/app/myapp/data/mydata')}"

  # Do something here
```
## Loading Properties

If you want to query for property data, you have multiple options in PIPEFORCE.
### Listing properties

One of the simplest approaches to query for multiple properties is by using the command  [`property.list`](../api/commands#propertylist-v1). Example:

```yaml
pipeline:
  - property.list:
      pattern: global/app/myapp/pipeline/helloworld
```

This command will return a result similar to the result shown below, which describes all important attributes of the property:

```json
{
  "path": "/pipeforce/enterprise/global/app/myapp/pipeline/helloworld",
  "uuid": "529a38e7-9188-4135-b87b-3d890f6764f3",
  "value": "pipeline:\n  - log:        \n      message: \"Hello World\"",
  "defaultValue": null,
  "type": "application/yaml;type=pipeline",
  "created": 1613397114448,
  "updated": null,
  "timeToLive": null,
}
```
You can also use a path pattern in order to load multiple properties matching this path pattern. This example will load all properties inside the `pipeline` folder:
```yaml
pipeline:
  - property.list:
      pattern: global/app/myapp/**
```
This will return "recursively" all properties below the path `global/app/myapp/`. The properties attributes including the value will be returned. 
```
[
  {
    "path": "...",
    "uuid": "...",
    "value": "...",
    "defaultValue": null,
    "type": "...",
    "created": 123,
    "updated": null,
    "timeToLive": null,
  },
  {
    "path": "...",
    "uuid": "...",
    "value": "...",
    "defaultValue": null,
    "type": "...",
    "created": 123,
    "updated": null,
    "timeToLive": null,
  }
]
```

### Getting property value

In case you would like to load only the value (payload) of a property but not its metadata, you can use the command [`property.value.get`](../api/commands#propertyvalueget-v1). Example:

```yaml
pipeline:
  - property.value.get:
      path: "global/app/myapp/pipeline/helloworld"
```

### Advanced Querying

In case the base commands for loading properties are not sufficient for your case, you can use [Advanced Querying](guides/propertystore/advanced-querying).

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::