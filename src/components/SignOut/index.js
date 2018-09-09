import React from "react";

import { auth } from "../../firebase";

const SignOutButton = () => (
	<a href="" onClick={auth.doSignOut}>
		Sign Out
	</a>
);

export default SignOutButton;
