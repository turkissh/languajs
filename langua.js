//Default variables
var pageLang;
var defaultKey = "com.github.turkissh.languajs.pageLang"


/**
 *  Public
 *  Function: Changes the language with the default language
 */
 function initChangeLang() {

    $( document ).ready(function(){

      actualLang = getSessionLang();

      if( actualLang == null){
        //Sets the browser language as default
         pageLang = getBrowserLang();
         setSessionLang(pageLang);
      }else{
        pageLang = actualLang;
      }

      changeLang(pageLang);

    });
 };


/**
 *  Public
 *	Function: Changes the language of all the elements
 *  with the class "translatable" in the html using the
 *  file texts.json in the same loaded in the head 
 */
function changeLang(language) {

	pageLang = language;
  setSessionLang(pageLang);

	$.each($(".translatable"),function(index,field) {
		
		changeFieldText(field , pageLang);

	});
	
};


/**
 * Private
 * Function: Finds a specific value in the array of texts and get its index
 * Parameter: Field to find in the texts file, Language to find
 */
 function getTextIndex(field,lang) {

 	var result;
 	
 	$.each(texts[lang],function(index,value) {

		if($(field).attr("id") in texts[lang][index]){
			result = index;
		}

	});

	if(result == null){
		console.warn("Id " + $(field).attr("id") + " marked as translatable and there is no key in texts file for " + pageLang);
		return null;
	}else{
		return result;
	}

 };

 /**
  * Public
  * Function: Changes a specific field unknowing the index (Overload)
  * Parameters: Field to change, language to change
  */
  function changeFieldText(field,lang) {
  	
  	if( langExists(lang) ){

  		index = getTextIndex(field,lang);

	  	//Valid the id is in the dictionary
		if(index != null){

			//Assing the text in the object
			$(field).text(texts[lang][index][$(field).attr("id")]);

		}

  	}  	

  };

/**
  * Private
  * Function: Checks if the language exists in the texts file
  * Parameters: Language to check
  */  
  function langExists(lang) {
  	
  	if(lang in texts){
  		return true;
  	}else{
  		console.warn(lang + " language is not in the texts file");
  		return false;
  	}

  };

/**
  * Private
  * Function: Gets browser language
  */  
function getBrowserLang() {
  
  var userLang = navigator.language || navigator.userLanguage;

  // Check if the li for the browsers language is available
  // and set active if it is available
  if(  userLang.split('-')[0]  ) {
    return ( userLang.split('-')[0].toUpperCase() );
  }else{
    //The browser doesn't have a language set, use english 
    return 'EN';
  }

};

/**
  * Private
  * Function: Get session lang
  */  
function getSessionLang() {
  
  return sessionStorage.getItem(defaultKey);

};

/**
  * Private
  * Function: Set session lang
  */  
function setSessionLang(lang) {
  
  sessionStorage.setItem(defaultKey,lang);

};