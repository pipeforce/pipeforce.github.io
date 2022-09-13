# Versioning

Each command can be available and used in different versions in parallel in pipelines. This is to support downwards compatibilty in pipeline scripts. Which commands are availble in which versions can be found in the [commands reference docs](../../api/commands).

### Local version

In order to use a specific version of a single command, you need to add it as suffix `:<version>` to the command name, whereas `<version>` needs to be replaced by the version to be used. For example `:v1`, `:v2`, `:v3`, aso. Here is an example to use the `log` command with exact version `v3` in a pipeline:

```yaml
pipeline:
  - log:v3:
      message: "Hello World!"   
```

Here, we use version `v4` of command `log`:

```yaml
pipeline:
  - log:v4:
      message: "Hello World!"   
```

If no version is specified, by default `v1` is used:

```yaml
pipeline:
  - log:
      message: "Hello World!"   
```

Is the same as:

```yaml
pipeline:
  - log:v1:
      message: "Hello World!"   
```

### Global version

Instead of defining the version for each command, you can also set it globally for all commands of a pipeline using the header `version`. Example:

```yaml
headers:
  version: v4
pipeline:
  - log:
      message: "Hello World!"
```

In this case all commands defined in the pipeline will use version `v4` without the need of local definition.

In case you combine the header `apiVersion` with local version on a command, the local one wins:

```yaml
headers:
  version: v4
pipeline:
  - log:v5:
      message: "Hello World!"
```

In this example, the `log` command is used with version `v5`. 

### Version fallback

Definig a version means you specify the highest version number to be used. If this version is not availble, the next lower available version is loaded instead. 

In case you specify a version like `v5` for example, it will be tried to load the command with this exact version. In case no such command with this version exists, the next lower version will be looked up, like `v4` for example. If no command with this version exists, the next lower version `v3` is tried, aso. 

### Default version

In case no version is specified, the version `v1` is used by default.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::