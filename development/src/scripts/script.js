// Make sure we don't overwrite our namespace
if (banno === null || banno === undefined)
    var banno = {};
if (banno.site === null || banno.site === undefined)
    banno.site = {};


// Set your bank name here which is used throughout disclaimers.
banno.site.name = 'YourFI';
banno.site.dropdownMouseEventsOn = false;

// Overrides the default disclaimer message for the ATM Locator and is also the message for external links.

function setDisclaimerVerbiage(p,t) {
    var proceed = "<br/><br/>If you \"Proceed\",";
    if(p==="mobile") {
      proceed = "If you click \"Ok\",";
    }
    if(t==="email") {
        return 'Because there is a risk that information transmitted via Internet email could fall into the wrong hands, ' + banno.site.name + ' suggests that confidential information, such as account numbers or social security numbers, not be transmitted via email. If this information must be stated, please contact ' + banno.site.name + ' by phone or at your nearest office. '+proceed+' the link will open a new email message in your default email program.';
    } else {
      return 'You will be linking to another website not owned or operated by ' + banno.site.name + '. ' + banno.site.name + ' is not responsible for the availability or content of this website and does not represent either the linked website or you, should you enter into a transaction. The inclusion of any hyperlink does not imply any endorsement, investigation, verification or monitoring by ' + banno.site.name + ' of any information in any hyperlinked site. We encourage you to review their privacy and security policies which may differ from ' + banno.site.name + '.' + proceed +' the link will open in a new window.';
    }
}

// Initialize our banno.site namespace and kick off needed methods here
banno.site.initialize = function() {
    banno.site.setExternalLinks();
    banno.site.createExternalEmailModal();
    banno.site.attachEventHandlers();
    banno.site.dropdownHandling();
    banno.site.displayAlert();
}

// Disclaimer Methods
banno.site.setExternalLinks = function(scope) {
    $.expr[':'].external = function(obj) {
        return !obj.href.match(/^mailto\:/)
        && (obj.hostname != location.hostname)
        && !obj.href.match(/^javascript/)
        && !obj.href.match(/^tel\:/)
        && !obj.href.match(/^$/)
        && !obj.href.match(/^https\:\/\/pass\.t8webware\.com/);
    };
    $('a:external', scope).addClass('external');
    $('a:external[name]', scope).removeClass('external');
}

banno.site.createExternalEmailModal = function() {
    $('a[href^="mailto:"]').click(function(e) {
        e.preventDefault();
        var mailToMsg = setDisclaimerVerbiage("desktop","email");
        var mobileMailToMsg = setDisclaimerVerbiage("mobile","email");
        var outboundBump = $(this).attr('href');
        if (Modernizr.mq('only all and (max-width: 767px)')) {
            var r = confirm(mobileMailToMsg);
            if (r === true) {
                window.open(outboundBump);
            }
        }
        else {
          bootbox.confirm(mailToMsg, 'Cancel', 'Proceed', function(result) {
              if (result) {
                  $('.modal-backdrop').hide();//fix for modal backdrop in safari
                  window.open(outboundBump);
              }
          });
        }
    });
}

banno.site.openNewWindow = function() {
    $('a').each(function() {
      if ( $(this).attr('target') == '_blank') {
          $(this).append("<span class='sr-only'> (Opens in a new Window)</span>");
      }
    });
}
banno.site.setDisclaimers = function(link) {
    var speedbump = link.attr('href');
    var exitMsg = setDisclaimerVerbiage("desktop","external");
    var mobileExitMsg = setDisclaimerVerbiage("mobile","external");
    var test = $('bootbox.modal').hasClass('in');
    if(test===false) {
      if (Modernizr.mq('only all and (max-width: 767px)')) {
          var r = confirm(mobileExitMsg);
          if (r === true) {
              window.open(speedbump);
          }
      }
      else {
        bootbox.confirm(exitMsg, 'Cancel', 'Proceed', function(result) {
            if (result) {
                $('.modal-backdrop').hide();//fix for modal backdrop in safari
                window.open(speedbump);
            } else {
              $('.bootbox.modal').on('hidden.bs.modal', function (e) {
                   $(link).focus();
               });
            }
        });
      }
    }
}

banno.site.attachEventHandlers = function(scope) {
    $("a.external", scope).on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
        banno.site.setDisclaimers($(this));
    });
    $(".social-feed-container").on('click',"a.external", function(e) {
        e.preventDefault();
        e.stopPropagation();
        banno.site.setDisclaimers($(this));
    });
    // Un comment to add Disclaimers to the news feed
    // =======================================================================
    // $('.b-news', scope).bind('bannoDataReceived', function(event, scope) {
    //     if(scope !== null && scope !== undefined){
    //         banno.site.setExternalLinks(scope);
    //         banno.site.attachEventHandlers(scope);
    //     }
    // });
}

