var hideCompFLOnCreate = false;

function submitOnce(form)
{
   submitOnce = blockSubmit;
   return true;
}

function blockSubmit(form)
{
   return false;
}

function unhideTopics()
{

   if (document.layers)
   { // NS4
      document.layers['hiddenTopics'].display = 'block';
   } else if (document.all)
   { // IE4+
      document.all('hiddenTopics').style.display = 'block';
   } else if (document.getElementById)
   { // NS6 and IE5+
      document.getElementById('hiddenTopics').style.display = 'block';
   }

   return false;
}

/**
 * 
 * imports another script file
 * 
 */
function jsImport(file)
{

   fileName = file;
   if (file.indexOf(".") >= 0)
   {
      fileNameParts = file.split(".");
      fileName = "/scripts/" + fileNameParts.join("/") + ".js";
   }

   document.write("<script type=\"text/javascript\" src=\"" + fileName
         + "\"></script>\n");
}

/**
 * removes children of a node recursively
 * 
 * @param node
 *           The DOM node whose children will be removed
 */
function removeChildren(node)
{
   var childCount = node.childNodes.length;
   for ( var i = 0; i < childCount; i++)
   {
      var child = node.childNodes[0];
      node.removeChild(child);
   }
}

/**
 * toggles a collapsible section
 */
function toggleSection(sectionName, timeoutDays)
{
   headerID = sectionName + "Header";
   bodyID = sectionName + "Body";
   header = document.getElementById(headerID);
   toggleElementVisibility(bodyID);
   if (isElementVisible(bodyID) == true)
      header.className = 'collapsibleSectionHeader collapsibleSectionExpanded';
   else
      header.className = 'collapsibleSectionHeader collapsibleSectionCollapsed';
   if (timeoutDays == null)
      timeoutDays = 1000;
   createCookie(sectionName + "Collapsed", isSectionCollapsed(sectionName),
         timeoutDays);
}

/**
 * @return true if the section matching sectionName is collapsed, otherwise
 *         false
 */
function isSectionCollapsed(sectionName)
{
   if (isElementVisible(sectionName + "Body"))
      return false;
   else
      return true;
}

/**
 * @return true if the element with the given name is currently visible
 * @param elementID -
 *           the 'id of the element in the web page
 */
function isElementVisible(elementID)
{
   var element = document.getElementById(elementID);
   if (element.style.visibility != 'hidden' && element.style.display != 'none')
   {
      return true;
   } 
   else
   {
      return false;
   }
}

/**
 * toggles the visibility of an element with the given name if showElement is
 * true
 * 
 * @param elementID -
 *           the 'id of the element in the web page
 * @param show -
 *           show the element if this value is true, otherwise hide the element
 * 
 */
function toggleElementVisibility(elementID, show)
{
   if (show == null)
   {
      show = !isElementVisible(elementID);
   }
   
   if(show == true)
   {
      showElement(elementID);
   }
   else
      hideElement(elementID);
}

/**
 * hides an element with the given ID
 * 
 * @param elementID -
 *           the 'id' of the element in the web page
 */
function hideElement(elementID)
{
   var element = document.getElementById(elementID);
   if (element != null)
   {
      element.style.display = 'none';
      element.style.visibility = 'hidden';
   }
}

/**
 * shows an element with the given ID
 * 
 * @param elementID -
 *           the 'id' of the element in the web page
 * @param style -
 *           the 'style' of the element, uses 'block' if not specified
 */
function showElement(elementID, style)
{
   if(style == null)
      style = 'block';
   
   var element = document.getElementById(elementID);
   
   if(element != null)
   {
      element.style.display = style;
      element.style.visibility = 'visible';
   }
}

/**
 * trims whitespace from the string
 * 
 * @param s -
 *           the string to trim
 * @return - the trimmed string
 */
function trim(s)
{
   while (s.substring(0, 1) == ' ')
   {
      s = s.substring(1, s.length);
   }
   while (s.substring(s.length - 1, s.length) == ' ')
   {
      s = s.substring(0, s.length - 1);
   }
   return s;
}

/** ************************************************** */
/** *********** Date Functions *********************** */
/** ************************************************** */

/**
 * @param daysAgo
 *           number of days to subtract from date
 * @return new javascript date object representing the current date, minus
 *         daysAgo
 */
function dateAdd(daysAhead)
{
   var date = new Date();
   var days = date.getDate();
   date.setDate(days + daysAhead);
   return date;
}

/**
 * adds a text node to an existing element, given the elementID
 * 
 * @param elementID
 *           the elementID of the existing DOM node
 * @param text
 *           the text to add to the node
 */
function setText(elementID, text)
{

   var element = document.getElementById(elementID);
   var oldText = element.childNodes[0];
   var newText = document.createTextNode(text);

   if (oldText == null)
      element.appendElement(newText);
   else
      element.replaceChild(newText, oldText);
}

/** *********************************************** */
/** ******** Form Functions *********************** */
/** *********************************************** */
function clearSearchBox(searchBox, defaultValue)
{
   if (searchBox.value == defaultValue)
   {
      searchBox.value = '';
   }
}

function clearSearchBoxRecolor(searchBox, defaultValue, recolor)
{
   if (searchBox.value == defaultValue)
   {
      searchBox.value = '';
   }

   searchBox.style.color = recolor;
}

function clearTextInputClass(inputID)
{
   var input = document.getElementById(inputID);
   if (input != null)
   {
      input.className = 'text';
   }
}

function getFormElementValue(element)
{

   var value;

   if (element == null)
      alert(elementID + " is null");

   /* select box */
   if (element.type == "select-one")
   {
      var options = element.options;
      value = options[options.selectedIndex];
   }

   /* text or hidden */
   if (element.type == "hidden" || element.type == "text"
         || element.type == "textarea")
      value = element.value;

}

/**
 * initializes a form element based on the id and value.
 */
function setFormElementValue(elementID, value)
{
   var element = document.getElementById(elementID);

   if (element == null)
      alert(elementID + " is null");

   /* select box */
   if (element.type == "select-one")
   {
      var options = element.options;
      for ( var i = 0; i < options.length; i++)
      {
         if (options[i].value == value)
            options[i].selected = true;
      }
   }

   /* text or hidden */
   if (element.type == "hidden" || element.type == "text"
         || element.type == "textarea")
      element.value = value;

   /* checkbox */
   if (element.type == "checkbox")
   {
      if (value == true)
         element.checked = true;
      else
         element.checked = false;
   }

   /* radio box */
   if (element.type == "radio")
   {
      if (value = element.value)
         element.checked = true;
      else
         element.checked = false;
   }

}

