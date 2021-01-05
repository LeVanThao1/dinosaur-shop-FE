import React, { Fragment, memo } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";

function PrivateRouter(props) {
	const history = useHistory();
	const location = useLocation();
	document.title = props.title;
	console.log(location);
	// if (!props.isAuthenticated) history.push("/login");
	return (
		<>
			{props.isAuthenticated ? (
				<Fragment>
					<div>{props.children}</div>
				</Fragment>
			) : (
				<Redirect
					to={{
						pathname: "/login",
						state: { from: location },
					}}
				/>
			)}
		</>
	);
}

export default memo(PrivateRouter);
