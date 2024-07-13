/**
 * Adds conditional visibility settings to Gutenberg blocks.
 *
 * @package YTAHA\IntelliBuilder
 */

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useState } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Flex, FlexItem } from '@wordpress/components';
import Divider from './components/ui/Divider';
import { seen } from '@wordpress/icons';

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
	Action,
	Match
} from './components';

/**
 * Adds conditional settings attributes to block settings.
 *
 * @param {Object} settings Block settings.
 * @return {Object} Updated block settings.
 */
const addBlockConditionalSettingsAttribute = (settings) => {
	if (typeof settings.attributes !== 'undefined') {
		settings.attributes = { ...settings.attributes, ...metadata.attributes };
	}
	return settings;
};

/**
 * Creates a higher-order component to add conditional visibility settings to block edit component.
 *
 * @param {Function} BlockEdit Original block edit component.
 * @return {Function} Enhanced block edit component.
 */
const addBlockConditionalSettingsControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { attributes, setAttributes, isSelected } = props;
		const { enableConditionalContent } = attributes.intelliBuidlerSettings;
		const [isModalOpen, setIsModalOpen] = useState(false);
		const [openSection, setOpenSection] = useState(null); // Track which section is open

		/**
		 * Toggles the visibility of a section.
		 *
		 * @param {string} section Section to toggle.
		 */
		const handleToggle = (section) => {
			setOpenSection(openSection === section ? null : section); // Toggle section
		};

		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && (
					<InspectorControls>
						<PanelBody
							title={__('Conditional Visibility')}
							icon={seen}
							initialOpen={true}
						>
							<p style={{ marginBottom: '10px' }}>
								{__('Control who sees your content based on user rules, web-based rules, and scheduled time.', 'intelli-builder')}
							</p>

							<Flex align="flex-end">
								<FlexItem>
									<ToggleControl
										label={__('Enable Rules')}
										checked={enableConditionalContent}
										onChange={(value) =>
											setAttributes({
												intelliBuidlerSettings: {
													...attributes.intelliBuidlerSettings,
													enableConditionalContent: value,
												},
											})
										}
									/>
								</FlexItem>
								<FlexItem>
									<SettingMenu
										setAttributes={setAttributes}
										setIsModalOpen={setIsModalOpen}
									/>
								</FlexItem>
							</Flex>

							<SelectedConditions
								attributes={attributes}
								setAttributes={setAttributes}
							/>
							<User
								attributes={attributes}
								setAttributes={setAttributes}
								onToggle={handleToggle}
								isOpen={openSection === 'user'}
							/>
							<DateTime
								attributes={attributes}
								setAttributes={setAttributes}
								onToggle={handleToggle}
								isOpen={openSection === 'dateTime'}
							/>
							<SoftwareDevice
								attributes={attributes}
								setAttributes={setAttributes}
								onToggle={handleToggle}
								isOpen={openSection === 'softwareDevice'}
							/>
							<WebBased
								attributes={attributes}
								setAttributes={setAttributes}
								onToggle={handleToggle}
								isOpen={openSection === 'webBased'}
							/>
							<Divider />
							<Action
								attributes={attributes}
								setAttributes={setAttributes}
							/>
							<Match
								attributes={attributes}
								setAttributes={setAttributes}
							/>
						</PanelBody>
					</InspectorControls>
				)}
			</Fragment>
		);
	};
}, 'addBlockConditionalSettingsControl');

/**
 * Adds filters to modify block editor settings and register block type.
 */
addFilter(
	'editor.BlockEdit',
	'intelli-builder/with-conditional-settings-control',
	addBlockConditionalSettingsControl
);

addFilter(
	'blocks.registerBlockType',
	'intelli-builder/add-conditional-settings-attribute',
	addBlockConditionalSettingsAttribute
);
