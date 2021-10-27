<?php

if ( ! class_exists( 'Directorist_Push_Notification' ) ) {
    class Directorist_Push_Notification {
        public function __construct() {
            add_action('directorist_email_on_send_contact_messaage_to_listing_owner', [ $this, 'send_notification']);
            // add_action('init', [ $this, 'send_notification']);
        }

        public function send_notification ( $action_args = [] ) {
            $url = 'https://firestore.googleapis.com/v1/projects/directorist-app/databases/(default)/documents/notifications';
            $headers = [
                'Content-Type' => 'application/json;charset=UTF-8',
                // 'Authorization' => 'key=AAAAK1QbsOQ:APA91bGjR5P97RhV3Pom-hOIDUMwrBBQ9Lv5frAYjeVaaqK90O8XO4pUKV8168DekBz-7ffllrJfbhibWh9C1RY00GIwIHrb0pCAk_nEAF3Qt4YLqi80XBBAqaDUADSfmVNuUEKP2VIu',
            ];

            $sender_name = ( isset( $action_args['sender_name'] ) ) ? $action_args['sender_name'] : 'someone';
            $message = ( isset( $_POST["message"] ) ) ? stripslashes(esc_textarea($_POST["message"])) : '';

            $title = "A message from $sender_name is received";
            $body = $message;

            $fields = [
                "fields" => [
                    "title"  => [ "stringValue" => $title ],
                    "body"   => [ "stringValue" => $body ],
                    "topic"  => [ "stringValue" => "test" ],
                ]
            ];

            $args = [
                'method'      => 'POST',
                'headers'     => $headers,
                'httpversion' => '1.0',
                'sslverify'   => false,
                'body'        => json_encode($fields)
            ];

            wp_remote_post( $url, $args );
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

