(function() {
    'use strict';

    require('angular');
    require('oclazyload');
    var pdfViewer = angular.module('pdf.viewer', ['oc.lazyLoad']);

    module.exports = pdfViewer;
})();
