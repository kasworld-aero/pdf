# RES Document Viewer
Mozilla's [pdf.js](https://github.com/mozilla/pdf.js) web viewer as an [Angular 1.5+ Component](https://docs.angularjs.org/guide/component)

---

## What's included
```
├── Content
│   ├── pdfViewer
│   │   ├── pdfjs
│   │   │   ├── locale
│   │   │   │   ├── // locale support stuff
│   │   │   ├── compatibility.js
│   │   │   ├── l10n.js
│   │   │   ├── pdf-viewer.css
│   │   │   ├── pdf.js
│   │   │   ├── pdf.worker.js
│   │   │   ├── viewer.js
│   │   ├── grades.pdf
│   │   ├── pdfViewer.js
```

## TL;DR - How to use it
_\* assuming all assets are already included in the project_

1. Include as a dependency in your module

	```js
	angular.module('myApp', [
		// ... your dependencies
		'pdf.viewer'
	]);
	```

1. Configure path to PDF viewer assets

	```js
	angular.module('myApp')
		.config(['pdfViewerServiceProvider', function(pdfViewerServiceProvider) {
	    		pdfViewerServiceProvider.setPath('Content/pdfViewer/pdfjs');
		}]);
	```

1. Add to your template

	```html
	<pdf-viewer
		file="$ctrl.fileUrl"
		search="$ctrl.searchQuery"
		next="$ctrl.toggleNext"
		previous="$ctrl.togglePrevious"
		on-update="$ctrl.onUpdate()"
	></pdf-viewer>
	```

## The Details
### The `pdfViewer.js`
This file is the concatenated output of the following:

- pdf.viewer - _module_
- pdfViewer.tpl - _template in template cache_
- pdfViewer - _component_
- pdfViewerService - _service_

\* in that order


#### The `pdf.viewer` Module
> The PDF Viewer is an angular module that you can include as a dependency to any other module in the project.

```js
angular.module('myApp', [
	// ... your dependencies
	'pdf.viewer'
]);
```

Next, you must configure the `pdfViewerService` to look in the right location for pdf viewer assets.

```js
angular.module('myApp')
	.config(['pdfViewerServiceProvider', function(pdfViewerServiceProvider) {
    		pdfViewerServiceProvider.setPath('<PATH>/pdfjs');
	}]);
```

_NOTE_: For **RES**, this location is `Content/pdfViewer/pdfjs`.
**This needs to be configured for every module where you want to add `pdf.viewer`**

```js
/**
 * For the Publications module, this is defined in
 * pub/core/config/pubModuleConfig.js
 */

angular.module('pub')
	.config(['pdfViewerServiceProvider', function(pdfViewerServiceProvider) {
    		pdfViewerServiceProvider.setPath('Content/pdfViewer/pdfjs');
	}]);
```

#### Dependencies
> We are already including this in __RES__, so no need to worry about this. Just know that the `pdfjs` folder assets are a required depenency.
> For __RES__, these assets are included in __`Content/pdfViewer/pdfjs`__

