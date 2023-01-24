---
id: basics

title: Data Transformation
sidebar_label: Basics
---


## Transformation Toolings

PIPEFORCE offers a huge set of tools to do transformation of data structures. The most important ones are:

 - The `transform.*` commands
 - The `data.*` commands
 - The Pipeline Expression Language (PEL)
 - The Pipeline Functions like `@data` or `@convert`

You should get familiar with all of the toolings listed here in order to make the right choice to solve your data transformation task most effectively.

### Transformer Commands

A transformer command in PIPEFORCE is a command which transforms / converts data from one structure into another. A transformer is usually used to transform from an "external" data format (like XML for example) into the "internal" data format which is typically JSON. There are out-of-the box transformers to convert from CSV to JSON, from Word to PDF, from PDF to PNG and many more.

Additionally you can write a custom transformation rule using a template and the [`transform.ftl`](freemarker) command for example.

See the [commands reference](../../api/commands) for `transformers.*` to find all transformers commands available.

### Data Commands

A data command in PIPEFORCE is a command which can apply some rules on an "internal data structure" (which is mostly JSON). So usually you would load a JSON document from the property store or transform it from some external format using a transformer command to JSON first, and then you can change the JSON structure using the data commands. 

See the [commands reference](../../api/commands) for `data.*` to find all data commands available.

### PEL

The [PEL (Pipeline Expression Language)](../../api/pel) can be used inside the parameters of nearly any command. So it is very important, that you have a good understanding of PEL in case you would like to do data transformation in PIPEFORCE.

There are a lot of built-in language constructs of PEL which help you reading, writing and transforming data the easiest way.

