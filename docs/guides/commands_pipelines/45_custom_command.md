# Custom Command
<p class="theme-doc-version-badge badge badge--secondary">Since Version: 9.0</p>

You can add your own custom commands to PIPEFORCE in a few steps without a manual deployment required.

This can can be done by creating a Python function in the FaaS module.

Once this function has been auto-deployed, you can call it similar to a command from inside any pipeline or using the Command API.

The function name will become the command name and the parameters will become the arguments to the function. For example, lets assume a function like this:

```python
def myfunction(text):
  return "HELLO: " + text
```

And a pipeline which calls this function:

```yaml
pipeline:
  - myapp:myscript:myfunction:
      text: "World!"
```

This example will execute the function `myfunction(text)` on the script `myscript` inside the app `myapp`. The result will then be returned to the pipeline body and can be processed by subsequent commands as usual. The final output of the pipeline in this example would be:

```
HELLO: World!
```


For more information about how to create functions and execute them, see [Python Functions](/docs/guides/faas)


## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::