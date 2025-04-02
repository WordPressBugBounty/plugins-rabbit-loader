"use strict";(this.webpackChunkRLAdmin=this.webpackChunkRLAdmin||[]).push([[852],{32336:(e,t,i)=>{i.r(t),i.d(t,{userpb:()=>n});var r=i(82224),s=i(67186);let n;!function(e){let t=function(e){return e[e.UserEventUndefined=0]="UserEventUndefined",e[e.UserProfileCreated=1]="UserProfileCreated",e}({});e.EventName=t;let i=function(e){return e[e.STATUS_UNDEFINED=0]="STATUS_UNDEFINED",e[e.STATUS_EXISTING_USER=1]="STATUS_EXISTING_USER",e[e.STATUS_INVITATION_SUCCESS=2]="STATUS_INVITATION_SUCCESS",e[e.STATUS_INVITATION_ERROR=3]="STATUS_INVITATION_ERROR",e}({});e.InvitationStatus=i;class n extends s.Message{#e=[];constructor(e){super(),s.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)}static fromObject(e){return new n({})}toObject(){return{}}serialize(e){const t=e||new s.BinaryWriter;if(!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof s.BinaryReader?e:new s.BinaryReader(e),i=new n;for(;t.nextField()&&!t.isEndGroup();)t.getFieldNumber(),t.skipField();return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return n.deserialize(e)}}e.GetUserProfileRequest=n;class a extends s.Message{#e=[];constructor(e){super(),s.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[7],this.#e),Array.isArray(e)||"object"!=typeof e||("firstName"in e&&null!=e.firstName&&(this.firstName=e.firstName),"lastName"in e&&null!=e.lastName&&(this.lastName=e.lastName),"email"in e&&null!=e.email&&(this.email=e.email),"deviceLocation"in e&&null!=e.deviceLocation&&(this.deviceLocation=e.deviceLocation),"brand"in e&&null!=e.brand&&(this.brand=e.brand),"id"in e&&null!=e.id&&(this.id=e.id),"brands"in e&&null!=e.brands&&(this.brands=e.brands))}get firstName(){return s.Message.getFieldWithDefault(this,1,"")}set firstName(e){s.Message.setField(this,1,e)}get lastName(){return s.Message.getFieldWithDefault(this,2,"")}set lastName(e){s.Message.setField(this,2,e)}get email(){return s.Message.getFieldWithDefault(this,3,"")}set email(e){s.Message.setField(this,3,e)}get deviceLocation(){return s.Message.getWrapperField(this,r.Y.DeviceLocation,4)}set deviceLocation(e){s.Message.setWrapperField(this,4,e)}get has_deviceLocation(){return null!=s.Message.getField(this,4)}get brand(){return s.Message.getFieldWithDefault(this,5,r.Y.Brand.UNDEFINED_BRAND)}set brand(e){s.Message.setField(this,5,e)}get id(){return s.Message.getFieldWithDefault(this,6,"")}set id(e){s.Message.setField(this,6,e)}get brands(){return s.Message.getFieldWithDefault(this,7,[])}set brands(e){s.Message.setField(this,7,e)}static fromObject(e){const t=new a({});return null!=e.firstName&&(t.firstName=e.firstName),null!=e.lastName&&(t.lastName=e.lastName),null!=e.email&&(t.email=e.email),null!=e.deviceLocation&&(t.deviceLocation=r.Y.DeviceLocation.fromObject(e.deviceLocation)),null!=e.brand&&(t.brand=e.brand),null!=e.id&&(t.id=e.id),null!=e.brands&&(t.brands=e.brands),t}toObject(){const e={};return null!=this.firstName&&(e.firstName=this.firstName),null!=this.lastName&&(e.lastName=this.lastName),null!=this.email&&(e.email=this.email),null!=this.deviceLocation&&(e.deviceLocation=this.deviceLocation.toObject()),null!=this.brand&&(e.brand=this.brand),null!=this.id&&(e.id=this.id),null!=this.brands&&(e.brands=this.brands),e}serialize(e){const t=e||new s.BinaryWriter;if(this.firstName.length&&t.writeString(1,this.firstName),this.lastName.length&&t.writeString(2,this.lastName),this.email.length&&t.writeString(3,this.email),this.has_deviceLocation&&t.writeMessage(4,this.deviceLocation,(()=>this.deviceLocation.serialize(t))),this.brand!=r.Y.Brand.UNDEFINED_BRAND&&t.writeEnum(5,this.brand),this.id.length&&t.writeString(6,this.id),this.brands.length&&t.writePackedEnum(7,this.brands),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof s.BinaryReader?e:new s.BinaryReader(e),i=new a;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.firstName=t.readString();break;case 2:i.lastName=t.readString();break;case 3:i.email=t.readString();break;case 4:t.readMessage(i.deviceLocation,(()=>i.deviceLocation=r.Y.DeviceLocation.deserialize(t)));break;case 5:i.brand=t.readEnum();break;case 6:i.id=t.readString();break;case 7:i.brands=t.readPackedEnum();break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return a.deserialize(e)}}e.GetUserProfileResponse=a;class l extends s.Message{#e=[];constructor(e){super(),s.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("firebaseIDToken"in e&&null!=e.firebaseIDToken&&(this.firebaseIDToken=e.firebaseIDToken),"url"in e&&null!=e.url&&(this.url=e.url),"referralCode"in e&&null!=e.referralCode&&(this.referralCode=e.referralCode),"brand"in e&&null!=e.brand&&(this.brand=e.brand),"acquisitionTracking"in e&&null!=e.acquisitionTracking&&(this.acquisitionTracking=e.acquisitionTracking))}get firebaseIDToken(){return s.Message.getFieldWithDefault(this,1,"")}set firebaseIDToken(e){s.Message.setField(this,1,e)}get url(){return s.Message.getFieldWithDefault(this,2,"")}set url(e){s.Message.setField(this,2,e)}get referralCode(){return s.Message.getFieldWithDefault(this,3,"")}set referralCode(e){s.Message.setField(this,3,e)}get brand(){return s.Message.getFieldWithDefault(this,4,r.Y.Brand.UNDEFINED_BRAND)}set brand(e){s.Message.setField(this,4,e)}get acquisitionTracking(){return s.Message.getWrapperField(this,r.Y.UrchinTracking,5)}set acquisitionTracking(e){s.Message.setWrapperField(this,5,e)}get has_acquisitionTracking(){return null!=s.Message.getField(this,5)}static fromObject(e){const t=new l({});return null!=e.firebaseIDToken&&(t.firebaseIDToken=e.firebaseIDToken),null!=e.url&&(t.url=e.url),null!=e.referralCode&&(t.referralCode=e.referralCode),null!=e.brand&&(t.brand=e.brand),null!=e.acquisitionTracking&&(t.acquisitionTracking=r.Y.UrchinTracking.fromObject(e.acquisitionTracking)),t}toObject(){const e={};return null!=this.firebaseIDToken&&(e.firebaseIDToken=this.firebaseIDToken),null!=this.url&&(e.url=this.url),null!=this.referralCode&&(e.referralCode=this.referralCode),null!=this.brand&&(e.brand=this.brand),null!=this.acquisitionTracking&&(e.acquisitionTracking=this.acquisitionTracking.toObject()),e}serialize(e){const t=e||new s.BinaryWriter;if(this.firebaseIDToken.length&&t.writeString(1,this.firebaseIDToken),this.url.length&&t.writeString(2,this.url),this.referralCode.length&&t.writeString(3,this.referralCode),this.brand!=r.Y.Brand.UNDEFINED_BRAND&&t.writeEnum(4,this.brand),this.has_acquisitionTracking&&t.writeMessage(5,this.acquisitionTracking,(()=>this.acquisitionTracking.serialize(t))),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof s.BinaryReader?e:new s.BinaryReader(e),i=new l;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.firebaseIDToken=t.readString();break;case 2:i.url=t.readString();break;case 3:i.referralCode=t.readString();break;case 4:i.brand=t.readEnum();break;case 5:t.readMessage(i.acquisitionTracking,(()=>i.acquisitionTracking=r.Y.UrchinTracking.deserialize(t)));break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return l.deserialize(e)}}e.UserLoginRequest=l;class o extends s.Message{#e=[];constructor(e){super(),s.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("id"in e&&null!=e.id&&(this.id=e.id),"name"in e&&null!=e.name&&(this.name=e.name),"email"in e&&null!=e.email&&(this.email=e.email))}get id(){return s.Message.getFieldWithDefault(this,1,"")}set id(e){s.Message.setField(this,1,e)}get name(){return s.Message.getFieldWithDefault(this,2,"")}set name(e){s.Message.setField(this,2,e)}get email(){return s.Message.getFieldWithDefault(this,3,"")}set email(e){s.Message.setField(this,3,e)}static fromObject(e){const t=new o({});return null!=e.id&&(t.id=e.id),null!=e.name&&(t.name=e.name),null!=e.email&&(t.email=e.email),t}toObject(){const e={};return null!=this.id&&(e.id=this.id),null!=this.name&&(e.name=this.name),null!=this.email&&(e.email=this.email),e}serialize(e){const t=e||new s.BinaryWriter;if(this.id.length&&t.writeString(1,this.id),this.name.length&&t.writeString(2,this.name),this.email.length&&t.writeString(3,this.email),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof s.BinaryReader?e:new s.BinaryReader(e),i=new o;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.id=t.readString();break;case 2:i.name=t.readString();break;case 3:i.email=t.readString();break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return o.deserialize(e)}}e.Profile=o;class u extends s.Message{#e=[];constructor(e){super(),s.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("error"in e&&null!=e.error&&(this.error=e.error),"jwt"in e&&null!=e.jwt&&(this.jwt=e.jwt),"profile"in e&&null!=e.profile&&(this.profile=e.profile),"verificationRequired"in e&&null!=e.verificationRequired&&(this.verificationRequired=e.verificationRequired),"otpRequired"in e&&null!=e.otpRequired&&(this.otpRequired=e.otpRequired),"otpToken"in e&&null!=e.otpToken&&(this.otpToken=e.otpToken))}get error(){return s.Message.getWrapperField(this,r.Y.Error,1)}set error(e){s.Message.setWrapperField(this,1,e)}get has_error(){return null!=s.Message.getField(this,1)}get jwt(){return s.Message.getFieldWithDefault(this,2,"")}set jwt(e){s.Message.setField(this,2,e)}get profile(){return s.Message.getWrapperField(this,o,3)}set profile(e){s.Message.setWrapperField(this,3,e)}get has_profile(){return null!=s.Message.getField(this,3)}get verificationRequired(){return s.Message.getFieldWithDefault(this,4,!1)}set verificationRequired(e){s.Message.setField(this,4,e)}get otpRequired(){return s.Message.getFieldWithDefault(this,5,!1)}set otpRequired(e){s.Message.setField(this,5,e)}get otpToken(){return s.Message.getFieldWithDefault(this,6,"")}set otpToken(e){s.Message.setField(this,6,e)}static fromObject(e){const t=new u({});return null!=e.error&&(t.error=r.Y.Error.fromObject(e.error)),null!=e.jwt&&(t.jwt=e.jwt),null!=e.profile&&(t.profile=o.fromObject(e.profile)),null!=e.verificationRequired&&(t.verificationRequired=e.verificationRequired),null!=e.otpRequired&&(t.otpRequired=e.otpRequired),null!=e.otpToken&&(t.otpToken=e.otpToken),t}toObject(){const e={};return null!=this.error&&(e.error=this.error.toObject()),null!=this.jwt&&(e.jwt=this.jwt),null!=this.profile&&(e.profile=this.profile.toObject()),null!=this.verificationRequired&&(e.verificationRequired=this.verificationRequired),null!=this.otpRequired&&(e.otpRequired=this.otpRequired),null!=this.otpToken&&(e.otpToken=this.otpToken),e}serialize(e){const t=e||new s.BinaryWriter;if(this.has_error&&t.writeMessage(1,this.error,(()=>this.error.serialize(t))),this.jwt.length&&t.writeString(2,this.jwt),this.has_profile&&t.writeMessage(3,this.profile,(()=>this.profile.serialize(t))),0!=this.verificationRequired&&t.writeBool(4,this.verificationRequired),0!=this.otpRequired&&t.writeBool(5,this.otpRequired),this.otpToken.length&&t.writeString(6,this.otpToken),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof s.BinaryReader?e:new s.BinaryReader(e),i=new u;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:t.readMessage(i.error,(()=>i.error=r.Y.Error.deserialize(t)));break;case 2:i.jwt=t.readString();break;case 3:t.readMessage(i.profile,(()=>i.profile=o.deserialize(t)));break;case 4:i.verificationRequired=t.readBool();break;case 5:i.otpRequired=t.readBool();break;case 6:i.otpToken=t.readString();break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return u.deserialize(e)}}e.UserLoginResponse=u;class d extends s.Message{#e=[];constructor(e){super(),s.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("otpCode"in e&&null!=e.otpCode&&(this.otpCode=e.otpCode),"otpToken"in e&&null!=e.otpToken&&(this.otpToken=e.otpToken))}get otpCode(){return s.Message.getFieldWithDefault(this,1,0)}set otpCode(e){s.Message.setField(this,1,e)}get otpToken(){return s.Message.getFieldWithDefault(this,2,"")}set otpToken(e){s.Message.setField(this,2,e)}static fromObject(e){const t=new d({});return null!=e.otpCode&&(t.otpCode=e.otpCode),null!=e.otpToken&&(t.otpToken=e.otpToken),t}toObject(){const e={};return null!=this.otpCode&&(e.otpCode=this.otpCode),null!=this.otpToken&&(e.otpToken=this.otpToken),e}serialize(e){const t=e||new s.BinaryWriter;if(0!=this.otpCode&&t.writeInt32(1,this.otpCode),this.otpToken.length&&t.writeString(2,this.otpToken),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof s.BinaryReader?e:new s.BinaryReader(e),i=new d;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.otpCode=t.readInt32();break;case 2:i.otpToken=t.readString();break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return d.deserialize(e)}}e.ValidateOTPRequest=d;class c extends s.Message{#e=[[11]];constructor(e){super(),s.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("eventName"in e&&null!=e.eventName&&(this.eventName=e.eventName),"TraceID"in e&&null!=e.TraceID&&(this.TraceID=e.TraceID),"userID"in e&&null!=e.userID&&(this.userID=e.userID),"profile"in e&&null!=e.profile&&(this.profile=e.profile))}get eventName(){return s.Message.getFieldWithDefault(this,1,t.UserEventUndefined)}set eventName(e){s.Message.setField(this,1,e)}get TraceID(){return s.Message.getFieldWithDefault(this,2,"")}set TraceID(e){s.Message.setField(this,2,e)}get userID(){return s.Message.getFieldWithDefault(this,3,"")}set userID(e){s.Message.setField(this,3,e)}get profile(){return s.Message.getWrapperField(this,a,11)}set profile(e){s.Message.setOneofWrapperField(this,11,this.#e[0],e)}get has_profile(){return null!=s.Message.getField(this,11)}get eventPayload(){return{0:"none",11:"profile"}[s.Message.computeOneofCase(this,[11])]}static fromObject(e){const t=new c({});return null!=e.eventName&&(t.eventName=e.eventName),null!=e.TraceID&&(t.TraceID=e.TraceID),null!=e.userID&&(t.userID=e.userID),null!=e.profile&&(t.profile=a.fromObject(e.profile)),t}toObject(){const e={};return null!=this.eventName&&(e.eventName=this.eventName),null!=this.TraceID&&(e.TraceID=this.TraceID),null!=this.userID&&(e.userID=this.userID),null!=this.profile&&(e.profile=this.profile.toObject()),e}serialize(e){const i=e||new s.BinaryWriter;if(this.eventName!=t.UserEventUndefined&&i.writeEnum(1,this.eventName),this.TraceID.length&&i.writeString(2,this.TraceID),this.userID.length&&i.writeString(3,this.userID),this.has_profile&&i.writeMessage(11,this.profile,(()=>this.profile.serialize(i))),!e)return i.getResultBuffer()}static deserialize(e){const t=e instanceof s.BinaryReader?e:new s.BinaryReader(e),i=new c;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.eventName=t.readEnum();break;case 2:i.TraceID=t.readString();break;case 3:i.userID=t.readString();break;case 11:t.readMessage(i.profile,(()=>i.profile=a.deserialize(t)));break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return c.deserialize(e)}}e.UserEvent=c;class h extends s.Message{#e=[];constructor(e){super(),s.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("email"in e&&null!=e.email&&(this.email=e.email),"brand"in e&&null!=e.brand&&(this.brand=e.brand),"referredByUserID"in e&&null!=e.referredByUserID&&(this.referredByUserID=e.referredByUserID))}get email(){return s.Message.getFieldWithDefault(this,1,"")}set email(e){s.Message.setField(this,1,e)}get brand(){return s.Message.getFieldWithDefault(this,2,r.Y.Brand.UNDEFINED_BRAND)}set brand(e){s.Message.setField(this,2,e)}get referredByUserID(){return s.Message.getFieldWithDefault(this,3,"")}set referredByUserID(e){s.Message.setField(this,3,e)}static fromObject(e){const t=new h({});return null!=e.email&&(t.email=e.email),null!=e.brand&&(t.brand=e.brand),null!=e.referredByUserID&&(t.referredByUserID=e.referredByUserID),t}toObject(){const e={};return null!=this.email&&(e.email=this.email),null!=this.brand&&(e.brand=this.brand),null!=this.referredByUserID&&(e.referredByUserID=this.referredByUserID),e}serialize(e){const t=e||new s.BinaryWriter;if(this.email.length&&t.writeString(1,this.email),this.brand!=r.Y.Brand.UNDEFINED_BRAND&&t.writeEnum(2,this.brand),this.referredByUserID.length&&t.writeString(3,this.referredByUserID),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof s.BinaryReader?e:new s.BinaryReader(e),i=new h;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.email=t.readString();break;case 2:i.brand=t.readEnum();break;case 3:i.referredByUserID=t.readString();break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return h.deserialize(e)}}e.UserInviteRequest=h;class g extends s.Message{#e=[];constructor(e){super(),s.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("userID"in e&&null!=e.userID&&(this.userID=e.userID),"invitationStatus"in e&&null!=e.invitationStatus&&(this.invitationStatus=e.invitationStatus))}get userID(){return s.Message.getFieldWithDefault(this,1,"")}set userID(e){s.Message.setField(this,1,e)}get invitationStatus(){return s.Message.getFieldWithDefault(this,2,i.STATUS_UNDEFINED)}set invitationStatus(e){s.Message.setField(this,2,e)}static fromObject(e){const t=new g({});return null!=e.userID&&(t.userID=e.userID),null!=e.invitationStatus&&(t.invitationStatus=e.invitationStatus),t}toObject(){const e={};return null!=this.userID&&(e.userID=this.userID),null!=this.invitationStatus&&(e.invitationStatus=this.invitationStatus),e}serialize(e){const t=e||new s.BinaryWriter;if(this.userID.length&&t.writeString(1,this.userID),this.invitationStatus!=i.STATUS_UNDEFINED&&t.writeEnum(2,this.invitationStatus),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof s.BinaryReader?e:new s.BinaryReader(e),i=new g;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.userID=t.readString();break;case 2:i.invitationStatus=t.readEnum();break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return g.deserialize(e)}}e.UserInviteReponse=g;class f extends s.Message{#e=[];constructor(e){super(),s.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("fromBrand"in e&&null!=e.fromBrand&&(this.fromBrand=e.fromBrand),"toBrand"in e&&null!=e.toBrand&&(this.toBrand=e.toBrand))}get fromBrand(){return s.Message.getFieldWithDefault(this,1,r.Y.Brand.UNDEFINED_BRAND)}set fromBrand(e){s.Message.setField(this,1,e)}get toBrand(){return s.Message.getFieldWithDefault(this,2,r.Y.Brand.UNDEFINED_BRAND)}set toBrand(e){s.Message.setField(this,2,e)}static fromObject(e){const t=new f({});return null!=e.fromBrand&&(t.fromBrand=e.fromBrand),null!=e.toBrand&&(t.toBrand=e.toBrand),t}toObject(){const e={};return null!=this.fromBrand&&(e.fromBrand=this.fromBrand),null!=this.toBrand&&(e.toBrand=this.toBrand),e}serialize(e){const t=e||new s.BinaryWriter;if(this.fromBrand!=r.Y.Brand.UNDEFINED_BRAND&&t.writeEnum(1,this.fromBrand),this.toBrand!=r.Y.Brand.UNDEFINED_BRAND&&t.writeEnum(2,this.toBrand),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof s.BinaryReader?e:new s.BinaryReader(e),i=new f;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.fromBrand=t.readEnum();break;case 2:i.toBrand=t.readEnum();break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return f.deserialize(e)}}e.ConnectApplicationReq=f}(n||(n={}))},82224:(e,t,i)=>{i.d(t,{Y:()=>s});var r=i(67186);let s;!function(e){let t=function(e){return e[e.UNDEFINED_BRAND=0]="UNDEFINED_BRAND",e[e.rabbitloader=1]="rabbitloader",e[e.dofollow=2]="dofollow",e}({});e.Brand=t;let i=function(e){return e[e.AUDIENCE_UNDEFINED=0]="AUDIENCE_UNDEFINED",e[e.AUDIENCE_RL_WP_PLUGIN=1]="AUDIENCE_RL_WP_PLUGIN",e[e.AUDIENCE_RL_DASHBOARD=2]="AUDIENCE_RL_DASHBOARD",e[e.AUDIENCE_DF_DASHBOARD=3]="AUDIENCE_DF_DASHBOARD",e[e.AUDIENCE_CF_WORKER=4]="AUDIENCE_CF_WORKER",e}({});e.Audience=i;let s=function(e){return e[e.CURRENCY_UNDEFINED=0]="CURRENCY_UNDEFINED",e[e.CURRENCY_USD=1]="CURRENCY_USD",e[e.CURRENCY_INR=2]="CURRENCY_INR",e}({});e.Currency=s;let n=function(e){return e[e.UNDEFINED_PLATFORM=0]="UNDEFINED_PLATFORM",e[e.wp=1]="wp",e[e.shopify=2]="shopify",e[e.phpsdk=3]="phpsdk",e[e.laravel=4]="laravel",e}({});e.PlatformID=n;class a extends r.Message{#e=[];constructor(e){super(),r.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("countryCode"in e&&null!=e.countryCode&&(this.countryCode=e.countryCode),"region"in e&&null!=e.region&&(this.region=e.region),"city"in e&&null!=e.city&&(this.city=e.city),"ipAddress"in e&&null!=e.ipAddress&&(this.ipAddress=e.ipAddress),"userAgent"in e&&null!=e.userAgent&&(this.userAgent=e.userAgent),"zip"in e&&null!=e.zip&&(this.zip=e.zip))}get countryCode(){return r.Message.getFieldWithDefault(this,1,"")}set countryCode(e){r.Message.setField(this,1,e)}get region(){return r.Message.getFieldWithDefault(this,2,"")}set region(e){r.Message.setField(this,2,e)}get city(){return r.Message.getFieldWithDefault(this,3,"")}set city(e){r.Message.setField(this,3,e)}get ipAddress(){return r.Message.getFieldWithDefault(this,4,"")}set ipAddress(e){r.Message.setField(this,4,e)}get userAgent(){return r.Message.getFieldWithDefault(this,5,"")}set userAgent(e){r.Message.setField(this,5,e)}get zip(){return r.Message.getFieldWithDefault(this,6,"")}set zip(e){r.Message.setField(this,6,e)}static fromObject(e){const t=new a({});return null!=e.countryCode&&(t.countryCode=e.countryCode),null!=e.region&&(t.region=e.region),null!=e.city&&(t.city=e.city),null!=e.ipAddress&&(t.ipAddress=e.ipAddress),null!=e.userAgent&&(t.userAgent=e.userAgent),null!=e.zip&&(t.zip=e.zip),t}toObject(){const e={};return null!=this.countryCode&&(e.countryCode=this.countryCode),null!=this.region&&(e.region=this.region),null!=this.city&&(e.city=this.city),null!=this.ipAddress&&(e.ipAddress=this.ipAddress),null!=this.userAgent&&(e.userAgent=this.userAgent),null!=this.zip&&(e.zip=this.zip),e}serialize(e){const t=e||new r.BinaryWriter;if(this.countryCode.length&&t.writeString(1,this.countryCode),this.region.length&&t.writeString(2,this.region),this.city.length&&t.writeString(3,this.city),this.ipAddress.length&&t.writeString(4,this.ipAddress),this.userAgent.length&&t.writeString(5,this.userAgent),this.zip.length&&t.writeString(6,this.zip),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof r.BinaryReader?e:new r.BinaryReader(e),i=new a;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.countryCode=t.readString();break;case 2:i.region=t.readString();break;case 3:i.city=t.readString();break;case 4:i.ipAddress=t.readString();break;case 5:i.userAgent=t.readString();break;case 6:i.zip=t.readString();break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return a.deserialize(e)}}e.DeviceLocation=a;class l extends r.Message{#e=[];constructor(e){super(),r.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("code"in e&&null!=e.code&&(this.code=e.code),"message"in e&&null!=e.message&&(this.message=e.message))}get code(){return r.Message.getFieldWithDefault(this,1,"")}set code(e){r.Message.setField(this,1,e)}get message(){return r.Message.getFieldWithDefault(this,2,"")}set message(e){r.Message.setField(this,2,e)}static fromObject(e){const t=new l({});return null!=e.code&&(t.code=e.code),null!=e.message&&(t.message=e.message),t}toObject(){const e={};return null!=this.code&&(e.code=this.code),null!=this.message&&(e.message=this.message),e}serialize(e){const t=e||new r.BinaryWriter;if(this.code.length&&t.writeString(1,this.code),this.message.length&&t.writeString(2,this.message),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof r.BinaryReader?e:new r.BinaryReader(e),i=new l;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.code=t.readString();break;case 2:i.message=t.readString();break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return l.deserialize(e)}}e.Error=l;class o extends r.Message{#e=[];constructor(e){super(),r.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("cents"in e&&null!=e.cents&&(this.cents=e.cents),"currency"in e&&null!=e.currency&&(this.currency=e.currency))}get cents(){return r.Message.getFieldWithDefault(this,1,0)}set cents(e){r.Message.setField(this,1,e)}get currency(){return r.Message.getFieldWithDefault(this,2,s.CURRENCY_UNDEFINED)}set currency(e){r.Message.setField(this,2,e)}static fromObject(e){const t=new o({});return null!=e.cents&&(t.cents=e.cents),null!=e.currency&&(t.currency=e.currency),t}toObject(){const e={};return null!=this.cents&&(e.cents=this.cents),null!=this.currency&&(e.currency=this.currency),e}serialize(e){const t=e||new r.BinaryWriter;if(0!=this.cents&&t.writeInt64(1,this.cents),this.currency!=s.CURRENCY_UNDEFINED&&t.writeEnum(2,this.currency),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof r.BinaryReader?e:new r.BinaryReader(e),i=new o;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.cents=t.readInt64();break;case 2:i.currency=t.readEnum();break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return o.deserialize(e)}}e.Money=o;class u extends r.Message{#e=[];constructor(e){super(),r.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[],this.#e),Array.isArray(e)||"object"!=typeof e||("source"in e&&null!=e.source&&(this.source=e.source),"target"in e&&null!=e.target&&(this.target=e.target),"medium"in e&&null!=e.medium&&(this.medium=e.medium),"campaign"in e&&null!=e.campaign&&(this.campaign=e.campaign),"term"in e&&null!=e.term&&(this.term=e.term),"content"in e&&null!=e.content&&(this.content=e.content))}get source(){return r.Message.getFieldWithDefault(this,1,"")}set source(e){r.Message.setField(this,1,e)}get target(){return r.Message.getFieldWithDefault(this,2,"")}set target(e){r.Message.setField(this,2,e)}get medium(){return r.Message.getFieldWithDefault(this,3,"")}set medium(e){r.Message.setField(this,3,e)}get campaign(){return r.Message.getFieldWithDefault(this,4,"")}set campaign(e){r.Message.setField(this,4,e)}get term(){return r.Message.getFieldWithDefault(this,5,"")}set term(e){r.Message.setField(this,5,e)}get content(){return r.Message.getFieldWithDefault(this,6,"")}set content(e){r.Message.setField(this,6,e)}static fromObject(e){const t=new u({});return null!=e.source&&(t.source=e.source),null!=e.target&&(t.target=e.target),null!=e.medium&&(t.medium=e.medium),null!=e.campaign&&(t.campaign=e.campaign),null!=e.term&&(t.term=e.term),null!=e.content&&(t.content=e.content),t}toObject(){const e={};return null!=this.source&&(e.source=this.source),null!=this.target&&(e.target=this.target),null!=this.medium&&(e.medium=this.medium),null!=this.campaign&&(e.campaign=this.campaign),null!=this.term&&(e.term=this.term),null!=this.content&&(e.content=this.content),e}serialize(e){const t=e||new r.BinaryWriter;if(this.source.length&&t.writeString(1,this.source),this.target.length&&t.writeString(2,this.target),this.medium.length&&t.writeString(3,this.medium),this.campaign.length&&t.writeString(4,this.campaign),this.term.length&&t.writeString(5,this.term),this.content.length&&t.writeString(6,this.content),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof r.BinaryReader?e:new r.BinaryReader(e),i=new u;for(;t.nextField()&&!t.isEndGroup();)switch(t.getFieldNumber()){case 1:i.source=t.readString();break;case 2:i.target=t.readString();break;case 3:i.medium=t.readString();break;case 4:i.campaign=t.readString();break;case 5:i.term=t.readString();break;case 6:i.content=t.readString();break;default:t.skipField()}return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return u.deserialize(e)}}e.UrchinTracking=u;class d extends r.Message{#e=[];constructor(e){super(),r.Message.initialize(this,Array.isArray(e)?e:[],0,-1,[1],this.#e),Array.isArray(e)||"object"!=typeof e||"values"in e&&null!=e.values&&(this.values=e.values)}get values(){return r.Message.getFieldWithDefault(this,1,[])}set values(e){r.Message.setField(this,1,e)}static fromObject(e){const t=new d({});return null!=e.values&&(t.values=e.values),t}toObject(){const e={};return null!=this.values&&(e.values=this.values),e}serialize(e){const t=e||new r.BinaryWriter;if(this.values.length&&t.writeRepeatedString(1,this.values),!e)return t.getResultBuffer()}static deserialize(e){const t=e instanceof r.BinaryReader?e:new r.BinaryReader(e),i=new d;for(;t.nextField()&&!t.isEndGroup();)1===t.getFieldNumber()?r.Message.addToRepeatedField(i,1,t.readString()):t.skipField();return i}serializeBinary(){return this.serialize()}static deserializeBinary(e){return d.deserialize(e)}}e.Strings=d}(s||(s={}))}}]);