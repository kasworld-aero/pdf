(function() {
    'use strict';

    var pdfApp = angular.module('pdfApp', ['pdf.viewer', 'oc.lazyLoad']);

    pdfApp.config(['pdfViewerServiceProvider',
        function(pdfViewerServiceProvider) {
            pdfViewerServiceProvider.setPath('lib/pdfjs');
        }
    ]);
})();