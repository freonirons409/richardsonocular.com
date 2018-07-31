$(window).load(function() {
	customSite.site.openNewWindow();
	$(".table-responsive").each(function(){
		$(this).prepend('<div class="swiper text-center">&laquo; Swipe for More &raquo;</div>');
		$(this).find(".table").wrap("<div class=\"table-inside\"></div>");
	});
	customSite.site.setTableScrolling();
	customSite.site.setBannerVideos();
	// Trigger Anchor Button Click on spacebar
	// ==================================================================================================================================
	$('a.btn').keypress(function(e){
		if(e.which === 32){
			e.preventDefault();
			$(this).get(0).click();
		}
	});
	// React like a button for ADA
	// ==================================================================================================================================
	$('[role="button"], [role=link], [data-toggle=tab], [data-toggle=collapse]').keypress(function(e){
		if(e.which === 32 || e.which === 13){  // 32 == spacebar, 13 == enter
			e.preventDefault();
			$(this).get(0).click();
		}
	});

	//sets the focus back on the button that toggles a modal when that modal is closed (ADA)
	// ==================================================================================================================================
	$("a[data-toggle='modal']").on("click", function(){
		var target = $(this).attr("href").replace("#","");
		var id = "parent"+target;
		$(this).attr("id", id);
		$("#"+target).attr("data-return-focus", id);
	});

	$('.modal').on('hidden.bs.modal', function (e) {
		var t = $(this).attr("data-return-focus");
		if(t) { $("#"+t).focus(); }
	});
});

