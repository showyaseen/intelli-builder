/**
 * SoftwareDevice Component for block visibility settings.
 *
 * @package YTAHA\IntelliBuilder
 */

import { PanelBody, Icon } from '@wordpress/components';
import Browser from './Browser';
import OperatingSystem from './OperatingSystem';
import UserDeviceType from './UserDeviceType';
import Divider from '../../ui/Divider';

import { desktop } from '@wordpress/icons';

/**
 * SoftwareDevice component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @param {Function} props.onToggle Function to handle section toggle.
 * @param {boolean} props.isOpen Boolean indicating if the section is open.
 * @return {JSX.Element} SoftwareDevice component.
 */
const SoftwareDevice = ({ attributes, setAttributes, onToggle, isOpen }) => {
	const title = (
		<span style={{ display: 'flex', alignItems: 'center' }}>
			<Icon icon={desktop} /> Software & Device
		</span>
	);

	/**
	 * Handles toggle event for the section.
	 */
	const handleToggle = () => {
		onToggle('softwareDevice'); // notify parent of toggle event
	};

	return (
		<PanelBody
			title={title}
			initialOpen={false}
			opened={isOpen}
			onToggle={handleToggle}
		>
			<Browser attributes={attributes} setAttributes={setAttributes} />
			<Divider />
			<OperatingSystem attributes={attributes} setAttributes={setAttributes} />
			<Divider />
			<UserDeviceType attributes={attributes} setAttributes={setAttributes} />
		</PanelBody>
	);
};

export default SoftwareDevice;
