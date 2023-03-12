---
sidebar_label: 17. Python Functions
---

# Python Functions as a Service

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 9.0 (BETA)</p>

PIPEFORCE has an advanced mechanism to execute [Python](https://www.python.org/doc/) functions as part of a pipeline execution. This way you can use the full power of this popular scripting language inside your pipelines.

The [Python functions]((https://www.w3schools.com/python/python_functions.asp)) will be executed by a backend service inside PIPEFORCE so the developer is not in charge of setting up and maintain a Python runtime environment. This approach is also known as Function as a Service (FaaS) or Lambda: You just send a Python function to the service and receive the calculated result. You do not care about any interpreter, image deployment, scalability issues or any other task related to the execution side.

This approach opens a lot of new possibilities to pipelines and your applications, such as for example:

- Create a set of libraries of functions for your custom needs and re-use them from anywhere inside your app pipelines.
- Write advanced tests using a Python testing framework.
- Do advanced data transformations and mappings with Python.
- And many more...

Since the FaaS services are stateless inside PIPEFORCE, it is possible to scale the execution of the Python scripts automatically and nearly unlimited. Since it is possible to run multiple of such FaaS execution services. Only the resources available to your cluster set the limit.

Here are some documentation references to Python:

- [Official Python Documentation](https://www.python.org/doc/)
- [Intro to Python Functions](https://www.w3schools.com/python/python_functions.asp)

## Deploy a function

The first step is to declare and deploy the function. 

### Auto deployment

The easiest way is to let PIPEFORCE manage the deployment of function scripts for you.

To do so, simply create a new script property inside the `function` folder of your app. For example: `global/app/myapp/function/helloworld`. Set the mime type of the property to `application/python; type=script`. 

Then, place your Python code inside the script property.  Make sure you place all of your code always inside a function like this:

```python
def function():
  return "Hello World"
```

A function with name `function` is considered as the default function and will get picked-up automatically in case no concrete function name was specified. More about this later.

After you have saved this property in the property editor, it automatically gets deployed to the FaaS backend. This is also true in case you edit or rename the property. If you delete the property, it will also automatically be undeployed from the FaaS backend for you.

:::tip Note
In case a function is called using the command `function.run` and the function could not be found in the FaaS backend (for example because the backend did auto-rescale), it will be automatically tried to install this script from the property store. Therefore, you should store the script code always in the property store. More information can be found in the section about executing a function below.
:::

#### Skip auto-deployment

In some situations you dont want to auto-deploy a function script from inside the `/function` property folder. To do so, add the keyword `pipeforce-faas:auto-deploy=false` (without any whitespaces) in the header comments. For example:

```python
# pipeforce-faas:auto-deploy=false

def function():
  return "Hello World"
```

In this case, this script will be excluded by any auto-deployment approaches. Manual deployment is still possible.

### Manual deployment

Alternatively, you can use the command `function.put` in order to declare and deploy a Python function manually. See this example:

```yaml
pipeline:
  - function.put:
      name: "myapp:helloworld"
      code: |
        def function():
          return "Hello World!"
```

For parameter `code` you can also set a custom uri pointing to the script to be deployed. Example:

```yaml
pipeline:
  - function.put:
      name: "myapp:helloworld"
      code: "$uri:property:global/app/myapp/function/hello"
```

:::caution Note
Make sure to always define an app prefix to your function name like `myapp:` which will specify to which app the function script belongs to. By default functions without this prefix will be rejected.
:::

:::warning
Be aware that scripts deployed manually using `function.put` must also be fully managed manually. In case the FaaS container in the backend automatically re-scales, it could be that your functions deployed there are gone. So you have to re-deploy them also manually. Therefore, if possible, instead of doing a manual deployment using `function.put` **prefer to save your scripts in the property store and let PIPEFORCE automatically manage the deployment for you**.
:::

### Undeploy a function

In order to undeploy a function, you can use the command `function.delete`. For example:

```yaml
pipeline:
  - function.delete:
      name: "myapp:utils"
```

## Execute a function

Once a function has been deployed, it can be called from inside any pipeline using the command  `function.run` as this example shows:

```yaml
pipeline:
  - function.run:
      name: "myapp:helloworld"
```

The name must always be in format `APP_NAME:SCRIPT_PATH` whereas `APP_NAME` must be replaced by the name of the app, the function
belongs to and `SCRIPT_PATH` must be replaced by the dot-based path of the script inside the `function` folder. For example for a name
of `io.pipeforce.myapp:utils.date` one would assume that the script resides in this property path: `global/app/io.pipeforce.myapp/function/utils/date`.

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
 - `value` - This is the return value of given type. In case the function has no return value, this value is set to `null` and `valueType` is set to `null`.

You can then use the returned value for further processing inside your pipeline.

### Execute via util

Another option to execute a function is using the util `@function.run(name, args)`. It is similar to the command `function.run`. For example:

```yaml
pipeline:
  - set.var:
      name: "resultFromFunction"
      value: "#{@function.run('myapp:helloworld')}"
```

### Function as Command

The third option to execute a function is by calling it similar to a command directly or in a pipeline. For example:

```yaml
pipeline:
  - myapp:myscript:myfunction:
      someArg: "some Value"
```

This will call the function `myfunction()` inside the script `myscipt` located in the `function` folder of app `myapp`. All parameters (except the command default parameters) passed here will be passed as arguments to the function. In this example, there is a function `myfunction(someArg)` expected.

:::caution 
The function path must always be fully qualified. Meaning, it must consist always of the three parts `appName:scriptPath:functionName`.
:::

### Auto deploy on execution

In case `function.run` is called and the function was not found in the FaaS backend, it will be tried to automatically deploy it from the property store. Since the path in the property store is derived from the function script name, it is important to keep the source of the functions in the property store always under the path `global/app/myapp/function/` whereas `myapp` must be replaced by the prefix of your function call.

The schema to find the property for a given function is like this:

```
<appName>:<functionPath>
```

1. First part of the name (the part before the first colon `:`) is the app name.
2. Second part of the name (after the first colon `:`) is the sub path inside the `/function` folder. Any period `.` will be replaced by a forward slash `/`.
3. Any implicit function name will be ignored (everything starting from the second colon `:` if exists).

Here are some example mappings from function script name to function properties in the property store:

- `myapp:util.hello` -> `global/app/myapp/function/util/hello`
- `myapp:util.hello:my_func` -> `global/app/myapp/function/util/hello`
- `io.pipeforce.myapp:foo` -> `global/app/io.pipeforce.myapp/function/foo`
- `hello` = Invalid, since no app name part exists.

## Passing arguments

You can also pass arguments to a function. These arguments must be passed as a JSON object, JSON array or as simple byte array to the command `function.run` using the parameter `args`. 

### JSON object argument

Let's assume you have a function like this deployed under name `myapp:helloworld`:

```python
def function(firstName, lastName):
  return "Hello: " + firstName + " " + lastName
```

The arguments can be passed to the function as JSON object by using the parameter `args` of the command `function.run`:

```yaml
pipeline:
  - function.run:
      name: "myapp:helloworld"
      args: {"firstName": "Sabrina", "lastName": "Smith"}
```

Or like this in full YAML:

```yaml
pipeline:
  - function.run:
      name: "myapp:helloworld"
      args:
        firstName: "Sabrina"
        lastName: "Smith"
```

In this case the name of an argument of the function will be mappped to the name of the attribute in the first level of the JSON Object. This way, the order of the attributes and arguments doesn't matter as long as the names match (for example firstName -> firstName). Therefore, a call like this would also work in order to call a function with this signature: `function(firstName, lastName)` (order of arguments is different compared to the order in the JSON): 

```yaml
pipeline:
  - function.run:
      name: "myapp:helloworld"
      args: {"lastName": "Smith", "firstName": "Sabrina"}
```
#### Dynamic arguments

In case you have dynamic arguments or entries in the JSON not known beforehand, you can use the variable keyword arguments symbol `**kwargs` of Python inside your script. See this example:

```python
def function(**kwargs):
  return "Hello: " + kwargs['firstName'] + " " + kwargs['lastName']
```
See the official Python documentation about `**kwargs` for more details.

### JSON array argument

Another option to pass arguments to a function is by using a JSON array.

Let's assume again you have a function like this deployed under name `myapp:hello`:

```python
def function(firstName, lastName):
  return "Hello: " + firstName + " " + lastName
```
Then, you can call this function with arguments using a JSON array like this:

```yaml
pipeline:
  - function.run:
      name: "myapp:helloworld"
      args: ["Sabrina", "Smith"]
```

Or like this in full YAML:

```yaml
pipeline:
  - function.run:
      name: "myapp:helloworld"
      args: 
        - "Sabrina"
        - "Smith"
```

The entries of the JSON array will be mapped to the arguments of the function from left to right. So entry [0] will map to `firstName` and entry [1] will map to `lastName`.

#### Dynamic arguments

In case you have dynamic arguments or the number of entries in the JSON array is not known beforehand, you can use the variable arguments symbol `*arg` of Python inside your script. See this example:

```python
def function(**args):
  return "Hello: " + args[0] + " " + args[1]
```
See the official Python documentation about `*args` for more details.

### Byte array argument

It is also possible to pass a byte array to a function. This is handy in case you would like to send binary data or single arguments in an easy way.

Let's assume you have a function like this deployed under name `myapp:helloworld`:

```python
def function(my_data):
  return "Data: " + str(my_data)
```

You can pass for example a text string to this function as a byte array, by using this call:

```yaml
pipeline:
  - function.run:
      name: "myapp:helloworld"
      args: "This is a simple text"
```

The value `This is a simple text` will be passed to the argument `my_data` as byte array. So make sure to treat it inside the function like this. Refer to the Python docs in order to see how to handle byte arrays inside a Python script.

### No argument

These values passed to the `args` parameter of the command `function.run` will all be interpreted as calls to functions having no argument: 

- `args: null`
- `args: []`
- `args: {}`
- `args: `

And if no `args` parameter is given at all.

Example:

```yaml
pipeline:
  - function.run:
      name: "myapp:helloworld"
      args: []
```

### Custom URI argument

It is also possible to pass a custom URI to the `args` parameter of command `function.run`, pointing to the value to be passed as argument. Example:

```yaml
pipeline:
  - function.run:
      name: "yourapp:helloworld"
      args: "$uri:property:global/app/myapp/data/myjsonargs"
```

The given URI will be resolved and it's content will be passed to the function by applying the rules mentioned above.

## Use a custom function name

By default the name of the function inside the script must be `function`, for example, lets assume you have this function script deployed under name `myapp:helloworld`:

```python
def function():
  return "Hello"
```

In order to call this function, you can execute the command `function.run` like this:

```yaml
pipeline:
  - function.run:
      name: "myapp:helloworld"
```

This call will load the script `helloworld` and will implicitely call the function `function()` inside of it (since no function name is given).

In case you have function names inside your script with names differently to `function`, then you need to specify them by passing the suffix `:my_function_name` to the `name` parameter of the `function.run` command, whereas `my_function_name` must be replaced with the name of the function you'd like to call.

Let's assume, you have a script deployed under name `myapp:helloworld` with a custom function name in it like this:

```python
def say_hello():
  return "Hello"
```

Then, you can call this function using this:

```yaml
pipeline:
  - function.run:
      name: "myapp:helloworld:say_hello"
```

For sure it is also possible to have multiple functions with different names inside a single script. Let's see this example script deployed under `myapp:utils`:

```python
def calc():
    return srt(2+2)

def hello():
    return "Hello"

def function():
    return "Default function"
```

In order to call the specific function `hello`, you can use this command call:

```yaml
pipeline:
  - function.run:
      name: "myapp:utils:hello"
```

In case the sufix is missing, the default function name `function` will be expected to exist inside the code.

## Calling Commands and Pipelines

In some cases it is necessary to callback PIPEFORCE hub and execute commands or pipelines from inside a Python function. For example if you would like to lookup some data from the property store, trigger automations or send messages to name just a few use cases.

This can be done, by simply defining the named argument `pipeforce` in your function signature. In case such an argument exists, the FaaS service automatically injects a new instance of `PipeforceClient` with it so it can be used inside your function. This client is already setup with 
current authentication and tracing features so no need for you to configure this.

In this example we will use the auto-injected `pipeforce` client in order to load a property value from the property store:

```python
def hello(pipeforce: PipeforceClient):
  return pipeforce.run_command("property.value.get", {"key": "global/app/hello/data/text"})
```

The `PipeforceClient` injected here is part of the official [Python SDK library for PIPEFORCE](https://pypi.org/project/pipeforce-sdk-python/). 

See <a href="/sdk-python/index.html" target="_blank">here</a> for the developer API documentation of the SDK.

You can call this function from inside your pipeline as usual:

```yaml
pipeline:
  - function.run:
      name: myapp:myfunction:hello
```

Note: We did not specify any args in the `function.run` command since the `pipeforce` argument will be automatically set by the FaaS service.

## Show deployed functions

### Return all functions

In order to list all deployed functions, you can use the command `functions.get` without any parameter:

```yaml
pipeline:
  - function.get
````

This will return a list of all functions with additional metadata. For example:

```json
{
    "status": "ok",
    "statusCode": 200,
    "value": [
        {
            "name": "myapp:function1",
            "size": 100,
            "created": 1.6742085685755234E9,
            "modified": 1.6742085685755234E9,
            "language": "python",
            "status": "ok",
            "statusMessage": ""
        },
        {
            "name": "myapp:function2",
            "size": 52,
            "created": 1.6742124433455272E9,
            "modified": 1.6742124433455272E9,
            "language": "python",
            "status": "ok",
            "statusMessage": ""
        },
        {
            "name": "common:function3",
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

### Return a single function

For performance reasons `function.get` without any parameters will return a list which doesn't contain the code of the functions. In order to see the code, you have to query for a single function using command `function.get` and parameter `name` set to the function you would like to return:

```yaml
pipeline:
  - function.get:
      name: "myapp:myfunction"
```
Which will return the information about the function like this example:

```json
{
    "status": "ok",
    "statusCode": 200,
    "value": {
        "type": "object",
        "data": {
            "name": "myapp:myfunction",
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

## Hooks

Hooks are functions with a reserved name. In case such a function is defined in a script, it will be called whenever the according action happened.

### `on_deploy`

This function will be called, whenever a script was deployed to the FaaS backend. This is true for new deployments, but also for updates.

Example:

```python
def on_deploy():
    return "Script has been deployed..."
```

### `on_undeploy`

This function will be called, whenever a script is about to be undeployed from the FaaS backend. 

Example:

```python
def on_undeploy():
    return "Script is about to be undeployed..."
```

## Install Packages 

### `on_requirements`

You can also install dependencies for your Python scripts from the [PyPi](https://pypi.org/) package index. To do so, declare a function `on_requirements()` without any args and return a list of requirements to be installed. For example:

```python
def on_requirements():
  return [
    "pytz==2022.7.1",
    "requests"
  ]
```

On deployment, this function will be auto-executed and each requirement from the list will be installed using `pip`. 

:::tip Note
If you install a package, this package will be available for all scripts deployed to the same FaaS instance.
:::

:::caution 
Since the `on_requirements()` function is called **before** any requirement is installed, it is not possible to
use such a requirement from the list inside this function.
:::

## Best Practises

You can develop your Python functions in many differnt ways and you should choose the way, which works best for you. In this section we would
like to show you some of our best practises how to write Python Functions as a Service very effectively. Pick the ideas you like here for your own workflow.

### Development

Create a new project folder and initialize it as a PIPEFORCE app by calling the command `pi init` on your terminal using the PIPEFORCE CLI tool. This will create the required folder structure for you.

Then inside this folder create a new app by calling `pi new app`.

Then open the project folder with the IDE of your coice. We sugesst to develop the Python functions locally using an advanced IDE of your choice like Microsoft Visual Studio Code or IntellJ for example.

Go to your newly created app folder and create a new sub folder `function` in it.

Then create a Python script inside this folder. For example `hello.py` with a script code like this:

```python
def function():
  return "Hello"
```

Finally, you can deploy your function to the FaaS backend by calling `pi publish`. This will install your function in the PIEPFORCE backend and makes it available to the other components in PIPEFORCE.

You can execute your function from inside any pipeline then by using the command `function.run`.

### Testing

We highly recommend to always develop your functions first locally and write tests for them as part of the development process. Only after all local test runs haven been passsed, deploy your function to the backend.

What works here best for us, is putting the test functions also into the same FaaS Python script.

See this example in order to add some test functions:


```python
def function():
    return "Hello"


def test_function_is_hello():
    result = function()
    assert result == "Hello", "I expect Hello here"


def test_function_is_world():
    result = function()
    assert result == "World", "This probably will fail"

if __name__ == "__main__":
    test_function_is_hello()
    test_function_is_world()
```

As you can see, we added two test functions here. Each of it starts with prefix `test_`. Additionaly we added an advice in order to run these test functions whenever the script is directly executed. This way you can run an debug your script locally in your IDE or by calling it directly from your local terminal:

```
python hello.py
```

Instead of calling each test function inside the `__main__` advice (which is sometimes the only possible way in case you cannot install additional packages), we recommend to execute a unit testing framework like [`pytest`](https://docs.pytest.org/) for example in order to pick-up and execute all of your test functions automatically for you:

```
pip install pytest
```

After you have installed `pytest` you can run all your test functions using a command in your terminal like this:

```
pytest hello.py
```

The tool `pytest` will automatically execute all functions starting with prefix  `test_`. In this case, you do not need the `__main__` section any longer.

Once the function has been deployed to PIPEFORCE, you can run the test functions online by using the command `test.run` or in the *Test* section of the PIPEFORCE WebUI.

### Source Code Control

One last thing we would like to recommend to you is using a source code control system like GitHub in order to manage different versions of your scripts and share them with other developers in your team easily.

To do so, you can create a new repository for your whole project folder and commit anything into this repo.

Hint: PIPEFORCE allows to install apps directly from GitHub using the Marketplace. This way you can easily distribute and/or rollout your applications then.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::