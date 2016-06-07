(function() {
    'use strict';

    describe('pdfApp', function() {
        beforeEach(module('pdfApp'));

        var pdfTools, scope;

        beforeEach(inject(function(_$rootScope_, $componentController) {
            scope = _$rootScope_.$new();
            pdfTools = $componentController('pdfTools', {});
        }));

        it('should have the following default property values', function() {
            expect(pdfTools.searchQuery).toBe('');
            expect(pdfTools.highlightAll).toBe(false);
        });
    });
})();
