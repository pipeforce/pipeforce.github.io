"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[2781],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=u(n),m=r,h=c["".concat(s,".").concat(m)]||c[m]||p[m]||i;return n?a.createElement(h,o(o({ref:t},d),{},{components:n})):a.createElement(h,o({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},617:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return d},default:function(){return c}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={},s="Microservice Messaging",u={unversionedId:"guides/microservices/messaging",id:"guides/microservices/messaging",isDocsHomePage:!1,title:"Microservice Messaging",description:"The preferred way each microservice inside PIPEFORCE can communicate with each other is by using messaging, whereas",source:"@site/docs/guides/microservices/020_messaging.md",sourceDirName:"guides/microservices",slug:"/guides/microservices/messaging",permalink:"/docs/guides/microservices/messaging",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/microservices/020_messaging.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Microservices Basics",permalink:"/docs/microservices"},next:{title:"Basics",permalink:"/docs/propertystore"}},d=[{value:"How to connect a microservice with messaging?",id:"how-to-connect-a-microservice-with-messaging",children:[],level:2},{value:"Default Queue Naming",id:"default-queue-naming",children:[],level:2},{value:"Default Topic",id:"default-topic",children:[],level:2},{value:"Default Dead Letter Queue",id:"default-dead-letter-queue",children:[],level:2},{value:"Default Message Keys",id:"default-message-keys",children:[],level:2}],p={toc:d};function c(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"microservice-messaging"},"Microservice Messaging"),(0,i.kt)("p",null,"The preferred way each microservice inside PIPEFORCE can communicate with each other is by using messaging, whereas\nRabbitMQ is the message broker by default."),(0,i.kt)("p",null,"If you're using one of our microservice templates, setting up a library to connect to RabbitMQ and creating the\ndefault channels and bindings is typically already done for you, or there is a best practise to do so."),(0,i.kt)("p",null,"Otherwise follow the documentation on the ",(0,i.kt)("a",{parentName:"p",href:"https://www.rabbitmq.com/documentation.html"},"official RabbitMQ websites"),"."),(0,i.kt)("p",null,"If you're interested in how to send and receive messages using pipelines, go ",(0,i.kt)("a",{parentName:"p",href:"../messaging"},"here"),"."),(0,i.kt)("h2",{id:"how-to-connect-a-microservice-with-messaging"},"How to connect a microservice with messaging?"),(0,i.kt)("p",null,"In case you have deployed your microservice using the command ",(0,i.kt)("inlineCode",{parentName:"p"},"service.start"),", then these environment variables will be\nautomatically provided inside your microservice and can be used to connect to the RabbitMQ messaging service:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"PIPEFORCE_MESSAGING_HOST")," = The cluster-internal hostname of the messaging service."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"PIPEFORCE_MESSAGING_PORT")," = The cluster-internal port of the messaging service."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"PIPEFORCE_MESSAGING_USERNAME")," = The default messaging username for connecting internally."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"PIPEFORCE_MESSAGING_PASSWORD")," = The default messaging password for connecting internally.")),(0,i.kt)("p",null,"How to setup your client in order to connect, depends on your programming language the RabbitMQ client.\nSee the official documentation: ",(0,i.kt)("a",{parentName:"p",href:"https://www.rabbitmq.com/devtools.html"},"https://www.rabbitmq.com/devtools.html")),(0,i.kt)("p",null,"The next step is to create the queues required by your service. See the Default Queue Naming guide below."),(0,i.kt)("p",null,"Now create a binding between your queues, the default topic ",(0,i.kt)("inlineCode",{parentName:"p"},"pipeforce.hub.default.topic")," and the routing key pattern\nof messages your service is interested in."),(0,i.kt)("p",null,"Also remember to setup the dead leader queue in order to not lose any message as mentioned below."),(0,i.kt)("h2",{id:"default-queue-naming"},"Default Queue Naming"),(0,i.kt)("p",null,"By default any microservice is responsible to setup and manage its own queues."),(0,i.kt)("p",null,"Each queue should contain always equal message types. So, for different messages, create additional queues."),(0,i.kt)("p",null,"Queues created by a microservice should follow this naming convention:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"<serviceName>_<queueName>_q\n")),(0,i.kt)("p",null,"Whereas ",(0,i.kt)("inlineCode",{parentName:"p"},"<serviceName>")," is the name of the microservice and ",(0,i.kt)("inlineCode",{parentName:"p"},"<queueName>")," can be any name of the queue. For example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"shoppingcart_orders_q\n")),(0,i.kt)("p",null,"Do not use dashes ",(0,i.kt)("inlineCode",{parentName:"p"},"-")," but replace them by underscores ",(0,i.kt)("inlineCode",{parentName:"p"},"_"),". For example instead of:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"service-shoppingcart_orders_q\n")),(0,i.kt)("p",null,"Use this name:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"service_shoppingcart_orders_q\n")),(0,i.kt)("h2",{id:"default-topic"},"Default Topic"),(0,i.kt)("p",null,"PIEPFORCE automatically creates a default topic exchange on startup with this name: ",(0,i.kt)("inlineCode",{parentName:"p"},"pipeforce.hub.default.topic"),"."),(0,i.kt)("p",null,"PIPEFORCE core services are configured in a way that any event which happens there or is sent using the ",(0,i.kt)("inlineCode",{parentName:"p"},"event.send")," command is also send to this default topic."),(0,i.kt)("p",null,"In case a microservice wants to listen to a certain type of message with a given routing key, it needs to create a binding between the topic ",(0,i.kt)("inlineCode",{parentName:"p"},"pipeforce.hub.default.topic")," and the queue you want to \u201cfeed\u201d this message into."),(0,i.kt)("p",null,"See here for more details about topics, routings and queues: ",(0,i.kt)("a",{parentName:"p",href:"https://www.rabbitmq.com/tutorials/tutorial-five-python.html"},"https://www.rabbitmq.com/tutorials/tutorial-five-python.html")),(0,i.kt)("h2",{id:"default-dead-letter-queue"},"Default Dead Letter Queue"),(0,i.kt)("p",null,"Additionally, a default Dead Letter Queue is automatically configured by PIPEFORCE: ",(0,i.kt)("inlineCode",{parentName:"p"},"pipeforce_hub_default_dlq"),"."),(0,i.kt)("p",null,"Any other queue can be configured in a way to forward messages to this queue if one these rules apply:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The message has been expired (was not processed within a given time period)."),(0,i.kt)("li",{parentName:"ul"},"The message has been declined (nack) by a consumer."),(0,i.kt)("li",{parentName:"ul"},"The maximum amount of messages has been reached for a given queue.")),(0,i.kt)("p",null,"This default dead letter queue is configured in a way to lazy keep the messages and store them into the persistence layer,\nso no messages get lost."),(0,i.kt)("p",null,"Typically in order to setup a dead letter queue for your custom queue, you have to set these arguments accordingly:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'x-dead-letter-exchange = ""\nx-dead-letter-routing-key = "pipeforce_hub_default_dlq"\n')),(0,i.kt)("p",null,"How to set these arguments in your microservice depends on your selected programming language and the RabbitMQ client\nimplementation you're using. See documentation for details: ",(0,i.kt)("a",{parentName:"p",href:"https://www.rabbitmq.com/dlx.html"},"https://www.rabbitmq.com/dlx.html")),(0,i.kt)("p",null,"In case you're using Java + Spring as microservice language for example, it could look like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'return QueueBuilder.durable(Constants.MY_QUEUE)\n    .withArgument("x-dead-letter-exchange", "")\n    .withArgument("x-dead-letter-routing-key", "pipeforce_hub_default_dlq)\n    .build();\n')),(0,i.kt)("h2",{id:"default-message-keys"},"Default Message Keys"),(0,i.kt)("p",null,"Here you can find the default message keys, PIPEFORCE will use for internal events and send messages with these keys\nto the default topic ",(0,i.kt)("inlineCode",{parentName:"p"},"pipeforce.hub.default.topic"),". You can subscribe to these keys using a binding between your queue\nand this default topic."),(0,i.kt)("p",null,"You can also describe to multiple keys using the ",(0,i.kt)("inlineCode",{parentName:"p"},"*")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"#")," patterns. For example in order to listen to all property\nevents, you could subscribe to the key pattern ",(0,i.kt)("inlineCode",{parentName:"p"},"property.*"),"."),(0,i.kt)("p",null,"See here for more details about message key patterns on topics: ",(0,i.kt)("a",{parentName:"p",href:"https://www.rabbitmq.com/tutorials/tutorial-five-python.html"},"https://www.rabbitmq.com/tutorials/tutorial-five-python.html")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Message / Event Key"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"delivery.created")),(0,i.kt)("td",{parentName:"tr",align:null},"In case a new delivery was created.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"delivery.publiclink.created")),(0,i.kt)("td",{parentName:"tr",align:null},"In case a new public link for a delivery was created.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"delivery.publiclink.deleted")),(0,i.kt)("td",{parentName:"tr",align:null},"In case a public link for a delivery has been deleted.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"delivery.attachments.delete.success")),(0,i.kt)("td",{parentName:"tr",align:null},"In case the attachments of a delivery have been deleted.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"delivery.attachments.delete.failed")),(0,i.kt)("td",{parentName:"tr",align:null},"In case the deletion of the attachments have been failed.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"hub.context.started")),(0,i.kt)("td",{parentName:"tr",align:null},"In case hub has context has been started is ready to accept requests but right before the startup phase.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"hub.context.starting")),(0,i.kt)("td",{parentName:"tr",align:null},"In case hub context is about to start. Note: This event is not send to the topic queue since at the time of this, the RabbitMQ connector is not setup yet. This event is just for internal use in hub. Its mentioned here just for completeness reasons.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"hub.setup.finished")),(0,i.kt)("td",{parentName:"tr",align:null},"In case hub setup has been finished.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"hub.setup.starting")),(0,i.kt)("td",{parentName:"tr",align:null},"In case the hub setup is about to be started. This is right after the context has been started but before the setup has been fully finished.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"iam.bruteforce.detected")),(0,i.kt)("td",{parentName:"tr",align:null},"In case a potential bruteforce attach has been detected by IAM.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"iam.login.error")),(0,i.kt)("td",{parentName:"tr",align:null},"In case a login using IAM has been failed.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"property.copied")),(0,i.kt)("td",{parentName:"tr",align:null},"In case a property in the property store has been copied. See PropertyCopiedEvent.java for implementation details.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"property.created")),(0,i.kt)("td",{parentName:"tr",align:null},"In case a property in the property store has been created. See PropertyCreatedEvent.java for implementation details.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"property.deleted")),(0,i.kt)("td",{parentName:"tr",align:null},"In case a property in the property store has been deleted. See PropertyDeletedEvent.java for implementation details.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"property.moved")),(0,i.kt)("td",{parentName:"tr",align:null},"In case a property in the property store has been moved. See PropertyMovedEvent.java for implementation details.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"property.updated")),(0,i.kt)("td",{parentName:"tr",align:null},"In case a property in the property store has been moved. See PropertyUpdatedEvent.java for implementation details.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"usagelog.created")),(0,i.kt)("td",{parentName:"tr",align:null},"A new usagelog entry was created in the property store. See UsageLogCreatedEvent.java for implementation details.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"webhook.<name_of_webhook>")),(0,i.kt)("td",{parentName:"tr",align:null},"In case a webhook call has been occurred. The <name_of_webhook> depends on the setup. You can use the pattern webhook.# to listen to all webhooks.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Depends on key param of command event.send."),(0,i.kt)("td",{parentName:"tr",align:null},"Furthermore whenever the command event.send is called, the payload of this event is also forwarded to the default hub topic using the key param of this command as the messaging key and the body as the payload of the message.")))))}c.isMDXComponent=!0}}]);