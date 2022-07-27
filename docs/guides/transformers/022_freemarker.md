# FreeMarker Transformer

The transformer command `transform.ftl` uses the template engine [FreeMarker](https://freemarker.apache.org/docs/index.html) in order to apply a transformation on a given model using a given template.

See the [commands reference](../../api/commands#transformftl) for details about the available parameters of this command.


## Example

In order to do a conversion from one data structure into another using the `transform.ftl` command, you need two core parts:

 - A **model** = The data structure you would like to convert (usually a JSON document).
 - A **template** = Defines the conversion "rules".

Below you can find a simple example how this could look like in a pipeline with model and template defined as inline values:

```yaml
pipeline:

  - transform.ftl:
      model: {
          "firstName": "Max", 
          "lastName": "Smith"
        }
      template: |
        Hello ${firstName} ${lastName}!
```

When you run this pipeline, you will get as output:

```
Hello Max Smith!
```

The data for the model and the template can for sure also come from a PEL or any other location supported by PIPEFORCE paths.

Here is an example which loads the model from the property store and the template from drive:

```yaml
pipeline:

  - transform.ftl:
      model: "$uri:property:global/app/myapp/data/person@value"
      template: "$uri:drive:/templates/person.ftl"
```

As you can see, [custom URIs](../../api/uris.md) are used here in order to point to locations for the model and the template.

## FreeMarker Basics

In this section some of the core concepts of the FreeMarker template language will be shown.

For more details visit their [Official FreeMarker Documentation](https://freemarker.apache.org/docs/index.html).

### Accessing values

In order to access a value from a model and write it at a certain position in the template, you can use `${variablePath}` whereas `variablePath` points to the path of the value inside the model. Let's assume you have a JSON model like this:

```json
{
  "person": {
    "firstName": "Maria",
    "lastName": "Sanders"
  }
}
```

If you would like to print the first name of the person, you could use the path `person.firstName`:

```
Hello ${person.firstName}!
```

Which will create this output after template was rendered:

```
Hello Maria!
```

If the model contains a list like this:

```json
{
  "people": [
    {
      "firstName": "Maria",
      "lastName": "Sanders"
    },
    {
      "firstName": "Markus",
      "lastName": "Mayers"
    }
  ]
}
```

then you can access values in this list by its index like this:

```
Hello ${people[1].firstName}!
```

Which will create this output after template was rendered:

```
Hello Markus!
```

### Iterating list values

Sometimes it is necessary to iterate over a list from a model like this:

```json
{
  "people": [
    {
      "firstName": "Maria",
      "lastName": "Sanders"
    },
    {
      "firstName": "Markus",
      "lastName": "Mayers"
    }
  ]
}
```

In FreeMarker you can do so by using the syntax `<#list people as person>`:

```
List of people:
<#list people as person>
- ${person.firstName} ${person.lastName}
</#list>
```

Which will create this output after template was rendered:

```
List of people:
- Maria Sanders
- Markus Mayers
```

You can also iterate over elements (called "hashes"). Let's assume you have a JSON model like this:

```json
{
  "products":{
    "apple": 5,
    "banana": 10,
    "kiwi": 15
  } 
}
```

In order to iterate over the elements inside `products` you can use this FreeMarker template:

```
List of products:
<#list products as name, price>
- ${name}, ${price} EUR
</#list>
```

Which will create this output after template was rendered:

```
List of products:
- apple, 5 EUR
- banana, 10 EUR
- kiwi, 15 EUR
```

For more details about iterating model data structures, see [FreeMarker Documentation](https://freemarker.apache.org/docs/ref_directive_list.html).

### Conditional output

In case you would like to generate an output only in case a certain criteria matches, you can use the `if, else, elseif` structure.

Let's assume a JSON model like this:

```json
{
  "products":{
    "apple": 5,
    "banana": 10,
    "kiwi": 15
  } 
}
```

And now you would like to print `BEST OFFER!` on those with `price < 10`, then you could write a template like this:

```
List of products:
<#list products as name, price>
- ${name}, ${price} EUR <#if price < 10>[BEST OFFER!]</#if>
</#list>
```

This will be rendered to a result like this:

```
List of products:
- apple, 5 EUR [BEST OFFER!]
- banana, 10 EUR
- kiwi, 15 EUR
```

It's also possible to use `<#else>` and `<#elseif>` constructs. For more details, see [FreeMarker Documentation](https://freemarker.apache.org/docs/ref_directive_if.html).
