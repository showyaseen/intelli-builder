/**
 * Package: YTAHA\IntelliBuilder
 *
 */

// Import necessary components and icons from @wordpress/components and @wordpress/icons
import { DropdownMenu } from '@wordpress/components';
import { moreVertical, trash } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import metadata from '../block.json'; // Import block metadata

// Define the SettingMenu component
const SettingMenu = ({ setAttributes, setIsModalOpen }) => {

	/**
	 * Resets the conditional settings to their default values.
	 */
	const resetConditions = () => {
		setAttributes({
			intelliBuidlerSettings: metadata?.attributes?.intelliBuidlerSettings?.default
		});
	};

	return (
		<>
			{/* DropdownMenu component for the settings menu */}
			<DropdownMenu
				controls={[
					{
						icon: trash,
						onClick: resetConditions,
						title: __( 'Reset all rules', 'intelli-builder' )
					},
				]}
				icon={moreVertical}
				onToggle={function noRefCheck() { }}
				label={ __( 'Settings', 'intelli-builder' ) }
			/>
		</>
	);
}

// Export the SettingMenu component as the default export
export default SettingMenu;
