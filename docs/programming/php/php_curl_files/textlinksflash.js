var keywordsServer = "http://ctxtad.tribalfusion.com/ctxtad";
var keywordsServerOnFly = "http://ctxtfly.tribalfusion.com/ctxtad";
var textlinksServer = "http://ctxt.tribalfusion.com/ctxt";
var staticcontentServer = "http://cdn1.ctxt.tribalfusion.com/ctxt";
var mode = "prod";
var clickmode = "direct";
if (typeof(newclickmode) != "undefined") {
	clickmode = newclickmode;
} 

var head_node = document.getElementsByTagName("head")[0];

var etDebug = 0;
var etLogID = Math.random().toString().replace("0.", "");
var tf_textLinkMarkers = ["pagecontent", "konabody", "intellitxt", "echotopic", "contentpaneopen", "postbody", "realtext", "newscontent", "content", "posttext", "news_content", "storycontent", "post", "eba_article", "postcontent", "postmsg", "entry", "contentbody", "post_inner"];

//all the content markers should be in small case
if (typeof tf_server_textLinkMarkers != 'undefined' && tf_server_textLinkMarkers)
	tf_textLinkMarkers = tf_server_textLinkMarkers;

if (typeof tf_pubSiteId != 'undefined' && tf_pubSiteId != null && tf_pubSiteId) {
	if (tf_pubSiteId == 90 || tf_pubSiteId == 125 || tf_pubSiteId == 170) {
		tf_textLinkMarkers = ["echotopic"];
	} else if (tf_pubSiteId == 150) {
		tf_textLinkMarkers = ["echotopic", "contentpaneopen"];
	} else if (tf_pubSiteId == 214) {
		tf_textLinkMarkers = ["entry", "echotopic"];
	}
}

var tf_blockedContentMarkers = ["nointellitxt", "noechotopic"];
var tf_textLinkMarkersRegex = [/^post_message_/, /^pid_/, /^post-/];
if (typeof tf_server_textLinkMarkersRegex != 'undefined' && tf_server_textLinkMarkersRegex)
	tf_textLinkMarkersRegex = tf_server_textLinkMarkersRegex;

var tf_digitOnly_Regex = /^\d+$/;
var tf_advObjects = new Array();
var tf_avialableAdvIds = new Array();
var tf_boundAdvIds = new Array();
var tf_linkObjects = new Array();
var tf_pubObj;
var tf_expIndexArray = new Array();
var enableOTFFullMatching = true;
var maxTotalPackets = 3;
var tf_docURL;
var tf_test;
var tf_timeoutCount = 0;
var tf_ads;
var tf_otf_hash_key;
var tf_ad_mode = "NORMAL";
var tf_zip;
var tf_city;
var tf_state;
var tf_pub_attributes;
var tf_color_scheme_attribute;
var tf_partner_attributes;
var PG_ID = 111;
var TD_ID = 115;
var SH_ID = 116;
var ITM_ID = 126;
var SS_ID = 501;
var ASK_ID = 202;
var LIVE_ID = 201;
var ARTS_ENTERTAINMENT = 2;
var tf_on_fly_flag;
var images;
var cssFileName = textlinksServer + '/../extdata/widget/css/textlinks.css';
var tf_flash_adNum;
var diceAdNumber = 0;
var tf_clear_flash = "clear";
var tf_flash_hidden = true;
var flashLoaded = false;
var flash3DPLoaded = false;
var nodeSrc;
var tf_flashDiv_width = 400;
var tf_flashDiv_height = 600;
var tf_flash_topBorder = 20;
var tf_flash_load_counter = 0;
var tf_flash_third_party_load_counter = 0;
var tf_css_key = 0;
var tf_flash_key = 1;
var tf_current_flash_name = 'widget_v1';
var tf_flash_object;
var tf_flash_third_party_object = null;
var tf_adjustPos = true;
var tf_started = false;
var tf_onload = null;
var tf_ActiveXObject = new Array();

var searchState = "Web";
var thisBrowser = navigator.userAgent;

var CLICK_TAG_WEB = "http://search.live.com/results.aspx?q=";
var CLICK_TAG_IMAGE = "http://search.live.com/images/results.aspx?q=";
var CLICK_TAG_MAPS = "http://maps.live.com/?q=";
var CLICK_TAG_QNA = "http://qna.live.com/AskQuestion.aspx?q=";

var ASK_CLICK_TAG_WEB = "http://www.ask.com/web?q=";
var ASK_CLICK_TAG_IMAGE = "http://images.ask.com/pictures?q=";
var ASK_CLICK_TAG_BLOGS = "http://www.ask.com/blogsearch?q=";
var ASK_CLICK_TAG_NEWS = "http://news.ask.com/news?q=";
var COMP_SRCH = "comp_search";
var COMPUTING_SEARCH = "http://www.computing.net/cgi-bin/AT-search.cgi?mode=concept&search=";
var Dice_SEARCH_prefix = "http://ad.doubleclick.net/clk;68656006;19323463;l?http://seeker.dice.com/jobsearch/servlet/JobSearch?op=300&rel_code=1102&N=0&Hf=0&NUM_PER_PAGE=30&Ntk=JobSearchRanking&Ntx=mode+matchall&QUICK=1&RADIUS=64.37376&TRAVEL=0&TAXTERM=0&SORTSPEC=0&FRMT=0&DAYSBACK=30&LOCATION_OPTION=2&FREE_TEXT=";
var Dice_SEARCH_append = "&WHERE=";
var Dice_SEARCH_suffix = "&SEARCH.x=37&SEARCH.y=8";

var DICE_DOUBLE_CLICK_PREFIX = "http://ad.doubleclick.net/clk;68656006;19323463;l?";
var DICE_SALARY_B = "http://seeker.dice.com/profman/salaryWizard.jsp";
var DICE_SALARY_DIRECT_MATCH_prefix = "http://dice.salary.com/salarywizard/layoutscripts/swzl_keywordtitleselect.asp?narrowdesc=&searchtextvalue=";
var DICE_LOCATION_TYPE_ID = "&locationtypeid=ZIP&zipcode=";
var DICE_SALARY_DIRECT_MATCH_Suffix = "&metrocode=&x=18&y=8";
var DICE_LOCAL_TOP_LEVEL = "http://career-resources.dice.com/it-job-market/quarterly_reports.shtml";
var DICE_LOCAL_DIRECT_MATCH = "http://career-resources.dice.com/it-job-market/Q3-2007/reports.shtml";
var DICE_DEFAULT_INPUT = "<Field>";
var MAJORGEEKS_SRCH_PRFX = 'http://majorgeeks.com/google_search.html?domains=MajorGeeks.com&q=';
var MAJORGEEKS_SRCH_SUFFIX = '&sitesearch=MajorGeeks.com&client=pub-6960825562757852&forid=1&channel=6517887233&ie=ISO-8859-1&oe=ISO-8859-1&cof=GALT%3A%23003300%3BGL%3A1%3BDIV%3A%23665522%3BVLC%3A78B749%3BAH%3Acenter%3BBGC%3Acccc99%3BLBGC%3A336699%3BALC%3A11593C%3BLC%3A11593C%3BT%3A000000%3BGFNT%3A940F04%3BGIMP%3A940F04%3BLH%3A0%3BLW%3A0%3BL%3Ahttp%3A%2F%2Fmajorgeeks.com%2FEric%2F404.gif%3BS%3Ahttp%3A%2F%2Fmajorgeeks.com%3BLP%3A1%3BFORID%3A11&hl=en';

var searchButton = staticcontentServer + "/images/srch-button.gif";
var tf_homePage = 'http://www.echotopic.com';
var ITEM_MATCH = '1';
var trackPrms = '&merchantClick=';
if (window.onload)
	tf_onload = window.onload;

var tf_marked_content_array = new Array();
var tf_page_keywords = new Array();
var tf_page_words = '';
var MAX_OTF_TEXT_CHARS = 4000;
var OTF_WORDS_EXTRACT_LIMIT = 12000;
var OTF_BUFFER = 10;
var tf_page_keywords_count = new Array();
var tf_page_keywords_ext_comp = false;
var tf_page_keywords_ext_count = 0;
var tf_CurrentMD5StrLen = 0;
var tf_colorSchemeId = 0;

var tf_FW = null;
var tf_FH = null;
var tf_BT = null;
var tf_BL = null;
var tf_eventId = 1;
var tf_windowopen = window.open;
var hasThirdPartyads = false;
var tf_event = new Object();
tf_event.isFake = true;
var NotFoundType = { NotPresent: 0, NotSpaced: 1, Other: 100};
var isLoadingImageLoaded = false;

window.onload = addTextLinksStart;
window.setTimeout("addTextLinksStart();", 20000);

function tf_PubObject(textlinkColor, enableSoundEffect, enableOptOut, enableHeaderTextlink, enableVideoAnimation, videoTvIconId, adspacing, forcedspacing, lineHeightFactor, maxAdsPerRequest) {
	this.textlinkColor = textlinkColor;
	this.enableSoundEffect = enableSoundEffect;
	this.enableOptOut = enableOptOut;
	this.enableHeaderTextlink = enableHeaderTextlink;
	this.enableVideoAnimation = enableVideoAnimation;
	this.videoTvIconId = videoTvIconId;
	this.adspacing = adspacing;
	this.forcedspacing = forcedspacing;
	this.lineHeightFactor = lineHeightFactor;
	this.maxAdsPerRequest = maxAdsPerRequest;
}

function tf_AdvObject(id, sitehost, title, desc, clickURL, logo, image, video, adData, pubSiteId, topicKeyword, topic, partnerId, impressionTrackUrl, imprintPixelUrl, bannerURL, adFetechParams, adHeaderTxt, isThirdParty, isExpandable, isInteractive) {
	this.id = id;
	this.isBound = false;
	this.siteId = 0;
	var site = tf_trim_string(sitehost.replace(/\n/g, ""));
	var siteIdIndex = site.indexOf('#|#');
	if (siteIdIndex != -1) {
		var siteId = site.substring(siteIdIndex+3);
		site = site.substring(0, site.indexOf('#|#'));
		if(siteId.match(tf_digitOnly_Regex)) {
			tf_addToArray(tf_avialableAdvIds, siteId);
			this.siteId = siteId;
		}
	}
	this.sitehost = site;
	this.title = tf_trim_string(title.replace(/\n/g, ""));
	this.desc = tf_trim_string(desc.replace(/\n/g, ""));
	this.adData = adData;
	clickURL = tf_trim_string(clickURL.replace(/\n/g, ""));
	if (partnerId == 110) {
		clickURL = unescape(clickURL);
	}
	this.clickURL = clickURL;
	var prms = "?link=" + tf_docURL + "&adData=" + adData;
	this.trackURL = keywordsServer + "/Send" + prms;
	this.logo = logo;
	this.image = image;
	this.video = video;
	this.pubSiteId = pubSiteId;
	this.topicKeyword = topicKeyword;
	this.topic = topic;
	this.partnerId = partnerId;
	this.impressionTrackUrl = impressionTrackUrl;
	this.imprintPixelUrl = imprintPixelUrl;
	this.bannerURL = bannerURL;
	this.dynamicLogicScriptUrl = '';
	if (this.sitehost == 'www.hp.com/DL') {
		this.sitehost = 'www.hp.com';
		this.dynamicLogicScriptUrl = 'http://amch.questionmarket.com/adsc/d452382/8/452987/randm.js';
	}
	this.adFetechParams = adFetechParams;
	this.adHeaderTxt = adHeaderTxt;
	this.isThirdParty = isThirdParty;
	this.isExpandable = isExpandable;
	this.isInteractive = isInteractive;
	this.expansionURL = et_getExpansionServer() + prms + adFetechParams;
	tf_setThirdPartyURLs(this);
	loadScript(partnerId);
}

function tf_linkObj(keyword, keywordId, topicId, ids) {
	this.keyword = keyword;
	this.keywordId = keywordId;
	this.topicId = topicId;
	this.found = NotFoundType.NotPresent;
	this.notFoundURL = keywordsServer + "/NotFound?link=" + tf_docURL + "&link=" + keyword;
	this.isBound = false;
	this.ids = ids;
	this.ad = null;
	this.getAd = function() {
		if(this.ad != null) {
			return this.ad;
		}
		for (var i = 0; i < this.ids.length; i++) {
			var advObject = getAdObject(this.ids[i]);
			if(advObject.isBound == false) {
				this.isBound = true;
				advObject.isBound = true;
				advObject.clickURL = advObject.clickURL.replace(/\$SEARCH\$/gi, escape(this.keyword));
				this.ad = advObject;
				if(tf_isAdPresent(advObject)) {
					var index = this.ad.index + 1;
					tf_flash_object.SetVariable("ad" + this.linkIndex, get_tf_flash_Var(this.ad, this.keyword, this.keywordId, this.topicId));
				}
				if(advObject.adFetechParams.length == 0) {
					tf_removeFromArray(tf_avialableAdvIds, advObject.siteId);
					tf_addToArray(tf_boundAdvIds, advObject.siteId);
				}
				return advObject;
			}
		}

		return null;
	}
}

function getAdObject(id) {
	for (var i = 0; i < tf_advObjects.length; i++) {
		if(tf_advObjects[i].id == id) {
			return tf_advObjects[i];
		}
	}
}

function loadScript(partnerId) {
	if (partnerId && tf_partner_attributes && tf_partner_attributes[partnerId]) {
		var partnerAttribute = tf_partner_attributes[partnerId];
		var scriptUrl = partnerAttribute[0];
		if (scriptUrl && scriptUrl.length > 0) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = scriptUrl;
			if (head_node) {
				head_node.appendChild(script);
			} else {
				document.body.appendChild(script);
			}
		}
	}
}

function tf_bannerShow(event, source, index, type) {
	if(typeof(event.isFake) == "undefined") {
		source.style.borderBottomWidth = '2px';
	}
	nodeSrc = source;
	if (event.pageX || event.pageY) {
		tf_event.pageX = event.pageX;
		tf_event.pageY = event.pageY;
	}
	else if (event.clientX || event.clientY) {
		tf_event.clientX = event.clientX;
		tf_event.clientY = event.clientY;
	}

	if (!isIE && !isChrome) {
		tf_event.layerX = event.layerX;
		tf_event.layerY = event.layerY;
	}
	tf_advertBannerShow(event, source, index);
}

function submitClickIndex(category) {
	var i = tf_flash_adNum;
	var adv = tf_linkObjects[i - 1].getAd();
	if (adv == null) return;
	var performClick = false;
	if(category == "cat1" || category == "cat2" || category == "cat3" || category == "cat4") {
		performClick = true;
	}
	tf_submitClick(tf_flash_adNum, adv.clickURL, adv.trackURL, performClick, false);
}

function submitLinkClick(index) {
	var i = parseInt(index);
	var adv = tf_linkObjects[i - 1].getAd();
	if (adv == null) return;
	if(adv.partnerId == PG_ID || adv.partnerId == SH_ID || adv.partnerId == TD_ID || adv.partnerId == ITM_ID) {
		tf_catalog_linkclick(adv, index);
		return;
	}
	tf_submitClick(index, adv.clickURL, adv.trackURL, true, true);
}

