/**
 * UserDeviceType Component for selecting user device types for block visibility settings.
 *
 * @package YTAHA\IntelliBuilder
 */

import { useState } from '@wordpress/element';
import { PanelRow, FormTokenField } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * UserDeviceType component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {JSX.Element} UserDeviceType component.
 */
const UserDeviceType = ({ attributes, setAttributes }) => {
	const [deviceType, setDeviceType] = useState(attributes?.intelliBuidlerSettings?.userDeviceType || []);

	/**
	 * Handles change in selected device types.
	 *
	 * @param {Array} values Selected device types.
	 */
	const handleDeviceTypeChange = (values) => {
		setDeviceType(values);
		setAttributes({
			intelliBuidlerSettings: {
				...attributes.intelliBuidlerSettings,
				userDeviceType: values
			}
		});
	};

	/**
	 * Predefined list of device type options.
	 */
	const deviceTypeOptions = [
		'Desktop',
		'Tablet',
		'Mobile'
	];

	return (
		<PanelRow>
			<FormTokenField
				label={ __('Device Type', 'intelli-builder') }
				value={deviceType}
				suggestions={deviceTypeOptions}
				onChange={handleDeviceTypeChange}
				__experimentalExpandOnFocus
				__experimentalAutoSelectFirstMatch
			/>
		</PanelRow>
	);
};

export default UserDeviceType;
