// Script loader

var namespace = namespace || {};

(function($, window, document, undefined) {

    'use strict';
  
    // Initialise app 
    var myModule = new namespace.moduleA();

    //removeIf(production) 
        //bear trap
        $('body').bearTrap();
    //endRemoveIf(production) 
  
})(jQuery, window, document);