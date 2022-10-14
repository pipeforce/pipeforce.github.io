"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[5305],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,h=u["".concat(l,".").concat(m)]||u[m]||d[m]||i;return n?o.createElement(h,a(a({ref:t},p),{},{components:n})):o.createElement(h,a({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},562:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var o=n(7462),r=(n(7294),n(3905));const i={},a="Tutorial 1: Basics",s={unversionedId:"tutorials/basics",id:"tutorials/basics",isDocsHomePage:!1,title:"Tutorial 1: Basics",description:"Estimated time: 10 min.",source:"@site/docs/tutorials/10_basics.md",sourceDirName:"tutorials",slug:"/tutorials/basics",permalink:"/docs/tutorials/basics",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/tutorials/10_basics.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"16. Command Line Interface",permalink:"/docs/cli"},next:{title:"Tutorial 2: Create an App",permalink:"/docs/tutorials/create-app"}},l=[{value:"Pipeforce - Intro",id:"pipeforce---intro",children:[],level:2},{value:"1 - Platform",id:"1---platform",children:[],level:2},{value:"2 - Self Service Portal",id:"2---self-service-portal",children:[],level:2},{value:"3 - App",id:"3---app",children:[],level:2},{value:"4 - Pipeline",id:"4---pipeline",children:[],level:2},{value:"5 - Command",id:"5---command",children:[],level:2},{value:"6 - Workflow",id:"6---workflow",children:[],level:2},{value:"7 - Low Code Workbench",id:"7---low-code-workbench",children:[],level:2},{value:"8 - Command Line Interface (CLI)",id:"8---command-line-interface-cli",children:[],level:2},{value:"9 - Property Store",id:"9---property-store",children:[],level:2},{value:"10 - Pipeline Engineer / The Low Coder",id:"10---pipeline-engineer--the-low-coder",children:[],level:2},{value:"Report an Issue",id:"report-an-issue",children:[],level:2}],c={toc:l};function p(e){let{components:t,...i}=e;return(0,r.kt)("wrapper",(0,o.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"tutorial-1-basics"},"Tutorial 1: Basics"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Estimated time:")," 10 min."),(0,r.kt)("h2",{id:"pipeforce---intro"},"Pipeforce - Intro"),(0,r.kt)("p",null,"PIPEFORCE is the first workflow automation and integration platform that runs entirely cloud-native (i.e. 100% inside Kubernetes using microservices and messaging) and is very extensible through microservices. It helps companies to achieve automation superpowers and enables non-technical employees and partners to create, deploy and operate digital services, workflow apps and data mappings. One can cover the entire journey from planning to implementation on a single platform using low-code."),(0,r.kt)("p",null,"Below you can find short descriptions of the most important topics of PIPEFORCE, just to give you a fast overlook. We will discuss all of these concepts in detail in different guides and the documentation."),(0,r.kt)("h2",{id:"1---platform"},"1 - Platform"),(0,r.kt)("p",null,"The PIPEFORCE platform is built with Kubernetes as its base framework. On this platform, different digital services are available out-of-the-box, so you can start developing your solutions right from the beginning. Moreso, there is no need for Kubernetes or Microservices know-how. You can create your first business application with low-code. The built-in services are:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"User and Identity Management"),(0,r.kt)("li",{parentName:"ul"},"LDAP / AD Service"),(0,r.kt)("li",{parentName:"ul"},"Reporting Service"),(0,r.kt)("li",{parentName:"ul"},"Sync & Share Service"),(0,r.kt)("li",{parentName:"ul"},"Archiving Service"),(0,r.kt)("li",{parentName:"ul"},"Forms and List Builder"),(0,r.kt)("li",{parentName:"ul"},"BPMN Workflow engine"),(0,r.kt)("li",{parentName:"ul"},"RPA"),(0,r.kt)("li",{parentName:"ul"},"Integration Pipelines"),(0,r.kt)("li",{parentName:"ul"},"And more\u2026")),(0,r.kt)("p",null,"With these built-in services you can start very quickly to build your own business/data pipeline apps. It is also possible to add additional services via (Docker) containers if required."),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(519).Z})),(0,r.kt)("h2",{id:"2---self-service-portal"},"2 - Self Service Portal"),(0,r.kt)("p",null,"The portal is the single point of access for employees and customers. Whenever you have created and published a new business app, it becomes visible on the portal. Employees, customers and partners will get a list of their available apps after login, and then they can execute them easily."),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(6882).Z})),(0,r.kt)("h2",{id:"3---app"},"3 - App"),(0,r.kt)("p",null,"An app in PIPEFORCE is typically the smallest unit to build a business workflow application. It can consist of many different elements like forms, lists, workflows or integration pipelines to just name a few."),(0,r.kt)("p",null,"Once the app has been published, it can be used by customers, employees or partners."),(0,r.kt)("h2",{id:"4---pipeline"},"4 - Pipeline"),(0,r.kt)("p",null,"A pipeline in PIPEFORCE is the \u201cglue\u201d between all elements of an business application, that is typically written in an easy YAML DSL. It connects data from forms and APIs. It can calculate, normalize, map or convert data from other systems and interfaces. It can also  execute business logic if required. All of this is done using low-code. So there is no need for deep development."),(0,r.kt)("p",null,"On the other hand, for more advanced users, there is always the option to \u201copen-up\u201d and create more complex solutions, in case the low-code approach isn\u2019t enough. "),(0,r.kt)("p",null,"You can learn more about pipelines here: ",(0,r.kt)("a",{parentName:"p",href:"../guides/10_commands_pipelines"},"Pipelines")),(0,r.kt)("h2",{id:"5---command"},"5 - Command"),(0,r.kt)("p",null,"Every pipeline consists of one or more commands. A command is a single function service, which can be called to do a simple operation like returning the current date, up to more complex executions like scanning documents for keywords or starting an RPA bot to automate something."),(0,r.kt)("p",null,"Commands can start a microservice in PIPEFORCE or trigger an external cloud service."),(0,r.kt)("p",null,"You can learn more about commands here: ",(0,r.kt)("a",{parentName:"p",href:"../guides/Command"},"Commands")),(0,r.kt)("h2",{id:"6---workflow"},"6 - Workflow"),(0,r.kt)("p",null,"More complex and stateful human interactions are defined in so called BPMN 2.0 workflows in PIPEFORCE. This is an official ISO standard to define business processes with a standardized graphical way. Once you have created a BPMN 2.0 workflow, you can feed it into PIPEFORCE, and bring it to life by connecting the BPMN tasks with pipelines."),(0,r.kt)("p",null,"You can learn more about workflows here: ",(0,r.kt)("a",{parentName:"p",href:"../guides/workflows/basics"},"Workflows")),(0,r.kt)("h2",{id:"7---low-code-workbench"},"7 - Low Code Workbench"),(0,r.kt)("p",null,"The workbench is an online section where you can create forms, lists, data mappings, workflows, and many more. Everything can be done without deep development i.e. just low code or no code."),(0,r.kt)("h2",{id:"8---command-line-interface-cli"},"8 - Command Line Interface (CLI)"),(0,r.kt)("p",null,"The command line interface is a little command line tool, which can be used to automate tasks from your local command line and to manage a workspace. However, this is recommended only for advanced users. If you\u2019re new to PIPEFORCE, consider starting with the online workbench first."),(0,r.kt)("p",null,"You can learn more about the CLI here: ",(0,r.kt)("a",{parentName:"p",href:"../api/cli"},"Command Line Interface (CLI)")),(0,r.kt)("h2",{id:"9---property-store"},"9 - Property Store"),(0,r.kt)("p",null,"This is a key-value distributed database, which stores all resources related to a business app. Whenever you submit form data, store configurations for apps, want to temporarily cache data, or need just a persistent storage, the property store is here for you."),(0,r.kt)("p",null,"You can learn more about the property store here: ",(0,r.kt)("a",{parentName:"p",href:"../propertystore"},"Property Store")),(0,r.kt)("h2",{id:"10---pipeline-engineer--the-low-coder"},"10 - Pipeline Engineer / The Low Coder"),(0,r.kt)("p",null,"And last but not least, the most important part: It\u2019s ",(0,r.kt)("strong",{parentName:"p"},"you"),", the pipeline engineer (or \u201cLow Coder\u201d). Every user who develops business applications based on PIPEFORCE, we call a pipeline engineer. A pipeline engineer mainly uses low-code and the low-code workbench for most rapid implementation cycles. In some rare cases, he can also program/develop additional features."),(0,r.kt)("h2",{id:"report-an-issue"},"Report an Issue"),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Your help is needed!")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"In case you're missing something on this page, you found an error or you have an idea for improvement, please ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/pipeforce/pipeforce.github.io/issues/new"},"click here to create a new issue"),". Another way to contribute is, to click ",(0,r.kt)("strong",{parentName:"p"},"Edit this page")," below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!"))))}p.isMDXComponent=!0},6882:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/image-20210219-183117-3a14bee56b926d6b3b9be1f1170b763b.png"},519:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/image-20210225-132457-00048f8b9af72614b5d8e9163f5f5879.png"}}]);