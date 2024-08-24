/**
 * Browser Component for selecting browser names and languages for block visibility settings.
 *
 * @package YTAHA\IntelliBuilder
 */

import { useState } from '@wordpress/element';
import { FormTokenField } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Predefined list of browser names.
 */
const browserNames = [
	'Chrome', 'Firefox', 'Safari', 'Edge', 'Opera',
	'Internet Explorer', 'Brave', 'Vivaldi', 'Tor Browser'
];

/**
 * Predefined list of browser languages with language codes.
 */
const browserLanguages = [
	{ 'ar': 'Arabic' }, { 'ar-AE': 'Arabic (United Arab Emirates)' }, { 'ar-EG': 'Arabic (Egypt)' },
	{ 'ar-KW': 'Arabic (Kuwait)' }, { 'ar-SA': 'Arabic (Saudi Arabia)' }, { 'en-US': 'English (United States)' },
	{ 'en-GB': 'English (United Kingdom)' }, { 'en-CA': 'English (Canada)' }, { 'en-AU': 'English (Australia)' },
	{ 'fr-FR': 'French (France)' }, { 'fr-CA': 'French (Canada)' }, { 'fr-BE': 'French (Belgium)' },
	{ 'fr-CH': 'French (Switzerland)' }, { 'de-DE': 'German (Germany)' }, { 'de-AT': 'German (Austria)' },
	{ 'de-CH': 'German (Switzerland)' }, { 'de-LU': 'German (Luxembourg)' }, { 'es-ES': 'Spanish (Spain)' },
	{ 'es-MX': 'Spanish (Mexico)' }, { 'es-AR': 'Spanish (Argentina)' }, { 'es-CO': 'Spanish (Colombia)' },
	{ 'zh-CN': 'Chinese (China)' }, { 'zh-TW': 'Chinese (Taiwan)' }, { 'zh-HK': 'Chinese (Hong Kong)' },
	{ 'zh-SG': 'Chinese (Singapore)' }, { 'pt-PT': 'Portuguese (Portugal)' }, { 'pt-BR': 'Portuguese (Brazil)' },
	{ 'ru-RU': 'Russian (Russia)' }, { 'ja-JP': 'Japanese (Japan)' }, { 'ko-KR': 'Korean (South Korea)' },
	{ 'it-IT': 'Italian (Italy)' }, { 'it-CH': 'Italian (Switzerland)' }, { 'nl-NL': 'Dutch (Netherlands)' },
	{ 'nl-BE': 'Dutch (Belgium)' }, { 'sv-SE': 'Swedish (Sweden)' }, { 'no-NO': 'Norwegian (Norway)' },
	{ 'da-DK': 'Danish (Denmark)' }, { 'fi-FI': 'Finnish (Finland)' }, { 'tr-TR': 'Turkish (Turkey)' },
	{ 'pl-PL': 'Polish (Poland)' }, { 'hi-IN': 'Hindi (India)' }, { 'bn-BD': 'Bengali (Bangladesh)' },
	{ 'pa-IN': 'Punjabi (India)' }, { 'ur-PK': 'Urdu (Pakistan)' },
];

/**
 * Browser component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {JSX.Element} Browser component.
 */
const Browser = ({ attributes, setAttributes }) => {
	const [browserNamesSelected, setBrowserNamesSelected] = useState(attributes?.intelliBuidlerSettings?.browser_name || []);
	const [browserLanguagesSelected, setBrowserLanguagesSelected] = useState(attributes?.intelliBuidlerSettings?.browser_language.map(lang => Object.values(lang)[0]) || []);

	/**
	 * Handles change in selected browser names.
	 *
	 * @param {Array} value Selected browser names.
	 */
	const handleBrowserNamesChange = (value) => {
		setBrowserNamesSelected(value);
		setAttributes({
			intelliBuidlerSettings: {
				...attributes.intelliBuidlerSettings,
				browser_name: value
			}
		});
	};

	/**
	 * Handles change in selected browser languages.
	 *
	 * @param {Array} value Selected browser languages.
	 */
	const handleBrowserLanguagesChange = (languages) => {
		const selectedLanguages = languages
			.map(lang => browserLanguages.find(browserLanguage => Object.values(browserLanguage)[0] === lang))
			.filter(Boolean);

		setBrowserLanguagesSelected(languages);

		setAttributes({
			intelliBuidlerSettings: {
				...attributes.intelliBuidlerSettings,
				browser_language: selectedLanguages,
			},
		});
	};

	return (
		<>
			<FormTokenField
				label={ __('Browser Names', 'intelli-builder') }
				value={browserNamesSelected}
				suggestions={browserNames}
				onChange={handleBrowserNamesChange}
				__experimentalExpandOnFocus
				__experimentalAutoSelectFirstMatch
			/>

			<FormTokenField
				label={ __('Browser Languages', 'intelli-builder') }
				value={browserLanguagesSelected}
				suggestions={browserLanguages.map(lang => Object.values(lang)[0])}
				onChange={handleBrowserLanguagesChange}
				__experimentalAutoSelectFirstMatch
			/>
		</>
	);
};

export default Browser;
