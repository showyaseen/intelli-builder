/**
 * SourceReferer Component for selecting user roles.
 *
 * @package YTAHA\IntelliBuilder
 */

import { useState } from '@wordpress/element';
import { PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * SourceReferer component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {JSX.Element} SourceReferer component.
 */
const SourceReferer = ({ attributes, setAttributes }) => {
	const [referer, setReferer] = useState(attributes?.intelliBuidlerSettings?.sourceReferer || '');

	const handleRefererChange = (value) => {
		setReferer(value);
		setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, sourceReferer: value } });
	};

	return (
		<PanelRow>
			<TextControl
				label={ __('Referer URL', 'intelli-builder') }
				value={referer}
				onChange={handleRefererChange}
			/>
		</PanelRow>
	);
};

export default SourceReferer;
