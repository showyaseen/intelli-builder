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
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

/**
 * Class Referral
 *
 * This class checks if the user's referral URL matches the specified criteria.
 *
 * @package YTAHA\IntelliBuilder
 */
class Referral implements Rule {

	use SingletonTrait;

	/**
	 * @var string $referer The referral source to check against.
	 */
	protected $referer;

	/**
	 * Referral constructor.
	 *
	 * @param array $rules The rules array containing the referral source criteria.
	 */
	public function __construct( array $rules ) {
		$this->referer = sanitize_text_field( $rules['sourceReferer'] ) ?? '';
	}

	/**
	 * Get the referral URL from the server.
	 *
	 * @return string The referral URL or an empty string if not set.
	 */
	public function get_referral_url(): string {
		return sanitize_text_field( wp_unslash( $_SERVER['HTTP_REFERER'] ) ) ?? '';
	}

	/**
	 * Check if the user's referral URL matches the specified criteria.
	 *
	 * @return bool True if the referral URL matches, false otherwise.
	 */
	public function is_met(): bool {
		$userReferral = $this->get_referral_url();
		return strpos( strtolower( $userReferral ), strtolower( $this->referer ) ) !== false;
	}
}
