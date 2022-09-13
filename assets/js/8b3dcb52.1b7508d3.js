"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[8660],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),s=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=s(e.components);return o.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),m=s(n),u=r,f=m["".concat(l,".").concat(u)]||m[u]||c[u]||a;return n?o.createElement(f,i(i({ref:t},d),{},{components:n})):o.createElement(f,i({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var s=2;s<a;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},347:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>p,toc:()=>l});var o=n(7462),r=(n(7294),n(3905));const a={},i="File Upload",p={unversionedId:"guides/forms/forms-upload",id:"guides/forms/forms-upload",isDocsHomePage:!1,title:"File Upload",description:"In order to do a file upload using forms, follow these steps:",source:"@site/docs/guides/forms/050_forms-upload.md",sourceDirName:"guides/forms",slug:"/guides/forms/forms-upload",permalink:"/docs/guides/forms/forms-upload",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/forms/050_forms-upload.md",tags:[],version:"current",sidebarPosition:50,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Validation",permalink:"/docs/guides/forms/forms-validation"},next:{title:"Buttons",permalink:"/docs/guides/forms/forms-buttons"}},l=[{value:"Step 1 - Define in schema",id:"step-1---define-in-schema",children:[],level:2},{value:"Step 2 - Define in form config",id:"step-2---define-in-form-config",children:[],level:2},{value:"Step 3 - Access the uploaded file",id:"step-3---access-the-uploaded-file",children:[],level:2},{value:"Report an Issue",id:"report-an-issue",children:[],level:2}],s={toc:l};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"file-upload"},"File Upload"),(0,r.kt)("p",null,"In order to do a file upload using forms, follow these steps:"),(0,r.kt)("h2",{id:"step-1---define-in-schema"},"Step 1 - Define in schema"),(0,r.kt)("p",null,"Add the properties required for files in your ",(0,r.kt)("a",{parentName:"p",href:"../../guides/schema-and-objects"},"Forms Schema"),". For example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "type": "object",\n  "properties": {\n    "myFile": {\n      "type": "object",\n      "title": "CSV File",\n      "piStyle": {\n        "hidden": true\n      },\n      "properties": {\n        "filename": {\n          "type": "string"\n        },\n        "contentLength": {\n          "type": "number"\n        },\n        "contentType": {\n          "type": "string"\n        },\n        "contentEncoding": {\n          "type": "string"\n        },\n        "content": {\n          "type": "string"\n        }\n      }\n    }\n  }\n}\n')),(0,r.kt)("h2",{id:"step-2---define-in-form-config"},"Step 2 - Define in form config"),(0,r.kt)("p",null,"Define in the form config to render the file field as ",(0,r.kt)("inlineCode",{parentName:"p"},"filepicker")," widget using the ",(0,r.kt)("inlineCode",{parentName:"p"},"render")," attribute. For example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "title": "uploadform",\n  "description": "Upload example",\n  "schema": "property.list?filter=global/app/upload-example/schema/uploadform",\n  "output": "global/app/upload-example/data/uploadform/#{var.property.uuid}",\n  "layout": {\n    "items": [\n      {\n        "field": "myFile",\n        "render": "filepicker"\n      }\n    ]\n  }\n}\n')),(0,r.kt)("p",null,"Instead of ",(0,r.kt)("inlineCode",{parentName:"p"},"filepicker"),", you can set the render attribute also to ",(0,r.kt)("inlineCode",{parentName:"p"},"pdfviewer")," in order to show an embedded preview of an uploaded PDF."),(0,r.kt)("h2",{id:"step-3---access-the-uploaded-file"},"Step 3 - Access the uploaded file"),(0,r.kt)("p",null,"After form submit, the form data (including the file reference) in this example is stored as new entry to the property store under key ",(0,r.kt)("inlineCode",{parentName:"p"},"global/app/upload-example/data/uploadform/#{var.property.uuid}")," (see ",(0,r.kt)("inlineCode",{parentName:"p"},"output")," attribute) whereas ",(0,r.kt)("inlineCode",{parentName:"p"},"#{var.property.uuid}")," will be replaced by the uuid of the property."),(0,r.kt)("p",null,"The content of the uploaded file is stored separately as (binary) attachment to this property."),(0,r.kt)("p",null,"In your pipeline you can then listen to the form submit and access the content of the uploaded file by loading it from the property store since it is stored as attachment there."),(0,r.kt)("p",null,"Storing the content of a file separately as attachment has the advantage that the file can be theoretically unlimited in size since attachments can be stored elsewhere and linked to the properties. "),(0,r.kt)("p",null,"This example loads the CSV file's content, converts it to JSON, sends it via email and then logs it:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n\n  # Listen for the form submit since it will cause a new property entry\n  - event.listen:\n      key: "property.created"\n      filter: "#{body.target.key.contains(\'global/app/upload-example/data/uploadform\')}"\n\n  # Load the file content from the property attachment\n  - property.attachment.content:\n      key: "#{body.target.key}" # Property key\n      name: "#{body.target.value.myFile.content}" # Contains the name of the file\n      \n  # Do something with uploaded content\n  - transform.csv.json:\n  \n  - mail.send:\n      to: "your@email.tld"\n      subject: "Upload Example"\n      message: "#{body}"\n  \n  - log:\n      message: "CSV to JSON result: #{body}"\n')),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Whenever you listen to an event, PIPEFORCE automatically places the event object to the body.\nIn case of a ",(0,r.kt)("inlineCode",{parentName:"p"},"property.created")," event, this contains information about the property and its attachments."))),(0,r.kt)("h2",{id:"report-an-issue"},"Report an Issue"),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Your help is needed!")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"In case you're missing something on this page, you found an error or you have an idea for improvement, please ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/pipeforce/pipeforce.github.io/issues"},"click here to create a new issue"),". Another way to contribute is, to click ",(0,r.kt)("strong",{parentName:"p"},"Edit this page")," below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!"))))}d.isMDXComponent=!0}}]);