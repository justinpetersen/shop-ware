'use strict';

/* ANIMATOR
-------------------------------------------------- */

var PricingAnimations = function() {
	this.onScreen = true;
};

PricingAnimations.prototype.onScroll = function() {
	this.updateScreenPositions();
};

PricingAnimations.prototype.init = function() {
	$(window).on('scroll', $.proxy(this.onScroll, this));

	this.updateScreenPositions();
};

PricingAnimations.prototype.updateScreenPositions = function() {
	if ($(window).scrollTop() + $(window).innerHeight() > $('.cloud-screen').offset().top) {
		if (this.onScreen) {
			return;
		}
		this.onScreen = true;
		$('.cloud-screen-laptop').animate({left: '0'});
		$('.cloud-screen-mobile').animate({left: '0'});
	} else {
		if (!this.onScreen) {
			return;
		}
		this.onScreen = false;
		$('.cloud-screen-laptop').animate({left: '-20'});
		$('.cloud-screen-mobile').animate({left: '20'});
	}
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {

	var pricingAnimations = new PricingAnimations();
	pricingAnimations.init();

});