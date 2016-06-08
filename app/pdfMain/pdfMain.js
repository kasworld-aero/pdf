(function() {
    'use strict';

    var pdfMain = {
        templateUrl: 'tpl/pdfMain.tpl.html',
        controller: pdfMainCtrl,
        bindings: {}
    };

    pdfMainCtrl.$inject = [];

    function pdfMainCtrl() {
        var $ctrl = this;

        $ctrl.searchQuery = '';
        $ctrl.fileUrl = 'test_pdfs/duffing.pdf';
        $ctrl.isFullscreen = false;
        $ctrl.toggleNext = false;
        $ctrl.togglePrevious = false;

        $ctrl.fullscreen = function() {
            $ctrl.isFullscreen = !$ctrl.isFullscreen;
        };
        $ctrl.nextMatch = function() {
            $ctrl.toggleNext = !$ctrl.toggleNext;
        };
        $ctrl.previousMatch = function() {
            $ctrl.togglePrevious = !$ctrl.togglePrevious;
        };
        $ctrl.updateHighlight = function(highlightAll) {
            $ctrl.highlightAll = highlightAll;
            console.log('Highlight from Main: ', $ctrl.highlightAll);
        };
        $ctrl.search = function(query) {
            $ctrl.searchQuery = query;
            console.log('Search Query from Main: ', $ctrl.searchQuery);
        };
        $ctrl.viewerUpdated = function() {
            console.log('Viewer has been updated');
        };
    }

    module.exports = pdfMain;
}());
