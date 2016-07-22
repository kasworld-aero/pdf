(function() {
    'use strict';

    angular.module('pdfApp')
        .component('pdfMain', {
            templateUrl: 'tpl/pdfMain.tpl.html',
            controller: pdfMainCtrl,
            bindings: {}
        });

    pdfMainCtrl.$inject = ['$interval'];
    function pdfMainCtrl($interval) {
        var $ctrl = this;
        var files = [
            'test_pdfs/grades.pdf'
        ]

        $ctrl.searchQuery = '';
        $ctrl.fileUrl = files[0];
        $ctrl.toggleNext = false;
        $ctrl.togglePrevious = false;

        $ctrl.nextMatch = function() {
            $ctrl.toggleNext = !$ctrl.toggleNext;
        };
        $ctrl.previousMatch = function() {
            $ctrl.togglePrevious = !$ctrl.togglePrevious;
        };
        $ctrl.search = function(query) {
            $ctrl.searchQuery = query;
            console.log('Search Query from Main: ', $ctrl.searchQuery);
        };
        $ctrl.viewerUpdated = function() {
            console.log('Viewer has been updated');
        };
    }
})();