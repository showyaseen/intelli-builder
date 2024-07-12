import { PanelBody, Icon } from '@wordpress/components';
import Browser from './Browser';
import OperatingSystem from './OperatingSystem';
import UserDeviceType from './UserDeviceType';
import Divider from '../../ui/Divider';

import { desktop } from '@wordpress/icons';

import {
	__experimentalBoxControl as BoxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

const SoftwareDevice = ({ attributes, setAttributes, onToggle, isOpen }) => {
	const title = <span style={{ display: 'flex', alignItems: 'center' }}><Icon icon={desktop} /> Software & Device </span>;

	const handleToggle = () => {
		onToggle('softwareDevice'); // notify parent of toggle event
	};

	return (
		<PanelBody
			title={title}
			initialOpen={false}
			opened={isOpen}
			onToggle={handleToggle}>

			<Browser attributes={attributes} setAttributes={setAttributes} />
			<Divider  />
			<OperatingSystem attributes={attributes} setAttributes={setAttributes} />
			<Divider  />
			<UserDeviceType attributes={attributes} setAttributes={setAttributes} />

		</PanelBody>
	);
};

export default SoftwareDevice;
