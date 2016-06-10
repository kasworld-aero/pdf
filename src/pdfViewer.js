(function() {
    'use strict';

    angular
        .module('pdf.viewer')
        .component('pdfViewer', {
            templateUrl: 'src/pdfViewer.tpl.html',
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

    pdfViewerCtrl.$inject = ['$element', '$log', '$window', 'pdfViewerService'];

    function pdfViewerCtrl($element, $log, $window, pdfViewerService) {
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
        $ctrl.$onInit = init;

        function init() {
            console.log('👊 activating component');
            pdfViewerService.load()
                .then(function(msg) {
                    getDomElements();
                    $ctrl.ready = true;
                });
        }

        $ctrl.$onChanges = function(changesObj) {

            if (changesObj.file) {
                $window.pdfViewerFileUrl = $ctrl.file;
                if ($window.PDFViewerApplication) {
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

            Object.keys(elements).forEach(function(key) {
                elements[key] = document.getElementById(key);
            });

            angular.extend($ctrl, elements);
        }

    }
})();
