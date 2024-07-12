<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;
use hisorange\BrowserDetect\Parser as Browser;

class BrowserName implements Rule
{

	use SingletonTrait;

	protected $browsers;

	public function __construct($rules)
	{
		$this->browsers = $rules['browser_name'] ?? [];
	}

	public function is_met(): bool
	{
		$user_browser = Browser::browserFamily();
		foreach ($this->browsers as $browser_name) {
			if (strtolower($user_browser ) === strtolower($browser_name)) {
				return true;
			}
		}
		return false;
	}
}
