"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[9161],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),m=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=m(e.components);return a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=m(n),d=r,h=c["".concat(i,".").concat(d)]||c[d]||u[d]||l;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=c;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var m=2;m<l;m++)o[m]=n[m];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},2402:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>m});var a=n(7462),r=(n(7294),n(3905));const l={},o="XML - JSON Transformer",s={unversionedId:"guides/transformers/xmljson",id:"guides/transformers/xmljson",title:"XML - JSON Transformer",description:"The transformer command transform.xml.json expects a XML document or string which complies with the W3C XML standard in the body or as input parameter of the command and converts it to a JSON document which can then be used for further processing.",source:"@site/docs/guides/transformers/021_xmljson.md",sourceDirName:"guides/transformers",slug:"/guides/transformers/xmljson",permalink:"/docs/guides/transformers/xmljson",draft:!1,editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/transformers/021_xmljson.md",tags:[],version:"current",sidebarPosition:21,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"CSV - JSON Transformer",permalink:"/docs/guides/transformers/csvjson"},next:{title:"FreeMarker Transformer",permalink:"/docs/guides/transformers/freemarker"}},i={},m=[{value:"Introduction",id:"introduction",level:2},{value:"XML to JSON",id:"xml-to-json",level:2},{value:"XML elements",id:"xml-elements",level:3},{value:"XML attributes",id:"xml-attributes",level:3},{value:"Text content",id:"text-content",level:3},{value:"Mixed content",id:"mixed-content",level:3},{value:"Namespaces",id:"namespaces",level:3},{value:"Processing instructions",id:"processing-instructions",level:3},{value:"JSON to XML",id:"json-to-xml",level:2},{value:"Report an Issue",id:"report-an-issue",level:2}],p={toc:m};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"xml---json-transformer"},"XML - JSON Transformer"),(0,r.kt)("p",null,"The transformer command ",(0,r.kt)("inlineCode",{parentName:"p"},"transform.xml.json")," expects a XML document or string which complies with the ",(0,r.kt)("a",{parentName:"p",href:"https://www.w3.org/TR/xml/"},"W3C XML")," standard in the body or as ",(0,r.kt)("inlineCode",{parentName:"p"},"input")," parameter of the command and converts it to a JSON document which can then be used for further processing."),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"../../api/commands#transformxmljson-v1"},"commands reference")," for details about the available parameters of this command."),(0,r.kt)("p",null,"It's also possible to convert a JSON document back to XML using the ",(0,r.kt)("inlineCode",{parentName:"p"},"transform.json.xml")," command."),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"../../api/commands#transformjsonxml-v1"},"commands reference")," for details about the available parameters of this command."),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"Conversion from XML to JSON is not so straight forwards as it seems to, since there are some special cases which must\nbe treated well in the conversion step. For example:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"XML supports ",(0,r.kt)("a",{parentName:"li",href:"https://www.w3.org/TR/xml/#sec-mixed-content"},"mixed content"),", JSON not"),(0,r.kt)("li",{parentName:"ul"},"XML has ",(0,r.kt)("a",{parentName:"li",href:"https://www.w3.org/TR/xml/#sec-pi"},"processing instructions"),", JSON not"),(0,r.kt)("li",{parentName:"ul"},"XML has ",(0,r.kt)("a",{parentName:"li",href:"https://www.w3.org/TR/xml-names/"},"namespaces"),", JSON not"),(0,r.kt)("li",{parentName:"ul"},"XML has ",(0,r.kt)("a",{parentName:"li",href:"https://www.w3.org/TR/xml/#attdecls"},"attributes"),", JSON not"),(0,r.kt)("li",{parentName:"ul"},"XML has ",(0,r.kt)("a",{parentName:"li",href:"https://www.w3.org/TR/xml/#sec-cdata-sect"},"CDATA"),", JSON not"),(0,r.kt)("li",{parentName:"ul"},"XML allows ",(0,r.kt)("a",{parentName:"li",href:"https://www.w3.org/TR/xml/#sec-comments"},"comments"),", JSON not")),(0,r.kt)("p",null,"At the other hand:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},'JSON differentiates between objects, arrays with primitives and arrays with objects, XML has no concept of "arrays"'),(0,r.kt)("li",{parentName:"ul"},"JSON allows an array or an object with multiple entries to be the root element, XML allows only a single element to be the root"),(0,r.kt)("li",{parentName:"ul"},"JSON supports data types, XML not (by default all is string)")),(0,r.kt)("h2",{id:"xml-to-json"},"XML to JSON"),(0,r.kt)("p",null,'Having said that, there is no "default" way of converting from XML to JSON and back, since all libraries avialable support the differences mentioned above only partially and/or handle them differently.'),(0,r.kt)("p",null,'Therfore, PIPEFORCE has defined a system wide "default" how to convert from XML to JSON and back in order to support most concepts from both worlds. In the table below you can see what is supported:'),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Feature"),(0,r.kt)("th",{parentName:"tr",align:null},"XML to JSON"),(0,r.kt)("th",{parentName:"tr",align:null},"JSON to XML"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"XML elements"),(0,r.kt)("td",{parentName:"tr",align:null},"yes"),(0,r.kt)("td",{parentName:"tr",align:null},"yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"XML attributes"),(0,r.kt)("td",{parentName:"tr",align:null},"yes"),(0,r.kt)("td",{parentName:"tr",align:null},"yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"XML mixed content"),(0,r.kt)("td",{parentName:"tr",align:null},"yes"),(0,r.kt)("td",{parentName:"tr",align:null},"yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"XML processing instructions"),(0,r.kt)("td",{parentName:"tr",align:null},"yes"),(0,r.kt)("td",{parentName:"tr",align:null},"yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"XML namespaces in elements"),(0,r.kt)("td",{parentName:"tr",align:null},"yes"),(0,r.kt)("td",{parentName:"tr",align:null},"yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"XML namespaces in attributes"),(0,r.kt)("td",{parentName:"tr",align:null},"yes"),(0,r.kt)("td",{parentName:"tr",align:null},"yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"XML CDATA"),(0,r.kt)("td",{parentName:"tr",align:null},"no"),(0,r.kt)("td",{parentName:"tr",align:null},"no")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"XML comments"),(0,r.kt)("td",{parentName:"tr",align:null},"no"),(0,r.kt)("td",{parentName:"tr",align:null},"no")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"JSON objects"),(0,r.kt)("td",{parentName:"tr",align:null},"n/a"),(0,r.kt)("td",{parentName:"tr",align:null},"yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"JSON array of objects"),(0,r.kt)("td",{parentName:"tr",align:null},"n/a"),(0,r.kt)("td",{parentName:"tr",align:null},"yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"JSON array of primitives"),(0,r.kt)("td",{parentName:"tr",align:null},"n/a"),(0,r.kt)("td",{parentName:"tr",align:null},"yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"JSON data types"),(0,r.kt)("td",{parentName:"tr",align:null},"n/a"),(0,r.kt)("td",{parentName:"tr",align:null},"no")))),(0,r.kt)("p",null,"This table explains whether it is possible to keep information on transformation between the two formats when using the PIPEFORCE default format."),(0,r.kt)("h3",{id:"xml-elements"},"XML elements"),(0,r.kt)("p",null,"An XML element like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<root/>\n")),(0,r.kt)("p",null,"will by default be converted to a JSON structure like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "root:" {\n    "attributes":[],\n    "children":[]\n  }\n}\n')),(0,r.kt)("p",null,"Even if there are no ",(0,r.kt)("inlineCode",{parentName:"p"},"attributes")," and no ",(0,r.kt)("inlineCode",{parentName:"p"},"children"),", those entries ",(0,r.kt)("strong",{parentName:"p"},"must exist")," in the JSON document with an ",(0,r.kt)("strong",{parentName:"p"},"empty array")," declaration. The ",(0,r.kt)("inlineCode",{parentName:"p"},"null")," value is not allowed here."),(0,r.kt)("p",null,"This is in order to make it easier for later processing and to automatically detect, whether it is a default PIPEFORCE format."),(0,r.kt)("p",null,"Furthermore there is only one JSON object allowed in the first level, similar to XML."),(0,r.kt)("p",null,"If there are nested XML elements, they will be placed inside the ",(0,r.kt)("inlineCode",{parentName:"p"},"children")," section. For example, this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<person>\n  <firstName/>\n</person>\n")),(0,r.kt)("p",null,"will be converted to this JSON with nested elements:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "person:" {\n    "attributes":[],\n    "children":[\n      "firstName:" {\n        "attributes":[],\n        "children":[]\n      }\n    ]\n  }\n}\n')),(0,r.kt)("h3",{id:"xml-attributes"},"XML attributes"),(0,r.kt)("p",null,"An XML elenent with an attribute like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<person age="23"/>\n')),(0,r.kt)("p",null,"will be converted to a JSON structure like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "person:" {\n    "attributes":[ {"age": "23"} ],\n    "children":[]\n  }\n}\n')),(0,r.kt)("h3",{id:"text-content"},"Text content"),(0,r.kt)("p",null,"An XML element with text content like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<person>\n  <firstName>Max</firstName>\n</person>\n")),(0,r.kt)("p",null,"will be converted to this JSON structure:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "person:" {\n    "attributes":[],\n    "children":[\n      "firstName:" {\n        "attributes":[],\n        "children":["Max"]\n      }\n    ]\n  }\n}\n')),(0,r.kt)("p",null,"As you can see, the ",(0,r.kt)("inlineCode",{parentName:"p"},"children")," array can contain both: text content and elements."),(0,r.kt)("h3",{id:"mixed-content"},"Mixed content"),(0,r.kt)("p",null,"In XML it is possible to mix XML elements with text content which could look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<text>This is a <b>bold</b> formatted word.</text>\n")),(0,r.kt)("p",null,"This will be converted to JSON like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "text": {\n    "attributes": {},\n    "children": [\n      "This is a ",\n      {\n        "b": {\n          "attributes": {},\n          "children": ["bold"]\n        }\n      },\n      " formatted word."\n    ]\n  }\n}\n')),(0,r.kt)("h3",{id:"namespaces"},"Namespaces"),(0,r.kt)("p",null,"In XML there is the concept of ",(0,r.kt)("a",{parentName:"p",href:"https://www.w3.org/TR/xml-names/"},"namespaces"),". This allows to extend XML structures by other, custom structures."),(0,r.kt)("p",null,"An XML document with a custom namespace could be look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<foo:person xmlns:foo="http://some.ns">\n  <foo:firstName foo:age="23"/>\n</foo:person>\n')),(0,r.kt)("p",null,"As you can see, all elements and attributes are bound to the namespace here using the prefix ",(0,r.kt)("inlineCode",{parentName:"p"},"foo"),"."),(0,r.kt)("p",null,"If you convert this with the default XML to JSON transformation rules, you will get a JSON like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "foo:person": {\n    "attributes": {\n      "xmlns:foo": "http://some.ns"\n    },\n    "children": [\n      {\n        "foo:firstName": {\n          "attributes": {\n            "foo:age": "23"\n          },\n          "children": []\n        }\n      }\n    ]\n  }\n}\n')),(0,r.kt)("h3",{id:"processing-instructions"},"Processing instructions"),(0,r.kt)("p",null,"XML documents can contain ",(0,r.kt)("a",{parentName:"p",href:"https://www.w3.org/TR/xml/#sec-pi"},"processing instructions")," in the prologue like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<?someInstruction someParams?>\n<root/>\n")),(0,r.kt)("p",null,"This will be converted to a JSON like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "processing-instructions": {\n    "someInstruction": "someParams"\n  },\n  "root": {\n    "attributes": {},\n    "children": []\n  }\n}\n')),(0,r.kt)("h2",{id:"json-to-xml"},"JSON to XML"),(0,r.kt)("p",null,"If the JSON document is in the default XML-JSON transformation format (contains ",(0,r.kt)("inlineCode",{parentName:"p"},"attributes")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"children")," elements), then it will be transformed to XML using the default transformation rules, explained above."),(0,r.kt)("p",null,"Otherwise, in case the starting point is a custom JSON document which doesn't comply with the default XML-JSON transformation rules, the conversion will be differently."),(0,r.kt)("p",null,"A JSON document like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "person": {\n    "firstName": "Max"\n  }\n}\n')),(0,r.kt)("p",null,"will be converted to this XML:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<root>\n  <person>\n    <firstName>Max</firstName>\n  </person>\n</root>\n")),(0,r.kt)("p",null,"A JSON document with an array in it, could look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "person": {\n    "firstName": "Max",\n    "hobbies": ["Reading", "Binking", "Swiming"]\n  }\n}\n')),(0,r.kt)("p",null,"This will be converted to an XML structure like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<root>\n  <person>\n    <firstName>Max</firstName>\n    <hobbies>Reading</hobbies>\n    <hobbies>Binking</hobbies>\n    <hobbies>Swiming</hobbies>\n  </person>\n</root>\n")),(0,r.kt)("h2",{id:"report-an-issue"},"Report an Issue"),(0,r.kt)("admonition",{title:"Your help is needed!",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"In case you're missing something on this page, you found an error or you have an idea for improvement, please ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/pipeforce/pipeforce.github.io/issues/new"},"click here to create a new issue"),". Another way to contribute is, to click ",(0,r.kt)("strong",{parentName:"p"},"Edit this page")," below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!")))}u.isMDXComponent=!0}}]);