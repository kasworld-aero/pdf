(function() {
    'use strict';

    angular
        .module('pdf.viewer')
        .component('pdfViewer', pdfViewer);

    var pdfViewer = {
        templateUrl: 'tpl/pdfViewer.tpl.html',
        controller: pdfViewerCtrl,
        bindings: {
            file: '<',
            fullscreen: '<',
            highlight: '<',
            search: '<',
            next: '<',
            previous: '<',
            onUpdate: '&'
        }
    };

    pdfViewerCtrl.$inject = ['$element', '$log', 'pdfViewerService'];

    function pdfViewerCtrl($element, $log, pdfViewerService) {
        var $ctrl = this;
        window.pdfViewerFileUrl = $ctrl.file || '';

        var parent = $element.parent();
        if (parent && !parent.hasClass('pdf-viewer-container')) {
            parent.addClass('pdf-viewer-container');
        }

        /****************************************
         *      Controller Attributes           *
         ****************************************/
        $ctrl.ready = false;

        /****************************************
         *      Controller API                  *
         ****************************************/
        angular.extend($ctrl, {
            find: find,
            nextMatch: nextMatch,
            previousMatch: previousMatch,
            highlightAll: highlightAll,
            enterFullscreen: enterFullscreen
        });

        /****************************************
         *      Lifecycle Hooks                 *
         ****************************************/
        $ctrl.$onInit = init;

        function init() {
            console.log('👊 activating component');
            pdfViewerService.load().then(function(msg) {
                getDomElements();
                $ctrl.ready = true;
            });

        }

        $ctrl.$onChanges = function(changesObj) {

            if (changesObj.file) {
                window.pdfViewerFileUrl = $ctrl.file;
                if (window.PDFViewerApplication) {
                    PDFViewerApplication.openFileViaURL($ctrl.file);
                }
            }

            if ($ctrl.ready) {
                if (typeof changesObj.search !== 'undefined') {
                    $ctrl.find($ctrl.search);
                }

                if (typeof changesObj.highlight !== 'undefined') {
                    $ctrl.highlightAll($ctrl.highlight);
                }

                if (typeof changesObj.fullscreen !== 'undefined') {
                    $ctrl.enterFullscreen();
                }

                if (typeof changesObj.next !== 'undefined') {
                    $ctrl.nextMatch();
                }

                if (typeof changesObj.previous !== 'undefined') {
                    $ctrl.previousMatch();
                }

                $ctrl.onUpdate();
            }
        };

        /****************************************
         *      API Functions                   *
         ****************************************/
        function find(query) {
            this.findInput.value = query;
            PDFViewerApplication.findBar.dispatchEvent('');
        }

        function nextMatch() {
            PDFViewerApplication.findBar.dispatchEvent('again', false);
        }

        function previousMatch() {
            PDFViewerApplication.findBar.dispatchEvent('again', true);
        }

        function highlightAll(highlight) {
            this.findHighlightAll.checked = highlight;
            PDFViewerApplication.findBar.dispatchEvent('highlightallchange');
        }

        function enterFullscreen() {
            $ctrl.presentationMode.click();
        }

        /****************************************
         *      Private Functions               *
         ****************************************/
        function getDomElements() {
            var elements = {
                'findInput': null,
                'findHighlightAll': null,
                'presentationMode': null
            };

            Object.keys(elements).forEach(function(key) {
                elements[key] = document.getElementById(key);
            });

            angular.extend($ctrl, elements);
        }

    }
})();

(function() {
    'use strict';

    angular
        .module('pdf.viewer')
        .service('pdfViewerService', pdfViewerService);


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
})();

(function(angular, window) {
    'use strict';

    var pdfViewer = angular.module('pdf.viewer', ['oc.lazyLoad']);

})(angular, window);
