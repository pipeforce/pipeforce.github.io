# Commands
Last update: 19/11/2021 14:41:24


## apidoc.commands

Returns the OpenAPI documentation of commands.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## apidoc.pel.utils
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=apidoc.pel.utils)
Returns the OpenAPI documentation of PEL utils.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## assert
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=assert)
Evaluates a given PEL conditions and throws an error in case a condition is invalid.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`true` | String | false | null | A PE which must evaluate to true.
`false` | String | false | null | A PE which must evaluate to false.
`body.equals` | String | false | null | The value of this param is compared to the body. If different, exception is thrown. Can be a PE.
`equals` | String | false | null | Compares the result of param value with this. If not equal, throws exception. Can be a PE.
`value` | String | false | null | The value to be used for comparision. Can be a PE.
`message` | String | false | null | An optional message to be used in case of invalid condition. Can be a PE.



## workflow.assert
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.assert)
Applies asserts for a given workflow in the workflow service.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`hasPassed` | String | false | null | A comma separated list of task names to check whether they have been passed.
`hasNotPassed` | String | false | null | A comma separated list of task names to check whether they have not yet passed.
`processFinished` | String | false | null | If true, checks whether the process with given id has been finished.
`throwException` | String | false | true | If true, throws exception when assert is false. Otherwise returns the status in the body.
`processInstanceId` | String | true | null | The id of the process instance the task to check belongs to.



## barcode.create
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=barcode.create)
Creates a barcode from a dynamic format.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`text` | String | false | null | The text value to be transformed to a barcode.
`width` | String | false | null | The width of the barcode. If empty, the default size is used.
`height` | String | false | null | The height of the barcode. If empty, the default size is used.
`format` | String | false | PDF_417 | The dynamic format of the barcode to be created. One of: AZTEC, CODABAR, CODE_39, CODE_93, CODE_128, DATA_MATRIX, EAN_8, EAN_13, ITF, PDF_417, QR_CODE, UPC_A, UPC_E
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## barcode.read
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=barcode.read)
Reads a barcode from a dynamic PNG format. Detects the barcode type automatically. By default returns the text extracted from the barcode in the body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## bean
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=bean)
Executes a method on a Spring bean. Is only available for support users.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the bean.
`method` | String | false | null | The method name of the bean to be executed.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## body.delete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=body.delete)
Sets the value in the body to null. Deletes any existing value in the body. 

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  



## body.filter
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=body.filter)
DEPRECATED. Converts the input body to JSON and then filters the input body and removes any properties not matching the given filter. Throws exception if input body cannot be converted to JSON.Does nothing, if input body is null or empty. If the first level of the body is a list, appliesthe filter to each element inside the list. This command can be used for example to filter outsensitive information or to shrink a big result set for performance reasons.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`properties` | String | false | null | A comma separated list of first-level properties to be shown. If set, only those properties of the first level will be returned, those are listed here. All other properties will be omitted. For example to filter a user entity in the body with filter: id,username would return only the id and the username of the user. If not set, the body will not be converted and filtered at all and returned unchanged.
`removeKey` | Boolean | false | false | Can only be applied, if the result is a list and contains elements with a single property each. For example: [{name: foo}, {name: bar}]. If set to true, removes the key from the property and converts the result to a simple list like: [foo, bar]. If the result is not a list or elements in the list contain more than one property, this param is ignored.



## cache.clear
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=cache.clear)
Clears the underlying central cache and removes any entry those time to live has been expired. Can also be used to remove a single entry from the cache.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | The key to load the value from the cache to remove. If empty or null, all entries in the cache will be inspected and those time to live has been expired will be removed.



## cache.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=cache.get)
Reads a value with given key from the cache and writes it into the output.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key to load the value from the cache.
`remove` | Boolean | false | false | If true, removes the entry after it was successfully returned.
`exit` | Boolean | false | false | If true, exits the pipeline if cache entry exists.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## cache.info
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=cache.info)
Returns information about the current state of the cache. Available for system and support users only.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | false | null | Returns the info for a given cache entry. If null or empty, the overall cache info is returned.



## cache.list
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=cache.list)
Lists ALL entries of the cache. Use with care!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## cache.put
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=cache.put)
Saves the given value under given key into a central cache.
If no value param is given, uses the body as cache value.
The max time to live of each entry is 120 min. The min time to live is 5 min. Default is 5 min.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`timeToLive` | Integer | false | 5 | The min. time to live for this cache entry in minutes. If not set or negative, will be set to default = 5 min. If value is bigger than 120, will be limited to 120 (2 hours). If value is smaller than 5, will be extended to 5.
`key` | String | true | null | The unique key for the cache entry.
`value` | String | false | null | The value for the cache entry. If not set, null is used.



## call
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=call)
Calls a script and returns with the result in the body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uri` | String | true | null | The uri to be called.
`args` | Object | false | null | Name value pair of arguments to be passed to the script. If the script is a pipeline, the arguments are set as vars overwriting any existing vars.If the script is a remote HTTP URL, the arguments are passed as request parameters, each.If the script is a script in classpath or property store, the arguments are passed via implicit variable: pi.args.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## capture
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=capture)
DEPREACTED (Use the cache.* commands instead). Captures the last pipe message and adds it into a list in the header under key {@link #HEADER_CAPTURED}. This is primarily for testing purposes but also can be used to create a snapshot of a certain pipeline state.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  



## pipe.schema
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=pipe.schema)
Returns the JSON schema for all built-in pipes.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pipe` | String | false | null | The specific pipe name to fetch schema from. If set, only the schema for this specific pipe is returned.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## pipe.schema.v7
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=pipe.schema.v7)
Returns the V7 compliant JSON schema for all built-in pipes.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## config.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=config.get)
Returns all admin config settings for a given group from the backend as a JSON in this format: {configKey:{value:someValue, canOverwrite:true|false}}. The attribute canOverwrite is only available if param includePermission is set.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`group` | String | false | null | The config group to select. If null or empty, all configs will be returned if user has permission to do so.
`key` | String | false | null | The config key inside a given group. If null or empty, all configs from the selected group will be returned.
`includePermission` | String | false | false | If true, additionally shows whether a currently logged-in user can write/change a configuration or not by adding the attribute canOverwrite:true|false. to each config entry.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## content.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=content.get)
Reads content from provided uri and puts the result back to body.

