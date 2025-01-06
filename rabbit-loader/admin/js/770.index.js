"use strict";(this.webpackChunkRLAdmin=this.webpackChunkRLAdmin||[]).push([[770],{67485:(e,t,o)=>{o.d(t,{wT:()=>u});var r=o(56770),a=o(2784),i=o(27379),n=o(87037),s=o(86769),l=o(8120),c=o(65992),d=o(47591);const m=(0,c.ZP)(r.pk)((e=>{let{theme:t}=e;const o="light"===t.palette.mode;return{"& #notistack-snackbar":{...t.typography.subtitle2,padding:0,flexGrow:1},"&.notistack-MuiContent":{color:t.palette.text.primary,boxShadow:t.customShadows.z8,borderRadius:t.shape.borderRadius,padding:t.spacing(.5,2,.5,.5),backgroundColor:t.palette.background.paper},"&.notistack-MuiContent-default":{padding:t.spacing(1,2,1,1),color:o?t.palette.common.white:t.palette.grey[800],backgroundColor:o?t.palette.grey[800]:t.palette.common.white}}})),p=(0,c.ZP)("span")((e=>{let{color:t,theme:o}=e;return{width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",marginRight:o.spacing(1.5),color:o.palette[t].main,borderRadius:o.shape.borderRadius,backgroundColor:(0,d.Fq)(o.palette[t].main,.16)}}));function u(e){let{children:t}=e;const o="rtl"===(0,l.K$)().themeDirection,c=(0,a.useRef)(null);return a.createElement(r.wT,{ref:c,maxSnack:5,preventDuplicate:!0,SnackbarProps:{style:{zIndex:999999999999}},autoHideDuration:3e3,TransitionComponent:o?i.Z:void 0,variant:"success",anchorOrigin:{vertical:"top",horizontal:"right"},iconVariant:{info:a.createElement(p,{color:"info"},a.createElement(s.Z,{icon:"eva:info-fill",width:24})),success:a.createElement(p,{color:"success"},a.createElement(s.Z,{icon:"eva:checkmark-circle-2-fill",width:24})),warning:a.createElement(p,{color:"warning"},a.createElement(s.Z,{icon:"eva:alert-triangle-fill",width:24})),error:a.createElement(p,{color:"error"},a.createElement(s.Z,{icon:"solar:danger-bold",width:24}))},Components:{default:m,info:m,success:m,warning:m,error:m},action:e=>a.createElement(n.Z,{size:"small",onClick:()=>(0,r.sy)(e),sx:{p:.5}},a.createElement(s.Z,{width:16,icon:"mingcute:close-line"})),style:{zIndex:1e21}},t)}},40770:(e,t,o)=>{o.r(t),o.d(t,{PerformanceSummary:()=>re});var r=o(2784),a=o(17029),i=o(55312),n=o(8120),s=o(67485),l=o(41740),c=o(47746),d=o(96027),m=o(87037),p=o(36334),u=o(33952),h=o(31461),g=o(7896),b=o(99332),v=o(76224),f=o(46136),y=o(7342),x=o(30750),S=o(43853),w=o(65992),R=o(83930),Z=o(47645),E=o(6970);function k(e){return(0,E.ZP)("MuiMobileStepper",e)}(0,Z.Z)("MuiMobileStepper",["root","positionBottom","positionTop","positionStatic","dots","dot","dotActive","progress"]);var M=o(52322);const D=["activeStep","backButton","className","LinearProgressProps","nextButton","position","steps","variant"],C=(0,w.ZP)(f.Z,{name:"MuiMobileStepper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[`position${(0,y.Z)(o.position)}`]]}})((({theme:e,ownerState:t})=>(0,g.Z)({display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",background:(e.vars||e).palette.background.default,padding:8},"bottom"===t.position&&{position:"fixed",bottom:0,left:0,right:0,zIndex:(e.vars||e).zIndex.mobileStepper},"top"===t.position&&{position:"fixed",top:0,left:0,right:0,zIndex:(e.vars||e).zIndex.mobileStepper}))),P=(0,w.ZP)("div",{name:"MuiMobileStepper",slot:"Dots",overridesResolver:(e,t)=>t.dots})((({ownerState:e})=>(0,g.Z)({},"dots"===e.variant&&{display:"flex",flexDirection:"row"}))),z=(0,w.ZP)("div",{name:"MuiMobileStepper",slot:"Dot",shouldForwardProp:e=>(0,R.Z)(e)&&"dotActive"!==e,overridesResolver:(e,t)=>{const{dotActive:o}=e;return[t.dot,o&&t.dotActive]}})((({theme:e,ownerState:t,dotActive:o})=>(0,g.Z)({},"dots"===t.variant&&(0,g.Z)({transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),backgroundColor:(e.vars||e).palette.action.disabled,borderRadius:"50%",width:8,height:8,margin:"0 2px"},o&&{backgroundColor:(e.vars||e).palette.primary.main})))),I=(0,w.ZP)(x.Z,{name:"MuiMobileStepper",slot:"Progress",overridesResolver:(e,t)=>t.progress})((({ownerState:e})=>(0,g.Z)({},"progress"===e.variant&&{width:"50%"}))),A=r.forwardRef((function(e,t){const o=(0,S.Z)({props:e,name:"MuiMobileStepper"}),{activeStep:a=0,backButton:i,className:n,LinearProgressProps:s,nextButton:l,position:c="bottom",steps:d,variant:m="dots"}=o,p=(0,h.Z)(o,D),u=(0,g.Z)({},o,{activeStep:a,position:c,variant:m});let f;"progress"===m&&(f=1===d?100:Math.ceil(a/(d-1)*100));const x=(e=>{const{classes:t,position:o}=e,r={root:["root",`position${(0,y.Z)(o)}`],dots:["dots"],dot:["dot"],dotActive:["dotActive"],progress:["progress"]};return(0,v.Z)(r,k,t)})(u);return(0,M.jsxs)(C,(0,g.Z)({square:!0,elevation:0,className:(0,b.Z)(x.root,n),ref:t,ownerState:u},p,{children:[i,"text"===m&&(0,M.jsxs)(r.Fragment,{children:[a+1," / ",d]}),"dots"===m&&(0,M.jsx)(P,{ownerState:u,className:x.dots,children:[...new Array(d)].map(((e,t)=>(0,M.jsx)(z,{className:(0,b.Z)(x.dot,t===a&&x.dotActive),ownerState:u,dotActive:t===a},t)))}),"progress"===m&&(0,M.jsx)(I,(0,g.Z)({ownerState:u,className:x.progress,variant:"determinate",value:f},s)),l]}))}));var T=o(6620);const q=(0,T.Z)((0,M.jsx)("path",{d:"M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"}),"ArrowBackIosRounded"),j=(0,T.Z)((0,M.jsx)("path",{d:"M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"}),"ArrowForwardIosRounded"),B=(0,T.Z)((0,M.jsx)("path",{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}),"Refresh");var N=o(1998),L=o(73454),H=o(56770);let _=function(e){return e[e.HomePage=0]="HomePage",e[e.Best=1]="Best",e[e.Average=2]="Average",e}({}),F=function(e){return e[e.Mobile=0]="Mobile",e[e.Desktop=1]="Desktop",e}({});var G=o(72547),Q=o(79312),U=o(86769);const Y=function(e){let{title:t,activeStrategy:o,onStrategyChange:r}=e;const a=(0,c.Z)();return React.createElement(l.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"}},React.createElement(l.Z,null,React.createElement(Q.Z,{variant:"h6",textAlign:"start",color:"textPrimary"},t),React.createElement(l.Z,{sx:{display:"flex",alignItems:"center"}},React.createElement(l.Z,{sx:{width:8,height:8,backgroundColor:a.palette.error.main,borderRadius:"50%",mr:1}}),React.createElement(Q.Z,{variant:"caption",color:"textSecondary"},"Before"),React.createElement(l.Z,{sx:{width:8,height:8,backgroundColor:a.palette.success.main,borderRadius:"50%",ml:2,mr:1}}),React.createElement(Q.Z,{variant:"caption",color:"textSecondary"},"After"))),React.createElement(l.Z,{sx:{display:"flex",columnGap:1}},React.createElement(l.Z,{sx:{textDecoration:o===F.Mobile?"underline":"none","&:hover":{cursor:"pointer"},borderBottom:o===F.Mobile?"2px solid ".concat(a.palette.primary.light):"none",transition:"all 0.3s ease"},onClick:()=>r(F.Mobile)},React.createElement(U.Z,{icon:"mynaui:mobile",sx:{width:"24px"},color:o===F.Mobile?a.palette.primary.light:"initial"})),React.createElement(l.Z,{sx:{textDecoration:o===F.Desktop?"underline":"none","&:hover":{cursor:"pointer"},borderBottom:o===F.Desktop?"2px solid ".concat(a.palette.primary.light):"none",transition:"all 0.3s ease"},onClick:()=>r(F.Desktop)},React.createElement(U.Z,{icon:"mynaui:desktop",sx:{width:"24px"},color:o===F.Desktop?a.palette.primary.light:"initial"}))))};var O=o(58268),V=o(87705),W=o(38712),$=o(49850);const K=function(e){let{strategy:t,onClose:o,domainName:r,domainID:a,urlID:i}=e;return React.createElement(O.Z,{open:!0,sx:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}},React.createElement(d.Z,{sx:{p:4,minHeight:400,height:"75%",width:"65%",overflowY:"auto",scrollbarWidth:"none"}},React.createElement(l.Z,{sx:{display:"flex",justifyContent:"space-between"}},React.createElement(Q.Z,{variant:"h6",sx:{mb:1}},t===F.Mobile?"Mobile":"Desktop"," ","Light House Score"),React.createElement(V.Z,{onClick:o,sx:{"&:hover":{cursor:"pointer"}}})),React.createElement(Q.Z,{variant:"body2",sx:{mb:3}},"Score Checker is our newest feature, now available for all plans during its beta phase."),React.createElement(W.b,{id:"",url:r,domain_id:a,url_id:i,device:t===F.Mobile?$.Q.ScoreDevice.Mobile:$.Q.ScoreDevice.Desktop})))};var J=o(85991),X=o(48449);const ee=function(e){let{device:t,domainName:o,series:a}=e;const i=(0,c.Z)(),[n,s]=(0,r.useState)(0),l=(0,r.useCallback)((e=>e>=85?[i.palette.success.light,i.palette.success.main]:e>=50?[i.palette.warning.light,i.palette.warning.main]:0===e?[i.palette.grey[400],i.palette.grey[700]]:[i.palette.error.light,i.palette.error.main]),[i]),d=(0,r.useMemo)((()=>[l(a[0]),l(a[1])]),[a,l]),m=(0,r.useCallback)(((e,t,o)=>'\n        <div style="padding: 0.5rem; display: flex; justify-content: space-between; align-items: end; z-index: 9999">\n          <div style="margin-right: 1rem; display: flex; flex-direction: column; align-items: start;">\n            <span style="font-size: 0.9rem;">'.concat(e,'</span>\n            <span style="font-size: 0.75rem;">').concat(t,'</span>\n          </div>\n          <div style="font-size: 1.25rem; font-weight: 700; color: ').concat(l(o)[1],'">').concat(o.toString(),"</div>\n        </div>\n        ")),[l]),p=(0,X.Q)({colors:d.map((e=>e[1])),chart:{sparkline:{enabled:!0}},legend:{position:"bottom",horizontalAlign:"center",show:!1},tooltip:{enabled:!0,custom:e=>{var r;const a=t===F.Desktop?"Desktop":"Mobile",i=1===e.seriesIndex?"before":"after",n="".concat(a," score ").concat(i," RabbitLoader");return m(n,o,null===(r=e.series)||void 0===r?void 0:r[e.seriesIndex])}},fill:{type:"gradient",gradient:{colorStops:d.map((e=>[{offset:0,color:e[0],opacity:1},{offset:100,color:e[1],opacity:1}]))}},plotOptions:{radialBar:{hollow:{size:"50%"},track:{show:!0},dataLabels:{value:{fontSize:"2.5rem",offsetY:15,color:l(n)[1],formatter:e=>(s(e),"".concat(e))},name:{show:!0},total:{label:"",formatter(e){var t;const o=a?null==e||null===(t=e.config)||void 0===t||null===(t=t.series)||void 0===t?void 0:t[0]:0;return s(o),o.toString()}}}}}});return React.createElement(X.Z,{dir:"ltr",type:"radialBar",series:a,options:p,width:200,height:200})},te=[_.HomePage,_.Best,_.Average],oe=function(e){var t;let{domainID:o,domainName:a,urlID:i}=e;const n=(0,c.Z)(),[s,h]=(0,r.useState)(),[g,b]=(0,r.useState)(_.HomePage),[v,f]=(0,r.useState)(F.Mobile),[y,x]=(0,r.useState)(!1),S=(0,r.useCallback)((e=>0===e||Number.isNaN(e)?0:Number.parseInt((0,J.FK)(e))),[]),w=(0,r.useMemo)((()=>s?v===F.Desktop?[S(100*s[F.Desktop][g].optimizedScore),S(100*s[F.Desktop][g].originalScore)]:v===F.Mobile?[S(100*s[F.Mobile][g].optimizedScore),S(100*s[F.Mobile][g].originalScore)]:void 0:[0,0]),[v,g,s]);return(0,r.useEffect)((()=>{!async function(){const[e,t]=await async function(e){let{domainID:t}=e;const[o,r]=await(0,N.nP)({pathVars:{"{domain_id}":t}},(0,L.YT)(!1),(0,L.ZQ)());return[o,r]}({domainID:o}),r=function(e,t){return{400:"Please ensure all inputs are correct.",401:"Session timed out. Please log in and try again.",402:"Upgrade is required to proceed.",403:"You do not have permission to access this resource.",404:"The requested resource could not be found.",405:"The method used is not allowed for this request.",406:"The requested format is not acceptable. Please try a different one.",407:"Authentication is required through a proxy server.",408:"The request timed out. Please try again later.",409:"There is a conflict with the current state of the resource.",410:"The requested resource is no longer available.",411:"A specific content length is required for this request.",412:"The request did not meet the required conditions.",413:"The request is too large to be processed.",414:"The URL is too long to be processed.",415:"The server cannot process the media type in the request.",416:"The requested range is not valid.",417:"Unexpected error occurred.",419:"Something unexpected happened. Please try again.",422:"The request could not be processed due to invalid data.",423:"The resource is locked and cannot be accessed.",424:"A dependency for this request failed to execute.",426:"An upgrade is required to complete the request.",428:"A required condition was not met. Please check and try again.",429:"Too many requests. Please wait and try again later.",431:"The request headers are too large. Please reduce them and try again.",451:"This resource is unavailable due to legal restrictions.",500:"An error occurred on the server. Please try again later.",502:"There was an error from the server acting as a gateway.",503:"The service is temporarily unavailable. Please try again later.",504:"The gateway server timed out. Please try again later.",505:"The HTTP version used is not supported by the server.",506:"There is a server configuration issue. Please try again later.",507:"The server does not have enough storage to process this request.",508:"A server loop was detected. Please try again later.",510:"Additional extensions are required to complete this request.",511:"Network authentication is required. Please log in and try again."}[e]||null}(t);r?(0,H.yv)({variant:"error",message:r}):(console.log(e.toObject()),h({[F.Mobile]:{[_.HomePage]:{optimizedScore:e.homePage.optimizedMobile,originalScore:e.homePage.originalMobile},[_.Average]:{optimizedScore:e.averageScore.optimizedMobile,originalScore:e.averageScore.originalMobile},[_.Best]:{optimizedScore:e.bestScore.optimizedMobile,originalScore:e.bestScore.originalMobile}},[F.Desktop]:{[_.HomePage]:{optimizedScore:e.homePage.optimizedDesktop,originalScore:e.homePage.originalDesktop},[_.Average]:{optimizedScore:e.averageScore.optimizedDesktop,originalScore:e.averageScore.originalDesktop},[_.Best]:{optimizedScore:e.bestScore.optimizedDesktop,originalScore:e.bestScore.originalDesktop}}}))}()}),[o]),React.createElement("div",{style:{height:"100%",position:"relative"}},React.createElement(l.Z,{sx:{zIndex:4,position:"absolute",bottom:-7,height:"100%",width:"100%",display:"flex",justifyContent:"center"}},React.createElement(d.Z,{sx:{height:"100%",width:"97%",bgcolor:n.palette.primary.main,opacity:"15%"}})),React.createElement(l.Z,{sx:{zIndex:4,position:"absolute",bottom:-14,height:"100%",width:"100%",display:"flex",justifyContent:"center"}},React.createElement(d.Z,{sx:{height:"100%",width:"90%",bgcolor:n.palette.primary.main,opacity:"15%"}})),React.createElement(d.Z,{sx:{position:"absolute",height:"100%",width:"100%",p:2,display:"flex",flexDirection:"column",justifyContent:"space-between",overflow:"visible",borderRadius:"12px",zIndex:5}},y&&React.createElement(K,{domainID:o,domainName:a,onClose:()=>x(!1),strategy:v,urlID:i}),React.createElement(Y,{title:null!==(R=te[g],t=R===_.HomePage?"Home Page Score":R===_.Average?"Average Score":R===_.Best?"Best Score":void 0)&&void 0!==t?t:"",activeStrategy:v,onStrategyChange:e=>f(e)}),React.createElement(l.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"}},React.createElement(l.Z,null,React.createElement(m.Z,{disabled:0===g,onClick:()=>{g>0&&b(g-1)}},React.createElement(q,null))),React.createElement(ee,{domainName:a,series:null!=w?w:[0,0],device:v}),React.createElement(l.Z,null,React.createElement(m.Z,{disabled:2===g,onClick:()=>{g<2&&b(g+1)}},React.createElement(j,null)))),React.createElement(l.Z,{sx:{display:"flex",justifyContent:g===_.HomePage?"space-between":"end",alignItems:"center",alignSelf:"end",width:"100%"}},g===_.HomePage&&React.createElement(p.Z,{title:"Recheck the speed score for home page"},React.createElement(u.Z,{variant:"outlined",endIcon:React.createElement(B,{sx:{bgcolor:n.palette.primary.main,p:"1px",color:"white",borderRadius:"50%",height:25,width:25}}),sx:{textTransform:"none",borderRadius:"20px",px:"8px",py:"3px",borderColor:n.palette.primary.main,color:n.palette.primary.main,ml:1,"&:hover":{backgroundColor:"rgba(25, 118, 210, 0.1)",borderColor:n.palette.primary.main},fontWeight:500},onClick:()=>{x(!0),(0,G.Tf)("score_refreshed_donut")}},"Get Updated Score")),React.createElement(A,{backButton:null,nextButton:null,steps:3,sx:{maxWidth:400,"& .MuiMobileStepper-dot":{width:9,height:9},"& .MuiMobileStepper-dotActive":{width:9,height:9}},position:"static",variant:"dots",activeStep:g}))));var R};function re(e){let{domID:t,domainID:o,domainName:c,urlID:d}=e;return"local-testing-root"===t&&(0,a.createRoot)(document.getElementById(t)).render(React.createElement(r.StrictMode,null,React.createElement(n.mu,{defaultSettings:{themeMode:"light",themeDirection:"ltr",themeContrast:"default",themeLayout:"vertical",themeColorPresets:"blue",themeStretch:!1}},React.createElement("div",{style:{all:"unset",boxSizing:"border-box",borderStyle:"unset",border:"unset"}},React.createElement(i.Z,null,React.createElement(s.wT,null,React.createElement(l.Z,{sx:{display:"flex",justifyContent:"center",height:"100%"}},React.createElement(l.Z,{sx:{height:400,width:350}},React.createElement(oe,{domainID:o,domainName:c,urlID:d}))))))))),React.createElement(r.StrictMode,null,React.createElement(n.mu,{defaultSettings:{themeMode:"light",themeDirection:"ltr",themeContrast:"default",themeLayout:"vertical",themeColorPresets:"blue",themeStretch:!1}},React.createElement("div",{style:{all:"unset",boxSizing:"border-box",borderStyle:"unset",border:"unset"}},React.createElement(i.Z,null,React.createElement(s.wT,null,React.createElement(oe,{domainID:o,domainName:c,urlID:d}))))))}o(40728).unstable_ClassNameGenerator.configure((e=>"rl-mfe-perf-sum ".concat(e)))}}]);