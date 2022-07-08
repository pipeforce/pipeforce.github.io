"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[6320],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return c}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=p(n),c=r,h=m["".concat(i,".").concat(c)]||m[c]||u[c]||o;return n?a.createElement(h,s(s({ref:t},d),{},{components:n})):a.createElement(h,s({ref:t},d))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var p=2;p<o;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7258:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return i},metadata:function(){return p},toc:function(){return d},default:function(){return m}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),s=["components"],l={},i="Groups, Roles, and Permissions",p={unversionedId:"guides/permissions",id:"guides/permissions",isDocsHomePage:!1,title:"Groups, Roles, and Permissions",description:"Permissions in PIPEFORCE are also called roles. With such roles, you can define what a user is allowed to do. Roles can be assigned directly to a user or to a group via the webui of the IAM or the iam.* commands. Furthermore, there are also roles which define a set of other roles. These parent roles are called composite roles.",source:"@site/docs/guides/80_permissions.md",sourceDirName:"guides",slug:"/guides/permissions",permalink:"/docs/guides/permissions",editUrl:"https://github.com/pipeforce/pipeforce.github.io/edit/master/docs/guides/80_permissions.md",tags:[],version:"current",sidebarPosition:80,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Identity and Access (IAM)",permalink:"/docs/guides/iam"},next:{title:"Webhooks",permalink:"/docs/guides/webhooks"}},d=[{value:"Group",id:"group",children:[{value:"Default groups",id:"default-groups",children:[],level:3}],level:2},{value:"Role and Permission",id:"role-and-permission",children:[{value:"Default Roles",id:"default-roles",children:[],level:3},{value:"Command Permissions",id:"command-permissions",children:[],level:3},{value:"App Permissions",id:"app-permissions",children:[{value:"Automate setup of app permissions",id:"automate-setup-of-app-permissions",children:[],level:4}],level:3}],level:2},{value:"Anonymous User",id:"anonymous-user",children:[],level:2}],u={toc:d};function m(e){var t=e.components,n=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"groups-roles-and-permissions"},"Groups, Roles, and Permissions"),(0,o.kt)("p",null,"Permissions in PIPEFORCE are also called ",(0,o.kt)("strong",{parentName:"p"},"roles"),". With such roles, you can define what a user is allowed to do. Roles can be assigned directly to a user or to a group via the webui of the IAM or the ",(0,o.kt)("inlineCode",{parentName:"p"},"iam.*")," commands. Furthermore, there are also roles which define a set of other roles. These parent roles are called composite roles."),(0,o.kt)("p",null,"Since changing permissions is always something which needs to be handled very carefully, feel free to optionally contact our support team to cross-check your permission setup. We\u2019re happy to help you on this, so you have a really secure application."),(0,o.kt)("p",null,"Note that you need to be a member of ",(0,o.kt)("inlineCode",{parentName:"p"},"ROLE_ADMIN")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"ROLE_DEVELOPER")," in order to be able to change role permissions as described in this chapter. In case you\u2019re not able to login into IAM or apply the steps described below, please contact the PIPEFORCE admin in your company or feel free to contact our support team to grant you the required permissions and roles."),(0,o.kt)("h2",{id:"group"},"Group"),(0,o.kt)("p",null,"A group in PIPEFORCE combines a set of users with a set of roles. Groups are typically created and managed by admins. There can be \u201cfactory default\u201d groups and also customer specific groups."),(0,o.kt)("h3",{id:"default-groups"},"Default groups"),(0,o.kt)("p",null,"There are some default groups in PIPEFORCE. These groups may not be renamed or deleted by admins or developers, otherwise the system will no longer work as expected. These default groups are:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null}),(0,o.kt)("th",{parentName:"tr",align:null}),(0,o.kt)("th",{parentName:"tr",align:null}))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"td"},"Group name")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"td"},"Description")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"td"},"Requires license"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"Administrator (Standard)"),"  ",(0,o.kt)("br",null),(0,o.kt)("inlineCode",{parentName:"td"},"pipeforce-admin")," (since v7.0)"),(0,o.kt)("td",{parentName:"tr",align:null},"Members of this group can create and manage users & groups, but cannot create and develop apps."),(0,o.kt)("td",{parentName:"tr",align:null},"Yes")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"Developer (Standard)"),"  ",(0,o.kt)("br",null),(0,o.kt)("inlineCode",{parentName:"td"},"pipeforce-developer"),"(since v7.0)"),(0,o.kt)("td",{parentName:"tr",align:null},"Members of this group can create and manage users & groups. They cam also create and develop apps."),(0,o.kt)("td",{parentName:"tr",align:null},"Yes")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"Employee (Standard)"),"  ",(0,o.kt)("br",null),(0,o.kt)("inlineCode",{parentName:"td"},"pipeforce-employee"),"(since v7.0)"),(0,o.kt)("td",{parentName:"tr",align:null},"Members of this group can login to the system and use it, but they cannot create or manage users, and they cannot create or develop apps."),(0,o.kt)("td",{parentName:"tr",align:null},"Yes")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"Guest (Standard)"),"  ",(0,o.kt)("br",null),(0,o.kt)("inlineCode",{parentName:"td"},"pipeforce-guest"),"(since v7.0)"),(0,o.kt)("td",{parentName:"tr",align:null},"Member this group can login to the system, but they can see only a very limited set of functionalities. These members are typically managed by the system."),(0,o.kt)("td",{parentName:"tr",align:null},"No")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"Recipient (Standard)"),"  ",(0,o.kt)("br",null),(0,o.kt)("inlineCode",{parentName:"td"},"pipeforce-recipient"),"(since v7.0)"),(0,o.kt)("td",{parentName:"tr",align:null},"Members of this group cannot login to the portal, but can use a limited set of features in the system. These members are typically managed by the system."),(0,o.kt)("td",{parentName:"tr",align:null},"No")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"service-workflow-admin")),(0,o.kt)("td",{parentName:"tr",align:null},"Members of this group can see and execute tasks from the workflow tasks' list, and they can get additional information about workflows."),(0,o.kt)("td",{parentName:"tr",align:null},"Yes")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"service-workflow-user")),(0,o.kt)("td",{parentName:"tr",align:null},"Members of this group can see and execute tasks from the workflow tasks' list."),(0,o.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,o.kt)("p",null,"For any app or process, there can be additional groups, depending on the license you are using."),(0,o.kt)("p",null,"Each group can contain one or more roles which is the core permission entity."),(0,o.kt)("h2",{id:"role-and-permission"},"Role and Permission"),(0,o.kt)("p",null,"In PIPEFORCE, there is the concept of roles. A role can be seen as a permission (privilege) for a user to be allowed to do a certain task in the system. A role is a permission: So whenever you see a role, it can also be called a permission, and vice versa. These namings are equal."),(0,o.kt)("p",null,"Roles can be assigned to a single user or group. A user will be granted all roles of all groups he is a member of."),(0,o.kt)("p",null,"It is a good practice to assign roles via groups, instead of directly to users."),(0,o.kt)("p",null,"The main difference between roles and groups is that roles cannot be created or deleted by admins. These are \u201cfactory default\u201d roles and some roles created by developers."),(0,o.kt)("p",null,"Roles can also contain other roles. Such parent roles are called ",(0,o.kt)("strong",{parentName:"p"},"Composite Roles"),". You probably never require such type of roles, since they are mainly used in PIPEFORCE internally only."),(0,o.kt)("h3",{id:"default-roles"},"Default Roles"),(0,o.kt)("p",null,"These composite roles exist by default in PIPEFORCE and cannot be removed (\u201cfactory defaults\u201d). Any user or group, which is assigned to such a role, has some additional basic set of permissions assigned to fulfill a certain role in PIPEFORCE."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null}),(0,o.kt)("th",{parentName:"tr",align:null}))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"td"},"Role Name")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"td"},"Description"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ROLE_GUEST")),(0,o.kt)("td",{parentName:"tr",align:null},"Any guest user of PIPEFORCE is assigned to this role. Guest users do not require a license, but can only use a subset of functionalities.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ROLE_USER")),(0,o.kt)("td",{parentName:"tr",align:null},"Any PIPEFORCE user is assigned to this role. It allows to login to the system.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ROLE_EMPLOYEE")),(0,o.kt)("td",{parentName:"tr",align:null},"Any employee of our customers which should see a subset of apps in the portal need to be assigned this role.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ROLE_DEVELOPER")),(0,o.kt)("td",{parentName:"tr",align:null},"Any user who wants to be able to develop custom apps need to be assigned to this role.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ROLE_SUPPORT")),(0,o.kt)("td",{parentName:"tr",align:null},"Special role for our support team.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ROLE_ADMIN")),(0,o.kt)("td",{parentName:"tr",align:null},"Any user assigned to this role has the permission to manage users and settings, but cannot create apps.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ROLE_SYSTEM")),(0,o.kt)("td",{parentName:"tr",align:null},"A system user is assigned this role.")))),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Why are there default composite roles and default groups?")),(0,o.kt)("p",null,"Since PIPEFORCE is a microservice system, it hosts many different services. Some of them require groups and some can work with roles. Furthermore, there is also a conceptional difference: Groups can be created and managed by admins, roles cannot. They can only be assigned and revoked by admins."),(0,o.kt)("h3",{id:"command-permissions"},"Command Permissions"),(0,o.kt)("p",null,"For any command in PIPEFORCE, there is a corresponding role (or permission) which allows the user assigned to this role to execute this command. The role has the format: ",(0,o.kt)("inlineCode",{parentName:"p"},"CAN_PIPE_<command_name>"),". Some examples:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null}),(0,o.kt)("th",{parentName:"tr",align:null}))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"td"},"Command Name")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"td"},"Permission / Role Name"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"drive.read")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"CAN_PIPE_drive.read"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"drive.save")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"CAN_PIPE_drive.save"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"property.put")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"CAN_PIPE_property.put"))))),(0,o.kt)("p",null,"See ",(0,o.kt)("inlineCode",{parentName:"p"},"Role Mappings")," section for users and groups in IAM for a full list of all available command permissions."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Wildcard command permission (use with maximum care!)"),(0,o.kt)("br",{parentName:"p"}),"\n","Besides the specific command permission, you can also use the wildcard permissions in order to give a permission to all commands or a specific subset. This should not be used by users, but is reserved for admins and developers."),(0,o.kt)("p",null,"Examples:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"CAN_PIPE_%"),": Grants access to all commands"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"CAN_PIPE_drive.%"),": Grants access to all drive commands")),(0,o.kt)("h3",{id:"app-permissions"},"App Permissions"),(0,o.kt)("p",null,"Note: Depending on the setup of your PIPEFEORCE system, these steps usually are done by your global corporate admin and cannot be done by developers or default admins. Please ask your global admin or the PIPEFORCE support team to do these steps for you."),(0,o.kt)("p",null,"By default, new applications are shown only to users assigned to the role ",(0,o.kt)("inlineCode",{parentName:"p"},"ROLE_DEVELOPER")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"ROLE_ADMIN"),"."),(0,o.kt)("p",null,"In order to provide your application also to non-developers, you need to do these manual steps:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Login to IAM."),(0,o.kt)("li",{parentName:"ol"},"Create a new role ",(0,o.kt)("inlineCode",{parentName:"li"},"CAN_APP_<APPNAME>"),"."),(0,o.kt)("li",{parentName:"ol"},"Assign this new role to all users or groups who should have access to this app.")),(0,o.kt)("p",null,"Note: Make sure to replace ",(0,o.kt)("inlineCode",{parentName:"p"},"<APPNAME>")," by the real name of your app with ",(0,o.kt)("strong",{parentName:"p"},"all letters upper case"),". So, let,s assume you have created an app ",(0,o.kt)("inlineCode",{parentName:"p"},"myapp"),", then you should create a new role ",(0,o.kt)("inlineCode",{parentName:"p"},"CAN_APP_MYAPP"),"."),(0,o.kt)("p",null,"Also, make sure that users and groups you want to give access to your app are trustworthy. Furthermore, make sure that they also have the permission to access all commands you are using inside your app."),(0,o.kt)("h4",{id:"automate-setup-of-app-permissions"},"Automate setup of app permissions"),(0,o.kt)("p",null,"Instead of manually creating and assigning the roles of your app, you can automate these steps by providing a setup pipeline using the ",(0,o.kt)("inlineCode",{parentName:"p"},"iam.*")," commands. To do so, follow these steps:"),(0,o.kt)("p",null,"Create a new pipeline inside the setup folder of your app, for example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"global/app/myapp/setup/permissions.pi.yaml\n")),(0,o.kt)("p",null,"Open this pipeline, add this content, and then publish + execute it:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'headers:\n  description: "Creates the default users, groups and permissions of myapp"\n  onCommandError: "IGNORE"\n\npipeline:\n\n  - iam.run.as:\n      username: systemuser\n\n  # Create the new app role\n  - iam.role.create:\n      name: "CAN_APP_MYAPP"\n\n  # Assign this role to all employees automatically\n  - iam.role.add.composites:\n      roleName: "ROLE_EMPLOYEE"\n      composites: "CAN_APP_MYAPP"\n')),(0,o.kt)("p",null,"In future, whenever your app is installed on a fresh PIPEFORCE instance, this setup pipeline is executed. So, any required roles and assignments are created."),(0,o.kt)("p",null,"In the ",(0,o.kt)("inlineCode",{parentName:"p"},"headers")," section, we set special fields:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"description"),": The description of this pipeline."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"onCommandError"),": This defines what should happen if a command in the pipeline fails. In this case, we ",(0,o.kt)("inlineCode",{parentName:"li"},"IGNORE")," such a problem, since it would usually mean that the role already exists or was already assigned.")),(0,o.kt)("p",null,"For more information about the available default headers, see ",(0,o.kt)("a",{parentName:"p",href:"../api/headers"},"Pipeline Headers Reference")," ."),(0,o.kt)("p",null,"In the pipeline section, we use these commands:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"iam.run.as"),": This runs the commands as this user."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"iam.role.create"),": This creates a new custom role."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"iam.role.add.composites"),": This adds an existing role as a child to another role (to make a combination of roles).")),(0,o.kt)("p",null,"For more information about the available ",(0,o.kt)("inlineCode",{parentName:"p"},"iam.*")," commands, see the commands' dashboard of your instance."),(0,o.kt)("h2",{id:"anonymous-user"},"Anonymous User"),(0,o.kt)("p",null,"In case a user is not logged-in, the system handles this automatically as ",(0,o.kt)("inlineCode",{parentName:"p"},"anonymousUser")," with no roles/permissions and no groups assigned to it. Such a user can only execute a very limited set of public commands."))}m.isMDXComponent=!0}}]);