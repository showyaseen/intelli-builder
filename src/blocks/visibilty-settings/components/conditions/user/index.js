import { PanelBody, Icon } from '@wordpress/components';
import LoggedInUser from './LoggedInUser';
import UserRole from './UserRole';
import SpecificUser from './SpecificUser';

import { postAuthor } from '@wordpress/icons';

const User = ({ attributes, setAttributes, onToggle, isOpen }) => {
	const title = <span style={{ display: 'flex', alignItems: 'center' }}><Icon icon={postAuthor} /> User Rules </span>;
	const { userStatus } = attributes.intelliBuidlerSettings;
	const handleToggle = () => {
		onToggle('user'); // notify parent of toggle event
	};

	return (
		<PanelBody
			title={title}
			initialOpen={false}
			opened={isOpen}
			onToggle={handleToggle}>
			<LoggedInUser attributes={attributes} setAttributes={setAttributes} />
			{userStatus === 'specific' && <SpecificUser attributes={attributes} setAttributes={setAttributes} />}
			{userStatus === 'loggedin' && <UserRole attributes={attributes} setAttributes={setAttributes} />}
		</PanelBody>
	);
};

export default User;
