import { connect } from 'vuex-connect';
import { UserMutationTypes } from 'store/module/user';
import HomePage from './HomePage';

export default connect({
	stateToProps: {
		firstName: state => state.user.firstName,
		lastName: state => state.user.lastName,
	},
	mutationsToProps: {
		setFirstName: UserMutationTypes.SET_FIRST_NAME,
		setLastName: UserMutationTypes.SET_LAST_NAME,
	},
	lifecycle: {
	},
})(HomePage.name, HomePage);
