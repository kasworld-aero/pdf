(function() {
    'use strict';

    angular
        .module('pdf.viewer')
        .component('pdfViewer', {
            template: ['$templateCache', function($templateCache) {
                return $templateCache.get('pdfViewer/pdfViewer.tpl.html');
            }],
            controller: pdfViewerCtrl,
            bindings: {
                file: '<',
                search: '<',
                next: '<',
                previous: '<',
                onUpdate: '&'
            }
        });

    pdfViewerCtrl.$inject = ['$element', '$log', '$window', '$timeout', 'pdfViewerService'];

    function pdfViewerCtrl($element, $log, $window, $timeout, pdfViewerService) {
        var $ctrl = this;
        var parentClass = 'pdf-viewer-container';
        var mobileClass = 'pdf-viewer__mobile';
        var mobileWidth = 770;


        /****************************************
         *      Controller Attributes           *
         ****************************************/
        $ctrl.pdfAPI = null;
        $ctrl.pdfViewerReady = false;

        /****************************************
         *      Controller API                  *
         ****************************************/
        $ctrl.pdfAPI = {
            file: fileChanged,
            find: findQuery,
            next: nextMatch,
            previous: previousMatch,
        };

        /****************************************
         *      Lifecycle Hooks                 *
         ****************************************/
        $ctrl.$onInit = function() {
            // Add component class
            if (!$element.hasClass('pdf-viewer')) {
                $element.addClass('pdf-viewer');
            }

            // Add container class if class is not already on parent
            var parent = $element.parent();
            if (parent && !parent.hasClass(parentClass)) {
                parent.addClass(parentClass);
            }

            // Apply mobile style if necessary
            checkContainerSize();

            // Set window properties
            $window.onresize = checkContainerSize;
            $window.pdfViewerFileUrl = $ctrl.file || '';
        };

        $ctrl.$onChanges = function(changesObj) {
            if ($ctrl.pdfViewerReady) {
                for (var method in changesObj) {
                    if ($ctrl.pdfAPI.hasOwnProperty(method)) {
                        var arg = changesObj[method].currentValue;
                        $ctrl.pdfAPI[method].call(this, arg);
                    }
                }
                $ctrl.onUpdate();
            } else if (changesObj.file) {
                $ctrl.pdfAPI.file(changesObj.file.currentValue);
            }
            $ctrl.onUpdate();
        };

        $ctrl.$postLink = function() {
            $timeout(function() {
                pdfViewerService.load()
                    .then(function(msg) {
                        getDomElements();
                        $ctrl.pdfViewerReady = true;
                    });
            }, 0);
        };

        /****************************************
         *      API Functions                   *
         ****************************************/
        function fileChanged(file) {
            $window.pdfViewerFileUrl = $ctrl.file;
            if ($window.PDFViewerApplication) {
                PDFViewerApplication.openFileViaURL($ctrl.file);
            }
        }

        function findQuery(query) {
            $ctrl.findInput.value = query;
            PDFViewerApplication.findBar.dispatchEvent('');
        }

        function nextMatch(value) {
            PDFViewerApplication.findBar.dispatchEvent('again', false);
        }

        function previousMatch(value) {
            PDFViewerApplication.findBar.dispatchEvent('again', true);
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

        function checkContainerSize() {
            var isMobile = $element.hasClass(mobileClass);
            var parentWidth = document.querySelector('.' + parentClass).offsetWidth;

            if (!isMobile && parentWidth <= mobileWidth) {
                $element.addClass(mobileClass);
            } else if (isMobile && parentWidth > mobileWidth) {
                $element.removeClass(mobileClass);
            }
        }
    }
})();
