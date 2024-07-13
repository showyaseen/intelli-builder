/**
 * DateTime Component for scheduling visibility settings in the block editor.
 *
 * @package YTAHA\IntelliBuilder
 */

import { PanelBody, Icon } from '@wordpress/components';
import ScheduleTime from './ScheduleTime';
import { scheduled } from '@wordpress/icons';

/**
 * DateTime component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @param {Function} props.onToggle Function to handle panel toggle.
 * @param {boolean} props.isOpen Indicates if the panel is open.
 * @return {JSX.Element} DateTime component.
 */
const DateTime = ({ attributes, setAttributes, onToggle, isOpen }) => {
	// Title with an icon for the PanelBody.
	const title = (
		<span style={{ display: 'flex', alignItems: 'center' }}>
			<Icon icon={scheduled} /> Date Time
		</span>
	);

	/**
	 * Handles panel toggle.
	 */
	const handleToggle = () => {
		onToggle('dateTime'); // Notify parent of toggle event.
	};

	return (
		<PanelBody
			title={title}
			initialOpen={false}
			opened={isOpen}
			onToggle={handleToggle}
		>
			<ScheduleTime attributes={attributes} setAttributes={setAttributes} />
		</PanelBody>
	);
};

export default DateTime;
