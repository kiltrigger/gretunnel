var Feeder = {
  feed_icons: $A([]),
  id: 0,
  timeout: null,

  init: function()
  {
    Feeder.feed_icons = document.getElementsByClassName("dwfwte");
    $A(Feeder.feed_icons).each(function(element)
    {
      var index = $A(Feeder.feed_icons).indexOf(element);
      $(element).id = "dw_feed_gg_icon_"+index;
      $(element).onmouseover = function() {
      if (($("dw_feeds_avail_"+Feeder.id).visible()) && (Feeder.id != Feeder.getIdNumber("dw_feed_gg_icon_", $(this).id))) Feeder.hidePopup();
      clearTimeout(Feeder.timeout);
      Feeder.id = Feeder.getIdNumber("dw_feed_gg_icon_", $(this).id);
      Feeder.timeout = setTimeout(function() {new Feeder.showPopup()},200);
      }

      $(element).onmouseout = function() {
        clearTimeout(Feeder.timeout);
        Feeder.id = Feeder.getIdNumber("dw_feed_gg_icon_", $(this).id);
        Feeder.timeout = setTimeout(function(){new Feeder.hidePopup()},200);
      }
      Feeder.addFeedButtons(index);
    });
  },
  addFeedButtons: function(index)
   {
     Feeder.id = index;
     var feeds = $(document.createElement('div'));

     if ( $('dw_feed_gg_icon_'+Feeder.id).readAttribute('gg') != null) {
       Feeder.addGoogle(feeds, $("dw_feed_gg_icon_"+Feeder.id).getAttribute('gg'));
     }
     if ( $('dw_feed_gg_icon_'+Feeder.id).readAttribute('my') != null) {
       Feeder.addYahoo(feeds, $("dw_feed_gg_icon_"+Feeder.id).getAttribute('my'));
     }
     if ( $('dw_feed_gg_icon_'+Feeder.id).readAttribute('nv') != null) {
       Feeder.addNetvibes(feeds, $("dw_feed_gg_icon_"+Feeder.id).getAttribute('nv'));
     }

     $(feeds).id = "dw_feeds_avail_"+index;
     $(feeds).hide();
     $(feeds).onmouseover = function() {
       clearTimeout(Feeder.timeout);
       Feeder.id = Feeder.getIdNumber("dw_feeds_avail_", $(this).id);
       Feeder.timeout = setTimeout(function() {new Feeder.showPopup()},200);
     }

     $(feeds).onmouseout = function() {
       clearTimeout(Feeder.timeout);
       Feeder.id = Feeder.getIdNumber("dw_feeds_avail_", $(this).id);
       Feeder.timeout = setTimeout(function(){new Feeder.hidePopup()},200);
     }

     document.getElementsByTagName('body')[0].appendChild(feeds);

   },

    showPopup: function()
  {
    $("dw_feed_gg_icon_"+Feeder.id).addClassName("dwfwtc");
    $("dw_feed_gg_icon_"+Feeder.id).removeClassName("dwfwte");
    $("dw_feeds_avail_"+Feeder.id).setStyle({position:'absolute'});
    if(!$("dw_feeds_avail_"+Feeder.id).visible()) {
    $("dw_feeds_avail_"+Feeder.id).setStyle({top: Position.cumulativeOffset($("dw_feed_gg_icon_"+Feeder.id))[1]+'px'});
    $("dw_feeds_avail_"+Feeder.id).setStyle({left: Position.cumulativeOffset($("dw_feed_gg_icon_"+Feeder.id))[0]-Element.getDimensions($("dw_feeds_avail_"+Feeder.id)).width+'px'});
    $("dw_feeds_avail_"+Feeder.id).show();
    }
  },

  hidePopup: function()
  {
    $("dw_feed_gg_icon_"+Feeder.id).addClassName("dwfwte");
    $("dw_feed_gg_icon_"+Feeder.id).removeClassName("dwfwtc");
    $("dw_feeds_avail_"+Feeder.id).hide();
  },

  getIdNumber: function(pre, value)
  {
    return value.sub(pre, '');
  },

  addGoogle: function(parent, link)
  {
     var gizmo = $(document.createElement('div'));
     $(gizmo).addClassName("dwgooglegadget");
     $(parent).appendChild(gizmo);     

     var a = $(document.createElement('a'));
     $(a).setAttribute('href', link);

     var img = $(document.createElement('img'));
     $(img).setAttribute('src', 'http://www.ibm.com/developerworks/i/c.gif');
     $(img).setStyle({width: '104px'});
     $(img).setStyle({height: '17px'});
     $(img).setStyle({border: '0px'});
     $(a).appendChild(img);
     $(gizmo).appendChild(a);
 
  },

  addYahoo: function(parent, link)
  {
     var gizmo = $(document.createElement('div'));
     $(gizmo).addClassName("dwmyyahoo");
     $(parent).appendChild(gizmo);

     var a = $(document.createElement('a'));
     $(a).setAttribute('href', link);

     var img = $(document.createElement('img'));
     $(img).setAttribute('src', 'http://www.ibm.com/developerworks/i/c.gif');
     $(img).setStyle({width: '91px'});
     $(img).setStyle({height: '17px'});
     $(img).setStyle({border: '0px'});
     $(a).appendChild(img);
     $(gizmo).appendChild(a);
     
  },

  addNetvibes: function(parent, link)
  {
     var gizmo = $(document.createElement('div'));
     $(gizmo).addClassName("dwnetvibes");
     $(parent).appendChild(gizmo);

     var a = $(document.createElement('a'));
     $(a).setAttribute('href', link);

     var img = $(document.createElement('img'));
     $(img).setAttribute('src', 'http://www.ibm.com/developerworks/i/c.gif');
     $(img).setStyle({width: '91px'});
     $(img).setStyle({height: '17px'});
     $(img).setStyle({border: '0px'});
     $(a).appendChild(img);
     $(gizmo).appendChild(a);
     
  }

  
};

Event.observe(window, 'load', function(event) {
  Feeder.init();
});


  

