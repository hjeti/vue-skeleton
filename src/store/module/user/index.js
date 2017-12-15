import user, { SET_FIRST_NAME, SET_LAST_NAME } from './user';

export const UserNamespace = 'user';

export const UserMutationTypes = {
  SET_FIRST_NAME: `${UserNamespace}/${SET_FIRST_NAME}`,
  SET_LAST_NAME: `${UserNamespace}/${SET_LAST_NAME}`,
};

export default user;
