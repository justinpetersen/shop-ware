"use strict";var ScrollWatcher=function(){this.fixedHeader=!1,this.headerOffset=-1};ScrollWatcher.prototype.onScroll=function(){this.updateHeaderPosition()},ScrollWatcher.prototype.onResize=function(){this.checkEnable()},ScrollWatcher.prototype.init=function(){$(window).on("resize",$.proxy(this.onResize,this)),this.checkEnable()},ScrollWatcher.prototype.checkEnable=function(){$(window).innerWidth()>=768?this.enable():this.disable()},ScrollWatcher.prototype.enable=function(){$(window).on("scroll",$.proxy(this.onScroll,this)),this.updateHeaderPosition()},ScrollWatcher.prototype.disable=function(){$(window).off("scroll"),this.hideFixedHeader(!0)},ScrollWatcher.prototype.updateHeaderPosition=function(){var a=$($.find(".about-header-container").length>0?".about-header-container":".header-bottom"),b=a.offset().top+a.height()-$(".header-fixed").height();-1===this.headerOffset&&(this.headerOffset=b),$(window).scrollTop()>this.headerOffset?this.showFixedHeader():this.hideFixedHeader()},ScrollWatcher.prototype.showFixedHeader=function(){this.fixedHeader||(this.fixedHeader=!0,$(".navbar-default").find(".logo").show(),$(".navbar-default").find(".sign-up-copy").show(),$(".navbar-default").css("background-color","#f25822"),$(".navbar-default").css("position","fixed"),$(".navbar-default").css("top","-74px"),$(".navbar-default").animate({top:0},{queue:!1}))},ScrollWatcher.prototype.hideFixedHeader=function(a){if(a)this.fixNav();else{if(!this.fixedHeader)return;$(".navbar-default").animate({top:-74},$.proxy(this.fixNav,this))}this.fixedHeader=!1},ScrollWatcher.prototype.fixNav=function(){$(".navbar-default").stop(),$(".navbar-default").css("top","-74px"),$(".navbar-default").find(".logo").hide(),$(".navbar-default").find(".sign-up-copy").hide(),$(".navbar-default").css("background","none"),$(".navbar-default").css("position","absolute"),$(".navbar-default").css("top",0),$(window).innerWidth()>=768&&($(".navbar-default").css("opacity",0),$(".navbar-default").animate({opacity:1},{queue:!1}))},$(document).ready(function(){var a=new ScrollWatcher;a.init()});