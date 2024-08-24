/**
 * LoggedInUser Component for selecting user roles.
 *
 * @package YTAHA\IntelliBuilder
 */

import { useState } from '@wordpress/element';
import { PanelRow, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * LoggedInUser component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {JSX.Element} LoggedInUser component.
 */
const LoggedInUser = ({ attributes, setAttributes }) => {
	const [userStatus, setUserStatus] = useState(attributes?.intelliBuidlerSettings?.userStatus || '');

	const handleUserStatusChange = (value) => {
		setUserStatus(value);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, userStatus: value, specificUsers: [], userRoles: [] } });
	};

	return (
		<PanelRow>
			<SelectControl
				label={ __( 'User Status', 'intelli-builder' ) }
				value={userStatus}
				options={[
					{ label: __( 'Please select user status', 'intelli-builder' ), value: '' },
					{ label: __( 'Logged In', 'intelli-builder' ), value: 'loggedin' },
					{ label: __( 'Logged Out', 'intelli-builder' ), value: 'loggedout' },
					{ label: __( 'Specific Users', 'intelli-builder' ), value: 'specific' },
				]}
				onChange={handleUserStatusChange}
			/>
		</PanelRow>
	);
};

export default LoggedInUser;
