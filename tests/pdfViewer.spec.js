(function() {
    'use strict';

    describe('Component: pdfViewer', function() {
        beforeEach(module('pdf.viewer'));

        var controller;
        var scope;
        beforeEach(inject(function($rootScope, $componentController) {
            scope = $rootScope.$new();
            controller = $componentController('pdfViewer', {
                $scope: scope
            }, {
                file: 'test.pdf'
            });
        }));

        it('should have file binding bound', function() {
            expect(controller.file)
                .toBeDefined();
            expect(controller.file)
                .toBe('test.pdf');
        });

        var element;
        var scope;
        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            element = angular.element('<pdf-viewer file="{{fileUrl}}"></pdf-viewer>');
            element = $compile(element)(scope);
            scope.fileUrl = 'test.pdf';
            scope.$apply();
        }));

        it('should pass the correct file url', function() {
            var title = element.find('#documentTitle');
            expect(title.text())
                .toBe('test.pdf');
        });

    });

})();
