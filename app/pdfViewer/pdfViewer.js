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

    pdfViewerCtrl.$inject = ['$element', '$sce', '$q'];

    function pdfViewerCtrl($element, $sce, $q) {
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
                var iframe = $element[0].firstChild;

                iframe.onload = function() {
                    $ctrl.PDFViewer = iframe.contentWindow.PDFViewerApplication;

                    // get document elements
                    var content = iframe.contentWindow;
                    var keys = [
                        'findInput',
                        'findHighlightAll',
                        'findNext',
                        'findPrevious'
                    ];
                    var elements = _.zipObject(keys, _.map(keys, function(id) {
                        return content.document.getElementById(id);
                    }));
                    console.log(elements);
                    _.assign(ctrlApi, elements);

                    deferred.resolve(true);
                };

                return deferred.promise;
            },

            // Action Methods
            find: function(q) {
                this.findInput.value = q;
                $ctrl.PDFViewer.findBar.dispatchEvent('');
            },
            nextMatch: function() {
                $ctrl.PDFViewer.findBar.dispatchEvent('again', false);
            },
            prevMatch: function() {
                this.findPrevious.click();
                $ctrl.PDFViewer.findBar.dispatchEvent('again', true);
            },
            highlightAll: function(highlight) {
                this.findHighlightAll.checked = highlight;
                $ctrl.PDFViewer.findBar.dispatchEvent('highlightallchange');
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