banno.site.dropdownHandling = function(){
    var $dropdowns = $('.dropdown');

    // If width is above 979, add hover events (also force IE to use hover since the modernizr query doesn't run in IE)
    if(Modernizr.mq('(min-width: 979px) and (orientation: landscape)') || navigator.appName == 'Microsoft Internet Explorer') {
        if(!banno.site.dropdownMouseEventsOn){
            // Mouse events are on, so set flag
            banno.site.dropdownMouseEventsOn = true;

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
        if(banno.site.dropdownMouseEventsOn){
            $dropdowns.off('mouseover').off('mouseleave');
            banno.site.dropdownMouseEventsOn = false;
        }
    }
}


$(window).bind('bannoDataReceived', function(event, scope) {
    if(scope !== null && scope !== undefined){
        banno.site.setExternalLinks(scope);
        banno.site.attachEventHandlers(scope);
    }
});

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

banno.site.displayAlert = function() {
  var alert=readCookie("alert");
  if(alert == null && $.trim($('.alert.hidden-alert .alert-body').text())) {

    $('.alert.hidden-alert').show();
  }
}

// Function to get screen size, used in conjunction with the .screener class, 
// typically placed in the footer
// ==========================================================================
banno.site.getScreenSize = function() {
  var s = $(".screener").css("content").replace(/\"/g,"");
  switch(s) {
    case "right":  return "mobile"; break;
    case "xsmall":   return "tablet"; break;
    default: return "desktop"; break;
  }
}

// function to set the overflow of the table container div and show/hide the swiper
// ==========================================================================
banno.site.setTableScrolling = function() {
  $(".table-responsive").each(function(){
      var c = $(this).outerWidth();
      var t = $(this).find("table").width();
      //console.log(c,t);
      if(t > c) {
        $(this).css({"overflow-x": "scroll"});
        $(this).prev().show();
      } else {
        $(this).css({"overflow-x": "hidden"});
        $(this).prev().hide();
      }
  });
}


// Check to see if user is editing the site using top != self.
// If they aren't start the slideshow and do not show #success on form pages
// ==================================================================================================================================
$(window).load(function() {
    if (top != self) {
        $('.success-container').show();
        $('body').addClass('edit');
        $('.alert.hidden-alert').show();
        $('.slider').slick({
          dots: true,
          infinite: true,
          fade: true,
          cssEase: 'linear',
          autoplay: false,
          autoplaySpeed: 8000,
          draggable: false
        });
        $('.subads__slider').slick({
          dots: false,
          infinite: false,
          fade: true,
          accessibility: false,
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
    } else {
        $('.slider').slick({
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
        banno.site.openNewWindow();
        $('.success-container').hide();
        $(".table-responsive").each(function(){
            $(this).prepend('<div class="swiper text-center">&laquo; Swipe for More &raquo;</div>');
        });
        banno.site.setTableScrolling();
    }
})

$(function () {
    //Setup jquery placeholder
    // ==================================================================================================================================
    $('input, textarea').placeholder();

    $('.dropdown > .category-item, .dropdown > .group-item, span.dropdown-toggle').addClass('dropdown-toggle').attr('data-toggle','dropdown');

    // Run functions in initialize
    // ==================================================================================================================================
    banno.site.initialize();

    // Resize event handler
    // ==================================================================================================================================
    $(window).smartresize(function(){
        banno.site.dropdownHandling();
        banno.site.setTableScrolling();
    });

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
    $('[role="button"]').keypress(function(e){
      if(e.which === 32 || e.which === 13){  // 32 == spacebar, 13 == enter
        e.preventDefault();
        $(this).get(0).click();
      }
    });

    // Close Alert
    // ==================================================================================================================================
    $('.alert button.close').on('click', function(e) {
        e.preventDefault();
        createCookie('alert', true, 1);
        $('.alert').hide();
    });

    // Mobile Menu Functionality
    // ==================================================================================================================================

    // First we dont want the submenus to close on us when clicking a group item
    $('.navbar-collapse ul.banno-menu>li.dropdown>.dropdown-menu').on('click',function (e) {
      //e.preventDefault();
      e.stopPropagation();
    });

    $('.navbar-collapse ul.banno-menu li .dropdown-menu>li>span').on('click',function (e) {
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

    // Animation when scroll is clicked.
    // ==================================================================================================================================
    $('#scrollTop').on('keydown', function(e) {
        var code = e.keyCode;
        if(code === 13 || code === 32) {
          e.preventDefault();
          $('html,body').animate({scrollTop: 0},600, function(){
            $('.logo').focus();
          }); // scroll to top for all other browsers
        }
    });
    $('#scrollTop').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: 0},600, function(){
            $('.logo').focus();
        }); // scroll to top for all other browsers   
    });

    $(".hidden-content").each(function() {
      if (window.self !== window.top || $.trim($(this).text()) || $(this).has("img").length) {
        return $(this).show();
      } else {
        $(this).remove();
      }
    });

    // Forms
    // ==================================================================================================================================
    $('.ajax-form').submit(function(e) {
      var submittableForm;
      var formId = $(this).find(".form-id-input").val();
      //console.log(formId);
      e.preventDefault();
      if ($(this).parsley().isValid() === true) {
        submittableForm = $(this);
        formContainer = $(this).parent().parent().find('.form-container');
        successContainer = $(this).parent().parent().find('.success-container');
        return $.ajax({
          type: 'POST',
          url: '/_/api/form/'+formId+'/entries',
          data: submittableForm.serialize(),
          success: function() {
            formContainer.hide();
            successContainer.fadeIn();
            if(submittableForm.hasClass("no-scroll")===false) {
               $("html, body").animate({
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
          error: function() {
            submittableForm.find('button[type=submit]').removeAttr('disabled');
            submittableForm.find('.loading').fadeOut('500');
            return submittableForm.find('div.error').delay('600').fadeIn().removeAttr('aria-hidden');
          }
        });
      }
    });


});
