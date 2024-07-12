import { useState, useEffect } from '@wordpress/element';
import { PanelRow, FormTokenField } from '@wordpress/components';
import cache from '../../../utils/cache';

const COUNTRIES_CACHE_KEY = 'geolocation_countries_cities';

const fetchCountriesCitiesAPI = async () => {
	const cachedCountriesCities = cache.getCache(COUNTRIES_CACHE_KEY);
	if (cachedCountriesCities?.countries && cachedCountriesCities?.cities) {
		return cachedCountriesCities;
	}

	const response = await fetch('https://countriesnow.space/api/v0.1/countries');
	const data = await response.json();
	if (!data.error && data.data.length > 0) {
		const countries = data.data;
		const cities = countries.flatMap(country => country.cities.map(city => `${city}-${country.country}`));
		const countriesCities = { countries: countries, cities: cities }
		cache.setCache(COUNTRIES_CACHE_KEY, countriesCities);
		return countriesCities;
	}

	return [];
};

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
				label="Countries"
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
				label="Cities"
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
