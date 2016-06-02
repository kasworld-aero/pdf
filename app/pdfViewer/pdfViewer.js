(function() {
    'use strict';

    require('lodash');
    var pdfViewer = {
        templateUrl: 'tpl/pdf-viewer.tpl.html',
        controller: pdfViewerCtrl,
        bindings: {
            baseUrl: '<',
            file: '<',
            find: '<',
            highlight: '<',
            fullscreen: '<',
            onUpdate: '&'
        }
    };

    pdfViewerCtrl.$inject = ['$element', '$sce', '$q'];

    function pdfViewerCtrl($element, $sce, $q) {
        var $ctrl = this;

        $ctrl.title = 'PDF Viewer';
        $ctrl.height = $ctrl.height || '800px';
        $ctrl.fullscreen = $ctrl.fullscreen || false;

        $ctrl.baseUrl = $ctrl.baseUrl || '/pdfjs/web/viewer.html';
        $ctrl.file = $ctrl.file || '/pdfjs/web/compressed.tracemonkey-pldi-09.pdf';
        $ctrl.fileUrl = buildUrl();

        $ctrl.$onChanges = function(changesObj) {
            console.log('PDF Viewer changed: ', changesObj);
            update(changesObj);
        };

        function buildUrl() {
            var url = $ctrl.baseUrl + '?file=' + encodeURIComponent($ctrl.file);
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function update(changes) {
            if (changes.file) {
                $ctrl.fileUrl = buildUrl();
            }

            if ($ctrl.viewer.ready) {
                if (changes.find) {
                    $ctrl.viewer.find($ctrl.find);
                }

                if (changes.highlight) {
                    $ctrl.viewer.highlightAll($ctrl.highlight);
                }
            }

            if ($ctrl.onUpdate) {
                $ctrl.onUpdate();
            }
        }



        // Viewer API
        var viewer = {
            ready: false,
            frame: null,
            findInput: null,
            findHighlightAll: null,
            find_next: null,
            find_previous: null,
            init: function() {
                var viewer = this;
                var deferred = $q.defer();
                viewer.frame = $element[0].firstChild;
                viewer.frame.onload = function() {
                    // get document elements
                    viewer.findInput = viewer.frame.contentWindow.document.getElementById('findInput');

                    viewer.findHighlightAll = viewer.frame.contentWindow.document.getElementById('findHighlightAll');

                    viewer.find_next = viewer.frame.contentWindow.document.getElementById('find_next');

                    viewer.find_previous = viewer.frame.contentWindow.document.getElementById('find_previous');

                    viewer.ready = true;
                    deferred.resolve();
                };
                return deferred.promise;
            },
            find: function(q) {
                viewer.findInput.value = q;
                viewer.fireEvent();
            },
            nextMatch: function() {
                viewer.find_next.click();
            },
            prevMatch: function() {
                viewer.find_previous.click();
            },
            highlightAll: function(highlight) {
                viewer.findHighlightAll.checked = highlight;
                viewer.fireEvent();
            },
            fireEvent: function() {
                var event = new Event('input');
                viewer.findInput.dispatchEvent(event);
            }
        };
        $ctrl.viewer = viewer;
        $ctrl.viewer.init().then();
        // $ctrl.viewer.init().then(cycleFind);


        function cycleFind() {
            var find = ['nonlinear', 'vibration', 'duffing'],
                index = 0,
                i = 0;
            setInterval(function() {
                $ctrl.viewer.find(find[index]);
                index = i++ % find.length;
                console.log(find[index], index);
            }, 2000);
        }

    }

    module.exports = pdfViewer;
}());
