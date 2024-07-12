
export const generateConditionDescription = (settings) => {
	const {
		enableConditionalContent,
		action,
		userRoles,
		scheduleType,
		startDate,
		endDate,
		startTime,
		endTime,
		userStatus,
		specificUsers,
		geoLocation_country,
		geoLocation_city,
		userDeviceType,
		browser_name,
		browser_language,
		operatingSystem,
		sourceReferer,
		returningUser
	} = settings;

	console.log('settings', settings);

	const visibilityAction = action === 'show' ? 'shown' : 'hidden';
	const oppisteAction = action === 'show' ? 'hidden' : 'shown';

	if (!enableConditionalContent) {
		return [-1, 'the visibility rules is disabled.'];
	}

	const conditions = [];

	// User Status and Roles/Specific Users
	if (userStatus === 'loggedin') {
		conditions.push('<b>logged-in</b> users');
		if (userRoles.length) {
			conditions.push(`with roles <b>${userRoles.join(', ')}</b>`);
		}
	} else if (userStatus === 'loggedout') {
		conditions.push('<b>logged-out</b> users');
	} else if (userStatus === 'specific' && specificUsers.length) {
		conditions.push(`<b>${specificUsers.join(', ')}</b> users`);
	}

	// Geolocation
	console.log('geoLocation_country', geoLocation_country);
	if (geoLocation_country.length || geoLocation_city.length) {
		const countries = geoLocation_country.join(', ');
		const cities = geoLocation_city.map(city => !city ? '' : `${city.split('-')[0]}(${city.split('-')[1]})`).join(', ');
		console.log('countries', countries);
		if (countries) {
			conditions.push(`from <b>${countries}</b> ` + ((geoLocation_country.length > 1) ? 'countries' : 'country'));
		}
		console.log('cities', cities);
		if (cities) {
			conditions.push(`from <b>${cities}</b> ` + ((geoLocation_city.length > 1) ? 'cities' : 'city'));
		}
	}

	// Device Type
	if (userDeviceType.length) {
		conditions.push(`using <b>${userDeviceType.join(', ')}</b> devices`);
	}

	console.log('browser_name', browser_name, 'browser_language', browser_language);
	// Browser
	if (browser_name.length) {
		conditions.push(`using <b>${browser_name.join(', ')}</b> browsers`);
	}
	if (browser_language.length) {
		const languages = browser_language.join(', ');
		conditions.push(`with browser languages <b>${languages}</b>`);
	}

	// Operating System
	if (operatingSystem.length) {
		conditions.push(`using <b>${operatingSystem.join(', ')}</b> operating systems`);
	}

	// Source Referer
	if (sourceReferer) {
		conditions.push(`from source referer <b>${sourceReferer}</b>`);
	}

	// User Type
	if (returningUser) {
		conditions.push(`who are <b>${returningUser}</b> users`);
	}

	// Schedule
	if (scheduleType) {
		const toHumanRedable = (date) => new Date(date)
			.toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				// second: '2-digit',
				hour12: true
			});
		const startDateHuman = toHumanRedable(startDate);
		const endDateHuman = toHumanRedable(endDate);
		if (scheduleType === 'before') {
			conditions.push(`before <b>${startDateHuman}</b>`);
		} else if (scheduleType === 'after') {
			conditions.push(`after <b>${startDateHuman}</b>`);
		} else if (scheduleType === 'between') {
			conditions.push(`from <b>${startDateHuman}</b> to <b>${endDateHuman}</b>`);
		}
		if (startTime) {
			conditions.push(`starting at <b>${startTime}</b>`);
		}
		if (endTime) {
			conditions.push(`ending at <b>${endTime}</b>`);
		}
	}

	return [conditions.length, conditions.length > 0 ? `The block will be <b>${visibilityAction}</b> for ${conditions.join(', ')}. It will be <b>${oppisteAction}</b> for others.` : 'No visibility rules applied.'];
};
