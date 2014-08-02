'use strict';

/* VIDEO PLAYER
-------------------------------------------------- */

var VideoPlayer = function() {
	this.videoSource = '';
	this.autoplay = true;
};

VideoPlayer.prototype.onResize = function() {
	this.centerVideoPlayer();
};

VideoPlayer.prototype.onShowModal = function() {
	this.enableVideo();
};

VideoPlayer.prototype.onHideModal = function() {
	this.disableVideo();
};

VideoPlayer.prototype.onCloseVideo = function() {
	$('#videoModal').modal('hide');
};

VideoPlayer.prototype.init = function() {
	this.initVideoSource();

	$(window).on('resize', $.proxy(this.onResize, this));
	$('#videoModal').on('show.bs.modal', $.proxy(this.onShowModal, this));
	$('#videoModal').on('hide.bs.modal', $.proxy(this.onHideModal, this));
	$('.close-video-modal-button').on('click', $.proxy(this.onCloseVideo, this));

	this.centerVideoPlayer();
};

VideoPlayer.prototype.initVideoSource = function() {
	this.videoSource = $('.vimeo-player').attr('src');
	if (this.autoplay) {
		this.videoSource = this.videoSource + '?autoplay=1';
	}
	$('.vimeo-player').attr('src', '');
};

VideoPlayer.prototype.centerVideoPlayer = function() {
	var top = ($(window).innerHeight() - $('.vimeo-player').height()) / 2;
	$('.video-player-container').css('margin-top', top + 'px');
};

VideoPlayer.prototype.enableVideo = function() {
	$('.vimeo-player').attr('src', this.videoSource);
};

VideoPlayer.prototype.disableVideo = function() {
	$('.vimeo-player').attr('src', '');
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {
	var videoPlayer = new VideoPlayer();
	videoPlayer.init();
});