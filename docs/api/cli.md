---
title: Command Line Interface (CLI) Reference
sidebar_label: CLI
---


The **Command Line Interface** (short “CLI” or “pi tool”) is a local command-line tool, which allows remote control of PIPEFORCE from the command line.

It makes it handy to automate local tasks by executing commands and pipelines. It also helps in local development.

See the *[Downloads](/docs/downloads)* section on how to install this tool.

The tutorial [Setup local workspace + CLI](../tutorials/localworkspace) shows, how to install and work with the CLI.

## Call structure

The main structure of a CLI command is always like this:

```bash
pi <action> <args>
```

To get a list of all supported actions and their parameters, use the help command:

```bash
pi help
```

Below, you can find the description of the most important actions.

## pi command

This executes a single pipeline command at the server-side and returns the result.

Each parameter will become a command-line parameter.

**Example 1:**

```bash
pi command log message=HELLO
```

This executes the `log` command at server-side with the parameter `message` set to `HELLO`.

**Example 2:**

```bash
pi command mail.send to=my@email.tld subject=Hello message="This is a test"
```

This command sends an email.

**Note**

Use the command `pi help command` to get the documentation of all available commands activated in your license.

Or use the command `pi help command COMMAND_NAME` to get the documentation for a specific command.

## pi delete

This deletes the remote resources inside a given app. It doesn’t delete any local resource.

**Example 1:**

```bash
pi delete global/app/myapp/pipeline/helloworld
```

This deletes the pipeline helloworld.

**Example 2:**

```bash
pi delete global/app/myapp/**
```

This deletes all resources of the app `myapp`.

:::caution
This command deletes remote resources without the option to recover. So, be careful in using it!
:::

## pi get

This downloads all resources of a given app, stores them into the local workspace in order to be able to edit them. If a local resource already exists, this asks for either to overwrite or to skip.

**Example 1:**

```bash
pi get global/app/myapp/**
```

This command-line call downloads all resources of the app `myapp` and its sub-folders, and stores them into the local workspace folder `src/global/app/myapp`. Note, that you have to define the property key here, not the local file path.

**Example 2:**

This downloads only the resources inside the `myapp` folder, but no resource from inside its sub-folders.

```bash
pi get global/app/myapp/*
```

**Example 3:**

This downloads a single resource by its key:

```bash
pi get global/app/myapp/pipeline/hello
```

## pi help

Thid lists all available CLI options or pipeline commands.

**Example 1:**

```bash
pi help
```

This lists all available command-line options.

**Example 2:**

```bash
pi help command
```

This lists the documentation of all available pipeline commands for the currently logged-in user.

**Example 2:**

```bash
pi help command log
```

This explains the log pipeline command. The output could look like this:

