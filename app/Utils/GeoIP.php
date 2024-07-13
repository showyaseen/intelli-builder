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
 * Class GeoIP
 *
 * This class provides functionality to get the user's geographical location (country and city) based on their IP address.
 *
 * @package YTAHA\IntelliBuilder
 */
class GeoIP {

    use SingletonTrait;

    /**
     * @var string $country The user's country.
     */
    protected $country = '';

    /**
     * @var string $city The user's city.
     */
    protected $city = '';

    /**
     * GeoIP constructor.
     *
     * Initializes the user's location by calling the get_user_location method.
     */
    public function __construct() {
        $this->get_user_location();
    }

    /**
     * Get the user's location based on their IP address.
     *
     * This method fetches the user's IP address and uses the ip-api.com service to get the country and city.
     */
    private function get_user_location() {
        $ip = $this->get_ip_address();
        $url = "http://ip-api.com/json/{$ip}";
        $response = file_get_contents($url);
        $data = json_decode($response, true);

        if ($data['status'] === 'success') {
            $this->country = strtolower($data['country']);
            $this->city = strtolower($data['city']);
        }
    }

    /**
     * Get the user's country.
     *
     * @return string The user's country.
     */
    public function get_country(): string {
        return $this->country;
    }

    /**
     * Get the user's city.
     *
     * @return string The user's city.
     */
    public function get_city(): string {
        return $this->city;
    }

    /**
     * Get the user's IP address.
     *
     * @return string The user's IP address.
     */
    private function get_ip_address(): string {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }
}
