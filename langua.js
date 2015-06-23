//Default variables
var pageLang;
var defaultKey = "com.github.turkissh.languajs.pageLang";


//-------Public functions, alias API----------

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
        //Only set the language if exists in file
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

    if(langExists(language)){	

        pageLang = language;

        setSessionLang(pageLang);

        $.each($(".translatable"),function(index,field) {
		
            changeFieldText(field , pageLang);

    	});

    }else{
        console.warn("Trying to go to unexisting language [" + language + "]");
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

            //Saves the tag to check which attribute edit
            tag = $(field).prop("tagName");

            //Saves the translated text
            translate = texts[lang][index][$(field).attr("id")];

    		//Checks the object type
            if( $.inArray( tag , ["INPUT","TEXTAREA"] ) >= 0 ){
                //Its a input with placeholder
                $(field).attr( "placeholder" , translate );    
            }else if($.inArray( tag , ["IMG","DIV"] ) >= 0){
                //Its an image, if its a img changes the src, otherwise the background-image
                if(tag == "IMG") {
                    $(field).attr( "src" , translate );    
                }else{
                    $(field).css('background-image', 'url("' + translate + '")' );
                }
            }else{
                //General texts only changes the text attribute
                $(field).text(translate);    
            }
			
        }

  	}  	

  };

    /**
    * Public
    * Function: Gets the language code
    */
    function getLangCode(){
        return getSessionLang();
    };



//-------Private functions, only devs!----------

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
  
  //Get the language from the browser
  var userLang = navigator.language || navigator.userLanguage;

  // Check if the li for the browsers language is available
  // and set active if it is available
  if(  userLang.split('-')[0]  ) {

    lang = userLang.split('-')[0].toUpperCase();

    //Checks if the lang of the browser exits in the texts
    //otherwis sets the first of the file
    if(langExists(lang)){
        return lang;
    }else{
        console.warn("Hey, you dont have " + lang + " in your file, setting default")
        return Object.keys(texts)[0];
    }

  }else{
    //The browser doesn't have a language set, use the first one 
    console.warn("Cant get browser lang, setting default");
    return Object.keys(texts)[0];
  }

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


//-------Storage functions , only devs!----------

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