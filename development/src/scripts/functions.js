// Make sure we don't overwrite our namespace
if (customSite === null || customSite === undefined)
		var customSite = {};
if (customSite.site === null || customSite.site === undefined)
		customSite.site = {};

customSite.site.name = "YourSite";
customSite.site.dropdownMouseEventsOn = false;

// Initialize our customSite.site namespace and kick off needed methods here
customSite.site.initialize = function() {
	//customSite.site.setExternalLinks();
	//customSite.site.createExternalEmailModal();
	//customSite.site.attachEventHandlers();
	customSite.site.dropdownHandling();
	customSite.site.displayAlert();
}

// Disclaimer Methods
// customSite.site.setExternalLinks = function(scope) {
// 		$.expr[':'].external = function(obj) {
// 				return !obj.href.match(/^mailto\:/)
// 				&& (obj.hostname != location.hostname)
// 				&& !obj.href.match(/^javascript/)
// 				&& !obj.href.match(/^tel\:/)
// 				&& !obj.href.match(/^$/)
// 				&& !obj.href.match(/^https\:\/\/pass\.t8webware\.com/);
// 		};
// 		$('a:external', scope).addClass('external');
// 		$('a:external[name]', scope).removeClass('external');
// }

// customSite.site.createExternalEmailModal = function() {
// 		$('a[href^="mailto:"]').click(function(e) {
// 				e.preventDefault();
// 				var mailToMsg = setDisclaimerVerbiage("desktop","email");
// 				var mobileMailToMsg = setDisclaimerVerbiage("mobile","email");
// 				var outboundBump = $(this).attr('href');
// 				if (Modernizr.mq('only all and (max-width: 767px)')) {
// 						var r = confirm(mobileMailToMsg);
// 						if (r === true) {
// 								window.open(outboundBump);
// 						}
// 				}
// 				else {
// 					bootbox.confirm(mailToMsg, 'Cancel', 'Proceed', function(result) {
// 							if (result) {
// 									$('.modal-backdrop').hide();//fix for modal backdrop in safari
// 									window.open(outboundBump);
// 							}
// 					});
// 				}
// 		});
// }

customSite.site.openNewWindow = function() {
		$('a').each(function() {
			if ( $(this).attr('target') == '_blank') {
					$(this).append("<span class='sr-only'> (Opens in a new Window)</span>");
			}
		});
}
customSite.site.setDate = function() {
	var d = new Date();
	var year = d.getFullYear();
	$(".copy-date").text(year);
}
// customSite.site.setDisclaimers = function(link) {
// 		var speedbump = link.attr('href');
// 		var exitMsg = setDisclaimerVerbiage("desktop","external");
// 		var mobileExitMsg = setDisclaimerVerbiage("mobile","external");
// 		var test = $('bootbox.modal').hasClass('in');
// 		if(test===false) {
// 			if (Modernizr.mq('only all and (max-width: 767px)')) {
// 					var r = confirm(mobileExitMsg);
// 					if (r === true) { window.open(speedbump); }
// 			}
// 			else {
// 				bootbox.confirm(exitMsg, 'Cancel', 'Proceed', function(result) {
// 						if (result) {
// 								$('.modal-backdrop').hide();//fix for modal backdrop in safari
// 								window.open(speedbump);
// 						} else {
// 							$('.bootbox.modal').on('hidden.bs.modal', function (e) {
// 									 $(link).focus();
// 							 });
// 						}
// 				});
// 			}
// 		}
// }

// customSite.site.attachEventHandlers = function(scope) {
// 	$("a.external", scope).on('click', function(e) {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		var checkDisc = 0;
// 		if($(this).attr('data-disclaimer-id')) {
// 			var checkDisc = $(this).attr('data-disclaimer-id').length;
// 		}
// 		if(checkDisc < 5) {
// 			//console.log("clicked link")
// 			customSite.site.setDisclaimers($(this));
// 		}
// 	});
// }

customSite.site.dropdownHandling = function(){
		var $dropdowns = $('.dropdown');

		// If width is above 979, add hover events (also force IE to use hover since the modernizr query doesn't run in IE)
		if(Modernizr.mq('(min-width: 979px) and (orientation: landscape)') || navigator.appName == 'Microsoft Internet Explorer') {
			if(!customSite.site.dropdownMouseEventsOn){
				// Mouse events are on, so set flag
				customSite.site.dropdownMouseEventsOn = true;

				// Open dropdowns on hover
				$dropdowns.on('mouseover', function() {
					var $this;
					$this = $(this);
					if ($this.prop('hoverTimeout')) {
						$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
					}
					return $this.prop('hoverIntent', setTimeout(function() {
						return $this.addClass('open active');
					}, 150));
				}).on('mouseleave', function() {
					var $this;
					$this = $(this);
					if ($this.prop('hoverIntent')) {
						$this.prop('hoverIntent', clearTimeout($this.prop('hoverIntent')));
					}
					return $this.prop('hoverTimeout', setTimeout(function() {
						return $this.removeClass('open active');
					}, 150));
				});
			}
		}

		// If width is under 979, remove hover events
		if(Modernizr.mq('(max-width: 979px)') || $('html').hasClass('touch')){
			if(customSite.site.dropdownMouseEventsOn){
				$dropdowns.off('mouseover').off('mouseleave');
				customSite.site.dropdownMouseEventsOn = false;
			}
			$(".custom-menu >li >a,.custom-menu >li >span").on("click", function(e){
				e.preventDefault();
				e.stopPropagation();
				var $p = $(this).parent();
				$(".custom-menu >li.dropdown").not($p).removeClass("active open");

				if($p.hasClass("active open")) {
					$p.removeClass("active open");
				} else {
					$p.addClass("active open");
				}
			});
		}
}

