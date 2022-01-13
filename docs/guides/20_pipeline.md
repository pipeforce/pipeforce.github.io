# Pipeline

Two or more [**commands**](../guides/command) can be chained to a **pipeline**. If such a pipeline gets executed, the commands in it will be executed by their serial ordering within the pipeline. The output message of the first command will become the input message of the next command, and so on. 

![](../img/pipe-chain.drawio.png)

By default, such a pipeline is written in a [YAML](https://en.wikipedia.org/wiki/YAML) format. Here is an example which uses two simple commands: The `datetime` command to produce the current date and time, and after this, the `log` command to log the result at the server side:

```yaml
pipeline:
  - datetime
  - log
```

In the YAML, a pipeline is defined using the `pipeline:` list as root element. Inside this list, each command to be executed is defined as an element (after an indent and a dash `-`) by its name and optional parameters. The body output of the first command (`datetime`) will automatically become the body input of the next command (`log`).

Here is a more sophisticated example which uses three commands: The first loads a PDF file from cloud drive (which is a built-in archive and dropbox in PIPEFORCE), the second puts a stamp on this document, and the third saves the PDF with the stamp back to drive:

```yaml
pipeline:
 - drive.read:
     path: /my.pdf
 - pdf.stamp:
     text: "Hello World!"
 - drive.save:
     path: /my-stamped.pdf
```

The PDF file `my.pdf` is the output from the command `drive.read` and will become the input for `pdf.stamp`. After `pdf.stamp` was executed and has put the stamp on the file, it will send it as output to `drive.save` which stores it to the data room. Instead of a PDF file, the message body can also be of any other format like JSON, string or the like.


## Execution of a pipeline

Similar to a single command, a pipeline of commands is executed by sending it in a request to the server. Its a more advanced version of the “Function as a Service” approach, since it can execute a bunch of commands in a predefined order.

### Via Online Workbench

Since version 7.0 of PIPEFORCE was released, the Online Workbench is available. This is an advanced online editor with full code completion support, where you can write pipelines and commands to be executed and then run them online. This is the easiest and most preferred way to ad-hoc execute a command or pipeline. Here you can see a simple pipeline after its ad-hoc execution as an example:

![](../img/grafik-20210711-083848.png)

### Via CLI

Another approach to execute a pipeline is by using the CLI: [Command Line Interface (CLI)](../api/cli).

#### Local file

Lets assume you have a local pipeline file stored at `src/global/app/myapp/pipeline/test.pi.yaml` inside of your PIPEFORCE workspace, then you can execute it via this CLI call:

```bash
pi pipeline file src/global/app/myapp/pipeline/test.pi.yaml
```

This will load the local pipeline file and execute its content by sending it to the server. The result will be printed out to your terminal if there is any.

:::tip 
A pipeline file must end in this suffix to be detected correctly by your workspace `.pi.yaml`.
:::

#### Remote

In case you have stored your pipeline at server side in the [Property Store](../guides/propertystore), then you can execute it using this call:

```bash
pi pipeline remote global/app/myapp/pipeline/test
```

This command searches for a property in the property store with key `global/app/myapp/pipeline/test` and executes it before sending any results back to your terminal.

#### Pipeline URI

A third option to execute a pipeline is by using a **pipeline uri** which is an inline version of a pipeline. You can also rewrite any pipeline YAML fromat as a pipeline uri. Lets assume this example:

```yaml
pipeline:
  - datetime
      format: dd.MM.YYYY     
  - log
```

You can rewrite this pipeline YAML as an inline pipeline uri, which looks like this:

```bash
datetime?format=dd.MM.YYYY|log
```

You can then execute such a pipeline uri using this CLI call in one line:

```bash
pi pipeline uri "datetime?format=dd.MM.YYYY|log"
```

This is handy especially for smaller pipelines which you want to execute ad-hoc.

### Via HTTP

You can execute a pipeline also by sending it via HTTP POST to the server. See this example:

```yaml
POST /api/v3/pipeline HTTP/1.1 
Host: hub-acme.pipefore.net

pipeline:
 - drive.read:
     path: /my.pdf
 - pdf.stamp:
     text: "Hello World!"
 - drive.save:
     path: /my-stamped.pdf
```

This will do, by default, a synchron execution of the pipeline at server side. This will return with the response status code `200 OK` and the result in the response body once execution is finished.

Here is the PDF pipeline example from above, which is now executed using the `curl` tool (available on all Linux, Mac and Windows systems):

```bash
curl -X POST "http://hub/api/v3/pipeline" 
  -H "Content-Type: application/yaml" 
  --data-binary @- << EOF
pipeline:
 - drive.read:
     path: /my.pdf
 - pdf.stamp:
     text: "Hello World!"
 - drive.save:
     path: /my-stamped.pdf
EOF
```

With this flexibility, you can define a bash script and store it locally to execute this pipeline with a single command and without much configuration, setup or coding.

## Pipeline Scopes

Every pipeline script may consist of four main sections, called **scopes**:

*   headers
    
*   vars
    
*   pipeline
    
*   body
    

Here is an example of a pipeline script which defines all of these scopes:

```yaml
headers:
  contentType: "text/plain"
  
vars:
  counter: 0

pipeline:
  - log:
      message: "HELLO WORLD!"
      
body: "This is text in the body"
```

All scopes except `pipeline` are optional in a pipeline script. Even if not explicitly defined in the pipeline script, each scope exists implicitly. That means you can access it and read / set values from / on it without declaring it in the pipeline. For example, by using a pipeline expression (PE).

### headers

The headers section is optional. A header is a name-value pair to define "global configuration" hints and configurations for the given pipeline. Only text is allowed as content i.e. no complex objects. It is Not meant to be changed during pipeline processing.

Whether and which headers are required depends on the pipeline and its commands. Read the documentation of the commands of pipeline.

It is similar to HTTP Request headers: [https://en.wikipedia.org/wiki/List\_of\_HTTP\_header\_fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)

You can set values in the headers scope using the Pipeline Expression Language (PEL). See here: [Pipeline Expression Language (PEL)](../api/pel).

### vars

The vars section is optional and contains transient variables as name value pairs. It is meant as a transient scope for states during the pipeline processing.

Values can also be complex objects and documents.

Values can be changed during pipeline processing.

You can access values in the vars scope using the Pipeline Expression Language (PEL). See here: [Pipeline Expression Language (PEL)](../api/pel).

### pipeline

The pipeline section is mandatory and lists all commands which must be executed in given order.

See your instance portal for a reference of available commands.

You can set dynamic parameter values on commands using the Pipeline Expression Language (PEL). See here: [Pipeline Expression Language (PEL)](../api/pel).

### body

The body section is optional. It defines a single object to be used as “data pool” or transformation data during the pipeline processing.

In case commands return a value, by default, they will write this value to the body implicitly. Whereas a previous command's value in the body will be overwritten by the command which comes next.

You can access values in the body scope using the Pipeline Expression Language (PEL). See here: [Pipeline Expression Language (PEL)](../api/pel).



## Auto-completion support

**Note: This is experimental.**

In order to enable auto-completion support for pipeline scripts in your local development editor, you need an editor which supports YAML schema validation. Then, you can have auto-completion which shows all available commands and their parameters:

![](../img/image-20200815-094048.png)

### IntelliJ

To enable auto-completion in IntelliJ, open preferences and navigate to JSON Schema Mappings:

`Preferences → Languages & Frameworks → Schemas & DTDs → JSON Schema Mappings`

Add a new schema mapping with these values:

*   Name: `pipeline-schema`
    
*   Schema URL: `https://hub-<NS>.pipeforce.net/api/v3/command:pipe.schema.v7`
    
*   Schema version: `JSON Schema version 7`
    

Add new file path patterns for : `*.pi.yaml`

Now, try it out: Create a new file `foo.pi.yaml` and start typing. You should get support for any file ending in `*.pi.yaml`.

Note: A YAML pipeline script should always end in suffix **.pi.yaml** which stands for stands for pipeline scripts written in YAML.

### Visual Studio Code

To enable auto-completion in Visual Studio Code, open `Preferences → Settings`, and search for section `json.schemas`. Then, add a new mapping entry like this:

```yaml
    "json.schemas": [
        {
            "fileMatch": [
                "/*.pi.json"
            ],
            "url": "https://hub-<NS>.pipeforce.net/api/v3/command:pipe.schema.v7"
        }
    ],
```

Now, try it out: Create a new file `foo.pi.json` and start typing. You should get support for any file ending in `*.pi.json`.
 Note: .**pi.json** stands for pipeline scripts written in JSON.

Note: Visual Studio Code doesn't have built-in schema support for yaml files. If you want to also enable code-completion for your pipeline yaml files, you need to install the YAML language support plugin from Red Hat first: [https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

Then open `Preferences → Settings` and add this line to your configuration **settings.json**:

```yaml
"yaml.schemas": { 
  "https://hub-NAMESPACE.pipeforce.org/api/v3/pipe:pipe.schema.v7": ["/*.pi.yaml"] 
}
```

### Online Workbench

The built-in online workbench in the PIPEFORCE portal supports pipeline script completion out-of-the box. 

To start completion simply press ``[Ctrl]`` + ``[Space]``. 

![](../img/workbench-completion.png)

Beside completion for available commands and their parameters, it also supports completion for other parts like utilities and variables for example:

![](../img/workbench-completion-utils.png)
