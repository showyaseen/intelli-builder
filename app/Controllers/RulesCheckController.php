<?php

namespace YTAHA\IntelliBuilder\Controllers;

use YTAHA\IntelliBuilder\Rules\RulesHandlerFactory;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class RulesCheckController
{
	use SingletonTrait;

	public function should_render($rules)
	{
		$action = $rules['action'] ?? null;
		$match = $rules['match'] ?? null;
		$is_matched = false;

		if (null !== $action && null !== $match) {
			if ('any' === $match) {
				$is_matched = $this->match_any($rules);
			} else {
				$is_matched = $this->match_all($rules);
			}
		}

		return ('show' === $action) ? $is_matched : !$is_matched;
	}

	private function match_all($rules)
	{
		foreach ($rules as $rule_name => $rule_params) {
			if(empty($rule_params)) {
				continue;
			}
			$rule_handler = RulesHandlerFactory::getRuleHandler($rule_name, $rules);
			if($rule_handler)
			if ($rule_handler && !$rule_handler->is_met()) {
				return false;
			}
		}
		return true;
	}

	private function match_any($rules)
	{
		foreach ($rules as $rule_name => $rule_params) {
			$rule_handler = RulesHandlerFactory::getRuleHandler($rule_name, $rules);
			if ($rule_handler && $rule_handler->is_met()) {
				return true;
			}
		}
		return false;
	}
}
