(function() {
    'use strict';

    require('angular');
    require('oclazyload');
    var pdf_viewer = angular.module('pdf.viewer', ['oc.lazyLoad']);

    pdf_viewer.config(['pdfViewerServiceProvider',
        function(pdfViewerServiceProvider) {
          pdfViewerServiceProvider.setPath('lib/pdfjs');
    }]);

    module.exports = pdf_viewer;
})();
