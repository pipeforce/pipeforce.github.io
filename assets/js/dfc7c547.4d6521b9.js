"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[6934],{3905:(e,a,t)=>{t.d(a,{Zo:()=>m,kt:()=>c});var n=t(7294);function s(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function i(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?i(Object(t),!0).forEach((function(a){s(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function o(e,a){if(null==e)return{};var t,n,s=function(e,a){if(null==e)return{};var t,n,s={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],a.indexOf(t)>=0||(s[t]=e[t]);return s}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var r=n.createContext({}),d=function(e){var a=n.useContext(r),t=a;return e&&(t="function"==typeof e?e(a):l(l({},a),e)),t},m=function(e){var a=d(e.components);return n.createElement(r.Provider,{value:a},e.children)},p={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},u=n.forwardRef((function(e,a){var t=e.components,s=e.mdxType,i=e.originalType,r=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),u=d(t),c=s,h=u["".concat(r,".").concat(c)]||u[c]||p[c]||i;return t?n.createElement(h,l(l({ref:a},m),{},{components:t})):n.createElement(h,l({ref:a},m))}));function c(e,a){var t=arguments,s=a&&a.mdxType;if("string"==typeof e||s){var i=t.length,l=new Array(i);l[0]=u;var o={};for(var r in a)hasOwnProperty.call(a,r)&&(o[r]=a[r]);o.originalType=e,o.mdxType="string"==typeof e?e:s,l[1]=o;for(var d=2;d<i;d++)l[d]=t[d];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},7467:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>r,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var n=t(7462),s=(t(7294),t(3905));const i={id:"messaging",title:"9. Messaging",sidebar_label:"Basics",slug:"/messaging"},l=void 0,o={unversionedId:"guides/messaging/messaging",id:"guides/messaging/messaging",title:"9. Messaging",description:"Since Version: 7.0",source:"@site/docs/guides/messaging/10_messaging.md",sourceDirName:"guides/messaging",slug:"/messaging",permalink:"/docs/messaging",draft:!1,editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/messaging/10_messaging.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{id:"messaging",title:"9. Messaging",sidebar_label:"Basics",slug:"/messaging"},sidebar:"tutorialSidebar",previous:{title:"8. Content Reference",permalink:"/docs/guides/contentobject"},next:{title:"Events",permalink:"/docs/guides/messaging/events"}},r={},d=[{value:"Receiving messages",id:"receiving-messages",level:2},{value:"Managed Queue",id:"managed-queue",level:3},{value:"Accessing Payload",id:"accessing-payload",level:3},{value:"Using Wildcard Keys",id:"using-wildcard-keys",level:3},{value:"Batched Messages",id:"batched-messages",level:3},{value:"Sending Messages",id:"sending-messages",level:2},{value:"Report an Issue",id:"report-an-issue",level:2}],m={toc:d};function p(e){let{components:a,...t}=e;return(0,s.kt)("wrapper",(0,n.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,s.kt)("p",{class:"theme-doc-version-badge badge badge--secondary"},"Since Version: 7.0"),(0,s.kt)("p",null,"PIPEFORCE has a built-in messaging system, where application messages can be routed between microservices based on conditions like routing\nkeys for example."),(0,s.kt)("p",null,"By default, as internal message broker RabbitMQ is used as a service module: ",(0,s.kt)("a",{parentName:"p",href:"https://www.rabbitmq.com/documentation.html"},"https://www.rabbitmq.com/documentation.html"),". It's one of the most advanced and most widely used messaging broker in the world."),(0,s.kt)("p",null,"In order to send and receive messages to/from this messaging broker, you have two options:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"Develop a microservice using a RabbitMQ client library and deploy it to PIPEFORCE using the ",(0,s.kt)("a",{parentName:"li",href:"../api/commands#servicedeploy-v1"},"service.deploy")," command.\nFor details about writing such a microservice which produces and consumes messages, see the\nsection ",(0,s.kt)("a",{parentName:"li",href:"microservices/messaging"},"messaging and microservices"),"."),(0,s.kt)("li",{parentName:"ul"},"Write a pipeline using the ",(0,s.kt)("a",{parentName:"li",href:"../api/commands#messagereceive-v1"},"message.receive"),"\nand ",(0,s.kt)("a",{parentName:"li",href:"../api/commands#messagesend-v1"},"message.send")," commands and let PIPEORCE manage connections, exchanges, queues, bindings and consumers for you.")),(0,s.kt)("p",null,"This section will cover the second part: How to write pipelines which send and receive messages to/from the messaging\nbroker."),(0,s.kt)("h2",{id:"receiving-messages"},"Receiving messages"),(0,s.kt)("p",null,"Receiving messages in a pipeline is simple: Use the command ",(0,s.kt)("a",{parentName:"p",href:"../api/commands#messagereceive-v1"},"message.receive")," and specify the message key of interest. After you have stored the pipeline, it will be executed every time this key occurs. No need to manage connections, queues, bindings or similar."),(0,s.kt)("p",null,"Let's assume you have a pipeline, which sends an email like this:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  - mail.send:\n      to: "sales@company.tld"\n      subject: "New Sales Order"\n      message: "Hello, a new sales order has been created!"\n')),(0,s.kt)("p",null,"Now you would like to listen for new sales orders. Every time a new such sales order has been\ncreated, we would like to send this email."),(0,s.kt)("p",null,"Let's assume, the unique messaging key ",(0,s.kt)("inlineCode",{parentName:"p"},"sales.order.created")," was defined for this."),(0,s.kt)("p",null,"With this information we can now extend our pipeline easily to listen to messages with this key and automatically send\nan email, every time such a message appears:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  - message.receive:\n      key: "sales.order.created"\n\n  - mail.send:\n      to: "sales@company.tld"\n      subject: "New Sales Order"\n      message: "Hello, a new sales order has been created!"\n')),(0,s.kt)("p",null,"As you can see, we added the command ",(0,s.kt)("inlineCode",{parentName:"p"},"message.receive")," at the very beginning. It's important that this command is always\nat the very beginning and its the only ",(0,s.kt)("inlineCode",{parentName:"p"},"message.receive")," command in the pipeline. After the pipeline has been stored in the property stores, Any command below ",(0,s.kt)("inlineCode",{parentName:"p"},"message.receive"),"\nwill then be executed every time a message with the given key appears."),(0,s.kt)("p",null,"After you stored it, the pipeline then starts to listen: Any time a message with key ",(0,s.kt)("inlineCode",{parentName:"p"},"sales.order.created")," happens, this pipeline will be informed about this and executes any command below ",(0,s.kt)("inlineCode",{parentName:"p"},"message.receive"),". So in this example this will send a new email any time this message happens."),(0,s.kt)("h3",{id:"managed-queue"},"Managed Queue"),(0,s.kt)("p",null,"PIPEFORCE can manage the creation, registration and deletion of exchanges, consumers, queues and bindings automatically for you."),(0,s.kt)("p",null,"As soon as you save a pipeline containing a ",(0,s.kt)("inlineCode",{parentName:"p"},"message.receive")," command to the property store, by default a new queue with a name given by parameter ",(0,s.kt)("inlineCode",{parentName:"p"},"queue")," will be automatically created for you, if not already exists. In case no ",(0,s.kt)("inlineCode",{parentName:"p"},"queue")," parameter is given, the queue name will be automtically derived from the pipeline name (= default name). This default name has the format ",(0,s.kt)("inlineCode",{parentName:"p"},"APPNAME_pipline_PIPELINENAME"),", whereas ",(0,s.kt)("inlineCode",{parentName:"p"},"APPNAME")," will be replaced by the name of the app, the pipeline resides in and ",(0,s.kt)("inlineCode",{parentName:"p"},"PIPELINENAME")," by the name of the pipeline which contains the ",(0,s.kt)("inlineCode",{parentName:"p"},"message.receive")," command."),(0,s.kt)("p",null,"Additionally, a binding and a consumer listening to the given message key will be automatically created for you and linked with the queue. So no queue, binding or consumer management is required by default."),(0,s.kt)("p",null,"If you delete or change a ",(0,s.kt)("inlineCode",{parentName:"p"},"message.receive")," command inside a pipeline, the according consumer will be removed, but the queue and bindings will ",(0,s.kt)("strong",{parentName:"p"},"not")," be deleted by default. "),(0,s.kt)("admonition",{title:"How to change the default?",type:"tip"},(0,s.kt)("p",{parentName:"admonition"},"You can change this default behaviour by using the parameter ",(0,s.kt)("inlineCode",{parentName:"p"},"manageQueue")," which can be set to these values:"),(0,s.kt)("ul",{parentName:"admonition"},(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"false")," = No message entities like queues and bindings will be created or deleted automatically. You have to manage all of this by your own (not recommended)."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"create")," = This is the default. In this case, the queue will be created automatically in case it doesn't exist yet and the bindings will be attached to it. But it ",(0,s.kt)("strong",{parentName:"li"},"wont")," be altered or deleted automatically aftwards."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"delete")," = In this case, the queue will be deleted in case the ",(0,s.kt)("inlineCode",{parentName:"li"},"message.receive")," command has been changed or removed from the pipeline or the pipeline got deleted. The creation of queue and bindings is ",(0,s.kt)("strong",{parentName:"li"},"not")," automated."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"create,delete")," = This combines automation of creation and deletion as described above.")),(0,s.kt)("p",{parentName:"admonition"},"Regardless of the parameter ",(0,s.kt)("inlineCode",{parentName:"p"},"manageQueue"),", the creation, deletion and scaling of the according ",(0,s.kt)("strong",{parentName:"p"},"consumer")," is always done automatically.")),(0,s.kt)("h3",{id:"accessing-payload"},"Accessing Payload"),(0,s.kt)("p",null,"It's also possible to send message with additional data: Which is called the ",(0,s.kt)("strong",{parentName:"p"},"payload"),"."),(0,s.kt)("p",null,"Let's assume, the data structure of a sales order was defined by the integration team and looks like this:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "id": "someSalesOrderId",\n  "date": "23.05.2022, 13:45",\n  "amount": "234 EUR",\n  "customer": "Acme Inc."\n}\n')),(0,s.kt)("p",null,"This is the payload of a message. Such a payload will be automatically provided in the pipeline body to all commands below ",(0,s.kt)("inlineCode",{parentName:"p"},"message.receive"),"."),(0,s.kt)("p",null,"So let's use this payload in order to send more information with our email, like this:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'  pipeline:\n\n    - message.receive:\n        key: "sales.order.created"\n\n    - mail.send:\n        to: "sales@company.tld"\n        subject: "New Sales Order"\n        message: |\n          Hello, a new sales order has been created:\n          Id:       #{body.id}\n          Date:     #{body.date}\n          Amount:   #{body.amount}\n          Customer: #{body.customer}\n')),(0,s.kt)("admonition",{title:"Non JSON payload",type:"tip"},(0,s.kt)("p",{parentName:"admonition"},"In case you're sending a message in a ",(0,s.kt)("strong",{parentName:"p"},"non")," JSON format, for example as a simple text string ",(0,s.kt)("inlineCode",{parentName:"p"},"Hello World!"),", it will be internally wrapped into a JSON envelope using this structure:"),(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "status": 200,\n  "valueType": "string",\n  "value": "Hello World!"\n}\n'))),(0,s.kt)("h3",{id:"using-wildcard-keys"},"Using Wildcard Keys"),(0,s.kt)("p",null,"In some situations you probably would like to listen to all messages of a certain type. So lets assume you would like to\nbe informed about any sales order changes in the sales department and let's assume the integration team publishes all\nchanges to a message key structure like this:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"sales.order.created"),(0,s.kt)("li",{parentName:"ul"},"sales.order.closed"),(0,s.kt)("li",{parentName:"ul"},"sales.lead.created"),(0,s.kt)("li",{parentName:"ul"},"sales.lead.converted"),(0,s.kt)("li",{parentName:"ul"},"sales.incident.created")),(0,s.kt)("p",null,"Now in case you would like to listen to all messages according to sales orders, but not the other ones, you can use a\nkey pattern like this: ",(0,s.kt)("inlineCode",{parentName:"p"},"sales.order.*"),". Note the asterisk ",(0,s.kt)("inlineCode",{parentName:"p"},"*")," which indicates that you're interested in any message\nstarting with ",(0,s.kt)("inlineCode",{parentName:"p"},"sales.order"),". The asterisk means anything of the third section. So you will be informed about:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"sales.order.created"),(0,s.kt)("li",{parentName:"ul"},"sales.order.closed")),(0,s.kt)("p",null,"But you won't be informed about:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"sales.lead.created"),(0,s.kt)("li",{parentName:"ul"},"sales.lead.converted"),(0,s.kt)("li",{parentName:"ul"},"sales.incident.created")),(0,s.kt)("p",null,"This is how the pipeline could look like for example to listen to all sales order actions:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  - message.receive:\n      key: "sales.order.*"\n\n  # Commands to be executed go here...\n')),(0,s.kt)("p",null,"And in this example we listen to all messages which are related to create something in the sales department:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  - message.receive:\n      key: "sales.*.created"\n\n  # Commands to be executed go here...\n')),(0,s.kt)("p",null,"Furthermore, you can use the hash ",(0,s.kt)("inlineCode",{parentName:"p"},"#")," in order to indicate any level. So for example if we would like to listen to anything\ninside the sales department, we could use a pipeline like this:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  - message.receive:\n      key: "sales.#"\n\n  # Commands to be executed go here...\n')),(0,s.kt)("p",null,"The hash ",(0,s.kt)("inlineCode",{parentName:"p"},"#")," matches any level of the message key regardless of the number of periods (sections) in it."),(0,s.kt)("h3",{id:"batched-messages"},"Batched Messages"),(0,s.kt)("p",null,"Sometimes it is required to execute the message listener only for a bunch of messages, not for each single one. This is useful for example for performance reasons in case you have a lot of tiny messages or in case the target accepts only groups of messages. For this you can use the messaging batching feature of PIPEFORCE using these parameters on the ",(0,s.kt)("inlineCode",{parentName:"p"},"message.receive")," command:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"maxBatchSize"),": Buffers messages up to the given size in bytes and then processes this pipeline with all of these messages. The messages will be provided as array to the body. The maximum size is 200KB (204800)."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"maxBatchItems"),": Buffers the amount of messages up to the given number and then processes this pipeline with all of these messages. The messages will be provided as array to the body.")),(0,s.kt)("p",null,"If both parameters are given, the one which matches first is considered."),(0,s.kt)("p",null,"The messages in the buffer are not acknowledged until they got delivered to the pipeline. "),(0,s.kt)("h2",{id:"sending-messages"},"Sending Messages"),(0,s.kt)("p",null,"To send messages in a pipeline, you can use the command ",(0,s.kt)("a",{parentName:"p",href:"../api/commands#messagesend-v1"},"message.send"),"."),(0,s.kt)("p",null,"Here is an example:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  - message.send: \n     key: "sales.order.created"\n     payload: |\n       {\n          "id": "someSalesOrderId",\n          "date": "23.05.2022, 13:45",\n          "amount": "234 EUR",\n          "customer": "Acme Inc."\n        }\n')),(0,s.kt)("p",null,"This example sends a new message with key ",(0,s.kt)("inlineCode",{parentName:"p"},"sales.order.created")," and the given JSON document as payload to the default exchange. By default, the content type of the payload is ",(0,s.kt)("inlineCode",{parentName:"p"},"application/json"),". You can change this by using the parameter ",(0,s.kt)("inlineCode",{parentName:"p"},"contentType"),". In case the payload is different from a JSON document, it will be automatically wrapped into a JSON envelope in order to make sure, the consumers can always expect a valid JSON. The structure of this JSON envelope looks like this example:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "status": 200,\n  "valueType": "string",\n  "value": "Hello World!"\n}\n')),(0,s.kt)("p",null,"The field ",(0,s.kt)("inlineCode",{parentName:"p"},"status")," status indicates whether the value is OK or not. In case there was some problem with the value (for example too big, conversion error or similar), this will be indicated here. The status code is similar to the HTTP status codes. In cases of an error status, also the field ",(0,s.kt)("inlineCode",{parentName:"p"},"statusMessage")," is used which has more information about the error occured."),(0,s.kt)("p",null,"The field ",(0,s.kt)("inlineCode",{parentName:"p"},"valueType")," specifies the content type of the ",(0,s.kt)("inlineCode",{parentName:"p"},"value")," field which can be one of the default JSON types like:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"string")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"object")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"integer")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"number")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"boolean")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"array"))),(0,s.kt)("p",null,"Or any specific content type, defined by the ",(0,s.kt)("inlineCode",{parentName:"p"},"contentType")," parameter of the command ",(0,s.kt)("inlineCode",{parentName:"p"},"message.send"),"."),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"payload")," can also be set to ",(0,s.kt)("inlineCode",{parentName:"p"},"null")," or empty string in case the message has no payload at all. In case the parameter ",(0,s.kt)("inlineCode",{parentName:"p"},"payload")," is missing, the current body content of the pipeline is used as payload."),(0,s.kt)("h2",{id:"report-an-issue"},"Report an Issue"),(0,s.kt)("admonition",{title:"Your help is needed!",type:"tip"},(0,s.kt)("p",{parentName:"admonition"},"In case you're missing something on this page, you found an error or you have an idea for improvement, please ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/pipeforce/pipeforce.github.io/issues/new"},"click here to create a new issue"),". Another way to contribute is, to click ",(0,s.kt)("strong",{parentName:"p"},"Edit this page")," below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!")))}p.isMDXComponent=!0}}]);