Expected Input Body: Raw  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uri` | String | true | null | The content uri of the content to load.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## data.mapping
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=data.mapping)
Converts from one data structure into a another by applying simple mapping rules. Auto-creates nested elements if required.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`rules` | String | false | null | A list of mapping PEL rules to map from the input to the output data set. A rule has the format inputPEL1 -> outputPEL1. Multiple rules are separated by a comma directly followed by a new line.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## data.transform
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=data.transform)
This data transformer converts the input to an output format by applying the given template. By default the current message is provided as model inside the template context so you can access body, vars or headers similar to the default PEL approach.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`iterate` | String | false | false | If true, the input is expected to be a list which will be iterated. The template is then applied on each iteration row and the result is added to a target list.
`groupBy` | String | false | null | An expression to apply on the target list in order to group the result of a row into. If the expression returns false, the row result is added to the end of the list.If null or empty, each row result creates a new entry in the target list.
`engine` | String | false | pel | The template engine to be used. Currently 'freemarker' and 'pel' is supported.
`modelName` | String | false | null | The name of the root model under which the input can be accessed inside the template. If null or empty, then the input defines the model names.
`template` | String | true | null | The template to be used for the transformation. It can the template text itself as string or a qualified uri pointing to a template resource like this for example: $uri:property:/my/template/path
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## datetime
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=datetime)
Returns the current time at server side.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`format` | String | false | null | The date time format pattern. If null, the system default format is used.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## datetime.zones
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=datetime.zones)
Returns all official IANA time-zone names supported by this PIPEFORCE instance: http://www.iana.org/time-zones

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## decrypt
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=decrypt)
Decrypts the data in the body using the defined encryption parameter. Puts the encrypted data back to the body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`password` | String | true | null | The password to decrypt the body with.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## delivery.attachment.add
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=delivery.attachment.add)
Adds a single attachment to an existing PIPEFORCE Secure Delivery. Note: Attachments can be added to deliveries only in state DRAFT.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of an existing delivery to be updated.
`name` | String | true | null | The name of the attachment.
`mimeType` | String | false | null | The mime type of the attachment.
`length` | String | false | 0 | The length of the attachment in bytes.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## delivery.create
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=delivery.create)
Creates a new PIPEFORCE Secure Delivery and sets it in the target

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`subject` | String | false | null | The subject of the delivery. If null or empty, the default subject will be used.
`message` | String | false | null | The message of the delivery. If null or empty, the default message will be used.
`privacyLevel` | Integer | false | 1 | The privacy level to send the delivery. Must be one of 1, 2, 3 or 4.
`recipients` | String | false | null | A comma separated list of email recipients. Also PEL is supported here.
`deleteAfter` | String | false | 0 | Delete the delivery attachments after this date and time given as unix timestamp in millis. If null, empty, 0 or negative, delivery will never be deleted.
`attachments` | String | false | null | The list of attachment file names or a list of JSON objects to be added to this delivery.
`notifySender` | String | false | true | If true, notifies sender when recipients have downloaded delivery.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## delivery.delete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=delivery.delete)
Deletes a given delivery.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of the delivery to delete.



## delivery.finalize
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=delivery.finalize)
Finalizes an existing delivery. After finalized, only recipients can be added but message and attachments of delivery can not be changed any longer.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of the delivery to finalize.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## delivery.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=delivery.get)
Returns an existing delivery.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of the delivery.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## delivery.recipient.add
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=delivery.recipient.add)
Adds recipients to an existing PIPEFORCE Secure Delivery. Note: Recipients can be added to deliveries only in state DRAFT or FINALIZED.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | false | null | The uuid of an existing delivery to be updated.
`email` | String | false | null | The email address of the recipient to be added.
`locale` | String | false | null | The locale to be used for this recipient like de, en or fr for example.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## delivery.send
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=delivery.send)
Sends a given PIPEFORCE Secure Delivery. If delivery is in status DRAFT it will be converted to FINALIZED before send.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | true | null | The uuid of the delivery to send.
`recipients` | String | false | null | The comma separated or PEL list of recipients to (re-)send the delivery to. The recipients must already exist in the delivery. If null or empty, the delivery message is send to all existing recipients of the delivery.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## delivery.update
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=delivery.update)
Updates an existing PIPEFORCE Secure Delivery.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`deliveryUuid` | String | false | null | The uuid of an existing delivery to be updated with values from the params. Any existing value will be overwritten by parameter set on this command. If null or empty, a new delivery will be created and initialized with values from params. Note: Deliveries can only be fully updated in DRAFT state. In FINALIZED state, only recipients can be updated.
`subject` | String | false | null | The subject of the delivery. If null or empty, this attribute wont be updated.. Overwrites any existing value.
`message` | String | false | null | The message of the delivery. If null or empty, this attribute wont be updated. Overwrites any existing value.
`privacyLevel` | Integer | false | 1 | The privacy level to send the delivery. Must be one of 1, 2, 3 or 4. Overwrites any existing value. If null or empty, this attribute wont be updated.
`recipients` | String | false | null | A comma separated list of email recipients. Overwrites any existing recipients. If null or empty, this attribute wont be updated.
`deleteAfter` | String | false | 0 | Delete the delivery attachments after this date and time given as unix timestamp in millis. If 0 or negative, delivery will never be deleted. If null or empty, this attribute wont be updated. If set overwrites any existing value.
`attachments` | String | false | null | The attachments to be set to this delivery. Overwrites any existing attachments. If null or empty, this attribute wont be updated.
`notifySender` | String | false | true | If true, notifies sender when recipients have downloaded delivery. If null or empty, this attribute wont be updated.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## doc.api.pelutils
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=doc.api.pelutils)
Returns the api doc for the available PEL utils.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## docusign
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=docusign)
Requests a signature of the given document in the body 
via email (remote signing) using DocuSign. See here: 
https://developers.docusign.com/esign-rest-api/code-examples/code-example-request-a-signature-via-email
Expects the to be signed document in the body with json.file encoding.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`signerEmail` | String | true | null | The email address of the signer.
`signerName` | String | false | null | The real name of the signer.
`ccEmail` | String | false | null | The email of cc user to get informed about the signing request. If null, no cc mail is sent.
`ccName` | String | false | null | The name of cc email user to get informed about the signing request.
`subject` | String | false | null | The email subject to be send to the signer. If null or empty, the default subject will be set.
`accessToken` | String | false | null | The DocuSign access token. If null or empty, the token will be read from settings.
`accountId` | String | false | null | The docuSign account Id for REST calls. Can be obtained here: https://developers.docusign.com/esign-rest-api/guides/authentication/user-info-endpoints . If not set, the command tries to get the account ID by an additional request from DocuSign
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## document.understand
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=document.understand)
Returns metadata for a given unstructured document like an invoice PDF for example. Expects the document to be in the body by default. Returns the result as JSON in the body (replacing any existing value in the body).

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`apiKey` | String | false | null | The alternative API key to connect to the service. If null or empty, the default one will be used, as defined by the default backend settings.
`restUrl` | String | false | null | The URL to be called by the command. If null or empty, the default url will be used as defined in the backend.
`filter` | String | false | null | A PEL as filter to be applied to the output data before it is returned by this command. If null or empty, no filter is applied.



## drive.archive.save
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.archive.save)
Saves the content of the body to the given archive folder in Drive. The content of the body must be a single file. Verifies the integrity of the archive on write. Returns the final archive file name into the output target.

Expected Input Body: Raw  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the archive folder where the file to be saved.
`namingPattern` | String | true | null | The pattern to be applied to generate the final archive file name. Additionally, provides these temp variables in this PEL pattern context: archiveCounter = The number of files currently stored in the archive folder. archivePath = The path to the archive as given by path param. 
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## drive.copy
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.copy)
Copies a folder or file on Drive.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the folder or file to be copied.
`to` | String | true | null | The target folder to copy the resource into.



## drive.delete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.delete)
Deletes a file or folder on Drive. If resource doesnt exist, nothing happens.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the resource to be deleted. If it is a folder, it will be deleted recursively.



## drive.exists
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.exists)
Checks whether a resource in Drive exists. Puts the string true or false in the message body depending whether the resource exists.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the resource to check for existence.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## drive.list
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.list)
Lists all resources from drive folder.

Expected Input Body: JsonNode  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the folder to be listed.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## drive.mkdir
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.mkdir)
Creates a new dir on Drive if it not already exists.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the folder the new dir should be created within.
`recurse` | String | false | false | If set to true, any non existing folder in the path will be created.



## drive.move
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.move)
Moves a folder or file on Drive from one location into another.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the folder or file to be moved.
`to` | String | true | null | The target folder to move the resource into.



## drive.read
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.read)
Reads a file from drive and puts its content as a pipeline resource into the body.

Expected Input Body: JsonNode  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the file to be read from Drive.
`append` | Boolean | false | false | If true, appends the files read from drive to any existing collection in the body. In case the body is no collection but a content (single file), creates a new collection and adds all to this collection (already existing file and read files). In case the body is different from collection or content, an error is thrown. If false (default), overwrites any existing body value.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## drive.save
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.save)
Saves the content of the body to one or more files in Drive. The content of the body can be a single pipeline resource or a pipeline resource collection. 

Expected Input Body: Raw  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the file to be saved. If multiple files are in the body, this is the path of the base folder where to store these files. Otherwise it is expected to be the full path to a single file.
`namingStrategy` | String | false | null | If defined, applies the given naming strategy to the name of the resource. If null or empty, no name strategy is applied.
`cleanupBody` | String | false | true | If true, deletes the content from the body after the content was saved to drive (default).



## drive.share
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.share)
Shares a folder in Drive given by path to users given by recipients.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`to` | String | true | null | Comma separated list of users, group names or email addresses. Never null. If this is an expression and points to comma separated list, an array or a collection, will create share to any of the entries. If this value is missing, a public share is created instead
`type` | String | false | user | Can be either shared to 'user' or to 'group'. Defaults to 'user'
`path` | String | true | null | The path to the folder to be shared.
`permission` | Integer | false | 1 | The permission for the share: 1 (read), 2 (update), 4 (create), 8 (delete), 16 (share), 31 (all).  Note: Permissions can be combined by additions: For example read (1) + update (2) would be 3. For public shares defaults to 1 (read).
`subject` | String | false | null | Optional subject of the share email to be send to the recipient. If type=user and at least one of subject or message parameter is set, an email will be send to the recipient after it was shared to him.
`message` | String | false | null | Optional message of the share email to be send to the recipient. If type=user and at least one of subject or message parameter is set, an email will be send to the recipient after it was shared to him.
`model` | String | false | null | Optional model for the share email to be send to the recipient.
`expires` | Long | false | null | NOT SUPPORTED YET. A timestamp in millis since 1970 when this share will expire. If -1 share will never expire.
`password` | String | false | null | NOT SUPPORTED YET. A password to protect the share.
`invite` | Boolean | false | null | NOT SUPPORTED YET. Send an invite email to recipients.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## drive.tag
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.tag)
Adds or removes a WebDAV tag to a resource on drive.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the resource to tag.
`tagname` | String | true | null | The name of the tag to add.
`tagvalue` | String | false | null | The value of the tag to add.
`remove` | Boolean | false | null | If true (or any non empty/null value), removes the given tag.



## drive.upload.chunked
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=drive.upload.chunked)
Supports chunked uploads of large files into the Drive endpoint. Expects an object in the body which can be converted to an input stream as the chunk data to be uploaded.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`action` | String | true | null | Defines the action of the chunked upload. One of: create, upload, finalize, cancel
`uuid` | String | false | null | The uuid to refer to the upload session as returned by the create action. Required for upload, finalize and cancel actions.
`path` | String | false | null | The target path where to copy the final file on finalize action. Mandatory for the finalize action.
`index` | Integer | false | null | The index of the chunk. Mandatory for the upload action.



## encrypt
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=encrypt)
Encrypts the data in the body using the defined encryption parameter and puts the encrypted datain the output.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`password` | String | true | null | The password to encrypt the body with.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## eval
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=eval)
Executes a given pipeline expression with the message as context.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`expr` | String | true | null | The pipeline expression to be executed.



## event.listen
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=event.listen)
Listening for events works like this: Add this command at the very first in your pipeline, define the event key you want to listen for and an optional filter expression. Then save this pipeline into the property store. This causes the system to automatically register this pipeline and execute it whenever an event with given key and matching filter is fired. Note: Only one event.listen command per pipeline is allowed and it needs to be the very first command in the pipeline. In the body of the pipeline the event object is provided and can be used for filtering for example.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key to listen for.
`filter` | String | false | null | An optional PEL to execute the pipeline only in case the filter applies.



## event.mapping.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=event.mapping.get)
Returns all event key to pipeline key mappings.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## event.send
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=event.send)
Sends a new event to inform listeners in pipelines.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key under which to send this event.
`traceId` | String | false | null | The optional tracedId to be used to send this event. If not defined, a random traceId is created automatically.
`payload` | String | false | null | The payload to send with this event. May be null.
`async` | String | false | true | Send the event in ASYNC mode? Note: ASYNC is faster but lacks transaction capability. If false, message is send in SYNC. Slower but can use the current authentication and transaction context.



## foreach
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=foreach)
Repeats the subsequent pipeline commands for each entry in a given list. By default the full pipeline until the end will be repeated. To repeat only a subset, place the command foreach?end where the foreach iteration should end.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`in` | String | true | null | Default parameter which points to a list of items to be iterated over. Each iteration item is placed by default under vars.loop.item an can be accessed as such inside the iteration loop.
`item` | String | false | null | Contains an optional expression which will be evaluated for each iteration. The current iteration item at vars.loop.item will be overwritten by the result of this expression.
`loopName` | String | false | loop | The name of the current loop object in the vars scope. By default this is 'loop' which results in 'vars.loop.item' then for accessing the current loop item. With this attribute you can change this for example to 'iteration' so you can access the loop iterm under 'vars.iteration.item'. The loop object contains attributes for the current loop like item = the current iteration item, index = the current iteration index.
`end` | String | false | null | Signals the end of a for each loop.



## header.set
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=header.set)
DEPRECATED. Use the set command instead. Sets any parameter value as header. For example header.set?key1=value1&key2=value2 would become the headers: key1: value1 and key2: value2

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  



## htmlunit.website.form.find
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=htmlunit.website.form.find)
Searches for a form on the page and sets is as vars.form model in PEL. If param 'select' is given, uses this PEL to find the form object. Otherwise tries to detect the form automatically by searching the page and using the first form found. Note: The pipe is BETA and not intended to be used in production!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`select` | String | false | null | A PE to select elements on a website for subsequent RPA commands. If null, form is tried to select automatically.



## htmlunit.website.form.input
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=htmlunit.website.form.input)
Searches for an input element with given name and sets the given value on it. Note: The pipe is BETA and not intended to be used in production!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`value` | String | false | null | The value to be set on the selected input field.
`select` | String | false | null | A PE to select elements on a website for subsequent RPA commands. If null, form is tried to select automatically.



## htmlunit.website.form.submit
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=htmlunit.website.form.submit)
Searches for a submit button and clicks it. Note: The pipe is BETA and not intended to be used in production!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`select` | String | false | null | A PE to select elements on a website for subsequent RPA commands. If null, form is tried to select automatically.



## htmlunit.website.link.click
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=htmlunit.website.link.click)
Searches for a link on current page and clicks it. Note: The pipe is BETA and not intended to be used in production!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`select` | String | false | null | A PE to select elements on a website for subsequent RPA commands. If null, form is tried to select automatically.



## htmlunit.website.open
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=htmlunit.website.open)
Opens a website and sets it as 'vars.page' in PEL. Additionally sets the current browser instance as 'var.browser'. Note: The pipe is BETA and not intended to be used in production!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | true | null | The url of the web page to open.



## htmlunit.website.scrap
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=htmlunit.website.scrap)
Scraps data from the current website and returns the result in the body.Note: The pipe is BETA and not intended to be used in production!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`xpath` | String | true | null | Executes the given xpath expression on the current page and puts the result in the body. In case the xpath returns more than one results, adds an array to the body. Otherwise the body only contains the single result value.
`select` | String | false | null | A PE to select elements on a website for subsequent RPA commands. If null, form is tried to select automatically.



## http.delete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=http.delete)
Executes a DELETE HTTP call to the given url.Returns the result from the server in the message body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url for the HTTP call.
`username` | String | false | null | The username for basic authentication. If this value is not null, BASIC auth is tried.
`password` | String | false | null | The password for basic authentication. If this value is not null, BASIC auth is tried.
`headers` | String | false | null | A list of headers to append to the request. Can be a PEL pointing to a map or a list of name-value pair strings name:value or a comma separated string like: name1:value1, name2:value2.
`bearer` | String | false | null | The secret to be send as header: Authorization: Bearer secret. If this param is set username and password is ignored and token authentication with Bearer is used instead.
`body` | String | false | null | The value to be set in the body of the request (if it supports a body). If this param is missing, the value from the input parameter is used. If this value is null, no body is used.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## http.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=http.get)
Executes a GET HTTP call to the given url.Returns the result from the server in the message body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url for the HTTP call.
`username` | String | false | null | The username for basic authentication. If this value is not null, BASIC auth is tried.
`password` | String | false | null | The password for basic authentication. If this value is not null, BASIC auth is tried.
`headers` | String | false | null | A list of headers to append to the request. Can be a PEL pointing to a map or a list of name-value pair strings name:value or a comma separated string like: name1:value1, name2:value2.
`bearer` | String | false | null | The secret to be send as header: Authorization: Bearer secret. If this param is set username and password is ignored and token authentication with Bearer is used instead.
`body` | String | false | null | The value to be set in the body of the request (if it supports a body). If this param is missing, the value from the input parameter is used. If this value is null, no body is used.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## http.patch
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=http.patch)
Executes a PATCH HTTP call to the given url.Returns the result from the server in the message body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url for the HTTP call.
`username` | String | false | null | The username for basic authentication. If this value is not null, BASIC auth is tried.
`password` | String | false | null | The password for basic authentication. If this value is not null, BASIC auth is tried.
`headers` | String | false | null | A list of headers to append to the request. Can be a PEL pointing to a map or a list of name-value pair strings name:value or a comma separated string like: name1:value1, name2:value2.
`bearer` | String | false | null | The secret to be send as header: Authorization: Bearer secret. If this param is set username and password is ignored and token authentication with Bearer is used instead.
`body` | String | false | null | The value to be set in the body of the request (if it supports a body). If this param is missing, the value from the input parameter is used. If this value is null, no body is used.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## http.post
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=http.post)
Executes a POST HTTP call to the given url.Returns the result from the server in the message body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url for the HTTP call.
`username` | String | false | null | The username for basic authentication. If this value is not null, BASIC auth is tried.
`password` | String | false | null | The password for basic authentication. If this value is not null, BASIC auth is tried.
`headers` | String | false | null | A list of headers to append to the request. Can be a PEL pointing to a map or a list of name-value pair strings name:value or a comma separated string like: name1:value1, name2:value2.
`bearer` | String | false | null | The secret to be send as header: Authorization: Bearer secret. If this param is set username and password is ignored and token authentication with Bearer is used instead.
`body` | String | false | null | The value to be set in the body of the request (if it supports a body). If this param is missing, the value from the input parameter is used. If this value is null, no body is used.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## http.put
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=http.put)
Executes a PUT HTTP call to the given url.Returns the result from the server in the message body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | false | null | The url for the HTTP call.
`username` | String | false | null | The username for basic authentication. If this value is not null, BASIC auth is tried.
`password` | String | false | null | The password for basic authentication. If this value is not null, BASIC auth is tried.
`headers` | String | false | null | A list of headers to append to the request. Can be a PEL pointing to a map or a list of name-value pair strings name:value or a comma separated string like: name1:value1, name2:value2.
`bearer` | String | false | null | The secret to be send as header: Authorization: Bearer secret. If this param is set username and password is ignored and token authentication with Bearer is used instead.
`body` | String | false | null | The value to be set in the body of the request (if it supports a body). If this param is missing, the value from the input parameter is used. If this value is null, no body is used.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.token.refresh
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.token.refresh)
Enrich headers with accessToken obtained from authorization server using refreshToken.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`refreshToken` | String | true | null | The refresh token.



## iam.apitoken
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.apitoken)
Obtains the apitoken in exchange for user credentials provided and writes into the output.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | true | null | The user name.
`password` | String | true | null | The user password.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.authinfo
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.authinfo)
Adds header 'authUserId' - name of an user authenticated as a sender of the pipe message.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  



## iam.authorize
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.authorize)
Authorizes pipeline execution and overwrites any existing authentication by this new, successful authentication. Additionally puts the successful authentication token on an internal stack. See iam.logout to pop from stack.Subsequent commands will be executed only if authorization was successful. Tries each existing parameter for authentication in this order. If multiple params are given, first existing one is used from this list: accessToken, refreshToken, basic, username+password. Throws exception and exits pipeline execution on first not matching login try.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`accessToken` | String | false | null | The accessToken (bearer token) to be used for authentication.
`refreshToken` | String | false | null | The refreshToken to be used for authentication.
`basic` | String | false | null | The basic authentication string to be used for authentication.
`username` | String | false | null | The username to be used for authentication.
`password` | String | false | null | The password to be used for authentication.



## iam.bruteforce.release
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.bruteforce.release)
Releases any bruteforce lock for the given user. If user is not locked, nothing happens.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | false | null | The name of the user to unlock. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the user to unlock. If set, the param username is ignored.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.bruteforce.status
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.bruteforce.status)
Returns the bruteforce status for a single user

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | false | null | The name of the user to return the status for. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the user to return the status for. If set, the param username is ignored.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.group.add.roles
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.group.add.roles)
Adds roles to a given group. Roles must exist beforehand.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`groupUuid` | String | true | null | The unique group uuid.
`roleNames` | String | true | null | The role names to join. Can be a comma separated list or a PEL pointing to a list.
`groupName` | String | true | null | The unique group name.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.group.create
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.group.create)
Creates a new group and puts its uuid in the body under key groupUuid. Throws exception if group already exists.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The unique group name.
`roleNames` | String | false | null | A list of roles to be assigned to this group on creation.
`attributes` | Map | false | null | A map which holds optional attributes to be added to this group.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.group.delete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.group.delete)
Deletes the group with given uuid.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | true | null | The uuid of the group to delete.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.group.list
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.group.list)
Lists all groups. By default, the response is a JSON array with these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_grouprepresentation

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`filter` | String | false | null | If set, applies the given filter to the search for groups.
`sortByName` | String | false | null | If set, groups are returned as collection with the group name as key.
`max` | Integer | false | 1000 | The max number of entries to return. If set to a higher value than 1000, will be reset to 1000.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.group.list.names
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.group.list.names)
Lists all group names. The response is a JSON array with these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_grouprepresentation

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`max` | Integer | false | 1000 | The max number of entries to return. If set to a higher value than 1000, will be reset to 1000.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.group.members
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.group.members)
Lists all users which are member of the given groups. The response is a JSON array with these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_userrepresentation

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the group. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the group. If set, the param name is ignored.
`max` | Integer | false | 1000 | The max number of entries to return. If set to a higher value than 1000, will be reset to 1000.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.group.roles
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.group.roles)
Lists all effective role names, the given group is assigned to.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`groupName` | String | false | null | The name of the group. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the group. If set, the param username is ignored.
`max` | Integer | false | 1000 | The max number of entries to return. If set to a higher value than 1000, will be reset to 1000.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.realm.create
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.realm.create)
Creates a new realm. Sets the uuid in the body under key realmUuid. Throws exception if realm already exists. Expects a JSON in the body of this structure: https://www.keycloak.org/docs-api/11.0/rest-api/index.html#_realmrepresentation

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.role.add.composites
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.role.add.composites)
Adds existing composite roles to an existing role.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`roleName` | String | true | null | The unique role name to be loaded.
`composites` | String | true | null | The composite role names to join. Can be a comma separated list or a PEL pointing to a list.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.role.create
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.role.create)
Creates a new role and puts its role uuid in the body under key roleUuid. Throws exception if role already exists.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The unique role name.
`composites` | String | false | null | A PEL list of roles names to add to this role as children. Makes this role a composite.
`attributes` | Map | false | null | A map which holds optional attributes to be added to this role.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.role.members
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.role.members)
Lists all users which are member of the given role. The response is a JSON array with these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_userrepresentation

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`roleName` | String | false | null | The name of the role.
`max` | Integer | false | 1000 | The max number of entries to return. If set to a higher value than 1000, will be reset to 1000.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.run.as
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.run.as)
Executes the subsequent pipeline as different user if following two conditions are met. 1. currently logged-in user has permission CAN_RUN_AS_SOURCE 2. requested user has permission CAN_RUN_AS_TARGET 

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | true | null | The username, subsequent pipe commands must be executed as. This user must has RUN_AS_SOURCE role assigned.



## iam.search
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.search)
Searches for specific entity in the IAM service matching the given filter. Returns the JSON representation of the given type as JSON array. See here for the representation types: https://www.keycloak.org/docs-api/11.0/rest-api/ .For example the type 'USER' would return a list of 'UserRepresentation'.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`type` | String | true | null | The entity type to search for. Supported values are: ROLE, USER, GROUP, REALM.
`max` | Integer | false | 1000 | The max number of entries to return. If set to a higher value than 1000, will be reset to 1000.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.token.logout
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.token.logout)
Logs out keycloak session associated with refreshToken and removes any refresh and access tokens from headers.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`refreshToken` | String | true | null | The refresh token.



## iam.user.add.groups
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.user.add.groups)
Adds groups to a user by group id or name and returns the group ids added.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | true | null | The unique username as uuid.
`groupNames` | String | false | null | The group names to join. If not given, groupIds is required.
`groupIds` | String | false | null | The group ids to join. If not given, groupIds is required.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.user.add.roles
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.user.add.roles)
Adds roles to a given user. Roles must exist beforehand.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`userUuid` | String | true | null | The unique username as uuid.
`username` | String | true | null | The unique username as uuid.
`roleNames` | String | true | null | The role names to join. Can be a comma separated list or a PEL pointing to a list.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.user.create
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.user.create)
Creates a new user and returns its uuid in the body. Throws exception if user already exists.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The unique username.
`email` | String | true | null | The unique email.
`firstName` | String | false | null | The optional first name.
`lastName` | String | false | null | The optional last name.
`groupNames` | String | false | null | The optional groups the user joins.
`roleNames` | String | false | null | The optional roles (permissions) the user must join.
`password` | String | false | null | The password to be set for this user or null in order to let the user choose one on login.
`attributes` | Map | false | null | A map which holds optional attributes to be added to this user.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.user.delete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.user.delete)
Deletes the user with given uuid.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | true | null | The uuid of the user to delete.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.user.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.user.get)
Looks up a user returns it in the body if exists. The response is a JSON array of these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_userrepresentation

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | false | null | The name of the user. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the user. If set, the param username is ignored.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.user.groups
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.user.groups)
Lists all groups, the given user is member of. By default, the response is a JSON array with these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_grouprepresentation

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | false | null | The name of the user. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the user. If set, the param username is ignored.
`max` | Integer | false | 1000 | The max number of entries to return. If set to a higher value than 1000, will be reset to 1000.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.user.list
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.user.list)
Lists all users. The response is a JSON array of these entities: https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_userrepresentation

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`max` | Integer | false | 1000 | The max number of entries to return. If set to a higher value than 1000, will be reset to 1000.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## iam.user.roles
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=iam.user.roles)
Lists all effective role names, the given user is member of.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`username` | String | false | null | The name of the user. If not set, param uuid must be set.
`uuid` | String | false | null | The uuid of the user. If set, the param username is ignored.
`max` | Integer | false | 1000 | The max number of entries to return. If set to a higher value than 1000, will be reset to 1000.
`offset` | Integer | false | 0 | The offset to start return entries.
`filter` | String | false | null | The filter query to additionally filter the result. Not applied if null
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## if
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=if)
Executes the subsequent pipeline only if given condition evaluates to true. By default the full pipeline until the end will be executed. To skip the pipes inside the if definition place the pipe if?end where the if should end.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`true` | String | true | null | Default parameter which points to the expression which must evaluate to true. Only one of true or false param is allowed.
`end` | String | false | null | Defines the end of of the if pipe. If not set, the full pipeline till its end is executed. 
`else` | String | false | null | Defines the else part of the if statement. If value of if evaluates to false, the section right after this else statement is executed until the if?end statement or the end of the pipeline. 



## job
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=job)
Schedules any subsequent pipes of the current pipeline and executes it at the scheduled times.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`cron` | String | false | null | A cron string which configures the execution times. See here to generate a cron string: https://crontab-generator.org/. Required only in case this is a create call.
`stop` | String | false | null | If this param is set, all other params are ignored. It contains the uuid of the job to be canceled.



## jpa.query
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=jpa.query)
Executes a JPA query and returns the result as JSON in the body. NOTE: This pipe is primarily meant for support to monitor the system. Its not accessible by default accounts! This can change at any time without notice!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`query` | String | false | null | The JPA query to be executed.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## log
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=log)
Logs the given input message without changing it. Sets the log message in the body in case body is empty. Doesn't overwrite any existing content in the body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`message` | String | true | null | The message to log. Can be a string or a pipe expression. If null or empty, the full pipe message will be logged.
`level` | String | false | INFO | The log level. Can be one of DEBUG, TRACE, INFO, WARN, ERROR. If null or empty, INFO will be used.



## log.list
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=log.list)
Logs the given number of log lines from specified service.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`service` | String | false | hub | The service to print logs for. If null or empty, the 'hub' will be used.
`lines` | Integer | false | 100 | The number of lines to print in case format is text. 100 is printed when not specified. 
`format` | String | false | text | The format to be returned. One of: text, json
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## log.list.email
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=log.list.email)
Returns the email audit log properties. Only available for developers, system or support users.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`auditId` | String | false | null | The audit id (uuid) of the logged email to return. If null or empty, all emails will be returned matching the given parameters.
`createdAfter` | String | false |  | Returns only those emails created after this date in ISO-8601 format. If null or empty, no after filter will be set.
`createdBefore` | String | false |  | Returns only those emails created before this date in ISO-8601 format. If null or empty, no before filter will be set.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## log.list.environment
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=log.list.environment)
Logs the current environment properties. Only available for developers, system or support users.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`interpolate` | String | false | true | Return all properties with values interpolated? (= ${some.var} is resolved).
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## mail.dump
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=mail.dump)
Fetches new emails from given mail inbox and uploads them into a drive folder.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`protocol` | String | false | imap | The email protocol. One of 'imap' or 'pop3'.
`host` | String | true | null | The email host.
`port` | Integer | true | null | The port of the email host.
`inboxUsername` | String | true | null | The username of the email inbox.
`inboxPassword` | String | true | null | The password of the email inbox.
`driveUsername` | String | true | null | The username of the drive account to upload to.
`drivePassword` | String | true | null | The password of the drive account to upload to.
`path` | String | false | null | The remote folder path in drive where to upload the emails into. For each new email a new sub folder will be created inside this path. If null or empty, uploads to the root folder of the logged in user.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## mail.fetch
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=mail.fetch)
Fetches new emails from given mail inbox and returns them as JSON in the output.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`protocol` | String | false | imap | The email protocol. One of 'imap' or 'pop3'.
`host` | String | true | null | The email host.
`port` | Integer | true | null | The port of the email host.
`inboxUsername` | String | true | null | The username of the email inbox.
`inboxPassword` | String | true | null | The password of the email inbox.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## mail.send
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=mail.send)
Alias: pipe.command.mail

Sends the given message as email. The message's subject and body will be used for in the email accordingly.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`to` | String | true | null | Comma separated list of to email addresses. Never null. If this is an expression and points to comma separated list, an array or a collection, will send an email to any of the entries.
`from` | String | false | Systems default FROM setting. | The from email.
`fromName` | String | false | Systems default FROM name setting. | The from name.
`subject` | String | false | Systems default subject setting. | The subject.
`model` | String | false | null | The optional model to be used in case subject and/or message point to a template.
`message` | String | false | null | By default, the body is used as email message. If this param is set, it will be used as message instead. Can also be a PE which points to a value to be used as the mail message.
`replyTo` | String | false | null | Reply-To email address is used when email receiver uses its mail client's 'reply' function. If not used,the from address is used automatically.
`attachments` | String | false | null | Can be a comma separated list of URI Strings (e.g.: uri:drive:file1, uri:property:global/file2, uri:drive:file1, uri:classpath:pipeforce/file3). Also can point via PEL to a content object or a content collection. If the PEL points to an object differently to an uri or content object, serializes the value to string and attaches this as a text file.



## mail.verify
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=mail.verify)
Alias: pipe.command.email.verify

 Protects any subsequent pipe commands: Pipeline is only executed 
 in case the caller has verified that he is the owner of given 
 email address. To do so, a magic link (verification link) is sent 
 to his email account. Only if the user clicks on this link within 
 a certain amount of time (default is 10min), the subsequent pipe 
 commands are executed. From a technical point of view this is done 
 by putting the current state of the message into a cache which deletes 
 any entries older than 10min. Then, the email with the key to this 
 cache entry (=challenge) is send to the user. If the user clicks on 
 this link, the message is loaded from the cache using the challenge as 
 the key. If the user clicked within 10min, the entry is here, can be 
 loaded and the message execution can be resumed. Otherwise if the user 
 clicks after 10min on the link, no more entry in it. Execution fails. 
 User has to re-request the link.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`email` | String | true | null | The email address to send the challenge to.
`email.whitelist` | String | false | null | A comma separated list of allowed email addresses. Also supports wildcards *. Example: *@domain.com, my@email.com
`email.blacklist` | String | false | null | A comma separated list of blocked email addresses. Also supports wildcards *. Example: *@domain.com, my@email.com
`challenge` | String | false | null | The challenge which will become part of the link in the email when redirecting back.



## map
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=map)
DEPRECATED. Use the set command instead. Maps, calculates and converts data from fields of the input message to fields of the output message.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`reverse` | Boolean | false | false | Reverses the left and right expressions. This is a workaround if for some reason the left sidefor example may not contain special characters.



## memory.info
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=memory.info)
Shows the current system info like memory consumption. Available for system and support users only.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## microsoft.teams.send
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=microsoft.teams.send)
Sends a message to a Microsoft Teams channel.Note: This command needs an additional license + plugin. This is here only for documentation purposes. Ask support@pipeforce.io for more information.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | true | null | The Teams webhook url to post the message to.
`message` | String | true | null | The text message to be send to Teams.



## pdf.create
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=pdf.create)
Creates a new PDF with blank pages.

Expected Input Body: JsonNode  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pages` | String | false | 1 | The number of pages to create. May not be 0 or negative.
`format` | String | false | A4 | The format of the pages to create. One of: A0, A1, A2, A3, A4, A5, A6, LEGAL, LETTER
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## pdf.stamp
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=pdf.stamp)
Writes both text or images to a pdf file under a specific layer. It expects the word pdf file as a pipeline resource in the body and transforms the result back also as a pipeline resource in the body.

