(function() {
    'use strict';

    require('angular');
    require('oclazyload');
	var pdfViewer = require('./pdfViewer');
	var pdfViewerService = require('./pdfViewerService');

    var mainModule = angular.module('pdf.viewer', ['oc.lazyLoad']);

    mainModule
        .service('pdfViewerService', pdfViewerService)
        .component('pdfViewer', pdfViewer);

	module.exports = mainModule;
}());
