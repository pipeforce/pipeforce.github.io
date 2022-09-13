# Tutorial 7: Load a JSON file

**Tutorial 7 Estimated time:** 10 min.

## Tutorial 7 - Prerequisites

*   PIPEFORCE Enterprise 7.0 or higher
    
*   You have a valid PIPEFORCE Developer account
    
*   You have completed tutorial: **[Create a new app](create-app)**
    
*   You have completed tutorial: **[Create a pipeline](create-pipeline)**
    
*   You have a basic understanding of the **[Pipeline Expression Language (PEL)](../api/pel)**
    

## JSON-file Loading - Intro

Inside a pipeline you can access any data using the Pipeline Expression Language (PEL). This is handy, in case you want to analyse or transform data, which is in most cases stored in the body of the pipeline.

So the question to solve in this tutorial is, how you can load an external JSON file into the pipeline body in a way that you can also apply a PE on it.

## 1 - Create a new JSON file in Drive

1.  Login to the portal [https://NAMESPACE.pipeforce.net](https://NAMESPACE.pipeforce.net)
    
2.  Navigate to `Files`. The Drive app opens.
    
3.  Add a new text document `person.json` in the root folder, and copy paste this content into it:  
    
    ```json
    {
      "firstName": "Marissa",
      "lastName": "Smith",
      "age": 33
    }
    ```
    

## 2 - Load the JSON file from Drive

1.  Navigate to `Workbench`. The ad-hoc pipeline editor opens.
    
2.  Replace the existing content by this pipeline:
    
    ```yaml
    pipeline:
      - drive.read:
          path: "person.json"
    ```
    
3.  RUN the pipeline, and you should see the content of the file `person.json` as output:
    
    ```json
    {
      "firstName": "Marissa",
      "lastName": "Smith",
      "age": 33
    }
    ```
    
    This is because the file is automatically converted from a **content object** to its the mime type format, which is JSON in this case, and then sent to the client.
    
4.  In order to “see” the content object and not the result, change the pipeline to this:
    
    ```yaml
    pipeline:
      - drive.read:
          path: "person.json"
      - set.body:
          value: "#{@convert.toJson(body)}"
    ```
    
5.  RUN the pipeline, and you should see as output, the content object with meta information about the file:
    
    ```json
    {
    	"name": "person.json",
    	"created": 1637045518731,
    	"lastUpdated": null,
    	"size": 64,
    	"data": "ewogICJmaXJzdE5hbWUiOiAiTWFyaXNzYSIs...",
    	"mimeType": "application/json"
    }
    ```
    

## 3 - Convert the content data to JSON

In case you want to work with the JSON data of a file, the data part of the content object is the interesting thing for you. In order to load this into the body, again use the `@convert.toJson()`, but this time, point to the data property:

```yaml
pipeline:
  - drive.read:
      path: "person.json"
  - set.body:
      value: "#{@convert.toJson(body.data)}"
```

After you RUN the pipeline, you should see again the JSON content as output:

```json
{
  "firstName": "Marissa",
  "lastName": "Smith",
  "age": 33
}
```

But this time it is provided as JSON inside the pipeline, so you can access it via Pipeline Expression Language (PEL):

```yaml
pipeline:
  - drive.read:
      path: "person.json"
  - set.body:
      value: "#{@convert.toJson(body.data)}"
  - set.body:
      value: "Full name: #{body.firstName} #{body.lastName}"
```

You should see an output similar to this, which transformed the JSON:

```
"Full name: Marissa Smith"
```

**Congrats, you have loaded and parsed your first external data into a pipeline. Now you're ready for data manipulation!**

## The content object

By default, any external file loaded by a pipeline will be converted into a so called **content object**, which is a wrapper around the file that holds additional meta information about it. The structure of such a content object is like this:

```json
{
  "name": "string",
  "created": long,
  "lastUpdated": long,
  "mimeType": "string",
  "size": long,
  "data": "string"
}
```

|     |     |
| --- | --- |
| **Property** | **Description** |
| `name` | The name of the file. |
| `created` | The time when this file was created in unix epoch time (millis). |
| `lastUpdated` | The time when this file was updated last in unix epoch time (millis). |
| `mimeType` | The content type of the file e.g. `application/json` or `text/plain`. |
| `size` | The size of the file in bytes or -1, in case the size cannot be determined. |
| `data` | The data of the file as base64 encoded or an uri pointing to the data. |

When you load an external file in a pipeline, in most cases, it will be placed into the body as content object.

In case you want to parse an external file in order to analyse and/or transform its content for example, you need to convert the data property of the content object to the target format you like, which is usually JSON. You can use the PEL and the convert util for example:  
`#{convert.toJSON(body.data)}`

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::