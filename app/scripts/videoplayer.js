'use strict';

/* VIDEO PLAYER
-------------------------------------------------- */

var VideoPlayer = function() {
};

VideoPlayer.prototype.onResize = function() {
	this.centerVideoPlayer();
};

VideoPlayer.prototype.init = function() {
	$(window).on('resize', $.proxy(this.onResize, this));

	this.centerVideoPlayer();
};

VideoPlayer.prototype.centerVideoPlayer = function() {
	var top = ($(window).innerHeight() - $('.vimeo-player').height()) / 2;
	$('.vimeo-player').css('margin-top', top + 'px');
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {
	var videoPlayer = new VideoPlayer();
	videoPlayer.init();
});