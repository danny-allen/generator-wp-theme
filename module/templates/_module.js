/**
 * <%= _.slugify(moduleName) %>
 * <%= moduleDesc %>
 */

var namespace = namespace || {};

(function($, window, document, undefined) {

    'use strict';

    /**
     * <%= _.slugify(moduleName) %>
     * 
     * Sets the default options and extends with user defined options. Runs the _init method.
     * 
     * @param   obj     userOptions     User can override options with this.
     */
    namespace.<%= _.slugify(moduleNameCaps) %> = function(userOptions){

        //default options
        this.options = {

        };
        
        //extend default options with module options
        $.extend(this.options, userOptions);

        //run initial functionality on instantiation
        this._init();
    };


    /**
     * _init
     *
     * Initial functionality that happens on instantiation of <%= _.slugify(moduleNameCaps) %>.
     */
    namespace.<%= _.slugify(moduleNameCaps) %>.prototype._init = function(){

    };

})(jQuery, window, document);