Expected Input Body: Raw  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`text` | String | false | null | The text to write on the PDF file. It is required to either enter text or image.
`textSize` | String | false | 18 | The size of the font.
`textColor` | String | false | BLUE | The color of the font like GREEN, RED. YELLOW, aso.
`image` | String | false | null | The image to write on the pdf file. One of param text or image is required. The image must be a content uri an existing content object in the message or a built-in stamp name like APPROVED for example.
`pages` | String | false | 0 | The pages to put the stamp on or use 'ALL' for all pages.
`position` | String | false | TOP_RIGHT | The x,y coordinates of the overlay to write. Must be 2 comma separated float values, e.g.: 123,123. Note: Top right corner within an A4 page is 612,792. Alternatively, relative positioning is possible by using one of: CENTER, TOP_RIGHT, TOP_LEFT aso.Alternatively, value PARAGRAPH activate paragraph positioning. All PARAGRAPH positioned stamps will not overlap each other.
`layer` | String | false | null | The name of the layer to be created for the stamp. If null or empty, no layer is created. The stamp is added then directly to the page without any layer.
`opacity` | Float | false | null | Amount of opacity that should be applied (Must be a value between >= 0.0 and <= 1.0, 0.0 means no opacity, 1.0 means invisible.)
`degree` | Float | false | null | Specifies how many degress the element should be rotated. Negative degree means rotated below x-axis, positive degree means above. Must be a value between >= -180.0 and <= 180.0
`margin` | Collection | false | 20 | Considers page margin when applying stamp. Can be a single value or a comma separated list of 4 entries forsetting margin in this order: [top, right, down, left]
`lineNo` | Integer | false | 0 | Enforces that text is written at a specific line
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## pipeline.delete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=pipeline.delete)
Deletes a persisted pipeline.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The exact name of the pipeline to delete.



