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
		   defaults: 'emcspring'
         });
         this.option('service', {
            desc: 'Name of the service required by spring boot without space',
            type: String,
            defaults: ''
          }
        );
	},

    initializing: function () {
        this.pkg = require('../../package.json');
        this.serviceName = this.options['service-name'];
        this.service = this.options['service'];
        this.log(yosay(
              'service name ' + this.serviceName +'service ' + this.service
          ));
        var className = this.serviceName.substring(0, (this.serviceName.lastIndexOf('-microservice')));
        className = className.replace(/[`~!@#$%^&*()|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        className = className.split(/(?:_|-)+/);
        this.className = className.map(function (element) {
            return element.charAt(0).toUpperCase() + element.slice(1);
        }).join('');

        this.domainName = this.className;

        this.serviceNameKey = "${service.name:generated-microservice}";

        this.srcPkg = 'src/';
        this.baseJavaPkg = '/java/com/dellemc/scaffold/';
        this.resourcePkg = '/resources/';

        this.baseTestPkg = 'test';
        this.baseTestCommonPkg = 'testCommon';
        
        
    },
    _createJavaSourceDir: function (dirName, domainName, testName) {
        this._createDir(this.srcPkg + dirName + this.baseJavaPkg + domainName + testName);
    },
    _createDir: function (dirName) {
        this.mkdir(this.serviceName + "/" + dirName);
    },
    _createResourceDir: function (dirName, domainName) {
        this._createDir(this.srcPkg + dirName + this.resourcePkg);
    },
    
    writing: {
        genShell: function () {
            this.log('Generating a microservice scaffold for ' + this.serviceName);
            
            const domainName = this.domainName.toLowerCase();

            const mainJavaPkg = this.serviceName + "/" + this.srcPkg + 'main' + this.baseJavaPkg;
            const mainResourcePkg = this.serviceName + "/" + this.srcPkg + 'main' + this.resourcePkg;

            var controllerPkg = mainJavaPkg + domainName + '/controllers';
            var domainPkg = mainJavaPkg + domainName + '/domains';
            var configPkg = mainJavaPkg + domainName + '/config';

            var gradleDir = this.serviceName + '/gradle/wrapper';

            this._createJavaSourceDir(this.baseTestPkg, domainName, "/controllers");
            this._createJavaSourceDir(this.baseTestPkg, domainName, "/config");
            this._createResourceDir(this.baseTestPkg);

            this._createJavaSourceDir(this.baseTestCommonPkg, domainName, "/test/helpers");
            this._createResourceDir(this.baseTestCommonPkg);

            //Static and Common test files
            const staticResourcePkg = "static/";
            this.copy(staticResourcePkg + 'gradle-wrapper.jar', gradleDir + '/gradle-wrapper.jar');
            this.copy(staticResourcePkg + 'gradle-wrapper.properties', gradleDir + '/gradle-wrapper.properties');

            this.copy(staticResourcePkg + 'gradlew.bat', this.serviceName + '/gradlew.bat');
            this.copy(staticResourcePkg + 'gitignore', this.serviceName + '/.gitignore');
            this.copy(staticResourcePkg + 'gradlew', this.serviceName + '/gradlew');

            const testCommonSourcePkg = this.serviceName + '/' + this.srcPkg + this.baseTestCommonPkg + this.baseJavaPkg + domainName + '/test/helpers';
            this.copy(staticResourcePkg + 'BaseServiceTest.java', testCommonSourcePkg + '/BaseServiceTest.java');
            this.copy(staticResourcePkg + 'Utils.java', testCommonSourcePkg + '/Utils.java');

 
            // Build files

            this.template('_build.gradle', this.serviceName + '/build.gradle');
            this.template('_gradle.properties', this.serviceName + '/gradle.properties');
            this.template('_README.md', this.serviceName + '/README.md');
            this.template('_application.properties', mainResourcePkg + '/' + 'application.properties');

            // Java code
            this.template('_TemplateConfig.java', configPkg + '/' + this.className + 'Config.java');
            this.template('_TemplateServiceApplication.java', configPkg + '/' + this.className + 'ServiceApplication.java');
            this.template('_TemplateController.java', controllerPkg + '/' + this.className + 'Controller.java');
            this.template('_TemplateModel.java', domainPkg + '/' + this.className + '.java');

            // unit test
            const testConfigPkg = this.serviceName + "/" + this.srcPkg + this.baseTestPkg + this.baseJavaPkg + domainName + "/config/";
            const testControllerPkg = this.serviceName + "/" + this.srcPkg + this.baseTestPkg + this.baseJavaPkg + domainName + "/controllers/";

        }
    }
});