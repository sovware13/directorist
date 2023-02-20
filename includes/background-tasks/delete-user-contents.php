<?php

namespace Directorist\Background_Tasks;

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
				'has_data' => self::has_posts( $user_id, ATBDP_POST_TYPE ),
				'callback' => [ self::class, 'delete_posts' ],
				'args'     => [  $user_id, ATBDP_POST_TYPE ],
			],
			'attachments' => [
				'has_data' => self::has_posts( $user_id, 'attachment' ),
				'callback' => [ self::class, 'delete_posts' ],
				'args'     => [  $user_id, 'attachment' ],
			],
		];

		$has_no_data = true;

		foreach ( $data_list as $key => $data_item ) {

			if ( $data_item['has_data'] ) {
				$has_no_data = false;
				$args        = ( ! empty( $data_item['args'] ) ) ? $data_item['args'] : [];

				call_user_func_array( $data_item['callback'], $args );
			}

		}

		if ( $has_no_data ) {
			self::delete_user( $user_id );
			return false;
		}

		return true;
	}

	/**
	 * Check If Has Listings
	 *
	 * @param int $user_id
	 * @param string $post_type
	 *
	 * @param bool Status
	 */
	public static function has_posts( $user_id, $post_type = ATBDP_POST_TYPE ) {
		global $wpdb;

		$table = $wpdb->prefix . 'posts';

		$select     = "SELECT ID FROM $table";
		$where      = " WHERE ( post_author = $user_id AND post_type = '$post_type' )";
		$pagination = " LIMIT 1";

		$query = $select . $where . $pagination;
		$posts = $wpdb->get_results( $query, ARRAY_A );

		return ( ! empty( $posts ) ) ? true : false;
	}

	/**
	 * Delete Posts
	 *
	 * @param array $data
	 * @return void
	 */
	public static function delete_posts( $user_id, $post_type = ATBDP_POST_TYPE ) {
		global $wpdb;

		$post_table        = $wpdb->prefix . 'posts';
		$postmeta_table    = $wpdb->prefix . 'postmeta';
		$comments_table    = $wpdb->prefix . 'comments';
		$commentmeta_table = $wpdb->prefix . 'commentmeta';

		// Select Posts
		$select     = "SELECT ID FROM $post_table";
		$where      = " WHERE ( post_author = $user_id AND post_type = '$post_type' )";
		$order      = " ORDER BY post_date DESC";
		$pagination = " LIMIT 50";

		$select_posts_query = $select . $where . $order . $pagination;

		$posts = $wpdb->get_results( $select_posts_query, ARRAY_A );

		$post_ids           = ( ! empty( $posts ) ) ? array_map( function( $item ) { return $item['ID']; }, $posts ) : [];
		$post_ids_as_string = implode( ',', $post_ids );

		if ( empty( $post_ids ) ) {
			return;
		}

		// Delete Post Meta
		$delete_postmeta_query = "DELETE FROM $postmeta_table WHERE post_id IN ( $post_ids_as_string )";
		$wpdb->query( $delete_postmeta_query );

		// Delete Comments
		$select_comments_query = "SELECT comment_ID, comment_post_ID FROM $comments_table WHERE comment_post_ID IN ( $post_ids_as_string )";
		$comments              = $wpdb->get_results( $select_comments_query, ARRAY_A );

		if ( ! empty( $comments ) ) {
			$comment_ids           = array_map( function( $item ) { return $item['comment_ID']; }, $comments );
			$comment_ids_as_string = implode( ',', $comment_ids );

			$delete_comments_query = "DELETE FROM $comments_table WHERE comment_ID IN ( $comment_ids_as_string )";
			$wpdb->query( $delete_comments_query );

			$delete_commentmeta_query = "DELETE FROM $commentmeta_table WHERE comment_id IN ( $comment_ids_as_string )";
			$wpdb->query( $delete_commentmeta_query );
		}

		// Delete Attachments
		if ( 'attachment' === $post_type ) {
			foreach( $post_ids as $attachment_id ) {
				wp_delete_attachment( $attachment_id, true );
			}
		}

		// Delete Posts
		$delete_posts_query = "DELETE FROM $post_table WHERE ID IN ( $post_ids_as_string )";
		$wpdb->query( $delete_posts_query );
	}

	public static function delete_user( $user_id ) {
		/** Include admin user functions to get access to wp_delete_user() */
		require_once ABSPATH . 'wp-admin/includes/user.php';
		wp_delete_user( $user_id );
	}
}