<?php
/**
 * Base class for loading all assets.
 * 
 * @author wpWax
 */

namespace Directorist\Asset_Loader;

if ( ! defined( 'ABSPATH' ) ) exit;

class Init {

	public static $instance = null;

	public $version;
	public $scripts;

	private function __construct() {
		$this->version = Helper::debug_enabled() ? time() : DIRECTORIST_SCRIPT_VERSION;
		$this->set_scripts();

		// Frontend
		add_action( 'wp_enqueue_scripts',    [ $this, 'register_scripts' ] );
		add_action( 'wp_enqueue_scripts',    [ $this, 'enqueue_scripts' ], 12 );
		add_action( 'wp_enqueue_scripts',    [ $this, 'localized_data' ], 15 );
		add_action( 'wp_enqueue_scripts',    [ $this, 'inline_styles' ], 15 );

		add_filter( 'before_directorist_template_loaded',  [ $this, 'load_template_scripts' ] );

		// Admin
		add_action( 'admin_enqueue_scripts', [ $this, 'register_scripts' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_scripts' ], 12 );
		add_action( 'admin_enqueue_scripts', [ $this, 'localized_data' ], 15 );

		add_filter( 'script_loader_tag', array( $this, 'defer_load_js' ), 10, 2 );
	}

	/**
	 * Singletone instance
	 */
	public static function instance() {
		if ( null == self::$instance ) {
			self::$instance = new self;
		}
		return self::$instance;
	}

	public function load_template_scripts( $template ) {
		
		switch ( $template ) {
			case 'search-form/fields/radius_search':
				wp_enqueue_script( 'directorist-range-slider' );
				break;

			case 'archive/search-form':
			case 'search-form-contents':
			case 'search-form/adv-search':
				wp_enqueue_script( 'directorist-search-form' );
				break;

		}
	}

	public function set_scripts() {
		$this->scripts = apply_filters( 'directorist_scripts', Scripts::all_scripts() );
	}

	public function register_scripts() {
		foreach ( $this->scripts as $handle => $script ) {
			Helper::register_single_script( $handle, $script, $this->version );
		}
	}

	/**
	 * Load inline styles.
	 */
	public function inline_styles() {
		wp_add_inline_style( 'directorist-main-style', Helper::dynamic_style() );
	}

	/**
	 * Load localized data.
	 */
	public function localized_data() {
		Localized_Data::load_localized_data();
	}

	public function enqueue_scripts() {
		Enqueue::public_scripts();
	}

	public function enqueue_admin_scripts( $page = '' ) {
		Enqueue::map_styles();
		Enqueue::admin_scripts( $page );
	}

	/**
	 * Enqueue scripts based on shortcode.
	 *
	 * @param string $shortcode Shortcode Name.
	 */
	public function load_shortcode_scripts( $shortcode, $model = false ) {

		// wp_enqueue_script( 'directorist-main' );
		wp_enqueue_script('directorist-select2-script');

		switch ( $shortcode ) {
			case 'directorist_all_listing':
				// Enqueue::common_shortcode_scripts();
				Enqueue::all_listings( $model );
				break;

			case 'directorist_add_listing':
				Enqueue::common_shortcode_scripts();
				Enqueue::add_listing( $model );
				break;

			case 'directorist_search_listing':
				Enqueue::common_shortcode_scripts();
				Enqueue::search_form( $model );
				break;

			case 'directorist_user_dashboard':
				Enqueue::common_shortcode_scripts();
				Enqueue::dashboard( $model );
				break;

			default:
				Enqueue::common_shortcode_scripts();
				break;
		}
	}

	public function defer_load_js( $tag, $handle ) {

		$scripts = array_filter( $this->scripts, function( $script ) {
			return $script['type'] == 'js' ? true : false;
		} );
		$scripts = array_keys( $scripts );

		if ( in_array( $handle, $scripts ) ) {
			return str_replace(' src', ' defer="defer" src', $tag );
		}

		return $tag;
	}
}