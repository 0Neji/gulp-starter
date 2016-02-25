window.app = window.app || {};

/*
| --------------------------------------------------------------------
| Initialise Snap
| --------------------------------------------------------------------
*/

app.snap = new Snap({
	element: document.getElementById('content')
});

/*
| --------------------------------------------------------------------
| Add Event to Element
| --------------------------------------------------------------------
*/

var addEvent = function addEvent(element, eventName, func) {
	if (element.addEventListener) {
		return element.addEventListener(eventName, func, false);
	} else if (element.attachEvent) {
		return element.attachEvent("on" + eventName, func);
	}
};

/*
| --------------------------------------------------------------------
| Open Left Drawer
| --------------------------------------------------------------------
*/

addEvent(document.getElementById('open-left'), 'click', function(e) {
	if (app.snap.state().state == 'left'){
		app.snap.close();
	} else {
		app.snap.open('left');
	}

	e.preventDefault();
});

/*
| --------------------------------------------------------------------
| Prevent Safari opening links when viewing as a Mobile App
| --------------------------------------------------------------------
*/

(function (a, b, c) {
	if(c in b && b[c]) {
		var d, e = a.location,
			f = /^(a|html)$/i;
		a.addEventListener("click", function (a) {
			d = a.target;
			while(!f.test(d.nodeName)) d = d.parentNode;
			"href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
		}, !1)
	}
})(document, window.navigator, "standalone");