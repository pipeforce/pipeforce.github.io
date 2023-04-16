---
id: basics

title: Lists Basics
sidebar_label: Basics
slug: /lists-basics
---

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 5.0</p>

A list in PIPEFORCE is a client side view component which renders a given JSON structure returned by a pipeline as HTML table. The pipeline can collect data from any combination of different locations and returns this data consolidated as JSON array to the list component at client side which finally renders it to a HTML table:

![](../../img/list-pipeline.png)

In order to display such a list in PIPEFORCE, you have to create two JSON documents:

 - **JSON schema**: Defines the columns of the table. For example the header, the data type and the conversion rules if required. This document is typically located at `$APP_HOME/object/$TYPE/v1/schema.json`.
 - **List configuration**: Defines where to load the JSON data for the list from. This document is typically located at `$APP_HOME/list/$TYPE.json`.

After these two JSON documents have been created, the list is shown in the app view as list tile. When clicking this tile, the list will be loaded.

See the [list tutorial](/docs/tutorials/40_create-list.md) to practise these steps.

## JSON Schema

The JSON schema configures how the columns must be displayed in the list. It is a JSON document which follows the schema specification from [json-schema.org](https://json-schema.org/specification.html).

Such a JSON Schema is typically located in the property store at `$APP_HOME/object/$TYPE/v1/schema.json` whereas `$APP_HOME` stands for the home path of your app and `$TYPE` stands for the JSON object type your schema describes. For example: `global/myapp/object/person/v1/schema.json`.

Here is a simpe example of a person object described as Schema schema:

```json
{
	"type": "object",
	"properties": {
		"firstName": {
			"title": "First Name",
			"type": "string",
			"description": "This is the first name of the person."
		},
		"lastName": {
			"title": "Last Name",
			"type": "string",
			"description": "This is the last name of the person."
		},
		"age": {
			"title": "Age",
			"type": "number",
			"description": "This is the age of the person."
		},
		"gender": {
			"title": "Gender",
			"type": "string",
			"description": "This is the gender of the person.",
      "enum": ["Female", "Male"]
		}
	}
}
```
 
Each entry in this Schema Schema defines a single column in the list. Therefore finally we expect to have these columns with headers:



For more information about JSON schema, also have a look at section [JSON Schema](/docs/guides/propertystore/schema-and-objects) of the docs.




## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::