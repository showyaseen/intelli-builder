<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class UserRole implements Rule
{

	use SingletonTrait;

	protected $roles;

	public function __construct($rules)
	{
		$this->roles = $rules['userRoles'] ?? [];
	}

	public function getUserRoles()
	{
		if (is_user_logged_in()) {
			$user = wp_get_current_user();
			return $user->roles;
		}
		return [];
	}

	public function is_met(): bool
	{
		$roles = array_map(function ($role) {
			return strtolower($role);
		}, $this->roles);

		foreach ($this->getUserRoles() as $role) {
			if (in_array(strtolower($role), $roles)) {
				return true;
			}
		}
		return false;
	}
}
