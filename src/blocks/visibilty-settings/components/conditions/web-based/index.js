import { PanelBody, Icon } from '@wordpress/components';
import GeoLocation from './GeoLocation';
import RecurringUser from './RecurringUser';
import SourceReferer from './SourceReferer';

import { globe } from '@wordpress/icons';

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
