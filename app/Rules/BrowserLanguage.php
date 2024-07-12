<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class BrowserLanguage implements Rule
{

	use SingletonTrait;

	protected $languages;

	public function __construct($rules)
	{
		$this->languages = $rules['browser_language'] ?? [];
	}

	public function is_met(): bool
	{
		$user_langauge = strtolower($_SERVER['HTTP_ACCEPT_LANGUAGE']);
		foreach ($this->languages as $langauge) {
			if (strpos($user_langauge, strtolower($langauge)) !== false) {
				return true;
			}
		}
		return false;
	}
}
