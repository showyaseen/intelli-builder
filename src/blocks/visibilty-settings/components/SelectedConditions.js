/**
 * Package: YTAHA\IntelliBuilder
 *
 */

import { useState, useEffect } from '@wordpress/element';
import { Notice } from '@wordpress/components';
import { generateConditionDescription } from '../utils/generateConditionDescription';

const SelectedConditions = ({ attributes, setAttributes }) => {
	const [status, setStatus] = useState('info');
	const [conditionStatment, setConditionStatment] = useState('');
	const { intelliBuidlerSettings } = attributes;

	useEffect(() => {
		const [count, description] = generateConditionDescription(intelliBuidlerSettings);
		setStatus((intelliBuidlerSettings.enableConditionalContent && count > 0 ? 'info' : 'warning'));
		setConditionStatment(description);
	}, [intelliBuidlerSettings]);

	return (
		<>
			<Notice className="intelli-builder-notification" isDismissible={false} status={status}>
				<div dangerouslySetInnerHTML={{ __html: conditionStatment }} />
			</Notice>
		</>
	);
}

export default SelectedConditions;
