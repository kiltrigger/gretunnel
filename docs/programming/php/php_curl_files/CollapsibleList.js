/**
*  CollapsibleList function
*
*  pass a unique id into this constructor to designate it as a collapsible element.  In your css,
*  make sure you specify a .collapsed class that represents this list collapsed
*/
function CL(elementID) 
{
  collapsibleArea = document.getElementById("cA" + elementID);
  collapsibleController = document.getElementById("cC" + elementID);
  CLt(elementID,collapsibleController,collapsibleArea);
}

function CLt(elementID,collapsibleController,collapsibleArea) 
{
   if (collapsibleArea.className.indexOf("co") >= 0) {
     CLe(elementID,collapsibleController,collapsibleArea);
     expandedExpand(elementID);
   } else {
     CLc(elementID,collapsibleController,collapsibleArea);
     expandedCollapse(elementID);
   }
}

function CLe(elementID,collapsibleController,collapsibleArea) 
{
   removeClass(collapsibleArea, "co");
   removeClass(collapsibleController, "co");
}

function CLc(elementID,collapsibleController,collapsibleArea) 
{
   addClass(collapsibleArea, "co");
   addClass(collapsibleController, "co");
}

function expandedExpand(elementID)
{
}

function expandedCollapse(elementID)
{
}
