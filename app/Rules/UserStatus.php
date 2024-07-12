<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class UserStatus implements Rule
{
	use SingletonTrait;

	protected $status;

	public function __construct($rules)
	{
		$this->status = $rules['userStatus'];
	}

	public function is_met(): bool
	{
		return ($this->status === 'loggedin' || $this->status === 'specific')
			? is_user_logged_in()
			: !is_user_logged_in();
	}
}
