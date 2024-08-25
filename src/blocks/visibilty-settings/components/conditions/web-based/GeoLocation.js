/**
 * GeoLocation Component for selecting user roles.
 *
 * @package YTAHA\IntelliBuilder
 */

import { useState, useEffect } from '@wordpress/element';
import { FormTokenField } from '@wordpress/components';
import { escapeHTML } from '@wordpress/escape-html';
import cache from '../../../utils/cache';
import { __ } from '@wordpress/i18n';

const COUNTRIES_CACHE_KEY = 'geolocation_countries_cities';

const fetchCountriesCitiesAPI = async () => {
	try {
		// Attempt to retrieve data from cache
		const cachedCountriesCities = cache.getCache(COUNTRIES_CACHE_KEY);
		if (cachedCountriesCities?.countries && cachedCountriesCities?.cities) {
			return cachedCountriesCities;
		}

		// Fetch data from API
		const response = await fetch('https://countriesnow.space/api/v0.1/countries');
		if (!response.ok) {
			throw new Error('Failed to fetch countries and cities');
		}

		const { error, data } = await response.json();
		if (error || !Array.isArray(data)) {
			throw new Error('Invalid API response');
		}

		// Sanitize and map countries and cities data
		const countries = data.map(({ country, cities }) => ({
			country: escapeHTML(country),
			cities: cities.map(city => escapeHTML(city)),
		}));

		const cities = countries.flatMap(({ country, cities }) =>
			cities.map(city => `${city}-${country}`)
		);

		const countriesCities = { countries, cities };

		// Cache the sanitized data
		cache.setCache(COUNTRIES_CACHE_KEY, countriesCities);

		return countriesCities;
	} catch (error) {
		// Log error and return empty data structure
		console.error('Error fetching countries and cities:', error);
		return { countries: [], cities: [] };
	}
};

/**
 * GeoLocation component.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {JSX.Element} GeoLocation component.
 */
const GeoLocation = ({ attributes, setAttributes }) => {
	const [country, setCountry] = useState([]);
	const [city, setCity] = useState(attributes.intelliBuidlerSettings.geoLocation_city || []);
	const [countriesOptions, setCountriesOptions] = useState([]);
	const [citiesOptions, setCitiesOptions] = useState([]);

	useEffect(() => {
		const loadCountriesCities = async () => {
			const countriesCities = await fetchCountriesCitiesAPI();
			setCountriesOptions(countriesCities.countries.map(country => ({
				label: country.country,
				value: country.country
			})));
			setCitiesOptions(countriesCities.cities);
		};
		loadCountriesCities();
	}, []);

	const handleCountryChange = (selectedCountries) => {
		setCountry(selectedCountries);
		const selectedCountryValues = selectedCountries.map(country => country.value);

		setAttributes({
			intelliBuidlerSettings: {
				...attributes.intelliBuidlerSettings,
				geoLocation_country: selectedCountryValues
			}
		});
	};

	const handleCityChange = (selectedCities) => {
		setCity(selectedCities);
		setAttributes({
			intelliBuidlerSettings: {
				...attributes.intelliBuidlerSettings,
				geoLocation_city: selectedCities
			}
		});
	};

	return (
		<>
			<FormTokenField
				label={ __('Countries', 'intelli-builder') }
				value={country.map(c => c.value)}
				suggestions={countriesOptions.map(country => country.label)}
				onChange={(values) => {
					const selectedCountries = values.map(value => countriesOptions.find(country => country.value === value));
					handleCountryChange(selectedCountries);
				}}
				tokenizeOnSpace
				__experimentalAutoSelectFirstMatch
			/>

			<FormTokenField
				label={ __('Cities', 'intelli-builder') }
				value={city}
				suggestions={citiesOptions}
				onChange={(selectedCities) => {
					handleCityChange(selectedCities);
				}}
				tokenizeOnSpace
				__experimentalAutoSelectFirstMatch
			/>
		</>
	);
};

export default GeoLocation;
