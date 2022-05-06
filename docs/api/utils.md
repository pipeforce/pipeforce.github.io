---
title: PEL Utils Reference
sidebar_label: PEL Utils
---

<!-- DO NOT EDIT THIS PAGE MANUALLY IT IS AUTO-GENERATED! CHANGES WILL BE LOST ON NEXT AUTO-GENERATION. -->
<!-- Generated: 06/05/2022 18:44:26 by CommandComplianceTest -->

Reference documentation of [Pipeline Expression Language (PEL)](pel) utils (PEL Utils).  



Example usage of the ``@date`` util inside a PEL expression :  
```yaml  
pipeline:  
  - log:  
      message: "The current date is: #{@date.now()}"  
```  

Use the [online workbench](https://try.pipeforce.org) to get auto-completion for PEL utils:  

![](../img/workbench-completion-utils.png)  

##  @calc 
----------  
Provides utility functions inside a pipeline expression for simple calculations of lists.
You can access the functions declared here in the PEL using <code>@calc</code>  

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

 
##  @content 
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

 
##  @convert 
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

 
##  @data 
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

 
##  @date 
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
dateString | ``string`` | A date string like 31.02.2012, 31.02.12, 2012/01/31, 31-01-12, 31-01-2012, 2012-01-31 23:59:59,
                  or 2001-07-04T12:08:56.235-0700. 


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

 
##  @format 
----------  
Provides utility functions inside a pipeline expression for formatting values.  

### decimal(value,pattern)   
Formats the given number as decimal.   

#### Returns  
``string`` - The formatted string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The number to format. 
pattern | ``string`` | The pattern to be applied. 


#### Example  
```  
@format.decimal(value,pattern)  
```  

### decimal(value)   
Formats the given number as decimal.
Uses as default the 0.00 format pattern.   

#### Returns  
``string`` - The formatted string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | The number to format. 


#### Example  
```  
@format.decimal(value)  
```  

 
##  @iam 
----------  
Provides utility functions inside a pipeline expression for accessing IAM information.
You can access the functions declared here in the PEL using <code>@iam</code>  

### userByUuid(userUuid)   
Returns the user by given uuid or null in case no such user exists.   

#### Returns  
``user`` - The user with given uuid or null.  

#### Parameters  
Name | Type | Description
--- | --- | ---
userUuid | ``string`` | The uuid of the user. 


#### Example  
```  
@iam.userByUuid(userUuid)  
```  

### userByUsername(username)   
Returns the user by given username or null in case no such user exists.   

#### Returns  
``user`` - The user with given username or null.  

#### Parameters  
Name | Type | Description
--- | --- | ---
username | ``string`` | The username of the user. 


#### Example  
```  
@iam.userByUsername(username)  
```  

### userByEmail(email)   
Returns the user by given email or null in case no such user exists.   

#### Returns  
``user`` - The user with given email or null.  

#### Parameters  
Name | Type | Description
--- | --- | ---
email | ``string`` | The email of the user. 


#### Example  
```  
@iam.userByEmail(email)  
```  

 
##  @instance 
----------  
Provides utility functions inside a pipeline expression to return information about the current instance.
You can access the functions declared here in the PEL using <code>@instance</code>  

### domain()   
Returns the domain, this hub instance is currently running in. For example: pipeforce.net   

#### Returns  
``string`` - The domain name of this instance.  



#### Example  
```  
@instance.domain()  
```  

### namespace()   
Returns the namespace, this hub instance is currently running in. For example: latest   

#### Returns  
``string`` - The namespace of this instance.  



#### Example  
```  
@instance.namespace()  
```  

### url(serviceName)   
Returns the full url for a given service in the current namespace. For example:
a call with 'workflow' could return 'http://workflow-myamespace.pipeforce.net' depending
on the namespace and domain configured for this instance.   

#### Returns  
``string`` - The full url of the service.  

#### Parameters  
Name | Type | Description
--- | --- | ---
serviceName | ``string`` | The PIPEFORCE service name. 


#### Example  
```  
@instance.url(serviceName)  
```  

### url()   
Returns the base url of the instance. For example: https://acme.pipeforce.net.   

#### Returns  
``string`` - The base url of this instance.  



#### Example  
```  
@instance.url()  
```  

### profiles()   
The active profiles this instance is tagged with to run as.   

#### Returns  
``list<string>`` - The active profiles as a list or empty list. Never null.  



#### Example  
```  
@instance.profiles()  
```  

### stage()   
Returns the stage the instance is running in.   

#### Returns  
``string`` - The stage. Usually this is one of local, dev, qa, prod.  



#### Example  
```  
@instance.stage()  
```  

### version()   
Returns the version number of this instance.   

#### Returns  
``string`` - The version number.  



#### Example  
```  
@instance.version()  
```  

### build()   
Returns the build ID of this instance.   

#### Returns  
``string`` - The build ID.  



#### Example  
```  
@instance.build()  
```  

### edition()   
Returns edition of this instance.   

#### Returns  
``string`` - The edition name.  



#### Example  
```  
@instance.edition()  
```  

### storage()   
Returns the storage info reserved for this instance (hub service).   

#### Returns  
``string`` - The storage for the hub service.  



#### Example  
```  
@instance.storage()  
```  

### tag()   
Returns the full build tag of this instance.   

#### Returns  
``string`` - The full build tag.  



#### Example  
```  
@instance.tag()  
```  

### uptime()   
Returns the uptime of this instance. Note: Since PIPEFORCE is a clustered environment,
update of a single hub service and the cluster could differ.   

#### Returns  
``long`` - The uptime of this instance (hub service).  



#### Example  
```  
@instance.uptime()  
```  

 
##  @json 
----------  
Provides addon functions inside a pipe expression in order to read and change JSON documents.
You can access the functions declared here in the PEL using <code>@json</code>  

### load(source)   
Loads the given source and converts it into a JSONful data object.   

#### Returns  
``jsonnode`` - The content data behind the source, converted to a JSONful data object.  

#### Parameters  
Name | Type | Description
--- | --- | ---
source | ``object`` | The JSON source to load. 


#### Example  
```  
@json.load(source)  
```  

### path(json,query)   
Applies a given JsonPath query to the given json object and returns the result.
Learn more about the JsonPath syntax: https://goessner.net/articles/JsonPath/   

#### Returns  
``object`` - The result from the JsonPath query.  

#### Parameters  
Name | Type | Description
--- | --- | ---
json | ``object`` | The JSON object to apply the query to. 
query | ``string`` | The query to be applied. 


#### Example  
```  
@json.path(json,query)  
```  

 
##  @list 
----------  
Provides utility functions inside a pipeline expression for simple lists handling.
You can access the functions declared here in the PEL using <code>@list</code>  

### first(value)   
Returns the first element in list.   

#### Returns  
``object`` - The first element from list or null in case list is null or empty.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | Any supported list object. 


#### Example  
```  
@list.first(value)  
```  

### last(value)   
Returns the last element in list.   

#### Returns  
``object`` - The last element from list or null in case list is null or empty.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | Any supported list object. 


#### Example  
```  
@list.last(value)  
```  

### size(list)   
Returns the size of the given list.
DEPRECATED. Use ``@data.size(...)`` instead.   

#### Returns  
``int`` - The size of the list. 0 in case list is null or unknown type.  

#### Parameters  
Name | Type | Description
--- | --- | ---
list | ``object`` | The list. 


#### Example  
```  
@list.size(list)  
```  

### empty(list)   
Checks if given list is null or empty.
DEPRECATED. Use ``@data.isEmpty(...)`` instead.   

#### Returns  
``boolean`` - true in case the given list is null or empty.  

#### Parameters  
Name | Type | Description
--- | --- | ---
list | ``object`` | The list to check. 


#### Example  
```  
@list.empty(list)  
```  

### sublist(value,expression)   
Utility to get a subset from a list using a list expression. Examples:
<ul>
    <li>last - Returns the last element in the list.</li>
    <li>first - Returns the first element in the list.</li>
    <li><code>START:END</code> - Returns all elements as a sublist from START (inclusive) up to the
    given END (inclusive).</li>
    <li><code>INDEX:</code> - Returns all elements as a sublist from INDEX (inclusive) up to the
    end of the list.</li>
    <li><code>:INDEX</code> - Returns all elements as a sublist from 0 up to INDEX (inclusive).</li>
</ul>   

#### Returns  
``object`` - The sublist.  

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``object`` | Any list object. 
expression | ``string`` | The list expression. 


#### Example  
```  
@list.sublist(value,expression)  
```  

### add(list,element)   
Appends the given element to the end of the given list.
This method is useful in case the list implementation is not clear since
this method can detect it (for example whether it is a collection or a JSON array).
By default doesn't add null items.   

#### Returns  
``collection`` - The input list with new element or a new list in case the input list was unmodifiable.  

#### Parameters  
Name | Type | Description
--- | --- | ---
list | ``object`` | The list to append to. 
element | ``object`` | The element to append. 


#### Example  
```  
@list.add(list,element)  
```  

### add(list,element,ignoreNulls)   
Appends the given element to the end of the given list.
This method is useful in case the list implementation is not clear since
this method can detect it (for example whether it is a collection or a JSON array).   

#### Returns  
``collection`` - The input list with new element or a new list in case the input list was unmodifiable.  

#### Parameters  
Name | Type | Description
--- | --- | ---
list | ``object`` | The list to append to. 
element | ``object`` | The element to append. 
ignoreNulls | ``boolean`` | If true, null items will not be added. 


#### Example  
```  
@list.add(list,element,ignoreNulls)  
```  

### contains(list,needles)   
Searches the given list for the given needle.   

#### Returns  
``boolean`` - True if list contains at least one of needle items.  

#### Parameters  
Name | Type | Description
--- | --- | ---
list | ``object`` | The list to search in. 
needles | ``object`` | The items to search for. Can also be a list of items. 


#### Example  
```  
@list.contains(list,needles)  
```  

### create()   
Creates a new empty list.   

#### Returns  
``list`` - A new, empty, modifiable list.  



#### Example  
```  
@list.create()  
```  

 
##  @path 
----------  
Provides utility functions inside a pipeline expression for simple path calculations.
You can access the functions declared here in the PEL using <code>@path</code>  

### join(pathItems)   
Concats all given items to a single path. Also see &lbrace;@link PathUtil#path(Object...)&rbrace;.   

#### Returns  
``string`` - The joined path items as a path string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
pathItems | ``object`` | The path items to join as list. 


#### Example  
```  
@path.join(pathItems)  
```  

### extension(path)   
Returns the extension of a given filename (path).   

#### Returns  
``string`` - The extension of the path without period (for example: txt)  

#### Parameters  
Name | Type | Description
--- | --- | ---
path | ``string`` | The path string. 


#### Example  
```  
@path.extension(path)  
```  

### basename(path)   
Returns the base name of a file without the extension. Also strips-off any
ID form the filename.
For example: "/folder/invoice.pdf" would return "invoice" and
"/folder/invoice_ID-3fgh343.pdf" would return "invoice"   

#### Returns  
``string`` - The base name of the path.  

#### Parameters  
Name | Type | Description
--- | --- | ---
path | ``string`` | The path string. 


#### Example  
```  
@path.basename(path)  
```  

 
##  @property 
----------  
Provides addon functions inside a pipe expression in order to read properties from the property store.
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

 
##  @text 
----------  
Provides utility functions inside a pipeline expression for simple calculations of lists.
You can access the functions declared here in the PEL using <code>@calc</code>  

### upperCase(text)   
Converts the given text value to upper case.   

#### Returns  
``string`` - The upper case text.  

#### Parameters  
Name | Type | Description
--- | --- | ---
text | ``object`` | The text to convert. 


#### Example  
```  
@text.upperCase(text)  
```  

### prefix(text,stop)   
Returns the part from the beginning of the given text up to the stop word.
For example "Foo Bar" with stop word of " " would return "Foo" as prefix.   

#### Returns  
``string`` - The part of text up to the first occurence of the stop word.  

#### Parameters  
Name | Type | Description
--- | --- | ---
text | ``string`` | The text. 
stop | ``string`` | The stop word. 


#### Example  
```  
@text.prefix(text,stop)  
```  

### lowerCase(text)   
Converts the given text value to lower case.   

#### Returns  
``string`` - The lower case text.  

#### Parameters  
Name | Type | Description
--- | --- | ---
text | ``object`` | The text. 


#### Example  
```  
@text.lowerCase(text)  
```  

### isEmpty(text)   
Returns true if given text is empty or null.   

#### Returns  
``boolean`` - true, in case the given text is an empty string or null.  

#### Parameters  
Name | Type | Description
--- | --- | ---
text | ``object`` | The text. 


#### Example  
```  
@text.isEmpty(text)  
```  

### shorten(text,length)   
Shorts the given string and adds ... at the end.   

#### Returns  
``string`` - The shorten string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
text | ``object`` | The text to shorten. 
length | ``int`` | The length. 


#### Example  
```  
@text.shorten(text,length)  
```  

### length(text)   
Returns the len of the given text. In case the text is null, 0 is returned.   

#### Returns  
``int`` - The length of the text.  

#### Parameters  
Name | Type | Description
--- | --- | ---
text | ``object`` | The text. 


#### Example  
```  
@text.length(text)  
```  

### contains(text,needles)   
Checks whether given text contains at least one of given needle texts, ignoring case.
Also value and text can be null.   

#### Returns  
``boolean`` - true in case text contains needle.  

#### Parameters  
Name | Type | Description
--- | --- | ---
text | ``object`` | The text to search in. 
needles | ``string`` | A comma separated list of needles to search inside text. 


#### Example  
```  
@text.contains(text,needles)  
```  

### lang(text)   
Tries to detect the language of given text.   

#### Returns  
``string`` - The detected language, one of: GERMAN, ENGLISH, FRENCH, UNKNOWN.  

#### Parameters  
Name | Type | Description
--- | --- | ---
text | ``object`` | The text to detect the language for. 


#### Example  
```  
@text.lang(text)  
```  

### random(size)   
Creates a random string of given size.   

#### Returns  
``string`` - The random string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
size | ``int`` | The length of the random string. 


#### Example  
```  
@text.random(size)  
```  

### uuid()   
Creates a new uuid and returns it as hexadecimal string.   

#### Returns  
``string`` - The random uuid.  



#### Example  
```  
@text.uuid()  
```  

### toHtml(text)   
Converts the given text to an HTML fragment. Replaces &, gt and lt signs, keeps line breaks
and converts links to href elements.   

#### Returns  
``string`` - The HTML result.  

#### Parameters  
Name | Type | Description
--- | --- | ---
text | ``string`` | The text to convert to HTML. 


#### Example  
```  
@text.toHtml(text)  
```  

### append(basetext,text)   
Appends the given text to the given base text.
If basetext is null, returns the appending text only.   

#### Returns  
``string`` - basetext + text  

#### Parameters  
Name | Type | Description
--- | --- | ---
basetext | ``string`` | The base text to append to. 
text | ``string`` | The text to append. 


#### Example  
```  
@text.append(basetext,text)  
```  

### concat(separator,collection)   
Concats the given list of objects using the given separator.
Ignores null items.   

#### Returns  
``string`` - The concatenated items as a string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
separator | ``string`` | The separator. 
collection | ``object`` | The collection of items to concat. 


#### Example  
```  
@text.concat(separator,collection)  
```  

### concat(separator,collection)   
Treats the given object as a list of objects and concats the items using the given separator.
Ignores null items.   

#### Returns  
``string`` - The concatenated items as a string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
separator | ``string`` | The separator between the items. 
collection | ``object`` | The collection of items. 


#### Example  
```  
@text.concat(separator,collection)  
```  

### commajoin(collection)   
Same as &lbrace;@link #concat(String, Object)&rbrace; but with comma as default separator.   

#### Returns  
``string`` - The comma separated string of concatenated items.  

#### Parameters  
Name | Type | Description
--- | --- | ---
collection | ``object`` | The collection of items to concatenate. 


#### Example  
```  
@text.commajoin(collection)  
```  

### concatAndFormat(separator,collection,pel)   
Similar to &lbrace;@link #concat(String, Object...)&rbrace; but additionally applies the given PEL expression on
each list entry before it gets concatenated. This is useful for example to convert each entry in
the list before adding it to the resulting string. For example to remove whitespaces on each entry.   

#### Returns  
``string`` - The concatenated string.  

#### Parameters  
Name | Type | Description
--- | --- | ---
separator | ``string`` | The separator. 
collection | ``object`` | The collection of items to concatenate. 
pel | ``string`` | The pipeline expression without wrapping #{ and } 


#### Example  
```  
@text.concatAndFormat(separator,collection,pel)  
```  

### startsWith(text,prefix)   
Tests the given text whether it starts with given prefix.   

#### Returns  
``boolean`` - true if given text starts with the second parameter provided  

#### Parameters  
Name | Type | Description
--- | --- | ---
text | ``string`` | The text 
prefix | ``string`` | The prefix to test 


#### Example  
```  
@text.startsWith(text,prefix)  
```  

### replaceAll(text,regexp,replacement)   
Replace all occurrences of a substring (matching argument regex) with replacement string.   

#### Returns  
``string`` - The text with replacements applied.  

#### Parameters  
Name | Type | Description
--- | --- | ---
text | ``string`` | The text to apply replacements. 
regexp | ``string`` | The regular expression matching all replacement sources 
replacement | ``string`` | The string to be substituted for each match. 


#### Example  
```  
@text.replaceAll(text,regexp,replacement)  
```  

 
##  @uri 
----------  
Provides utility functions inside a pipeline expression for simple uri resolving.
You can access the functions declared here in the PEL using <code>@uri</code>  

### resolve(uri)   
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
@uri.resolve(uri)  
```  

 
##  @user 
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
firstName lastName, username, email, uuid.   

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

 
##  @xml 
----------  
Provides addon functions inside a pipeline expression in order to read and change XML documents.
You can access the functions declared here in the PEL using <code>@xml</code>  

### xpath(document,xpath)   
Evaluates given XPath expression of given document and returns the result as a list of DOM nodes.   

#### Returns  
``list`` - The result of the applied expression as a list of DOM nodes.  

#### Parameters  
Name | Type | Description
--- | --- | ---
document | ``object`` | The document to be applied. Can be a DOM or an XML string. 
xpath | ``string`` | The expression to be applied. 


#### Example  
```  
@xml.xpath(document,xpath)  
```  

### xpathAsText(document,xpath)   
Evaluates given XPath expression of given document and returns the result as a text value.   

#### Returns  
``string`` - The result of the applied expression as text.  

#### Parameters  
Name | Type | Description
--- | --- | ---
document | ``object`` | The document to be applied. Can be a DOM or an XML string. 
xpath | ``string`` | The expression to be applied. 


#### Example  
```  
@xml.xpathAsText(document,xpath)  
```  

 