/**
 * changes the text of a button jsp include
 */
function changeButtonText(newText)
{
   var newNode = document.createTextNode(newText);
   var button = document.getElementById("saveSearchFormSubmit")
   var buttonDiv = button.childNodes[0];
   var oldNode;
   for ( var i = 0; i < buttonDiv.childNodes.length; i++)
   {
      if (buttonDiv.childNodes[i].data != null)
         oldNode = buttonDiv.childNodes[i];
   }
   buttonDiv.replaceChild(newNode, oldNode);
}

/** ************************************************ */
/** ********** Cookie Functions ******************** */
/** ************************************************ */

/* creates a cookie with the given name and value, set to expire after days */
function createCookie(name, value, days)
{
   if (days)
   {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
   } else
      var expires = "";
   document.cookie = name + "=" + value + expires + "; path=/";
}

/* reads the cookie with the given name */
function readCookie(name)
{
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for ( var i = 0; i < ca.length; i++)
   {
      var c = ca[i];
      while (c.charAt(0) == ' ')
         c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0)
         return c.substring(nameEQ.length, c.length);
   }
   return null;
}

/* deletes the cookie with the given name */
function eraseCookie(name)
{
   createCookie(name, "", -1);
}

function isValueInArray(array, value)
{
   for ( var index = 0; index < array.length; index++)
      if (array[index] === value)
         return true;

   return false;
}

function changeFormSubmitLocToGoogle(inputID, formID, radioID)
{
   var input = document.getElementById(inputID);
   var radio = document.getElementById(radioID);
   var form = document.getElementById(formID);
   if (radio.checked)
   {
      var val = 'http://www.google.com/search';
      input.value = 'site:www.experts-exchange.com ' + input.value;
      form.action = val;
   }
}

function toggleSearchType(searchForm) 
{
   if (searchForm.gSearch.value == 1)
   {
      searchForm.gSearch.value = 0;
      document.getElementById("srchToggleLabel").innerHTML = "EE";
      searchForm.omnitureSearchType.value = "EE Search";
   }
   else
   {
      searchForm.gSearch.value = 1;
      document.getElementById("srchToggleLabel").innerHTML = "Google";
      searchForm.omnitureSearchType.value = "Google Search";
   }
}


function addCookieToIFrame(frameID, cookie, value)
{
   document.getElementById(frameID).src = "/setFrameCookie.jsp?id=" + frameID
         + "&cookie=" + cookie + "&value=" + value;
}

function getElementPositionById(id)
{
   return getElementPosition(document.getElementById(id));
}

function getElementPosition(element)
{
   var left = 0;
   var top = 0;
   if (element.offsetParent)
   {
      left = element.offsetLeft;
      top = element.offsetTop;
      while (element = element.offsetParent)
      {
         left += element.offsetLeft;
         top += element.offsetTop;
      }
   }

   return [ left, top ];
}

function scrollToElementById(id)
{
   return scrollToElement(document.getElementById(id));
}

function scrollToElement(element)
{
   if (element)
   {
   var position = getElementPosition(element);
   window.scrollTo(position[0], position[1]);
}
}

function closeSection(id)
{
   var element = document.getElementById(id);
   element.style.display = 'none';
}

function addCookie(name, value, maxAge)
{
   if (maxAge === undefined)
      maxAge = 60 * 60 * 24 * 365;
   
   var expires = new Date();
   expires.setTime(expires.getTime() + maxAge * 1000);

   document.cookie = name + "=" + value + ";path=/" + ";expires="
         + expires.toGMTString() + ";domain=.experts-exchange.com";
}

function showInfoBox(e, id, positioning)
{
   var source = e ? (e.target ? e.target : e.srcElement) : null;
   var posSource = source ? getElementPosition(source) : null;
   var posX = posSource ? posSource[0] : 0;
   var posY = posSource ? posSource[1] : 0;
   var element = document.getElementById(id);
   var style = element.style;

   style.display = "inline";

   if (!positioning || !positioning.skipX)
   {
      if (positioning && positioning.right)
      {
         style.left = "";
         style.right = (document.body.clientWidth - posX) + "px";
      } else if (!positioning || !positioning.centerX)
      {
         style.right = "";
         style.left = posX + "px";
      }
   }

   if (!positioning || !positioning.skipY)
   {
      if (positioning && positioning.bottom)
         style.top = (posY - element.clientHeight) + "px";
      else if (!positioning || !positioning.centerY)
         style.top = posY + "px";
   }

   if (positioning && positioning.centerX && !positioning.skipX)
   {
      style.right = "";
      style.left = ((positioning.centerXBody ? document.body.clientWidth / 2
            : posX) - parseInt(element.clientWidth) / 2)
            + "px";
   }

   if (positioning && positioning.centerY && !positioning.skipY)
      style.top = ((positioning.centerYBody ? document.body.clientHeight / 2
            : posY) - parseInt(element.clientHeight) / 2)
            + "px";
}

function showConfirmBox(e, id, url, positioning)
{
   showInfoBox(e, id, positioning);
   document.getElementById("confirmLink" + id).href = url;
}

function showAnswerRatingBox(e, answerID, positioning)
{
   showInfoBox(e, "answerRatingBox", positioning);
   document.answerRatingBoxForm.aid.value = answerID;
}

function showAnswerRatingBoxBeta(e, answerID, positioning)
{
   showInfoBox(e, "answerRatingBox" + answerID, positioning);
}

function hideInfoBox(id)
{
   document.getElementById(id).style.display = "none";
}

function callAsync(url, id)
{
   new AsyncInclude(url, id);
}

var currentJSMenuTab = new Array();