function tf_submitClick(index, clickUrl, trackUrl, performClick, linkClick) {
	var i = parseInt(index) - 1;
	var adv = tf_linkObjects[i].getAd();

	if (!tf_isAdPresent(adv)) {
		return;
	}

	if(clickUrl == null || clickUrl.length == 0 || clickUrl == "NULL_CLICK_URL") {
		return;
	}
	if (clickmode == "whatsthis") {
		if (typeof(tf_app_flag) != "undefined" && clickUrl != "" && clickUrl != "http://" && clickUrl != "https://")
			handle = window.open(clickUrl);
		return;
	}
	if (linkClick) {
		trackUrl += '&lc=1';
	} else {
		trackUrl += '&lc=0';
	}

	if (typeof(tf_expIndexArray[i]) != "undefined") {
		var tf_clickDate = new Date();
		var tf_diff = tf_clickDate.getTime() - tf_expIndexArray[i];
		if (tf_diff < tf_viewClickTimeDiff) {
			return;
		}
		trackUrl += ('&td=' + tf_diff);
	} else {
		return;
	}
	trackUrl = trackUrl + '&raId=' + Math.random();
	var handle = null;
	if (tf_flash_key == 1 || performClick == true) {
		if (clickmode != 'test') {
			handle = tf_windowopen(clickUrl);
		} else {
			handle = window.open(tf_homePage);
		}
	}

	var img = new Image();
	img.src = trackUrl;

	if (adv.partnerId == SS_ID || adv.partnerId == ASK_ID || adv.partnerId == LIVE_ID) {
		if (adv.imprintPixelUrl && adv.imprintPixelUrl != 'null' && adv.imprintPixelUrl.length > 0) {
			var now = new Date();
			var requestId = ((now.getTime() % 2147483648) + Math.random());
			var img1 = new Image();
			img1.src = adv.imprintPixelUrl + (adv.imprintPixelUrl.indexOf('?') == -1 ? '?' : '&' ) + requestId;
		}

	}
	if (adv.partnerId && tf_partner_attributes && tf_partner_attributes[adv.partnerId]) {
		var partnerAttribute = tf_partner_attributes[adv.partnerId];
		var clickTrackUrl = partnerAttribute[2];
		if (clickTrackUrl && clickTrackUrl.length > 0) {
			var now = new Date();
			var img1 = new Image();
			clickTrackUrl = clickTrackUrl.replace('(timestamp)', now.getTime());
			img1.src = clickTrackUrl;
		}
	}

	if ((tf_flash_key == 1 || performClick == true) && handle == null) {
		if (clickmode != 'test') {
			if (isIE) {
				window.setTimeout("top.location = '" + clickUrl + "';", 50);
			} else {
				top.location = clickUrl;
			}
		} else {
			if (isIE) {
				window.setTimeout("top.location = tf_homePage;", 50);
			} else {
				top.location = tf_homePage;
			}
		}
	}
}

var firstAdView = true;
var isVideoOrSSAd = false;
var posx = 0;
var posy = 0;
var scrollLeft = 0;
var scrollTop = 0;
var elementx = 0;
var elementy = 0;
var borderLeftWidth = 0;
var borderTopWidth = 0;
var bodyMarginLeft = 0;
var bodyMarginTop = 0;

function calculateDimensions(e, source) {
	scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
	scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		posx = e.clientX;
		posy = e.clientY;
	}

	//////Correction for margin

	var bodyPosition;
	if (isIE)
		bodyPosition = document.body.currentStyle.position;
	else
		bodyPosition = document.defaultView.getComputedStyle(document.body, "").getPropertyValue("position");

	bodyMarginLeft = 0;
	bodyMarginTop = 0;

	if (bodyPosition == "relative") {
		if (isIE) {
			bodyMarginLeft = document.body.currentStyle.marginLeft;
			if (bodyMarginLeft == "auto")
				bodyMarginLeft = getAutoWidth(parseInt(document.documentElement.clientWidth), parseInt(document.body.currentStyle.width));
			else
				bodyMarginLeft = convertToPX(bodyMarginLeft, document.body.currentStyle.fontSize);

			bodyMarginTop = document.body.currentStyle.marginTop;
			if (bodyMarginTop == "auto")
				bodyMarginTop = getAutoWidth(parseInt(document.documentElement.clientHeight), parseInt(document.body.currentStyle.height));
			else
				bodyMarginTop = convertToPX(bodyMarginTop, document.body.currentStyle.fontSize);
		} else {
			bodyMarginLeft = document.body.style.marginLeft;

			if (bodyMarginLeft == "auto")
				bodyMarginLeft = getAutoWidth(parseInt(document.documentElement.clientWidth), parseInt(document.defaultView.getComputedStyle(document.body, "").getPropertyValue("width")));
			else {
				if (bodyMarginLeft.length == 0 || parseInt(bodyMarginLeft) == 0) {
					bodyMarginLeft = parseInt(document.defaultView.getComputedStyle(document.body, "").getPropertyValue("margin-left"));
					if (bodyMarginLeft == 0)
						bodyMarginLeft = getAutoWidth(parseInt(document.documentElement.clientWidth), parseInt(document.defaultView.getComputedStyle(document.body, "").getPropertyValue("width")));
				}
			}

			bodyMarginTop = document.body.style.marginTop;

			if (bodyMarginTop == "auto")
				bodyMarginTop = getAutoWidth(parseInt(document.documentElement.clientHeight), parseInt(document.defaultView.getComputedStyle(document.body, "").getPropertyValue("height")));
			else {
				if (bodyMarginTop.length == 0 || parseInt(bodyMarginTop) == 0) {
					bodyMarginTop = parseInt(document.defaultView.getComputedStyle(document.body, "").getPropertyValue("margin-top"));
					if (bodyMarginTop == 0)
						bodyMarginTop = getAutoWidth(parseInt(document.documentElement.clientHeight), parseInt(document.defaultView.getComputedStyle(document.body, "").getPropertyValue("height")));
				}
			}
		}
	}
	//////Correction for margin

	if (isIE || isChrome)
	{
		elementx = posx;
		elementy = posy;

		while (document.elementFromPoint(elementx, posy) == source)
		{
			elementx--;
		}
		elementx++;

		while (document.elementFromPoint(posx, elementy) == source)
		{
			elementy--;
		}
		elementy++;

		if (isIE) {
			borderLeftWidth = convertToPX(document.body.currentStyle.borderLeftWidth, document.body.currentStyle.fontSize);
			borderTopWidth = convertToPX(document.body.currentStyle.borderTopWidth, document.body.currentStyle.fontSize);

			elementx = parseInt(elementx) - borderLeftWidth + scrollLeft - bodyMarginLeft;
			elementy = parseInt(elementy) - borderTopWidth + scrollTop - bodyMarginTop;
		} else {
			borderLeftWidth = parseInt(document.defaultView.getComputedStyle(document.body, "").getPropertyValue("border-left-width"));
			borderTopWidth = parseInt(document.defaultView.getComputedStyle(document.body, "").getPropertyValue("border-top-width"));

			elementx = parseInt(elementx) - borderLeftWidth - bodyMarginLeft;
			elementy = parseInt(elementy) - borderTopWidth - bodyMarginTop;
		}
	} else {
		posx -= bodyMarginLeft;
		posy -= bodyMarginTop;
		elementx = parseInt(posx) - parseInt(e.layerX);
		elementy = parseInt(posy) - parseInt(e.layerY);
	}
}

function tf_advertBannerShow(event, source, index) {
	var AdvertBanner = document.getElementById("tf_AdDiv");
	if (!tf_flash_hidden && tf_flash_adNum == index + 1 && tf_flash_object.style.visibility == "visible") {
		tf_advertBannerOver(event);
		tf_showAd();
		return;
	}
	
	tf_adjustPos = true;
	if (tf_flash_key == 1 || ((tf_flash_key == 2 || tf_flash_key == 3 || hasThirdPartyads) && !firstAdView)) {
		tf_hideAd();
	}

	var tf_lastExpnDate = new Date();
	var adv = tf_linkObjects[index].getAd();
	var textLink = tf_linkObjects[index].keyword;
	var textLinkId = tf_linkObjects[index].keywordId;
	var textLinkTopicId = tf_linkObjects[index].topicId;

	tf_flash_adNum = index + 1;
	if(adv == null) {
		var prms = "";
		if (mode == 'test' && typeof testIP != 'undefined' && testIP != null) {
			prms = '&testIP=' + testIP;
		}
		var script = document.createElement("script");
		script.type = "text/javascript";
		var now = new Date();
		var requestId = ((now.getTime() % 2147483648) + Math.random());
		script.src = et_getExpansionServer() + "?link=" + tf_docURL + "&linkId=" + source.id + "&tl=" + escape(textLink) + "&tlid="  + textLinkId + "&tlt=" + textLinkTopicId + "&adIndex=" + Number(index + 1) + "&mode=" + mode + prms + "&adIds=" + tf_boundAdvIds + "&firstCall=false&raId=" + requestId;
		document.body.appendChild(script);
		tf_expIndexArray[index] = tf_lastExpnDate.getTime();
		if (adv == null) {
			calculateDimensions(event, source);
			AdvertBanner.style.width = '32px';
			AdvertBanner.style.height = '32px';
			document.getElementById("standardFlashP").style.width = '32px';
			document.getElementById("standardFlashP").style.height = '32px';
			tf_flash_object.width = 1;
			tf_flash_object.height = 1;
			tf_setBannerPosition(source, 0, 0);
			tf_advertBannerOver(event);
			tf_showAd();
			return;
		}
	}

	if (clickmode != "whatsthis") {
		var now = new Date();
		if (adv.impressionTrackUrl && adv.impressionTrackUrl.length > 0) {
			var impTrackUrl = adv.impressionTrackUrl.replace('(timestamp)', now.getTime());
			var img2 = new Image();
			img2.src = impTrackUrl;

		}

		if (adv.partnerId == '501') {
			if (adv.dynamicLogicScriptUrl && adv.dynamicLogicScriptUrl.length > 0) {
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = adv.dynamicLogicScriptUrl;
				if (head_node) {
					head_node.appendChild(script);
				} else {
					document.body.appendChild(script);
				}
			}
		}

		var requestId = ((now.getTime() % 2147483648) + Math.random());
		var prms = "";
		if (mode == 'test' && typeof testIP != 'undefined' && testIP != null) {
			prms = '&testIP=' + testIP;
		}

		var tempArray = new Array();
		tempArray = tempArray.concat(tf_avialableAdvIds);
		tf_removeFromArray(tempArray, adv.siteId);
		tempArray = tempArray.concat(tf_boundAdvIds);
		
		if (typeof(tf_expIndexArray[index]) == "undefined") {
			var img1 = new Image();

			if (adv.partnerId && tf_partner_attributes && tf_partner_attributes[adv.partnerId]) {
				var partnerAttribute = tf_partner_attributes[adv.partnerId];
				var impTrackUrl = partnerAttribute[1];
				if (impTrackUrl && impTrackUrl.length > 0) {
					var now = new Date();
					var img1 = new Image();
					impTrackUrl = impTrackUrl.replace('(timestamp)', now.getTime());
					img1.src = impTrackUrl;
				}
			}

			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = adv.expansionURL + "&tl=" + escape(textLink) + "&tlid="  + textLinkId + "&tlt=" + textLinkTopicId + "&linkId=" + source.id + "&adIndex=" + Number(index + 1) + "&mode=" + mode + prms + "&adIds=" + tempArray + "&firstCall=true&raId=" + requestId;
			document.body.appendChild(script);
		} else if(isIE && !tf_isAdPresent(adv) && tf_lastExpnDate.getTime() - tf_expIndexArray[index] > 2000) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = adv.expansionURL + "&tl=" + escape(textLink) + "&tlid="  + textLinkId + "&tlt=" + textLinkTopicId + "&linkId=" + source.id + "&adIndex=" + Number(index + 1) + "&mode=" + mode + prms + "&adIds=" + tempArray + "&firstCall=false&raId=" + requestId;
			if(!tf_isAdPresent(adv)) {
				document.body.appendChild(script);
			}
		}

		tf_expIndexArray[index] = tf_lastExpnDate.getTime();
		if (!tf_isAdPresent(adv)) {
			calculateDimensions(event, source);
			AdvertBanner.style.width = '32px';
			AdvertBanner.style.height = '32px';
			document.getElementById("standardFlashP").style.width = '32px';
			document.getElementById("standardFlashP").style.height = '32px';
			tf_flash_object.width = 1;
			tf_flash_object.height = 1;
			tf_setBannerPosition(source, 0, 0);
			tf_advertBannerOver(event);
			tf_showAd();
			return;
		} else {
			if (mode == 'test') {
				document.getElementById(tf_linkObjects[index].keywordId + "_adid").innerHTML = adv.id;
			}
		}
	}

	sendAdNum();
	firstAdView = false;
	if (adv == null) return;
	tf_advertBannerOver(event);

	isVideoOrSSAd = adv.video != null || adv.partnerId == SS_ID;

	calculateDimensions(event, source);

	if ((tf_flash_key == 2 || tf_flash_key == 3) && !isIE) {
		tf_setBannerPosition(source, 0, 0);
	}

	if (isIE) {
		AdvertBanner.style.top = -8000 + 'px';
		AdvertBanner.style.left = -8000 + 'px';
	}

	if (navigator.appName.indexOf("Microsoft Internet") != -1) {
		window.setTimeout("tf_showAd();", 100);
	}
	window.status = adv.title;

	var banner_code = '';
	if (tf_pubObj && tf_pubObj.enableSoundEffect) {
		banner_code += '<div id="swfcontainer" style="position:absolute; top:-800px; left:-800px; visibility:hidden"><object id="viewer" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
		banner_code += '	codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"';
		banner_code += '	width="1" height="1">';
		banner_code += '	<param name="movie" value="' + staticcontentServer + '/images/sound.swf"/>';
		banner_code += '	<embed name="viewer" src="' + staticcontentServer + '/images/sound.swf"';
		banner_code += '			width="1" height="1" wmode="window" type="application/x-shockwave-flash"';
		banner_code += '			pluginspage="http://www.macromedia.com/go/getflashplayer"/>';
		banner_code += '	</object>';
		banner_code += '</div>';
		var soundDiv = document.getElementById("tf_et_sound_div");
		if(soundDiv == null) {
			soundDiv = document.createElement("div");
			soundDiv.id = "tf_et_sound_div";
		}

		soundDiv.innerHTML = banner_code;
		document.body.appendChild(soundDiv);
	}
}


function getAutoWidth(doc, bd)
{
	if (doc > bd)
		return (doc - bd) / 2;
	return 0;
}

function convertToPX(width, fontSize)
{
	if (width == "medium")
		return 0;

	if (width.indexOf("in") != -1)
		return 96 * parseInt(width);

	if (width.indexOf("cm") != -1)
		return 37.8 * parseInt(width);

	if (width.indexOf("mm") != -1)
		return 3.78 * parseInt(width);

	if (width.indexOf("pt") != -1)
		return 1.33 * parseInt(width);

	if (width.indexOf("pc") != -1)
		return 16 * parseInt(width);

	if (width.indexOf("em") != -1) {
		if (fontSize == -1)
			return 16 * parseInt(width);
		return convertToPX(fontSize, -1) * parseInt(width);
	}

	if (width.indexOf("ex") != -1) {
		if (fontSize == -1)
			return 0.5 * parseInt(width);
		return convertToPX(fontSize, -1) * parseInt(width);
	}

	if (width.indexOf("%") != -1) {
		if (fontSize == -1)
			return 16 * parseInt(width) / 100;
		return convertToPX(fontSize, -1) * parseInt(width) / 100;
	}

	return parseInt(width);
}

function tf_setBannerPosition(source, rightClip, bottomClip) {
	var AdvertBanner = document.getElementById("tf_AdDiv");

	var leftSpace = parseInt(posx) - scrollLeft;
	var rightSapce = ((isIE)?document.documentElement.offsetWidth:window.innerWidth) - leftSpace;
	var topSpace = parseInt(elementy) - scrollTop;
	var bottomSpace = ((isIE)?document.documentElement.offsetHeight:window.innerHeight) - topSpace - parseInt(source.offsetHeight);

	if ((tf_colorSchemeId == 1 || tf_colorSchemeId == 2)) {
		if (tf_isThirdPartyAd()) {
			AdvertBanner.style.padding = "0px";
		} else {
			AdvertBanner.style.padding = "10px";
		}
	}

	var extrax = 0;
	var left = 0;
	if (rightSapce > leftSpace) {
		left = parseInt(posx) + ((isIE)?scrollLeft - borderLeftWidth - bodyMarginLeft:0) - parseInt(AdvertBanner.style.paddingLeft);
		extrax = rightSapce - parseInt(AdvertBanner.offsetWidth);
		if (extrax > 0)
			extrax = 0;

		AdvertBanner.style.left = (left + extrax) + 'px';
	} else {
		left = parseInt(posx) + ((isIE)?scrollLeft - borderLeftWidth - bodyMarginLeft:0) - parseInt(AdvertBanner.offsetWidth) + parseInt(AdvertBanner.style.paddingRight);
		extrax = leftSpace - (AdvertBanner.offsetWidth);
		if (extrax > 0)
			extrax = 0;

		AdvertBanner.style.left = left - extrax + 'px';
	}

	if (topSpace > bottomSpace) {
		var top = parseInt(elementy) - AdvertBanner.offsetHeight + parseInt(AdvertBanner.style.paddingBottom) - 2;
		if (top < 0) {
			AdvertBanner.style.top = parseInt(elementy) + source.offsetHeight - parseInt(AdvertBanner.style.paddingTop) + 2 + 'px';
		} else {
			AdvertBanner.style.top = top + 'px';
		}
	}
	else {
		AdvertBanner.style.top = parseInt(elementy) + source.offsetHeight - parseInt(AdvertBanner.style.paddingTop) + 2 + 'px';
	}
}

