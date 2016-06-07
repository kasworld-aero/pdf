(function() {
	'use strict';

	var pdfMain = {
		templateUrl: 'tpl/pdf-main.tpl.html',
		controller: pdfMainCtrl,
		bindings: {}
	};

	pdfMainCtrl.$inject = [];

	function pdfMainCtrl() {
		var $ctrl = this;
		$ctrl.searchQuery = '';
		$ctrl.isFullscreen = false;

		$ctrl.fullscreen = function() {
			$ctrl.isFullscreen  = !$ctrl.isFullscreen;
		};
		$ctrl.nextMatch = function() {
			$ctrl.toggleNext = !$ctrl.toggleNext;
		};
		$ctrl.prevMatch = function() {
			$ctrl.togglePrev = !$ctrl.togglePrev;
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
