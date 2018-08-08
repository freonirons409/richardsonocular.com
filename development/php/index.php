<?php 
$page_title = "Home";
$page_description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, consequuntur.";
$page_keywords = "prosthetics, ocular, eyes, nashville, health, vision";

include('includes/top.php'); ?>
<body class="home">
	<div class="master-container">
		
			<?php include('includes/header.php'); ?>
			
			<div id="main" tabindex="-1" role="main">

				<?php include('includes/slider-hero.php'); ?>


				<div class="fullWidthContentArea__container">
					<div class="container content">
						<div class="row">
							<div class="col text-center fullWidthContentArea__headline">
								<h2>VISIT OR CALL</h2>
							</div>
						</div>
						<div class="spacer-40"></div>
						<div class="row">
							<div class="col-md-6 left-column">
								<img src="/assets/img/icon-location.png" alt="Address" class="float-sm-left">
								<h3 class="h6">Main Office</h3>
								<h4 class="h3">329 21st Ave North, Suite 2<br>Nashville, TN 37203 </h4>
							</div>
							<div class="col-md-6 right-column">
								<img src="/assets/img/icon-mobile.png" alt="Phone" class="float-sm-left">
								<h5 class="h6">Phone Number</h5>
								<h6 class="h3"><a href="tel:16153215611">(615) 321-5611</a></h6>
								<h6 class="h3"><a href="tel:18008743903">(800) 874-3903</a></h6>
							</div>
						</div>
					</div>
				</div>

				<div class="fourBlockContent__container">
					<div class="row">
						<div class="col-sm-6 bg-gradient">
							<div class="inside">
								<div><strong>Before</strong></div>
								<img src="/assets/img/eye2-before.jpg" alt="Eye Before Photo">
								<div class="spacer-10"></div>
								<div><strong>After</strong></div>
								<img src="/assets/img/eye2-after.jpg" alt="Eye After Photo">
							</div>
						</div>
						<div class="col-sm-6 bg-white">
							<div class="inside content">
								<h2>The Highest Quality</h2>
								<p>Being fitted with a prosthesis is the best way of getting back to your normal way of living after losing an eye.</p>
								<div><a href="#" class="btn btn-primary">View More Before &amp; Afters</a></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6 order-sm-2 bg-gradient">
							<div class="inside">
								<blockquote>"My artificial eye gives me confidence. It makes me feel that I am equal to everyone else."<br><cite>L.F. of KY.</cite></blockquote>
							</div>
						</div>
						<div class="col-sm-6 order-sm-1 bg-white">
							<div class="inside content">
								<h2>Testimonials</h2>
								<p>Matching your eye is our priority. Our tested and tried process never fails.</p>
								<div><a href="#" class="btn btn-primary">Read More Testimonials</a></div>	
							</div>
						</div>
					</div>
				</div>

				<div class="videoContent__container">
					<div class="container">
						<div class="row">
							<div class="col-xs-12 content">
								<div class="flex-video">
									<iframe width="560" height="315" src="https://www.youtube.com/embed/4sQ8i8stGRM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
								</div>
								<div class="spacer-20"></div>
								<h5 class="h2"><strong>Our Team In Action</strong></h5>
								<p>Watch the many step process that goes into one of our high quality prosthetics. This is a multistep process which can take 10s of hours and no step can be skipped for any eye.</p>
							</div>
						</div>
					</div>
				</div>
				
			</div>

		<?php include('includes/footer.php'); ?>

	</div>

	<?php include('includes/scripts.php'); ?>

</body>
</html>
