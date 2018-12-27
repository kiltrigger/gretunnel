if(undefined==tf_ad_call){
	var tf_ad_call=1;
	var tf_version = '82';
	function tf_adscript(u){
		try{
			if(navigator.appVersion.indexOf('MSIE')>=0 && ('uninitialized'==document.readyState||'interactive'==document.readyState||'loading'==document.readyState)){
				document.write('<s'+'cript language="javascript" src="'+u+'"></s'+'cript>');
			}else{
				var spt=document.createElement("script");
				spt.type="text/javascript";
				spt.src=u;
				if(document.getElementsByTagName("head")[0]){
					document.getElementsByTagName("head")[0].appendChild(spt);
				}else{
					document.getElementsByTagName("body")[0].appendChild(spt);
				}
			}
		}catch(e){}
	}

	if(typeof tf_pubSiteId != 'undefined' && tf_pubSiteId != null) {
		tf_adscript("http://ctxtad.tribalfusion.com/ctxtad/markerserve?siteId="+tf_pubSiteId);
	}
}