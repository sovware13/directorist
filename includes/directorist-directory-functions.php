<?php
/**
 * Directorist Directory Functions
 *
 * Directory related functions.
 *
 * @package Directorist\Functions
 * @version 8.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function directorist_get_directory_meta( int $directory_id, string $meta_key ) {
	if ( ! term_exists( $directory_id, ATBDP_DIRECTORY_TYPE ) ) {
		return false;
	}

	if ( empty( $meta_key ) ) {
		return false;
	}

    return get_term_meta( $directory_id, $meta_key, true );
}

function directorist_get_listing_form_fields( int $directory_id ) {
	$form_data = directorist_get_directory_meta( $directory_id, 'submission_form_fields' );
	$_fields   = directorist_get_var( $form_data['fields'], array() );
	$_groups   = directorist_get_var( $form_data['groups'], array() );

	$fields_keys = array();
	$fields      = array();

	foreach ( $_groups as $group ) {
		$fields_keys = array_merge( $fields_keys, $group['fields'] );
	}

	foreach ( $fields_keys as $field_key ) {
		$fields[ $field_key ] = $_fields[ $field_key ];
	}

	return $fields;
}

function directorist_get_listing_form_groups( int $directory_id ) {
	$form_data = directorist_get_directory_meta( $directory_id, 'submission_form_fields' );
	$_groups   = directorist_get_var( $form_data['groups'], array() );
	$groups    = array();

    foreach ( $_groups as $group ) {
		$groups[] = array(
			'label' => $group['label'],
			'fields' => $group['fields'],
		);
	}

	return $groups;
}

function directorist_get_listing_form_field( $directory_id, $field_key = '' ) {
	if ( empty( $field_key ) ) {
		return array();
	}

	return directorist_get_listing_form_fields( $directory_id )[ $field_key ] ?: array();
}

function directorist_get_listing_form_category_field( int $directory_id ) {
	return directorist_get_listing_form_field( $directory_id, 'category' );
}

function directorist_listing_form_has_category_field( int $directory_id ) {
	$category_field = directorist_get_listing_form_category_field( $directory_id );
	return ! empty( $category_field );
}

function directorist_is_multi_directory_enabled() {
	return (bool) get_directorist_option( 'enable_multi_directory', false );
}

function directorist_is_guest_submission_enabled() {
	return (bool) get_directorist_option( 'guest_listings', 0 );
}

function directorist_is_featured_listing_enabled() {
	return (bool) get_directorist_option( 'enable_featured_listing' );
}

function directorist_is_monetization_enabled() {
	return (bool) get_directorist_option( 'enable_monetization' );
}

function directorist_is_terms_and_condition_enabled( int $directory_id ) {
	return (bool) directorist_get_directory_meta( $directory_id, 'listing_terms_condition' );
}

function directorist_is_terms_and_condition_required( int $directory_id ) {
	return (bool) directorist_get_directory_meta( $directory_id, 'require_terms_conditions' );
}

function directorist_should_check_terms_and_condition( int $directory_id ) {
	return ( directorist_is_terms_and_condition_enabled( $directory_id ) && directorist_is_terms_and_condition_required( $directory_id ) );
}

function directorist_is_privacy_policy_enabled( int $directory_id ) {
	return (bool) directorist_get_directory_meta( $directory_id, 'listing_privacy' );
}

function directorist_is_privacy_policy_required( int $directory_id ) {
	return (bool) directorist_get_directory_meta( $directory_id, 'require_privacy' );
}

function directorist_should_check_privacy_policy( int $directory_id ) {
	return ( directorist_is_privacy_policy_enabled( $directory_id ) && directorist_is_privacy_policy_required( $directory_id ) );
}

function directorist_get_new_listing_status( int $directory_id ) {
	return directorist_get_directory_meta( $directory_id, 'new_listing_status' );
}

function directorist_get_edit_listing_status( int $directory_id ) {
	return directorist_get_directory_meta( $directory_id, 'edit_listing_status' );
}

function directorist_get_default_expiration( int $directory_id ) {
	return directorist_get_directory_meta( $directory_id, 'default_expiration' );
}

function directorist_is_directory( $directory_id ) {
	$directory = term_exists( absint( $directory_id ), ATBDP_DIRECTORY_TYPE );

	return ( ! empty( $directory ) );
}

function directorist_set_listing_directory( $listing_id, $directory_id ) {
	if ( ! directorist_is_listing_post_type( $listing_id ) ) {
		return new WP_Error( 'invalid_listing', __( 'Invalid listing id.', 'directorist' ) );
	}

	if ( ! directorist_is_directory( $directory_id ) ) {
		return new WP_Error( 'invalid_directory', __( 'Invalid directory id.', 'directorist' ) );
	}

	update_post_meta( $listing_id, '_directory_type', $directory_id );
	wp_set_object_terms( $listing_id, $directory_id, ATBDP_DIRECTORY_TYPE );

	return true;
}