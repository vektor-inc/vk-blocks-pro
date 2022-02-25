<?php
/**
 * Class QueryTest
 *
 * https://github.com/WordPress/wordpress-develop/blob/40ac5de838be0d75ec4f24bf400f04516745a736/tests/phpunit/tests/blocks/wpBlock.php#L18-L33
 * https://github.com/WordPress/wordpress-develop/blob/40ac5de838be0d75ec4f24bf400f04516745a736/tests/phpunit/tests/blocks/wpBlock.php#L416-L569
 *
 * @package Vk_Blocks_Pro
 */

/**
 * QueryTest block test case.
 */
class QueryTest extends WP_UnitTestCase {

	/**
	 * Fake block type registry.
	 *
	 * @var WP_Block_Type_Registry
	 */
	private $registry = null;

	/**
	 * Set up each test method.
	 */
	public function set_up() {
		parent::set_up();

		$this->registry = new WP_Block_Type_Registry();
	}

	/**
	 * @ticket 52991
	 */
	public function test_vk_blocks_build_query_vars_from_query_block() {
		$this->registry->register(
			'core/example',
			array( 'uses_context' => array( 'query' ) )
		);

		$parsed_blocks = parse_blocks( '<!-- wp:example {"ok":true} -->a<!-- wp:example /-->b<!-- /wp:example -->' );
		$parsed_block  = $parsed_blocks[0];
		$context       = array(
			'query' => array(
				'postType'    => 'page',
				'exclude'     => array( 1, 2 ),
				'categoryIds' => array( 56 ),
				'orderBy'     => 'title',
				'tagIds'      => array( 3, 11, 10 ),
			),
		);
		$block         = new WP_Block( $parsed_block, $context, $this->registry );
		$query         = vk_blocks_build_query_vars_from_query_block( $block, 1 );

		$this->assertSame(
			$query,
			array(
				'post_type'    => 'page',
				'order'        => 'DESC',
				'orderby'      => 'title',
				'post__not_in' => array( 1, 2 ),
				'category__in' => array( 56 ),
				'tag__in'      => array( 3, 11, 10 ),
			)
		);
	}

	/**
	 * add post parent
	 */
	public function test_vk_blocks_build_query_vars_from_query_block_add_post_parent() {
		$this->registry->register(
			'core/example',
			array('uses_context' => array('query'))
		);

		$parsed_blocks = parse_blocks('<!-- wp:example {"ok":true} -->a<!-- wp:example /-->b<!-- /wp:example -->');
		$parsed_block  = $parsed_blocks[0];
		$context       = array(
			'query' => array(
				'postType'    => 'page',
				'exclude'     => array(1, 2),
				'categoryIds' => array(56),
				'orderBy'     => 'title',
				'tagIds'      => array(3, 11, 10),
				'postParent'  => 1,
			),
		);
		$block         = new WP_Block($parsed_block, $context, $this->registry);
		$query         = vk_blocks_build_query_vars_from_query_block($block, 1);

		$this->assertSame(
			$query,
			array(
				'post_type'    => 'page',
				'order'        => 'DESC',
				'orderby'      => 'title',
				'post__not_in' => array(1, 2),
				'category__in' => array(56),
				'tag__in'      => array(3, 11, 10),
				'post_parent'  => 1,
			)
		);
	}

	/**
	 * @ticket 52991
	 */
	public function test_vk_blocks_build_query_vars_from_query_block_no_context() {
		$this->registry->register( 'core/example', array() );

		$parsed_blocks    = parse_blocks( '<!-- wp:example {"ok":true} -->a<!-- wp:example /-->b<!-- /wp:example -->' );
		$parsed_block     = $parsed_blocks[0];
		$block_no_context = new WP_Block( $parsed_block, array(), $this->registry );
		$query            = vk_blocks_build_query_vars_from_query_block( $block_no_context, 1 );

		$this->assertSame(
			$query,
			array(
				'post_type'    => 'post',
				'order'        => 'DESC',
				'orderby'      => 'date',
				'post__not_in' => array(),
			)
		);
	}

	/**
	 * @ticket 52991
	 */
	public function test_vk_blocks_build_query_vars_from_query_block_first_page() {
		$this->registry->register(
			'core/example',
			array( 'uses_context' => array( 'query' ) )
		);

		$parsed_blocks = parse_blocks( '<!-- wp:example {"ok":true} -->a<!-- wp:example /-->b<!-- /wp:example -->' );
		$parsed_block  = $parsed_blocks[0];
		$context       = array(
			'query' => array(
				'perPage' => 2,
				'offset'  => 0,
			),
		);
		$block         = new WP_Block( $parsed_block, $context, $this->registry );
		$query         = vk_blocks_build_query_vars_from_query_block( $block, 1 );

		$this->assertSame(
			$query,
			array(
				'post_type'      => 'post',
				'order'          => 'DESC',
				'orderby'        => 'date',
				'post__not_in'   => array(),
				'offset'         => 0,
				'posts_per_page' => 2,
			)
		);
	}

	/**
	 * @ticket 52991
	 */
	public function test_vk_blocks_build_query_vars_from_query_block_page_no_offset() {
		$this->registry->register(
			'core/example',
			array( 'uses_context' => array( 'query' ) )
		);

		$parsed_blocks = parse_blocks( '<!-- wp:example {"ok":true} -->a<!-- wp:example /-->b<!-- /wp:example -->' );
		$parsed_block  = $parsed_blocks[0];
		$context       = array(
			'query' => array(
				'perPage' => 5,
				'offset'  => 0,
			),
		);
		$block         = new WP_Block( $parsed_block, $context, $this->registry );
		$query         = vk_blocks_build_query_vars_from_query_block( $block, 3 );
		$this->assertSame(
			$query,
			array(
				'post_type'      => 'post',
				'order'          => 'DESC',
				'orderby'        => 'date',
				'post__not_in'   => array(),
				'offset'         => 10,
				'posts_per_page' => 5,
			)
		);
	}

	/**
	 * @ticket 52991
	 */
	public function test_vk_blocks_build_query_vars_from_query_block_page_with_offset() {
		$this->registry->register(
			'core/example',
			array( 'uses_context' => array( 'query' ) )
		);

		$parsed_blocks = parse_blocks( '<!-- wp:example {"ok":true} -->a<!-- wp:example /-->b<!-- /wp:example -->' );
		$parsed_block  = $parsed_blocks[0];
		$context       = array(
			'query' => array(
				'perPage' => 5,
				'offset'  => 2,
			),
		);
		$block         = new WP_Block( $parsed_block, $context, $this->registry );
		$query         = vk_blocks_build_query_vars_from_query_block( $block, 3 );
		$this->assertSame(
			$query,
			array(
				'post_type'      => 'post',
				'order'          => 'DESC',
				'orderby'        => 'date',
				'post__not_in'   => array(),
				'offset'         => 12,
				'posts_per_page' => 5,
			)
		);
	}

}

