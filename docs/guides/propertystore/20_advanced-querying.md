# Advanced Querying 

:::tip Summary
PIPEFORCE allows to query properties very effectively in different ways. In case one of the simple approaches like `property.list` or `property.value.get` is not sufficient for your use case, you can use the command [`property.query`](../../api/commands#propertyquery-v1) which allows for more advanced query options.
:::

## Introduction

 You can create advanced queries using the command [`property.query`](../../api/commands#propertyquery-v1).

This powerful command allows you to create "SQL-style" filters for properties which can be evaluated directly in the database and therefore are in most cases scale much better compared to doing filtering in memory.

Here is a first example using the command [`property.query`](../../api/commands#propertyquery-v1), which loads "recursively" the value of all properties of the app `myapp`, being a JSON document with attribute `title` having a value which starts with the text `Admin` and converts the final result to a JSON in order to use it in the pipeline for further processing. As you can imagine, this usually becomes a very complex native query since recursive key filtering is combined with JSON path selections, conversions and a LIKE search. The command [`property.query`](../../api/commands#propertyquery-v1) simplifies this a lot for you. The example will look like this:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        value::json
      from: |
        global/app/myapp/**
      where: |
        value::json ->> 'title' LIKE 'Admin %'
```

**`dialect`**: Depending on the parameter `dialect`, the command [`property.query`](../../api/commands#propertyquery-v1) can be used with different language implementations. In this example the `postgres` language is used (which is currently the only implementation available). Therefore, you can use most of the native PostgreSQL syntax elements and functions as documented [here](https://www.postgresql.org/docs/11/functions-json.html). 

**`type`**: If not specified otherwise by the optional parameter `type`, the expected property type is `application/json` by default. So only properties matching this type will automatically be selected for querying. 

:::info
Since in most cases, the [`property.query`](../../api/commands#propertyquery-v1) command will be used in conjunction with querying JSON documents, if not stated otherwise, all sections below will assume the parameter `type` is left out (= set to its default value `application/json`). 
:::

**`select`, `from`, `where`**: These parameters are based on the typical SQL query structure even if their value can differ from the ordinary SQL syntax, based on the selected `dialect`.

:::tip
Use the pipe `|` character for the query parameters for better readability and to avoid quote and tick '"\"mixing-hells\""'.
:::

### Property Attributes

Keep in mind that a property has multiple property attributes. Each of them can be used in the query:

 - `key` - The unqiue key of the property (modifiable).
 - `uuid` - The unqiue id of the property (non-modifiable).
 - `value` - The payload of the property (for example a JSON document).
 - `type` - The mime type of the payload. (for example `application/json`).
 - `created` -  The timestamp in ms when this property has been created.
 - `updated` - The timestamp in ms when this property has been changed last.
 - `timeToLive` - The time to live in minutes of this property.

The attribute which used usually very often, is the `value` attribute since it contains the payload of the property. In most cases, it is a JSON document. In order to apply conditions on such a JSON document, you need to convert it to `json` or `jsonb` first. See below for further details about this.

## The `select` Parameter

The parmeter `select` of the command [`property.query`](../../api/commands#propertyquery-v1) defines the values, elements or aggregation results to be returned from a property, similar as it is in SQL. The difference to SQL is, that here it is also possible to select and aggregate values from JSON documents in the result set using a [special JSON syntax defined by PostgreSQL](https://www.postgresql.org/docs/11/functions-json.html).

**Example 1**

Return all property values as string of all JSON documents of all apps, recursively:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        value
      from: |
        global/app/**
```

The result will look like this:

```json
[
  "{\"foo\":\"bar\"}",
  "{\"hello\":\"world\"}"
]
```

**Example 2**

Now lets additionally add the property `key` and the property `uuid` to the select condition:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        key, uuid, value
      from: |
        global/app/**
```

The result will look like this:

```json
[
  [
    "global/app/myapp/data/foo",
    "071ab8cb-96d8-47ab-8891-412d93e9751e",
    "{\"foo\":\"bar\"}"
  ],
  [
    "global/app/anotherapp/hello",
    "88e0f953-f85d-4d21-8a86-99be8f82f9e0",
    "{\"hello\":\"world\"}"
  ]
]
```
### Aggregate Functions

Its also possible to use [aggregation functions](https://www.postgresql.org/docs/11/functions-aggregate.html) like `count()`, `sum()`, `avg()`, `max()`, `min()` for example in the `select` parameter. Example:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        count(*)
      from: |
        global/app/**
```

The result will look like this:

```json
[
  2
]
```

:::tip Aggregate Functions
See the PostgreSQL documentation [Aggregate Functions](https://www.postgresql.org/docs/11/functions-aggregate.html) for details about all available functions.
:::
## Convert to JSON

Whenever you would like to do a JSON operation on a value using the [`property.query`](../../api/commands#propertyquery-v1) command, you need to convert the value to a JSON type first. For this, PostgreSQL provides the data types [`json` and `jsonb`](https://www.postgresql.org/docs/11/datatype-json.html). 

:::tip Hint
While the type `json` does a "lighweight" conversion to JSON, `jsonb` is converting to a more powerful binary JSON version and therefore takes more space and is slower in conversion. At the other hand, some operations are only possible on the `jsonb` type. Additionally, some operations applied on `jsonb` are much faster, because of its optimized format. So it depends on your use-case which one to use. Check the [documentation](https://www.postgresql.org/docs/11/functions-json.html) which type supports which concrete operation.
:::

The conversion is done by adding the suffix `::json` or `::jsonb` at the end of the value to convert. Some examples of valid conversions are:
```sql
value::json
```
```sql
value::jsonb
```
```sql
'{"foo":"bar"}'::json
```
```sql
'{"foo":"bar"}'::jsonb
```
**Example**

Let's do again an example and output the `value` attribute of all JSON properties inside `global/app/**`, but now converted to JSON using the PostgreSQL `json` type: 

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        value::json
      from: |
        global/app/**
```

The result will look like this:

```json
[
  {"foo":"bar"},
  {"hello":"world"}
]
```

As you can see, instead of a JSON string for each result row, a well formatted JSON structure is returned instead. Since the result is a JSON, you can directly use it in the pipeline by subsequent commands, without any additional JSON or Map conversions required:

```yaml
pipeline:

  # Load it from Property Store
  - property.query:
      dialect: postgres
      select: |
        value::json
      from: |
        global/app/**

  # Use the JSON result
  - log:
      message: "First item: #{body[0].foo}"

```

Now, lets additionally add the property attributes `key` and `uuid` to the `select` parameter:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        key, uuid, value::json
      from: |
        global/app/**
```

The result will look like this:

```json
[
  [
    "global/app/myapp/data/foo",
    "071ab8cb-96d8-47ab-8891-412d93e9751e",
    {"foo":"bar"}
  ],
  [
    "global/app/anotherapp/hello",
    "88e0f953-f85d-4d21-8a86-99be8f82f9e0",
    {"hello":"world"}
  ]
]
```

As you can see, the text values of the property attributes `key` and `uuid` are combined with the JSON object of the value field on each result row. Type conversion to `json` is done by `::json` applied on the `value` field. Since the value type is set to `application/json` by default, this can be done without any problem here.

:::warning
Make sure the field you would like to convert to JSON is a valid JSON document. Otherwise, an error will be thrown. Whenever you store a property using one of the property commands and with the property type set to `application/json` into the property store, the value will be auto-checked whether it is a valid JSON. Therefore, you should always store data into the property store using the property commands.
:::

## JSON Operators

After a field was converted to a JSON object using `::json` or `::jsonb`, you can apply JSON operators and functions on it. See the PostgreSQL documentation about [JSON Functions and Operations](https://www.postgresql.org/docs/11/functions-json.html).

Let's assume a pattern like `globa/app/**` will return a list of JSON documents like this:

```json
[
  {"foo":"bar"},
  {"hello":"world"}
]
```

Then, here is an example which outputs the value of of the field `foo` on any of the selected JSON documents:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        value::json -> 'foo'
      from: |
        global/app/**
```

This will result in an output like this:

```json
[
  "bar",
  null
]
```
 
As you can see, the operator `->` is used to select a value from a given JSON result. Only the first JSON has a field `foo`. The second doesn't. And therefore `null` is returned here, but no error happened.

It the next chapters you will learn more about the most important JSON operators.

### Operator `->`

Also see: https://www.postgresql.org/docs/11/functions-json.html 

The JSON operator `->` can be used to select an item from a JSON array (if right part is an int) or an JSON object (if right part is a string). It returns the result as JSON type. Supported on `jsonb` and `json` inputs.

**Example 1** 

Select a JSON object and return the result as JSON text.
 
```json
'{"firstName": "Max"}'::json -> 'firstName'
```
```json
"Max"
```

**Example 2** 

Same as Example 1 but with `jsonb`.
 
```json
'{"firstName": "Max"}'::jsonb -> 'firstName'
```
```json
"Max"
```

**Example 3** 

Select a JSON object and return the result as JSON int.
 
```json
'{"age": 38}'::jsonb -> 'age'
```
```json
38
```

**Example 4** 

Select a JSON array item and return the result as JSON text.
 
```json
'["books", "bikes", "cars"]'::jsonb -> 0
```
```json
"books"
```

**Example 5** 

Select a JSON array item, nested inside a JSON object and return the result as JSON text.
 
```json
'{
  "hobbies": ["books", "bikes", "cars"]
}'::jsonb -> 'hobbies' -> 1
```
```json
"bikes"
```

**Example 7** 

Select a JSON array item, nested inside a JSON object and return it as JSON object.
 
```json
'{
  "addresses": [
    {
      "street": "Sesame 2",
      "zipCode": 78321
    },
    {
      "street": "Park Ave 34",
      "zipCode": 90662 
    }
  ]
}'::jsonb -> 'addresses' -> 1
```
```json
{
  "street": "Park Ave 34",
  "zipCode": 90662 
}
```

**Example 8** 

Select a JSON object item, nested inside a JSON object and return it as JSON object.
 
```json
'{
  "hobbies": ["books", "bikes", "cars"]
}'::jsonb -> 'hobbies'
```
```json
["books", "bikes", "cars"]
```

### Operator `->>`

Also see: https://www.postgresql.org/docs/11/functions-json.html 

The JSON operator `->>` is similar to `->` except that it returns the result always as a string instead of a corresponding JSON type. Supported on `jsonb` and `json` inputs.

:::tip
This operator is useful in cases where you would like to take the result of the operator and use it in SQL expressions such as `LIKE` for example, since they usually need a primitive type as input.
:::

**Example 1** 

Select a JSON object and return the result as ordinary string.
 
```json
'{"firstName": "Max"}'::jsonb ->> 'firstName'
```
```
Max
```
**Example 2** 

Select a JSON object and return the result as string.
 
```json
'{"age": 38}'::jsonb ->> 'age'
```
```
38
```

### Operator `#>`

Also see: https://www.postgresql.org/docs/11/functions-json.html 

Similar to `->`, the JSON operator `#>` can be used to select an item from a JSON array or an JSON object by applying a path to it. It returns the result as JSON type. Supported on `jsonb` and `json` inputs.

:::tip
Since the operator `#>` doesn't need evaluation steps, it might be faster than a combination of `->` operators. The downside is, that it is harder to read. We suggest to go at first with the variant which is easier to understand for you and optimize later, when really required.
:::

**Example 1** 

Select a JSON array item, nested inside a JSON object and return it as JSON object.
 
```json
'{
  "addresses": [
    {
      "street": "Sesame 2",
      "zipCode": 78321
    },
    {
      "street": "Park Ave 34",
      "zipCode": 90662 
    }
  ]
}'::jsonb #> '{addresses, 1}'
```
```json
{
  "street": "Park Ave 34",
  "zipCode": 90662 
}
```

### Operator `#>>`

Also see: https://www.postgresql.org/docs/11/functions-json.html 

This operator is similar to `#>` except that it returns the result always as a string. Supported on `jsonb` and `json` inputs.

:::tip
This operator is useful in case you would like to take the result of the operator and use it in SQL expressions such as `LIKE` for example, since they usually need a primitive type as input.
:::

**Example 1** 

Select a JSON array item, nested inside a JSON object and return it as string.
 
```json
'{
  "addresses": [
    {
      "street": "Sesame 2",
      "zipCode": 78321
    },
    {
      "street": "Park Ave 34",
      "zipCode": 90662 
    }
  ]
}'::jsonb #>> '{addresses, 1}'
```
```
{\"street\": \"Park Ave 34\", \"zipCode\": 90662}
```

### Operator `?`

Also see: https://www.postgresql.org/docs/11/functions-json.html 

The operator `?` tests whether a given JSON object contains a key at its top level. It returns `true` or `false`. Supported only on `jsonb` inputs.

**Example 1** 

Test whether a JSON object contains the given key at current top level.
 
```json
'{"firstName": "Max"}'::jsonb ? 'firstName'
```
```json
true
```

Now with non-existing key:
```json
'{"firstName": "Max"}'::jsonb ? 'foo'
```
```json
false
```

## JSON Functions

It is also possible to apply functions on `json` and `jsonb` converted data. 
See the official PostgreSQL documentation about [JSON Functions and Operations](https://www.postgresql.org/docs/11/functions-json.html).

### `to_json`

Also see: https://www.postgresql.org/docs/11/functions-json.html 

The functions `to_json(data)` `to_jsonb(data)` try to convert the input `data` into a JSON type.

**Example 1** 

Convert the given text data into a `jsonb` type.
 
```json
to_jsonb('Hello World!'::text)
```
```json
"Hello World"
```

### `json_array_length`

Also see: https://www.postgresql.org/docs/11/functions-json.html 

The functions `json_array_length(json)` and `jsonb_array_length(jsonb)` return the length of the given array.

**Example 1** 

Return the length of a `json` array.
 
```sql
json_array_length('[0, 1, 2]'::json)
```
```json
3
```

### `json_object_keys`

Also see: https://www.postgresql.org/docs/11/functions-json.html 

The functions `json_object_keys(json)` and `jsonb_object_keys(jsonb)` return the JSON keys of current level.

**Example 1** 

Return the keys of a `json` object.
 
```sql
json_object_keys('{"firstName": "Max", "lastName": "Mayers"}'::json)
```
```json
firstName
lastName
```

### `json_strip_nulls`

Also see: https://www.postgresql.org/docs/11/functions-json.html 

The functions `json_strip_nulls(json)` and `jsonb_strip_nulls(jsonb)` strip all fields containg a `null` value. This gets applied only for JSON objects and **not** for JSON arrays.

**Example 1** 

Remove the the fields with `null` value from `jsons` object.
 
```sql
jsonb_strip_nulls('{"firstName": "Max", "lastName": null}'::jsonb)
```
```json
{"firstName": "Max"}
```


### `json_set`

Also see: https://www.postgresql.org/docs/11/functions-json.html 

The functions `json_set(targetjson, path, valuejson, create)` and `jsonb_set(targetjson, path, valuejson, create)` set the `valuejson` on a JSON object given by `targetjson` at location defined by `path`. If no entry exists at `path`, creates a new element there in case `create` is set to `true` (default). 

:::info
Make sure that the parameter `valuejson` is of type `json` or `jsonb` since this often leads to misunderstandings.
:::

**Example 1** 

Add a new attribute to a given JSON object.
 
```sql
jsonb_set('{"firstName": "Max"}'::jsonb, '{lastName}', '"Meyers"', true)
```
```json
{"lastName": "Meyers", "firstName": "Max"}
```

**Example 2** 

Add a new attribute to a given JSON object with explicit conversion using `to_json`.
 
```sql
jsonb_set('{"firstName": "Max"}'::jsonb, '{lastName}', to_jsonb('Meyers'::text), true)
```
```json
{"lastName": "Meyers", "firstName": "Max"}
```

## The `from` Parameter

The `from` parameter of the command [`property.query`](../../api/commands#propertyquery-v1) defines key patterns of those properties to return for further filtering. It is similar to the SQL `FROM`, but instead of tables, it selects properties. 

The key patterns are checked whether the currently executing user has the permission to read from these (sub-) paths.

Example:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      from: |
        global/app/myapp/**
```

This example will return "recursively" all the properties of type `application/json` (= default) inside the app `myapp`.

In case you would like to define multiple patterns, you need to separate them by comma `,` and assign each to a variable name using the `as` keyword. 

```yaml
pipeline:
  - property.query:
      dialect: postgres
      from: |
        global/app/myapp/** as a,
        global/app/anotherapp/** as b
```

The variabe name can be used to reference the patterns later in the `where` and `select` parameters. 

Example:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        a.value::json
      from: |
        global/app/myapp/** as a,
        global/app/anotherapp/** as b
```

:::tip
As soon as you have more than one `from` patterns, a join is automatically created for you. And therefore, you need to declare a variable for each pattern using `as <variable>`.
:::

## The `where` parameter

The `where` parameter can be used to specify join, filter, group and order conditions for the result, similar to the SQL `WHERE` part.

You can use any operation here, the PostgreSQL database supports in the `WHERE` clause. See: https://www.postgresql.org/docs/11/queries.html

**Example** 

Let's assume, we have a list of `customer` JSON documents stored in the Property Store under `global/app/myapp/data/customer/<uuid>` each:

```json
{
  "uuid": 2,
  "firstName": "Max",
  "lastName": "Meyers",
  "addressUuid": 12
}
```
```json
{
  "uuid": 5,
  "firstName": "Angelika",
  "lastName": "Mertens",
  "addressUuid": 19
}
```
And now we would like to return only those JSON documents with `lastName` is `Meyers`, then we could write this query:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        value::json
      from: |
        global/app/myapp/data/customer/*
      where: |
        value::json ->> 'lastName' = 'Meyers'
```

This would return a result like this:

```json
[
  {
    "uuid": 2,
    "firstName": "Max",
    "lastName": "Meyers",
    "addressUuid": 12
  }
]
```
### Using `LIKE`

It is also possible to use the `LIKE` expression combined with JSON queries in the `where` parameter. With this expression you can do pattern matching on strings. 

See PostgreSQL documentation for more information about `LIKE` expressions: https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-LIKE 

:::tip
Since the `LIKE` expression can be applied only on strings, make sure to return the values from JSON documents as such using the `->>` operator, **not** the `->` operator.
:::


**Example**

Let's assume we would like to rewrite the query from the previous example and return all customers those `lastName` starts with `M`:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        value::json
      from: |
        global/app/myapp/data/customer/*
      where: |
        value::json ->> 'lastName' LIKE 'M%'
```
The result will be:

```json
[
  {
    "uuid": 5,
    "firstName": "Angelika",
    "lastName": "Mertens",
    "addressUuid": 19
  },
  {
    "uuid": 2,
    "firstName": "Max",
    "lastName": "Meyers",
    "addressUuid": 12
  }
]
``` 

:::caution
The `LIKE` expression can be very powerful when it comes in combination with JSON documents.
But it can also be quite expensive in terms of performance, depending on the complexity of your query. So keep in mind: Sometimes, it is OK to search in the text version of JSON instead of converting it to `json` or `jsonb` first. This could be much faster in certain situations.
:::


### Using `ORDER BY`

The `ORDER BY` can be used to sort the result set.

See the official PostgreSQL documentation for details about this clause: https://www.postgresql.org/docs/11/queries-order.html 

**Example**

Let's assume, we would like to sort the example JSON documents from the previous example by `firstName`:

```yaml
  - property.query:
      dialect: postgres
      select: |
        value::json
      from: |
        global/app/myapp/data/customer/*
      where: |
        value::json ->> 'firstName' IS NOT NULL
        ORDER BY value::json ->> 'firstName' ASC
```
The result will be:

```json
[
  {
    "uuid": 5,
    "firstName": "Angelika",
    "lastName": "Mertens",
    "addressUuid": 19
  },
  {
    "uuid": 2,
    "firstName": "Max",
    "lastName": "Meyers",
    "addressUuid": 12
  }
]
```

## Property Joins

You can also do joins between properties, similar as you would do between multiple tables in SQL.

To do so, you need to define the key patterns of the properties you would like to join, each separated by a comma `,` and assigned to a variable using the `as` keyword. Example:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      from: |
        global/app/myapp/** as a,
        global/app/anotherapp/** as b
```

This example joins all properties matching the pattern `global/app/myapp/**` with those, matching `global/app/anotherapp/**` and assigns each to variable names. In the `where` clause you can then define the join conditions.

**Example** 

Let's assume, we have a list of `customer` entities and `address` with multiple instances stored as JSON in the Property Store, whereas each person has a one to one relatingship to an address entity:

JSON documents stored in property value under `global/app/myapp/data/customer/<uuid>`:
```json
{
  "uuid": 2,
  "firstName": "Max",
  "lastName": "Meyers",
  "addressUuid": 12
}
```
```json
{
  "uuid": 5,
  "firstName": "Angelika",
  "lastName": "Mertens",
  "addressUuid": 19
}
```
JSON documents stored in property value under `global/app/myapp/data/address/<uuid>`:
```json
{
  "uuid": 12,
  "street": "Lincoln Blvd",
  "zipCode": "90001",
  "city": "Los Angeles"
}
```
```json
{
  "uuid": 19,
  "street": "3 Time Square",
  "zipCode": "10036-6564",
  "city": "New York"
}
```

Now, let's further assume you would like to return all customers living in `New York`. For this you could do a join like this:

```yaml
- property.query:
    dialect: postgres
    select: |
      customer.value::json
    from: |
      global/app/myapp/data/customer/* as customer,
      global/app/myapp/data/address/* as address
    where: |
      customer.value::json ->> 'addressUuid' = address.value::json ->> 'uuid' AND
      address.value::json ->> 'city' = 'New York'
```
:::note
Note that the values of the JSON fields are compared using the `->>` operator in the join condition since we would like to compare their text value.
:::

This will result in a single output:

```json
[
  {
    "uuid": 5,
    "firstName": "Angelika",
    "lastName": "Mertens",
    "addressUuid": 19
  }
]
```

You can also return the address document **and** the customer document:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        customer.value::json as a,
        address.value::json as b
      from: |
        global/app/myapp/data/customer/* as customer,
        global/app/myapp/data/address/* as address
      where: |
        customer.value::json ->> 'addressUuid' = address.value::json ->> 'uuid' AND
        address.value::json ->> 'city' = 'New York'
```
:::note
Note that if you have multiple "result columns" in the `select` parameter, you need to assign each output "result column" to a unique name using the `as` keyword. The name can be different from the `from` variables. This is currently a known limitation.
:::


This will output the person and the address JSON in each result row: 

```json
[
  [
    {
      "uuid": 5,
      "firstName": "Angelika",
      "lastName": "Mertens",
      "addressUuid": 19
    },
    {
      "uuid": 19,
      "street": "3 Time Square",
      "zipCode": "10036-6564",
      "city": "New York"
    }
  ]
]
```

### Merging Join Results

Sometimes you would like to combine the join results from different JSON properties into a a single JSON. This can be done for example using the [`json_set`](#json_set) function.

**Example 1**

In order to merge the result from the example above, you could rewrite the `select` parameter of the query like this:

```yaml
pipeline:
  - property.query:
     dialect: postgres
     select: |
       jsonb_set(customer.value::jsonb, '{currentAddress}', address.value::jsonb)
     from: |
       global/app/myapp/data/customer/* as customer,
       global/app/myapp/data/address/* as address
     where: |
       customer.value::json ->> 'addressUuid' = address.value::json ->> 'uuid' AND
       address.value::json ->> 'city' = 'New York'
```

In the `select` parameter we set the address JSON to the customer JSON under new key `currentAddress` which will create a merged JSON as result like this:

```json
[
  {
    "uuid": 5,
    "lastName": "Mertens",
    "firstName": "Angelika",
    "addressUuid": 19,
    "currentAddress": {
      "city": "New York",
      "uuid": 19,
      "street": "3 Time Square",
      "zipCode": "10036-6564"
    }
  }
]
```

**Example 2**

You can also merge property attributes outside of the (JSON) value into the resulting JSONs. Let's assume you would like to merge the property attribute `key` as new entry `propertyKey` into the result JSON. For this you could define a query like this: 

```yaml
pipeline:
  - property.query:
     dialect: postgres
     select: |
       jsonb_set(customer.value::jsonb, '{propertyKey}', to_jsonb(customer.key))
     from: |
       global/app/myapp/data/customer/* as customer,
       global/app/myapp/data/address/* as address
     where: |
       customer.value::json ->> 'addressUuid' = address.value::json ->> 'uuid' AND
       address.value::json ->> 'city' = 'New York'
```

The result will look like this, then:

```json
[
  {
    "uuid": 5,
    "lastName": "Mertens",
    "firstName": "Angelika",
    "addressUuid": 19,
    "propertyKey": "/pipeforce/main/global/app/myapp/data/customer/5"
  }
]
```

As you can see, an additional field with name `propertyKey` was added and its value was set to the value coming from the property attribute `key`. 

:::tip
Remember that each property has an attribute structure like this:

```json
{
  "key": "...",
  "uuid": "...",
  "type": "...",
  "value": "...",
  "timeToLive": 123
}
```
So you can access each of these fields (called "attributes") also in your queries using their names.
:::

## Query Parameters

The command [`property.query`](../../api/commands#propertyquery-v1) also supports parameters ("prepared statements") so values coming from users are secured properly.

Here is an example how to define the parameters using the `params` keyword:

```yaml
pipeline:
  - property.query:
      dialect: postgres
      select: |
        value::json
      from: |
        global/app/myapp/data/customer/*
      where: |
        value::json ->> 'lastName' = :theName
      params:
        theName: "Meyers"
```

As you can see, the query parameter is defined in the query using `:theName` and in `params` the value for it gets assigned.

:::warning
Since any input coming from the user or external systems has to be treated as a potential security breach, make sure that you put such values in your queries only by using query parameters. Never as string concatenations!
:::

:::caution
Using the query parameter inside quotes will not work. So instead of this  
```sql
value::json ->> 'lastName' = ':theName'
``` 
use 
```sql
value::json ->> 'lastName' = :theName
```
::: 

## Date and Time Ranges

PostgreSQL offers a huge set of date and time functions and operations: https://www.postgresql.org/docs/11/functions-datetime.html.

You can use them in the  [`property.query`](../../api/commands#propertyquery-v1) command.

Additionally, PIPEFORCE has many utils, which can help you to create date and time based queries. The most important functions can be found in the [@date](../../api/functions#date) util.

Below you can find some query examples, how to use these tools with the [`property.query`](../../api/commands#propertyquery-v1) command.

**Return all properties created today**

```yaml
pipeline:
  - property.query:
      select: |
        *
      from: |
        global/**
      where: |
        created > :beginToday
      params:
        beginToday: "#{@date.beginOfDay(0)}"
```

**Return all properties created yesterday**

```yaml
pipeline:
  - property.query:
      select: |
        *
      from: |
        global/**
      where: |
        created BETWEEN :beginYesterday AND :beginToday
      params:
        beginYesterday: "#{@date.beginOfDay(-1)}"
        beginToday: "#{@date.beginOfDay(0)}"
```

**Return all properties created this week**

```yaml
pipeline:
  - property.query:
      select: |
        *
      from: |
        global/**
      where: |
        created > :beginOfWeek
      params:
        beginOfWeek: "#{@date.beginOfWeek(0)}"
```

**Return all properties created last week**

```yaml
pipeline:
  - property.query:
      select: |
        *
      from: |
        global/**
      where: |
        created BETWEEN :beginLastWeek AND :beginThisWeek
      params:
        beginLastWeek: "#{@date.beginOfWeek(-1)}"
        beginThisWeek: "#{@date.beginOfWeek(0)}"
```

**Return all properties created this month**

```yaml
pipeline:
  - property.query:
      select: |
        *
      from: |
        global/**
      where: |
        created > :beginThisMonth
      params:
        beginThisMonth: "#{@date.beginOfMonth(0)}"
```

**Return all properties created last month**

```yaml
pipeline:
  - property.query:
      select: |
        *
      from: |
        global/**
      where: |
        created BETWEEN :beginLastMonth AND :beginThisMonth
      params:
        beginLastMonth: "#{@date.beginOfMonth(-1)}"
        beginThisMonth: "#{@date.beginOfMonth(0)}"
```

**Return all properties created in the last 6 months**

```yaml
pipeline:
  - property.query:
      select: |
        *
      from: |
        global/**
      where: |
        created > :begin6MonthsBefore
      params:
        begin6MonthsBefore: "#{@date.beginOfMonth(-6)}"
```

**Return all properties created in the last 12 months**

```yaml
pipeline:
  - property.query:
      select: |
        *
      from: |
        global/**
      where: |
        created > :begin12MonthsBefore
      params:
        begin12MonthsBefore: "#{@date.beginOfMonth(-12)}"
```

**Return all properties created last year**

```yaml
pipeline:
  - property.query:
      select: |
        *
      from: |
        global/**
      where: |
        created BETWEEN :beginLastYear AND :beginThisYear
      params:
        beginLastYear: "#{@date.beginOfYear(-1)}"
        beginThisYear: "#{@date.beginOfYear(0)}"
```

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::