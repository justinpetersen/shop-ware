'use strict';

/* SCROLL WATCHER
-------------------------------------------------- */

var ScrollWatcher = function() {
	this.fixedHeader = false;
	this.headerOffset = -1;
};

ScrollWatcher.prototype.onScroll = function() {
	this.updateHeaderPosition();
};

ScrollWatcher.prototype.onResize = function() {
	this.checkEnable();
};

ScrollWatcher.prototype.init = function() {
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
	this.hideFixedHeader(true);
};

ScrollWatcher.prototype.updateHeaderPosition = function() {
	var headerRel = $.find('.about-header-container').length > 0 ? $('.about-header-container') : $('.header-bottom');
	var offset = headerRel.offset().top + headerRel.height() - $('.header-fixed').height();
	if (this.headerOffset === -1) {
		this.headerOffset = offset;
	}
	if ($(window).scrollTop() > this.headerOffset) {
		this.showFixedHeader();
	} else {
		this.hideFixedHeader();
	}
};

ScrollWatcher.prototype.showFixedHeader = function() {
	if (this.fixedHeader) {
		return;
	}

	this.fixedHeader = true;

	$('.navbar-default').find('.logo').show();
	$('.navbar-default').find('.sign-up-copy').show();

	$('.navbar-default').css('background-color', '#f25822');
	$('.navbar-default').css('position', 'fixed');
	$('.navbar-default').css('top', '-74px');
	$('.navbar-default').animate({top: 0}, {queue: false});
};

ScrollWatcher.prototype.hideFixedHeader = function(skipAnimation) {
	if (skipAnimation) {
		this.fixNav();
	} else {
		if (!this.fixedHeader) {
			return;
		}
		$('.navbar-default').animate({top: -74}, $.proxy(this.fixNav, this));
	}
	this.fixedHeader = false;
};

ScrollWatcher.prototype.fixNav = function() {
	$('.navbar-default').stop();
	$('.navbar-default').css('top', '-74px');
		
	$('.navbar-default').find('.logo').hide();
	$('.navbar-default').find('.sign-up-copy').hide();

	$('.navbar-default').css('background', 'none');
	$('.navbar-default').css('position', 'absolute');
	$('.navbar-default').css('top', 0);

	if ($(window).outerWidth() >= 768) {
		$('.navbar-default').css('opacity', 0);
		$('.navbar-default').animate({opacity: 1}, {queue: false});
	}
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {

	var scrollWatcher = new ScrollWatcher();
	scrollWatcher.init();

});