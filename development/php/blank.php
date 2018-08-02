<?php 
$page_title = "Blank Page";
$page_description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, consequuntur.";
$page_keywords = "prosthetics, ocular, eyes, nashville, health, vision";

include('includes/top.php'); ?>
<body class="subpage">
	<div class="master-container">

			<?php include('includes/header.php'); ?>

		<div class="container">

			{{> partials/nav}}

			<div id="main" tabindex="-1" role="main">
				<h1 class="page-title">{{page.title}}Page Title</h1>
				<div class="content">
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
									<h1>Heading Example 1</h1>
									<p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
									<h2>Heading Example 2</h2>
									<h3>Sub-Heading Example 3</h3>
									<ul>
										<li>Nam ne cante sed lacinia</li>
										<li>Urna non tincidunt mattis</li>
										<li>Tortor neque adipiscing diam</li>
										<li>Ante quis turpis <a href="">example link</a></li>
									</ul>

									<h4>Heading Example 4</h4>
									<h5>Heading Example 5</h5>
									<p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus.</p>
									<blockquote>Example Blockquote or standout type. Sed dignissim lacinia nunc. Curabitur tortor.</blockquote>
									<p>Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede.</p>
									<h6>Heading Example 6</h6>
									<p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus.</p>
									<ul>
										<li>Nam nec ante sed lacinia</li>
										<li>Ante quis turpis <a href="">example link</a></li>
									</ul>
				</div>
			</div>

		</div>

		<?php include('includes/footer.php'); ?>

	</div>

	<?php include('includes/scripts.php'); ?>

</body>
</html>
