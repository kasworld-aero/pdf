(function() {
    'use strict';

    require('lodash');
    var pdfViewer = {
        templateUrl: 'tpl/pdf-viewer.tpl.html',
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

    pdfViewerCtrl.$inject = ['$ocLazyLoad', '$q', 'pdfViewerService'];

    function pdfViewerCtrl($ocLazyLoad, $q, pdfViewerService) {
        var $ctrl = this;

        /****************************************
         *      Controller Attributes           *
         ****************************************/

        /****************************************
         *      Controller API                  *
         ****************************************/

        /****************************************
         *      Lifecycle Hooks                 *
         ****************************************/
        $ctrl.$onInit = init;

        function init() {
            console.log('👊 activating component');

            pdfViewerService.load().then(function(msg) {
                console.log(msg);
                getDomElements();
                $ctrl.ready = true;
            });

        }

        $ctrl.$onChanges = function(changesObj) {
            if (changesObj.file) {
                updateUrl();
            }

            if ($ctrl.ready) {
                if (angular.isDefined(changesObj.search)) {
                    $ctrl.find($ctrl.search);
                }

                if (angular.isDefined(changesObj.highlight)) {
                    $ctrl.highlightAll($ctrl.highlight);
                }

                if (angular.isDefined(changesObj.fullscreen)) {
                    $ctrl.enterFullscreen();
                }

                if (angular.isDefined(changesObj.next)) {
                    $ctrl.nextMatch();
                }

                if (angular.isDefined(changesObj.prev)) {
                    $ctrl.prevMatch();
                }

                $ctrl.onUpdate();
            }
        };

        function updateUrl() {
            if ($ctrl.file && window.PDFViewerApplication) {
                PDFViewerApplication.openFileViaURL($ctrl.file);
            }
        }

        /****************************************
         *      API Functions                   *
         ****************************************/
        var api = {
            find: find,
            nextMatch: nextMatch,
            previousMatch: previousMatch,
            highlightAll: highlightAll,
            enterFullscreen: enterFullscreen
        };

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

         angular.extend($ctrl, api);

        /****************************************
         *      Private Functions               *
         ****************************************/

        // get document elements
        function getDomElements() {
            var keys = [
                'findInput',
                'findHighlightAll',
                'presentationMode'
            ];
            var elements = _.zipObject(keys, _.map(keys, function(id) {
                return document.getElementById(id);
            }));
            angular.extend($ctrl, elements);
        }

    }

    module.exports = pdfViewer;
}());
