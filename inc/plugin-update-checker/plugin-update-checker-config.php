<?php
/*-------------------------------------------*/
/*	Load updater
/*-------------------------------------------*/
require 'plugin-update-checker.php';
$myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
	'https://dev.vws.vektor-inc.co.jp/updates/?action=get_metadata&slug=vk-blocks-pro',
	__FILE__,
	'vk-blocks-pro'
);
