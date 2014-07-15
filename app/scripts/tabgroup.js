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
			$(this).addClass('active-tab');
		} else {
			$(this).removeClass('active');
			$(this).removeClass('active-tab');
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
	clone.addClass('accordion-tab');
	$('.panel-title').eq(index).append(clone);
};

TabGroup.prototype.cloneTabSlide = function(element, index) {
	var clone = element.clone();
	clone.addClass('active');
	$('.panel-body').eq(index).append(clone);
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {

	var tabGroup = new TabGroup();
	tabGroup.init();

});