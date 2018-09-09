import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import PasswordChangeForm from "../PasswordChange";
import withAuthorization from "../Session/withAuthorization";

const AccountPage = ({ authUser }) => (
	<div>
		<PasswordChangeForm email={authUser.email} />
	</div>
);

const mapStateToProps = state => ({
	authUser: state.sessionState.authUser
});

const authCondition = authUser => !!authUser;

export default compose(
	withAuthorization(authCondition),
	connect(mapStateToProps)
)(AccountPage);
