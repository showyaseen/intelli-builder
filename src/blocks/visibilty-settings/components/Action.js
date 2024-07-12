import { SelectControl } from '@wordpress/components';

const Action = ({ attributes, setAttributes }) => {

	return (
		<SelectControl
			label="Action when rules apply"
			value={attributes?.intelliBuidlerSettings?.action || 'show'}
			options={[
				{ label: 'Show Block', value: 'show' },
				{ label: 'Hide Block', value: 'hide' },
			]}
			onChange={(action) => setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, action: action } })}
		/>
	);
}

export default Action;