function videoClick(index) {
	if (navigator.appName.indexOf("Microsoft Internet") != -1) {
		var adv = tf_linkObjects[index].getAd();
		if (adv == null) return;
		tf_submitClick(index, adv.clickURL, adv.trackURL);
	}
}
var trackUrl_onclickFunction = '';
function tf_disableOnclick() {
	trackUrl_onclickFunction = document.getElementById('adBanner').getAttribute('onclick');
	document.getElementById('adBanner').setAttribute('onclick', '');
}

function tf_enableOnClick() {
	document.getElementById('adBanner').setAttribute('onclick', trackUrl_onclickFunction);
}

function tf_disableBannerOnclick() {
	searchButton = staticcontentServer + "/images/srch-button-onMouse.gif";
	document.getElementById('searchButton').setAttribute('src', searchButton);
	tf_disableOnclick();
}

function tf_enableBannerOnClick(adv_trackURL) {
	searchButton = staticcontentServer + "/images/srch-button.gif";
	document.getElementById('searchButton').setAttribute('src', searchButton);
	tf_enableOnClick();
}

var tf_showAdvertBanner;
function tf_advertBannerOver(event) {
	if (typeof(event) != "undefined" && typeof(event.isFake)!= "undefined") {
		return;
	}
	tf_showAdvertBanner = true;
	tf_flash_hidden = false;
}

function tf_closeAdWidget() {
	if (typeof(tf_app_flag) == "undefined" || tf_app_flag == 1) {
		tf_showAdvertBanner = false;
		tf_advertBannerHide(true);
	}
}

function tf_advertBannerOut() {
	if (nodeSrc != undefined) {
		nodeSrc.style.borderBottomWidth = "1px";
	}
	tf_showAdvertBanner = false;
	setTimeout('tf_advertBannerHide(' + isVideoOrSSAd + ')', 2000);
}

function tf_advertBannerHide(hideFlash) {
	if (!tf_showAdvertBanner) {
		tf_flash_hidden = true;
		if (hideFlash) {
			sendAdNumClear();
		}
		tf_hideAd();
		window.status = "";
	}
}

function containsValue(arr, value) {
	var flag = false;

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == value) {
			flag = true;
			break;
		}
	}

	return flag;
}

function findWordsInText(text) {
	var str = tf_trim_string(text);
	var numberOfWords = 0;
	if (str.length > 0) {
		numberOfWords = str.split(" ").length;
	}
	return numberOfWords;
}

function tf_LinkObject(value, pos, frequency) {
	this.value = value;
	this.pos = pos;
	this.frequency = frequency;
	this.layer = 1;
}

function tf_getLinkPos(linksPosMap, adSpacing, linkMap, forcedSpacing) {

	if (!forcedSpacing) {
		forcedSpacing = false;
	}

	var i, j, k;
	var frequencyMap = {};

	for (i in linkMap) {
		frequencyMap[linkMap[i]] = ((typeof(frequencyMap[linkMap[i]]) == "undefined")? 0 : frequencyMap[linkMap[i]]) + 1;
	}

	var linkObjects = [];
	var resultMap = {};
	var layer1 = {};

	for (j in linksPosMap) {
		layer1[j] = linksPosMap[j].length;
		for (i = 0; i < linksPosMap[j].length; i++) {
			linkObjects[linkObjects.length] = new tf_LinkObject(j, linksPosMap[j][i], frequencyMap[j]);
		}
	}

	if (linkObjects.length == 0) {
		return resultMap;
	}

	//Remove overlapping words
	for (j = 0; j < linkObjects.length; j++) {
		for (i = j + 1; i < linkObjects.length; i++) {
			if (linkObjects[i].layer != 0 && linkObjects[j].layer != 0 && getPosDifference(linkObjects[j], linkObjects[i]) <= 0) {
				if ((tf_splitToWords(linkObjects[i].value).length < tf_splitToWords(linkObjects[j].value).length)
						&& (layer1[linkObjects[j].value] <= linkObjects[j].frequency || layer1[linkObjects[i].value] > linkObjects[i].frequency)) {
					linkObjects[i].layer = 0;
					layer1[linkObjects[i].value]--;
				} else {
					linkObjects[j].layer = 0;
					layer1[linkObjects[j].value]--;
				}
			}
		}
	}

	for (j = 0; j < linkObjects.length; j++) {
		for (i = j + 1; i < linkObjects.length; i++) {
			if (linkObjects[i].layer > 0 && linkObjects[i].layer == linkObjects[j].layer && getPosDifference(linkObjects[j], linkObjects[i]) <= adSpacing) {
				if ((linkObjects[j].frequency > layer1[linkObjects[j].value] - 1) && (linkObjects[i].frequency <= layer1[linkObjects[i].value] - 1)) {
					k = i;
				} else if ((linkObjects[i].frequency > layer1[linkObjects[i].value] - 1) && (linkObjects[j].frequency <= layer1[linkObjects[j].value] - 1)) {
					k = j;
				} else if (linkObjects[j].pos < linkObjects[i].pos) {
					k = i;
				} else {
					k = j;
				}

				linkObjects[k].layer++;
				layer1[linkObjects[k].value]--;
			}
		}
	}

	for (j in frequencyMap) {
		i = 0;
		do {
			if (typeof(resultMap[linkObjects[i].value]) == "undefined") {
				resultMap[linkObjects[i].value] = [];
			}
			if (linkObjects[i].layer == 1 && linkObjects[i].value == j && resultMap[linkObjects[i].value].length < frequencyMap[j]) {
				resultMap[linkObjects[i].value].push(linkObjects[i].pos);
			} else if (linkObjects[i].value == j && resultMap[linkObjects[i].value].length == frequencyMap[j]) {
				break;
			}
			i++;
		} while (i < linkObjects.length);
	}

	if (!forcedSpacing) {
		for (j in frequencyMap) {
			i = 0;
			do {
				if (typeof(resultMap[linkObjects[i].value]) == "undefined") {
					resultMap[linkObjects[i].value] = [];
				}
				if (linkObjects[i].layer > 1 && linkObjects[i].value == j && resultMap[linkObjects[i].value].length < frequencyMap[j]) {
					resultMap[linkObjects[i].value].push(linkObjects[i].pos);
				} else if (linkObjects[i].value == j && resultMap[linkObjects[i].value].length == frequencyMap[j]) {
					break;
				}
				i++;
			} while (i < linkObjects.length);
		}
	}

	return resultMap;
}

function getPosDifference(linkObject1, linkObject2) {
	if (linkObject1.pos <= linkObject2.pos) {
		return linkObject2.pos - linkObject1.pos - tf_splitToWords(linkObject1.value).length + 1;
	}
	if (linkObject2.pos <= linkObject1.pos) {
		return linkObject1.pos - linkObject2.pos - tf_splitToWords(linkObject2.value).length + 1;
	}
}

function tf_marktext(text, adspacing, forcedSpacing) {
	var linksPosMap = {};
	var linkMap = {};
	for (var i = 0; i < tf_linkObjects.length; i++) {
		if (tf_linkObjects[i].found != NotFoundType.Other) {
			linkMap[i] = tf_linkObjects[i].keyword;
		}
	}
	var wordToCharMap = {};

	for (var i in linkMap) {
		if (typeof(linksPosMap[linkMap[i]]) == "undefined") {
			linksPosMap[linkMap[i]] = [];
			var keyword = escapeRegExChars(tf_linkObjects[i].keyword);
			keyword = keyword.replace(/[ ]+/g, '\\s+');
			// Replace multiple spaces in the keyword with white space \r, \n , \t , space.

			var charsNotToHaveBeforeStart = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-.".split("");
			var charsNotToHaveAfterEnd = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-".split("");
			var lchr;
			var rchr;

			var regex = new RegExp(keyword, 'gim');
			text.replace(regex,
					function(exp, pos, originalStr) {
						lchr = (pos == 0) ? " ": originalStr.substring(pos - 1, pos);
						rchr = (pos + exp.length == originalStr.length) ? " ": originalStr.substring(pos + exp.length, pos + exp.length + 1);
						if (!containsValue(charsNotToHaveBeforeStart, lchr) && !containsValue(charsNotToHaveAfterEnd, rchr)) {
							var wordPos = tf_splitToWords(originalStr.substring(0, pos)).length;
							linksPosMap[linkMap[i]].push(wordPos);
							if (typeof(wordToCharMap[wordPos]) != "undefined") {
								wordToCharMap[wordPos][0] = pos;
								wordToCharMap[wordPos][1][tf_linkObjects[i].keyword] = exp.length;

							} else {
								wordToCharMap[wordPos] = [];
								wordToCharMap[wordPos][0] = pos;
								wordToCharMap[wordPos][1] = {};
								wordToCharMap[wordPos][1][tf_linkObjects[i].keyword] = exp.length;
							}
						}
						return exp;
					});
		}
	}

	for (var i in linksPosMap) {
		var k = 0;
		for (var j = 0; j < tf_linkObjects.length && k < linksPosMap[i].length; j++) {
			if (tf_linkObjects[j].keyword == i && tf_linkObjects[j].found == NotFoundType.NotPresent) {
				tf_linkObjects[j].found = NotFoundType.NotSpaced;
				k++;
			}
		}
	}

	var resultMap = tf_getLinkPos(linksPosMap, adspacing, linkMap, forcedSpacing);

	var posMap = {};
	var sortArray = [];
	var hasElements = false;

	for (var j in resultMap) {
		hasElements = true;
		for (var i = 0; i < resultMap[j].length; i++) {
			posMap[resultMap[j][i]] = j;
			sortArray[sortArray.length] = resultMap[j][i];
		}
	}

	if (!hasElements)
		return null;

	var nodes = [];
	var isLink = false;
	var start = 0;
	var advIndex;

	sortArray.sort(function(a,b) {return a - b;});
	for (var i = 0; i < sortArray.length; i++) {

		for (var j in linkMap) {
			if (linkMap[j] == posMap[sortArray[i]] && tf_linkObjects[j].found != NotFoundType.Other) {
				tf_linkObjects[j].found = NotFoundType.Other;
				advIndex = j;
				break;
			}
		}
		nodes[nodes.length] = tf_getLinkNode(text.substring(start, wordToCharMap[sortArray[i]][0]), advIndex, false);
		start = wordToCharMap[sortArray[i]][0] + wordToCharMap[sortArray[i]][1][tf_linkObjects[advIndex].keyword];
		nodes[nodes.length] = tf_getLinkNode(text.substring(wordToCharMap[sortArray[i]][0], start), advIndex, true);

		//"Mark " + wordToCharMap[sortArray[i]][1] + " at " + wordToCharMap[sortArray[i]][0] + ".
	}

	nodes[nodes.length] = tf_getLinkNode(text.substring(start, text.length), advIndex, false);
	return nodes;
}

function escapeRegExChars(str) {
	var regExChars = ['\\','^','$','{','}','[',']','(',')','.','*','+','?','|','<','>','-','&','#'];
	for (var i = 0; i < regExChars.length; i++) {
		str = str.replace(regExChars[i], '\\' + regExChars[i]);
	}
	return str;
}

function tf_getLinkNode(text, advIndex, isLink) {
	var returnNode;
	var textNode = document.createTextNode(text);
	if (isLink) {
		var noBrNode = document.createElement("NOBR");
		var keywordNode = document.createElement("SPAN");
		keywordNode.onclick = new Function('if(typeof submitLinkClick != \'undefined\') submitLinkClick("' + (Number(advIndex) + 1) + '");');
		keywordNode.oncontextmenu = new Function('return false;');
		keywordNode.className = 'tfTextLink';
		keywordNode.id = 'tfTextLink' + Math.random().toString().replace('0.', '');
		keywordNode.style.color = '#991616';
		keywordNode.style.textDecoration = 'underline';
		keywordNode.style.borderBottom = '1px solid #991616';
		keywordNode.style.display = 'inline';
		keywordNode.style.backgroundColor = 'transparent';
		keywordNode.style.fontSize = "1em";
		keywordNode.style.paddingBottom = '1px';
		keywordNode.style.cursor = 'pointer';
		keywordNode.style.width = 'auto';
		keywordNode.style.marginLeft = '0px';
		if (!isIE) {
			keywordNode.style.position = 'relative';
		}
		if (tf_pubObj) {
			keywordNode.style.lineHeight = tf_pubObj.lineHeightFactor;
		} else {
			keywordNode.style.lineHeight = '1.0em';
		}
		if (typeof tf_pubSiteTxColor != 'undefined' && tf_pubSiteTxColor != null && tf_pubSiteTxColor.length > 0) {
			keywordNode.style.color = tf_pubSiteTxColor;
			keywordNode.style.borderBottomColor = tf_pubSiteTxColor;
		} else if (tf_pubObj && tf_pubObj.textlinkColor && tf_pubObj.textlinkColor.length > 0) {
			keywordNode.style.color = tf_pubObj.textlinkColor;
			keywordNode.style.borderBottomColor = tf_pubObj.textlinkColor;
		}

		if (isIE) {
			keywordNode.onmouseover = new Function('if(typeof tf_bannerShow != \'undefined\') tf_bannerShow(event, this, ' + advIndex + '); return true;');
		} else {
			var mouseOverFunction = new Function('event', 'if(typeof tf_bannerShow != \'undefined\') tf_bannerShow(event, this, ' + advIndex + '); return true;');
			keywordNode.onmouseover = mouseOverFunction;
		}
		keywordNode.onmouseout = new Function('if(typeof tf_advertBannerOut != \'undefined\') tf_advertBannerOut();');
		keywordNode.appendChild(textNode);
		noBrNode.appendChild(keywordNode);
		returnNode = noBrNode;
	} else {
		returnNode = textNode;
	}
	return returnNode;
}

function tf_findTextNodes(node, adspacing, forcedSpacing) {
	if (node.nodeType == 3) {
		var parentNode = node.parentNode;
		var newNodes = tf_marktext(node.data, adspacing, forcedSpacing);

		if (newNodes != null) {
			for (var i = 0; i < newNodes.length; i++) {
				parentNode.insertBefore(newNodes[i], node);
				if (newNodes[i].nodeType == 1 && !isIE) {
					newNodes[i].firstChild.style.position = 'relative';
				}
			}
			parentNode.removeChild(node);
		}
		return;
	}

	if (node.style && ((node.style.display && node.style.display.toLowerCase() == "none") || (node.style.visibility && node.style.visibility.toLowerCase() == "hidden"))) {
		return;
	}

	if (node.tagName == "A" || node.tagName == "SCRIPT" || node.tagName == "OPTION" || node.tagName == "TEXTAREA"
			|| node.tagName == "IFRAME" || node.tagName == "OBJECT" || node.tagName == "STYLE" || node.tagName == "NOEMBED" || node.tagName == "NOSCRIPT") {
		return;
	}

	if (tf_pubObj && !tf_pubObj.enableHeaderTextlink && (node.tagName == "CODE" || node.tagName == "H1" || node.tagName == "H2" || node.tagName == "H3"
			|| node.tagName == "H4" || node.tagName == "H5" || node.tagName == "H6")) {
		return;
	}

	if (node.hasChildNodes()) {
		var children = new Array();
		// 'clone' the array
		for (var i = 0; i < node.childNodes.length; i++) {
			children[children.length] = node.childNodes[i];
		}
		for (var i = 0; i < children.length; i++) {
			if ((children[i].tagName == "DIV" || children[i].tagName == "SPAN" || children[i].tagName == "TABLE")) {
				if (!tf_isNodeContentMarked(children[i]) && !tf_isNodeContentBlockedMarked(children[i])) {
					tf_findTextNodes(children[i], adspacing, forcedSpacing);
				}
			} else {
				tf_findTextNodes(children[i], adspacing, forcedSpacing);
			}
		}
	}
}

function displayTextLinks() {
	flashLoaded = true;
	tf_logmessage("displayTextLinks called.");
	if (isIE) {
		if (hasThirdPartyads) {
			loadThirdPartyFlash();
		} else {
			displayTextLinkAds();
		}
	} else {
		displayTextLinkAds();
	}
}

