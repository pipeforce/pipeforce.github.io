# Controlling Pipeline Flow

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 4.0</p>

In its basic form, a [Pipeline](/docs/commands_pipelines#pipeline) is executed as a linear flow of [Commands](/docs/commands_pipelines#command) whereas each Command is executed one after another, from start to its end. 

Sometimes, it is necessary to change this linear flow dynamically, depending on given conditions. PIPEFORCE offers different toolings to controll the flow inside a pipeline dynamically. Most of these toolings are also implemented as commands and therefore can be used like any other commands.

## Trigger

A trigger is an external action which causes a pipeline to be executed. Depending on the input data of a trigger, the execution flow of a pipeline could vary.

These triggers are the common ones in PIPEFORCE:

### Job
Triggers a pipeline as a job which must be executed after a certain amount of time. For more details see [Jobs](/docs/guides/jobs).

### Message 
Triggers a pipeline in case a message of interest is on the message queue / bus. For more details see [Message](/docs/messaging).

### Event 
Triggers a pipeline in case an internal event of interest has occured. Events are quite similar to messages, except that their origin is always the hub backend. For more details see [Events](/docs/guides/messaging/events). Common event examples are:

- `property.created` = A new property has been created in the [Property Store](/docs/propertystore).
- `property.deleted` = A new property has been deleted from the [Property Store](/docs/propertystore).
- `iam.bruteforce.detected` = A potential brute force attack has been detected. 
- See [Events Reference](/docs/api/events) for more events.

### Webhook
Triggers a pipeline in case an external system sends a request to one of the custom webhook endpoints. For more details see [Webhhooks](/docs/guides/messaging/webhooks).

## If, Else

In some situations it is handy to disable the execution of a command depending on a given condition.

### `if`-Parameter

One way of skipping a command execution, is by using the common parameter `if`. It is available on any command. Setting this parameter to a value of `false` on a command, will skip the execution of this command. By default this parameter is set to `true`. Also see [Common Parameters](/docs/api/commands#common-parameters).

Example:

```yaml
vars:
  logging: "debug"

pipeline:

  - drive.read:
      path: "my.doc"

  - log:
      message: "Document loaded from my.doc."
      if: "#{var.logging == 'debug'}"

  - drive.save:
      path: "folder/my.doc"

  - log:
      message: "Document stored to folder/my.doc."
      if: "#{var.logging == 'debug'}"
      
```

### `if`-Command

In case a block of commands must be skipped, you can use the commands [`if`](/docs/api/commands#if-v1), [`if.else`](/docs/api/commands#ifelse-v1) and [`if.end`](/docs/api/commands#ifend-v1).

Example:

```yaml
pipeline:

  - if:
      true: "#{1 < 2}"

  - log:
      message: "1 is smaller than 2"

  - if.else:

  - log:
      message: "This should never happen..."

  - if.end:

```

Also nesting is supported. For example:

```yaml
vars:
  name: "Sabrina"
  age: 24

pipeline:

  - if:
      true: "#{var.name != ''}"

  - if:
      true: "#{var.age > 21}"

  - log:
      message: "#{var.name} may have a drink..."

  - if.else:

  - log:
      message: "#{var.name} is too young to have a drink..."

  - if.end:

  - if.end:

```

## Foreach / Iterator

Looping over a set of data is also called "iterating" over this set of data. Or in other words, "for each" item from the data set, do some action.

Iterating over a set of data (for example a list, array, map or other type of collections), you can use the command [`foreach`](/docs/api/commands#foreach-v1). With this approach you can also implement the [Splitter Pattern](/docs/guides/transformers/basics#splitter--iterator) from the enterprise integration pattern.

For each entry in the data set, the [`foreach`](/docs/api/commands#foreach-v1) command will execute all subsequent commands until a [`foreach.end`](/docs/api/commands#foreachend-v1) has been found.

For example:

```yaml
vars:
  people: ["Sam", "Sarah", "Carol"]

pipeline:

  - foreach:
      in: "#{var.people}"
      as: "person"

  - log:
      message: "Hello #{var.person}"

  - foreach.end:

```

Also nesting of [`foreach`](/docs/api/commands#foreach-v1) is possible:

```yaml
vars:
  people: ["Sam", "Carol"]  
  activities: "biking, swimming, hiking"

pipeline:

  - foreach:
      in: "#{var.people}"
      as: person

  - foreach:
      in: "#{var.activities}"
      as: activity

  - eval:
      expr: "#{@list.add(body, var.person + ' could do: ' + var.activity)}"

  - foreach.end:

  - foreach.end:

body: []

```

This would produce an output like this:

```json
[
    "Sam could do: biking",
    "Sam could do: swimming",
    "Sam could do: hiking",
    "Carol could do: biking",
    "Carol could do: swimming",
    "Carol could do: hiking"
]
```

You can simplify this by using the `eval` parameter instead of the `eval` command:

```yaml
vars:
  people: ["Sam", "Carol"]  
  activities: "biking, swimming, hiking"

pipeline:

  - foreach:
      in: "#{var.people}"
      as: person

  - foreach:
      in: "#{var.activities}"
      as: activity
      eval: "#{@list.add(body, var.person + ' could do: ' + var.activity)}"

  - foreach.end:

  - foreach.end:

body: []

```

You can also combine the [`foreach`](/docs/api/commands#foreach-v1) with the [`if`](/docs/api/commands#if-v1) command:

```yaml
vars:
  people: [{"name":"Sam", "age": 15}, {"name": "Carol", "age": 35}]  
  activities: "biking, clubbing"

pipeline:

  - foreach:
      in: "#{var.people}"
      as: person

  - foreach:
      in: "#{var.activities}"
      as: activity

  - if:
      true: "#{var.person.age < 18 and var.activity == 'clubbing'}"

  - set.var:
      key: "allowed"
      value: "NOT "

  - if.else:

  - set.var:
      key: "allowed"
      value: ""

  - if.end:
      eval: "#{@list.add(body, var.person.name + ' could ' + var.allowed + 'do: ' + var.activity)}"

  - foreach.end:

  - foreach.end:

body: []

```

This would result in an output like this:

```json
[
    "Sam could do: biking",
    "Sam could NOT do: clubbing",
    "Carol could do: biking",
    "Carol could do: clubbing"
]
```    

## Exit

Based on a condition, you can exit the pipeline execution using the [`exit`](/docs/api/commands#exit-v1) command.

In case there is a `finally` command in the pipeline, this will be considered before exiting. See [Finally](#finally).

Example:

```yaml
pipeline:
    - exit:
        if: "#{2 > 1}"
```

## Retry

In case an error occured in a command you can automatically let it retry for a certain amount of time before giving up and exiting the pipeline flow.

For more details see [Error Handling](/docs/guides/commands_pipelines/error_handling#retry).

## Rollback

In case an error occured in a command you can automatically call a rollback action.

For more details see [Error Handling](/docs/guides/commands_pipelines/error_handling#rollback).

## Sub-Pipeline

In case you would like to delegate control to another persisted pipeline, you can use the command [`pipeline.start`](/docs/api/commands#pipelinestart-v1).

For example let's assume you have a persisted pipeline stored under key `global/app/myapp/pipeline/concat` which loads a user from IAM and concats his name and email address like this:

```yaml
vars:
    userUuid: null
pipeline:
    - iam.user.get:
        uuid: "#{vars.userUuid}"
    - body:
        value: "#{body.firstName} #{body.firstName} (#{body.email})"
```

This is the sub-pipeline. The result of the sub-pipeline will be stored in the body. 

Now, let's have an example of a pipeline which calls this sub-pipeline and uses its result:

```yaml
pipeline:
    - pipeline.start:
        key: "global/app/myapp/pipeline/concat"
        vars: {"userUuid": "18a887b4-194e-4aac-82a5-ff7b33710594"}
```

This pipeline will call the sub-pipeline `global/app/myapp/pipeline/concat` with parameter `userUuid` and places the result to the body by default. So the output will be something like this:

```
Sam Smith (s.smith@company.com)
```

## Error

You can control what should happen, if a command produces and error. Depding on your configuration, the pipeline flow will change. For example, an error could exit the pipeline flow or trigger some other commands. 

For more details see section [Error Handling](/docs/guides/commands_pipelines/error_handling). 

## Finally

The command [`finally`](/docs/api/commands#finally-v1) can be used in a pipeline in order to make sure a set of commands is executed in any case at the very end of a pipeline. Even if an error has been occured or the pipeline execution has been cancelled by an [`exit`](/docs/api/commands#exit-v1) command. This approach is useful for example in case you need to cleanup data or would like to get informed about the pipeline execution result in any case.

For more details see [Error Handling](/docs/guides/commands_pipelines/error_handling#finally)

## Wait

Sometimes it is necessary to pause the execution flow of a pipeline for a certain amount of time.
You can do so using the command [`wait`](/docs/api/commands#wait-v1).

Example:

```yaml
pipeline:
    - log:
        message: "Lets wait 2 seconds..."
    - wait:
        ms: 2000
    - log:
        message: "2 seconds later."
```

## Assert

In case you would like to make sure, a condition in the pipeline is true, you can use the [`assert`](/docs/api/commands#assert-v1) command to check that. In case the given condition is wrong, the pipeline execution will end and an error will the thrown. This is especially useful in writing tests.

This example will end the pipeline execution since it expectes the condition to be `true`, but it is wrong:

```yaml
pipeline:
    - assert:
        true: "#{1 > 2}"
        message: "1 is not greater than 2!"
```

