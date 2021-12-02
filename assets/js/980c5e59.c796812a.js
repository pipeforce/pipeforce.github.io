"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[7442],{3905:function(e,t,a){a.d(t,{Zo:function(){return u},kt:function(){return f}});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),d=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=d(a),f=n,m=p["".concat(s,".").concat(f)]||p[f]||c[f]||o;return a?r.createElement(m,i(i({ref:t},u),{},{components:a})):r.createElement(m,i({ref:t},u))}));function f(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var d=2;d<o;d++)i[d]=a[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},2273:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return u},default:function(){return p}});var r=a(7462),n=a(3366),o=(a(7294),a(3905)),i=["components"],l={},s="Variables",d={unversionedId:"guides/variables",id:"guides/variables",isDocsHomePage:!1,title:"Variables",description:"All values entered in a form are stored in variables and can be displayed and edited with subsequent task forms. In this section you will learn how to display those variables as read only and editable.",source:"@site/docs/guides/variables.md",sourceDirName:"guides",slug:"/guides/variables",permalink:"/docs/guides/variables",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/variables.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Two Factor",permalink:"/docs/guides/two-factor"},next:{title:"Visual Studio Code",permalink:"/docs/guides/vs-code"}},u=[{value:"Define form fields as workflow values",id:"define-form-fields-as-workflow-values",children:[],level:2},{value:"Display workflow variables",id:"display-workflow-variables",children:[],level:2},{value:"Make a variable read-only",id:"make-a-variable-read-only",children:[],level:2}],c={toc:u};function p(e){var t=e.components,a=(0,n.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"variables"},"Variables"),(0,o.kt)("p",null,"All values entered in a form are stored in variables and can be displayed and edited with subsequent task forms. In this section you will learn how to display those variables as read only and editable."),(0,o.kt)("h2",{id:"define-form-fields-as-workflow-values"},"Define form fields as workflow values"),(0,o.kt)("p",null,"In case you are defining form fields via the Online Workflow Modeler, like in the example below, all field IDs are directly stored as workflow variables. If you use those IDs in multiple steps in the workflow model, the content entered in previous steps are displayed automatically."),(0,o.kt)("p",null,"In case you would like to use workflow variables from a trigger form, there are a few additional steps to do. These steps are described in this tutorial ",(0,o.kt)("a",{parentName:"p",href:"https://logabit.atlassian.net/wiki/spaces/DEVEX/pages/2151285278/Tutorial%3A+Create+a+new+BPMN+workflow"},"Tutorial: Create a new BPMN workflow")," , section 9 and 10."),(0,o.kt)("h2",{id:"display-workflow-variables"},"Display workflow variables"),(0,o.kt)("p",null,"To display values entered during the workflow in subsequent (task) forms you can just create a field with the identical ID in the Online Workflow Modeler (e.g. taxRate)."),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://logabit.atlassian.net/wiki/download/attachments/2151288687/Bildschirmfoto%202021-10-20%20um%2015.12.59.png?api=v2",alt:null})),(0,o.kt)("h2",{id:"make-a-variable-read-only"},"Make a variable read-only"),(0,o.kt)("p",null,"Per default, the values are editable. That means a user who is assigned to this task is able to see the entered value and overwrite it. To change it to \u201cread only\u201d you have to follow these steps:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Go to your online BPMN model"),(0,o.kt)("li",{parentName:"ol"},"Change to XML view"),(0,o.kt)("li",{parentName:"ol"},"Add this section below the field you would like to define as \u201cread only\u201d direct in the XML-Editor:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'<camunda:validation>\n\xa0 <camunda:constraint name="readonly" />\n</camunda:validation>\n')),(0,o.kt)("p",null,"Example:"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://logabit.atlassian.net/wiki/download/attachments/2151288687/Bildschirmfoto%202021-10-25%20um%2017.11.15.png?api=v2",alt:null})),(0,o.kt)("p",null,"In this example the field named ",(0,o.kt)("inlineCode",{parentName:"p"},"f1")," is set to read only."))}p.isMDXComponent=!0}}]);