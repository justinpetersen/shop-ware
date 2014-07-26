'use strict';

/* ANIMATOR
-------------------------------------------------- */

var AnimationManager = function() {
	this.values = [
		{
			image: 'images/checklist-icon.png',
			heading: 'Quickstart Checklists',
			subheading: 'use pre-loaded templates or create your own'
		},
		{
			image: 'images/vin-icon.png',
			heading: 'Decode VINs',
			subheading: 'with up to 37 vehicle attributes'
		},
		{
			image: 'images/works-anywhere-icon.png',
			heading: 'Works Anywhere',
			subheading: 'computers, tablets and smartphones'
		}
	];

	this.currentIndex = 0;
};

AnimationManager.prototype.init = function() {
	this.preloadImages();

	window.setInterval($.proxy(this.transition, this), 6000);
};

AnimationManager.prototype.preloadImages = function() {
	var images = [];
	for (var i = 0; i < this.values.length; i++) {
		images[i] = new Image();
		images[i].src = this.values[i].image;
	}
};

AnimationManager.prototype.transition = function() {
	$('.animation-image').animate({'opacity': 0});
	$('.animation-heading').animate({'opacity': 0});
	$('.animation-subheading').animate({'opacity': 0}, $.proxy(this.showNext, this));
};

AnimationManager.prototype.showNext = function() {
	this.currentIndex = (this.currentIndex + 1) % this.values.length;

	$('.animation-image').attr('src', '');
	$('.animation-image').attr('src', this.values[this.currentIndex].image);
	$('.animation-heading').html(this.values[this.currentIndex].heading);
	$('.animation-subheading').html(this.values[this.currentIndex].subheading);

	$('.animation-image').animate({'opacity': 1});
	$('.animation-heading').animate({'opacity': 1}, 600);
	$('.animation-subheading').animate({'opacity': 1}, 800);
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {

	var animationManager = new AnimationManager();
	animationManager.init();

});