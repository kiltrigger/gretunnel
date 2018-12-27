
function Language(id, value, text)
{
   this.id = id;
   this.value = value;
   this.text = text;
}

var languages = new Array();
languages[languages.length] = new Language('english', 'en|en', 'English');
languages[languages.length] = new Language('arabic', 'en|ar', 'العربية');
languages[languages.length] = new Language('chinese_simplified', 'en|zh-CN', '汉语');
languages[languages.length] = new Language('chinese_traditional', 'en|zh-TW', '漢語');
languages[languages.length] = new Language('french', 'en|fr', 'Français');
languages[languages.length] = new Language('german', 'en|de', 'Deutsch');
languages[languages.length] = new Language('italian', 'en|it', 'Italiano');
languages[languages.length] = new Language('japanese', 'en|ja', '日本語');
languages[languages.length] = new Language('korean', 'en|ko', '한국어');
languages[languages.length] = new Language('portuguese', 'en|pt', 'Português');
languages[languages.length] = new Language('russian', 'en|ru', 'Русский');
languages[languages.length] = new Language('spanish', 'en|es', 'Español');

function appendTranslationOptions(selectElementID, currentLanguage)
{
//alert('language :' + currentLanguage);
   var select = document.getElementById(selectElementID);
/*
   var suffix = '' + Math.floor(Math.random() * 1000000000);
   
   var form = document.createElement('form');
   form.method = 'get';
   form.action = '/translate.jsp';
   form.onsubmit = function(){return submitOnce();};
   
   var input = document.createElement('input');
   input.type = 'hidden';
   input.name = 'url';
   input.value = url;
   form.appendChild(input);

   var label = document.createElement('label');
   label.htmlFor = 'translationLanguages_' + suffix;
   label.appendChild(document.createTextNode('Translate:'));
   form.appendChild(label);

   var select = document.createElement('select');
   select.id = 'translationLanguages_' + suffix;
   select.name = 'language';
   select.onchange = function(){this.form.submit();};
*/
   for (var index = 0; index < languages.length; index++)
   {
      var language = languages[index];
   
      var option = document.createElement('option');
      option.id = language.id;
      option.value = language.value;
      if (option.value == currentLanguage)
         option.selected = true;
      option.appendChild(document.createTextNode(language.text));
   
      select.appendChild(option);
   }
/*
   form.appendChild(select);

   parentElement.appendChild(form);
*/
}

function appendTranslationOptionIconTitles(elementIDSuffix)
{
   for (var index = 0; index < languages.length; index++)
   {
      var language = languages[index];

      var elementID = language.id + elementIDSuffix;
      var element = document.getElementById(elementID);
      if (element != null)
         element.title = language.text;
   }
}