function tf_isNodeContentMarked(node) {
	for (var j = 0; j < tf_textLinkMarkers.length; j++) {
		if ((node.getAttribute("id") && node.getAttribute("id").toLowerCase() == tf_textLinkMarkers[j]) || (node.className && node.className.toLowerCase() == tf_textLinkMarkers[j]) || (node.getAttribute("name") && node.getAttribute("name").toLowerCase() == tf_textLinkMarkers[j])) {
			return true;
		}
	}

	for (var j = 0; j < tf_textLinkMarkersRegex.length; j++) {
		if ((node.getAttribute("id") && node.getAttribute("id").toLowerCase().match(tf_textLinkMarkersRegex[j]) ) || (node.className && node.className.toLowerCase().match(tf_textLinkMarkersRegex[j])) || (node.getAttribute("name") && node.getAttribute("name").toLowerCase().match(tf_textLinkMarkersRegex[j]))) {
			return true;
		}
	}
	return false;
}

function tf_isNodeContentBlockedMarked(node) {
	for (var j = 0; j < tf_blockedContentMarkers.length; j++) {
		if ((node.getAttribute("id") == tf_blockedContentMarkers[j]) || (node.className && node.className == tf_blockedContentMarkers[j]) || (node.getAttribute("name") && node.getAttribute("name") == tf_blockedContentMarkers[j]))
			return true;
	}
	return false;
}

var flushed = false;
function compareOTFHash() {
	if (!flushed && typeof tf_otf_hash_key != 'undefined' && tf_otf_hash_key != null && tf_otf_hash_key.length > 0 && typeof(tf_MD5StrThresholdLen) != 'undefined' && tf_MD5StrThresholdLen != null && tf_page_keywords_ext_comp && tf_ad_mode == "NORMAL") {
		var cuurentMD5 = tf_calcMD5(tf_page_words); // tf_CurrentMD5StrLen calculated in tf_calcMD5;
		if ((tf_otf_hash_key != cuurentMD5 && tf_CurrentMD5StrLen > OTF_BUFFER) || Math.abs(tf_MD5StrThresholdLen - tf_CurrentMD5StrLen) > OTF_BUFFER) {
			tf_MD5StrThresholdLen = tf_CurrentMD5StrLen;
			var bodyNode = document.body;
			var now = new Date();
			var requestId = ((now.getTime() % 2147483648) + Math.random());
			var tf_src_link = keywordsServer + "/flushOTF?link=" + tf_docURL + '&rq=' + requestId;
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = tf_src_link;
			bodyNode.appendChild(script);
			flushed = true;
		}
	}
}

function getAdsOnTheFly() {
	if (!tf_page_keywords_ext_comp) {
		if (++tf_page_keywords_ext_count < 20)
			window.setTimeout("getAdsOnTheFly()", 200);
		tf_logmessage("extraction not completed, skipping OTF ");
		return;
	}

	if (tf_page_words.length < 15) {
		tf_logmessage(" less tf_page_words, length: " + tf_page_words.length);
		return;
	}

	tf_page_keywords_ext_count = 0;
	var bodyNode = document.body;
	tf_docURL = escape(tf_url);
	var adType = "textLinks";

	var prms = "";
	if (mode == 'test' && typeof testIP != 'undefined' && testIP != null) {
		prms = '%26testIP=' + testIP;
	}

	var now = new Date();
	var requestId = ((now.getTime() % 2147483648) + Math.random());
	var OTFurl = "OTFurl=" + keywordsServerOnFly + "/Keywords?ads=" + tf_maxKeywords + "%26link=" + escape(tf_docURL) + "%26mode="
			+ mode + "%26serveMode=OnFly" + "%26type=" + adType + prms + '%26rq=' + requestId + '%26otfHash=' + tf_calcMD5(tf_page_words) + "%26hashLength=" + tf_CurrentMD5StrLen + '&kw=' + escape(URLEncode(tf_page_words));
	var tf_otfDiv = tf_createDiv("tf_OTFDiv", -6000);
	tf_loadFlash('OTF_sender', 'window', tf_otfDiv, OTFurl, 2);
	var p = document.createElement("p");
	p.innerHTML = tf_ActiveXObject[2];
	tf_otfDiv.appendChild(p);
}

function tf_sendRequest(tf_src_link) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = tf_src_link;
	document.body.appendChild(script);
}

function tf_show_fly_ads(tf_fly_ads) {
	tf_ads = tf_fly_ads;
	tf_on_fly_flag = null;
	tf_adsTimeoutCount = 0;
	tf_ad_mode = "OTF";
	tf_getAds();
}

function tf_set_adv_object(zSr, tf_ads_ix) {
	if (zSr != null) {
		var id = zSr[0];
		var sitehost = zSr[1];
		var title = zSr[2];
		var desc = zSr[3];
		var clickURL = zSr[4];
		var logo = zSr[5];
		if (logo != null && logo.length != 0) {
			var httpIndex = logo.indexOf('http://');
			var httpsIndex = logo.indexOf('https://');
			if (httpIndex != 0 && httpsIndex != 0) {
				logo = staticcontentServer + "/../extdata/advimages/" + logo;
			}
		} else {
			logo = null;
		}
		var image = zSr[6];
		if (image != null && image != 'null' && image.length != 0) {
			var httpIndex = image.indexOf('http://');
			var httpsIndex = image.indexOf('https://');
			if (httpIndex != 0 && httpsIndex != 0) {
				image = staticcontentServer + "/../extdata/advimages/" + image;
			}
		} else {
			image = null;
		}
		var adData = zSr[7];
		var pubSiteId = zSr[8];
		var video = zSr[9];
		if (video != null && video.length != 0) {
			var httpIndex = video.indexOf('http://');
			var httpsIndex = video.indexOf('https://');
			if (httpIndex != 0 && httpsIndex != 0) {
				video = staticcontentServer + "/../extdata/advimages/" + video;
			}
		} else {
			video = null;
		}
		var keyword = zSr[10];
		var topic = zSr[11];
		var partnerId = zSr[12];
		var impressionTrackUrl = zSr[13];
		var imprintPixelUrl = zSr[14];
		var bannerURL = zSr[15];
		if (bannerURL != null && bannerURL.length != 0) {
			var httpIndex = bannerURL.indexOf('http://');
			var httpsIndex = bannerURL.indexOf('https://');
			if (httpIndex != 0 && httpsIndex != 0) {
				bannerURL = staticcontentServer + "/../extdata/advimages/" + bannerURL;
			}
		} else {
			bannerURL = null;
		}
		var adFetechParams = zSr[16];
		var adHeaderTxt = zSr[17];
		var isThirdParty = zSr[18];
		if (typeof isThirdParty == 'undefined' || isThirdParty == null) {
			isThirdParty = false;
		} else {
			isThirdParty = isThirdParty.toString().toLowerCase() == "true";
		}
		var isExpandable = zSr[19];
		if (typeof isExpandable == 'undefined' || isExpandable == null) {
			isExpandable = false;
		} else {
			isExpandable = isExpandable.toString().toLowerCase() == "true";
		}
		if (isExpandable == false) {
			isExpandable = "ani0";
		} else {
			isExpandable = "ani1";
		}
		var isInteractive = zSr[20];
		if (typeof isInteractive == 'undefined' || isInteractive == null) {
			isInteractive = 0;
		} else {
			isInteractive = (isInteractive.toString().toLowerCase() == "true")? 1:0;
		}


		tf_advObjects[tf_ads_ix] = new tf_AdvObject(id, sitehost, title, desc, clickURL, logo, image, video, adData, pubSiteId, keyword, topic, partnerId, impressionTrackUrl, imprintPixelUrl, bannerURL, adFetechParams, adHeaderTxt, isThirdParty, isExpandable, isInteractive);
		tf_advObjects[tf_ads_ix].index = tf_ads_ix;
		return tf_advObjects[tf_ads_ix];
	}
}

function tf_getAds() {
	if (tf_ads == null) {
		tf_logmessage("tf_ads is null");
		return;
	}
	if (tf_on_fly_flag != null && tf_on_fly_flag >= 1) {
		tf_logmessage("sending OTF req");
		getAdsOnTheFly();
		return;
	}

	for (var tf_ads_ix = 0; tf_ads_ix < tf_ads.length; tf_ads_ix++) {
		var zSr = tf_ads[tf_ads_ix];
		tf_set_adv_object(zSr, tf_ads_ix);
	}

	for (var tf_links_ix = 0; tf_links_ix < tf_links.length; tf_links_ix++) {
		tf_linkObjects[tf_links_ix] = new tf_linkObj(tf_links[tf_links_ix][0], tf_links[tf_links_ix][1], tf_links[tf_links_ix][2], tf_links[tf_links_ix][3]);
		tf_linkObjects[tf_links_ix].linkIndex = tf_links_ix + 1;
	}
	if (tf_pub_attributes) {
		tf_pubObj = new tf_PubObject(tf_pub_attributes[0], tf_pub_attributes[1], tf_pub_attributes[2], tf_pub_attributes[3], tf_pub_attributes[4], tf_pub_attributes[5], tf_pub_attributes[6], tf_pub_attributes[7], tf_pub_attributes[8], tf_pub_attributes[9]);
	}
	tf_logmessage("tf_ads count : " + tf_advObjects.length);
	if(tf_pubSiteId == 6) {
		var tf_entityId = 6;
		tf_colorSchemeId = 1;
		tf_css_key = 1;
		cssFileName = textlinksServer + '/../extdata/widget/css/textlinks' + ((tf_css_key == 1)?'':tf_entityId + "_") + tf_colorSchemeId + "_" + tf_css_key + '.css';
		tf_css_key = '';
	} else if(tf_color_scheme_attribute) {
		var tf_entityId = tf_color_scheme_attribute[0];
		tf_colorSchemeId = tf_color_scheme_attribute[1];
		tf_css_key = tf_color_scheme_attribute[2];
		cssFileName = textlinksServer + '/../extdata/widget/css/textlinks' + ((tf_css_key == 1)?'':tf_entityId + "_") + tf_colorSchemeId + "_" + tf_css_key + '.css';
		tf_css_key = '';
	}
	displayFlashAds();

	if (mode == 'test') {
		var ad_list = '<table  border="1" bgcolor="yellow" style="font-family:verdana;font-size:10px">';
		ad_list += '<tr><td><nobr>Ad Id </nobr></td>';
		ad_list += '<td><nobr>Served Ad Url</nobr></td>';
		ad_list += '<td><nobr>Ad Url</nobr></td>';
		ad_list += '<td><nobr>Title </nobr></td>';
		ad_list += '<td><nobr>Description </nobr></td>';
		ad_list += '<td><nobr>Patner Id </nobr></td>';
		ad_list += '<td><nobr>Ad Keyword </nobr></td>';
		ad_list += '<td><nobr>Topic </nobr></td>';
		ad_list += '</tr>';

		for (var tf_ads_ix = 0; tf_ads_ix < tf_ads.length; tf_ads_ix++) {
			var zSr = tf_ads[tf_ads_ix];
			var tfct = 0;
			var kw = zSr[tfct++];
			var sitehost = zSr[tfct++];
			var title = zSr[tfct++];
			var desc = zSr[tfct++];
			tfct += 6;
			var keyword = zSr[tfct++];
			var topic = zSr[tfct++];
			var partnerId = zSr[tfct++];
			ad_list += '<tr><td> ' + kw + '</td>';
			ad_list += '<td>' + sitehost + '</td>';
			ad_list += '<td id="' + kw + '_ad_host' + '">' + sitehost + '</td>';
			ad_list += '<td id="' + kw + '_ad_title' + '">' + title + '</td>';
			ad_list += '<td id="' + kw + '_ad_desc' + '"> ' + desc + '</td>';
			ad_list += '<td id="' + kw + '_ad_pid' + '"> ' + partnerId + '</td>';
			ad_list += '<td id="' + kw + '_ad_keyword' + '"> ' + keyword + '</td>';
			ad_list += '<td id="' + kw + '_ad_topic' + '"> ' + topic + '</td>';
			ad_list += '</tr>';
		}
		ad_list += '</table>';
		ad_list += '<table border="1" bgcolor="yellow" style="font-family:verdana;font-size:10px">';
		ad_list += '<tr><td>Textlink </td>';
		ad_list += '<td>Textlink id</td>';
		ad_list += '<td>Topic </td>';
		ad_list += '<td>Ad ids</td>';
		ad_list += '<td>Assigned Ad id</td></tr>';
		for (var tf_links_ix = 0; tf_links_ix < tf_links.length; tf_links_ix++) {
			ad_list += '<tr><td> ' + tf_links[tf_links_ix][0] + '</td>';
			ad_list += '<td>' + tf_links[tf_links_ix][1] + '</td>';
			ad_list += '<td>' + tf_links[tf_links_ix][2] + '</td>';
			ad_list += '<td> ' + tf_links[tf_links_ix][3] + '</td>';
			ad_list += '<td id="' + tf_links[tf_links_ix][1] + '_adid' +  '">&nbsp;</td>';
			ad_list += '</tr>';
		}
		ad_list += '</table>';
		if (document.getElementById('tf_ad_div')) {
			document.getElementById('tf_ad_div').innerHTML += ad_list;
		}
	}
	compareOTFHash();
}

var tf_adsTimeoutCount = 0;
function tf_cssLoader(u) {
	try {
		if (navigator.appVersion.indexOf('MSIE') >= 0 && ('uninitialized' == document.readyState || 'interactive' == document.readyState || 'loading' == document.readyState)) {
			document.write('<l' + 'ink href="' + u + '" rel="stylesheet" type="text/css" />');
		} else {
			var l = document.createElement("link");
			l.setAttribute("type", "text/css");
			l.setAttribute("rel", "stylesheet");
			l.setAttribute("href", u);
			l.setAttribute("media", "screen");
			document.getElementsByTagName("head")[0].appendChild(l);
		}
	} catch(e) {
	}
}

function tf_isMarkedElement(tagName)
{
	var elements = document.getElementsByTagName(tagName);
	if (elements) {
		for (var i = 0; i < elements.length; i++) {
			if (tf_isNodeContentMarked(elements[i]))
				return true;
		}
	}
	return false;
}

function addTextLinksStart() {
	if (tf_started)
		return;
	tf_started = true;
	tf_logmessage("addTextLinksStart");
	if (tf_onload) {
		try {
			tf_onload();
		} catch(e) {

		}
	}

	var AdvertBanner = tf_createDiv("tf_AdDiv", -8000);
	if (isIE) {
		tf_AdLink("tf_AdLink");
		tf_windowopen = function(url) {
			var targetWndName = "tf_AdWindow" + (tf_eventId++);
			var handle = window.open("", targetWndName);
			var link = document.getElementById("tf_AdLink");
			link.target = targetWndName;
			link.href = url;
			link.click();
			return handle;
		};
	}

	tf_loadFlash('widget_v1', 'window', AdvertBanner, null, 0);
	tf_loadFlash('NDwidget_v1', 'transparent', AdvertBanner, null, 1);
	tf_loadFlash('blackWidget', 'transparent', AdvertBanner, null, 3);
	tf_loadFlash('widget3DP', 'transparent', AdvertBanner, null, 4);

	if (!tf_isMarkedElement('DIV') && !tf_isMarkedElement('SPAN') && !tf_isMarkedElement('TABLE')) {
		return;
	}
	tf_logmessage("marker found");
	var bodyNode = document.body;

	if (typeof(tf_url) == 'undefined') {
		tf_url = document.referrer;
		if (window.top.location == document.location) {
			tf_url = document.location;
		}
	}

	if (typeof(tf_maxKeywords) == 'undefined') {
		tf_maxKeywords = 6;
	}

	if (tf_ads == null) {
		tf_docURL = escape(tf_url);
		var adType = "textLinks";

		var prms = "";
		if (mode == 'test' && typeof testIP != 'undefined' && testIP != null) {
			prms = '&testIP=' + testIP;
		}
		var now = new Date();
		var requestId = ((now.getTime() % 2147483648) + Math.random());
		var tf_src_link = keywordsServer + "/Keywords?ads=" + tf_maxKeywords + "&link=" + tf_docURL +
						  "&mode=" + mode + "&serveMode=Normal" + "&type=" + adType + prms + '&rq=' + requestId;
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = tf_src_link;
		bodyNode.appendChild(script);
		tf_logmessage("Keyword Req mode normal sent");
	} else if (clickmode == "whatsthis") {
		tf_getAds();
	}

	window.setTimeout("extractContent()", 50);
}

