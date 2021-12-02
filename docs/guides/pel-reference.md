# PEL Utils Reference

The PEL Utils is a powerful library of built-in utility methods which can be used inside a Pipeline Expression (PE) to simplify work. The libraries cover typical day-to-day flows and logics as simple helpers which are embedded into the PE.

**Note**: In order to understand PEL Utils you should have at least basic knowledge about the [Pipeline Expression Language (PEL)](https://logabit.atlassian.net/wiki/spaces/DEVEX/pages/2151287454).

# Using a PEL Util

The structure of calling a PEL Util inside a pipeline looks like this:

```
#{ @utilName.method(args) } 
```

Replace `utilName` by the name of the utility and `method` by the function/method you want to call. See the documentation of the utility which parameters/arguments are supported.

Lets take a look on this example how to embed the PEL util `@date` inside a pipeline:

```
pipeline:
  - log: 
      message: "Today is: #{@date.now('dd.MM.YYYY')}"
```

The output of this example into the log would be this:

```
Today is: 12.08.2020
```

Another example is to detect the language of a given text automatically using the PEL util @text:

```
vars:
  text: "Guten Tag, Frau Meier"
pipeline:
  - log: 
      message: "#{@text.lang(vars.text)}"
```

The output of this example into the log would be this:

```
GERMAN
```

## Auto-completion in the Online Workbench

Only: ENTERPRISE, CORPORATE

When using the low code editor of the online workbench in the web UI, you can get auto-completion support. Whenever you are inside a pipeline expression indicated by a starting `#{` you can type `@` + Ctrl + Space and you will get a list of all available PEL utils. For example:

![](https://logabit.atlassian.net/wiki/download/attachments/2151287481/grafik-20210731-110329.png?api=v2)

After you have selected a util you can browse the available methods of the util by typing a period `.` + Ctrl + Space:

![](https://logabit.atlassian.net/wiki/download/attachments/2151287481/grafik-20210731-110434.png?api=v2)

After running the pipeline, the output would be similar to this:

![](https://logabit.atlassian.net/wiki/download/attachments/2151287481/grafik-20210731-111041.png?api=v2)

# PEL Utils Reference

Here you can find a list of all built-in PEL utils ready to be used out-of-the box.

**Note**: Utils functions marked with PREVIEW are not officially released yet and only here for preview and trial purposes. They can change without any notice. So be careful using them in production.

## @calc

This utility provides utility methods for simple mathematical/calculation tasks.

### @calc.avg(list)

Calculates the average based on the given list of input values.

|     |     |
| --- | --- |
| Parameter: `list` | A list of numbers (integers or floats) to calculate the AVG from. In case the elements in the list are no number types it is tried to automatically convert them to a number. |
| Returns | Returns AVG of the given list of numbers. |

#### Example 1

```
vars:
  ageList: "35, 89, 12, 56, 78, 23"
pipeline:
  - log: 
      message: "Average age: #{@calc.avg(vars.ageList)}"
```

Output:

```
Average age: 48.84
```

### @calc.sum(list)

Calculates the sum based on the given list of input values.

|     |     |
| --- | --- |
| Parameter: `list` | A list of numbers (integers or floats) to calculate the sum from. In case the elements in the list are no number types it is tried to automatically convert them to a number. |
| Returns | Returns the sum of the given list of numbers. |

#### Example 1

```
vars:
  numbers: "10, 10, 10, 10"
pipeline:
  - log: 
      message: "The sum is: #{@calc.sum(vars.numbers)}"
```

Output:

```
The sum is: 40
```

## @convert

This util provides methods to convert and encode/decode data from one format to another.

### @convert.toBase64(object)

Converts the given plain text or byte array to a base64 encoded text.

Learn more about base64: [https://en.wikipedia.org/wiki/Base64](https://en.wikipedia.org/wiki/Base64)

Note: base64 encoding is not an encryption! If you need to encrypt data, use the encrypt commands.

|     |     |
| --- | --- |
| Parameter: `rawText or byte array` | The content to base64 encode. |
| Returns | The base64 encoded `rawText` or null in case `rawText` was null. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@convert.toBase64('Hello World!')}"
```

Output:

```
SGVsbG8gV29ybGQh
```

### @convert.fromBase64(base64Text)

Converts the given base64 encoded text back to the original value.

Learn more about base64: [https://en.wikipedia.org/wiki/Base64](https://en.wikipedia.org/wiki/Base64)

Note: base64 encoding is not an encryption! If you need to encrypt data, use the encrypt commands.

|     |     |
| --- | --- |
| Parameter: `base64Text` | The text to decode from base64 to the original value. |
| Returns | The base64 decoded `base64Text` or null in case `base64Text` was null. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@convert.fromBase64('SGVsbG8gV29ybGQh')}"
```

Output:

```
Hello World!
```

### @convert.fromBase64ToBytes(base64Text)

Converts the given base64 encoded text back to the original value and returns it as a byte array.

Learn more about base64: [https://en.wikipedia.org/wiki/Base64](https://en.wikipedia.org/wiki/Base64)

Note: base64 encoding is not an encryption! If you need to encrypt data, use the encrypt commands.

|     |     |
| --- | --- |
| Parameter: `base64Text` | The text to decode from base64 to the original value. |
| Returns | The base64 decoded `base64Text` as byte array or null in case `base64Text` was null. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@convert.fromBase64ToBytes('SGVsbG8gV29ybGQh')}"
```

Output:

```
[H,e,l,l,o, ,W,o,r,l,d,!]
```

### @convert.lazy(uri) PREVIEW

Loads the content of the given content uri as a lazy map.

|     |     |
| --- | --- |
| Parameter: `uri` | The the content uri of the content to be loaded. |
| Returns | A map which lazy loads its content when accessed. This is especially useful for huge documents like JSON in order to lazy load them. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@convert.lazy('uri:user:username=someUser')}"
```

Output:

```
id: "34ec9dcd-896c-45c8-bc13-d0085d22e193"
username: "someUser"
firstName: myFirstName
lastName: myLastName
email: "some@email.tld"
emailVerified: true
attributes: null
locale: null
displayName: "someUser"
emailAndDisplayName: "some@email.tld (myFirstName myLastName)"
```

### @convert.toJson(jsonString)

Converts the given JSON string to a JSON node object required by some other utilities.

|     |     |
| --- | --- |
| Parameter: `jsonString` | The JSON string to convert to JSON node |
| Returns | A JSON node object or null in case the input was null. Throws error in case the given `jsonString` is invalid. |

### @convert.toMap(object)

Tries to convert the given object to a map.

|     |     |
| --- | --- |
| Parameter: `object` | An object which can be converted to a map. For example a JSON document. |
| Returns | The converted map. Throws exception in case the object could not be converted to map. |

## @date

This util is for date and time formatting and calculations.

### @date.format(dateTime, pattern)

Formats the given `dateTime` string using the given `pattern`.

|     |                                                                                                                                                                                                                                                                                                                                                                                                  |
| --- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Parameter: `dateTime` | The date and time string to be formatted. Must be in a valid ISO-8601 format. For example: `2030-01-10T20:00:00Z`.  <br/>See here for a documentation of this ISO format:  <br/>[https://en.wikipedia.org/wiki/ISO\_8601](https://en.wikipedia.org/wiki/ISO_8601)                                                                                                                                |
| Parameter: `pattern` | The pattern to be used to format the given date and time. Throws an error in case the pattern has an invalid format. For a full reference of all possible patterns, see here:  <br/>[https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/DateTimeFormatter.html](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/DateTimeFormatter.html) |
| Returns | The value of `dateTime` formatted using the given pattern.                                                                                                                                                                                                                                                                                                                                       |

#### Example 1

```
pipeline:
  - log: 
      message: "Date: #{@date.format('2030-01-10T20:00:00Z', 'dd.MM.YYYY')}"
```

Output:

```
Date: 10.01.2030
```

### @date.isExpired(start, end, percentage, \[currentDate\])

Returns `true` in case the given amount of percentage in given time range is already expired.

This method is useful if you want to measure whether a given amount of time inside a time frame has been already expired.

For example if you want to send a reminder email to a user in case a given amount of time has been expired within a given time frame: User registered at `1st January, 2020` and timeout of registration token is `11th January, 2020` so you will remind him after `70%` (0.7) has been expired without finishing the registration. Then, this method would help to determine whether to send such a reminder, since it returns `true` on `9th of January, 2020` but `false` on `3rd of January, 2020`.

|     |                                                                                                                                                                                                                        |
| --- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Parameter: `start` | The start date in ISO-8601 format. For example: `2030-01-10T20:00:00Z`.  <br/>See here for a documentation of this ISO format:  <br/>[https://en.wikipedia.org/wiki/ISO\_8601](https://en.wikipedia.org/wiki/ISO_8601) |
| Parameter: `end` | The end date in ISO-8601 format. For example: `2030-01-10T20:00:00Z`.  <br/>See here for a documentation of this ISO format:  <br/>[https://en.wikipedia.org/wiki/ISO\_8601](https://en.wikipedia.org/wiki/ISO_8601)   |
| Parameter: `percentage` | The expired amount as percentage in float (0.7 = 70%).                                                                                                                                                                 |
| Parameter: `currentDate` | Optional parameter of the current date to be used for the calculation. Can be a ISO-8061 string or unix epoch timestamp in millis. If null, the current date of the server will be used.                               |
| Returns | true in case the amount of time has been expired within compared with current time.                                                                                                                                    |

#### Example 1

```
pipeline:
  - log: 
      message: "Date: #{@date.isExpired('2030-01-01T20:00:00Z', '2030-01-10T20:00:00Z', 0.7)}"
```

Output:

```
false
```

### @date.isOverdue(dueDate \[, currentDate\])

Returns true in case the current date is after the given due date.

|     |     |
| --- | --- |
| Parameter: `dueDate` | The due date as ISO-8061 string or unix epoch timestamp in millis. |
| Parameter: `currentDate` | The current date to be used for the calculation as ISO-8061 string or unix epoch timestamp in millis. If null, the current date of the server will be used. |
| Returns | True if currentDate is after dueDate. |

#### Example 1

```
pipeline:
  - log: 
      message: "Date: #{@date.isOverdue('2010-01-01T20:00:00Z')}"
```

Output:

```
true
```

### @date.now(pattern)

Gets the current server time and formats it using the given format pattern.

|     |                                                                                                                                                                                                                                                                                                                                                                                                    |
| --- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Parameter: `pattern` | The pattern to be used to format the current date and time. Throws an error in case the pattern has an invalid format. For a full reference of all possible patterns, see here:  <br/>[https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/DateTimeFormatter.html](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/DateTimeFormatter.html) |
| Returns | The date and time formatted using the given pattern.                                                                                                                                                                                                                                                                                                                                               |

#### Example 1

```
pipeline:
  - log: 
      message: "Current date: #{@date.now('dd.MM.YYYY')}"
```

Output:

```
Current date: 01.03.2020
```

#### Example 2

```
pipeline:
  - log: 
      message: "Current date: #{@date.now('dd.MM.YYYY, HH:mm')}"
```

Output:

```
Current date: 01.03.2020, 23:11
```

### @date.timestamp()

Returns the time in milliseconds since 01.01.1970 (also known as “unix epoch”).

|     |     |
| --- | --- |
| Returns | Returns the time in milliseconds since 01.01.1970 (also known as “unix timestamp”). |

#### Example 1

```
pipeline:
  - log: 
      message: "Timesmap: #{@date.timestamp()}"
```

Output:

```
Timestamp: 246668400000
```

## @instance

An util which returns information about the instance this pipeline is currently running on.

### @instance.domain()

The domain name, this instance is currently running at.

|     |     |
| --- | --- |
| Returns | Returns the domain name this instance is currently running under. This is usually `pipeforce.net`. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@instance.domain()}"
```

Output:

```
pipeforce.net
```

### @instance.namespace()

The namespace, this instance is currently running at.

|     |     |
| --- | --- |
| Returns | Returns the namespace this instance is currently running under. This is usually your company name. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@instance.namespace()}"
```

Output:

```
acme
```

### @instance.url(\[serviceName\])

Returns the instance url to the given service.

|     |     |
| --- | --- |
| Parameter: `serviceName` | The optional service name to return the url for. For example: hub, drive or portal. If null or empty, returns the home url of the instance. |
| Returns | The base url to the given service. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@instance.url('drive')}"
```

Output:

```
https://drive-acme.pipeforce.net
```

#### Example 2

```
pipeline:
  - log: 
      message: "#{@instance.url()}"
```

Output:

```
https://acme.pipeforce.net
```

## @list

This util helps in handling lists.

### @list.add(list, element) PREVIEW

Adds the given element at the end of the given list.

|     |     |
| --- | --- |
| Parameter: `list` | A list-type data structure. Can be a collection, list, array, JSON array or a comma separated list for example. |
| Parameter: `element` | The element to be added to the given list. |
| Returns | `void` |

#### Example 1

```
vars:
  names: "Megan, Sharol, Sabine, Claudia"
pipeline:
  - log: 
      message: "#{@list.add(vars.names, 'Herbert')}"
```

Output:

```
- "Megan"
- "Sharol"
- "Sabine"
- "Claudia"
- "Herbert"
```

### @list.contains(list, needle)

Returns true in case `value` is a list and contains `needle` as entry.

|     |     |
| --- | --- |
| Parameter: `list` | A list-type data structure. Can be a collection, list, array, JSON array or a comma separated list for example. |
| Parameter: `needle` | The entity to search for inside of value. |
| Returns | `true` in case needle could be found inside value. Returns `false` if not or if value is not a list structure. |

#### Example 1

```
vars:
  names: "Megan, Sharol, Sabine, Claudia"
pipeline:
  - log: 
      message: "Lilly in list? #{@list.contains(vars.names, 'Lilly')}"
```

Output:

```
Lilly in list? false
```

### @list.empty(value)

Returns the true in case the given `value` is null or empty.

|     |     |
| --- | --- |
| Parameter: `value` | A list-type data structure. Can be a collection, list, array, JSON array or a comma separated list for example. |
| Returns | `true` in case value is null or empty. Empty means the list structure contains no entries. |

#### Example 1

```
vars:
  names: "Megan, Sharol, Sabine, Claudia"
pipeline:
  - log: 
      message: "Empty: #{@list.empty(vars.names)}"
```

Output:

```
Empty: false
```

### @list.first(value)

Returns the first element of the given list value.

|     |     |
| --- | --- |
| Parameter: `value` | A list-type data structure. Can be a collection, list, array, JSON array or a comma separated list for example. |
| Returns | The very first element in the list or null in case value is not a list or is empty. |

#### Example 1

```
vars:
  names: "Megan, Sharol, Sabine, Claudia"
pipeline:
  - log: 
      message: "#{@list.first(vars.names)}"
```

Output:

```
Megan
```

### @list.last(value)

Returns the last element from the given list.

|     |     |
| --- | --- |
| Parameter: `value` | A list-type data structure. Can be a collection, list, array, JSON array or a comma separated list for example. |
| Returns | The last element from the given list or `null` in case the list is empty, null or is no list structure. |

#### Example 1

```
vars:
  names: "Megan, Sharol, Sabine, Claudia"
pipeline:
  - log: 
      message: "Last: #{@list.last(vars.names)}"
```

Output:

```
Last: Claudia
```

### @list.size(value)

Returns the number of entries in the given list.

|     |     |
| --- | --- |
| Parameter: `value` | A list-type data structure. Can be a collection, list, array, JSON array or a comma separated list for example. |
| Returns | The length of the given list or `0` in case it is empty, `null` or not a list structure. |

#### Example 1

```
vars:
  names: "Megan, Sharol, Sabine, Claudia"
pipeline:
  - log: 
      message: "Size: #{@list.size(vars.names)}"
```

Output:

```
Size: 4
```

### @list.sublist(value, expression)

Returns a sublist from `value` based on the given `expression`.

|     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Parameter: `value` | A list-type data structure. Can be a collection, list, array, JSON array or a comma separated list for example.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Parameter: expression | An expression which defines the sublist to return. Possible values are:<br/><br/>*   `last` - Returns the last element of the list.<br/>    <br/>*   `first` - Returns the first element of the list.<br/>    <br/>*   `START:END` - Returns a new sublist from START index (inclusive) up to END index (inclusive).<br/>    <br/>*   `START:` - Returns a new sublist from START index (inclusive) up to the end of the list.<br/>    <br/>*   `:END` - Returns a new sublist from 0 up to given END index (inclusive). |
| Returns | The sublist as described by the expression or `null` in case `value` is `null`, is not a list structure or `expression` is not valid.                                                                                                                                                                                                                                                                                                                                                                                    |

#### Example 1

```
vars:
  names: "Megan, Sharol, Sabine, Claudia"
pipeline:
  - log: 
      message: "Result: #{@list.sublist(var.names, 'last')}"
```

Output:

```
Result: Claudia
```

#### Example 2

```
vars:
  names: "Megan, Sharol, Sabine, Claudia"
pipeline:
  - log: 
      message: "Result: #{@list.sublist(var.names, '1:2')}"
```

Output:

```
Result: Sharol, Sabine
```

#### Example 3

```
vars:
  names: "Megan, Sharol, Sabine, Claudia"
pipeline:
  - log: 
      message: "Result: #{@list.sublist(var.names, ':2')}"
```

Output:

```
Result: Megan, Sharol, Sabine
```

#### Example 4

```
vars:
  names: "Megan, Sharol, Sabine, Claudia"
pipeline:
  - log: 
      message: "Result: #{@list.sublist(var.names, '2:')}"
```

Output:

```
Result: Sabine, Claudia
```

## @path

The util helps to create and change paths.

### @path.basename(path)

Returns the base name of a path or filename without extension.

|     |                                                                                                                                                                                                                                      |
| --- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Parameter: `path` | The path string. For example `/foo/bar/file.txt`                                                                                                                                                                                     |
| Returns | The basename of the path which is the filename without any extension. Examples:<br/><br/>*   `/foo/bar/file → file`<br/>    <br/>*   `/foo/bar/file.txt → file`<br/>    <br/>*   `/foo/bar/ → ““`<br/>    <br/>*   `file.txt → file` |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@path.basename('/foo/bar/invoice.pdf')}"
```

Output:

```
invoice
```

### @path.extension(path)

Returns the extension of the file inside the given path.

|     |                                                                                                                                                                                                         |
| --- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Parameter: `path` | The path string. For example `/foo/bar/file.txt`                                                                                                                                                        |
| Returns | The extension of the file inside the path. Examples:<br/><br/>*   `/foo/bar/file → ""`<br/>    <br/>*   `/foo/bar/file.txt → .txt`<br/>    <br/>*   `/foo/bar/ → ""`<br/>    <br/>*   `file.txt → .txt` |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@path.extension('/foo/bar/invoice.pdf')}"
```

Output:

```
pdf
```

### @path.join(items)

Concatenates (joins) all items of the given list into a path string.

Converts every character to lower case. In case text is null or empty, returns the text without any change.

|     |     |
| --- | --- |
| Parameter: `items` | A list-type data structure. Can be a collection, list, array, JSON array or a comma separated list for example. If an entry in the items is a list-type data structure it will be flattened and also added to the path. |
| Returns | All entries in the items list combined to a path. Returns an empty string if items is null or empty or not a list structure. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@path.join('my', '///super', 'folder')}"
```

Output:

```
my/super/folder
```

## @property

This util helps to access the Property Store.

### @property.get(key)

Returns the property from Property Store with given `key`.

|     |     |
| --- | --- |
| Parameter: `key` | The key of the property. Can be absolute like `/pipeforce/namespace/global/settings/color` or absolute inside the current namespace like `global/settings/color`. |
| Returns | The property with given key or `null` if such a property doesn't exist. |

#### Example 1

```
pipeline:
  - log: 
      message: "Color: #{@property.get('global/settings/color').value}"
```

Output:

```
Color: green
```

### @property.lazy(key) PREVIEW

Returns the value of the property with given key as a lazy map.

|     |     |
| --- | --- |
| Parameter: `key` | The key of the property. Can be absolute like `/pipeforce/namespace/global/settings/color` or absolute inside the current namespace like `global/settings/color`. |
| Returns | The value of the given property as a lazy loading map. |

### @property.value(key)

Returns the value of the property with given key.

|     |     |
| --- | --- |
| Parameter: `key` | The key of the property. Can be absolute like `/pipeforce/namespace/global/settings/color` or relative inside the current namespace like `global/settings/color`. |
| Returns | The value of the given property. If the value is a JSON, automatically converts it to a map structure before returning it so you can apply data operations directly on it. |

#### Example 1

```
pipeline:
  - log: 
      message: "Color: #{@property.value('global/settings/color')}"
```

Output:

```
Color: green
```

#### Example 2:

Access the property of a JSON directly after loading it:

```
pipeline:
  - log: 
      message: "Email address: #{@property.value('global/person').email}"
```

Output:

```
Email address: some@email.tld
```

## @text

This util is handy for many string/text operations and calculations.

### @text.append(basetext, text)

Appends the given text at the end of the given base text.

|     |     |
| --- | --- |
| Parameter: `basetext` | The base text. |
| Parameter: `text` | The text to append to the base text. |
| Returns | Returns basetext and text concatenated. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.append('Hello ', 'World')}"
```

Output:

```
Hello World
```

#### Example 2

```
pipeline:
  - log: 
      message: "#{@text.append(null, 'World')}"
```

Output:

```
World
```

In this example you can see that only non-null values are appended. So you do not need to check for null by yourself here.

### @text.concat(separator, list)

Concats the values of the given list using the given separator.

|     |     |
| --- | --- |
| Parameter: `separator` | The separator. For example a comma `,` |
| Parameter: `list` | Can be any type of list, array or comma separated string. |
| Returns | The elements of the list concatenated by the given separator. |

#### Example 1

```
vars:
  items: "Sun, Moon, Stars"
pipeline:
  - log: 
      message: "#{@text.concat(' + ', var.items)}"
```

Output:

```
Sun + Moon + Stars
```

### @text.concatAndFormat(separator, list, pel)

Similar to `@text.concat(separator, list)`. Additionally applies the given PEL to each entry in the list before concatenating. This is very helpful if you want to format each entry before concatenation. For example change cases, additionally concatenate, resolve values and more.

|     |     |
| --- | --- |
| Parameter: `separator` | The separator. For example a comma `,` |
| Parameter: `list` | Can be any type of list, array or comma separated string. |
| Parameter: `pel` | A pipeline expression to be applied on each entry. The result will used for the concatenation. |
| Returns | The elements of the list concatenated by the given separator. |

#### Example 1

```
vars:
  items: "#{{
      {firstName: 'Bart', lastName: 'Simpson'},
      {firstName: 'Bugs', lastName: 'Bunny'}
    }}"
pipeline:
  - log:        
      message: |
        #{@text.concatAndFormat(', ', vars.items, 'firstName + ":" + lastName.toUpperCase()')}
```

Output:

```
Bart:Simpson, Bugs:Bunny
```

As you can see, in this example from a nested JSON format, firstName and lastName has been concatenated by a colon : and the lastName additionally has been converted to upper case. After this the values had been finally concatenated by a comma. So quite a lot of things in just a line of code.

### @text.contains(value, needle)

Checks whether given value contains the given needle text, ignoring case. Furthermore value can be null so no additional null check required.

|     |     |
| --- | --- |
| Parameter: `value` | The text value to use to check whether it contains the needle text. If value is not a string, it will be converted to such before checking. |
| Parameter: `needle` | The text to find inside value. |
| Returns | Returns `true` in case the value contains text (case insensitive). |

#### Example 1

```
vars:
  items: "Sun, Moon, Stars"
pipeline:
  - log: 
      message: "#{@text.contains(var.items, 'stars')}"
```

Output:

```
true
```

### @text.isEmpty(value)

Checks, whether the given text is empty.

|     |     |
| --- | --- |
| Parameter: `value` | The text to use to check whether it is empty. |
| Returns | Returns `true` in case the text is `null` or empty (contains no character ““). |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.isEmpty('')}"
```

Output:

```
true
```

### @text.lang(value)

Detects the language of the string given by argument text and returns the key of the detected language.

|     |                                                                                                                                                                                     |
| --- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Parameter: `value` | The text to use for language detection.                                                                                                                                             |
| Returns | One of the supported language keys like `GERMAN`, `FRENCH` or `ENGLISH`.  <br/>In case the language for the given text is null, empty or cannot be detected, `UNKNOWN` is returned. |

More languages uppon request. Please contact our supprort team if you need support for differnet languages.

#### Example 1

```
vars:
  text: "Guten Tag, Frau Meier"
pipeline:
  - log: 
      message: "#{@text.lang(vars.text)}"
```

Output:

```
GERMAN
```

#### Example 2

```
vars:
  text: "'Un texte en français"
pipeline:
  - log: 
      message: "#{@text.lang(vars.text)}"
```

Output:

```
FRENCH
```

### @text.length(value)

Returns the length of the given `value` (the number of character including white spaces and special characters).

|     |     |
| --- | --- |
| Parameter: `value` | The text to check for length. |
| Returns | The number of characters in given text or `0` in case the text is empty or null. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.length('HELLO')}"
```

Output:

```
5
```

### @text.lowerCase(value)

Converts every character to lower case. In case text is null or empty, returns the text without any change.

|     |     |
| --- | --- |
| Parameter: `value` | The text to convert to lower case. |
| Returns | All characters of the text, converted to lower case. If input text is null or empty, this value will be returned unchanged. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.lowerCase('HELLO')}"
```

