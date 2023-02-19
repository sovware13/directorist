<?php

namespace Directorist\Background_Tasks;

use \WP_Query;
use Directorist\Helper;

class Delete_User_Contents {

	/**
	 * Delete User Contents
	 *
	 * @param int $user_id
	 * @return bool Status
	 */
	public static function delete_user_contents( $user_id ) {
		$user_data = get_userdata( $user_id );

		if ( ! $user_data ) {
			return false;
		}

		$data_list = [
			'listings' => [
				'data'            => self::get_listings( $user_id ),
				'delete_callback' => [ self::class, 'delete_listings' ],
			],
		];

		$has_no_data = true;

		foreach ( $data_list as $key => $data_item ) {

			if ( ! empty( $data_item['data'] ) ) {
				$has_no_data = false;
				call_user_func( $data_item['delete_callback'], $data_item['data'] );
			}

		}

		if ( $has_no_data ) {
			self::delete_user( $user_id );
			return false;
		}

		return true;
	}

	/**
	 * Get Listings
	 *
	 * @param int $user_id
	 * @return array|null Listings or null
	 */
	public static function get_listings( $user_id ) {
		$user_listings = new WP_Query([
			'post_type'      => ATBDP_POST_TYPE,
			'post_status'    => 'any',
			'posts_per_page' => 50,
			'orderby'        => 'publish_date',
			'order'          => 'ASC',
			'author__in'     => $user_id,
		]);

		if ( $user_listings->have_posts() ) {
			return $user_listings->posts;
		}

		return null;
	}

	/**
	 * Delete Listings
	 *
	 * @param array $listings
	 * @return void
	 */
	public function delete_listings( $listings ) {
		foreach ( $listings as $post ) {
			Helper::delete_listings_images( $post->ID );
			wp_delete_post( $post->ID, true );
		}
	}

	public static function delete_user( $user_id ) {
		/** Include admin user functions to get access to wp_delete_user() */
		require_once ABSPATH . 'wp-admin/includes/user.php';
		wp_delete_user( $user_id );
	}
}