```yaml
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

This lists all remote resources of a given path.

**Example 1:**

```bash
pi list global/app/myapp**
```

This lists all resources of the app `myapp` recursively.

**Example 2:**

```bash
pi list global/app/myapp/*
```

This lists all resources of the folder `myapp`, but not the resources inside any sub-folder.

## pi new

This creates a new resource based on a wizard.

**Example 1:**

```bash
pi new
```

This would print this wizard:

```yaml
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

You can also directly start the resource wizard by the command:

```bash
pi new app
```

**Example 3:**

And if you are inside a app folder, the app you want to create the resource for, is already pre-selected for you.

```bash
~ pipeforce> cd src/global/app/myapp
~ app/myapp> pi new pipeline
```

## pi pipeline

This executes a a locally stored pipeline file, a remote pipeline or a pipeline uri. Which type of pipeline is detected by the pipeline argument:

- Starts with ``src/``: It's assumed to be a local pipeline file.
- Starts with ``global/``: It's assumed to be a persisted remote pipeline.
- None of the above: It's assumed to be a pipeline uri.


**Example 1:**

```bash
pi pipeline src/global/app/myapp/pipeline/helloworld.pi.yaml
```

This example uploads the content of the `helloworld.pi.yaml` to the server, executes it there, and returns the result. It doesn't store the pipeline at server-side.

**Example 2:**

```bash
pi pipeline global/app/myapp/pipeline/helloworld.pi.yaml
```

This example executes a persisted pipeline stored at the key path ``global/app/myapp/pipeline/helloworld.pi.yaml``.


**Example 3:**

```bash
pi pipeline "log?message=HELLO"
```

This example takes the given pipeline uri and executes it at server side.

The syntax of a pipeline uri looks like this:

`<command>[?<arg1>=<value1>&<arg2>=<value2>`\]

It is also possible to combine multiple commands to form a pipeline using the pipe `|` character:

`<commandA>?<arg1>=<value1>&<arg2>=<value2>|<commandB>?<arg1>=<value1>&<arg2>=<value2>`

Here is an example to re-write this YAML pipeline configuration:

```yaml
pipeline:
  - datetime:
      format: "dd.MM.YY"
  - log:
```

To this pipeline uri format:

```bash
datetime?format=dd.MM.YY|log
```

Therefore, a call of this pipeline uri would look like this:

```bash
pi pipeline "datetime?format=dd.MM.YY|log"
```

Output:

```bash
23.01.21
```

The idea of a pipeline uri is to adhoc execute commands without the need to create a pipeline file and/or upload it.

Also, see the CLI command `pi help command`, which lists all available pipeline commands and their description you can use to build pipelines and pipeline uris.

## pi publish

This uploads your created or changed resources like pipeline or form configurations to the server.

In case a resource already exists at the server, this updates only if it has changed since last upload.

**Example 1:**

```bash
pi publish
```

This command uploads / updates all resources inside the `src` folder.

**Example 2:**

If you want to publish only a certain subset of the src folder, you can specify the folder like this:

```bash
pi publish src/global/app/myapp/**
```

This will recursively publish any resource inside this folder and its sub-folders.

**Example 3:**

In case you want to publish only the files inside this folder, but not its sub-folders and files, you can use a single asterisk instead:

```bash
pi publish src/global/app/myapp/*
```

**Example 4:**

If you want to publish a single resource, define it by its filename:

```bash
pi publish src/global/app/myapp/pipeline/hello.pi.yaml
```

**Example 5:**

Note, that the path argument is always relatively to your current working dir, as long as you are inside the workspace home folder $USER\_HOME/pipeforce:

```bash
cd $USER_HOME/pipeforce/src/global/app/myapp
pi publish **
```

This will publish all resources inside `src/gobal/app/myapp` recursively.

For security reasons (for example, to not accidentally publish a huge path structure of your file system to the server), publish is only possible in case your current working dir is inside the workspace folder.

## pi setup

This changes the settings of the CLI tool using a wizard and/or installs the CLI if not already done.

This writes the final result into the file `$USER_HOME/pipeforce/conf/cli.conf.json`.

**Example 1:**

```bash
pi setup
```

**Example 2:**

For more advanced users, you can use the advanced flag in order to be able to adjust more settings:

```bash
pi setup advanced
```

## pi status

This returns status information about the CLI.

**Example:**

```bash
pi status
```

## pi sync

This does a one-way-sync of files inside the local ``src`` folder to the server. It watches a given folder, and immediately syncs changes of files inside this folder to the server.

:::info
The folder to sync must be located inside the ``src`` folder of your workspace.
:::

**Example:**

```bash
pi sync src/global/app/myapp
```

This example syncs all files from the folder ``myapp`` to the server.

At the beginning of the sync, you will be asked whether you want to backup and cleanup the given folder. If you choose ``yes``, then the content of the remote folder will be downloaded and stored in your workspace inside the ``backup`` folder, and then the remote content gets deleted. This is handy in case you want to start with a clean sync state between local and server side.

:::caution
This is a one-way-sync from local to server. Changes made on the server-side will not be merged to your local sources. If you need such an approach, please refer to source managament tools like Git, for example, which have built-in merge conflict handling and concurrent editing features.
:::

## pi update

This looks for an update of the CLI and installs it if a newer version exists.

**Example:**

```bash
pi update
```
