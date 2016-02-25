;(function ($, window, document, undefined) {
	"use strict";

	var pluginName = "tabs",
		defaults = {
			class: "tabs"
		};

	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {

		/*
		| --------------------------------------------------------------------
		| Init
		| --------------------------------------------------------------------
		|
		| Initialises the plugin.
		|
		*/

		init: function() {
			this.onClick();
		},

		/*
		| --------------------------------------------------------------------
		| onClick
		| --------------------------------------------------------------------
		|
		| Detect clicks on tabs and switch to the relevant content.
		|
		*/

		onClick: function() {
			$('.tabs').on('click', '> li a', function(e) {
				var $this  = $(this),
					li     = $this.parent('li'),
					target = $($this.attr('href'));

				li.siblings().removeClass('active');
				li.addClass('active');

				target.siblings().removeClass('active');
				target.addClass('active');

				e.preventDefault();
			});
		}
	});

	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data( this, "plugin_" + pluginName)) {
				$.data( this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};
})(jQuery, window, document);