function showJSMenuTab(prefix, callback, id)
{
   if (id == currentJSMenuTab[prefix])
      return;

   if (currentJSMenuTab[prefix]
         && document.getElementById(prefix + "MenuItem"
               + currentJSMenuTab[prefix]))
      document.getElementById(prefix + "MenuItem" + currentJSMenuTab[prefix]).className = "menuItem"
            + currentJSMenuTab[prefix];

   currentJSMenuTab[prefix] = id;

   if (document.getElementById(prefix + "MenuItem" + currentJSMenuTab[prefix]))
      document.getElementById(prefix + "MenuItem" + currentJSMenuTab[prefix]).className = "menuItem"
            + currentJSMenuTab[prefix] + " currentMenuItem";

   if (callback)
      callback(id);
}

function showTPSTab(id)
{
   document.getElementById("tpsContent1").style.display = id == 1 ? "block"
         : "none";
   document.getElementById("tpsContent2").style.display = id == 2 ? "block"
         : "none";
   document.getElementById("tpsContent3").style.display = id == 3 ? "block"
         : "none";
}

function showRzaTab(id)
{
   document.getElementById("rzaContent1").style.display = id == 1 ? "block"
         : "none";
   document.getElementById("rzaContent2").style.display = id == 2 ? "block"
         : "none";
   document.getElementById("rzaContent3").style.display = id == 3 ? "block"
         : "none";
}

function popupAndFocusWindow(url, windowName, features)
{
   var popup = window.open(url, windowName, features);
   popup.focus();
   return false;
}

function popupCSCHelpSized(width, height)
{
   return popupAndFocusWindow('/cscPopup.jsp', 'cscPopup', 'width=' + width
         + ',height=' + height + ',resizable=yes');
}

function popupCSCHelpXPSkin()
{
   return popupCSCHelpSized(615, 520);
}

function popupCSCHelpExpertSkin()
{
   return popupCSCHelpSized(740, 630);
}

function popupCSCHelp()
{
   return popupCSCHelpXPSkin();
}

function showLoginPopup(obj)
{
   var curleft = 0, curtop = 0;

   do
   {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
   } while (obj = obj.offsetParent);
   
   curtop += 26;
   curleft -= 130;

   var style = document.getElementById('loginPopup').style;

   style.left = curleft + "px";
   style.top = curtop + "px";
   style.display = "block";
   style.visibility = "visible";
}

function closeLoginPopup()
{
   hideElement('loginPopup');
}

function showMyAccountPopup(obj, isExpertSkin, myAccountHider)
{
   var curleft = 0, curtop = 0;

   do
   {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
   } while (obj = obj.offsetParent);
   
   if (isExpertSkin)
   {
      curtop += 15;
      curleft -= 139;
   }
   else
   {
      curtop += 26;
      curleft -= 130;
   }

   var style = document.getElementById('myAccountPopup').style;

   style.left = curleft + "px";
   style.top = curtop + "px";
   style.display = "block";
   style.visibility = "visible";
}

function closeMyAccountPopup(myAccountHider)
{
   hideElement('myAccountPopup');
}

function topOptionHider(hideableId, hideFunction)
{
   this.hideableId = hideableId;
   this.hideMe = 0;
   this.hideTimeout = null;
   this.hideFunction = hideFunction;
   
   this.delayHide = function()
   {
      this.hideMe = 1;
      this.hideTimeout = setTimeout(this.hideableId + '.hide()', 250);
   };
   
   this.dontHide = function()
   {
      this.hideMe = 0;
      if (this.hideTimeout != null)
      {
         clearTimeout(this.hideTimeout);
      }
   };
   
   this.hide = function()
   {
      if (this.hideMe > 0)
      {
         eval(this.hideFunction);
      }
   };
   
}