$(function () {
		//Setup jquery placeholder
		// ==================================================================================================================================
		$('input, textarea').placeholder();
		$('.dropdown > .category-item, .dropdown > .group-item, span.dropdown-toggle').addClass('dropdown-toggle').attr('data-toggle','dropdown');

		// Run functions in initialize
		// ==================================================================================================================================
		customSite.site.initialize();
		customSite.site.setDate();

		// Resize event handler
		// ==================================================================================================================================
		$(window).smartresize(function(){
			customSite.site.dropdownHandling();
			customSite.site.setTableScrolling();
		});

		// Close Alert
		// ==================================================================================================================================
		$('.alert button.close').on('click', function(e) {
			e.preventDefault();
			createCookie('alert', true, 1);
			$('.alert').hide();
		});

		//fix for modal elements auto-closing
		//=======================================================
		$("a[data-toggle='modal']").on("click", function(e){
			e.preventDefault();
			e.stopPropagation();
			var t = $(this).attr("href");
			if(t) {
				$(t).modal();
			}
		});
		$(window).scroll(function() {    
		    var scroll = $(window).scrollTop();
		    if (scroll >= 800) {
		        $(".back-to-top").addClass("toggled");
		    } else {
		        $(".back-to-top").removeClass("toggled");
		    }
		});

		// Header Togglers
		// ==================================================================================================================================
		$(".toggle-login").on("click", function(){
				$(".online-banking-container").toggleClass("toggled");
		});

		$('#navbar-collapse').on('show.bs.collapse', function() {
			$(".online-banking-container").removeClass("toggled");
		});

		// Mobile Menu Functionality
		// ==================================================================================================================================

		// First we dont want the submenus to close on us when clicking a group item
		$('.navbar-collapse ul.custom-menu>li.dropdown>.dropdown-menu').on('click',function (e) {
			//e.preventDefault();
			e.stopPropagation();
		});

		$('.navbar-collapse ul.custom-menu li .dropdown-menu>li>span').on('click',function (e) {
			//e.preventDefault();
			e.stopPropagation();
			$(this).toggleClass("active");
			$(this).next('.dropdown-menu').toggleClass('active');
			//$(this).closest('li').toggleClass('calcOpen');
		});

		//loading script
		// ============================================
		$(".loader").each(function(){
				var $loader = $(this);
				var imgs = $loader.find("img");
				var loaded = 0;
				var $container = $loader.find(".load-watch");
				imgs.each(function(){ if($(this.complete)) ++loaded; });
				if(imgs.length == loaded) {
					$loader.find(".loading").fadeOut();
					setTimeout(function(){
						$loader.css({"background": "transparent","height": "auto", "overflow": "visible","border": 0});
						$container.animate({"opacity": 1},800);
					}, 600);
				}
		});

		// Animation when scroll to top is clicked.
		// ==================================================================================================================================
		$('#scrollTop').on('keydown', function(e) {
				var code = e.keyCode;
				if(code === 13 || code === 32) {
					e.preventDefault();
					$bodyhtml.animate({scrollTop: 0},600, function(){
						$logo.focus();
					}); // scroll to top for all other browsers
				}
		});
		$('#scrollTop').on('click', function(e) {
				e.preventDefault();
				$bodyhtml.animate({scrollTop: 0},600, function(){
						$logo.focus();
				}); // scroll to top for all other browsers   
		});

		// Removes empty content areas
		//==================================================================================================================
		$(".hidden-content").each(function() {
			if (window.self !== window.top || $.trim($(this).text()) || $(this).has("img").length) {
				return $(this).show();
			} else {
				$(this).remove();
			}
		});
		$(".jumper-link").on("click", function(e){
			e.preventDefault();
			var href = $(this).attr("href");
			if (href) {
				if($(href)) {
					$bodyhtml.animate({
						 scrollTop: $(href).offset().top-40
					 }, 600, function(){
					 	setTimeout(function() {
					 		$(href).focus();
					 	},500);
					 });
				}
			}
		})

		// AJAX Form Scripts
		// ==================================================================================================================================
		$('.ajax-form').submit(function(e) {
			var submittableForm;
			var formId = $(this).find(".form-id-input").val();
			//console.log(formId);
			e.preventDefault();
			if ($(this).parsley().isValid() === true) {
				submittableForm = $(this);
				formContainer = $('.ajax-form-container').find('.form-container');
				successContainer = $('.ajax-form-container').find('.success-container');
				return $.ajax({
					type: 'POST',
					url: '/_/api/form/'+formId+'/entries',
					data: submittableForm.serialize(),
					success: function() {
						formContainer.hide();
						successContainer.fadeIn();
						if(submittableForm.hasClass("no-scroll")===false) {
							 $bodyhtml.animate({
								 scrollTop: successContainer.offset().top-40
							 }, 600);
						}
						return false;
					},
					beforeSend: function() {
						submittableForm.find('button[type=submit]').attr('disabled', 'disabled');
						submittableForm.find('.loading').fadeIn();
						return submittableForm.find('div.error').hide().attr('aria-hidden', 'true');
					},
					error: function(x) {
						//console.log(x);
						submittableForm.find('button[type=submit]').removeAttr('disabled');
						submittableForm.find('.loading').fadeOut('500');
						
						try {
							var json = $.parseJSON(data.responseText);
							$(json).each(function(i,val){
								$.each(val, function(k,v){
									var field = $('label[for="'+ k + '"]').text();
									$("div.error").append($('<div>', {
										text: field + " : " + v
									}));
								});
							});
						} catch(error) {
							$('div.error').html("Error " + data.status + ": " + data.statusText);
						}
						return submittableForm.find('div.error').delay('600').fadeIn().attr('aria-hidden', 'false');
					}
				});
			}
		});

		// Custom parsley validations
		//==================================================================================================================

		window.Parsley.addValidator('zip', {
			validateString: function(value) {
				var patt = new RegExp(/^\d{5}?$/);
				return patt.test(value);
			},
			messages: {
				en: 'This is not a valid zip code'
			}
		});
		window.Parsley.addValidator('phone', {
			validateString: function(value) {
				var patt = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);
				return patt.test(value);
			},
			messages: {
				en: 'Please enter a valid phone number'
			}
		});
		window.Parsley.addValidator('date', {
			validateString: function(value) {
				var patt = new RegExp(/^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/);
				return patt.test(value);
			},
			messages: {
				en: 'Please use a valid date in format MM/DD/YYYY'
			}
		});
});
