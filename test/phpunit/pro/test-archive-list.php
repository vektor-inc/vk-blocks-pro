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
class ArchiveList extends WP_UnitTestCase {

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
				'expected' => '<div class="vk_archiveList wp-block-vk-blocks-archive-list"><ul class="vk_archive-list"><li><a href=\'http://localhost:8889/?m=202304\'>April 2023</a></li></ul></div>',
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
