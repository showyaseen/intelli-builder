<?php
/**
 * Plugin Name: IntelliBuilder
 * Plugin URI: https://wordpress.com/plugins/intelli-builder
 * Description: IntelliBuilder is a WordPress plugin that controls who sees your content based on user rules, web-based rules, and scheduled time.
 * Version: 1.0.0
 * Author: Yaseen Taha
 * Author URI: showyaseen@hotmail.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: intelli-builder
 * Domain Path: /languages
 * Package: YTAHA\IntelliBuilder
 */

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

/**
 * Class DateTime
 *
 * This class checks if the current date falls before, after, or between specified dates.
 *
 * @package YTAHA\IntelliBuilder
 */
class DateTime implements Rule {

	use SingletonTrait;

	/**
	 * @var string $schedule_type The type of schedule to check (before, after, between).
	 */
	protected $schedule_type;

	/**
	 * @var string $start_date The start date for the schedule check.
	 */
	protected $start_date;

	/**
	 * @var string $end_date The end date for the schedule check.
	 */
	protected $end_date;

	/**
	 * @var \DateTime $current_date The current date and time.
	 */
	protected $current_date;

	/**
	 * DateTime constructor.
	 *
	 * @param array $rules The rules array containing the date and schedule type rules.
	 */
	public function __construct( $rules ) {
		$this->schedule_type = sanitize_text_field( $rules['scheduleType'] ) ?? '';
		$this->start_date    = sanitize_text_field( $rules['startDate'] ) ?? '';
		$this->end_date      = sanitize_text_field( $rules['endDate'] ) ?? '';
		$this->current_date  = new \DateTime();
	}

	/**
	 * Check if the current date is after the start date.
	 *
	 * @return bool True if the current date is after the start date, false otherwise.
	 */
	public function is_after(): bool {
		$start_date = new \DateTime( $this->start_date );
		return $this->current_date > $start_date;
	}

	/**
	 * Check if the current date is before the start date.
	 *
	 * @return bool True if the current date is before the start date, false otherwise.
	 */
	public function is_before(): bool {
		$start_date = new \DateTime( $this->start_date );
		return $this->current_date < $start_date;
	}

	/**
	 * Check if the current date is between the start and end dates.
	 *
	 * @return bool True if the current date is between the start and end dates, false otherwise.
	 */
	public function is_between(): bool {
		$start = new \DateTime( $this->start_date );
		$end   = new \DateTime( $this->end_date );
		return $this->current_date >= $start && $this->current_date <= $end;
	}

	/**
	 * Check if the current date meets the schedule criteria.
	 *
	 * @return bool True if the current date meets the schedule criteria, false otherwise.
	 */
	public function is_met(): bool {
		switch ( $this->schedule_type ) {
			case 'before':
				return $this->is_before();
			case 'after':
				return $this->is_after();
			case 'between':
				return $this->is_between();
			default:
				return false;
		}
	}
}
