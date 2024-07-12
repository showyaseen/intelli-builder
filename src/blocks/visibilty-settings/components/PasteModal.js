import { useState } from '@wordpress/element';
import { Button, Modal, TextControl } from '@wordpress/components';


const PasteModal = ({ isModalOpen, setIsModalOpen }) => {
	const [jsonInput, setJsonInput] = useState('');
	const applyPastedConditions = () => {
		try {
			const conditions = JSON.parse(jsonInput);
			setAttributes({ intelliBuidlerSettings : conditions });
			setIsModalOpen(false);
		} catch (error) {
			alert('Invalid JSON format');
		}
	};
	if (isModalOpen) {
		return (
			<Modal
				title="Paste Conditions JSON"
				onRequestClose={() => setIsModalOpen(false)}
			>

				<TextControl
					label="Conditions JSON"
					value={jsonInput}
					onChange={(value) => setJsonInput(value)}
				/>
				<Button isPrimary onClick={applyPastedConditions}>Apply Conditions</Button>
				<Button isSecondary onClick={() => setIsModalOpen(false)}>Cancel</Button>
			</Modal>
		);
	}
}

export default PasteModal;
