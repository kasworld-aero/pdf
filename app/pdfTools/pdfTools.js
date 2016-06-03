(function() {
    'use strict';

    var pdfTools = {
        templateUrl: 'tpl/pdf-tools.tpl.html',
        controller: pdfToolsCtrl,
        bindings: {
            search: '&',
            fullscreen: '&',
            highlight: '&',
        }
    };

    pdfToolsCtrl.$inject = [];

    function pdfToolsCtrl() {
        var $ctrl = this;

        $ctrl.searchQuery = '';
        $ctrl.highlightAll = false;
        $ctrl.keywords = ['nonlinear', 'discuss', 'duffing', 'equation'];

        $ctrl.selectKeyword = function(index) {
            $ctrl.searchQuery = $ctrl.keywords[index];
            $ctrl.search({query: $ctrl.searchQuery});
        };

        $ctrl.onChecked = function(){
            console.log($ctrl.highlightAll);
            $ctrl.highlight({ highlightAll: $ctrl.highlightAll });
        };
    }

    module.exports = pdfTools;
}());
