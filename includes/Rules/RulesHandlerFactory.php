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

/**
 * Class RulesHandlerFactory
 *
 * This class provides a factory for creating rule handler instances.
 *
 * @package YTAHA\IntelliBuilder
 */
class RulesHandlerFactory {

	/**
	 * @var array $rules_handlers A map of rule names to their corresponding handler classes.
	 */
	private static $rules_handlers = array(
		'userRoles'           => \YTAHA\IntelliBuilder\Rules\UserRole::class,
		'scheduleType'        => \YTAHA\IntelliBuilder\Rules\DateTime::class,
		'userStatus'          => \YTAHA\IntelliBuilder\Rules\UserStatus::class,
		'specificUsers'       => \YTAHA\IntelliBuilder\Rules\UserName::class,
		'geoLocation_country' => \YTAHA\IntelliBuilder\Rules\Country::class,
		'geoLocation_city'    => \YTAHA\IntelliBuilder\Rules\City::class,
		'userDeviceType'      => \YTAHA\IntelliBuilder\Rules\DeviceType::class,
		'browser_name'        => \YTAHA\IntelliBuilder\Rules\BrowserName::class,
		'browser_language'    => \YTAHA\IntelliBuilder\Rules\BrowserLanguage::class,
		'operatingSystem'     => \YTAHA\IntelliBuilder\Rules\OperatingSystem::class,
		'sourceReferer'       => \YTAHA\IntelliBuilder\Rules\Referral::class,
		'returningUser'       => \YTAHA\IntelliBuilder\Rules\ReturningUser::class,
	);

	/**
	 * Get the rule handler for a given rule name.
	 *
	 * @param string $rule_name The name of the rule.
	 * @param array  $rule_params The parameters for the rule.
	 *
	 * @return Rule|null The rule handler instance or null if not found.
	 */
	public static function get_rule_handler( string $rule_name, array $rule_params ): ?Rule {
		$handler_class = self::$rules_handlers[ $rule_name ] ?? null;
		if ( ! empty( $handler_class ) ) {
			return new $handler_class( $rule_params );
		}

		return null;
	}
}
