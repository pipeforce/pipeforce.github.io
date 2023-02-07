---
title: Custom URI Reference
sidebar_label: Custom URIs
---

Reference documentation of built-int custom URI types.

Whenever you need to load data from a location, you can use a [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) to  point to such a location. You do so already by using such URIs in your web browser, for example. Common URI types you might be familiar with, are:

- ``https://www.google.com``
- ``ftp://smith:12345@ftp.host``
- ``file:/data/path/contract.docx``

Besides such commonly known URI types, PIPEFORE also supports custom URI types to simplify access to common resources. Whenever a URI is accepted as an argument, for example in commands or utils, you can apply such custom URIs. Here are some examples of such custom URIs in PIPEFORCE:

:::info Examples 
- ``$uri:drive:/someFolder/myFile.txt`` - Loads a file from the ``drive`` data room.
- ``$uri:property:global/app/myapp/template/text`` - Loads a property from the property store.
- ``$uri:property:global/app/myapp/template/text@value`` - Loads the value of a property from the property store.
- ``$uri:pipeline:global/app/myapp/pipeline/hello`` - Executes the persisted pipeline at given location and returns the final body content as result.
- ``$uri:user:admin`` - Returns the information object of the given user with given username.
- ``$uri:user:uuid=260e8400-e29b-11d4-a716-443655440000`` - Returns the information object of the given user with given uuid.
:::

:::tip Note
Custom PIPEFORCE uris typically start with prefix ``$uri:`` followed by the concrete uri type. 
:::

Here is an example to apply a custom URI on a command:

```yaml
pipeline:
    - mails.send:
        to: recipient@mail.tld
        subject: "Hello!"
        message": Hello World!"
        attachments: "$uri:property:global/app/myapp/resources/file"
```
As you can see in this example, the attachments argument contains a custom URI pointing to a property in the property store. This property will be loaded and added as an attachment.

And in this example, a custom uri is used inside a PEL util instead:

```yaml
pipeline:
    - set.body:
        value: "#{@resolve.uri('$uri:drive:/someFolder/document.json')}"
```

## Resolving an URI

You have multiple options to resolve an URI: Resolving an URI means, loading
the content this URI is pointing to.

### By command

In case you use a URI as parameter to a supporting command, this URI will automatically resolved
to its content data by this command, as you could see by the previous example:

```yaml
pipeline:
    - mails.send:
        to: recipient@mail.tld
        subject: "Hello!"
        message": Hello World!"
        attachments: "$uri:property:global/app/myapp/resources/file"
```

### By `resolve` command

In order to explicitely resolve an URI, there is a special command `resolve` for this, which can resolve any URI and returns the content of it.

You can use it in a pipeline like this:
```yaml
pipeline:
    - resolve:
        uri: "$uri:property:gloabl/app/myapp/config/app"
```

This example will return you the full property (metdata + value) of the given property path. For example like this:

```json
{
    "checksum": "sha-256=38334e50687bc68125e3b66121311a0bd1b848b8fa36c85dfe189d84313c5582",
    "path": "/pipeforce/ns/global/app/myapp/config/app",
    "uuid": "cc059f6e-fa6a-4ad8-bc51-04a85e33b965",
    "locked": false,
    "trashed": false,
    "value": "{ \"title\": \"My App\", ...}",
    "defaultValue": null,
    "type": "application/json",
    "created": 1669907722095,
    "updated": 1671171893712,
    "timeToLive": null
}
```

In order to return only the value of a property, add a property filter with `@` at the end (see below for more details about this). For example:

```yaml
pipeline:
    - resolve:
        uri: "$uri:property:gloabl/app/myapp/config/app@value"
```

This will the return only the value part of the property as JSON:

```json
{
    "title": "My App",
    "description": "This is my app",
    "icon": "assignment",
    "tags": [
        "myapp"
    ],
    ...
}
```

And if you would like return only the `title` text of the property value, you can use the `#` symbol which filters the value of a property, in case it is a JSON document (more about this in the description for Property URI below). For example: 

```yaml
pipeline:
    - resolve:
        uri: "$uri:property:gloabl/app/myapp/config/app#title"
```

This would return:

```
My App
```

:::info Note
In case you use the `#` symbol or any other symbol reserved by a GET request URL, you need to decode the uri parameter. Alternatively you can send
the uri in a POST request, `form-data` encoded in the body. In this case, no encoding is required.
:::

Here is an example how to use this command with `curl` on the terminal with URI encoded parameter (the symbol `#` is encoded to `%23`):

