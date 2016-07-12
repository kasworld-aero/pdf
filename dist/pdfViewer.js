(function() {
    'use strict';

    require('angular');
    require('oclazyload');
    var pdf_viewer = angular.module('pdf.viewer', ['oc.lazyLoad']);

    pdf_viewer.config(['pdfViewerServiceProvider',
        function(pdfViewerServiceProvider) {
          pdfViewerServiceProvider.setPath('lib/pdfjs');
    }]);

    module.exports = pdf_viewer;
})();

//HEAD 
(function(app) {
try { app = angular.module("pdf.viewer"); }
catch(err) { app = angular.module("pdf.viewer", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("pdfViewer/pdfViewer.tpl.html","<div class=\"pdf-viewer__viewer\"\n" +
    "    ng-show=\"$ctrl.pdfViewerReady\">\n" +
    "    <div id=\"outerContainer\"\n" +
    "        class=\"pdf-viewer__outer\">\n" +
    "\n" +
    "        <div class=\"pdf-viewer__toolbar\"\n" +
    "            id=\"toolbarViewer\">\n" +
    "            <div class=\"pdf-viewer__toolbar-left\">\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"viewThumbnail\"\n" +
    "                        class=\"pdf-viewer__toolbar-button\"\n" +
    "                        title=\"Toggle Sidebar\">\n" +
    "                        <i class=\"fa fa-th-large\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"viewOutline\"\n" +
    "                        class=\"pdf-viewer__toolbar-button\">\n" +
    "                        <i class=\"fa fa-list\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-separator\">|</div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"zoomIn\"\n" +
    "                        class=\"pdf-viewer__toolbar-button\">\n" +
    "                        <i class=\"fa fa-search-plus\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"zoomOut\"\n" +
    "                        class=\"pdf-viewer__toolbar-button\"><i class=\"fa fa-search-minus\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <div id=\"scaleSelectContainer\"\n" +
    "                        class=\"pdf-viewer__select\">\n" +
    "                        <select name=\"zoom\"\n" +
    "                            id=\"scaleSelect\"\n" +
    "                            title=\"Zoom\">\n" +
    "                            <option id=\"pageFitOption\"\n" +
    "                                title=\"\"\n" +
    "                                value=\"page-fit\"\n" +
    "                                data-l10n-id=\"page_scale_fit\">Page Fit</option>\n" +
    "                            <option id=\"customScaleOption\"\n" +
    "                                title=\"\"\n" +
    "                                value=\"custom\"\n" +
    "                                hidden=\"true\"></option>\n" +
    "                            <option title=\"\"\n" +
    "                                value=\"0.5\"\n" +
    "                                data-l10n-id=\"page_scale_percent\"\n" +
    "                                data-l10n-args='{ \"scale\": 50 }'>50%</option>\n" +
    "                            <option title=\"\"\n" +
    "                                value=\"0.75\"\n" +
    "                                data-l10n-id=\"page_scale_percent\"\n" +
    "                                data-l10n-args='{ \"scale\": 75 }'>75%</option>\n" +
    "                            <option title=\"\"\n" +
    "                                value=\"1\"\n" +
    "                                selected=\"selected\"\n" +
    "                                data-l10n-id=\"page_scale_percent\"\n" +
    "                                data-l10n-args='{ \"scale\": 100 }'>100%</option>\n" +
    "                            <option title=\"\"\n" +
    "                                value=\"1.25\"\n" +
    "                                data-l10n-id=\"page_scale_percent\"\n" +
    "                                data-l10n-args='{ \"scale\": 125 }'>125%</option>\n" +
    "                            <option title=\"\"\n" +
    "                                value=\"1.5\"\n" +
    "                                data-l10n-id=\"page_scale_percent\"\n" +
    "                                data-l10n-args='{ \"scale\": 150 }'>150%</option>\n" +
    "                            <option title=\"\"\n" +
    "                                value=\"2\"\n" +
    "                                data-l10n-id=\"page_scale_percent\"\n" +
    "                                data-l10n-args='{ \"scale\": 200 }'>200%</option>\n" +
    "                            <option title=\"\"\n" +
    "                                value=\"3\"\n" +
    "                                data-l10n-id=\"page_scale_percent\"\n" +
    "                                data-l10n-args='{ \"scale\": 300 }'>300%</option>\n" +
    "                            <option title=\"\"\n" +
    "                                value=\"4\"\n" +
    "                                data-l10n-id=\"page_scale_percent\"\n" +
    "                                data-l10n-args='{ \"scale\": 400 }'>400%</option>\n" +
    "                        </select>\n" +
    "                        <i class=\"fa fa-angle-down\"></i>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"presentationMode\"\n" +
    "                        class=\"pdf-viewer__toolbar-button\">\n" +
    "                        <i class=\"fa fa-arrows-alt\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"pdf-viewer__toolbar-center\">\n" +
    "                <div id=\"documentTitle\"\n" +
    "                    class=\"pdf-viewer__toolbar-item pdf-viewer__toolbar-item--title\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"pdf-viewer__toolbar-right\">\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"print\"\n" +
    "                        class=\"pdf-viewer__toolbar-button\">\n" +
    "                        <i class=\"fa fa-print\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"download\"\n" +
    "                        class=\"pdf-viewer__toolbar-button\">\n" +
    "                        <i class=\"fa fa-download\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__item\">\n" +
    "                    <button id=\"viewFind\"\n" +
    "                        class=\"pdf-viewer__toolbar-button\n" +
    "                            pdf-viewer__toolbar-button--dropdown\"\n" +
    "                        title=\"Find in Document\"><i class=\"fa fa-search\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"secondaryToolbarToggle\"\n" +
    "                        class=\"pdf-viewer__toolbar-button pdf-viewer__toolbar-button--text pdf-viewer__toolbar-button--text pdf-viewer__toolbar-button--dropdown\">more\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- My Toolbar -->\n" +
    "\n" +
    "        <div id=\"secondaryToolbar\"\n" +
    "            class=\"pdf-viewer__toolbar pdf-viewer__toolbar--sub\">\n" +
    "            <div class=\"pdf-viewer__toolbar-left\">\n" +
    "                <div class=\"pdf-viewer__toolbar-item pdf-viewer__toolbar-item--no-space\">\n" +
    "                    <button id=\"firstPage\"\n" +
    "                        class=\"pdf-viewer__toolbar-button pdf-viewer__toolbar-button--text pdf-viewer__toolbar-button--full\">\n" +
    "                        <i class=\"fa fa-chevron-up\"></i> Go to first page\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item pdf-viewer__toolbar-item--no-space\">\n" +
    "                    <button id=\"lastPage\"\n" +
    "                        class=\"pdf-viewer__toolbar-button pdf-viewer__toolbar-button--text pdf-viewer__toolbar-button--full\">\n" +
    "                        <i class=\"fa fa-chevron-down\"></i> Go to last page\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"pdf-viewer__toolbar-item pdf-viewer__toolbar-item--section\">\n" +
    "                    <button id=\"previous\"\n" +
    "                        class=\"pdf-viewer__toolbar-button pdf-viewer__toolbar-button--bg\">\n" +
    "                        <i class=\"fa fa-arrow-up\"></i>\n" +
    "                    </button>\n" +
    "                    <button id=\"next\"\n" +
    "                        class=\"pdf-viewer__toolbar-button pdf-viewer__toolbar-button--bg\">\n" +
    "                        <i class=\"fa fa-arrow-down\"></i>\n" +
    "                    </button>\n" +
    "                    <div class=\"pdf-viewer__toolbar-page\">\n" +
    "                        <label id=\"pageNumberLabel\"\n" +
    "                            for=\"pageNumber\">Page</label>\n" +
    "                        <div class=\"pdf-viewer__input\">\n" +
    "                            <input type=\"number\"\n" +
    "                                name=\"pageNumber\"\n" +
    "                                id=\"pageNumber\"\n" +
    "                                min=\"1\"\n" +
    "                                value=\"1\" />\n" +
    "                        </div>\n" +
    "                        <span id=\"numPages\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"pageRotateCw\"\n" +
    "                        class=\"pdf-viewer__toolbar-button\">\n" +
    "                        <i class=\"fa fa-repeat\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"pageRotateCcw\"\n" +
    "                        class=\"pdf-viewer__toolbar-button\">\n" +
    "                        <i class=\"fa fa-undo\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- My Secondary Toolbar -->\n" +
    "\n" +
    "        <div id=\"findbar\"\n" +
    "            class=\"pdf-viewer__toolbar pdf-viewer__toolbar--sub\">\n" +
    "            <div class=\"pdf-viewer__toolbar-center\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pdf-viewer__toolbar-right\">\n" +
    "                <div class=\"pdf-viewer__toolbar-item pdf-viewer__toolbar-button--text\">\n" +
    "                    <span id=\"findResultsCount\"></span>\n" +
    "                    <span id=\"findMsg\"></span>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <div class=\"pdf-viewer__search\">\n" +
    "                        <input id=\"findInput\"\n" +
    "                            type=\"text\" />\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"findPrevious\"\n" +
    "                        class=\"pdf-viewer__toolbar-button pdf-viewer__toolbar-button--bg\">\n" +
    "                        <i class=\"fa fa-chevron-left\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"findNext\"\n" +
    "                        class=\"pdf-viewer__toolbar-button pdf-viewer__toolbar-button--bg\">\n" +
    "                        <i class=\"fa fa-chevron-right\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"pdf-viewer__toolbar-item\">\n" +
    "                    <button id=\"closeFind\"\n" +
    "                        class=\"pdf-viewer__toolbar-button\">\n" +
    "                        <i class=\"fa fa-close\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!--  Findbar  -->\n" +
    "\n" +
    "        <div id=\"loadingBar\"\n" +
    "            class=\"pdf-viewer__loading\">\n" +
    "            <div class=\"pdf-viewer__progress\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- Loading Bar -->\n" +
    "\n" +
    "        <div id=\"sidebarContainer\"\n" +
    "            class=\"pdf-viewer__sidebar\">\n" +
    "            <div id=\"sidebarContent\">\n" +
    "                <div id=\"thumbnailView\"\n" +
    "                    class=\"pdf-viewer__thumbnail-view\">\n" +
    "                </div>\n" +
    "                <div id=\"outlineView\"\n" +
    "                    class=\"pdf-viewer__outline hidden\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- sidebarContainer -->\n" +
    "\n" +
    "        <div id=\"mainContainer\"\n" +
    "            class=\"pdf-viewer__main\">\n" +
    "\n" +
    "            <div id=\"viewerContainer\">\n" +
    "                <div id=\"viewer\"\n" +
    "                    class=\"viewer\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id=\"errorWrapper\"\n" +
    "                class=\"pdf-viewer__error-box\"\n" +
    "                hidden=\"true\">\n" +
    "                <div id=\"errorMessageLeft\"\n" +
    "                    class=\"pdf-viewer__error-left\">\n" +
    "                    <span id=\"errorMessage\"></span>\n" +
    "                    <button id=\"errorShowMore\"\n" +
    "                        class=\"pdf-viewer__error-btn\"\n" +
    "                        data-l10n-id=\"error_more_info\">\n" +
    "                        More Information\n" +
    "                    </button>\n" +
    "                    <button id=\"errorShowLess\"\n" +
    "                        class=\"pdf-viewer__error-btn\"\n" +
    "                        data-l10n-id=\"error_less_info\"\n" +
    "                        hidden=\"true\">\n" +
    "                        Less Information\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div id=\"errorMessageRight\"\n" +
    "                    class=\"pdf-viewer__error-right\">\n" +
    "                    <button id=\"errorClose\"\n" +
    "                        class=\"pdf-viewer__error-btn\"\n" +
    "                        data-l10n-id=\"error_close\">\n" +
    "                        Close\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"clearBoth\"></div>\n" +
    "                <textarea id=\"errorMoreInfo\"\n" +
    "                    hidden=\"true\"\n" +
    "                    readonly=\"readonly\"></textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- mainContainer -->\n" +
    "    </div>\n" +
    "    <!-- outerContainer -->\n" +
    "\n" +
    "    <div id=\"printContainer\"></div>\n" +
    "    <div id=\"mozPrintCallback-shim\"\n" +
    "        hidden>\n" +
    "        <style>\n" +
    "            @media print {\n" +
    "                #printContainer div {\n" +
    "                    page-break-after: always;\n" +
    "                    page-break-inside: avoid;\n" +
    "                }\n" +
    "            }\n" +
    "        </style>\n" +
    "        <style scoped>\n" +
    "            #mozPrintCallback-shim {\n" +
    "                position: fixed;\n" +
    "                top: 0;\n" +
    "                left: 0;\n" +
    "                height: 100%;\n" +
    "                width: 100%;\n" +
    "                z-index: 9999999;\n" +
    "                display: block;\n" +
    "                text-align: center;\n" +
    "                background-color: rgba(0, 0, 0, 0.5);\n" +
    "            }\n" +
    "\n" +
    "            #mozPrintCallback-shim[hidden] {\n" +
    "                display: none;\n" +
    "            }\n" +
    "\n" +
    "            @media print {\n" +
    "                #mozPrintCallback-shim {\n" +
    "                    display: none;\n" +
    "                }\n" +
    "            }\n" +
    "\n" +
    "            #mozPrintCallback-shim .mozPrintCallback-dialog-box {\n" +
    "                display: inline-block;\n" +
    "                margin: -50px auto 0;\n" +
    "                position: relative;\n" +
    "                top: 45%;\n" +
    "                left: 0;\n" +
    "                min-width: 220px;\n" +
    "                max-width: 400px;\n" +
    "                padding: 9px;\n" +
    "                border: 1px solid hsla(0, 0%, 0%, .5);\n" +
    "                border-radius: 2px;\n" +
    "                background-color: #D8D6D3;\n" +
    "                font-size: 16px;\n" +
    "                line-height: 20px;\n" +
    "            }\n" +
    "\n" +
    "            #mozPrintCallback-shim .progress-row {\n" +
    "                clear: both;\n" +
    "                padding: 1em 0;\n" +
    "            }\n" +
    "\n" +
    "            #mozPrintCallback-shim progress {\n" +
    "                width: 100%;\n" +
    "            }\n" +
    "\n" +
    "            #mozPrintCallback-shim .relative-progress {\n" +
    "                clear: both;\n" +
    "                float: right;\n" +
    "            }\n" +
    "\n" +
    "            #mozPrintCallback-shim .progress-actions {\n" +
    "                clear: both;\n" +
    "            }\n" +
    "        </style>\n" +
    "        <div class=\"mozPrintCallback-dialog-box\">\n" +
    "            <!-- TODO: Localise the following strings -->\n" +
    "            Preparing document for printing...\n" +
    "            <div class=\"progress-row\">\n" +
    "                <progress value=\"0\"\n" +
    "                    max=\"100\"></progress>\n" +
    "                <span class=\"relative-progress\">0%</span>\n" +
    "            </div>\n" +
    "            <div class=\"progress-actions\">\n" +
    "                <input type=\"button\"\n" +
    "                    value=\"Cancel\"\n" +
    "                    class=\"mozPrintCallback-cancel\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- printContainer and shim -->\n" +
    "\n" +
    "    <!-- unused DOM elements that have id bindings in  -->\n" +
    "    <div class=\"hidden\">\n" +
    "        <div id=\"secondaryToolbarButtonContainer\"></div>\n" +
    "        <div id=\"secondaryPresentationMode\"></div>\n" +
    "        <div id=\"presentation_mode\"></div>\n" +
    "        <div id=\"secondaryOpenFile\"></div>\n" +
    "        <div id=\"open_file\"></div>\n" +
    "        <div id=\"secondaryPrint\"></div>\n" +
    "        <div id=\"secondaryDownload\"></div>\n" +
    "        <div id=\"secondaryViewBookmark\"></div>\n" +
    "        <div id=\"bookmark\"></div>\n" +
    "        <div id=\"last_page\"></div>\n" +
    "        <div id=\"toggleHandTool\"></div>\n" +
    "        <div id=\"hand_tool_enable\"></div>\n" +
    "        <div id=\"documentProperties\"></div>\n" +
    "        <div id=\"document_properties\"></div>\n" +
    "        <div id=\"toolbarViewerLeft\"></div>\n" +
    "        <div id=\"toggle_sidebar\"></div>\n" +
    "        <div id=\"toolbarViewerRight\"></div>\n" +
    "        <div id=\"openFile\"></div>\n" +
    "        <div id=\"viewBookmark\"></div>\n" +
    "        <div id=\"tools\"></div>\n" +
    "        <div id=\"toolbarViewerMiddle\"></div>\n" +
    "        <div id=\"pageAutoOption\"></div>\n" +
    "        <div id=\"pageActualOption\"></div>\n" +
    "        <div id=\"pageWidthOption\"></div>\n" +
    "        <div id=\"findHighlightAll\"></div>\n" +
    "        <div id=\"findMatchCase\"></div>\n" +
    "        <div id=\"toolbarSidebar\"></div>\n" +
    "        <div id=\"sidebarToggle\"></div>\n" +
    "        <div id=\"viewAttachments\"></div>\n" +
    "        <div id=\"attachmentsView\"></div>\n" +
    "        <div id=\"viewerContextMenu\"></div>\n" +
    "        <div id=\"contextFirstPage\"></div>\n" +
    "        <div id=\"contextLastPage\"></div>\n" +
    "        <div id=\"contextPageRotateCw\"></div>\n" +
    "        <div id=\"contextPageRotateCcw\"></div>\n" +
    "        <div id=\"overlayContainer\"></div>\n" +
    "        <div id=\"passwordOverlay\"></div>\n" +
    "        <div id=\"passwordText\"></div>\n" +
    "        <div id=\"password\"></div>\n" +
    "        <div id=\"passwordCancel\"></div>\n" +
    "        <div id=\"passwordSubmit\"></div>\n" +
    "        <div id=\"documentPropertiesOverlay\"></div>\n" +
    "        <div id=\"fileNameField\">-</div>\n" +
    "        <div id=\"fileSizeField\">-</div>\n" +
    "        <div id=\"titleField\">-</div>\n" +
    "        <div id=\"authorField\">-</div>\n" +
    "        <div id=\"subjectField\">-</div>\n" +
    "        <div id=\"keywordsField\">-</div>\n" +
    "        <div id=\"creationDateField\">-</div>\n" +
    "        <div id=\"modificationDateField\">-</div>\n" +
    "        <div id=\"creatorField\">-</div>\n" +
    "        <div id=\"producerField\">-</div>\n" +
    "        <div id=\"versionField\">-</div>\n" +
    "        <div id=\"pageCountField\">-</div>\n" +
    "        <div id=\"documentPropertiesClose\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "")
}]);
})();
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

(function() {
    'use strict';

    angular
        .module('pdf.viewer')
        .provider('pdfViewerService', pdfViewerService);

    function pdfViewerService() {

        var provider = this,
            baseUrl = 'pdfjs';

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
                    // insertBefore: '#load_css_before',
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
