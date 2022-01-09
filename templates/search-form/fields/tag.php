<?php
/**
 * @author  wpWax
 * @since   6.6
 * @version 7.0.4
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// $source     = !empty( $data['tags_filter_source'] ) ? $data['tags_filter_source'] : '';
// $tag_source = ( $source == 'category_based_tags' ) ? 'cat_based' : 'all_tags';
// $tag_terms  = $searchform->listing_tag_terms( $tag_source );

// if ( !$tag_terms ) {
// 	return;
// }
?>

<div class="directorist-search-field directorist-lazy-checks directorist-tags-lazy-checks">
	<?php if ( !empty($data['label']) ): ?>
		<label><?php echo esc_html( $data['label'] ); ?></label>
	<?php endif; ?>

	<div class="directorist-search-tags directorist-flex directorist-lazy-check-items"></div>
</div>

<!-- directorist-btn-ml -->