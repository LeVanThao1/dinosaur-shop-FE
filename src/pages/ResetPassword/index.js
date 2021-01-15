import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import { notifiError, notifiSuccess } from "../../utils/notification";
import { isLength, isMatch } from "../../utils/validation";
import axios from "axios";
import { Button, Input } from "antd";
import "./style.scss";
Reset.propTypes = {};

function Reset(props) {
	const { token } = useParams();
	const history = useHistory();
	const [data, setData] = useState({
		password: "",
		cf_password: "",
	});

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value, err: "", success: "" });
	};

	const handleResetPass = async () => {
		if (isLength(data.password))
			return notifiError("Password must be at least 6 characters.");

		if (!isMatch(data.password, data.cf_password))
			return notifiError("Password did not match.");
		try {
			const res = await axios.post(
				"http://localhost:3001/user/resetpw",
				{ password: data.password },
				{
					headers: { Authorization: token },
				}
			);
			notifiSuccess(res.data.msg);
			history.push("/login");
		} catch (err) {
			notifiError(err.response.data.msg);
		}
	};

	return (
		<div className="fg_pass">
			<h2>Reset Your Password</h2>

			<div className="row-password">
				<div className="password">
					<label htmlFor="password">Password</label>
					<Input
						type="password"
						name="password"
						id="password"
						value={data.password}
						onChange={handleChangeInput}
					/>
				</div>
				<div className="cf-password">
					<label htmlFor="cf_password">Confirm Password</label>
					<Input
						type="password"
						name="cf_password"
						id="cf_password"
						value={data.cf_password}
						onChange={handleChangeInput}
					/>
				</div>
				<div className="button-pw">
					<Button onClick={handleResetPass}>Reset Password</Button>
				</div>
			</div>
		</div>
	);
}

export default Reset;
