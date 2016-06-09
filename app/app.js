(function () {
	'use strict';

	require('angular');
	require('../src/pdf.viewer');
	var pdfMain = require('./pdfMain/pdfMain.js');
	var pdfTools = require('./pdfTools/pdfTools.js');

	var pdfApp = angular.module('pdfApp', ['pdf.viewer']);

	pdfApp
		.value('$routerRootComponent', 'pdfApp')
		.component('pdfMain', pdfMain)
		.component('pdfTools', pdfTools);
}());
