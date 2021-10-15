<?php
/**
 * VK Blocks Loader class.
 *
 * ブロックファイルの読み込み処理
 *
 * @package vk-blocks
 */

/**
 * VK_Blocks_Block_Loader
 */
class VK_Blocks_Block_Loader {

	/**
	 * ブロックの一覧
	 *
	 * @var array
	 */
	// phpcs:disable
	private $blocks = array(
		array( 'name' => 'alert',                 'is_pro' =>  false ),
		array( 'name' => 'balloon',               'is_pro' =>  false ),
		array( 'name' => 'border-box',            'is_pro' =>  false ),
		array( 'name' => 'button',                'is_pro' =>  false ),
		array( 'name' => 'faq',                   'is_pro' =>  false ),
		array( 'name' => 'faq2',                  'is_pro' =>  false ),
		array( 'name' => 'faq2-a',                'is_pro' =>  false ),
		array( 'name' => 'faq2-q',                'is_pro' =>  false ),
		array( 'name' => 'flow',                  'is_pro' =>  false ),
		array( 'name' => 'heading',               'is_pro' =>  false ),
		array( 'name' => 'icon',                  'is_pro' =>  false ),
		array( 'name' => 'icon-outer',            'is_pro' =>  false ),
		array( 'name' => 'page-content',          'is_pro' =>  false ),
		array( 'name' => 'pr-blocks',             'is_pro' =>  false ),
		array( 'name' => 'pr-content',            'is_pro' =>  false ),
		array( 'name' => 'spacer',                'is_pro' =>  false ),
		array( 'name' => 'staff',                 'is_pro' =>  false ),
		array( 'name' => 'accordion',             'is_pro' =>  true  ),
		array( 'name' => 'accordion-target',      'is_pro' =>  true  ),
		array( 'name' => 'accordion-trigger',     'is_pro' =>  true  ),
		array( 'name' => 'animation',             'is_pro' =>  true  ),
		array( 'name' => 'card',                  'is_pro' =>  true  ),
		array( 'name' => 'card-item',             'is_pro' =>  true  ),
		array( 'name' => 'child-page',            'is_pro' =>  true  ),
		array( 'name' => 'grid-column',           'is_pro' =>  true  ),
		array( 'name' => 'grid-column-item',      'is_pro' =>  true  ),
		array( 'name' => 'icon-card',             'is_pro' =>  true  ),
		array( 'name' => 'icon-card-item',        'is_pro' =>  true  ),
		array( 'name' => 'outer',                 'is_pro' =>  true  ),
		array( 'name' => 'post-list',             'is_pro' =>  true  ),
		array( 'name' => 'select-post-list',      'is_pro' =>  true  ),
		array( 'name' => 'select-post-list-item', 'is_pro' =>  true  ),
		array( 'name' => 'slider',                'is_pro' =>  true  ),
		array( 'name' => 'slider-item',           'is_pro' =>  true  ),
		array( 'name' => 'step',                  'is_pro' =>  true  ),
		array( 'name' => 'step-item',             'is_pro' =>  true  ),
		array( 'name' => 'table-of-contents-new', 'is_pro' =>  true  ),
		array( 'name' => 'timeline',              'is_pro' =>  true  ),
		array( 'name' => 'timeline-item',         'is_pro' =>  true  )
	);
	// phpcs:enable

	/**
	 * ビルドされた assets のパス
	 *
	 * @var string
	 */
	private $assets_build_path;

	/**
	 * ビルドされた assets のURL
	 *
	 * @var string
	 */
	private $assets_build_url;

	/**
	 * ブロック毎に分割してビルドされた assets のURL
	 *
	 * @var string
	 */
	private $separate_assets_build_url;

	/**
	 * Constructor.
	 */
	private function __construct() {
		$this->set_action_and_filter();
		$this->assets_build_path         = plugin_dir_path( __FILE__ ) . 'build/';
		$this->assets_build_url          = VK_BLOCKS_URL . 'build/';
		$this->separate_assets_build_url = VK_BLOCKS_DIR_URL . 'build/';
	}

	/**
	 * Initialize
	 *
	 * @return VK_Blocks_Block_Loader
	 */
	public static function init() {
		// static 宣言しているので既に定義されている場合は $instance に null は入らずに既存のインスタンスのまま.
		static $instance                         = null;
		return $instance ? $instance : $instance = new static();
	}

	/**
	 * Set_action_and_filter
	 *
	 * @return void
	 */
	public function set_action_and_filter() {
		$hook_point = apply_filters( 'vk_blocks_enqueue_point', 'wp_enqueue_scripts' );

		// load registered css on front.
		add_action( $hook_point, array( $this, 'add_styles' ) );

		// load registered css on admin.
		if ( is_admin() ) {
			add_action( 'enqueue_block_assets', array( $this, 'add_styles' ) );
		}

		// Register block css and js.
		add_action( 'init', array( $this, 'register_blocks_assets' ), 10 );

		add_filter( 'register_block_type_args', array( $this, 'separate_assets_load_reducer' ) );

		if ( self::should_load_separate_assets() ) {
			add_filter( 'should_load_separate_core_block_assets', '__return_true' );
		}
	}

