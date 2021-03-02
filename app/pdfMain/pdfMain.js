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
        var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
  var purl = url.searchParams.get("purl");
        var files = purl;

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