// Cookie
// ==================================================================================================================================
function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
}

function eraseCookie(name) {
		createCookie(name,"",-1);
}

customSite.site.displayAlert = function() {
	var alert=readCookie("alert");
	if(alert == null && $.trim($('.alert.hidden-alert .alert-body').text())) {
		$('.alert.hidden-alert').show();
	}
}

// Function to get screen size, used in conjunction with the .screener class, 
// typically placed in the footer
// ==================================================================================================================================
customSite.site.getScreenSize = function() {
	var s = $(".screener").css("content").replace(/\"/g,"");
	switch(s) {
		case "right":  return "mobile"; break;
		case "xsmall":   return "tablet"; break;
		default: return "desktop"; break;
	}
}

// function to set the overflow of the table container div and show/hide the swiper
// ==================================================================================================================================
customSite.site.setTableScrolling = function() {
	$(".table-responsive").each(function(){
		var c = $(this).outerWidth();
		var t = $(this).find("table").width();
		//console.log(c,t);
		if(t > c) {
			$(this).find(".table-inside").css({"overflow-x": "scroll"});
			$(this).find(".swiper").show();
		} else {
			$(this).find(".table-inside").css({"overflow-x": "hidden"});
			$(this).find(".swiper").hide();
		}
	});
}

// function to get iframe videos and embedd them asyncronously for the fullwidth video banner
// ===============================================================================
customSite.site.setBannerVideos = function() {
	if($(".bannerVideo__container iframe").length > 0) {
		var videosrc = $(".bannerVideo__container iframe").attr("src");
		var youtube = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
		var yid = videosrc.match(youtube)[1]; // id = 'XXXXXXXXXX'

		if(yid) {  //run the youtube stuff
			$(".bannerVideo__container iframe").remove();
			$(".bannerVideo__container .video-container").hide();
			var $player = $("#ytplayer");
			$player.addClass("init").wrap("<div class='flex-video'></div>");
			// Based on the YouTube ID, we can easily find the thumbnail image
			$player.css('background-image', 'url(//i.ytimg.com/vi/' + yid + '/sddefault.jpg)');
			// Load the IFrame Player API code asynchronously.
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			// Replace the 'ytplayer' element with an <iframe> and
			// YouTube player after the API code downloads.
			var player;
			window.onYouTubePlayerAPIReady = function() {
				player = new YT.Player('ytplayer', {
					videoId: yid,
					playerVars: {
						autoplay: 1,
						fs: 0,
						loop: 1,
						rel: 0,
						controls:0,
						modestbranding: 1,
						showinfo: 0
					},
					events: {
							'onReady': onPlayerReady,
					}
				});
			}
			function onPlayerReady(event){
				player.mute();
			}
		}
	}
	if($(".bannerVideo__container video").length > 0) {
		//jQuery is required to run this code
		scaleVideoContainer();

		initBannerVideoSize('.bannerVideo__container .video-container .poster img');
		initBannerVideoSize('.bannerVideo__container .video-container .filter');
		initBannerVideoSize('.bannerVideo__container .video-container video');

		$(window).on('resize', function() {
				scaleVideoContainer();
				scaleBannerVideoSize('.bannerVideo__container .video-container .poster img');
				scaleBannerVideoSize('.bannerVideo__container .video-container .filter');
				scaleBannerVideoSize('.bannerVideo__container .video-container video');
		});
	}
	function scaleVideoContainer() {

			var height = $(window).height() + 5;
			var unitHeight = parseInt(height) + 'px';
			$('.bannerVideo__container').css('height',unitHeight);

	}

	function initBannerVideoSize(element){

		$(element).each(function(){
				$(this).data('height', $(this).height());
				$(this).data('width', $(this).width());
		});

		scaleBannerVideoSize(element);

	}

	function scaleBannerVideoSize(element){

		var windowWidth = $(window).width(),
		windowHeight = $(window).height() + 5,
		videoWidth,
		videoHeight;

		// console.log(windowHeight);

		$(element).each(function(){
				var videoAspectRatio = $(this).data('height')/$(this).data('width');

				$(this).width(windowWidth);

				if(windowWidth < 1000){
						videoHeight = windowHeight;
						videoWidth = videoHeight / videoAspectRatio;
						$(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

						$(this).width(videoWidth).height(videoHeight);
				}

				$('.bannerVideo__container .video-container video').addClass('fadeIn animated');

		});
	}
}

// GLOBAL VARIABLES
// ==================================================================================================================================
var $body = $("body"), 
	$bodyhtml = $("body,html"),
	$slider = $(".slider"),
	$logo = $('.logo');