"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[3083],{3905:function(A,e,t){t.d(e,{Zo:function(){return p},kt:function(){return i}});var n=t(7294);function r(A,e,t){return e in A?Object.defineProperty(A,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):A[e]=t,A}function a(A,e){var t=Object.keys(A);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(A);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(A,e).enumerable}))),t.push.apply(t,n)}return t}function l(A){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(Object(t),!0).forEach((function(e){r(A,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(e){Object.defineProperty(A,e,Object.getOwnPropertyDescriptor(t,e))}))}return A}function u(A,e){if(null==A)return{};var t,n,r=function(A,e){if(null==A)return{};var t,n,r={},a=Object.keys(A);for(n=0;n<a.length;n++)t=a[n],e.indexOf(t)>=0||(r[t]=A[t]);return r}(A,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(A);for(n=0;n<a.length;n++)t=a[n],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(A,t)&&(r[t]=A[t])}return r}var d=n.createContext({}),c=function(A){var e=n.useContext(d),t=e;return A&&(t="function"==typeof A?A(e):l(l({},e),A)),t},p=function(A){var e=c(A.components);return n.createElement(d.Provider,{value:e},A.children)},o={inlineCode:"code",wrapper:function(A){var e=A.children;return n.createElement(n.Fragment,{},e)}},f=n.forwardRef((function(A,e){var t=A.components,r=A.mdxType,a=A.originalType,d=A.parentName,p=u(A,["components","mdxType","originalType","parentName"]),f=c(t),i=r,s=f["".concat(d,".").concat(i)]||f[i]||o[i]||a;return t?n.createElement(s,l(l({ref:e},p),{},{components:t})):n.createElement(s,l({ref:e},p))}));function i(A,e){var t=arguments,r=e&&e.mdxType;if("string"==typeof A||r){var a=t.length,l=new Array(a);l[0]=f;var u={};for(var d in e)hasOwnProperty.call(e,d)&&(u[d]=e[d]);u.originalType=A,u.mdxType="string"==typeof A?A:r,l[1]=u;for(var c=2;c<a;c++)l[c]=t[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},4157:function(A,e,t){t.r(e),t.d(e,{frontMatter:function(){return u},contentTitle:function(){return d},metadata:function(){return c},toc:function(){return p},default:function(){return f}});var n=t(7462),r=t(3366),a=(t(7294),t(3905)),l=["components"],u={},d="Email",c={unversionedId:"guides/email",id:"guides/email",isDocsHomePage:!1,title:"Email",description:"We can create templates (in html) for emails, and use them in our pipelines. Task Links can also be included into the emails through templates and pipelines.",source:"@site/docs/guides/28_email.md",sourceDirName:"guides",slug:"/guides/email",permalink:"/docs/guides/email",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/28_email.md",tags:[],version:"current",sidebarPosition:28,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Pipeline",permalink:"/docs/guides/pipeline"},next:{title:"Property Store",permalink:"/docs/guides/propertystore"}},p=[{value:"1 - Create an email template",id:"1---create-an-email-template",children:[],level:2},{value:"2 - Create an email pipeline",id:"2---create-an-email-pipeline",children:[],level:2},{value:"3 - Set a link to a task in an email template",id:"3---set-a-link-to-a-task-in-an-email-template",children:[],level:2}],o={toc:p};function f(A){var e=A.components,u=(0,r.Z)(A,l);return(0,a.kt)("wrapper",(0,n.Z)({},o,u,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"email"},"Email"),(0,a.kt)("p",null,"We can create templates (in html) for emails, and use them in our pipelines. Task Links can also be included into the emails through templates and pipelines."),(0,a.kt)("h2",{id:"1---create-an-email-template"},"1 - Create an email template"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Login to the portal https://",(0,a.kt)("strong",{parentName:"p"},"NAMESPACE"),".pipeforce.net")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Navigate to LOW CODE \u2192 Workbench")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Select the node of your app or ",(0,a.kt)("a",{parentName:"p",href:"../tutorials/create-app"},"create a new one"),".")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Click the plus icon at the top of the tree.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"The new property view opens:"),(0,a.kt)("ol",{parentName:"li"},(0,a.kt)("li",{parentName:"ol"},"As property key, use: ",(0,a.kt)("inlineCode",{parentName:"li"},"global/app/YOUR_APP/template/email"),", where you can replace YOUR_APP with your own app name"),(0,a.kt)("li",{parentName:"ol"},"As mime type, use: ",(0,a.kt)("inlineCode",{parentName:"li"},"text/plain; type=template; format=freemarker")))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Click ",(0,a.kt)("inlineCode",{parentName:"p"},"SAVE"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"The new property has been created, and the content editor was opened for you.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Now copy and paste this content into the editor, and overwrite any existing data there by this:"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},"<div>\n  <p>\n    <b>Hallo Controlling Team,</b>\n  </p>\n  <br/>\n\n  <p>\n    <b>A request was made. What would you like to do next?</b>\n  </p>\n</div>\n")),(0,a.kt)("ol",{start:9},(0,a.kt)("li",{parentName:"ol"},"Click ",(0,a.kt)("inlineCode",{parentName:"li"},"SAVE"))),(0,a.kt)("h2",{id:"2---create-an-email-pipeline"},"2 - Create an email pipeline"),(0,a.kt)("p",null,"Now, we must create a pipeline where the emails' messages contain the content of this template."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Click the plus icon at the top of the tree.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"The new property view opens:"),(0,a.kt)("ol",{parentName:"li"},(0,a.kt)("li",{parentName:"ol"},"As property key, use: ",(0,a.kt)("inlineCode",{parentName:"li"},"global/app/YOUR_APP/pipeline/myPipeline"),", where you can replace YOUR_APP with your own app name"),(0,a.kt)("li",{parentName:"ol"},"As mime type, use: ",(0,a.kt)("inlineCode",{parentName:"li"},"application/yaml; type=pipeline")))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Click ",(0,a.kt)("inlineCode",{parentName:"p"},"SAVE"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"The new property has been created, and the content editor was opened for you.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Now copy and paste this content into the editor, and overwrite any existing data there by this:"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'  pipeline:\n  - mail.send:\n      to: "your@domain.tld"\n      subject: "Test email"\n      message: "uri:property:global/app/YOUR-APP/template/email"\n')),(0,a.kt)("ol",{start:6},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Replace ",(0,a.kt)("inlineCode",{parentName:"p"},"your@domain.tld")," by your real email address.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Click ",(0,a.kt)("inlineCode",{parentName:"p"},"SAVE")," and then ",(0,a.kt)("inlineCode",{parentName:"p"},"RUN")," to execute the pipeline.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"After a while, you should have received an email like this:"),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("img",{src:t(7495).Z})))),(0,a.kt)("p",null,"Here, we created a simple pipeline where we send email where the message points to the template we created in the same app i.e. ",(0,a.kt)("inlineCode",{parentName:"p"},"uri:property:global/app/YOUR-APP/template/send-email"),". Note that we must put ",(0,a.kt)("inlineCode",{parentName:"p"},"uri:property:")," in the suffix of the template path here."),(0,a.kt)("h2",{id:"3---set-a-link-to-a-task-in-an-email-template"},"3 - Set a link to a task in an email template"),(0,a.kt)("p",null,"We also have the power to add task links in the emails. For this, we update the above pipeline to this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'pipeline:\n  - set.var:\n      key: "taskUrl"\n      value: "#{@instance.url(\'portal\') + \'/#/task\'}"\n  - mail.send:\n      to: "m.shahid@logabit.com"\n      subject: "Test email"\n      message: "uri:property:global/app/neel100/template/email"\n      model: "#{{taskUrl: vars.taskUrl}}"\n')),(0,a.kt)("p",null,"Click ",(0,a.kt)("inlineCode",{parentName:"p"},"SAVE"),". "),(0,a.kt)("p",null,'Here, we define a variable which holds link to a task called "taskUrl". We pass this variable to the template using the "model" attribute. Now, we must update the previous template to this:'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<div>\n  <p>\n    <b>Hallo Controlling Team,</b>\n  </p>\n  <br/>\n\n  <p>\n    <b>A request was made. What would you like to do next?</b>\n  </p>\n  <br/>\n\n  <a href="${taskUrl}"><b>See Task</b></a><br/>\n</div>\n')),(0,a.kt)("p",null,"Click ",(0,a.kt)("inlineCode",{parentName:"p"},"SAVE"),". "),(0,a.kt)("p",null,"Here, we used the ",(0,a.kt)("inlineCode",{parentName:"p"},"taskUrl")," variable from the pipeline, so we can get link to the task in the email.\nNow, go back to the pipeline and click ",(0,a.kt)("inlineCode",{parentName:"p"},"RUN")," to execute the pipeline. This will generate an email containing a link like this:"),(0,a.kt)("p",null,(0,a.kt)("img",{src:t(715).Z})))}f.isMDXComponent=!0},715:function(A,e){e.Z="data:image/png;base64,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/mv3pkPXbmNMVxtgurUh5odMWm3+3KQr85xVnSnr53inXJN5865ku6t5zpt1JevnWs/2cm2v1rTlXFbH09WNXLK/3RrVuuY5qw+bq7VvOZbchzs1tnvqz/Hd2rcr2d5q795TZ9fvbi1v3Q+l65a5xrtxprmfct9mezmudmsvzvpzfCvZf5fNeeRDceee+6/MfZN7KlV7WW+a++ieMe76atlnfj7kOna/uz20a+Mh98vOvJ55nR66N3ZW56a5N56i37x2cx91+ey3fu9jU17nHF9ejzw/+1xdp7nXSp+fbX4O3nTo2l3UKW/esqrTVjf/NNsrVxsjx1k/V9n8PfWxVmXZxqy/2sS79ZgfKmX3gZQ3arn1gVrynKyfa7aa8/xg6TH1vOcY59jKqt2V7KvWrstzjLO/3frP9ay286Ew12zOs/rP6zfrZ1stx9xyHLt9O+U5u/17q86u33vXstQcc13m3s26JY/t7OrnWq/WseX5Zbc+Jdeg1Phzf+Z8umy1V3NspdZk186VXPuyqpPm9ZjXK+V4So3xav9ONYeum2u62kdXeyjHkfsu229X13llnn/reM7jXnPNq6x/Xu2NPN4e0m+u19xHXb7qN89rud5Xe21eizy2umfyeOk1+pT1fUlv/m+6Ple92XY3GMCnuAorwPMSul4poQt4Dvl24tabJ+BpCV2vlNAFPKX+TPHZAi9H6HqlfDACT6k+S3yuwMsSugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QugAADhC6AAAOELoAAA4QuvjJF1/8+NHqOADwOO8idP3d3/36xz/+4x9+/P3f/zlY1M9V9qtf/bA854Q//MOfx3PL6vyndLIvAHiP3nzoqsD1e7/32wEm1bHVeScIXQDwfrz50PVHf/TDxzBRb7d+8YsfftKBp35enXfCL3/5m7G0HmePK63Of0rZ9+o4APA4bz505VuueuuVx+r3v//73y4rFXL+4A9+Pq/D2qpulc2vLuvcClSz7i19flkdLzXmGst8S1a//+Vf/m6ff/M3P/wUPHMdanx/9mc//NZ6ZFvz/D63/rd+z+MAwH3efOjKMHTP329l2JrqWAavW19dVhjLtm/Jc1fHS4W5rDdl2MvAtJIhLct3539KkAQAfuPNh656o5OBooLQfOPV6g1S16u3QxXSSp3T5flVX75tqvKun8HtnqDX+pyyOt76TVX39xd/8fP4KmR2vZxP/0cDpc6tNrLNrlfq9wqXGVgFLgB4nDcfuio8rN5ercJX1ptfJXYA6bBSx7vuDDDVbh+rgJPHrvQ5ZXX8yurcDF0VEHdhs+T5c80ELgB4vDcfuloFkHxzU+bfKOWxK1W33hitjk0Vdrr9W/K81fFSgajebFW7u68Ou+5qjP0GL9ssWSff7NXPsy4A8HDvJnS1emuT4Su/juuyW6ruS4SuClwzaFX7JcvynPq7rRk2S52Tb/Pm8VZvvLIeAPBp3l3oKhUiMoj0264MG/OcKUPXQ4LVlVv9z68Ld6Epz2kVNmc4qzdmfTzLS369+JCvSAGAtTcfuipsrN7UZKjo0JVBbPUVXMq/26q3T0/xNqjbK6vjGZoqgHV59X3r3JZ/dJ9hMc+v9ag2863a6p+jAADu9+ZDV4eGChgVVEqGl/x6sQJal1fgqN8rfJX+O6oMY/m3TxXiKph0/f4bsq57j26rrI7nf4nZYykZIPPcGkP9DVfOI8ecb7BW51f9Lqv1uPpDfADg2rsJXSsVJOYbnAwlKxVEum69DZqBZ8q2b7l1XoagVPPIf3m/61foynpphqg81mUlg17NNY8BAPd7F18vzn+Rvd5AVbjavbmpc/JtWAeOCiDza8T6vcLNDF91fv7N1D3y/NXxUiEx+6q51deBZZ5bIW3OvX6uufdXqq2P5/kt+/P3XQDwad7lH9IDAJwmdAEAHPCmQ1d+ZcbTWa01AHDNmy4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgAOELgCAA4QuAIADhC4AgGf36x//P2sBidOKcdTAAAAAAElFTkSuQmCC"},7495:function(A,e){e.Z="data:image/png;base64,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"}}]);