<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Utils\CookieManager;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

/**
 * Class ReturningUser
 *
 * This class checks if the user is a returning user based on cookie data.
 *
 * @package YTAHA\IntelliBuilder
 */
class ReturningUser implements Rule {

	use SingletonTrait;

	/**
	 * @var string $returning The returning user rule.
	 */
	protected $returning;

	/**
	 * @var CookieManager $cookie_manager The cookie manager instance.
	 */
	protected $cookie_manager;

	/**
	 * @var string $cookie_name The name of the cookie to check.
	 */
	protected $cookie_name = 'user_visited';

	/**
	 * ReturningUser constructor.
	 *
	 * @param array $rules The rules array containing the returning user criteria.
	 */
	public function __construct( array $rules ) {
		$this->returning      = sanitize_key( $rules['returningUser'] ?? '' );
		$this->cookie_manager = CookieManager::get_instance();
	}

	/**
	 * Check if the user is a new user based on the absence of a specific cookie.
	 *
	 * @return bool True if the user is new, false otherwise.
	 */
	public function is_new_user(): bool {
		return ! $this->cookie_manager->get( $this->cookie_name );
	}

	/**
	 * Check if the user's returning status meets the specified criteria.
	 *
	 * @return bool True if the criteria is met, false otherwise.
	 */
	public function is_met(): bool {
		if ( $this->returning === 'new' ) {
			return $this->is_new_user();
		} elseif ( $this->returning === 'returning' ) {
			return ! $this->is_new_user();
		}
		return false;
	}
}
