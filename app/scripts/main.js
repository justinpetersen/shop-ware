'use strict';

$(document).ready(function() {

	var TabGroup = function() { };

	TabGroup.prototype.onTabClick = function(index) {
		this.setActiveTab(index);
	};

	TabGroup.prototype.init = function() {
		var that = this;
		$('.home-tab').each(function(index) {
			$(this).on('click', $.proxy(that.onTabClick, that, index));
		});
	};

	TabGroup.prototype.setActiveTab = function(activeIndex) {
		$('.home-tab').each(function(index) {
			if (index === activeIndex) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});
		$('.home-tab-slide').each(function(index) {
			if (index === activeIndex) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});
	};


	var ScrollWatcher = function() {
		this.headerOffset = -1;
	};

	ScrollWatcher.prototype.onScroll = function() {
		var offset = $('.header-bottom').offset().top;
		if (this.headerOffset === -1) {
			this.headerOffset = offset;
		}
		if ($(window).scrollTop() > this.headerOffset) {
			$('.header-fixed').show();
		} else {
			$('.header-fixed').hide();
		}
	};

	ScrollWatcher.prototype.init = function() {
		$(window).on('scroll', $.proxy(this.onScroll, this));
	};


	var tabGroup = new TabGroup();
	tabGroup.init();

	if ($(window).outerWidth() >= 768) {
		var scrollWatcher = new ScrollWatcher();
		scrollWatcher.init();
	}

});