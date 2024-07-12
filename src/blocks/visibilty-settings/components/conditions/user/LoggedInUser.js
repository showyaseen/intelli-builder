import { useState } from '@wordpress/element';
import { PanelRow, SelectControl } from '@wordpress/components';

const LoggedInUser = ({ attributes, setAttributes }) => {
	const [userStatus, setUserStatus] = useState(attributes?.intelliBuidlerSettings?.userStatus || '');

	const handleUserStatusChange = (value) => {
		setUserStatus(value);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, userStatus: value } });
	};

	return (
		<PanelRow>
			<SelectControl
				label="User Status"
				value={userStatus}
				options={[
					{ label: 'Please select user status', value: '' },
					{ label: 'Logged In', value: 'loggedin' },
					{ label: 'Logged Out', value: 'loggedout' },
					{ label: 'Specific Users', value: 'specific' },
				]}
				onChange={handleUserStatusChange}
			/>
		</PanelRow>
	);
};

export default LoggedInUser;
