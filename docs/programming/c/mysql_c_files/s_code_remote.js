/* SiteCatalyst code version: H.14. Copyright Omniture, Inc. More info available at http://www.omniture.com */
/* Author: Neil Evans */
/************************** CONFIG SECTION ****************************************/
/* Specify the Report Suite(s) */
var s_account="sunmysqldev";
var sun_dynamicAccountSelection=true;
var sun_dynamicAccountList="sunglobal,sunmysql=mysql.com;sunglobal,sunmysql=mysql.de;sunglobal,sunmysql=mysql.fr;sunmysqldev=.";
/* Specify the Site ID */
var s_siteid="mysql:";
/* PageName Settings */
if (typeof s_pageType=='undefined') {
	var s_pageName=window.location.host+window.location.pathname;
	s_pageName=s_pageName.replace(/www.mysql.com/,"");
	s_pageName=s_pageName.replace(/www.mysql./,"");
	s_pageName=s_pageName.replace(/.mysql.com/,":");
	s_pageName=s_pageName.replace(/mysql.com/,"");
}
/* Remote Omniture JS call  */
var sun_ssl=(window.location.protocol.toLowerCase().indexOf("https")!=-1);
	if(sun_ssl == true) { var fullURL = "https://www.sun.com/share/metrics/metrics_group1.js?ver=20090610"; }
		else { var fullURL= "http://www-cdn.sun.com/share/metrics/metrics_group1.js?ver=20090610"; }
document.write("<sc" + "ript type=\"text/javascript\" src=\""+fullURL+"\"></sc" + "ript>");
/************************** END CONFIG SECTION **************************************/
/* Split dev.mysql.com Path  */
var mysql_host=location.hostname;
if (mysql_host=='dev.mysql.com') {
	var mysql_url=window.location.pathname.toLowerCase();
	var mysql_split=mysql_url.split("/");
}
/* Reset PageName Settings  */
function s_resetstandard(s) {
/* dev.mysql.com/doc ---> prop31  */
if (mysql_host=='dev.mysql.com') {
	if (mysql_split[1]=="doc") {
		s_prop31=s_pageName;
		s_pageName=s_channel+" (site section)";
		}
	}
/* lists.mysql.com ---> prop31  */
	if (mysql_host=='lists.mysql.com') {
		s_prop31=s_pageName;
		s_pageName=s_channel+" (site section)";
	}
}
