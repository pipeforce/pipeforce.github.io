# Headers

Each pipeline can have **optional** headers defined. A pipeline header is similar to a HTTP header and defines a global “configuration item” for the overall execution of the pipeline. In the example below you can see a pipeline with a header defined in the `headers` section:

```yaml
headers:
  description: "This is the hello world pipeline"
  
pipeline:
  - log:
      message: "Hello World!"
```

# Reference

