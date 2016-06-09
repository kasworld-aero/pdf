(function () {
	'use strict';

	require('angular');
	require('../src/pdf_viewer.js');
	var pdfMain = require('./pdfMain/pdfMain.js');
	var pdfTools = require('./pdfTools/pdfTools.js');

	var pdfApp = angular.module('pdfApp', ['oc.lazyLoad', 'pdf.viewer']);

	pdfApp
		.value('$routerRootComponent', 'pdfApp')
		.component('pdfMain', pdfMain)
		.component('pdfTools', pdfTools);
}());
