import React from "react";
import "./style.css";

import { notification } from "antd";

export const showErrMsg = (msg) => {
	return <div className="errMsg">{msg}</div>;
};

export const showSuccessMsg = (msg) => {
	return <div className="successMsg">{msg}</div>;
};

export const notifiError = (title, content) => {
	notification.config({
		duration: 3,
	});
	notification["error"]({
		message: title,
		description: content,
	});
};
export const notifiSuccess = (title, content) => {
	notification.config({
		duration: 3,
	});
	notification["success"]({
		message: title,
		description: content,
	});
};
