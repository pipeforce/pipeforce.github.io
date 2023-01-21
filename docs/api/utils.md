---
title: Built-In Utils Reference
sidebar_label: Built-In Utils
---

<!-- DO NOT EDIT THIS PAGE MANUALLY IT IS AUTO-GENERATED! CHANGES WILL BE LOST ON NEXT AUTO-GENERATION. -->
<!-- Generated: 21/01/2023 19:55:09 by CommandComplianceTest -->

Reference documentation of Built-In [Pipeline Expression Language (PEL)](pel) Utils.  



Example usage of the ``@date`` util inside a PEL expression :  
```yaml  
pipeline:  
  - log:  
      message: "The current date is: #{@date.now()}"  
```  

Use the [online workbench](https://try.pipeforce.org) to get auto-completion for Pipeline Utils:  

![](../img/workbench-completion-utils.png)  

## `@calc` 
----------  
Provides utility functions inside a pipeline expression for simple calculations of lists.  
You can access the functions declared here in the PEL using <code>@calc</code>  
Note: This is a public interface. Methods exposed here can be accessed by external developers in the pipelines!  

### sum(list)   
Does a "nice" sum the values of the given list with high precision.
If an item in the given list is a string, it will be tried
to convert it to a number. If the value is null or cannot be converted it will be excluded from
the summary but no exception is thrown -> be nice.   

#### Returns  
``bigdecimal`` - The sum of the given list.  

#### Parameters  
Name | Type | Description
--- | --- | ---
list | ``object`` | The list of numbers to sum-up. 


#### Example  
```  
@calc.sum(list)  
```  

### avg(list)   
Calculates the average on the value of given list with a precision of two decimal points.   

#### Returns  
``bigdecimal`` - The calculated AVG.  

#### Parameters  
Name | Type | Description
--- | --- | ---
list | ``object`` | The list of numbers. 


#### Example  
```  
@calc.avg(list)  
```  

### round(value,scale,mode)   
Rounds input to scale number of digits. Multiple rounding strategies can be applied.   

#### Returns  
``bigdecimal`` - The rounded value as BigDecimal.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The value to round. BigDecimal, double, float, integer and long are supported. 
scale | ``integer`` | The scale to round to. Positive value scales in fraction part, negative in integer. 
mode | ``string`` | One of UP, DOWN, CEILING, FLOOR, HALF_UP, HALF_DOWN, HALF_EVEN, UNNECESSARY can be used. For details              see https://docs.oracle.com/javase/7/docs/api/java/math/RoundingMode.html 


#### Example  
```  
@calc.round(value,scale,mode)  
```  

### roundUp(value,scale)   
Rounds input to scale number of digits up.
See also &lbrace;@link CalcPelUtil#round(Object, Integer, String)&rbrace; for more options.   

#### Returns  
``bigdecimal`` - The rounded value as BigDecimal.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The value to round. BigDecimal, double, float, integer and long are supported. 
scale | ``integer`` | The scale to round to. Positive value scales in fraction part, negative in integer. 


#### Example  
```  
@calc.roundUp(value,scale)  
```  

### roundDown(value,scale)   
Rounds input to scale number of digits down.
See also &lbrace;@link CalcPelUtil#round(Object, Integer, String)&rbrace; for more options.   

#### Returns  
``bigdecimal`` - The rounded value as BigDecimal.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The value to round. BigDecimal, double, float, integer and long are supported. 
scale | ``integer`` | The scale to round to. Positive value scales in fraction part, negative in integer. 


#### Example  
```  
@calc.roundDown(value,scale)  
```  

 
## `@content` 
----------  
Provides utility functions inside a pipeline expression for creation and managing of content objects.  
You can access the functions declared here in the PEL using <code>@content</code>  

### newCollection(uris)   
Creates a new content collection and initializes it with given uris.   

#### Returns  
``contentcollection`` - A content collection with given uris.  

#### Parameters  
Name | Type | Description
--- | --- | ---
uris | ``string`` | The list of content uris to add to the new collection. 


#### Example  
```  
@content.newCollection(uris)  
```  

### newCollection()   
Creates a new, empty content collection at given location.   

#### Returns  
``contentcollection`` - The new, empty content collection.  



#### Example  
```  
@content.newCollection()  
```  

### newContent(uri)   
Creates a new uri content object and returns it.   

#### Returns  
``icontent`` - The new content object.  

#### Parameters  
Name | Type | Description
--- | --- | ---
uri | ``string`` | The uri to be used for the content object 


#### Example  
```  
@content.newContent(uri)  
```  

 
## `@convert` 
----------  
Provides utility functions inside a pipeline expression for simple conversion and encoding tasks.  
You can access the functions declared here in the PEL using <code>@convert</code>  

### toBase64(value)   
Encodes the given value to base64. If value is not a text, it will be converted to a text before conversion.   

#### Returns  
``string`` - The encoded string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The value to encode. 


#### Example  
```  
@convert.toBase64(value)  
```  

### fromBase64(base64String)   
Decodes the given base64 encoded string.   

#### Returns  
``string`` - The decoded string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
base64String | ``string`` | The base64 encoded string. 


#### Example  
```  
@convert.fromBase64(base64String)  
```  

### fromBase64ToBytes(base64String)   
Decodes the given base64 encoded string.   

#### Returns  
``byte[]`` - The decoded string as byte array.  

#### Parameters  
Name | Type | Description
--- | --- | ---
base64String | ``string`` | The base64 encoded string. 


#### Example  
```  
@convert.fromBase64ToBytes(base64String)  
```  

### toJson(object)   
Converts a given object structure to JSON.   

#### Returns  
``jsonnode`` - The resulting JSON.  

#### Parameters  
Name | Type | Description
--- | --- | ---
object | ``object`` | The object to convert. 


#### Example  
```  
@convert.toJson(object)  
```  

### toXMLString(object)   
Converts a given object to an XML string.   

#### Returns  
``string`` - The resulting XML string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
object | ``object`` | The object to convert. 


#### Example  
```  
@convert.toXMLString(object)  
```  

### toDOM(object)   
Converts a given object to an XML DOM representation.   

#### Returns  
``document`` - The resulting DOM tree.  

#### Parameters  
Name | Type | Description
--- | --- | ---
object | ``object`` | The object to convert. 


#### Example  
```  
@convert.toDOM(object)  
```  

### toMap(object)   
Converts the given object to a map structure.   

#### Returns  
``map`` - The converted map structure or null in case input was null.  

#### Parameters  
Name | Type | Description
--- | --- | ---
object | ``object`` | The object to convert to a map structure. 


#### Example  
```  
@convert.toMap(object)  
```  

### toMapOrList(o)   
Converts the given object to a map or list structure depending on which is more appropriate.   

#### Returns  
``object`` - The converted map or list structure or null in case input was null.  

#### Parameters  
Name | Type | Description
--- | --- | ---
o | ``object`` | The object to convert to a map or list structure. 


#### Example  
```  
@convert.toMapOrList(o)  
```  

### lazy(uri)   
Converts all supported uri variants to LazyUriMap   

#### Returns  
``object`` - The lazy uri map.  

#### Parameters  
Name | Type | Description
--- | --- | ---
uri | ``string`` | The uri to load from. 


#### Example  
```  
@convert.lazy(uri)  
```  

### toLong(value)   
Converts the given value to a long value.
If input value is the boolean true or false, 1 or 0 as long is returned.
If input is the string "true" or "false, 1 or 0 as long is returned.
If input is empty string "", 0 is returned.   

#### Returns  
``long`` - The converted long value or null in case the input was null.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The value object to convert to long. 


#### Example  
```  
@convert.toLong(value)  
```  

### toInteger(value)   
Converts the given value to a long value.
If input value is the boolean true or false, 1 or 0 as int is returned.
If input is the string "true" or "false, 1 or 0 as int is returned.
If input is empty string "", 0 is returned.   

#### Returns  
``integer`` - The converted integer value or null in case the input was null.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The value object to convert to integer. 


#### Example  
```  
@convert.toInteger(value)  
```  

### toBoolean(value)   
Converts the given value to a boolean value.
If input is the string "true" or "false, true or false as boolean is returned.
If input is empty string "", false is returned.
If input is null, false is returned.
Any numeric value > 0, true is returned.
Any numeric value <= 0, false is returned.   

#### Returns  
``boolean`` - The converted boolean value.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The value object to convert to boolean. 


#### Example  
```  
@convert.toBoolean(value)  
```  

### toDecimal(value)   
Converts the given value into a big decimal with given precision.   

#### Returns  
``double`` - The decimal number as double.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The value to convert. 


#### Example  
```  
@convert.toDecimal(value)  
```  

### toDecimal(value,decimalSymbol)   
Converts the given value to a decimal number.   

#### Returns  
``bigdecimal`` - The value as decimal number ready for calculations.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The value to convert to decimal. 
decimalSymbol | ``string`` | The decimal symbol to be used. Can be a comma , a dot . or a locale tag like de,                      en, fr for example. If null or empty, the locale tag of the currently logged-in user is used.                      If this is null, locale tag de is used as default. 


#### Example  
```  
@convert.toDecimal(value,decimalSymbol)  
```  

### toDecimal(value,pattern,decimalSymbol)   
Converts the given value to a decimal number by applying the given pattern and locale.   

#### Returns  
``bigdecimal`` - The value as decimal number ready for calculations.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The value to convert to decimal. 
pattern | ``string`` | The decimal pattern to apply. For example: #.### 
decimalSymbol | ``string`` | The decimal symbol to be used. Can be a comma , a dot . or a locale tag like de,                      en, fr for example. If null or empty, the locale tag of the currently logged-in user is used.                      If this is null, locale tag de is used as default. 


#### Example  
```  
@convert.toDecimal(value,pattern,decimalSymbol)  
```  

### toDecimalString(value,pattern,decimalSymbol)   
Formats a given number to a decimal string using the given decimal pattern and
locale tag like de, en, fr aso.   

#### Returns  
``string`` - The decimal string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The decimal number to format to a string. 
pattern | ``string`` | The decimal pattern like #.## for example. 
decimalSymbol | ``string`` | The decimal symbol to be used. Can be a comma , a dot . or a locale tag like de,                      en, fr for example. If null or empty, the locale tag of the currently logged-in user is used.                      If this is null, locale tag de is used as default. 


#### Example  
```  
@convert.toDecimalString(value,pattern,decimalSymbol)  
```  

### toDecimalString(value,decimalSymbol)   
Formats a given number to a decimal string using the given locale tag like de, en, fr aso.   

#### Returns  
``string`` - The decimal string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The decimal number to format to a string. 
decimalSymbol | ``string`` | The decimal symbol to be used. Can be a comma , a dot . or a locale tag like de,                      en, fr for example. If null or empty, the locale tag of the currently logged-in user is used.                      If this is null, locale tag de is used as default. 


#### Example  
```  
@convert.toDecimalString(value,decimalSymbol)  
```  

 
## `@data` 
----------  
Provides utility functions inside a pipeline expression for simple CRUD and transformation data operations.  
You can access the functions declared here in the PEL using <code>@data</code>  

### set(data,path,value)   
Sets the given value on the given data object at the given element path where every item is separated by a dot.
If an item at the given path doesnt exist, it will be created automatically (is supported by given object).
For example to create a new entry person.name inside a given map, you could use:
<code>set(someMap, "person.name", "Some Name")</code>. This will create the nested map person with an entry of
type name in it.   

#### Returns  
``object`` - The data object with value set at the specific path.  

#### Parameters  
Name | Type | Description
--- | --- | ---
data | ``object`` | The data object. 
path | ``string`` | The path inside the data object to set the value. 
value | ``object`` | The value to set. 


#### Example  
```  
@data.set(data,path,value)  
```  

### put(map,key,value)   
Expects the given data to be map-like structure and puts the given value under given key to it.
Overwrites any existing entry under this key.   

#### Returns  
``object`` - The map like data structure with the new entry added.  

#### Parameters  
Name | Type | Description
--- | --- | ---
map | ``object`` | The map-like data structure. 
key | ``object`` | The key to add the value under. 
value | ``object`` | The value to add. 


#### Example  
```  
@data.put(map,key,value)  
```  

### select(input,selections)   
Applies the given selection string on the given input object in order to extract
data from the input object. If there is more than one selection string, puts the
result of each string into a new map entry whereas the key is the selection string
or the name from the "AS NAME" suffix (note the upper case AS). Examples of selection strings:
<ul>
     <li>'person.firstName' = Extracts the firstName from the input object and returns the result as a
     entry in the mapping using the key 'person.firstName'. If it is the only selection string, returns the
     value directly.</li>
    <li>'person.firstName AS name' = Extracts the firstName from the input object and returns the result as a
    entry in the mapping using the key 'name'</li>
    <li>'person.hobbies.size()' = Extracts the number of hobbies from the input object and returns the result as a
    entry in the mapping using the key 'person.hobbies.size()'. If it is the only selection string, returns the
    value directly.</li>
    <li>'person.hobbies.size() AS numOfHobbies' = Extracts the number of hobbies from the input object and returns
    the result as an entry in the mapping using the key 'numOfHobbies'</li>
</ul>   

#### Returns  
``object`` - The extracted data.  

#### Parameters  
Name | Type | Description
--- | --- | ---
input | ``object`` | The input to apply the selection strings on. May not be null. 
selections | ``string`` | One or more selection strings. If null or empty, returns an empty map. 


#### Example  
```  
@data.select(input,selections)  
```  

### integerList(startInt,endInt)   
Creates a new list and fills it with integers from startIndex up to endIndex.
For example a call of createListWithIntegers(2, 5) would return a list with these entries:
[2,3,4,5].   

#### Returns  
``list<integer>`` - A list of given size filled-up with digits.  

#### Parameters  
Name | Type | Description
--- | --- | ---
startInt | ``int`` | The start index to fill the list. 
endInt | ``int`` | The end index to fill the list up to. 


#### Example  
```  
@data.integerList(startInt,endInt)  
```  

### size(value)   
Calculates the size of the given value regardless of the type it is.   

#### Returns  
``long`` - The size of the value. Returns a size of 0 in case the input value is null or cannot be counted.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The value to count for size. 


#### Example  
```  
@data.size(value)  
```  

### isEmpty(data)   
Checks if given data structure is null or empty.
For example:
<ul>
    <li>If it is a list, returns true in case the list contains no entry or is null.</li>
    <li>If it is a map, returns true in case the map contains no entry or is null.</li>
    <li>If it is a node, returns true in case the node contains no entry or is null.</li>
    <li>If it is a string, returns true in case the string contains no chars or is null.</li>
</ul>   

#### Returns  
``boolean`` - true in case the given list is null or empty.  

#### Parameters  
Name | Type | Description
--- | --- | ---
data | ``object`` | The data structure to check. 


#### Example  
```  
@data.isEmpty(data)  
```  

### has(data,attribute)   
Checks whether given data object has an attribute, member or getter with given name.   

#### Returns  
``boolean`` - true in case the data object has given attribute.  

#### Parameters  
Name | Type | Description
--- | --- | ---
data | ``object`` | The data object to scan for attribute. 
attribute | ``string`` | The attribute name to search for. 


#### Example  
```  
@data.has(data,attribute)  
```  

 
## `@date` 
----------  
Provides utility functions inside a pipeline expression for simple date and time handling.  
You can access the functions declared here in the PEL using <code>@date</code>  

### now()   
Returns the current time at server side formatted using the preferred zone and locale of the currently logged-in user.   

#### Returns  
``string`` - A formatted date time string.  



#### Example  
```  
@date.now()  
```  

### nowIso8601()   
Returns the current time at server side formatted using the ISO8601 time format.   

#### Returns  
``string`` - Current date and time formatted as ISO8601. For example: <code>2021-05-30T17:30:00+02:00</code>  



#### Example  
```  
@date.nowIso8601()  
```  

### now(format)   
Returns the current time at server side formatted using the preferred zone and locale of the currently logged-in user.   

#### Returns  
``string`` - A formatted date time string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
format | ``string`` | The format pattern like dd.MM.YY HH:mm:ss for example. 


#### Example  
```  
@date.now(format)  
```  

### now(zoneId,locale)   
Returns the current time for the given zone and formats it using the default format of the given locale.   

#### Returns  
``string`` - The formatted date time string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
zoneId | ``string`` | The zoneId to be used. See http://www.iana.org/time-zones for official reference of these names. 
locale | ``string`` | The locale to be used. 


#### Example  
```  
@date.now(zoneId,locale)  
```  

### guessAndFormat(dateTimeString,outputFormat)   
Tries to guess the given date time string format, converts it internally to a date-time object
and formats it finally to a string output using the given output format pattern.   

#### Returns  
``string`` - The formatted date time string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
dateTimeString | ``string`` | The date-time string as input. 
outputFormat | ``string`` | The output format pattern. 


#### Example  
```  
@date.guessAndFormat(dateTimeString,outputFormat)  
```  

### format(inputDate,inputFormat,outputFormat)   
Converts a given date string using the given inputFormat and converts it to the given outputFormat.   

#### Returns  
``string`` - The formatted date time string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
inputDate | ``string`` | The input date string. 
inputFormat | ``string`` | The input format pattern. 
outputFormat | ``string`` | The output format pattern. 


#### Example  
```  
@date.format(inputDate,inputFormat,outputFormat)  
```  

### format(iso8601Date,format)   
Converts a given ISO-8061 date string to a different format and returns it.
For example: An input date of "2030-01-10T20:00:00Z" with format of "dd.MM.yyyy" would result in "01.10.2030".   

#### Returns  
``string`` - The formatted date time string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
iso8601Date | ``string`` | The ISO-8061 formatted date to convert. 
format | ``string`` | The format pattern. 


#### Example  
```  
@date.format(iso8601Date,format)  
```  

### format(timestamp,format)   
Converts a given unix timestamp to a formatted date time string and returns it.   

#### Returns  
``string`` - The formatted date time string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
timestamp | ``long`` | The unix timestamp in millis to format. 
format | ``string`` | The format pattern. 


#### Example  
```  
@date.format(timestamp,format)  
```  

### year(dateString)   
Tries to guess and extract the year of the given date string. This is not always working 100% since
the date formats can vary a lot.   

#### Returns  
``string`` - The guessed year from the given string like 2012 for example.  

#### Parameters  
Name | Type | Description
--- | --- | ---
dateString | ``string`` | A date string like 31.02.2012, 31.02.12, 2012/01/31, 31-01-12, 31-01-2012, 2012-01-31 23:59:59,                   or 2001-07-04T12:08:56.235-0700. 


#### Example  
```  
@date.year(dateString)  
```  

### timestamp()   
Returns the current unix timestamp in millis.   

#### Returns  
``long`` - The current timestamp in millis.  



#### Example  
```  
@date.timestamp()  
```  

### isExpired(iso8601Start,iso8601End,expiredInPercents)   
Returns true, if the given amount of time is already expired.
Lets see this example: Given is a starttime of 1st January, 2020 an endttime of
11th January, 2020 and an expiredInPercents of 0,7 (70%). In this case the method would return
true on 9th of January, 2020 but false on 3rd of January, 2020.
Also see &lbrace;@link DateTimeUtil#isExpired(Instant, Instant, float)&rbrace;.   

#### Returns  
``boolean`` - true, if the given amount of time is already expired.  

#### Parameters  
Name | Type | Description
--- | --- | ---
iso8601Start | ``object`` | The start time for the time range in ISO-8601 format. 
iso8601End | ``object`` | The endtime for the time range in ISO-8601 format. 
expiredInPercents | ``float`` | The percentage as float (e.g. 0,9 = 90%), the range is already expired. 


#### Example  
```  
@date.isExpired(iso8601Start,iso8601End,expiredInPercents)  
```  

### isExpired(iso8601Start,iso8601End,expiredInPercents,currentDate)   
Returns true, if the given amount of time is already expired.
Lets see this example: Given is a starttime of 1st January, 2020 an endttime of
11th January, 2020 and an expiredInPercents of 0,7 (70%). In this case the method would return
true on 9th of January, 2020 but false on 3rd of January, 2020.
Also see &lbrace;@link DateTimeUtil#isExpired(Instant, Instant, float)&rbrace;.   

#### Returns  
``boolean`` - true, if the given amount of time is already expired.  

#### Parameters  
Name | Type | Description
--- | --- | ---
iso8601Start | ``object`` | The start time for the time range in ISO-8601 format. 
iso8601End | ``object`` | The endtime for the time range in ISO-8601 format. 
expiredInPercents | ``float`` | The percentage as float (e.g. 0,9 = 90%), the range is already expired. 
currentDate | ``object`` | The current date, the calculation must use. 


#### Example  
```  
@date.isExpired(iso8601Start,iso8601End,expiredInPercents,currentDate)  
```  

### isOverdue(dueDate,currentDate)   
Returns true in case if dueDate > currentDate.   

#### Returns  
``boolean`` - true in case the give current date is overdue.  

#### Parameters  
Name | Type | Description
--- | --- | ---
dueDate | ``object`` | The due after overdue is true. 
currentDate | ``object`` | The current date. 


#### Example  
```  
@date.isOverdue(dueDate,currentDate)  
```  

### isOverdue(dueDate)   
Returns true in case if dueDate > currentDate.
For currentDate the current date and time from the system is used.   

#### Returns  
``boolean`` - true in case the give current date is overdue.  

#### Parameters  
Name | Type | Description
--- | --- | ---
dueDate | ``object`` | The due after overdue is true. 


#### Example  
```  
@date.isOverdue(dueDate)  
```  

### parseToInstant(dateTime)   
Parses the given date time object to an instant date time object.   

#### Returns  
``instant`` - The instant parsed from the given date time object.  

#### Parameters  
Name | Type | Description
--- | --- | ---
dateTime | ``object`` | The date time object to be parsed. 


#### Example  
```  
@date.parseToInstant(dateTime)  
```  

### beginOfYear(yearOffset)   
Returns the epoch timestamp in millis of the beginning of the year relative to current year
with respect of the user's preference for time zone.
For example to get the timestamp of the beginning of the current year,
you would set yearOffset=0. To get the beginning timestamp of
last year, you would set yearOffset=-1. To get the beginning timestamp of
next year, you would set yearOffset=1.   

#### Returns  
``long`` - The beginning of the year relative to current year as epoch millis,
with hours, minutes, seconds and millis reset to 0.  

#### Parameters  
Name | Type | Description
--- | --- | ---
yearOffset | ``int`` | The years to be added (positive value) or subtracted (negative value) from current year. 


#### Example  
```  
@date.beginOfYear(yearOffset)  
```  

### beginOfYear(timestamp,yearOffset)   
Returns the epoch timestamp in millis of the beginning of the year relative to given timestamp
with respect of the user's preference for time zone.
For example to get the timestamp of the beginning of the current year,
you would set timestamp=null, yearOffset=0. To get the beginning timestamp of
last year, you would set timestamp=null, yearOffset=-1. To get the beginning timestamp of
next year, you would set timestamp=null, yearOffset=1.   

#### Returns  
``long`` - The beginning of the year relative to given timestamp as epoch millis,
with hours, minutes, seconds and millis reset to 0.  

#### Parameters  
Name | Type | Description
--- | --- | ---
timestamp | ``long`` | The epoch millis to calculate the beginning of the year from.                   If null, the current timestamp will be used. 
yearOffset | ``int`` | The years to be added (positive value) or subtracted (negative value) from given year. 


#### Example  
```  
@date.beginOfYear(timestamp,yearOffset)  
```  

### beginOfMonth(monthOffset)   
Returns the epoch timestamp in millis of the beginning of the month relative to current month
with respect of the user's preference for time zone.
For example to get the timestamp of the beginning of the current month,
you would set monthOffset=0. To get the beginning timestamp of
last month, you would set monthOffset=-1. To get the beginning timestamp of
next month, you would set monthOffset=1.   

#### Returns  
``long`` - The beginning of the month relative to current month as epoch millis,
with hours, minutes, seconds and millis reset to 0.  

#### Parameters  
Name | Type | Description
--- | --- | ---
monthOffset | ``int`` | The months to be added (positive value) or subtracted (negative value) from current month. 


#### Example  
```  
@date.beginOfMonth(monthOffset)  
```  

### beginOfMonth(timestamp,monthOffset)   
Returns the epoch timestamp in millis of the beginning of the month relative to given timestamp
with respect of the user's preference for time zone.
For example to get the timestamp of the beginning of the current month,
you would set timestamp=null, monthOffset=0. To get the beginning timestamp of
last month, you would set timestamp=null, monthOffset=-1. To get the beginning timestamp of
next month, you would set timestamp=null, monthOffset=1.   

#### Returns  
``long`` - The beginning of the month relative to given timestamp as epoch millis,
with hours, minutes, seconds and millis reset to 0.  

#### Parameters  
Name | Type | Description
--- | --- | ---
timestamp | ``long`` | The epoch millis to calculate the beginning of the month from.                    If null, the current timestamp will be used. 
monthOffset | ``int`` | The months to be added (positive value) or subtracted (negative value) from given month. 


#### Example  
```  
@date.beginOfMonth(timestamp,monthOffset)  
```  

### beginOfWeek(weekStartDay,weekOffset)   
Returns the epoch timestamp in millis of the beginning of the week relative to current week
with respect of the user's preference for time zone.
For example to get the timestamp of the beginning of the current week with Monday as start day,
you would set weekStartDay=1, weekOffset=0. To get the beginning timestamp of
last week, you would set weekStartDay=1, weekOffset=-1. To get the beginning timestamp of
next week, you would set weekStartDay=1, weekOffset=1.   

#### Returns  
``long`` - The beginning of the week relative to current week as epoch millis,
with hours, seconds and millis reset to 0.  

#### Parameters  
Name | Type | Description
--- | --- | ---
weekStartDay | ``integer`` | The start day of the week as int from Monday(1) to Sunday(7).                     If null or negative, Monday(1) is used. 
weekOffset | ``int`` | The weeks to be added (positive value) or subtracted (negative value) from current week. 


#### Example  
```  
@date.beginOfWeek(weekStartDay,weekOffset)  
```  

### beginOfWeek(timestamp,weekStartDay,weekOffset)   
Returns the epoch timestamp in millis of the beginning of the week relative to given timestamp
with respect of the user's preference for time zone.
For example to get the timestamp of the beginning of the current week with Monday as start day,
you would set timestamp=null, weekStartDay=null, weekOffset=0. To get the beginning timestamp of
last week, you would set timestamp=null, weekStartDay=null, weekOffset=-1. To get the beginning timestamp of
next week, you would set timestamp=null, weekStartDay=null, weekOffset=1.   

#### Returns  
``long`` - The beginning of the week relative to given timestamp as epoch millis, with hours, seconds
and millis reset to 0.  

#### Parameters  
Name | Type | Description
--- | --- | ---
timestamp | ``long`` | The epoch millis to calculate the beginning of the week from.                     If null, the current timestamp will be used. 
weekStartDay | ``integer`` | The start day of the week as int from Monday(1) to Sunday(7).                     If null or negative, Monday(1) is used. 
weekOffset | ``int`` | The weeks to be added (positive value) or subtracted (negative value) from given week.                     If you would like to know the start date of the week before for example,                     you would set this to -1. And for two weeks before you would set it to -2, aso.                     And to detect the beginning  of the week of the given timestamp, you would set it to 0. 


#### Example  
```  
@date.beginOfWeek(timestamp,weekStartDay,weekOffset)  
```  

### beginOfDay(dayOffset)   
Returns the epoch timestamp in millis of the beginning of the day relative to current day
with respect of the user's preference for time zone.
For example to get the timestamp of the beginning of the current day,
you would set dayOffset=0. To get the beginning timestamp of
yesterday, you would set dayOffset=-1. To get the beginning timestamp of
tomorrow, you would set dayOffset=1.   

#### Returns  
``long`` - The beginning of the day relative to given current day as epoch millis,
with hours, seconds and millis reset to 0.  

#### Parameters  
Name | Type | Description
--- | --- | ---
dayOffset | ``int`` | The days to be added (positive value) or subtracted (negative value) from current day. 


#### Example  
```  
@date.beginOfDay(dayOffset)  
```  

### beginOfDay(timestamp,dayOffset)   
Returns the epoch timestamp in millis of the beginning of the day relative to given timestamp
with respect of the user's preference for time zone.
For example to get the timestamp of the beginning of the current day,
you would set timestamp=null, dayOffset=0. To get the beginning timestamp of
yesterday, you would set timestamp=null, dayOffset=-1. To get the beginning timestamp of
tomorrow, you would set timestamp=null, dayOffset=1.   

#### Returns  
``long`` - The beginning of the day relative to given timestamp as epoch millis,
with hours, seconds and millis reset to 0.  

#### Parameters  
Name | Type | Description
--- | --- | ---
timestamp | ``long`` | The epoch millis to calculate the beginning of the day from.                  If null, the current timestamp will be used. 
dayOffset | ``int`` | The days to be added (positive value) or subtracted (negative value) from given day. 


#### Example  
```  
@date.beginOfDay(timestamp,dayOffset)  
```  

 
## `@property` 
----------  
Provides functions inside a pipeline expression in order to read properties from the property store.  
You can access the functions declared here in the PEL using <code>@property</code>  

### value(key)   
Returns the property value by given key from the property store.   

#### Returns  
``object`` - The value of the property with given key or null in case property doesnt exist or has null value.  

#### Parameters  
Name | Type | Description
--- | --- | ---
key | ``string`` | The property key 


#### Example  
```  
@property.value(key)  
```  

### values(pattern)   
Returns the values of all properties matching the given key pattern.   

#### Returns  
``list<object>`` - A list of values of all properties matching the given key pattern.  

#### Parameters  
Name | Type | Description
--- | --- | ---
pattern | ``string`` | The property key pattern to match. 


#### Example  
```  
@property.values(pattern)  
```  

### updateValue(key,value)   
Updates the value of a property under given key.   

#### Returns  
void  

#### Parameters  
Name | Type | Description
--- | --- | ---
key | ``string`` | The key of the property to update. 
value | ``object`` | The value of the property to update. 


#### Example  
```  
@property.updateValue(key,value)  
```  

### get(key)   
Returns the property with given key as object.   

#### Returns  
``property`` - The property with given key or null in case no such property has been found.  

#### Parameters  
Name | Type | Description
--- | --- | ---
key | ``string`` | The property key. 


#### Example  
```  
@property.get(key)  
```  

### lazy(key)   
Returns the value of the property as a &lbrace;@link LazyUriMap&rbrace; map in case the result
is a JSON document or its fragment. If uri fragment references leaf, primitive value is returned.
In all other cases an exception is thrown.
Fragment part of uri is evaluated as a SPEL against property value.   

#### Returns  
``object`` - The lazy map.  

#### Parameters  
Name | Type | Description
--- | --- | ---
key | ``string`` | The property key with optional fragment reference in form 'global/pathsegment1/pathsegment...#fragment' 


#### Example  
```  
@property.lazy(key)  
```  

 
## `@resolve` 
----------  
Provides utility functions inside a pipeline expression for simple uri resolving.  
You can access the functions declared here in the PEL using <code>@uri</code>  

### uri(uri)   
Resolves the given uri to its object representation. Supported uri schemes:
<ul>
    <li><code>uri:user:</code>Resolves to an user object.</li>
    <li><code>uri:pipeline:</code>Resolves the given path, pointing to a persisted pipeline, executes it
    and returns the body result.</li>
    <li><code>uri:property:</code> Resolves the given property key path and returns it from the storage.</li>
</ul>   

#### Returns  
``object`` - The object representation of the uri.  

#### Parameters  
Name | Type | Description
--- | --- | ---
uri | ``string`` | The uri to be resolved. 


#### Example  
```  
@resolve.uri(uri)  
```  

 
## `@uri` 
----------  
Provides utility functions inside a pipeline expression for simple uri resolving.  
You can access the functions declared here in the PEL using <code>@uri</code>.  
Note: This function library is deprecated. Use <code>@resolve</code> instead!  

### resolve(uri)   
Note: This function is deprecated. Use `@resolve.uri` instead.   

#### Returns  
``object`` - The object representation of the uri.  

#### Parameters  
Name | Type | Description
--- | --- | ---
uri | ``string`` | The uri to be resolved. 


#### Example  
```  
@uri.resolve(uri)  
```  

 
## `@user` 
----------  
Provides utility functions inside a pipeline expression for simple handling of the currently logged-in user.  
You can access the functions declared here in the PEL using <code>@user</code>  

### username()   
Returns the username of the currently logged-in user.   

#### Returns  
``string`` - The username of the user.  



#### Example  
```  
@user.username()  
```  

### uuid()   
Returns the uuid of the logged-in user.   

#### Returns  
``string`` - The uuid of the user.  



#### Example  
```  
@user.uuid()  
```  

### hasPermission(permissionKeys)   
Returns true in case the logged-in user has at least one of the listed permission.   

#### Returns  
``boolean`` - true in case the currently logged-in user has the permisson.  

#### Parameters  
Name | Type | Description
--- | --- | ---
permissionKeys | ``string`` | A list of permission keys (roles) to check for. 


#### Example  
```  
@user.hasPermission(permissionKeys)  
```  

### displayName()   
Returns the default display name of the logged-in user which is the first non-empty value of:
firstName lastName, email, uuid. Note: Doesn't return the username for security reasons.   

#### Returns  
``string`` - The display name.  



#### Example  
```  
@user.displayName()  
```  

### emailAndDisplayName(object)   
Returns the email and default display name of the given user object or empty string if
no such value exists.   

#### Returns  
``string`` - The email and display name in the format email@domain.tld (FirstName LastName).  

#### Parameters  
Name | Type | Description
--- | --- | ---
object | ``object`` | The user object to extract email and displayName from. 


#### Example  
```  
@user.emailAndDisplayName(object)  
```  

### emailAndDisplayName()   
Returns the email and default display name of the currently logged-in user object or empty string if
no such value exists.   

#### Returns  
``string`` - The email and display name in the format email@domain.tld (FirstName LastName).  



#### Example  
```  
@user.emailAndDisplayName()  
```  

### displayName(object)   
Tries to dynamically create a meaningful display name out of the given user object.
This user object can be of different format. The method tries to
automatically detect it and creates the displayName from it. If this
was not possible for some reason, an empty string is returned.   

#### Returns  
``string`` - The display name.  

#### Parameters  
Name | Type | Description
--- | --- | ---
object | ``object`` | The user object. 


#### Example  
```  
@user.displayName(object)  
```  

### email()   
Returns the primary email address of the currently logged-in user.   

#### Returns  
``string`` - The email address as string.  



#### Example  
```  
@user.email()  
```  

### email(object)   
Tries to detect the email from the given object.   

#### Returns  
``string`` - The email address as string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
object | ``object`` | An object like a user or a JSON containing an email property. 


#### Example  
```  
@user.email(object)  
```  

### locale()   
Returns the locale of the logged in user or null in case not set or could not be determined.   

#### Returns  
``string`` - The lower case locale (for example: de, en, fr, ...)  



#### Example  
```  
@user.locale()  
```  

### firstName()   
Returns the first name of the logged in user.   

#### Returns  
``string`` - The first name.  



#### Example  
```  
@user.firstName()  
```  

### lastName()   
Returns the last name of the logged in user   

#### Returns  
``string`` - The last name.  



#### Example  
```  
@user.lastName()  
```  

### loggedIn()   
Returns true in case the current user is authenticated (logged-in).   

#### Returns  
``boolean`` - true, in case authenticated.  



#### Example  
```  
@user.loggedIn()  
```  

### zone()   
Returns the preferred zoneId of the currently logged-in user or null in case none was set.
The preferred zone is usually set in the users profile or by the client in use (e.g. the browser).
See &lbrace;@link ZoneId#getAvailableZoneIds()&rbrace; and here: http://www.iana.org/time-zones   

#### Returns  
``string`` - The zone as string.  



#### Example  
```  
@user.zone()  
```  

 

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::