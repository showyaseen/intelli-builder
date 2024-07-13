/**
 * Package: YTAHA\IntelliBuilder
 *
 */

import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Action = ({ attributes, setAttributes }) => {

	return (
		<SelectControl
			label={ __('Action when rules apply', 'intelli-builder') }
			value={attributes?.intelliBuidlerSettings?.action || 'show'}
			options={[
				{ label: __( 'Show Block', 'intelli-builder' ), value: 'show' },
				{ label: __( 'Hide Block', 'intelli-builder' ), value: 'hide' },
			]}
			onChange={(action) => setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, action: action } })}
		/>
	);
}

export default Action;
