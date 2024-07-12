import { useState, useEffect } from '@wordpress/element';
import { PanelRow, FormTokenField } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

const fetchUsers = async () => {
	return await apiFetch({ path: '/wp/v2/users?per_page=100' });
};

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
				label="Select Users"
				onChange={(specificUsers) => setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, specificUsers: specificUsers } })}
				suggestions={userList}
				value={attributes?.intelliBuidlerSettings.specificUsers || []}
			/>
		</PanelRow>
	);
};

export default SpecificUser;
