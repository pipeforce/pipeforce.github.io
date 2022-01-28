"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[3758],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(n),m=r,h=d["".concat(p,".").concat(m)]||d[m]||u[m]||i;return n?a.createElement(h,o(o({ref:t},c),{},{components:n})):a.createElement(h,o({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9567:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return c},default:function(){return d}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={},p="App Installation",s={unversionedId:"guides/app_deployment",id:"guides/app_deployment",isDocsHomePage:!1,title:"App Installation",description:"From GitHub",source:"@site/docs/guides/120_app_deployment.md",sourceDirName:"guides",slug:"/guides/app_deployment",permalink:"/docs/guides/app_deployment",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/120_app_deployment.md",tags:[],version:"current",sidebarPosition:120,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Variables",permalink:"/docs/guides/workflows/variables"},next:{title:"CLI",permalink:"/docs/api/cli"}},c=[{value:"From GitHub",id:"from-github",children:[{value:"Public repo",id:"public-repo",children:[],level:3},{value:"Private repo",id:"private-repo",children:[{value:"Create a GitHub personal access token",id:"create-a-github-personal-access-token",children:[],level:4},{value:"Register access token as credentials",id:"register-access-token-as-credentials",children:[],level:4},{value:"Refer to these credentials in the command",id:"refer-to-these-credentials-in-the-command",children:[],level:4}],level:3}],level:2}],u={toc:c};function d(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"app-installation"},"App Installation"),(0,i.kt)("h2",{id:"from-github"},"From GitHub"),(0,i.kt)("p",null,"You can install any PIPEFORCE app directly from a GitHub repository."),(0,i.kt)("p",null,"Make sure the repository you would like to deploy from has a folder structure like this:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"src/"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"global/"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"app/"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"yourapp/"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("em",{parentName:"li"},"The contents of your app start in this level."))))))))))),(0,i.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Make sure you install only from trusted sources since installing apps from untrusted sources could harm your system!"))),(0,i.kt)("h3",{id:"public-repo"},"Public repo"),(0,i.kt)("p",null,"Let's assume you have a public GitHub repository with a name like ",(0,i.kt)("inlineCode",{parentName:"p"},"acme/my-pipeforce-app"),", then you can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"app.install")," command to install from this repository like this example shows using a pipeline:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - app.install:\n      github: "acme/my-pipeforce-app"\n')),(0,i.kt)("p",null,"Or you can use the CLI:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"pi command app.install github=acme/my-pipeforce-app\n")),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Since GitHub allows only a few requests for non-authenticated API calls, you can install\nonly very small apps using this public repo approach. If you have to install apps with\nmany resources, use the private repo approach since this has higher limits for API calls."))),(0,i.kt)("h3",{id:"private-repo"},"Private repo"),(0,i.kt)("p",null,"In case you would like to install from a private repo, you have to do additional steps:"),(0,i.kt)("h4",{id:"create-a-github-personal-access-token"},"Create a GitHub personal access token"),(0,i.kt)("p",null,"At first you need to create a personal access token in GitHub which allows to read your repo. See ",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"},"GitHub Docs")," how to do so."),(0,i.kt)("h4",{id:"register-access-token-as-credentials"},"Register access token as credentials"),(0,i.kt)("p",null,"Copy the GitHub access token, open the PIPEFORCE portal and go to ",(0,i.kt)("inlineCode",{parentName:"p"},"LOW CODE -> Credentials")," and create a new Credentials of type ",(0,i.kt)("inlineCode",{parentName:"p"},"header")," with a name of your choice, for example ",(0,i.kt)("inlineCode",{parentName:"p"},"github-token")," and as value use this format:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Authorization: token COPY_YOUR_TOKEN_HERE\n")),(0,i.kt)("p",null,"Save your new Credentials. "),(0,i.kt)("h4",{id:"refer-to-these-credentials-in-the-command"},"Refer to these credentials in the command"),(0,i.kt)("p",null,"Then you can use it in the ",(0,i.kt)("inlineCode",{parentName:"p"},"app.install")," command like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - app.install:\n      github: "acme/my-pipeforce-app"\n      credentials: "github-token"\n')))}d.isMDXComponent=!0}}]);