function slidingMenuObject(viewportId, sliderId, sliderName, slideDistance,
      movePace, zoneId, asyncPath, scrollerID, prefix, numColumns, nqw)
{
   this.sliderName = sliderName;
   this.menuLevels = new Array();
   this.menuLevels[0] = zoneId;
   this.asyncPath = asyncPath;
   this.currentMenu = -1;
   this.viewport = document.getElementById(viewportId);
   this.slideLeftDistance = parseInt(slideDistance);
   this.slideRightDistance = slideDistance * -1;
   this.sliderObject = new sliderObject(sliderName, sliderId, slideDistance,
         movePace, scrollerID);
   this.hideMe = 0;
   this.anchorObj = null;
   this.hideTimeout = null;
   this.prefix = prefix ? prefix : "";
   this.leftColumnIndex = 0;
   this.nqw = nqw > 0 ? nqw : 0;
   this.numColumns = 1;
   if (numColumns)
      this.numColumns = numColumns;

   this.show = function(obj, doOffset)
   {
      var curleft = 0, curtop = obj.offsetHeight;

      if (doOffset)
      {
         do
         {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
         } while (obj = obj.offsetParent);
      }

      var style = this.viewport.style;

      var rightEdge = curleft + this.slideLeftDistance;

      var wDiff = 0;
      if (window.innerWidth)
      {
         wDiff = rightEdge - (window.innerWidth - 15);
      } else if (document.body.clientWidth)
      {
         wDiff = rightEdge - document.body.clientWidth;
      }

      if (wDiff > 0)
      {
         curleft = curleft - wDiff;
      }

      style.left = curleft + "px";
      style.top = curtop + "px";
      style.display = "block";
      style.visibility = "visible";

      this.viewport.style.display = 'block';
      this.viewport.style.visibility = 'visible';
   };

   this.delayHide = function(anchor)
   {
      this.hideMe = 1;
      this.anchorObj = anchor;
      this.hideTimeout = setTimeout(this.sliderName + '.hide()', 250);
   };

   this.dontHide = function()
   {
      this.hideMe = 0;
      if (this.hideTimeout != null)
      {
         clearTimeout(this.hideTimeout);
      }
   };

   this.hide = function()
   {
      if (this.hideMe > 0)
      {
         this.viewport.style.display = 'none';
         this.viewport.style.visibility = 'hidden';
         this.anchorObj.className = "";
      }
   };

   this.slideLeft = function(zoneID, parentChain, scrollToTop, selectedZones)
   {      
      if (this.sliderObject.intervalID)
         return;

      var depth = parentChain.split(',').length;

      this.currentMenu = depth - 1;

      if ((this.currentMenu + 1) < this.menuLevels.length)
      {
         if (zoneID != this.menuLevels[this.currentMenu + 1])
         {
            this.removeSubMenus();
            if (selectedZones != null)
            {
               this.createMenuDivWithCheckbox(zoneID, parentChain,
                     selectedZones);
            } else
            {
               this.createMenuDiv(zoneID, parentChain);
            }
         }
      } else
      {
         if (selectedZones != null)
         {
            this.createMenuDivWithCheckbox(zoneID, parentChain, selectedZones);
         } else
         {
            this.createMenuDiv(zoneID, parentChain);
         }
      }

      if ((depth - this.leftColumnIndex) == this.numColumns)
      {                                                                   
         this.sliderObject.slideLeft(scrollToTop);
         this.leftColumnIndex++;         
      }
      sliderId = this.currentMenu;      
      
      if (this.nqw > 0)
         showPrevious(this.leftColumnIndex);
      
      this.currentMenu++;
   };     
           
   this.removeSubMenus = function()
   {
      while (this.menuLevels.length > (this.currentMenu + 1))
      {
         var oldMenu = document.getElementById(this.prefix + 'slider_'
               + (this.menuLevels.length - 1));
         this.sliderObject.mover.removeChild(oldMenu);
         var removedZone = this.menuLevels.pop();
      }
   };

   this.createMenuDiv = function(currentZone, parentalChain)
   {
      var newWidth = parseInt(this.sliderObject.mover.style.width ? this.sliderObject.mover.style.width
            : 0)
            + this.sliderObject.slideDistance;
      this.sliderObject.mover.style.width = newWidth + 'px';

      var sliderDiv = document.createElement('div');
      sliderDiv.className = 'slideable';
      sliderDiv.id = this.prefix + 'slider_' + (this.currentMenu + 1);
      this.sliderObject.mover.appendChild(sliderDiv);
      this.menuLevels[this.currentMenu + 1] = currentZone;      
      AsyncInclude(this.asyncPath + this.sliderName + '&zoneRelationID='
            + this.menuLevels[this.currentMenu + 1] + '&pChain='
            + parentalChain, sliderDiv.getAttribute('id'));      
   };

   this.createMenuDivWithCheckbox = function(currentZone, parentalChain,
         selectedArray)
   {
      var newWidth = parseInt(this.sliderObject.mover.style.width ? this.sliderObject.mover.style.width
            : 0)
            + this.sliderObject.slideDistance;
      this.sliderObject.mover.style.width = newWidth + 'px';

      var sliderDiv = document.createElement('div');
      sliderDiv.className = 'slideable';
      sliderDiv.id = this.prefix + 'slider_' + (this.currentMenu + 1);
      this.sliderObject.mover.appendChild(sliderDiv);
      this.menuLevels[this.currentMenu + 1] = currentZone;

      var params = this.asyncPath + this.sliderName + '&zoneRelationID='
            + this.menuLevels[this.currentMenu + 1] + '&pChain='
            + parentalChain;
      for ( var i = 0; i < 3; i++)
      {
         if (selectedArray[i] != null)
            params += '&selected' + i + '=' + selectedArray[i].substring(12);
      }
      
      AsyncInclude(params, sliderDiv.getAttribute('id'));      
   };

   this.slideRight = function()
   {
      if (this.sliderObject.intervalID)
         return;

      if (this.leftColumnIndex > 0)
      {                                                                             
         this.sliderObject.slideRight();
         this.leftColumnIndex--;
         
         if(nqw > 0 && nqw != 50)
            this.removePrevious(this.leftColumnIndex);
      }                  
   };
   
   this.removePrevious = function(leftColumnIndex)
   {      
      var oneDeep = 1;
      
      if(leftColumnIndex < oneDeep)
         document.getElementById("previous").className = "hidePrevious";      
   };
   
   this.destroy = function()
   {
      if (this.anchorObj != null)
      {
         this.anchorObj.className = "";
      }
      while (this.sliderObject.mover.hasChildNodes())
      {
         this.sliderObject.mover.removeChild(this.sliderObject.mover.firstChild);
      }
   };

   this.createMenuDiv(zoneId, '');   
   this.currentMenu = 0;
}

function sliderObject(sliderName, moverID, slideDistance, movePace, scrollerID)
{
   this.name = sliderName;
   this.slideDistance = parseInt(slideDistance);
   this.moveDistance;
   this.movePace = movePace;
   this.slideProgress = 0;
   this.intervalID;
   this.mover = document.getElementById(moverID);
   this.mover.style.left = '0px';
   this.mover.style.width = '0px';

   if (scrollerID)
   {
      this.scroller = document.getElementById(scrollerID);
   }

   this.moveHoriz = function()
   {
      var lefty = parseInt(this.mover.style.left ? this.mover.style.left : 0);
      this.mover.style.left = lefty + this.moveDistance + 'px';
      this.slideProgress += this.moveDistance;

      if (this.scroller && this.scrollPace)
      {
         this.scroller.scrollTop -= this.scrollPace;
      }

      if (this.slideProgress == this.currentSlideDistance)
      {
         clearInterval(this.intervalID);
         this.intervalID = null;
      }
   };

   this.slideRight = function()
   {
      this.moveDistance = this.movePace;
      this.slideHoriz(this.slideDistance);
   };

   this.slideLeft = function()
   {
      if (this.scroller)
      {
         this.scrollDistance = this.scroller.scrollTop;
         this.scrollPace = this.scrollDistance * this.movePace
               / this.slideDistance;
      }

      this.moveDistance = this.movePace * -1;
      this.slideHoriz(this.slideDistance * -1);
   };

   this.slideHoriz = function(slideDistance)
   {
      this.slideProgress = 0;
      this.currentSlideDistance = slideDistance;
      sliderfunction = this.name + '.sliderObject.moveHoriz()';
      this.intervalID = setInterval(sliderfunction, 5);
   };
}

function Size()
{
   var width = 0;
   var height = 0;
}
function getViewportSize()
{
   var size = new Size();

   size.width = document.body.clientWidth;

   if (typeof window.innerHeight != "undefined")
   {
      size.height = window.innerHeight;
   } else if (document.documentElement
         && (typeof document.documentElement.offsetHeight != "undefined")
         && (document.documentElement.offsetHeight != 0))
   {
      size.height = document.documentElement.offsetHeight;
   } else if (document.body
         && (typeof document.body.offsetHeight != "undefined"))
   {
      size.height = document.body.offsetHeight;
   }

   return size;
}

