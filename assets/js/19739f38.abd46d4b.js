"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[2932],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>u});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),l=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},p=function(e){var n=l(e.components);return r.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=l(t),u=a,h=m["".concat(s,".").concat(u)]||m[u]||d[u]||o;return t?r.createElement(h,c(c({ref:n},p),{},{components:t})):r.createElement(h,c({ref:n},p))}));function u(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=m;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var l=2;l<o;l++)c[l]=t[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},6142:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var r=t(7462),a=(t(7294),t(3905));const o={},c="3. Connectors",i={unversionedId:"guides/connectors",id:"guides/connectors",isDocsHomePage:!1,title:"3. Connectors",description:"What is a connector?",source:"@site/docs/guides/30_connectors.md",sourceDirName:"guides",slug:"/guides/connectors",permalink:"/docs/guides/connectors",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/30_connectors.md",tags:[],version:"current",sidebarPosition:30,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Command Versioning",permalink:"/docs/guides/commands_pipelines/command_versioning"},next:{title:"Basics",permalink:"/docs/propertystore"}},s=[{value:"What is a connector?",id:"what-is-a-connector",children:[],level:2},{value:"HTTP/S connectors",id:"https-connectors",children:[],level:2},{value:"SFTP Connectors",id:"sftp-connectors",children:[],level:2}],l={toc:s};function p(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"3-connectors"},"3. Connectors"),(0,a.kt)("h2",{id:"what-is-a-connector"},"What is a connector?"),(0,a.kt)("p",null,"A ",(0,a.kt)("strong",{parentName:"p"},"connector")," is a component which connects to an external service via an API and can exechange data with such a service."),(0,a.kt)("p",null,"In PIPEFORCE, connectors are implemented using ",(0,a.kt)("a",{parentName:"p",href:"../guides/commands_pipelines#command"},"Commands"),". So, a Command can be in a role of a connector."),(0,a.kt)("p",null,"There are many such built-in connectors. Some examples:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"http.*")," : This set of commands can connect to any HTTP/S endpoint."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"sftp.*")," : This set of commands can connect to any SFTP endpoint."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"iam.*")," : This set of commands can connect to the internal identity and access management system."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"drive.*"),": This set of commands can connect to the internal data room."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"microsoft.teams.send")," : This command can send messages to a teams channel."),(0,a.kt)("li",{parentName:"ul"},"And many more. See the ",(0,a.kt)("a",{parentName:"li",href:"../api/commands"},"commands reference")," for a list of all available commands.")),(0,a.kt)("h2",{id:"https-connectors"},"HTTP/S connectors"),(0,a.kt)("p",null,"The HTTP/S connectors can be used to connect to HTTP/S endpoints. For example if you would like to make RESTful calls."),(0,a.kt)("p",null,"Typically such endpoints are secured with username and password or a token. You should never place such sensitive data into your source code. Instead, create a new ",(0,a.kt)("a",{parentName:"p",href:"../guides/security/secrets"},"Secret")," and refer to it in your pipeline."),(0,a.kt)("p",null,"Here is an example to access the ",(0,a.kt)("a",{parentName:"p",href:"https://docs.github.com/en/rest/actions/artifacts"},"GitHub API")," using the command ",(0,a.kt)("a",{parentName:"p",href:"../api/commands#httpget-v1"},(0,a.kt)("inlineCode",{parentName:"a"},"http.get"))," and a custom secret, created before:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n    - http.get:\n        url: "https://api.github.com/owner/repo/actions/artifacts"\n        credentials: "github-secret"\n')),(0,a.kt)("p",null,"This will return a JSON document like this example, which can be used in the pipeline for further processing:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "total_count": 1,\n  "artifacts": [\n    {\n      "id": 11,\n      "node_id": "MDg6QXJ0bbZhY3QxMQ==",\n      "name": "Rails",\n      "size_in_bytes": 556,\n      "url": "https://api.github.com/repos/owner/repo/actions/artifacts/11",\n      "archive_download_url": "https://api.github.com/repos/owner/repo/actions/artifacts/11/zip",\n      "expired": false,\n      "created_at": "2022-01-10T14:59:22Z",\n      "expires_at": "2022-03-21T14:59:22Z",\n      "updated_at": "2022-02-21T14:59:22Z",\n      "workflow_run": {\n        "id": 2332928,\n        "repository_id": 1296569,\n        "head_repository_id": 1296219,\n        "head_branch": "main",\n        "head_sha": "328faa0536e6fef19903d9d91dc96a9931694ce3"\n      }\n    }\n  ]\n}\n')),(0,a.kt)("h2",{id:"sftp-connectors"},"SFTP Connectors"),(0,a.kt)("p",null,"The SFTP connectors can be used to connect to a SFTP service."),(0,a.kt)("p",null,"Here is an example to use the ",(0,a.kt)("a",{parentName:"p",href:"../api/commands#sftplist-v1"},(0,a.kt)("inlineCode",{parentName:"a"},"sftp.list"))," command in a pipeline:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n    - sftp.list:\n        host: "some.sftpserver.tld"\n        path: "/myfolder"\n        credentials: "sftp-secret"\n')))}p.isMDXComponent=!0}}]);