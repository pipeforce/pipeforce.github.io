# XML to JSON Transformer

The transformer command `transform.xml.json` expects a XML document or string which complies with the [W3C XML](https://www.w3.org/TR/xml/) standard in the body or as `input` parameter of the command and converts it to a JSON document which can then be used for further processing.

See the [commands reference](../../api/commands#transformxmljson-v1) for details about the available parameters of this command.

It's also possible to convert a JSON document back to XML using the `transform.json.xml` command.

See the [commands reference](../../api/commands#transformjsonxml-v1) for details about the available parameters of this command.

## Introduction

Conversion from XML to JSON is not so straight forwards as it seems to, since there are some special cases which must 
be treated well in the conversion step. For example:

 - XML supports [mixed content](https://www.w3.org/TR/xml/#sec-mixed-content), JSON not
 - XML has [processing instructions](https://www.w3.org/TR/xml/#sec-pi), JSON not
 - XML has [namespaces](https://www.w3.org/TR/xml-names/), JSON not
 - XML has [attributes](https://www.w3.org/TR/xml/#attdecls), JSON not
 - XML has [CDATA](https://www.w3.org/TR/xml/#sec-cdata-sect), JSON not
 - XML allows [comments](https://www.w3.org/TR/xml/#sec-comments), JSON not

At the other hand:

 - JSON differentiates between objects, arrays with primitives and arrays with objects, XML has no concept of "arrays"
 - JSON allows an array or an object with multiple entries to be the root element, XML allows only a single element to be the root
 - JSON supports data types, XML not (by default all is string)

## XML to JSON

Having said that, there is no "default" way of converting from XML to JSON and back, since all libraries avialable support the differences mentioned above only partially and/or handle them differently.

Therfore, PIPEFORCE has defined a system wide "default" how to convert from XML to JSON and back in order to support most concepts from both worlds. In the table below you can see what is supported:

Feature | XML to JSON | JSON to XML
--- | --- | ---
XML elements | yes | yes
XML attributes | yes | yes
XML mixed content | yes | yes
XML processing instructions | yes | yes
XML namespaces in elements | yes | yes
XML namespaces in attributes | yes | yes
XML CDATA | no | no
XML comments | no | no
JSON objects | n/a | yes
JSON array of objects | n/a | yes
JSON array of primitives | n/a | yes
JSON data types | n/a | no

This table explains whether it is possible to keep information on transformation between the two formats when using the PIPEFORCE default format.

### XML elements

An XML element like this:

```xml
<root/>
```
will by default be converted to a JSON structure like this:

```json
{
  "root:" {
    "attributes":[],
    "children":[]
  }
}
```

Even if there are no `attributes` and no `children`, those entries **must exist** in the JSON document with an **empty array** declaration. The `null` value is not allowed here.

This is in order to make it easier for later processing and to automatically detect, whether it is a default PIPEFORCE format.

Furthermore there is only one JSON object allowed in the first level, similar to XML.

If there are nested XML elements, they will be placed inside the `children` section. For example, this:

```xml
<person>
  <firstName/>
</person>
```

will be converted to this JSON with nested elements:

```json
{
  "person:" {
    "attributes":[],
    "children":[
      "firstName:" {
        "attributes":[],
        "children":[]
      }
    ]
  }
}
```

### XML attributes

An XML elenent with an attribute like this:

```xml
<person age="23"/>
```

will be converted to a JSON structure like this:

```json
{
  "person:" {
    "attributes":[ {"age": "23"} ],
    "children":[]
  }
}
```

### Text content

An XML element with text content like this:

```xml
<person>
  <firstName>Max</firstName>
</person>
```

will be converted to this JSON structure:

```json
{
  "person:" {
    "attributes":[],
    "children":[
      "firstName:" {
        "attributes":[],
        "children":["Max"]
      }
    ]
  }
}
```

As you can see, the `children` array can contain both: text content and elements.

### Mixed content

In XML it is possible to mix XML elements with text content which could look like this:

```xml
<text>This is a <b>bold</b> formatted word.</text>
```

This will be converted to JSON like this:

```json
{
  "text": {
    "attributes": {},
    "children": [
      "This is a ",
      {
        "b": {
          "attributes": {},
          "children": ["bold"]
        }
      },
      " formatted word."
    ]
  }
}
```

### Namespaces

In XML there is the concept of [namespaces](https://www.w3.org/TR/xml-names/). This allows to extend XML structures by other, custom structures.

An XML document with a custom namespace could be look like this:

```xml
<foo:person xmlns:foo="http://some.ns">
  <foo:firstName foo:age="23"/>
</foo:person>
```

As you can see, all elements and attributes are bound to the namespace here using the prefix `foo`.

If you convert this with the default XML to JSON transformation rules, you will get a JSON like this:

```json
{
  "foo:person": {
    "attributes": {
      "xmlns:foo": "http://some.ns"
    },
    "children": [
      {
        "foo:firstName": {
          "attributes": {
            "foo:age": "23"
          },
          "children": []
        }
      }
    ]
  }
}
```

### Processing instructions

XML documents can contain [processing instructions](https://www.w3.org/TR/xml/#sec-pi) in the prologue like this:

```xml
<?someInstruction someParams?>
<root/>
```

This will be converted to a JSON like this:

```json
{
  "processing-instructions": {
    "someInstruction": "someParams"
  },
  "root": {
    "attributes": {},
    "children": []
  }
}
```

## JSON to XML

If the JSON document is in the default XML-JSON transformation format (contains `attributes` and `children` elements), then it will be transformed to XML using the default transformation rules, explained above.

Otherwise, in case the starting point is a custom JSON document which doesn't comply with the default XML-JSON transformation rules, the conversion will be differently.

A JSON document like this:

```json
{
  "person": {
    "firstName": "Max"
  }
}
```

will be converted to this XML:

```xml
<root>
  <person>
    <firstName>Max</firstName>
  </person>
</root>
```

A JSON document with an array in it, could look like this:

```json
{
  "person": {
    "firstName": "Max",
    "hobbies": ["Reading", "Binking", "Swiming"]
  }
}
```

This will be converted to an XML structure like this:

```xml
<root>
  <person>
    <firstName>Max</firstName>
    <hobbies>Reading</hobbies>
    <hobbies>Binking</hobbies>
    <hobbies>Swiming</hobbies>
  </person>
</root>
```