# CLI

The PI Command Line Interface (short “CLI” or “pi tool”) is a local command line tool which allows remote control PIPEFORCE from the command line.

It allows to execute commands and pipelines, store and read data to and from the server and helps to setup a local development environment quickly.

See the Downloads section on how to install this tool: *[Downloads](/docs/downloads)*

The tutorial [Setup local workspace + CLI](tutorial/setup-workspace) shows, how to install and work with the CLI.

We also recommend you to install Visual Studio Code since it works nicely together with the CLI.

## Call structure
----------

The main structure of a CLI command is always like this:

```
pi <action> <args>
```

To get a list off all supported actions and their parameters use the help command:

```
pi help
```

Below you can find the description of the most important actions.

## pi command
----------

Executes a single pipeline command at server side and returns the result.

Each command parameter will become a command line parameter.

**Example 1:**

```
pi command log message=HELLO
```

This executes the `log` command at server side with the parameter `message` set to `HELLO`.

**Example 2:**

```
pi command mail.send to=my@email.tld subject=Hello message="This is a test"
```

This command sends an email.

**Note**

Use the command `pi help command` to get the documentation of all available commands activated in your license.

Or use the command `pi help command COMMAND_NAME` to get the documentation for a specific command.

## pi delete
----------

Deletes the remote resources inside a given app. It doesn’t delete any local resource.

**Example 1:**

```
pi delete global/app/myapp/pipeline/helloworld
```

Deletes the pipeline helloworld.

**Example 2:**

```
pi delete global/app/myapp/**
```

Deletes all resources of the app `myapp`.

:::caution
This command deletes remote resources without the option to recover. So be careful in using it!
:::

## pi get
----------

Downloads all resources of a given app, stores them into the local workspace in order to be able to edit them. If a local resource already exists, asks for overwrite or skip.

**Example 1:**

```
pi get global/app/myapp/**
```

This command line call downloads all resources of the app `myapp` and its sub-folders and stores them into the local workspace folder `src/global/app/myapp`. Note that you have to define the property key here, not the local file path.

**Example 2:**

This downloads only the resources inside the `myapp` folder but no resource from inside its sub-folders.

```
pi get global/app/myapp/*
```

**Example 3:**

This downloads a single resource by its key:

```
pi get global/app/myapp/pipeline/hello
```

## pi help
-------

Lists all available CLI options or pipeline commands.

**Example 1:**

```
pi help
```

Lists all available command line options.

**Example 2:**

```
pi help command
```

Lists the documentation of all available pipeline commands for the currently logged-in user.

**Example 2:**

```
pi help command log
```

Explains the log pipeline command. The output could look like this:

```
---
log:
  type: "object"
  description: "Logs the given input message without changing it. Sets the log message\
    \ in the body in case body is empty. Doesn't overwrite any existing content in\
    \ the body."
  inputType: "JsonNode"
  outputType: "JsonNode"
  properties:
    message:
      type: "number"
      description: "The message to log. Can be a string or a pipe expression. If null\
        \ or empty, the full pipe message will be logged."
      default: null
    level:
      type: "string"
      description: "The log level. Can be one of DEBUG, TRACE, INFO, WARN, ERROR.\
        \ If null or empty, INFO will be used."
      default: "INFO"
  required:
  - "message"
```

## pi list
----------

Lists all remote resources of a given path.

**Example 1:**

```
pi list global/app/myapp**
```

Lists all resources of the app `myapp` recursively.

**Example 2:**

```
pi list global/app/myapp/*
```

Lists all resources of the folder `myapp` but not the resources inside any sub-folder.

## pi new
----------

Creates a new resource based on a wizard.

**Example 1:**

```
pi new
```

Would print this wizard:

```
Create new...
  0: app
  1: form
  2: list
  3: object
  4: pipeline
  5: workflow
Choose number : 
```

**Example 2:**

You can also directly start the resource wizard:

```
pi new app
```

**Example 3:**

And if you are inside a app folder, the app you want to create the resource for is already pre-selected for you.

```
~ pipeforce> cd src/global/app/myapp
~ app/myapp> pi new pipeline
```

## pi pipeline
----------

Executes a locally stored pipeline file, a remote pipeline or a pipeline uri.

**Example 1:**

```
pi pipeline file src/global/app/myapp/pipeline/helloworld.pi.yaml
```

This example uploads the content of the `helloworld.pi.yaml` to the server, executes it there and returns the result. It doesn't store the pipeline at server side.

**Example 2:**

```
pi pipeline uri "log?message=HELLO"
```

This example takes the given pipeline uri and executes it at server side.

The syntax of a pipeline uri looks like this:

`<command>[?<arg1>=<value1>&<arg2>=<value2>`\]

It is also possible to combine multiple commands to form a pipeline using the pipe `|` character:

`<commandA>?<arg1>=<value1>&<arg2>=<value2>|<commandB>?<arg1>=<value1>&<arg2>=<value2>`

Here is an example to re-write this YAML pipeline configuration:

```
pipeline:
  - datetime:
      format: "dd.MM.YY"
  - log:
```

To this pipeline uri format:

```
datetime?format=dd.MM.YY|log
```

Therefore, a call of this pipeline uri would look like this:

```
pi pipeline uri "datetime?format=dd.MM.YY|log"
```

Output:

```
23.01.21
```

The idea of a pipeline uri is to adhoc execute commands without the need to create a pipeline file and/or upload it.

Also see the CLI command `pi help command` which lists all available pipeline commands and their description you can use to build pipelines and pipeline uris.

## pi publish
----------

Uploads your created or changed resources like pipeline or form configurations to the server.

In case a resource already exists at the server updates only in case it has changed since last upload.

**Example 1:**

```
pi publish
```

This command uploads / updates all resources inside the `src` folder.

**Example 2:**

If you want to publish only a certain subset of the src folder, you can specify the folder like this:

```
pi publish src/global/app/myapp/**
```

This will recursively publish any resource inside this folder and its sub-folders.

**Example 3:**

In case you want to publish only the files inside this folder but not its sub-folders and files, you can use a single asterisk instead:

```
pi publish src/global/app/myapp/*
```

**Example 4:**

If you want to publish a single resource, define it by its filename:

```
pi publish src/global/app/myapp/pipeline/hello.pi.yaml
```

**Example 5:**

Note that the path argument is always relatively to your current working dir, as long as you are inside the workspace home folder $USER\_HOME/pipeforce:

```
cd $USER_HOME/pipeforce/src/global/app/myapp
pi publish **
```

This will publish all resources inside `src/gobal/app/myapp` recursively.

For security reasons (for example to no accidentally publish a huge path structure of your file system to the server), publish is only possible in case your current working dir is inside the workspace folder.

## pi setup
----------

Changes the settings of the CLI tool using a wizard and/or installs the CLI if not already done.

This writes the final result into the file `$USER_HOME/pipeforce/conf/cli.conf.json`.

**Example 1:**

```
pi setup
```

**Example 2:**

For more advanced users, you can use the flag advanced in order to be able to adjust more settings:

```
pi setup advanced
```

## pi status
----------

Returns status information about the CLI.

**Example:**

```
pi status
```

## pi update
----------

Looks for an update of the CLI and installs it if a newer version exists.

**Example:**

```
pi update
```