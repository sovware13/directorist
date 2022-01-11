<?php
/**
 * @author  wpWax
 * @since   6.6
 * @version 7.0.4
 */

if ( ! defined( 'ABSPATH' ) ) exit;
?>

<div class="directorist-search-field directorist-lazy-checks directorist-tags-lazy-checks">
	<?php if ( !empty($data['label']) ): ?>
		<label><?php echo esc_html( $data['label'] ); ?></label>
	<?php endif; ?>

	<div class="directorist-search-tags directorist-flex lazy-check-items"></div>
</div>