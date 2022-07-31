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
 - The PEL Utils like `@data` or `@convert`

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

### PEL Utils

Additionally to the PEL core syntax, there are utility methods available which also can help you to simplify your data transformation tasks. 
For data transformation these utils could be of special interest:

 - [@calc](../../api/utils#calc) - For number crunching.
 - [@convert](../../api/utils#convert) - For convertion tasks (for example from decimal to int).
 - [@data](../../api/utils#data) - For data information and alter tasks.
 - [@date](../../api/utils#date) - Formatting date and time data.
 - [@list](../../api/utils#list) - Read and edit lists.
 - [@text](../../api/utils#text) - Text utilities in order to change and test text data.
  
See the [reference documentation](../../api/utils) for a full list of the available PEL utils.

## Transformation Patterns

There are many different ways of data transformation. In order to have a common understanding of the different approaches, below you can find the patterns of most of them listed and named.

Most of them are also mentioned as part of the well-known [enterprise integration patterns](https://www.enterpriseintegrationpatterns.com/eaipatterns.html) which can be seen as a "defacto-standard" in the data and message integration world.

### Iterator

An iterator "loops" over a given list of data (= iteration). During such an iteration, data in the list can be read, extracted and/or changed.

#### Iterate with command

In PIPEFORCE you can use the [`data.list.iterate`](../../api/commands#datalistiterate) command in order to iterate over a list of data and apply transformation patterns at the same time. Here is an example:

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

As you can see, multiple do-expressions will be separated by a semicolon `;`. You can write them in one single line our in multiple lines using the pipe symbol `|`. The output will look like this:

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
In case no `elseAction` is requiredin the ternary operator, use an empty string `''` in order to indicate this.
:::


In case no `listA` parameter is given, the list is expected in the body or as optional parameter `input`, all input commands have in common.

:::tip
Since the parameters `where` and `do` can only contain PEL expressions, you can write them optionally without `#{` and `}` for better readability as shown in these examples.
:::

#### Iterate with PEL

In some situations it is also handy to use directly the [PEL selection](../../api/pel#selection-expression) or [PEL projection](../../api/pel#selection-projection) features on a given list in order to iterate it. 

#### Iterate with custom function

For very complex data iteration tasks, you could also use the [`script.run`](../../api/commands#scriptrun) command and write a serverless function which iterates over the data. Since this approach requires knowledge about the scripting language and is usually not the best performing option, you should choose it only if there is no other option available to solve your iteration task.

#### Iterate with custom microservice

And if a script (serverless function / lambda) is also not working for you, you can write a custom microservice and run it inside PIEPFORCE. But this approach is outside of the scope of this data transformation section. See section [Microservices](../../microservices) for more details.

:::warning
Do **not** use the command [`foreach`](../../api/commands#foreach) for data transformation iteration. This command was intended to implement the [enterprise recipient list pattern](https://www.enterpriseintegrationpatterns.com/patterns/messaging/RecipientList.html) based on a given list as input, not for huge data transformation tasks. It would make it more complex and is optimized for command control flows, not for performing on a huge set of data. 
:::

:::tip PIPEFORCE toolings
 - [`data.list.iterate`](../../api/commands#datalistiterate) command
 - [PEL projection](../../api/pel#projection-expression) command
 - [PEL selection](../../api/pel#selection-expression) command
:::

### Splitter

A splitter splits a given data object into multiple data objects.

For example you have a data object **order** which contains a list of **order items** and you would like to "extract" these order items from the order:

![](../../img/eip_splitter.gif)

This is a common pattern also mentioned by the [enterprise integration pattern collection](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Sequencer.html). 


### Aggregator

An aggregator combines multiple data objects into a single data object.

For example you have multiple **Inventory Items** and you would like to aggregate them together into one **Inventory Order** data object:

![](../../img/eip_aggregator.gif)

This is a common pattern also mentioned by the [enterprise integration pattern collection](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Aggregator.html). 


### Filter

A filter removes a selected set of data from a bigger set of data. So only a subset of the origin data will pass to the target.

![](../../img/eip_filter.gif)

This is a common pattern also mentioned by the [enterprise integration pattern collection](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Filter.html). 

:::tip PIPEFORCE toolings
 - [`data.list.filter`](../../api/commands#datalistfilter) command 
:::

### Sorter

A sorter sorts a given data list based on some condition. This is also known as the **Resequencer pattern**.

![](../../img/eip_sorter.gif)

This is a common pattern also mentioned by the [enterprise integration pattern collection](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Aggregator.html). 

In PIPEFORCE you can sort data lists using the TODO.

### Limitter

A limitter limits a given data list to a maximum size. It can be seen as a special form of a filter.

:::tip PIPEFORCE toolings
 - [`data.list.limit`](../../api/commands#datalistlimit) command 
:::


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
 - [`data.enrich`](../../api/commands#dataenrich) command 
 - [`data.list.iterate`](../../api/commands#datalistiterate) command
 - [`set`](../../api/commands#set) command
:::

### Mapper

A mapper maps a given data structure into another data structure, so business logic is not required to handle this.

![](../../img/eip_mapper.gif)

This is a common pattern also mentioned by the [enterprise integration pattern collection](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingMapper.html). 

:::tip PIPEFORCE toolings
 - [`data.mapping`](../../api/commands#datamapping) command 
 - [`data.list.iterate`](../../api/commands#datalistiterate) command 
:::

#### Mapping using data.list.iterate

You can use the command `data.list.iterate` for data mapping.