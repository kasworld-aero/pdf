# ng-pdf-viewer
Mozilla pdf.js web viewer as an Angular 1.5+ Component

[https://samrose3.github.io/ng-pdf-viewer](https://samrose3.github.io/ng-pdf-viewer)

## What is this?
We needed a custom document viewer that could be embedded into any Angular project. I found Mozilla's PDF.js and their viewer.html and thought it would be a good fit. The viewer.html was customizable and allowed us to easily tap into several advanced features, such as searching text within the document and entering fullscreen mode. This project is that viewer reimplemented as an Angular component. The viewer takes on the size of it's parent container, and the some of the toolbar's functionality is exposed to outside components via bindings.

## Setup

1. The viewer needs [ocLazyLoad](https://github.com/ocombe/ocLazyLoad) to load in its assets. Include ocLazyLoad in your project with the commmand
	`bower install oclazyload` or `npm install oclazyload`
1. Download / clone the repo or just the`dist` folder
1. Include the `dist/pdfViewer.js` into your project (script tags, browserify, etc)
1. Copy the `dist/pdfjs` folder into your public folder to be accessible via HTTP requests (for lazy loading of assets)
1. Add `pdf.viewer` to your Angular app's module dependencies

 	```javascript
	var app = angular.module('app', ['pdf.viewer', 'oc.lazyload']);
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
	<div>
		<pdf-viewer file="{{file}}"></pdf-viewer>
	</div>
	```
