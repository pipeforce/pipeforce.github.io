"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[9521],{5999:(e,t,n)=>{n.d(t,{Z:()=>u,I:()=>l});var r=n(7294);const o=/{\w+}/g,a="{}";function i(e,t){const n=[],i=e.replace(o,(e=>{const o=e.substr(1,e.length-2),i=null==t?void 0:t[o];if(void 0!==i){const e=r.isValidElement(i)?i:String(i);return n.push(e),a}return e}));return 0===n.length?e:n.every((e=>"string"==typeof e))?i.split(a).reduce(((e,t,r)=>{var o;return e.concat(t).concat(null!==(o=n[r])&&void 0!==o?o:"")}),""):i.split(a).reduce(((e,t,o)=>[...e,r.createElement(r.Fragment,{key:o},t,n[o])]),[])}var s=n(7529);function c(e){let{id:t,message:n}=e;var r,o;if(void 0===t&&void 0===n)throw new Error("Docusaurus translation declarations must have at least a translation id or a default translation message");return null!==(o=null!==(r=s[null!=t?t:n])&&void 0!==r?r:n)&&void 0!==o?o:t}function l(e,t){let{message:n,id:r}=e;return i(c({message:n,id:r}),t)}function u(e){let{children:t,id:n,values:r}=e;if(t&&"string"!=typeof t)throw console.warn("Illegal <Translate> children",t),new Error("The Docusaurus <Translate> component only accept simple string values");return i(c({message:t,id:n}),r)}},9935:(e,t,n)=>{n.d(t,{m:()=>r});const r="default"},8143:(e,t,n)=>{n.r(t),n.d(t,{BrowserRouter:()=>r.VK,HashRouter:()=>r.UT,Link:()=>r.rU,MemoryRouter:()=>r.VA,NavLink:()=>r.OL,Prompt:()=>r.NL,Redirect:()=>r.l_,Route:()=>r.AW,Router:()=>r.F0,StaticRouter:()=>r.gx,Switch:()=>r.rs,generatePath:()=>r.Gn,matchPath:()=>r.LX,useHistory:()=>r.k6,useLocation:()=>r.TH,useParams:()=>r.UO,useRouteMatch:()=>r.$B,withRouter:()=>r.EN});var r=n(3727)},8084:(e,t,n)=>{n.r(t),n.d(t,{default:()=>a,useAllPluginInstancesData:()=>i,usePluginData:()=>s});var r=n(2263),o=n(9935);function a(){const{globalData:e}=(0,r.Z)();if(!e)throw new Error("Docusaurus global data not found.");return e}function i(e){const t=a()[e];if(!t)throw new Error(`Docusaurus plugin global data not found for "${e}" plugin.`);return t}function s(e,t){void 0===t&&(t=o.m);const n=i(e)[t];if(!n)throw new Error(`Docusaurus plugin global data not found for "${e}" plugin with id "${t}".`);return n}},2389:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(7294),o=n(9913);function a(){return(0,r.useContext)(o._)}},8408:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getDocVersionSuggestions=t.getActiveDocContext=t.getActiveVersion=t.getLatestVersion=t.getActivePlugin=void 0;const r=n(8143);t.getActivePlugin=function(e,t,n){void 0===n&&(n={});const o=Object.entries(e).find((e=>{let[n,o]=e;return!!(0,r.matchPath)(t,{path:o.path,exact:!1,strict:!1})})),a=o?{pluginId:o[0],pluginData:o[1]}:void 0;if(!a&&n.failfast)throw new Error(`Can't find active docs plugin for "${t}" pathname, while it was expected to be found. Maybe you tried to use a docs feature that can only be used on a docs-related page? Existing docs plugin paths are: ${Object.values(e).map((e=>e.path)).join(", ")}`);return a};t.getLatestVersion=e=>e.versions.find((e=>e.isLast));t.getActiveVersion=(e,n)=>{const o=(0,t.getLatestVersion)(e);return[...e.versions.filter((e=>e!==o)),o].find((e=>!!(0,r.matchPath)(n,{path:e.path,exact:!1,strict:!1})))};t.getActiveDocContext=(e,n)=>{const o=(0,t.getActiveVersion)(e,n),a=null==o?void 0:o.docs.find((e=>!!(0,r.matchPath)(n,{path:e.path,exact:!0,strict:!1})));return{activeVersion:o,activeDoc:a,alternateDocVersions:a?function(t){const n={};return e.versions.forEach((e=>{e.docs.forEach((r=>{r.id===t&&(n[e.name]=r)}))})),n}(a.id):{}}};t.getDocVersionSuggestions=(e,n)=>{const r=(0,t.getLatestVersion)(e),o=(0,t.getActiveDocContext)(e,n);return{latestDocSuggestion:null==o?void 0:o.alternateDocVersions[r.name],latestVersionSuggestion:r}}},6730:(e,t,n)=>{t.Jo=t.Iw=t.zu=t.yW=t.gB=t.gA=t.zh=t._r=void 0;const r=n(655),o=n(8143),a=(0,r.__importStar)(n(8084)),i=n(8408),s={};t._r=()=>{var e;return null!==(e=(0,a.default)()["docusaurus-plugin-content-docs"])&&void 0!==e?e:s};t.zh=e=>(0,a.usePluginData)("docusaurus-plugin-content-docs",e);t.gA=function(e){void 0===e&&(e={});const n=(0,t._r)(),{pathname:r}=(0,o.useLocation)();return(0,i.getActivePlugin)(n,r,e)};t.gB=e=>(0,t.zh)(e).versions;t.yW=e=>{const n=(0,t.zh)(e);return(0,i.getLatestVersion)(n)};t.zu=e=>{const n=(0,t.zh)(e),{pathname:r}=(0,o.useLocation)();return(0,i.getActiveVersion)(n,r)};t.Iw=e=>{const n=(0,t.zh)(e),{pathname:r}=(0,o.useLocation)();return(0,i.getActiveDocContext)(n,r)};t.Jo=e=>{const n=(0,t.zh)(e),{pathname:r}=(0,o.useLocation)();return(0,i.getDocVersionSuggestions)(n,r)}},907:(e,t,n)=>{n.d(t,{Iw:()=>r.Iw,Jo:()=>r.Jo,_r:()=>r._r,gA:()=>r.gA,gB:()=>r.gB,yW:()=>r.yW,zh:()=>r.zh,zu:()=>r.zu});var r=n(6730)},9521:(e,t,n)=>{n.d(t,{pl:()=>me,zF:()=>H,HX:()=>v,PO:()=>J,L5:()=>ae,Cv:()=>Q,Cn:()=>G,OC:()=>De,kM:()=>ue,WA:()=>l,os:()=>m,lx:()=>le,Fx:()=>Me,Mg:()=>b,_f:()=>u,PZ:()=>Ee,bc:()=>g,MA:()=>we,l5:()=>d,nT:()=>he,uR:()=>A,J:()=>ce,Rb:()=>Pe,be:()=>ye,SL:()=>k,g8:()=>K,c2:()=>L,D9:()=>R,RF:()=>Te,o5:()=>Ie,DA:()=>Oe,Si:()=>Le,LU:()=>o,pe:()=>w});var r=n(2263);function o(){return(0,r.Z)().siteConfig.themeConfig}const a="localStorage";function i(e){if(void 0===e&&(e=a),"undefined"==typeof window)throw new Error("Browser storage is not available on Node.js/Docusaurus SSR process.");if("none"===e)return null;try{return window[e]}catch(n){return t=n,s||(console.warn("Docusaurus browser storage is not available.\nPossible reasons: running Docusaurus in an iframe, in an incognito browser session, or using too strict browser privacy settings.",t),s=!0),null}var t}let s=!1;const c={get:()=>null,set:()=>{},del:()=>{}};const l=(e,t)=>{if("undefined"==typeof window)return function(e){function t(){throw new Error(`Illegal storage API usage for storage key "${e}".\nDocusaurus storage APIs are not supposed to be called on the server-rendering process.\nPlease only call storage APIs in effects and event handlers.`)}return{get:t,set:t,del:t}}(e);const n=i(null==t?void 0:t.persistence);return null===n?c:{get:()=>n.getItem(e),set:t=>n.setItem(e,t),del:()=>n.removeItem(e)}};function u(e){void 0===e&&(e=a);const t=i(e);if(!t)return[];const n=[];for(let r=0;r<t.length;r+=1){const e=t.key(r);null!==e&&n.push(e)}return n}var f=n(6550);function d(){const{siteConfig:{baseUrl:e,url:t},i18n:{defaultLocale:n,currentLocale:o}}=(0,r.Z)(),{pathname:a}=(0,f.TH)(),i=o===n?e:e.replace(`/${o}/`,"/"),s=a.replace(e,"");return{createUrl:function(e){let{locale:r,fullyQualified:o}=e;return`${o?t:""}${function(e){return e===n?`${i}`:`${i}${e}/`}(r)}${s}`}}}const p=/title=(["'])(.*?)\1/;function g(e){var t,n;return null!==(n=null===(t=null==e?void 0:e.match(p))||void 0===t?void 0:t[2])&&void 0!==n?n:""}const v="default";function m(e,t){return`docs-${e}-${t}`}var h=n(907);const y=!!h._r,b=(e,t)=>{const n=e=>!e||(null==e?void 0:e.endsWith("/"))?e:`${e}/`;return n(e)===n(t)},w=e=>{const{siteConfig:t}=(0,r.Z)(),{title:n,titleDelimiter:o}=t;return e&&e.trim().length?`${e.trim()} ${o} ${n}`:n};var E=n(7294);const P=["zero","one","two","few","many","other"];function _(e){return P.filter((t=>e.includes(t)))}const S={locale:"en",pluralForms:_(["one","other"]),select:e=>1===e?"one":"other"};function x(){const{i18n:{currentLocale:e}}=(0,r.Z)();return(0,E.useMemo)((()=>{if(!Intl.PluralRules)return console.error("Intl.PluralRules not available!\nDocusaurus will fallback to a default/fallback (English) Intl.PluralRules implementation.\n        "),S;try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:_(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to a default/fallback (English) Intl.PluralRules implementation.\n`),S}}),[e])}function L(){const e=x();return{selectMessage:(t,n)=>function(e,t,n){const r=e.split("|");if(1===r.length)return r[0];{r.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms}), but the message contains ${r.length} plural forms: ${e} `);const o=n.select(t),a=n.pluralForms.indexOf(o);return r[Math.min(a,r.length-1)]}}(n,t,e)}}const C="undefined"!=typeof window?E.useLayoutEffect:E.useEffect;function O(e){const t=(0,E.useRef)(e);return C((()=>{t.current=e}),[e]),(0,E.useCallback)((function(){return t.current(...arguments)}),[])}function R(e){const t=(0,E.useRef)();return C((()=>{t.current=e})),t.current}function k(e){const t=(0,f.TH)(),n=R(t),r=O(e);(0,E.useEffect)((()=>{r({location:t,previousLocation:n})}),[r,t,n])}var D=n(412);function A(e){let{initialState:t}=e;const[n,r]=(0,E.useState)(null!=t&&t),o=(0,E.useCallback)((()=>{r((e=>!e))}),[]);return{collapsed:n,setCollapsed:r,toggleCollapsed:o}}const j={display:"none",overflow:"hidden",height:"0px"},T={display:"block",overflow:"visible",height:"auto"};function I(e,t){const n=t?j:T;e.style.display=n.display,e.style.overflow=n.overflow,e.style.height=n.height}function M(e){let{collapsibleRef:t,collapsed:n,animation:r}=e;const o=(0,E.useRef)(!1);(0,E.useEffect)((()=>{const e=t.current;function a(){var t,n;const o=e.scrollHeight,a=null!==(t=null==r?void 0:r.duration)&&void 0!==t?t:function(e){const t=e/36;return Math.round(10*(4+15*t**.25+t/5))}(o);return{transition:`height ${a}ms ${null!==(n=null==r?void 0:r.easing)&&void 0!==n?n:"ease-in-out"}`,height:`${o}px`}}function i(){const t=a();e.style.transition=t.transition,e.style.height=t.height}if(!o.current)return I(e,n),void(o.current=!0);return e.style.willChange="height",function(){const t=requestAnimationFrame((()=>{n?(i(),requestAnimationFrame((()=>{e.style.height=j.height,e.style.overflow=j.overflow}))):(e.style.display="block",requestAnimationFrame((()=>{i()})))}));return()=>cancelAnimationFrame(t)}()}),[t,n,r])}function $(e){if(!D.Z.canUseDOM)return e?j:T}function V(e){let{as:t="div",collapsed:n,children:r,animation:o,onCollapseTransitionEnd:a,className:i,disableSSRStyle:s}=e;const c=(0,E.useRef)(null);return M({collapsibleRef:c,collapsed:n,animation:o}),E.createElement(t,{ref:c,style:s?void 0:$(n),onTransitionEnd:e=>{"height"===e.propertyName&&(I(c.current,n),null==a||a(n))},className:i},r)}function F(e){let{collapsed:t,...n}=e;const[r,o]=(0,E.useState)(!t);(0,E.useLayoutEffect)((()=>{t||o(!0)}),[t]);const[a,i]=(0,E.useState)(t);return(0,E.useLayoutEffect)((()=>{r&&i(t)}),[r,t]),r?E.createElement(V,{...n,collapsed:a}):null}function H(e){let{lazy:t,...n}=e;const r=t?F:V;return E.createElement(r,{...n})}var N=n(2389),B=n(6010);const z="details_Q743",Z="isBrowser_rWTL",U="collapsibleContent_K5uX";function W(e){return!!e&&("SUMMARY"===e.tagName||W(e.parentElement))}function q(e,t){return!!e&&(e===t||q(e.parentElement,t))}const J=e=>{let{summary:t,children:n,...r}=e;const o=(0,N.Z)(),a=(0,E.useRef)(null),{collapsed:i,setCollapsed:s}=A({initialState:!r.open}),[c,l]=(0,E.useState)(r.open);return E.createElement("details",{...r,ref:a,open:c,"data-collapsed":i,className:(0,B.Z)(z,{[Z]:o},r.className),onMouseDown:e=>{W(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;W(t)&&q(t,a.current)&&(e.preventDefault(),i?(s(!1),l(!0)):s(!0))}},t,E.createElement(H,{lazy:!1,collapsed:i,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{s(e),l(!e)}},E.createElement("div",{className:U},n)))};const X=(0,E.createContext)(null);function G(e){let{children:t}=e;return E.createElement(X.Provider,{value:(0,E.useState)(null)},t)}function Y(){const e=(0,E.useContext)(X);if(null===e)throw new Error("MobileSecondaryMenuProvider was not used correctly, context value is null");return e}function K(){const[e]=Y();if(e){const t=e.component;return function(n){return E.createElement(t,{...e.props,...n})}}return()=>{}}function Q(e){let{component:t,props:n}=e;const[,r]=Y(),o=(a=n,(0,E.useMemo)((()=>a),[...Object.keys(a),...Object.values(a)]));var a;return(0,E.useEffect)((()=>{r({component:t,props:o})}),[r,t,o]),(0,E.useEffect)((()=>()=>r(null)),[r]),null}const ee=e=>`docs-preferred-version-${e}`,te={save:(e,t,n)=>{l(ee(e),{persistence:t}).set(n)},read:(e,t)=>l(ee(e),{persistence:t}).get(),clear:(e,t)=>{l(ee(e),{persistence:t}).del()}};function ne(e){let{pluginIds:t,versionPersistence:n,allDocsData:r}=e;const o={};return t.forEach((e=>{o[e]=function(e){const t=te.read(e,n);return r[e].versions.some((e=>e.name===t))?{preferredVersionName:t}:(te.clear(e,n),{preferredVersionName:null})}(e)})),o}function re(){const e=(0,h._r)(),t=o().docs.versionPersistence,n=(0,E.useMemo)((()=>Object.keys(e)),[e]),[r,a]=(0,E.useState)((()=>function(e){const t={};return e.forEach((e=>{t[e]={preferredVersionName:null}})),t}(n)));(0,E.useEffect)((()=>{a(ne({allDocsData:e,versionPersistence:t,pluginIds:n}))}),[e,t,n]);return[r,(0,E.useMemo)((()=>({savePreferredVersion:function(e,n){te.save(e,t,n),a((t=>({...t,[e]:{preferredVersionName:n}})))}})),[t])]}const oe=(0,E.createContext)(null);function ae(e){let{children:t}=e;return y?E.createElement(ie,null,t):E.createElement(E.Fragment,null,t)}function ie(e){let{children:t}=e;const n=re();return E.createElement(oe.Provider,{value:n},t)}var se=n(9935);function ce(e){void 0===e&&(e=se.m);const t=(0,h.zh)(e),[n,r]=function(){const e=(0,E.useContext)(oe);if(!e)throw new Error('Can\'t find docs preferred context, maybe you forgot to use the "DocsPreferredVersionContextProvider"?');return e}(),{preferredVersionName:o}=n[e];return{preferredVersion:o?t.versions.find((e=>e.name===o)):null,savePreferredVersionName:(0,E.useCallback)((t=>{r.savePreferredVersion(e,t)}),[r,e])}}function le(e,t){return void 0===t&&(t=(e,t)=>e===t),e.filter(((n,r)=>e.findIndex((e=>t(e,n)))!==r))}const ue={page:{blogListPage:"blog-list-page",blogPostPage:"blog-post-page",blogTagsListPage:"blog-tags-list-page",blogTagPostListPage:"blog-tags-post-list-page",docsDocPage:"docs-doc-page",docsTagsListPage:"docs-tags-list-page",docsTagDocListPage:"docs-tags-doc-list-page",mdxPage:"mdx-page"},wrapper:{main:"main-wrapper",blogPages:"blog-wrapper",docsPages:"docs-wrapper",mdxPages:"mdx-wrapper"},common:{editThisPage:"theme-edit-this-page",lastUpdated:"theme-last-updated",backToTopButton:"theme-back-to-top-button"},layout:{},docs:{docVersionBanner:"theme-doc-version-banner",docVersionBadge:"theme-doc-version-badge",docMarkdown:"theme-doc-markdown",docTocMobile:"theme-doc-toc-mobile",docTocDesktop:"theme-doc-toc-desktop",docFooter:"theme-doc-footer",docFooterTagsRow:"theme-doc-footer-tags-row",docFooterEditMetaRow:"theme-doc-footer-edit-meta-row",docSidebarMenu:"theme-doc-sidebar-menu",docSidebarItemCategory:"theme-doc-sidebar-item-category",docSidebarItemLink:"theme-doc-sidebar-item-link",docSidebarItemCategoryLevel:e=>`theme-doc-sidebar-item-category-level-${e}`,docSidebarItemLinkLevel:e=>`theme-doc-sidebar-item-link-level-${e}`},blog:{}},fe=l("docusaurus.announcement.dismiss"),de=l("docusaurus.announcement.id"),pe=()=>"true"===fe.get(),ge=e=>fe.set(String(e)),ve=(0,E.createContext)(null),me=e=>{let{children:t}=e;const n=(()=>{const{announcementBar:e}=o(),t=(0,N.Z)(),[n,r]=(0,E.useState)((()=>!!t&&pe()));(0,E.useEffect)((()=>{r(pe())}),[]);const a=(0,E.useCallback)((()=>{ge(!0),r(!0)}),[]);return(0,E.useEffect)((()=>{if(!e)return;const{id:t}=e;let n=de.get();"annoucement-bar"===n&&(n="announcement-bar");const o=t!==n;de.set(t),o&&ge(!1),!o&&pe()||r(!1)}),[e]),(0,E.useMemo)((()=>({isActive:!!e&&!n,close:a})),[e,n,a])})();return E.createElement(ve.Provider,{value:n},t)},he=()=>{const e=(0,E.useContext)(ve);if(!e)throw new Error("useAnnouncementBar(): AnnouncementBar not found in React context: make sure to use the AnnouncementBarProvider on top of the tree");return e};function ye(){const{siteConfig:{baseUrl:e}}=(0,r.Z)(),{pathname:t}=(0,f.TH)();return t.replace(e,"/")}var be=n(5999);const we=()=>(0,be.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function Ee(e){const t={};return Object.values(e).forEach((e=>{var n;const r=function(e){return e[0].toUpperCase()}(e.name);t[r]=null!==(n=t[r])&&void 0!==n?n:[],t[r].push(e)})),Object.entries(t).sort(((e,t)=>{let[n]=e,[r]=t;return n.localeCompare(r)})).map((e=>{let[t,n]=e;return{letter:t,tags:n.sort(((e,t)=>e.name.localeCompare(t.name)))}}))}function Pe(e){!function(e){const{block:t}=(0,f.k6)(),n=(0,E.useRef)(e);(0,E.useEffect)((()=>{n.current=e}),[e]),(0,E.useEffect)((()=>t(((e,t)=>n.current(e,t)))),[t,n])}(((t,n)=>{if("POP"===n)return e(t,n)}))}function _e(e){const t=e.getBoundingClientRect();return t.top===t.bottom?_e(e.parentNode):t}function Se(e,t){let{anchorTopOffset:n}=t;var r;const o=e.find((e=>_e(e).top>=n));if(o){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(_e(o))?o:null!==(r=e[e.indexOf(o)-1])&&void 0!==r?r:null}return e[e.length-1]}function xe(){const e=(0,E.useRef)(0),{navbar:{hideOnScroll:t}}=o();return(0,E.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}const Le=function(e){const t=(0,E.useRef)(void 0),n=xe();(0,E.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:r,linkActiveClassName:o,minHeadingLevel:a,maxHeadingLevel:i}=e;function s(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(r),s=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const r=[];for(let o=t;o<=n;o+=1)r.push(`h${o}.anchor`);return Array.from(document.querySelectorAll(r.join()))}({minHeadingLevel:a,maxHeadingLevel:i}),c=Se(s,{anchorTopOffset:n.current}),l=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){var r;n?(t.current&&t.current!==e&&(null===(r=t.current)||void 0===r||r.classList.remove(o)),e.classList.add(o),t.current=e):e.classList.remove(o)}(e,e===l)}))}return document.addEventListener("scroll",s),document.addEventListener("resize",s),s(),()=>{document.removeEventListener("scroll",s),document.removeEventListener("resize",s)}}),[e,n])};function Ce(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:r}=e;return t.flatMap((e=>{const t=Ce({toc:e.children,minHeadingLevel:n,maxHeadingLevel:r});return function(e){return e.level>=n&&e.level<=r}(e)?[{...e,children:t}]:t}))}function Oe(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:r}=e;return(0,E.useMemo)((()=>Ce({toc:t,minHeadingLevel:n,maxHeadingLevel:r})),[t,n,r])}function Re(){const e=(0,E.useRef)(!0);return(0,E.useMemo)((()=>({scrollEventsEnabledRef:e,enableScrollEvents:()=>{e.current=!0},disableScrollEvents:()=>{e.current=!1}})),[])}const ke=(0,E.createContext)(void 0);function De(e){let{children:t}=e;return E.createElement(ke.Provider,{value:Re()},t)}function Ae(){const e=(0,E.useContext)(ke);if(null==e)throw new Error('"useScrollController" is used but no context provider was found in the React tree.');return e}const je=()=>D.Z.canUseDOM?{scrollX:window.pageXOffset,scrollY:window.pageYOffset}:null;function Te(e,t){void 0===t&&(t=[]);const{scrollEventsEnabledRef:n}=Ae(),r=(0,E.useRef)(je()),o=O(e);(0,E.useEffect)((()=>{const e=()=>{if(!n.current)return;const e=je();o&&o(e,r.current),r.current=e},t={passive:!0};return e(),window.addEventListener("scroll",e,t),()=>window.removeEventListener("scroll",e,t)}),[o,n,...t])}function Ie(){const e=Ae(),t=function(){const e=(0,E.useRef)({elem:null,top:0}),t=(0,E.useCallback)((t=>{e.current={elem:t,top:t.getBoundingClientRect().top}}),[]),n=(0,E.useCallback)((()=>{const{current:{elem:t,top:n}}=e;if(!t)return{restored:!1};const r=t.getBoundingClientRect().top-n;return r&&window.scrollBy({left:0,top:r}),e.current={elem:null,top:0},{restored:0!==r}}),[]);return(0,E.useMemo)((()=>({save:t,restore:n})),[n,t])}(),n=(0,E.useRef)(void 0),r=(0,E.useCallback)((r=>{t.save(r),e.disableScrollEvents(),n.current=()=>{const{restored:r}=t.restore();if(n.current=void 0,r){const t=()=>{e.enableScrollEvents(),window.removeEventListener("scroll",t)};window.addEventListener("scroll",t)}else e.enableScrollEvents()}}),[e,t]);return(0,E.useLayoutEffect)((()=>{var e;null===(e=n.current)||void 0===e||e.call(n)})),{blockElementScrollPositionUntilNextRender:r}}function Me(e,t){return void 0!==e&&void 0!==t&&new RegExp(e,"gi").test(t)}},6010:(e,t,n)=>{function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}n.d(t,{Z:()=>o});const o=function(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o}},655:(e,t,n)=>{n.r(t),n.d(t,{__assign:()=>a,__asyncDelegator:()=>E,__asyncGenerator:()=>w,__asyncValues:()=>P,__await:()=>b,__awaiter:()=>u,__classPrivateFieldGet:()=>C,__classPrivateFieldIn:()=>R,__classPrivateFieldSet:()=>O,__createBinding:()=>d,__decorate:()=>s,__exportStar:()=>p,__extends:()=>o,__generator:()=>f,__importDefault:()=>L,__importStar:()=>x,__makeTemplateObject:()=>_,__metadata:()=>l,__param:()=>c,__read:()=>v,__rest:()=>i,__spread:()=>m,__spreadArray:()=>y,__spreadArrays:()=>h,__values:()=>g});var r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)};function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var a=function(){return a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a.apply(this,arguments)};function i(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}function s(e,t,n,r){var o,a=arguments.length,i=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(a<3?o(i):a>3?o(t,n,i):o(t,n))||i);return a>3&&i&&Object.defineProperty(t,n,i),i}function c(e,t){return function(n,r){t(n,r,e)}}function l(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function u(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(t){a(t)}}function s(e){try{c(r.throw(e))}catch(t){a(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}c((r=r.apply(e,t||[])).next())}))}function f(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(s){a=[6,s],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}var d=Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]};function p(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||d(t,e,n)}function g(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function v(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(s){o={error:s}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i}function m(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(v(arguments[t]));return e}function h(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var a=arguments[t],i=0,s=a.length;i<s;i++,o++)r[o]=a[i];return r}function y(e,t,n){if(n||2===arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}function b(e){return this instanceof b?(this.v=e,this):new b(e)}function w(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,o=n.apply(e,t||[]),a=[];return r={},i("next"),i("throw"),i("return"),r[Symbol.asyncIterator]=function(){return this},r;function i(e){o[e]&&(r[e]=function(t){return new Promise((function(n,r){a.push([e,t,n,r])>1||s(e,t)}))})}function s(e,t){try{(n=o[e](t)).value instanceof b?Promise.resolve(n.value.v).then(c,l):u(a[0][2],n)}catch(r){u(a[0][3],r)}var n}function c(e){s("next",e)}function l(e){s("throw",e)}function u(e,t){e(t),a.shift(),a.length&&s(a[0][0],a[0][1])}}function E(e){var t,n;return t={},r("next"),r("throw",(function(e){throw e})),r("return"),t[Symbol.iterator]=function(){return this},t;function r(r,o){t[r]=e[r]?function(t){return(n=!n)?{value:b(e[r](t)),done:"return"===r}:o?o(t):t}:o}}function P(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e=g(e),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,o){(function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)})(r,o,(t=e[n](t)).done,t.value)}))}}}function _(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var S=Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t};function x(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&d(t,e,n);return S(t,e),t}function L(e){return e&&e.__esModule?e:{default:e}}function C(e,t,n,r){if("a"===n&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?r:"a"===n?r.call(e):r?r.value:t.get(e)}function O(e,t,n,r,o){if("m"===r)throw new TypeError("Private method is not writable");if("a"===r&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!o:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===r?o.call(e,n):o?o.value=n:t.set(e,n),n}function R(e,t){if(null===t||"object"!=typeof t&&"function"!=typeof t)throw new TypeError("Cannot use 'in' operator on non-object");return"function"==typeof e?t===e:e.has(t)}}}]);