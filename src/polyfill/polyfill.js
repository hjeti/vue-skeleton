// will be changed during build-time by babel-preset-env from webpack config
import '@babel/polyfill';
// not included by the above, review here: https://github.com/zloirock/core-js#stage-4-proposals
// eslint-disable-next-line import/no-extraneous-dependencies
import 'core-js/stage/4';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'core-js/stage/3';

export default {};
