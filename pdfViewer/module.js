(function() {
    'use strict';

    require('angular');
    require('oclazyload');
    var pdf_viewer = angular.module('pdf.viewer', ['oc.lazyLoad']);

    module.exports = pdf_viewer;
})();
