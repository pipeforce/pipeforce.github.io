# CSV to JSON Transformer

The transformer command `transform.csv.json` expects a CSV file which complies with the [RFC4189](https://datatracker.ietf.org/doc/html/rfc4180) standard in the body or as `input` parameter of the command and converts it to a JSON document which can then be used for further processing.

See the [commands reference](../../api/commands#transformcsvjson) for details about the available parameters of this command.

## Example 1: Arrays output format

If you use the transformer without any additional parameters, the JSON output will contain a nested arrays format for the rows:

```yaml
pipeline:

  # Set the CSV in the body
  - set.body:
      value: |
        "firstName","lastName","age"
        "Max","Smith","38"
        "Susann","Mayr Wan","44

  - transform.csv.json:
```

The default output will look like this:

```json
{
  "columnsCount": 3,
  "rowsCount": 2,
  "headers": ["firstName","lastName","age"],
  "rows": [
    ["Max","Smith","38"],
    ["Susann","Mayr Wan","44"]
  ]
}

```
## Example 2: Headers in rows

By default the column header names of the CSV will be shown in an extra field `headers` of the resulting JSON.

It is also possible to have these header names as part of the rows array and skip the extra `headers` field:

```yaml
pipeline:

  # Set the CSV in the body
  - set.body:
      value: |
        "firstName","lastName","age"
        "Max","Smith","38"
        "Susann","Mayr Wan","44"

  - transform.csv.json:
      showHeadersField: false
```

The output will look like this:

```json
{
  "columnsCount": 3,
  "rowsCount": 3,
  "rows": [
    ["firstName","lastName","age"],
    ["Max","Smith","38"],
    ["Susann","Mayr Wan","44"]
  ]
}

```

:::info
Note that the `rowsCount` now also counts the header line.
:::

## Example 3: Hide counter fields

You can also hide all extra fields.

Here you can see the most simple output possible:

```yaml
pipeline:

  # Set the CSV in the body
  - set.body:
      value: |
        "firstName","lastName","age"
        "Max","Smith","38"
        "Susann","Mayr Wan","44"

  - transform.csv.json:
      showHeadersField: false
      showColumnsCountField: false
      showRowsCountField: false
```

The output will look like this:

```json
{
  "rows": [
    ["firstName","lastName","age"],
    ["Max","Smith","38"],
    ["Susann","Mayr Wan","44"]
  ]
}

```


## Example 4: Objects output format

In some cases it is required, to have each row output as a JSON object with the header names as key.

To do so, you need to set the parameter `rowsFormat` to `objects`, then the JSON output will contain an array of JSON objects:

```yaml
pipeline:

  # Set the CSV in the body
  - set.body:
      value: |
        "firstName","lastName","age"
        "Max","Smith","38"
        "Susann","Mayr Wan","44"

  - transform.csv.json:
      rowsFormat: "objects" # Can be "objects" or "arrays" (default).
```

The output will look like this:

```json
{
  "columnsCount": 3,
  "rowsCount": 2,
  "headers": ["firstName","lastName","age"],
  "rows": [
    {
      "firstName": "Max",
      "lastName": "Smith",
      "age": "38"
    },
    {
      "firstName": "Susann",
      "lastName": "Mayr Wan",
      "age": "44"
    }
  ]
}

```

:::info
Note that this output format creates a much bigger JSON document. So if possible, you should prefer to work with the default rows format `arrays`.  
:::

## Example 5: Set CSV as input param

Instead of reading the CSV from the body, you can also pass it as `input` param to the command:


```yaml
pipeline:

  - transform.csv.json:
      input: |
        "firstName","lastName","age"
        "Max","Smith","38"
        "Susann","Mayr Wan","44"
```

The output will look like this:

```json
{
  "columnsCount": 3,
  "rowsCount": 2,
  "headers": ["firstName","lastName","age"],
  "rows": [
    ["Max","Smith","38"],
    ["Susann","Mayr Wan","44"]
  ]
}
```

## Example 6: List as input

In this example you can see that it is also possible to define a simple list as input.


```yaml
pipeline:

  - transform.csv.json:
      hasHeadersLine: false
      input: |
        row1
        row2
        row3
```

The output will look like this:

```json
{
  "columnsCount": 1,
  "rowsCount": 3,
  "rows": [
    ["row1"],
    ["row2"],
    ["row3"]
  ]
}
```