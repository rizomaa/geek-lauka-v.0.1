<?php

namespace GeekLauka;

class Recaptcha
{
    public $url = 'https://www.google.com/recaptcha/api/siteverify';
    public $privatekey = "";
    public $value = "";
    
    public function __construct($privatekey, $value)
    {
        $this->privatekey = $privatekey;
        $this->value = $value;
    }
    
    public function validate()
    {
        $result = true;
        $response = file_get_contents($this->url . '?secret=' . $this->privatekey . '&response=' . $this->value);
        $responseKeys = json_decode($response, true);
        $result = intval($responseKeys["success"]) === 1;
        return $result;
    }
}
