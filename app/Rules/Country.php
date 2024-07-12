<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Utils\GeoIP;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class Country implements Rule
{
	use SingletonTrait;

	private $user_country;
	private $countries = [];

	public function __construct($rules)
	{
		$this->countries = $rules['geoLocation_country'] ?? [];
		$this->user_country = GeoIP::get_instance()->getCountry();
	}

	public function is_met(): bool
	{
		if(!$this->user_country) {
			return false;
		}

		foreach ($this->countries as $country) {
			if (strtolower($country) === strtolower($this->user_country)) {
				return true;
			}
		}

		return false;
	}
}
