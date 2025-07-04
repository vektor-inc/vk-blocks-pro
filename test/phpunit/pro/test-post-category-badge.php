<?php
/**
 * Class PostCategoryBadgeTest
 *
 * @package Vk_Blocks_Pro
 */

 use VektorInc\VK_Term_Color\VkTermColor;

/**
 * PostCategoryBadgeTest block test case.
 */
class PostCategoryBadgeTest extends VK_UnitTestCase {

    // テスト用タクソノミー（各テスト共通）
    private $test_taxonomies = array(
        array(
            'name' => 'test_taxonomy_0',
            'slug' => 'test-taxonomy-0'
        ),
 
        array(
            'name' => 'test_taxonomy_1',
            'slug' => 'test-taxonomy-1'
        ),
    );

    // テスト用ターム（各テスト共通）
    private $test_terms = array(

        'categories' => array(
            array(
                'name' => 'Test Category 0',
                'color' => '#FFFFFF',
                'id' => null,
                'correct_text_color' => '#000000'
            ),
            array(
                'name' => 'Test Category 1',
                'color' => '#111111',
                'id' => null,
                'correct_text_color' => '#FFFFFF'
            )
        ),

        'terms' => array(
            'test_taxonomy_0' => array(
                array(
                    'name' => 'Test Term 0',
                    'slug' => 'test-term-0',
                    'color' => '#000000',
                    'id' => null,
                    'correct_text_color' => '#FFFFFF'    
                ),
                array(
                    'name' => 'Test Term 1',
                    'slug' => 'test-term-1',
                    'color' => '#FFFF00',
                    'id' => null,
                    'correct_text_color' => '#000000'
                )
            ),      
            'test_taxonomy_1' => array(
                array(
                    'name' => 'Test Term 2',
                    'slug' => 'test-term-2',
                    'color' => '#000000',
                    'id' => null,
                    'correct_text_color' => '#FFFFFF'    
                ),
                array(
                    'name' => 'Test Term 3',
                    'slug' => 'test-term-3',
                    'color' => '#FFFF00',
                    'id' => null,
                    'correct_text_color' => '#000000'
                )
            ),              
        )
    );

 	/**
	 * 各テストケースの実行直前に呼ばれる
	 */
	public function set_up(): void {
		parent::set_up();
        $this->set_current_user( 'administrator' );
        // 各テスト共通カテゴリーの登録
       
        foreach( $this->test_terms['categories'] as &$category ) {
            $category['id'] = wp_insert_category( array( 'cat_name' => $category['name'] ) );
            add_term_meta( $category['id'], 'term_color', $category['color'] );
        }

        // 各テスト共通タクソノミーの登録
        foreach( $this->test_taxonomies as $taxonomy ) {
            $r = register_taxonomy(
                $taxonomy['name'],
                'post',
                array(
                    'label' => $taxonomy['name'],
                    'rewrite' => array( 'slug' => $taxonomy['slug'] ),
                    'hierarchical' => true,
                )
            );
        }

        // 各テスト共通タームの登録
        foreach ( $this->test_terms['terms'] as $taxonomy_name => &$terms ) {
            foreach ( $terms as &$term ) {
                $term_id_info = wp_insert_term(
                    $term['name'], // ターム名
                    $taxonomy_name , // タクソノミー名
                    array( 'slug' => $term['slug'] )
                );
                
                $term['id'] = $term_id_info['term_id'];
                add_term_meta( $term['id'], 'term_color', $term['color'] );
            }
        } 		
	}

