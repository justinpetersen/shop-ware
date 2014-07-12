'use strict';

/* TAB GROUP
-------------------------------------------------- */

var TabGroup = function() { };

TabGroup.prototype.onTabClick = function(index) {
	this.setActiveTab(index);
};

TabGroup.prototype.init = function() {
	this.initAccordion();
	this.initTabs();
};

TabGroup.prototype.initTabs = function() {
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

TabGroup.prototype.initAccordion = function() {
	var that = this;
	$('.home-tab').each(function(index) {
		that.cloneTab($(this), index);
	});
	$('.home-tab-slide').each(function(index) {
		that.cloneTabSlide($(this), index);
	});

	this.initScrollOnCollapse();
};

TabGroup.prototype.initScrollOnCollapse = function() {
	$('#accordion').on('shown.bs.collapse', function (e) {
        $('html,body').animate({
            scrollTop: $(e.target).offset().top
        }, 500);
    });
};

TabGroup.prototype.cloneTab = function(element, index) {
	var clone = element.clone();
	clone.addClass('active');
	$('.panel-title').eq(index).append(clone);
};

TabGroup.prototype.cloneTabSlide = function(element, index) {
	var clone = element.clone();
	clone.addClass('active');
	$('.panel-body').eq(index).append(clone);
};

/* SCROLL WATCHER
-------------------------------------------------- */

var ScrollWatcher = function() {
	this.headerOffset = -1;
	this.fade = false;
};

ScrollWatcher.prototype.onScroll = function() {
	var offset = $('.header-bottom').offset().top;
	if (this.headerOffset === -1) {
		this.headerOffset = offset;
	}
	if ($(window).scrollTop() > this.headerOffset) {
		$('.header-fixed').show();
		if (this.fade)
		{
			$('.header-rel').find('.sign-up-copy').hide();
			$('.header-fixed').find('.logo').fadeIn();
			$('.header-fixed').find('.sign-up-copy').fadeIn();
			$('.header-fixed').find('.header-copy').fadeIn();
		}
	} else {
		$('.header-fixed').hide();
		if (this.fade)
		{
			$('.header-rel').find('.sign-up-copy').fadeIn();
			$('.header-fixed').find('.logo').hide();
			$('.header-fixed').find('.sign-up-copy').hide();
			$('.header-fixed').find('.header-copy').hide();
		}
	}
};

ScrollWatcher.prototype.init = function(fade) {
	this.fade = fade;
	$(window).on('scroll', $.proxy(this.onScroll, this));
};



/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {

	var tabGroup = new TabGroup();
	tabGroup.init();

	if ($(window).outerWidth() >= 768) {
		var fade = $('.header-fixed').find('.logo').length > 0;
		var scrollWatcher = new ScrollWatcher();
		scrollWatcher.init(fade);
	}

});