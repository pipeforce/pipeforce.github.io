"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[7623],{3905:function(e,t,a){a.d(t,{Zo:function(){return m},kt:function(){return u}});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},m=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,l=e.originalType,p=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),c=s(a),u=i,h=c["".concat(p,".").concat(u)]||c[u]||d[u]||l;return a?n.createElement(h,r(r({ref:t},m),{},{components:a})):n.createElement(h,r({ref:t},m))}));function u(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=a.length,r=new Array(l);r[0]=c;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,r[1]=o;for(var s=2;s<l;s++)r[s]=a[s];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},8083:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return m},default:function(){return c}});var n=a(7462),i=a(3366),l=(a(7294),a(3905)),r=["components"],o={},p="Emails",s={unversionedId:"guides/workflows/emails",id:"guides/workflows/emails",isDocsHomePage:!1,title:"Emails",description:"1 - Create the email pipeline",source:"@site/docs/guides/workflows/040_emails.md",sourceDirName:"guides/workflows",slug:"/guides/workflows/emails",permalink:"/docs/guides/workflows/emails",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/workflows/040_emails.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Variables",permalink:"/docs/guides/workflows/variables"},next:{title:"CLI",permalink:"/docs/api/cli"}},m=[{value:"1 - Create the email pipeline",id:"1---create-the-email-pipeline",children:[],level:2},{value:"2 - Send a simple email using workflow",id:"2---send-a-simple-email-using-workflow",children:[],level:2},{value:"3 - Add an attachment",id:"3---add-an-attachment",children:[],level:2},{value:"4 - Set dynamic text in emails",id:"4---set-dynamic-text-in-emails",children:[],level:2},{value:"5 - Use dynamic email receiver",id:"5---use-dynamic-email-receiver",children:[{value:"Modify your email pipeline",id:"modify-your-email-pipeline",children:[],level:3}],level:2}],d={toc:m};function c(e){var t=e.components,o=(0,i.Z)(e,r);return(0,l.kt)("wrapper",(0,n.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"emails"},"Emails"),(0,l.kt)("h2",{id:"1---create-the-email-pipeline"},"1 - Create the email pipeline"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Login to the portal https://",(0,l.kt)("strong",{parentName:"p"},"NAMESPACE"),".pipeforce.net")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Navigate to LOW CODE \u2192 Workbench")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Select the node of your app or ",(0,l.kt)("a",{parentName:"p",href:"../../tutorials/create-app"},"create a new one"),".")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Click the plus icon at the top of the tree.")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"The new property view opens:"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},"As property key, use: ",(0,l.kt)("inlineCode",{parentName:"li"},"global/app/vacation-request/pipeline/myPipeline")),(0,l.kt)("li",{parentName:"ol"},"As mime type, use: ",(0,l.kt)("inlineCode",{parentName:"li"},"application/yaml; type=pipeline")))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Click ",(0,l.kt)("inlineCode",{parentName:"p"},"SAVE"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"The new property has been created, and the content editor was opened for you.")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Now copy and paste this content into the editor, and overwrite any existing data there by this:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - mail.send:\n      to: "your@domain.tld"\n      subject: "Test email"\n      message: "This is a simple email, sent from a pipeline."\n'))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Replace ",(0,l.kt)("inlineCode",{parentName:"p"},"your@domain.tld")," by your real email address.")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Click ",(0,l.kt)("inlineCode",{parentName:"p"},"SAVE")," and then ",(0,l.kt)("inlineCode",{parentName:"p"},"RUN")," to execute the pipeline.")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"After a while, you should have received an email similar to this, decorated with the default layout:  "),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("img",{src:a(1421).Z})))),(0,l.kt)("h2",{id:"2---send-a-simple-email-using-workflow"},"2 - Send a simple email using workflow"),(0,l.kt)("p",null,"Lets assume, a pipeline is stored in the property store under this key path:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"global/app/vacation-request/pipeline/myPipeline\n")),(0,l.kt)("p",null,"Then, you need to configure your System Task like this to automatically pick-up and execute this pipeline, in case the system task is executed by the workflow:"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Make sure the Id of the BPMN workflow has the same name as the app: ",(0,l.kt)("inlineCode",{parentName:"li"},"vacation-request"),"."),(0,l.kt)("li",{parentName:"ol"},"Make sure the Id of the System Task, which should execute the pipeline, has the same name as the pipeline: ",(0,l.kt)("inlineCode",{parentName:"li"},"myPipeline"),"."),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Do not")," define any pipeline parameter in the System Task.")),(0,l.kt)("p",null,"When executed, the System Task automatically searches for a pipeline in the given app folder and executes it."),(0,l.kt)("p",null,(0,l.kt)("img",{src:a(2597).Z})),(0,l.kt)("h2",{id:"3---add-an-attachment"},"3 - Add an attachment"),(0,l.kt)("p",null,"In this step, you will learn how to add attachments to such an email pipeline. For this, we will upload a PDF document to drive first, which will be used as an attachment."),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Login to the portal https://",(0,l.kt)("strong",{parentName:"p"},"NAMESPACE"),".pipeforce.net")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Open Files / Drive.")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Upload a file with name ",(0,l.kt)("inlineCode",{parentName:"p"},"invoice.pdf")," into the root folder.")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Change your pipeline ",(0,l.kt)("inlineCode",{parentName:"p"},"send-email")," to this:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - drive.read:\n      path: "invoice.pdf"\n  - mail.send:\n      to: "your@domain.tld"\n      subject: "Test email"\n      message: "This is a simple email, sent from a pipeline."\n      attachments: "#{body}"\n'))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"As you can see, we added the command ",(0,l.kt)("inlineCode",{parentName:"p"},"drive.read")," to read the PDF from drive into the body of the pipeline (which happens automatically for you). Additionally, we added the parameter ",(0,l.kt)("inlineCode",{parentName:"p"},"attachments")," to the ",(0,l.kt)("inlineCode",{parentName:"p"},"mail.send")," command. As value, the PEL expression ",(0,l.kt)("inlineCode",{parentName:"p"},"#{body}")," is used. This expression points to the body of the current pipeline where the PDF document was loaded to. You can add multiple attachments by adding them separated by a comma. You can also point to resources inside the property store by using the uri format ",(0,l.kt)("inlineCode",{parentName:"p"},"uri:property:path/to/resource"),".")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Execute it on workflow.")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"After a while, you should receive again an email, but this time with the PDF as an attachment")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Done."))),(0,l.kt)("h2",{id:"4---set-dynamic-text-in-emails"},"4 - Set dynamic text in emails"),(0,l.kt)("p",null,"Sometimes it is necessary to put dynamic text to emails. The easiest way in PIPEFORCE to do so, is by using the ",(0,l.kt)("a",{parentName:"p",href:"../../api/pel"},"Pipeline Expression Language (PEL)"),". In this step, we will simply add the currently logged-in user as the from email field, so that the recipient can easily reply to you with the current date and time in the email text using PEL:"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Change your pipeline send-email to this:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - drive.read:\n      path: "invoice.pdf"\n  - mail.send:\n      to: "your@domain.tld"\n      replyTo: "#{@user.email()}"\n      fromName: "#{@user.displayName()}"\n      subject: "Test email"\n      message: "This is a simple email, sent on #{@date.now(\'dd.MM.YY, HH:mm\')}"\n      attachments: "#{body}"\n'))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"As you can see, we did several changes in the pipeline:"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},"We added the parameter ",(0,l.kt)("inlineCode",{parentName:"li"},'replyTo: "#{@user.email()}"'),". Its value will be replaced by the email address of the currently logged-in user, so the recipient can simply press the reply button to reply to this email."),(0,l.kt)("li",{parentName:"ol"},"We added the parameter ",(0,l.kt)("inlineCode",{parentName:"li"},'fromName: "#{@user.displayName()}"'),". Its value will be replaced by the display name of the currently logged in user."),(0,l.kt)("li",{parentName:"ol"},"Finally, we added the PEL expression ",(0,l.kt)("inlineCode",{parentName:"li"},"#{@date.now('dd.MM.YY, HH:mm')}")," to the email message, in order to display the current date and time dynamically inside the email."))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Click ",(0,l.kt)("inlineCode",{parentName:"p"},"SAVE")," and then ",(0,l.kt)("inlineCode",{parentName:"p"},"RUN"),".")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"After a while you should receive an email similar to this:  "),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("img",{src:a(4884).Z}))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Done."))),(0,l.kt)("h2",{id:"5---use-dynamic-email-receiver"},"5 - Use dynamic email receiver"),(0,l.kt)("p",null,"Currently, the email is sent always to the address you have entered in the pipeline. However, in case the form is deployed for multiple users, the emails should be sent always to the person who submitted the vacation request (i.e. Requester). To enhance the workflow accordingly, follow these steps:"),(0,l.kt)("p",null,"Your new workflow should look like this (go ahead and add the respective tasks and form fields in the workflow):"),(0,l.kt)("p",null,(0,l.kt)("img",{src:a(9392).Z})),(0,l.kt)("p",null,"In your trigger pipeline, you can directly add the values you would like to define as process variables. With those process variables, you can work in subsequent steps of the workflow. In our example, we define the logged in user, who is starting the workflow as the Requester. To do so, follow these steps:"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Go to LOW CODE \u2192 Workbench and create your trigger pipeline ",(0,l.kt)("inlineCode",{parentName:"li"},"global/app/vacation-request/pipeline/trigger-vacation-request"),"."),(0,l.kt)("li",{parentName:"ol"},"Copy and paste this pipeline snippet to the pipeline (replace any existing content):")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  - event.listen:\n      key: "property.created"\n      filter: "#{body.target.key.contains(\'global/app/YOUR_APP/object/vacationrequest/v1/instance\')}"\n\n  - set.var:\n      key: "formData"\n      value: "#{@property.lazy(body.target.key)}"\n\n  - workflow.start:\n      key: "YOUR_APP_vacation-request"\n      workflowModelInstanceKey: "#{body.target.key}"\n      variables: "#{{\n        \'vacationStartDate\': @date.parseToInstant(vars.formData[\'vacationStartDate\']),\n        \'vacationEndDate\': @date.parseToInstant(vars.formData[\'vacationEndDate\']),\n        \'requester\': @user.email()\n      }}"\n')),(0,l.kt)("p",null,"As you can see at the bottom of the pipeline, in addition to the ",(0,l.kt)("inlineCode",{parentName:"p"},"vacation start date")," and the ",(0,l.kt)("inlineCode",{parentName:"p"},"vacation end date"),", you have now defined a new process variable ",(0,l.kt)("inlineCode",{parentName:"p"},"requester"),", and matched the email of the user who started the workflow to this variable."),(0,l.kt)("h3",{id:"modify-your-email-pipeline"},"Modify your email pipeline"),(0,l.kt)("p",null,"You can now modify your email pipelines to sent notifications about approved and declined emails accordingly:"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Go to LOW CODE \u2192 Workbench and create your approved email pipeline ",(0,l.kt)("inlineCode",{parentName:"li"},"global/app/vacation-request/pipeline/send-approved-email"),"."),(0,l.kt)("li",{parentName:"ol"},"Copy and paste this pipeline snippet to the pipeline (replace any existing content):")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"pipeline:\n - mail.send:\n    to: \"#{vars.requester}\"\n    subject: \"Vacation Request Approved\"\n    message: |\n        Hello, your vacation request from #{@date.format(vars.vacationStartDate, 'dd/MM/YYYY')} \n        to #{@date.format(vars.vacationEndDate, 'dd/MM/YYYY')} was approved.\n")),(0,l.kt)("p",null,"Adapt your declined email in the same way."),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Go to LOW CODE \u2192 Workbench and create your approved email pipeline ",(0,l.kt)("inlineCode",{parentName:"li"},"global/app/YOUR_APP/pipeline/send-declined-email")),(0,l.kt)("li",{parentName:"ol"},"Copy and paste this pipeline snippet to the pipeline (replace any existing content):")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"pipeline:\n - mail.send:\n    to: \"#{vars.requester}\"\n    subject: \"Vacation Request Declined\"\n    message: |\n        Hello, your vacation request from #{@date.format(vars.vacationStartDate, 'dd/MM/YYYY')} \n        to #{@date.format(vars.vacationEndDate, 'dd/MM/YYYY')} was declined.\n")),(0,l.kt)("p",null,"The new task form of the Reviewer should now look like this:"),(0,l.kt)("p",null,(0,l.kt)("img",{src:a(4584).Z})),(0,l.kt)("p",null,"If you now start the workflow, you are able to see the requester email in the task form of the Reviewer."),(0,l.kt)("p",null,"For more guide on email pipelines and templates, please see: ",(0,l.kt)("strong",{parentName:"p"},(0,l.kt)("a",{parentName:"strong",href:"../email"},"Email Pipelines"))))}c.isMDXComponent=!0},4584:function(e,t,a){t.Z=a.p+"assets/images/Bildschirmfoto-4be8e94c3db2dc4f08cf3a3252db5a39.png"},1421:function(e,t,a){t.Z=a.p+"assets/images/grafik-20210802-064546-8eea9448b28cf509cae5c663a131c025.png"},4884:function(e,t,a){t.Z=a.p+"assets/images/grafik-20210802-072933-0bf6692b2ee602ffd9e5bc9f40ea0474.png"},2597:function(e,t,a){t.Z=a.p+"assets/images/validation-request-23e2576ea14ab73f055c70f8a7b8e696.png"},9392:function(e,t,a){t.Z=a.p+"assets/images/workflow-form-042ba53d6e287a687d8c45e39703d41a.PNG"}}]);