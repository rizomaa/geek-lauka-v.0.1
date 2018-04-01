<?php
require('config.php');
require('recapcha.php');

$response = array(
    'result' => 'success',
    'message' => ''
);

$check = array();
// Check for empty fields
$message = "No arguments Provided!";
$check['name'] = empty($_POST['name']);
$check['message'] = empty($_POST['message']) || strlen($_POST['message']) < 1;
$check['email'] = empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
// Check for recaptcha
$recaptchaResponse = $_POST['g-recaptcha-response'];
$recapcha = new GeekLauka\Recaptcha($config['PRIVATEKEY'], $recaptchaResponse);
$check['g-recaptcha-response'] = empty($recaptchaResponse) || !$recapcha->validate();
if ($check['g-recaptcha-response']) {
    $message = "You are Bot!";
}

$invalid = array_filter($check);
if (count($invalid) > 0) {
    $response['message'] = $message;
    $response['fields'] = array_keys($invalid);
    $response['result'] = 'error';
    echo json_encode($response);
    return;
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
    
// Create the email and send the message
// Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$to = implode(', ', $config['MAIL_TO']);
//previous email team@geeklauka.by
$order_time = date('m/d/Y h:i:s A');
$email_subject = "Order at $order_time from Geeklauka";
$email_body = "Змест паведамлення.\n\n"."Here are the details:\n\n Name: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";

$headers = "From: $email_address\r\n".
        "MIME-Version: 1.0" . "\r\n" .
                   "Content-type: text/html; charset=UTF-8" . "\r\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";

mail($to, $email_subject, $email_body, $headers);
echo json_encode($response);
