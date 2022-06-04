"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[8625],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=s(n),m=r,h=c["".concat(p,".").concat(m)]||c[m]||u[m]||i;return n?a.createElement(h,o(o({ref:t},d),{},{components:n})):a.createElement(h,o({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},31:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return d},default:function(){return c}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={},p="Tutorial 7: Load a JSON file",s={unversionedId:"tutorials/load-json-file",id:"tutorials/load-json-file",isDocsHomePage:!1,title:"Tutorial 7: Load a JSON file",description:"Tutorial 7 Estimated time: 10 min.",source:"@site/docs/tutorials/70_load-json-file.md",sourceDirName:"tutorials",slug:"/tutorials/load-json-file",permalink:"/docs/tutorials/load-json-file",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/tutorials/70_load-json-file.md",tags:[],version:"current",sidebarPosition:70,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Tutorial 6: Data Mapping",permalink:"/docs/tutorials/create-data-mapping"},next:{title:"Tutorial 8: Send an Email",permalink:"/docs/tutorials/send-email"}},d=[{value:"Tutorial 7 - Prerequisites",id:"tutorial-7---prerequisites",children:[],level:2},{value:"JSON-file Loading - Intro",id:"json-file-loading---intro",children:[],level:2},{value:"1 - Create a new JSON file in Drive",id:"1---create-a-new-json-file-in-drive",children:[],level:2},{value:"2 - Load the JSON file from Drive",id:"2---load-the-json-file-from-drive",children:[],level:2},{value:"3 - Convert the content data to JSON",id:"3---convert-the-content-data-to-json",children:[],level:2},{value:"The content object",id:"the-content-object",children:[],level:2}],u={toc:d};function c(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"tutorial-7-load-a-json-file"},"Tutorial 7: Load a JSON file"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Tutorial 7 Estimated time:")," 10 min."),(0,i.kt)("h2",{id:"tutorial-7---prerequisites"},"Tutorial 7 - Prerequisites"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"PIPEFORCE Enterprise 7.0 or higher"),(0,i.kt)("li",{parentName:"ul"},"You have a valid PIPEFORCE Developer account"),(0,i.kt)("li",{parentName:"ul"},"You have completed tutorial: ",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("a",{parentName:"strong",href:"create-app"},"Create a new app"))),(0,i.kt)("li",{parentName:"ul"},"You have completed tutorial: ",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("a",{parentName:"strong",href:"create-pipeline"},"Create a pipeline"))),(0,i.kt)("li",{parentName:"ul"},"You have a basic understanding of the ",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("a",{parentName:"strong",href:"../api/pel"},"Pipeline Expression Language (PEL)")))),(0,i.kt)("h2",{id:"json-file-loading---intro"},"JSON-file Loading - Intro"),(0,i.kt)("p",null,"Inside a pipeline you can access any data using the Pipeline Expression Language (PEL). This is handy, in case you want to analyse or transform data, which is in most cases stored in the body of the pipeline."),(0,i.kt)("p",null,"So the question to solve in this tutorial is, how you can load an external JSON file into the pipeline body in a way that you can also apply a PE on it."),(0,i.kt)("h2",{id:"1---create-a-new-json-file-in-drive"},"1 - Create a new JSON file in Drive"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Login to the portal ",(0,i.kt)("a",{parentName:"p",href:"https://NAMESPACE.pipeforce.net"},"https://NAMESPACE.pipeforce.net"))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Navigate to ",(0,i.kt)("inlineCode",{parentName:"p"},"Files"),". The Drive app opens.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Add a new text document ",(0,i.kt)("inlineCode",{parentName:"p"},"person.json")," in the root folder, and copy paste this content into it:  "),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "firstName": "Marissa",\n  "lastName": "Smith",\n  "age": 33\n}\n')))),(0,i.kt)("h2",{id:"2---load-the-json-file-from-drive"},"2 - Load the JSON file from Drive"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Navigate to ",(0,i.kt)("inlineCode",{parentName:"p"},"Workbench"),". The ad-hoc pipeline editor opens.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Replace the existing content by this pipeline:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - drive.read:\n      path: "person.json"\n'))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"RUN the pipeline, and you should see the content of the file ",(0,i.kt)("inlineCode",{parentName:"p"},"person.json")," as output:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "firstName": "Marissa",\n  "lastName": "Smith",\n  "age": 33\n}\n')),(0,i.kt)("p",{parentName:"li"},"This is because the file is automatically converted from a ",(0,i.kt)("strong",{parentName:"p"},"content object")," to its the mime type format, which is JSON in this case, and then sent to the client.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"In order to \u201csee\u201d the content object and not the result, change the pipeline to this:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - drive.read:\n      path: "person.json"\n  - set.body:\n      value: "#{@convert.toJson(body)}"\n'))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"RUN the pipeline, and you should see as output, the content object with meta information about the file:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "name": "person.json",\n    "created": 1637045518731,\n    "lastUpdated": null,\n    "size": 64,\n    "data": "ewogICJmaXJzdE5hbWUiOiAiTWFyaXNzYSIs...",\n    "mimeType": "application/json"\n}\n')))),(0,i.kt)("h2",{id:"3---convert-the-content-data-to-json"},"3 - Convert the content data to JSON"),(0,i.kt)("p",null,"In case you want to work with the JSON data of a file, the data part of the content object is the interesting thing for you. In order to load this into the body, again use the ",(0,i.kt)("inlineCode",{parentName:"p"},"@convert.toJson()"),", but this time, point to the data property:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - drive.read:\n      path: "person.json"\n  - set.body:\n      value: "#{@convert.toJson(body.data)}"\n')),(0,i.kt)("p",null,"After you RUN the pipeline, you should see again the JSON content as output:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "firstName": "Marissa",\n  "lastName": "Smith",\n  "age": 33\n}\n')),(0,i.kt)("p",null,"But this time it is provided as JSON inside the pipeline, so you can access it via Pipeline Expression Language (PEL):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - drive.read:\n      path: "person.json"\n  - set.body:\n      value: "#{@convert.toJson(body.data)}"\n  - set.body:\n      value: "Full name: #{body.firstName} #{body.lastName}"\n')),(0,i.kt)("p",null,"You should see an output similar to this, which transformed the JSON:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'"Full name: Marissa Smith"\n')),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Congrats, you have loaded and parsed your first external data into a pipeline. Now you're ready for data manipulation!")),(0,i.kt)("h2",{id:"the-content-object"},"The content object"),(0,i.kt)("p",null,"By default, any external file loaded by a pipeline will be converted into a so called ",(0,i.kt)("strong",{parentName:"p"},"content object"),", which is a wrapper around the file that holds additional meta information about it. The structure of such a content object is like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "string",\n  "created": long,\n  "lastUpdated": long,\n  "mimeType": "string",\n  "size": long,\n  "data": "string"\n}\n')),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null}),(0,i.kt)("th",{parentName:"tr",align:null}))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("strong",{parentName:"td"},"Property")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("strong",{parentName:"td"},"Description"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"name")),(0,i.kt)("td",{parentName:"tr",align:null},"The name of the file.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"created")),(0,i.kt)("td",{parentName:"tr",align:null},"The time when this file was created in unix epoch time (millis).")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"lastUpdated")),(0,i.kt)("td",{parentName:"tr",align:null},"The time when this file was updated last in unix epoch time (millis).")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"mimeType")),(0,i.kt)("td",{parentName:"tr",align:null},"The content type of the file e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"application/json")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"text/plain"),".")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"size")),(0,i.kt)("td",{parentName:"tr",align:null},"The size of the file in bytes or -1, in case the size cannot be determined.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"data")),(0,i.kt)("td",{parentName:"tr",align:null},"The data of the file as base64 encoded or an uri pointing to the data.")))),(0,i.kt)("p",null,"When you load an external file in a pipeline, in most cases, it will be placed into the body as content object."),(0,i.kt)("p",null,"In case you want to parse an external file in order to analyse and/or transform its content for example, you need to convert the data property of the content object to the target format you like, which is usually JSON. You can use the PEL and the convert util for example:",(0,i.kt)("br",{parentName:"p"}),"\n",(0,i.kt)("inlineCode",{parentName:"p"},"#{convert.toJSON(body.data)}")))}c.isMDXComponent=!0}}]);