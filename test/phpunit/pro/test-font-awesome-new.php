<?php
/**
 * Class FontAwesomeTest
 *
 * @package vk-blocks
 */

class FontAwesomeTest extends VK_UnitTestCase {

	/**
	 * Helper function to simulate the extraction of class names
	 */
	private function simulate_fontawesome_component( $htmlString, $modeClass = false ) {
		if ( $modeClass ) {
			preg_match( '/class="([^"]+)"/', $htmlString, $matches );
			return isset( $matches[1] ) ? $matches[1] : $htmlString;
		}
		return $htmlString;
	}

	/**
	 * Test modeClass is true (extract class name)
	 */
	public function test_mode_class_true() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_mode_class_true()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		$test_html = '<i class="fa-solid fa-circle-right"></i>';
		$expected_output = 'fa-solid fa-circle-right';

		$returned_value = $this->simulate_fontawesome_component( $test_html, true );

		print 'Expected: ' . $expected_output . PHP_EOL;
		print 'Returned: ' . $returned_value . PHP_EOL;

		$this->assertSame( $expected_output, $returned_value );
	}

	/**
	 * Test modeClass is false (output HTML as it is)
	 */
	public function test_mode_class_false() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_mode_class_false()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		$test_html = '<i class="fa-solid fa-circle-right"></i>';
		$expected_output = '<i class="fa-solid fa-circle-right"></i>';

		$returned_value = $this->simulate_fontawesome_component( $test_html, false );

		print 'Expected: ' . $expected_output . PHP_EOL;
		print 'Returned: ' . $returned_value . PHP_EOL;

		$this->assertSame( $expected_output, $returned_value );
	}

	/**
	 * Test that modeClass is false by default when not provided.
	 */
	public function test_mode_class_default_false() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_mode_class_default_false()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		$test_html = '<i class="fa-solid fa-circle-right"></i>';
		$expected_output = '<i class="fa-solid fa-circle-right"></i>';

		$returned_value = $this->simulate_fontawesome_component( $test_html );

		print 'Expected: ' . $expected_output . PHP_EOL;
		print 'Returned: ' . $returned_value . PHP_EOL;

		$this->assertSame( $expected_output, $returned_value );
	}
}
