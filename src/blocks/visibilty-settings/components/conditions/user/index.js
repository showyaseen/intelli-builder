/**
 * User Component for selecting user roles.
 *
 * @package YTAHA\IntelliBuilder
 */

import { PanelBody, Icon } from '@wordpress/components';
import LoggedInUser from './LoggedInUser';
import UserRole from './UserRole';
import SpecificUser from './SpecificUser';

import { postAuthor } from '@wordpress/icons';

/**
 * User component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @param {Function} props.onToggle Function to handle section toggle.
 * @param {boolean} props.isOpen Boolean indicating if the section is open.
 * @return {JSX.Element} User component.
 */
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
