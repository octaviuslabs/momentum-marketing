//= require "bootstrap.min"
//= require "modernizr.custom"
//= require "jquery.easing"
//= require "retina"
//= require "jquery.stellar.min"
// %script{:defer => "defer", :src => "jquery.flexslider" >>>>>>> keeping this in here
//= require "jquery.flexslider"
//= require "jquery.parallax-1.1.3"
//= require"count-to"
//= require "jquery.appear"
// %script{:defer => "defer", :src => "count-to"} >>>>>>> keeping this in here
// %script{:defer => "defer", :src => "jquery.appear"} >>>>>>> keeping this in here
//= require "jquery.mixitup"
//= require "jquery.prettyPhoto"
//= require "owl.carousel"
//= require "jquery.easypiechart.min"
//= require "jquery.validate.min"
//= require "jquery.panelSnap"
// %script{:defer => "defer", :src => "jquery.validate.min" >>>>>>> keeping this in here
//= require "waypoints.min"
//= require "smooth-scroll.min"
//= require "typed.min"
//= require "custom"

// Scrolling 

jQuery(function($) {
  smoothScroll.init({
    speed: 1000,
    easing: 'easeInOutQuart'
  });
  // $('.tour').panelSnap();
});