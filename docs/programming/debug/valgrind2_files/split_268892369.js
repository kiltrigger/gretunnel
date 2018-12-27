var split_id = 268892369;
if (typeof window.awf_Form_=='undefined') window.awf_Form_ = new Object();
awf_Form_.isPreview = false;
awf_Form_.setCookie = function(name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
    document.cookie = curCookie;
}

awf_Form_.getCookie = function(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else
        begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
        end = dc.length;
    return unescape(dc.substring(begin + prefix.length, end));
}
awf_Form_.showForm = function() {
    /*@cc_on
    /*@if (@_jscript_version > 5.5)
           var isIE = true;
      @else
           var deprecatedBrowser = true;
      @end @*/
    if (typeof isIE == 'undefined') {
        var isIE = false;
    }
    if (!isIE && !window.XMLHttpRequest) {
        var deprecatedBrowser = true;
    }
    if (deprecatedBrowser) {
       window.open('http://forms.profollow.com/form/32/268892369-707932.html','winPopUp','resizable=1,scrollbars=1,location=0,width=400,height=430');
       return true;
    }
    // Exit early for TY Landing Page option
    if (document.location.href.indexOf('meta_web_form_id') > 0) return;

    if (typeof awf_Form_.scriptAppended=='undefined') {
        try {
            var script = document.createElement('script');
            script.src = "http://forms.profollow.com/form/styled_popovers_and_lightboxes.js";
            script.type = 'text/javascript';
            document.getElementsByTagName('HEAD')[0].appendChild(script);
        } catch(e) {
            //IE5 for Mac and IE timeout issues
            try {
                document.write('<script type="text/javascript" src="' + src + '"></scr'+'ipt>');
            } catch(e) { }
        }
        awf_Form_.scriptAppended = true;
    }
    var loadForm = function() { awf_Form_.form = new awf_Form_.AWFormGenerator( {"_log":null,"id":"707932","form":"<form method=\"post\" class=\"af-form-wrapper\" action=\"http:\/\/clients.profollow.com\/scripts\/addlead.pl\"  >\n<div style=\"display: none;\">\n<input type=\"hidden\" name=\"meta_web_form_id\" value=\"707932\" \/>\n<input type=\"hidden\" name=\"meta_split_id\" value=\"268892369\" \/>\n<input type=\"hidden\" name=\"listname\" value=\"cprogramming\" \/>\n<input type=\"hidden\" name=\"redirect\" value=\"http:\/\/www.cprogramming.com\/vnologo_thankyou.php\" id=\"redirect_57980edbe0abdd7beafcd7f80b5fdcfa\" \/>\n\n<input type=\"hidden\" name=\"meta_adtracking\" value=\"s5,ns,l,rc,bt-nl,10s\" \/>\n<input type=\"hidden\" name=\"meta_message\" value=\"1\" \/>\n<input type=\"hidden\" name=\"meta_required\" value=\"email\" \/>\n<input type=\"hidden\" name=\"meta_forward_vars\" value=\"\" \/>\n<input type=\"hidden\" name=\"meta_tooltip\" value=\"\" \/>\n<\/div>\n<div id=\"af-form-707932\" class=\"af-form\"><div id=\"af-header-707932\" class=\"af-header\"><div class=\"bodyText\"><center><div><img alt=\"\" src=\"http:\/\/www.cprogramming.com\/cprog.gif\" width=\"323\" height=\"86\" title=\"\"><br>\r\n<\/div>\r\n<div>Join our mailing list to keep up with the latest news and updates about Cprogramming.com!<\/div><\/center><\/div><\/div>\n<div id=\"af-body-707932\" class=\"af-body af-standards\">\n<div class=\"af-element\">\n<label class=\"previewLabel\" for=\"awf_field-4445319\">Name<\/label>\n<div class=\"af-textWrap\">\n<input id=\"awf_field-4445319\" type=\"text\" name=\"name\" class=\"text\" value=\"\"  \/>\n<\/div>\n<div class=\"af-clear\"><\/div><\/div>\n<div class=\"af-element\">\n<label class=\"previewLabel\" for=\"awf_field-4445320\">Email<\/label>\n<div class=\"af-textWrap\"><input class=\"text\" id=\"awf_field-4445320\" type=\"text\" name=\"email\" value=\"\"  \/>\n<\/div><div class=\"af-clear\"><\/div>\n<\/div>\n<div class=\"af-element\">\n<div class=\"bodyText\"><center><div>Your privacy will be respected, and your email address will <strong>never<\/strong> be <font face=\"wp_bogus_font\">sold<\/font>.<\/div><\/center><\/div><div class=\"af-clear\"><\/div>\n<\/div>\n<div class=\"af-element buttonContainer\">\n<input name=\"submit\" class=\"submit\" type=\"submit\" value=\"Submit\"\/>\n<div class=\"af-clear\"><\/div>\n<\/div>\n<div class=\"af-element\" style=\"text-align: center\">\n<img src=\"http:\/\/forms.profollow.com\/form\/ci\/?tc=FFFFFF&amp;bg=0077E7&amp;d=nCwsbKwMPgpO9mL2Njb27j4sLCyszEzM\" alt=\"Subscriber Counter\" \/>\n<\/div>\n<\/div>\n<div id=\"af-footer-707932\" class=\"af-footer\"><div class=\"bodyText\"><p>&nbsp;<\/p><\/div><\/div>\n<\/div>\n<\/form>\n","styles":"#af-form-707932 .af-body .af-textWrap{width:70%;display:block;float:right;}\n#af-form-707932 .af-body a{color:#000000;text-decoration:underline;font-style:normal;font-weight:normal;}\n#af-form-707932 .af-body input.text, #af-form-707932 .af-body textarea{background-color:#FFFFFF;border-color:#CCCCCC;border-width:2px;border-style:inset;color:#000000;text-decoration:none;font-style:normal;font-weight:normal;font-size:inherit;font-family:inherit;}\n#af-form-707932 .af-body input.text:focus, #af-form-707932 .af-body textarea:focus{background-color:inherit;border-color:#CCCCCC;border-width:2px;border-style:inset;}\n#af-form-707932 .af-body label.previewLabel{display:block;float:left;width:25%;text-align:left;color:#000000;text-decoration:none;font-style:normal;font-weight:normal;font-size:inherit;font-family:inherit;}\n#af-form-707932 .af-body{padding-bottom:15px;background-repeat:no-repeat;background-position:inherit;background-image:none;color:inherit;font-size:12px;font-family:, serif;}\n#af-form-707932 .af-footer{background-color:#FFFFFF;background-repeat:no-repeat;background-position:top left;background-image:none;border-bottom-style:none;border-left-style:none;border-right-style:none;border-top-style:none;color:inherit;font-family:, serif;}\n#af-form-707932 .af-header{padding-bottom:15px;padding-top:15px;padding-right:15px;padding-left:15px;background-color:#FFFFFF;background-repeat:no-repeat;background-position:inherit;background-image:none;border-bottom-style:none;border-left-style:none;border-right-style:none;border-top-style:none;color:inherit;font-family:, serif;}\n#af-form-707932 .af-quirksMode .bodyText{padding-top:2px;padding-bottom:2px;}\n#af-form-707932 .af-quirksMode{padding-right:15px;padding-left:15px;}\n#af-form-707932 .af-standards .af-element{padding-right:15px;padding-left:15px;}\n#af-form-707932 .bodyText p{margin:1em 0;}\n#af-form-707932 .buttonContainer input.submit{color:#000000;text-decoration:none;font-style:normal;font-weight:normal;font-size:inherit;font-family:inherit;}\n#af-form-707932 .buttonContainer input.submit{width:auto;}\n#af-form-707932 .buttonContainer{text-align:center;}\n#af-form-707932 body,#af-form-707932 dl,#af-form-707932 dt,#af-form-707932 dd,#af-form-707932 h1,#af-form-707932 h2,#af-form-707932 h3,#af-form-707932 h4,#af-form-707932 h5,#af-form-707932 h6,#af-form-707932 pre,#af-form-707932 code,#af-form-707932 fieldset,#af-form-707932 legend,#af-form-707932 blockquote,#af-form-707932 th,#af-form-707932 td{float:none;color:inherit;position:static;margin:0;padding:0;}\n#af-form-707932 button,#af-form-707932 input,#af-form-707932 submit,#af-form-707932 textarea,#af-form-707932 select,#af-form-707932 label,#af-form-707932 optgroup,#af-form-707932 option{float:none;position:static;margin:0;}\n#af-form-707932 div{margin:0;}\n#af-form-707932 fieldset{border:0;}\n#af-form-707932 form,#af-form-707932 textarea,.af-form-wrapper,.af-form-close-button,#af-form-707932 img{float:none;color:inherit;position:static;background-color:none;border:none;margin:0;padding:0;}\n#af-form-707932 input,#af-form-707932 button,#af-form-707932 textarea,#af-form-707932 select{font-size:100%;}\n#af-form-707932 p{color:inherit;}\n#af-form-707932 select,#af-form-707932 label,#af-form-707932 optgroup,#af-form-707932 option{padding:0;}\n#af-form-707932 table{border-collapse:collapse;border-spacing:0;}\n#af-form-707932 ul,#af-form-707932 ol{list-style-image:none;list-style-position:outside;list-style-type:disc;padding-left:40px;}\n#af-form-707932,#af-form-707932 .quirksMode{width:400px;}\n#af-form-707932.af-quirksMode{overflow-x:hidden;}\n#af-form-707932{background-color:#FFFFFF;border-color:inherit;border-width:none;border-style:none;}\n.af-body .af-textWrap{text-align:left;}\n.af-body input.image{border:none!important;}\n.af-body input.submit,.af-body input.image,.af-form .af-element input.button{float:none!important;}\n.af-body input.text{width:100%;float:none;padding:2px!important;}\n.af-body.af-standards input.submit{padding:4px 12px;}\n.af-clear{clear:both;}\n.af-element label{text-align:left;display:block;float:left;}\n.af-element{padding:5px 0;}\n.af-form-wrapper{text-indent:0;}\n.af-form{text-align:left;margin:auto;}\n.af-header,.af-footer{margin-bottom:0;margin-top:0;padding:10px;}\n.af-quirksMode .af-element{padding-left:0!important;padding-right:0!important;}\n.dropShadowBottom707932{background:url(http:\/\/forms.profollow.com\/images\/wfg\/drop-bottom.png) repeat-x;width:398px;height:10px;float:left;margin-bottom:0;line-height:0;font-size:0;padding:0;}\n.dropShadowL707932{background:url(http:\/\/forms.profollow.com\/images\/wfg\/drop-left.png) repeat-y;line-height:0;font-size:0;width:10px;height:100%;float:left;margin-bottom:0;}\n.dropShadowLL707932{background:url(http:\/\/forms.profollow.com\/images\/wfg\/drop-bottomLeft.png) no-repeat;width:10px;height:10px;float:left;margin-bottom:0;line-height:0;font-size:0;padding:0;}\n.dropShadowLR707932{background:url(http:\/\/forms.profollow.com\/images\/wfg\/drop-bottomRight.png) no-repeat;width:10px;height:10px;float:left;margin-bottom:0;line-height:0;font-size:0;padding:0;}\n.dropShadowR707932{background:url(http:\/\/forms.profollow.com\/images\/wfg\/drop-right.png) repeat-y;width:10px;height:100%;float:right;margin-bottom:0;}\n.dropShadowTop707932{background:url(http:\/\/forms.profollow.com\/images\/wfg\/drop-top.png) repeat-x;width:398px;height:10px!important;line-height:0;font-size:0;float:left;margin-bottom:0;padding:0;}\n.dropShadowUL707932{background:url(http:\/\/forms.profollow.com\/images\/wfg\/drop-topLeft.png) no-repeat;width:10px;height:10px!important;float:left;margin-bottom:0;line-height:0;font-size:0;padding:0;}\n.dropShadowUR707932{background:url(http:\/\/forms.profollow.com\/images\/wfg\/drop-topRight.png) no-repeat;width:10px;line-height:0;font-size:0;height:10px!important;float:left;margin-bottom:0;padding:0;}\n.lbl-right .af-element label{text-align:right;}\nbody {\n}","height":"430","width":"400","plPath":"forms.profollow.com","delay":"10","popupURL":"http:\/\/forms.profollow.com\/form\/32\/268892369-707932.html","formType":"lightbox","animation":"default","redirectId":"redirect_57980edbe0abdd7beafcd7f80b5fdcfa","returnToPage":0} ); };
    if (typeof awf_Form_.AWFormGenerator == 'undefined') {
        var unique_track = new Image();
        unique_track.src = "http://forms.profollow.com/form/displays.htm?id=7AzsnMxM&split_id=" + split_id;
        if (typeof awf_Form_.FormQueue == 'undefined') { awf_Form_.FormQueue = []; }
        awf_Form_.FormQueue.push(loadForm);
    } else {
        var unique_track = new Image();
        unique_track.src = "http://forms.profollow.com/form/displays.htm?id=7AzsnMxM&split_id=" + split_id;
        loadForm();
    }
}

if ((awf_Form_.isPreview || !awf_Form_.getCookie('awpopup_707932')) && typeof hide_awf_Form=='undefined') {
    awf_Form_.currDate = new Date();
    awf_Form_.currDate.setTime(awf_Form_.currDate.getTime() + 315360000000);
    awf_Form_.setCookie('awpopup_707932', '1', awf_Form_.currDate, '/', document.domain, 0);
    awf_Form_.showForm();
}
