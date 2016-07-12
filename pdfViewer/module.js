(function() {
    'use strict';

    require('angular');
    require('oclazyload');
    var pdfViewer = require('./pdfViewer.js');
	var pdfViewerService = require('./pdfViewerService.js');

    var pdf_viewer = angular.module('pdf.viewer', ['oc.lazyLoad']);

    pdf_viewer
        .component('pdfViewer', pdfViewer)
        .provider('pdfViewerService', pdfViewerService);

    module.exports = pdf_viewer;
})();
