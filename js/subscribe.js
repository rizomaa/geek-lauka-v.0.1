function initValidation($) {
  // Init mailchimp validator
  $.getScript('//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js')
  .done(function( script, textStatus ) {
    (function ($) { window.fnames = new Array(); window.ftypes = new Array(); fnames[0] = 'EMAIL'; ftypes[0] = 'email'; fnames[1] = 'FNAME'; ftypes[1] = 'text'; fnames[2] = 'LNAME'; ftypes[2] = 'text'; }(jQuery));
    var $mcj = jQuery.noConflict(true);
  });
    
  $.validator.addMethod("specificName", function(value, element) {
    return this.optional(element) || /^[A-Za-zА-Яа-яЁё]{1,22}$/.test(value);
  }, "Дапушчальныя толькі рускія і лацінскія сімвалы, не больш за 20");
  
  $.extend(jQuery.validator.messages, {
    required: "Поле павінна быць запоўнена",
    email: "Памылковы фармат адрасу"
  });
  
  $( "#mc-embedded-subscribe-form" )
  .submit(function(event){
    var $frm = $(this);
    if (!$frm.valid()){
        event.stopImmediatePropagation();
        event.preventDefault();
    }
  }).validate( {
      ignoreTitle: true,
      rules: {
        FNAME: {
          required: true,
          specificName: true
        },
        LNAME: {
          required: true,
          specificName: true
        },
        EMAIL: {
            required: true,
            email: true
        },
      },
      errorElement: "em",
      errorPlacement: function ( error, element ) {
          // Add the `help-block` class to the error element
          error.addClass( "help-block" );

          if ( element.prop( "type" ) === "checkbox" ) {
              error.insertAfter( element.parent( "label" ) );
          } else {
              error.insertAfter( element );
          }
      },
      highlight: function ( element, errorClass, validClass ) {
          $( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
      },
      unhighlight: function (element, errorClass, validClass) {
          $( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
      }
  });
}