function extractContent() {
	tf_page_keywords_ext_comp = false;
	var initTime = getCurrentTime();
	tf_extractMrkdContent();
	var finalTime = getCurrentTime();
	if (mode == "test") {
		if (document.getElementById('tf_ad_div')) {
			document.getElementById('tf_ad_div').innerHTML += "<label style='background-color:white'>Time taken to extract content</label><input type='textbox' value='" +
															  (finalTime - initTime) + " milliseconds'>";
		}
	}
	tf_page_words = tf_filter_OTF_content();
	tf_page_keywords_ext_comp = true;
	compareOTFHash();
}

function tf_extractMetaTagContent() {
	var metaElements = document.getElementsByTagName("meta");
	var metaKeywords = "";
	for (var m = 0; m < metaElements.length; m++) {
		if (metaElements[m].name == "keywords" || metaElements[m].name == 'KEYWORDS') {
			metaKeywords = metaElements[m].content;
			break;
		}
	}
	regstrMarkdContnt(metaKeywords);
}

function tf_extractMrkdContent() {

	var divs = document.getElementsByTagName("DIV");
	var spans = document.getElementsByTagName("SPAN");
	var tables = document.getElementsByTagName("TABLE");
	var all = new Array();
	for (var i = 0; i < divs.length; i++)
		all[all.length] = divs[i];
	for (var i = 0; i < spans.length; i++)
		all[all.length] = spans[i];
	for (var i = 0; i < tables.length; i++)
		all[all.length] = tables[i];
	for (var i = 0; i < all.length; i++) {
		if (tf_page_words.length >= OTF_WORDS_EXTRACT_LIMIT)
			return;
		if (tf_isNodeContentMarked(all[i]) && !tf_isNodeContentBlockedMarked(all[i])) {
			tf_findTextNodesForOntheFly(all[i], true);
		}
	}

}

function tf_findTextNodesForOntheFly(node, skipMarkCheck) {
	if (tf_page_words.length >= OTF_WORDS_EXTRACT_LIMIT) {
		return;
	}

	if (node.nodeType == 1 && !skipMarkCheck) {
		if (tf_isNodeContentBlockedMarked(node)) {
			return;
		}
		if ((node.getAttribute("id") && node.getAttribute("id").tagName && node.getAttribute("id").tagName == "INPUT")) {
			return;
		}

		for (var j = 0; j < tf_textLinkMarkers.length; j++) {
			if ((node.getAttribute("id") && node.getAttribute("id").toLowerCase() == tf_textLinkMarkers[j]) || (node.className && node.className.toLowerCase() == tf_textLinkMarkers[j]) || (node.getAttribute("name") && node.getAttribute("name").toLowerCase() == tf_textLinkMarkers[j])) {
				return;
			}
		}
		for (var j = 0; j < tf_textLinkMarkersRegex.length; j++) {
			if ((node.getAttribute("id") && node.getAttribute("id").toLowerCase().match(tf_textLinkMarkersRegex[j])) || (node.className && node.className.toLowerCase().match(tf_textLinkMarkersRegex[j])) || (node.getAttribute("name") && node.getAttribute("name").toLowerCase().match(tf_textLinkMarkersRegex[j]))) {
				return;
			}
		}
	}
	if (node.nodeType == 3) {
		regstrMarkdContent(node.data);
		return;
	}

	if (node.style && ((node.style.display && node.style.display.toLowerCase() == "none") || (node.style.visibility && node.style.visibility.toLowerCase() == "hidden"))) {
		return;
	}

	if (node.tagName == "A" || node.tagName == "SCRIPT" || node.tagName == "OPTION" || node.tagName == "TEXTAREA"
			|| node.tagName == "IFRAME" || node.tagName == "OBJECT" || node.tagName == "STYLE" || node.tagName == "NOEMBED" || node.tagName == "NOSCRIPT")
		return;

	if (tf_pubObj && !tf_pubObj.enableHeaderTextlink && (node.tagName == "CODE" || node.tagName == "H1" || node.tagName == "H2" || node.tagName == "H3"
			|| node.tagName == "H4" || node.tagName == "H5" || node.tagName == "H6"))
		return;

	if (node.hasChildNodes()) {
		var children = new Array();
		// 'clone' the array
		for (var i = 0; i < node.childNodes.length; i++)
			children[children.length] = node.childNodes[i];
		for (var i = 0; i < children.length; i++)
			tf_findTextNodesForOntheFly(children[i], (children[i].tagName != "DIV" && children[i].tagName != "SPAN" && children[i].tagName != "TABLE"));
	}
}

function regstrMarkdContent(text) {
	if (tf_page_words.length >= OTF_WORDS_EXTRACT_LIMIT) {
		return;
	}
	if (text) {
		var texttoadd = text.replace(/\s+/g, ' ');
		if (texttoadd.length > 1)
			tf_page_words += '; ' + texttoadd;
	}
}

function limitWordLength(text, length) {
	var resultString;
	if (text.length < length - OTF_BUFFER)
		resultString = text;
	else {
		text = text.substring(0, length);
		resultString = text.substring(0, text.lastIndexOf(" "));
	}
	return resultString;
}

function tf_filter_OTF_content() {
	var page_words = tf_page_words;
	page_words = page_words.replace(/[;]{2,}/g, ';');
	page_words = page_words.replace(/[.]{2,}/g, '.');
	page_words = page_words.replace(/(\W|_)(\d+(\W|_)\d+(\W|_)\d+(\W|_))/, ';');
	//remove dates
	page_words = limitWordLength(page_words, MAX_OTF_TEXT_CHARS);
	return page_words;
}

function tf_arrayContains(array, value)
{
	for (var index in array)
		if (array[index] == value)
			return true;

	return false;
}

function tf_trim_string(text) {
	return text.replace(/^\s+|\s+$/g, "");
}

function getForumLoc() {
	var forum_loc = "ALL";
	var searchSelect = document.getElementById('search_section');
	if (searchSelect) {
		forum_loc = searchSelect.value;
	}
	return forum_loc;
}

function tf_createDiv(divId, pos) {
	var bodyNode = document.body;
	var divElement = document.getElementById(divId);
	if (document.getElementById(divId) == null) {
		divElement = document.createElement("div");
		divElement.id = divId;
		divElement.style.visibility = "visible";
		divElement.style.top = pos + 'px';
		divElement.style.left = pos + 'px';
		divElement.style.position = "absolute";
		divElement.style.border = "none";
		divElement.style.background = "none";
		divElement.style.zIndex = 200000;
		divElement.style.height = 2 + 'px';
		divElement.style.width = 2 + 'px';
		divElement.style.padding = 10 + 'px';
		divElement.onmouseover = tf_advertBannerOver;
		divElement.onmouseout = tf_advertBannerOut;
		bodyNode.appendChild(divElement);
	}
	return  divElement;
}

function tf_AdLink(linkId) {
	var bodyNode = document.body;
	var linkElement = document.getElementById(linkId);
	if (document.getElementById(linkId) == null) {
		linkElement = document.createElement("a");
		linkElement.id = linkId;
		linkElement.style.visibility = "hidden";
		linkElement.style.height = 2 + 'px';
		linkElement.style.width = 2 + 'px';
		linkElement.style.position = "absolute";
		bodyNode.appendChild(linkElement);
	}
}

function tf_loadFlash(flashFile, flashWMode, AdvertBanner, otfUrl, index) {
	AC_TF_FL_RunContent(
			'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0',
			'width', '1',
			'height', '1',
			'src', textlinksServer + '/videos/' + flashFile,
			'quality', 'high',
			'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
			'align', 'middle',
			'play', 'true',
			'loop', 'true',
			'scale', 'noscale',
			'wmode', flashWMode,
			'devicefont', 'false',
			'id', flashFile,
			'bgcolor', '#ffffff',
			'name', flashFile,
			'menu', 'false',
			'allowFullScreen', 'false',
			'allowScriptAccess', 'always',
			'movie', textlinksServer + '/videos/' + flashFile,
			'flashVars', otfUrl,
			'salign', 'lt',
			'index', index);
}

function displayFlashAds() {
	var AdvertBanner = document.getElementById('tf_AdDiv');
	if (tf_colorSchemeId == 3 || tf_colorSchemeId == 4) {
		tf_flash_key = 2;
		tf_current_flash_name = 'NDwidget_v1';
		AdvertBanner.style.padding = 0 + 'px';
		AdvertBanner.style.height = 200 + 'px';
		AdvertBanner.style.width = 350 + 'px';
	} else if (tf_colorSchemeId == 5) {
		tf_flash_key = 3;
		tf_current_flash_name = 'blackWidget';
		AdvertBanner.style.padding = 0 + 'px';
		AdvertBanner.style.height = 200 + 'px';
		AdvertBanner.style.width = 350 + 'px';
	}

	var p = document.createElement("p");
	p.id = "standardFlashP";
	p.style.background = "none";
	p.style.border = "0";
	p.style.padding = "0";
	p.style.margin = "0";
	p.style.left = "0px";
	p.style.top = "0px";
	p.style.width = '1px';
	p.style.height = '1px';
	p.style.position = 'relative';
	
	if (tf_flash_key == 1) {
		p.innerHTML = tf_ActiveXObject[0];
	} else if (tf_flash_key == 2) {
		p.innerHTML = tf_ActiveXObject[1];
	} else {
		p.innerHTML = tf_ActiveXObject[3];
	}

	var img = document.createElement("img");
	img.onload = function(){isLoadingImageLoaded = true;};
	img.src = staticcontentServer + "/images/loading2.gif";
	img.id = "loadingImage";
	img.style.height = "32px";
	img.style.width = "32px";
	img.style.visibility = "hidden";
	img.style.position = "absolute";
	img.style.left = "0px";
	img.style.top = "0px";
	p.appendChild(img);

	tf_logmessage("displayFlashAds, p.innerHTML=" + escape(p.innerHTML));
	AdvertBanner.appendChild(p);

	for (var i = 0; i < tf_advObjects.length; i++) {
		if (tf_isThirdPartyAd(tf_advObjects[i])) {
			if (!isIE) {
				loadThirdPartyFlash();
			}
			hasThirdPartyads = true;
			break;
		}
	}

	tf_flash_object = window.document.widget_v1;
	if (tf_flash_key == 2) {
		tf_flash_object = window.document.NDwidget_v1;
	} else if (tf_flash_key == 3) {
		tf_flash_object = window.document.blackWidget;
	}

	if (!isIE && (tf_flash_key == 2 || tf_flash_key == 3 || hasThirdPartyads) && (typeof(tf_app_flag) == "undefined" || tf_app_flag == 1)) {
		posDivVisibleArea();
	}
	tf_dragAutofunction();

}

function loadThirdPartyFlash() {
	var AdvertBanner = document.getElementById('tf_AdDiv');
	var p2 = document.createElement("p");
	p2.style.position = "absolute";
	p2.style.left = "1px";
	p2.style.top = "1px";
	p2.style.width = "1px";
	p2.style.height = "1px";
	p2.id = "thirdPartyFlashP";
	p2.style.background = "none";
	p2.style.border = "0";
	p2.style.padding = "0";
	p2.style.margin = "0";
	p2.innerHTML = tf_ActiveXObject[4];

	var thirdPartyDiv = document.createElement("div");
	thirdPartyDiv.id = "thirdPartyDiv";
	thirdPartyDiv.style.position = "absolute";
	thirdPartyDiv.style.left = "0px";
	thirdPartyDiv.style.top = "0px";
	thirdPartyDiv.style.width = "0px";
	thirdPartyDiv.style.height = "0px";
	thirdPartyDiv.style.zIndex = 1;
	p2.appendChild(thirdPartyDiv);

	var iframe = document.createElement("iframe");
	iframe.id = "adframe";
	iframe.width = "0";
	iframe.height = "0";
	iframe.scrolling = "no";
	iframe.frameBorder = "0";
	iframe.allowTransparency = "true";
	iframe.hSpace = "0";
	iframe.vSpace = "0";
	iframe.marginHeight = "0";
	iframe.marginWidth = "0";
	thirdPartyDiv.appendChild(iframe);

	tf_logmessage("displayFlashAds, p(thirdParty).innerHTML=" + escape(p2.innerHTML));
	AdvertBanner.appendChild(p2);

	tf_flash_third_party_object = window.document.widget3DP;
}
var countr = 0;

function posDivVisibleArea() {
	var AdvertBanner = document.getElementById('tf_AdDiv');
	AdvertBanner.style.top = Math.max(document.body.scrollTop, document.documentElement.scrollTop) + 'px';
	AdvertBanner.style.left = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft) + 'px';
	if (((!flashLoaded && tf_flash_key != 1) || (hasThirdPartyads && !flash3DPLoaded)) && countr < 10) {
		countr ++;
		window.setTimeout("posDivVisibleArea()", 200);
	}
}

function sendAdNum() {
	if (tf_isThirdPartyAd()) {
		var tf_link = tf_linkObjects[parseInt(tf_flash_adNum) - 1];
		var tf_adv = tf_link.getAd();
		var textLink = tf_link.keyword;
		var textLinkId = tf_link.keywordId;
		var textLinkTopicId = tf_link.topicId;
		var tf_thirdPartyBannerUrl = tf_adv.bannerURL + "?" + keywordsServer + "/Send?" + "link=" + tf_docURL + "&adData=" + tf_adv.adData + "&tl=" + escape(textLink) + "&tlid="  + textLinkId + "&tlt=" + textLinkTopicId + "&cu=";
		document.getElementById("adframe").src = tf_thirdPartyBannerUrl;
		document.getElementById("standardFlashP").style.width = '1px';
		document.getElementById("standardFlashP").style.height = '1px';
		tf_flash_object.width = 1;
		tf_flash_object.height = 1;
		if (tf_FW != null) {
			window.setTimeout("tf_clipAd3DP(tf_FW, tf_FH, tf_BT, tf_BL)", 100);
		}
	} else {
		if (hasThirdPartyads && document.getElementById("adframe")) {
			document.getElementById("adframe").width = '1px';
			document.getElementById("adframe").height = '1px';
			document.getElementById("thirdPartyDiv").style.width = '1px';
			document.getElementById("thirdPartyDiv").style.height = '1px';
			document.getElementById("thirdPartyFlashP").style.width = '1px';
			document.getElementById("thirdPartyFlashP").style.height = '1px';
			tf_flash_third_party_object.width = 1;
			tf_flash_third_party_object.height = 1;
		}
		if (typeof tf_flash_object.SetVariable == 'undefined') {
			return;
		}

		tf_flash_object.SetVariable("adNumb", "ad" + tf_flash_adNum);
		tf_flash_object.SetVariable("showAdStatus", "1");
	}
}

function sendAdNumClear() {
	if (tf_isThirdPartyAd()) {
	} else {
		if (typeof tf_flash_object.SetVariable == 'undefined') {
			return;
		}
		tf_flash_object.SetVariable("adNumb", tf_clear_flash);
		tf_flash_object.SetVariable("showAdStatus", "1");
	}
}

function tf_showAd() {
	if (!tf_isAdPresent(tf_linkObjects[tf_flash_adNum - 1].getAd())) {
		tf_flash_object.style.visibility = "hidden";
		if(!isLoadingImageLoaded) {
			document.getElementById("loadingImage").src = staticcontentServer + "/images/loading2.gif";
		}
		document.getElementById("loadingImage").style.visibility = "visible";
	} else {
		tf_flash_object.style.visibility = "visible";
		document.getElementById("loadingImage").style.visibility = "hidden";
	}
	document.getElementById("tf_AdDiv").style.visibility = "visible";
	if (tf_isThirdPartyAd()) {
		document.getElementById("thirdPartyFlashP").style.visibility = "visible";
		document.getElementById("standardFlashP").style.visibility = "hidden";
	} else {
		if (hasThirdPartyads) {
			document.getElementById("thirdPartyFlashP").style.visibility = "hidden";
		}
		document.getElementById("standardFlashP").style.visibility = "visible";
	}
}

