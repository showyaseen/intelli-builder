<?php

namespace YTAHA\IntelliBuilder\Utils;

use YTAHA\IntelliBuilder\Traits\SingletonTrait;

// TODO: COMPLETE CookieManager CLASS IMPLEMENTATION.
class CookieManager
{
	use SingletonTrait;

	protected $visitsCookieName = 'user_visited';

	public function __construct()
	{
		if (!$this->get($this->visitsCookieName)) {
			// TODO ADD COOKIES TO CLIENT
		}
	}

	public function set($name, $value, $expire)
	{
		setcookie($name, $value, $expire, "/");
	}

	public function get($name)
	{
		return $_COOKIE[$name] ?? null;
	}
}
