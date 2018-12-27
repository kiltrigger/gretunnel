function blur(prefix, id, up)
{
   var upButton = document.getElementById(prefix + "Up" + id);
   var downButton = document.getElementById(prefix + "Down" + id);
   
   addClass(up ? upButton : downButton, up ? "yesBlur" : "noBlur");
   upButton.href = downButton.href = "javascript:void(0);";
   upButton.onclick = downButton.onclick = null;
}

function rateAnswer(id, up)
{
   blur("answerRating", id, up);
}