	public function test_category_badge () {

        // テストパターンでつかえるよう、わかりやすい変数名に置き換え
        $test_category_0 = $this->test_terms['categories'][0];
        $test_category_1 = $this->test_terms['categories'][1];
        $test_term_0 = $this->test_terms['terms']['test_taxonomy_0'][0];
        $test_term_1 = $this->test_terms['terms']['test_taxonomy_0'][1];
        $test_term_2 = $this->test_terms['terms']['test_taxonomy_1'][0];
        $test_term_3 = $this->test_terms['terms']['test_taxonomy_1'][1];

        // テストパターン
        $tests = array(

            array( 
                'post' => array(
                    'post_title'   => 'Page Title',
                    'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
                    'post_type'    => 'post',
                    'post_status'  => 'publish',
                    'post_category' => array(  $test_category_0['id'] )
                ),
                'attributes' => array(
                    'hasLink' => false,
                    'textAlign' => 'right',
                    'maxDisplayCount' => 1
                ),
                'correct' => '<div style="background-color: ' . $test_category_0['color'] . ';color:'. $test_category_0['correct_text_color'] . ';" class="vk_categoryBadge has-text-align-right wp-block-vk-blocks-post-category-badge">' . $test_category_0['name'] . '</div>'
            ),

            array( 
                'post' => array(
                    'post_title'   => 'Page Title',
                    'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
                    'post_type'    => 'post',
                    'post_status'  => 'publish',
                    'post_category' => array(  $test_category_0['id'] )
                ),
                'attributes' => array(
                    'hasLink' => true,
                    'textAlign' => 'right',
                    'maxDisplayCount' => 1
                ),
                'correct' => '<a style="background-color: ' . $test_category_0['color'] . ';color:'. $test_category_0['correct_text_color'] . ';" class="vk_categoryBadge has-text-align-right wp-block-vk-blocks-post-category-badge" href="'. site_url() . '/?cat=' . $test_category_0['id'] . '">' . $test_category_0['name'] . '</a>'
            ),

            array( 
                'post' => array(
                    'post_title'   => 'Page Title',
                    'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
                    'post_type'    => 'post',
                    'post_status'  => 'publish',
                    'post_category' => array(  $test_category_1['id'] )
                ),
                'attributes' => array(
                    'hasLink' => true,
                    'maxDisplayCount' => 1
                ),
                'correct' => '<a style="background-color: ' . $test_category_1['color'] . ';color:'. $test_category_1['correct_text_color'] . ';" class="vk_categoryBadge wp-block-vk-blocks-post-category-badge" href="'. site_url() . '/?cat=' . $test_category_1['id'] . '">' . $test_category_1['name'] . '</a>'
            ),            

            array( 
                'post' => array(
                    'post_title'   => 'Page Title',
                    'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
                    'post_type'    => 'post',
                    'post_status'  => 'publish',
                    'tax_input' => array( 'test_taxonomy_0' => $test_term_0['id'] )
                ),
                'attributes' => array(
                    'hasLink' => true,
                    'taxonomy' => 'test_taxonomy_0',
                    'textAlign' => 'right',
                    'maxDisplayCount' => 1
                ),
                'correct' => '<a style="background-color: ' . $test_term_0['color'] . ';color:'. $test_term_0['correct_text_color'] . ';" class="vk_categoryBadge has-text-align-right wp-block-vk-blocks-post-category-badge" href="'. site_url() . '/?test_taxonomy_0=' . $test_term_0['slug'] . '">' . $test_term_0['name'] . '</a>'
            ), 

            array( 
                'post' => array(
                    'post_title'   => 'Page Title',
                    'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
                    'post_type'    => 'post',
                    'post_status'  => 'publish',
                    'tax_input' => array( 'test_taxonomy_0' => $test_term_1['id'] )
                ),
                'attributes' => array(
                    'hasLink' => true,
                    'taxonomy' => 'test_taxonomy_0',
                    'maxDisplayCount' => 1
                ),
                'correct' => '<a style="background-color: ' . $test_term_1['color'] . ';color:'. $test_term_1['correct_text_color'] . ';" class="vk_categoryBadge wp-block-vk-blocks-post-category-badge" href="'. site_url() . '/?test_taxonomy_0=' . $test_term_1['slug'] . '">' . $test_term_1['name'] . '</a>'
            ),             

            array( 
                'post' => array(
                    'post_title'   => 'Page Title',
                    'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
                    'post_type'    => 'post',
                    'post_status'  => 'publish',
                    'tax_input' => array( 'test_taxonomy_1' => $test_term_2['id'] )
                ),
                'attributes' => array(
                    'hasLink' => true,
                    'taxonomy' => 'test_taxonomy_1',
                    'textAlign' => 'right',
                    'maxDisplayCount' => 1
                ),
                'correct' => '<a style="background-color: ' . $test_term_2['color'] . ';color:'. $test_term_2['correct_text_color'] . ';" class="vk_categoryBadge has-text-align-right wp-block-vk-blocks-post-category-badge" href="'. site_url() . '/?test_taxonomy_1=' . $test_term_2['slug'] . '">' . $test_term_2['name'] . '</a>'
            ), 

            array( 
                'post' => array(
                    'post_title'   => 'Page Title',
                    'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
                    'post_type'    => 'post',
                    'post_status'  => 'publish',
                    'tax_input' => array( 'test_taxonomy_1' => $test_term_3['id'] )
                ),
                'attributes' => array(
                    'hasLink' => true,
                    'taxonomy' => 'test_taxonomy_1',
                    'maxDisplayCount' => 1
                ),
                'correct' => '<a style="background-color: ' . $test_term_3['color'] . ';color:'. $test_term_3['correct_text_color'] . ';" class="vk_categoryBadge wp-block-vk-blocks-post-category-badge" href="'. site_url() . '/?test_taxonomy_1=' . $test_term_3['slug'] . '">' . $test_term_3['name'] . '</a>'
            ),  

            array( 
                'post' => array(
                    'post_title'   => 'Page Title',
                    'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
                    'post_type'    => 'post',
                    'post_status'  => 'publish',
                    'tax_input' => array( 'test_taxonomy_0' => $test_term_0['id'] )
                ),
                'attributes' => array(
                    'hasLink' => true,
                    'textAlign' => 'right',
                    'maxDisplayCount' => 1
                ),
                'correct' => '<a style="background-color: #999999;color:#FFFFFF;" class="vk_categoryBadge has-text-align-right wp-block-vk-blocks-post-category-badge" href="'. site_url() . '/?cat=1">Uncategorized</a>'
            ), 

        );
        print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'PostCategoryBadgeTest::test_category_badge' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
        foreach ( $tests as $test ) {
            $post_id = wp_insert_post( $test['post'] );
            $context = array(
                'postId' => $post_id,
                'postType' => $test['post']['post_type']
            );
            $parsed_block = array(
                'blockName' => "vk-blocks/post-category-badge",
                'attrs' => $test['attributes']
            );
            $block = new WP_Block( $parsed_block, $context );
            $return = $block->render();
            print 'return  :' . $return;
            print PHP_EOL;
            print 'correct :' . $test['correct'];
            print PHP_EOL;
            $this->assertEquals($test['correct'], $return);
        }
	}
  
