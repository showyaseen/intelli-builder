/**
 * SpecificUser Component for selecting user roles.
 *
 * @package YTAHA\IntelliBuilder
 */

import { useState, useEffect } from '@wordpress/element';
import { PanelRow, FormTokenField } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const fetchUsers = async () => {
	return await apiFetch({ path: '/wp/v2/users?per_page=100' });
};

/**
 * SpecificUser component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {JSX.Element} SpecificUser component.
 */
const SpecificUser = ({ attributes, setAttributes }) => {
	const [users, setUsers] = useState([]);
	const userList = users ? users.map(user => (user.name)) : [];

	useEffect(() => {
		const loadUsers = async () => {
			const fetchedUsers = await fetchUsers();
			setUsers(fetchedUsers);
		};

		loadUsers();
	}, []);

	return (
		<PanelRow>
			<FormTokenField
				__experimentalAutoSelectFirstMatch
				__experimentalExpandOnFocus
				label={ __('Select Users', 'intelli-builder') }
				onChange={(specificUsers) => setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, specificUsers: specificUsers, userRoles: [] } })}
				suggestions={userList}
				value={attributes?.intelliBuidlerSettings.specificUsers || []}
			/>
		</PanelRow>
	);
};

export default SpecificUser;
