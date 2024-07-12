<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class Referral implements Rule
{

	use SingletonTrait;

	protected $referer;

	public function __construct($rules)
	{
		$this->referer = $rules['sourceReferer'];
	}

	public function getReferralUrl()
	{
		return $_SERVER['HTTP_REFERER'] ?? '';
	}

	public function is_met(): bool
	{
		$userReferral =  $this->getReferralUrl();
		if (strpos($userReferral, strtolower($this->referer)) !== false) {
			return true;
		}
		return false;
	}
}
