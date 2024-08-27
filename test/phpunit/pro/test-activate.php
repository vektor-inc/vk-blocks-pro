<?php
/**
 * Class ActivationTest
 *
 * @package vektor-inc/vk-blocks-pro
 */

class ActivationTest extends VK_UnitTestCase {
    /**
	 * Test Block
	 *
	 * @return void
	 */
	public function test_vk_blocks_activation() {
		
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
        deactivate_plugins( 'vk-blocks/vk-blocks.php' );
        deactivate_plugins( 'vk-blocks-pro/vk-blocks.php' );
        activate_plugins( 'vk-blocks/vk-blocks.php' );
        activate_plugins( 'vk-blocks-pro/vk-blocks.php' );
        $this->assertTrue( is_plugin_active( 'vk-blocks-pro/vk-blocks.php' ) );
	}
}