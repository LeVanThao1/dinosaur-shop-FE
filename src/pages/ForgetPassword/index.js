import React, { useState } from "react";
import "./style.scss";
import { isEmail } from "../../utils/validation";
import axios from "axios";
import { notifiSuccess, notifiError } from "../../utils/notification";
import { Button, Input } from "antd";
Forget.propTypes = {};

function Forget(props) {
	const [email, setEmail] = useState("");

	const handleChangeInput = (e) => {
		setEmail(e.target.value);
	};

	const forgotPassword = async () => {
		if (!isEmail(email))
			// return setData({ ...data, err: "Invalid emails.", success: "" });
			return notifiError("Invalid email");
		try {
			const res = await axios.post(
				"http://localhost:3001/user/forgot_password",
				{
					email,
				}
			);
			notifiSuccess(res.data.msg);
		} catch (err) {
			notifiError(err.response.data.msg);
		}
	};
	return (
		<div className="fg_pass">
			<h2>Forgot Your Password?</h2>

			<div className="row-forget">
				<label htmlFor="email">Enter your email address</label>
				<Input
					type="email"
					name="email"
					id="email"
					value={email}
					onChange={handleChangeInput}
				/>
			</div>
			<div className="btn-forget">
				<Button onClick={forgotPassword}>Verify your email</Button>
			</div>
		</div>
	);
}

export default Forget;