Output:

```
hello
```

### @text.lowerCaseFirst(value)

Converts the very first character to lower case. In case text is null or empty, returns the text without any change.

|     |     |
| --- | --- |
| Parameter: `value` | The text those first char to convert to lower case. |
| Returns | The text with first character converted to lower case. If input text is null or empty, this value will be returned unchanged. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.lowerCaseFirst('HELLO')}"
```

Output:

```
hELLO
```

### @text.prefix(text, stopWord)

Returns the part of text up to first occurrence of stopWord. So for example with a text of `foo.bar` and a stopWord of `.` this would return `foo`.

|     |     |
| --- | --- |
| Parameter: `text` | The text to search for the first occurrence of `stopWord` and those sub-string up to this word is then returned. |
| Parameter: `stopWord` | The string to define the stop of the search. |
| Returns | The subtext of text up to the first occurrence of stopWord. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.prefix('invoice.pdf', '.')}"
```

Output:

```
invoice
```

### @text.random(length)

Creates a random text of given length.

If you need a universal unique id with very low probability for collisions, look for @text.uuid() instead.

|     |     |
| --- | --- |
| Parameter: `value` | The length of the random text to be created. |
| Returns | An alphanumeric random text of given size. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.random(10)}"
```

Output:

```
q2le7hg2zs
```

### @text.shorten(value, length)

In case the given text is longer than length, shortens it and adds three dots … at the end.

|     |     |
| --- | --- |
| Parameter: `value` | The text to shorten. |
| Parameter: `length` | The max. length of the text. |
| Returns | The text unchanged if it is smaller than length. Otherwise shortened at position length + three dots: … |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.shorten('HELLO WORLD', 6)}"
```

