//Declaring default language
var pageLang;

/**
 *  Public
 *	Function: Changes the language of all the elements
 *  with the class "translatable" in the html using the
 *  file texts.json in the same loaded in the head 
 */
function changeLang(language) {

	pageLang = language;

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

