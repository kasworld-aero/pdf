(function() {
    'use strict';

    pdfViewerService.$inject = ['$ocLazyLoad', '$q'];

    function pdfViewerService($ocLazyLoad, $q) {
        var service = {
            load: load,
        };

        return service;

        function load() {
            console.log('loading');
            return loadl10n()
                .then(function() {
                    return loadCSS();
                })
                .then(function() {
                    return loadPDFJS();
                })
                .then(function() {
                    return loadViewerJS();
                })
                .then(function() {
                    return 'finished loading viewer dependencies';
                })
                .catch(function(err) {
                    console.error('error while trying to load resource dependencies for pdfViewer', err);
                });
        }

        function loadl10n() {
            var deferred = $q.defer();
            var href = 'js/pdf/locale/locale.properties';

            var link = document.createElement('link');
            link.setAttribute('rel', 'resource');
            link.setAttribute('type', 'application/l10n');
            link.setAttribute('href', href);
            document.getElementsByTagName('head')[0].appendChild(link);
            deferred.resolve();

            return deferred.promise;
        }

        function loadCSS() {
            return $ocLazyLoad.load({
                insertBefore: '#load_css_before',
                files: [
                    'css/viewer.css',
                ]
            });
        }

        function loadPDFJS() {
            return $ocLazyLoad.load({
                files: [
                    'js/pdf/compatibility.js',
                    'js/pdf/l10n.js',
                    'js/pdf/pdf.js',
                ]
            });
        }

        function loadViewerJS() {
            return $ocLazyLoad.load('js/pdf/viewer.js');
        }
    }

    module.exports = pdfViewerService;
})();