Output:

```
HELLO ...
```

### @text.trim(value)

Removes any leading and ending whites pace and line feeds from the given text.

|     |     |
| --- | --- |
| Parameter: `value` | The text to be trimmed. |
| Returns | The text without any leading and ending white spaces or line feeds. In case input text was null or empty it will be returned without changes. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.trim('  hello  ')}"
```

Output:

```
hello
```

### @text.upperCase(value)

Converts any character in the text to upper case.

|     |     |
| --- | --- |
| Parameter: `value` | The text to convert to upper case. |
| Returns | The text with all characters converted to upper case. In case input text was null or empty it will be returned without changes. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.upperCase('hello')}"
```

Output:

```
HELLO
```

### @text.upperCaseFirst(value)

Converts the first character in the text to upper case.

|     |     |
| --- | --- |
| Parameter: `value` | The text those first character to convert to upper case. |
| Returns | The text with first character converted to upper case. In case input text was null or empty it will be returned without changes. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.upperCaseFirst('hello')}"
```

Output:

```
Hello
```

### @text.uuid()

Creates a new unique universally identifier (UUID) an returns it as text. A UUID is a hexadecimal string with very low probability to be in collision with other UUIDs. You can use it for example for unique links or to put unique reference ids on objects.

See here about UUID: [https://de.wikipedia.org/wiki/Universally\_Unique\_Identifier](https://de.wikipedia.org/wiki/Universally_Unique_Identifier)

|     |     |
| --- | --- |
| Returns | Creates an returns a new UUID as hexadecimal string. |

#### Example 1

```
pipeline:
  - log: 
      message: "#{@text.uuid()}"
