# Pipeline Expression Language

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 3.0</p>

The **Pipeline Expression Language (PEL)** or just *PE (Pipeline Expression)* is a powerful expression language that is used inside a pipeline to dynamically calculate and set values. It can be used for data mapping and to dynamically calculate, set and change values at processing time of a pipeline. This gives you a huge flexibility in your pipeline.

Typically a PE starts with `#{` and ends with `}` and is placed in the value part of headers, variables or command parameters. It uses late binding: It will be executed only in case the according entry (header, variable or command parameter) is referenced somewhere.

Here is a simple example of a PE, placed inside the value of a command parameter:

```yaml
pipeline:
  - log:
      message: "#{1 + 1}"
```

Output:

```
2
```

It also supports interpolation in order to use the PEL like a template language inside a text string. So string concatenation is done for you:

```yaml
pipeline:
  - log:
      message: "Result: #{1 + 1}"
```

Output:

```
Result: 2
```
## Accessing Sopes

Inside a Pipeline Expression, you can access the values of the pipeline scopes like `headers`, `vars` and `body`. These scopes are provided as implicity objects and therefore they're available inside any Pipeline Expression.

Let's assume, you have defined a variable `counter` and you would like to access this counter in your expression, then you could write an expression like this:

```
#{vars.counter}
```

Or as (both are doing the same):

```
#{var.counter}
```

Here is an example of a pipeline which uses this expression and outputs the value of `counter` to the body:

```yaml
vars:
  counter: 12

pipeline:
  - body.set:
      value: "The counter is: #{var.counter}"
```

This will result in an output like this:

```
The counter is: 12
```

Similar you could fo with the `headers` scope:

```yaml
headers:
  contentType: "text/plain"

pipeline:
  - body.set:
      value: "The type is: #{header.contentType}"
```

This will result in an output like this:

```
The type is: text/plain
```

## Relational operators

### Is equal `==`

#### Example 1

```yaml
pipeline:
  - log:
      message: "#{2 == 1}"
```

Output:

```
false
```

### Is not equal `!=`

#### Example 1

```yaml
pipeline:
  - log:
      message: "#{2 != 1}"
```

Output:

```
true
```

### Less than `<`

#### Example 1

```yaml
pipeline:
  - log:
      message: "#{1 < 5}"
```

Output:

```
true
```

#### Example 2

```yaml
pipeline:
  - log:
      message: "#{0.5 < 1}"
```

Output:

```
true
```

### Less or equal than `<=`

#### Example 1

```yaml
pipeline:
  - log:
      message: "#{1 <= 5}"
```

Output:

```
true
```

### Greater than `>`

#### Example 1

```yaml
pipeline:
  - log:
      message: "#{1 > 5}"
```

Output:

```
false
```

### Greater or equal than `>=`

#### Example 1

```yaml
pipeline:
  - log:
      message: "#{5 >= 5}"
```

Output:

```
true
```

### Detect alphabetical order with `<`, `>`, `<=`, `>=`

#### Example 1

```yaml
pipeline:
  - log:
      message: "#{'Adam' < 'Zacharias'}"
```

Output:

```
true
```

### Regular expression matching `matches`

#### Example 1

```yaml
pipeline:
  - log:
      message: "#{'5.0067' matches '^-?\\d+(\\.\\d{2})?$'}"
```

Output:

```
false
```

## Logical operators

### `and`

#### Example 1

```yaml
pipeline:
  - log:
      message: "#{true and false}"
```

Output:

```
false
```

### `or`

#### Example 1

```yaml
pipeline:
  - log:
      message: "#{true or false}"
```

Output:

```
true
```

### `not`,  `!`

#### Example 1

```yaml
pipeline:
  - log:
      message: "#{!true}"
```

Output:

```
false
```
#### Example 2

```yaml
pipeline:
  - log:
      message: "#{not true}"
```

Output:

```
false
```

## Mathematical operators

### Addition `+` and subtraction `-`

#### Example 1 - Addition

```yaml
pipeline:
  - log:
      message: "#{1 + 1}"
```

Output:

```
2
```

#### Example 2 - Subtraction

```yaml
pipeline:
  - log:
      message: "#{10 - 1}"
```

Output:

```
9
```

#### Example 3 - Addition an subtraction

```yaml
pipeline:
  - log:
      message: "#{25 - 5 + 10}"
```

Output:

```
30
```

#### Example 4 - String concatenation

