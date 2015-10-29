'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    initializing: function() {
        this.log('All right, a new module!');
    },

    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'All right, a new module!'
        ));

        var prompts = [{
            type: 'input',
            name: 'moduleName',
            message: 'What is the name of the module?',
            default: 'module' // Default to current folder name
        }, {
            type: 'list',
            message: 'What type of module is this?',
            name: 'moduleType',
            choices: [
                {
                    name: 'scss',
                    value: 'scss'
                },
                {
                    name: 'js',
                    value: 'js'
                }
            ]
        }, {
            type: 'input',
            name: 'moduleDesc',
            message: 'Enter a short module (optional)',
            default: 'Module description' // Default to current folder name
        }];

        this.prompt(prompts, function(props) {
            this.moduleName     = props.moduleName;
            this.moduleNameCaps = props.moduleName.charAt(0).toUpperCase() + props.moduleName.substring(1);
            this.moduleType     = props.moduleType;
            this.moduleDesc     = props.moduleDesc;

            done();
        }.bind(this));
    },

    writing: function() {


        if ( this.moduleType === 'scss' ) {
            this.fs.copyTpl(
                this.templatePath('_module.scss'),
                this.destinationPath('app/styles/modules/_' + this.moduleName + '.scss'),
                this
            );

        } else {
            this.fs.copyTpl(
                this.templatePath('_module.js'),
                this.destinationPath('app/scripts/modules/_' + this.moduleName + '.js'),
                this
            );        
        }
    }
});