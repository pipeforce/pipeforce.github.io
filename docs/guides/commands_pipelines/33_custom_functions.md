# Custom Functions
<p class="theme-doc-version-badge badge badge--secondary">Since Version: 8.5</p>

Inside a [Pipeline ](/docs/commands_pipelines#pipeline) you can declare a custom function using the command [`function`](/docs/api/commands#function-v1) and reuse it by calling the command [`function.call`](/docs/api/commands#functioncall-v1).

## Declaring a function

Here is a simple example to declare a function in a pipeline:

```yaml
pipeline:
  - function:
      args:
        firstName: "Some"
        lastName:  "Name"
      do: |
        firstName + ' ' + lastName
```

The parameter `args` defines the (optional) parameters to the function as name-value pairs.

This arguments can be directly accessed by their names inside to the function expression.

The function expression is placed using the parameter `do`. This can be any supported [Pipeline Expression](/docs/guides/commands_pipelines/pel). Since the parameter is an explicit expression parameter, you do not need to use the expression brackets like `#{`and `}`. They're optional.

This example will execute the function with the pipeline flow and results in an output like this:

```
Some Name
```

## Accessing scope variables

You can also access all scopes variables like `vars`, `headers` and `body`, as would inside any Pipeline Expression:

```yaml
vars:
  lastName: "Name"
pipeline:
  - function:
      args:
        firstName: "Some"
      do: |
        firstName + ' ' + var.lastName
```
## Calling a function

In order to call a function from another position in the pipeline, you have to first declare it using the command `function` and to define a name for the function unique inside the pipelie using the parameter `name`.

:::tip Note
 - A callable function must be declared first in the pipeline, before it can be called.
 - It's good practise to define callable functions always at the very top of the pipeline.
 - Callable function names must be unique within a pipeline.
 - A callable function (= has `name` parameter) will be ignored by the pipeline flow and must be explicitely called using the command `function.call`.
:::

Here is an example to declare such a callable function:

```yaml
pipeline:
  - function:
      name: "concatNames"
      args:
        firstName: "Some"
        lastName:  "Name"
      do: |
        firstName + ' ' + lastName

```

As soon as such a function has a `name` assigned, it will no longer be executed by the default pipeline flow, but ignored. Now, it can be executed only by calling the command `function.call`.

In case you would like to execute this function with the pipeline flow and via `function.call`, you need to set the parameter `flow` to `true`. 

Here is an example to call the function `concatNames` declared before:

```yaml
pipeline:

  - function:
      name: "concatNames"
      args:
        firstName: "Some"
        lastName:  "Name"
      do: |
        firstName + ' ' + lastName

  - function.call:
      name: "concatNames"

```

In case you do not define any args in `function.call`, the default args will be used. So the output here would be:

```
Some Name
```

You can overwrite the default args by re-declaring some or all of them:


```yaml
pipeline:

  - function:
      name: "concatNames"
      args:
        firstName: "Some"
        lastName:  "Name"
      do: |
        firstName + ' ' + lastName

  - function.call:
      name: "concatNames"
      args:
        firstName: "HELLO"

```

Output would be:

```
HELLO Name
```

By default, the result of the function will be stored to the body. You can change that, by using the parameter `output` to store it to any location like the vars scope for example:

```yaml
pipeline:

  - function:
      name: "concatNames"
      args:
        firstName: "Some"
        lastName:  "Name"
      do: |
        firstName + ' ' + lastName

  - function.call:
      name: "concatNames"
      args:
        firstName: "HELLO"
      output: var.functionResult

  - set.body:
      value: "Result in variable functionResult: #{var.functionResult}"

```

This will create a body value like this after execution:

```
Result in variable functionResult: HELLO Name
```

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::