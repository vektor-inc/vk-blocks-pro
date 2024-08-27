<?php

class VK_UnitTestCase extends WP_UnitTestCase {

    /**
     * Set Current User
     *
     * @param string $role
     * @return void
     */
    function set_current_user( $role ) {
        $user = $this->factory()->user->create_and_get( array(
            'role' => $role,
        ) );

        /*
        * Set $user as the current user
        */
        wp_set_current_user( $user->ID, $user->user_login );

        return $user;
        
    } 
}