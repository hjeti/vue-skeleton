/* global WP_DEFINE_DEVELOPMENT */
const values = {};

export const setValue = (key, value) => {
	values[key] = value;
};

export const getValue = (key) => {
	if (WP_DEFINE_DEVELOPMENT) {
		if (!(key in values)) {
			throw new ReferenceError(`[Injector] Injectable "${key}" has never been configured`);
		}
	}

	return values[key];
};
