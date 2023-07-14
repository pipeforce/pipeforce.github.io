"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[4637],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var d=a.createContext({}),s=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(d.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,d=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(n),u=o,h=m["".concat(d,".").concat(u)]||m[u]||p[u]||r;return n?a.createElement(h,i(i({ref:t},c),{},{components:n})):a.createElement(h,i({ref:t},c))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=m;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<r;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7511:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var a=n(7462),o=(n(7294),n(3905));const r={},i="8. Content Reference",l={unversionedId:"guides/content",id:"guides/content",title:"8. Content Reference",description:"Usually you will work with JSON documents in your pipeline most of the time.",source:"@site/docs/guides/80_content.md",sourceDirName:"guides",slug:"/guides/content",permalink:"/docs/guides/content",draft:!1,editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/80_content.md",tags:[],version:"current",sidebarPosition:80,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"FreeMarker Transformer",permalink:"/docs/guides/transformers/freemarker"},next:{title:"Basics",permalink:"/docs/messaging"}},d={},s=[{value:"Attributes",id:"attributes",level:2},{value:"Loading content",id:"loading-content",level:2},{value:"Writing content",id:"writing-content",level:2},{value:"Collection (Folder)",id:"collection-folder",level:2},{value:"Report an Issue",id:"report-an-issue",level:2}],c={toc:s};function p(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"8-content-reference"},"8. Content Reference"),(0,o.kt)("p",null,"Usually you will work with JSON documents in your pipeline most of the time."),(0,o.kt)("p",null,"But sometimes you need to load such JSON documents from resources like the cloud, remote endpoints, files or streams before you can use them. Or you have to load other data types like images, PDFs or similar. The pointer to all of such resources is called a ",(0,o.kt)("strong",{parentName:"p"},"content reference"),". "),(0,o.kt)("p",null,"Before this data can be used, it must be read from the content reference bytewise. Then, it can be parsed to JSON for example, copied or otherwise used."),(0,o.kt)("p",null,(0,o.kt)("img",{src:n(1351).Z,width:"1340",height:"1074"})),(0,o.kt)("p",null,'Each content reference contains optional meta information about the content to be loaded (like the content type or the filename for example) plus the "instruction" how the content can be loaded.'),(0,o.kt)("p",null,"The content reference can be seen as a JSON document with a concrete schema with optional metadata about the data to be loaded. Here is an example of a content reference which points to a file which can be downloaded via HTTP:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "name": "contract.pdf",\n    "created": null,\n    "contentType": "application/pdf",\n    "contentLength": 23000,\n    "content": "$uri:https://somehost/contract.pdf"\n}\n')),(0,o.kt)("p",null,"As you can see, beside some other information, the content reference contains the name of the file to be downloaded and the uri pointing to the location where the file can be downloaded from. This is also called an ",(0,o.kt)("strong",{parentName:"p"},"outbound reference")," since the data is stored on another location."),(0,o.kt)("p",null,"Here is an example which uses an ",(0,o.kt)("strong",{parentName:"p"},"inbound reference")," since the data is embedded into the content reference as base64 encoded byte array:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "name": "my.png",\n    "created": null,\n    "contentType": "image/png",\n    "contentEncoding": "base64",\n    "content": "YXNkYXNkZGFzYkYXNsamzZGphc2Qg...NkcG9pYXNkYXPYWQgc2Fkc2Fsa2Q="\n}\n')),(0,o.kt)("p",null,"Below you can find the attributes of a content reference and their meanings:"),(0,o.kt)("h2",{id:"attributes"},"Attributes"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"th"},"Attribute")),(0,o.kt)("th",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"th"},"Type")),(0,o.kt)("th",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"th"},"Description")))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"name")),(0,o.kt)("td",{parentName:"tr",align:null},"string"),(0,o.kt)("td",{parentName:"tr",align:null},"Optional. The name of the resource.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"created")),(0,o.kt)("td",{parentName:"tr",align:null},"long"),(0,o.kt)("td",{parentName:"tr",align:null},"Optional. The unix timestamp in millis when this resource was created.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"lastUpdated")),(0,o.kt)("td",{parentName:"tr",align:null},"long"),(0,o.kt)("td",{parentName:"tr",align:null},"Optional. The unix timetsmap in millis when this resource was last modified.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"contentType")),(0,o.kt)("td",{parentName:"tr",align:null},"string"),(0,o.kt)("td",{parentName:"tr",align:null},"Optional. The content type of the rsource. If ",(0,o.kt)("inlineCode",{parentName:"td"},"null")," or attribute doesn't exist, it is assumed to be ",(0,o.kt)("inlineCode",{parentName:"td"},"text/plain")," by default. See here for a list of official content types: ",(0,o.kt)("a",{parentName:"td",href:"https://www.iana.org/assignments/media-types/media-types.xhtml"},"https://www.iana.org/assignments/media-types/media-types.xhtml"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"contentLength")),(0,o.kt)("td",{parentName:"tr",align:null},"long"),(0,o.kt)("td",{parentName:"tr",align:null},"Optional. The length of the resource in bytes or -1 or ",(0,o.kt)("inlineCode",{parentName:"td"},"null")," in case the length cannot be determined.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"contentEncoding")),(0,o.kt)("td",{parentName:"tr",align:null},"string"),(0,o.kt)("td",{parentName:"tr",align:null},"Optional. The encoding used to encode the content field. For example ",(0,o.kt)("inlineCode",{parentName:"td"},"base64"),".")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"content")),(0,o.kt)("td",{parentName:"tr",align:null},"object"),(0,o.kt)("td",{parentName:"tr",align:null},"Required. The content (data) of the resource. Which format the data has, depends on its content type and encoding. For example, if contentType is ",(0,o.kt)("inlineCode",{parentName:"td"},"application/json"),", then the data object returns a JSON document which can be encoded as string, node or base64 for example.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"checksum")),(0,o.kt)("td",{parentName:"tr",align:null},"string"),(0,o.kt)("td",{parentName:"tr",align:null},"Optional. The checksum of the content (before encoding).")))),(0,o.kt)("p",null,"Here is an example to load a file from the drive service into the body scope and then access its attributes of the content object from there:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  # Load document from drive and set it as content object in the body\n  - drive.read:\n      path: "invoice.pdf"\n  # Access the attributes of the content object in the body\n  - log:\n      message: "Filename: #{body.name}, Size: #{body.contentLength}" \n')),(0,o.kt)("p",null,'Since it would not make much sense to read the PDF "binary" content into the pipeline as JSON, this data is wrapped in the ',(0,o.kt)("inlineCode",{parentName:"p"},"content")," attribute of the content object. You can write such a content object easily back to any supported target sink:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - drive.read:\n      path: "invoice.pdf"\n  - drive.save:\n      path: "invoice-copy.pdf" \n')),(0,o.kt)("h2",{id:"loading-content"},"Loading content"),(0,o.kt)("p",null,"In order to work with data from a content reference, you have to load (read) such data first."),(0,o.kt)("p",null,"When a content reference has been created, this doesn't mean that the data of this reference has also already been loaded. See this example again: It is a content reference, pointing to a PDF which is located at a remote server. We have already information about this PDF but the data of this PDF was not loaded yet:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "name": "contract.pdf",\n    "created": null,\n    "contentType": "application/pdf",\n    "contentLength": 23000,\n    "content": "$uri:https://somehost/contract.pdf"\n}\n')),(0,o.kt)("p",null,"In order to load the data of a content reference, you have multiple options:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Load into memory using toolings like ",(0,o.kt)("inlineCode",{parentName:"li"},"@convert")," or ",(0,o.kt)("inlineCode",{parentName:"li"},"@json")," for example. "),(0,o.kt)("li",{parentName:"ul"},"Using a command which can do content loading from content references out-of-the-box (see docs wheteher such a command supports this).")),(0,o.kt)("p",null,"Some commands also support a streamed content reference. So data is processed in byte chunks instead of a whole. This way also big data can be processed. But this depends on the implementation of the content object in the backend."),(0,o.kt)("admonition",{type:"warning"},(0,o.kt)("p",{parentName:"admonition"},'Do not load big data into memory! A content reference can also bee seen as a "gatekeeper" in order to make sure, big data is only loaded when required and then by default in a streamed way. Not as a whole.')),(0,o.kt)("p",null,"Here is an example in order to load a small, well known document:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - drive.read:\n      path: "person.json"\n  - set.body:\n        value: "#{@content.load(body.content)}"\n')),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"If not configured otherwise, by default, the data of a content reference in the body of a pipeline is automatically streamed to the client at the end of the pipeline. This means if you place a content reference in the body of a pipeline without loading it, at the end of the request, the data will be automatically loaded and returned to the client.")),(0,o.kt)("h2",{id:"writing-content"},"Writing content"),(0,o.kt)("p",null,"When it comes to writing content, you have to use a command which can load data from a given content reference and write it to a given target sink like ",(0,o.kt)("inlineCode",{parentName:"p"},"drive.save")," for exampl."),(0,o.kt)("p",null,"Another option is to create your own content reference."),(0,o.kt)("p",null,"Some examples:"),(0,o.kt)("p",null,"Create a content reference from a JSON document in the body and write this to drive:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'vars:\n    someJson: {"name": "Homer"}\npipeline:\n    - set.body:\n        value: "#{@content.from(vars.someJson)}"\n    - drive.save:\n        path: "my.json"\n')),(0,o.kt)("p",null,"Since ",(0,o.kt)("inlineCode",{parentName:"p"},"drive.read")," converts any input automatically to a content object internally, we could also do something like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n    - drive.save:\n        input: { "name": "Homer" }\n        path: "my.json"\n')),(0,o.kt)("p",null,"And in case there is an file embedded in a JSON as base64 for example, we can write this file to drive like this example shows:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'vars:\n    someJsonWithEmbeddedFile: {\n            "foo": "bar", \n            "document": {\n                "name":"hello.txt",\n                "contentEncoding": "base64", \n                "content": "SGVsbG8gV29ybGQ="\n            }\n        }\n\npipeline:\n    - drive.save:\n        input: "#{vars.someJsonWithEmbeddedFile.document}"\n\n')),(0,o.kt)("p",null,"This base64 encoded document is automatically converted to target format and then stored at drive. The filename is read from the embedded content reference JSON. Therefore, there is no need to specify the ",(0,o.kt)("inlineCode",{parentName:"p"},"path")," attribute here. If we would like to store the document at a specific folder we could additionally set this using the ",(0,o.kt)("inlineCode",{parentName:"p"},"path")," attribute:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'vars:\n    someJsonWithEmbeddedFile: {\n            "foo": "bar", \n            "document": {\n                "name":"hello.txt",\n                "contentEncoding": "base64", \n                "content": "SGVsbG8gV29ybGQ="\n            }\n        }\n\npipeline:\n    - drive.save:\n        input: "#{vars.someJsonWithEmbeddedFile.document}"\n        path: "/my/folder/"\n\n')),(0,o.kt)("p",null,"This would store the document at ",(0,o.kt)("inlineCode",{parentName:"p"},"/my/folder/hello.txt")," in Drive. Any non existing folder will be auto-created."),(0,o.kt)("h2",{id:"collection-folder"},"Collection (Folder)"),(0,o.kt)("p",null,"In case multiple content references are loaded into a pipeline, such references are grouped together in a so called content reference ",(0,o.kt)("strong",{parentName:"p"},"collection"),". Such a collection has a similar meaning like a folder in a local file system."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null}),(0,o.kt)("th",{parentName:"tr",align:null}),(0,o.kt)("th",{parentName:"tr",align:null}))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"td"},"Attribute")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"td"},"Type")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"td"},"Description"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"parent")),(0,o.kt)("td",{parentName:"tr",align:null},"Content Reference Collection"),(0,o.kt)("td",{parentName:"tr",align:null},"Returns the parent collection if this is a nested collection, or ",(0,o.kt)("inlineCode",{parentName:"td"},"null")," in case this is the root collection.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"path")),(0,o.kt)("td",{parentName:"tr",align:null},"string"),(0,o.kt)("td",{parentName:"tr",align:null},"Returns the path to this collection, whereas ",(0,o.kt)("inlineCode",{parentName:"td"},"/")," is returned in case it is the root collection. Example: ",(0,o.kt)("inlineCode",{parentName:"td"},"/rootCol/subCol"),".")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"children")),(0,o.kt)("td",{parentName:"tr",align:null},"Content Reference"),(0,o.kt)("td",{parentName:"tr",align:null},"Returns a list of all content references which are contained in this collection. This can not only be a content reference, but also another collection in case they are nested.")))),(0,o.kt)("p",null,"A Content Reference Collection is also a ",(0,o.kt)("a",{parentName:"p",href:"#"},"Content Object")," and therefore it also has all attributes of the Content Object."),(0,o.kt)("h2",{id:"report-an-issue"},"Report an Issue"),(0,o.kt)("admonition",{title:"Your help is needed!",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"In case you're missing something on this page, you found an error or you have an idea for improvement, please ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/pipeforce/pipeforce.github.io/issues/new"},"click here to create a new issue"),". Another way to contribute is, to click ",(0,o.kt)("strong",{parentName:"p"},"Edit this page")," below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!")))}p.isMDXComponent=!0},1351:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/content-reference-cbe7e9138f9f0a9d0891ed3f947cf47e.png"}}]);