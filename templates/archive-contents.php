<?php
/**
 * @author  wpWax
 * @since   6.6
 * @version 7.2
 */

if ( ! defined( 'ABSPATH' ) ) exit;
?>

<div <?php $listings->wrapper_class(); ?>>

	<?php
	$listings->directory_type_nav_template();
	$listings->header_bar_template();
	$listings->archive_view_template();
	?>

</div>