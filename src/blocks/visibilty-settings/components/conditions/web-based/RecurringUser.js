/**
 * RecurringUser Component for selecting user roles.
 *
 * @package YTAHA\IntelliBuilder
 */

import { useState } from '@wordpress/element';
import { PanelRow, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * RecurringUser component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {JSX.Element} RecurringUser component.
 */
const RecurringUser = ({ attributes, setAttributes }) => {
	const [returningUser, setUserType] = useState(attributes?.intelliBuidlerSettings?.returningUser || '');

	const handleUserTypeChange = (value) => {
		setUserType(value);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, returningUser: value } });
	};

	return (
		<PanelRow>
			<SelectControl
				label={ __('Returning User', 'intelli-builder') }
				value={returningUser}
				options={[
					{ label: __('Please select user type', 'intelli-builder'), value: '' },
					{ label: __('New User', 'intelli-builder'), value: 'new' },
					{ label: __('Returning User', 'intelli-builder'), value: 'returning' },
				]}
				onChange={handleUserTypeChange}
			/>
		</PanelRow>
	);
};

export default RecurringUser;