## pipeline.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=pipeline.get)
Returns all persisted pipelines matching the given name.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the pipeline to search for. Supports wildcard * matching. If null or empty, returns all entries.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## pipeline.put
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=pipeline.put)
Persists a new pipeline to the system or updates an existing one. The pipeline yaml is expected in the body. Can be null. Returns the updated property in the output.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The unique name of this pipeline within this namespace.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## pipeline.run
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=pipeline.run)
DEPRECATED. Use pipeline.start instead.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name of the pipeline to load and execute.



## pipeline.start
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=pipeline.start)
Loads and executes the persisted pipeline and returns its result in the output.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the pipeline in the property store to load and executed. Can be relative inside current namespace or qualified.
`vars` | String | false | null | A variables map to be put on this pipeline. Note: Any var in this map will overwrite the var in the target pipeline vars scope.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.app.config
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.app.config)
Returns all config resources from apps the current user has access to (role CAN_APP_ is assigned) as a list into the output.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`appNames` | String | false | null | A comma separated list of app names those config must be returned. If null or empty, all configs of all apps are returned, the currently logged in user is assigned to. If there is an app name given which doesnt exist or the current user has no access to, nothing happens for security reasons.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.attachment.chunk.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.attachment.chunk.get)
Returns the chunk (content) of an attachment in the output. Returns empty body if chunk was not found.

