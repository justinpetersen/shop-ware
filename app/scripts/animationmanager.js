'use strict';

/* ANIMATOR
-------------------------------------------------- */

var AnimationManager = function() {
};

AnimationManager.prototype.init = function() {
	window.setInterval($.proxy(this.transition, this), 2000);
};

AnimationManager.prototype.transition = function() {
	// $('.animation-image').fadeOut();
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {

	var animationManager = new AnimationManager();
	animationManager.init();

});