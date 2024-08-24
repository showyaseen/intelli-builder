<?php
/**
 * Plugin Name: IntelliBuilder
 * Plugin URI: https://wordpress.com/plugins/intelli-builder
 * Description: IntelliBuilder is a WordPress plugin that controls who sees your content based on user rules, web-based rules, and scheduled time.
 * Version: 1.0.0
 * Author: Yaseen Taha
 * Author URI: showyaseen@hotmail.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: intelli-builder
 * Domain Path: /languages
 * Package: YTAHA\IntelliBuilder
 */

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use hisorange\BrowserDetect\Parser as Browser;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;
use YTAHA\IntelliBuilder\Traits\SanitizedNestedTrait;

/**
 * Class DeviceType
 *
 * This class checks if the user's device type matches any of the specified device types in the rules.
 *
 * @package YTAHA\IntelliBuilder
 */
class DeviceType implements Rule {

	use SingletonTrait, SanitizedNestedTrait;

	/**
	 * @var array $user_device The list of user device types to check against.
	 */
	protected $user_device;

	/**
	 * DeviceType constructor.
	 *
	 * @param array $rules The rules array containing the device type rules.
	 */
	public function __construct( $rules ) {
		$this->user_device = $this->sanitize_nested_array( $rules['userDeviceType'] ?? [] );
	}

	/**
	 * Check if the user's device type meets the specified criteria.
	 *
	 * @return bool True if the user's device type matches any of the specified device types, false otherwise.
	 */
	public function is_met(): bool {
		foreach ( $this->user_device as $device ) {
			if ( strtolower( Browser::deviceType() ) === strtolower( $device ) ) {
				return true;
			}
		}
		return false;
	}
}
