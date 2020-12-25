import React, { Fragment, Suspense, memo } from "react";
import { Redirect } from "react-router-dom";

function PublicRouter(props) {
	// if (props.isAuthenticated) return <Redirect to="/" />;
	// console.log(props);
	document.title = props.title;
	return (
		<Fragment>
			<div>{props.children}</div>
		</Fragment>
	);
}

export default memo(PublicRouter);
