# Macros
<p class="theme-doc-version-badge badge badge--secondary">Since Version: 8.5</p>

Inside a [Pipeline ](/docs/commands_pipelines#pipeline) you can declare a custom macro using the command [`macro`](/docs/api/commands#macro-v1) and reuse it by calling the command [`macro.run`](/docs/api/commands#macrorun-v1).

## Declaring a macro

Here is a simple example to declare a macro in a pipeline:

```yaml
pipeline:
  - macro:
      args:
        firstName: "Some"
        lastName:  "Name"
      do: |
        firstName + ' ' + lastName
```

The parameter `args` defines the (optional) parameters to the macro as name-value pairs.

This arguments can be directly accessed by their names inside to the macro expression.

The macro expression is placed using the parameter `do`. This can be any supported [Pipeline Expression](/docs/guides/commands_pipelines/pel). Since the parameter is an explicit expression parameter, you do not need to use the expression brackets like `#{`and `}`. They're optional.

This example will execute the macro with the pipeline flow and results in an output like this:

```
Some Name
```

## Accessing scope variables

You can also access all scopes variables like `vars`, `headers` and `body`, as you would inside any Pipeline Expression:

```yaml
vars:
  lastName: "Name"
pipeline:
  - macro:
      args:
        firstName: "Some"
      do: |
        firstName + ' ' + vars.lastName
```
## Calling a macro

In order to call a macro from another position in the pipeline, you have to first declare it using the command `macro` and to define a name for the macro unique inside the pipelie using the parameter `name`.

:::tip Note
 - A callable macro must be declared first in the pipeline, before it can be called.
 - It's good practise to define callable macros always at the very top of the pipeline.
 - Callable macro names must be unique within a pipeline.
 - A callable macro (= has `name` parameter) will be ignored by the pipeline flow and must be explicitely called using the command `macro.run`.
:::

Here is an example to declare such a callable macro:

```yaml
pipeline:
  - macro:
      name: "concatNames"
      args:
        firstName: "Some"
        lastName:  "Name"
      do: |
        firstName + ' ' + lastName

```

As soon as such a macro has a `name` assigned, it will no longer be executed by the default pipeline flow, but ignored. Now, it can be executed only by calling the command `macro.run`.

In case you would like to execute this macro with the pipeline flow **and** via `macro.run`, you need to set the parameter `flow` to `true`. 

Here is an example to call the macro `concatNames` declared before:

```yaml
pipeline:

  - macro:
      name: "concatNames"
      args:
        firstName: "Some"
        lastName:  "Name"
      do: |
        firstName + ' ' + lastName

  - macro.run:
      name: "concatNames"

```

In case you do not define any args in `macro.run`, the default args will be used. So the output here would be:

```
Some Name
```

You can overwrite the default args by re-declaring some or all of them:


```yaml
pipeline:

  - macro:
      name: "concatNames"
      args:
        firstName: "Some"
        lastName:  "Name"
      do: |
        firstName + ' ' + lastName

  - macro.run:
      name: "concatNames"
      args:
        firstName: "HELLO"

```

Output would be:

```
HELLO Name
```

By default, the result of the macro will be stored to the body. You can change that, by using the parameter `output` to store it to any location like the vars scope for example:

```yaml
pipeline:

  - macro:
      name: "concatNames"
      args:
        firstName: "Some"
        lastName:  "Name"
      do: |
        firstName + ' ' + lastName

  - macro.run:
      name: "concatNames"
      args:
        firstName: "HELLO"
      output: vars.macroResult

  - set.body:
      value: "Result in variable macroResult: #{vars.macroResult}"

```

This will create a body value like this after execution:

```
Result in variable macroResult: HELLO Name
```

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::