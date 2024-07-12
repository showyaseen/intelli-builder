
export const userRulesCheck = (settings) => {
	const { userStatus, userRoles, specificUsers } = settings;
	const currentUser = wp.data.select('core').getCurrentUser();

	if (userStatus === 'loggedin') {
		if (!currentUser) return false;

		if (specificUsers.length > 0 && !specificUsers.includes(currentUser.id)) {
			return false;
		}

		if (userRoles.length > 0 && !userRoles.includes(currentUser.roles[0])) {
			return false;
		}
	} else if (userStatus === 'loggedout') {
		if (currentUser) return false;
	}

	return true;
}
