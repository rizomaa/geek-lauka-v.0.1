var onloadCaptcha = function() {
	grecaptcha.render('captcha_container', {
		'sitekey' : config.sitekey
	});
}

$(function() {
    function showSuccess() {
        // Enable button & show success message
        $("#btnSubmit").attr("disabled", false);
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#success > .alert-success')
            .append("<strong>Ваша паведамленне паспяхова адпраўлена</strong>");
        $('#success > .alert-success')
            .append('</div>');
    }
    function showError(message) {
        // Fail message
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#success > .alert-danger').append("<strong>" + message + "</strong>");
        $('#success > .alert-danger').append('</div>');
    }

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var captcha = $('#g-recaptcha-response').val();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message,
                    'g-recaptcha-response': captcha
                },
                cache: false,
                success: function(data) {
                    var json = $.parseJSON(data); 
                    if('result' in json && json.result == 'error') {
                        showError("Памылка ў уведзеных дадзеных");
                    } else {
                        showSuccess();
                        //clear all fields
                        $('#contactForm').trigger("reset");
                        //clear recaptcha
                        if(typeof grecaptcha != 'undefined') {
                            grecaptcha.reset();
                        }
                    }
                },
                error: function() {
                    showError("Выбачайце " + firstName + ", мэйл сэрвер не адказвае. Калі ласка паспрабуйце адправіць паведамленне пазней! Або скарыстайце адрас lauka@falanster.by");
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
