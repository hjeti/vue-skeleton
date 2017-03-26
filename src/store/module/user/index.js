import user, { SET_FIRST_NAME, SET_LAST_NAME } from './user';

export const UserMutationTypes = {
	SET_FIRST_NAME: `user/${SET_FIRST_NAME}`,
	SET_LAST_NAME: `user/${SET_LAST_NAME}`,
};

export default user;
