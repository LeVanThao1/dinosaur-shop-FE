import React, { Fragment, memo } from "react";
import { useHistory } from "react-router-dom";

function PrivateRouter(props) {
	const history = useHistory();
	if (!props.isAuthenticated) history.push("/login");
	return (
		<Fragment>
			<div>{props.children}</div>
		</Fragment>
	);
}

export default memo(PrivateRouter);
