# ng-pdf-viewer
Mozilla pdf.js web viewer as an Angular 1.5+ Component

[https://samrose3.github.io/ng-pdf-viewer](https://samrose3.github.io/ng-pdf-viewer)

## What is this?
We needed a custom document viewer that could be embedded into our Angular project. I found Mozilla's PDF.js and thought it would be a good fit. The viewer.html was customizable and allowed us to easily tap into several advanced features, such as searching text within the document and entering fullscreen mode. This is the prototype I created to test that the viewer could be embedded and the toolbar functionality could be exposed to outside components. Not perfect by any means, but was a fun learning experience and interesting project.

It is a prototype, so it has its bugs and quirks. Still pretty neat!


## Setup
1. Download / clone the repo or just the`dist` folder
1. Include the `dist/pdfViewer.js` into your project (script tags, browserify, etc)
1. Copy the `dist/pdfjs` folder into your public folder to be accessible via HTTP requests (for lazy loading of assets)
1. Add `pdf.viewer` to your Angular app's module dependencies
```javascript
var app = angular.module('app', ['pdf.viewer']);
```
1. Set the `pdfViewerServiceProvider` to the path where you copied the `dist/pdfjs` folder
```javascript
app.config(['pdfViewerServiceProvider',
	function(pdfViewerServiceProvider) {
	  pdfViewerServiceProvider.setPath('<PATH>/pdfjs');
}]);
```
1. Include the `pdf-view` component in your angular app template
```html
<main>
	<pdf-viewer file="{{file}}"></pdf-viewer>
</main>
```
