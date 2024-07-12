<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Utils\GeoIP;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class City implements Rule
{
	use SingletonTrait;

	private $user_country;
	private $user_city;
	private $cities = [];

	public function __construct($rules)
	{
		$this->cities = $rules['geoLocation_city'] ?? [];
		$geoIP = GeoIP::get_instance();
		$this->user_city = $geoIP->getCity();
		$this->user_country = $geoIP->getCountry();
	}

	public function is_met(): bool
	{
		if(!$this->user_city || !$this->user_country) {
			return false;
		}

		foreach ($this->cities as $city) {
			$city_country = explode('-', $city);
			if (2 === count($city_country)) {
				$city = strtolower($city_country[0]);
				$country = strtolower($city_country[1]);
				if ($city === $this->user_city && $country === $this->user_country) {
					return true;
				}
			}
		}
		return false;
	}
}
