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

        // Toggle Favorite Listing
        register_rest_route( 'directorist/dev', '/toggle-favorite-listing/', [
            'methods' => 'POST',
            'callback' => [ $this, 'toggle_favorite_listing' ],
            'args' => [
                'user_id' => [
                  'validate_callback' => function($param, $request, $key) {
                    return is_numeric( $param );
                  }
                ],
                'listing_id' => [
                  'validate_callback' => function($param, $request, $key) {
                    return is_numeric( $param );
                  }
                ],
            ],
            'permission_callback' => '__return_true'
        ]);

        // Send Password Reset PIN
        register_rest_route( 'directorist/dev', '/send-password-reset-pin/', [
            'methods' => 'POST',
            'callback' => [ $this, 'send_password_reset_pin' ],
            'args' => [
                'email' => [
                  'validate_callback' => function($param, $request, $key) {
                    return is_email( $param );
                  }
                ]
            ],
            'permission_callback' => '__return_true'
        ]);

        // Get Password Reset PIN
        register_rest_route( 'directorist/dev', '/get-password-reset-pin/', [
            'methods' => 'POST',
            'callback' => [ $this, 'get_password_reset_pin' ],
            'args' => [
                'email' => [
                  'validate_callback' => function($param, $request, $key) {
                    return is_email( $param );
                  }
                ]
            ],
            'permission_callback' => '__return_true'
        ]);

        // Send Email Link
        register_rest_route( 'directorist/dev', '/reset-user-password/', [
            'methods' => 'POST',
            'callback' => [ $this, 'reset_user_password' ],
            'args' => [
                'email' => [
                  'validate_callback' => function($param, $request, $key) {
                    return is_email( $param );
                  }
                ],
                'password' => [
                  'validate_callback' => function($param, $request, $key) {
                    return is_string( $param );
                  }
                ],
                'pin' => [
                  'validate_callback' => function($param, $request, $key) {
                    return is_numeric( $param );
                  }
                ],
            ],
            'permission_callback' => '__return_true'
        ]);

        // Change Password
        register_rest_route( 'directorist/dev', '/change-password/', [
            'methods' => 'POST',
            'callback' => [ $this, 'change_password' ],
            'args' => [
                'user_id' => [
                  'validate_callback' => function($param, $request, $key) {
                    return is_numeric( $param );
                  }
                ],
                'old_password' => [
                  'validate_callback' => function($param, $request, $key) {
                    return is_string( $param );
                  }
                ],
                'new_password' => [
                  'validate_callback' => function($param, $request, $key) {
                    return is_string( $param );
                  }
                ],
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
                __('Password is required', 'directorist')
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

    // toggle_favorite_listing
    public function toggle_favorite_listing( WP_REST_Request $request ) {
        $status = [
            'success'      => false,
            'message'      => '',
            'errors'       => [],
        ];

        // Validate User
        if ( empty( $request['user_id'] ) ) {
            $status['success'] = false;
            $status['errors']['user_id_required'] = __("User ID is required", 'directorist');
            $status['message'] = $status['errors']['user_id_required'];

            return $status;
        }

        // Validate Listing ID
        if ( empty( $request['listing_id'] ) ) {
            $status['success'] = false;
            $status['errors']['listing_id_required'] = __("User ID is required", 'directorist');
            $status['message'] = $status['errors']['listing_id_required'];

            return $status;
        }

        $user = get_user_by( 'id', $request['user_id'] );
        
        // Validate User
        if ( ! $user ) {
            $status['success'] = false;
            $status['errors']['invalid_user'] = __('User doesn\'t exists', 'directorist');
            $status['message'] = $status['errors']['invalid_user'];

            return $status;
        }

        $favorites = get_user_meta( $request['user_id'], 'atbdp_favourites', true );
        $favorites = ( empty( $favorites ) ) ? [] : $favorites;

        if ( ( $key = array_search( $request['listing_id'], $favorites ) ) !== false) {
            unset( $favorites[$key] );
            $status['message'] = __('The listing has been removed from favorite', 'directorist');
        } else {
            $favorites[] = $request['listing_id'];
            $status['message'] = __('The listing has been added to favorite', 'directorist');
        }

        $favorites = ( ! empty( $favorites ) ) ? $favorites : null;

        update_user_meta( $request['user_id'], 'atbdp_favourites', $favorites );
        $status['success'] = true;

        return $status;
    }

    // Send password reset PIN
    public function send_password_reset_pin( WP_REST_Request $request ) {
        $status = [
            'success'      => false,
            'message'      => '',
            'errors'       => [],
        ];

        if ( empty( $request['email'] ) ) {
            $status['success'] = false;
            $status['errors']['email_required'] = __("Email is required", 'directorist');
            $status['message'] = $status['errors']['email_required'];

            return $status;
        }

        $user = get_user_by( 'email', $request['email'] );

        // Validate User
        if ( ! $user ) {
            $status['success'] = false;
            $status['errors']['invalid_user'] = __('User doesn\'t exists', 'directorist');
            $status['message'] = $status['errors']['invalid_user'];

            return $status;
        }

        ATBDP()->email->send_password_reset_pin_email( $request['email'] );

        $status['success'] = true;
        $status['message'] = __('The Password reset code has been sent to your email', 'directorist');

        return $status;
    }

    // Send password reset PIN
    public function get_password_reset_pin( WP_REST_Request $request ) {
        $status = [
            'success'      => false,
            'message'      => '',
            'errors'       => [],
        ];

        if ( empty( $request['email'] ) ) {
            $status['success'] = false;
            $status['errors']['email_required'] = __("Email is required", 'directorist');
            $status['message'] = $status['errors']['email_required'];

            return $status;
        }

        $email = $request['email'];
        $transient_pin = get_transient( "directorist_reset_pin_$email" );
        

        $status['success'] = true;
        $status['pin']     = $transient_pin;

        return $status;

    }

    // Reset User Password
    public function reset_user_password( WP_REST_Request $request ) {
        $status = [
            'success'      => false,
            'message'      => '',
            'errors'       => [],
        ];

        // Validate Email
        if ( empty( $request['email'] ) ) {
            $status['success'] = false;
            $status['errors']['email_required'] = __("Email is required", 'directorist');
            $status['message'] = $status['errors']['email_required'];

            return $status;
        }

        $user = get_user_by( 'email', $request['email'] );
        
        // Validate User
        if ( ! $user ) {
            $status['success'] = false;
            $status['errors']['invalid_user'] = __('User doesn\'t exists', 'directorist');
            $status['message'] = $status['errors']['invalid_user'];

            return $status;
        }

        // Validate PIN
        if ( empty( $request['pin'] ) ) {
            $status['errors']['pin_required'] = __('The PIN is required', 'directorist');
            $status['message'] = $status['errors']['pin_required'];

            return $status;
        }
        
        $email = $request['email'];
        $transient_pin = get_transient( "directorist_reset_pin_$email" );

        if ( $transient_pin != $request['pin'] ) {
            $status['errors']['invalid_pin'] = __('The PIN is invalid or expired', 'directorist');
            $status['message'] = $status['errors']['invalid_pin'];

            return $status;
        }

        // Validate Password
        if ( empty( $request['password'] ) ) {
            $status['errors']['password_required'] = __('Password can\'t be empty', 'directorist');
            $status['message'] = $status['errors']['password_required'];

            return $status;
        }

        if ( ! empty( $request['password'] ) && strlen( $request['password'] ) < 5 ) {
            $status['errors']['password_min_length_error'] = __('Password must be 5 chaercters', 'directorist');
            $status['message'] = $status['errors']['password_min_length_error'];

            return $status;
        }
        
        // Change Password
        wp_set_password( $request['new_password'], $user->ID );

        // Delete The PIN
        delete_transient( "directorist_reset_pin_$email" );

        $status['success'] = true;
        $status['message'] = __('Password has been changed successfully', 'directorist');

        return $status;
    }

    // Change Password
    public function change_password( WP_REST_Request $request ) {
        $status = [
            'success'      => false,
            'message'      => '',
            'errors'       => [],
        ];

        if ( empty( $request['username'] ) ) {
            $status['success'] = false;
            $status['errors']['invalid_user'] = __("Username is required", 'directorist');
            $status['message'] = $status['errors']['invalid_user'];

            return $status;
        }

        $user               = get_user_by( 'login', $request['username'] );
        $has_valid_password = ( wp_check_password( $request['old_password'], $user->data->user_pass, $user->ID ) ) ? true : false;
        $is_valid_user      = ( $user && $has_valid_password ) ? true : false;
        
        $status['is_valid_user'] = $is_valid_user;
        $status['has_valid_password'] = $has_valid_password;
        
        // Validate User
        if ( ! $user ) {
            $status['success'] = false;
            $status['errors']['invalid_user'] = __("User doesn't exists", 'directorist');
            $status['message'] = $status['errors']['invalid_user'];

            return $status;
        }

        // Validate Old Password
        if ( ! $has_valid_password ) {
            $status['success'] = false;
            $status['errors']['invalid_old_password'] = __('Current Password is not valid', 'directorist');
            $status['message'] = $status['errors']['invalid_old_password'];

            return $status;
        }

        // Validate New Password
        if ( empty( $request['new_password'] ) ) {
            $status['errors']['password_required'] = __('New Password can\'t be empty', 'directorist');
            $status['message'] = $status['errors']['password_required'];

            return $status;
        }

        if ( ! empty( $request['new_password'] ) && strlen( $request['new_password'] ) < 5 ) {
            $status['errors']['password_min_length_error'] = __('Password must be 5 chaercters', 'directorist');
            $status['message'] = $status['errors']['password_min_length_error'];

            return $status;
        }
        
        // Change Password
        wp_set_password( $request['new_password'], $user->ID );

        $status['success'] = true;
        $status['message'] = __('Password has been changed successfully', 'directorist');

        return $status;
    }
}

new ATBDP_Rest_API();

endif;