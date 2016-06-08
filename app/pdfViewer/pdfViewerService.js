(function() {
    'use strict';

    pdfViewerService.$inject = ['$log', '$ocLazyLoad', '$q'];

    function pdfViewerService($log, $ocLazyLoad, $q) {
        var baseUrl = 'js/pdf/',
        service = {
            load: load,
        };

        return service;

        function load() {
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
                .catch(function(error) {
                    $log.error('Error while trying to load resource dependencies for pdfViewer');
                    $log.error(error);
                });
        }

        function loadl10n() {
            var deferred = $q.defer();
            var href = baseUrl + 'locale/locale.properties';

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
                    baseUrl + 'compatibility.js',
                    baseUrl + 'l10n.js',
                    baseUrl + 'pdf.js',
                ]
            });
        }

        function loadViewerJS() {
            return $ocLazyLoad.load(baseUrl + 'viewer.js');
        }
    }

    module.exports = pdfViewerService;
})();
