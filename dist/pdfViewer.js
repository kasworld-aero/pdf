(function() {
    'use strict';

    require('angular');
    require('oclazyload');
    var pdfViewer = angular.module('pdf.viewer', ['oc.lazyLoad']);

    module.exports = pdfViewer;
})();

//HEAD 
(function(app) {
try { app = angular.module("pdf.viewer"); }
catch(err) { app = angular.module("pdf.viewer", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("pdfViewer/pdfViewer.tpl.html","<div dir=\"ltr\"\n" +
    "    class=\"viewer\">\n" +
    "    <section tabindex=\"1\"\n" +
    "        class=\"loadingInProgress\">\n" +
    "        <div id=\"outerContainer\"\n" +
    "            class=\"outer\">\n" +
    "\n" +
    "            <div class=\"toolbar\"\n" +
    "                id=\"toolbarViewer\">\n" +
    "                <div class=\"toolbar__left\">\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"sidebarToggle\"\n" +
    "                            class=\"toolbar__button\"\n" +
    "                            title=\"Toggle Sidebar\">\n" +
    "                            <i class=\"fa fa-th-large\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-list\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__separator\">|</div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"zoomIn\"\n" +
    "                            class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-search-plus\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"zoomOut\"\n" +
    "                            class=\"toolbar__button\"><i class=\"fa fa-search-minus\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"scaleSelectContainer\"\n" +
    "                            class=\"select select-small\">\n" +
    "                            <select name=\"zoom\"\n" +
    "                                id=\"scaleSelect\"\n" +
    "                                title=\"Zoom\">\n" +
    "                                <option title=\"\"\n" +
    "                                    value=\"0.5\"\n" +
    "                                    data-l10n-id=\"page_scale_percent\"\n" +
    "                                    data-l10n-args='{ \"scale\": 50 }'>50%</option>\n" +
    "                                <option value=\"0.75\"\n" +
    "                                    data-l10n-id=\"page_scale_percent\"\n" +
    "                                    data-l10n-args='{ \"scale\": 75 }'>75%</option>\n" +
    "                                <option title=\"\"\n" +
    "                                    value=\"1\"\n" +
    "                                    selected=\"selected\"\n" +
    "                                    data-l10n-id=\"page_scale_percent\"\n" +
    "                                    data-l10n-args='{ \"scale\": 100 }'>100%</option>\n" +
    "                                <option title=\"\"\n" +
    "                                    value=\"1.25\"\n" +
    "                                    data-l10n-id=\"page_scale_percent\"\n" +
    "                                    data-l10n-args='{ \"scale\": 125 }'>125%</option>\n" +
    "                                <option title=\"\"\n" +
    "                                    value=\"1.5\"\n" +
    "                                    data-l10n-id=\"page_scale_percent\"\n" +
    "                                    data-l10n-args='{ \"scale\": 150 }'>150%</option>\n" +
    "                                <option title=\"\"\n" +
    "                                    value=\"2\"\n" +
    "                                    data-l10n-id=\"page_scale_percent\"\n" +
    "                                    data-l10n-args='{ \"scale\": 200 }'>200%</option>\n" +
    "                                <option title=\"\"\n" +
    "                                    value=\"3\"\n" +
    "                                    data-l10n-id=\"page_scale_percent\"\n" +
    "                                    data-l10n-args='{ \"scale\": 300 }'>300%</option>\n" +
    "                                <option title=\"\"\n" +
    "                                    value=\"4\"\n" +
    "                                    data-l10n-id=\"page_scale_percent\"\n" +
    "                                    data-l10n-args='{ \"scale\": 400 }'>400%</option>\n" +
    "                            </select>\n" +
    "                            <i class=\"fa fa-angle-down\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"presentationMode\"\n" +
    "                            class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-arrows-alt\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"toolbar__center\">\n" +
    "                    <div class=\"toolbar__item toolbar__item--title\">\n" +
    "                        <span id=\"documentTitle\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"toolbar__right\">\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"print\"\n" +
    "                            class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-print\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"download\"\n" +
    "                            class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-download\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"viewFind\"\n" +
    "                            class=\"toolbar__button toolbar__button--dropdown\"\n" +
    "                            title=\"Find in Document\"><i class=\"fa fa-search\"></i></div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"secondaryToolbarToggle\"\n" +
    "                            class=\"toolbar__button toolbar__button--text toolbar__button--text toolbar__button--dropdown\">more\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- My Toolbar -->\n" +
    "\n" +
    "            <!--  MORE  -->\n" +
    "            <div id=\"secondaryToolbar\"\n" +
    "                class=\"toolbar toolbar--sub\">\n" +
    "                <div class=\"toolbar__left\">\n" +
    "                    <div class=\"toolbar__item toolbar__item--no-space\">\n" +
    "                        <div id=\"firstPage\"\n" +
    "                            class=\"toolbar__button toolbar__button--text toolbar__button--full\">\n" +
    "                            <i class=\"fa fa-chevron-up\"></i> Go to first page\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item toolbar__item--no-space\">\n" +
    "                        <div id=\"lastPage\"\n" +
    "                            class=\"toolbar__button toolbar__button--text toolbar__button--full\">\n" +
    "                            <i class=\"fa fa-chevron-down\"></i> Go to last page\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"toolbar__item toolbar__item--section\">\n" +
    "                        <div id=\"previous\"\n" +
    "                            class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-arrow-up\"></i>\n" +
    "                        </div>\n" +
    "                        <div id=\"next\"\n" +
    "                            class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-arrow-down\"></i>\n" +
    "                        </div>\n" +
    "                        <div class=\"toolbar__page\">\n" +
    "                            <label id=\"pageNumberLabel\"\n" +
    "                                for=\"pageNumber\">Page</label>\n" +
    "                            <div class=\"input\">\n" +
    "                                <input type=\"number\"\n" +
    "                                    name=\"pageNumber\"\n" +
    "                                    id=\"pageNumber\"\n" +
    "                                    min=\"1\"\n" +
    "                                    value=\"1\" />\n" +
    "                            </div>\n" +
    "                            <span id=\"numPages\"></span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"pageRotateCw\"\n" +
    "                            class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-repeat\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"pageRotateCcw\"\n" +
    "                            class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-undo\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- My Secondary Toolbar -->\n" +
    "\n" +
    "\n" +
    "            <div id=\"findbar\"\n" +
    "                class=\"toolbar toolbar--sub\">\n" +
    "                <div class=\"toolbar__center\">\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"toolbar__right\">\n" +
    "                    <div class=\"toolbar__item toolbar__button--text\">\n" +
    "                        <span id=\"findResultsCount\"></span>\n" +
    "                        <span id=\"findMsg\"></span>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div class=\"search\">\n" +
    "                            <input id=\"findInput\"\n" +
    "                                type=\"text\" />\n" +
    "                            <i class=\"search__pending fa fa-refresh fa-spin\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"findPrevious\"\n" +
    "                            class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-chevron-left\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"findNext\"\n" +
    "                            class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-chevron-right\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"toolbar__item\">\n" +
    "                        <div id=\"closeFind\"\n" +
    "                            class=\"toolbar__button\">\n" +
    "                            <i class=\"fa fa-close\"></i>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!--  Findbar  -->\n" +
    "\n" +
    "\n" +
    "            <div id=\"loadingBar\"\n" +
    "                class=\"loading\">\n" +
    "                <div class=\"progress loading__progress\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- Loading Bar -->\n" +
    "\n" +
    "            <div id=\"sidebarContainer\"\n" +
    "                class=\"sidebar\">\n" +
    "                <div id=\"sidebarContent\"\n" +
    "                    class=\"sidebar__content\">\n" +
    "                    <div id=\"thumbnailView\">\n" +
    "                    </div>\n" +
    "                    <div id=\"outlineView\"\n" +
    "                        class=\"hidden\">\n" +
    "                    </div>\n" +
    "                    <div id=\"attachmentsView\"\n" +
    "                        class=\"hidden\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- sidebarContainer -->\n" +
    "\n" +
    "            <div id=\"mainContainer\"\n" +
    "                class=\"main\">\n" +
    "\n" +
    "\n" +
    "                <menu type=\"context\"\n" +
    "                    id=\"viewerContextMenu\">\n" +
    "                    <menuitem id=\"contextFirstPage\"\n" +
    "                        label=\"First Page\"\n" +
    "                        data-l10n-id=\"first_page\"></menuitem>\n" +
    "                    <menuitem id=\"contextLastPage\"\n" +
    "                        label=\"Last Page\"\n" +
    "                        data-l10n-id=\"last_page\"></menuitem>\n" +
    "                    <menuitem id=\"contextPageRotateCw\"\n" +
    "                        label=\"Rotate Clockwise\"\n" +
    "                        data-l10n-id=\"page_rotate_cw\"></menuitem>\n" +
    "                    <menuitem id=\"contextPageRotateCcw\"\n" +
    "                        label=\"Rotate Counter-Clockwise\"\n" +
    "                        data-l10n-id=\"page_rotate_ccw\"></menuitem>\n" +
    "                </menu>\n" +
    "\n" +
    "                <div id=\"viewerContainer\"\n" +
    "                    tabindex=\"0\">\n" +
    "                    <div id=\"viewer\"\n" +
    "                        class=\"pdfViewer\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div id=\"errorWrapper\"\n" +
    "                    hidden=\"true\">\n" +
    "                    <div id=\"errorMessageLeft\">\n" +
    "                        <span id=\"errorMessage\"></span>\n" +
    "                        <button id=\"errorShowMore\"\n" +
    "                            data-l10n-id=\"error_more_info\">\n" +
    "                            More Information\n" +
    "                        </button>\n" +
    "                        <button id=\"errorShowLess\"\n" +
    "                            data-l10n-id=\"error_less_info\"\n" +
    "                            hidden=\"true\">\n" +
    "                            Less Information\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                    <div id=\"errorMessageRight\">\n" +
    "                        <button id=\"errorClose\"\n" +
    "                            data-l10n-id=\"error_close\">\n" +
    "                            Close\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                    <div class=\"clearBoth\"></div>\n" +
    "                    <textarea id=\"errorMoreInfo\"\n" +
    "                        hidden=\"true\"\n" +
    "                        readonly=\"readonly\"></textarea>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- mainContainer -->\n" +
    "\n" +
    "            <div id=\"overlayContainer\"\n" +
    "                class=\"hidden\">\n" +
    "                <div id=\"passwordOverlay\"\n" +
    "                    class=\"container hidden\">\n" +
    "                    <div class=\"dialog\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <p id=\"passwordText\"\n" +
    "                                data-l10n-id=\"password_label\">Enter the password to open this PDF file:</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <!-- The type=\"password\" attribute is set via script, to prevent warnings in Firefox for all http:// documents. -->\n" +
    "                            <input id=\"password\"\n" +
    "                                class=\"toolbarField\">\n" +
    "                        </div>\n" +
    "                        <div class=\"buttonRow\">\n" +
    "                            <button id=\"passwordCancel\"\n" +
    "                                class=\"overlayButton\"><span data-l10n-id=\"password_cancel\">Cancel</span></button>\n" +
    "                            <button id=\"passwordSubmit\"\n" +
    "                                class=\"overlayButton\"><span data-l10n-id=\"password_ok\">OK</span></button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"documentPropertiesOverlay\"\n" +
    "                    class=\"container hidden\">\n" +
    "                    <div class=\"dialog\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_file_name\">File name:</span>\n" +
    "                            <p id=\"fileNameField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_file_size\">File size:</span>\n" +
    "                            <p id=\"fileSizeField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"separator\"></div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_title\">Title:</span>\n" +
    "                            <p id=\"titleField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_author\">Author:</span>\n" +
    "                            <p id=\"authorField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_subject\">Subject:</span>\n" +
    "                            <p id=\"subjectField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_keywords\">Keywords:</span>\n" +
    "                            <p id=\"keywordsField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_creation_date\">Creation Date:</span>\n" +
    "                            <p id=\"creationDateField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_modification_date\">Modification Date:</span>\n" +
    "                            <p id=\"modificationDateField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_creator\">Creator:</span>\n" +
    "                            <p id=\"creatorField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"separator\"></div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_producer\">PDF Producer:</span>\n" +
    "                            <p id=\"producerField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_version\">PDF Version:</span>\n" +
    "                            <p id=\"versionField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_page_count\">Page Count:</span>\n" +
    "                            <p id=\"pageCountField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"buttonRow\">\n" +
    "                            <button id=\"documentPropertiesClose\"\n" +
    "                                class=\"overlayButton\"><span data-l10n-id=\"document_properties_close\">Close</span></button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- overlayContainer -->\n" +
    "\n" +
    "        </div>\n" +
    "        <!-- outerContainer -->\n" +
    "        <div id=\"printContainer\"></div>\n" +
    "        <div id=\"mozPrintCallback-shim\"\n" +
    "            hidden>\n" +
    "            <style>\n" +
    "                @media print {\n" +
    "                    #printContainer div {\n" +
    "                        page-break-after: always;\n" +
    "                        page-break-inside: avoid;\n" +
    "                    }\n" +
    "                }\n" +
    "            </style>\n" +
    "            <style scoped>\n" +
    "                #mozPrintCallback-shim {\n" +
    "                    position: fixed;\n" +
    "                    top: 0;\n" +
    "                    left: 0;\n" +
    "                    height: 100%;\n" +
    "                    width: 100%;\n" +
    "                    z-index: 9999999;\n" +
    "                    display: block;\n" +
    "                    text-align: center;\n" +
    "                    background-color: rgba(0, 0, 0, 0.5);\n" +
    "                }\n" +
    "\n" +
    "                #mozPrintCallback-shim[hidden] {\n" +
    "                    display: none;\n" +
    "                }\n" +
    "\n" +
    "                @media print {\n" +
    "                    #mozPrintCallback-shim {\n" +
    "                        display: none;\n" +
    "                    }\n" +
    "                }\n" +
    "\n" +
    "                #mozPrintCallback-shim .mozPrintCallback-dialog-box {\n" +
    "                    display: inline-block;\n" +
    "                    margin: -50px auto 0;\n" +
    "                    position: relative;\n" +
    "                    top: 45%;\n" +
    "                    left: 0;\n" +
    "                    min-width: 220px;\n" +
    "                    max-width: 400px;\n" +
    "                    padding: 9px;\n" +
    "                    border: 1px solid hsla(0, 0%, 0%, .5);\n" +
    "                    border-radius: 2px;\n" +
    "                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);\n" +
    "                    background-color: #474747;\n" +
    "                    color: hsl(0, 0%, 85%);\n" +
    "                    font-size: 16px;\n" +
    "                    line-height: 20px;\n" +
    "                }\n" +
    "\n" +
    "                #mozPrintCallback-shim .progress-row {\n" +
    "                    clear: both;\n" +
    "                    padding: 1em 0;\n" +
    "                }\n" +
    "\n" +
    "                #mozPrintCallback-shim progress {\n" +
    "                    width: 100%;\n" +
    "                }\n" +
    "\n" +
    "                #mozPrintCallback-shim .relative-progress {\n" +
    "                    clear: both;\n" +
    "                    float: right;\n" +
    "                }\n" +
    "\n" +
    "                #mozPrintCallback-shim .progress-actions {\n" +
    "                    clear: both;\n" +
    "                }\n" +
    "            </style>\n" +
    "            <div class=\"mozPrintCallback-dialog-box\">\n" +
    "                <!-- TODO: Localise the following strings -->\n" +
    "                Preparing document for printing...\n" +
    "                <div class=\"progress-row\">\n" +
    "                    <progress value=\"0\"\n" +
    "                        max=\"100\"></progress>\n" +
    "                    <span class=\"relative-progress\">0%</span>\n" +
    "                </div>\n" +
    "                <div class=\"progress-actions\">\n" +
    "                    <input type=\"button\"\n" +
    "                        value=\"Cancel\"\n" +
    "                        class=\"mozPrintCallback-cancel\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"hidden\">\n" +
    "    <!-- <div id=\"secondaryToolbar\"></div> -->\n" +
    "    <div id=\"secondaryToolbarButtonContainer\"></div>\n" +
    "    <div id=\"secondaryPresentationMode\"></div>\n" +
    "    <div id=\"presentation_mode\"></div>\n" +
    "    <div id=\"secondaryOpenFile\"></div>\n" +
    "    <div id=\"open_file\"></div>\n" +
    "    <div id=\"secondaryPrint\"></div>\n" +
    "    <!-- <div id=\"print\"></div> -->\n" +
    "    <div id=\"secondaryDownload\"></div>\n" +
    "    <!-- <div id=\"download\"></div> -->\n" +
    "    <div id=\"secondaryViewBookmark\"></div>\n" +
    "    <div id=\"bookmark\"></div>\n" +
    "    <!-- <div id=\"firstPage\"></div> -->\n" +
    "    <!-- <div id=\"first_page\"></div> -->\n" +
    "    <!-- <div id=\"lastPage\"></div> -->\n" +
    "    <div id=\"last_page\"></div>\n" +
    "    <!-- <div id=\"pageRotateCw\"></div> -->\n" +
    "    <!-- <div id=\"pageRotateCcw\"></div> -->\n" +
    "    <div id=\"toggleHandTool\"></div>\n" +
    "    <div id=\"hand_tool_enable\"></div>\n" +
    "    <div id=\"documentProperties\"></div>\n" +
    "    <div id=\"document_properties\"></div>\n" +
    "    <!-- <div id=\"toolbarContainer\"></div> -->\n" +
    "    <!-- <div id=\"toolbarViewer\"></div> -->\n" +
    "    <div id=\"toolbarViewerLeft\"></div>\n" +
    "    <!-- <div id=\"sidebarToggle\"></div> -->\n" +
    "    <div id=\"toggle_sidebar\"></div>\n" +
    "    <!-- <div id=\"viewFind\"></div> -->\n" +
    "    <!-- <div id=\"findbar\"></div> -->\n" +
    "    <!-- <div id=\"previous\"></div> -->\n" +
    "    <!-- <div id=\"previous\"></div> -->\n" +
    "    <!-- <div id=\"next\"></div> -->\n" +
    "    <!-- <div id=\"next\"></div> -->\n" +
    "    <!-- <div id=\"pageNumberLabel\"></div> -->\n" +
    "    <!-- <div id=\"pageNumber\"></div> -->\n" +
    "    <!-- <div id=\"numPages\"></div> -->\n" +
    "    <div id=\"toolbarViewerRight\"></div>\n" +
    "    <!-- <div id=\"presentationMode\"></div> -->\n" +
    "    <!-- <div id=\"presentation_mode\"></div> -->\n" +
    "    <div id=\"openFile\"></div>\n" +
    "    <!-- <div id=\"print\"></div> -->\n" +
    "    <!-- <div id=\"print\"></div> -->\n" +
    "    <!-- <div id=\"download\"></div> -->\n" +
    "    <!-- <div id=\"download\"></div> -->\n" +
    "    <div id=\"viewBookmark\"></div>\n" +
    "    <!-- <div id=\"bookmark\"></div> -->\n" +
    "    <!-- <div id=\"secondaryToolbarToggle\"></div> -->\n" +
    "    <div id=\"tools\"></div>\n" +
    "    <div id=\"toolbarViewerMiddle\"></div>\n" +
    "    <!-- <div id=\"zoomIn\"></div> -->\n" +
    "    <!-- <div id=\"scaleSelectContainer\"></div> -->\n" +
    "    <!-- <div id=\"scaleSelect\"></div> -->\n" +
    "    <div id=\"pageAutoOption\"></div>\n" +
    "    <div id=\"pageActualOption\"></div>\n" +
    "    <div id=\"pageFitOption\"></div>\n" +
    "    <div id=\"pageWidthOption\"></div>\n" +
    "    <div id=\"customScaleOption\"></div>\n" +
    "    <!-- <div id=\"loadingBar\"></div> -->\n" +
    "    <div id=\"findHighlightAll\"></div>\n" +
    "    <div id=\"findMatchCase\"></div>\n" +
    "    <!-- <div id=\"findResultsCount\"></div> -->\n" +
    "    <!-- <div id=\"findMsg\"></div> -->\n" +
    "\n" +
    "    <div id=\"toolbarSidebar\"></div>\n" +
    "    <div id=\"viewThumbnail\"></div>\n" +
    "    <div id=\"viewOutline\"></div>\n" +
    "    <div id=\"viewAttachments\"></div>\n" +
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
