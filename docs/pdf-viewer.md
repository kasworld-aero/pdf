# pdf-viewer
Mozilla's [pdf.js](https://github.com/mozilla/pdf.js) web viewer as an [Angular 1.5+ Component](https://docs.angularjs.org/guide/component)

The OG Web Viewer from Mozilla: [Online Demo](http://mozilla.github.io/pdf.js/web/viewer.html)

## The `pdf.viewer` module
The PDF Viewer is an angular module that you can include as a dependency to any other module in the project.

### Setup
```javascript
angular.module('myApp', [
	// ... your dependencies
	'pdf.viewer'
]);
```

Next, you must configure the `pdfViewerService` to look in the right location for pdf viewer assets.

```javascript
angular.module('myApp')
	.config(['pdfViewerServiceProvider',
    	function(pdfViewerServiceProvider) {
    		pdfViewerServiceProvider.setPath('<PATH>/pdfjs');
	}]);
```

### Dependencies
The `pdf.viewer` module requires [`oc.lazyLoader`](https://github.com/ocombe/ocLazyLoad) to be included in the project. Ensure that you have it added either via [npm](https://www.npmjs.com/package/oclazyload), [bower](https://bower.io), or by including it as a `<script>` tag.

The `pdfjs` folder contains all the necessary assets. Make sure this folder and its contents are accessible in your public folder.

> For RES, these assets are included in `Content/pdfViewer/pdfjs`.



## The `<pdf-viewer>` Component
Once loaded into your module, you can use the PDF viewer component by adding `<pdf-viewer></pdf-viewer>` to your template.

```html
<div>
	<pdf-viewer file="$ctrl.fileUrl"><pdf-viewer>
</div>
```

### Attribute Bindings
These are the bindings available to interface with the PDF viewer component.

```html
<pdf-viewer
	file="[file url]"
	search="[search query]"
	next="[boolean toggle]"
	previous="[boolean toggle]"
	on-update="[callback function]"
></pdf-viewer>
```

```javascript
bindings {
	// INPUT
	file: '<',
	search: '<',
	next: '<',
	previous: '<',

	// OUTPUT
	onUpdate: '&'
}
```

These bindings serve as a simple API to hook into the magic of `viewer.js`, written by Mozilla, modified slightly to work within the Angular container and the redesign. More on 'viewer.js' later, but it is important to note that when a binding value does change, the `$onChanges` hook within the component is called. This then triggers a method on the controller (`$ctrl`) to fire which simply utilizes functions on the `PDFViewerApplication` object. This ojbect is created by `viewer.js` and contains all the primary logic for the viewer. It is attached to the `window` object and accessible globally; however, it is recommended to use the comonent's API.



## The `pdfViewerService` at your service 🍸



## The `viewer.js` 
This is the brain of the viewer. It is what creates the primary `PDFViewerApplication`, the event listeners on the DOM elements, and communicates with the pdf.js library to decode and manipulate the PDF file. It contains some extra tooling that our viewer does not utilize (such as *GrabToPan* and )
