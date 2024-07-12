import { useState } from '@wordpress/element';
import { PanelRow, SelectControl } from '@wordpress/components';

const RecurringUser = ({ attributes, setAttributes }) => {
	const [returningUser, setUserType] = useState(attributes?.intelliBuidlerSettings?.returningUser || '');

	const handleUserTypeChange = (value) => {
		setUserType(value);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, returningUser: value } });
	};

	return (
		<PanelRow>
			<SelectControl
				label="Returning User"
				value={returningUser}
				options={[
					{ label: 'Please select user type', value: '' },
					{ label: 'New User', value: 'new' },
					{ label: 'Returning User', value: 'returning' },
				]}
				onChange={handleUserTypeChange}
			/>
		</PanelRow>
	);
};

export default RecurringUser;
