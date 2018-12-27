//  Copyright (c) 2000-2009 ZEDO Inc. All Rights Reserved.
function F3(){
var p2=navigator.userAgent.toLowerCase();var e9=(p2.indexOf('mac')!=-1);var e12=parseInt(navigator.appVersion);
var x7=(!e9&&(p2.indexOf('opera')==-1)&&(p2.indexOf('msie')!=-1)&&(e12>=4)&&(p2.indexOf('webtv')==-1)&&(p2.indexOf('msie 4')==-1));
if(x7){
document.writeln('<scr'+'ipt language=VBS'+'cript>');
document.writeln('on error resume next');
document.writeln('t0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))');
document.writeln('if(t0<=0)then t0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))');
document.writeln('</scr'+'ipt>');
}
else if(navigator.mimeTypes&&
navigator.mimeTypes["application/x-shockwave-flash"]&&
navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){
var x4=navigator.plugins["Shockwave Flash"].description;
if(parseInt(x4.substring(x4.indexOf(".")-1))>=4){
t0=1;
}}}
var n5=navigator.javaEnabled();
a0=1;
if(n5){a0 |=4;}
if(t0){a0 |=8;}
if(x7){
if(document.body){
document.body.style.behavior='url(#default#clientCaps)';
if(document.body.connectionType=='lan'){
a0 |=16;
}}}
return a0;
}
function U3(){
var i7=new Array('d1','d2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de','df');
return i7;
}
var d0=0;var z1=0;var z0='0';var e0=0;var i6='';var t0=0;var d7='';var z4='';var d6='';var e5="";var c10='';var e11='';var n2=new Array();var x0='';
if(typeof zflag_nid!='undefined'){
d0=zflag_nid;
zflag_nid=0;
}
if(typeof zflag_sid!='undefined'){
z1=zflag_sid;
zflag_sid=0;
}
if(typeof zflag_cid!='undefined'){
z0=zflag_cid;
if(z0<0||z0>999999){
z0=0;
}
zflag_cid=0;
}
if(typeof zflag_sz!='undefined'){
e0=zflag_sz;
if(e0<0||e0>95){
e0=0;
}
zflag_sz=0;
}
if(typeof zflag_kw!='undefined'){
zflag_kw=zflag_kw.replace(/&/g,'zzazz');
i6=escape(zflag_kw);
zflag_kw="";
}
if(typeof zflag_geo!='undefined'){
if(!isNaN(zflag_geo)){
z4="&g="+zflag_geo;
zflag_geo=0;
}}
if(typeof zflag_param!='undefined'){
e5="&p="+zflag_param;
zflag_param="";
}
if(typeof zflag_click!='undefined'){
zzTrd=escape(zflag_click);
d6='&l='+zzTrd;
zflag_click="";
}
/*
* zflag_hasAd is a parameter of the Yes/ No Wrapper tag and supports the options:
* 0=set by the avatar if ZEDO does not have an Ad to serve,and the wrapper fyn.js serves the Publisher Ad. 
* 1=ZEDO makes the Ad call only if ZAN profile cookie is present
* 2=ZEDO makes the Ad call,whether or not ZAN profile cookie is present
*
*/
if(typeof zflag_hasAd!='undefined'){
c10='&y='+zflag_hasAd;
}
if(typeof zflag_num!='undefined'){
e11=zflag_num;
zflag_num=0;
}
if(typeof zflag_ck!='undefined'){
x0='&ck='+zflag_ck;
zflag_ck=0;
}
n2=U3();
for(var i=0;i<n2.length;i++){
if(eval('typeof(zflag_'+n2[i]+')!="undefined"')){
x0=x0+'&'+n2[i]+'='+eval('zflag_'+n2[i]);
eval('zflag_'+n2[i]+'="";');
}}
var zzStr='';
if(typeof zzCountry=='undefined'){
var zzCountry=255;}
if(typeof zzMetro=='undefined'){
var zzMetro=0;}
if(typeof zzState=='undefined'){
var zzState=0;}var zzSection=z1;var zzD=window.document;var zzRand=(Math.floor(Math.random()* 1000000)% 10000);var zzCustom='';var zzPat='';var zzSkip='';var zzExp='';var zzTrd='';var zzPos=0;
var zzNw=0;var zzCh=0;var zzDmCodes=new Array();var zzDmValues=new Array();var zzBr=99;var zzLang=99;var zzAGrp=0;var zzAct=new Array();var zzActVal=new Array();
d7=F3();
if(d7<0||d7>31){
d7=1;
}
c0='<scr'+'ipt language="JavaScript" src="http://d7.zedo.com/bar/v15-300/d3/jsc/fm.js?c='+z0+'&f='+e11+'&n='+d0+'&r='+d7+'&d='+e0+'&q='+i6+'&s='+z1+z4+e5+d6+c10+x0+'&z='+Math.random()+'"></scr'+'ipt>';
document.write(c0);
