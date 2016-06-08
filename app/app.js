(function () {
	'use strict';

	require('angular');
	require('oclazyload');
	var pdfMain = require('./pdfMain/pdfMain.js');
	var pdfTools = require('./pdfTools/pdfTools.js');
	var pdfViewer = require('./pdfViewer/pdfViewer.js');
	var pdfViewerService = require('./pdfViewer/pdfViewerService.js');

	var pdfApp = angular.module('pdfApp', ['oc.lazyLoad']);

	pdfApp
		.value('$routerRootComponent', 'pdfApp')
		.component('pdfMain', pdfMain)
		.component('pdfTools', pdfTools)
		.service('pdfViewerService', pdfViewerService)
		.component('pdfViewer', pdfViewer);
}());
