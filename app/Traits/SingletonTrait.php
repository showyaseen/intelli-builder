<?php

namespace YTAHA\IntelliBuilder\Traits;

trait SingletonTrait
{

	public static function get_instance($args = null)
	{
		static $instances = array();

		// @codingStandardsIgnoreLine Plugin-backported
		$called_class_name = get_called_class();

		if (!isset($instances[$called_class_name])) {
			if(null !== $args) {
				$instances[$called_class_name] = new $called_class_name($args);
			} else {
				$instances[$called_class_name] = new $called_class_name();
			}
		}

		return $instances[$called_class_name];
	}

	private function __clone()
	{
	}
	private function __wakeup()
	{
	}
}
