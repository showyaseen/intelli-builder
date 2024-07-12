<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Utils\CookieManager;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class ReturningUser implements Rule
{
	use SingletonTrait;

	protected $returning;

	protected $cookieManager;
	protected $cookieName = 'user_visited';

	public function __construct($rules)
	{
		$this->returning = $rules['returningUser'] ?? '';
		$this->cookieManager = new CookieManager();
	}

	public function isNewUser()
	{
		if ($this->cookieManager->get($this->cookieName)) {
			return false;
		}
		return true;
	}

	public function is_met(): bool
	{
		return $this->returning === 'new' ? $this->isNewUser() : !$this->isNewUser();
	}
}
