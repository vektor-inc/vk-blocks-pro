<?php

define( 'VK_BLOCKS_PRO_PATH', plugin_dir_path( __FILE__ ) . 'vk-blocks-pro/' );

require_once VK_BLOCKS_PRO_PATH . 'vk-blocks-pro-functions.php';

$path = dirname(dirname(__FILE__)) .'/inc/vk-blocks/App/RestAPI/BlockMeta/EntryPoint.php';
require_once $path;
//BlockMeta用のAPIルートを設定
new EntryPoint();
