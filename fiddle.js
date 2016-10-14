/**
*
* This file handle the events for external link to support Single Sign On (SSO)
* Every time user click any exterlink an ajax will go to webid.<parent domain of external link>
* to say the GSSSO cookie from current domain.
* This class is a singleton class, so that only one instance will maintain in a page.
*/
(function(MODULE, $, undefined) {
	var _SSOInstance,
		Singleton = function() {};
	/**
	 * @constructor
	 * @param: options passed while initialization, config param
	 */
	MODULE.SSO = function(objSingleton) {
		if(!(objSingleton instanceof Singleton)){
			return "ERROR: It's a Singleton Class. Use getInstance function to access the single instance of this class";
		}
	};
	/**
	 * getInstance: Static function which return the single instance of CatalystManager
	 */
	MODULE.SSO.getInstance = function(){
		if (_SSOInstance) {
			return _SSOInstance;
		}
		_SSOInstance = new MODULE.SSO(new Singleton());
		return _SSOInstance;
	};
	/**
	 * @prototype
	 */
	MODULE.SSO.prototype = function() {
		// private
		/**
		* list of root domains. Each domain will have a unique namespace
		*/
		var
			/*
			 * This is domain object, which contain key and value, key will be the domain name and value is WEBID SSO url.
			*/
			_availableDomains = $("#SSODomains").length ? JSON.parse($("#SSODomains").val()) : {},
			/*
			 * SGM Utility object
			 */
			_util = SGM.GSAMTPD.Utility,
			/**
             *   setCookie function is used to make a CORS to share cookie between domains
             *   @domain: Target domain for which the cookie need to be saved for SSO
             *   @cookieValue:  GSSSO cookie from the current site/domain
             *   @callBack: call back method for passing back the ajax response
             **/
            _setCookie = function(domain, cookieValue, href, callBack){
            	var that = this;
            	if(cookieValue){
            		/**
                     *  Ajax Post Url
                     */
                    if(_util.isSafari()) {
                        if(!document.ssoForm) {
                            $('<form id="ssoForm" name="ssoForm" method=post action="'+_availableDomains[domain]["url"]+'" target="newWindow"><input id="gssso" name="gssso" value="'+cookieValue+'" /></form>').appendTo('body');
                        }
                        var ssoWindow = window.open("","newWindow");
                        document.ssoForm.submit();
                        $(ssoWindow.document).ready(function(){
                           ssoWindow.location.href = href;
                        });
                        return;
                    }
            		$.ajax({
                        url: _availableDomains[domain]["url"],
                        dataType: "json",
                        type: 'POST',
                        async: false,
        				xhrFields: {
        					withCredentials: true
        				},
                        data:{
                            'GSSSO': cookieValue       // GSSSO cookie value from the current site/domain
                        },
                        success: function(data){
                            that.accessResponse(domain, data, callBack);
                        },
                        error: function(data){
                            that.accessResponse(domain, data, callBack);
                        }
                    });


            	}
            };
        isSafari = function(){

        }

		return {
			/**
			 * Initialize SSO plugin class
			 * @options, if passed from initializer else a blank object
			 */
			init: function(options) {
				var that = this;
				that.opts = $.extend({}, options);
				that.cookieValue = _util.CookieManager.getCookie('GSSSO');
				that.bindClick();
			},
			/**
			 * Method to bind click event in all links
			 */
			bindClick: function(){
				var that = this;
                /**
                * Bind click event on link where target is _blank,
                * Prevent default action and redirect to link when SSO call is complete
                * Binding event on body, In some cases links are dynamically created.
                */
				$("body [target='_blank']").on("click", function(e){
                    console.log("inside bind");
                    e.preventDefault();
					var href = $(this).attr("href");
					if(href){
						that.click(href);
					}
                    if(_util.isSafari()) {
                        return false;
                    }
				});
			},
			/**
             * Method to handle click event on target element
             * @href: string, link href value
             * @callBack: function, callBack function after SSO Ajax call
             */
            click: function(href, callBack){
            	var that = this,
            		domainArray = that.extractDomain(href).split('.'),
            		index, domain;

            	// traverse available domains to find the root domain of the target url.
            	for(var domainKey in  _availableDomains){
            		if(_availableDomains.hasOwnProperty(domainKey)){
            			index = domainArray.indexOf(domainKey);
            			if(index > -1){
            				// Get domain, where cookie need to be set.
    		            	// For Example: if target Url is https://360.gs.com
    		            	// then its domain will be gs
            				domain = domainKey;
                			break;
                		}
            		}
            	}

            	// check current domain is valid &
            	// cookie exists
            	if(domain && that.cookieValue){
            		_setCookie.call(that, domain, that.cookieValue, href, callBack);
            		 //set sso property true against domain in _availableDomains object.
            		_availableDomains[domain].sso = true;
            	}else{
            		typeof(callBack) === "function" && callBack();
            	}
            },
            /**
     	    *   Response of ajax call will be handeled here.
     	    *   @domain current domain name
     	    *   @data: response data from ajax in both cases success as well as failure.
     	    *   @callBack: callBack function to be called for passing back the ajax response.
     	    **/
     	    accessResponse : function(domain, data, callBack){
     	    	typeof(callBack) === "function" && callBack();
     	    },
            /**
            *	Extract domain from anc href.
            *	@url: href string of external url
            **/
            extractDomain: function(url) {
			    var domain = "";
			    //find & remove protocol (http, ftp, etc.) and get domain
			    if (url.indexOf("://") > -1) {
			        domain = url.split('/')[2];
			        //find & remove port number
				    domain = domain.split(':')[0];
			    }
			    return domain;
			}

		};
	}();
})(SGM.GSAMTPD.App || {}, jQuery);
