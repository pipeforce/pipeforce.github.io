"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[4149],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(n),d=r,h=c["".concat(i,".").concat(d)]||c[d]||m[d]||o;return n?a.createElement(h,s(s({ref:t},u),{},{components:n})):a.createElement(h,s({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=c;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var p=2;p<o;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4134:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const o={},s="CSV - JSON Transformer",l={unversionedId:"guides/transformers/csvjson",id:"guides/transformers/csvjson",title:"CSV - JSON Transformer",description:"The transformer command transform.csv.json expects a CSV file which complies with the RFC4189 standard in the body or as input parameter of the command and converts it to a JSON document which can then be used for further processing.",source:"@site/docs/guides/transformers/020_csvjson.md",sourceDirName:"guides/transformers",slug:"/guides/transformers/csvjson",permalink:"/docs/guides/transformers/csvjson",draft:!1,editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/transformers/020_csvjson.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Basics",permalink:"/docs/guides/transformers/basics"},next:{title:"XML - JSON Transformer",permalink:"/docs/guides/transformers/xmljson"}},i={},p=[{value:"Example 1: Arrays output format",id:"example-1-arrays-output-format",level:2},{value:"Example 2: Headers in rows",id:"example-2-headers-in-rows",level:2},{value:"Example 3: Hide counter fields",id:"example-3-hide-counter-fields",level:2},{value:"Example 4: Objects output format",id:"example-4-objects-output-format",level:2},{value:"Example 5: Set CSV as input param",id:"example-5-set-csv-as-input-param",level:2},{value:"Example 6: List as input",id:"example-6-list-as-input",level:2},{value:"Report an Issue",id:"report-an-issue",level:2}],u={toc:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"csv---json-transformer"},"CSV - JSON Transformer"),(0,r.kt)("p",null,"The transformer command ",(0,r.kt)("inlineCode",{parentName:"p"},"transform.csv.json")," expects a CSV file which complies with the ",(0,r.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/rfc4180"},"RFC4189")," standard in the body or as ",(0,r.kt)("inlineCode",{parentName:"p"},"input")," parameter of the command and converts it to a JSON document which can then be used for further processing."),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"../../api/commands#transformcsvjson-v1"},"commands reference")," for details about the available parameters of this command."),(0,r.kt)("h2",{id:"example-1-arrays-output-format"},"Example 1: Arrays output format"),(0,r.kt)("p",null,"If you use the transformer without any additional parameters, the JSON output will contain a nested arrays format for the rows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  # Set the CSV in the body\n  - set.body:\n      value: |\n        "firstName","lastName","age"\n        "Max","Smith","38"\n        "Susann","Mayr Wan","44\n\n  - transform.csv.json:\n')),(0,r.kt)("p",null,"The default output will look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "columnsCount": 3,\n  "rowsCount": 2,\n  "headers": ["firstName","lastName","age"],\n  "rows": [\n    ["Max","Smith","38"],\n    ["Susann","Mayr Wan","44"]\n  ]\n}\n\n')),(0,r.kt)("h2",{id:"example-2-headers-in-rows"},"Example 2: Headers in rows"),(0,r.kt)("p",null,"By default the column header names of the CSV will be shown in an extra field ",(0,r.kt)("inlineCode",{parentName:"p"},"headers")," of the resulting JSON."),(0,r.kt)("p",null,"It is also possible to have these header names as part of the rows array and skip the extra ",(0,r.kt)("inlineCode",{parentName:"p"},"headers")," field:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  # Set the CSV in the body\n  - set.body:\n      value: |\n        "firstName","lastName","age"\n        "Max","Smith","38"\n        "Susann","Mayr Wan","44"\n\n  - transform.csv.json:\n      showHeadersField: false\n')),(0,r.kt)("p",null,"The output will look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "columnsCount": 3,\n  "rowsCount": 3,\n  "rows": [\n    ["firstName","lastName","age"],\n    ["Max","Smith","38"],\n    ["Susann","Mayr Wan","44"]\n  ]\n}\n\n')),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Note that the ",(0,r.kt)("inlineCode",{parentName:"p"},"rowsCount")," now also counts the header line.")),(0,r.kt)("h2",{id:"example-3-hide-counter-fields"},"Example 3: Hide counter fields"),(0,r.kt)("p",null,"You can also hide all extra fields."),(0,r.kt)("p",null,"Here you can see the most simple output possible:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  # Set the CSV in the body\n  - set.body:\n      value: |\n        "firstName","lastName","age"\n        "Max","Smith","38"\n        "Susann","Mayr Wan","44"\n\n  - transform.csv.json:\n      showHeadersField: false\n      showColumnsCountField: false\n      showRowsCountField: false\n')),(0,r.kt)("p",null,"The output will look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "rows": [\n    ["firstName","lastName","age"],\n    ["Max","Smith","38"],\n    ["Susann","Mayr Wan","44"]\n  ]\n}\n\n')),(0,r.kt)("h2",{id:"example-4-objects-output-format"},"Example 4: Objects output format"),(0,r.kt)("p",null,"In some cases it is required, to have each row output as a JSON object with the header names as key."),(0,r.kt)("p",null,"To do so, you need to set the parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"rowsFormat")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"objects"),", then the JSON output will contain an array of JSON objects:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  # Set the CSV in the body\n  - set.body:\n      value: |\n        "firstName","lastName","age"\n        "Max","Smith","38"\n        "Susann","Mayr Wan","44"\n\n  - transform.csv.json:\n      rowsFormat: "objects" # Can be "objects" or "arrays" (default).\n')),(0,r.kt)("p",null,"The output will look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "columnsCount": 3,\n  "rowsCount": 2,\n  "headers": ["firstName","lastName","age"],\n  "rows": [\n    {\n      "firstName": "Max",\n      "lastName": "Smith",\n      "age": "38"\n    },\n    {\n      "firstName": "Susann",\n      "lastName": "Mayr Wan",\n      "age": "44"\n    }\n  ]\n}\n\n')),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Note that this output format creates a much bigger JSON document. So if possible, you should prefer to work with the default rows format ",(0,r.kt)("inlineCode",{parentName:"p"},"arrays"),".  ")),(0,r.kt)("h2",{id:"example-5-set-csv-as-input-param"},"Example 5: Set CSV as input param"),(0,r.kt)("p",null,"Instead of reading the CSV from the body, you can also pass it as ",(0,r.kt)("inlineCode",{parentName:"p"},"input")," param to the command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  - transform.csv.json:\n      input: |\n        "firstName","lastName","age"\n        "Max","Smith","38"\n        "Susann","Mayr Wan","44"\n')),(0,r.kt)("p",null,"The output will look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "columnsCount": 3,\n  "rowsCount": 2,\n  "headers": ["firstName","lastName","age"],\n  "rows": [\n    ["Max","Smith","38"],\n    ["Susann","Mayr Wan","44"]\n  ]\n}\n')),(0,r.kt)("h2",{id:"example-6-list-as-input"},"Example 6: List as input"),(0,r.kt)("p",null,"In this example you can see that it is also possible to define a simple list as input."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"pipeline:\n\n  - transform.csv.json:\n      hasHeadersLine: false\n      input: |\n        row1\n        row2\n        row3\n")),(0,r.kt)("p",null,"The output will look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "columnsCount": 1,\n  "rowsCount": 3,\n  "rows": [\n    ["row1"],\n    ["row2"],\n    ["row3"]\n  ]\n}\n')),(0,r.kt)("h2",{id:"report-an-issue"},"Report an Issue"),(0,r.kt)("admonition",{title:"Your help is needed!",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"In case you're missing something on this page, you found an error or you have an idea for improvement, please ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/pipeforce/pipeforce.github.io/issues/new"},"click here to create a new issue"),". Another way to contribute is, to click ",(0,r.kt)("strong",{parentName:"p"},"Edit this page")," below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!")))}m.isMDXComponent=!0}}]);