/**
 * Package: YTAHA\IntelliBuilder
 *
 */

import { Icon } from '@wordpress/components';

const Label = ({ icon, text }) => {
	return (
		<div className="intelli-builder-schedule-label">
			<Icon icon={icon} />
			<p>{text}</p>
		</div>
	);
};

export default Label;