	public function test_category_badge_multiple() {
        $test_category_0 = $this->test_terms['categories'][0];
        $test_category_1 = $this->test_terms['categories'][1];

        // 複数カテゴリーを持つ投稿を作成
        $post_id = wp_insert_post( array(
            'post_title'   => 'Multiple Categories Post',
            'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
            'post_type'    => 'post',
            'post_status'  => 'publish',
            'post_category' => array( $test_category_0['id'], $test_category_1['id'] )
        ));

        $context = array(
            'postId' => $post_id,
            'postType' => 'post'
        );

        // 複数表示のテスト（maxDisplayCount = 0）
        $parsed_block = array(
            'blockName' => "vk-blocks/post-category-badge",
            'attrs' => array(
                'hasLink' => false,
                'textAlign' => 'right',
                'maxDisplayCount' => 0,
                'gap' => '0.5em'
            )
        );

        $block = new WP_Block( $parsed_block, $context );
        $return = $block->render();

        // 期待される出力（複数バッジ）
        $expected = '<div class="vk_categoryBadge_multiple" style="display: flex; gap: 0.5em; flex-wrap: wrap;">';
        $expected .= '<div style="background-color: ' . $test_category_0['color'] . ';color:' . $test_category_0['correct_text_color'] . ';" class="vk_categoryBadge has-text-align-right wp-block-vk-blocks-post-category-badge">' . $test_category_0['name'] . '</div>';
        $expected .= '<div style="background-color: ' . $test_category_1['color'] . ';color:' . $test_category_1['correct_text_color'] . ';" class="vk_categoryBadge has-text-align-right wp-block-vk-blocks-post-category-badge">' . $test_category_1['name'] . '</div>';
        $expected .= '</div>';

        print PHP_EOL;
        print '------------------------------------' . PHP_EOL;
        print 'PostCategoryBadgeTest::test_category_badge_multiple' . PHP_EOL;
        print '------------------------------------' . PHP_EOL;
        print 'return  :' . $return . PHP_EOL;
        print 'correct :' . $expected . PHP_EOL;

        $this->assertEquals($expected, $return);
	}
  
	public function test_category_badge_multiple_taxonomies() {
        $test_term_0 = $this->test_terms['terms']['test_taxonomy_0'][0];
        $test_term_2 = $this->test_terms['terms']['test_taxonomy_1'][0];

        // 投稿に両方のタームを付与
        $post_id = wp_insert_post( array(
            'post_title'   => 'Multiple Taxonomies Post',
            'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
            'post_type'    => 'post',
            'post_status'  => 'publish',
            'tax_input' => array(
                'test_taxonomy_0' => array( $test_term_0['id'] ),
                'test_taxonomy_1' => array( $test_term_2['id'] ),
            ),
        ));

        $context = array(
            'postId' => $post_id,
            'postType' => 'post'
        );

        $parsed_block = array(
            'blockName' => "vk-blocks/post-category-badge",
            'attrs' => array(
                'hasLink' => false,
                'maxDisplayCount' => 0,
                'taxonomy' => '', // auto
                'gap' => '0.5em'
            )
        );

        $block = new WP_Block( $parsed_block, $context );
        $return = $block->render();

        // 期待される出力
        $expected = '<div class="vk_categoryBadge_multiple" style="display: flex; gap: 0.5em; flex-wrap: wrap;">';
        $expected .= '<div style="background-color: #999999;color:#FFFFFF;" class="vk_categoryBadge wp-block-vk-blocks-post-category-badge">Uncategorized</div>';
        $expected .= '<div style="background-color: ' . $test_term_0['color'] . ';color:' . $test_term_0['correct_text_color'] . ';" class="vk_categoryBadge wp-block-vk-blocks-post-category-badge">' . $test_term_0['name'] . '</div>';
        $expected .= '<div style="background-color: ' . $test_term_2['color'] . ';color:' . $test_term_2['correct_text_color'] . ';" class="vk_categoryBadge wp-block-vk-blocks-post-category-badge">' . $test_term_2['name'] . '</div>';
        $expected .= '</div>';

        print PHP_EOL;
        print '------------------------------------' . PHP_EOL;
        print 'PostCategoryBadgeTest::test_category_badge_multiple_taxonomies' . PHP_EOL;
        print '------------------------------------' . PHP_EOL;
        print 'return  :' . $return . PHP_EOL;
        print 'correct :' . $expected . PHP_EOL;

        $this->assertEquals($expected, $return);
    }
  
};
