// eslint-disable-next-line
export const createPath = (path, params = {}, state = {}) => {
  // merge params and state
  const mergedParams = { ...state, ...params };

  return path
    .replace(/:(\w+)/g, (match, param) => {
      if (typeof mergedParams[param] !== 'undefined') {
        return mergedParams[param] || '';
      }
      return match;
    })
    .replace(/\/:(\w+\?+)/g, () => '')
    .replace(/\?/g, () => '')
    .replace(/:(\w+)/g, (match, param) => {
      throw new Error(`Param "${param}" is missing in params`, mergedParams);
    });
};
