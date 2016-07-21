(function() {
    'use strict';

    angular.module('pdf.viewer')
        .provider('pdfViewerService', pdfViewerService);

    function pdfViewerService() {
        var provider = this,
            baseUrl = 'pdfjs'; // default base, assuming assets are in 'pdfjs' folder

        /**
         * Use this to set the path where you host the pdfjs dependencies.
         * This is everything that is included in the `dist/pdfjs` folder.
         * It is needed to lazy load assets so you can include the component in your
         * main app module, but not load the viewer assets until the pdfComponent is rendered
         * 
         * @param {String} path The path in a publicly accessible folder to the pdfjs assets
         */
        provider.setPath = function(path) {
            window.pdfWorkerUrl = path;
            baseUrl = path;
        }

        provider.$get = ['$log', '$ocLazyLoad', '$q', function($log, $ocLazyLoad, $q) {
            var service = {
                load: load,
            };
            return service;
            
            /***********************************/
            /*          Service API            */
            /***********************************/
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


            /***********************************/
            /*        Private Functions        */
            /***********************************/
            function loadl10n() {
                var deferred = $q.defer();
                var href = baseUrl + '/locale/locale.properties';

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
                    files: [
                        baseUrl + '/pdf-viewer.css',
                    ]
                });
            }

            function loadPDFJS() {
                return $ocLazyLoad.load({
                    files: [
                        baseUrl + '/compatibility.js',
                        baseUrl + '/l10n.js',
                        baseUrl + '/pdf.js',
                    ]
                });
            }

            function loadViewerJS() {
                return $ocLazyLoad.load(baseUrl + '/viewer.js');
            }
        }];
        /* end service */
    }
})();
