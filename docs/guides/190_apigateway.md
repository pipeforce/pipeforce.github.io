# API Gateway

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 9.0</p>

An important component of PIPEFORCE is the API Gateway. It allows to manage API endpoints so external partners and systems can connect to your PIPEFORCE internal pipelines or microservices. To put it into a nutshell, the API Gateway can help you in these main spaces:

**Protect** - Protect your API endpoints using authentication, authorization and TLS terminition in order to make sure only authorized people can use your API within given borderlines.

**Understand** - You want to understand how people use your APIs, so we added logging, monitorizing and analytics features.

**Monetize** - Optionally, if you would like to monetize your API calls, you can connect this to external billing systems.

**Serve** - Support for underlying microservice and pipeline call management. In case you have multiple micorservices and want to combine the result of them into a single response. Manage path mappings in order to keep names to external world constant even if internal microservice or pipeline structure and naming changes.

## Core Features

The core features and goals of the API Gateway are:

- **Authentication** - There is only one entry point which handles authentication and authorization. Otherwise, this has to be re-implemented in any microservice or app again and again.
- **HTTPS / TLS Termination** - The HTTPS communication and its certificates is handled at a central point so microservices and apps are not required to deal with this internally.
- **No internet exposure required** - Microservices and apps are not required to be exposed to the internet which improves security since no ports must be opened managed and secured.
- **Better Monitoring & Tracing** - All incoming requests will be logged at a central point and can be monitored afterwards with seamless following of the microservice call paths.
- **Decoupling & Transparency** - Changes in microservices in the background (for example refactorings in names or paths) can be done fully transparent to the client caller. Also auto-scaling and resilency can be managed by the gateway then. Request paths can be easily re-mapped to internal paths.
- **Better Mocking & Testing** - Endpoins can be mocked which simplifies development and testing in a team, since the API contract can be defined and discussed with the client long time before the microservice or app is up and ready to accept its first request.
- **Aggregation** Combine responses from multiple pipelines and microservices and return the result in one single response. 
- **Transformation & Filtering** - Transform the the request or the response of pipelines or microservices into other structures of formats. For example in case a microservice returns a response in a special format, the API gateway can translate it into a common format (for example SOAP → REST). Manipulate headers. And more.  
- **Auto-polling of async results** - In case an endpoint calls an async target in a microservice or pipeline, the API Gateway endpoint can be configured so the caller will automatically do long-polling until the result is ready to be fetched.
- **Caching** - Resonses can be cached, so microservices and pipelines must not be called on any request. This can improve performance a lot. 

## Create and edit endpoint

In order to create a new API endpoint, loggin to the PIPEFORCE portal and go to the Endpoints section. Here, all existing endpoints will be listed. Click on ADD ENDPOINT in order to open the editor to create a new endpoint:

![](../img/gateway-endpoint-create.png)

## Enabled

This setting enables / disables the endpoint. If disabled, requests wont be forwarded to the target. Instead, a HTTP status code `503` (Service Unavailbale) will be send as response to the caller.

## Mocked

If this is enabled, the request wont be forwarded to the target. Instead a mock response will be returned. This can be used for testing for example. Here is an example of such a reponse:

```json
{
    "path": "invoice/123",
    "headers": {
        "authorization": [
            "Basic ZGo2ZWxvcGVyMTpeeXZlaa9wZXIxcHdk"
        ],
        "accept": [
            "*/*"
        ],
        "host": [
            "localhost:8080"
        ]
    },
    "method": "GET",
    "targetUri": "http://myservice:8080/invoice/123",
    "body": ""
}
```

## Weight

In case two pattern match the same request, this parameter indicates which endpoint has highest priority. The one with highest weight number wins in this case.

## Pattern

This field defines the request path pattern to match. If this path matches, this endpoint will be loaded and used. 

The full request path always starts with the API Gateway root path which is:

**https://api-NS.pipeforce.net**

Note: Replace NS with the namespace of your PIPEFORCE instance.
So for example a pattern of `/v1/customer` could be called using this URL:

