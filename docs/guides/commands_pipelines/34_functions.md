# Python Functions

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 9.0 (beta)</p>

PIPEFORCE has an advanced mechanism to execute Python functions as part of a pipeline execution. This way you can use the full power of this popular scripting language inside your pipelines.

The Python functions will be executed by a FaaS service inside PIPEFORCE so the developer is not in charge of setting up and maintain a Python runtime environment. This approach is also known as Function as a Service (FaaS): You just send a Python function to the service and receive the calculated result. You do not care about any interpreter, image deployment or scalability issues.

This approach opens a lot of new possibilities, such as for example:

- Create a set of libraries of functions for your custom needs and re-use them from anywhere inside your app pipelines.
- Write advanced tests using a Python testing framework.
- Do advanced data transformations and mappings with Python.
- And many more...

Since the FaaS services are stateless inside PIPEFORCE, it is possible to scale the execution of the Python scripts automatically and nearly unlimited. Since it is possible to run multiple of such FaaS execution services. Only the resources available to your cluster set the limit.

## Declare a function

The first step is to declare the function. The easiest way is to create a new property at `global/app/yourapp/function/helloworld` with mime type `application/python` (the mime parameter `type=script` is optional). Whereas `yourapp` must be replaced by the name of your app and `helloworld` must be replaced by the name of the Python script you would like to create.

The value of this property must be a valid Python script with a single function with name `function` in it:

```python
def function(name):
  return "Hello World: " + name
```

In case you would like to get the whole JSON into the function, use the variable args `**kwargs`:

```python
def function(**kwargs):
  return "Hello World: " + kwargs['name']
```

After you have saved this property in the property editor, it automatically gets deployed to the FaaS backend using the app name and the script name as the module name of the function to be called later. In this example this would be `yourapp.helloworld`. This is also true in case you edit or rename the property. If you delete the property, it will also be undeployed from the FaaS backend automatically for you.

It's important that the function name is `function` in this approach. The name of the arguments must match the field names of the JSON to be passed to this function. 

Alternatively, you can use the command `function.put` in order to declare and deploy a Python function more flexible. See this example:

```yaml
pipeline:
  - function.put:
      name: "foo.helloworld"
      code: |
        def function(name):
          return "Hello World: " + name
```

Using this approach, you can define any function module name you like.

For parameter `code` you can also set a custom uri pointing to the script to be deployed. Example:

```yaml
pipeline:
  - function.put:
      name: "foo.helloworld"
      code: "$uri:property:global/app/myapp/function/hello"
```

## Execute a function

Once a function has been deployed, it can be called from inside any pipeline using the command  `function.run` as this example shows:

```yaml
pipeline:
  - function.run:
      name: "yourapp.helloworld"
      args: {"name": "Max"}
```

The `args` parameter is optional. If given, it must be a JSON document or an object which can be converted to JSON. This parameter can also be a custom uri pointing to the value to be passed as argument. Example:

```yaml
pipeline:
  - function.run:
      name: "yourapp.helloworld"
      args: "$uri:property:global/app/myapp/data/myjsonargs"
```

The result of such a call is always a JSON in the PIPEFORCE result format, which looks like this:

```json
{
  "status": "ok",
  "statusCode": 200,
  "valueType": "string",
  "value": "Hello World: Max"
}
```

 - `status` - Can be one of `ok` or `error`
 - `statusCode` - Is compatible with the HTTP status codes. For example `200` is OK and `500` would mean an internal error.
 - `statusMessage` - Is an optional field and contains information about the status. For example a short hint in case of an error.
 - `valueType` - Defines the JSON type of the value field which can be one of the types declared by the [JSON schema specification](https://json-schema.org/understanding-json-schema/reference/type.html). For example `string`, `number`, `object`, `array` or `boolean`.
 - `value` - This is the return value of given type. In case the function has no return value, this value is set to `null` and `valueType` is set to `void`.

You can then use the returned value for further processing inside your pipeline.

Another option to execute a function is using the util `@function.run(name, args)`. It is similar to the command `function.run`. For example:

```yaml
pipeline:
  - set.var:
      name: "resultFromFunction"
      value: "#{@function.run('hello')}"
```

Here is an example to pass all vars as args to the function, all at once:

```yaml
vars:
  text: "Hello World!"
pipeline:
  - set.body:
      value: "#{@function.run('hello', vars)}"
```

You can then pick the var value from inside the function:

```python
def function(text):
    return "This var value was passed in: " + text
```

This will put this text to the body:
````
This var value was passed in: Hello World!
```

# Script with multiple functions

By default each script contains only one function of name `function`. You can also declare multiple functions inside such a script with custom names. For example:

```python
def calc(args):
    return srt(2+2)

def hello(args):
    return "Hello"
```

In order to execute a specific function inside such a script, you have to declare the function name as suffix to the module name using a colon `:` as separator.

Let's assume the script has been deployed using this command:

```yaml
pipeline:
  - function.put:
      name: "myapp.utils"
      code: |
        def calc(args):
          return srt(2+2)

        def hello(args):
          return "Hello"
```

In order to call the specific function `hello`, you can use this command call:

```yaml
pipeline:
  - function.run:
      name: "myapp.utils:hello"
```

In case the sufix is missing, the default function name `funcion` will be expected to exist inside the code.

## Undeploy a function

In order to undeploy a function, you can use the command `function.delete`. For example:

```yaml
pipeline:
  - function.delete:
      name: "myapp.utils"
```

## List all depoyed functions

In order to list all deployed functions, you can use the command `functions.get` without any parameter:

```yaml
pipeline:
  - function.get:
````

This will return a list of all functions with additional metadata. For example:

```json
{
    "status": "ok",
    "statusCode": 200,
    "value": [
        {
            "name": "function1",
            "size": 100,
            "created": 1.6742085685755234E9,
            "modified": 1.6742085685755234E9,
            "language": "python",
            "status": "ok",
            "statusMessage": ""
        },
        {
            "name": "function2",
            "size": 52,
            "created": 1.6742124433455272E9,
            "modified": 1.6742124433455272E9,
            "language": "python",
            "status": "ok",
            "statusMessage": ""
        },
        {
            "name": "common.function3",
            "size": 60,
            "created": 1.6742906565813148E9,
            "modified": 1.6742906565813148E9,
            "language": "python",
            "status": "ok",
            "statusMessage": ""
        }
    ],
    "valueType": "array",
    "count": 3
}
```

## Get a function

For performance reasons `function.get` without any parameters will return a list which doesn't contain the code of the functions. In order to see the code, you have to query for a single function using command `function.get` and parameter `name` set to the function you would like to return:

```yaml
pipeline:
  - function.get:
      name: "myfunction"
```
Which will return the information about the function like this example:

```json
{
    "status": "ok",
    "statusCode": 200,
    "value": {
        "type": "object",
        "data": {
            "name": "myfunction",
            "size": 60,
            "created": 1.6742906565813148E9,
            "modified": 1.6742906565813148E9,
            "language": "python",
            "content": "def function(args):\n    return \"HELLO WORLD: \" + args['foo']"
        }
    },
    "valueType": "object"
}
```

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::