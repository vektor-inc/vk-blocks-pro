<?php
/**
 * Class ArchiveListTest
 *
 * @package Vk_Blocks_Pro
 */

use VK_WP_Unit_Test_Tools\VkWpUnitTestHelpers;

/**
 * ArchiveList block test case.
 */
class ArchiveList extends VK_UnitTestCase {

	public function set_up(): void {
		parent::set_up();
		add_filter('locale', function($locale) {
			return 'en_US';
		}); 
	}

	public function tear_down(): void {
		parent::tear_down();
		remove_filter('locale', 10); 
	}	

	public function test_vk_blocks_archive_list_render_callback(){
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_archive_list_render_callback' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print PHP_EOL;

		// Create test posts.
		$test_posts = VkWpUnitTestHelpers::create_test_posts();

		$tests = array(
			array(
				'attributes' => array(
					'postType'                   => 'post',
					'displayType'                => 'monthly',
					'displayDropdown'            => false,
					'showCount'                  => false,
					'className'                  => '',
				),
				'expected' => '<div class="vk_archiveList wp-block-vk-blocks-archive-list"><ul class="vk_archive-list"><li><a href=\''.home_url().'/?m='.gmdate('Ym').'\'>'.gmdate('F Y').'</a></li></ul></div>',
			),
			array(
				'attributes' => array(
					'postType'                   => 'post',
					'displayType'                => 'yearly',
					'displayDropdown'            => false,
					'showCount'                  => false,
					'className'                  => '',
				),
				'expected' => '<div class="vk_archiveList wp-block-vk-blocks-archive-list"><ul class="vk_archive-list"><li><a href=\''.home_url().'/?m='.gmdate('Y').'\'>'.gmdate('Y').'</a></li></ul></div>',
			),
			array(
				'attributes' => array(
					'postType'                   => 'post',
					'displayType'                => 'yearly',
					'displayDropdown'            => true,
					'showCount'                  => false,
					'className'                  => '',
				),
				'expected' => '<div class="vk_archiveList wp-block-vk-blocks-archive-list"><select name="archive-list-dropdown" onChange="document.location.href=this.options[this.selectedIndex].value;"><option value="">Please select year</option><option value=\''.home_url().'/?m='.gmdate('Y').'\'> '.gmdate('Y').' </option></select></div>',
			),
		);

		foreach ( $tests as $test ) {

			WP_Block_Supports::init();
			WP_Block_Supports::$block_to_render = array(
				'blockName' => 'vk-blocks/archive-list',
				'attrs'     => $test['attributes'],
			);

			$actual = vk_blocks_archive_list_render_callback( $test['attributes'] );
			$this->assertEquals( $test['expected'], $actual );

			// print $actual;
		}
	}
};
