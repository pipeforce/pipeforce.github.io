---
title: Custom URI Reference
sidebar_label: Custom URIs
---

Reference documentation of built-int custom URI types.

Whenever you need to load data from a location, you can use a [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) to  point to such a location. You do already so by using such URIs in your web browser for example. Common URI types you might be familiar with, are:

- ``https://www.google.com``
- ``ftp://smith:12345@ftp.host``
- ``file:/data/path/contract.docx``

Beside such commonly known URI types, PIPEFORE also supports custom URI types to simplify access to common resources. Whenever an URI is accepted as argument, for example in commands or on utils, you can apply such custom URIs. Here are some examples of such custom URIs in PIPEFORCE:

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
As you can see in this example, the attachments argument contains a custom URI pointing to a property in the property store. This property will be loaded and added as attachment.

And in this example, a custom uri is used inside a PEL util instead:

```yaml
pipeline:
    - set.body:
        value: "#{@uri.resolve('$uri:drive:/someFolder/document.json')}"
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

This URI can be used to execute a persisted pipeline and return the final body output of this pipeline as result.

```
$uri:pipeline:[PIPELINE PATH]
```

Lets assume you have a pipeline like this stored at ``global/app/myapp/pipeline/hello``:

```yaml
pipeline:
    - set.body:
        value: "HELLO WORLD!"
```

To execute this pipeline and to output this hello world example, you could execute an URI like this:

```yaml
pipeline:
    - log:
        message: "Output: #{@uri.resolve('$uri:pipeline:global/app/myapp/pipeline/hello')}"
```

This will create a log entry like this:

```
Output: HELLO WORLD!
```

## Property URI

This custom URI points to a property in the property store.

```
$uri:property:[KEY PATH OF THE PROPERTY]
```

Example:

```yaml
pipeline:
    - set.body:
        value: "#{@uri.resolve('$uri:property:global/app/myapp/object/person')}"
```

### Property Filter

It is also possible to further filter the property using a PE which gets applied to the property before its result will be returned.

```
$uri:property:[PATH]@[PROPERTY_PEL]
```

As you might already know, a property has a structure like this:

```json
{

    "key": "/unique/path/of/the/property",
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

For a full list of the attributes of a property, please refer to the [Property Store Guide](../guides/propertystore#what-is-a-property).

With a Property Filter you can now select the part you would like to return in your URI:

```yaml
pipeline:
    - log:
        message: "Num. of attachments: #{@uri.resolve('$uri:property:global/app/myapp/object/person@attachments.size()')}"
```
As you can see in this example, you can count the number of attachments of the property with a single URI call.

### Value Filter

In case the value of a property is of type ``application/json``, you can apply a value filter in order to return just a subset from the JSON value.

```
$uri:property:[PATH]#[VALUE_PEL]
```
:::caution
This filter only works in case the value of the property is of type ``application/json``!
:::

Lets assume we have a property in the property store like this:

```json
{
    "key": "path/to/person",
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
        message: "Name: #{@uri.resolve('$uri:property:path/to/person#name')}"
```

Which will log a message like this:

```
Name: Max Master
```

Its possible to use the full power of the PEL to filter, for example:

```yaml
pipeline:
    - log:
        message: "Number of hobbies: #{@uri.resolve('$uri:property:path/to/person#hobbies.size()')}"
```

Which will log a message like this:

```
Number of hobbies: 3
```

## User URI

This uri is handy to load a user object given by username or uuid.

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
        value: "#{@uri.resolve('$uri:user:maria')}"
```

This will return the user info data similar to this:

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
        value: "#{@uri.resolve('$uri:user:uuid=someUuid')}"
```