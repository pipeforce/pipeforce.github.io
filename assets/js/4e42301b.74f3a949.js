"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[7318],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=p(r),d=a,k=c["".concat(s,".").concat(d)]||c[d]||m[d]||o;return r?n.createElement(k,l(l({ref:t},u),{},{components:r})):n.createElement(k,l({ref:t},u))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=c;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}c.displayName="MDXCreateElement"},3829:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={},l="FreeMarker Transformer",i={unversionedId:"guides/transformers/freemarker",id:"guides/transformers/freemarker",title:"FreeMarker Transformer",description:"The transformer command transform.ftl uses the template engine FreeMarker in order to apply a transformation on a given model using a given template.",source:"@site/docs/guides/transformers/022_freemarker.md",sourceDirName:"guides/transformers",slug:"/guides/transformers/freemarker",permalink:"/docs/guides/transformers/freemarker",draft:!1,editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/transformers/022_freemarker.md",tags:[],version:"current",sidebarPosition:22,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"XML to JSON Transformer",permalink:"/docs/guides/transformers/xml2json"},next:{title:"8. Content Handling",permalink:"/docs/guides/contentobject"}},s={},p=[{value:"Example",id:"example",level:2},{value:"FreeMarker Basics",id:"freemarker-basics",level:2},{value:"Accessing values",id:"accessing-values",level:3},{value:"Iterating list values",id:"iterating-list-values",level:3},{value:"Conditional output",id:"conditional-output",level:3},{value:"Report an Issue",id:"report-an-issue",level:2}],u={toc:p};function m(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"freemarker-transformer"},"FreeMarker Transformer"),(0,a.kt)("p",null,"The transformer command ",(0,a.kt)("inlineCode",{parentName:"p"},"transform.ftl")," uses the template engine ",(0,a.kt)("a",{parentName:"p",href:"https://freemarker.apache.org/docs/index.html"},"FreeMarker")," in order to apply a transformation on a given model using a given template."),(0,a.kt)("p",null,"See the ",(0,a.kt)("a",{parentName:"p",href:"../../api/commands#transformftl-v1"},"commands reference")," for details about the available parameters of this command."),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("p",null,"In order to do a conversion from one data structure into another using the ",(0,a.kt)("inlineCode",{parentName:"p"},"transform.ftl")," command, you need two core parts:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"A ",(0,a.kt)("strong",{parentName:"li"},"model")," = The data structure you would like to convert (usually a JSON document)."),(0,a.kt)("li",{parentName:"ul"},"A ",(0,a.kt)("strong",{parentName:"li"},"template"),' = Defines the conversion "rules".')),(0,a.kt)("p",null,"Below you can find a simple example how this could look like in a pipeline with model and template defined as inline values:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  - transform.ftl:\n      model: {\n          "firstName": "Max", \n          "lastName": "Smith"\n        }\n      template: |\n        Hello ${firstName} ${lastName}!\n')),(0,a.kt)("p",null,"When you run this pipeline, you will get as output:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"Hello Max Smith!\n")),(0,a.kt)("p",null,"The data for the model and the template can for sure also come from a PEL or any other location supported by PIPEFORCE paths."),(0,a.kt)("p",null,"Here is an example which loads the model from the property store and the template from drive:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  - transform.ftl:\n      model: "$uri:property:global/app/myapp/data/person@value"\n      template: "$uri:drive:/templates/person.ftl"\n')),(0,a.kt)("p",null,"As you can see, ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/uris"},"custom URIs")," are used here in order to point to locations for the model and the template."),(0,a.kt)("h2",{id:"freemarker-basics"},"FreeMarker Basics"),(0,a.kt)("p",null,"In this section some of the core concepts of the FreeMarker template language will be shown."),(0,a.kt)("p",null,"For more details visit their ",(0,a.kt)("a",{parentName:"p",href:"https://freemarker.apache.org/docs/index.html"},"Official FreeMarker Documentation"),"."),(0,a.kt)("h3",{id:"accessing-values"},"Accessing values"),(0,a.kt)("p",null,"In order to access a value from a model and write it at a certain position in the template, you can use ",(0,a.kt)("inlineCode",{parentName:"p"},"${variablePath}")," whereas ",(0,a.kt)("inlineCode",{parentName:"p"},"variablePath")," points to the path of the value inside the model. Let's assume you have a JSON model like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "person": {\n    "firstName": "Maria",\n    "lastName": "Sanders"\n  }\n}\n')),(0,a.kt)("p",null,"If you would like to print the first name of the person, you could use the path ",(0,a.kt)("inlineCode",{parentName:"p"},"person.firstName"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"Hello ${person.firstName}!\n")),(0,a.kt)("p",null,"Which will create this output after template was rendered:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"Hello Maria!\n")),(0,a.kt)("p",null,"If the model contains a list like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "people": [\n    {\n      "firstName": "Maria",\n      "lastName": "Sanders"\n    },\n    {\n      "firstName": "Markus",\n      "lastName": "Mayers"\n    }\n  ]\n}\n')),(0,a.kt)("p",null,"then you can access values in this list by its index like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"Hello ${people[1].firstName}!\n")),(0,a.kt)("p",null,"Which will create this output after template was rendered:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"Hello Markus!\n")),(0,a.kt)("h3",{id:"iterating-list-values"},"Iterating list values"),(0,a.kt)("p",null,"Sometimes it is necessary to iterate over a list from a model like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "people": [\n    {\n      "firstName": "Maria",\n      "lastName": "Sanders"\n    },\n    {\n      "firstName": "Markus",\n      "lastName": "Mayers"\n    }\n  ]\n}\n')),(0,a.kt)("p",null,"In FreeMarker you can do so by using the syntax ",(0,a.kt)("inlineCode",{parentName:"p"},"<#list people as person>"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"List of people:\n<#list people as person>\n- ${person.firstName} ${person.lastName}\n</#list>\n")),(0,a.kt)("p",null,"Which will create this output after template was rendered:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"List of people:\n- Maria Sanders\n- Markus Mayers\n")),(0,a.kt)("p",null,'You can also iterate over elements (called "hashes"). Let\'s assume you have a JSON model like this:'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "products":{\n    "apple": 5,\n    "banana": 10,\n    "kiwi": 15\n  } \n}\n')),(0,a.kt)("p",null,"In order to iterate over the elements inside ",(0,a.kt)("inlineCode",{parentName:"p"},"products")," you can use this FreeMarker template:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"List of products:\n<#list products as name, price>\n- ${name}, ${price} EUR\n</#list>\n")),(0,a.kt)("p",null,"Which will create this output after template was rendered:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"List of products:\n- apple, 5 EUR\n- banana, 10 EUR\n- kiwi, 15 EUR\n")),(0,a.kt)("p",null,"For more details about iterating model data structures, see ",(0,a.kt)("a",{parentName:"p",href:"https://freemarker.apache.org/docs/ref_directive_list.html"},"FreeMarker Documentation"),"."),(0,a.kt)("h3",{id:"conditional-output"},"Conditional output"),(0,a.kt)("p",null,"In case you would like to generate an output only in case a certain criteria matches, you can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"if, else, elseif")," structure."),(0,a.kt)("p",null,"Let's assume a JSON model like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "products":{\n    "apple": 5,\n    "banana": 10,\n    "kiwi": 15\n  } \n}\n')),(0,a.kt)("p",null,"And now you would like to print ",(0,a.kt)("inlineCode",{parentName:"p"},"BEST OFFER!")," on those with ",(0,a.kt)("inlineCode",{parentName:"p"},"price < 10"),", then you could write a template like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"List of products:\n<#list products as name, price>\n- ${name}, ${price} EUR <#if price < 10>[BEST OFFER!]</#if>\n</#list>\n")),(0,a.kt)("p",null,"This will be rendered to a result like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"List of products:\n- apple, 5 EUR [BEST OFFER!]\n- banana, 10 EUR\n- kiwi, 15 EUR\n")),(0,a.kt)("p",null,"It's also possible to use ",(0,a.kt)("inlineCode",{parentName:"p"},"<#else>")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"<#elseif>")," constructs. For more details, see ",(0,a.kt)("a",{parentName:"p",href:"https://freemarker.apache.org/docs/ref_directive_if.html"},"FreeMarker Documentation"),"."),(0,a.kt)("h2",{id:"report-an-issue"},"Report an Issue"),(0,a.kt)("admonition",{title:"Your help is needed!",type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"In case you're missing something on this page, you found an error or you have an idea for improvement, please ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/pipeforce/pipeforce.github.io/issues/new"},"click here to create a new issue"),". Another way to contribute is, to click ",(0,a.kt)("strong",{parentName:"p"},"Edit this page")," below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!")))}m.isMDXComponent=!0}}]);