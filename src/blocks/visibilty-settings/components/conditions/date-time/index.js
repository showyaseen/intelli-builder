import { PanelBody, Icon } from '@wordpress/components';
import ScheduleTime from './ScheduleTime';
import { scheduled } from '@wordpress/icons';

const DateTime = ({ attributes, setAttributes, onToggle, isOpen }) => {
	const title = <span style={{ display: 'flex', alignItems: 'center' }}><Icon icon={scheduled} /> Date Time </span>;

	const handleToggle = () => {
		onToggle('dateTime'); // notify parent of toggle event
	};

	return (
		<PanelBody
			title={title}
			initialOpen={false}
			opened={isOpen}
			onToggle={handleToggle}>

			<ScheduleTime attributes={attributes} setAttributes={setAttributes} />

		</PanelBody>
	);
};

export default DateTime;
