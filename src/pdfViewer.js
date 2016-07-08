(function() {
    'use strict';

    angular
        .module('pdf.viewer')
        .component('pdfViewer', {
            template: ['$templateCache', function($templateCache) {
                return $templateCache.get('src/pdfViewer.tpl.html');
            }],
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
        });

    pdfViewerCtrl.$inject = ['$element', '$log', '$window', '$timeout', 'pdfViewerService'];

    function pdfViewerCtrl($element, $log, $window, $timeout, pdfViewerService) {
        var $ctrl = this;
        $window.pdfViewerFileUrl = $ctrl.file || '';

        // Add container class if class is not already on parent
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
        $ctrl.$onInit = function() {
            console.log('👊 activating component');
        };

        $ctrl.$onChanges = function(changesObj) {

            if (changesObj.file) {
                $window.pdfViewerFileUrl = $ctrl.file;
                if ($window.PDFViewerApplication) {
                    PDFViewerApplication.openFileViaURL($ctrl.file);
                }
            }

            if ($ctrl.ready) {
                if (changesObj.search) {
                    $ctrl.find($ctrl.search);
                }

                if (changesObj.highlight) {
                    $ctrl.highlightAll($ctrl.highlight);
                }

                if (changesObj.fullscreen) {
                    $ctrl.enterFullscreen();
                }

                if (changesObj.next) {
                    $ctrl.nextMatch();
                }

                if (changesObj.previous) {
                    $ctrl.previousMatch();
                }

                $ctrl.onUpdate();
            }
        };

        $ctrl.$postLink = function() {
            $timeout(function() {
                pdfViewerService.load()
                    .then(function(msg) {
                        getDomElements();
                        $ctrl.ready = true;
                        $window.pdfViewerReady = true;
                    });
            }, 0);
        };

        /****************************************
         *      API Functions                   *
         ****************************************/
        function find(query) {
            $ctrl.findInput.value = query;
            PDFViewerApplication.findBar.dispatchEvent('');
        }

        function nextMatch() {
            PDFViewerApplication.findBar.dispatchEvent('again', false);
        }

        function previousMatch() {
            PDFViewerApplication.findBar.dispatchEvent('again', true);
        }

        function highlightAll(highlight) {
            $ctrl.findHighlightAll.checked = highlight;
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

            Object.keys(elements)
                .forEach(function(key) {
                    elements[key] = document.getElementById(key);
                });

            angular.extend($ctrl, elements);
        }

    }
})();
