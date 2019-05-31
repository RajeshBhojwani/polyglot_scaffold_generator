'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var got = require('got');
var ncp = require('ncp');
ncp.limit = 16;
var fs = require('fs');
var changeCase = require('change-case');
var strsplit = require('strsplit');
var xmldoc = require('xmldoc');
var optionOrPrompt = require('yeoman-option-or-prompt');

module.exports = yeoman.Base.extend({

	constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        this.option('service-name', {
          desc: 'Meaningful Name of the service without space',
          type: String,
          defaults: 'emcnode'
        });
   },

   initializing: function () {
       this.pkg = require('../../package.json');
       this.serviceName = this.options['service-name'];
       this.log(yosay(
             'service name ' + this.serviceName
         ));
       var className = this.serviceName.substring(0, (this.serviceName.lastIndexOf('-microservice')));
       className = className.replace(/[`~!@#$%^&*()|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');
       className = className.split(/(?:_|-)+/);
       this.className = className.map(function (element) {
           return element.charAt(0).toUpperCase() + element.slice(1);
       }).join('');

       this.domainName = this.className;
       
   },
 
    // prompting: function () {
    //     var done = this.async();
    //     this.log(yosay(
    //         'Welcome to the ' + chalk.red('DellEMC') + ' microservice generator!'
    //     ));

    //     var prompts = [{
    //             name: 'serviceName',
    //             message: 'Please enter your service name in the format <name>-microservice (for example order-microservice):',
    //             validate: function (serviceName) {
    //                 if(!serviceName) {
    //                     return 'You forgot to enter Service Name! Please enter Service name.';
    //                 } else if (!serviceName.match(/^[a-zA-Z0-9-_]+$/)) {
    //                     return 'Service names may only include letters and numbers with dashes and/or underscores.';
    //                 } else if (!serviceName.endsWith('-microservice')) {
    //                     return 'The service name must end with "-microservice"';
    //                 } else {
    //                     return true;
    //                 }
    //             },
    //             store: true
    //         }
    //     ];


    //     this._optionOrPrompt(prompts, function (props) {
    //         this.serviceName = props.serviceName;
    //         var className = this.serviceName.substring(0, (this.serviceName.lastIndexOf('-microservice')));
    //         className = className.replace(/[`~!@#$%^&*()|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    //         className = className.split(/(?:_|-)+/);
    //         this.className = className.map(function (element) {
    //             return element.charAt(0).toUpperCase() + element.slice(1);
    //         }).join('');

    //         this.domainName = this.className;

    //         done();
    //     }.bind(this));
    // },
    
    writing: {
        genShell: function () {
            this.log('Generating a microservice scaffold for ' + this.serviceName);
            
            //nodejs basic files
            const staticResourcePkg = "static/";
            this.copy(staticResourcePkg + 'app.js', this.serviceName + '/app.js');
            this.copy(staticResourcePkg + 'package.json', this.serviceName + '/package.json');
            this.copy(staticResourcePkg + 'gitignore', this.serviceName + '/.gitignore');
 
            this.template('_README.md', this.serviceName + '/README.md');

        }
    }
});