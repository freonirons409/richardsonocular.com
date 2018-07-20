$(window).load(function() {
	$slider.slick({
		dots: true,
		infinite: true,
		fade: false,
		speed: 300,
		adaptiveHeight: true,
		autoplaySpeed: 8000,
		rows: 1,
		slidesPerRow: 1,
		slidesToShow: 1, // width of screen
		responsive: [{
			breakpoint: 992,
			settings: {
				rows: 1,
				slidesPerRow: 1,
				slidesToShow: 1, // width of screen
			}
		}, {
			breakpoint: 480,
			settings: {
				rows: 1,
				slidesPerRow: 1,
				slidesToShow: 1, // width of screen
			}
		}]
	});
	$('.subads__slider').slick({
		dots: false,
		infinite: true,
		fade: false,
		speed: 300,
		adaptiveHeight: true,
		autoplaySpeed: 8000,
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		}, 
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1 // width of screen
			}
		}]
	});
});