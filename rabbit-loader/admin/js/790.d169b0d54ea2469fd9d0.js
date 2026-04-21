"use strict";(this.webpackChunkRLAdmin=this.webpackChunkRLAdmin||[]).push([[790],{22854:(e,t,a)=>{a.d(t,{A:()=>y});var n=a(14041),i=a(45022),r=a(90028);var o=a(85279),s=a(15428),l=a(59193),h=a(7974),d=a(49556),p=a(86310),m=a(18526);function u(e){return(0,m.Ay)("MuiSkeleton",e)}(0,p.A)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var c=a(31085);const f=s.i7`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,g=s.i7`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,v="string"!=typeof f?s.AH`
        animation: ${f} 2s ease-in-out 0.5s infinite;
      `:null,b="string"!=typeof g?s.AH`
        &::after {
          animation: ${g} 2s linear 0.5s infinite;
        }
      `:null,w=(0,l.Ay)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],!1!==a.animation&&t[a.animation],a.hasChildren&&t.withChildren,a.hasChildren&&!a.width&&t.fitContent,a.hasChildren&&!a.height&&t.heightAuto]}})((0,h.A)((({theme:e})=>{const t=(i=e.shape.borderRadius,String(i).match(/[\d.\-+]*\s*(.*)/)[1]||""||"px"),a=(n=e.shape.borderRadius,parseFloat(n));var n,i;return{display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:(0,o.X4)(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${t}/${Math.round(a/.6*10)/10}${t}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:({ownerState:e})=>e.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:e})=>e.hasChildren&&!e.width,style:{maxWidth:"fit-content"}},{props:({ownerState:e})=>e.hasChildren&&!e.height,style:{height:"auto"}},{props:{animation:"pulse"},style:v||{animation:`${f} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(\n                90deg,\n                transparent,\n                ${(e.vars||e).palette.action.hover},\n                transparent\n              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:b||{"&::after":{animation:`${g} 2s linear 0.5s infinite`}}}]}}))),y=n.forwardRef((function(e,t){const a=(0,d.b)({props:e,name:"MuiSkeleton"}),{animation:n="pulse",className:o,component:s="span",height:l,style:h,variant:p="text",width:m,...f}=a,g={...a,animation:n,component:s,variant:p,hasChildren:Boolean(f.children)},v=(e=>{const{classes:t,variant:a,animation:n,hasChildren:i,width:o,height:s}=e,l={root:["root",a,n,i&&"withChildren",i&&!o&&"fitContent",i&&!s&&"heightAuto"]};return(0,r.A)(l,u,t)})(g);return(0,c.jsx)(w,{as:s,ref:t,className:(0,i.A)(v.root,o),ownerState:g,...f,style:{width:m,height:l,...h}})}))},72790:(e,t,a)=>{a.r(t),a.d(t,{default:()=>l});var n=a(22854),i=a(14041);const r=(0,i.lazy)((()=>Promise.all([a.e(588),a.e(126)]).then(a.bind(a,50884)))),o=(0,i.lazy)((()=>Promise.all([a.e(588),a.e(324),a.e(954)]).then(a.bind(a,48954)))),s=(0,i.lazy)((()=>Promise.all([a.e(588),a.e(560),a.e(202),a.e(958)]).then(a.bind(a,91958)))),l=function(){return i.createElement(i.Fragment,null,i.createElement(i.Suspense,{fallback:i.createElement(n.A,{height:"50vh",width:"100%"})},i.createElement(r,null)),i.createElement(i.Suspense,{fallback:i.createElement(n.A,{height:"50vh",width:"100%"})},i.createElement(o,null)),i.createElement(i.Suspense,{fallback:i.createElement(n.A,{height:"70vh",width:"100%"})},i.createElement(s,null)))}}}]);