function minimize(id, minimize, uncookied)
{
   if (!uncookied)
   {
      var frame = document.getElementById("minimizeFrame");

      if (frame == null)
      {
         frame = document.createElement("IFRAME");
         frame.src = "about:blank";
         frame.id = "minimizeFrame";
         frame.width = 0;
         frame.height = 0;
         frame.style.display = "none";
         document.getElementsByTagName("BODY")[0].appendChild(frame);
      }

      frame.src = "/minimize.jsp?id=" + id + "&minimize=" + minimize;
   }

   var section = document.getElementById(id);
   var header = section.childNodes[0];

   if (minimize)
   {
      addClass(section, "ms");
      addClass(header, "mh");
   } else
   {
      removeClass(section, "ms");
      removeClass(header, "mh");
   }
   resizeFooter((navigator.appName).indexOf("Microsoft") != -1);
}

// minimizes a second section specified by id2, added for expertsZone.jsp
function minimize2(id, minimize, uncookied, id2, callback, noResize)
{
   if (!uncookied)
   {
      var frame = document.getElementById("minimizeFrame");

      if (frame == null)
      {
         frame = document.createElement("IFRAME");
         frame.src = "about:blank";
         frame.id = "minimizeFrame";
         frame.width = 0;
         frame.height = 0;
         frame.style.display = "none";
         document.getElementsByTagName("BODY")[0].appendChild(frame);
      }

      frame.src = "/minimize.jsp?id=" + id + "&minimize=" + minimize;
   }

   var section = document.getElementById(id);
   var section2 = document.getElementById(id2);
   var header = section.childNodes[0];
   if (section2 != null)
      var header2 = section2.childNodes[0];

   if (minimize)
   {
      addClass(section, "ms");
      addClass(header, "mh");

      // added for expertsZone.jsp to minimize the my account box
      if (section2 != null)
      {
         addClass(section2, "ms");
         addClass(header2, "mh");

         section2.onmouseover = function()
         {
            displayOnMouseOver(id2);
            return true;
         };
         section2.onmouseout = function()
         {
            hideOnMouseOut(id2);
            return true;
         };
      }
   } else
   {
      removeClass(section, "ms");
      removeClass(header, "mh");

      // added for expertsZone.jsp to minimize the my account box
      if (section2 != null)
      {
         removeClass(section2, "ms");
         removeClass(header2, "mh");

         section2.onmouseover = "";
         section2.onmouseout = "";
         adjustBodyHeight();
      }
   }
   if (callback != null)
      callback();

   if (noResize == null)
      resizeFooter((navigator.appName).indexOf("Microsoft") != -1);
}

/** ***** hover section code ******** */

function displayOnMouseOver(id)
{
   var section = document.getElementById(id);
   var bc = section.getElementsByTagName("div")[0];
   removeClass(section, "ms");
   addClass(bc, "showOnMouseOver");
   bc.style.height = "116px";
}

function hideOnMouseOut(id)
{
   var section = document.getElementById(id);
   var bc = section.getElementsByTagName("div")[0];
   addClass(section, "ms");
   removeClass(bc, "showOnMouseOver");
   bc.style.height = "auto";
}

function hoverSection(id)
{
   var section = document.getElementById(id);
   var header = section.childNodes[0];

   addClass(section, "ms");
   addClass(header, "mh");

   section.onmouseover = function()
   {
      displayOnMouseOver(id);
      return true;
   };
   section.onmouseout = function()
   {
      hideOnMouseOut(id);
      return true;
   };
}

function checkMinimize(checkID, changeID)
{
   var element = document.getElementById(checkID);
   if (hasClass(element, 'ms'))
   {
      hoverSection(changeID);
   }
}
/** ***** end hover section code ******** */

function hasClass(element, className)
{
   var classNames = (element.className).split(' ');

   for ( var i = 0; i < classNames.length; i++)
   {
      if (classNames[i] == className)
      {
         return true;
      }
   }
   return false;
}

function addClass(element, className)
{
   removeClass(element, className);
   if (element.className)
      element.className += ' ' + className;
   else
      element.className = className
}

function removeClass(element, className)
{
   var newClassName = '';
   if (element && element.className)
   {
      var a = element.className.split(' ');
      for ( var i = 0; i < a.length; i++)
      {
         if (a[i] != className)
         {
            if (i > 0)
               newClassName += ' ';
            newClassName += a[i];
         }
      }
      element.className = newClassName;
   }
}

function selectElementById(id)
{
   var element = document.getElementById(id);

   if (element.tagName == "TEXTAREA"
         || (element.tagName == "INPUT" && element.type == "text"))
   {
      element.select();
      return;
   } else if (window.getSelection)
   {
      var selection = window.getSelection();
      var range = document.createRange();

      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
   } else if (document.selection)
   {
      var range = document.body.createTextRange();

      document.selection.empty();
      range.moveToElementText(element);
      range.select();
   } else
   {
      alert("This feature is not supported by your browser.");
   }
}

function addBetaFeedbackButtonPremium(url)
{
   if (!document.getElementById("pageMainHeader"))
      return;

   var button = document.createElement("A");
   button.href = url;
   button.target = "_blank";
   button.className = "betaFeedback";
   document.getElementById("pageMainHeader").appendChild(button);
}

function addBetaFeedbackButtonExpert(url)
{
   if (!document.getElementById("pageMainHeader"))
      return;

   var div = document.createElement("DIV");
   div.className = "betaFeedback";

   div.appendChild(document.createTextNode("("));

   var button = document.createElement("A");
   button.href = url;
   button.target = "_blank";
   button.appendChild(document.createTextNode("Beta Feedback"));
   div.appendChild(button);

   div.appendChild(document.createTextNode(")"));

   document.getElementById("pageMainHeader").appendChild(div);
}

function addArticlesIntroductionButtonPremium(url)
{
   if (!document.getElementById("pageMainHeader"))
      return;

   var button = document.createElement("A");
   button.href = url;
   button.target = "_blank";
   button.className = "articlesIntroButton";
   document.getElementById("pageMainHeader").appendChild(button);
}

