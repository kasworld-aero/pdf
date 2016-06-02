(function () {
	'use strict';

	require('angular');
	var pdfMain = require('./pdfMain/pdfMain.js');
	var pdfTools = require('./pdfTools/pdfTools.js');
	var pdfViewer = require('./pdfViewer/pdfViewer.js');

	var pdfApp = angular.module('pdfApp', []);

	pdfApp
		.value('$routerRootComponent', 'pdfApp')
		.component('pdfMain', pdfMain)
		.component('pdfTools', pdfTools)
		.component('pdfViewer', pdfViewer);
}());
