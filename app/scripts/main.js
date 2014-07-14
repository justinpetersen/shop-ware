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
		$('.header-fixed').find('.logo').fadeIn();
		$('.header-fixed').find('.sign-up-copy').fadeIn();
		$('.header-fixed').find('.header-copy').fadeIn();
	}

	$('.navbar-default').css('position', 'fixed');
	$('.navbar-default').addClass('nav-background');
	$('.navbar-default').css('background-position-y', (-this.headerOffset + 50) + 'px');
	$('.navbar-default').removeClass('nav-no-background');
};

ScrollWatcher.prototype.hideFixedHeader = function() {
	$('.header-fixed').hide();
	if (this.fade)
	{
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

	var tabGroup = new TabGroup();
	tabGroup.init();

	var fade = $('.header-fixed').find('.logo').length > 0;
	var scrollWatcher = new ScrollWatcher();
	scrollWatcher.init(fade);

});