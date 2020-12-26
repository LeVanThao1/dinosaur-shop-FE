import axios from "axios";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
// import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import { dispatchLogin } from "../../redux/action/authAction";
import {
	notifiError,
	notifiSuccess,
	showErrMsg,
	showSuccessMsg,
} from "../../utils/notification";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../slice/auth.slice";
import userApi from "../../api/userApi";

Login.propTypes = {};

const initialState = {
	email: "",
	password: "",
	error: "",
	success: "",
};

function Login(props) {
	const history = useHistory();

	const auth = useSelector((state) => state.auth);

	if (auth.isLogged) {
		history.push("/");
	}

	const [user, setUser] = useState(initialState);

	const { email, password, err, success } = user;

	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const res = await userApi.login(email, password);

			notifiSuccess("Notify", res);
			localStorage.setItem("firstLogin", true);
			const action = setLogin();
			dispatch(action);
			history.push("/");
		} catch (err) {
			err.response.data.msg &&
				notifiError("Error", err.response.data.msg);
		}
	};

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value, err: "", success: "" });
	};

	const responseGoogle = async (response) => {
		try {
			//   const res = await axios.post("/user/google_login", {
			//     tokenId: response.tokenId,
			//   });
			const res = await userApi.loginGG(response.tokenId);
			setUser({ ...user, error: "", success: res.data.msg });
			localStorage.setItem("firstLogin", true);
			dispatch(setLogin());
			// notifiSuccess("Notify", res);
			history.push("/");
		} catch (err) {
			err.response.data.msg &&
				notifiError("Error", err.response.data.msg);
		}
	};

	const responseFacebook = async (response) => {
		try {
			const { accessToken, userID } = response;
			if (!accessToken || !userID) {
				setUser({ ...user, error: "Login fail with facebook" });
			} else {
				const res = await userApi.loginFB(accessToken, userID);
				setUser({ ...user, error: "", success: res.data.msg });
				localStorage.setItem("firstLogin", true);
				notifiSuccess("Notify", res);
				dispatch(setLogin());
				history.push("/");
			}
		} catch (err) {
			err.response.data.msg &&
				notifiError("Error", err.response.data.msg);
		}
	};

	return (
		<div className="login_page">
			<h2>Login</h2>
			{err && showErrMsg(err)}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email Address</label>
					<input
						type="text"
						placeholder="Enter email address"
						id="email"
						value={email}
						name="email"
						onChange={handleChangeInput}
					/>
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						placeholder="Enter password"
						id="password"
						value={password}
						name="password"
						onChange={handleChangeInput}
					/>
				</div>

				<div className="row">
					<button type="submit">Login</button>
					<Link to="/forgot_password">Forgot your password?</Link>
				</div>
			</form>

			<div className="hr">Or Login With</div>

			<div className="social">
				<GoogleLogin
					clientId="495868402334-hv0mqs9mh0u9ip19krurch7thn6a5n15.apps.googleusercontent.com"
					buttonText="Login with google"
					onSuccess={responseGoogle}
					cookiePolicy={"single_host_origin"}
				/>

				<FacebookLogin
					appId="197972598576220"
					autoLoad={false}
					fields="name,email,picture"
					callback={responseFacebook}
				/>
			</div>

			<p>
				New Customer? <Link to="/register">Register</Link>
			</p>
		</div>
	);
}

export default Login;