	/**
	 * VK Blocks Add Styles
	 */
	public function add_styles() {
		wp_enqueue_style( 'vk-blocks-build-css' );
	}

	/**
	 * Register Blocks Assets
	 */
	public function register_blocks_assets() {
		$asset_file = include $this->assets_build_path . 'block-build.asset.php';

		// CSSを登録.
		if ( self::should_load_separate_assets() && ! is_admin() ) {
			wp_register_style( 'vk-blocks-build-css', $this->separate_assets_build_url . 'extensions/common/style.css', array(), VK_BLOCKS_VERSION );
		} else {
			wp_register_style( 'vk-blocks-build-css', $this->assets_build_url . 'block-build.css', array(), VK_BLOCKS_VERSION );
		}

		wp_register_style( 'vk-blocks-build-editor-css', $this->assets_build_url . 'block-build-editor.css', array(), VK_BLOCKS_VERSION );

		// ブロックのJavascriptを登録.
		wp_register_script(
			'vk-blocks-build-js',
			$this->assets_build_url . 'block-build.js',
			$asset_file['dependencies'],
			VK_BLOCKS_VERSION,
			true
		);

		// 翻訳を追加.
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'vk-blocks-build-js', 'vk-blocks', plugin_dir_path( __FILE__ ) . 'languages' );
		}

		if ( function_exists( 'register_block_type' ) ) {
			foreach ( $this->get_block_names() as $block_name ) {
				$this->load_blocks( $block_name );
			}
		}
	}

	/**
	 * VK Blocks separate_assets_load_reducer
	 * cssを分割しない（すべて結合したcssを読み込む）場合はregister_block_typeで登録したscriptやstyleを読み込ませない
	 * add_filter('vk_blocks_should_load_separate_assets', '__return_true'); にするとブロックごとのcssを読み込む
	 *
	 *  @param array $args Array of arguments for registering a block type.
	 *  @return array Return filter style, script, editor_style and editor_script added.
	 */
	public function separate_assets_load_reducer( $args ) {
		if ( self::should_load_separate_assets() ) {
			return $args;
		}

		foreach ( $this->get_block_names( array( 'is_pro' => false ) ) as $block_name ) {
			if ( ! empty( $args['style'] ) && 'vk-blocks/' . $block_name === $args['style'] ) {
				$args['style']  = null;
				$args['script'] = null;
			}
		}

		foreach ( $this->get_block_names( array( 'is_pro' => true ) ) as $block_name ) {
			if ( file_exists( VK_BLOCKS_SRC_PATH . '/blocks/_pro/' . $block_name . '/index.php' ) ) {
				if ( ! empty( $args['style'] ) && 'vk-blocks/' . $block_name === $args['style'] ) {
					$args['style']  = null;
					$args['script'] = null;
				}
			}
		}
		return $args;
	}

	/**
	 * Get block information
	 *
	 * @param string $block_name ブロック名.
	 * @return array ブロック情報 ['name' => '' 'is_pro' => '']
	 */
	public function get_block_info( $block_name ) {
		$block_list = array();
		foreach ( $this->blocks as $block ) {
			if ( $block['name'] === $block_name ) {
				return $block;
			}
		}
		return false;
	}

	/**
	 * Get block names.
	 *
	 * @param array $params 取得条件.
	 * @return array
	 */
	public function get_block_names( $params = array() ) {
		$block_list = array();
		foreach ( $this->blocks as $block ) {
			if ( count( $params ) ) {
				foreach ( $params as $key => $value ) {
					if ( $block[ $key ] === $value ) {
						$block_list[] = $block['name'];
					}
				}
			} else {
				$block_list[] = $block['name'];
			}
		}
		return $block_list;
	}

	/**
	 * Should_load_separate_assets
	 * 分割読み込みを有効化するかどうか
	 * true : load separate block
	 * false: load marged block
	 *
	 * @return bool
	 */
	public static function should_load_separate_assets() {
		return apply_filters( 'vk_blocks_should_load_separate_assets', false );
	}

	/**
	 * ブロックのロード
	 *
	 * @param string $block_name 読み込むブロック名.
	 * @return void
	 */
	public function load_blocks( $block_name ) {
		$block_info = $this->get_block_info( $block_name );

		$require_file_path = VK_BLOCKS_SRC_PATH . '/blocks/' . $block_name . '/index.php';
		if ( $block_info['is_pro'] ) {
			$require_file_path = VK_BLOCKS_SRC_PATH . '/blocks/_pro/' . $block_name . '/index.php';
		}

		if ( file_exists( $require_file_path ) ) {
			require_once $require_file_path;
		}
	}
}
