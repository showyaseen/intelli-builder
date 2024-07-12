import { SelectControl } from '@wordpress/components';

const Match = ({ attributes, setAttributes }) => {

	return (
		<SelectControl
			label="Apply the action when"
			value={attributes?.intelliBuidlerSettings?.match || 'all'}
			options={[
				{ label: 'All rules must match', value: 'all' },
				{ label: 'Any rule at least match', value: 'any' },
			]}
			onChange={(match) => setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, match: match } })}
		/>
	);
}

export default Match;
