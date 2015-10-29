'use strict';

//modules to use
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

    /**
     * initializing
     *
     * Require a package.json
     */
    initializing: function() {
        this.pkg = require('../package.json');
    },


    /**
     * prompting
     *
     * set up and run some prompts!
     */
    prompting: function() {
        var done = this.async();

        //have Yeoman greet the user.
        var greetings = [
            'Howdy.',
            'Behold! It\'s the very average ' + chalk.red('WordPress theme') + ' generator!',
            'Hi there! Don\'t forget to ' + chalk.green('contribute') + ' if you find a bug or something that needs tweaking!'
        ];

        //output the random greeting!
        this.log(yosay(
            greetings[Math.floor(Math.random()*greetings.length)]
        ));

        //setup some prompts
        var prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'What is the name of the WordPress theme?',
                default: 'myApp' // Default to current folder name
            },
            {
                type: 'checkbox',
                message: 'Optional settings',
                name: 'features',
                choices: [
                    {
                        name: 'jQuery 2',
                        value: 'includeJquery'
                    },
                    {
                        name: 'jQuery 1.9.X (IE 6/7/8 support)',
                        value: 'includeJqueryLegacy'
                    },
                    {
                        name: 'Modernizr',
                        value: 'includeModernizr'
                    },
                    {
                        name: 'Legacy tools for <IE9 (Respond.js, html5shiv)',
                        value: 'includeLegacy'
                    }
                ]
            }
        ];

        //run the prompts
        this.prompt(prompts, function(props) {
            
            //function to check for existence offeature
            function hasFeature (feat) {
                return features.indexOf(feat) !== -1;
            }

            //set features
            var features = props.features;

            //output the app name!
            this.log(props.appName);

            //set the app name and appMachineName
            this.appName = props.appName;
            this.appMachineName = props.appName
                .replace(/[^a-zA-Z0-9]/g, '')
                .toLowerCase();

            //set boolean values as to whether we want these deps
            this.includeJquery = hasFeature('includeJquery');
            this.includeJqueryLegacy = hasFeature('includeJqueryLegacy');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeLegacy = hasFeature('includeLegacy');

            // Generate bower.json
            this.dependencies = {};

            //check dependency options the user selected
            if ( this.includeJquery ) { this.dependencies.jquery = '~2.1.1'; }
            if ( this.includeJqueryLegacy ) { this.dependencies.jquery = '~1.9.1'; }
            if ( this.includeModernizr ) { this.dependencies.modernizr = 'latest'; }
            if ( this.includeLegacy ) { 
                this.dependencies.respond = '~1.4.2'; 
                this.dependencies.html5shiv = '~3.7.3'; 
            }

            //done?
            done();
        }.bind(this));
    },


    /**
     * writing
     *
     * create the folder structure and move the template files.
     */
    writing: {

        //copy the gulp file
        copyGulpfile: function() {
            this.template('_gulpfile.js', 'gulpfile.js');
        },

        //create all the folders we need
        copyStructure: function() {
            this.mkdir('app');
            this.mkdir('app/fonts');
            this.mkdir('app/images');
            this.mkdir('app/inc');
            this.mkdir('app/languages');
            this.mkdir('app/scripts');
            this.mkdir('app/styles');
            this.mkdir('app/templates');
        },

        //copy the js module structure
        copyScripts: function() {
            this.directory('scripts/modules', 'app/scripts/modules');
            this.copy('scripts/main.js', 'app/scripts/main.js');
            this.copy('scripts/myApp.js', 'app/scripts/myApp.js');
        },

        //get the sass file structure
        copyStyles: function() {
            this.mkdir('app/styles/scss');
            this.directory('styles/core', 'app/styles/core');
            this.directory('styles/foundation', 'app/styles/foundation');
            this.directory('styles/modules', 'app/styles/modules');
            this.directory('styles/mixins', 'app/styles/mixins');
            this.directory('styles/vendor', 'app/styles/vendor');
            this.copy('styles/_inbox.scss', 'app/styles/_inbox.scss');
            this.template('styles/_main.scss', 'app/styles/main.scss');
        },

        //get gitignore
        copyGit: function() {
            this.copy('gitignore', '.gitignore');
        },


        /**
         * copyApp
         *
         * Copy files whilst processing them for vars using EJS (Effective JavaScript Templating).
         */
        copyApp: function() {
            
            function copyTemplates(self, files, folder){

                //make sure folder is set and is a string
                folder = (typeof folder !=='string')? '' : folder;

                //loop through the filenames
                for(var i in files){

                    //set the filenames
                    var filename = files[i];
                    var newfilename = (filename.charAt(0) === '_')? filename.substr(1) : filename; //removes leading underscore

                    //copy template and proccess it (EJS)
                    self.fs.copyTpl(
                        self.templatePath(folder + '/' + filename),
                        self.destinationPath('app/' + folder + newfilename),
                        self
                    );
                }
            }

            //set the files to process
            var appFiles = [
                '_404.php',
                '_archive.php',
                '_author.php',
                '_category.php',
                '_comments.php',
                '_footer.php',
                '_functions.php',
                '_header.php',
                '_index.php',
                '_page.php',
                '_search.php',
                '_sidebar.php',
                '_single.php',
                '_style.css',
                '_tag.php',
                '_template-demo.php',
            ];

            //files to include within inc
            var incFiles = [
                '_actions.php',
                '_custom_post_types.php',
                '_filters.php',
                '_functions.php',
                '_shortcodes.php',
                '_theme_support.php'
            ];

            //process files
            copyTemplates(this, appFiles, '');
            copyTemplates(this, incFiles, 'inc/');
        },

        //get the config files for the editor, jshint and bower
        copyProjectfiles: function() {
            this.copy('editorconfig', '.editorconfig');
            this.copy('jshintrc', '.jshintrc');
            this.copy('bowerrc', '.bowerrc');

            var projectFiles = [
                '_package.json',
                '_bower.json',
            ];

            //loop through the filenames
            for(var i in projectFiles){

                //set the filenames
                var filename = projectFiles[i];
                var newfilename = (filename.charAt(0) === '_')? filename.substr(1) : filename; //removes leading underscore

                //copy template and proccess it (EJS)
                this.fs.copyTpl(
                    this.templatePath(filename),
                    this.destinationPath(newfilename),
                    this
                );

            }
        }
    },


    /**
     * install
     */
    install: function() {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});