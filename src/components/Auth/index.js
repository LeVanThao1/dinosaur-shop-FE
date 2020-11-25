import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

Auth.propTypes = {};

function Auth(props) {
	const history = useHistory();
	const auth = useSelector((state) => state.auth);

	if (auth.isLogged) {
		history.push("/");
	}
	return <>{props.children}</>;
}

export default Auth;
