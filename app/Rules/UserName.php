<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class UserName implements Rule
{

	use SingletonTrait;

	protected $userNames;

	public function __construct($rules)
	{
		$this->userNames = $rules['specificUsers'] ?? [];
	}

	public function getUserName()
	{
		if (is_user_logged_in()) {
			$user = wp_get_current_user();
			return $user->display_name;
		}
		return '';
	}

	public function is_met(): bool
	{
		$names = array_map(function ($name) {
			return strtolower($name);
		}, $this->userNames);

		if (in_array(strtolower($this->getUserName()), $names)) {
			return true;
		}

		return false;
	}
}