**https://api-NS.pipeforce.net/v1/customer**

This path can use ant style (asterisk) pattern matching. The single asterisk `*` stands for a single folder part. The double asterisk `**` stands for any level of folders. The first matching pattern with the highest weighting value will be used. Examples:

```
/customer
```
- will match:
  - `/customer`
- wont match:
  - `/employee`

```
/customer/*
```
- will match:
  - `/customer/123`
  - `/customer/foo`
- wont match:
  - `/customer/123/contract`
  - `/custoomer/foo/bar/123`
  - `/employee`

```
/customer/**
```
  - will match:
    - `/customer/123`
    - `/customer/foo`
    - `/customer/123/contract`
    - `/custoomer/foo/bar/123`
  - wont match:
    - `/employee`

## Method

This field defines the HTTP methods accepteds by this endpoint. For example PUT, GET, POST. Only if a request is made using one of the HTTP methods selected here, it will be forwarded to the target. Otherwise a HTTP status `405` (Method Not Allowed) will be returned to the client.

In order to allow any method, use the asterisk `*` (wildcard).

## Target

This defines the target where to forward the request to.

### Pipeline

If this target is selected, the request will be forwarded to a data pipeline as defined in the **Path** field. The pipeline will be executed sync and the body of the pipeline will be returned as body response to the caller.

### Service

This target forwards any request to a microservice deployed inside the cluster and managed by PIPEFORCE. Its mandatory to define the name of this service, the port and the service path to forward the request to.

#### Service Path Variables

In most cases not all API endpoints will be configured manually. Instead, a wildcard pattern is defined which matches all API calls of a certain group and forwards such requests.

Let’s assume we have a pattern like this `/customer/**`, which will forward to the `http://customer:8080/order` service. So in this example any request path starting with `/customer/` will be forwarded to this service endpoint. But what if we have more than one endpoint target uris like  `http://customer:8080/order` and `http://customer:8080/contract`?

In this case, service path variables for the target path can be used: The path variables are automatically provided whereas each wildcard will be numbered from left to right starting with 1. These numbers will become the variable names. Lets see this example endpoint pattern:

```
/customer/*/**
```

Since there are two wildcard sections `*` and `**`, there will be finally two path variables `{1}` and `{2}` which can be used in the target path. For example:

```
/api/{1}/{2}
```

So a API call of `/customer/123/order` will be forwarded to the internal service using the request path `/api/123/order` in this example.

Additionally, the variable `{0}` has a special meaning: It contains the full path.

For example, lets assume the path pattern from above `/customer/*/**` and a matching request of `/customer/123/order`: This will provide these path variables to the service path:

`{0}` = `/customer/123/order`

`{1}` = `123`

`{2}` = `order`


### Message

This target forwards the request as a message into the internal message bus on the pipeforce default broker with the routing key as configured. The body of the request will become the payload of the message.

If polling is set to true, a location redirect will be returned to the caller until the final result is available.

## Auth 

This toggle enables authentication for this endpoint: If enabled, it will be checked wether a valid `Authorization` header exists in request and whether the authentication in it is valid. This can be a Bearer token, a Basic (username and password) auth or any other supported authorization value. 

Additionally, if authentication is enabled, also authorization is possible: By optionally using the Roles and Groups selection fields you can select the roles and groups the authorized user must be member of at least one of each in order to grant access. 

## Caching

In order to enable caching for this endpoint, you can activate this toggle.

If enabled, caching works like this:

1. Request comes in.
2. The request path and method will used in order to calculate the unqiue cache key.
3. A cache lookup using this key is made.
4. If there is a result in the cache, this will be returned to the client and target is not called at all.
5. If there is no result in cache, the request will be forwarded to the caller. The response of the target will be added to the cache before it will be send back to the client.
6. If time to live (ttl) of cache entry has been expired -> It will be removed from cache.

By default, only request path and method will be used to calculate the cache key. Optionally, also headers and request parameters can be included here. This will reduce the probability of a false cache match but will slow down response time and also increases probability of non-matches or similar cache entries (in case headers or parameters do change).

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::