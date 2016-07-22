(function() {
    'use strict';

    angular.module('pdf.viewer')
        .component('pdfViewer', {
            template: ['$templateCache', function($templateCache) {
                return $templateCache.get('pdfViewer/pdfViewer.tpl.html');
            }],
            controller: pdfViewerCtrl,
            bindings: {
                // INPUTS
                // must be the same name as the $ctrl.pdfAPI keys
                file: '<',
                search: '<',
                next: '<',
                previous: '<',

                // OUTPUTS
                onUpdate: '&'
            }
        });

    pdfViewerCtrl.$inject = ['$element', '$timeout','$window', 'pdfViewerService'];

    function pdfViewerCtrl($element, $timeout, $window, pdfViewerService) {

        /****************************************
         *          Local Variabls              *
         ****************************************/
        var $ctrl = this;
        var MOBILE_WIDTH = 770;
        var parentClass = 'pdf-viewer-container';
        var mobileClass = 'pdf-viewer__mobile';


        /****************************************
         *        Controller Attributes         *
         ****************************************/
        $ctrl.pdfAPI = null;
        $ctrl.pdfViewerReady = false;

        /****************************************
         *           Controller API             *
         ****************************************/

        // must have the same name as the input bindings
        $ctrl.pdfAPI = {
            file: fileChanged,
            search: searchQuery,
            next: nextMatch,
            previous: previousMatch,
        };

        /****************************************
         *            Lifecycle Hooks           *
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

            /**
             * the method in pdfAPI with the same name. For this to work,
             * the input bindings and pdfAPI methods must have the same key name
             */
            if ($ctrl.pdfViewerReady) {
                for (var method in changesObj) {
                    if ($ctrl.pdfAPI.hasOwnProperty(method)) {
                        var arg = changesObj[method].currentValue;
                        $ctrl.pdfAPI[method].call(this, arg);
                    }
                }
            } else if (changesObj.file) {
                // pdfViewer does not need to be ready to update the file
                $ctrl.pdfAPI.file(changesObj.file.currentValue);
            }

            // notify other components the viewer has been updated
            $ctrl.onUpdate();
        };

        $ctrl.$postLink = function() {
            $timeout(function() {
                /**
                 * 1. Load external assest
                 * 2. Link DOM Elements to API functions
                 */
                pdfViewerService.load()
                    .then(function(msg) {
                        getDomElements();
                        $ctrl.pdfViewerReady = true;
                    });
            }, 0);
        };

        $ctrl.$onDestroy = function() {
            PDFViewerApplication.close();
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

        function searchQuery(query) {
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
                'findInput': null
            };

            Object.keys(elements)
                .forEach(function(key) {
                    elements[key] = document.getElementById(key);
                });

            angular.extend($ctrl, elements);
        }

        /**
         * This function is called when the screen is resized.
         * It checks to see if the parent container is smaller than
         * the MOBILE_WIDTH value. If so, apply a mobile styling to
         * the viewer.
         *
         * @return {function}
         */
        function checkContainerSize() {
            var isMobile = $element.hasClass(mobileClass);
            var parentWidth = document.querySelector('.' + parentClass).offsetWidth;
            if (!isMobile && parentWidth <= MOBILE_WIDTH) {
                $element.addClass(mobileClass);
            } else if (isMobile && parentWidth > MOBILE_WIDTH) {
                $element.removeClass(mobileClass);
            }
        }
    }
})();
