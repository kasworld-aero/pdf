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
            prev: '<',
            onUpdate: '&'
        }
    };

    pdfViewerCtrl.$inject = ['$element', '$ocLazyLoad', '$q', '$sce'];

    function pdfViewerCtrl($element, $ocLazyLoad, $q, $sce) {
        var $ctrl = this;
        window.pdfFileUrl = $ctrl.file;

        // Attribute Properties with defaults
        $ctrl.fullscreen = $ctrl.fullscreen || false;
        $ctrl.height = $ctrl.height || '800px';
        $ctrl.highlight = $ctrl.highlight || false;
        $ctrl.onUpdate = $ctrl.onUpdate || function() {};

        // Update on data change
        $ctrl.$onChanges = function(changesObj) {
            // console.log('PDF Viewer changed: ', changesObj);
            updateViewer(changesObj);
        };

        function updateViewer(changes) {
            if (changes.file) {
                updateUrl();
            }

            if ($ctrl.ready) {
                if (angular.isDefined(changes.search)) {
                    $ctrl.find($ctrl.search);
                }

                if (angular.isDefined(changes.highlight)) {
                    $ctrl.highlightAll($ctrl.highlight);
                }

                if (angular.isDefined(changes.fullscreen)) {
                    $ctrl.enterFullscreen();
                }

                if (angular.isDefined(changes.next)) {
                    $ctrl.nextMatch();
                }

                if (angular.isDefined(changes.prev)) {
                    $ctrl.prevMatch();
                }
            }

            $ctrl.onUpdate();
        }

        function updateUrl() {
            if ($ctrl.file && window.PDFViewerApplication) {
                PDFViewerApplication.openFileViaURL($ctrl.file);
            }
        }


        // Viewer API
        var ctrlApi = {

            // API Properties
            ready: false,
            findInput: null,
            findHighlightAll: null,
            findNext: null,
            findPrevious: null,

            // Attach DOM elements to API
            init: function() {
                var ctrlApi = this;
                var deferred = $q.defer();

                //load script
                loadl10n('js/pdf/locale/locale.properties',
                    $ocLazyLoad.load({
                        insertBefore: '#load_css_before',
                        files: [
                            'css/viewer.css',
                            'js/pdf/compatibility.js',
                            'js/pdf/l10n.js',
                            'js/pdf/pdf.js',
                            'js/pdf/viewer.js'
                        ]
                    }).then(getDomElements)
                );


                /* Init Helper Functions */

                // needed to create custom link element for l10n resource
                function loadl10n(href, callback) {
                    var link = document.createElement('link');
                    var loaded = false;
                    link.setAttribute('rel', 'resource');
                    link.setAttribute('type', 'application/l10n');
                    link.setAttribute('href', href);
                    if (callback) {
                        link.onload = function() {
                            if (!loaded) {
                                callback();
                            }
                            loaded = true;
                        };
                    }
                    document.getElementsByTagName('head')[0].appendChild(link);
                }

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
                    console.log(elements);
                    _.assign(ctrlApi, elements);

                    deferred.resolve(true);
                }

                return deferred.promise;
            },


            // API Action Methods
            find: function(q) {
                this.findInput.value = q;
                PDFViewerApplication.findBar.dispatchEvent('');
            },
            nextMatch: function() {
                PDFViewerApplication.findBar.dispatchEvent('again', false);
            },
            prevMatch: function() {
                PDFViewerApplication.findBar.dispatchEvent('again', true);
            },
            highlightAll: function(highlight) {
                this.findHighlightAll.checked = highlight;
                PDFViewerApplication.findBar.dispatchEvent('highlightallchange');
            },
            enterFullscreen: function() {
                this.presentationMode.click();
            }
        };

        // Attach API to the $ctrl
        _.assign($ctrl, ctrlApi);
        $ctrl.init().then(function(isReady) {
            $ctrl.ready = isReady;
        });

    }

    module.exports = pdfViewer;
}());
