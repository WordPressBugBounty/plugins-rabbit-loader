"use strict";(this.webpackChunkRLAdmin=this.webpackChunkRLAdmin||[]).push([[564],{84564:(e,t,a)=>{a.r(t),a.d(t,{PageRule:()=>Ce});var n=a(2784),i=a(17029),o=a(73454),l=a(1998),c=a(54504);let r=function(e){return e.PriorityChanged="priority-change",e.AddOrUpdatePageRuleAction="add-or-delete-rule",e.RulesChanged="rules-changed",e}({});const s=(0,c.Z)();var m=a(78027),u=a(22409),d=a(82074),p=a(84421),h=a(23468),g=a(3643),R=a(71271);function f(e){let{index:t,value:a,children:n}=e;return React.createElement("div",{role:"tabpanel",hidden:a!==t,id:"simple-tabpanel-".concat(t),"aria-labelledby":"simple-tab-".concat(t)},a===t&&React.createElement(u.Z,{sx:{py:3}},n))}var E=a(20828),y=a(18149),b=a.n(y),v=a(49850);async function z(e,t){const a=new v.Q.SavePageRuleRequest({pageRule:t});return await(0,l.iD)(a,{pathVars:{"{domain_id}":e}},(0,o.YT)(!1),(0,o.ZQ)())}var Z=a(37046),w=a(87729),x=a(54432),S=a(27939),C=a(39956),P=a(68019);function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},k.apply(this,arguments)}const D=function(e){let{value:t,title:a,subtitle:i,tooltip:o,onChange:l,placeholder:c,disabled:r}=e;const[s,m]=(0,n.useState)(""),p=(0,n.useMemo)((()=>t&&t.trim()?t.split(" "):[]),[t]),h=e=>{if(" "===e.key&&s.trim()){e.preventDefault();const t=s.trim(),a=[...p,t];l(a.join(" ")),m("")}};return n.createElement(n.Fragment,null,n.createElement(u.Z,{sx:{display:"flex",columnGap:1,alignItems:"center",mb:2}},n.createElement(u.Z,null,n.createElement(d.Z,{variant:"subtitle1"},a),o&&n.createElement(x.Z,{title:o},n.createElement(P.Z,{sx:{height:20,width:20}})),n.createElement(d.Z,{variant:"caption"},i))),n.createElement(S.Z,{multiple:!0,freeSolo:!0,disabled:r,options:[],value:p,onChange:(e,t)=>{l(t.join(" "))},inputValue:s,onInputChange:(e,t)=>m(t),renderInput:e=>n.createElement(C.Z,k({},e,{variant:"outlined",placeholder:c,onKeyDown:h}))}))};var I=a(26715),F=a(89025);function j(){return j=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},j.apply(this,arguments)}const Q=function(e){let{sx:t,title:a,tooltip:n,subtitle:i,onUpdate:o,SwitchProps:l}=e;return React.createElement(u.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",...t}},React.createElement(u.Z,null,React.createElement(u.Z,{sx:{display:"flex",columnGap:1}},React.createElement(d.Z,{variant:"subtitle1"},a),n&&React.createElement(x.Z,{title:n},React.createElement(F.Z,{sx:{height:20,width:20}}))),React.createElement(d.Z,{variant:"caption"},i)),React.createElement(I.Z,j({},l,{onChange:(e,t)=>{o(t)}})))},T=function(e){let{pageRule:t,setPageRule:a}=e;return React.createElement(Z.Z,null,React.createElement(Q,{title:"Optimize CSS",subtitle:"Serve the critical CSS file first to render above-the-fold content, then load non-critical CSS afterward.",onUpdate:e=>{const n=t.clone();n.optimizations.css||(n.optimizations.css=new v.Q.CSS),n.optimizations.css.defer=e,a(n)},SwitchProps:{checked:!!t.optimizations.css&&t.optimizations.css.defer}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(Q,{title:"Optimize Web fonts",subtitle:"Web fonts will be lazy loaded to improve FCP timings",onUpdate:e=>{const n=t.clone();n.optimizations.webFont||(n.optimizations.webFont=new v.Q.WebFont),n.optimizations.webFont.defer=e,a(n)},SwitchProps:{checked:!!t.optimizations.webFont&&t.optimizations.webFont.defer,disabled:!t.optimizations.css||!t.optimizations.css.defer}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(Q,{title:"Minify CSS",subtitle:"Inline style tags and external CSS files will be compressed to reduce the size upto 20%",onUpdate:e=>{const n=t.clone();n.optimizations.css||(n.optimizations.css=new v.Q.CSS),n.optimizations.css.minify=e,a(n)},SwitchProps:{checked:!!t.optimizations.css&&t.optimizations.css.minify,disabled:!t.optimizations.css||!t.optimizations.css.defer}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(D,{title:"Skip lazy load for these CSS",placeholder:"CSS file names or inline ID seperated by space",subtitle:"CSS file path or inline CSS ID matching any of the strings specified here will not be deferred. Multiple matching strings can be specified separated by a space.",value:t.optimizations.css?t.optimizations.css.skipDeferTokens:void 0,disabled:!t.optimizations.css||!t.optimizations.css.defer,onChange:e=>{const n=t.clone();n.optimizations.css||(n.optimizations.css=new v.Q.CSS),n.optimizations.css.skipDeferTokens=e,a(n)}}))},U=function(e){let{pageRule:t,setPageRule:a}=e;return React.createElement(Z.Z,null,React.createElement(Q,{title:"Optimize JavaScript",subtitle:"Defer execution of JavaScript to improve FID, TBT and TTI metrics.",onUpdate:e=>{const n=t.clone();n.optimizations.js||(n.optimizations.js=new v.Q.JS),n.optimizations.js.defer=e,a(n)},SwitchProps:{checked:!!t.optimizations.js&&t.optimizations.js.defer}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(Q,{title:"Prefer speed score over loading ads and analytics",subtitle:"Delay execution of ads and analytics related JavaScript until page has loaded. Choosing this can impact the ads impression and revenue.",onUpdate:e=>{const n=t.clone();n.optimizations.ads||(n.optimizations.ads=new v.Q.Ads),n.optimizations.ads.defer=e,a(n)},SwitchProps:{checked:!!t.optimizations.ads&&t.optimizations.ads.defer,disabled:!t.optimizations.js||!t.optimizations.js.defer}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(Q,{title:"Prefer speed score over loading slider",subtitle:"Delay execution of slider related JavaScript until page has loaded. Choosing this can make sliders appear a bit late but loads the rest of the page faster with a good PageSpeed score.",onUpdate:e=>{const n=t.clone();n.optimizations.js||(n.optimizations.js=new v.Q.JS),n.optimizations.js.sliderFirst=!e,a(n)},SwitchProps:{checked:!t.optimizations.js||!t.optimizations.js.sliderFirst,disabled:!t.optimizations.js||!t.optimizations.js.defer}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(Q,{title:"Compress inline JS and JS files",subtitle:"Compress the inline JS code and files to reduce the transfer size upto 20%",onUpdate:e=>{const n=t.clone();n.optimizations.js||(n.optimizations.js=new v.Q.JS),n.optimizations.js.minify=e,a(n)},SwitchProps:{checked:!!t.optimizations.js&&t.optimizations.js.minify,disabled:!t.optimizations.js||!t.optimizations.js.defer}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(D,{title:"Skip optimization for these JS",subtitle:"JS file path or inline JS ID matching any of the strings specified here will not be optimized. Multiple matching strings can be specified separated by a space. Please note that if you exclude a file that has dependency on other files, the website can break.",placeholder:"JS file names or IDs separated by space",value:t.optimizations.js?t.optimizations.js.skipDeferTokens:"",disabled:!t.optimizations.js||!t.optimizations.js.defer,onChange:e=>{const n=t.clone();n.optimizations.js||(n.optimizations.js=new v.Q.JS),n.optimizations.js.skipDeferTokens=e,a(n)}}))},A=function(e){let{pageRule:t,setPageRule:a}=e;return React.createElement(Z.Z,null,React.createElement(Q,{title:"Optimize image loading",subtitle:"Load above the fold images first, followed by lazy loading of remaining images just before they enter the viewport.",onUpdate:e=>{const n=t.clone();n.optimizations.image||(n.optimizations.image=new v.Q.Image),n.optimizations.image.lazy=e,a(n)},SwitchProps:{checked:!!t.optimizations.image&&t.optimizations.image.lazy}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(Q,{title:"Convert images to next-gen formats",subtitle:"PNG/JPEG images will be converted to WebP/AVIF format improving the load time by 30%. Original format will be served if user's browser does not support WebP",onUpdate:e=>{const n=t.clone();n.optimizations.image||(n.optimizations.image=new v.Q.Image),n.optimizations.image.webPA=e,a(n)},SwitchProps:{checked:!!t.optimizations.image&&t.optimizations.image.webPA,disabled:!t.optimizations.image||!t.optimizations.image.lazy}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(Q,{title:"Lazy load background images",subtitle:"Background images will be lazy loaded",onUpdate:e=>{const n=t.clone();n.optimizations.image||(n.optimizations.image=new v.Q.Image),n.optimizations.image.lazyBack=e,a(n)},SwitchProps:{checked:!!t.optimizations.image&&t.optimizations.image.lazyBack,disabled:!t.optimizations.image||!t.optimizations.image.lazy}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(Q,{title:"Add missing width/height attributes",subtitle:"Add missing dimensions attributes to images that helps browser to reserve the space of image when they are lazy loaded. This will prevent layout shift.",onUpdate:e=>{const n=t.clone();n.optimizations.image||(n.optimizations.image=new v.Q.Image),n.optimizations.image.lqip=e,a(n)},SwitchProps:{checked:!!t.optimizations.image&&t.optimizations.image.lqip,disabled:!t.optimizations.image||!t.optimizations.image.lazy}}))};var L=a(43141),M=a(68491);const N=function(e){let{pageRule:t,setPageRule:a}=e;return React.createElement(React.Fragment,null,React.createElement(Z.Z,null,React.createElement(Q,{title:"Lazy load Iframes",subtitle:"Lazy load media embedded such as YouTube, Maps or other Iframes and use a facet if available.",onUpdate:e=>{const n=t.clone();n.optimizations.iFrame||(n.optimizations.iFrame=new v.Q.IFrame),n.optimizations.iFrame.lazy=e,a(n)},SwitchProps:{checked:!!t.optimizations.iFrame&&t.optimizations.iFrame.lazy}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(Q,{title:"Lazy load Vimeo videos",subtitle:"It will work only if the domain-level privacy is off for the video.",onUpdate:e=>{const n=t.clone();n.optimizations.iFrame||(n.optimizations.iFrame=new v.Q.IFrame),n.optimizations.iFrame.vimeo=e,a(n)},SwitchProps:{checked:!!t.optimizations.iFrame&&t.optimizations.iFrame.vimeo,disabled:!t.optimizations.iFrame||!t.optimizations.iFrame.lazy}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(Q,{title:"Compress final HTML",subtitle:"Compress final HTML by removing unnecessary characters and white spaces for faster content transfer.",onUpdate:e=>{const n=t.clone();n.optimizations.html||(n.optimizations.html=new v.Q.HTML),n.optimizations.html.minify=e,a(n)},SwitchProps:{checked:!!t.optimizations.html&&t.optimizations.html.minify}}),React.createElement(w.Z,{sx:{my:1}}),React.createElement(d.Z,{sx:{whiteSpace:"nowrap"},variant:"subtitle1"},"Cache TTL"),React.createElement(d.Z,{variant:"caption",sx:{mb:2}},"The maximum duration for which cache can be valid."),React.createElement(L.Z,{value:t.optimizations.html?t.optimizations.html.maxAgeSeconds:0,fullWidth:!0,displayEmpty:!0,onChange:e=>{const n=t.clone();n.optimizations.html||(n.optimizations.html=new v.Q.HTML),n.optimizations.html.maxAgeSeconds=e.target.value,a(n)}},React.createElement(M.Z,{value:0,sx:{color:"GrayText"}},"Based on headers from origin."),React.createElement(M.Z,{value:600,sx:{color:"GrayText"}},"10 minutes"),React.createElement(M.Z,{value:3600,sx:{color:"GrayText"}},"1 hour"),React.createElement(M.Z,{value:216e3,sx:{color:"GrayText"}},"6 hours"),React.createElement(M.Z,{value:86400,sx:{color:"GrayText"}},"1 day"),React.createElement(M.Z,{value:172800,sx:{color:"GrayText"}},"2 days"),React.createElement(M.Z,{value:604800,sx:{color:"GrayText"}},"7 days"),React.createElement(M.Z,{value:2592e3,sx:{color:"GrayText"}},"1 month"))))};var O=a(56770);function G(e){let{pageRule:t,miniMode:a,domainID:i,isLoading:o,openAddRule:l,overrideRules:c,isPageRulesListModified:y}=e;const[v,Z]=(0,n.useState)(0),[w,x]=(0,n.useState)(t),[S,C]=(0,n.useState)(!1),P=(0,n.useMemo)((()=>a?React.createElement(m.Z,{href:"https://rabbitloader.com/account/#rules",target:"_blank",sx:{ml:1}},"Manage advance rules"):c.length<=0?React.createElement(u.Z,{onClick:l,sx:{ml:1,color:"#6B71FB",textDecoration:"underline","&:hover":{cursor:"pointer"}}},"Manage advance rules"):void 0),[a,c]),k=(0,n.useMemo)((()=>!y&&!b()(w,t)),[y,w,t]),D=async function(){C(!0),200===await z(i,w)&&((0,O.yv)("Successfully updated optimization rule.",{variant:"success"}),(0,O.yv)("Make sure to purge the cache for changes to be immediately effective",{variant:"info",autoHideDuration:null}),s.emit(r.RulesChanged)),C(!1)},I=(0,n.useMemo)((()=>k?React.createElement(u.Z,{sx:{display:"flex",flexDirection:"row",justifyItems:"center",columnGap:1,alignItems:"center"}},React.createElement(E.Z,{loading:S,onClick:D,variant:"contained",color:"primary",sx:{mb:2}},"Save"),React.createElement(d.Z,{variant:"body2",sx:{color:"text.secondary",mb:2}},"You need to purge the cache after saving the rule for immediate effect.")):null),[k,S,D]);return(0,n.useEffect)((()=>{t&&x(t)}),[t]),React.createElement(p.Z,{sx:{p:3,minHeight:430,mb:a||c.length<=0?3:0}},o||void 0===w?React.createElement(u.Z,{sx:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:294}},React.createElement(h.Z,{sx:{width:"100%"}})):React.createElement(React.Fragment,null,React.createElement(u.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"}},React.createElement(u.Z,null,React.createElement(d.Z,{variant:"h5"},"Global Optimization"),React.createElement(d.Z,{variant:"body2",sx:{mb:2}},"Optimization rules are applied globally to all pages of the website, except for the Admin panel of WordPress."))),React.createElement(g.Z,{value:v,onChange:(e,t)=>{Z(t)},variant:"fullWidth"},React.createElement(R.Z,{label:"CSS",value:0}),React.createElement(R.Z,{label:"JS",value:1}),React.createElement(R.Z,{label:"Image",value:2}),React.createElement(R.Z,{label:"Others",value:3})),React.createElement(f,{index:0,value:v},React.createElement(T,{pageRule:w,setPageRule:x})),React.createElement(f,{index:1,value:v},React.createElement(U,{pageRule:w,setPageRule:x})),React.createElement(f,{index:2,value:v},React.createElement(A,{pageRule:w,setPageRule:x})),React.createElement(f,{index:3,value:v},React.createElement(N,{pageRule:w,setPageRule:x})),I),(a||c.length<=0)&&React.createElement(u.Z,{sx:{px:3,py:1.5,bgcolor:"#FDF8FF",borderRadius:2,display:"flex",alignItems:"center"}},React.createElement(F.Z,{sx:{mr:1}}),"Using advance rules, you can apply different optimization rules based on URL patterns.",P))}var J=a(50118),q=a(71343),W=a(29534),B=a(77160),H=a(89991),_=a(40874),V=a(36269);const Y=["Path Pattern","CSS","JS","Image","HTML, iFrame & Cache"],K={[v.Q.ContentNature.UNDEFINED_CONTENT_NATURE]:"",[v.Q.ContentNature.Static]:"The content served is same for everyone. It is not based on cookies or session. In this case, RabbitLoader allows you to optimize and cache the content at CDN to boost the speed. Blog articles or the home page are the perfect examples. This can give you best speed.",[v.Q.ContentNature.SemiDynamic]:"",[v.Q.ContentNature.FullDynamic]:"RabbitLoader will not do any optimizations or cache the content. Admin panels are best example for this category."};function $(e){const[t,a]=(0,n.useState)(e.pageRule),[i,o]=(0,n.useState)(0),[l,c]=(0,n.useState)(!1),[m,h]=(0,n.useState)(!1);return(0,n.useEffect)((()=>a(e.pageRule)),[e]),React.createElement(J.Z,{open:e.open,sx:{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"},onClose:e.onClose},React.createElement(p.Z,{sx:{p:3,width:800}},React.createElement(u.Z,{sx:{display:"flex",justifyContent:"space-between"}},React.createElement(d.Z,{variant:"h5"},e.title),React.createElement(q.Z,{onClick:e.onClose},React.createElement(V.Z,null))),React.createElement(W.Z,{activeStep:i,alternativeLabel:!0,sx:{mt:4,width:"100%"}},Y.map((e=>React.createElement(B.Z,{key:e,disabled:t.contentNature===v.Q.ContentNature.FullDynamic},React.createElement(H.Z,null,e))))),React.createElement(u.Z,{sx:{mt:3,px:3}},0===i&&React.createElement(React.Fragment,null,React.createElement(u.Z,{sx:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",columnGap:5}},React.createElement(d.Z,{sx:{whiteSpace:"nowrap",flexShrink:0}},"URL Pattern:"," "),React.createElement(C.Z,{fullWidth:!0,value:t.pathPattern,error:m,helperText:m?"URL Pattern is required.":"",placeholder:"/blog, /account/*, etc...",sx:{width:"80%"},onChange:e=>{""===e.target.value?h(!0):m&&h(!1);const n=t.clone();n.pathPattern=e.target.value,a(n)}})),React.createElement(u.Z,null,React.createElement(u.Z,null,React.createElement(u.Z,{sx:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",columnGap:5,mt:2}},React.createElement(d.Z,{sx:{whiteSpace:"nowrap",flexShrink:0}},"Cache:"," "),React.createElement(L.Z,{value:t.contentNature,fullWidth:!0,sx:{width:"80%"},onChange:e=>{const n=t.clone();n.contentNature=e.target.value,a(n)}},React.createElement(M.Z,{value:v.Q.ContentNature.Static,sx:{color:"GrayText"}},"Enabled"),React.createElement(M.Z,{value:v.Q.ContentNature.FullDynamic,sx:{color:"GrayText"}},"Disabled")))),React.createElement(u.Z,{sx:{mt:3}},React.createElement(d.Z,{variant:"caption",sx:{pt:2,color:"GrayText"}},K[t.contentNature])))),1===i&&React.createElement(React.Fragment,null,React.createElement(T,{pageRule:t,setPageRule:a})),2===i&&React.createElement(React.Fragment,null,React.createElement(U,{pageRule:t,setPageRule:a})),3===i&&React.createElement(React.Fragment,null,React.createElement(A,{pageRule:t,setPageRule:a})),4===i&&React.createElement(React.Fragment,null,React.createElement(N,{pageRule:t,setPageRule:a}))),React.createElement(u.Z,{sx:{display:"flex",justifyContent:"end",columnGap:2,mt:2}},React.createElement(_.Z,{onClick:()=>o(i-1),disabled:0===i},"Back"),React.createElement(E.Z,{loading:l,variant:"contained",color:"primary",onClick:async()=>{i===Y.length-1||t.contentNature===v.Q.ContentNature.FullDynamic?await async function(){if(!t.pathPattern||""===t.pathPattern)return o(0),void h(!0);c(!0),await e.onSubmit(t)&&(c(!1),s.emit(r.RulesChanged),e.onClose())}():o(i+1)}},i===Y.length-1||t.contentNature===v.Q.ContentNature.FullDynamic?"Save":"Next"))))}var X=a(40920),ee=a(87552),te=a(65738),ae=a(40716),ne=a(64765),ie=a(10475),oe=a(3532),le=a(50528),ce=a(93553),re=a(934),se=a(16025),me=a(1533),ue=a(33931),de=a(25838),pe=a(89621),he=function(e){return e[e.Up=0]="Up",e[e.Down=1]="Down",e}(he||{});function ge(e){var t;let{domainID:a,pageRules:i,isLoading:c,defaultPageRule:m}=e;const g=(0,X.Z)(),[R,f]=(0,n.useState)(5),[E,y]=(0,n.useState)(0),[b,z]=(0,n.useState)(void 0);async function Z(e,t){if(!i)return;z(e);let n=[...i];if(t===he.Up){if(e<=0||e>=i.length)return void z(void 0);[n[e],n[e-1]]=[n[e-1],n[e]]}else if(t===he.Down){if(e<0||e>=i.length-1)return void z(void 0);[n[e],n[e+1]]=[n[e+1],n[e]]}const c=[];n.forEach((e=>{c.push(e.pageRuleID)})),m&&c.push(m.pageRuleID);const u=await async function(e,t){const a=new v.Q.UpdatePageRulesPriorityRequest({pageRuleIDs:t});return await(0,l.UW)(a,{pathVars:{"{domain_id}":e}},(0,o.YT)(!1),(0,o.ZQ)())}(a,c);200===u&&s.emit(r.PriorityChanged,[...n]),z(void 0)}return React.createElement(u.Z,{sx:{mt:5,mb:3}},React.createElement(p.Z,{sx:{py:3}},React.createElement(u.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"}},React.createElement(u.Z,{sx:{ml:4,maxWidth:"70%"}},React.createElement(d.Z,{variant:"h5"},"Override Global Settings"),React.createElement(d.Z,{variant:"body2",sx:{mb:2}},"You can create rules to best optimize the various pages served from your domain. RabbitLoader compares every page and assets served with the path patterns in your rules to optimize the performance. Arrange rules in the order in which you want RabbitLoader to evaluate them.")),React.createElement(u.Z,{sx:{mr:4,mb:4,display:"flex",columnGap:3}},React.createElement(_.Z,{variant:"contained",onClick:()=>s.emit(r.AddOrUpdatePageRuleAction),color:"primary"},React.createElement(ce.Z,null)," Add Rule"),React.createElement(_.Z,{variant:"outlined",href:"https://rabbitloader.com/kb/setting-page-rules/",target:"__blank"},React.createElement(re.Z,{sx:{mr:1}})," Rule Help"))),React.createElement(ee.Z,null,React.createElement(te.Z,null,React.createElement(ae.Z,null,React.createElement(ne.Z,{sx:{pl:3}},React.createElement(ie.Z,{colSpan:8},"Sequence"," ",React.createElement(x.Z,{title:"Rules are compared in ascending order of their matching sequence until a match is found. So a rule with sequence 0 will be compared first when a URL is optimized. If the rule matches, no further rules with higher sequence number will be evaluated for the URL. Following the same convention, the * rule should come at the last and it should have the highest sequence."},React.createElement(F.Z,null))),React.createElement(ie.Z,{colSpan:8},"URL Pattern"),React.createElement(ie.Z,{colSpan:8},"Content Type"),React.createElement(ie.Z,null,"Actions"))),React.createElement(oe.Z,null,c&&void 0===i?React.createElement(ne.Z,null,React.createElement(ie.Z,{colSpan:25,align:"center",sx:{height:200}},React.createElement(h.Z,null))):React.createElement(React.Fragment,null,0===(null==i?void 0:i.length)&&React.createElement(ne.Z,null,React.createElement(ie.Z,{colSpan:25,height:300,align:"center"},React.createElement("img",{src:pe,alt:"No Data Found",style:{width:160}}),React.createElement(d.Z,{variant:"body1"},"No page rule has been set yet."))),null==i?void 0:i.slice(E*R,E*R+R).map(((e,t)=>{return React.createElement(ne.Z,{sx:{pl:3,opacity:b===t?"60%":"100%"}},React.createElement(ie.Z,{colSpan:8},t+1),React.createElement(ie.Z,{colSpan:8},e.pathPattern),React.createElement(ie.Z,{colSpan:8},(n=e.contentNature)===v.Q.ContentNature.Static?"Static":n===v.Q.ContentNature.FullDynamic?"Full Dynamic":"Unknown"),React.createElement(ie.Z,null,React.createElement(x.Z,{title:"Modify optimization settings"},React.createElement(q.Z,{onClick:()=>s.emit(r.AddOrUpdatePageRuleAction,e)},React.createElement(se.Z,{sx:{color:g.palette.primary.main}}))),React.createElement(x.Z,{title:"Delete rule"},React.createElement(q.Z,{"aria-label":"delete",onClick:async()=>{z(t);const n=await async function(e){let{pageRuleID:t,domainID:a}=e;const n=new v.Q.DeletePageRuleRequest({pageRuleID:t});return await(0,l.r)(n,{pathVars:{"{domain_id}":a}},(0,o.YT)(!1),(0,o.ZQ)())}({domainID:a,pageRuleID:e.pageRuleID});200===n?((0,O.yv)({variant:"success",message:"Successfully deleted page rule"}),s.emit(r.RulesChanged)):(0,O.yv)({variant:"warning",message:"Failed to delete page rule"}),z(void 0)}},React.createElement(me.Z,{style:{color:g.palette.error.main}}))),React.createElement(x.Z,{title:"Move up for earlier evaluation"},React.createElement(q.Z,{onClick:()=>Z(t,he.Up)},React.createElement(ue.Z,null))),React.createElement(x.Z,{title:"Move down for later evaluation"},React.createElement(q.Z,{onClick:()=>Z(t,he.Down)},React.createElement(de.Z,null)))));var n})))))),React.createElement(le.Z,{page:E,rowsPerPage:R,component:"div",count:null!==(t=null==i?void 0:i.length)&&void 0!==t?t:0,rowsPerPageOptions:[5,10,25],onRowsPerPageChange:e=>f(e.target.value),onPageChange:(e,t)=>y(t)})))}const Re=function(e){let{domainID:t,miniMode:a}=e;const[i,c]=(0,n.useState)(),[m,u]=(0,n.useState)(),[d,p]=(0,n.useState)("Add Rule"),[h,g]=(0,n.useState)(!1),[R,f]=(0,n.useState)(!1),[E,y]=(0,n.useState)(!1),[b,Z]=(0,n.useState)(new v.Q.PageRule({optimizations:new v.Q.Optimizations,contentNature:v.Q.ContentNature.Static}));return(0,n.useEffect)((()=>{async function e(e){e?f(!0):g(!0);const[a,n]=await async function(e){const[t,a]=await(0,l.YE)({pathVars:{"{domain_id}":e}},(0,o.YT)(!1),(0,o.ZQ)());return[t,a]}(t);if(200!==n&&204!==n)return;const i=a.pageRules.find((e=>"*"===e.pathPattern)),r=a.pageRules.filter((e=>"*"!==e.pathPattern)).sort(((e,t)=>e.priority-t.priority));c(i),u(r),e?f(!1):g(!1)}return e(),s.on(r.PriorityChanged,(e=>{const t=[];e.map((e=>{t.push(v.Q.PageRule.fromObject(e))})),u(t)})),s.on(r.RulesChanged,(()=>{e(!0)})),()=>{s.off(r.PriorityChanged),s.off(r.RulesChanged)}}),[t]),(0,n.useEffect)((()=>(s.on(r.AddOrUpdatePageRuleAction,(e=>{e&&(p("Edit Rule"),Z(v.Q.PageRule.fromObject(e))),y(!0)})),()=>{s.off(r.AddOrUpdatePageRuleAction)})),[]),React.createElement(React.Fragment,null,i&&React.createElement(G,{pageRule:i,isLoading:h,domainID:t,isPageRulesListModified:R,miniMode:a,overrideRules:null!=m?m:[],openAddRule:()=>s.emit(r.AddOrUpdatePageRuleAction)}),E&&React.createElement($,{open:E,onClose:()=>{y(!1),Z(new v.Q.PageRule({optimizations:new v.Q.Optimizations,contentNature:v.Q.ContentNature.Static})),p("Add Rule")},title:d,pageRule:b,onSubmit:async function(e){const a=await z(t,e);return 200===a?(0,O.yv)({variant:"success",message:"Successfully added new page rule!"}):(0,O.yv)({variant:"error",message:"Failed added new page rule!"}),200===a}}),!a&&!(m&&m.length<=0)&&React.createElement(ge,{domainID:t,pageRules:m,defaultPageRule:i,isLoading:h}))};var fe=a(98889),Ee=a(8120),ye=a(27379),be=a(87037),ve=a(86769),ze=a(65992),Ze=a(47591);const we=(0,ze.ZP)(O.pk)((e=>{let{theme:t}=e;const a="light"===t.palette.mode;return{"& #notistack-snackbar":{...t.typography.subtitle2,padding:0,flexGrow:1},"&.notistack-MuiContent":{color:t.palette.text.primary,boxShadow:t.customShadows.z8,borderRadius:t.shape.borderRadius,padding:t.spacing(.5,2,.5,.5),backgroundColor:t.palette.background.paper},"&.notistack-MuiContent-default":{padding:t.spacing(1,2,1,1),color:a?t.palette.common.white:t.palette.grey[800],backgroundColor:a?t.palette.grey[800]:t.palette.common.white}}})),xe=(0,ze.ZP)("span")((e=>{let{color:t,theme:a}=e;return{width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",marginRight:a.spacing(1.5),color:a.palette[t].main,borderRadius:a.shape.borderRadius,backgroundColor:(0,Ze.Fq)(a.palette[t].main,.16)}}));function Se(e){let{children:t}=e;const a="rtl"===(0,Ee.K$)().themeDirection,i=(0,n.useRef)(null);return n.createElement(O.wT,{ref:i,maxSnack:5,preventDuplicate:!0,SnackbarProps:{style:{zIndex:999999999999}},autoHideDuration:3e3,TransitionComponent:a?ye.Z:void 0,variant:"success",anchorOrigin:{vertical:"top",horizontal:"right"},iconVariant:{info:n.createElement(xe,{color:"info"},n.createElement(ve.Z,{icon:"eva:info-fill",width:24})),success:n.createElement(xe,{color:"success"},n.createElement(ve.Z,{icon:"eva:checkmark-circle-2-fill",width:24})),warning:n.createElement(xe,{color:"warning"},n.createElement(ve.Z,{icon:"eva:alert-triangle-fill",width:24})),error:n.createElement(xe,{color:"error"},n.createElement(ve.Z,{icon:"solar:danger-bold",width:24}))},Components:{default:we,info:we,success:we,warning:we,error:we},action:e=>n.createElement(be.Z,{size:"small",onClick:()=>(0,O.sy)(e),sx:{p:.5}},n.createElement(ve.Z,{width:16,icon:"mingcute:close-line"})),style:{zIndex:1e21}},t)}function Ce(e){let{id:t,domainID:a,miniMode:o}=e;return"local-testing-root"===t&&(0,i.createRoot)(document.getElementById("local-testing-root")).render(React.createElement(n.StrictMode,null,React.createElement(Ee.mu,{defaultSettings:{themeMode:"light",themeDirection:"ltr",themeContrast:"default",themeLayout:"vertical",themeColorPresets:"blue",themeStretch:!1}},React.createElement("div",{style:{all:"unset",boxSizing:"border-box",borderStyle:"unset",border:"unset"}},React.createElement(fe.Z,null,React.createElement(Se,null,React.createElement(Re,{domainID:a,miniMode:o}))))))),React.createElement(Ee.mu,{defaultSettings:{themeMode:"light",themeDirection:"ltr",themeContrast:"default",themeLayout:"vertical",themeColorPresets:"blue",themeStretch:!1}},React.createElement(fe.Z,null,React.createElement(Se,null,React.createElement(Re,{domainID:a,miniMode:o}))))}a(2845).$g.configure((e=>"rl-mfe-pr ".concat(e)))}}]);