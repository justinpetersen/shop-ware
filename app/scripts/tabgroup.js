'use strict';

/* TAB GROUP
-------------------------------------------------- */

var TabGroup = function() { };

TabGroup.prototype.onTabClick = function(index, device) {
	this.setActiveTab(index, device);
};

TabGroup.prototype.init = function() {
	this.initAccordion();
	this.initTabs();
};

TabGroup.prototype.initTabs = function() {
	var that = this;
	$('.home-tab.desktop').each(function(index) {
		$(this).on('click', $.proxy(that.onTabClick, that, index, 'desktop'));
	});
	$('.home-tab.mobile').each(function(index) {
		$(this).on('click', $.proxy(that.onTabClick, that, index, 'mobile'));
	});
};

TabGroup.prototype.setActiveTab = function(activeIndex, device) {
	$('.home-tab.' + device).each(function(index) {
		if (index === activeIndex) {
			$(this).addClass('active');
			$(this).addClass('active-tab');
		} else {
			$(this).removeClass('active');
			$(this).removeClass('active-tab');
		}
	});

	if (device === 'desktop') {
		$('.home-tab-slide.desktop').each(function(index) {
			if (index === activeIndex) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});
	}
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
            scrollTop: $(e.target).offset().top - 110
        }, 500);
    });
};

TabGroup.prototype.cloneTab = function(element, index) {
	var clone = element.clone();
	clone.addClass('accordion-tab');
	clone.addClass('mobile');
	clone.removeClass('desktop');
	$('.panel-title').eq(index).append(clone);
};

TabGroup.prototype.cloneTabSlide = function(element, index) {
	var clone = element.clone();
	clone.addClass('active');
	clone.removeClass('desktop');
	$('.panel-body').eq(index).append(clone);
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {

	var tabGroup = new TabGroup();
	tabGroup.init();

});