"use strict";(this.webpackChunkRLAdmin=this.webpackChunkRLAdmin||[]).push([[210],{71892:(e,t,r)=>{r.d(t,{a:()=>l});var n=r(2784),a=r(41740),o=r(30750);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i.apply(this,arguments)}function l(e){let{sx:t,...r}=e;return n.createElement(a.Z,i({sx:{px:5,width:1,flexGrow:1,minHeight:1,display:"flex",alignItems:"center",justifyContent:"center",...t}},r),n.createElement(o.Z,{color:"inherit",sx:{width:1,maxWidth:360}}))}},59739:(e,t,r)=>{r.r(t),r.d(t,{DoWarmup:()=>f});var n=r(13035);function a(e,t,r){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,r)}function o(e,t){var r=function(e,t,r){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}(e,t);return function(e,t){return t.get?t.get.call(e):t.value}(e,r)}let i;!function(e){var t=new WeakMap;class r extends n.Message{constructor(e){super(),a(this,t,{writable:!0,value:[]}),n.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],o(this,t)),Array.isArray(e)||"object"!=typeof e||"targetUrl"in e&&null!=e.targetUrl&&(this.targetUrl=e.targetUrl)}get targetUrl(){return n.Message.getFieldWithDefault(this,1,"")}set targetUrl(e){n.Message.setField(this,1,e)}static fromObject(e){const t=new r({});return null!=e.targetUrl&&(t.targetUrl=e.targetUrl),t}toObject(){const e={};return null!=this.targetUrl&&(e.targetUrl=this.targetUrl),e}serialize(e){const t=e||new n.BinaryWriter;if(this.targetUrl.length&&t.writeString(1,this.targetUrl),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof n.BinaryReader?e:new n.BinaryReader(e),a=new r;for(;t.nextField()&&!t.isEndGroup();)1===t.getFieldNumber()?a.targetUrl=t.readString():t.skipField();return a}serializeBinary(){return this.serialize()}static deserializeBinary(e){return r.deserialize(e)}}e.WarmupRequest=r;var i=new WeakMap;class l extends n.Message{constructor(e){super(),a(this,i,{writable:!0,value:[]}),n.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],o(this,i)),Array.isArray(e)}static fromObject(e){return new l({})}toObject(){return{}}serialize(e){const t=e||new n.BinaryWriter;if(!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof n.BinaryReader?e:new n.BinaryReader(e),r=new l;for(;t.nextField()&&!t.isEndGroup();)t.getFieldNumber(),t.skipField();return r}serializeBinary(){return this.serialize()}static deserializeBinary(e){return l.deserialize(e)}}e.WarmupResponse=l;var s=new WeakMap;class c extends n.Message{constructor(e){super(),a(this,s,{writable:!0,value:[]}),n.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],o(this,s)),Array.isArray(e)||"object"!=typeof e||"targetUrl"in e&&null!=e.targetUrl&&(this.targetUrl=e.targetUrl)}get targetUrl(){return n.Message.getFieldWithDefault(this,1,"")}set targetUrl(e){n.Message.setField(this,1,e)}static fromObject(e){const t=new c({});return null!=e.targetUrl&&(t.targetUrl=e.targetUrl),t}toObject(){const e={};return null!=this.targetUrl&&(e.targetUrl=this.targetUrl),e}serialize(e){const t=e||new n.BinaryWriter;if(this.targetUrl.length&&t.writeString(1,this.targetUrl),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof n.BinaryReader?e:new n.BinaryReader(e),r=new c;for(;t.nextField()&&!t.isEndGroup();)1===t.getFieldNumber()?r.targetUrl=t.readString():t.skipField();return r}serializeBinary(){return this.serialize()}static deserializeBinary(e){return c.deserialize(e)}}e.PurgeAllRequest=c;var u=new WeakMap;class d extends n.Message{constructor(e){super(),a(this,u,{writable:!0,value:[]}),n.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],o(this,u)),Array.isArray(e)}static fromObject(e){return new d({})}toObject(){return{}}serialize(e){const t=e||new n.BinaryWriter;if(!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof n.BinaryReader?e:new n.BinaryReader(e),r=new d;for(;t.nextField()&&!t.isEndGroup();)t.getFieldNumber(),t.skipField();return r}serializeBinary(){return this.serialize()}static deserializeBinary(e){return d.deserialize(e)}}e.PurgeAllResponse=d}(i||(i={}));const l=3e5,s=3,c=[500,502,503],u=!1;class d extends Error{constructor(e){super(e),this.name="MissingPathVarError"}}const m=new d("path variable is missing");const p=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2?arguments[2]:void 0,n=arguments.length>3?arguments[3]:void 0;const{timeout:a=l,retryCount:o=s,retryableCodes:d=c,contentTypeJson:p=u}=t;let{newPath:h,missingVar:g}=function(e,t){let r=!1,n=e;for(const[e,r]of Object.entries(t))n=n.replace(e,r);return r=n.includes("{"),{newPath:n,missingVar:r}}(n+"/rlwarmupproxy/warmup",t.pathVars||{});if(g)return Promise.reject(m);const f=e.serializeBinary(),y={method:"GET",headers:{Authorization:"Bearer ".concat(r),"Content-Type":p?"application/json":"application/x-protobuf",Accept:p?"application/json":"application/x-protobuf"},...t.cache?{cache:t.cache}:{}};return h=h+"?"+new URLSearchParams({get_params:btoa(String.fromCharCode.apply(null,Array.from(f)))}),async function e(t){try{const r=await fetch(h,y);if(!r.ok&&d.includes(r.status)&&0!==t)return e(t-1);if(p)try{return[await r.json(),r.status]}catch(e){return console.log("error in reading response body: ",e),[new i.WarmupResponse,r.status]}try{const e=await r.arrayBuffer(),t=new Uint8Array(e);return[i.WarmupResponse.deserialize(t),r.status]}catch(e){return console.error("error in reading response body",e),[new i.WarmupResponse,r.status]}}catch(e){return console.log("error getting data: ",e),[new i.WarmupResponse,0]}}(o)};var h=r(73454);const g=e=>(console.debug("repairURL before:",e),e.startsWith("http")||(e="https://"+e),console.debug("repairURL after:",e),e);async function f(e){const t=g(e);if(new URL(t).host!==window.location.host){const e=new i.WarmupRequest;e.targetUrl=t;const[r,n]=await p(e,{},"",(0,h.dW)());return n}const r=new URL(t);return r.searchParams.append("rl-warmup","1"),r.searchParams.append("rl-rand",String(Math.floor((new Date).getTime()/1e3))),r.searchParams.append("rl-only-after",String(Math.floor((new Date).getTime()/1e3))),(await fetch(r,{credentials:"omit"})).status}},53210:(e,t,r)=>{r.r(t),r.d(t,{UrlList:()=>Ke});var n=r(2784),a=r(17029),o=r(98889),i=r(96027),l=r(6281),s=r(74073),c=r(27104),u=r(48887),d=r(69606),m=r(70969),p=r(79312),h=r(41740),g=r(32681),f=r(71892),y=r(29360),b=r(2940),v=r(9646);function w(){return w=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},w.apply(this,arguments)}function E(e){let{dense:t,onChangeDense:r,rowsPerPageOptions:a=[5,10,25],sx:o,...i}=e;return n.createElement(h.Z,{sx:{...o}},r&&n.createElement(b.Z,{label:"Dense",control:n.createElement(y.Z,{checked:t,onChange:r}),sx:{pl:2,py:1.5}}),n.createElement(v.Z,w({rowsPerPageOptions:a,component:"div"},i,{sx:{borderTopColor:"transparent"}})))}var x=r(89621),k=r(6582),Z=r(11188),C=r(86769);const S=function(e){let{onChange:t,value:r}=e;return n.createElement(h.Z,{sx:{p:3,display:"flex",alignItems:"center",justifyContent:"space-between"}},n.createElement(h.Z,{sx:{display:"flex",alignItems:"center",width:"100%"}},n.createElement("style",null,"\n              .wp-admin div.rl-can-url-search div input  {\n                padding: 16.5px 14px !important;\n                padding-left: 0 !important;\n                border: 0 !important;\n              }\n              .wp-admin div.rl-can-url-search div input:focus  {\n                box-shadow:none !important;\n              }\n          "),n.createElement(k.Z,{sx:{height:1,width:"100%"},className:"rl-can-url-search",placeholder:"Search...",onChange:e=>t(e),value:r,InputProps:{startAdornment:n.createElement(Z.Z,{position:"start"},n.createElement(C.Z,{icon:"eva:search-fill"}))}})))};var z=r(73454),O=r(19926),R=r(46136),F=r(33952),P=r(73868);function j(){return j=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},j.apply(this,arguments)}function U(e){let{filters:t,onResetFilter:r,results:a,...o}=e;return n.createElement(P.Z,j({spacing:1.5},o),n.createElement(h.Z,{sx:{typography:"body2",display:"flex",justifyContent:"center"}},n.createElement("strong",{style:{marginRight:"5px"}},a),n.createElement(h.Z,{component:"span",sx:{color:"text.secondary",ml:.25}},"results found")),n.createElement(h.Z,{sx:{display:"flex",alignItems:"center",ml:1,mb:2}},!!t.name&&n.createElement(W,{label:"Keyword:"},n.createElement(O.Z,{label:t.name,size:"small",onDelete:r})),n.createElement(F.Z,{color:"error",onClick:r,startIcon:n.createElement(C.Z,{icon:"solar:trash-bin-trash-bold"}),sx:{}},"Clear")))}function W(e){let{label:t,children:r,sx:a,...o}=e;return n.createElement(P.Z,j({component:R.Z,variant:"outlined",spacing:1,direction:"row",sx:{p:1,borderRadius:1,overflow:"hidden",borderStyle:"dashed",...a}},o),n.createElement(h.Z,{component:"span",sx:{typography:"subtitle2"}},t),n.createElement(P.Z,{spacing:1,direction:"row",flexWrap:"wrap"},r))}var D=r(65992),L=r(47746),B=r(63866),M=r(87037),_=r(22658),A=r(36334),I=r(47591);const T=(0,D.ZP)(h.Z)((e=>{let{theme:t,ownerState:r}=e;const n="light"===t.palette.mode,a="filled"===r.variant,o="outlined"===r.variant,i="soft"===r.variant,l={..."default"===r.color&&{...a&&{color:n?t.palette.common.white:t.palette.grey[800],backgroundColor:t.palette.text.primary},...o&&{backgroundColor:"transparent",color:t.palette.text.primary,border:"2px solid ".concat(t.palette.text.primary)},...i&&{color:t.palette.text.secondary,backgroundColor:(0,I.Fq)(t.palette.grey[500],.16)}}},s={..."default"!==r.color&&{...a&&{color:t.palette[r.color].contrastText,backgroundColor:t.palette[r.color].main},...o&&{backgroundColor:"transparent",color:t.palette[r.color].main,border:"2px solid ".concat(t.palette[r.color].main)},...i&&{color:t.palette[r.color][n?"dark":"light"],backgroundColor:(0,I.Fq)(t.palette[r.color].main,.16)}}};return{height:24,minWidth:24,lineHeight:0,borderRadius:6,cursor:"default",alignItems:"center",whiteSpace:"nowrap",display:"inline-flex",justifyContent:"center",textTransform:"capitalize",padding:t.spacing(0,.75),fontSize:t.typography.pxToRem(12),fontWeight:t.typography.fontWeightBold,transition:t.transitions.create("all",{duration:t.transitions.duration.shorter}),...l,...s}}));function N(){return N=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},N.apply(this,arguments)}const Q=(0,n.forwardRef)(((e,t)=>{let{children:r,color:a="default",variant:o="soft",startIcon:i,endIcon:l,sx:s,...c}=e;const u=(0,L.Z)(),d={width:16,height:16,"& svg, img":{width:1,height:1,objectFit:"cover"}};return n.createElement(T,N({ref:t,component:"span",ownerState:{color:a,variant:o},sx:{...i&&{pl:.75},...l&&{pr:.75},...s},theme:u},c),i&&n.createElement(h.Z,{sx:{mr:.75,...d}}," ",i," "),r,l&&n.createElement(h.Z,{sx:{ml:.75,...d}}," ",l," "))})),H=Q,q=function(e){let{score_o:t,device:r,onRefreshClick:a}=e;const o=(0,L.Z)();return n.createElement(c.Z,{align:"center"},n.createElement(h.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",gap:1}},n.createElement(H,{variant:"soft",color:(t&&t.score>.7?"success":t&&t.score>.5&&"warning")||t&&t.score>0&&"error"||"default",sx:{px:1}},t?Math.floor(100*t.score):"-"),n.createElement("style",null,".MuiButtonBase-root:focus { outline: none; }"),n.createElement(A.Z,{title:"Refresh ".concat(r," score")},n.createElement(M.Z,{onClick:a},n.createElement(_.Z,{sx:{fontSize:14,color:o.palette.text.secondary}})))))};var G=r(50985),V=r(63539),J=r(74352),Y=r(74599);const K=(0,D.ZP)("span")((e=>{let{arrow:t,theme:r}=e;const n=-6.5,a={top:n,transform:"rotate(135deg)"},o={bottom:n,transform:"rotate(-45deg)"},i={left:n,transform:"rotate(45deg)"},l={right:n,transform:"rotate(-135deg)"};return{width:14,height:14,position:"absolute",borderBottomLeftRadius:3.5,clipPath:"polygon(0% 0%, 100% 100%, 0% 100%)",border:"solid 1px ".concat((0,I.Fq)("light"===r.palette.mode?r.palette.grey[500]:r.palette.common.black,.12)),...(0,Y.Ls)({color:r.palette.background.paper}),..."top-left"===t&&{...a,left:20},..."top-center"===t&&{...a,left:0,right:0,margin:"auto"},..."top-right"===t&&{...a,right:20},..."bottom-left"===t&&{...o,left:20},..."bottom-center"===t&&{...o,left:0,right:0,margin:"auto"},..."bottom-right"===t&&{...o,right:20},..."left-top"===t&&{...i,top:20},..."left-center"===t&&{...i,top:0,bottom:0,margin:"auto"},..."left-bottom"===t&&{...i,bottom:20},..."right-top"===t&&{...l,top:20},..."right-center"===t&&{...l,top:0,bottom:0,margin:"auto"},..."right-bottom"===t&&{...l,bottom:20}}}));function X(){return X=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},X.apply(this,arguments)}function $(e){let{open:t,children:r,arrow:a="top-right",hiddenArrow:o,sx:i,...l}=e;const{style:s,anchorOrigin:c,transformOrigin:u}=function(e){let t;switch(e){case"top-left":t={style:{ml:-.75},anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"}};break;case"top-center":t={style:{},anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}};break;case"top-right":default:t={style:{ml:.75},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"}};break;case"bottom-left":t={style:{ml:-.75},anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"bottom",horizontal:"left"}};break;case"bottom-center":t={style:{},anchorOrigin:{vertical:"top",horizontal:"center"},transformOrigin:{vertical:"bottom",horizontal:"center"}};break;case"bottom-right":t={style:{ml:.75},anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"bottom",horizontal:"right"}};break;case"left-top":t={style:{mt:-.75},anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"}};break;case"left-center":t={anchorOrigin:{vertical:"center",horizontal:"right"},transformOrigin:{vertical:"center",horizontal:"left"}};break;case"left-bottom":t={style:{mt:.75},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"bottom",horizontal:"left"}};break;case"right-top":t={style:{mt:-.75},anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"}};break;case"right-center":t={anchorOrigin:{vertical:"center",horizontal:"left"},transformOrigin:{vertical:"center",horizontal:"right"}};break;case"right-bottom":t={style:{mt:.75},anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"bottom",horizontal:"right"}}}return t}(a);return n.createElement(J.ZP,X({open:Boolean(t),anchorEl:t,anchorOrigin:c,transformOrigin:u,slotProps:{paper:{sx:{width:"auto",overflow:"inherit",...s,["& .".concat(V.Z.root)]:{"& svg":{mr:2,flexShrink:0}},...i}}}},l),!o&&n.createElement(K,{arrow:a}),r)}var ee=r(49850);const te=(0,D.ZP)(m.Z)((e=>{let{theme:t}=e;return{"&:nth-of-type(even)":{backgroundColor:t.palette.action.hover},"&:last-child td, &:last-child th":{border:0}}}));function re(e){let{urlClickLocation:t,row:r,onRefreshClick:a,onWarmupClick:o}=e;const i=(0,L.Z)(),[l,s]=(0,n.useState)(null),u=()=>{s(null)},d=e=>{u(),a(r,e)};return n.createElement(te,{hover:!0,role:"checkbox",tabIndex:-1,key:r._id},n.createElement(c.Z,{onClick:()=>{t&&(window.location.hash=t.replace("%%URL%%",encodeURIComponent(r.url)))},sx:{fontWeight:500,cursor:"pointer"}},r.url),n.createElement(c.Z,null,r.create_time),n.createElement(q,{onRefreshClick:()=>a(r,ee.Q.ScoreDevice.Mobile),score_o:r.score_m,device:"mobile"}),n.createElement(q,{onRefreshClick:()=>a(r,ee.Q.ScoreDevice.Desktop),score_o:r.score_d,device:"desktop"}),n.createElement(c.Z,{align:"center"},n.createElement(M.Z,{onClick:e=>{s(e.currentTarget)}},n.createElement(G.Z,null)),n.createElement($,{anchorEl:l,open:l,onClose:u,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"}},n.createElement(B.Z,{onClick:()=>{u(),o(r)}},n.createElement(C.Z,{icon:"mdi:web-refresh",color:i.palette.text.secondary})," Optimize now"),n.createElement(B.Z,{onClick:()=>d(ee.Q.ScoreDevice.Mobile)},n.createElement(C.Z,{icon:"mdi:mobile-phone-settings",color:i.palette.text.secondary})," Compare mobile score"),n.createElement(B.Z,{onClick:()=>d(ee.Q.ScoreDevice.Desktop)},n.createElement(C.Z,{icon:"mdi:desktop-windows",color:i.palette.text.secondary})," Compare desktop score"))))}var ne=r(58268),ae=r(87705),oe=r(88932),ie=r(8120),le=r(38642),se=r(60189),ce=r(48907),ue=r(52691),de=r(35936),me=r(83415);function pe(){return pe=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},pe.apply(this,arguments)}const he=(0,n.forwardRef)((function(e,t){return n.createElement(me.Z,pe({direction:"up",ref:t},e))}));function ge(e){let{lighthouseJSONErrMessage:t}=e;const[r,a]=(0,n.useState)(!0),o=()=>{a(!1)};return n.createElement(n.Fragment,null,n.createElement(le.Z,{open:r,TransitionComponent:he,keepMounted:!0,onClose:o,"aria-describedby":"alert-dialog-slide-description"},n.createElement(de.Z,null,"Use Google's location service?"),n.createElement(ce.Z,null,n.createElement(ue.Z,{id:"alert-dialog-slide-description"},t)),n.createElement(se.Z,null,n.createElement(F.Z,{onClick:o},"Ok"))))}var fe=r(65302);const ye=(0,D.ZP)(fe.Z)((e=>{let{theme:t}=e;return{"& .apexcharts-canvas":{"& .apexcharts-tooltip":{...(0,Y.Ls)({color:t.palette.background.default}),color:t.palette.text.primary,boxShadow:t.customShadows.dropdown,borderRadius:1.25*t.shape.borderRadius,"&.apexcharts-theme-light":{borderColor:"transparent",...(0,Y.Ls)({color:t.palette.background.default})}},"& .apexcharts-xaxistooltip":{...(0,Y.Ls)({color:t.palette.background.default}),borderColor:"transparent",color:t.palette.text.primary,boxShadow:t.customShadows.dropdown,borderRadius:1.25*t.shape.borderRadius,"&:before":{borderBottomColor:(0,I.Fq)(t.palette.grey[500],.24)},"&:after":{borderBottomColor:(0,I.Fq)(t.palette.background.default,.8)}},"& .apexcharts-tooltip-title":{textAlign:"center",fontWeight:t.typography.fontWeightBold,backgroundColor:(0,I.Fq)(t.palette.grey[500],.08),color:t.palette.text["light"===t.palette.mode?"secondary":"primary"]},"& .apexcharts-legend":{padding:0},"& .apexcharts-legend-series":{display:"inline-flex !important",alignItems:"center"},"& .apexcharts-legend-marker":{marginRight:8},"& .apexcharts-legend-text":{lineHeight:"18px",textTransform:"capitalize"}}}})),be=(0,n.memo)(ye);var ve=r(98537),we=r.n(ve),Ee=r(27149);function xe(e){let{value:t}=e;const r=(0,L.Z)(),a=()=>t>=90?[r.palette.success.light,r.palette.success.main]:t>=50?[r.palette.warning.light,r.palette.warning.main]:[r.palette.error.light,r.palette.error.main],o=function(e){const t=(0,L.Z)(),r=function(e,t,r){const n=(0,L.Z)(),a=(0,Ee.Z)(n.breakpoints.up(t));return(0,Ee.Z)(n.breakpoints.down(t)),(0,Ee.Z)(n.breakpoints.between(t,void 0)),(0,Ee.Z)(n.breakpoints.only(t)),a}(0,"sm"),n={show:!0,label:"Total",color:t.palette.text.secondary,fontSize:t.typography.subtitle2.fontSize,fontWeight:t.typography.subtitle2.fontWeight,lineHeight:t.typography.subtitle2.lineHeight},a={offsetY:8,color:t.palette.text.primary,fontSize:t.typography.h3.fontSize,fontWeight:t.typography.h3.fontWeight,lineHeight:t.typography.h3.lineHeight},o={colors:[t.palette.primary.main,t.palette.warning.main,t.palette.info.main,t.palette.error.main,t.palette.success.main,t.palette.warning.dark,t.palette.success.darker,t.palette.info.dark,t.palette.info.darker],chart:{toolbar:{show:!1},zoom:{enabled:!1},foreColor:t.palette.text.disabled,fontFamily:t.typography.fontFamily},states:{hover:{filter:{type:"lighten",value:.04}},active:{filter:{type:"darken",value:.88}}},fill:{opacity:1,gradient:{type:"vertical",shadeIntensity:0,opacityFrom:.4,opacityTo:0,stops:[0,100]}},dataLabels:{enabled:!1},stroke:{width:3,curve:"smooth",lineCap:"round"},grid:{strokeDashArray:3,borderColor:t.palette.divider,xaxis:{lines:{show:!1}}},xaxis:{axisBorder:{show:!1},axisTicks:{show:!1}},markers:{size:0,strokeColors:t.palette.background.paper},tooltip:{theme:!1,x:{show:!0}},legend:{show:!0,fontSize:13,position:"top",horizontalAlign:"right",markers:{radius:12},fontWeight:500,itemMargin:{horizontal:8},labels:{colors:t.palette.text.primary}},plotOptions:{bar:{borderRadius:r?3:1,columnWidth:"28%",borderRadiusApplication:"end",borderRadiusWhenStacked:"last"},pie:{donut:{labels:{show:!0,value:a,total:n}}},radialBar:{track:{strokeWidth:"100%",background:(0,I.Fq)(t.palette.grey[500],.16)},dataLabels:{value:a,total:n}},radar:{polygons:{fill:{colors:["transparent"]},strokeColors:t.palette.divider,connectorColors:t.palette.divider}},polarArea:{rings:{strokeColor:t.palette.divider},spokes:{connectorColors:t.palette.divider}}},responsive:[{breakpoint:t.breakpoints.values.sm,options:{plotOptions:{bar:{columnWidth:"40%"}}}},{breakpoint:t.breakpoints.values.md,options:{plotOptions:{bar:{columnWidth:"32%"}}}}]};return we()(o,e)}({legend:{show:!1},fill:{type:"gradient",gradient:{colorStops:[{offset:0,color:a()[0],opacity:1},{offset:100,color:a()[1],opacity:1}]}},plotOptions:{radialBar:{hollow:{size:"64%"},dataLabels:{name:{offsetY:-16},value:{offsetY:8},total:{label:"Score",formatter:()=>"".concat(t)}}}}});return n.createElement(be,{dir:"ltr",type:"radialBar",series:[t],options:o,height:230})}var ke=r(30750);function Ze(e){let{progress:t}=e;return n.createElement(P.Z,{spacing:1},n.createElement(P.Z,{direction:"row",alignItems:"center"},n.createElement(p.Z,{variant:"subtitle2",sx:{flexGrow:1}},t.title),n.createElement(p.Z,{variant:"body2",sx:{color:"text.secondary"}}," (",function(e){if(!e)return"0%";const t=Number(e)/100;return new Intl.NumberFormat("en-US",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:1}).format(t)}(t.value),")")),n.createElement(ke.Z,{variant:"determinate",value:t.value,color:(t.value<=30?"info":t.value<=60&&"warning")||"primary"}))}function Ce(e){if(!e)return"";if(!e.includes("-"))return e;const t=e.split("-").join(" ");return t.charAt(0).toUpperCase()+t.slice(1)}function Se(e){return e?Math.round(100*e):0}const ze=e=>{var t,r,a;let{lighthouseJSON:o,title:i}=e;return o.error&&o.error.message?n.createElement(ge,{lighthouseJSONErrMessage:o.error.message}):n.createElement(h.Z,{sx:{display:"flex",width:"100%",height:"100%",justifyContent:"space-evenly",columnGap:3}},n.createElement(h.Z,{sx:{width:"100%"}},n.createElement(p.Z,{variant:"h6",sx:{mb:2,textAlign:"center"}},i),n.createElement(h.Z,{sx:{display:"flex",flexDirection:"column",gap:2}},n.createElement(h.Z,null,n.createElement(xe,{value:Se(null==o||null===(t=o.lighthouseResult)||void 0===t||null===(t=t.categories)||void 0===t||null===(t=t.performance)||void 0===t?void 0:t.score)})),Object.values(null!==(r=null==o||null===(a=o.lighthouseResult)||void 0===a?void 0:a.audits)&&void 0!==r?r:{}).sort(((e,t)=>e.title>t.title?1:-1)).map(((e,t)=>null===e.title||null===e.score?n.createElement(n.Fragment,{key:t}):n.createElement(h.Z,{key:t,style:{width:"100%"}},n.createElement("div",null,n.createElement(Ze,{progress:{title:Ce(e.title),value:Se(e.score)}}))))))))};var Oe=r(96242),Re=r(33853),Fe=r(90838);const Pe=e=>{let{message:t}=e;const[r,a]=(0,n.useState)(!0);return n.createElement(h.Z,{sx:{position:"fixed",top:0,left:0,width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},n.createElement(Oe.Z,{sx:{color:"#fff",zIndex:e=>e.zIndex.drawer+1},open:r},n.createElement(Re.ZP,{container:!0,direction:"column",alignItems:"center",spacing:2},n.createElement(Re.ZP,{item:!0},n.createElement(Fe.Z,{color:"inherit"})),n.createElement(Re.ZP,{item:!0},n.createElement(p.Z,{style:{textColor:"white"},color:"white"},t)))))};var je=r(1998);const Ue={FirstContentFulPaint:"first-contentful-paint",TimeToInteractive:"interactive",SpeedIndex:"speed-index",TotalBlockingTime:"total-blocking-time",LargestContentFulPaint:"largest-contentful-paint",CumulativeLayoutShift:"cumulative-layout-shift",LargestContentFulPaintEle:"largest-contentful-paint-element"},We=async(e,t,r,n,a)=>{try{const o=((e,t,r)=>{if(null==e||null==e.audits)return void console.log("no lighthouseResult");const n=new ee.Q.ScoreMetrics;var a;null!=e.categories&&null!=e.categories.performance&&(n.MainScore=null==e||null===(a=e.categories)||void 0===a||null===(a=a.performance)||void 0===a?void 0:a.score);const o=e.audits;for(const e in Ue)if(o[Ue[e]])if("LargestContentFulPaintEle"===e){const t=new ee.Q.LCPE;var i,l;null!=o[Ue[e]]&&null!=o[Ue[e]].details&&null!=o[Ue[e]].details.items&&null!=o[Ue[e]].details.items[0]&&null!=o[Ue[e]].details.items[0].items&&null!=o[Ue[e]].details.items[0].items[0]&&null!=o[Ue[e]].details.items[0].items[0].node&&(t.Selector=null===(i=o[Ue[e]].details.items[0].items[0].node)||void 0===i?void 0:i.selector,t.Snippet=null===(l=o[Ue[e]].details.items[0].items[0].node)||void 0===l?void 0:l.snippet),n[e]=t}else{const t=new ee.Q.Score;t.numericUnit=o[Ue[e]].numericUnit,t.numericValue=o[Ue[e]].setNumericvalue,t.scale=o[Ue[e]].score,n[e]=t}const s=new ee.Q.ScoreStrategy;s.device=t||ee.Q.ScoreDevice.Desktop,s.version=r;const c=new ee.Q.SaveScoreRequest;return c.metrics=n,c.strategy=s,c})(e,n,a),i=((e,t)=>({pathVars:{"{domain_id}":e,"{url_id}":t}}))(t,r),l=(0,z.YT)(!1),s=(0,z.ZQ)(),[c,u]=await(0,je.sp)(o,i,l,s);200===u||console.error("Failed to save score. Status code:",u,"Error:",c)}catch(e){console.error("An error occurred while saving the score:",e)}};var De=r(56961),Le=r(59739);const Be=e=>{let{url:t,domain_id:r,url_id:a,device:o}=e;const[i,l]=(0,n.useState)("Warming up ...."),[s,c]=(0,n.useState)(null),[u,d]=(0,n.useState)(null),m=async e=>{e.indexOf("wpunittest");const t=new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");t.searchParams.append("url",e),o&&(o===ee.Q.ScoreDevice.Mobile?t.searchParams.append("strategy","mobile"):t.searchParams.append("strategy","desktop"));const r=await fetch(t);return await r.json()};return(0,n.useEffect)((()=>{if(!t)return;const e=function(e){return console.debug("repairURL before:",e),e.startsWith("http")||(e="https://"+e),console.debug("repairURL after:",e),e}(t);l("Warming up ...."),(0,Le.DoWarmup)(e).then((()=>{l("Analyzing with lighthouse ...."),m(e).then((e=>{c(e),e&&e.lighthouseResult&&We(null==e?void 0:e.lighthouseResult,r,a,o,ee.Q.ScoreVersion.Optimized)}));const t=new URL(e);t.searchParams.append("norl","1"),m(t.toString()).then((e=>{d(e),e&&e.lighthouseResult&&We(null==e?void 0:e.lighthouseResult,r,a,o,ee.Q.ScoreVersion.Original)}))}))}),[t]),n.createElement(n.Fragment,null,u&&s?n.createElement(n.Fragment,null,n.createElement(h.Z,{sx:{display:"flex",width:"100%",height:"100%",justifyContent:"space-evenly",columnGap:3}},n.createElement(ze,{lighthouseJSON:u,title:"Without RabbitLoader"}),n.createElement(De.Z,{orientation:"vertical",flexItem:!0}),n.createElement(ze,{lighthouseJSON:s,title:"With RabbitLoader"}))):n.createElement(n.Fragment,null,n.createElement(Pe,{message:i})))},Me=function(e){let{id:t,url:r,domain_id:a,url_id:i,device:l}=e;return n.createElement(ie.mu,{defaultSettings:{themeMode:"light",themeDirection:"ltr",themeContrast:"default",themeLayout:"vertical",themeColorPresets:"blue",themeStretch:!1}},n.createElement(o.Z,null,n.createElement(p.Z,{sx:{mt:-1,mb:2,color:"black"}},r),n.createElement("div",{className:"App",style:{display:"contents",width:"100%"}},n.createElement(Be,{url:r,domain_id:a,url_id:i,device:l}),n.createElement(oe.Ix,null))))},_e=e=>{let{id:t,url:r,domain_id:o,url_id:i,device:l}=e;if("local-testing-root"!==t)return n.createElement(Me,{id:t,url:r,domain_id:o,url_id:i,device:l});a.createRoot(document.getElementById(t)).render(n.createElement(n.StrictMode,null,n.createElement(Me,{id:t,url:r,domain_id:o,url_id:i,device:l})))};function Ae(e){let{url:t,domainID:r,urlID:a,device:o,open:l,onClose:s}=e;return n.createElement(ne.Z,{open:l,onClose:s,sx:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}},n.createElement(i.Z,{sx:{p:4,minHeight:400,height:"75%",width:"65%",overflowY:"auto",scrollbarWidth:"none"}},n.createElement(h.Z,{sx:{display:"flex",justifyContent:"space-between"}},n.createElement(p.Z,{variant:"h6",sx:{mb:1}},o===ee.Q.ScoreDevice.Mobile?"Mobile":"Desktop"," Light House Score"),n.createElement(ae.Z,{onClick:s,sx:{"&:hover":{cursor:"pointer"}}})),n.createElement(p.Z,{variant:"body2",sx:{mb:3}},"Score Checker is our newest feature, now available for all plans during its beta phase."),n.createElement(_e,{id:"",url:t,domain_id:r,url_id:a,device:o})))}var Ie,Te,Ne=r(28165);function Qe(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}const He=(0,Ne.F4)(Ie||(Ie=Qe(["\n  0% { transform: scale(0); opacity: 0; }\n  50% { transform: scale(1.1); opacity: 1; }\n  100% { transform: scale(1); opacity: 1; }\n"]))),qe=(0,Ne.F4)(Te||(Te=Qe(["\n  0% { transform: rotate(0deg); opacity: 0; }\n  50% { transform: rotate(15deg); opacity: 1; }\n  100% { transform: rotate(0deg); opacity: 1; }\n"])));function Ge(e){let{url:t,open:a,onClose:o}=e;const i=(0,L.Z)(),[l,s]=(0,n.useState)(!0),[c,u]=(0,n.useState)(""),[d,m]=(0,n.useState)(null),g=(0,n.useRef)([]),f=(0,n.useCallback)(((e,t)=>{const r=setTimeout((()=>{u(e)}),t);g.current.push(r)}),[]),y=(0,n.useCallback)((()=>{g.current.forEach(clearTimeout),g.current=[]}),[]),b=(0,n.useCallback)((async()=>{const e="Something went wrong. Please try again later.";try{const n=await Promise.resolve().then(r.bind(r,59739)),a=await n.DoWarmup(t);y(),s(!1),200===a?(m(!0),u("Page optimized successfully.")):(m(!1),u(404===a?"The page was not found":e))}catch(t){u(e)}}),[t,y]);(0,n.useEffect)((()=>{if(a)return b(),f("fetching page content",0),f("analyzing JavaScript",2500),f("analyzing CSS files",4e3),f("analyzing images",5500),f("analyzing iframes and videos",7e3),f("compressing images",8e3),y}),[a,t,b,f,y]);const v=(0,n.useCallback)((e=>{if(l)return n.createElement(Fe.Z,{color:"inherit",sx:{width:e,height:e}});const t={width:e,height:e,color:d?i.palette.success.main:i.palette.warning.main,icon:d?"mdi:success-circle-outline":"mdi:warning-outline",sx:{animation:"".concat(d?He:qe," 0.5s ease-in-out")}};return n.createElement(h.Z,t,n.createElement(C.Z,t))}),[l,d,i.palette.success.main,i.palette.warning.main]);return n.createElement(le.Z,{open:a,onClose:o},n.createElement(de.Z,null,"Optimizing Page"),n.createElement(ce.Z,{sx:{color:"text.secondary"}},"On-demand optimization is our newest feature, now available for all plans during its beta phase.",n.createElement(h.Z,{sx:{display:"flex",alignItems:"center",mt:3}},v(48),n.createElement(p.Z,{sx:{ml:1}},c))),n.createElement(se.Z,null,n.createElement(F.Z,{variant:"contained",onClick:o},"Close")))}const Ve=[{id:"canonical-url",label:"Canonical URL (without protocal)",align:"left"},{id:"first-detected",label:"First Detected"},{id:"mobile-score",label:"Mobile Score",align:"center"},{id:"desktop-score",label:"Desktop Score",align:"center"},{id:"options",label:"Options",align:"center"}];function Je(e){var t,r,a,o;let{domain:y,urlClickLocation:b,domain_id:v}=e;const[w,k]=(0,n.useState)(0),[Z,C]=(0,n.useState)(10),[O,R]=(0,n.useState)(),[F,P]=(0,n.useState)(""),j=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;const[r,a]=(0,n.useState)(e);return(0,n.useEffect)((()=>{const r=setTimeout((()=>{a(e)}),t);return()=>{clearTimeout(r)}}),[e,t]),r}(F,300),[W,D]=(0,n.useState)(!1),[L,B]=(0,n.useState)(!1),[M,_]=(0,n.useState)(""),[A,I]=(0,n.useState)("desc"),[T,N]=(0,n.useState)(!1),[Q,H]=(0,n.useState)(!1),[q,G]=(0,n.useState)(null),[V,J]=(0,n.useState)(ee.Q.ScoreDevice.UNDEFINED_SCORE_DEVICE);function Y(e){const t=new Date(e),r=t.toLocaleString("default",{month:"short"}),n=t.getDate(),a=t.getFullYear();let o=t.getHours(),i=t.getMinutes();const l=o>=12?"PM":"AM";return o%=12,o=o||12,i=i<10?"0"+i:i,r+" "+n+", "+a+", "+o+":"+i+" "+l}function K(e,t){G(e),J(t),N(!0)}const X=async e=>{G(e),H(!0)};return(0,n.useEffect)((()=>{!async function(){D(!0);try{const e=await async function(e){let{domain:t,draw:r,start:n,length:a,orderColumn:o,orderDir:i,search:l}=e;const s=new URLSearchParams;s.append("draw",r.toString());const c=(0,z.YT)(!1);s.append("columns[0][data]","url"),s.append("columns[0][name]",""),s.append("columns[0][searchable]","true"),s.append("columns[0][orderable]","false"),s.append("columns[0][search][value]",""),s.append("columns[0][search][regex]","false"),s.append("columns[1][data]","create_time"),s.append("columns[1][name]",""),s.append("columns[1][searchable]","true"),s.append("columns[1][orderable]","true"),s.append("columns[1][search][value]",""),s.append("columns[1][search][regex]","false"),s.append("columns[2][data]","update_time"),s.append("columns[2][name]",""),s.append("columns[2][searchable]","true"),s.append("columns[2][orderable]","true"),s.append("columns[2][search][value]",""),s.append("columns[2][search][regex]","false"),s.append("order[0][column]",o.toString()),s.append("order[0][dir]",i),s.append("start",n.toString()),s.append("length",a.toString()),s.append("search[value]",l),s.append("search[regex]","false"),s.append("domain",t);const u="".concat((0,z.xp)(),"/api/v1/report/canonical_urls?").concat(s.toString()),d=await fetch(u,{headers:{Authorization:"Bearer ".concat(null!==c||void 0!==c||0===c.length?c:"")}});if(200!==d.status)return{error:"Some thing went wrong.",data:null};const m=await d.json();return m&&m.data&&m.data.records&&void 0!==m.data.recordsTotal&&void 0!==m.data.recordsFiltered?{data:{records:m.data.records,recordsTotal:m.data.recordsTotal,recordsFiltered:m.data.recordsFiltered},error:null}:{data:null,error:"Some thing went wrong."}}({domain:y,draw:1,length:Z,orderColumn:"cache-refreshed"===M?2:1,orderDir:A,search:j,start:w*Z});if(e.error)return;e.data.records.map((e=>{e.create_time=Y(e.create_time),e.update_time=Y(e.update_time)})),R(e)}catch(e){console.log(e)}finally{D(!1)}}()}),[Z,w,j,y,A,M]),n.createElement(h.Z,{sx:{isolation:"auto"}},T?n.createElement(Ae,{url:q.url,urlID:q._id,domainID:v,device:V,open:T,onClose:()=>N(!1)}):n.createElement(n.Fragment,null),Q?n.createElement(Ge,{url:q.url,open:Q,onClose:()=>H(!1)}):n.createElement(n.Fragment,null),n.createElement(i.Z,{sx:{width:"100%",py:2}},n.createElement(p.Z,{variant:"h5",sx:{my:3,ml:3,color:"#000000 !important"}},"Canonical URLs Detected"),n.createElement(S,{onChange:e=>P(e.target.value),value:F}),F.length>0&&n.createElement(U,{filters:{name:F},results:(null==O?void 0:O.data.recordsFiltered)||0,onResetFilter:()=>P("")}),n.createElement(u.Z,{sx:{maxHeight:440}},n.createElement(l.Z,{stickyHeader:!0,"aria-label":"sticky table",size:L?"small":"medium"},n.createElement(d.Z,null,n.createElement(m.Z,null,Ve.map((e=>n.createElement(c.Z,{key:e.id,align:e.align,style:{minWidth:e.minWidth},sortDirection:"desc"},"canonical-url"===e.id?n.createElement(n.Fragment,null,e.label):n.createElement(g.Z,{hideSortIcon:!0,active:M===e.id,direction:A,onClick:()=>{_(e.id),I("asc"===A?"desc":"asc")}},e.label)))))),n.createElement(s.Z,null,W?n.createElement(m.Z,null,n.createElement(c.Z,{colSpan:Ve.length,height:370,align:"center"},n.createElement(f.a,null))):null!==(t=null==O||null===(r=O.data)||void 0===r||null===(r=r.records)||void 0===r?void 0:r.length)&&void 0!==t&&t?null==O?void 0:O.data.records.map((e=>n.createElement(re,{key:e._id,urlClickLocation:b,row:e,domainID:v,onRefreshClick:K,onWarmupClick:X}))):n.createElement(m.Z,null,n.createElement(c.Z,{colSpan:Ve.length,height:300,align:"center"},n.createElement("img",{src:x,alt:"No Data Found",style:{width:160}}),n.createElement(p.Z,{variant:"body1"},"No canonical URL found.",n.createElement("br",null),"For a new site, it may take a few hours depending on the network connectivity and hosting server firewall.")))))),n.createElement(h.Z,{sx:{display:"flex",justifyContent:"end",mt:2,mr:1}},n.createElement("style",null,"\n              span.MuiTablePagination-root div p  {\n                margin-top: 0px;\n                margin-bottom: 0px;\n                color: black;\n              }\n            "),n.createElement(E,{rowsPerPageOptions:[10,25,100],count:0===(null==O?void 0:O.data.recordsFiltered)?null==O?void 0:O.data.recordsTotal:null!==(a=null==O||null===(o=O.data)||void 0===o?void 0:o.recordsFiltered)&&void 0!==a?a:0,sx:{all:"unset",display:"flex",width:"100%",justifyContent:"space-between"},component:"span",rowsPerPage:Z,dense:L,onChangeDense:e=>B(e.target.checked),page:w,onPageChange:(e,t)=>{k(t)},onRowsPerPageChange:e=>C(+e.target.value)}))))}function Ye(e){let{domain:t,urlClickLocation:r,domain_id:a}=e;return n.createElement(n.Fragment,null,n.createElement(ie.mu,{defaultSettings:{themeMode:"light",themeDirection:"ltr",themeContrast:"default",themeLayout:"vertical",themeColorPresets:"blue",themeStretch:!1}},n.createElement(o.Z,null,n.createElement(Je,{domain_id:a,domain:t,urlClickLocation:r}))))}function Ke(e){let{id:t,domain:r,urlClickLocation:o,domain_id:i}=e;if("local-testing-root"!==t)return n.createElement(Ye,{domain:r,urlClickLocation:o,domain_id:i});a.createRoot(document.getElementById(t)).render(n.createElement(n.StrictMode,null,n.createElement(Ye,{domain:r,urlClickLocation:o,domain_id:i})))}}}]);