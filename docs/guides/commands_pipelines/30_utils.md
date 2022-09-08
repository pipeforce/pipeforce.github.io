# Pipeline Utils

Inside a [Pipeline Expression](../guides/../commands_pipelines/pel) you can access a huge library of utility methods, which can additionaly simplify your work. Such utility methods are called **Pipeline Utils** or **PEL Utils**. See the [reference docs](../../api/utils) for a full list of all available Pipeline Utils.

## Usage

Such a utility is always embedded inside a Pipeline Expression and has a structure like this:

```
@group.method(args...)
```

Whereas you need to replace `group` by the util group name, `method` by the util method name and `args` by the optional arguments to the method you would like to execute. 

### Example `@date`

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

### Example `@list`

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

### Example `@text`

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
In case you're working with the Online Workbench you can get auto-completion of all [Pipeline Utils](../../api/utils.md) out-of-the-box:

![](../../img/workbench-completion-utils.png)  