/*WP Ajax Edit Script
--Created by Ronald Huereca
--Created on: 03/28/2007
--Last modified on: 09/17/2009
--Relies on jQuery, wp-ajax-response, thickbox
	Copyright 2007,2008  Ronald Huereca  (email : ron alfy [a t ] g m ail DOT com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/
jQuery(document).ready(function() {
var $j = jQuery;
$j.ajaxeditcomments = {
	init: function() { $j.extend($j.ajaxeditcomments.vars, { timers: {}, timerObjs: {}}); initialize_links(); },
	delink: function(obj) { $j(".aec-undo-span").html('');_delink($j(obj));},
	move: function(obj) { $j(".aec-undo-span").html('');return _thickbox($j(obj));},
	edit: function(obj) { $j(".aec-undo-span").html('');return _thickbox($j(obj));},
	request_deletion: function(obj) { $j(".aec-undo-span").html('');return _thickbox($j(obj));},
	blacklist_comment: function(obj) { $j(".aec-undo-span").html(''); return _thickbox($j(obj));},
	approve: function(obj) { $j(".aec-undo-span").html('');_approve($j(obj));},
	spam: function(obj) { 
		$j(".aec-undo-span").html('');
		_spam($j(obj));},
	moderate: function(obj) { $j(".aec-undo-span").html('');_moderate($j(obj));},
	delete_comment: function(obj) { $j(".aec-undo-span").html('');_delete_comment($j(obj));},
	remove_comment: function(id) { 
		var li = $j("#" + "comment-" + id);
		if (li.is("li") || li.is("div") ) {
			li.addClass("ajax-delete");
			li.slideUp(1000, function() { li.remove(); });
		}
	},
	retrieve_element: function(id) {
		return $j("#" + id);
	},
	update_comment: function(id, content) {
  	$j("#" + id).html(content);
	},
	update_author: function(id, author, url) {
		delinkid = id.match(/\d+$/)[0];
		if ( url == '' || 'http://' == url ) {
			$j(".aec-delink-" + delinkid + ",#delink-comment-" + delinkid).hide();
			if (author == '') { $j("#" + id).html(wpajaxeditcomments.AEC_Anon); return; }
			$j("#" + id).html(author);
		} else if (author == '') {
			$j("#" + id).html(wpajaxeditcomments.AEC_Anon);
		} else {
			$j("#" + id).html("<a href='" + url + "'>" + author + "</a>");
			$j(".aec-delink-" + delinkid + ",#delink-comment-" + delinkid).show();
		}
	},
	update_date_or_time: function(id, date_or_time) {
		$j("#" + id).html(date_or_time);
	},
	remove_element: function(id) {
		var li = $j(id);
		if (li.is("li") || li.is("div") ) {
			li.addClass("ajax-unapprove");
			li.slideUp(1000, function() { li.remove(); });
		}
	},
	undo_message: function(comment_id,message) {
		$j("#comment-undo-" + comment_id).html(message);
		$j(".aec-undo-link").bind("click", function() { undo($j(".aec-undo-link")); return false; });
	},
	dropdown: function(obj) {
		obj = $j(obj);
		var url = wpAjax.unserialize(obj.attr('href'));
		add_dropdown(url.cid);
		return false;
	},
	vars: {}
};
	var vars = $j.ajaxeditcomments.vars;
	//Adds the drop down box
	function add_dropdown(cid) {
		//Move links relative to the document
		$j("body").append("<span class='aec-dropdown-container' id='aec-dropdown-container-" + cid + "'>" + $j("#aec-dropdown-" + cid).html() + "</span>");
		//Set up position for drop down menu
		if ($j.support.noCloneEvent == false) { height = 40; } else { height = $j("#aec-dropdownarrow-" + cid).height();    } //IE
		$j("#aec-dropdown-container-" + cid).css("top",parseInt($j("#aec-dropdownarrow-" + cid).offset().top) + height);		
		$j("#aec-dropdown-container-" + cid).css("left",$j("#aec-dropdownlink-" + cid).offset().left);		
		$j("#aec-dropdown-container-" + cid).css("width",$j("#aec-dropdownarrow-" + cid).width());
		
		$j("#aec-dropdownlink-" + cid).html(wpajaxeditcomments.AEC_LessOptions);
		$j("#aec-dropdownlink-" + cid).removeAttr("onclick");
		if ($j.support.noCloneEvent != false) {
			//Show the drop down menu
			$j("#aec-dropdownlink-" + cid).removeClass("aec-dropdownlink");
			$j("#aec-dropdownlink-" + cid).addClass("aec-dropdownlink-less");
		}
		
		$j("#aec-dropdownlink-" + cid).bind("click", function() { return false; });
		$j("#aec-dropdown-container-" + cid).slideDown("", function() { 
			if ($j.support.noCloneEvent == false) { //for IE 7
				//Show the drop down menu
				$j("#aec-dropdownlink-" + cid).removeClass("aec-dropdownlink");
				$j("#aec-dropdownlink-" + cid).addClass("aec-dropdownlink-less");
			}
			//Assign events
			//Provide focus to the dropdown box
			$j("#aec-dropdown-container-" + cid).focus();
			
			$j("#aec-dropdownlink-" + cid).unbind("mouseup"); //mouseup is for IE
			$j("#aec-dropdownlink-" + cid).bind("mouseup", function() { 
				remove_dropdown(cid);
				return false;
			});
			
			//Blur doesn't work in Safari
			$j("#aec-dropdownlink-" + cid).bind("blur", function() { 
				if ($j.support.noCloneEvent != false) { remove_dropdown(cid); } //skip for IE 6,7
				return false;
			});
			$j("#aec-dropdown-container-" + cid).bind("blur", function() { 
				remove_dropdown(cid);
				return false;
			});
			$j("#aec-dropdown-container-" + cid).bind("mouseleave", function() { 
				remove_dropdown(cid);
				return false;
			});
			
			//Provide focus to the dropdown box
			$j("#aec-dropdown-container-" + cid).focus();	
			
			
			
		});
		
		
	}
	//Removes the drop down box
	function remove_dropdown(cid) {
		if ($j(".aec-dropdown-container").length == 0) { return false; }
		$j("#aec-dropdownlink-" + cid).text(wpajaxeditcomments.AEC_MoreOptions);
			//Remove the wrapper container and place links in original spot
			$j("#aec-dropdown-" + cid).html($j("#aec-dropdown-container-" + cid).html());
			$j("#aec-dropdown-container-" + cid).slideUp("", function() { 
					$j("#aec-dropdown-container-" + cid).remove();
					$j("#aec-dropdownlink-" + cid).removeClass("aec-dropdownlink-less");
					$j("#aec-dropdownlink-" + cid).addClass("aec-dropdownlink");
				
					//Assign events
					$j("#aec-dropdownlink-" + cid).unbind("blur");
					$j("#aec-dropdown-container-" + cid).unbind("blur");
					$j("#aec-dropdown-container-" + cid).unbind("mouseleave");
					$j("#aec-dropdownlink-" + cid).unbind("mouseup");
					$j("#aec-dropdownlink-" + cid).bind("mouseup", function() { 																									
						add_dropdown(cid);
						return false;
					});																																																					
			});	
	}
	function undo(obj) {
		var data = pre_process($j(obj));
		$j(".undo" + data.cid).parent().html('')
		data.success = function(r) {
    	var res = wpAjax.parseAjaxResponse(r, data.response,data.element);
      $j.each( res.responses, function() {
				switch(this.what) {
					case "content":
						comment = this.supplemental.content;
						name = this.supplemental.comment_author;
						url = this.supplemental.comment_author_url;
						date = this.supplemental.comment_date;
						time = this.supplemental.comment_time;
						jQuery.ajaxeditcomments.update_comment("edit-comment" + data.cid,comment);
						jQuery.ajaxeditcomments.update_author("edit-author" + data.cid,name, url);
						jQuery.ajaxeditcomments.update_date_or_time("aecdate" + data.cid,date);
						comment_approved = this.supplemental.comment_approved;
						old_comment_approved = this.supplemental.undo_comment_approved;
						$j("#edit-comment-admin-links" + data.cid).html(this.supplemental.comment_links);
						//for the admin panel
						$j("#comment-" + data.cid + " .comment-count").html(this.supplemental.approve_count);
						$j(".spam-count").html(this.supplemental.spam_count);
						$j(".pending-count").html(this.supplemental.moderation_count);
						break;
					case "delink":
						jQuery.ajaxeditcomments.update_author("edit-author" + data.cid, $j("#edit-author" + data.cid).html(),this.supplemental.comment_author_url);
						$j("#delink-" + data.cid).show();
					break;
					case "unapprove":
						$j("#edit-comment-admin-links" + data.cid).html(this.supplemental.comment_links);
						$j("#comment-" + data.cid + " .comment-count").html(this.supplemental.approve_count);
						$j(".spam-count").html(this.supplemental.spam_count);
						$j(".pending-count").html(this.supplemental.moderation_count);
					break;
					case "approve":
						$j("#edit-comment-admin-links" + data.cid).html(this.supplemental.comment_links);
						//See if the comment was moderated or spam
						$j("#comment-" + data.cid + " .comment-count").html(this.supplemental.approve_count);
						$j(".spam-count").html(this.supplemental.spam_count);
						$j(".pending-count").html(this.supplemental.moderation_count);
					break;
					case "spam":
						$j("#edit-comment-admin-links" + data.cid).html(this.supplemental.comment_links);
						//See if the comment was moderated or spam
						$j("#comment-" + data.cid + " .comment-count").html(this.supplemental.approve_count);
						$j(".spam-count").html(this.supplemental.spam_count);
						$j(".pending-count").html(this.supplemental.moderation_count);
					break;
					case "delete":
						$j("#edit-comment-admin-links" + data.cid).html(this.supplemental.comment_links);
						$j("#comment-" + data.cid + " .comment-count").html(this.supplemental.approve_count);
						$j(".spam-count").html(this.supplemental.spam_count);
						$j(".pending-count").html(this.supplemental.moderation_count);
					break;
				}
			});
    }
    $j.ajax(data);
	}
	
	//Initializes the edit links
	function initialize_links() {
  	//Leave the style in for Safari
  	$j(".edit-comment-admin-links").css("display", "block");
    $j(".edit-comment-user-link").css("display", "block");
		$j(".hidden").hide();
    /* For Crappy IE */
    $j(".edit-comment-admin-links").show();
    $j(".edit-comment-user-link").show();
    if (wpajaxeditcomments.AEC_CanScroll == "1") {
      var location = "" + window.location;
      var pattern = /(#[^-]*\-[^&]*)/;
      if (pattern.test(location)) {
        location = $j("" + window.location.hash);
        var targetOffset = location.offset().top;
        $j('html,body').animate({scrollTop: targetOffset}, 1000);
      }
    }
   get_time_left();
  }
	//Finds an area (if applicable) and displays the time left to comment
  function get_time_left() {
  	$j("." + 'ajax-edit-time-left').each(function() { 
    	data = pre_process($j(this).prev());
    	data.data = $j.extend({ action: 'gettimeleft', cid: data.cid,pid:data.pid, _ajax_nonce: data.nonce },'');
    	data.action = 'gettimeleft';
    	data.success = function(r) {
      	var res = wpAjax.parseAjaxResponse(r, data.response,data.element);
        jQuery.each( res.responses, function() {
        	if (this.what == "error" || this.what == "success") {
          	return;
          }
        	if (this.what == "minutes") {
          	minutes = parseInt(this.data);
          }
          if (this.what == "seconds") {
          	seconds = parseInt(this.data);
          }
        });
        cid = data.cid;
        element = $j("#ajax-edit-time-left-" + data.cid);
        data.timer = $j.extend({minutes: minutes, seconds: seconds, cid: data.cid, element: element},'');
        vars.timerObjs[data.cid] = data;
        vars.timers[data.cid] = setTimeout(function() {get_time_left_timer(data.timer) }, 1000);
      }
			$j.ajax(data);
    	return;
    })
  }
	//Updates the UI with the correct time left to edit
  //Parameters - timer (obj with timer data)
  function get_time_left_timer(timer) {
  	clearTimeout(vars.timers[timer.cid]);
    seconds = timer.seconds - 1;
    minutes = timer.minutes;
    element = timer.element;
    //Check to see if the time has run out
		if (minutes <=0 && seconds <= 0) { 
			$j("#edit" + timer.cid).unbind();
      element.remove();
      $j("#edit-comment-user-link-" + timer.cid).remove();
      jQuery.fn.colorbox.close(); //for iframe
      clearTimeout(vars.timers[timer.cid]);
			return;
		} 
		if (seconds < 0) { minutes -= 1; seconds = 59; }
    //Create timer text
		var text = "";
		if (minutes >= 1) {
			if (minutes >= 2) { text = minutes + " " + wpajaxeditcomments.AEC_Minutes; } else { text = minutes + " " + wpajaxeditcomments.AEC_Minute; }
			if (seconds > 0) { text += " " + wpajaxeditcomments.AEC_And + " "; }
		}
		if (seconds > 0) {
			if (seconds >= 2) { text += seconds + " " + wpajaxeditcomments.AEC_Seconds; } else { text += seconds + " " + wpajaxeditcomments.AEC_Second; }
		}
    //Output the timer to the user
    try {
    	//This try statement is for the iFrame
      //Iframe code from:  http://xkr.us/articles/dom/iframe-document/
      if (document.getElementById('cboxIframe') != undefined) {
      	var oIframe = document.getElementById('cboxIframe');
        var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
        if (oDoc.document) oDoc = oDoc.document;
        $j("#timer" + timer.cid, oDoc).html("&nbsp;(" + text + ")");
      }
    } catch(err) { }
    $j("#ajax-edit-time-left-" + timer.cid).html("&nbsp;(" + text + ")");
    timer.minutes = minutes;
    timer.seconds = seconds;
    vars.timerObjs[timer.cid] = timer;
    vars.timers[timer.cid] = setTimeout(function() { get_time_left_timer(timer) }, 1000);
  }
  //Returns a data object for ajax calls
  function pre_process(element) {
  	var s = {};
    s.element = element.attr("id");
    s.response = 'ajax-response';
    var url = wpAjax.unserialize(element.attr('href'));
		s.aecurl = url;
    s.nonce = url._wpnonce;
    s.cid = url.c;
    s.pid = url.p;
    s.action = url.action;
    s.type = "POST";
    s.url = wpajaxeditcomments.AEC_PluginUrl + "/php/AjaxEditComments.php";
    s.data = $j.extend(s.data, { action: s.action, cid: s.cid,pid:s.pid, _ajax_nonce: s.nonce });
    s.global = false;
    s.timeout = 30000;
    return s;
  }
	function _delink(obj) {
		var data = pre_process($j(obj));
		remove_dropdown(data.cid);
		data.success = function(r) {
    	var res = wpAjax.parseAjaxResponse(r, data.response,data.element);
			$j.each( res.responses, function() {
					if (this.supplemental.errors != '0') { alert(this.supplemental.errors); return; }
					//For in the admin panel
					if (this.supplemental.comment_author_url == '') {
						$j("#the-comment-list #comment-" + data.cid + " A:first").html("");
						//For on a post
						$j(".aec-delink-" + data.cid + ",#delink-" + data.cid).hide();
						$j("#edit-author" + data.cid).html($j("#edit-author" + data.cid + " A").html()) //for on a post
						
						//undo message
						jQuery.ajaxeditcomments.undo_message(data.cid, this.supplemental.undo);
					} 
					return;
			});
    };
		$j.ajax(data);
	}
	function _thickbox(obj) {
		obj = $j(obj);
		//try to detect mobile browsers
		try {
			uagent = navigator.userAgent.toLowerCase();
			if (uagent.search('iphone') > -1) { return true; }
			if (uagent.search('ipod') > -1) { return true; }
			if (uagent.search('webkit') > -1) { 
				if (uagent.search('series60') > -1) { 
					if (uagent.search('symbian') > -1) { return true; } 
				}
			}
			if (uagent.search('android') > -1) { return true; }
			if (uagent.search('windows ce') > -1) { return true; }
			if (uagent.search('blackberry') > -1) { return true; }
			if (uagent.search('palm') > -1) { return true; }
		} catch(err) { }
		var data = pre_process(obj);
		remove_dropdown(data.cid);
		width = data.aecurl.width;
		height = data.aecurl.height;
		$j("#" + obj.attr("id")).colorbox({iframe:true, width:width, height:height});
		$j("#" + obj.attr("id")).trigger("click.colorbox");
		return false;
	}
	function _approve(obj) {
		var data = pre_process($j(obj)); 
		remove_dropdown(data.cid);
		data.success = function(r) {
			var res = wpAjax.parseAjaxResponse(r, data.response,data.element);
			$j.each( res.responses, function() {
					if (this.supplemental.errors != '0') { alert(this.supplemental.errors); return; }
					$j("#edit-comment-admin-links" + data.cid).html(this.supplemental.comment_links);					
					$j("#comment-" + data.cid + " .comment-count").html(this.supplemental.approve_count);
					$j(".spam-count").html(this.supplemental.spam_count);
					$j(".pending-count").html(this.supplemental.moderation_count);	
					//undo message
					jQuery.ajaxeditcomments.undo_message(data.cid, this.supplemental.undo);
			});
    }
    $j.ajax(data);
	}
	function _spam(obj) {
		var data = pre_process($j(obj));
		remove_dropdown(data.cid);
		data.success = function(r) {
			var res = wpAjax.parseAjaxResponse(r, data.response,data.element);
			$j.each( res.responses, function() { 
				if (this.supplemental.errors != '0') { alert(this.supplemental.errors); $j(".aec-spam-" + data.cid + ",#spam-comment-" + data.cid).hide(); return; }
				//For in the admin panel
				$j("#edit-comment-admin-links" + data.cid).html(this.supplemental.comment_links);
				$j("#comment-" + data.cid + " .comment-count").html(this.supplemental.approve_count);
				$j(".spam-count").html(this.supplemental.spam_count);
				$j(".pending-count").html(this.supplemental.moderation_count);
				//undo message
				jQuery.ajaxeditcomments.undo_message(data.cid, this.supplemental.undo);
        return;
     	});		
    }
    $j.ajax(data);
	}
	function _moderate(obj) {
		var data = pre_process($j(obj));
		remove_dropdown(data.cid);
		data.success = function(r) {
    	var res = wpAjax.parseAjaxResponse(r, data.response,data.element);
			$j.each( res.responses, function() { 
				if (this.supplemental.errors != '0') { alert(this.supplemental.errors);$j(".aec-moderate-" + data.cid + ",#moderate-comment-" + data.cid).hide(); return; }
				$j("#edit-comment-admin-links" + data.cid).html(this.supplemental.comment_links);
				$j("#comment-" + data.cid + " .comment-count").html(this.supplemental.approve_count);
				$j(".spam-count").html(this.supplemental.spam_count);
				$j(".pending-count").html(this.supplemental.moderation_count);
				
      	//Yay, comment is unapproved - Show visual
				$j(".aec-approve-" + data.cid + ",#approve-" + data.cid).show();
								
				//undo message
				jQuery.ajaxeditcomments.undo_message(data.cid, this.supplemental.undo);
        return;
     	});			
    }
    $j.ajax(data);
	}
	function _delete_comment(obj) {
		var data = pre_process($j(obj));
		remove_dropdown(data.cid);
		data.success = function(r) {
			var res = wpAjax.parseAjaxResponse(r, data.response,data.element);
			$j.each( res.responses, function() { 
				if (this.supplemental.errors != '0') { alert(this.supplemental.errors); return; }
				$j(".aec-delete-" + data.cid).hide();
				$j("#delete-" + data.cid).hide();
				//for the admin panel
				$j("#comment-" + data.cid + " .comment-count").html(this.supplemental.approve_count);
				$j(".spam-count").html(this.supplemental.spam_count);
				$j(".pending-count").html(this.supplemental.moderation_count);
				$j("#edit-comment-admin-links" + data.cid).html('');
				
				//undo message
				jQuery.ajaxeditcomments.undo_message(data.cid, this.supplemental.undo);
        return;
     	});	
    }
    $j.ajax(data);
	}
	$j.ajaxeditcomments.init();
});
//For legacy purposes
var AjaxEditComments = function() {
	return {
			init : function() { 
      	jQuery.ajaxeditcomments.init();
      }
	};
}();