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
		array( 'name' => 'alert',                     'is_pro' =>  false ),
		array( 'name' => 'balloon',                   'is_pro' =>  false ),
		array( 'name' => 'border-box',                'is_pro' =>  false ),
		array( 'name' => 'button',                    'is_pro' =>  false ),
		array( 'name' => 'faq',                       'is_pro' =>  false ),
		array( 'name' => 'faq2',                      'is_pro' =>  false ),
		array( 'name' => 'faq2-a',                    'is_pro' =>  false ),
		array( 'name' => 'faq2-q',                    'is_pro' =>  false ),
		array( 'name' => 'flow',                      'is_pro' =>  false ),
		array( 'name' => 'heading',                   'is_pro' =>  false ),
		array( 'name' => 'icon',                      'is_pro' =>  false ),
		array( 'name' => 'icon-outer',                'is_pro' =>  false ),
		array( 'name' => 'page-content',              'is_pro' =>  false ),
		array( 'name' => 'pr-blocks',                 'is_pro' =>  false ),
		array( 'name' => 'pr-content',                'is_pro' =>  false ),
		array( 'name' => 'spacer',                    'is_pro' =>  false ),
		array( 'name' => 'staff',                     'is_pro' =>  false ),
		array( 'name' => 'accordion',                 'is_pro' =>  true  ),
		array( 'name' => 'accordion-target',          'is_pro' =>  true  ),
		array( 'name' => 'accordion-trigger',         'is_pro' =>  true  ),
		array( 'name' => 'animation',                 'is_pro' =>  true  ),
		array( 'name' => 'button-outer',              'is_pro' =>  true  ),
		array( 'name' => 'card',                      'is_pro' =>  true  ),
		array( 'name' => 'card-item',                 'is_pro' =>  true  ),
		array( 'name' => 'child-page',                'is_pro' =>  true  ),
		array( 'name' => 'grid-column',               'is_pro' =>  true  ),
		array( 'name' => 'grid-column-item',          'is_pro' =>  true  ),
		array( 'name' => 'icon-card',                 'is_pro' =>  true  ),
		array( 'name' => 'icon-card-item',            'is_pro' =>  true  ),
		array( 'name' => 'outer',                     'is_pro' =>  true  ),
		array( 'name' => 'post-list',                 'is_pro' =>  true  ),
		array( 'name' => 'select-post-list',          'is_pro' =>  true  ),
		array( 'name' => 'select-post-list-item',     'is_pro' =>  true  ),
		array( 'name' => 'slider',                    'is_pro' =>  true  ),
		array( 'name' => 'slider-item',               'is_pro' =>  true  ),
		array( 'name' => 'step',                      'is_pro' =>  true  ),
		array( 'name' => 'step-item',                 'is_pro' =>  true  ),
		array( 'name' => 'table-of-contents-new',     'is_pro' =>  true  ),
		array( 'name' => 'timeline',                  'is_pro' =>  true  ),
		array( 'name' => 'timeline-item',             'is_pro' =>  true  ),
		array( 'name' => 'query',                     'is_pro' =>  true  ),
		array( 'name' => 'post-template',             'is_pro' =>  true  ),
		array( 'name' => 'query-pagination',          'is_pro' =>  true  ),
		array( 'name' => 'query-pagination-next',     'is_pro' =>  true  ),
		array( 'name' => 'query-pagination-numbers',  'is_pro' =>  true  ),
		array( 'name' => 'query-pagination-previous', 'is_pro' =>  true  ),
	);
	// phpcs:enable

	/**
	 * コアのブロックを拡張しているスタイルの一覧
	 * ※ group と list は cssファイルが共通ファイル内に書かれてる？
	 *
	 * @var array
	 */
	private $block_style_names = array(
		array( 'name' => 'heading' ),
		array( 'name' => 'image' ),
		array( 'name' => 'table' ),
	);

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
	 * 一括か分割かの設定に関わらずコンストラクタから実行されるファイル読み込みアクション
	 *
	 * @return void
	 */
	public function set_action_and_filter() {

		/**
		 * Reason of Using through the after_setup_theme is
		 * to be able to change the action hook point of css load from theme..
		 */
		add_action( 'after_setup_theme', array( $this, 'load_css_action' ) );

		// Register block css and js.
		add_action( 'init', array( $this, 'register_blocks_assets' ), 10 );

		// Switch load file type by filter.
		add_filter( 'register_block_type_args', array( $this, 'separate_assets_load_reducer' ) );

		if ( self::should_load_separate_assets() ) {
			// 分割読み込み有効化.
			add_filter( 'should_load_separate_core_block_assets', '__return_true' );
		}
	}

	/**
	 * VK Blocks Enqueue Point
	 */
	public function load_css_action() {
		$hook_point = apply_filters( 'vk_blocks_enqueue_point', 'wp_enqueue_scripts' );

		// load registered css on front（結合ファイル指定の場合のみ結合CSSが読み込まれる）.
		add_action( $hook_point, array( $this, 'add_styles' ) );

		// load registered css on admin（結合ファイル指定の場合のみ結合CSSが読み込まれる）.
		if ( is_admin() ) {
			add_action( 'enqueue_block_assets', array( $this, 'add_styles' ) );
		}
	}

	/**
	 * VK Blocks Add Styles
	 */
	public function add_styles() {
		// 分割読み込みの場合は register されるファイルが false 指定で何も読み込まれなくなっている
		wp_enqueue_style( 'vk-blocks-build-css' );
		wp_enqueue_style( 'vk-blocks-utils-common-css' );
	}

	/**
	 * Register Blocks Assets
	 */
	public function register_blocks_assets() {
		$asset_file = include $this->assets_build_path . 'block-build.asset.php';

		// 結合CSSを登録.
		if ( self::should_load_separate_assets() && ! is_admin() ) {

			// ハンドル名vk-blocks-build-cssはwp_add_inline_styleで使用している箇所があるので登録する
			// 分割読み込みの場合 : false = 結合CSSを読み込まない.
			wp_register_style( 'vk-blocks-build-css', false, array(), VK_BLOCKS_VERSION );
			// src/utils内の内の共通cssの読み込み
			wp_register_style( 'vk-blocks-utils-common-css', VK_BLOCKS_DIR_URL . 'build/utils/common.css', array(), VK_BLOCKS_VERSION );
		} else {
			// 一括読み込みの場合 : 結合CSSを登録.
			wp_register_style( 'vk-blocks-build-css', VK_BLOCKS_DIR_URL . 'build/block-build.css', array(), VK_BLOCKS_VERSION );
		}

		// 編集画面のCSS登録 : 設定に関わらず結合CSSを登録 -> 各ブロックのindex.phpから呼び出される
		wp_register_style( 'vk-blocks-build-editor-css', VK_BLOCKS_DIR_URL . 'build/block-build-editor.css', array(), VK_BLOCKS_VERSION );

		// 編集画面のjs登録 : 設定に関わらず結合JSを登録 -> 各ブロックのindex.phpから呼び出される
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

		// 各ブロックを読み込む（一括/分割共通）
		if ( function_exists( 'register_block_type' ) ) {
			foreach ( $this->get_block_names() as $block_name ) {
				$this->load_block( $block_name );
			}
		}

		// コアのブロックを拡張しているスタイルの設定phpファイル読み込み
		if ( function_exists( 'register_block_style' ) ) {
			foreach ( $this->block_style_names as $block_style_name ) {
				$this->load_block_style( $block_style_name );
			}
		}
	}

	/**
	 * VK Blocks separate_assets_load_reducer
	 *
	 * 結合したcssを読み込む（cssを分割しない）場合は
	 * register_block_type で登録したscriptやstyleを読み込ませないように改変する
	 * ※add_filter('vk_blocks_should_load_separate_assets', '__return_true'); にするとブロックごとのcssを読み込む
	 *
	 *  @param array $args Array of arguments for registering a block type.
	 *  @return array Return filter style, script, editor_style and editor_script added.
	 */
	public function separate_assets_load_reducer( $args ) {

		/************************************************
		 * Load Separate file case
		 * 分割読み込みの場合
		 */
		if ( self::should_load_separate_assets() ) {
			return $args;
		}

		/************************************************
		 * Load Marged file case
		 * 結合読み込みの場合 -> 個別の js / css ファイルを読み込まないように配列を改変する
		 */
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
		$vk_blocks_options = get_option( 'vk_blocks_options' );
		if ( function_exists( 'wp_should_load_separate_core_block_assets' ) && isset( $vk_blocks_options['load_separate_option'] ) ) {
			$bool = true;
		} else {
			$bool = false;
		}
		return apply_filters( 'vk_blocks_should_load_separate_assets', $bool );
	}

	/**
	 * ブロックのロード
	 *
	 * @param string $block_name 読み込むブロック名.
	 * @return void
	 */
	public function load_block( $block_name ) {
		$block_info = $this->get_block_info( $block_name );

		$require_file_path = VK_BLOCKS_SRC_PATH . '/blocks/' . $block_name . '/index.php';
		if ( $block_info['is_pro'] ) {
			$require_file_path = VK_BLOCKS_SRC_PATH . '/blocks/_pro/' . $block_name . '/index.php';
		}

		if ( file_exists( $require_file_path ) ) {
			require_once $require_file_path;
		}
	}

	/**
	 * ブロックスタイルのロード
	 * コアのブロックのスタイル拡張しているphpファイルの読み込み
	 *
	 * @param string $block_style_name 読み込むブロック名.
	 * @return void
	 */
	public function load_block_style( $block_style_name ) {
		$require_file_path = VK_BLOCKS_SRC_PATH . 'extensions/core/' . $block_style_name['name'] . '/index.php';
		if ( file_exists( $require_file_path ) ) {
			require_once $require_file_path;
		}
	}

	/**
	 * Disable clone
	 *
	 * @return void
	 * @throws \Exception Exception.
	 */
	final public function __clone() {
		throw new \Exception( sprintf( 'Clone is not allowed: %s', get_class( $this ) ) );
	}
}
