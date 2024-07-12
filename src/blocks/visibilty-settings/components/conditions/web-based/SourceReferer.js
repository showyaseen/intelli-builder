import { useState } from '@wordpress/element';
import { PanelRow, TextControl } from '@wordpress/components';

const SourceReferer = ({ attributes, setAttributes }) => {
	const [referer, setReferer] = useState(attributes?.intelliBuidlerSettings?.sourceReferer || '');

	const handleRefererChange = (value) => {
		setReferer(value);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, sourceReferer: value } });
	};

	return (
		<PanelRow>
			<TextControl
				label="Referer URL"
				value={referer}
				onChange={handleRefererChange}
			/>
		</PanelRow>
	);
};

export default SourceReferer;