function addSubscribeButtonPremium(url, taID)
{
   if (!document.getElementById("pageMainHeader"))
      return;

   var button = document.createElement("A");
   button.href = url;
   
   if (taID)
      button.href += "?taID=" + taID;
   
   button.className = "subscribeButton";
   document.getElementById("pageMainHeader").appendChild(button);
}

function addArticlesIntroductionButtonExpert(url)
{
   if (!document.getElementById("pageMainHeader"))
      return;

   var div = document.createElement("DIV");
   div.className = "articlesIntroButton";

   div.appendChild(document.createTextNode("("));

   var button = document.createElement("A");
   button.href = url;
   button.target = "_blank";
   button.appendChild(document.createTextNode("Articles Introduction"));
   div.appendChild(button);

   div.appendChild(document.createTextNode(")"));

   document.getElementById("pageMainHeader").appendChild(div);
}

function addSubscribeButtonExpert(url, taID)
{
   if (!document.getElementById("pageMainHeader"))
      return;

   var div = document.createElement("DIV");
   div.className = "subscribeButton";

   div.appendChild(document.createTextNode("("));

   var button = document.createElement("A");
   button.href = url;
   
   if (taID)
      button.href += "?taID=" + taID;
   
   button.appendChild(document.createTextNode("Subscribe"));
   div.appendChild(button);

   div.appendChild(document.createTextNode(")"));

   document.getElementById("pageMainHeader").appendChild(div);
}

function resizeFooter(isIE)
{
   var spacer = document.getElementById('bodyFooterSpacer');
   var windowHeight;
   var bodyHeight;
   var spacerHeight;

   if (isIE)
      windowHeight = document.documentElement.clientHeight;
   else
      windowHeight = window.innerHeight;

   bodyHeight = document.getElementById("outerWrap").scrollHeight;

   spacerHeight = windowHeight - (bodyHeight - spacer.offsetHeight);

   if (spacerHeight > 0)
      spacer.style.height = spacerHeight + 'px';
   else
      spacer.style.height = 0;
}

/** ***** asyncInclude.js code ******** */
function AsyncInclude(url, elementID, callBackFunction, changeCache, browser)
{
   // Ready States
   var UNINITIALIZED = 0;
   var OPEN = 1;
   var SENT = 2;
   var RECEIVING = 3;
   var LOADED = 4;
   
   if (url.indexOf('?') > 0)
   {
      url += '&';
   }
   else
   {
      url += '?';
   }
   
   url += 'ASYNCTIME=' + new Date().getTime();

   var xmlHttpRequest = null;

   this.getXMLHttpRequest = function()
   {
      var request = null;
      try
      {
         request = new XMLHttpRequest();
      } catch (e)
      {
         try
         {
            request = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e)
         {
            request = new ActiveXObject("Microsoft.XMLHTTP");
         }
      }

      return request;
   }

   function changeFunc()
   {
      return function()
      {
         if (xmlHttpRequest.readyState == LOADED)
         {
            var element = elementID ? document.getElementById(elementID) : null;

            if (element)
            {
               var element = document.getElementById(elementID);
               if (element.tagName == 'TEXTAREA')
                  element.value = xmlHttpRequest.responseText;
               else
                  element.innerHTML = xmlHttpRequest.responseText;

               // copy <script> tags into head, so that they will be executed
               var head = document.getElementsByTagName('head')[0];
               var responseScripts = element.getElementsByTagName('script');
               for ( var index = 0; index < responseScripts.length; index++)
               {
                  var responseScript = responseScripts[index];

                  var script = document.createElement('script');
                  script.type = 'text/javascript';
                  script.defer = true;
                  if (responseScript.src)
                     script.src = responseScript.src;
                  if (responseScript.text)
                     script.text = responseScript.text;

                  head.appendChild(script);
               }
            }

            // call callBackFunction, if applicable
            if (callBackFunction)
            {
               callBackFunction.apply(callBackFunction, arguments);
            }
         }
      }
   }

   this.onReadyStateChange = changeFunc();

   xmlHttpRequest = this.getXMLHttpRequest();
   if (xmlHttpRequest == null)
   {
      document.write('Your browser does not support AJAX!');
      return;
   }

   if ((!changeCache && typeof (browser) == "undefined")
         || (typeof (changeCache) == "undefined" && typeof (browser) == "undefined")
         || (browser != "IE7" && browser != "IE"))
   {
      xmlHttpRequest.onreadystatechange = this.onReadyStateChange;
      xmlHttpRequest.open("GET", url, true);
      xmlHttpRequest.send(null);
   } else
   // for IE7
   {
      xmlHttpRequest.onreadystatechange = this.onReadyStateChange;
      xmlHttpRequest.open("GET", url, false);
      xmlHttpRequest.send(null);
      var date = xmlHttpRequest.getResponseHeader("Date");
      if (date == null || !date)
      {
         var cached = xmlHttpRequest;
         xmlHttpRequest = (typeof (XMLHttpRequest) != "undefined") ? new XMLHttpRequest()
               : new ActiveXObject("Msxml2.XMLHTTP");
         var ifModifiedSince = cached.getResponseHeader("Last-Modified");
         ifModifiedSince = (ifModifiedSince) ? ifModifiedSince : new Date(0); // January
                                                                              // 1,
                                                                              // 1970
         xmlHttpRequest.onreadystatechange = this.onReadyStateChange;
         xmlHttpRequest.open("GET", url, false);
         xmlHttpRequest.setRequestHeader("If-Modified-Since", ifModifiedSince);
         xmlHttpRequest.send("");
         if (xmlHttpRequest.status == 304)
         {
            xmlHttpRequest = cached;
         }
      }
   }
}

