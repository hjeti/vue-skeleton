export const errorFormatter = (error) => {
	if (error && error.response.data.error) {
		return { ...error.response.data };
	}
	return error;
};

export const responseFormatter = (response) => {
	if (response.data.data) {
		return response.data;
	}
	return response.data;
};
