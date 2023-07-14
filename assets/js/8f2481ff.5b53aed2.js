"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[8069],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>h});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(a),h=i,m=u["".concat(s,".").concat(h)]||u[h]||d[h]||r;return a?n.createElement(m,o(o({ref:t},c),{},{components:a})):n.createElement(m,o({ref:t},c))}));function h(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var p=2;p<r;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},7580:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var n=a(7462),i=(a(7294),a(3905));const r={slug:"/apigateway"},o="API Gateway",l={unversionedId:"guides/apigateway",id:"guides/apigateway",title:"API Gateway",description:"Since Version: 9.0",source:"@site/docs/guides/190_apigateway.md",sourceDirName:"guides",slug:"/apigateway",permalink:"/docs/apigateway",draft:!1,editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/190_apigateway.md",tags:[],version:"current",sidebarPosition:190,frontMatter:{slug:"/apigateway"},sidebar:"tutorialSidebar",previous:{title:"19. Encryption",permalink:"/docs/guides/encryption"},next:{title:"Tutorial 1: Basics",permalink:"/docs/tutorials/basics"}},s={},p=[{value:"Core Features",id:"core-features",level:2},{value:"Create and edit endpoint",id:"create-and-edit-endpoint",level:2},{value:"Enabled",id:"enabled",level:2},{value:"Mocked",id:"mocked",level:2},{value:"Weight",id:"weight",level:2},{value:"Pattern",id:"pattern",level:2},{value:"Method",id:"method",level:2},{value:"Target",id:"target",level:2},{value:"Pipeline",id:"pipeline",level:3},{value:"Service",id:"service",level:3},{value:"Service Path Variables",id:"service-path-variables",level:4},{value:"Message",id:"message",level:3},{value:"Auth",id:"auth",level:2},{value:"Caching",id:"caching",level:2},{value:"Report an Issue",id:"report-an-issue",level:2}],c={toc:p};function d(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"api-gateway"},"API Gateway"),(0,i.kt)("p",{class:"theme-doc-version-badge badge badge--secondary"},"Since Version: 9.0"),(0,i.kt)("p",null,"An important component of PIPEFORCE is the API Gateway. It allows to manage API endpoints so external partners and systems can connect to your PIPEFORCE internal pipelines or microservices. To put it into a nutshell, the API Gateway can help you in these main spaces:"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Protect")," - Protect your API endpoints using authentication, authorization and TLS terminition in order to make sure only authorized people can use your API within given borderlines."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Understand")," - You want to understand how people use your APIs, so we added logging, monitorizing and analytics features."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Monetize")," - Optionally, if you would like to monetize your API calls, you can connect this to external billing systems."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Serve")," - Support for underlying microservice and pipeline call management. In case you have multiple micorservices and want to combine the result of them into a single response. Manage path mappings in order to keep names to external world constant even if internal microservice or pipeline structure and naming changes."),(0,i.kt)("h2",{id:"core-features"},"Core Features"),(0,i.kt)("p",null,"The core features and goals of the API Gateway are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Authentication")," - There is only one entry point which handles authentication and authorization. Otherwise, this has to be re-implemented in any microservice or app again and again."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"HTTPS / TLS Termination")," - The HTTPS communication and its certificates is handled at a central point so microservices and apps are not required to deal with this internally."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"No internet exposure required")," - Microservices and apps are not required to be exposed to the internet which improves security since no ports must be opened managed and secured."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Better Monitoring & Tracing")," - All incoming requests will be logged at a central point and can be monitored afterwards with seamless following of the microservice call paths."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Decoupling & Transparency")," - Changes in microservices in the background (for example refactorings in names or paths) can be done fully transparent to the client caller. Also auto-scaling and resilency can be managed by the gateway then. Request paths can be easily re-mapped to internal paths."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Better Mocking & Testing")," - Endpoins can be mocked which simplifies development and testing in a team, since the API contract can be defined and discussed with the client long time before the microservice or app is up and ready to accept its first request."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Aggregation")," Combine responses from multiple pipelines and microservices and return the result in one single response. "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Transformation & Filtering")," - Transform the the request or the response of pipelines or microservices into other structures of formats. For example in case a microservice returns a response in a special format, the API gateway can translate it into a common format (for example SOAP \u2192 REST). Manipulate headers. And more.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Auto-polling of async results")," - In case an endpoint calls an async target in a microservice or pipeline, the API Gateway endpoint can be configured so the caller will automatically do long-polling until the result is ready to be fetched."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Caching")," - Resonses can be cached, so microservices and pipelines must not be called on any request. This can improve performance a lot. ")),(0,i.kt)("h2",{id:"create-and-edit-endpoint"},"Create and edit endpoint"),(0,i.kt)("p",null,"In order to create a new API endpoint, log-in to the PIPEFORCE portal and go to the Endpoints section. Here, all existing endpoints will be listed. Click on ADD ENDPOINT in order to open the editor to create a new endpoint:"),(0,i.kt)("p",null,(0,i.kt)("img",{src:a(9290).Z,width:"1258",height:"961"})),(0,i.kt)("h2",{id:"enabled"},"Enabled"),(0,i.kt)("p",null,"This setting enables / disables the endpoint. If disabled, requests wont be forwarded to the target. Instead, a HTTP status code ",(0,i.kt)("inlineCode",{parentName:"p"},"503")," (Service Unavailbale) will be send as response to the caller."),(0,i.kt)("h2",{id:"mocked"},"Mocked"),(0,i.kt)("p",null,"If this is enabled, the request wont be forwarded to the target. Instead a mock response will be returned. This can be used for testing for example. Here is an example of such a reponse:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "path": "invoice/123",\n    "headers": {\n        "authorization": [\n            "Basic ZGo2ZWxvcGVyMTpeeXZlaa9wZXIxcHdk"\n        ],\n        "accept": [\n            "*/*"\n        ],\n        "host": [\n            "localhost:8080"\n        ]\n    },\n    "method": "GET",\n    "targetUri": "http://myservice:8080/invoice/123",\n    "body": ""\n}\n')),(0,i.kt)("h2",{id:"weight"},"Weight"),(0,i.kt)("p",null,"In case two pattern match the same request, this parameter indicates which endpoint has highest priority. The one with highest weight number wins in this case."),(0,i.kt)("h2",{id:"pattern"},"Pattern"),(0,i.kt)("p",null,"This field defines the request path pattern to match. If this path matches, this endpoint will be loaded and used. "),(0,i.kt)("p",null,"The full request path always starts with the API Gateway root path which is:"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("a",{parentName:"strong",href:"https://api-NS.pipeforce.net"},"https://api-NS.pipeforce.net"))),(0,i.kt)("p",null,"Note: Replace NS with the namespace of your PIPEFORCE instance.\nSo for example a pattern of ",(0,i.kt)("inlineCode",{parentName:"p"},"/v1/customer")," could be called using this URL:"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("a",{parentName:"strong",href:"https://api-NS.pipeforce.net/v1/customer"},"https://api-NS.pipeforce.net/v1/customer"))),(0,i.kt)("p",null,"This path can use ant style (asterisk) pattern matching. The single asterisk ",(0,i.kt)("inlineCode",{parentName:"p"},"*")," stands for a single folder part. The double asterisk ",(0,i.kt)("inlineCode",{parentName:"p"},"**")," stands for any level of folders. The first matching pattern with the highest weighting value will be used. Examples:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"/customer\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"will match:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/customer")))),(0,i.kt)("li",{parentName:"ul"},"wont match:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/employee"))))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"/customer/*\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"will match:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/customer/123")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/customer/foo")))),(0,i.kt)("li",{parentName:"ul"},"wont match:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/customer/123/contract")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/custoomer/foo/bar/123")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/employee"))))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"/customer/**\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"will match:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/customer/123")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/customer/foo")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/customer/123/contract")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/custoomer/foo/bar/123")))),(0,i.kt)("li",{parentName:"ul"},"wont match:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/employee"))))),(0,i.kt)("h2",{id:"method"},"Method"),(0,i.kt)("p",null,"This field defines the HTTP methods accepteds by this endpoint. For example PUT, GET, POST. Only if a request is made using one of the HTTP methods selected here, it will be forwarded to the target. Otherwise a HTTP status ",(0,i.kt)("inlineCode",{parentName:"p"},"405")," (Method Not Allowed) will be returned to the client."),(0,i.kt)("p",null,"In order to allow any method, use the asterisk ",(0,i.kt)("inlineCode",{parentName:"p"},"*")," (wildcard)."),(0,i.kt)("h2",{id:"target"},"Target"),(0,i.kt)("p",null,"This defines the target where to forward the request to."),(0,i.kt)("h3",{id:"pipeline"},"Pipeline"),(0,i.kt)("p",null,"If this target is selected, the request will be forwarded to a data pipeline as defined in the ",(0,i.kt)("strong",{parentName:"p"},"Path")," field. The pipeline will be executed sync and the body of the pipeline will be returned as body response to the caller."),(0,i.kt)("h3",{id:"service"},"Service"),(0,i.kt)("p",null,"This target forwards any request to a microservice deployed inside the cluster and managed by PIPEFORCE. Its mandatory to define the name of this service, the port and the service path to forward the request to."),(0,i.kt)("h4",{id:"service-path-variables"},"Service Path Variables"),(0,i.kt)("p",null,"In most cases not all API endpoints will be configured manually. Instead, a wildcard pattern is defined which matches all API calls of a certain group and forwards such requests."),(0,i.kt)("p",null,"Let\u2019s assume we have a pattern like this ",(0,i.kt)("inlineCode",{parentName:"p"},"/customer/**"),", which will forward to the ",(0,i.kt)("inlineCode",{parentName:"p"},"http://customer:8080/order")," service. So in this example any request path starting with ",(0,i.kt)("inlineCode",{parentName:"p"},"/customer/")," will be forwarded to this service endpoint. But what if we have more than one endpoint target uris like  ",(0,i.kt)("inlineCode",{parentName:"p"},"http://customer:8080/order")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"http://customer:8080/contract"),"?"),(0,i.kt)("p",null,"In this case, service path variables for the target path can be used: The path variables are automatically provided whereas each wildcard will be numbered from left to right starting with 1. These numbers will become the variable names. Lets see this example endpoint pattern:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"/customer/*/**\n")),(0,i.kt)("p",null,"Since there are two wildcard sections ",(0,i.kt)("inlineCode",{parentName:"p"},"*")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"**"),", there will be finally two path variables ",(0,i.kt)("inlineCode",{parentName:"p"},"{1}")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"{2}")," which can be used in the target path. For example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"/api/{1}/{2}\n")),(0,i.kt)("p",null,"So a API call of ",(0,i.kt)("inlineCode",{parentName:"p"},"/customer/123/order")," will be forwarded to the internal service using the request path ",(0,i.kt)("inlineCode",{parentName:"p"},"/api/123/order")," in this example."),(0,i.kt)("p",null,"Additionally, the variable ",(0,i.kt)("inlineCode",{parentName:"p"},"{0}")," has a special meaning: It contains the full path."),(0,i.kt)("p",null,"For example, lets assume the path pattern from above ",(0,i.kt)("inlineCode",{parentName:"p"},"/customer/*/**")," and a matching request of ",(0,i.kt)("inlineCode",{parentName:"p"},"/customer/123/order"),": This will provide these path variables to the service path:"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"{0}")," = ",(0,i.kt)("inlineCode",{parentName:"p"},"/customer/123/order")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"{1}")," = ",(0,i.kt)("inlineCode",{parentName:"p"},"123")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"{2}")," = ",(0,i.kt)("inlineCode",{parentName:"p"},"order")),(0,i.kt)("h3",{id:"message"},"Message"),(0,i.kt)("p",null,"This target forwards the request as a message into the internal message bus on the pipeforce default broker with the routing key as configured. The body of the request will become the payload of the message."),(0,i.kt)("p",null,"If polling is set to true, a location redirect will be returned to the caller until the final result is available."),(0,i.kt)("h2",{id:"auth"},"Auth"),(0,i.kt)("p",null,"This toggle enables authentication for this endpoint: If enabled, it will be checked wether a valid ",(0,i.kt)("inlineCode",{parentName:"p"},"Authorization")," header exists in request and whether the authentication in it is valid. This can be a Bearer token, a Basic (username and password) auth or any other supported authorization value. "),(0,i.kt)("p",null,"Additionally, if authentication is enabled, also authorization is possible: By optionally using the Roles and Groups selection fields you can select the roles and groups the authorized user must be member of at least one of each in order to grant access. "),(0,i.kt)("h2",{id:"caching"},"Caching"),(0,i.kt)("p",null,"In order to enable caching for this endpoint, you can activate this toggle."),(0,i.kt)("p",null,"If enabled, caching works like this:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Request comes in."),(0,i.kt)("li",{parentName:"ol"},"The request path and method will used in order to calculate the unqiue cache key."),(0,i.kt)("li",{parentName:"ol"},"A cache lookup using this key is made."),(0,i.kt)("li",{parentName:"ol"},"If there is a result in the cache, this will be returned to the client and target is not called at all."),(0,i.kt)("li",{parentName:"ol"},"If there is no result in cache, the request will be forwarded to the caller. The response of the target will be added to the cache before it will be send back to the client."),(0,i.kt)("li",{parentName:"ol"},"If time to live (ttl) of cache entry has been expired -> It will be removed from cache.")),(0,i.kt)("p",null,"By default, only request path and method will be used to calculate the cache key. Optionally, also headers and request parameters can be included here. This will reduce the probability of a false cache match but will slow down response time and also increases probability of non-matches or similar cache entries (in case headers or parameters do change)."),(0,i.kt)("h2",{id:"report-an-issue"},"Report an Issue"),(0,i.kt)("admonition",{title:"Your help is needed!",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"In case you're missing something on this page, you found an error or you have an idea for improvement, please ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/pipeforce/pipeforce.github.io/issues/new"},"click here to create a new issue"),". Another way to contribute is, to click ",(0,i.kt)("strong",{parentName:"p"},"Edit this page")," below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!")))}d.isMDXComponent=!0},9290:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/gateway-endpoint-create-a014d7325fc2699ee47115abdd210e8b.png"}}]);