'use strict';

/* SCROLL WATCHER
-------------------------------------------------- */

var ScrollWatcher = function() {
	this.headerOffset = -1;
	this.fade = false;
};

ScrollWatcher.prototype.onScroll = function() {
	this.updateHeaderPosition();
};

ScrollWatcher.prototype.onResize = function() {
	this.checkEnable();
};

ScrollWatcher.prototype.init = function(fade) {
	this.fade = fade;
	$(window).on('resize', $.proxy(this.onResize, this));
	this.checkEnable();
};

ScrollWatcher.prototype.checkEnable = function() {
	if ($(window).outerWidth() >= 768) {
		this.enable();
	} else {
		this.disable();
	}
};

ScrollWatcher.prototype.enable = function() {
	$(window).on('scroll', $.proxy(this.onScroll, this));
	this.updateHeaderPosition();
};

ScrollWatcher.prototype.disable = function() {
	$(window).off('scroll');
	this.hideFixedHeader();
};

ScrollWatcher.prototype.updateHeaderPosition = function() {
	var offset = $('.header-bottom').offset().top;
	if (this.headerOffset === -1) {
		this.headerOffset = offset;
	}
	if ($(window).scrollTop() > this.headerOffset - 50) {
		this.showFixedHeader();
	} else {
		this.hideFixedHeader();
	}
};

ScrollWatcher.prototype.showFixedHeader = function() {
	$('.header-fixed').show();
	if (this.fade)
	{
		$('.header-rel').find('.sign-up-copy').hide();
		$('.header-rel').find('.video-image').hide();
		$('.header-fixed').find('.logo').fadeIn();
		$('.header-fixed').find('.sign-up-copy').fadeIn();
		$('.header-fixed').find('.header-copy').fadeIn();
	}

	$('.navbar-default').css('position', 'fixed');
	$('.navbar-default').addClass('nav-background');
	$('.navbar-default').removeClass('nav-no-background');
};

ScrollWatcher.prototype.hideFixedHeader = function() {
	$('.header-fixed').hide();
	if (this.fade)
	{
		$('.header-rel').find('.sign-up-copy').fadeIn();
		$('.header-rel').find('.video-image').fadeIn(200);
		$('.header-fixed').find('.logo').hide();
		$('.header-fixed').find('.sign-up-copy').hide();
		$('.header-fixed').find('.header-copy').hide();
	}

	$('.navbar-default').css('position', 'absolute');
	$('.navbar-default').removeClass('nav-background');
	$('.navbar-default').addClass('nav-no-background');
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {

	var fade = $('.header-fixed').find('.logo').length > 0;
	var scrollWatcher = new ScrollWatcher();
	scrollWatcher.init(fade);

});