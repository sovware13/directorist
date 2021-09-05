<?php

if ( ! class_exists( 'ATBDP_Rest_API' ) ) :
    
class ATBDP_Rest_API {
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
    }

    public function register_rest_routes() {
        // Register New User
        register_rest_route( 'directorist/dev', '/register-user/', [
            'methods' => 'POST',
            'callback' => [ $this, 'register_user' ],
            'permission_callback' => '__return_true'
        ]);

        // Send Email Link
        register_rest_route( 'directorist/dev', '/send-password-reset-link/', [
            'methods' => 'POST',
            'callback' => [ $this, 'send_password_reset_link' ],
            'args' => [
                'email' => [
                  'validate_callback' => function($param, $request, $key) {
                    return is_email( $param );
                  }
                ]
            ],
            'permission_callback' => '__return_true'
        ]);
    }

    // Register User
    public function register_user( WP_REST_Request $request ) {
        $status = [
            'success' => true,
            'message' => 'Looks good',
            'errors'  => [],
        ];

        $form_data = [];
        $form_data['user_email'] = $request->get_param( 'email' );
        $form_data['user_pass'] = $request->get_param( 'password' );

        $status['form_data'] = $form_data;
        
        // Validate | Email
        if ( empty( $form_data['user_email'] ) ) {
            $status['errors']['email_required'] = [
                __('Email is required', 'directorist')
            ];
        }

        if ( ! empty( $form_data['user_email'] ) && ! is_email( $form_data['user_email'] ) ) {
            $status['errors']['email_required'] = [
                __('An valid email is required', 'directorist')
            ];
        }

        // Validate | Password
        if ( empty( $form_data['user_pass'] ) ) {
            $status['errors']['password_required'] = [
                __('Password is required')
            ];
        }

        if ( ! empty( $form_data['user_pass'] ) && strlen( $form_data['user_pass'] ) < 5 ) {
            $status['errors']['password_min_length_error'] = [
                __('Password must be 5 chaercters', 'directorist')
            ];
        }

        if ( ! empty( $status['errors'] ) ) {
            $status['success'] = false;
            $status['message'] =  $status['errors'][ array_key_first( $status['errors'][0] ) ];

            return $status;
        }

        $username = preg_replace( '/@.*/', '' , $form_data['user_email'] );
        $form_data['user_login'] = $username;

        $status['form_data'] = $form_data;
        
        // Create user
        $user = wp_insert_user( $form_data );

        if ( is_wp_error( $user ) ) {
            $status['success'] = false;
            $status['errors'] = $user->errors;
            $status['message'] =  $status['errors'][ array_key_first( $status['errors'] ) ][0];

            return $status;
        }

        $status['success'] = true;
        $status['user_id'] = $user;
        $status['message'] = __( 'Registration successfull', 'directorist' );

        return $status;
    }

    // Send password reset link
    public function send_password_reset_link( WP_REST_Request $request ) {
        $status = [
            'success' => true,
            'message' => 'Looks good',
            'email'   => $request['email'],
        ];

        return $status;
    }
}

new ATBDP_Rest_API();

endif;