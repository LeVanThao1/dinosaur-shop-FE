import React, { Fragment, memo } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";

function PrivateRouter(props) {
	const history = useHistory();
	const location = useLocation()
	document.title = props.title;
	if (!props.isAuthenticated) 
		// history.push("/login");
		return <Redirect to={{pathname: "/login", state: {from : location}}} />
	return (
		<>
		{props.isAuthenticated && <Fragment>
			<div>{props.children}</div>
		</Fragment>}
		</>
	);
}

export default memo(PrivateRouter);
