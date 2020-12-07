<?php
add_action( 'customize_register', 'vk_register_customize_helpers', 1 );
if ( ! function_exists( 'vk_register_customize_helpers' ) ){
    function vk_register_customize_helpers( $wp_customize ) {
        /*	Add text control description
        /*-------------------------------------------*/
        if ( ! class_exists( 'Custom_Text_Control' ) ) {
            class Custom_Text_Control extends WP_Customize_Control {
                public $type         = 'customtext';
                public $description  = ''; // we add this for the extra description
                public $input_before = '';
                public $input_after  = '';
                public function render_content() {
                ?>
                <label>
                <span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
                <?php $style = ( $this->input_before || $this->input_after ) ? ' style="width:50%"' : ''; ?>
                <div>
                <?php echo wp_kses_post( $this->input_before ); ?>
                <input type="text" value="<?php echo esc_attr( $this->value() ); ?>"<?php echo $style; ?> <?php $this->link(); ?> />
                <?php echo wp_kses_post( $this->input_after ); ?>
                </div>
                <div><?php echo $this->description; ?></div>
            </label>
            <?php
                } // public function render_content() {
            } // class Custom_Text_Control extends WP_Customize_Control
        }

        if ( ! class_exists( 'Custom_Html_Control' ) ) {
            class Custom_Html_Control extends WP_Customize_Control {
                public $type             = 'customtext';
                public $custom_title_sub = ''; // we add this for the extra custom_html
                public $custom_html      = ''; // we add this for the extra custom_html
                public function render_content() {
                    if ( $this->label ) {
                        echo '<h2 class="admin-custom-h2">' . wp_kses_post( $this->label ) . '</h2>';
                    }
                    if ( $this->custom_title_sub ) {
                        echo '<h3 class="admin-custom-h3">' . wp_kses_post( $this->custom_title_sub ) . '</h3>';
                    }
                    if ( $this->custom_html ) {
                        echo '<div>' . wp_kses_post( $this->custom_html ) . '</div>';
                    }
                } // public function render_content() {
            } // class Custom_Html_Control extends WP_Customize_Control {
        }
    }
}
