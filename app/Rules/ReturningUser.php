<?php
/**
 * Plugin Name: IntelliBuilder
 * Plugin URI: https://wordpress.com/plugins/intelli-builder
 * Description: IntelliBuilder is a WordPress plugin that controls who sees your content based on user rules, web-based rules, and scheduled time.
 * Version: 0.0.1
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
    public function __construct(array $rules) {
        $this->returning = $rules['returningUser'] ?? '';
        $this->cookie_manager = new CookieManager();
    }

    /**
     * Check if the user is a new user based on the absence of a specific cookie.
     *
     * @return bool True if the user is new, false otherwise.
     */
    public function is_new_user(): bool {
        return !$this->cookie_manager->get($this->cookie_name);
    }

    /**
     * Check if the user's returning status meets the specified criteria.
     *
     * @return bool True if the criteria is met, false otherwise.
     */
    public function is_met(): bool {
        return $this->returning === 'new' ? $this->is_new_user() : !$this->is_new_user();
    }
}
