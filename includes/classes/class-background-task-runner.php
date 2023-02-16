<?php
/**
 * Background Updater.
 *
 * @since 7.0.6
 * @package Directorist
 */
namespace Directorist;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( __NAMESPACE__ . '\Background_Process', false ) ) {
	include_once ATBDP_INC_DIR . 'classes/class-abstract-background-process.php';
}

/**
 * Background_Task_Runner Class.
 */
class Background_Task_Runner extends Background_Process {

	public $on_complete_callback;

	/**
	 * Initiate new background process.
	 */
	public function __construct() {
		// Uses unique prefix per blog so each blog has separate queue.
		$this->prefix = 'wp_' . get_current_blog_id();
		$this->action = 'directorist_background_task_runner';

		parent::__construct();
	}

	/**
	 * Handle cron healthcheck
	 *
	 * Restart the background process if not already running
	 * and data exists in the queue.
	 */
	public function handle_cron_healthcheck() {
		if ( $this->is_process_running() ) {
			// Background process already running.
			return;
		}

		if ( $this->is_queue_empty() ) {
			// No data to process.
			$this->clear_scheduled_event();
			return;
		}

		$this->handle();
	}

	/**
	 * Schedule fallback event.
	 */
	protected function schedule_event() {
		if ( ! wp_next_scheduled( $this->cron_hook_identifier ) ) {
			wp_schedule_event( time() + 10, $this->cron_interval_identifier, $this->cron_hook_identifier );
		}
	}

	/**
	 * Is the updater running?
	 *
	 * @return boolean
	 */
	public function is_updating() {
		return false === $this->is_queue_empty();
	}

	/**
	 * Task
	 *
	 * Override this method to perform any actions required on each
	 * queue item. Return the modified item for further processing
	 * in the next pass through. Or, return false to remove the
	 * item from the queue.
	 *
	 * @param string $item Update callback item.
	 * @return string|bool
	 */
	protected function task( $item ) {
		defined( 'DIRECTORIST_RUNNING_BACKGROUND_TASK' ) || define( 'DIRECTORIST_RUNNING_BACKGROUND_TASK', true );

		if ( ! $this->has_valid_callback( $item ) ) {
			return false;
		}

		$args     = ( isset( $item[2] ) ) ? $item[2] : [];
		$callback = call_user_func( [ $item[0], $item[1]  ], $args );

		return ( $callback === true ) ? $item : false;
	}

	protected function has_valid_callback( $item ) {
		if ( ! is_array( $item ) ) {
			return false;
		}

		if ( ! ( count( $item ) >= 2 ) ) {
			return false;
		}

		if ( ! class_exists( $item[0] ) ) {
			return false;
		}

		$controller = new $item[0]();

		if ( ! method_exists( $controller, $item[1] ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Complete
	 *
	 * Override if applicable, but ensure that the below actions are
	 * performed, or, call parent::complete().
	 */
	protected function complete() {
		parent::complete();

		if ( $this->has_valid_callback( $this->on_complete_callback ) ) {
			$args     = ( isset( $this->on_complete_callback[2] ) ) ? $this->on_complete_callback[2] : [];
			call_user_func( [ $this->on_complete_callback[0], $this->on_complete_callback[1]  ], $args );
		}
	}

	/**
	 * See if the batch limit has been exceeded.
	 *
	 * @return bool
	 */
	public function is_memory_exceeded() {
		return $this->memory_exceeded();
	}
}
