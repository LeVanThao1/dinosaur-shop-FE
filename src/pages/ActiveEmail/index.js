import React, { useState, useEffect } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { notifiError, notifiSuccess } from "../../utils/notification";
import userApi from "../../api/userApi";

function ActivationEmail() {
	const { activation_token } = useParams();
	const history = useHistory();
	useEffect(() => {
		if (activation_token) {
			const activationEmail = async () => {
				try {
					const res = await userApi.activeEmail(activation_token);
					notifiSuccess("Notify", res);

					setTimeout(() => {
						history.push("/login");
					}, 2000);
				} catch (err) {
					err.response.data.msg &&
						notifiError("Error", err.response.data.msg);
				}
			};
			activationEmail();
		}
	}, [activation_token]);

	return <div className="active_page"></div>;
}

export default ActivationEmail;
