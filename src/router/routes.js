import HomePage from 'page/HomePage';
import Pages from 'data/enum/Pages';
import PageNames from 'data/enum/PageNames';

// Code splitting example
// const HomePage = resolve =>
// 	require.ensure([], (require) => {
// 		resolve(require('page/HomePage').default);
// 	}, 'HomePage');

export default [
	{
		path: Pages.HOME,
		component: HomePage,
		name: PageNames.HOME,
	},
];

