import HomePage from '../page/HomePage';

export const RouteNames = {
  HOME: 'home',
};

export default [
  {
    path: '/',
    component: HomePage,
    name: RouteNames.HOME,
  },
];
