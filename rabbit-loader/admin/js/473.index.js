"use strict";(this.webpackChunkRLAdmin=this.webpackChunkRLAdmin||[]).push([[473],{63473:(e,t,i)=>{i.r(t),i.d(t,{ActivityHistory:()=>C});var r=i(2784),s=i(17029),n=i(98889),a=i(8120),l=i(91350),o=i(28718),c=i(68745),u=i(79312),d=i(65154),m=i(96027),h=i(82821),g=i(63655),f=i(13182),p=i(31876),E=i(58983),y=i(71892),w=i(37287),b=i(6382),v=i(55861);function L(){return L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},L.apply(this,arguments)}function R(e){let{title:t,subheader:i,loading:s,list:n,...a}=e;return r.createElement(m.Z,a,r.createElement(d.Z,{title:t,subheader:i}),s?r.createElement(y.a,{sx:{p:3}}):r.createElement(o.Z,{sx:{m:0,p:3,["& .".concat(p.Z.root,":before")]:{flex:0,padding:0}}},n?n.map(((e,t)=>r.createElement(F,{key:e.id,item:e,lastTimeline:t===n.length-1}))):r.createElement(u.Z,null,"No data found")))}const M=new b.Z;function F(e){let{item:t,lastTimeline:i}=e;const{type:s,title:n,time:a}=t;let l="";return l=n.includes("<")?M.turndown("<h6>".concat(n,"</h6>")):"###### "+n,r.createElement(E.Z,null,r.createElement(g.Z,null,r.createElement(c.Z,{color:("order1"===s?"primary":"order2"===s&&"success")||"I"===s&&"info"||"W"===s&&"warning"||"error"}),i?null:r.createElement(f.Z,null)),r.createElement(h.Z,null,r.createElement(u.Z,{variant:"subtitle2"},r.createElement(v.U,{components:{a(e){const{node:t,...i}=e;return r.createElement("a",L({target:"_blank"},i))}}},l)),r.createElement(u.Z,{variant:"caption",sx:{color:"text.disabled"}},(o=a)?(0,w.Z)(new Date(o),"dd MMM yyyy p"):"")));var o}var _=i(73454),z=i(83249),I=i(13035);function j(e,t,i){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,i)}function D(e,t){var i=function(e,t,i){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}(e,t);return function(e,t){return t.get?t.get.call(e):t.value}(e,i)}let O;!function(e){let t=function(e){return e[e.LEVEL_UNDEFINED=0]="LEVEL_UNDEFINED",e[e.LEVEL_INFO=1]="LEVEL_INFO",e[e.LEVEL_WARNING=2]="LEVEL_WARNING",e[e.LEVEL_ERROR=3]="LEVEL_ERROR",e}({});e.Level=t;var i=new WeakMap;class r extends I.Message{constructor(e){super(),j(this,i,{writable:!0,value:[]}),I.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],D(this,i)),Array.isArray(e)||"object"!=typeof e||("description"in e&&null!=e.description&&(this.description=e.description),"level"in e&&null!=e.level&&(this.level=e.level),"time"in e&&null!=e.time&&(this.time=e.time))}get description(){return I.Message.getFieldWithDefault(this,1,"")}set description(e){I.Message.setField(this,1,e)}get level(){return I.Message.getFieldWithDefault(this,2,t.LEVEL_UNDEFINED)}set level(e){I.Message.setField(this,2,e)}get time(){return I.Message.getWrapperField(this,z.l.protobuf.Timestamp,3)}set time(e){I.Message.setWrapperField(this,3,e)}get has_time(){return null!=I.Message.getField(this,3)}static fromObject(e){const t=new r({});return null!=e.description&&(t.description=e.description),null!=e.level&&(t.level=e.level),null!=e.time&&(t.time=z.l.protobuf.Timestamp.fromObject(e.time)),t}toObject(){const e={};return null!=this.description&&(e.description=this.description),null!=this.level&&(e.level=this.level),null!=this.time&&(e.time=this.time.toObject()),e}serialize(e){const i=e||new I.BinaryWriter;if(this.description.length&&i.writeString(1,this.description),this.level!=t.LEVEL_UNDEFINED&&i.writeEnum(2,this.level),this.has_time&&i.writeMessage(3,this.time,(()=>this.time.serialize(i))),!e)return i.getResultBuffer()}static deserialize(e){const t=e instanceof I.BinaryReader?e:new I.BinaryReader(e),i=new r;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.description=t.readString();break;case 2:i.level=t.readEnum();break;case 3:t.readMessage(i.time,(()=>i.time=z.l.protobuf.Timestamp.deserialize(t)));break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return r.deserialize(e)}}e.GetLogItem=r;var s=new WeakMap;class n extends I.Message{constructor(e){super(),j(this,s,{writable:!0,value:[]}),I.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[3],D(this,s)),Array.isArray(e)||"object"!=typeof e||("limit"in e&&null!=e.limit&&(this.limit=e.limit),"offset"in e&&null!=e.offset&&(this.offset=e.offset),"search_tags"in e&&null!=e.search_tags&&(this.search_tags=e.search_tags))}get limit(){return I.Message.getFieldWithDefault(this,1,0)}set limit(e){I.Message.setField(this,1,e)}get offset(){return I.Message.getFieldWithDefault(this,2,0)}set offset(e){I.Message.setField(this,2,e)}get search_tags(){return I.Message.getFieldWithDefault(this,3,[])}set search_tags(e){I.Message.setField(this,3,e)}static fromObject(e){const t=new n({});return null!=e.limit&&(t.limit=e.limit),null!=e.offset&&(t.offset=e.offset),null!=e.search_tags&&(t.search_tags=e.search_tags),t}toObject(){const e={};return null!=this.limit&&(e.limit=this.limit),null!=this.offset&&(e.offset=this.offset),null!=this.search_tags&&(e.search_tags=this.search_tags),e}serialize(e){const t=e||new I.BinaryWriter;if(0!=this.limit&&t.writeInt64(1,this.limit),0!=this.offset&&t.writeInt32(2,this.offset),this.search_tags.length&&t.writeRepeatedString(3,this.search_tags),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof I.BinaryReader?e:new I.BinaryReader(e),i=new n;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.limit=t.readInt64();break;case 2:i.offset=t.readInt32();break;case 3:I.Message.addToRepeatedField(i,3,t.readString());break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return n.deserialize(e)}}e.GetLogReq=n;var a=new WeakMap;class l extends I.Message{constructor(e){super(),j(this,a,{writable:!0,value:[]}),I.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[1],D(this,a)),Array.isArray(e)||"object"!=typeof e||"items"in e&&null!=e.items&&(this.items=e.items)}get items(){return I.Message.getRepeatedWrapperField(this,r,1)}set items(e){I.Message.setRepeatedWrapperField(this,1,e)}static fromObject(e){const t=new l({});return null!=e.items&&(t.items=e.items.map((e=>r.fromObject(e)))),t}toObject(){const e={};return null!=this.items&&(e.items=this.items.map((e=>e.toObject()))),e}serialize(e){const t=e||new I.BinaryWriter;if(this.items.length&&t.writeRepeatedMessage(1,this.items,(e=>e.serialize(t))),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof I.BinaryReader?e:new I.BinaryReader(e),i=new l;for(;t.nextField()&&!t.isEndGroup();)1===t.getFieldNumber()?t.readMessage(i.items,(()=>I.Message.addToRepeatedWrapperField(i,1,r.deserialize(t),r))):t.skipField();return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return l.deserialize(e)}}e.GetLogRes=l}(O||(O={}));const N=3e5,x=3,A=[500,502,503],B=!1;class W extends Error{constructor(e){super(e),this.name="MissingPathVarError"}}const k=new W("path variable is missing");const V=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0;const{timeout:s=N,retryCount:n=x,retryableCodes:a=A,contentTypeJson:l=B}=t;let{newPath:o,missingVar:c}=function(e,t){let i=!1,r=e;for(const[e,i]of Object.entries(t))r=r.replace(e,i);return i=r.includes("{"),{newPath:r,missingVar:i}}(r+"/activitylog/log/domain/{domain_id}/",t.pathVars||{});if(c)return Promise.reject(k);const u=e.serializeBinary(),d={method:"GET",headers:{Authorization:"Bearer ".concat(i),"Content-Type":l?"application/json":"application/x-protobuf",Accept:l?"application/json":"application/x-protobuf"},...t.cache?{cache:t.cache}:{}};return o=o+"?"+new URLSearchParams({get_params:btoa(String.fromCharCode.apply(null,Array.from(u)))}),async function e(t){try{const i=await fetch(o,d);if(!i.ok&&a.includes(i.status)&&0!==t)return e(t-1);if(l)try{return[await i.json(),i.status]}catch(e){return console.log("error in reading response body: ",e),[new O.GetLogRes,i.status]}try{const e=await i.arrayBuffer(),t=new Uint8Array(e);return[O.GetLogRes.deserialize(t),i.status]}catch(e){return console.error("error in reading response body",e),[new O.GetLogRes,i.status]}}catch(e){return console.log("error getting data: ",e),[new O.GetLogRes,0]}}(n)},Z=e=>({pathVars:{"{domain_id}":e}}),G={[O.Level.LEVEL_UNDEFINED]:"",[O.Level.LEVEL_INFO]:"I",[O.Level.LEVEL_WARNING]:"W",[O.Level.LEVEL_ERROR]:"E"};function S(e){let{domainID:t}=e;const[i,s]=r.useState(!1),[n,a]=r.useState();return r.useEffect((()=>{!async function(){s(!0);try{const e=await async function(e){let{domainID:t}=e;const i=(0,_.ZQ)(),r=(0,_.YT)(!1),s=Z(t),n=new O.GetLogReq({limit:50,offset:0,search_tags:[]}),[a,l]=await V(n,s,r,i);if(200!==l)return{logs:null,error:"Some thing went wrong."};const o=await a.toObject();if(!o||!o.items)return{logs:null,error:"Some thing went wrong."};const c=[];return o.items.map((e=>{c.push({id:"",title:e.description,time:new Date(1e3*e.time.seconds),type:G[e.level]})})),{logs:c,error:null}}({domainID:t});if(e.error)return;a(e)}catch(e){console.error(e),a({error:"failed to get notifications",logs:null})}finally{s(!1)}}()}),[t]),r.createElement(l.Z,{xs:12,md:6,lg:4},r.createElement(R,{title:"Recent Notifications",subheader:null==n?void 0:n.error,loading:i,list:null==n?void 0:n.logs}))}function T(e){let{domainID:t}=e;return r.createElement(r.Fragment,null,r.createElement(a.mu,{defaultSettings:{themeMode:"light",themeDirection:"ltr",themeContrast:"default",themeLayout:"vertical",themeColorPresets:"blue",themeStretch:!1}},r.createElement(n.Z,null,r.createElement(S,{domainID:t}))))}function C(e){let{domID:t,domainID:i}=e;if("local-testing-root"!==t)return r.createElement(T,{domainID:i});s.createRoot(document.getElementById(t)).render(r.createElement(r.StrictMode,null,r.createElement(T,{domainID:i})))}},71892:(e,t,i)=>{i.d(t,{a:()=>l});var r=i(2784),s=i(41740),n=i(30750);function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},a.apply(this,arguments)}function l(e){let{sx:t,...i}=e;return r.createElement(s.Z,a({sx:{px:5,width:1,flexGrow:1,minHeight:1,display:"flex",alignItems:"center",justifyContent:"center",...t}},i),r.createElement(n.Z,{color:"inherit",sx:{width:1,maxWidth:360}}))}}}]);