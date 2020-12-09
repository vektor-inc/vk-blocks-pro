<?php

/**
 * Registers the `core/cover` block.
 */
function register_block_core_cover() {
	register_block_type_from_metadata(
		__DIR__
	);
}
add_action( 'init', 'register_block_core_cover' );
