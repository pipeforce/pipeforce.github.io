"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[8239],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),p=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(n),f=a,m=c["".concat(s,".").concat(f)]||c[f]||d[f]||r;return n?o.createElement(m,i(i({ref:t},u),{},{components:n})):o.createElement(m,i({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<r;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}c.displayName="MDXCreateElement"},8617:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return u},default:function(){return c}});var o=n(7462),a=n(3366),r=(n(7294),n(3905)),i=["components"],l={id:"basics",title:"Forms Basics",sidebar_label:"Basics",slug:"/forms-basics"},s=void 0,p={unversionedId:"guides/forms/basics",id:"guides/forms/basics",isDocsHomePage:!1,title:"Forms Basics",description:"In order to define a form in PIPEFORCE, you need a JSON schema and the form configuration.",source:"@site/docs/guides/forms/010_forms-intro.md",sourceDirName:"guides/forms",slug:"/forms-basics",permalink:"/docs/forms-basics",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/forms/010_forms-intro.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{id:"basics",title:"Forms Basics",sidebar_label:"Basics",slug:"/forms-basics"},sidebar:"tutorialSidebar",previous:{title:"Schema & Objects",permalink:"/docs/guides/schema-and-objects"},next:{title:"Orientation",permalink:"/docs/guides/forms/forms-orientation"}},u=[{value:"How to handle the form output",id:"how-to-handle-the-form-output",children:[],level:2},{value:"How to load and edit input data in a form",id:"how-to-load-and-edit-input-data-in-a-form",children:[],level:2},{value:"The form configuration",id:"the-form-configuration",children:[{value:"Change orientation of form fields",id:"change-orientation-of-form-fields",children:[],level:3},{value:"Change appearance of form fields",id:"change-appearance-of-form-fields",children:[],level:3},{value:"Custom buttons",id:"custom-buttons",children:[],level:3},{value:"File upload",id:"file-upload",children:[],level:3}],level:2}],d={toc:u};function c(e){var t=e.components,l=(0,a.Z)(e,i);return(0,r.kt)("wrapper",(0,o.Z)({},d,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"In order to define a form in PIPEFORCE, you need a ",(0,r.kt)("strong",{parentName:"p"},"JSON schema")," and the ",(0,r.kt)("strong",{parentName:"p"},"form configuration"),"."),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(8515).Z})),(0,r.kt)("p",null,"The JSON ",(0,r.kt)("strong",{parentName:"p"},"schema")," (also called the \u201cobject schema\u201d) defines the structure of a dataset and \u201ctells\u201d the form which fields to display that a user can fill-out. Learn more about the JSON Schema in this chapter: ",(0,r.kt)("a",{parentName:"p",href:"/docs/guides/schema-and-objects"},"Schema & Objects"),"."),(0,r.kt)("p",null,"The ",(0,r.kt)("strong",{parentName:"p"},"input")," data is used in case an existing dataset needs to be edited. The form is pre-filled with some data, so the user can make changes, and save again."),(0,r.kt)("p",null,"After a form was submitted, the ",(0,r.kt)("strong",{parentName:"p"},"output")," is automatically saved into the property store. So, you do not need to care about where the data is stored."),(0,r.kt)("p",null,"After this, an event is send, depending on what the form did with an object/property:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"property.created"),": If a new object was created by submitting the form."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"property.changed"),": If an existing object has been changed by submitting the form."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"property.deleted"),": If an existing object has been deleted by submitting the form.")),(0,r.kt)("p",null,"Any pipeline can then listen to such events using the command ",(0,r.kt)("inlineCode",{parentName:"p"},"event.listen"),", and do additional logic afterwards using the submitted data. For example, sending notification emails, doing data integration, or alike. Such a pipeline could look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'pipeline:\n  - event.listen:\n      key: "property.created"\n  - ...\n')),(0,r.kt)("p",null,"The glue of all this is the ",(0,r.kt)("strong",{parentName:"p"},"form configuration"),", which defines how the form should use the schema and display the fields. Additionally, any information about layouting a form\u2019s fields goes into the form configuration."),(0,r.kt)("h2",{id:"how-to-handle-the-form-output"},"How to handle the form output"),(0,r.kt)("p",null,"By default, after a submit, the data of a form is automatically stored into the property store under a new property having this key path:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"global/app/<APP>/object/<NAME>/v1/instance/<UUID>\n")),(0,r.kt)("p",null,"Where ",(0,r.kt)("inlineCode",{parentName:"p"},"<APP>")," is the name of your app. ",(0,r.kt)("inlineCode",{parentName:"p"},"<NAME>")," is the name of the object, the schema of the form belongs to, and ",(0,r.kt)("inlineCode",{parentName:"p"},"<UUID>")," is a unique identifier for the dataset, created automatically for each new entry."),(0,r.kt)("p",null,"In the person example above, after a form is submitted with new data, this data could be stored in a new property with a key path which looks like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"global/app/myApp/object/person/v1/instance/133a11f6-8011-47d3-b6eb-1376cca5e6b6\n")),(0,r.kt)("p",null,"The output of the form, which is the value of this instance property, could look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "firstName": "Bart",\n  "lastName": "Simpson",\n  "age": 12,\n  "gender": "male"\n}\n')),(0,r.kt)("p",null,"You can easily query existing instances using the command ",(0,r.kt)("inlineCode",{parentName:"p"},"property.list"),". For example, using the pi tool:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'pi pipeline uri "property.list?filter=/**/global/app/myApp/object/person/v1/instance/*"\n')),(0,r.kt)("p",null,"In case you have more than one object type in your app, and you want to list all instances of all objects of your app, you could use this list filter:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'pi pipeline uri "property.list?filter=/**/global/app/myApp/object/*/v1/instance/*"\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Note"),": Be careful, since in this example it would return the instances from all objects of myApp. Learn more about filtering properties from the property store in this section ",(0,r.kt)("a",{parentName:"p",href:"/docs/guides/propertystore"},"Property Store"),"."),(0,r.kt)("h2",{id:"how-to-load-and-edit-input-data-in-a-form"},"How to load and edit input data in a form"),(0,r.kt)("p",null,"After a form has been submitted, for each submit, a new instance property is created in the instance path of an object, for example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"global/app/myApp/object/person/v1/instance/133a11f6-8011-47d3-b6eb-1376cca5e6b6\n")),(0,r.kt)("p",null,"In case you want to edit such an instance, first you need to load it into the form using the request parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"input"),", when calling the form:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"?input=property.list?filter=global/app/myApp/object/person/1/instance/133a11f6-8011-47d3-b6eb-1376cca5e6b6\n")),(0,r.kt)("p",null,"Now, form renders initial values from the input, but will still save into new ",(0,r.kt)("inlineCode",{parentName:"p"},"global/app/myApp/object/person/v1/instance/{somenewrandomuid}")),(0,r.kt)("p",null,"To save to the same record, additional form ",(0,r.kt)("inlineCode",{parentName:"p"},"output")," parameter needs to be added to overwrite default behaviour."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"...&output=global/app/myApp/object/person/v1/instance/133a11f6-8011-47d3-b6eb-1376cca5e6b6\n")),(0,r.kt)("p",null,"This all is automatically done for you in case you call a form using a list."),(0,r.kt)("h2",{id:"the-form-configuration"},"The form configuration"),(0,r.kt)("p",null,"The last step to create and configure a new form is to create a form configuration file. This is a configuration file in JSON format, which defines important attributes of a form like its title or layout information."),(0,r.kt)("p",null,"Here\u2019s an example how such a file could look like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "title": "Person",\n  "description": "The person form.",\n  "schema": "property.list?filter=global/app/myApp/object/person/v1/schema",\n  "output": "global/app/myApp/object/person/v1/instance/%23%7Bvars.property.uuid%7D"\n}\n')),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"title")," defines the title of the form to be displayed in the web ui, for example."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"description")," is optional and describes the intention of the form."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"schema")," defines a command which is called to retrieve the JSON schema for this form."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"output")," defines the path in the property store where to store the data. The part ",(0,r.kt)("inlineCode",{parentName:"p"},"%23%7Bvars.property.uuid%7D")," is the url encoded version of ",(0,r.kt)("inlineCode",{parentName:"p"},"#{vars.property.uuid}"),", which is a PE to return the uuid of the property to form its path."),(0,r.kt)("p",null,"Note: In version >= 7.0, it is no longer required to specify the attributes ",(0,r.kt)("inlineCode",{parentName:"p"},"schema")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"output"),", since the form will automatically detect these values."),(0,r.kt)("p",null,"By default, the form configuration is stored inside the form folder as a JSON file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"global/app/myApp/form/personForm\n")),(0,r.kt)("p",null,"After you have created a JSON Schema file and a form configuration, and pushed them to the property store using pi push, the form is listed in the forms section and is ready to be used."),(0,r.kt)("p",null,"For all schema properties, there is a web input control rendered - filed. By default, all fields are displayed using the default - single column layout i.e. every field in its own row."),(0,r.kt)("p",null,"To reach custom layout, fields behaviour, file uploads, custom buttons, and more, additional ",(0,r.kt)("inlineCode",{parentName:"p"},"layout")," attribute of the form configuration file needs to be used. Layout uses different approach to define which fields to show. Only fields referenced in this structure are rendered. For details, see following sections."),(0,r.kt)("h3",{id:"change-orientation-of-form-fields"},"Change orientation of form fields"),(0,r.kt)("p",null,"You can change this default by configuring orientation of the layout in the form configuration."),(0,r.kt)("p",null,"See this section for more details: ",(0,r.kt)("a",{parentName:"p",href:"../docs/guides/forms/forms-orientation"},"Form - Orientation")),(0,r.kt)("h3",{id:"change-appearance-of-form-fields"},"Change appearance of form fields"),(0,r.kt)("p",null,"Besides the orientation (vertical, horizontal) of form fields, the appearance (color, border, icons, aso) can also be changed inside the layout section."),(0,r.kt)("p",null,"See this section for more details: ",(0,r.kt)("a",{parentName:"p",href:"../docs/guides/forms/forms-lookandfeel"},"Form - Look & Feel")),(0,r.kt)("h3",{id:"custom-buttons"},"Custom buttons"),(0,r.kt)("p",null,"Replacements for the default Submit button can be defined by ",(0,r.kt)("inlineCode",{parentName:"p"},"render")," attribute of boolean field in the layout section."),(0,r.kt)("p",null,"See this section for more details:",(0,r.kt)("a",{parentName:"p",href:"../docs/guides/forms/forms-buttons"},"Form - Buttons")),(0,r.kt)("h3",{id:"file-upload"},"File upload"),(0,r.kt)("p",null,"In the layout section, it is also possible to configure the set of schema properties defining form upload."),(0,r.kt)("p",null,"See this section for more details: ",(0,r.kt)("a",{parentName:"p",href:"../docs/guides/forms/forms-upload"},"Form - Upload")))}c.isMDXComponent=!0},8515:function(e,t,n){t.Z=n.p+"assets/images/grafik-20201023-083314-b085ec5332bd0c7b36e9e4bc6342601c.png"}}]);