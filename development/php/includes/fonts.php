<script type="text/javascript">

        (function () {
          "use strict";
          //$.support.cors=true;

          // once cached, the css file is stored on the client forever unless
          // the URL below is changed. Any change will invalidate the cache
          var css_href = '/assets/css/fonts.css?v='+Math.floor(Date.now() / 1000)+'';
          // a simple event handler wrapper
          function on(el, ev, callback) {
            if (el.addEventListener) {
              el.addEventListener(ev, callback, false);
            } else if (el.attachEvent) {
              el.attachEvent("on" + ev, callback);
            }
          }
          
          // if we have the fonts in localStorage or if we've cached them using the native batrowser cache
          if ((window.localStorage && localStorage.font_css_cache) || document.cookie.indexOf('font_css_cache') > -1){
            // just use the cached version
            injectFontsStylesheet();
          } else {
           // otherwise, don't block the loading of the page; wait until it's done.
            on(window, "load", injectFontsStylesheet);
          }
          
          // quick way to determine whether a css file has been cached locally
          function fileIsCached(href) {
            return window.localStorage && localStorage.font_css_cache && (localStorage.font_css_cache_file === href);
          }

          // time to get the actual css file
          function injectFontsStylesheet() {
           // if this is an older browser
            if (!window.localStorage || !window.XMLHttpRequest) {
              var stylesheet = document.createElement('link');
              stylesheet.href = css_href;
              stylesheet.rel = 'stylesheet';
              stylesheet.type = 'text/css';
              document.getElementsByTagName('head')[0].appendChild(stylesheet);
              // just use the native browser cache
              // this requires a good expires header on the server
              document.cookie = "font_css_cache";
            
            // if this isn't an old browser
            } else {

                // use the cached version if we already have it
              if (fileIsCached(css_href)) {
                
                injectRawStyle(localStorage.font_css_cache);
                // otherwise, load it with ajax
              } else {
                var request = createCORSRequest("GET", css_href);
                if (request){
                    request.onreadystatechange = function () {
                      if (request.readyState === 4) {
                        // once we have the content, quickly inject the css rules
                        injectRawStyle(request.responseText);
                        // and cache the text content for further use
                        // notice that this overwrites anything that might have already been previously cached
                        localStorage.font_css_cache = request.responseText;
                        localStorage.font_css_cache_file = css_href;
                      }
                    };
                    request.send();
                }
              }
            }
          }

          function createCORSRequest(method, url){
              var xhr = new XMLHttpRequest();
              // Check if the XMLHttpRequest object has a "withCredentials" property.
              // "withCredentials" only exists on XMLHTTPRequest2 objects.
              if ("withCredentials" in xhr){
                  xhr.open(method, url, true);
              // Otherwise, check if XDomainRequest.
              // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
              } else if (typeof XDomainRequest != "undefined"){
                  xhr = new XDomainRequest();
                  xhr.open(method, url);
              } else {
                  // Otherwise, CORS is not supported by the browser.
                  xhr = null;
              }
              return xhr;
          }


          // this is the simple utitily that injects the cached or loaded css text
          function injectRawStyle(text) {
            var style = document.createElement('style');
            // cater for IE8 which doesn't support style.innerHTML
            style.setAttribute("type", "text/css");
            if (style.styleSheet) {
                style.styleSheet.cssText = text;
            } else {
                style.innerHTML = text;
            }
            document.getElementsByTagName('head')[0].appendChild(style);
          }

        }());
    </script>