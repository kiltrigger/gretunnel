   document.write("<!-- Web Form Generator 2.0 --><center><form method=\"post\" action=\"http://clients.profollow.com/scripts/addlead.pl\"><input type=\"hidden\" name=\"meta_web_form_id\" value=\"618210012\"><input type=\"hidden\" name=\"meta_split_id\" value=\"\"><input type=\"hidden\" name=\"unit\" value=\"cprogramming\"><input type=\"hidden\" name=\"redirect\" value=\"http://www.cprogramming.com/ml_thankyou.html\" id=\"redirect_e88c54d3eaef43288be8330b9aacf2d0\"><input type=\"hidden\" name=\"meta_redirect_onlist\" value=\"\"><input type=\"hidden\" name=\"meta_adtracking\" value=\"inline\"><input type=\"hidden\" name=\"meta_message\" value=\"1\"><input type=\"hidden\" name=\"meta_required\" value=\"from\"><input type=\"hidden\" name=\"meta_forward_vars\" value=\"0\"><table><tr><td colspan=2><center><div><div>Join our mailing list to keep up with the latest news and updates about Cprogramming.com!</div>&nbsp;</div></center></td></tr><tr><td>Name:</td><td><input type=\"text\" name=\"name\" value=\"\" size=\"20\"></td></tr><tr><td>Email:</td><td><input type=\"text\" name=\"from\" value=\"\" size=\"20\"></td></tr>    <tr><td colspan=2><center></center></td></tr><tr><td align=\"center\" colspan=\"2\"><input type=\"submit\" name=\"submit\" value=\"Submit\"></td></tr></table></form></center>");

      function setCookie(name, value, expires, path, domain, secure) {
     var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
     document.cookie = curCookie;
   }

   function getCookie(name) {
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


      unique_track = new Image();
      unique_track.src = "http://forms.profollow.com/form/displays.htm?id=bIwcTIwMDIxM";