function AsyncPost(url, elementID, parameters, callBackFunction)
{
   // Ready States
   var UNINITIALIZED = 0;
   var OPEN = 1;
   var SENT = 2;
   var RECEIVING = 3;
   var LOADED = 4;

   var xmlHttpRequest = null;

   this.getXMLHttpRequest = function()
   {
      var request = null;
      try
      {
         request = new XMLHttpRequest();
      } catch (e)
      {
         try
         {
            request = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e)
         {
            request = new ActiveXObject("Microsoft.XMLHTTP");
         }
      }

      return request;
   }

   function changeFunc()
   {
      return function()
      {
         if (xmlHttpRequest.readyState == LOADED)
         {
            var element = elementID ? document.getElementById(elementID) : null;

            if (element)
            {
               if (element.tagName == 'TEXTAREA')
                  element.value = xmlHttpRequest.responseText;
               else
                  element.innerHTML = xmlHttpRequest.responseText;

               // copy <script> tags into head, so that they will be executed
               var head = document.getElementsByTagName('head')[0];
               var responseScripts = element.getElementsByTagName('script');
               for ( var index = 0; index < responseScripts.length; index++)
               {
                  var responseScript = responseScripts[index];

                  var script = document.createElement('script');
                  script.type = 'text/javascript';
                  script.defer = true;
                  if (responseScript.src)
                     script.src = responseScript.src;
                  if (responseScript.text)
                     script.text = responseScript.text;

                  head.appendChild(script);
               }
            }

            if (callBackFunction)
            {
               callBackFunction.apply(callBackFunction, arguments);
            }
         }
      }
   }

   this.onReadyStateChange = changeFunc();

   xmlHttpRequest = this.getXMLHttpRequest();
   if (xmlHttpRequest == null)
   {
      document.write('Your browser does not support AJAX!');
      return;
   }

   xmlHttpRequest.onreadystatechange = this.onReadyStateChange;
   xmlHttpRequest.open("POST", url, true);
   xmlHttpRequest.setRequestHeader('Content-Type',
         'application/x-www-form-urlencoded');
   xmlHttpRequest.send(parameters);
}

function submitForm(formObject, url, elementID, submitName, callBackFunction)
{
   var parameters = submitName + "=true";
   for ( var i = 0; i < formObject.length; i++)
   {
      var element = formObject.elements[i];
      var type = element.type;
      if (type == "select-multiple")
      {

         for ( var j = 0; j < element.length; j++)
         {
            if (element.options[j].selected)
            {
               var value = element.options[j].value;
               value = value.replace(/%/g, "%25");
               value = value.replace(/&/g, "%26");

               parameters += "&";
               parameters += element.name;
               parameters += "=";
               parameters += value;
            }
         }
      } else if (!(type == "radio" || type == "checkbox") || element.checked)
      {
         var value = element.value;
         if(value != null)
         {
            value = value.replace(/%/g, "%25");
            value = value.replace(/&/g, "%26");
            value = value.replace(/\+/g, "%2B");
   
            parameters += "&";
            parameters += element.name;
            parameters += "=";
            parameters += value;
         }
      }
   }
   AsyncPost(url, elementID, parameters, callBackFunction);
}

/** ***** end asyncInclude.js ********* */

/** ***** Popup Overlay code ********* */

function getScroll()
{
   if (document.documentElement)
      return [ document.documentElement.scrollLeft,
            document.documentElement.scrollTop ];
   else if (window.pageXOffset)
      return [ window.pageXOffset, window.pageYOffset ];

   return [ 0, 0 ];
}

var overlayScroll = [ 0, 0 ];

function showPopupOverlay(prefix, width, height, url, hackFooter, hackOverlay,
      browser, callBackFunction)
{
   var outerWrap = document.getElementById('outerWrap');
   var pageMain = document.getElementById('pageMain');

   var size = getViewportSize();

   var left = (size.width - width) / 2;
   if (left < 0)
      left = 0;
   var top = (size.height - height) / 2;
   if (top < 0)
      top = 0;

   var background = document.createElement('div');
   background.id = getBackgroundID(prefix);
   background.className = 'popupOverlayBackground';
   background.style.height = size.height + 'px';

   var overlay = document.createElement('div');
   overlay.id = getOverlayID(prefix);
   overlay.className = 'popupOverlay';
   overlay.style.width = width + 'px';
   overlay.style.height = height + 'px';

   if (hackFooter)
   {
      if (document.getElementById('compFL') != null)
         document.getElementById('compFL').style.visibility = 'hidden';
      else
         hideCompFLOnCreate = true;

      var selects = document.getElementsByTagName('select');

      for (i = 0; i < selects.length; i++)
         selects[i].style.visibility = 'hidden';
   }
   if (hackOverlay)
   {
      background.style.height = document.body.clientHeight + 'px';
      background.style.width = document.body.clientWidth + 'px';
   }

   overlay.style.left = left + 'px';
   overlay.style.top = top + 'px';

   var overlayBody = document.createElement('div');
   overlayBody.id = prefix + 'OverlayBody';

   overlay.appendChild(overlayBody);

   outerWrap.parentNode.insertBefore(overlay, outerWrap);
   outerWrap.parentNode.insertBefore(background, outerWrap);

   if (url)
      new AsyncInclude(url, overlayBody.id, callBackFunction, null, browser);

   if (document.layers)
   {
      window.captureEvents(Event.RESIZE);
      window.onresize = function()
      {
         popupOverlayOnResize(prefix, hackOverlay);
      };
   } else if (document.all)
   {
      window.onresize = function()
      {
         popupOverlayOnResize(prefix, hackOverlay);
      };
   } else if (window.addEventListener)
   {
      window.addEventListener("resize", function()
      {
         popupOverlayOnResize(prefix, hackOverlay);
      }, false);
   }
   ;

   overlayScroll = getScroll();
   window.scrollTo(0, 0);
}

function hidePopupOverlay(prefix, hackFooter)
{
   var background = document.getElementById(getBackgroundID(prefix));
   var overlay = document.getElementById(getOverlayID(prefix));

   overlay.parentNode.removeChild(overlay);
   background.parentNode.removeChild(background);

   if (hackFooter)
   {
      if (document.getElementById('compFL') != null)
         document.getElementById('compFL').style.visibility = 'visible';
      else
         hideCompFLOnCreate = false;

      var selects = document.getElementsByTagName('select');

      for (i = 0; i < selects.length; i++)
         selects[i].style.visibility = 'visible';
   }

   window.scrollTo(overlayScroll[0], overlayScroll[1]);
}

