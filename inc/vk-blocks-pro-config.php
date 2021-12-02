<?php
/**
 * VK Blocks Pro Config Files
 *
 * @package vk-blocks
 */

define( 'VK_BLOCKS_PRO_PATH', plugin_dir_path( __FILE__ ) . 'vk-blocks-pro/' );

require_once VK_BLOCKS_PRO_PATH . 'vk-blocks-pro-functions.php';

$vk_blocks_path = plugin_dir_path( __FILE__ ) . 'vk-blocks/App/RestAPI/BlockMeta/class-vk-blocks-entrypoint.php';
require_once $vk_blocks_path;
// BlockMeta用のAPIルートを設定
new Vk_Blocks_EntryPoint();
