# BannoBootstrap 3

BannoBootstrap 3 is a group of files used as a starting point for developing a website on the Banno CMS. The README file contains the do's and dont's of building a website.

## Recent Updates
- Site structure set up so that bootstrap modifications are custom child elements, so that Bootstrap could be upgrade in the future without changing the look of the custom design.
- Script file has been streamlined and slimmed down for better performance.
- Created mustache “blocks” for commonly used elements like accordions, tabs, sliders, subAds, etc.
- NPM project can easily be updated by running “npm update” and will upgrade all modules and plugins.
- Javascript plugins are set up correctly so they can be installed and updated with one command.
- Project should run easily always using the latest version of node.
- NPM modules that were deprecate and contained security flaws have been upgrade or replaced.
- Removed inline javascript from footer that sets the date because using document.write is a deprecated javascript method. This is now set in the main javascript file.
- animate.css library installed by default.
- All variables, colors, and components are set in the main.scss file and over-writable in the “custom” folder without modifying the core bootstrap files.
- All text editor type using .content class editable in one file, type.scss
- Removed redundant slick classes.
- Moved .keypress functions to the “non-cms” only scripts to prevent accordions with button role from being un-editable in the CMS because you cannot use the space bar.
- Contains built in pixel to rem gulp tasks, eliminating the need for inline pixel conversions.
- $(".loader") scripts for preloading images with animated loading icons
- Simplified the Disclaimer set to eliminate the need for 4 different messages.
- .screener class and getScreenSize function allows you to write custom javascript that is based on the set screen size.


### Do's

### Dont's
- Don't use any class on the <body> tag that will effect the CMS ex. .table.

## Hidden Content Areas
- Add the class .hidden-content to any tag that you want hidden.
- As long as no text or image is inside of that div, the div will be styled with display: none;

**HTML**

	<div class="hidden-content">
		// Empty div
	</div>

