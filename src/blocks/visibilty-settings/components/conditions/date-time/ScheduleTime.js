/**
 * Component for handling schedule time settings in the block editor.
 *
 * @package YTAHA\IntelliBuilder
 */

import { useState } from '@wordpress/element';
import { SelectControl, TimePicker } from '@wordpress/components';
import Label from '../../ui/Label';
import Divider from '../../ui/Divider';
import { scheduled } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * ScheduleTime component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {JSX.Element} ScheduleTime component.
 */
const ScheduleTime = ({ attributes, setAttributes }) => {
	// State hooks to manage schedule type, start date, and end date.
	const [scheduleType, setScheduleType] = useState(attributes?.intelliBuidlerSettings?.scheduleType || '');
	const [startDate, setStartDate] = useState(attributes?.intelliBuidlerSettings?.startDate);
	const [endDate, setEndDate] = useState(attributes?.intelliBuidlerSettings?.endDate);

	/**
	 * Handles change in schedule type.
	 *
	 * @param {string} value New schedule type.
	 */
	const handleScheduleTypeChange = (value) => {
		setScheduleType(value);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, scheduleType: value } });
	};

	/**
	 * Handles change in start date.
	 *
	 * @param {string} date New start date.
	 */
	const handleStartDateChange = (date) => {
		setStartDate(date);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, startDate: date } });
	};

	/**
	 * Handles change in end date.
	 *
	 * @param {string} date New end date.
	 */
	const handleEndDateChange = (date) => {
		setEndDate(date);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, endDate: date } });
	};

	return (
		<>
			<SelectControl
				label={ __( 'Schedule Type', 'intelli-builder' ) }
				value={scheduleType}
				options={[
					{ label: __( 'Please select schedule type', 'intelli-builder' ), value: '' },
					{ label: __( 'Before', 'intelli-builder' ), value: 'before' },
					{ label: __( 'After', 'intelli-builder' ), value: 'after' },
					{ label: __( 'Between', 'intelli-builder' ), value: 'between' },
				]}
				onChange={handleScheduleTypeChange}
			/>
			{(scheduleType === 'before' || scheduleType === 'after') && (
				<TimePicker
					style={{ alignItems: 'flex-start' }}
					currentDate={startDate}
					onChange={handleStartDateChange}
				/>
			)}
			{scheduleType === 'between' && (
				<>
					<Label icon={scheduled} text={__(' From Date', 'intelli-builder' )} />
					<TimePicker
						currentDate={startDate}
						onChange={handleStartDateChange}
					/>

					<Divider />

					<Label icon={scheduled} text={__( 'To Date', 'intelli-builder' )} />
					<TimePicker
						currentDate={endDate}
						onChange={handleEndDateChange}
					/>
				</>
			)}
		</>
	);
};

export default ScheduleTime;
