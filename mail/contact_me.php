<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
 //  empty($_POST['phone']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
	
// Create the email and send the message
$to = 'soonreal+xx5ebhd5no5uw9cvltnh@boards.trello.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
//previous email team@geeklauka.by
$order_time = date('m/d/Y h:i:s A');
$email_subject = "Order at $order_time from Geeklauka";
$email_body = "Змест паведамлення.\n\n"."Here are the details:\n\n Name: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";

$headers = "From: $email_address\r\n".
		"MIME-Version: 1.0" . "\r\n" . 
       	        "Content-type: text/html; charset=UTF-8" . "\r\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>
