(function () {
	'use strict';

	require('angular');
	require('oclazyload');
	require('../dist/pdfViewer');
	var pdfMain = require('./pdfMain/pdfMain.js');
	var pdfTools = require('./pdfTools/pdfTools.js');

	var pdfApp = angular.module('pdfApp', ['pdf.viewer', 'oc.lazyLoad']);

	pdfApp
		.value('$routerRootComponent', 'pdfApp')
		.component('pdfMain', pdfMain)
		.component('pdfTools', pdfTools);

	pdfApp.config(['pdfViewerServiceProvider',
        function(pdfViewerServiceProvider) {
          pdfViewerServiceProvider.setPath('/lib/pdfjs');
    }]);
}());