function popupOverlayOnResize(prefix, hackOverlay)
{
   var overlay = document.getElementById(getOverlayID(prefix));
   var background = document.getElementById(getBackgroundID(prefix));

   if (!overlay)
      return;

   var size = getViewportSize();

   var left = (size.width - overlay.clientWidth) / 2;
   if (left < 0)
      left = 0;
   var top = (size.height - overlay.clientHeight) / 2;
   if (top < 0)
      top = 0;

   background.style.height = size.height + 'px';
   if (hackOverlay)
   {
      background.style.height = document.body.clientHeight + 'px';
      background.style.width = document.body.clientWidth + 'px';
   }
   overlay.style.left = left + 'px';
   overlay.style.top = top + 'px';
}

function resizePopupOverlay(prefix, width, height, hackOverlay)
{
   var overlay = document.getElementById(getOverlayID(prefix));

   if (!overlay)
      return;

   overlay.style.width = width + 'px';
   overlay.style.height = height + 'px';

   popupOverlayOnResize(prefix, hackOverlay);
}

function resizePopupOverlayToElement(prefix, elementID, hackOverlay)
{
   var element = document.getElementById(elementID);

   if (!element)
      return;

   resizePopupOverlay(prefix, element.clientWidth, element.clientHeight,
         hackOverlay);
}

function getBackgroundID(prefix)
{
   return prefix + 'Background';
}

function getOverlayID(prefix)
{
   return prefix + 'Overlay';
}

/** End popupOverlay * */

function showInfoBoxOverlay(id, hackFooter, hackOverlay, browser)
{
   var infoBox = document.getElementById(id);

   infoBox.style.display = "block";
   showPopupOverlay(id, infoBox.clientWidth, infoBox.clientHeight, null,
         hackFooter, hackOverlay, browser);
   document.getElementById(getOverlayID(id) + "Body").appendChild(infoBox);
}

function submitSearchForm(formID, paramNamesArray, paramValuesArray,
      submitParameter)
{
   var form = document.getElementById(formID);
   if (form != null)
   {
      for (x in paramNamesArray)
      {
         var hidden = document.createElement("input");
         hidden.type = 'hidden';
         hidden.name = paramNamesArray[x];
         hidden.value = paramValuesArray[x];
         form.appendChild(hidden);
      }
      if (submitParameter != undefined && submitParameter != null)
      {
         var hiddenSub = document.createElement("input");
         hiddenSub.type = 'hidden';
         hiddenSub.name = submitParameter;
         hiddenSub.value = 'true';
         form.appendChild(hiddenSub);
      }
      form.submit();
   }
   return false;
}

function hideChat(id, hideChatCookieName)
{
   var exdate = new Date();
   exdate.setDate(exdate.getDate() + 1);

   var element = document.getElementById(id);
   element.style.display = "none";
   document.cookie = hideChatCookieName
         + "=true;domain=experts-exchange.com;path=/;expires="
         + exdate.toGMTString();
}

var expandedInput = new Array();

function toggleExpandedInput(id)
{
   var element = document.getElementById(id);
   var height = element.clientHeight;

   expandedInput[id] = !expandedInput[id];
   
   element.style.height = (expandedInput[id] ? height * 3 : height / 3) + "px";
   document.getElementById("expandToggle" + id).className = expandedInput[id] ? "collapseToggle" : "expandToggle";
}

function clearAttachmentDetails()
{
   var infoBoxContent = document.getElementById("attachmentDetailsContent");
   
   while (infoBoxContent.hasChildNodes())
      infoBoxContent.removeChild(infoBoxContent.childNodes[0]);
   
   var throbber = document.createElement("DIV");
   throbber.className = "attachmentDetailsThrobber";
   
   infoBoxContent.appendChild(throbber);
}

function anyAbandoned(hackOverlay, hackFooter, showOverlay, count, userAgentClass)
{
   var returnval;
   var hasAbandoned = (count > 0);
   var showOverlayBoolean = (showOverlay == "true"); 

   if(showOverlay && hasAbandoned)
   {
      if (count == 1)
         showPopupOverlay('singleAbandonedQuestion', 418, 264,'/shared/async/abandonedSingleQuestion.jsp?'+'type=close', hackFooter, hackOverlay, userAgentClass);
      else if (count > 1)
         showPopupOverlay('multipleAbandonedQuestion', 435, 219,'/shared/async/abandonedMultQuestion.jsp?'+'type=close', hackFooter, hackOverlay, userAgentClass);
      
      returnval = false; 
   } 
   else
   {
      returnval = true;
   }
   
   return returnval;  
} 
function addCommas(number)
{
   number += '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) 
   {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
function calcTotalRefund(value, pricePerLicense, purchaseID, discount, days)
{
      var additionalLicenses = document.getElementById("numID"+purchaseID).value;
      var element = document.getElementById("totRef"+purchaseID);
      var element1 = document.getElementById("totRef1");
      var numLicensesBeingRefunded = document.getElementById("numLic"+purchaseID);
      var totalRef = document.getElementById("totRef2");

      var total = ((additionalLicenses*pricePerLicense)-(discount*days*additionalLicenses)).toFixed(2);
      element.innerHTML = addCommas(total);
      element1.innerHTML = addCommas(total);
      numLicensesBeingRefunded.innerHTML = additionalLicenses;
      totalRef = total;

      var refundThing = document.getElementById("totRef"+purchaseID);
      refundThing.value = total; 
      return total;
}

function expanderObject(expanderName, expanderID, expandDir, expandPace)
{
   var delay = 5;
   
   this.name = expanderName;
   this.expander = document.getElementById(expanderID);
   this.inMotion = false;
   this.direction = expandDir;
   this.expanderHeight = parseInt(this.expander.style.height); 
   this.timerID;
   this.progress = 0;
   this.pace = expandPace;
  
   this.startExpanding = function()
   {     
      if (this.inMotion)
         return;
      
      if (this.expander.style.display == "block")
         return;
     
      this.inMotion = true;
      this.expander.style.height = "1px";
     
      this.expander.style.display = "block";
     
      var expandFunction = this.name + ".move()" 
     
      this.timerID = setInterval(expandFunction, delay);
   }
  
   this.move = function()
   {
      var y = parseInt(this.expander.style.height);
      this.expander.style.height = y + this.pace + "px";
      this.progress += this.pace;
      
      if (this.progress >= this.expanderHeight)
      {
         clearInterval(this.timerID);
         this.expander.style.height = this.expanderHeight + "px";
      }
     
      return;
   }
}
