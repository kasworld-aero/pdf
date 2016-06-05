(function() {
    'use strict';

    require('lodash');
    var pdfViewer = {
        templateUrl: 'tpl/pdf-viewer.tpl.html',
        controller: pdfViewerCtrl,
        bindings: {
            baseUrl: '<',
            file: '<',
            fullscreen: '<',
            highlight: '<',
            search: '<',
            onUpdate: '&'
        }
    };

    pdfViewerCtrl.$inject = ['$element', '$ocLazyLoad', '$q',  '$sce'];

    function pdfViewerCtrl($element, $ocLazyLoad, $q, $sce) {
        var $ctrl = this;

        // Attribute Properties with defaults
        $ctrl.baseUrl = $ctrl.baseUrl || '/pdfjs/web/viewer.html';
        $ctrl.fullscreen = $ctrl.fullscreen || false;
        $ctrl.file = $ctrl.file || '/pdfjs/web/compressed.tracemonkey-pldi-09.pdf';
        $ctrl.height = $ctrl.height || '800px';
        $ctrl.highlight = $ctrl.highlight || false;
        $ctrl.onUpdate = $ctrl.onUpdate || function() {};

        // Computed Properties
        $ctrl.fileUrl = buildUrl();


        // Update on data change
        $ctrl.$onChanges = function(changesObj) {
            console.log('PDF Viewer changed: ', changesObj);
            update(changesObj);
        };

        function update(changes) {
            if (changes.file) {
                $ctrl.fileUrl = buildUrl();
            }

            if ($ctrl.ready) {
                if (changes.search) {
                    $ctrl.find($ctrl.search);
                }

                if (changes.highlight) {
                    $ctrl.highlightAll($ctrl.highlight);
                }

                if (changes.fullscreen) {
                    $ctrl.enterFullscreen();
                }
            }

            if ($ctrl.onUpdate) {
                $ctrl.onUpdate();
            }
        }

        // construct a TRUSTED URL for the iframe
        function buildUrl() {
            var url = $ctrl.baseUrl + '?file=' + encodeURIComponent($ctrl.file);
            console.log(url);
            return $sce.trustAsResourceUrl(url);
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
                        'findNext',
                        'findPrevious',
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
                this.findPrevious.click();
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

            // DEMO
            // findNext();
            // cycleFind();
        });


        /* DEMO STUFF */
        function cycleFind() {
            var find = ['nonlinear', 'vibration', 'duffing'],
                index = 0,
                i = 0;
            setInterval(function() {
                $ctrl.find(find[index]);
                index = i++ % find.length;
                console.log(find[index], index);
            }, 2000);
        }

        function findNext() {
            $ctrl.find('nonlinear');
            setInterval(function() {
                $ctrl.prevMatch();
            }, 2000);
        }

    }

    module.exports = pdfViewer;
}());
