"use strict";(this.webpackChunkRLAdmin=this.webpackChunkRLAdmin||[]).push([[926],{15269:(e,r,t)=>{t.r(r),t.d(r,{GetCurrentProfile:()=>l,UserLogin:()=>h,ValidateOTP:()=>d});var n=t(68150);const o=3e5,s=3,a=[500,502,503],i=!1;class c extends Error{constructor(e){super(e),this.name="MissingPathVarError"}}const u=new c("path variable is missing");function p(e,r){let t=!1,n=e;for(const[e,t]of Object.entries(r))n=n.replace(e,t);return t=n.includes("{"),{newPath:n,missingVar:t}}const l=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2?arguments[2]:void 0,c=arguments.length>3?arguments[3]:void 0;const{timeout:l=o,retryCount:h=s,retryableCodes:d=a,contentTypeJson:g=i}=r;let{newPath:y,missingVar:f}=p(c+"/user/v2/this-profile",r.pathVars||{});if(f)return Promise.reject(u);const b=e.serializeBinary(),w={method:"GET",headers:{Authorization:"Bearer ".concat(t),"Content-Type":g?"application/json":"application/x-protobuf",Accept:g?"application/json":"application/x-protobuf"},...r.cache?{cache:r.cache}:{}};return y=y+"?"+new URLSearchParams({get_params:btoa(String.fromCharCode.apply(null,Array.from(b)))}),async function e(r){try{const t=await fetch(y,w);if(!t.ok&&d.includes(t.status)&&0!==r)return e(r-1);if(g)try{return[await t.json(),t.status]}catch(e){return console.log("error in reading response body: ",e),[new n.userpb.GetUserProfileResponse,t.status]}try{const e=await t.arrayBuffer(),r=new Uint8Array(e);return[n.userpb.GetUserProfileResponse.deserialize(r),t.status]}catch(e){return console.error("error in reading response body",e),[new n.userpb.GetUserProfileResponse,t.status]}}catch(e){return console.log("error getting data: ",e),[new n.userpb.GetUserProfileResponse,0]}}(h)},h=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2?arguments[2]:void 0,c=arguments.length>3?arguments[3]:void 0;const{timeout:l=o,retryCount:h=s,retryableCodes:d=a,contentTypeJson:g=i}=r;let{newPath:y,missingVar:f}=p(c+"/user/v2/login",r.pathVars||{});if(f)return Promise.reject(u);const b=e.serializeBinary(),w={method:"POST",headers:{Authorization:"Bearer ".concat(t),"Content-Type":g?"application/json":"application/x-protobuf",Accept:g?"application/json":"application/x-protobuf"},...r.cache?{cache:r.cache}:{},body:b};return async function e(r){try{const t=await fetch(y,w);if(!t.ok&&d.includes(t.status)&&0!==r)return e(r-1);if(g)try{return[await t.json(),t.status]}catch(e){return console.log("error in reading response body: ",e),[new n.userpb.UserLoginResponse,t.status]}try{const e=await t.arrayBuffer(),r=new Uint8Array(e);return[n.userpb.UserLoginResponse.deserialize(r),t.status]}catch(e){return console.error("error in reading response body",e),[new n.userpb.UserLoginResponse,t.status]}}catch(e){return console.log("error getting data: ",e),[new n.userpb.UserLoginResponse,0]}}(h)},d=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2?arguments[2]:void 0,c=arguments.length>3?arguments[3]:void 0;const{timeout:l=o,retryCount:h=s,retryableCodes:d=a,contentTypeJson:g=i}=r;let{newPath:y,missingVar:f}=p(c+"/user/v2/validate-login-otp",r.pathVars||{});if(f)return Promise.reject(u);const b=e.serializeBinary(),w={method:"POST",headers:{Authorization:"Bearer ".concat(t),"Content-Type":g?"application/json":"application/x-protobuf",Accept:g?"application/json":"application/x-protobuf"},...r.cache?{cache:r.cache}:{},body:b};return async function e(r){try{const t=await fetch(y,w);if(!t.ok&&d.includes(t.status)&&0!==r)return e(r-1);if(g)try{return[await t.json(),t.status]}catch(e){return console.log("error in reading response body: ",e),[new n.userpb.UserLoginResponse,t.status]}try{const e=await t.arrayBuffer(),r=new Uint8Array(e);return[n.userpb.UserLoginResponse.deserialize(r),t.status]}catch(e){return console.error("error in reading response body",e),[new n.userpb.UserLoginResponse,t.status]}}catch(e){return console.log("error getting data: ",e),[new n.userpb.UserLoginResponse,0]}}(h)}}}]);