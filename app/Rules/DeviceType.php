<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use hisorange\BrowserDetect\Parser as Browser;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class DeviceType implements Rule
{

	use SingletonTrait;

	protected $userDevice;

	public function __construct($rules)
	{
		$this->userDevice = $rules['userDeviceType']  ?? [];
	}

	public function is_met(): bool
	{
		foreach ($this->userDevice as $device) {
			if (strtolower(Browser::deviceType()) === strtolower($device)) {
				return true;
			}
		}
		return false;
	}
}
