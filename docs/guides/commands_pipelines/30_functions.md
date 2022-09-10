# Pipeline Functions

Inside a [Pipeline Expression](../guides/../commands_pipelines/pel) you can access a huge library of utility functions, which can additionaly simplify your work. Such utility functions are called **Pipeline Functions** or **PEL Functions**. See the [reference docs](../../api/functions) for a full list of all available Pipeline Utils.

## Usage

Such a function is always embedded inside a Pipeline Expression and has a structure like this:

```
@group.function(args...)
```

Whereas you need to replace `group` by the util group name, `function` by the function method name and `args` by the optional arguments to the function you would like to execute. 

### Examples for `@date`

Here is an example to return the current date using such a function without any argument:

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
In case you're working with the Online Workbench you can get auto-completion of all [Pipeline Functions](../../api/functions.md) out-of-the-box:

![](../../img/workbench-completion-utils.png)  