Expected Input Body: Void  
Expected Output Body: Byte[]  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the property this attachment belongs to.
`name` | String | false | null | The name of the attachment this chunk belongs to.
`index` | String | false | 0 | The index of the chunk to return.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.attachment.chunk.put
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.attachment.chunk.put)
Adds a chunk of data to the given attachment.

Expected Input Body: Void  
Expected Output Body: Byte[]  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the property this attachment belongs to.
`name` | String | true | null | The name of the attachment this chunk belongs to.
`index` | String | false | null | The index of the chunk. If given, the content of the chunk at given index is replaced with the new content. If null or empty, a new chunk is added to the attachment.
`content` | String | false | null | The content to be added to the chunk. If this parameter is null or empty, the body will be used as content instead.



## property.attachment.content
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.attachment.content)
Returns the content of an property attachment as a byte stream content object into the output.

Expected Input Body: Void  
Expected Output Body: Byte[]  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the property this attachment belongs to.
`name` | String | false | null | The name of the attachment.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.attachment.delete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.attachment.delete)
Removes an attachment and its content from a property.

Expected Input Body: Void  
Expected Output Body: Void  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the property containing the attachment.
`name` | String | true | null | The name of the attachment to be deleted.



## property.attachment.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.attachment.get)
Returns an attachment of a property (without content).

