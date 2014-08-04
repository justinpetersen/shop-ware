'use strict';

/* TAB GROUP
-------------------------------------------------- */

var TabGroup = function() {
	this.activeTab = 0;
};

TabGroup.prototype.onTabClick = function(index, device) {
	this.setActiveTab(index, device);
};

TabGroup.prototype.onNextClick = function(index, device) {
	// KLUDGE: On desktop all the tab content is stacked on top of each other, so it will always appear like the 4th next arrow was clicked
	if (device === 'desktop') {
		index = (this.activeTab + 1) % 4;
	}
	this.setActiveTab(index, device);
};

TabGroup.prototype.init = function() {
	this.initAccordion();
	this.initTabs();
	this.initNextArrows();
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

TabGroup.prototype.initTabs = function() {
	var that = this;
	$('.home-tab.desktop').each(function(index) {
		$(this).on('click', $.proxy(that.onTabClick, that, index, 'desktop'));
	});
	$('.home-tab.mobile').each(function(index) {
		$(this).on('click', $.proxy(that.onTabClick, that, index, 'mobile'));
	});
};

TabGroup.prototype.initNextArrows = function() {
	var that = this;
	$('.next-arrow.desktop').each(function(index) {
		$(this).on('click', $.proxy(that.onNextClick, that, (index + 1) % 4, 'desktop'));
	});
	$('.next-arrow.mobile').each(function(index) {
		$(this).on('click', $.proxy(that.onNextClick, that, (index + 1) % 4, 'mobile'));
	});
};

TabGroup.prototype.setActiveTab = function(activeIndex, device) {
	// Simulate clicking on the the tab
	if (device === 'mobile') {
		$('#collapse-' + this.activeTab).collapse('hide');
		$('#collapse-' + activeIndex).collapse('show');
	}

	// Update the stored value for which tab is active
	this.activeTab = activeIndex;

	// Highlight the tab state
	$('.home-tab.' + device).each(function(index) {
		if (index === activeIndex) {
			$(this).addClass('active');
			$(this).addClass('active-tab');
		} else {
			$(this).removeClass('active');
			$(this).removeClass('active-tab');
		}
	});

	// Fade in the tab content
	if (device === 'desktop') {
		$('.home-tab-slide.desktop').each(function(index) {
			if (index === activeIndex) {
				$(this).fadeIn();
			} else {
				$(this).fadeOut();
			}
		});
	}
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
	clone.find('.next-arrow').removeClass('desktop');
	clone.find('.next-arrow').addClass('mobile');
	$('.panel-body').eq(index).append(clone);
};

/* INITIALIZE
-------------------------------------------------- */

$(document).ready(function() {

	var tabGroup = new TabGroup();
	tabGroup.init();

});