/**
 * OperatingSystem Component for selecting operating systems for block visibility settings.
 *
 * @package YTAHA\IntelliBuilder
 */

import { useState } from '@wordpress/element';
import { PanelRow, FormTokenField } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * OperatingSystem component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {JSX.Element} OperatingSystem component.
 */
const OperatingSystem = ({ attributes, setAttributes }) => {
	const [os, setOs] = useState(attributes?.intelliBuidlerSettings?.operatingSystem || []);

	/**
	 * Handles change in selected operating systems.
	 *
	 * @param {Array} values Selected operating systems.
	 */
	const handleOsChange = (values) => {
		setOs(values);
		setAttributes({
			intelliBuidlerSettings: {
				...attributes.intelliBuidlerSettings,
				operatingSystem: values
			}
		});
	};

	/**
	 * Predefined list of operating system options.
	 */
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
				label={ __('Operating System', 'intelli-builder') }
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
