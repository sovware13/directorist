<?php
/**
 * Init REST api.
 */
namespace wpWax\Directorist\RestApi;

use \Directorist\Rest_Api\Controllers\Version1;

defined( 'ABSPATH' ) || die();

require_once trailingslashit( __DIR__ ) . 'functions.php';
require_once trailingslashit( __DIR__ ) . 'class-datetime.php';
require_once trailingslashit( __DIR__ ) . 'filter-functions.php';

$dir = trailingslashit( __DIR__ );

// Includes
require_once $dir . 'Version1/class-abstract-controller.php';
require_once $dir . 'Version1/class-abstract-posts-controller.php';
require_once $dir . 'Version1/class-listings-controller.php';
require_once $dir . 'Version1/class-listings-actions-controller.php';
require_once $dir . 'Version1/class-listing-reviews-controller.php';
require_once $dir . 'Version1/class-abstract-terms-controller.php';
require_once $dir . 'Version1/class-categories-controller.php';
require_once $dir . 'Version1/class-tags-controller.php';
require_once $dir . 'Version1/class-locations-controller.php';
require_once $dir . 'Version1/class-users-controller.php';
require_once $dir . 'Version1/class-users-favorites-controller.php';
require_once $dir . 'Version1/class-users-account-controller.php';
require_once $dir . 'Version1/class-directories-controller.php';

// REST Controllers
$controllers = [
	Version1\Listings_Controller::class,
	Version1\Listings_Actions_Controller::class,
	Version1\Listing_Reviews_Controller::class,
	Version1\Categories_Controller::class,
	Version1\Tags_Controller::class,
	Version1\Locations_Controller::class,
	Version1\Users_Controller::class,
	Version1\User_Favorites_Controller::class,
	Version1\Users_Account_Controller::class,
	Version1\Directories_Controller::class,
];

// Init REST Controllers
foreach ( $controllers as $controller ) {

	if ( ! class_exists( $controller ) ) {
		continue;
	}

	new $controller();
}