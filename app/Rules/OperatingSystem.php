<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;
use hisorange\BrowserDetect\Parser as Browser;

class OperatingSystem implements Rule
{

	use SingletonTrait;

	protected $osList;

	public function __construct($rules)
	{
		$this->osList = $rules['operatingSystem']  ?? [];
	}

	public function is_met(): bool
	{
		foreach ($this->osList as $os) {
			if (strtolower(Browser::platformFamily()) === strtolower($os)) {
				return true;
			}
		}
		return false;
	}
}