```

Output:

```
550e8400-e29b-11d4-a716-446655440000
```

@user PREVIEW
-------------

This util provides utility methods to access the currently logged-in user.

### @user.displayName(\[userData\]) PREVIEW

Returns the display name of the given user which is by default `user@email.de (FirstName LastName`)

|     |     |
| --- | --- |
| Parameter: `userData` | An object which identifies an user. This can be of an username string, an authentication object or a representation object. The function tries to automatically detect it and to create a display name out of it. If not possible or object is null, an empty string (version >= 7.0) or null (version < 6.0) is returned. This parameter is optional. If not set, the currently logged-in user is used. |
| Returns | The display name of the logged in user or `null` (< version 7.0) or empty string (>= version 7.0) in case no user is logged in. |

#### Example 1

```
pipeline:
  - log: 
      message: "Your are logged-in as: #{@user.displayName()}"
```

Output:

```
You are logged-in as: admin@email.de (Sam Miller)
```

### @user.email() PREVIEW

Returns the primary email address of the currently logged-in user.

|     |     |
| --- | --- |
| Returns | The email of the currently logged-in user or null if no user is currently logged-in. |

#### Example 1

```
pipeline:
  - log: 
      message: "Your email is: #{@user.email()}"
```

Output:

```
Your email is: admin@email.de
```

### @user.firstName() PREVIEW

Returns the first name of the currently logged-in user.

|     |     |
| --- | --- |
| Returns | The first name of the currently logged-in user or null if no user is currently logged-in. |

#### Example 1

```
pipeline:
  - log: 
      message: "Your first name: #{@user.firstName()}"
```

Output:

```
Your first name: Sam
```

### @user.lastName() PREVIEW

Returns the last name of the currently logged-in user.

|     |     |
| --- | --- |
| Returns | The last name of the currently logged-in user or null if no user is currently logged-in. |

#### Example 1

```
pipeline:
  - log: 
      message: "Your last name: #{@user.lastName()}"
```

Output:

```
Your last name: Miller
```

### @user.locale() PREVIEW

Returns the locale of the currently logged-in user.

|     |     |
| --- | --- |
| Returns | The locale of the currently logged-in user or null if no user is currently logged-in. Example locales: `DE`, `EN`, `US`, `FR`. |

#### Example 1

```
pipeline:
  - log: 
      message: "Your locale is: #{@user.locale()}"
```

Output:

```
Your locale is: DE
```

### @user.uuid() PREVIEW

Returns the unique id of the currently logged-in user.

|     |     |
| --- | --- |
| Returns | The unique id of the currently logged-in user or null if no user is currently logged-in. |

#### Example 1

```
pipeline:
  - log: 
      message: "Your user id is: #{@user.uuid()}"
```

Output:

```
Your user id is: 550e8400-e29b-11d4-a716-446655440000
```

### @user.username() PREVIEW

Returns the username of the currently logged-in user.

|     |     |
| --- | --- |
| Returns | The username of the currently logged-in user or null if no user is currently logged-in. |

#### Example 1

```
pipeline:
  - log: 
      message: "Your are logged-in as: #{@user.username()}"
```

Output:

```
You are logged-in as: admin
```
