 _                                  _
| | __ _ _ __   __ _ _   _  __ _   (_)___
| |/ _` | '_ \ / _` | | | |/ _` |  | / __|
| | (_| | | | | (_| | |_| | (_| |_ | \__ \
|_|\__,_|_| |_|\__, |\__,_|\__,_(_)/ |___/
               |___/             |__/
    translate webpages easily


Description: 

    Langua.js (languages) is a javascript library to translate webpages.
    Just add a class indicating the elements that are translatables and
    call a method to magicaly changes all your webpage immediately.

Requires:  JQuery

Usage:
    
    TEXTS
        (*) Edit the file texts with the texts you will use in your webpage
        (*) Follow the syntaxs as:
                texts 
                  |  
                  +--EN
                      |
                      +-- id : text

        (*) You can create as many languages as you need following the same syntax
        (*) Any doubt, check the demo

    HTML
        (*) Import the texts object (texts.js)
        (*) Import the library langua.js
        (*) Mark the elementes which are translatables given them the class "translatable"
        (*) Give them an ID which will be the same you will reference them in the texts.js
    JS
        (*) Call the method changeLang(language) to automatically change all the page language


Pending:
        (*) Create a js that dinamically create the texts.json
        (*) ADD to api modify specifics texts
        (*) ADD to api the modification of placeholders in inputs
        (*) Create a more complete demo


For more information, check the demo!

