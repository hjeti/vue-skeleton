// eslint-disable-next-line
export const createPath = (path, params = {}, state = {}) => {
	// merge params and state
	const mergedParams = { ...state, ...params };

	return path
	// first replace all params
		.replace(/:(\w+)/g, (match, param) => {
			if (typeof mergedParams[param] !== 'undefined') {
				return mergedParams[param] || '';
			}
			return match;
		})
		// remove the other (unresolved) optional parts
		.replace(/\/:(\w+\?+)/g, () => '')

		// remove question marks of (resolved) optional parameters
		.replace(/\?/g, () => '')

		// do we still have params left?
		.replace(/:(\w+)/g, (match, param) => {
			throw new Error(`Param "${param}" is missing in params`, mergedParams);
		});
};
