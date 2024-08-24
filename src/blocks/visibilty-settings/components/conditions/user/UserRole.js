/**
 * UserRole Component for selecting user roles.
 *
 * @package YTAHA\IntelliBuilder
 */

import { useState, useEffect } from '@wordpress/element';
import { PanelRow, FormTokenField } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * UserRole component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {JSX.Element} UserRole component.
 */
const UserRole = ({ attributes, setAttributes }) => {
	// State to hold available role options
	const [roleOptions, setRoleOptions] = useState([]);

	// Fetch role options on component mount
	useEffect(() => {
		const roles = [
			'Administrator',
			'Editor',
			'Author',
			'Contributor',
			'Subscriber',
		];
		setRoleOptions(roles);
	}, []);

	/**
	 * Handle change in selected user roles.
	 *
	 * @param {Array} userRoles Selected user roles.
	 */
	const handleUserRoleChange = (userRoles) => {
		setAttributes({
			intelliBuidlerSettings: {
				...attributes.intelliBuidlerSettings,
				userRoles: userRoles,
				specificUsers: []
			},
		});
	};

	return (
		<PanelRow>
			<FormTokenField
				__experimentalAutoSelectFirstMatch
				__experimentalExpandOnFocus
				label={ __('Select User Roles', 'intelli-builder') }
				suggestions={roleOptions}
				value={attributes?.intelliBuidlerSettings?.userRoles || []}
				onChange={handleUserRoleChange}
			/>
		</PanelRow>
	);
};

export default UserRole;
