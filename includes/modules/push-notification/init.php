<?php

if ( ! class_exists( 'Directorist_Push_Notification' ) ) {
    class Directorist_Push_Notification {
        public function __construct() {
            add_action('template_redirect', [ $this, 'test_notification']);
            add_action('init', [ $this, 'send_notification']);
        }

        public function send_notification () {
            $url = home_url() . '/send-push-notification';
            $response = wp_remote_get($url);

            var_dump($response);
        }

        public function test_notification() {
            global $wp;

            if ( 'send-push-notification' != $wp->request ) {
                return;
            }

            $script_path = DIRECTORIST_JS . 'public-push-notification.js';
            $starting_markup = '<!DOCTYPE html><head>';
            $closing_markup = '</html>';

            echo "{$starting_markup}<script src='{$script_path}'></script>{$closing_markup}";
            die();
        }
    }

   new Directorist_Push_Notification();
}