```yaml
pipeline:
  - log:
      message: "#{'Hello ' + 'World!'}"
```

Output:

```
Hello World!
```

### Multiplication `*` and division `/`, `%`

#### Example 1 - Multiplication

```yaml
pipeline:
  - log:
      message: "#{3 * 5}"
```

Output:

```
15
```

#### Example 2 - Negative multiplication

```yaml
pipeline:
  - log:
      message: "#{-1 * 5}"
```

Output:

```
-5
```

#### Example 3 - Division

```yaml
pipeline:
  - log:
      message: "#{20 / 5}"
```

Output:

```
4
```

#### Example 4 - Modulus

```yaml
pipeline:
  - log:
      message: "#{7 % 4}"
```

Output:

```
3
```

#### Example 5 - Operator precedence

```yaml
pipeline:
  - log:
      message: "#{5 + 4 - 1 * 2}"
```

Output:

```
7
```

#### Example 6 - Brackets

```yaml
pipeline:
  - log:
      message: "#{(5 + 4 - 1) * 2}"
```

Output:

```
16
```

## Assignment

#### Example 1

```yaml
pipeline:
  - set:
      value: "1"
      output: "#{vars.counter}"
  - log:
      message: "#{vars.counter}"
```

Output:

```
1
```

#### Example 2

```yaml
vars:
  counter: 12
pipeline:
  - set:
      value: "#{vars.counter + 1}"
      output: "#{vars.counter}"
  - log:
      message: "#{vars.counter}"
```

Output:

```
13
```

## Working with lists `{,}` and maps `{:}`

### Creating a new list

#### Example 1 - A new empty list

```yaml
vars:
  numbers: "#{{}}"
pipeline:
  - log:
      message: "#{vars.numbers}"
```

Output:

```
[]
```

#### Example 2 - A new list with default content

```yaml
vars:
  numbers: "#{{1, 2, 4}}"
pipeline:
  - log:
      message: "#{vars.numbers}"
```

Output:

```
[1, 2, 4]
```

#### Example 3 - A new, nested list

```yaml
vars:
  scores: "#{{ {1, 3}, {5, 8} }}"
pipeline:
  - log:
      message: "#{vars.scores}"
```

Output:

```
[[1, 3], [5, 8]]
```

### Accessing lists and arrays

#### Example 1

```yaml
vars:
  numbers: "#{{1, 2, 4}}"
pipeline:
  - log:
      message: "#{vars.numbers[1]}"
```

Output:

```
2
```

### Creating a new map / dictionary

#### Example 1 - A new empty map

```yaml
vars:
  persons: "#{ {:} }"
pipeline:
  - log:
      message: "#{vars.persons}"
```

Output:

```
{}
```

#### Example 2 - A new map with default values

```yaml
vars:
  persons: "#{ {hanna:'burger', max:'hotdog', julie:'salad'} }"
pipeline:
  - log:
      message: "#{vars.persons}"
```

Output:

```
{hanna=burger, max=hotdog, julie=salad}
```

#### Example 3 - A new map with later binding

```yaml
vars:
  persons: "#{ {:} }"
pipeline:
  - log:
      message: "#{vars.persons['Hanna'] = 23}"
```

Output:

```
{Hanna=23}
```

### Accessing maps/dictionaries

#### Example 1

```yaml
vars:
  persons: "#{ {hanna:'burger', max:'hotdog', julie:'salad'} }"
pipeline:
  - log:
      message: "#{vars.persons['max']}"
```

Output:

```
hotdog
```

## Navigating objects

A PE can point to values inside an object (or nested data structure), like this JSON for example:

```json
{
  "person": {
    "name": "Bart Simpson",
    "age": 12,
    "hobbies": [
      "skateboard",
      "tv",
      "pranks"
    ]
  }
}
```

You can navigate any structured object available inside a vars or body scope using the dot operator. For example:

```
#{person.name}
```

To access a list/array, you can use the index operator \[\]:

```
#{person.hobbies[0]}
```

#### Example 1

In this more advanced example, there are different things to mention:

1.  We create an **inline map** as **initial vars value**.
    
2.  Multi line values are done by using `'` (this trims any new line and space character at the beginning and end of the string, which is important to interpret it here as map instead of a string).
    
3.  We **set the body** using the initial vars value using the command `set.body` also with a multi line value.
    
