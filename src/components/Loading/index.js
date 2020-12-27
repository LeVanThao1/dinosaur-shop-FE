import React, { memo } from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

Loading.propTypes = {};

const antIcon = (
	<LoadingOutlined style={{ fontSize: 24, color: "#ff5f17" }} spin />
);

function Loading(props) {
	return (
		<div>
			<Spin indicator={antIcon} />
		</div>
	);
}

export default memo(Loading);
