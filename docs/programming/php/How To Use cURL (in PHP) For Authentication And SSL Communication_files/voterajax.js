
var xmlHttp
var currentobj
var voteobj
var votedisptype

//Javascript Function for JavaScript to communicate with Server-side scripts
function AJAXrequest(scriptURL) {
	xmlHttp=GetXmlHttpObject()
xmlHttp=GetXmlHttpObject()
if (xmlHttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  } 
	xmlHttp.onreadystatechange=voteChanged;
	xmlHttp.open("GET",scriptURL,true);
	xmlHttp.send(null);
}

function GetXmlHttpObject()
{
var xmlHttp=null;
try
  {
  // Firefox, Opera 8.0+, Safari
  xmlHttp=new XMLHttpRequest();
  }
catch (e)
  {
  // Internet Explorer
  try
    {
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
  catch (e)
    {
    xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
return xmlHttp;
}

function voteChanged() 
{ 
if (xmlHttp.readyState==4)
{ 
	var votedisp = document.getElementById('voteid' + currentobj);
	var votenodisp = document.getElementById('votes' + currentobj);
	var voteno = xmlHttp.responseText;

switch (votedisptype) {
case 'bar':
votenodisp.style.width = voteno;
votedisp.innerHTML = '';
break;
case 'ticker':
votenodisp.innerHTML = voteno;
if(voteno > 1) {
    votenodisp.title = voteno + " votes"; 
} else {
    votenodisp.title = voteno + " vote";
}
votedisp.innerHTML = '<span class="votedtickertext" title="Voted">Voted</span>';
break;
}

//return xmlHttp.responseText;
//document.write(xmlHttp.responseText);
}
}

function vote_link_com(votelinkID,voteID,userID,baseURL) {
	//var votelinkdisp = document.getElementById(votelinkID);
	//based on <a style="cursor:default;" href="javascript:vote('<?php the_ID(); ?>','voterbox_<?php the_ID(); ?>', '<?php echo $user_ID; ?>', '<?php bloginfo('url') ?>');">Vote!</a>
	//votelinkdisp.innerHTML="<a style=\"cursor:default;\" href=\"javascript:vote('"+voteID+"','voterbox_"+voteID+"', '"+userID+"', '"+baseURL+"');\">Vote!</a>";
}

function vote_ticker(articleID,voteID,userID,baseURL) {
	votedisptype = 'ticker';
	currentobj = voteID;
	var scripturl = baseURL+"/voteinterface.php?type=vote&tid=total&uid="+userID+"&pid="+articleID+"&auth="+Math.random();
	AJAXrequest(scripturl);
}

function sink_ticker(articleID,voteID,userID,baseURL) {
	votedisptype = 'ticker';
	currentobj = voteID;
	var scripturl = baseURL+"/voteinterface.php?type=sink&tid=total&uid="+userID+"&pid="+articleID+"&auth="+Math.random();
	AJAXrequest(scripturl);
}

function vote(articleID,voteID,userID,baseURL) {
	votedisptype = 'bar';
	currentobj = voteID;
	var scripturl = baseURL+"/voteinterface.php?type=vote&uid="+userID+"&pid="+articleID+"&auth="+Math.random();
	AJAXrequest(scripturl);
}

function sink(articleID,voteID,userID,baseURL) {
	votedisptype = 'bar';
	currentobj = voteID;
	var scripturl = baseURL+"/voteinterface.php?type=sink&uid="+userID+"&pid="+articleID+"&auth="+Math.random();
	AJAXrequest(scripturl);
}
