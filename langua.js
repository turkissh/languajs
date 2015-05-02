//Declaring default language
var pageLang;

/**
 *	Function: Changes the language of all the elements
 *  with the class "translatable" in the html using the
 *  file texts.json in the same loaded in the head 
 */
function changeLang(language) {

	pageLang = language;

	$.each($(".translatable"),function(index,field) {
		
		//Get all texts from language and get the pos of the needed
		var ind = null;

		$.each(texts[language],function(index,value) {

			if($(field).attr("id") in texts[language][index]){
				ind = index;
			}

		});

		//Valid the id is in the dictionary
		if(ind == null){
			console.warn("Id " + $(field).attr("id") + " marked as translatable and there is no key in texts file for " + pageLang);
		}else{
			//Assing the text in the object
			$(field).text(texts[language][ind][$(field).attr("id")]);
		}

	});
	

};


