<?php

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class DateTime implements Rule
{

	use SingletonTrait;

	protected $scheduleType;
	protected $startDate;
	protected $endDate;
	protected $currentDate;

	public function __construct($rules)
	{
		$this->scheduleType = $rules['scheduleType'] ?? '';
		$this->startDate = $rules['startDate'] ?? '';
		$this->endDate = $rules['endDate'] ?? '';
		$this->currentDate = new \DateTime();
	}

	public function isAfter()
	{
		$startDate = new \DateTime($this->startDate);
		return $this->currentDate > $startDate;
	}

	public function isBefore()
	{
		$startDate = new \DateTime($this->startDate);
		return $this->currentDate < $startDate;
	}

	public function isBetween()
	{
		$start = new \DateTime($this->startDate);
		$end = new \DateTime($this->endDate);
		return $this->currentDate >= $start && $this->currentDate <= $end;
	}

	public function is_met(): bool
	{
		switch ($this->scheduleType) {
			case 'before':
				return $this->isBefore();
			case 'after':
				return $this->isAfter();
			case 'between':
				return $this->isBetween();
			default:
				return false;
		}
	}
}
