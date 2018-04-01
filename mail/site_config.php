<?php
    require('config.php');
    $siteConfig = array(
        'sitekey' => $config['PUBLICKEY']
    );
?>
var config = <?php echo json_encode($siteConfig); ?>;