Expected Input Body: Void  
Expected Output Body: Byte[]  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the property this attachment belongs to.
`name` | String | false | null | The name of the attachment to return.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.attachment.list
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.attachment.list)
Lists all attachments of a given property. The content is not part of this list. Use property.attachment.chunk.get in order to retrieve the content data.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the property to list its attachments for.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.attachment.put
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.attachment.put)
Adds an attachment to a property or updates an existing one. Overwrites any existing attachment with same name. If there is content in the body, it will be added as a single chunk to the attachment and will replace any existing chunks. If no content is in body, chunks will not change at all if they exist.

Expected Input Body: Byte[]  
Expected Output Body: Void  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the property containing the attachment.
`name` | String | true | null | The name of the attachment to be created. If an attachment with this name already exists, updates the existing one.
`content` | String | false | null | The content to add as first chunk. Note: If a PEL is set here must evaluate to a string or byte array. If null, an empty attachment with no chunks is created. 
`contentType` | String | false | null | The content type to be used for this attachment.



## property.attachment.put.uri
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.attachment.put.uri)
Sets property attachment to be symlink to resource referenced by uri.

Expected Input Body: Void  
Expected Output Body: Byte[]  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the property this attachment belongs to.
`name` | String | true | null | The name of the attachment.
`uri` | String | true | null | The uri of resource to point symlink to.



## property.copy
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.copy)
Copies a property from one key to another. If target property already exists, overwrites it. NOTE: Doesnt copy the attachments.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The origin path key of the property.Otherwise a new entry is created.
`to` | String | true | null | The target key to copy the property to. If a property with this key already exists, it will be overwritten.



## property.exists
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.exists)
Checks whether a given property exists and returns the boolean result in the body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The path key of the property to check for. 
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.import
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.import)
Imports properties given as JSON document in the body into the property store.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`strategy` | String | false | skip | Defines what to do if a property with same key already exists. Possible values are: update = Update existing fields of the property from the import values. rollback = Do not import at all. Also all other properties wont be imported in this case. skip = Skip the already existing entry but log it. 
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.keys.children
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.keys.children)
Returns all property child keys for a given parent key. For any child 'folder', returns / at the very end.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pattern` | String | true | null | The key pattern of the parent property or properties. Can be a static suffix like my/parent/path or my/parent/path/ or a pattern like my/parent/path/*.  Nested patterns like my/*/path/* are not supported. 
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.keys
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.keys)
Returns all property keys for a given pattern.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pattern` | String | true | null | The key pattern of the properties to search for. Also supports key pattern matching whereas * matches a single part inside a directory in the key and ** everything. For example '/pipeforce/namespace/user/**' would return all properties of all users in the given namespace. Also sub levels of this path. To avoid sub-leveling use the * instead: '/pipeforce/namespace/user/*'. This would return /pipeforce/namespace/user/max' but not /pipeforce/namespace/user/max/contracts'. 
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.list
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.list)
Lists all properties from the store.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`pattern` | String | false | null | The key pattern of the properties to search for. Also supports key pattern matching whereas * matches a single part inside a directory in the key and ** everything. For example '/pipeforce/namespace/user/**' would return all properties of all users in the given namespace. Also sub levels of this key. To avoid sub-leveling use the * instead: '/pipeforce/namespace/user/*'. This would return /pipeforce/namespace/user/max' but not /pipeforce/namespace/user/max/contracts'.
`filter` | String | false | null | This parameter is deprecated. Use param 'pattern' instead.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.move
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.move)
Moves a property from one key to another.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The origin path key of the property.Otherwise a new entry is created.
`to` | String | true | null | The target key to move the property to. If a property with this key already exists, an exception is thrown.



## property.put
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.put)
Saves the value of a property. The property schema must exist in advance.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The path key of the property to save. If property with key already exists, the existing property will be loaded and updated instead. Otherwise a new entry is created.
`value` | String | false | null | The value of the property. May be null or empty.



## property.schema.delete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.schema.delete)
Deletes an existing property schema and its assigned value.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The path key of the property to delete. If property with this key doesnt exist, nothing happens.



## property.schema.put
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.schema.put)
Creates or updates a property schema. This command is intended for provisioning, admin and service tasks. Also consider property.put instead. Returns a result JSON indicating the result of the command which usually is one of: create, update or skip.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The path key of the property to save. If property with key already exists, it will be updated. Otherwise a new entry is created.
`defaultValue` | String | false | null | The default value of the property. May be null.
`value` | String | false | null | The value of the property as a preset. May be null.
`type` | String | false | STRING | The type of the property. One of: STRING, BOOL, INT, LONG, DECIMAL, JSON. This param is considered only in case a new property is created.
`ttl` | Integer | false | null | The time to life of this property in minutes. After this time, the property will be automatically removed from persistence. If null or empty, it wont be deleted. This param is considered only in case a new property is created.
`evalValue` | Boolean | false | true | If true, the value of the property is evaluated before it is stored. Set this to false in order to store the value as it is without any interpretation.
`existStrategy` | String | false | update | In case a property with given key already exists, uses one of these strategies: update = The property is updated/overwritten by the new data. skip = The property is skipped. Nothing is changed in persistence layer. error = An error is thrown in case property already exists.
`attachments` | String | false | null | The attachments to be added to this property. Can be a uri or a PEL. Overwrites existing ones.
`tags` | String | false | null | The initial tags to add to this property. Can be a comma separated list of name value pairs, like this name1:value1, name2:value2.



## property.send.delivery
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.send.delivery)
Sends specified property including attachments as pipeforce delivery.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the property to send.
`message` | String | false | null | By default, the body is used as email message. If this param is set, it will be used as message instead. Can also be a PE which points to a value to be used as the mail message.
`privacyLevel` | String | false | null | The privacy level to use for delivery. One of L01_URL_ONLY, L02_CREDENTIALS, L03_ENCRYPT, L04_ENCRYPT_ALL with L01_URL_ONLY as default.
`model` | String | false | null | The optional model to be used in case point to a template.
`subject` | String | true | null | The subject of produced delivery.
`includeProperty` | String | false | null | Specify id to add property value as additional delivery attachment.
`recipients` | String | true | null | The emails of recipients.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.tag.list
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.tag.list)
Returns all tags for a given property in the body as JSON: {name1:value1, name2:value2}.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The path key of the property to list the tags for.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.tag.put
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.tag.put)
Adds a tag to an existing property. Overwrites any existing one.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The path key of the property to add the tag to.
`tags` | String | false | null | A list of multiple tags to add to the property. Must a be a name-value pair list separated by comma. For example: name1:value1, name2:value2. If no tags are set, nothing happens.
`name` | String | false | null | The name of a single tag to add.
`value` | String | false | null | The value of a single tag to add. Only used in case tag name is not null.



## property.value.expression
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.value.expression)
Executes the given expression on persisted properties and returns the matching ones. This type of search for properties is very powerful since it allows to search on any schemaless structures. But be aware it is low performing on a huge amount of properties.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`select` | String | false | null | Specifies the attributes of each entity to return in the result set. For example person.firstName here would return a list of first names in the result in case the property has an (JSON) object as value which contains such a field. Can be null or set to '*' to return all fields.
`from` | String | true | null | Specifies the properties to be loaded for the search. Can be a relative or absolute property wildcard key path. For example: 'global/object/invoice/*
`where` | String | false | null | Specifies a selection filter to return only the properties those values match the given where filter. For example: invoice.amount > 50 would select only those properties having a field invoice.amount with value bigger than 50. If null, no where filter is applied and all properties values will be selected.
`aggregate` | String | false | null | Defines an expression to be applied on the final result. For example to count all values or to transform them. If null or empty, no aggregation will be applied.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## property.value.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=property.value.get)
Returns the value of a given property.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the property to be returned.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## provision
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=provision)
Executes a specific provision script targeted for a namespace.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`module` | String | false | null | Looks in the specific module for provision scripts. Using current namespaceas default value to load a namespace-specific module.
`path` | String | false | null | Path of the provision script to call. If not specified, uses default path: main.pipe.yaml



## publicform.definition
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=publicform.definition)
Composes full public form definition structure.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`id` | String | true | null | The public form id.
`id` | String | true | null | The public form id.



## publicform.submit
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=publicform.submit)
Stores submitted public form data and attachments. All Form definitions are searched for matching id. Additionally form needs to be marked with 'public: true' property.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`value` | String | true | null | The value of the property.
`id` | String | true | null | The public form id.



## resource
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=resource)
Loads a resource depending on its resource protocol like classpath:, property: or alike.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | false | null | DEPRECATED. Use uri instead.
`uri` | String | true | null | The uri path to load the resource from. If it starts with classpath:pipeforce, a lookup in the classpath subfolder pipeforce is done (other locations are not allowed). If it starts with property: a lookup in the property store is done and the result is thevalue of the property if exists.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## resource.save
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=resource.save)
Expects a resource base64 encoded in the body and saves it as a resource to hub.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path to save the resource to.



## rpa.website.close
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=rpa.website.close)
Closes website and releases all used resources.Note: The pipe is BETA and not intended to be used in production!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  



