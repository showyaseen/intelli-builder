import { userRulesCheck } from "./userRulesCheck";

export const checkVisibility = (settings) => {
	if(userRulesCheck(settings)) {
		return true;
	}
};
