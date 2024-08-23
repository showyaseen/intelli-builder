/**
 * Package: YTAHA\IntelliBuilder
 *
 * Generates a human-readable description of visibility conditions based on provided settings.
 *
 * @param {Object} settings - The settings object containing visibility conditions.
 * @returns {[number, string]} A tuple containing the number of conditions and the description string.
 */
export const generateConditionDescription = (settings) => {
    const {
        enableConditionalContent,  // Flag to enable or disable conditional content
        action,                    // Action to take ('show' or 'hide')
        userRoles,                 // Array of user roles to apply conditions to
        scheduleType,              // Type of schedule ('before', 'after', 'between')
        startDate,                 // Start date for schedule
        endDate,                   // End date for schedule
        startTime,                 // Start time for schedule
        endTime,                   // End time for schedule
        userStatus,                // User status ('loggedin', 'loggedout', 'specific')
        specificUsers,             // Specific users to apply conditions to
        geoLocation_country,       // Array of countries for geolocation condition
        geoLocation_city,          // Array of cities for geolocation condition
        userDeviceType,            // Array of user device types
        browser_name,              // Array of browser names
        browser_language,          // Array of browser languages
        operatingSystem,           // Array of operating systems
        sourceReferer,             // Source referer
        returningUser              // Flag to check if the user is a returning user
    } = settings;

    const visibilityAction = action === 'show' ? 'shown' : 'hidden';
    const oppositeAction = action === 'show' ? 'hidden' : 'shown';

    if (!enableConditionalContent) {
        return [-1, 'The visibility rules are disabled.'];
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

    // Geolocation conditions
    if (geoLocation_country.length || geoLocation_city.length) {
        const countries = geoLocation_country.join(', ');
        const cities = geoLocation_city.map(city => city ? `${city.split('-')[0]}(${city.split('-')[1]})` : '').join(', ');
        if (countries) {
            conditions.push(`from <b>${countries}</b> ` + (geoLocation_country.length > 1 ? 'countries' : 'country'));
        }
        if (cities) {
            conditions.push(`from <b>${cities}</b> ` + (geoLocation_city.length > 1 ? 'cities' : 'city'));
        }
    }

    // Device Type condition
    if (userDeviceType.length) {
        conditions.push(`using <b>${userDeviceType.join(', ')}</b> devices`);
    }

    // Browser conditions
    if (browser_name.length) {
        conditions.push(`using <b>${browser_name.join(', ')}</b> browsers`);
    }

    if (browser_language.length) {
        const languages = browser_language.map(lang => Object.values(lang)[0]).join(', ');
        conditions.push(`with browser languages <b>${languages}</b>`);
    }

    // Operating System condition
    if (operatingSystem.length) {
        conditions.push(`using <b>${operatingSystem.join(', ')}</b> operating systems`);
    }

    // Source Referer condition
    if (sourceReferer) {
        conditions.push(`from source referer <b>${sourceReferer}</b>`);
    }

    // Returning User condition
    if (returningUser) {
        conditions.push(`who are <b>${returningUser}</b> users`);
    }

    // Schedule conditions
    if (scheduleType) {
        const toHumanReadable = (date) => new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        const startDateHuman = toHumanReadable(startDate);
        const endDateHuman = toHumanReadable(endDate);
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

    return [
        conditions.length,
        conditions.length > 0
            ? `The block will be <b>${visibilityAction}</b> for ${conditions.join(', ')}. It will be <b>${oppositeAction}</b> otherwise.`
            : 'No visibility rules applied.'
    ];
};