function tf_hideAd() {
	document.getElementById('tf_AdDiv').style.visibility = "hidden";
	document.getElementById("standardFlashP").style.visibility = "hidden";
	tf_flash_object.style.visibility = "hidden";
	document.getElementById("loadingImage").style.visibility = "hidden";
	if (hasThirdPartyads) {
		document.getElementById("thirdPartyFlashP").style.visibility = "hidden";
		if (document.getElementById("adframe").src != "about:blank") {
			document.getElementById("adframe").src = "about:blank";
		}
	}
}

function passVar() {
	var whatsThis = staticcontentServer + "/whatsthis.jsp?siteId=" + tf_pubSiteId + "&siteName=" + tf_docURL + "&colorSchemeAttribute=[" + tf_color_scheme_attribute.join(",") + "]";
	var whatsThisTag = '';
	if (clickmode == "whatsthis")
		whatsThisTag = 'javascript:void(\'\');';
	else
		whatsThisTag = 'javascript:window.open(\'' + whatsThis + '\');void(\'\');';
	tf_flash_object.SetVariable("cssFile", cssFileName);
	tf_flash_object.SetVariable("adCount", tf_linkObjects.length);
	tf_flash_object.SetVariable("whatsThisURL", whatsThisTag);
	tf_flash_object.SetVariable("mainSep", "~~#~~");
	tf_flash_object.SetVariable("subSep", "-|-");
	tf_flash_object.SetVariable("pubSiteID", (tf_colorSchemeId == 2?36:(tf_colorSchemeId == 1 || tf_colorSchemeId == 3 || tf_colorSchemeId > 4)?1:2) + "");
	// for new flash 1(for roof curve) or 2(for pond curve).
	tf_flash_object.SetVariable("setDrag", "0"); //(tf_flash_key == 2)?0:(isIE?1:0) + ""
	tf_flash_object.SetVariable("et_mode", clickmode);
	tf_flash_object.SetVariable("bgColor", "white");
	tf_flash_object.SetVariable("tf_css_key", tf_css_key);

	tf_flash_object.SetVariable("etDebug", etDebug);
	tf_flash_object.SetVariable("logURL", keywordsServer + "/log" + "?mode=log&logid=" + etLogID + "&message=");
	// or white.
	for( var i = 1; i <= tf_linkObjects.length;i++) {
		tf_flash_object.SetVariable("ad" + i, " ");
	}
	if (typeof(tf_app_flag) != "undefined" && tf_app_flag == 2 && !tf_isThirdPartyAd(tf_advObjects[0])) {
		tf_flash_adNum = 1;
		sendAdNum();
	}
}

function renderOTFAd(zSr, i) {
	var ad = tf_linkObjects[i - 1].getAd();
	if(ad == null) {
		ad = tf_set_adv_object(zSr, tf_advObjects.length);
		tf_linkObjects[i - 1].ad = ad;
		tf_linkObjects[i - 1].isBound = true;
		ad.clickURL = ad.clickURL.replace(/\$SEARCH\$/gi, escape(tf_linkObjects[i - 1].keyword));
		ad.isBound = true;
	} else {
		ad = tf_set_adv_object(zSr, ad.index);
		tf_linkObjects[i - 1].isBound = true;
		ad.clickURL = ad.clickURL.replace(/\$SEARCH\$/gi, escape(tf_linkObjects[i - 1].keyword));
		ad.isBound = true;
		tf_linkObjects[i - 1].ad = ad;
	}
	tf_removeFromArray(tf_avialableAdvIds, ad.siteId);
	tf_addToArray(tf_boundAdvIds, ad.siteId);
	ad.found = NotFoundType.Other;
	tf_flash_object.SetVariable("ad" + i, get_tf_flash_Var(ad, tf_linkObjects[i - 1].keyword, tf_linkObjects[i - 1].keywordId, tf_linkObjects[i - 1].topicId));
	if (tf_flash_adNum != i || tf_flash_hidden == true) {
		return;
	}
	tf_flash_object.SetVariable("adNumb", "ad" + i);
	tf_flash_object.SetVariable("showAdStatus", "1");
	tf_bannerShow(tf_event, nodeSrc, i - 1);
	if (mode == 'test') {
		if(document.getElementById(tf_linkObjects[i - 1].keywordId + "_adid")) {
			document.getElementById(tf_linkObjects[i - 1].keywordId + "_adid").innerHTML = ad.id;
		}
		if(document.getElementById(ad.id + "_ad_host")) {
			document.getElementById(ad.id + "_ad_host").innerHTML = ad.sitehost;
		}
		if(document.getElementById(ad.id + "_ad_title")) {
			document.getElementById(ad.id + "_ad_title").innerHTML = ad.title;
		}
		if(document.getElementById(ad.id + "_ad_desc")) {
			document.getElementById(ad.id + "_ad_desc").innerHTML = ad.desc;
		}
		if(document.getElementById(ad.id + "_ad_pid")) {
			document.getElementById(ad.id + "_ad_pid").innerHTML = ad.partnerId;
		}
		if(document.getElementById(ad.id + "_ad_keyword")) {
			document.getElementById(ad.id + "_ad_topic").innerHTML = ad.topicKeyword;
		}
		if(document.getElementById(ad.id + "_ad_keyword")) {
			document.getElementById(ad.id + "_ad_topic").innerHTML = ad.topic;
		}
	}
}

function get_tf_flash_Var(adv, keyword, keywordId, topicId) {
	adv.trackURL = adv.trackURL + "&tl=" + escape(keyword) + "&tlid="  + keywordId + "&tlt=" + topicId;
	var tf_flash_var = "";
	if (tf_isThirdPartyAd(adv)) {
		tf_flash_var += "adType-|-thidParty";
		tf_flash_var += "~~#~~wHeader-|-pwByET";
	} else if (adv.partnerId == PG_ID || adv.partnerId == TD_ID || adv.partnerId == SH_ID || adv.partnerId == ITM_ID) {
		tf_flash_var = tf_getFlashVar(adv);
	} else if (adv.partnerId == '114') {
		tf_flash_var = tf_getDiceFlashVar(adv);
	} else {
		var category = tf_getFlashCategory(adv);
		tf_flash_var += "adType-|-" + category;
		tf_flash_var += "~~#~~wHeader-|-pwByET";

		if (category == "cat15") {
			if (tf_colorSchemeId == 1 || tf_colorSchemeId == 2)
				tf_flash_var += "~~#~~bannerLoader-|-" + textlinksServer + "/videos/bannerLoader.swf";
			else if (tf_colorSchemeId == 3 || tf_colorSchemeId == 4)
				tf_flash_var += "~~#~~bannerLoader-|-" + textlinksServer + "/videos/bannerLoader_transparent.swf";
			else
				tf_flash_var += "~~#~~bannerLoader-|-" + textlinksServer + "/videos/bannerLoader_black.swf";

			tf_flash_var += "~~#~~adVars-|-" + tf_getAdVars(adv, keyword);
			tf_flash_var += "~~#~~interactive-|-" + adv.isInteractive;
		}

		if (adv.partnerId == ASK_ID) {
			var temp_array1 = adv.desc.split('-||-');
			tf_flash_var += "~~#~~keyword-|-" + tf_trim_string(temp_array1[0]);
			if (temp_array1[1] != null) {
				var temp_array2 = tf_trim_string(temp_array1[1]).split('-&&-');
				for (var j = 0; j < temp_array2.length; j++) {
					var temp_array3 = temp_array2[j].split('-##-');
					if (temp_array3[1] != null) {
						tf_flash_var += "~~#~~tabtitle" + (j + 1) + "-|-" + tf_trim_string(temp_array3[0]);
						tf_flash_var += "~~#~~tabsearchurl" + (j + 1) + "-|-" + tf_trim_string(temp_array3[1]);
					}
				}
			}
		} else if (adv.partnerId == LIVE_ID) {
			tf_flash_var += "~~#~~tabtitle1-|-" + "Find news results on<br><span class='tf_flash" + tf_css_key + "_live'>" + adv.desc + "</span> with Live Search";
			tf_flash_var += "~~#~~tabsearchurl1-|-" + adv.clickURL;
			var descTokens = adv.desc.split("-##-");
			tf_flash_var += "~~#~~keyword-|-" + descTokens[0];
			if (descTokens[1] != ARTS_ENTERTAINMENT) {
				tf_flash_var += "~~#~~msnLogoRight-|-cashBack";
			} else {
				tf_flash_var += "~~#~~msnLogoRight-|-regular";
			}
		} else {
			tf_flash_var += "~~#~~adTitle-|-<span class='tf_flash" + tf_css_key + "_title1'>" + adv.title + "</span>";
			tf_flash_var += "~~#~~adDes-|-<span class='tf_flash" + tf_css_key + "_description1'>" + adv.desc + "</span>";
		}

		var logo = adv.logo;
		if (adv.logo == null) {
			logo = "noLogo";
		}
		tf_flash_var += "~~#~~AnimationKey-|-" + adv.isExpandable;
		// or ani0 to stop animation. this is for selfservice banners in textlink ads.
		tf_flash_var += "~~#~~selectedTab-|-tab1";
		tf_flash_var += "~~#~~wLogo-|-" + logo;
		tf_flash_var += "~~#~~linkURL-|-<span class='tf_flash" + tf_css_key + "_bottomURL1'>" + adv.sitehost + "</span>";
		tf_flash_var += "~~#~~displayURL-|-" + adv.sitehost;
		tf_flash_var += "~~#~~bannerURL-|-" + adv.bannerURL;
		tf_flash_var += "~~#~~btnURL-|-" + staticcontentServer + "/images/btn_learnmore.png";
		tf_flash_var += "~~#~~proImage-|-" + adv.image;
		tf_flash_var += "~~#~~videoPlayer-|-" + textlinksServer + "/videos/banner.swf";
		tf_flash_var += "~~#~~tf_mediafile-|-" + adv.video;
		tf_flash_var += "~~#~~tf_flvControls-|-show~~#~~tf_mediaFormat-|-flv";
		if (tf_colorSchemeId == 5) {
			tf_flash_var += "~~#~~cSearchTxt-|-<span class='tf_flash" + tf_css_key + "_bottomURL_cs'>Site search for: \"" + keyword + "\"</span>";
		} else {
			tf_flash_var += "~~#~~cSearchTxt-|-<span class='tf_flash" + tf_css_key + "_bottomURL_cs'><img src='" + staticcontentServer + "/images/srch-button.gif' align='right'/><BR>Site search for: \"" + keyword + "\"</span>";
		}
		tf_flash_var += "~~#~~comSearchURL-|-" + tf_getSrchString(adv.pubSiteId, keyword);
		tf_flash_var += "~~#~~clickTagURL-|-javascript:submitClickIndex('" + category + "')";

		var trackURL = adv.trackURL;
		if (adv.isInteractive) {
			trackURL = adv.trackURL + '&cu=';
		}
		var clickURL = adv.clickURL;
		if (adv.isInteractive && clickURL.indexOf('?') == -1) {
			clickURL = adv.clickURL + '?';
		}

		tf_flash_var += "~~#~~et_clickURL-|-" + clickURL + "";
		tf_flash_var += "~~#~~et_trackURL-|-" + trackURL + "";
	}
	tf_flash_var += "~~#~~adHeaderTxt-|-" + adv.adHeaderTxt;
	return tf_flash_var;
}

function tf_getAdVars(adv, keyword) {
	var str = "";
	str = "tf_textlink-@-" + keyword;
	str += "-@@-tf_topic-@-" + adv.topic;
	str += "-@@-tf_state-@-" + tf_getStringValue(tf_state);
	str += "-@@-tf_city-@-" + tf_getStringValue(tf_city);
	str += "-@@-tf_zipcode-@-" + tf_getStringValue(tf_zip);
	return str;
}

function tf_getStringValue(object) {
	if (typeof(object) == "undefined" || object == null || object.toString().length == 0) {
		return "";
	}
	return object.toString();
}

function tf_getFlashVar(adv) {
	return "adType-|-" + adv.title + "~~#~~wHeader-|-pwByET~~#~~et_mode-|-test~~#~~catXML-|-" + adv.desc;
}

function tf_getSrchString(pubSiteId, keyword) {
	return (pubSiteId == '6')? COMPUTING_SEARCH + escape(keyword) + '&forum=' + getForumLoc() :
		   (pubSiteId == '1')? MAJORGEEKS_SRCH_PRFX + escape(keyword) + MAJORGEEKS_SRCH_SUFFIX :'';
}

function tf_getFlashCategory(adv) {
	if (adv.partnerId == ASK_ID) {
		return "cat16";
	} else if (adv.partnerId == LIVE_ID) {
		return "cat17";
	} else if (adv.partnerId == TD_ID) {
		return "cat13";
	} else if (adv.partnerId == SS_ID && adv.bannerURL != null) {
		return "cat15";
	} else if (adv.video != null && (adv.pubSiteId == '6' || adv.pubSiteId == '1')) {
		return "cat6";
	} else if (adv.video != null && (adv.pubSiteId != '6' || adv.pubSiteId != '1')) {
		return "cat5";
	} else if (adv.image != null && (adv.pubSiteId == '6' || adv.pubSiteId == '1')) {
		return "cat4";
	} else if (adv.image == null && (adv.pubSiteId == '6' || adv.pubSiteId == '1')) {
		return "cat3";
	} else if (adv.image == null) {
		return "cat1";
	} else if (adv.image != null) {
		return "cat2";
	}
}

/////////////////////////////AC_TF_RunActiveContent.js /////////////////////
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var isChrome = (navigator.userAgent.indexOf("Chrome") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	try {
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			version = "WIN 6,0,21,0";
			axo.AllowScriptAccess = "always";
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}

	return version;
}

function GetSwfVer() {
	var flashVer = -1;
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if (isIE && isWin && !isOpera) {
		flashVer = ControlVersion();
	}
	return flashVer;
}

function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1) {
		return false;
	} else if (versionStr != 0) {
		if (isIE && isWin && !isOpera) {
			tempArray = versionStr.split(" ");
			tempString = tempArray[1];
			versionArray = tempString.split(",");
		} else {
			versionArray = versionStr.split(".");
		}
		var versionMajor = versionArray[0];
		var versionMinor = versionArray[1];
		var versionRevision = versionArray[2];

		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_TF_AddExtension(src, ext)
{
	if (src.indexOf('?') != -1)
		return src.replace(/\?/, ext + '?');
	else
		return src + ext + '?version=' + tf_version;
}

function AC_TF_Generateobj(objAttrs, params, embedAttrs, index)
{
	var str = '';
	if (isIE && isWin && !isOpera)
	{
		str += '<object ';
		for (var i in objAttrs)
		{
			str += i + '="' + objAttrs[i] + '" ';
		}
		str += '>';
		for (var i in params)
		{
			str += '<param name="' + i + '" value="' + params[i] + '" /> ';
		}
		str += '</object>';
	}
	else
	{
		str += '<embed ';
		for (var i in embedAttrs)
		{
			str += i + '="' + embedAttrs[i] + '" ';
		}
		str += '> </embed>';
	}
	tf_ActiveXObject[index] = str;
}

function AC_TF_FL_RunContent() {

	var ret =
			AC_TF_GetArgs
					(arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
							, "application/x-shockwave-flash"
							);
	AC_TF_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs, ret.index);
}

function AC_TF_SW_RunContent() {
	var ret =
			AC_TF_GetArgs
					(arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
							, null
							);
	AC_TF_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs, ret.index);
}

