import { useState } from '@wordpress/element';
import { PanelRow, FormTokenField } from '@wordpress/components';

const OperatingSystem = ({ attributes, setAttributes }) => {
	const [os, setOs] = useState(attributes?.intelliBuidlerSettings?.operatingSystem || []);

	const handleOsChange = (values) => {
		setOs(values);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, operatingSystem: values } });
	};

	const osOptions = [
		'Windows',
		'Mac',
		'Linux',
		'Unix',
		'Android',
		'iOS'
	];

	return (
		<PanelRow>
			<FormTokenField
				label="Operating System"
				value={os}
				suggestions={osOptions}
				onChange={handleOsChange}
				__experimentalExpandOnFocus
				__experimentalAutoSelectFirstMatch
			/>
		</PanelRow>
	);
};

export default OperatingSystem;
