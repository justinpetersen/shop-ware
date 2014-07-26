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
	$('#videoModal').on('hide.bs.modal', $.proxy(this.stopVideo, this));

	this.centerVideoPlayer();
};

VideoPlayer.prototype.centerVideoPlayer = function() {
	var top = ($(window).innerHeight() - $('.vimeo-player').height()) / 2;
	$('.vimeo-player').css('margin-top', top + 'px');
};

VideoPlayer.prototype.stopVideo = function() {
	$('.vimeo-player').attr('src', $('.vimeo-player').attr('src'));
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {
	var videoPlayer = new VideoPlayer();
	videoPlayer.init();
});