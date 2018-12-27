window.google = window["google"] || {};google.friendconnect = google.friendconnect_ || {};if (!window['__ps_loaded__']) {var gadgets=gadgets||{};
gadgets.config=function(){var A=[];
return{register:function(D,C,B){var E=A[D];
if(!E){E=[];
A[D]=E
}E.push({validators:C||{},callback:B})
},get:function(B){if(B){return configuration[B]||{}
}return configuration
},init:function(D,K){configuration=D;
for(var B in A){if(A.hasOwnProperty(B)){var C=A[B],H=D[B];
for(var G=0,F=C.length;
G<F;
++G){var I=C[G];
if(H&&!K){var E=I.validators;
for(var J in E){if(E.hasOwnProperty(J)){if(!E[J](H[J])){throw new Error('Invalid config value "'+H[J]+'" for parameter "'+J+'" in component "'+B+'"')
}}}}if(I.callback){I.callback(D)
}}}}},EnumValidator:function(E){var D=[];
if(arguments.length>1){for(var C=0,B;
(B=arguments[C]);
++C){D.push(B)
}}else{D=E
}return function(G){for(var F=0,H;
(H=D[F]);
++F){if(G===D[F]){return true
}}}
},RegExValidator:function(B){return function(C){return B.test(C)
}
},ExistsValidator:function(B){return typeof B!=="undefined"
},NonEmptyStringValidator:function(B){return typeof B==="string"&&B.length>0
},BooleanValidator:function(B){return typeof B==="boolean"
},LikeValidator:function(B){return function(D){for(var E in B){if(B.hasOwnProperty(E)){var C=B[E];
if(!C(D[E])){return false
}}}return true
}
}}
}();;
var gadgets=gadgets||{};
gadgets.log=function(A){gadgets.log.logAtLevel(gadgets.log.INFO,A)
};
gadgets.warn=function(A){gadgets.log.logAtLevel(gadgets.log.WARNING,A)
};
gadgets.error=function(A){gadgets.log.logAtLevel(gadgets.log.ERROR,A)
};
gadgets.setLogLevel=function(A){gadgets.log.logLevelThreshold_=A
};
gadgets.log.logAtLevel=function(D,C){if(D<gadgets.log.logLevelThreshold_||!gadgets.log._console){return 
}var B;
var A=gadgets.log._console;
if(D==gadgets.log.WARNING&&A.warn){A.warn(C)
}else{if(D==gadgets.log.ERROR&&A.error){A.error(C)
}else{if(A.log){A.log(C)
}}}};
gadgets.log.INFO=1;
gadgets.log.WARNING=2;
gadgets.log.NONE=4;
gadgets.log.logLevelThreshold_=gadgets.log.INFO;
gadgets.log._console=window.console?window.console:window.opera?window.opera.postError:undefined;;
var tamings___=tamings___||[];
tamings___.push(function(A){___.grantRead(gadgets.log,"INFO");
___.grantRead(gadgets.log,"WARNING");
___.grantRead(gadgets.log,"ERROR");
___.grantRead(gadgets.log,"NONE");
caja___.whitelistFuncs([[gadgets,"log"],[gadgets,"warn"],[gadgets,"error"],[gadgets,"setLogLevel"],[gadgets.log,"logAtLevel"],])
});;
var gadgets=gadgets||{};
if(window.JSON&&window.JSON.parse&&window.JSON.stringify){gadgets.json={parse:function(B){try{return window.JSON.parse(B)
}catch(A){return false
}},stringify:function(B){try{return window.JSON.stringify(B)
}catch(A){return null
}}}
}else{gadgets.json=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",f(this.getUTCMonth()+1),"-",f(this.getUTCDate()),"T",f(this.getUTCHours()),":",f(this.getUTCMinutes()),":",f(this.getUTCSeconds()),"Z"].join("")
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;
switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c
}c=a.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}a=[];
if(typeof value.length==="number"&&!value.propertyIsEnumerable("length")){l=value.length;
for(i=0;
i<l;
i+=1){a.push(stringify(value[i])||"null")
}return"["+a.join(",")+"]"
}for(k in value){if(k.match("___$")){continue
}if(value.hasOwnProperty(k)){if(typeof k==="string"){v=stringify(value[k]);
if(v){a.push(stringify(k)+":"+v)
}}}}return"{"+a.join(",")+"}"
}}return{stringify:stringify,parse:function(text){if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return eval("("+text+")")
}return false
}}
}()
};;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.json,"parse"],[gadgets.json,"stringify"]])
});;
var gadgets=gadgets||{};
gadgets.util=function(){function G(L){var M;
var K=L;
var I=K.indexOf("?");
var J=K.indexOf("#");
if(J===-1){M=K.substr(I+1)
}else{M=[K.substr(I+1,J-I-1),"&",K.substr(J+1)].join("")
}return M.split("&")
}var E=null;
var D={};
var C={};
var F=[];
var A={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true};
function B(I,J){return String.fromCharCode(J)
}function H(I){D=I["core.util"]||{}
}if(gadgets.config){gadgets.config.register("core.util",null,H)
}return{getUrlParameters:function(Q){if(E!==null&&typeof Q==="undefined"){return E
}var M={};
E={};
var J=G(Q||document.location.href);
var O=window.decodeURIComponent?decodeURIComponent:unescape;
for(var L=0,K=J.length;
L<K;
++L){var N=J[L].indexOf("=");
if(N===-1){continue
}var I=J[L].substring(0,N);
var P=J[L].substring(N+1);
P=P.replace(/\+/g," ");
M[I]=O(P)
}if(typeof Q==="undefined"){E=M
}return M
},makeClosure:function(L,N,M){var K=[];
for(var J=2,I=arguments.length;
J<I;
++J){K.push(arguments[J])
}return function(){var O=K.slice();
for(var Q=0,P=arguments.length;
Q<P;
++Q){O.push(arguments[Q])
}return N.apply(L,O)
}
},makeEnum:function(J){var L={};
for(var K=0,I;
(I=J[K]);
++K){L[I]=I
}return L
},getFeatureParameters:function(I){return typeof D[I]==="undefined"?null:D[I]
},hasFeature:function(I){return typeof D[I]!=="undefined"
},getServices:function(){return C
},registerOnLoadHandler:function(I){F.push(I)
},runOnLoadHandlers:function(){for(var J=0,I=F.length;
J<I;
++J){F[J]()
}},escape:function(I,M){if(!I){return I
}else{if(typeof I==="string"){return gadgets.util.escapeString(I)
}else{if(typeof I==="array"){for(var L=0,J=I.length;
L<J;
++L){I[L]=gadgets.util.escape(I[L])
}}else{if(typeof I==="object"&&M){var K={};
for(var N in I){if(I.hasOwnProperty(N)){K[gadgets.util.escapeString(N)]=gadgets.util.escape(I[N],true)
}}return K
}}}}return I
},escapeString:function(M){var J=[],L,N;
for(var K=0,I=M.length;
K<I;
++K){L=M.charCodeAt(K);
N=A[L];
if(N===true){J.push("&#",L,";")
}else{if(N!==false){J.push(M.charAt(K))
}}}return J.join("")
},unescapeString:function(I){return I.replace(/&#([0-9]+);/g,B)
}}
}();
gadgets.util.getUrlParameters();;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.util,"escapeString"],[gadgets.util,"getFeatureParameters"],[gadgets.util,"hasFeature"],[gadgets.util,"registerOnLoadHandler"],[gadgets.util,"unescapeString"]])
});;
var gadgets=gadgets||{};
gadgets.rpctx=gadgets.rpctx||{};
gadgets.rpctx.wpm=function(){var A;
return{getCode:function(){return"wpm"
},isParentVerifiable:function(){return true
},init:function(B,C){A=C;
var D=function(E){B(gadgets.json.parse(E.data))
};
if(typeof window.addEventListener!="undefined"){window.addEventListener("message",D,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onmessage",D)
}}A("..",true);
return true
},setup:function(C,B){if(C===".."){gadgets.rpc.call(C,gadgets.rpc.ACK)
}return true
},call:function(C,G,F){var E=gadgets.rpc._getTargetWin(C);
var D=gadgets.rpc.getRelayUrl(C)||gadgets.util.getUrlParameters()["parent"];
var B=gadgets.rpc.getOrigin(D);
if(B){E.postMessage(gadgets.json.stringify(F),B)
}else{gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message")
}return true
}}
}();;
var gadgets=gadgets||{};
gadgets.rpctx=gadgets.rpctx||{};
gadgets.rpctx.frameElement=function(){var E="__g2c_rpc";
var B="__c2g_rpc";
var D;
var C;
function A(G,K,J){try{if(K!==".."){var F=window.frameElement;
if(typeof F[E]==="function"){if(typeof F[E][B]!=="function"){F[E][B]=function(L){D(gadgets.json.parse(L))
}
}F[E](gadgets.json.stringify(J));
return 
}}else{var I=document.getElementById(G);
if(typeof I[E]==="function"&&typeof I[E][B]==="function"){I[E][B](gadgets.json.stringify(J));
return 
}}}catch(H){}return true
}return{getCode:function(){return"fe"
},isParentVerifiable:function(){return false
},init:function(F,G){D=F;
C=G;
return true
},setup:function(J,F){if(J!==".."){try{var I=document.getElementById(J);
I[E]=function(K){D(gadgets.json.parse(K))
}
}catch(H){return false
}}if(J===".."){C("..",true);
var G=function(){window.setTimeout(function(){gadgets.rpc.call(J,gadgets.rpc.ACK)
},500)
};
gadgets.util.registerOnLoadHandler(G)
}return true
},call:function(F,H,G){A(F,H,G)
}}
}();;
var gadgets=gadgets||{};
gadgets.rpctx=gadgets.rpctx||{};
gadgets.rpctx.nix=function(){var C="GRPC____NIXVBS_wrapper";
var D="GRPC____NIXVBS_get_wrapper";
var F="GRPC____NIXVBS_handle_message";
var B="GRPC____NIXVBS_create_channel";
var A=10;
var J=500;
var I={};
var H;
var G=0;
function E(){var L=I[".."];
if(L){return 
}if(++G>A){gadgets.warn("Nix transport setup failed, falling back...");
H("..",false);
return 
}if(!L&&window.opener&&"GetAuthToken" in window.opener){L=window.opener;
if(L.GetAuthToken()==gadgets.rpc.getAuthToken("..")){var K=gadgets.rpc.getAuthToken("..");
L.CreateChannel(window[D]("..",K),K);
I[".."]=L;
window.opener=null;
H("..",true);
return 
}}window.setTimeout(function(){E()
},J)
}return{getCode:function(){return"nix"
},isParentVerifiable:function(){return false
},init:function(L,M){H=M;
if(typeof window[D]!=="unknown"){window[F]=function(O){window.setTimeout(function(){L(gadgets.json.parse(O))
},0)
};
window[B]=function(O,Q,P){if(gadgets.rpc.getAuthToken(O)===P){I[O]=Q;
H(O,true)
}};
var K="Class "+C+"\n Private m_Intended\nPrivate m_Auth\nPublic Sub SetIntendedName(name)\n If isEmpty(m_Intended) Then\nm_Intended = name\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\n If isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Sub SendMessage(data)\n "+F+"(data)\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub CreateChannel(channel, auth)\n Call "+B+"(m_Intended, channel, auth)\nEnd Sub\nEnd Class\nFunction "+D+"(name, auth)\nDim wrap\nSet wrap = New "+C+"\nwrap.SetIntendedName name\nwrap.SetAuth auth\nSet "+D+" = wrap\nEnd Function";
try{window.execScript(K,"vbscript")
}catch(N){return false
}}return true
},setup:function(O,K){if(O===".."){E();
return true
}try{var M=document.getElementById(O);
var N=window[D](O,K);
M.contentWindow.opener=N
}catch(L){return false
}return true
},call:function(K,N,M){try{if(I[K]){I[K].SendMessage(gadgets.json.stringify(M))
}}catch(L){return false
}return true
}}
}();;
var gadgets=gadgets||{};
gadgets.rpctx=gadgets.rpctx||{};
gadgets.rpctx.rmr=function(){var G=500;
var E=10;
var H={};
var B;
var I;
function K(P,N,O,M){var Q=function(){document.body.appendChild(P);
P.src="about:blank";
if(M){P.onload=function(){L(M)
}
}P.src=N+"#"+O
};
if(document.body){Q()
}else{gadgets.util.registerOnLoadHandler(function(){Q()
})
}}function C(O){if(typeof H[O]==="object"){return 
}var P=document.createElement("iframe");
var M=P.style;
M.position="absolute";
M.top="0px";
M.border="0";
M.opacity="0";
M.width="10px";
M.height="1px";
P.id="rmrtransport-"+O;
P.name=P.id;
var N=gadgets.rpc.getRelayUrl(O);
if(!N){N=gadgets.rpc.getOrigin(gadgets.util.getUrlParameters()["parent"])+"/robots.txt"
}H[O]={frame:P,receiveWindow:null,relayUri:N,searchCounter:0,width:10,waiting:true,queue:[],sendId:0,recvId:0};
if(O!==".."){K(P,N,A(O))
}D(O)
}function D(O){var Q=null;
H[O].searchCounter++;
try{var N=gadgets.rpc._getTargetWin(O);
if(O===".."){Q=N.frames["rmrtransport-"+gadgets.rpc.RPC_ID]
}else{Q=N.frames["rmrtransport-.."]
}}catch(P){}var M=false;
if(Q){M=F(O,Q)
}if(!M){if(H[O].searchCounter>E){return 
}window.setTimeout(function(){D(O)
},G)
}}function J(N,P,T,S){var O=null;
if(T!==".."){O=H[".."]
}else{O=H[N]
}if(O){if(P!==gadgets.rpc.ACK){O.queue.push(S)
}if(O.waiting||(O.queue.length===0&&!(P===gadgets.rpc.ACK&&S&&S.ackAlone===true))){return true
}if(O.queue.length>0){O.waiting=true
}var M=O.relayUri+"#"+A(N);
try{O.frame.contentWindow.location=M;
var Q=O.width==10?20:10;
O.frame.style.width=Q+"px";
O.width=Q
}catch(R){return false
}}return true
}function A(N){var O=H[N];
var M={id:O.sendId};
if(O){M.d=Array.prototype.slice.call(O.queue,0);
M.d.push({s:gadgets.rpc.ACK,id:O.recvId})
}return gadgets.json.stringify(M)
}function L(X){var U=H[X];
var Q=U.receiveWindow.location.hash.substring(1);
var Y=gadgets.json.parse(decodeURIComponent(Q))||{};
var N=Y.d||[];
var O=false;
var T=false;
var V=0;
var M=(U.recvId-Y.id);
for(var P=0;
P<N.length;
++P){var S=N[P];
if(S.s===gadgets.rpc.ACK){I(X,true);
if(U.waiting){T=true
}U.waiting=false;
var R=Math.max(0,S.id-U.sendId);
U.queue.splice(0,R);
U.sendId=Math.max(U.sendId,S.id||0);
continue
}O=true;
if(++V<=M){continue
}++U.recvId;
B(S)
}if(O||(T&&U.queue.length>0)){var W=(X==="..")?gadgets.rpc.RPC_ID:"..";
J(X,gadgets.rpc.ACK,W,{ackAlone:O})
}}function F(P,S){var O=H[P];
try{var N=false;
N="document" in S;
if(!N){return false
}N=typeof S.document=="object";
if(!N){return false
}var R=S.location.href;
if(R==="about:blank"){return false
}}catch(M){return false
}O.receiveWindow=S;
function Q(){L(P)
}if(typeof S.attachEvent==="undefined"){S.onresize=Q
}else{S.attachEvent("onresize",Q)
}if(P===".."){K(O.frame,O.relayUri,A(P),P)
}else{L(P)
}return true
}return{getCode:function(){return"rmr"
},isParentVerifiable:function(){return true
},init:function(M,N){B=M;
I=N;
return true
},setup:function(O,M){try{C(O)
}catch(N){gadgets.warn("Caught exception setting up RMR: "+N);
return false
}return true
},call:function(M,O,N){return J(M,N.s,O,N)
}}
}();;
var gadgets=gadgets||{};
gadgets.rpctx=gadgets.rpctx||{};
gadgets.rpctx.ifpc=function(){var E=[];
var D=0;
var C;
function B(H){var F=[];
for(var I=0,G=H.length;
I<G;
++I){F.push(encodeURIComponent(gadgets.json.stringify(H[I])))
}return F.join("&")
}function A(I){var G;
for(var F=E.length-1;
F>=0;
--F){var J=E[F];
try{if(J&&(J.recyclable||J.readyState==="complete")){J.parentNode.removeChild(J);
if(window.ActiveXObject){E[F]=J=null;
E.splice(F,1)
}else{J.recyclable=false;
G=J;
break
}}}catch(H){}}if(!G){G=document.createElement("iframe");
G.style.border=G.style.width=G.style.height="0px";
G.style.visibility="hidden";
G.style.position="absolute";
G.onload=function(){this.recyclable=true
};
E.push(G)
}G.src=I;
window.setTimeout(function(){document.body.appendChild(G)
},0)
}return{getCode:function(){return"ifpc"
},isParentVerifiable:function(){return true
},init:function(F,G){C=G;
C("..",true);
return true
},setup:function(G,F){C(G,true);
return true
},call:function(F,K,I){var J=gadgets.rpc.getRelayUrl(F);
++D;
if(!J){gadgets.warn("No relay file assigned for IFPC");
return 
}var H=null;
if(I.l){var G=I.a;
H=[J,"#",B([K,D,1,0,B([K,I.s,"","",K].concat(G))])].join("")
}else{H=[J,"#",F,"&",K,"@",D,"&1&0&",encodeURIComponent(gadgets.json.stringify(I))].join("")
}A(H);
return true
}}
}();;
var gadgets=gadgets||{};
gadgets.rpc=function(){var T="__cb";
var S="";
var G="__ack";
var R=500;
var J=10;
var B={};
var C={};
var X={};
var K={};
var N=0;
var i={};
var W={};
var D={};
var f={};
var L={};
var V={};
var M=(window.top!==window.self);
var O=window.name;
var g=(function(){function j(k){return function(){gadgets.log("gadgets.rpc."+k+"("+gadgets.json.stringify(Array.prototype.slice.call(arguments))+"): call ignored. [caller: "+document.location+", isChild: "+M+"]")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:j("init"),setup:j("setup"),call:j("call")}
})();
if(gadgets.util){f=gadgets.util.getUrlParameters()
}var a=(f.rpc_earlyq==="1");
function A(){return typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?gadgets.rpctx.nix:navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc
}function b(o,m){var k=c;
if(!m){k=g
}L[o]=k;
var j=V[o]||[];
for(var l=0;
l<j.length;
++l){var n=j[l];
n.t=Y(o);
k.call(o,n.f,n)
}V[o]=[]
}function U(k){if(k&&typeof k.s==="string"&&typeof k.f==="string"&&k.a instanceof Array){if(K[k.f]){if(K[k.f]!==k.t){throw new Error("Invalid auth token. "+K[k.f]+" vs "+k.t)
}}if(k.s===G){window.setTimeout(function(){b(k.f,true)
},0);
return 
}if(k.c){k.callback=function(l){gadgets.rpc.call(k.f,T,null,k.c,l)
}
}var j=(B[k.s]||B[S]).apply(k,k.a);
if(k.c&&typeof j!=="undefined"){gadgets.rpc.call(k.f,T,null,k.c,j)
}}}function e(l){if(!l){return""
}l=l.toLowerCase();
if(l.indexOf("//")==0){l=window.location.protocol+l
}if(l.indexOf("://")==-1){l=window.location.protocol+"//"+l
}var m=l.substring(l.indexOf("://")+3);
var j=m.indexOf("/");
if(j!=-1){m=m.substring(0,j)
}var o=l.substring(0,l.indexOf("://"));
var n="";
var p=m.indexOf(":");
if(p!=-1){var k=m.substring(p+1);
m=m.substring(0,p);
if((o==="http"&&k!=="80")||(o==="https"&&k!=="443")){n=":"+k
}}return o+"://"+m+n
}function I(k){if(typeof k==="undefined"||k===".."){return window.parent
}k=String(k);
var j=window.frames[k];
if(j){return j
}j=document.getElementById(k);
if(j&&j.contentWindow){return j.contentWindow
}return null
}var c=A();
B[S]=function(){gadgets.warn("Unknown RPC service: "+this.s)
};
B[T]=function(k,j){var l=i[k];
if(l){delete i[k];
l(j)
}};
function P(l,j){if(W[l]===true){return 
}if(typeof W[l]==="undefined"){W[l]=0
}var k=document.getElementById(l);
if(l===".."||k!=null){if(c.setup(l,j)===true){W[l]=true;
return 
}}if(W[l]!==true&&W[l]++<J){window.setTimeout(function(){P(l,j)
},R)
}else{L[l]=g;
W[l]=true
}}function F(k,n){if(typeof D[k]==="undefined"){D[k]=false;
var m=gadgets.rpc.getRelayUrl(k);
if(e(m)!==e(window.location.href)){return false
}var l=I(k);
try{D[k]=l.gadgets.rpc.receiveSameDomain
}catch(j){gadgets.error("Same domain call failed: parent= incorrectly set.")
}}if(typeof D[k]==="function"){D[k](n);
return true
}return false
}function H(k,j,l){C[k]=j;
X[k]=!!l
}function Y(j){return K[j]
}function E(j,k){k=k||"";
K[j]=String(k);
P(j,k)
}function Q(j){function l(o){var q=o?o.rpc:{};
var n=q.parentRelayUrl;
if(n.substring(0,7)!=="http://"&&n.substring(0,8)!=="https://"&&n.substring(0,2)!=="//"){if(typeof f.parent==="string"&&f.parent!==""){if(n.substring(0,1)!=="/"){var m=f.parent.lastIndexOf("/");
n=f.parent.substring(0,m+1)+n
}else{n=e(f.parent)+n
}}}var p=!!q.useLegacyProtocol;
H("..",n,p);
if(p){c=gadgets.rpctx.ifpc;
c.init(U,b)
}E("..",j)
}var k={parentRelayUrl:gadgets.config.NonEmptyStringValidator};
gadgets.config.register("rpc",k,l)
}function Z(l,j){var k=j||f.parent;
if(k){H("..",k);
E("..",l)
}}function d(j,n,p){if(!gadgets.util){return 
}var m=document.getElementById(j);
if(!m){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+j+", element not found.")
}var k=n||m.src;
H(j,k);
var o=gadgets.util.getUrlParameters(m.src);
var l=p||o.rpctoken;
E(j,l)
}function h(j,l,m){if(j===".."){var k=m||f.rpctoken||f.ifpctok||"";
if(gadgets.config){Q(k)
}else{Z(k,l)
}}else{d(j,l,m)
}}return{register:function(k,j){if(k===T||k===G){throw new Error("Cannot overwrite callback/ack service")
}if(k===S){throw new Error("Cannot overwrite default service: use registerDefault")
}B[k]=j
},unregister:function(j){if(j===T||j===G){throw new Error("Cannot delete callback/ack service")
}if(j===S){throw new Error("Cannot delete default service: use unregisterDefault")
}delete B[j]
},registerDefault:function(j){B[S]=j
},unregisterDefault:function(){delete B[S]
},forceParentVerifiable:function(){if(!c.isParentVerifiable()){c=gadgets.rpctx.ifpc
}},call:function(j,k,p,n){j=j||"..";
var o="..";
if(j===".."){o=O
}++N;
if(p){i[N]=p
}var m={s:k,f:o,c:p?N:0,a:Array.prototype.slice.call(arguments,3),t:K[j],l:X[j]};
if(j!==".."&&!document.getElementById(j)){gadgets.log("WARNING: attempted send to nonexistent frame: "+j);
return 
}if(F(j,m)){return 
}var l=L[j]?L[j]:c;
if(!l){if(!V[j]){V[j]=[m]
}else{V[j].push(m)
}return 
}if(X[j]){l=gadgets.rpctx.ifpc
}if(l.call(j,o,m)===false){L[j]=g;
c.call(j,o,m)
}},getRelayUrl:function(k){var j=C[k];
if(j&&j.indexOf("//")==0){j=document.location.protocol+j
}return j
},setRelayUrl:H,setAuthToken:E,setupReceiver:h,getAuthToken:Y,getRelayChannel:function(){return c.getCode()
},receive:function(j){if(j.length>4){U(gadgets.json.parse(decodeURIComponent(j[j.length-1])))
}},receiveSameDomain:function(j){j.a=Array.prototype.slice.call(j.a);
window.setTimeout(function(){U(j)
},0)
},getOrigin:e,init:function(){if(c.init(U,b)===false){c=g
}if(M){h("..")
}},_getTargetWin:I,ACK:G,RPC_ID:O}
}();
gadgets.rpc.init();;
var friendconnect_serverBase = "http://www.google.com";var friendconnect_loginUrl = "https://www.google.com/accounts";var friendconnect_gadgetPrefix = "http://www.friendconnect.gmodules.com/gadgets";
var friendconnect_serverVersion = "0.499.5";
var friendconnect_imageUrl = "http://www.google.com/friendconnect/scs/images";
var friendconnect_lightbox = true;
function fca(a){throw a;}var fcb=true,fcc=null,fcd=false,fce=gadgets,fcaa=undefined,fcf=friendconnect_serverBase,fcg=encodeURIComponent,fcba=parseInt,fch=String,fci=window,fcca=setTimeout,fcj=Object,fck=document,fcl=Math;function fcda(a,b){return a.toString=b}function fcea(a,b){return a.length=b}function fcfa(a,b){return a.className=b}function fcm(a,b){return a.width=b}function fcn(a,b){return a.innerHTML=b}function fco(a,b){return a.height=b}
var fcp="appendChild",fcq="push",fcr="length",fcga="propertyIsEnumerable",fcha="stringify",fc="prototype",fcia="test",fcs="width",fct="round",fcu="slice",fcv="replace",fcw="document",fcja="data",fcx="split",fcy="getElementById",fcka="offsetWidth",fcz="charAt",fcA="location",fcB="getUrlParameters",fcC="indexOf",fcla="Dialog",fcD="style",fcma="body",fcE="left",fcF="call",fcG="match",fcH="options",fcna="random",fcI="createElement",fcJ="json",fcoa="addEventListener",fcpa="bottom",fcK="setAttribute",fcqa=
"href",fcL="util",fcra="maxHeight",fcsa="type",fcM="apply",fcta="reset",fcN="name",fcO="parentNode",fcua="display",fcP="height",fcva="offsetHeight",fcQ="register",fcR="join",fcwa="toLowerCase",fcS="right",goog=goog||{},fcT=this,fcya=function(a,b,c){a=a[fcx](".");c=c||fcT;!(a[0]in c)&&c.execScript&&c.execScript("var "+a[0]);for(var d;a[fcr]&&(d=a.shift());)if(!a[fcr]&&fcxa(b))c[d]=b;else c=c[d]?c[d]:(c[d]={})},fcza=function(a){var b=typeof a;if(b=="object")if(a){if(a instanceof Array||!(a instanceof
fcj)&&fcj[fc].toString[fcF](a)=="[object Array]"||typeof a[fcr]=="number"&&typeof a.splice!="undefined"&&typeof a[fcga]!="undefined"&&!a[fcga]("splice"))return"array";if(!(a instanceof fcj)&&(fcj[fc].toString[fcF](a)=="[object Function]"||typeof a[fcF]!="undefined"&&typeof a[fcga]!="undefined"&&!a[fcga]("call")))return"function"}else return"null";else if(b=="function"&&typeof a[fcF]=="undefined")return"object";return b},fcxa=function(a){return a!==fcaa},fcAa=function(a){var b=fcza(a);return b=="array"||
b=="object"&&typeof a[fcr]=="number"},fcU=function(a){return typeof a=="string"},fcBa=function(a){a=fcza(a);return a=="object"||a=="array"||a=="function"};"closure_hashCode_"+fcl.floor(fcl[fcna]()*2147483648).toString(36);
var fcV=function(a){var b=fcza(a);if(b=="object"||b=="array"){if(a.clone)return a.clone[fcF](a);b=b=="array"?[]:{};for(var c in a)b[c]=fcV(a[c]);return b}return a},fcW=function(a,b){var c=b||fcT;if(arguments[fcr]>2){var d=Array[fc][fcu][fcF](arguments,2);return function(){var e=Array[fc][fcu][fcF](arguments);Array[fc].unshift[fcM](e,d);return a[fcM](c,e)}}else return function(){return a[fcM](c,arguments)}},fcCa=function(a){var b=Array[fc][fcu][fcF](arguments,1);return function(){var c=Array[fc][fcu][fcF](arguments);
c.unshift[fcM](c,b);return a[fcM](this,c)}},fcDa=function(a,b){for(var c in b)a[c]=b[c]},fcEa=Date.now||function(){return+new Date},fcX=function(a,b,c){fcya(a,b,c)},fcY=function(a,b){function c(){}c.prototype=b[fc];a.Fc=b[fc];a.prototype=new c;a[fc].constructor=a};SHA1=function(){this.c=new Array(5);this.Z=new Array(64);this.wc=new Array(80);this.oa=new Array(64);this.oa[0]=128;for(var a=1;a<64;++a)this.oa[a]=0;this[fcta]()};SHA1[fc].reset=function(){this.c[0]=1732584193;this.c[1]=4023233417;this.c[2]=2562383102;this.c[3]=271733878;this.c[4]=3285377520;this.va=this.w=0};SHA1[fc].ta=function(a,b){return(a<<b|a>>>32-b)&4294967295};
SHA1[fc].I=function(a){for(var b=this.wc,c=0;c<64;c+=4){var d=a[c]<<24|a[c+1]<<16|a[c+2]<<8|a[c+3];b[c/4]=d}for(c=16;c<80;++c)b[c]=this.ta(b[c-3]^b[c-8]^b[c-14]^b[c-16],1);a=this.c[0];d=this.c[1];var e=this.c[2],j=this.c[3],h=this.c[4],i,k;for(c=0;c<80;++c){if(c<40)if(c<20){i=j^d&(e^j);k=1518500249}else{i=d^e^j;k=1859775393}else if(c<60){i=d&e|j&(d|e);k=2400959708}else{i=d^e^j;k=3395469782}i=this.ta(a,5)+i+h+k+b[c]&4294967295;h=j;j=e;e=this.ta(d,30);d=a;a=i}this.c[0]=this.c[0]+a&4294967295;this.c[1]=
this.c[1]+d&4294967295;this.c[2]=this.c[2]+e&4294967295;this.c[3]=this.c[3]+j&4294967295;this.c[4]=this.c[4]+h&4294967295};SHA1[fc].update=function(a,b){if(!b)b=a[fcr];var c=0;if(this.w==0)for(;c+64<b;){this.I(a[fcu](c,c+64));c+=64;this.va+=64}for(;c<b;){this.Z[this.w++]=a[c++];++this.va;if(this.w==64){this.w=0;for(this.I(this.Z);c+64<b;){this.I(a[fcu](c,c+64));c+=64;this.va+=64}}}};
SHA1[fc].digest=function(){var a=new Array(20),b=this.va*8;this.w<56?this.update(this.oa,56-this.w):this.update(this.oa,64-(this.w-56));for(var c=63;c>=56;--c){this.Z[c]=b&255;b>>>=8}this.I(this.Z);for(c=b=0;c<5;++c)for(var d=24;d>=0;d-=8)a[b++]=this.c[c]>>d&255;return a};G_HMAC=function(a,b,c){if(!a||typeof a!="object"||!a[fcta]||!a.update||!a.digest)fca(new Error("Invalid hasher object. Hasher unspecified or does not implement expected interface."));if(b.constructor!=Array)fca(new Error("Invalid key."));if(c&&typeof c!="number")fca(new Error("Invalid block size."));this.k=a;this.Y=c||16;this.Jb=new Array(this.Y);this.Ib=new Array(this.Y);if(b[fcr]>this.Y){this.k.update(b);b=this.k.digest()}for(c=0;c<this.Y;c++){a=c<b[fcr]?b[c]:0;this.Jb[c]=a^G_HMAC.OPAD;this.Ib[c]=
a^G_HMAC.IPAD}};G_HMAC.OPAD=92;G_HMAC.IPAD=54;G_HMAC[fc].reset=function(){this.k[fcta]();this.k.update(this.Ib)};G_HMAC[fc].update=function(a){if(a.constructor!=Array)fca(new Error("Invalid data. Data must be an array."));this.k.update(a)};G_HMAC[fc].digest=function(){var a=this.k.digest();this.k[fcta]();this.k.update(this.Jb);this.k.update(a);return this.k.digest()};G_HMAC[fc].wb=function(a){this[fcta]();this.update(a);return this.digest()};var fcFa=function(a){for(var b=[],c=0,d=0;d<a[fcr];d++){for(var e=a.charCodeAt(d);e>255;){b[c++]=e&255;e>>=8}b[c++]=e}return b};var fcGa=fcc,fcHa=fcc,fcIa=fcc,fcJa=fcc,fcLa=function(a,b){if(!fcAa(a))fca(Error("encodeByteArray takes an array as a parameter"));fcKa();b=b?fcIa:fcGa;for(var c=[],d=0;d<a[fcr];d+=3){var e=a[d],j=d+1<a[fcr],h=j?a[d+1]:0,i=d+2<a[fcr],k=i?a[d+2]:0,l=e>>2;e=(e&3)<<4|h>>4;h=(h&15)<<2|k>>6;k=k&63;if(!i){k=64;j||(h=64)}c[fcq](b[l],b[e],b[h],b[k])}return c[fcR]("")},fcMa=function(a,b){if(a[fcr]%4)fca(Error("Length of b64-encoded data must be zero mod four"));fcKa();b=b?fcJa:fcHa;for(var c=[],d=0;d<a[fcr];d+=
4){var e=b[a[fcz](d)],j=b[a[fcz](d+1)],h=b[a[fcz](d+2)],i=b[a[fcz](d+3)];if(e==fcc||j==fcc||h==fcc||i==fcc)fca(Error());e=e<<2|j>>4;c[fcq](e);if(h!=64){j=j<<4&240|h>>2;c[fcq](j);if(i!=64){h=h<<6&192|i;c[fcq](h)}}}return c},fcKa=function(){if(!fcGa){fcGa={};fcHa={};fcIa={};fcJa={};for(var a=0;a<65;a++){fcGa[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[fcz](a);fcHa[fcGa[a]]=a;fcIa[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_."[fcz](a);fcJa[fcIa[a]]=
a}}};var fcNa=function(a){return a[fcv](/^[\s\xa0]+|[\s\xa0]+$/g,"")},fcOa=function(a,b){a=fch(a)[fcwa]();b=fch(b)[fcwa]();return a<b?-1:a==b?0:1},fcUa=function(a,b){if(b)return a[fcv](fcPa,"&amp;")[fcv](fcQa,"&lt;")[fcv](fcRa,"&gt;")[fcv](fcSa,"&quot;");else{if(!fcTa[fcia](a))return a;if(a[fcC]("&")!=-1)a=a[fcv](fcPa,"&amp;");if(a[fcC]("<")!=-1)a=a[fcv](fcQa,"&lt;");if(a[fcC](">")!=-1)a=a[fcv](fcRa,"&gt;");if(a[fcC]('"')!=-1)a=a[fcv](fcSa,"&quot;");return a}},fcPa=/&/g,fcQa=/</g,fcRa=/>/g,fcSa=/\"/g,
fcTa=/[&<>\"]/,fcVa=function(a,b){return a[fcC](b)!=-1},fcXa=function(a,b){var c=0;a=fcNa(fch(a))[fcx](".");b=fcNa(fch(b))[fcx](".");for(var d=fcl.max(a[fcr],b[fcr]),e=0;c==0&&e<d;e++){var j=a[e]||"",h=b[e]||"",i=new RegExp("(\\d*)(\\D*)","g"),k=new RegExp("(\\d*)(\\D*)","g");do{var l=i.exec(j)||["","",""],f=k.exec(h)||["","",""];if(l[0][fcr]==0&&f[0][fcr]==0)break;c=l[1][fcr]==0?0:fcba(l[1],10);var g=f[1][fcr]==0?0:fcba(f[1],10);c=fcWa(c,g)||fcWa(l[2][fcr]==0,f[2][fcr]==0)||fcWa(l[2],f[2])}while(c==
0)}return c},fcWa=function(a,b){if(a<b)return-1;else if(a>b)return 1;return 0};fcEa();var fcYa,fcZa,fc_a,fc0a,fc1a,fc2a,fc3a,fc4a,fc5a,fc6a=function(){return fcT.navigator?fcT.navigator.userAgent:fcc},fc7a=function(){return fcT.navigator},fc8a=function(){fc1a=fc0a=fc_a=fcZa=fcYa=fcd;var a;if(a=fc6a()){var b=fc7a();fcYa=a[fcC]("Opera")==0;fcZa=!fcYa&&a[fcC]("MSIE")!=-1;fc0a=(fc_a=!fcYa&&a[fcC]("WebKit")!=-1)&&a[fcC]("Mobile")!=-1;fc1a=!fcYa&&!fc_a&&b.product=="Gecko"}};fc8a();
var fc9a=fcYa,fcZ=fcZa,fc$a=fc1a,fc_=fc_a,fcab=fc0a,fcbb=function(){var a=fc7a();return a&&a.platform||""},fccb=fcbb(),fcdb=function(){fc2a=fcVa(fccb,"Mac");fc3a=fcVa(fccb,"Win");fc4a=fcVa(fccb,"Linux");fc5a=!!fc7a()&&fcVa(fc7a().appVersion||"","X11")};fcdb();
var fceb=function(){var a="",b;if(fc9a&&fcT.opera){a=fcT.opera.version;a=typeof a=="function"?a():a}else{if(fc$a)b=/rv\:([^\);]+)(\)|;)/;else if(fcZ)b=/MSIE\s+([^\);]+)(\)|;)/;else if(fc_)b=/WebKit\/(\S+)/;if(b)a=(a=b.exec(fc6a()))?a[1]:""}return a},fcfb=fceb(),fcgb={},fchb=function(a){return fcgb[a]||(fcgb[a]=fcXa(fcfb,a)>=0)};var fcib=/\s*;\s*/,fcjb=function(a,b,c,d,e){if(/[;=]/[fcia](a))fca(Error('Invalid cookie name "'+a+'"'));if(/;/[fcia](b))fca(Error('Invalid cookie value "'+b+'"'));fcxa(c)||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";if(c<0)c="";else if(c==0){c=new Date(1970,1,1);c=";expires="+c.toUTCString()}else{c=new Date((new Date).getTime()+c*1E3);c=";expires="+c.toUTCString()}fck.cookie=a+"="+b+e+d+c},fckb=function(a,b){a=a+"=";for(var c=fch(fck.cookie)[fcx](fcib),d=0,e;e=c[d];d++)if(e[fcC](a)==0)return e.substr(a[fcr]);
return b},fclb=function(a,b,c){var d=fcxa(fckb(a));fcjb(a,"",0,b,c);return d};var fcmb=Array[fc],fcnb=fcmb[fcC]?function(a,b,c){return fcmb[fcC][fcF](a,b,c)}:function(a,b,c){c=c==fcc?0:c<0?fcl.max(0,a[fcr]+c):c;if(fcU(a)){if(!fcU(b)||b[fcr]!=1)return-1;return a[fcC](b,c)}for(c=c;c<a[fcr];c++)if(c in a&&a[c]===b)return c;return-1},fcob=fcmb.forEach?function(a,b,c){fcmb.forEach[fcF](a,b,c)}:function(a,b,c){for(var d=a[fcr],e=fcU(a)?a[fcx](""):a,j=0;j<d;j++)j in e&&b[fcF](c,e[j],j,a)},fcpb=function(a,b){return fcnb(a,b)>=0},fcqb=function(a){if(fcza(a)=="array")return a.concat();
else{for(var b=[],c=0,d=a[fcr];c<d;c++)b[c]=a[c];return b}},fcrb=function(a,b,c){return arguments[fcr]<=2?fcmb[fcu][fcF](a,b):fcmb[fcu][fcF](a,b,c)};var fcsb=function(a,b){this.x=fcxa(a)?a:0;this.y=fcxa(b)?b:0};fcsb[fc].clone=function(){return new fcsb(this.x,this.y)};fcda(fcsb[fc],function(){return"("+this.x+", "+this.y+")"});var fc0=function(a,b){fcm(this,a);fco(this,b)};fc0[fc].clone=function(){return new fc0(this[fcs],this[fcP])};fcda(fc0[fc],function(){return"("+this[fcs]+" x "+this[fcP]+")"});fc0[fc].ceil=function(){fcm(this,fcl.ceil(this[fcs]));fco(this,fcl.ceil(this[fcP]));return this};fc0[fc].floor=function(){fcm(this,fcl.floor(this[fcs]));fco(this,fcl.floor(this[fcP]));return this};fc0[fc].round=function(){fcm(this,fcl[fct](this[fcs]));fco(this,fcl[fct](this[fcP]));return this};
fc0[fc].scale=function(a){this.width*=a;this.height*=a;return this};var fctb=function(a,b,c){for(var d in a)b[fcF](c,a[d],d,a)},fcub=function(a){var b=[],c=0;for(var d in a)b[c++]=a[d];return b},fcvb=function(a){var b=[],c=0;for(var d in a)b[c++]=d;return b},fcwb=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],fcxb=function(a){for(var b,c,d=1;d<arguments[fcr];d++){c=arguments[d];for(b in c)a[b]=c[b];for(var e=0;e<fcwb[fcr];e++){b=fcwb[e];if(fcj[fc].hasOwnProperty[fcF](c,b))a[b]=c[b]}}};var fcyb=function(a){return(a=a.className)&&typeof a[fcx]=="function"?a[fcx](" "):[]},fcAb=function(a){var b=fcyb(a),c=fcrb(arguments,1);c=fczb(b,c);fcfa(a,b[fcR](" "));return c},fczb=function(a,b){for(var c=0,d=0;d<b[fcr];d++)if(!fcpb(a,b[d])){a[fcq](b[d]);c++}return c==b[fcr]};var fcBb=function(a){return fcU(a)?fck[fcy](a):a},fcCb=fcBb,fcEb=function(a,b,c){return fcDb(fck,a,b,c)},fcDb=function(a,b,c,d){d=d||a;b=b&&b!="*"?b[fcwa]():"";if(d.querySelectorAll&&(b||c)&&(!fc_||a.compatMode=="CSS1Compat"||fchb("528"))){c=b+(c?"."+c:"");return d.querySelectorAll(c)}if(c&&d.getElementsByClassName){a=d.getElementsByClassName(c);if(b){d={};for(var e=0,j=0,h;h=a[j];j++)if(b==h.nodeName[fcwa]())d[e++]=h;fcea(d,e);return d}else return a}a=d.getElementsByTagName(b||"*");if(c){d={};for(j=
e=0;h=a[j];j++){b=h.className;if(typeof b[fcx]=="function"&&fcpb(b[fcx](" "),c))d[e++]=h}fcea(d,e);return d}else return a},fcGb=function(a,b){fctb(b,function(c,d){if(d=="style")a[fcD].cssText=c;else if(d=="class")fcfa(a,c);else if(d=="for")a.htmlFor=c;else if(d in fcFb)a[fcK](fcFb[d],c);else a[d]=c})},fcFb={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",height:"height",width:"width",usemap:"useMap",frameborder:"frameBorder",type:"type"},fcHb=
function(a){var b=a[fcw];if(fc_&&!fchb("500")&&!fcab){if(typeof a.innerHeight=="undefined")a=fci;b=a.innerHeight;var c=a[fcw].documentElement.scrollHeight;if(a==a.top)if(c<b)b-=15;return new fc0(a.innerWidth,b)}a=b.compatMode=="CSS1Compat"&&(!fc9a||fc9a&&fchb("9.50"))?b.documentElement:b[fcma];return new fc0(a.clientWidth,a.clientHeight)},fc1=function(){return fcIb(fck,arguments)},fcIb=function(a,b){var c=b[0],d=b[1];if(fcZ&&d&&(d[fcN]||d[fcsa])){c=["<",c];d[fcN]&&c[fcq](' name="',fcUa(d[fcN]),'"');
if(d[fcsa]){c[fcq](' type="',fcUa(d[fcsa]),'"');d=fcV(d);delete d[fcsa]}c[fcq](">");c=c[fcR]("")}var e=a[fcI](c);if(d)if(fcU(d))fcfa(e,d);else fcGb(e,d);if(b[fcr]>2){function j(h){if(h)e[fcp](fcU(h)?a.createTextNode(h):h)}for(d=2;d<b[fcr];d++){c=b[d];fcAa(c)&&!(fcBa(c)&&c.nodeType>0)?fcob(fcJb(c)?fcqb(c):c,j):j(c)}}return e},fcKb=function(a,b){a[fcp](b)},fcLb=function(a){return a&&a[fcO]?a[fcO].removeChild(a):fcc},fcMb=function(a,b){var c=b[fcO];c&&c.replaceChild(a,b)},fcNb=fc_&&fchb("522"),fcOb=
function(a,b){if(typeof a.contains!="undefined"&&!fcNb&&b.nodeType==1)return a==b||a.contains(b);if(typeof a.compareDocumentPosition!="undefined")return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b[fcO];return b==a},fcJb=function(a){if(a&&typeof a[fcr]=="number")if(fcBa(a))return typeof a.item=="function"||typeof a.item=="string";else if(fcza(a)=="function")return typeof a.item=="function";return fcd},fcPb=function(a){this.kb=a||fcT[fcw]||fck};fcPb[fc].createElement=function(a){return this.kb[fcI](a)};
fcPb[fc].createTextNode=function(a){return this.kb.createTextNode(a)};fcPb[fc].appendChild=fcKb;fcPb[fc].removeNode=fcLb;fcPb[fc].replaceNode=fcMb;fcPb[fc].contains=fcOb;var fcQb="StopIteration"in fcT?fcT.StopIteration:Error("StopIteration"),fcRb=function(){};fcRb[fc].next=function(){fca(fcQb)};fcRb[fc].__iterator__=function(){return this};var fc2=function(a){this.i={};this.e=[];var b=arguments[fcr];if(b>1){if(b%2)fca(Error("Uneven number of arguments"));for(var c=0;c<b;c+=2)this.set(arguments[c],arguments[c+1])}else a&&this.Ya(a)};fc2[fc].p=0;fc2[fc].G=0;fc2[fc].Fa=function(){return this.p};fc2[fc].ga=function(){this.H();for(var a=[],b=0;b<this.e[fcr];b++){var c=this.e[b];a[fcq](this.i[c])}return a};fc2[fc].M=function(){this.H();return this.e.concat()};fc2[fc].fb=function(a){return fcSb(this.i,a)};
fc2[fc].clear=function(){this.i={};fcea(this.e,0);this.G=this.p=0};fc2[fc].remove=function(a){if(fcSb(this.i,a)){delete this.i[a];this.p--;this.G++;this.e[fcr]>2*this.p&&this.H();return fcb}return fcd};fc2[fc].H=function(){if(this.p!=this.e[fcr]){for(var a=0,b=0;a<this.e[fcr];){var c=this.e[a];if(fcSb(this.i,c))this.e[b++]=c;a++}fcea(this.e,b)}if(this.p!=this.e[fcr]){var d={};for(b=a=0;a<this.e[fcr];){c=this.e[a];if(!fcSb(d,c)){this.e[b++]=c;d[c]=1}a++}fcea(this.e,b)}};
fc2[fc].get=function(a,b){if(fcSb(this.i,a))return this.i[a];return b};fc2[fc].set=function(a,b){if(!fcSb(this.i,a)){this.p++;this.e[fcq](a);this.G++}this.i[a]=b};fc2[fc].Ya=function(a){var b;if(a instanceof fc2){b=a.M();a=a.ga()}else{b=fcvb(a);a=fcub(a)}for(var c=0;c<b[fcr];c++)this.set(b[c],a[c])};fc2[fc].clone=function(){return new fc2(this)};
fc2[fc].__iterator__=function(a){this.H();var b=0,c=this.e,d=this.i,e=this.G,j=this,h=new fcRb;h.next=function(){for(;1;){if(e!=j.G)fca(Error("The map has changed since the iterator was created"));if(b>=c[fcr])fca(fcQb);var i=c[b++];return a?i:d[i]}};return h};var fcSb=function(a,b){return fcj[fc].hasOwnProperty[fcF](a,b)};var fcTb=function(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d};fcTb[fc].clone=function(){return new fcTb(this.top,this[fcS],this[fcpa],this[fcE])};fcda(fcTb[fc],function(){return"("+this.top+"t, "+this[fcS]+"r, "+this[fcpa]+"b, "+this[fcE]+"l)"});fcTb[fc].contains=function(a){return fcUb(this,a)};fcTb[fc].expand=function(a,b,c,d){if(fcBa(a)){this.top-=a.top;this.right+=a[fcS];this.bottom+=a[fcpa];this.left-=a[fcE]}else{this.top-=a;this.right+=b;this.bottom+=c;this.left-=d}return this};
var fcUb=function(a,b){if(!a||!b)return fcd;if(b instanceof fcTb)return b[fcE]>=a[fcE]&&b[fcS]<=a[fcS]&&b.top>=a.top&&b[fcpa]<=a[fcpa];return b.x>=a[fcE]&&b.x<=a[fcS]&&b.y>=a.top&&b.y<=a[fcpa]};var fcVb=function(a,b,c,d){this.left=a;this.top=b;fcm(this,c);fco(this,d)};fcVb[fc].clone=function(){return new fcVb(this[fcE],this.top,this[fcs],this[fcP])};fcda(fcVb[fc],function(){return"("+this[fcE]+", "+this.top+" - "+this[fcs]+"w x "+this[fcP]+"h)"});fcVb[fc].contains=function(a){return a instanceof fcVb?this[fcE]<=a[fcE]&&this[fcE]+this[fcs]>=a[fcE]+a[fcs]&&this.top<=a.top&&this.top+this[fcP]>=a.top+a[fcP]:a.x>=this[fcE]&&a.x<=this[fcE]+this[fcs]&&a.y>=this.top&&a.y<=this.top+this[fcP]};var fcWb,fcXb,fcYb,fcZb,fc_b,fc0b,fc1b=function(){fc0b=fc_b=fcZb=fcYb=fcXb=fcWb=fcd;var a=fc6a();if(a)if(a[fcC]("Firefox")!=-1)fcWb=fcb;else if(a[fcC]("Camino")!=-1)fcXb=fcb;else if(a[fcC]("iPhone")!=-1||a[fcC]("iPod")!=-1)fcYb=fcb;else if(a[fcC]("Android")!=-1)fcZb=fcb;else if(a[fcC]("Chrome")!=-1)fc_b=fcb;else if(a[fcC]("Safari")!=-1)fc0b=fcb};fc1b();var fc3b=function(a,b,c){fcU(b)?fc2b(a,c,b):fctb(b,fcCa(fc2b,a))},fc2b=function(a,b,c){a[fcD][fc4b(c)]=b},fc5b=function(a,b){var c=a.nodeType==9?a:a.ownerDocument||a[fcw];if(c.defaultView&&c.defaultView.getComputedStyle)if(a=c.defaultView.getComputedStyle(a,""))return a[b];return fcc},fc6b=function(a,b,c){if(b instanceof fc0){c=b[fcP];b=b[fcs]}else{if(c==fcaa)fca(Error("missing height argument"));c=c}fcm(a[fcD],typeof b=="number"?fcl[fct](b)+"px":b);fco(a[fcD],typeof c=="number"?fcl[fct](c)+"px":
c)},fc7b=function(a){var b=fc9a&&!fchb("10");if((fc5b(a,"display")||(a.currentStyle?a.currentStyle[fcua]:fcc)||a[fcD][fcua])!="none")return b?new fc0(a[fcka]||a.clientWidth,a[fcva]||a.clientHeight):new fc0(a[fcka],a[fcva]);var c=a[fcD],d=c[fcua],e=c.visibility,j=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";if(b){b=a[fcka]||a.clientWidth;a=a[fcva]||a.clientHeight}else{b=a[fcka];a=a[fcva]}c.display=d;c.position=j;c.visibility=e;return new fc0(b,a)},fc8b={},fc4b=function(a){return fc8b[a]||
(fc8b[a]=fch(a)[fcv](/\-([a-z])/g,function(b,c){return c.toUpperCase()}))},fc9b=function(a,b){a[fcD].display=b?"":"none"};var fc$b={},fcac={};var fcbc=function(a,b,c,d){b=b||"800";c=c||"550";d=d||"friendconnect";a=fci.open(a,d,"menubar=no,toolbar=no,dialog=yes,location=yes,alwaysRaised=yes,width="+b+",height="+c+",resizable=yes,scrollbars=1,status=1");fci.focus&&a&&a.focus()},fccc=function(a,b){var c=fce[fcL][fcB]().communityId;fce.rpc[fcF](fcc,"signin",fcc,c,a,b)};fcX("goog.peoplesense.util.openPopup",fcbc);fcX("goog.peoplesense.util.finishSignIn",fccc);var fcfc=function(a,b){var c=fcdc()+"/friendconnect/invite/friends",d=fcg(shindig.auth.getSecurityToken());fcec(c,d,a,b)},fcec=function(a,b,c,d){a+="?st="+b;if(c)a+="&customMessage="+fcg(c);if(d)a+="&customInviteUrl="+fcg(d);b=760;if(fcZ)b+=25;fcbc(a,fch(b),"515","friendconnect_invite")};fcX("goog.peoplesense.util.invite",fcfc);fcX("goog.peoplesense.util.inviteFriends",fcec);var fcdc=function(){return fci.friendconnect_serverBase},fcgc=function(a,b,c){var d=fce[fcL][fcB]().psinvite||"";d=fcdc()+"/friendconnect/signin/home?st="+fcg(shindig.auth.getSecurityToken())+"&psinvite="+fcg(d);if(a)d+="&iframeId="+fcg(a);if(b)d+="&loginProvider="+b;if(c)d+="&subscribeOnSignin=1";fcbc(d);return fcd},fchc=function(){var a=fce[fcL][fcB]().communityId;fce.rpc[fcF](fcc,"signout",fcc,a)},fcjc=function(a,b){a=fcdc()+"/friendconnect/settings/edit?st="+fcg(shindig.auth.getSecurityToken())+
(a?"&iframeId="+fcg(a):"");if(b)a=a+"&"+b;fcic(a)},fckc=function(a){a=fcdc()+"/friendconnect/settings/siteProfile?st="+fcg(a);fcic(a)},fcic=function(a){var b=800,c=510;if(fcZ)b+=25;fcbc(a,fch(b),fch(c))},fclc=function(a,b,c){var d=fcc;if(b=="text"){d=fc1("div",{"class":"gfc-button-text"},fc1("div",{"class":"gfc-icon"},fc1("a",{href:"javascript:void(0);"},c)));a[fcp](d)}else if(b=="long"||b=="standard"){d=fc1("div",{"class":"gfc-inline-block gfc-primaryactionbutton gfc-button-base"},fc1("div",{"class":"gfc-inline-block gfc-button-base-outer-box"},
fc1("div",{"class":"gfc-inline-block gfc-button-base-inner-box"},fc1("div",{"class":"gfc-button-base-pos"},fc1("div",{"class":"gfc-button-base-top-shadow",innerHTML:"&nbsp;"}),fc1("div",{"class":"gfc-button-base-content"},fc1("div",{"class":"gfc-icon"},c))))));a[fcp](d);if(b=="standard"){b=fc1("div",{"class":"gfc-footer-msg"},"with Google Friend Connect");a[fcp](fc1("br"));a[fcp](b)}}return d},fcmc=function(a,b){if(!a)fca("google.friendconnect.renderSignInButton: missing options");var c=a[fcD]||"standard",
d=a.text;if(c=="standard")d=a.text||"Sign in";else if(c=="text"||c=="long")d=a.text||"Sign in with Friend Connect";var e=a.element;if(!e){e=a.id;if(!e)fca("google.friendconnect.renderSignInButton: options[id] and options[element] == null");e=fcCb(e);if(!e)fca("google.friendconnect.renderSignInButton: element "+a.id+" not found")}fcn(e,"");a=fclc(e,c,d);fci[fcoa]?a[fcoa]("click",b,fcd):a.attachEvent("onclick",b)},fcnc=function(a,b){b=b||fcW(fcgc,fcc,fcc,fcc,fcc);fcmc(a,b)},fcoc=function(a,b){fce.rpc[fcF](fcc,
"putReloadViewParam",fcc,a,b);var c=fce.views.getParams();c[a]=b};fcX("goog.peoplesense.util.getBaseUrl",fcdc);fcX("goog.peoplesense.util.finishSignIn",fccc);fcX("goog.peoplesense.util.signout",fchc);fcX("goog.peoplesense.util.signin",fcgc);fcX("goog.peoplesense.util.editSettings",fcjc);fcX("goog.peoplesense.util.editSSProfile",fckc);fcX("goog.peoplesense.util.setStickyViewParamToken",fcoc);fcX("google.friendconnect.renderSignInButton",fcnc);fcX("goog.peoplesense.util.userAgent.IE",fcZ);var fcpc={},fcqc={},fc3=function(a){this.h=new fc2;this.snippetId=a.id;this.site=a.site;a=a["view-params"];var b=a.skin;this.Ub=(b?b.POSITION:"top")||"top";this.xc={allowAnonymousPost:a.allowAnonymousPost||fcd,scope:a.scope||"SITE",docId:a.docId||"",features:a.features||"video,comment",startMaximized:"true",disableMinMax:"true",skin:b};this.absoluteBottom=fcZ&&!fchb("7");this.fixedIeSizes=fcZ;fci[fcoa]?fci[fcoa]("resize",fcW(this.Ra,this),fcd):fci.attachEvent("onresize",fcW(this.Ra,this));this.db()};
fc3[fc].db=function(){if(!this.site)fca(new Error("Must supply site ID."));if(!this.snippetId)fca(new Error("Must supply a snippet ID."))};fc3[fc].b=10;fc3[fc].xa=1;fc3[fc].o="fc-friendbar-";fc3[fc].s=fc3[fc].o+"outer";fc3[fc].Ta=fc3[fc].s+"-shadow";fc3[fc].render=function(){fck.write(this.ob());var a=fcBb(this.snippetId);fcn(a,this.K())};fc3[fc].pb=function(){var a=fcBb(this.s);return a=fc7b(a)[fcs]};
fc3[fc].Ra=function(){for(var a=this.h.M(),b=0;b<a[fcr];b++)this.gc(a[b]);goog&&fc$b&&fcac&&fcrc&&fcsc("resize")};fc3[fc].m=function(){return this.Ub};fc3[fc].d=function(a){return this.o+"shadow-"+a};fc3[fc].ea=function(a){return this.o+"menus-"+a};fc3[fc].N=function(a){return this.o+a+"Target"};fc3[fc].ca=function(a){return this.o+a+"Drawer"};fc3[fc].Ka=function(){return this.N("")};fc3[fc].La=function(){return this.o+"wallpaper"};fc3[fc].Ga=function(){return this.ca("")};
fc3[fc].ob=function(){var a=fci.friendconnect_imageUrl+"/",b=a+"shadow_tc.png",c=a+"shadow_bc.png",d=a+"shadow_bl.png",e=a+"shadow_tl.png",j=a+"shadow_tr.png",h=a+"shadow_br.png";a=a+"shadow_cr.png";var i=function(m,q){return fcZ?'filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+m+'", sizingMethod="scale");':"background-image: url("+m+");background-repeat: "+q+"; "},k="position:absolute; top:";if(this.m()!="top"){k="position:fixed; bottom:";if(this.absoluteBottom)k="position:absolute; bottom:"}var l=
c;if(this.m()!="top")l=b;var f=0,g=[];g[f++]='<style type="text/css">';if(this.m()!="top"&&this.absoluteBottom)g[f++]="html, body {height: 100%; overflow: auto; };";g[f++]="#"+this.s+" {";g[f++]="background:#E0ECFF;";g[f++]="left:0;";g[f++]="height: "+(fcZ?"35px;":"36px;");if(this.m()!="top"&&this.absoluteBottom)g[f++]="margin-right: 20px;";g[f++]="padding:0;";g[f++]=k+" 0;";g[f++]="width:100%;";g[f++]="z-index:5000;";g[f++]="}";g[f++]="#"+this.Ta+" {";g[f++]=i(l,"repeat-x");g[f++]="left:0;";g[f++]=
"height:"+this.b+"px;";if(this.m()!="top"&&this.absoluteBottom)g[f++]="margin-right: 20px;";g[f++]="padding:0;";g[f++]=k+(fcZ?"35px;":"36px;");g[f++]="width:100%;";g[f++]="z-index:4998;";g[f++]="}";g[f++]="."+this.Ga()+" {";g[f++]="display: block;";g[f++]="padding:0;";g[f++]=k+(fcZ?"34px;":"35px;");g[f++]="z-index:4999;";g[f++]="}";g[f++]="."+this.La()+" {";g[f++]="background: white;";g[f++]="height: 100%;";g[f++]="margin-right: "+this.b+"px;";g[f++]="}";g[f++]="."+this.Ka()+" {";g[f++]="border: "+
this.xa+"px solid #ccc;";g[f++]="height: 100%;";g[f++]="left: 0;";g[f++]="background-image: url("+fci.friendconnect_imageUrl+"/loading.gif);";g[f++]="background-position: center;";g[f++]="background-repeat: no-repeat;";g[f++]="}";g[f++]="."+this.d("cr")+" {";g[f++]=i(a,"repeat-y");g[f++]="height: 100%;";g[f++]="position:absolute;";g[f++]="right: 0;";g[f++]="top: 0;";g[f++]="width:"+this.b+"px;";g[f++]="}";g[f++]="."+this.d("bl")+" {";g[f++]=i(d,"no-repeat");g[f++]="height: "+this.b+"px;";g[f++]="position:absolute;";
g[f++]="width:"+this.b+"px;";g[f++]="}";g[f++]="."+this.d("tl")+" {";g[f++]=i(e,"no-repeat");g[f++]="height: "+this.b+"px;";g[f++]="position:absolute;";g[f++]="left:0px;";g[f++]="width:"+this.b+"px;";g[f++]="}";g[f++]="."+this.d("bc")+" {";g[f++]=i(c,"repeat-x");g[f++]="height: "+this.b+"px;";g[f++]="left: "+this.b+"px;";g[f++]="position:absolute;";g[f++]="right: "+this.b+"px;";g[f++]="}";g[f++]="."+this.d("tc")+" {";g[f++]=i(b,"repeat-x");g[f++]="height: "+this.b+"px;";g[f++]="left: "+this.b+"px;";
g[f++]="margin-left: "+this.b+"px;";g[f++]="margin-right: "+this.b+"px;";g[f++]="right: "+this.b+"px;";g[f++]="}";g[f++]="."+this.d("br")+" {";g[f++]=i(h,"no-repeat");g[f++]="height: "+this.b+"px;";g[f++]="position:absolute;";g[f++]="right: 0;";g[f++]="width: "+this.b+"px;";g[f++]="}";g[f++]="."+this.d("tr")+" {";g[f++]=i(j,"no-repeat");g[f++]="height: "+this.b+"px;";g[f++]="position:absolute;";g[f++]="right: 0;";g[f++]="top: 0;";g[f++]="width: "+this.b+"px;";g[f++]="}";g[f++]="</style>";return g[fcR]("")};
fc3[fc].K=function(){var a=['<div id="'+this.s+'"></div>','<div id="'+this.Ta+'"></div>','<div id="'+this.ea(this.h.Fa())+'"></div>'];return a[fcR]("")};fc3[fc].hb=function(a,b,c,d){if(!this.h.fb(a)){b=new fc4(this,a,b,c,d);c=this.h.Fa();d=fcBb(this.ea(c));fcn(d,b.K()+'<div id="'+this.ea(c+1)+'"></div>');this.h.set(a,b)}};fc3[fc].ia=function(a){(a=this.h.get(a))&&a.drawer&&fc9b(a.drawer,fcd)};fc3[fc].Xb=function(a){if(a=this.h.get(a))a.rendered=fcd};
fc3[fc].refresh=function(){for(var a=this.h.M(),b=0;b<a[fcr];b++){var c=a[b];this.ia(c);this.Xb(c)}};fc3[fc].Qb=function(a){for(var b=this.h.ga(),c=0;c<b[fcr];c++){var d=b[c];if(d.id==a){d.uc();break}}};fc3[fc].Pb=function(a){for(var b=this.h.ga(),c=0;c<b[fcr];c++){var d=b[c];if(d.id==a){d.Mb();break}}};fc3[fc].gc=function(a){if((a=this.h.get(a))&&a.drawer&&a.ka()){a.aa();a.Ca();a.wa()}};
fc3[fc].tc=function(a,b){var c=this.h.get(a);if(c){if(!c.drawer){c.drawer=fcBb(this.ca(c[fcN]));c.target=fcBb(this.N(c[fcN]));c.sha_bc=fcEb("div",this.m()=="top"?this.d("bc"):this.d("tc"),c.drawer)[0];c.sha_cr=fcEb("div",this.d("cr"),c.drawer)[0]}for(var d=this.h.M(),e=0;e<d[fcr];e++){var j=d[e];a!=this.h.get()&&this.ia(j)}c.aa(b);fc9b(c.drawer,fcb);fci.setTimeout(function(){c.wa();c.Ca();c.render()},0)}};
var fc4=function(a,b,c,d,e){this.id=-1;this.bar=a;this.name=b;this.constraints=d;this.skin=e||{};fco(this,this.skin.HEIGHT||"0");this.url=fci.friendconnect_serverBase+c;this.sha_bc=this.target=this.drawer=fcc;this.loaded=this.rendered=fcd;this.aa()};
fc4[fc].aa=function(a){fcxb(this.constraints,a||{});fcxb(this.skin,this.constraints);if(this.bar.fixedIeSizes&&this.constraints[fcE]&&this.constraints[fcS]){a=this.bar.pb();var b=this.constraints[fcE],c=this.constraints[fcS];a=a-(b+c);if(a%2){a-=1;this.skin.right+=1}fcm(this.skin,a);delete this.skin[fcE]}};
fc4[fc].wa=function(){if(this.drawer){if(this.skin[fcs]){var a=this.bar.xa,b=this.bar.b,c=fcZ?2:0;fc6b(this.target,this.skin[fcs],"");fc6b(this.sha_bc,this.skin[fcs]-b+2*a-c,"");this.skin.rightShadow?fc6b(this.drawer,this.skin[fcs]+b+2*a-c,""):fc6b(this.drawer,this.skin[fcs]+2*a-c,"")}if(this.skin[fcS])this.drawer[fcD].right=this.skin[fcS]+0+"px"}};
fc4[fc].Ca=function(){if(fcZ&&this.drawer){var a=fc7b(this.target),b=a[fcs]-this.bar.b;a=a[fcP];if(b<0)b=0;this.sha_bc&&this.sha_bc[fcD]&&fc6b(this.sha_bc,b,"");this.sha_cr&&this.sha_cr[fcD]&&fc6b(this.sha_cr,"",a)}};
fc4[fc].K=function(){var a="display:none;",b="position: relative; ",c="",d="",e="",j="",h=!!this.skin.rightShadow;if(!h){c+="display: none; ";e+="display: none; ";d+="right: 0px; ";j+="margin-right: 0px; "}for(var i in this.skin){var k=Number(this.skin[i]);if(h&&fcOa(i,"width")==0)k+=this.b;if(fcOa(i,"height")==0)b+=i+": "+k+"px; ";if(i!="rightShadow"){if(fcOa(i,"height")==0)k+=this.b;if(fcOa(i,"width")==0)k+=2;a+=i+": "+k+"px; "}if(fcZ&&fcOa(i,"width")==0){k-=h?2*this.b:this.b;d+=i+": "+k+"px; "}}if(fcZ&&
(this[fcP]|0)>0){h=(this[fcP]|0)+2;c+="height: "+h+"px; "}h=0;i=[];i[h++]='<div id="'+this.bar.ca(this[fcN])+'"class="'+this.bar.Ga()+'"style="'+a+'"> ';if(this.bar.m()=="bottom")i[h++]='<div class="'+this.bar.d("tl")+'"></div> <div class="'+this.bar.d("tc")+'"style="'+d+'"></div> <div class="'+this.bar.d("tr")+'"style="'+e+'"></div> ';i[h++]='<div style="'+b+'"> <div class="'+this.bar.La()+'"style="'+j+'"><div id="'+this.bar.N(this[fcN])+'"class="'+this.bar.Ka()+'"></div> <div class="'+this.bar.d("cr")+
'"style="'+c+'"></div> </div> </div> ';if(this.bar.m()=="top")i[h++]='<div class="'+this.bar.d("bl")+'"></div> <div class="'+this.bar.d("bc")+'"style="'+d+'"></div> <div class="'+this.bar.d("br")+'"style="'+e+'"></div> ';i[h++]="</div> ";return i[fcR]("")};fc4[fc].uc=function(){this.rendered=this.ka()};fc4[fc].Mb=function(){this.loaded=this.ka()};fc4[fc].ka=function(){return!!this.drawer&&this.drawer[fcD][fcua]!="none"};
fc4[fc].render=function(){if(this.rendered==fcd){var a={};a.url=this.url;a.id=this.bar.N(this[fcN]);a.site=this.bar.site;a["view-params"]=fcV(this.bar.xc);if(this[fcN]=="profile")a["view-params"].profileId="VIEWER";this.skin&&fcxb(a["view-params"].skin,this.skin);a["view-params"].menuName=this[fcN];a["view-params"].opaque="true";a["view-params"].menuPosition=this.bar.Ub;fco(a,"1px");if(fcpc&&fcqc&&fc5)this.id=fc5.render(a)}};fcX("google.friendconnect.FriendBar",fc3);var fctc="0123456789abcdefghijklmnopqrstuv",fcvc=function(a){a=new fcuc(a);if(a.ma()%5)fca(Error());for(var b=[],c=0;a.ma()>0;c++)b[c]=fctc[fcz](a.Sb(5));return b[fcR]("")},fcuc=function(a){this.C=this.q=0;this.$=a};fcuc[fc].ma=function(){return 8*(this.$[fcr]-this.C)-this.q};
fcuc[fc].Sb=function(a){var b=0;if(a>this.ma())fca(Error());if(this.q>0){b=255>>this.q&this.$[this.C];var c=8-this.q,d=fcl.min(a%8,c);c=c-d;b=b>>c;a-=d;this.q+=d;if(this.q==8){this.q=0;this.C++}}for(;a>=8;){b<<=8;b|=this.$[this.C];this.C++;a-=8}if(a>0){b<<=a;b|=this.$[this.C]>>8-a;this.q=a}return b};var fcwc=function(){},fcxc=function(){},fcyc=function(){};fcY(fcyc,fcxc);var fczc=function(a){if(a)for(var b in a)if(a.hasOwnProperty(b))this[b]=a[b];if(this.viewParams)for(var c in this.viewParams)if(/^FC_RELOAD_.*$/[fcia](c))this.viewParams[c]=fcc};fczc[fc].render=function(a){var b=this;if(a){b.vc();this.rb(function(c){fc3b(a,"visibility","hidden");fcn(a,c);b.refresh(a,c);c=function(d){fc3b(d,"visibility","visible")};c=fcCa(c,a);fcca(c,500);b.chrome=a})}};fczc[fc].rb=function(a){return this.xb(a)};
var fc6=function(a){fczc[fcF](this,a);this.R="../../";this.rpcToken=fch(fcl[fct](2147483647*fcl[fcna]()))};fcY(fc6,fczc);fc6[fc].Wa="gfc_iframe_";fc6[fc].Xa="friendconnect";fc6[fc].Da="";fc6[fc].hc="rpc_relay.html";fc6[fc].U=function(a){this.R=a};fc6[fc].vc=function(){return this.Da=fch(fcl[fct](2147483647*fcl[fcna]()))};fc6[fc].da=function(){return this.Wa+this.Da+"_"+this.id};
fc6[fc].refresh=function(a,b){var c=fc5.Ac,d,e={},j=fc5.Ea(this.communityId),h=j[fcx]("~"),i=fc5.ib;if(i&&h[fcr]>1){d=h[2];h=h[1];var k=[this.specUrl,this.communityId,h,i][fcR](":");e.sig=fc5.hash(d,k);e.userId=h;e.dateStamp=i}e.container=this.Xa;e.mid=this.id;e.nocache=fc5.Tb;e.view=this.W;e.parent=fc5.P;if(this.debug)e.debug="1";if(this.specUrl)e.url=this.specUrl;if(this.communityId){i=fce[fcL][fcB]().profileId;e.communityId=this.communityId;if(d=fce[fcL][fcB]().psinvite)e.psinvite=d;if(i)e.profileId=
i}e.caller=fcAc();e.rpctoken=this.rpcToken;i=fcd;d="";h=/Version\/3\..*Safari/;if((h=fc_&&fc6a()[fcG](h))||!fc5.O[this.specUrl]&&this.viewParams){e["view-params"]=fce[fcJ][fcha](this.viewParams);d="?viewParams="+fcg(e["view-params"]);i=fcb}if(this.prefs)e.prefs=fce[fcJ][fcha](this.prefs);if(this.viewParams&&this.sendViewParamsToServer)e["view-params"]=fce[fcJ][fcha](this.viewParams);if(this.locale)e.locale=this.locale;if(this.secureToken)e.st=this.secureToken;h=fc5.Ja(this.specUrl);d=h+"ifr"+d+(this.hashData?
"&"+this.hashData:"");if(fc5.zc!=1||i||j||this.secureToken){if(j&&!e.sig)e.fcauth=j}else e.sig||(c="get");j=this.da();fcBc(j,d,c,e,a,b,this.rpcToken)};var fc7=function(){this.j={};this.P="http://"+fck[fcA].host;this.W="default";this.Tb=1;this.Ec=0;this.Bc="US";this.Cc="en";this.Dc=2147483647};fcY(fc7,fcwc);fc7[fc].u=fczc;fc7[fc].z=new fcyc;fc7[fc].Sa=function(a){this.Tb=a};fc7[fc].Ba=function(a){this.zc=a};fc7[fc].Ia=function(a){return"gadget_"+a};fc7[fc].v=function(a){return this.j[this.Ia(a)]};
fc7[fc].J=function(a){return new this.u(a)};fc7[fc].Za=function(a){a.id=this.yb();this.j[this.Ia(a.id)]=a};fc7[fc].Rb=0;fc7[fc].yb=function(){return this.Rb++};var fcCc=function(){fc7[fcF](this)};fcY(fcCc,fc7);fcCc[fc].u=fc6;fcCc[fc].T=function(a){a[fcG](/^http[s]?:\/\//)||(a=fck[fcA][fcqa][fcG](/^[^?#]+\//)[0]+a);this.P=a};fcCc[fc].F=function(a){var b=this.z.Ha(a);a.render(b)};var fcDc=function(){this.nb={}};fcY(fcDc,fcxc);
fcDc[fc].$a=function(a,b){this.nb[a]=b;a=fck[fcy](b).className;if(!a&&a[fcr]==0)fcfa(fck[fcy](b),"gadgets-gadget-container")};fcDc[fc].Ha=function(a){return(a=this.nb[a.id])?fck[fcy](a):fcc};var fc8=function(a){fc6[fcF](this,a);a=a||{};this.W=a.view||"profile"};fcY(fc8,fc6);fc8[fc].cb="canvas.html";fc8[fc].lb="/friendconnect/embed/";
var fcAc=function(){var a=fce[fcL][fcB]().canvas=="1"||fce[fcL][fcB]().embed=="1",b=fcc;if(a)b=fce[fcL][fcB]().caller;if(!b){a=fck[fcA];b=a.search[fcv](/([&?]?)psinvite=[^&]*(&?)/,function(c,d,e){return e?d:""});b=a.protocol+"//"+a.hostname+(a.port?":"+a.port:"")+a.pathname+b}return b};fc8[fc].qc=function(a){this.W=a};fc8[fc].ha=function(){return this.W};fc8[fc].getBodyId=function(){return this.da()+"_body"};
fc8[fc].xb=function(a){var b=(fc5.Ja(this.specUrl)||this.R)+this.hc,c=this.da();fce.rpc.setRelayUrl(c,b);b='<div id="'+this.getBodyId()+'"><iframe id="'+c+'" name="'+c+'" style="width:100%;';if(this.viewParams.opaque)b+="background-color:white;";b+='"';b+=' frameborder="0" scrolling="no"';this.viewParams.opaque||(b+=' allowtransparency="true"');b+=this[fcP]?' height="'+this[fcP]+'"':"";b+=this[fcs]?' width="'+this[fcs]+'"':"";b+="></iframe>";if(this.showEmbedThis)b+='<a href="javascript:void(0);" onclick="google.friendconnect.container.showEmbedDialog(\''+
this.divId+"'); return false;\">Embed this</a>";b+="</div>";a(b)};
fc8[fc].qb=function(){var a=fcAc();a="canvas=1&caller="+fcg(a);var b=fce[fcL][fcB]().psinvite;if(b)a+="&psinvite="+fcg(b);a+="&site="+fcg(this.communityId);b=fcV(this.viewParams);if(b.skin!=fcc)for(var c=["BG_IMAGE","BG_COLOR","FONT_COLOR","BG_POSITION","BG_REPEAT","ANCHOR_COLOR","FONT_FACE","BORDER_COLOR","CONTENT_BG_COLOR","CONTENT_HEADLINE_COLOR","CONTENT_LINK_COLOR","CONTENT_SECONDARY_TEXT_COLOR","CONTENT_SECONDARY_LINK_COLOR","CONTENT_TEXT_COLOR","ENDCAP_BG_COLOR","ENDCAP_LINK_COLOR","ENDCAP_TEXT_COLOR",
"CONTENT_VISITED_LINK_COLOR","ALTERNATE_BG_COLOR"],d=0;d<c[fcr];d++)delete b.skin[c[d]];b=fcg(fce[fcJ][fcha](b));b=b[fcv]("\\","%5C");return fc5.P+this.cb+"?url="+fcg(this.specUrl)+(a?"&"+a:"")+"&view-params="+b};fc8[fc].B=function(a){a=a||fcf+this.lb+this.communityId;return this.sb(a,"embed=1")};fc8[fc].A=function(a){return'<iframe src="'+this.B(a)+'" style="height:500px" scrolling="no" allowtransparency="true" border="0" frameborder="0" ></iframe>'};
fc8[fc].sb=function(a,b){var c=fcg(fce[fcJ][fcha](this.viewParams));c=c[fcv]("\\","%5C");return a+"?url="+fcg(this.specUrl)+(b?"&"+b:"")+"&view-params="+c};fc8[fc].Bb=function(){var a=fce[fcL][fcB]().canvas=="1"||fce[fcL][fcB]().embed=="1",b=fcc;if(a)(b=fce[fcL][fcB]().caller)||(b="javascript:history.go(-1)");return b};fc8[fc].Cb=function(a){var b=fcc;if(a=="canvas")b=this.qb();else if(a=="profile")b=this.Bb();return b};
var fc9=function(){fcCc[fcF](this);fce.rpc[fcQ]("signin",this.signin);fce.rpc[fcQ]("signout",this.signout);fce.rpc[fcQ]("resize_iframe",this.lc);fce.rpc[fcQ]("set_title",this.setTitle);fce.rpc[fcQ]("requestNavigateTo",fcEc);fce.rpc[fcQ]("api_loaded",this.bb);fce.rpc[fcQ]("createFriendBarMenu",this.gb);fce.rpc[fcQ]("showFriendBarMenu",this.sc);fce.rpc[fcQ]("hideFriendBarMenu",this.Gb);fce.rpc[fcQ]("putReloadViewParam",this.Vb);fce.rpc[fcQ]("getViewParams",this.jb);fce.rpc[fcQ]("openLightboxIframe",
fcFc);fce.rpc[fcQ]("showMemberProfile",fcGc);fce.rpc[fcQ]("closeLightboxIframe",fcW(this.t,this));fce.rpc[fcQ]("setLightboxIframeTitle",fcW(this.mc,this));fce.rpc[fcQ]("refreshAndCloseIframeLightbox",fcW(this.Wb,this));var a=fcHc;a[fcQ]();a.Va(this,"load",this.Eb);a.Va(this,"start",this.Fb);this.R="../../";this.T("");this.Sa(0);this.Ba(1);this.z=new fcDc;this.la=fcc;this.apiVersion="0.8";this.openSocialSecurityToken=this.openSocialSiteId=fcc;this.S="";this.Aa={};this.Lb=fcc;this.Kb=fcd;this.ib=this.Ob=
this.lastIframeLightboxOpenArguments=this.lastLightboxCallback=this.lastLightboxDialog=fcc;this.Ac="post"};fcY(fc9,fcCc);fc9[fc].jc=function(a){this.ib=a};fc9[fc].u=fc8;fc9[fc].O={};fc9[fc].oc=function(a){this.la=a};fc9[fc].Ja=function(a){var b=fc9[fc].O[a];if(!b)if(this.la[fcC]("http://")!==0){a=this.eb(a);b=["http://",a,this.la][fcR]("")}else b=this.la;return b};fc9[fc].eb=function(a){var b=new SHA1;a=fcFa(a);b.update(a);b=b.digest();return b=fcvc(b)};
var fcIc=function(a,b){var c=b?b:fci.top;b=c.frames;try{if(c.frameElement.id==a)return c}catch(d){}for(c=0;c<b[fcr];++c){var e=fcIc(a,b[c]);if(e)return e}return fcc},fcBc=function(a,b,c,d,e,j,h){var i="gfc_load_"+a;b='<html><head><style type="text/css">body {background:transparent;}</style>'+(fcZ?'<script type="text/javascript">window.goback=function(){history.go(-1);};setTimeout("goback();", 0);<\/script>':"")+"</head><body><form onsubmit='window.goback=function(){};return false;' style='margin:0;padding:0;' id='"+
i+"' method='"+c+"' ' action='"+b+"'>";for(var k in d)b+="<input type='hidden' name='"+k+"' value='' >";b+="</form></body></html>";c=fcIc(a);var l;try{l=c[fcw]||c.contentWindow[fcw]}catch(f){if(e&&j){fcn(e,"");fcn(e,j);c=fcIc(a);l=c[fcw]||c.contentWindow[fcw]}}h&&fce.rpc.setAuthToken(a,h);l.open();l.write(b);l.close();a=l[fcy](i);for(k in d)a[k].value=d[k];fcZ&&a.onsubmit();a.submit()};fc9[fc].mb=function(){var a=fce[fcL][fcB]().fcsite,b=fce[fcL][fcB]().fcprofile;a&&b&&fc5.ua(b,a)};
fc9[fc].kc=function(a,b){this.O[a]=b};fc9[fc].Q=function(){var a=/Version\/3\..*Safari/;if(a=fc_&&fc6a()[fcG](a))fck[fcA].reload();else{fc5.g!=fcc&&fc5.g.refresh();for(var b in fc5.j){a=fc5.j[b];this.F(a)}if(this.lastIframeLightboxOpenArguments!=fcc){b=this.lastIframeLightboxOpenArguments;this.t();this.na[fcM](this,b)}}};
fc9[fc].T=function(a){a[fcG](/^http[s]?:\/\//)||(a=a&&a[fcr]>0&&a.substring(0,1)=="/"?fck[fcA][fcqa][fcG](/^http[s]?:\/\/[^\/]+\//)[0]+a.substring(1):fck[fcA][fcqa][fcG](/^[^?#]+\//)[0]+a);this.P=a};fc9[fc].ba=function(a){return"fcauth"+a};fc9[fc].fa=function(a){return"fcauth"+a+"-s"};fc9[fc].hash=function(a,b){var c=new SHA1;a=fcMa(a,fcb);c=new G_HMAC(c,a,64);b=fcFa(b);b=c.wb(b);(new Date).getTime();return fcLa(b,fcb)};
fc9[fc].Ea=function(a){return a=fckb(this.ba(a))||fckb(this.fa(a))||this.Aa[a]||""};fc9[fc].U=function(a){this.R=a};fc9[fc].pc=function(a){this.S=a};fc9[fc].J=function(a){a=new this.u(a);a.U(this.R);return a};fc9[fc].ha=function(){return this.W};fc9[fc].nc=function(a){this.Ob=a};var fc$=function(a){return fcba(a[fcG](/_([0-9]+)$/)[1],10)};
fc9[fc].V=function(a,b,c,d,e,j){if(!this.yc){this.X(fci.friendconnect_serverBase+"/friendconnect/styles/container.css?v="+this.S);this.yc=fcb}var h=fcJc(d);if(this.Lb!=(h?"rtl":"ltr")){this.X(fci.friendconnect_serverBase+"/friendconnect/styles/lightbox"+(h?"-rtl":"")+".css?v="+this.S);this.Lb=h?"rtl":"ltr"}if(!this.Kb){this.ab(fci.friendconnect_serverBase+"/friendconnect/script/lightbox.js?v="+this.S);this.Kb=fcb}b=b||0;if(goog.ui&&goog.ui[fcla]){this.t();b=new goog.ui[fcla]("lightbox-dialog",fcb);
var i=this;goog.events.listen(b,goog.ui[fcla].EventType.AFTER_HIDE,function(){i.lastLightboxCallback&&i.lastLightboxCallback();i.za()});b.setDraggable(fcb);b.setDisposeOnHide(fcb);b.setBackgroundElementOpacity(0.5);b.setButtonSet(new goog.ui[fcla].ButtonSet);this.lastLightboxDialog=b;this.lastLightboxCallback=c;c=b.getDialogElement();e=e||702;fc3b(c,"width",fch(e)+"px");j&&fc3b(c,"height",fch(j)+"px");a(b);b.getDialogElement()[fcD].direction=h?"rtl":"ltr"}else if(b<5){b++;a=fcW(this.V,this,a,b,c,
d,e,j);fcca(a,1E3)}else{this.za();fca(Error("lightbox.js failed to load"))}};fc9[fc].t=function(a){var b=this.lastLightboxDialog,c=this.lastLightboxCallback;this.lastLightboxCallback=fcc;if(b!=fcc){this.lastLightboxDialog.dispatchEvent(goog.ui[fcla].EventType.AFTER_HIDE);b.dispose();c!=fcc&&c(a)}};fc9[fc].za=function(){this.lastIframeLightboxOpenArguments=this.lastLightboxCallback=this.lastLightboxDialog=fcc};fc9[fc].mc=function(a){this.lastLightboxDialog&&this.lastLightboxDialog.setTitle(a)};
fc9[fc].Wb=function(){this.t();this.Q()};var fcEc=function(a,b){var c=fc$(this.f);c=fc5.v(c);var d=fcV(c.originalParams);if(b){d["view-params"]=d["view-params"]||{};d["view-params"]=b}d.locale=c.locale;if(c.useLightBoxForCanvas){d.presentation=a;this.lastLightboxDialog!=fcc?fc5.t():fc5.Ua(d)}else if((a=c.Cb(a))&&fck[fcA][fcqa]!=a)if(fce[fcL][fcB]().embed=="1")try{fci.parent.location=a}catch(e){fci.top.location=a}else fck[fcA].href=a};
fc9[fc].Ua=function(a,b){a=a||{};var c=a.locale,d=fcJc(c),e=this;this.t();this.V(function(j){var h=fc1("div",{},fc1("div",{id:"gadget-signin",style:"background-color:#ffffff;height:32px;"}),fc1("div",{id:"gadget-lb-canvas",style:"background-color:#ffffff;"}));j.getTitleTextElement()[fcp](fc1("div",{id:"gfc-canvas-title",style:"color:#000000;"})),j.getContentElement()[fcp](h);j.setVisible(fcb);h=fcV(a);var i=fcHb(fci),k=fcl[fct](i[fcP]*0.7);i={};i.BORDER_COLOR="#cccccc";i.ENDCAP_BG_COLOR="#e0ecff";
i.ENDCAP_TEXT_COLOR="#333333";i.ENDCAP_LINK_COLOR="#0000cc";i.ALTERNATE_BG_COLOR="#ffffff";i.CONTENT_BG_COLOR="#ffffff";i.CONTENT_LINK_COLOR="#0000cc";i.CONTENT_TEXT_COLOR="#333333";i.CONTENT_SECONDARY_LINK_COLOR="#7777cc";i.CONTENT_SECONDARY_TEXT_COLOR="#666666";i.CONTENT_HEADLINE_COLOR="#333333";h.id="gadget-lb-canvas";fco(h,fcl.min(498,k)+"px");h.maxHeight=k;if(h.keepMax){fco(h,k);fc3b(j.getContentElement(),"height",k+35+"px")}h["view-params"]=h["view-params"]||{};h["view-params"].opaque=fcb;h["view-params"].skin=
h["view-params"].skin||{};fcDa(h["view-params"].skin,i);e.render(h);k={};k.id="gadget-signin";k.presentation="canvas";k.site=h.site;k.titleDivId="gfc-canvas-title";k["view-params"]={};k["view-params"].opaque=fcb;k.keepMax=h.keepMax;if(h.securityToken)k.securityToken=h.securityToken;h=fcV(i);h.ALIGNMENT=d?"left":"right";e.Pa(k,h);j.reposition()},fcaa,b,c)};fc9[fc].sc=function(a,b){fc5.g!=fcc&&fc5.g.tc(a,b)};fc9[fc].Gb=function(a){fc5.g!=fcc&&fc5.g.ia(a)};
var fcFc=function(a,b,c,d,e,j,h,i,k,l){var f=this,g=this.f;a=a+(a[fcC]("?")>=0?"&":"?")+"iframeId="+g;fc5.na(a,b,c,d,e,j,h,i,k,l,f.callback)};
fc9[fc].na=function(a,b,c,d,e,j,h,i,k,l,f){for(var g=[],m=0;m<arguments[fcr]&&m<10;m++)g[fcq](arguments[m]);if(!a[0]=="/")fca(new Error("lightbox iframes must be relative to fc server"));var q=this,n=j?fcV(j):{},r=fch(fcl[fct](2147483647*fcl[fcna]())),o="gfc_lbox_iframe_"+r;fce.rpc.setAuthToken(o,r);if(!b)b=fc5.openSocialSecurityToken;var t=fc5.openSocialSiteId;fc5.V(function(p){q.lastIframeLightboxOpenArguments=g;var v="st="+fcg(b)+"&parent="+fcg(fc5.P)+"&rpctoken="+fcg(r);if(!i){n.iframeId=o;n.iurl=
a;a=fcf+"/friendconnect/lightbox"}var s=d-54,u='<iframe id="'+o;u+='" width="100%" height="'+s+'" frameborder="0" scrolling="auto"></iframe>';p.setContent(u);if(e){p.setTitle(e);if(l){s=p.getTitleTextElement();fcAb(s,"lightbox-dialog-title-small-text")}}p.setVisible(fcb);k||(n.fcauth=fc5.Ea(t));a+=(a[fcC]("?")>=0?"&":"?")+v+"&communityId="+t;fcBc(o,a,"POST",n,fcc,fcc,fcc)},fcc,f,fcc,c,d)};fc9[fc].jb=function(){var a=fc$(this.f);a=fc5.v(a);return a.viewParams};
fc9[fc].Vb=function(a,b){var c=fc$(this.f);c=fc5.v(c);c.viewParams[a]=b};fc9[fc].Eb=function(a,b){fc5.g!=fcc&&fc5.g.Pb(b)};fc9[fc].Fb=function(a,b){fc5.g!=fcc&&fc5.g.Qb(b)};fc9[fc].gb=function(a,b,c,d){fc5.g!=fcc&&fc5.g.hb(a,b,c,d)};fc9[fc].F=function(a){var b=this.z.Ha(a);a.render(b);this.z.postProcessGadget&&this.z.postProcessGadget(a)};fc9[fc].signout=function(a){fc5.Oa(fc5.ba(a));fc5.Oa(fc5.fa(a));fc5.Aa={};fc5.Q();return fcd};
fc9[fc].Oa=function(a){var b=fck[fcA].pathname;b=b[fcx]("/");for(var c=0;c<b[fcr];c++){for(var d=new Array(c+1),e=0;e<c+1;e++)d[e]=b[e];fclb(a,d[fcR]("/")+"/")}};
fc9[fc].lc=function(a){var b=fck[fcy](this.f);if(b&&a>0)fco(b[fcD],a+"px");if((b=fck[fcy](this.f+"_body"))&&a>0)fco(b[fcD],a+"px");b=fc$(this.f);var c=fc5.v(b);if(c){if((b=fck[fcy](c.divId))&&a>0){if(c[fcra]&&c[fcra]<a){a=c[fcra];b[fcD].overflowY="auto"}fco(b[fcD],a+"px")}!c.keepMax&&c.ha()=="canvas"&&fc5.lastLightboxDialog&&fc5.lastLightboxDialog.reposition()}fc3b(c.chrome,"visibility","visible")};fc9[fc].setTitle=function(a){var b=fc$(this.f);b=fc5.v(b);if(b=b.titleDivId)fcn(fck[fcy](b),fce[fcL].escapeString(a))};
fc9[fc].signin=function(a,b,c){fcjb(fc5.ba(a),b,31104E3,c);fcjb(fc5.fa(a),b,-1,c);fc5.Aa[a]=b;fc5.Q()};var fcLc=function(a){fcmc(a,fcKc)};fc9[fc].bc=function(a,b){b&&this.l(b,a);b={};b.url=fcf+"/friendconnect/gadgets/members.xml";this.render(this.r(a,b))};fc9[fc].dc=function(a,b){b&&this.l(b,a);b={};b.url=fcf+"/friendconnect/gadgets/review.xml";b["view-params"]={startMaximized:"true",disableMinMax:"true",features:"review"};this.render(this.r(a,b))};
fc9[fc].pa=function(a,b){b&&this.l(b,a);b={};b.url=fcf+"/friendconnect/gadgets/wall.xml";b["view-params"]={startMaximized:"true",disableMinMax:"true",features:"comment"};this.render(this.r(a,b))};fc9[fc].Pa=function(a,b){b&&this.l(b,a);b={};b.url=fcf+"/friendconnect/gadgets/signin.xml";fco(b,32);this.render(this.r(a,b))};
fc9[fc].Zb=function(a,b){b&&this.l(b,a);a.prefs=a.prefs||{};a.sendViewParamsToServer=fcb;a.prefs.hints=fci.google_hints;b={};b.url=fcf+"/friendconnect/gadgets/ads.xml";fco(b,90);this.render(this.r(a,b))};fc9[fc].sa=function(a,b){if(a.id){b&&this.l(b,a);a["view-params"]=a["view-params"]||{};a["view-params"].opaque="true";this.g=new fc3(a);this.g.render();b={};b.url=fcf+"/friendconnect/gadgets/friendbar.xml";a.id=this.g.s;fco(a,"1");this.render(this.r(a,b))}};fc9[fc].ac=fc9[fc].sa;
fc9[fc].ra=function(a,b){a=a||{};a.url=fcf+"/friendconnect/gadgets/signin.xml";a.site=a.site||fce[fcL][fcB]().site;fco(a,32);this.qa(a,b)};fc9[fc].$b=fc9[fc].ra;fc9[fc].fc=fc9[fc].pa;fc9[fc].l=function(a,b){var c=b["view-params"];if(!c){c={};b["view-params"]=c}c.skin=a};fc9[fc].r=function(a,b){var c=this.Na(b,a);if(b["view-params"]){b=b["view-params"];if(a["view-params"])b=this.Na(b,a["view-params"]);c["view-params"]=b}return c};fc9[fc].cc=function(a,b){b&&this.l(b,a);this.render(a)};
fc9[fc].Na=function(a,b){var c={},d;for(d in b)c[d]=b[d];for(d in a)if(typeof c[d]=="undefined")c[d]=a[d];return c};
fc9[fc].render=function(a){this.openSocialSiteId=a.site;a["view-params"]=a["view-params"]||{};var b=this.J({divId:a.id,specUrl:a.url,communityId:a.site,height:a[fcP],locale:a.locale||this.Ob,secureToken:a.securityToken,titleDivId:a.titleDivId,showEmbedThis:a.showEmbedThis,useLightBoxForCanvas:a.useLightBoxForCanvas||typeof a.useLightBoxForCanvas=="undefined"&&fci.friendconnect_lightbox,viewParams:a["view-params"],prefs:a.prefs,originalParams:a,debug:a.debug,maxHeight:a[fcra],sendViewParamsToServer:a.sendViewParamsToServer,
keepMax:a.keepMax});a.presentation&&b.qc(a.presentation);this.Za(b);this.z.$a(b.id,a.id);fcca(function(){fc5.F(b)},0);return b.id};fc9[fc].ec=function(a,b){a=a||{};a.presentation="canvas";this.Qa(a,b)};
fc9[fc].Qa=function(a,b,c){a=a||{};a.url=fce[fcL][fcB]().url;a.site=fce[fcL][fcB]().site||a.site;var d=fce[fcL][fcB]()["view-params"];if(d)a["view-params"]=fce[fcJ].parse(decodeURIComponent(d));if(c){a["view-params"]=a["view-params"]||{};a["view-params"].useFixedHeight=fcb;fco(a["view-params"],c);b=b||{};b.HEIGHT=fch(c)}this.qa(a,b)};fc9[fc].qa=function(a,b){a=a||{};b&&this.l(b,a);if(fce[fcL][fcB]().canvas=="1")a.presentation="canvas";else if(fce[fcL][fcB]().embed=="1")a.presentation="embed";fc5.render(a)};
fc9[fc].Db=function(){var a=fce[fcL][fcB]().caller;if(a&&fck[fcA][fcqa]!=a&&a[fcr]>8&&(a.substr(0,7)[fcwa]()=="http://"||a.substr(0,8)[fcwa]()=="https://"))fck[fcA].href=a;else if(a=fce[fcL][fcB]().site)fck[fcA].href=fcf+"/friendconnect/directory/site?id="+a;else fci.history.go(-1)};fc9[fc].D="";fc9[fc].zb=function(){return this.D};fc9[fc].ic=function(a){this.apiVersion=a};fc9[fc].X=function(a){var b=fck[fcI]("link");b[fcK]("rel","stylesheet");b[fcK]("type","text/css");b[fcK]("href",a);fck.getElementsByTagName("head")[0][fcp](b)};
fc9[fc].ab=function(a){var b=fck[fcI]("script");b[fcK]("src",a);b[fcK]("type","text/javascript");fck.getElementsByTagName("head")[0][fcp](b)};fc9[fc].ya=function(a){if(fck[fcma])a();else fci[fcoa]?fci[fcoa]("load",a,fcd):fci.attachEvent("onload",a)};
fc9[fc].ja=function(a){if(!a.site)fca("API not loaded, please pass in a 'site'");this.X(fci.friendconnect_serverBase+"/friendconnect/styles/container.css?v="+this.S);this.openSocialSiteId=a.site;this.apiLoadedCallback=a.onload;this.ya(fcW(this.Ma,this,a,"fc-opensocial-api"))};fc9[fc].Nb=fc9[fc].ja;fc9[fc].Hb=function(a){var b={};b.site=this.openSocialSiteId;b["view-params"]={txnId:a};this.Ma(b,"gfc-"+a)};
fc9[fc].Yb=function(a){var b={};for(var c in this.j){var d=this.j[c];if(d.viewParams&&d.viewParams.txnId==a)break;else b[c]=d}this.j=b;(a=fck[fcy]("gfc-"+a))&&a[fcO]&&a[fcO].removeChild&&a[fcO].removeChild(a)};fc9[fc].tb=function(){return"<Templates xmlns:fc='http://www.google.com/friendconnect/makeThisReal'>  <Namespace prefix='fc' url='http://www.google.com/friendconnect/makeThisReal'/>  <Template tag='fc:signIn'>    <div onAttach='google.friendconnect.renderSignInButton({element: this})'></div>  </Template></Templates>"};
fc9[fc].Ab=function(){return"<Templates xmlns:os='http://ns.opensocial.org/2008/markup'><Namespace prefix='os' url='http://ns.opensocial.org/2008/markup'/><Template tag='os:Name'>  <span if='${!My.person.profileUrl}'>${My.person.displayName}</span>  <a if='${My.person.profileUrl}' href='${My.person.profileUrl}'>      ${My.person.displayName}</a></Template><Template tag='os:Badge'>  <div><img if='${My.person.thumbnailUrl}' src='${My.person.thumbnailUrl}'/>   <os:Name person='${My.person}'/></div></Template><Template tag='os:PeopleSelector'>  <select onchange='google.friendconnect.PeopleSelectorOnChange(this)' name='${My.inputName}'          multiple='${My.multiple}' x-var='${My.var}' x-max='${My.max}'          x-onselect='${My.onselect}'>    <option repeat='${My.group}' value='${Cur.id}' selected='${Cur.id == My.selected}'>        ${Cur.displayName}    </option>  </select></Template></Templates>"};
var fcMc=function(a){var b;if(a.multiple){b=[];for(var c=0;c<a[fcH][fcr];c++)a[fcH][c].selected&&b[fcq](a[fcH][c].value);c=a.getAttribute("x-max");try{c=1*c}catch(d){c=0}if(c&&b[fcr]>c&&a["x-selected"]){b=a["x-selected"];for(c=0;c<a[fcH][fcr];c++){a[fcH][c].selected=fcd;for(var e=0;e<b[fcr];e++)if(a[fcH][c].value==b[e]){a[fcH][c].selected=fcb;break}}}}else b=a[fcH][a.selectedIndex].value;a["x-selected"]=b;(c=a.getAttribute("x-var"))&&fci.opensocial[fcja]&&fci.opensocial[fcja].getDataContext().putDataSet(c,
b);if(c=a.getAttribute("x-onselect"))if(fci[c]&&typeof fci[c]=="function")fci[c](b);else if(a["x-onselect-fn"])a["x-onselect-fn"][fcM](a);else a["x-onselect-fn"]=new Function(c)};
fc9[fc].Ma=function(a,b){fci.opensocial.template.Loader.loadContent(this.Ab());fci.opensocial.template.Loader.loadContent(this.tb());fci.opensocial[fcja].processDocumentMarkup();var c=fck[fcI]("div");c.id=b;fco(c[fcD],"0px");fcm(c[fcD],"0px");c[fcD].position="absolute";c[fcD].visibility="hidden";fck[fcma][fcp](c);b={};b.url=fcf+"/friendconnect/gadgets/osapi-"+this.apiVersion+".xml";fco(b,0);b.id=c.id;b.site=a.site;b["view-params"]=a["view-params"];this.render(b)};
fc9[fc].bb=function(){fc5.D=this.f;fc5.openSocialSecurityToken=this.a[0];var a=fc5.openSocialSecurityToken;fci.opensocial[fcja].executeRequests();fci.opensocial.template.process();if(fc5.apiLoadedCallback){a=fcCa(fc5.apiLoadedCallback,a);fcca(a,0)}};fc9[fc].L=function(a){var b=fcc;for(var c in this.j)if(this.j[c].divId==a){b=this.j[c];break}return b};fc9[fc].B=function(a,b){a=this.L(a);var c=fcc;if(a)c=a.B(b);return c};fc9[fc].A=function(a,b){a=this.L(a);var c=fcc;if(a)c=a.A(b);return c};
fc9[fc].rc=function(a,b){this.V(function(c){var d=fck.createTextNode("Copy & paste this code into your site.");c.getContentElement()[fcp](d);c.getContentElement()[fcp](fck[fcI]("br"));d=fc5.A(a,b);var e=fck[fcI]("textarea");fcn(e,d);e[fcK]("style","width:500px;");c.getContentElement()[fcp](e);c.setVisible(fcb)})};
var fcNc=["ar","dv","fa","iw","he","ku","pa","sd","tk","ug","ur","yi"],fcJc=function(a){a=a;var b=fcd;if(a){a=a[fcx]("_")[0];b=fcpb(fcNc,a)}else b=(a=fc5b(fck[fcma],"direction"))&&a=="rtl";return b},fcGc=function(a,b){var c=this,d=0,e=fcc;try{var j=fc$(c.f),h=fc5.v(j);e=h.secureToken;d=h.communityId}catch(i){}if(b)d=b;fc5.ua(a,d,c.callback,e)};
fc9[fc].ua=function(a,b,c,d){b=b||this.openSocialSiteId;a={keepMax:fcb,presentation:"canvas",url:fcf+"/friendconnect/gadgets/members.xml",site:b,"view-params":{profileId:a}};if(d)a.securityToken=d;this.Ua(a,c)};fc9[fc].vb=function(a){var b=fcc;if((a=this.L(a))&&a.secureToken)b=a.secureToken;return b};fc9[fc].ub=function(a){var b=fcc;if((a=this.L(a))&&a.communityId)b=a.communityId;return b};
var fcKc=function(a){fc5.D&&fcgc(fc5.D,a)},fcOc=function(){fc5.signout(fc5.openSocialSiteId)},fcPc=function(){fcjc(fc5.D)},fcQc=function(a,b){fcfc(a,b)},fcrc=function(){this.n={}};fcrc[fc].register=function(){fce.rpc[fcQ]("subscribeEventType",fcRc);fce.rpc[fcQ]("publishEvent",fcsc)};var fcRc=function(a){var b=fcHc;b.n[a]=b.n[a]||[];a=b.n[a];a[a[fcr]]={frameId:this.f}};fcrc[fc].Va=function(a,b,c){var d=this;d.n[b]=d.n[b]||[];b=d.n[b];b[b[fcr]]={container:a,callback:c}};
var fcsc=function(a){var b=fcHc,c=0;if(this.f)c=fc$(this.f);b.n[a]=b.n[a]||[];b=b.n[a];for(var d=0;d<b[fcr];d++)b[d].container?b[d].callback[fcF](b[d].container,a,c):fce.rpc[fcF](b[d].frameId,a,fcc,a,c)},fcHc=new fcrc,fc5=new fc9;fc5.ya(fc5.mb);fcX("google.friendconnect.container",fc5);fcX("google.friendconnect.container.refreshGadgets",fc5.Q);fcX("google.friendconnect.container.setParentUrl",fc5.T);fcX("google.friendconnect.container.setServerBase",fc5.U);
fcX("google.friendconnect.container.setServerVersion",fc5.pc);fcX("google.friendconnect.container.createGadget",fc5.J);fcX("google.friendconnect.container.openLightboxIframe",fc5.na);fcX("google.friendconnect.container.renderGadget",fc5.F);fcX("google.friendconnect.container.render",fc5.render);fcX("google.friendconnect.container.goBackToSite",fc5.Db);fcX("google.friendconnect.container.renderMembersGadget",fc5.bc);fcX("google.friendconnect.container.renderReviewGadget",fc5.dc);
fcX("google.friendconnect.container.renderCommentsGadget",fc5.pa);fcX("google.friendconnect.container.renderSignInGadget",fc5.Pa);fcX("google.friendconnect.container.renderFriendBar",fc5.ac);fcX("google.friendconnect.container.renderSocialBar",fc5.sa);fcX("google.friendconnect.container.renderCanvasSignInGadget",fc5.$b);fcX("google.friendconnect.container.renderUrlCanvasGadget",fc5.ec);fcX("google.friendconnect.container.renderEmbedSignInGadget",fc5.ra);
fcX("google.friendconnect.container.renderUrlEmbedGadget",fc5.Qa);fcX("google.friendconnect.container.renderEmbedGadget",fc5.qa);fcX("google.friendconnect.container.renderWallGadget",fc5.fc);fcX("google.friendconnect.container.renderAdsGadget",fc5.Zb);fcX("google.friendconnect.container.renderOpenSocialGadget",fc5.cc);fcX("google.friendconnect.container.setNoCache",fc5.Sa);fcX("google.friendconnect.container.enableProxy",fc5.Ba);fcX("google.friendconnect.container.setDomain",fc5.kc);
fcX("google.friendconnect.container.setLockedDomainSuffix",fc5.oc);fcX("google.friendconnect.container.setLocale",fc5.nc);fcX("google.friendconnect.container.loadOpenSocialApi",fc5.Nb);fcX("google.friendconnect.container.initOpenSocialApi",fc5.ja);fcX("google.friendconnect.container.getOpenSocialApiIframeId",fc5.zb);fcX("google.friendconnect.container.setApiVersion",fc5.ic);fcX("google.friendconnect.container.getEmbedUrl",fc5.B);fcX("google.friendconnect.container.getEmbedHtml",fc5.A);
fcX("google.friendconnect.container.getGadgetSecurityToken",fc5.vb);fcX("google.friendconnect.container.getGadgetCommunityId",fc5.ub);fcX("google.friendconnect.container.showEmbedDialog",fc5.rc);fcX("google.friendconnect.container.showMemberProfile",fc5.ua);fcX("google.friendconnect.requestSignIn",fcKc);fcX("google.friendconnect.requestSignOut",fcOc);fcX("google.friendconnect.requestSettings",fcPc);fcX("google.friendconnect.requestInvite",fcQc);fcX("google.friendconnect.renderSignInButton",fcLc);
fcX("google.friendconnect.container.invokeOpenSocialApiViaIframe",fc5.Hb);fcX("google.friendconnect.container.removeOpenSocialApiViaIframe",fc5.Yb);fcX("google.friendconnect.userAgent.WEBKIT",fc_);fcX("google.friendconnect.userAgent.IE",fcZ);fcX("google.friendconnect.PeopleSelectorOnChange",fcMc);fcX("google.friendconnect.container.setDateStamp_",fc5.jc);
google.friendconnect.container.setServerBase('http://www.friendconnect.gmodules.com/ps/');google.friendconnect.container.setServerVersion('0.499.5');google.friendconnect.container.setApiVersion('0.8');
google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/activities.xml', 'http://q8j0igk2u2f6kf7jogh6s66md2d7r154.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/ads.xml', 'http://t767uouk8skpac15v8ue0n16regb3m2t.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/ask.xml', 'http://uofgf6lm45rimd9jp6hn983ul6n2en81.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/friendbar.xml', 'http://p7rjrrl49ose4gob99eonlvp0drmce3d.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/content_reveal.xml', 'http://n0mc7q283f00tpk3uifa7sjv4hmrults.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/chat.xml', 'http://4mmefl67as0q39gf1o4pnocubqmdgei0.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/donate.xml', 'http://7v4nflqvq38notsghmcr5a9t6o9g6kn4.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/lamegame.xml', 'http://ffbrstu9puk7qmt45got9mqe5k7ijrs4.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/map.xml', 'http://k0dfp8trn0hi5d2spmo7jmc88n6kr1cc.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/members.xml', 'http://r1rk9np7bpcsfoeekl0khkd2juj27q3o.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/newsletterSubscribe.xml', 'http://k830suiki828goudg9448o6bp0tpu5r3.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/poll.xml', 'http://1ivjd75aqp679vbgohjv74tlhn13rgdu.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/recommended_pages.xml', 'http://iqavu79a908u5vcecp0pq80hhbhkv33b.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/review.xml', 'http://r85jiaoot111joesr8bilfhfeslcc496.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/sample.xml', 'http://785aoao97uti9iqffknjp5e0kn2ljlm4.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/signin.xml', 'http://8fkcem1ves287v3g5lu9gep1j91p3kk1.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/wall.xml', 'http://o29lt44ell30t7ljcdfr8lq2mjakv2co.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setDomain('http://www.google.com/friendconnect/gadgets/osapi-0.8.xml', 'http://mc8tdi0ripmbpds25eboaupdulritrp6.friendconnect.gmodules.com/ps/');

google.friendconnect.container.setLockedDomainSuffix('.friendconnect.gmodules.com/ps/');
window['__ps_loaded__'] = true; 
 }google.friendconnect_ = google.friendconnect;
google.friendconnect.container.setDateStamp_('12583f1ef20');