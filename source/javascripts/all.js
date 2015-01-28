//= require "jquery-2.1.1.min"
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
//= require "custom"


  
// Signup Form

$(document).ready(function() {
  "use strict";

  var signUpForm = $('#signup_form');
  var messageArea = $(".message");
  var emailArea = $("#mce-EMAIL");
  var planArea = $('#mce-PLAN');

  var invalidEmailInstructions = "<span style='color:#D91E18;'>The email address you entered was invalid. Please make sure you enter a valid email address to sign up.</span>";
  var successInstructions = '<span style="color:#87D37C;">Great! Please confirm your email address by following the instructions we just sent you.</span>';
  var errorInstructions = "Could not connect to the registration server. Please send an email to hello {at} octaviuslabs.com"
  signUpForm.submit(function() {
    if (!valid_email_address(emailArea.val()))
      {
        messageArea.html("<span style='color:#D91E18;'>The email address you entered was invalid. Please make sure you enter a valid email address to sign up.</span>");
      }
    else
      {
        messageArea.html("<span style='color:#BFBFBF;'>Adding to the early access group...</span>");
        var plan_name = $('#mce-PLAN').val();
        $.ajax({
            type: signUpForm.attr('method'),
            url: signUpForm.attr('action'),
            data: signUpForm.serialize(),
            cache       : false,
            dataType    : 'json',
            contentType: "application/json; charset=utf-8",
            error       : function(err) { 
              ga('send', 'event', "signups", "new", plan_name + "_error");
              alert(errorInstructions); 
              messageArea.html(errorInstructions);
            },
            success     : function(data) {
                if (data.result != "success") {
                  ga('send', 'event', "signups", "new", plan_name + "_error");
                  messageArea.html(invalidEmailInstructions);
                } else {
                  ga('send', 'event', "signups", "new", plan_name + "_success");
                  window['optimizely'] = window['optimizely'] || [];
                  window.optimizely.push(["trackEvent", "newSignup"]);
                  $("#mce-EMAIL").val("");
                  messageArea.html(successInstructions);
                }
            }
        });
      }
   
      return false;     
  });
  
});

function valid_email_address(email) {
  var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
  return pattern.test(email);   
}

// Toggles Button
function switch_plan_to(plan_name){
  console.log("Set plan to " + plan_name);
  $('#mce-PLAN').val(plan_name);
  return plan_name;
};

$('#select_ulimited_plan').click(function() {
  switch_plan_to("unlimited_forver");
});

$('#select_beta_plan').click(function() {
  switch_plan_to("beta_user");
});

// Form Validators

$(document).ready(function(){

  "use strict";

  $(".form_register form").validate({
    rules:{ 
      first_name:{
        required: true,
        minlength: 2,
        maxlength: 16,
        },
        email:{
          required: true,
          email: true,
        },
        phone:{
          required: true,
          digits: true,
          }
        },
        messages:{
            email:{
              required: "We need your email address to contact you",
              email: "Your email address must be in the format of name@domain.com"
            }, 
            phone:{
              required: "Please enter only digits",
              digits: "Please enter a valid number"
            }, 
          }
  });     
  
});

// Scrolling 

jQuery(function($) {
  smoothScroll.init({
    speed: 1000,
    easing: 'easeInOutQuart'
  });
  // $('.tour').panelSnap();
});