$('.gNavListlnk[href*="#"]').on("click", function(e){
SGM.GSAMTPD.Utility.isMobile() || SGM.GSAMTPD.Utility.isTablet() ?$(".js-gNavMenuBtn").trigger("click"): "";
$([document.documentElement, document.body]).animate({
        scrollTop: $("#"+$(e.target).attr("href").split("#")[1]).offset().top
    }, 2000);
})
