export const errorFormatter = error => {
  if (error && error.response.data.error) {
    const response = { config: error.config, ...error.response, ...error.response.data };
    // delete data to avoid confusion
    delete response.data;
    return response;
  }
  return error;
};

export const responseFormatter = response => {
  if (response.data.data) {
    return { ...response, ...response.data };
  }
  return response;
};