## rpa.website.open
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=rpa.website.open)
Opens a website and sets its browser instance as 'var.browser'. Note: The pipe is BETA and not intended to be used in production!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | true | null | The url of the web page to open.



## rpa.website.scrap
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=rpa.website.scrap)
Scraps data from the current website and returns the result in the body.Note: The pipe is BETA and not intended to be used in production!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`xpath` | String | true | null | Executes the given xpath expression on the current page and puts the result in the body. In case the xpath returns more than one results, adds an array to the body. Otherwise the body only contains the single result value.



## script.run
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=script.run)
Executes a given script at server side and returns the output of the script in the output. Note: The script must define a function called command(). Optionally, the function argument pi can be used to access the current message (pi.message) or the logger (pi.log).

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`script` | String | false | null | The script to be executed.
`path` | String | false | null | The path to the script to be loaded Currently only the protocol property: is supported which points to a property in the property store and loads its value as script.
`language` | String | false | js | The script language to be used. Possible values: js, groovy.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## server.info
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=server.info)
Returns information about the current server. For example the version it is running under. Returns a flat JSON with these keys: status, namespace, domain, edition, stage, tag, build, version, versionMajor, versionMinor, versionBugfix

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## service.start
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=service.start)
Starts a service defined in services config.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name of the service to start. 



## service.stop
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=service.stop)
Stops one the service.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name of the service. 



## set.body
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=set.body)
Sets a value in the body. Overwrites any existing value in the body. The value to be set can be a constant or an expression.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`value` | String | true | null | A string or an expression to be used as the value to be set.
`format` | String | false | auto | Converts a string value to the given target format if possible. If set to 'auto' tries to detect the target format by inspecting the value string. If set to 'none' doesnt apply any conversion.



## set
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=set)
Sets a value in the pipe message. The value to be set can be a constant or an expression.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`value` | String | true | null | A string or an expression to be used as the value to be set.
`to` | String | false | null | DEPRECATED. Use param output instead.
`mapping` | String | false | null | A list of mapping rules to be applied to the given input value.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.



## set.var
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=set.var)
Sets a value in the vars scope. Overwrites any existing var in the vars scope. The value to be set can be a constant or an expression.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | A string or an expression to be used as key of the var to be set.
`value` | String | true | null | A string or an expression to be used as the value to be set.
`format` | String | false | auto | Converts a string value to the given target format if possible. If set to 'auto' tries to detect the target format by inspecting the value string. If set to 'none' doesnt apply any conversion.



## sftp.delete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=sftp.delete)
Deletes a file or folder on the SFTP server.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | false | null | The path to the file or folder to delete. If path ends with / a folder is expected to be deleted.
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## sftp.download
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=sftp.download)
Downloads a file from a SFTP server. The file is written as content object to output.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path of the file to download.
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## sftp.list
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=sftp.list)
Lists all files of a given folder. The result is written to output.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | false | / | The path to the folder to list.
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## sftp.mkdir
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=sftp.mkdir)
Creates a new directory on the SFTP server.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | true | null | The path where to create the folder.
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## sftp.rename
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=sftp.rename)
Renames a file or folder on the SFTP server.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`fromPath` | String | false | null | The origin path to the resource to rename.
`toPath` | String | false | null | The new path / name of the resource.
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## sftp.upload
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=sftp.upload)
Uploads a file to a SFTP server. The file is expected to be in the input.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | false | / | The path to upload to. If this ends with a slash / it is expected to be a folder name. The file name will be attached from the input file which must be a content object in this case.
`username` | String | false | null | The username
`password` | String | false | null | The password
`host` | String | false | null | The host
`port` | String | false | null | The port
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.



## slack.send
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=slack.send)
Sends a text message via webhook url to Slack. Also see: https://api.slack.com/messaging/webhooks

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | true | null | The Slack webhook url to post the message to. See here to generate one: https://api.slack.com/messaging/webhooks
`text` | String | true | null | The text message to be send to Slack.



## sql.query
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=sql.query)
Executes a (read-only) SQL query and returns the result as JSON in the body. NOTE: This command is primarily meant for developers and admins to monitor the system. It should not be used in production workflows! It can change at any time without notice!

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`query` | String | false | null | The SQL query to be executed.
`datasource` | String | false | hub | The name of the datasource to be used.
`columnName` | String | false | inline | How to add the column names. Possible values are inline = with each value, none = No column names at all. Any other value will be interpreted to add the column names in a separate property having exactly this individual name.
`dataField` | String | false | data | If given, places the data inside a separate property with this name.
`columnField` | String | false | columns | If given, places the column names inside a separate property with this name.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## switch
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=switch)
Evaluates each switch statement. Takes the value part of the first match and writes it to the given output. If no output is given, writes it to the body. Any param key will be the selection expression which needs to evaluate to a boolean true or false and any value will be the selected value.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## theme
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=theme)
Returns the resources for a given theme in the body and enrich headers with appropriate Content-type. Caches the resources.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`clearCache` | Boolean | false | null | If true, the current theme cache is cleared.
`resource` | String | true | logo | The type of resource to be loaded. Must be one of: background, logo, pipeforce-logo. If null or invalid value, falls back to default value.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## transform
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=transform)
This transformer converts the input to an output format by applying the given template engine. By default the current message is provided as model inside the template context so you can access body, vars or headers similar to the default PEL approach.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`iterate` | String | false | pel | If true, the input is expected to be a list which will be iterated. The template is then applied on each iteration row and the result is added to a target list.
`groupBy` | String | false | null | An expression to apply on the target list in order to group the result of a row into. If the expression returns false, the row result is added to the end of the list.If null or empty, each row result creates a new entry in the target list.
`engine` | String | false | pel | The template engine to be used. Currently 'freemarker' and 'pel' is supported.
`modelName` | String | false | null | The name of the root model under which the input can be accessed inside the template. If null or empty, then the input defines the model names.
`template` | String | true | null | The template to be used for the transformation. It can the template text itself as string or a qualified uri pointing to a template resource like this for example: $uri:property:/my/template/path
`input` | String | false | null | Defines where to read the input from as PEL. If this param is missing, the input will be read from the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## transform.ftl
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=transform.ftl)
This transformer uses the FreeMarker template engine for its transformation. It expects the template to be in the body or in the template param, transforms it and puts the result  to the output (as a content object).

Expected Input Body: Raw  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`model` | String | false | null | The model to be placed into the template scope. If null, the message is used as model
`template` | String | false | null | The template to be used for the transformation. If null, the template is expected in the body. Otherwise this param value is used. It can be a PE, a static string or a qualified uri (for example uri:classpath:/my/template/path) pointing to the template.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## transform.html2docx
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=transform.html2docx)
Takes html text that is expected in the body, (as pipeline resource) and converts it back to docx document and then writes to output.

Expected Input Body: Raw  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## transform.pdf2png
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=transform.pdf2png)
Takes pdf that is expected in the body, (as pipeline resource) and converts it back to body (as pipeline resource) as a collection of png images.

Expected Input Body: Raw  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dpi` | String | false | null | DPI to use for conversion. 300 DPI is used when not specified.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## transform.png2pdf
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=transform.png2pdf)
Takes collection of pngs that is expected in the body (as pipeline resource) and converts it back to body (as pipeline resource) to pdf document.

Expected Input Body: Raw  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dpi` | String | false | null | DPI to forcibly use for conversion.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## transform.word2pdf
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=transform.word2pdf)
DEPRECATED. Use microsoft.word.export.pdf instead. Takes a word file (.docx) that is expected in the 
body and converts
it to pdf and stores it back into the body.

Expected Input Body: Raw  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`path` | String | false | null | Provides the URL the word document is located at. If set, it uses REST PDF conversion service instead of library.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## transform.wordtemplate
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=transform.wordtemplate)
Transforms velocity template expressions in word files. It expects the template to be in the body or in thetemplate param, transforms it and puts the result back to the body as byte array content.

Expected Input Body: Raw  
Expected Output Body: Raw  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`model` | String | true | null | The model to be placed into the template scope. May not be null.
`template` | String | false | null | The template to be used for the transformation. If null, the template is expected in the body. Otherwise this param is used. It can be a PE, a static string or a qualified uri (for example uri:classpath:/my/template/path.docx) pointing to the template.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## translate
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=translate)
Translates the given text to the given target language. Expects the input by default in the body and writes the result by default back to the body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`text` | String | true | null | The text to be translated.
`targetLanguage` | String | false | EN | The target language to transform the text to. Supported values: DE, EN, FR, IT, JA, ES, NL, PL, PT, RU, ZH
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.
`apiKey` | String | false | null | The alternative API key to connect to the service. If null or empty, the default one will be used, as defined by the default backend settings.
`restUrl` | String | false | null | The URL to be called by the command. If null or empty, the default url will be used as defined in the backend.
`filter` | String | false | null | A PEL as filter to be applied to the output data before it is returned by this command. If null or empty, no filter is applied.



## unzip
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=unzip)
Unzips a given zipped content from the body and puts the uncompressed content into the output. Note: Currently only files in the root level of the zip are supported.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## validate.json
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=validate.json)
Validates the JSON body of the message against a given JSON schema. See https://json-schema.org/. 

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`schema` | String | false | null | The name of the schema to be used for validation. Can be a name of a registered internal schema or a url pointing to a external location of a schema. If no schema is given, at least a check is done whether the body contains a valid JSON/YAML format.
`version` | String | false | V7 | The version of the schema specification to be used. One of: V4, V6, V7
`path` | String | false | null | A pipe expression pointing to the JSON inside the pipe message validation is required for. If missing, null or empty, the body is used by default.



