window.app = window.app || {};

/*
| --------------------------------------------------------------------
| Match Height
| --------------------------------------------------------------------
|
| Equalises heights of elements with the 'equal' class.
|
*/

$('.equal').matchHeight();

/*
| --------------------------------------------------------------------
| Calculate Window Width
| --------------------------------------------------------------------
*/

app.windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

/*
| --------------------------------------------------------------------
| Initialise Tabs
| --------------------------------------------------------------------
*/

$('.tabs').tabs();

/*
| --------------------------------------------------------------------
| Initialise Placeholder
| --------------------------------------------------------------------
*/

$('input, textarea').placeholder();

/*
| --------------------------------------------------------------------
| Initialise Superfish
| --------------------------------------------------------------------
*/

$('.sf-menu').superfish({
	cssArrows: false
});

/*
| --------------------------------------------------------------------
| Smooth Scrolling
| --------------------------------------------------------------------
*/

$(function() {
	$('a[href*="#"]:not([href="#"],[href="#menu-mobile"],.mm-menu a[href*="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
		
				return false;
			}
		}
	});
});

/*
| --------------------------------------------------------------------
| Initialise Mmenu
| --------------------------------------------------------------------
*/

var $menu = $('.menu--mobile'),
	$html = $('html, body');

$menu.mmenu({
	offCanvas: {
		position: 'bottom',
		zposition: 'front'
	},
	navbar: {
		title: 'Menu'
	}
});

app.mmenu = $menu.data('mmenu');
app.mmenu.setSelected($menu.find('li').first());

var closer = null;

$menu.find('a').on('click', function() {
	closer = $(this).attr('href');
});

app.mmenu.bind('opening', function () {
    $('#open-left').addClass('open');
});

app.mmenu.bind('closing', function () {
    $('#open-left').removeClass('open');
});

app.mmenu.bind('closed', function() {
	if (closer) {
		setTimeout(function() {
			$html.animate({
				scrollTop: $(closer).offset().top
			});

			closer = null;
		}, 25 );
	}
});