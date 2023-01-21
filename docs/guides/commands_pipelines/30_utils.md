# Utils

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 3.0</p>

Inside a [Pipeline Expression](../guides/../commands_pipelines/pel) you can access a huge library of built-in PEL utils, which can additionaly simplify your integration and automation tasks. See the [reference docs](../../api/utils) for a full list of all available utils. If you're missing a util there, please [drop a note](https://github.com/pipeforce/pipeforce.github.io/issues/new).

## Usage

Such a util is always embedded inside a Pipeline Expression and has a structure like this:

```
@util.method(args...)
```

Whereas you need to replace `util` by the util name, `method` by the method name you would like to call and `args` by the optional arguments to the method you would like to execute. 

### Examples for `@date`

Here is an example to return the current date using such a util without any argument:

```
@date.now()
```

And here a fully working example, embedded inside a Pipeline Expression:

```yaml  
pipeline:  
  - log:  
      message: "The current date is: #{@date.now()}"  
```  

### Examples for `@list`

```yaml {5}
vars:
  cities: "Munich, Bratislava, New York"
pipeline:
  - log: 
      message: "#{@list.size(vars.cities)}"
```

Output:

```
3
```

### Examples for `@text`

```yaml
pipeline:
  - log: 
      message: "#{@text.lang('Hallo, Herr Meier!')}"
```

Output:

```
GERMAN
```


## Auto-completion
In case you're working with the Online Workbench you can get auto-completion of all [Utils](../../api/utils.md) out-of-the-box:

![](../../img/workbench-completion-utils.png)  

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::