import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useState } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Flex, FlexItem, CardBody } from '@wordpress/components';
import Divider from './components/ui/Divider';
import pluginIcon from './components/ui/icon';
import { __ } from '@wordpress/i18n';

import './editor.scss';

import metadata from './block.json';
import {
	User,
	DateTime,
	SoftwareDevice,
	WebBased,
	SettingMenu,
	SelectedConditions,
	PasteModal,
	Action,
	Match
} from './components';

const addBlockConditionalSettingsAttribute = (settings) => {
	if (typeof settings.attributes !== 'undefined') {
		settings.attributes = { ...settings.attributes, ...metadata.attributes };
	}
	return settings;
};

const addBlockConditionalSettingsControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { attributes, setAttributes, isSelected } = props;
		const { enableConditionalContent } = attributes.intelliBuidlerSettings;
		const [isModalOpen, setIsModalOpen] = useState(false);
		const [openSection, setOpenSection] = useState(null); // track which section is open

		const handleToggle = (section) => {
			setOpenSection(openSection === section ? null : section); // toggle section
		};

		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && (
					<InspectorControls>
						<PanelBody
							title={__('Conditional Visibility')}
							icon={pluginIcon}
							initialOpen={true}>

							<p style={{ marginBottom: '10px' }}>Control who sees your content based on user rules, web-based rules, and scheduled time.</p>

							<Flex align="flex-end">
								<FlexItem>
									<ToggleControl
										label="Enable Rules"
										checked={enableConditionalContent}
										onChange={(value) => setAttributes({ intelliBuidlerSettings: { ...attributes.intelliBuidlerSettings, enableConditionalContent: value } })}
									/>
								</FlexItem>
								<FlexItem>
									<SettingMenu attributes={attributes} setAttributes={setAttributes} setIsModalOpen={setIsModalOpen} />
								</FlexItem>
							</Flex>
							<SelectedConditions attributes={attributes} setAttributes={setAttributes} />
							<User attributes={attributes} setAttributes={setAttributes} onToggle={handleToggle} isOpen={openSection === 'user'} />
							<DateTime attributes={attributes} setAttributes={setAttributes} onToggle={handleToggle} isOpen={openSection === 'dateTime'} />
							<SoftwareDevice attributes={attributes} setAttributes={setAttributes} onToggle={handleToggle} isOpen={openSection === 'softwareDevice'} />
							<WebBased attributes={attributes} setAttributes={setAttributes} onToggle={handleToggle} isOpen={openSection === 'webBased'} />
							<Divider />
							<Action attributes={attributes} setAttributes={setAttributes} />
							<Match attributes={attributes} setAttributes={setAttributes} />
						</PanelBody>

						<PasteModal
							isModalOpen={isModalOpen}
							setIsModalOpen={setIsModalOpen}
							setAttributes={setAttributes}
						/>
					</InspectorControls>
				)}
			</Fragment>
		);
	};
}, 'addBlockConditionalSettingsControl');


addFilter(
	'editor.BlockEdit',
	'my-plugin/with-conditional-settings-control',
	addBlockConditionalSettingsControl
);

addFilter('blocks.registerBlockType',
	'my-plugin/add-conditional-settings-attribute',
	addBlockConditionalSettingsAttribute
);
