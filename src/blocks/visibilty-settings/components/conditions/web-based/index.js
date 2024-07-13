/**
 * WebBased Component for block visibility settings.
 *
 * @package YTAHA\IntelliBuilder
 */

import { PanelBody, Icon } from '@wordpress/components';
import GeoLocation from './GeoLocation';
import RecurringUser from './RecurringUser';
import SourceReferer from './SourceReferer';

import { globe } from '@wordpress/icons';

/**
 * WebBased component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @param {Function} props.onToggle Function to handle section toggle.
 * @param {boolean} props.isOpen Boolean indicating if the section is open.
 * @return {JSX.Element} WebBased component.
 */
const WebBased = ({ attributes, setAttributes, onToggle, isOpen }) => {
	const title = <span style={{ display: 'flex', alignItems: 'center' }}><Icon icon={globe} /> Web-Based Rules </span>;

	const handleToggle = () => {
		onToggle('webBased'); // notify parent of toggle event
	};

	return (
		<PanelBody
			title={title}
			initialOpen={false}
			opened={isOpen}
			onToggle={handleToggle}>
			<GeoLocation attributes={attributes} setAttributes={setAttributes} />
			<RecurringUser attributes={attributes} setAttributes={setAttributes} />
			<SourceReferer attributes={attributes} setAttributes={setAttributes} />
		</PanelBody>
	);
};

export default WebBased;