function AC_TF_GetArgs(args, ext, srcParamName, classid, mimeType) {
	var ret = new Object();
	ret.embedAttrs = new Object();
	ret.params = new Object();
	ret.objAttrs = new Object();
	for (var i = 0; i < args.length; i = i + 2) {
		var currArg = args[i].toLowerCase();

		switch (currArg) {
			case "classid":
				break;
			case "pluginspage":
				ret.embedAttrs[args[i]] = args[i + 1];
				break;
			case "src":
			case "movie":
				args[i + 1] = AC_TF_AddExtension(args[i + 1], ext);
				ret.embedAttrs["src"] = args[i + 1];
				ret.params[srcParamName] = args[i + 1];
				break;
			case "onafterupdate":
			case "onbeforeupdate":
			case "onblur":
			case "oncellchange":
			case "onclick":
			case "ondblclick":
			case "ondrag":
			case "ondragend":
			case "ondragenter":
			case "ondragleave":
			case "ondragover":
			case "ondrop":
			case "onfinish":
			case "onfocus":
			case "onhelp":
			case "onmousedown":
			case "onmouseup":
			case "onmouseover":
			case "onmousemove":
			case "onmouseout":
			case "onkeypress":
			case "onkeydown":
			case "onkeyup":
			case "onload":
			case "onlosecapture":
			case "onpropertychange":
			case "onreadystatechange":
			case "onrowsdelete":
			case "onrowenter":
			case "onrowexit":
			case "onrowsinserted":
			case "onstart":
			case "onscroll":
			case "onbeforeeditfocus":
			case "onactivate":
			case "onbeforedeactivate":
			case "ondeactivate":
			case "type":
			case "codebase":
			case "id":
				ret.objAttrs[args[i]] = args[i + 1];
				break;
			case "width":
			case "height":
			case "align":
			case "vspace":
			case "hspace":
			case "class":
			case "title":
			case "accesskey":
			case "name":
			case "tabindex":
				ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i + 1];
				break;
			case "index":
				ret.index = args[i + 1];
				break;
			default:
				ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i + 1];
		}
	}
	ret.objAttrs["classid"] = classid;
	if (mimeType) ret.embedAttrs["type"] = mimeType;
	return ret;
}

//////////Dice Ads
function Dice_Click(index) {
	Dice_Srch();
}

function Dice_Srch_Click(index, dice_skill, dice_location) {
	var clickURL = '';
	var i = parseInt(tf_flash_adNum);
	var adv = tf_linkObjects[i - 1].getAd();
	clickURL = Dice_SEARCH_prefix + URLEncode(dice_skill) + Dice_SEARCH_append + URLEncode(dice_location) + Dice_SEARCH_suffix;
	tf_submitClick(i, clickURL, adv.trackURL);
}

function Dice_Srch(dice_skill, dice_location) {
	var clickURL = '';
	var i = parseInt(tf_flash_adNum);
	var adv = tf_linkObjects[i - 1].getAd();
	var jobTitle = adv.desc.split('-||-')[0];
	var location = '';
	location = tf_getUserLocation();

	if (diceAdNumber == 0) {
		Dice_Srch_Click(i, dice_skill, dice_location);
	} else if (diceAdNumber == 1) {
		if (dice_skill == '' || dice_skill == DICE_DEFAULT_INPUT) {
			dice_skill = jobTitle;
		}
		dice_location = location;
		Dice_Srch_Click(i, dice_skill, dice_location);
	} else if (diceAdNumber == 2) {
		dice_location = dice_skill;
		//flash always sends data in 1st field.
		if (dice_location == '' || dice_location == DICE_DEFAULT_INPUT) {
			dice_location = location;
		}
		dice_skill = jobTitle;
		Dice_Srch_Click(i, dice_skill, dice_location);
	} else if (diceAdNumber == 3 || diceAdNumber == 4) {
		dice_skill = jobTitle;
		dice_location = location;
		Dice_Srch_Click(i, dice_skill, dice_location);
	} else if (diceAdNumber == 5) {
		if (dice_skill == '' || dice_skill == DICE_DEFAULT_INPUT) {
			dice_skill = jobTitle;
		}
		if (dice_location == '' || dice_location == DICE_DEFAULT_INPUT) {
			dice_location = location;
		}
		Dice_Srch_Click(i, dice_skill, dice_location);
	} else if (diceAdNumber == 6) {
		clickURL = DICE_DOUBLE_CLICK_PREFIX + DICE_LOCAL_DIRECT_MATCH;
		tf_submitClick(i, clickURL, adv.trackURL);
	} else if (diceAdNumber == 7 || diceAdNumber == 8) {
		clickURL = DICE_DOUBLE_CLICK_PREFIX + DICE_LOCAL_TOP_LEVEL;
		tf_submitClick(i, clickURL, adv.trackURL);
	} else if (diceAdNumber == 9) {
		var dice_location_Strings = dice_location.split(" ");
		var dice_zip = dice_location_Strings[dice_location_Strings.length - 1];
		if (dice_zip.match(tf_digitOnly_Regex)) {
			clickURL = DICE_DOUBLE_CLICK_PREFIX + DICE_SALARY_DIRECT_MATCH_prefix + URLEncode(dice_skill) + DICE_LOCATION_TYPE_ID + URLEncode(dice_zip) + DICE_SALARY_DIRECT_MATCH_Suffix;
		} else {
			clickURL = DICE_DOUBLE_CLICK_PREFIX + DICE_SALARY_B;
		}
		tf_submitClick(i, clickURL, adv.trackURL);
	} else if (diceAdNumber == 10) {
		clickURL = DICE_DOUBLE_CLICK_PREFIX + DICE_SALARY_DIRECT_MATCH_prefix + URLEncode(jobTitle) + DICE_LOCATION_TYPE_ID + URLEncode(tf_zip) + DICE_SALARY_DIRECT_MATCH_Suffix;
		tf_submitClick(i, clickURL, adv.trackURL);
	}
}

function tf_getDiceFlashVar(adv) {
	var tf_flash_var = "";
	var descTokens = adv.desc.split('-||-');
	var jobTitle = descTokens[0];
	var companyName = descTokens[1];
	var areaCode = descTokens[2];
	var municipality = descTokens[3];
	var region = descTokens[4];
	var location = '';
	location = tf_getUserLocation();
	var diceCategory = "cat9";
	var logo = staticcontentServer + "/images/spacer.gif";
	var diceLogo = staticcontentServer + "/images/dice-logo.gif";
	var clickTagFunction = "javascript:submitClickIndex('dice')";
	var clickTagUrl = adv.clickURL;
	var button = '';
	var showTxt1 = "";
	var pdTxt = "";
	var showTxt2 = "";
	var pdTxt2 = "";
	var adDes = "";
	diceAdNumber = Math.floor(Math.random() * 11) % 11;
	if (diceAdNumber != 0) {
		clickTagFunction = "javascript:Dice_Click(\"" + diceAdNumber + "\")";
		diceCategory = "cat10";
		diceLogo = staticcontentServer + "/images/dice-logo_new.gif";
		button = staticcontentServer + "/images/btn_searchNow.gif";
		if (diceAdNumber == 6 || diceAdNumber == 7 || diceAdNumber == 8) {
			diceAdNumber = diceAdNumber - 5;
		}
		if (diceAdNumber == 1) {
			adDes = "<span class='tfAdv_desc_dice'>Find </span><span class='tf_flash" + tf_css_key + "_titleCat7'>" + jobTitle + "</span><span class='tfAdv_desc_dice'> position in </span><span class='tf_flash" + tf_css_key + "_titleCat7'><br>" + municipality + ", " + region + "</span>";
			showTxt1 = "<span class='tf_flash" + tf_css_key + "_title2Cat7'>Enter keywords (skill, job title)</span>";
			pdTxt = "";
		} else if (diceAdNumber == 2) {
			adDes = "<span class='tfAdv_desc_dice'>Find </span><span class='tf_flash" + tf_css_key + "_titleCat7'>" + jobTitle + "</span><span class='tfAdv_desc_dice'> position in </span><span class='tf_flash" + tf_css_key + "_titleCat7'><br>" + municipality + ", " + region + "</span>";
			showTxt1 = "<span class='tf_flash" + tf_css_key + "_title2Cat7'>Enter location (city, state or zip)</span>";
			pdTxt = "";
		} else if (diceAdNumber == 3) {
			adDes = "<span class='tf_flash" + tf_css_key + "_titleCat7'>Find " + jobTitle + " position in <br>" + municipality + ", " + region + "</span>";
		} else if (diceAdNumber == 4) {
			adDes = "<span class='tf_flash" + tf_css_key + "_titleCat7'>Post Your Resume and Find a Better Job Today!</span>";
			button = staticcontentServer + "/images/btn_postResume.gif";
		} else if (diceAdNumber == 5) {
			adDes = "<span class='tf_flash" + tf_css_key + "_titleCat7'>Find a New Job Today!</span>";
			button = staticcontentServer + "/images/search_Dice.gif";
			showTxt1 = "<span class='tf_flash" + tf_css_key + "_title2Cat7'>Enter keywords (skill, job title)</span>";
			pdTxt = "";
			showTxt2 = "<span class='tf_flash" + tf_css_key + "_title2Cat7'>Enter location (city, state or zip)</span>";
			pdTxt2 = tf_getUserLocation();
		} else if (diceAdNumber == 6) {
			adDes = "<span class='tf_flash" + tf_css_key + "_titleCat7'>Find the Hottest Tech Jobs in Your Local Area</span>";
			pdTxt = municipality + ", " + region + areaCode;
		} else if (diceAdNumber == 7) {
			adDes = "<span class='tf_flash" + tf_css_key + "_titleCat7'>Find the Hottest Tech Jobs in Your Local Area</span>";
			showTxt1 = "<span class='tf_flash" + tf_css_key + "_title2Cat7'>Job Title</span>";
			pdTxt = jobTitle;
			showTxt2 = "<span class='tf_flash" + tf_css_key + "_title2Cat7'>Zip Code</span>";
			pdTxt2 = areaCode;
		} else if (diceAdNumber == 8) {
			adDes = "<span class='tf_flash" + tf_css_key + "_titleCat7'>Find the Hottest IT Job Markets</span>";
			pdTxt = municipality + ", " + region;
		} else if (diceAdNumber == 9) {
			adDes = "<span class='tf_flash" + tf_css_key + "_titleCat7'>Get Your Free Salary Report Today!</span>";
			button = staticcontentServer + "/images/search_Dice.gif";
			showTxt1 = "<span class='tf_flash" + tf_css_key + "_title2Cat7'>Job Title</span>";
			pdTxt = jobTitle;
			showTxt2 = "<span class='tf_flash" + tf_css_key + "_title2Cat7'>Zip Code</span>";
			pdTxt2 = municipality + ", " + region + " " + areaCode;
		} else if (diceAdNumber == 10) {
			adDes = "<span class='tf_flash" + tf_css_key + "_titleCat7'>How Much is Your Job Worth?</span>";
			button = staticcontentServer + "/images/search_Dice.gif";
			pdTxt = jobTitle;
		}
	} else {
		adDes = "<span class='tf_flash" + tf_css_key + "_title2Cat8'>Apply For: <br></span><span class='tf_flash" + tf_css_key + "_titleCat7'>" + jobTitle + "<br></span><span class='tfAdv_desc_dice'>" + companyName + "<br>" + municipality + ", " + region + " " + areaCode + "</span>";
		button = staticcontentServer + "/images/search_Dice.gif";
	}
	var rateJob = ( Math.round(Math.random() * 100) ) % 2;
	rateJob = 0;
	tf_flash_var += "adType-|-" + diceCategory;
	tf_flash_var += "~~#~~wHeader-|-pwByET";
	tf_flash_var += "~~#~~rateJob-|-" + rateJob;
	tf_flash_var += "~~#~~diceNum-|-d" + diceAdNumber;
	tf_flash_var += "~~#~~adDes-|-" + adDes;
	tf_flash_var += "~~#~~wLogo-|-" + logo;
	tf_flash_var += "~~#~~diceLogo-|-" + diceLogo;
	tf_flash_var += "~~#~~button-|-" + button;
	tf_flash_var += "~~#~~btn-|-" + button;
	tf_flash_var += "~~#~~showTxt1-|-" + showTxt1;
	tf_flash_var += "~~#~~pdTxt-|-" + pdTxt;
	tf_flash_var += "~~#~~showTxt2-|-" + showTxt2;
	tf_flash_var += "~~#~~pdTxt2-|-" + pdTxt2;
	tf_flash_var += "~~#~~skillTxt-|-<span class='tf-dice-bold_10'>Enter Keywords(skill, job title)</span>";
	tf_flash_var += "~~#~~locTxt-|-<span class='tf-dice-bold_10'>Enter Location(city, state or zip)</span>";
	tf_flash_var += "~~#~~searchSkillInput-|-" + adv.title;
	tf_flash_var += "~~#~~locationInput-|-" + location;
	tf_flash_var += "~~#~~bottomURL-|-<span class='tf_flash" + tf_css_key + "_bottomURL1'>" + adv.sitehost + "</span>";
	tf_flash_var += "~~#~~clickTagURL-|-" + clickTagFunction;
	tf_flash_var += "~~#~~et_clickURL-|-" + adv.clickURL + "";
	tf_flash_var += "~~#~~et_trackURL-|-" + adv.trackURL + "";
	return tf_flash_var;
}

//Functions called by flash(DO NOT DELETE)

function tf_askSearch(url) {
	var adv = tf_linkObjects[tf_flash_adNum - 1].getAd();
	tf_submitClick(tf_flash_adNum, url, adv.trackURL);
}

function tf_msnSearch(url) {
	var adv = tf_linkObjects[tf_flash_adNum - 1].getAd();
	tf_submitClick(tf_flash_adNum, url, adv.trackURL);
}

function tf_dragWidget(myX, myY) {
	var AdvertBanner = document.getElementById("tf_AdDiv");
	var nowX = AdvertBanner.style.left;
	var nowY = AdvertBanner.style.top;
	nowX = (parseInt(nowX.split('px')[0]) + parseInt(myX));
	nowY = (parseInt(nowY.split('px')[0]) + parseInt(myY));

	AdvertBanner.style.left = nowX + 'px';
	AdvertBanner.style.top = nowY + 'px';
}

/*TO DO: Remove if not used by flash
function tf_searchButtonOver() {
	searchButton = staticcontentServer + "/images/srch-button-onMouse.gif";
	document.getElementById('searchButton').setAttribute('src', searchButton);
}

function tf_searchButtonOut() {
	searchButton = staticcontentServer + "/images/srch-button.gif";
	document.getElementById('searchButton').setAttribute('src', searchButton);
}*/

function displayTextLinkAds() { //called by flash NDWidget_V1
	if ((tf_flash_key == 2 || tf_flash_key == 3) && (typeof(tf_app_flag) == "undefined" || tf_app_flag == 1)) {
		if (flash3DPLoaded || !hasThirdPartyads) {
			tf_hideAd();
		}
	}
	tf_logmessage("displayTextLinkAds called.");
	var bodyNode = document.body;

	var divs = document.getElementsByTagName("DIV");
	var spans = document.getElementsByTagName("SPAN");
	var tables = document.getElementsByTagName("TABLE");
	var all = new Array();
	for (var i = 0; i < divs.length; i++)
		all[all.length] = divs[i];
	for (var i = 0; i < spans.length; i++)
		all[all.length] = spans[i];
	for (var i = 0; i < tables.length; i++)
		all[all.length] = tables[i];

	var adspacing = 0;
	var forcedSpacing = true;
	if (tf_pubObj) {
		adspacing = tf_pubObj.adspacing;
		forcedSpacing = tf_pubObj.forcedspacing;
	}

	var initTime = getCurrentTime();
	for (var i = 0; i < all.length; i++) {
		if (tf_isNodeContentMarked(all[i]) && !tf_isNodeContentBlockedMarked(all[i])) {
			tf_findTextNodes(all[i], adspacing, forcedSpacing);
		}
	}
	var finalTime = getCurrentTime();
	if (mode == "test") {
		if (document.getElementById('tf_ad_div')) {
			document.getElementById('tf_ad_div').innerHTML += "<label style='background-color:white'>Time taken to mark text</label><input type='textbox' value='" +
															  (finalTime - initTime) + " milliseconds'>";
		}
	}
	
	if (typeof(tf_app_flag) == "undefined") {
		var notFoundCount = 0;
		for (var i = 0; i < tf_linkObjects.length; i++) {
			if (tf_linkObjects[i].found != NotFoundType.Other) {
				var textLink = tf_linkObjects[i].keyword;
				var textLinkId = tf_linkObjects[i].keywordId;
				var textLinkTopicId = tf_linkObjects[i].topicId;
				notFoundCount++;
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = tf_linkObjects[i].notFoundURL + "&notFoundType=" + tf_linkObjects[i].found + "&tl=" + escape(textLink) + "&tlid="  + textLinkId + "&tlt=" + textLinkTopicId;
				document.body.appendChild(script);
			}
		}
		tf_logmessage("Ads Not Found = " + notFoundCount);
	}
}

function tf_OTF_flashResponse(value) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.id = "tf_otf_js";
	script.text = unescape(unescape(value));
	document.body.appendChild(script);
	tf_logmessage("tf_OTF_flashResponse called");
}

function etFlashLoaded() {  //called by flash when it gets loaded. i.e. isreadyState
	tf_logmessage("etFlashLoaded, calling sendStatus()");
	sendStatus();
}

