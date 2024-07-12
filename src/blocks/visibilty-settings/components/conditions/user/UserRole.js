import { useState, useEffect } from '@wordpress/element';
import { PanelRow, FormTokenField } from '@wordpress/components';

const UserRole = ({ attributes, setAttributes }) => {
	const [roleOptions, setRoleOptions] = useState([]);

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

	return (
		<PanelRow>
			<FormTokenField
				__experimentalAutoSelectFirstMatch
				__experimentalExpandOnFocus
				label="Select User Roles"
				onChange={(userRoles) => setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, userRoles: userRoles } })}
				suggestions={roleOptions}
				value={attributes?.intelliBuidlerSettings?.userRoles || []}
			/>
		</PanelRow>
	);
};

export default UserRole;
