import { useState } from '@wordpress/element';
import { Icon, SelectControl, TimePicker } from '@wordpress/components';
import Label from '../../ui/Label';
import { scheduled } from '@wordpress/icons';
import Divider from '../../ui/Divider';

const ScheduleTime = ({ attributes, setAttributes }) => {
	const [scheduleType, setScheduleType] = useState(attributes?.intelliBuidlerSettings?.scheduleType || '');
	const [startDate, setStartDate] = useState(attributes?.intelliBuidlerSettings?.startDate);
	const [endDate, setEndDate] = useState(attributes?.intelliBuidlerSettings?.endDate);

	const handleScheduleTypeChange = (value) => {
		setScheduleType(value);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, scheduleType: value } });
	};

	const handleStartDateChange = (date) => {
		setStartDate(date);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, startDate: date } });
	};

	const handleEndDateChange = (date) => {
		setEndDate(date);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, endDate: date } });
	};

	return (
		<>
			<SelectControl
				label="Schedule Type"
				value={scheduleType}
				options={[
					{ label: 'Please select schedule type', value: '' },
					{ label: 'Before', value: 'before' },
					{ label: 'After', value: 'after' },
					{ label: 'Between', value: 'between' },
				]}
				onChange={handleScheduleTypeChange}
			/>
			{scheduleType === 'before' || scheduleType === 'after' ? (
				<TimePicker
					style={{ alignItems: 'flex-start' }}
					currentDate={startDate}
					onChange={handleStartDateChange}
				/>
			) : scheduleType === 'between' ? (
				<>
					<Label icon={scheduled} text={'FROM DATE'} />
					<TimePicker
						currentDate={startDate}
						onChange={handleStartDateChange}
					/>

					<Divider />

					<Label icon={scheduled} text={'TO DATE'} />
					<TimePicker
						currentDate={endDate}
						onChange={handleEndDateChange}
					/>
				</>
			) : null}
		</>
	);
};

export default ScheduleTime;
