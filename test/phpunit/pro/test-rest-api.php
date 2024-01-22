<?php
/**
* Class TestRestAPI
*
* @package Vk_Blocks_Pro
*/

class RestAPITest extends VK_UnitTestCase {

    /**
    * Holds the WP REST Server object
    *
    * @var WP_REST_Server
    */
    static $server;

    /**
    * initiate REST API.
    */
    public static function wpSetUpBeforeClass():void {

        // Initiating the REST API.
        global $wp_rest_server;
        self::$server = $wp_rest_server = new WP_REST_Server();
        do_action( 'rest_api_init' );

    }

    /**
    * Permission check for update_vk_blocks_options
    *
    * @return void.
    */
    public function test_get_vk_options_permission():void  {

        $request = new WP_REST_Request( 'GET', '/vk-blocks/v1/update_vk_blocks_options' );
        $response = self::$server->dispatch( $request );
        $actual = $response->get_data();

        print '------------------------------------' . PHP_EOL;
        print 'RestAPITest::test_get_vk_options_permission()' . PHP_EOL;
        print '------------------------------------' . PHP_EOL;

        // 権限がなければ拒否しなければならない
        $this->assertSame( 401, $response->status );
    }

    /**
    * Test the endpoint for update_vk_blocks_options
    *
    * @return void.
    */
    public function test_get_vk_options_value() {

        $this->set_current_user( 'administrator' );
        $request = new WP_REST_Request( 'GET', '/vk-blocks/v1/update_vk_blocks_options' );
        $response = self::$server->dispatch( $request );
        $actual = $response->get_data();

        $vk_options_expect  = Vk_Blocks_EntryPoint::get_vk_blocks_options();

        print '------------------------------------' . PHP_EOL;
        print 'RestAPITest::test_get_vk_options_value()' . PHP_EOL;
        print '------------------------------------' . PHP_EOL;
        // var_dump('$vk_options_expect');
        // var_dump($vk_options_expect->{'data'});
        // var_dump('$actual');
        // var_dump($actual);
        $this->assertSame( $vk_options_expect->{'data'}, $actual );

    }

}
;
