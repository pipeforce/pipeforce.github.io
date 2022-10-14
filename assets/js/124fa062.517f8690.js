"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[4647],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,f=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return n?r.createElement(f,i(i({ref:t},c),{},{components:n})):r.createElement(f,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6992:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:1,sidebar_label:"Getting Started"},i="Getting Started",s={unversionedId:"intro",id:"intro",isDocsHomePage:!1,title:"Getting Started",description:"For standard processes, there is commodity software off the shelf. For everything beyond: PIPEFORCE.",source:"@site/docs/10_intro.md",sourceDirName:".",slug:"/intro",permalink:"/docs/intro",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/10_intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,sidebar_label:"Getting Started"},sidebar:"tutorialSidebar",next:{title:"1. Namespaces",permalink:"/docs/guides/namespaces"}},l=[{value:"What is PIPEFORCE for?",id:"what-is-pipeforce-for",children:[],level:2},{value:"Report an Issue",id:"report-an-issue",children:[],level:2}],p={toc:l};function c(e){let{components:t,...o}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"getting-started"},"Getting Started"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"For standard processes, there is commodity software off the shelf. For everything beyond: PIPEFORCE.")),(0,a.kt)("p",null,"PIPEFORCE is an enterprise-grade business process automation and application integration platform. It is built entirely cloud-native and runs inside a container orchestration environment like Kubernetes using microservices and messaging. Designed ground-up that way. "),(0,a.kt)("p",null,"It covers all aspects to create and integrate new age best-of-breed enterprise solutions. It helps to develop, deploy and operate digital services, workflow apps, and data mappings across the entire journey from planning and discussion to implementation and testing with full life-cycle management. Everything on a single platform which offers low-code and custom microservice development."),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(9881).Z})),(0,a.kt)("h2",{id:"what-is-pipeforce-for"},"What is PIPEFORCE for?"),(0,a.kt)("p",null,"PIPEFORCE helps you to:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"integrate applications"),(0,a.kt)("li",{parentName:"ul"},"automate processes"),(0,a.kt)("li",{parentName:"ul"},"build and orchestrate microservices"),(0,a.kt)("li",{parentName:"ul"},"automate testing of complex solutions"),(0,a.kt)("li",{parentName:"ul"},"monitor and report processes and messages"),(0,a.kt)("li",{parentName:"ul"},"document workflows"),(0,a.kt)("li",{parentName:"ul"},"train processes with users")),(0,a.kt)("p",null,"within your company. Its an open platform which supports you for example to:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"integrate (connect) different Systems and APIs with standardized connectors and pipelines"),(0,a.kt)("li",{parentName:"ul"},"do data migration, transformation, cleansing and enrichment using ",(0,a.kt)("a",{parentName:"li",href:"https://www.enterpriseintegrationpatterns.com/patterns/messaging/"},"enterprise integration patterns")),(0,a.kt)("li",{parentName:"ul"},"build business apps using a forms and lists framework"),(0,a.kt)("li",{parentName:"ul"},"design, discuss and implement standardized BPMN workflows using an online designer"),(0,a.kt)("li",{parentName:"ul"},"automate tasks und flows using the built-in toolings or connect to external RPA toolings such as UIPath"),(0,a.kt)("li",{parentName:"ul"},"define a clear model for separation of people's responsbilities "),(0,a.kt)("li",{parentName:"ul"},"define a clear development and deployment model ")),(0,a.kt)("p",null,"All of this on a single platform and in a fraction of time."),(0,a.kt)("p",null,"We at PIPEFORCE believe that the digital success of new age enterprises lies in the ability to scale the development of digital solutions. We think that Low Code / No Code platforms are important here, but they won't solve all aspects. Instead, our goal is to give your employees digital superpower in their fields. The platform brings the experts closer together, so they can build business solutions to empower their company to cover the challenges of the digital age in a way and speed, that no others can do."),(0,a.kt)("p",null,"PIPEFORCE helps enterprises to achieve ",(0,a.kt)("strong",{parentName:"p"},"digital superpower")," by clearly separating the responsibilities and defining the interfaces between:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"User"),(0,a.kt)("li",{parentName:"ul"},"Admin"),(0,a.kt)("li",{parentName:"ul"},"Low Code Developer"),(0,a.kt)("li",{parentName:"ul"},"Professional Developer"),(0,a.kt)("li",{parentName:"ul"},"DevOp")),(0,a.kt)("p",null,"This documentation is mainly for Low Code and Professional Developers. If you are looking for user or admin manuals, please refer to the ",(0,a.kt)("a",{parentName:"p",href:"https://logabit.atlassian.net/servicedesk/customer/portals"},"Support pages"),"."),(0,a.kt)("p",null,"If you are a Low Code Developer or a Professional Developer and new to PIPEFORCE, we recommend you to walk through the ",(0,a.kt)("a",{parentName:"p",href:"tutorials/basics"},"Tutorials")," section first. After this you should have a good base understanding of PIPEFORCE."),(0,a.kt)("p",null,"In the ",(0,a.kt)("a",{parentName:"p",href:"commands_pipelines"},"Guides")," section you can find deep diving documentation about concepts and technologies, that PIPEFORCE is using."),(0,a.kt)("p",null,"In the ",(0,a.kt)("a",{parentName:"p",href:"api/commands"},"API")," section you can find reference documentation for PIPEFORCE."),(0,a.kt)("p",null,"In case you don't have a PIPEFORCE account yet, we highly recommend you to create one first, so you can try out all examples and tutorials live. It's a matter of seconds to create a free account here:"),(0,a.kt)("p",null," ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("a",{parentName:"strong",href:"https://try.pipeforce.org"},"https://try.pipeforce.org"))),(0,a.kt)("h2",{id:"report-an-issue"},"Report an Issue"),(0,a.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Your help is needed!")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"In case you're missing something on this page, you found an error or you have an idea for improvement, please ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/pipeforce/pipeforce.github.io/issues/new"},"click here to create a new issue"),". Another way to contribute is, to click ",(0,a.kt)("strong",{parentName:"p"},"Edit this page")," below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!"))))}c.isMDXComponent=!0},9881:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/pipeforce-overview-ddcc7b0c3824b4205031946e0a4b63d0.png"}}]);