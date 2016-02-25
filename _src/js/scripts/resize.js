window.app = window.app || {};

/*
| --------------------------------------------------------------------
| Resize
| --------------------------------------------------------------------
|
| Runs when the window is resized.
|
*/

app.Resize = function() {
	/*
	| --------------------------------------------------------------------
	| Calculate Window Width
	| --------------------------------------------------------------------
	*/

	app.windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	if(app.windowWidth > 768) {
		app.mmenu.close();
	}
};

$(window).resize(function() {
	app.Resize();
});

app.Resize();