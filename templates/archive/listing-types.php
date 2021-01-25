<?php
/**
 * @author  wpWax
 * @since   6.6
 * @version 6.6
 */
?>
<div class="directorist-listing-types">
	<div class="<?php echo apply_filters('atbdp_add_listing_container_fluid', 'container-fluid'); ?>">
		<ul class="list-inline">
			<?php foreach ( $listings->listing_types as $id => $value ): ?>
				<li class="list-inline-item <?php echo $listings->current_listing_type == $value['term']->term_id ? 'current': ''; ?>"><a class="directorist-listing-types-link" href="<?php echo esc_url( add_query_arg('directory_type', $value['term']->slug ) ); ?>"><span class="<?php echo esc_html( $value['data']['icon'] );?>"></span> <?php echo esc_html( $value['name'] );?></a></li>
			<?php endforeach; ?>
		</ul>
	</div>
</div>