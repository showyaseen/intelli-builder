/**
 * Package: YTAHA\IntelliBuilder
 *
 */

import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Match = ({ attributes, setAttributes }) => {

	return (
		<SelectControl
			label={ __('Apply the action when', 'intelli-builder') }
			value={attributes?.intelliBuidlerSettings?.match || 'all'}
			options={[
				{ label: __('All rules must match', 'intelli-builder'), value: 'all' },
				{ label: __('Any rule at least match', 'intelli-builder'), value: 'any' },
			]}
			onChange={(match) => setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, match: match } })}
		/>
	);
}

export default Match;
