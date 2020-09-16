<?php
function vkblocks_responsive_br_filter( $block_content, $block ) {

	$filterd_content = str_replace('[br-xs]','<br class="vk_responsive-br vk_responsive-br-xs"/>',$block_content);
	$filterd_content = str_replace('[br-sm]','<br class="vk_responsive-br vk_responsive-br-sm"/>',$filterd_content);
	$filterd_content = str_replace('[br-md]','<br class="vk_responsive-br vk_responsive-br-md"/>',$filterd_content);
	$filterd_content = str_replace('[br-lg]','<br class="vk_responsive-br vk_responsive-br-lg"/>',$filterd_content);
	$filterd_content = str_replace('[br-xl]','<br class="vk_responsive-br vk_responsive-br-xl"/>',$filterd_content);
	$filterd_content = str_replace('[br-xxl]','<br class="vk_responsive-br vk_responsive-br-xxl"/>',$filterd_content);

    return $filterd_content;
}
add_filter( 'render_block', 'vkblocks_responsive_br_filter', 10, 2 );