Especially these topics are worth a read in this context:

 - [Working with lists and maps in PEL](../../api/pel#working-with-lists-and-maps)
 - [Navigating data objects in PEL](../../api/pel#navigating-objects)
 - [Filtering with PEL (projection and selection)](../../api/pel#filtering)

See the [reference documentation](../../api/pel) for details about the PEL syntax.

### Pipeline Utils

Additionally to the Pipeline Expression core syntax, there are [Pipeline Utils](../../guides/commands_pipelines/utils) available which also can help you to simplify your data transformation tasks. 
For data transformation these utils could be of special interest:

 - [@calc](../../api/utils#calc) - For number crunching.
 - [@convert](../../api/utils#convert) - For convertion tasks (for example from decimal to int).
 - [@data](../../api/utils#data) - For data information and alter tasks.
 - [@date](../../api/utils#date) - Formatting date and time data.
 - [@list](../../api/utils#list) - Read and edit lists.
 - [@text](../../api/utils#text) - Text utilities in order to change and test text data.
  
See the [reference documentation](../../api/utils) for a full list of the available Pipeline Utils.

## Transformation Patterns

There are many different ways of data transformation. In order to have a common understanding of the different approaches, below you can find the patterns of most of them listed and named.

Most of them are also mentioned as part of the well-known [enterprise integration patterns](https://www.enterpriseintegrationpatterns.com/eaipatterns.html) which can be seen as a "defacto-standard" in the data and message integration world.

### Splitter / Iterator

A splitter splits a given data object into multiple data objects. Each data object can then processed separately.

For example you have a data object **order** which contains a list of **order items** and you would like to "extract" these order items from the order and process each order item separately:

![](../../img/eip_splitter.gif)

This is a common pattern also mentioned by the [enterprise integration pattern collection](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Sequencer.html). 

This approach is sometimes also called **Iterator**. Looping over a given set of data objects is also called **iterating** over the items.

#### Iterate with command `data.list.iterate`

In PIPEFORCE you can use the [`data.list.iterate`](../../api/commands#datalistiterate-v1) command in order to iterate over a list of data and apply transformation patterns at the same time. 

:::tip Note
This command is optimized for huge data iteration cycles and it doesn't add command execution counts for each cycle. So you should prefer this approach whenever possible.
:::

Here is an example:

```yaml
pipeline:
    - data.list.iterate:
        listA: [{"name": "Max", "allowed": false}, {"name": "Hennah", "allowed": false}]
        listB:  [{"name": "Max", "age": 12}, {"name": "Hennah", "age": 23}]
        where: "itemA.name == itemB.name and itemB.age > 18"
        do: "itemA.allowed = true"
```

As you can see, in this example there are two lists: `listA` and `listB`. For every item in `listA`, the `listB` is also iterated. In the `where` parameter you can define a PEL expression. In case this expression returns `true`, the expression in `do` is executed. In this example this means for every entry in `listA` it is checked whether there is the same `name` entry in `listB` and if so, the `age` is checked. If this value is `> 18`, the origin `listA` will be changed and the value of `allowed` set to `true`. The result will look like this:

```json
[
    {
        "name": "Max",
        "allowed": false
    },
	{
		"name": "Hennah",
		"allowed": true
	}
]
```

It is also possible to define multiple do-expressions to be executed on each iteration cycle. See this example, where additionally
a new attribute `approved` with the current timestamp will be added on each "where-matching" entry:

```yaml
pipeline:
    - data.list.iterate:
        listA: [{"name": "Max", "allowed": false}, {"name": "Hennah", "allowed": false}]
        listB:  [{"name": "Max", "age": 12}, {"name": "Hennah", "age": 23}]
        where: "itemA.name == itemB.name and itemB.age > 18"
        do: |
          itemA.allowed = true;
          itemA.approved = @date.timestamp();
```

As you can see, multiple do-expressions will be separated by a semicolon `;`. You can write them in one single line, or in multiple lines using the pipe symbol `|`. The output will look like this:

```json
[
    {
        "name": "Max",
        "allowed": false
    },
	{
		"name": "Hennah",
		"allowed": true,
        "approved":  1659266178365
	}
]
```

You can also iterate only a single `listA` without any `where` condition, like this example shows: 

```yaml
pipeline:
    - data.list.iterate:
        listA: [{"name": "Max", "allowed": false}, {"name": "Hennah", "allowed": false}]
        do: "itemA.allowed = true"
```

If the `where` parameter is missing, the `do` expression will be executed on any iteration item. In this example the result would be:

```json
[
    {
        "name": "Max",
        "allowed": true
    },
	{
		"name": "Hennah",
		"allowed": true
	}
]
```

If-Then-Else conditions inside a `do` expression can be implemented using the ternary operator (`condition ? whenTrueAction : elseAction`). Let's rewrite the example from above  and replace the `where` parameter by a ternary operator inside the `do` parameter:

```yaml
pipeline:
    - data.list.iterate:
        listA: [{"name": "Max", "allowed": false}, {"name": "Hennah", "allowed": false}]
        listB:  [{"name": "Max", "age": 12}, {"name": "Hennah", "age": 23}]
        do: "(itemA.name == itemB.name and itemB.age > 18) ? itemA.allowed = true : ''"
```

:::tip
In case no `elseAction` is required in the ternary operator, use an empty string `''` in order to indicate this.
:::


In case no `listA` parameter is given, the list is expected in the body or as optional parameter `input`, all input commands have in common.

:::tip
Since the parameters `where` and `do` can only contain PEL expressions, you can write them optionally without `#{` and `}` for better readability as shown in these examples.
:::

#### Iterate with command `foreach`



#### Iterate with PEL

In some situations it is also handy to use directly the [PEL selection](../../api/pel#selection-expression) or [PEL projection](../../api/pel#selection-projection) features on a given list in order to iterate it. 

#### Iterate with custom function

For very complex data iteration tasks, you could also use the [`script.run`](../../api/commands#scriptrun-v1) command and write a serverless function which iterates over the data. Since this approach requires knowledge about the scripting language and is usually not the best performing option, you should choose it only if there is no other option available to solve your iteration task.

#### Iterate with custom microservice

And if a script (serverless function / lambda) is also not working for you, you can write a custom microservice and run it inside PIEPFORCE. But this approach is outside of the scope of this data transformation section. See section [Microservices](../../microservices) for more details.

:::tip PIPEFORCE toolings
 - [`data.list.iterate`](../../api/commands#datalistiterate-v1) command
 - [PEL projection](../../api/pel#projection-expression) command
 - [PEL selection](../../api/pel#selection-expression) command
:::
### Aggregator / Merger

An aggregator combines multiple data objects into a single data object. Sometimes it is also called a **Merger** since it "merges" data objects into a single data object.

For example you have multiple **Inventory Items** and you would like to aggregate them together into one **Inventory Order** data object:

![](../../img/eip_aggregator.gif)

This is a common pattern also mentioned by the [enterprise integration pattern collection](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Aggregator.html). 

### Enricher

An enricher adds additional information to a given data object. 

The enrich data typically comes from a different data source like a database or similar. 

![](../../img/eip_enricher.gif)

This is a common pattern also mentioned by the [enterprise integration pattern collection](https://www.enterpriseintegrationpatterns.com/patterns/messaging/DataEnricher.html). 

For example you have an address data object with just the zip code in it: 

```json
{
    "street": "Lincoln Blvd",
    "zipCode": "90001"
}
```
You could then have an enricher which resolves the zip code and adds the city name belonging to this zip code to the address data object: 

```json
{
    "street": "Lincoln Blvd",
    "zipCode": "90001",
    // highlight-next-line
    "city": "Los Angeles"
}
```
In PIPEFORCE there are multiple ways to enrich a data object. You can use for example the `data.enrich` command in order to enrich data at a certain point. See this example for this:

```yaml
pipeline:
    - data.enrich:
        input: { "street": "Lincoln Blvd", "zipCode": "90001" }
        do: "input.city = 'Los Angeles'"

```

In the `set` parameter you can also refer to any pipeline or PEL Util in order to load data from external. For example:

```yaml
pipeline:
    - data.enrich:
        input: { "street": "Lincoln Blvd", "zipCode": "90001" }
        do: "#{ input.city = @command.call('http.get', {'url': 'http://city.lookup?zipCode=' + input.zipCode}) }"
```

As you can see, you can access the input data in the `do` expression usin the variable `input`. Also the variables `vars`, `headers` and `body` will be provided here.

Another possibility is to use the `data.list.iterate` command in order to enrich the items of a list while iterating them. 

:::tip PIPEFORCE toolings
 - [`data.enrich`](../../api/commands#dataenrich-v1) command 
 - [`data.list.iterate`](../../api/commands#datalistiterate-v1) command
 - [`set`](../../api/commands#set-v1) command
:::
### Deduplicator

A deduplicator is a special form of a [filter](#filter). It removes data duplicates from a given input.

:::tip PIPEFORCE toolings
 - [`data.list.filter`](../../api/commands#datalistfilter-v1) command 
:::
### Filter

A filter removes a selected set of data from a bigger set of data. So only a subset of the origin data will pass to the target.

![](../../img/eip_filter.gif)

This is a common pattern also mentioned by the [enterprise integration pattern collection](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Filter.html). 

:::tip PIPEFORCE toolings
 - [`data.list.filter`](../../api/commands#datalistfilter-v1) command 
:::
### Limitter

A limitter limits a given data list to a maximum size. It can be seen as a special form of a [filter](#filter).

:::tip PIPEFORCE toolings
 - [`data.list.limit`](../../api/commands#datalistlimit-v1) command 
:::

### Mapper

A mapper maps a given data structure into another data structure, so business logic is not required to handle this.

![](../../img/eip_mapper.gif)

This is a common pattern also mentioned by the [enterprise integration pattern collection](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingMapper.html). 

:::tip PIPEFORCE toolings
 - [`data.mapping`](../../api/commands#datamapping-v1) command 
 - [`data.list.iterate`](../../api/commands#datalistiterate-v1) command 
:::

#### Mapping with data.mapping

The command `data.mapping` can be used to apply simple data mappings inline in a pipeline. Optionally also the Pipeline Expression Language can be used for additional data transformations.

Let's see an example first:

```yaml
body: {
        "firstName": "Max  ",
        "lastName": " Smith ",
        "age": 48,
        "birthDate": "01/12/1977",
        "type": "customer"
    }

pipeline:
    - data.mapping:
        rules: |
            firstName   -> person.firstName,
            lastName    -> person.surname,
            age         -> person.age,
            birthDate   -> person.dateOfBirth,
            type        -> person.type
```

This example sets a JSON document in the body, then it applies the given mapping rules and writes by default the result as a new JSON in the body (replacing the initial JSON).

As you can see, every mapping rule is placed in a separate line, each ending with a comma (except the last one).

The left part of the mapping rule (left side of the arrow) is the input path (where to read the data from). The right part of the mapping rule (right side of the arrow) is the output path (where to write the data to):

``` 
inputPath -> outputPath
```

The final mapping result in the body will look like this:
```json
{
	"person": {
		"firstName": "Max  ",
		"surname": " Smith ",
		"age": 48,
		"dateOfBirth": "01/12/1977"
	}
}
```
As you can see, the applied mapping rules resulted in these changes:

 - The input field `firstName` was nested inside the new element `person`. The field name `firstName` was not changed.
 - The input field `lastName` was also mapped to the nested element `person`. Additionally it was renamed from `firstName` to `surname`.
 - The field `age` was nested inside `person` without any change.
 - And the input field `birthDate` was nested inside `person` and renamed to `dateOfBirth`.
 - The field `type` was only nested inside `person`.


Now lets assume we would like to only change the structure of the JSON we would like to change the values in parallel to the mapping. You can do so by applying the Pipeline Expression on the input path. For example:

```yaml
body: {
        "firstName": "Max  ",
        "lastName": " Smith ",
        "age": 48,
        "birthDate": "01/12/1977",
        "type": "customer"
    }

pipeline:
    - data.mapping:
        rules: |
            @text.trim(firstName)   -> person.firstName,
            @text.trim(lastName)    -> person.surname,
            age                     -> person.age,
            birthDate               -> person.dateOfBirth,
            @text.upperCase(type)   -> person.type,
            age > 18                -> person.adult
```

The result JSON of this pipeline after execution will look like this:

```json
{
	"person": {
		"firstName": "Max",
		"surname": "Smith",
		"age": 48,
		"dateOfBirth": "01/12/1977",
		"type": "CUSTOMER",
        "adult": true
	}
}
```

As you can see, additionally, the fields `firstName` and `surname` contain now trimmed values (whitspaces removed), the field `type` was converted to upper case and a new field `person.adult` was added with the result of the expression `age > 18`.

By default the mapping result is gets written to the body. If you would like it to a variable instead, you can use the `output` parameter:

```
vars:
    mappingResult: null
pipeline:
    - data.mapping:
        rules: |
            ...
        output: "#{vars.mappingResult"}
```

Make sure that the output target was created before since this helps for better readability.

#### Mapping with command data.list.iterate

You can also use the command `data.list.iterate` for data mapping. Examples see above.
### Sorter

A sorter sorts a given data list based on some condition. This is also known as the **Resequencer pattern**.

![](../../img/eip_sorter.gif)

This is a common pattern also mentioned by the [enterprise integration pattern collection](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Aggregator.html). 

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::