var ar_param_quality = 'best';
var ar_embed_quality = 'best';
var ar_w = 'opaque';
if (typeof(ar_quality) != 'undefined') {
if (ar_quality != '') {ar_param_quality = ar_quality; ar_embed_quality = ar_quality;}
}
if (typeof(ar_wmode) != 'undefined'){
if (ar_wmode != '') {ar_w = ar_wmode;}
}
var ar_flashvars = 'link1=' + escape(ar_redirect) + '&target=' + ar_target + ar_p('&ar_bid', ar_bid) + ar_p('&ar_ntype', ar_ntype) + ar_p('&ar_comppath', ar_CompPath) + ar_p('&sid', ar_sid);
var ar_src = (ar_swf.indexOf("http://") != 0 ? ar_CompPath : '') + ar_swf;

var ar_html = '';
ar_html = '<object id="ar_flash" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ar_metrics + '>'
+ '<param name=movie value="' + ar_src + (ar_src.indexOf('?') != -1 ? '&' : '?') + ar_flashvars + '">'
+ '<param name=play value=true>'
+ '<param name=loop value=true>'
+ '<param name=wmode value=' + ar_w + '>'
+ '<param name=quality value=' + ar_param_quality + '>'
+ '<param name=menu value=false>'
+ '<param name=allowScriptAccess value=always>'
+ '<param name=flashvars value="' + ar_flashvars + '">'
+ '<embed type="application/x-shockwave-flash" src="' + ar_src + (ar_src.indexOf('?') != -1 ? '&' : '?') + ar_flashvars + '"' + ar_metrics
+ ' allowScriptAccess=always play=true loop=true wmode=' + ar_w + ' quality=' + ar_embed_quality + ' flashvars="' + ar_flashvars + '" menu=false></embed>'
+ '</object>';
document.write(ar_html);