## Slider
- [SlickJS](http://kenwheeler.github.io/slick/)

**HTML**

    <div class="slider">
		<div class="slide">
		  <div class="hero-img">
		    <div class="content" data-content-block="hero1" data-content="content" data-editable="editable">
		      {{#page.hero1}}
		        {{& content}}
		      {{/page.hero1}}

		      <!-- @if NODE_ENV!='production' -->
		        <img src="/assets/img/hero.jpg" alt="">
		      <!-- @endif -->
		    </div> 
		    <div class="overlay"></div>
		  </div>
		  <div class="hero-txt wow" data-wow-animation="fadeInUp" data-wow-duration="2s">
		    <div class="content" data-content-block="hero2" data-content="content" data-editable="editable">
		      {{#page.hero2}}
		        {{& content}}
		      {{/page.hero2}}

		      <!-- @if NODE_ENV!='production' -->
		        <h2>savings accounts</h2>
		        <h1>FOR YOUR FAMILY’S FUTURE</h1>
		        <a href="" class="btn btn-primary">Learn More</a>
		      <!-- @endif -->
		    </div>  
		  </div>
		</div>
		<div class="slide">
		  <div class="hero-img">
		    <div class="content" data-content-block="hero3" data-content="content" data-editable="editable">
		      {{#page.hero3}}
		        {{& content}}
		      {{/page.hero3}}

		      <!-- @if NODE_ENV!='production' -->
		        <img src="/assets/img/hero.jpg" alt="">
		      <!-- @endif -->
		    </div>  
		    <div class="overlay"></div>
		  </div>
		  <div class="hero-txt wow" data-wow-animation="fadeInUp" data-wow-duration="2s">
		    <div class="content" data-content-block="hero4" data-content="content" data-editable="editable">
		      {{#page.hero4}}
		        {{& content}}
		      {{/page.hero4}}

		      <!-- @if NODE_ENV!='production' -->
		        <h2>savings accounts</h2>
		        <h1>FOR YOUR FAMILY’S FUTURE</h1>
		        <a href="" class="btn">Learn More</a>
		      <!-- @endif -->
		    </div>  
		  </div>
		</div>    
    </div>

 **JS**

        $('.slider').slick({
          dots: true,
          infinite: true,
          fade: true,
          speed: 400,
          adaptiveHeight: true,
          autoplaySpeed: 5000,
          autoplay: true,
          arrows: false
        });


## Tables
- The CMS creates a table with a class of table (<table class="table"></table>)
- Their is no <thead> or <th> tags

**HTML**

	<table class="table">
		<tbody>
			<tr>
				<td>1</td>
				<td>1</td>
				<td>1</td>
				<td>1</td>
			</tr>
			<tr>
				<td>2</td>
				<td>2</td>
				<td>2</td>
				<td>2</td>
			</tr>
			<tr>
				<td>3</td>
				<td>3</td>
				<td>3</td>
				<td>3</td>
			</tr>
			<tr>
				<td>4</td>
				<td>4</td>
				<td>4</td>
				<td>4</td>
			</tr>
		</tbody>
	</table>


## Accordions
- A class of .hidden-content is added to the BS3 tabs to be able to hide panels that arent being used.
- Be sure that the _panels.scss is being included from the _bootstrap.scss file
- The collapse.js file should already be included in the gulpfile.js

**HTML - 5 Accordions**

    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
      <div class="panel hidden-content">
        <div class="panel-heading" role="tab" id="headingOne">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            <div class="content" data-content-block="bodyCopy1" data-content="content" data-editable="editable">
              {{#page.bodyCopy1}}
                {{& content}}
              {{/page.bodyCopy1}}
              <!-- @if NODE_ENV!='production' -->
                <h6 class="title">Checking</h6>
              <!-- @endif -->
            </div> 
          </a>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
          <div class="panel-body">
            <div class="content" data-content-block="bodyCopy2" data-content="content" data-editable="editable">
              {{#page.bodyCopy2}}
                {{& content}}
              {{/page.bodyCopy2}}
              <!-- @if NODE_ENV!='production' -->
                <a href="">Links and such</a>
              <!-- @endif -->
            </div>
          </div>
        </div>
      </div>
      <div class="panel hidden-content">
        <div class="panel-heading" role="tab" id="headingTwo">
          <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <div class="content" data-content-block="bodyCopy3" data-content="content" data-editable="editable">
              {{#page.bodyCopy3}}
                {{& content}}
              {{/page.bodyCopy3}}
              <!-- @if NODE_ENV!='production' -->
                <h6 class="title">Checking</h6>
              <!-- @endif -->
            </div> 
          </a>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
          <div class="panel-body">
            <div class="content" data-content-block="bodyCopy4" data-content="content" data-editable="editable">
              {{#page.bodyCopy4}}
                {{& content}}
              {{/page.bodyCopy4}}
              <!-- @if NODE_ENV!='production' -->
                <a href="">Links and such</a>
              <!-- @endif -->
            </div>
          </div>
        </div>
      </div>
      <div class="panel hidden-content">
        <div class="panel-heading" role="tab" id="headingThree">
          <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <div class="content" data-content-block="bodyCopy5" data-content="content" data-editable="editable">
              {{#page.bodyCopy5}}
                {{& content}}
              {{/page.bodyCopy5}}
              <!-- @if NODE_ENV!='production' -->
                <h6 class="title">Checking</h6>
              <!-- @endif -->
            </div> 
          </a>
        </div>
        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
          <div class="panel-body">
            <div class="content" data-content-block="bodyCopy6" data-content="content" data-editable="editable">
              {{#page.bodyCopy6}}
                {{& content}}
              {{/page.bodyCopy6}}
              <!-- @if NODE_ENV!='production' -->
                <a href="">Links and such</a>
              <!-- @endif -->
            </div>
          </div>
        </div>
      </div>
      <div class="panel hidden-content">
        <div class="panel-heading" role="tab" id="headingFour">
          <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            <div class="content" data-content-block="bodyCopy7" data-content="content" data-editable="editable">
              {{#page.bodyCopy7}}
                {{& content}}
              {{/page.bodyCopy7}}
              <!-- @if NODE_ENV!='production' -->
                <h6 class="title">Checking</h6>
              <!-- @endif -->
            </div> 
          </a>
        </div>
        <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
          <div class="panel-body">
            <div class="content" data-content-block="bodyCopy8" data-content="content" data-editable="editable">
              {{#page.bodyCopy8}}
                {{& content}}
              {{/page.bodyCopy8}}
              <!-- @if NODE_ENV!='production' -->
                <a href="">Links and such</a>
              <!-- @endif -->
            </div>
          </div>
        </div>
      </div>
      <div class="panel hidden-content">
        <div class="panel-heading" role="tab" id="headingFive">
          <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
            <div class="content" data-content-block="bodyCopy9" data-content="content" data-editable="editable">
              {{#page.bodyCopy9}}
                {{& content}}
              {{/page.bodyCopy9}}
              <!-- @if NODE_ENV!='production' -->
                <h6 class="title">Checking</h6>
              <!-- @endif -->
            </div> 
          </a>
        </div>
        <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
          <div class="panel-body">
            <div class="content" data-content-block="bodyCopy10" data-content="content" data-editable="editable">
              {{#page.bodyCopy10}}
                {{& content}}
              {{/page.bodyCopy10}}

              <!-- @if NODE_ENV!='production' -->
                <a href="">Links and such</a>
              <!-- @endif -->
            </div>
          </div>
        </div>
      </div>
    </div>

## Tabs
- CSS may need to be changed in order to make the .hidden-content class work on the tab by removing the display: block; from the .nav > li > a { display: block; }; inside of the _navs.scss file

**HTML**
	
	<!-- Tabs -->
	<ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#tab1" class="hidden-content" aria-controls="tab1" role="tab" data-toggle="tab">
        <div class="content" data-content-block="bodyCopy1" data-content="content" data-editable="editable">
          {{#page.bodyCopy1}}
            {{& content}}
          {{/page.bodyCopy1}}

          <!-- @if NODE_ENV!='production' -->
           Checking
          <!-- @endif -->
        </div> 
      </a></li>
      <li role="presentation"><a href="#tab2" class="hidden-content" aria-controls="tab2" role="tab" data-toggle="tab">
        <div class="content" data-content-block="bodyCopy2" data-content="content" data-editable="editable">
          {{#page.bodyCopy2}}
            {{& content}}
          {{/page.bodyCopy2}}

          <!-- @if NODE_ENV!='production' -->
            Savings
          <!-- @endif -->
        </div> 
      </a></li>
      <li role="presentation"><a href="#tab3" class="hidden-content" aria-controls="tab3" role="tab" data-toggle="tab">
        <div class="content" data-content-block="bodyCopy3" data-content="content" data-editable="editable">
          {{#page.bodyCopy3}}
            {{& content}}
          {{/page.bodyCopy3}}

          <!-- @if NODE_ENV!='production' -->
            Personal
          <!-- @endif -->
        </div> 
      </a></li>
      <li role="presentation"><a href="#tab4" class="hidden-content" aria-controls="tab4" role="tab" data-toggle="tab">
        <div class="content" data-content-block="bodyCopy4" data-content="content" data-editable="editable">
          {{#page.bodyCopy4}}
            {{& content}}
          {{/page.bodyCopy4}}

          <!-- @if NODE_ENV!='production' -->
           Business
          <!-- @endif -->
        </div> 
      </a></li>
    </ul>  

    <!-- Tab panes -->
    <div class="tab-content">
      <div role="tabpanel" class="tab-pane active" id="tab1">
        <div class="content" data-content-block="bodyCopy5" data-content="content" data-editable="editable">
          {{#page.bodyCopy5}}
            {{& content}}
          {{/page.bodyCopy5}}

          <!-- @if NODE_ENV!='production' -->
            <h1 class="title">Checking</h1>
          <!-- @endif -->
        </div> 
      </div>
      <div role="tabpanel" class="tab-pane" id="tab2">
        <div class="content" data-content-block="bodyCopy6" data-content="content" data-editable="editable">
          {{#page.bodyCopy6}}
            {{& content}}
          {{/page.bodyCopy6}}

          <!-- @if NODE_ENV!='production' -->
            <h1 class="title">Savings</h1>
          <!-- @endif -->
        </div> 
      </div>
      <div role="tabpanel" class="tab-pane" id="tab3">
        <div class="content" data-content-block="bodyCopy7" data-content="content" data-editable="editable">
          {{#page.bodyCopy7}}
            {{& content}}
          {{/page.bodyCopy7}}

          <!-- @if NODE_ENV!='production' -->
            <h1 class="title">Personal</h1>
          <!-- @endif -->
        </div> 
      </div>
      <div role="tabpanel" class="tab-pane" id="tab4">
        <div class="content" data-content-block="bodyCopy8" data-content="content" data-editable="editable">
          {{#page.bodyCopy8}}
            {{& content}}
          {{/page.bodyCopy8}}

          <!-- @if NODE_ENV!='production' -->
            <h1 class="title">Business</h1>
          <!-- @endif -->
        </div> 
      </div>
    </div> 

## Modals

**HTML**

	<!-- Button trigger modal -->
	<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
	  Launch demo modal
	</button>

	<!-- Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	      </div>
	      <div class="modal-body">
	        <div class="content" data-content-block="bodyCopy" data-content="content" data-editable="editable">
	          {{#page.bodyCopy}}
	            {{& content}}
	          {{/page.bodyCopy}}

	          <!-- @if NODE_ENV!='production' -->
	            <h1 class="title">Business</h1>
	          <!-- @endif -->
	        </div> 
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        <button type="button" class="btn btn-primary">Save changes</button>
	      </div>
	    </div>
	  </div>
	</div>
	
