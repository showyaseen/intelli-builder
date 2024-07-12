<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;

class RulesHandlerFactory
{

	private static $rules_handlers = [
		'userRoles' => \YTAHA\IntelliBuilder\Rules\UserRole::class,
		'scheduleType' => \YTAHA\IntelliBuilder\Rules\DateTime::class,
		'userStatus' => \YTAHA\IntelliBuilder\Rules\UserStatus::class,
		'specificUsers' => \YTAHA\IntelliBuilder\Rules\UserName::class,
		'geoLocation_country' => \YTAHA\IntelliBuilder\Rules\Country::class,
		'geoLocation_city' => \YTAHA\IntelliBuilder\Rules\City::class,
		'userDeviceType' => \YTAHA\IntelliBuilder\Rules\DeviceType::class,
		'browser_name' => \YTAHA\IntelliBuilder\Rules\BrowserName::class,
		'browser_language' => \YTAHA\IntelliBuilder\Rules\BrowserLanguage::class,
		'operatingSystem' => \YTAHA\IntelliBuilder\Rules\OperatingSystem::class,
		'sourceReferer' => \YTAHA\IntelliBuilder\Rules\Referral::class,
		'returningUser' => \YTAHA\IntelliBuilder\Rules\ReturningUser::class,
	];

	public static function getRuleHandler($rule_name, $rule_params)
	{
		$handler_class = self::$rules_handlers[$rule_name] ?? null;
		if (!empty($handler_class)) {
			$rule_handler = new $handler_class($rule_params);
			return $rule_handler;
		}
	}
}