function sendStatus3DP() {
	if (!tf_advObjects || tf_advObjects.length == 0) {
		return;
	}
	if (typeof tf_flash_third_party_object.SetVariable == 'undefined') {
		if (++tf_flash_third_party_load_counter < 20) {
			window.setTimeout("sendStatus3DP()", 200);
		}
		return;
	}
	tf_flash_third_party_load_counter = 0;
	passVar3DP();
	tf_flash_third_party_object.SetVariable("wStatus", "1");
}

function et3DPFlashLoaded() {
	sendStatus3DP();
	flash3DPLoaded = true;
	if ((flashLoaded || tf_flash_key == 1) && (typeof(tf_app_flag) == "undefined" || tf_app_flag == 1)) {
		tf_hideAd();
	}
	if (isIE) {
		displayTextLinkAds();
	}
}

function passVar3DP() {
	var whatsThis = staticcontentServer + "/whatsthis.jsp?siteId=" + tf_advObjects[0].pubSiteId + "&siteName=" + tf_docURL + "&colorSchemeAttribute=[" + tf_color_scheme_attribute.join(",") + "]";
	var whatsThisTag = '';
	if (clickmode == "whatsthis")
		whatsThisTag = 'javascript:void(\'\');';
	else
		whatsThisTag = 'javascript:window.open(\'' + whatsThis + '\');void(\'\');';
	tf_flash_third_party_object.SetVariable("colorSchemeId", tf_colorSchemeId);
	tf_flash_third_party_object.SetVariable("whatsThisURL", whatsThisTag);
	tf_clipAd3DP(null);
}

function sendStatus() {
	if (!tf_advObjects) {
		return;
	}
	if (typeof tf_flash_object.SetVariable == 'undefined') {
		if (++tf_flash_load_counter < 20) {
			window.setTimeout("sendStatus()", 200);
		}
		return;
	}
	tf_flash_load_counter = 0;
	tf_logmessage("calling passVar");
	passVar();
	tf_logmessage("passVar completed ");
	tf_flash_object.SetVariable("wStatus", "1");
}

function tf_dragEnd() {
	if (!tf_isThirdPartyAd()) {
		sendStatus();
		sendAdNum();
	}
}

function tf_dragAutofunction() {
}

function tf_clipAd(top, right, bottom, left) {
	var newbottom = (parseInt(bottom) + 16) + '';
	tf_flash_object.width = right;
	tf_flash_object.height = bottom;
	right = parseInt(right);
	bottom = parseInt(bottom);
	var AdvertBanner = document.getElementById("tf_AdDiv");
	AdvertBanner.style.width = right + 'px';
	AdvertBanner.style.height = bottom + 'px';
	document.getElementById("standardFlashP").style.width = right + 'px';
	document.getElementById("standardFlashP").style.height = bottom + 'px';
	//if (tf_adjustPos) {
	if (typeof(tf_app_flag) == "undefined" || tf_app_flag == 1) {
		tf_setBannerPosition(nodeSrc, 0, 0);
		if (!isIE) {
			window.setTimeout("tf_showAd();", 100);
		}
	}
	//}
	tf_adjustPos = false;
}

function tf_clipAd3DP(FW, FH, BT, BL) {
	if (tf_FW != null) {
		FW = tf_FW;
		FH = tf_FH;
		BT = tf_BT;
		BL = tf_BL;
		document.getElementById("tf_AdDiv").style.width = parseInt(FW) + 'px';
		document.getElementById("tf_AdDiv").style.height = parseInt(FH) + 'px';
		document.getElementById("adframe").width = '300px';
		document.getElementById("adframe").height = '250px';
		document.getElementById("thirdPartyFlashP").style.width = FW;
		document.getElementById("thirdPartyFlashP").style.height = FH;
		document.getElementById("thirdPartyDiv").style.top = parseInt(BT) + 'px';
		document.getElementById("thirdPartyDiv").style.left = parseInt(BL) + 'px';
		document.getElementById("thirdPartyDiv").style.width = '300px';
		document.getElementById("thirdPartyDiv").style.height = '250px';
		if (typeof(nodeSrc) != "undefined" && nodeSrc != null && (typeof(tf_app_flag) == "undefined" || tf_app_flag == 1)) {
			tf_setBannerPosition(nodeSrc, 0, 0);
			tf_flash_third_party_object.width = FW;
			tf_flash_third_party_object.height = FH;
			if (!isIE) {
				window.setTimeout("tf_showAd();", 100);
			}
		}
	} else if (FW == null) {
		if (tf_colorSchemeId == 1 || tf_colorSchemeId == 2) {
			tf_clipAd3DP('304', '277', '24', '2');
		} else if (tf_colorSchemeId == 3) {
			tf_clipAd3DP('316', '314', '40', '9');
		} else if (tf_colorSchemeId == 4) {
			tf_clipAd3DP('326', '312', '40', '14');
		} else if (tf_colorSchemeId == 5) {
			tf_clipAd3DP('321', '324', '46', '8');
		}
	} else {
		tf_FW = FW;
		tf_FH = FH;
		tf_BT = BT;
		tf_BL = BL;

		if (typeof(tf_app_flag) != "undefined" && tf_app_flag == 2) {
			tf_flash_adNum = 1;
			sendAdNum();
		}
	}
}

/////Utility Functions
function URLEncode(plaintext) {
	var SAFECHARS = "0123456789" +
					"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
					"abcdefghijklmnopqrstuvwxyz" +
					"-_.!~*()";
	var HEX = "0123456789ABCDEF";

	var encoded = "";
	for (var i = 0; i < plaintext.length; i++) {
		var ch = plaintext.charAt(i);
		if (ch == " ") {
			encoded += "+";
		} else if (SAFECHARS.indexOf(ch) != -1) {
			encoded += ch;
		} else {
			var charCode = ch.charCodeAt(0);
			if (charCode > 255) {
				encoded += escape(ch);
			} else {
				encoded += "%";
				encoded += HEX.charAt((charCode >> 4) & 0xF);
				encoded += HEX.charAt(charCode & 0xF);
			}
		}
	}
	return encoded;
}

function tf_getUserLocation() {
	var location = '';
	if (tf_city) {
		location = tf_city;
	}
	if (tf_state) {
		location += (location.length > 0 ? ',': '') + tf_state;
	}
	if (tf_zip) {
		location += ' ' + tf_zip;
	}
	return location;
}

////////// md5 hash key ////////
var hex_chr = "0123456789abcdef";
function applyFilterForMD5(str) {

	var actualLength = str.length;

	str = getAllSmallAplha(str);
	if (!isIE) {
		var dt = new Date();
		var datestr = getAllSmallAplha(dt.toString());
		var gmtstr = "";
		datestr.replace(/gmt.*time/g, function(u) {
			gmtstr = u;
			return u;
		});
		str = str.replace(new RegExp(gmtstr, 'g'), 'utc');
	}
	//keep only alpha chars in small case.
	tf_CurrentMD5StrLen = str.length;

	if (actualLength > MAX_OTF_TEXT_CHARS - 2 * OTF_BUFFER) {
		if (typeof(tf_MD5StrThresholdLen) != "undefined" && tf_MD5StrThresholdLen != null && tf_MD5StrThresholdLen != 0)
			if (Math.abs(tf_MD5StrThresholdLen - tf_CurrentMD5StrLen) <= OTF_BUFFER)
				tf_CurrentMD5StrLen = tf_MD5StrThresholdLen;
	}

	if (tf_CurrentMD5StrLen >= 2 * OTF_BUFFER)
		str = str.substring(0, tf_CurrentMD5StrLen - OTF_BUFFER);

	return str;
}

function getAllSmallAplha(str) {
	str = str.toLowerCase();
	var result = "";
	str.replace(/[a-z]+/g, function(u) {
		result += u;
		return u;
	});
	return result;
}

function rhex(num)
{
	str = "";
	for (j = 0; j <= 3; j++)
		str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
			   hex_chr.charAt((num >> (j * 8)) & 0x0F);
	return str;
}

function str2blks_MD5(str)
{
	nblk = ((str.length + 8) >> 6) + 1;
	blks = new Array(nblk * 16);
	for (i = 0; i < nblk * 16; i++) blks[i] = 0;
	for (i = 0; i < str.length; i++)
		blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
	blks[i >> 2] |= 0x80 << ((i % 4) * 8);
	blks[nblk * 16 - 2] = str.length * 8;
	return blks;
}

function add(x, y)
{
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}

function rol(num, cnt)
{
	return (num << cnt) | (num >>> (32 - cnt));
}

function cmn(q, a, b, x, s, t)
{
	return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
	return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
	return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
	return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
	return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function tf_calcMD5(str)
{
	str = applyFilterForMD5(str);
	x = str2blks_MD5(str);
	a = 1732584193;
	b = -271733879;
	c = -1732584194;
	d = 271733878;

	for (i = 0; i < x.length; i += 16)
	{
		olda = a;
		oldb = b;
		oldc = c;
		oldd = d;

		a = ff(a, b, c, d, x[i + 0], 7, -680876936);
		d = ff(d, a, b, c, x[i + 1], 12, -389564586);
		c = ff(c, d, a, b, x[i + 2], 17, 606105819);
		b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
		a = ff(a, b, c, d, x[i + 4], 7, -176418897);
		d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
		c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
		b = ff(b, c, d, a, x[i + 7], 22, -45705983);
		a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
		d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
		c = ff(c, d, a, b, x[i + 10], 17, -42063);
		b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
		a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
		d = ff(d, a, b, c, x[i + 13], 12, -40341101);
		c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
		b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

		a = gg(a, b, c, d, x[i + 1], 5, -165796510);
		d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
		c = gg(c, d, a, b, x[i + 11], 14, 643717713);
		b = gg(b, c, d, a, x[i + 0], 20, -373897302);
		a = gg(a, b, c, d, x[i + 5], 5, -701558691);
		d = gg(d, a, b, c, x[i + 10], 9, 38016083);
		c = gg(c, d, a, b, x[i + 15], 14, -660478335);
		b = gg(b, c, d, a, x[i + 4], 20, -405537848);
		a = gg(a, b, c, d, x[i + 9], 5, 568446438);
		d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
		c = gg(c, d, a, b, x[i + 3], 14, -187363961);
		b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
		a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
		d = gg(d, a, b, c, x[i + 2], 9, -51403784);
		c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
		b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

		a = hh(a, b, c, d, x[i + 5], 4, -378558);
		d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
		c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
		b = hh(b, c, d, a, x[i + 14], 23, -35309556);
		a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
		d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
		c = hh(c, d, a, b, x[i + 7], 16, -155497632);
		b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
		a = hh(a, b, c, d, x[i + 13], 4, 681279174);
		d = hh(d, a, b, c, x[i + 0], 11, -358537222);
		c = hh(c, d, a, b, x[i + 3], 16, -722521979);
		b = hh(b, c, d, a, x[i + 6], 23, 76029189);
		a = hh(a, b, c, d, x[i + 9], 4, -640364487);
		d = hh(d, a, b, c, x[i + 12], 11, -421815835);
		c = hh(c, d, a, b, x[i + 15], 16, 530742520);
		b = hh(b, c, d, a, x[i + 2], 23, -995338651);

		a = ii(a, b, c, d, x[i + 0], 6, -198630844);
		d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
		c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
		b = ii(b, c, d, a, x[i + 5], 21, -57434055);
		a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
		d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
		c = ii(c, d, a, b, x[i + 10], 15, -1051523);
		b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
		a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
		d = ii(d, a, b, c, x[i + 15], 10, -30611744);
		c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
		b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
		a = ii(a, b, c, d, x[i + 4], 6, -145523070);
		d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
		c = ii(c, d, a, b, x[i + 2], 15, 718787259);
		b = ii(b, c, d, a, x[i + 9], 21, -343485551);

		a = add(a, olda);
		b = add(b, oldb);
		c = add(c, oldc);
		d = add(d, oldd);
	}
	return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

function tf_logmessage_new(message) {
	if (etDebug == 1) {
		var tf_log_div = document.getElementById('tf_log_div');
		if (tf_log_div == null) {
			tf_log_div = document.createElement('div');
			tf_log_div.id = "tf_log_div";
			tf_log_div.style.display = 'none';
			document.body.appendChild(tf_log_div);
		}

		tf_log_div.innerHTML += "*  " + message + "\r\n";
	}
}

function tf_logmessage(message) {
	if (etDebug == 1) {
		var img = new Image();
		img.src = keywordsServer + "/log?mode=log&logid=" + etLogID + "&message=" + message;
	}
}

function tf_catalog_trackfn(clickURL, performClick) { //called by flash
	clickURL = unescape(clickURL);
	var doTrack = "0";
	if (clickURL.indexOf("!") == 0) {
		clickURL = clickURL.substr(1);
		doTrack = "1";
	}

	var i = parseInt(tf_flash_adNum) - 1;
	var trackURL = tf_linkObjects[i].getAd().trackURL + trackPrms + doTrack;
	tf_submitClick(tf_flash_adNum, clickURL, trackURL, performClick);
}

function tf_catalog_linkclick(adv, index) {
	var clickURL = adv.clickURL;
	var doTrack = "0";
	if (clickURL.indexOf("!") == 0) {
		clickURL = clickURL.substr(1);
		doTrack = "1";
	}

	var trackURL = adv.trackURL + trackPrms + doTrack;
	tf_submitClick(index, clickURL, trackURL, true, true);
}

function getCurrentTime() {
	var d = new Date();
	return d.getTime();
}

function tf_isThirdPartyAd() {
	var adv;
	if (arguments.length == 1) {
		adv = arguments[0];
	} else {
		if (typeof tf_flash_adNum == 'undefined' || tf_flash_adNum == null)
			return false;

		var i = parseInt(tf_flash_adNum) - 1;
		adv = tf_linkObjects[i].getAd();
	}

	if(adv == null) {
		return false;
	}

	if (adv.isThirdParty) {
		return true;
	}

	return false;
}

function tf_splitToWords(str) {
	var nonSeperators = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-.";
	var words = [];
	var j = 0;
	var wasLastCharSpace = true;
	for (var i = 0; i < str.length; i++) {
		if (nonSeperators.indexOf(str.charAt(i)) == -1) {
			if (!wasLastCharSpace) {
				j++;
			}
			wasLastCharSpace = true;
			continue;
		}
		wasLastCharSpace = false;
		if (typeof(words[j]) == "undefined") {
			words[j] = "";
		}
		words[j] += str.charAt(i);
	}
	return words;
}
function tf_setThirdPartyURLs(adv) {
	if (!tf_isThirdPartyAd(adv)) {
		return;
	}

	if (adv.clickURL == null || adv.clickURL.length == 0) {
		return;
	}

	var now = new Date();
	var requestId = ((now.getTime() % 2147483648) + Math.random());
	adv.clickURL = adv.clickURL.replace(/\$RND\$/gi, requestId);
	if (adv.impressionTrackUrl && adv.impressionTrackUrl.length > 0) {
		adv.impressionTrackUrl = adv.impressionTrackUrl.replace(/\$RND\$/gi, requestId);
	}
}

function tf_isAdPresent(adv) {
	if(adv == null) {
		return false;
	}
	return adv.adFetechParams.length == 0; 
}

function tf_removeLink(linkId, adNum) {
	var node = document.getElementById(linkId);
	if(node) {
		var textNode = document.createTextNode(node.innerHTML);
		node = node.parentNode;
		var parent = node.parentNode;
		parent.insertBefore(textNode, node);
		parent.removeChild(node);
		if (adNum == tf_flash_adNum) {
			tf_hideAd();
		}
	}
}
function tf_removeFromArray(arr, value) {
	for(var i=0;i<arr.length;i++){
		if(arr[i] == value){
			arr.splice(i,1);
		}
	}
	return arr;
}

function tf_addToArray(arr, value) {
	if(value == 0) {
		return arr;
	}
	var flag = true;
	for(var i=0;i<arr.length;i++){
		if(arr[i] == value){
			flag = false;
		}
	}
	if(flag) {
		arr[arr.length] = value;
	}
	return arr;
}

function et_getExpansionServer() {
	var result = parseInt(Math.random()*10000,10)%2;
	if(result == 1) {
		return keywordsServer + "/Expansion";
	} else {
		return keywordsServerOnFly + "/Expansion";
	}
}