4.  **Multiple** lines can also be set using `|`. Differently to `'` in this case new lines will be kept so that the output of the body will look exactly as formatted in the value parameter. This is perfect if you want to write a template for example with exact format output as the value looks like.
    
5.  There are comments in the configuration. A comment line starts with `#`.
    

See the official YAML documentation about how to deal with multi-line values. Here is a good summary: [https://yaml-multiline.info/](https://yaml-multiline.info/)

```yaml
# Set inline map as initial body value
vars: 
   data: '#{ 
      {
        person: {
          name: "Bart Simpson",
          age: 12,
          hobbies: {
            "skateboard",
            "tv",
            "pranks"
          }
        }
      }
    }'
pipeline:
  # Set in the body a multiline string
  - set.body:
      value: | 
        Name:  #{vars.data.person.name}
        Age:   #{vars.data.person.age}
        Hobby: #{vars.data.person.hobbies[0]}
```

Formatted output:

```
Name:  Bart Simpson
Age:   12
Hobby: skateboard
```

## Filtering

The PEL can be used to filter lists in an easy way. 

### Selection Expression `.?`

With the selection syntax you can select a subset of items from a given collection to be returned as new collection by specifying a selection expression.

Similar to the `WHERE` part of an SQL query.

The syntax is like this:

```
collectionName.?[selectionExpression]
```

Whereas `collectionName` is the variable name of the collection (can be an array, map, list, aso.) and `selectionExpression` is the expression which selects the items to be returned from the list.

#### Example 1

Lets assume we have a collection of entities like this stored in the body:

```yaml
[
  {
    "person": {
      "name": "Bart Simpson",
      "age": 12,
      "hobbies": [
        "skateboard",
        "tv",
        "pranks"
      ]
    }
  },
  {
    "person": {
      "name": "Maggie Simpson",
      "age": 1,
      "hobbies": [
        "drinking milk",
        "crawling",
        "crying"
      ]
    }
  }
]
```

Then, we can select a subset of the entries using a selection like this:

```yaml
pipeline:
  - log:
      message: "#{body.?[person.name == 'Maggie Simpson']}"
```

Output would be a **sublist** with the entries matching the criteria:

```json
[
  {
    "person": {
      "name": "Maggie Simpson",
      "age": 1,
      "hobbies": [
        "drinking milk",
        "crawling",
        "crying"
      ]
    }
  }
]
```

Here is the same example but with the data set embedded into the pipeline in the vars scope:

```yaml
vars: 
   data: '#{{
        {
          person: {
            name: "Bart Simpson",
            age: 12,
            hobbies: {
              "skateboard",
              "tv",
              "pranks"
            }
          }
        },
        {
          person: {
            name: "Maggie Simpson",
            age: 1,
            hobbies: {
              "drinking milk",
              "crawling",
              "crying"
            }
          }
        }
      }}'
pipeline:
  - log:
      message: "#{vars.data.?[person.name == 'Maggie Simpson']}"
```

### Projection Expression `.!`

With the projection syntax you can select specific property values out from a collection of objects.

Similar to the `SELECT` part of an SQL query.

The syntax is like this:

```
collectionName.![projectionExpression]
```

Whereas `collectionName` is the variable name of the collection (can be an array, map, list, aso.) and `projectionExpression` is the expression which selects the properties to be returned from each object in the list.

#### Example 1

Lets assume we have a collection of entities like this stored in the body:

```yaml
[
  {
    "person": {
      "name": "Bart Simpson",
      "age": 12,
      "hobbies": [
        "skateboard",
        "tv",
        "pranks"
      ]
    }
  },
  {
    "person": {
      "name": "Maggie Simpson",
      "age": 1,
      "hobbies": [
        "drinking milk",
        "crawling",
        "crying"
      ]
    }
  }
]
```

Then, we can select properties from this collection like this:

```yaml
pipeline:
  - log:
      message: "#{body.![person.name]}"
```

Output:

```
['Bart Simpson', 'Maggie Simpson']
```

And here the example with embedded data set in the vars scope:

```yaml
vars: 
   data: '#{{
        {
          person: {
            name: "Bart Simpson",
            age: 12,
            hobbies: {
              "skateboard",
              "tv",
              "pranks"
            }
          }
        },
        {
          person: {
            name: "Maggie Simpson",
            age: 1,
            hobbies: {
              "drinking milk",
              "crawling",
              "crying"
            }
          }
        }
      }}'
pipeline:
  - log:
      message: "#{vars.data.![person.name]}"
```

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::