- [oc.lazyLoader](https://github.com/ocombe/ocLazyLoad)
- pdfjs
	- locale/*
	- compatibility.js
	- l10n.js
	- pdf-viewer.less
	- pdf.js
	- viewer.js


### The `<pdf-viewer>` Component
> Once loaded into your module, you can use the PDF viewer component by adding `<pdf-viewer></pdf-viewer>` to your template.

```html
<div>
	<!-- Simple use case with only file binding  -->
	<pdf-viewer file="$ctrl.fileUrl"><pdf-viewer>
</div>
```

It is recommended you wrap the viewer in parent container. The component will look for the parent node and apply the class of `.pdf-viewer-container`.

This ensures PDF viewer will take on the full height of the parent container. It is up to you to set the height of the parent container. Once rendered, these classes will be apply and result in

```html
<div class="pdf-viewer-container">
	<pdf-viewer class="pdf-viewer" file="$ctrl.fileUrl">
		<!-- Elements from pdfViewer.tpl.html as included via template cache -->
	<pdf-viewer>
</div>
```

#### Attribute bindings
> These are the bindings available to interface with the PDF viewer component.

```html
<pdf-viewer
	file="[file url]"
	search="[search query]"
	next="[boolean toggle]"
	previous="[boolean toggle]"
	on-update="[callback function]"
></pdf-viewer>
```

```js
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

These bindings serve as a simple API to hook into the magic of `viewer.js`, written by Mozilla, modified slightly to work within the Angular container and the redesign. More on 'viewer.js' later, but it is __important__ to note that when a binding value does change, the `$onChanges` hook within the component is called. This then triggers a method on the controller (`$ctrl`) to fire which simply utilizes functions on the `PDFViewerApplication` object. This object is created by `viewer.js` and contains all the primary logic for the viewer. 

The `PDFViewerApplication` is attached to the `window` object and accessible globally; however, it is _recommended_ to use the component's API.


### The `pdfViewerService` at your service 🍸
> The job of the `pdfViewerService` is to load the PDF viewer assets from the `pdfjs` folder. This includes:

- locale/locale.properties
- compatibility.js
- l10n.js
- pdf-viewer.less
- pdf.js
- viewer.js

#### Other requested assets
`pdf.js` __will request__ `pdf.worker.js`

`locale.properties` __will request__ `locale/[subfolders]`

`viewer.js` __will request__ `[YOUR-PDF]`



### The `pdfViewer.tpl.html`
> The viewer template has been rewritten from the ground up from the original Mozilla PDF viewer. The layout has three primary parts:

- Toolbar
- Sidebar
- Main Viewer Container

Minor elements include:

- Findbar
- Secondary Toolbar
- Error Wrapper
- Print dialog (with shim)
- Hidden elements

#### Template pseudo-outline
```html
<pdf-viewer>
	<viewer>
		<outer-container>
			<toolbar />
			<secondary-toolbar />
			<findbar />
			<loadingbar />
			<sidebar />
			<main>
				<main-viewer />
				<error-wrapper />
			</main>
		</outer-container>

		<printContainer />
		<printShim />
	</viewer>
</pdf-viewer>
```

It is important to note that the id's on each element are crucial to interacting with the `viewer.js`. The id's on each element are how the `viewer.js` is able to configure and bind events to actionable/dynamic elements.


## `pdfjs` Assets

### Viewer styles
> Styles for the PDF viewer are requested in the `pdfViewerService` in a file called `pdf-viewer.css`.

It contains a few remaining default styles from the original, but most of the styles are unique. They follow the BEM CSS naming semantic and are all name-spaced under the class `.pdf-viewer`.

#### Primary CSS Elements

```css
.pdf-viewer {
	&__error-*
	&__input
	&__main
	&__loading
	&__outer
	&__progress
	&__search
	&__select
	&__sidebar
	&__toolbar
		&--sub
	&__viewer
}
```

There are also a few other minor style rules, such as mobile overrides and label/input defaults.


### The `viewer.js` 👀
> This is the brain of the viewer. It is what creates the primary `PDFViewerApplication`, the event listeners on the DOM elements, and communicates with the pdf.js library to decode and manipulate the PDF file.

It contains some extra tooling that our viewer does not utilize (such as *GrabToPan*). There is a lot of code in here, but to sum it up, it basically creates a the `PDFViewerApplication` object with some sub-objects that handle more specific tasks (ex: PDFFindBar, PDFRenderingQueue, PDFHistory, etc). 

One thing to note is the configuration object, `appConfig`, that is passed in when the `PDFViewerApplication` is being initialized. It is what defines the element id's which to bind events. This object is defined in the `getViewerConfiguration` function.

#### The `PDFViewerApplication` object
This object, as mentioned before, is the primary export from the viewer.js. The `pdfViewer` component API only interacts with this object, to manipulate the viewer.


 ---
The original web viewer from Mozilla: [Online Demo](http://mozilla.github.io/pdf.js/web/viewer.html)

