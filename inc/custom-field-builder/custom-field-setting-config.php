<?php
/*
* 給与明細のカスタムフィールド（品目以外）
*/

class VKB_Block_Template_Custom_Fields {

	static public $target_post_type;
	static public $target_post_meta_key;


	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'be_reusable_blocks_admin_menu' ), 9, 2  );
		add_action( 'admin_menu', array( __CLASS__, 'add_metabox' ), 10, 2 );
		add_action( 'save_post', array( __CLASS__, 'save_custom_fields' ), 10, 2 );
		add_action( 'rest_api_init', array( __CLASS__, 'add_custom_fields_to_rest' ), 10, 2);
	}

	// add meta_box
	public static function add_metabox() {

		$id            = 'vkb_block_template';
		$title         = __( 'Register as VK Blocks template', 'vk-blocks' );
		$callback      = array( __CLASS__, 'fields_form' );
		$screen        = self::$target_post_type;
		$context       = 'advanced';
		$priority      = 'high';
		$callback_args = '';

		add_meta_box( $id, $title, $callback, $screen, $context, $priority, $callback_args );

	}

	public static function fields_form() {
		global $post;

		$custom_fields_array = VKB_Block_Template_Custom_Fields::custom_fields_array();
		$befor_custom_fields = '';
		VK_Custom_Field_Builder::form_table( $custom_fields_array, $befor_custom_fields );
	}

	public static function save_custom_fields() {
		$custom_fields_array = VKB_Block_Template_Custom_Fields::custom_fields_array();
		// $custom_fields_array_no_cf_builder = arra();
		// $custom_fields_all_array = array_merge(  $custom_fields_array, $custom_fields_array_no_cf_builder );
		VK_Custom_Field_Builder::save_cf_value( $custom_fields_array );
	}

	public static function custom_fields_array() {
		
		$custom_fields_array = array(
			// 'salary_staff'         => array(
			// 	'label'       => 'スタッフ',
			// 	'type'        => 'select',
			// 	'description' => 'スタッフは<a href="' . admin_url( '/post-new.php?post_type=staff' ) . '" target="_blank">こちら</a>から登録してください。',
			// 	'required'    => true,
			// 	'options'     => $staff,
			// ),
			self::$target_post_meta_key  => array(
				'label'       => 'Staff No.',
				'type'        => 'text',
				'description' => '支給分一覧ではこの値が小さい順に表示されます。',
				'required'    => false,
			)
		);
		return $custom_fields_array;
	}


	public static function be_reusable_blocks_admin_menu() {
		add_menu_page( __( 'Reusable Blocks', 'vk-blocks' ), __( 'Reusable Blocks', 'vk-blocks' ), 'edit_posts', 'edit.php?post_type=wp_block', '', 'dashicons-editor-table', 22 );
	}

	public static function add_custom_fields_to_rest() {
		register_rest_field(
			self::$target_post_type,
			'custom_fields',
			[
				'get_callback'    => array( __CLASS__, 'get_custom_fields_value' ), // カスタム関数名指定 
				'update_callback' => null,
				'schema'          => null,
				]
			);
	}
	  
	public static function get_custom_fields_value(  $object, $field_name, $request  ) {
		  // 出力したいカスタムフィールドのキーをここで定義
		  $meta_fields = array(self::$target_post_meta_key);
		  $meta = array();
		  foreach ( $meta_fields as $field ) {
			  $meta[ $field ] = get_post_meta( $object[ 'id' ], $field, true );
		  }
		  return $meta;
	  }

}

VKB_Block_Template_Custom_Fields::init();
VKB_Block_Template_Custom_Fields::$target_post_type =  'wp_block';
VKB_Block_Template_Custom_Fields::$target_post_meta_key =  'is_registerd_vkb_template';