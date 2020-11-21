import React, { Fragment, memo } from "react";
import { Redirect } from "react-router-dom";

function PrivateRouter(props) {
  if (!props.isAuthenticated) return <Redirect to="/login" />;
  return (
    <Fragment>
      <div>{props.children}</div>
    </Fragment>
  );
}

export default memo(PrivateRouter);
