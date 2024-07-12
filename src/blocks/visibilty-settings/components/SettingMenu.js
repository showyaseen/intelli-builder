import { Button, MenuItem, MenuGroup, Dropdown, DropdownMenu } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { more, moreVertical, trash } from '@wordpress/icons';
import metadata from '../block.json'
const SettingMenu = ({ attributes, setAttributes, setIsModalOpen }) => {

	const copyConditionsToClipboard = () => {
		const conditions = {
			enableConditionalContent: attributes?.intelliBuidlerSettings.enableConditionalContent,
			userRoles: attributes?.intelliBuidlerSettings.userRoles,
			scheduleType: attributes?.intelliBuidlerSettings.scheduleType,
			startDate: attributes?.intelliBuidlerSettings.startDate,
			endDate: attributes?.intelliBuidlerSettings.endDate,
			userStatus: attributes?.intelliBuidlerSettings.userStatus,
			specificUsers: attributes?.intelliBuidlerSettings.specificUsers,
		};
		clipboard.write(JSON.stringify(conditions));
	};
	const resetConditions = () => {
		console.log('metadata?.attributes?.default?.intelliBuidlerSettings?.default', metadata);
		setAttributes({
			intelliBuidlerSettings: metadata?.attributes?.intelliBuidlerSettings?.default
		});
	};
	return (
		<>
			<DropdownMenu
				controls={[
					{
						icon: trash,
						onClick: resetConditions,
						title: 'Reset all rules'
					},
				]}
				icon={moreVertical}
				onToggle={function noRefCheck() { }}
				label="Settings"
			>
				<MenuGroup>
					<MenuItem icon={more} onClick={copyConditionsToClipboard}>
						Move Up
					</MenuItem>
					<MenuItem icon={more} onClick={copyConditionsToClipboard}>
						Move Down
					</MenuItem>
				</MenuGroup>
				<MenuGroup>
					<MenuItem icon={more} onClick={copyConditionsToClipboard}>
						Remove
					</MenuItem>
				</MenuGroup>
				<MenuGroup>
					<MenuItem onClick={copyConditionsToClipboard}>Copy Conditions to Clipboard</MenuItem>
					<MenuItem onClick={() => setIsModalOpen(true)}>Paste Conditions from Clipboard</MenuItem>
				</MenuGroup>
			</DropdownMenu>
		</>
	);
}


export default SettingMenu;
