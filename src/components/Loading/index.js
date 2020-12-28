import React, { memo } from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

Loading.propTypes = {};

const antIcon = (
	<LoadingOutlined
		style={{ fontSize: 30, color: "#ff5f17", fontWeight: "bold" }}
		spin
	/>
);

function Loading(props) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				width: "100%",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
				position: "absolute",
				top: 0,
			}}
		>
			<Spin indicator={antIcon} size="large" />
		</div>
	);
}

export default memo(Loading);
