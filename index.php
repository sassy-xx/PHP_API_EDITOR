<?php
    // require the autolooader for vendor etc.
    require_once('./vendor/autoload.php');
    // load the env file and create $_ENV for all of it
    $dotenv = Dotenv\Dotenv::createImmutable('./config/');
    $dotenv->load();
    // created constants for all $_ENV variables
    foreach($_ENV as $k => $v) {
        define($k, $v);
    }
?>
<!DOCTYPE html>
<htmL>
    <head>
        <?php
            // require the head file
            require_once('./php/includes/head.php');
        ?>
    </head>
    <body data-bs-theme="dark">
        <?php
            // require the navbar
            require_once('./php/includes/nav.php');
        ?>
        <div id="root">
            <!-- main root element -->
        </div>
        <script type="text/javascript">
            load_index('#root');
        </script>
    </body>
</htmL>