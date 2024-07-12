import { useState } from '@wordpress/element';
import { PanelRow, FormTokenField } from '@wordpress/components';

const UserDeviceType = ({ attributes, setAttributes }) => {
	const [deviceType, setDeviceType] = useState(attributes?.intelliBuidlerSettings?.userDeviceType || []);

	const handleDeviceTypeChange = (values) => {
		setDeviceType(values);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, userDeviceType: values } });
	};

	const deviceTypeOptions = [
		'Desktop',
		'Tablet',
		'Mobile'
	];

	return (
		<PanelRow>
			<FormTokenField
				label="Device Type"
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