## webhook.delete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=webhook.delete)
Deletes an existing webhook. If no such webhook exists, nothing happens.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | true | null | Id of the webhook to delete.



## webhook.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=webhook.get)
Returns all persisted webhooks as a list.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | false | null | Id of the single webhook to return. If null or empty, all webhooks will be returned.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## webhook.put
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=webhook.put)
Creates a new webhook or updates an existing one and returns its metadata.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`eventKey` | String | true | null | Id of the event to be fired when hook was called.
`pipeline` | String | false | null | DEPRECATED. Stored pipeline reference key.
`uuid` | String | false | null | The id of an existing webhook. If given, tries to update this webhook instead of creating a new one.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## webhook.receive
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=webhook.receive)
Runs a webhook identified by its uuid.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`uuid` | String | true | null | The uuid of the webhook.



## webhook.send
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=webhook.send)
Sends a webhook message to an external system. Returns a JSON in the body like {result:STATUS} whereasSTATUS is the response string sent back by the webhook target system. Usually this is 'ok' if everything was OK. Consult the documentation of the webhook target system about the STATUS codes.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`url` | String | true | null | The webhook url to post the message to.
`message` | String | false | null | The message to be send in the POST body to the webhook. Must be a valid JSON.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.deploy
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.deploy)
Deploys a given BPMN from the body or a given property into the underlying workflow engine.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name to deploy the workflow under.
`appId` | String | false | null | The appId to be used to prefix the process name with: appId_workflowname. If null or empty no prefix is appended.
`propertyKey` | String | false | null | The optional key of a workflow property containing a BPMN as value. If this is given, name and appId will be extracted from this key in case these params are empty. If this propertyKey is missing, the BPMN is expected to be in the body.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.deployment.find
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.deployment.find)
Finds all deployments from the workflow engine matching given parameters and puts them into the body.

Expected Input Body: JsonNode  
Expected Output Body: Deployment  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | Name of the deployment. Exact match.
`id` | String | false | null | Id of the deployment. Exact match.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.event
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.event)
Sends an event message to a message endpoint inside 
a given workflow. As payload of the event message, 
the current pipe message will be used as input.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`processInstanceId` | String | true | null | The processInstanceId which refers to the process to be notified by this event. One of businessKey or processInstanceId must be given.
`businessKey` | String | false | null | The business key of the process which needs to be informed by the event. One of businessKey or processInstanceId must be given.
`messageName` | String | true | null | The name of this message. It is used to find the endpoint to be triggered in the workflow.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.find.processinstances
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.find.processinstances)
Returns all process instances matching the given criteria.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`processInstanceBusinessKey` | String | false | null | Filter tasks by businessKey.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.history.tasks
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.history.tasks)
Returns all finished tasks matching the given criteria.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dueBefore` | String | false | null | Shows all tasks that are due before this ISO8601 date. Optional
`assignee` | String | false | null | Filter tasks by assignee.
`includeVariables` | String | false | false | Should each task also list its historic variables?
`processInstanceId` | String | true | null | Filter tasks by process instance id.
`processInstanceBusinessKey` | String | false | null | Filter tasks by businessKey.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.member.message
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.member.message)
Sends a message to the given workflow member. In case the workflow member is not already added to the workflow model, adds a new entry to a given workflow model, which is usually a data model (JSON) with a single member structure like this: workflowModel.members[someUserId] whereas in this level user, taskUrl and shareUrl will be added if required.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`workflowModel` | String | true | null | The workflow model where to add the new user at (inside the sub element workflowModel/members/[userId)]. Can be a PEL which points to an loaded instance or a uri which points to a workflow model instance key.
`userId` | String | false | null | The uuid of the user to add as member to the workflow model. One of userId or username is required.
`username` | String | false | null | The username of the user to add as member to the workflow model. One of userId or username is required.
`resourcePath` | String | false | null | The path to a resource or folder to create a share from for the new member. If null or empty, no share is created.
`taskUrl` | String | false | null | The url of a workflow task for the new member. If null or empty, no task is shown.
`subject` | String | false | null | The subject of the invite message.
`message` | String | false | null | The invite message to be used to send an invite email to the new member. Can be a text message, a uri or content object template.
`model` | String | false | null | The model to be used in the invite message template.



## workflow.model.attachment.get
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.model.attachment.get)
Returns property.attachment.content from process model property attachment.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`processInstanceId` | String | true | null | The process instance id.
`fileName` | String | true | null | The attachment name.



## workflow.model.attachment.put
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.model.attachment.put)
Does property.attachment.put to process model property attachment. 

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`processInstanceId` | String | true | null | The process instance id.
`fileName` | String | true | null | The name of the attachment to be created. If an attachment with this name already exists, updates the existing one.



## workflow.model
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.model)
Utility command to easier workflow model handling.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`mappings` | String | false | null | A list of mapping rules to be applied to the given workflow model. See online docs for more details about such mapping rules.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.tasks.open
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.tasks.open)
Returns all open tasks grouped by assignee. Returned parameters are dynamically and depend on the underlying workflow engine. Default result format is [{id:taskId, name:taskName, assignee:userId, created:createdDate, due:dueDate, tenant:tenantId}, ...]. For a detailed description about all returned attributes see the default implementation: https://docs.camunda.org/manual/7.7/reference/rest/task/get-query/

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dueBefore` | String | false | null | Shows all tasks that are due before this ISO8601 date. Optional
`assignee` | String | false | null | Filter tasks by assignee.
`processInstanceId` | String | false | null | Filter tasks by process instance id.
`processInstanceBusinessKey` | String | false | null | Filter tasks by businessKey.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.tasks.open.reminder
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.tasks.open.reminder)
Sends a reminder email to each assignee having open tasks matching given criteria.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dueBefore` | String | false | null | Shows all tasks that are due before this ISO8601 date. Optional
`assignee` | String | false | null | Filter tasks by assignee.
`processInstanceId` | String | false | null | Filter tasks by process instance id.
`processInstanceBusinessKey` | String | false | null | Filter tasks by businessKey.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.start
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.start)
Starts a new instance of a process in the workflow engine. 
The given pipe message will be serialized to JSON and
put as variable <code>pipeJson</code> into context of the 
process (process variables).
Returns the input message unchanged.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`key` | String | true | null | The key of the process to start in the workflow engine.
`businessKey` | String | false | null | The business key of the process to start in the workflow engine for later references.
`variables` | String | false | null | A map of variables to be send to the workflow process. If this param is missing, the full pipeline message is flattened and then send to the workflow process as variables.
`workflowModelInstanceKey` | String | false | null | The optional property key of the central process model instance to be used. Will be passed under this name to the process engine as process variable.Note: The model instance key must start with an app path followed by an object path. For example global/app/myApp/object/someObject/v1/instance/SOME_UUID.
`workflowStartedBy` | String | false | null | The name of the process variable which holds the uuid of the user who started this process using this command. If null or empty, the currently logged-in user willbe used instead.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.task.complete
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.task.complete)
Completes a given workflow task and puts any resulting variable from the task in the body.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`taskId` | String | true | null | The id (not name!) of the task to complete.
`variables` | String | false | null | A map of variables to be passed to the task. Can be null.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.tasks
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.tasks)
Returns all tasks for a given workflow. Returned parameters are dynamically and depend on the underlying workflow engine. Default result format is [{id:taskId, name:taskName, assignee:userId, created:createdDate, due:dueDate, tenant:tenantId}, ...]. For a detailed description about all returned attributes see the default implementation: https://docs.camunda.org/manual/7.7/reference/rest/task/get-query/

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`dueBefore` | String | false | null | Shows all tasks that are due before this ISO8601 date. Optional
`assignee` | String | false | null | Filter tasks by assignee.
`processInstanceId` | String | false | null | Filter tasks by process instance id.
`processInstanceBusinessKey` | String | false | null | Filter tasks by businessKey.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## workflow.undeploy
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.undeploy)
Undeploys a given BPMN from workflow engine.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | true | null | The name of the deployment to remove.
`onError` | String | false | EXIT | What to do if an error happened in this command?



## workflow.users
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=workflow.users)
Returns all users eligible to participate in given workflow.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`processDefinitionId` | String | false | null | The id of the process definition.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



## zip
[(Show in UI)]
(https://enterprise.pipeforce.org/#/pipeform?command=zip)
Compresses a given content in the body and puts the compressed data into the output. If content is a content collection, puts all entries in the resulting zip file. Note: Currently a nested content collection is currently not supported! Any content entry must be at the root level.

Expected Input Body: JsonNode  
Expected Output Body: JsonNode  


Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
`name` | String | false | null | The name of the final zip file. If not given, the name will be set by this rule: If it is a single entry, uses the name of the entry + .zip. If there are multiple entries, creates a random name + .zip
`level` | String | false | null | Sets the compression level 0-9. If not set, the default level is used which could vary.
`output` | String | false | null | Defines a PEL where to write the result of this command. If null or empty, then the result is written to the body.



