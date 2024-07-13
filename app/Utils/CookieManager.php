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

namespace YTAHA\IntelliBuilder\Utils;

use YTAHA\IntelliBuilder\Traits\SingletonTrait;

/**
 * Class CookieManager
 *
 * This class provides functionality to manage cookies, including setting and getting cookies.
 *
 * @package YTAHA\IntelliBuilder
 */
class CookieManager {

    use SingletonTrait;

    /**
     * @var string $visits_cookie_name The name of the cookie that tracks user visits.
     */
    protected $visits_cookie_name = 'user_visited';

    /**
     * CookieManager constructor.
     *
     * Initializes the cookie manager and sets the visits cookie if it does not already exist.
     */
    public function __construct() {
        if (!$this->get($this->visits_cookie_name)) {
            // TODO: ADD COOKIES TO CLIENT
        }
    }

    /**
     * Set a cookie.
     *
     * @param string $name The name of the cookie.
     * @param string $value The value of the cookie.
     * @param int $expire The expiration time of the cookie.
     */
    public function set(string $name, string $value, int $expire): void {
        setcookie($name, $value, $expire, "/");
    }

    /**
     * Get a cookie value.
     *
     * @param string $name The name of the cookie.
     * @return string|null The value of the cookie or null if the cookie does not exist.
     */
    public function get(string $name): ?string {
        return $_COOKIE[$name] ?? null;
    }
}
