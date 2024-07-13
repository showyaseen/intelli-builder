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
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

/**
 * Class BrowserLanguage
 *
 * This class checks if the user's browser language matches any of the specified languages.
 *
 * @package YTAHA\IntelliBuilder
 */
class BrowserLanguage implements Rule {

    use SingletonTrait;

    /**
     * @var array $languages The list of languages to check against the user's browser language.
     */
    protected $languages;

    /**
     * BrowserLanguage constructor.
     *
     * @param array $rules The rules array containing the browser language rules.
     */
    public function __construct($rules) {
        $this->languages = $rules['browser_language'] ?? [];
    }

    /**
     * Check if the user's browser language matches any of the specified languages.
     *
     * @return bool True if a match is found, false otherwise.
     */
    public function is_met(): bool {
        $user_language = strtolower($_SERVER['HTTP_ACCEPT_LANGUAGE']);
        foreach ($this->languages as $language) {
            if (strpos($user_language, strtolower($language)) !== false) {
                return true;
            }
        }
        return false;
    }
}
