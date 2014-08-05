'use strict';

/* ANIMATOR
-------------------------------------------------- */

var AnimationManager = function() {
	this.values = [
		{
			heading: 'Quickstart Checklists',
			subheading: 'use pre-loaded templates or create your own'
		},
		{
			heading: 'Decode VINs',
			subheading: 'up to 37 vehicle attributes'
		},
		{
			heading: 'Works Anywhere',
			subheading: 'computers, tablets and smartphones'
		}
	];

	this.currentIndex = 2;
};

AnimationManager.prototype.init = function() {
	window.setInterval($.proxy(this.transition, this), 5000);
};

AnimationManager.prototype.transition = function() {
	$('.animation-image-container').animate({'opacity': 0});
	$('.animation-heading').animate({'opacity': 0});
	$('.animation-subheading').animate({'opacity': 0}, $.proxy(this.showNext, this));
};

AnimationManager.prototype.showNext = function() {
	this.currentIndex = (this.currentIndex + 1) % this.values.length;

	$('.animation-heading').html(this.values[this.currentIndex].heading);
	$('.animation-subheading').html(this.values[this.currentIndex].subheading);

	var that = this;
	$('.animation-image').each(function(index) {
		if (index === that.currentIndex) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});

	$('.animation-image-container').css('top', '10px');
	$('.animation-image-container').delay(200).animate({opacity: 1, top: 0});
	$('.animation-heading').animate({opacity: 1}, 800);
	$('.animation-subheading').delay(200).animate({opacity: 1}, 600);
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {

	var animationManager = new AnimationManager();
	animationManager.init();

});