<?php
/**
* Class TestRestAPI
*
* @package Vk_Blocks_Pro
*/

class RestAPITest extends WP_UnitTestCase {

    /**
    * Holds the WP REST Server object
    *
    * @var WP_REST_Server
    */
    static $server;

    /**
    * Create a item for our test and initiate REST API.
    */
    public static function wpSetUpBeforeClass() {

        // Initiating the REST API.
        global $wp_rest_server;
        self::$server = $wp_rest_server = new WP_REST_Server();
        do_action( 'rest_api_init' );

    }

    /**
    * Test the endpoint for get_vk_blocks_options
    *
    * @return void.
    */

    public function test_get_vk_options() {
        $this->set_current_user( 'administrator' );
        $request = new WP_REST_Request( 'GET', '/vk-blocks/v1/get_vk_blocks_options' );
        $response = self::$server->dispatch( $request );
        $actual = $response->get_data();

        $vk_options_expect  = VK_Blocks_Options::get_options();
        $vk_balloon_meta_expect = VK_Blocks_Options::get_balloon_meta_options();

        print '------------------------------------' . PHP_EOL;
        print 'RestAPITest::test_get_vk_options()' . PHP_EOL;
        print '------------------------------------' . PHP_EOL;
        $this->assertSame( $vk_options_expect, $actual[ 'vkBlocksOption' ] );
        $this->assertSame( $vk_balloon_meta_expect, $actual[ 'vkBlocksBalloonMeta' ] );

    }

    /**
    * Add user and set the user as current user.
    *
    * @param  string $role administrator, editor, author, contributor ...
    * @return void
    */

    public function set_current_user( $role ) {
        $user = self::factory()->user->create_and_get(
            array(
                'role' => $role,
            )
        );

        /*
        * Set $user as current user
        */
        wp_set_current_user( $user->ID, $user->user_login );
    }

}
;