```bash
curl -X GET -u username:password 'https://hub-ns.pipeforce.net/api/v3/command/resolve?uri=$uri:property:gloabl/app/myapp/config/app%23title'
```

### By the `@resolve` functions 

Another possibility inside a pipeline is to use the `@resolve.uri` function:

```yaml
pipeline:
    - log:
        message: "Content is: #{@resolve.uri('$uri:property:gloabl/app/myapp/config/app@value')}"
```


## Drive URI

This custom URI points to a file on the data room service ``drive``.

```
$uri:drive:[PATH TO FILE OR FOLDER]
```
Example:

```yaml
pipeline:
    - mail.send:
        attachments: "$uri:drive:/contracts/contract1.pdf"
```

## Pipeline URI

This URI can be used to execute a persisted pipeline, and return the final body output of this pipeline as a result.

```
$uri:pipeline:[PIPELINE PATH]
```

Let's assume you have a pipeline like this stored at ``global/app/myapp/pipeline/hello``:

```yaml
pipeline:
    - set.body:
        value: "HELLO WORLD!"
```

To execute this pipeline and to output this hello world example, you could execute a URI like this:

```yaml
pipeline:
    - log:
        message: "Output: #{@resolve.uri('$uri:pipeline:global/app/myapp/pipeline/hello')}"
```

This will create a log-entry like this:

```
Output: HELLO WORLD!
```

## Property URI

This custom URI points to a property in the property store.

```
$uri:property:[PATH OF THE PROPERTY]
```

Example:

```yaml
pipeline:
    - set.body:
        value: "#{@resolve.uri('$uri:property:global/app/myapp/object/person')}"
```

### Property Filter

It is also possible to further filter the property using a PE, which gets applied to the property before its result will be returned.

```
$uri:property:[PATH]@[PROPERTY_PEL]
```

As you might already know, a property has a structure like this:

```json
{

    "path": "/unique/path/of/the/property",
    "uuid": "unique id",
    "type": "mime type of this property",
    "created": createdTimeStampInMillis,
    "value": "The payload of the property",
    "attachments": [

        {
            "uuid": "unique id",
            "name": "file name of the attachment",
            "size": bytes,
            "contentType": "content type of this attachment",
            "chunks": [
                {
                    "size": bytes,
                    "content": byteArray
                },
                ...
            ]
        },
        ...
    ]
    ...
}
```

For a full list of the attributes of a property, please refer to the [Property Store Guide](../propertystore#what-is-a-property).

With a Property Filter, you can now select the part you would like to return in your URI:

```yaml
pipeline:
    - log:
        message: "Num. of attachments: #{@resolve.uri('$uri:property:global/app/myapp/object/person@attachments.size()')}"
```
As you can see in this example, you can count the number of attachments of the property with a single URI call.

### Value Filter

In case the value of a property is of type ``application/json``, you can apply a filter on **the value** in order to return just a subset from the JSON value.

```
$uri:property:[PATH]#[VALUE_PEL]
```
:::caution
This filter only works in case the value of the property is of the type: ``application/json``!
:::

Let's assume we have a property in the property store like this:

```json
{
    "path": "path/to/person",
    "type": "application/json",
    "value": {
        "name": "Max Master",
        "age": 35,
        "hobbies": [
            "swimming",
            "hiking"
        ]
    }
}
```

We can use a Value Filter in the URI in order to directly return the name of the person, like this:

```yaml
pipeline:
    - log:
        message: "Name: #{@resolve.uri('$uri:property:path/to/person#name')}"
```

Which will log a message like this:

```
Name: Max Master
```

It's possible to use the full power of the PEL to filter, for example:

```yaml
pipeline:
    - log:
        message: "Number of hobbies: #{@resolve.uri('$uri:property:path/to/person#hobbies.size()')}"
```

Which will log a message like this:

```
Number of hobbies: 3
```

## User URI

This uri is handy to load a user object given by a username or uuid.

```
$uri:user:[USERNAME]
```

or

```
$uri:user:uuid=[UUID]
```

For example:

```yaml
pipeline:
    - set.body:
        value: "#{@resolve.uri('$uri:user:maria')}"
```

This will return the user-info data similar to this:

```json
{
    "uuid": "someUuid",
    "username": "maria",
    "email": "some@email.tld",
    "firstName": "Maria",
    "lastName": "Meyer",
    ...
}
```

The same is true when using the uuid of the user:

```yaml
pipeline:
    - set.body:
        value: "#{@resolve.uri('$uri:user:uuid=someUuid')}"
```

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::