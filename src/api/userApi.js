import axios from "axios";
const URI = "http://localhost:3001/user";

const userApi = {
	login: async (email, password) => {
		try {
			const url = "/login";
			const res = await axios.post(
				URI + url,
				{
					email,
					password,
				},
				{ withCredentials: true }
			);
			if (res) return res;
		} catch (e) {
			console.log(e);
		}
	},
	loginGG: async (tokenId) => {
		const url = "/google_login";
		const res = await axios.post(URI + url, { tokenId });
		return res;
	},
	loginFB: async (accessToken, userID) => {
		const url = "/facebook_login";
		const res = await axios.post(URI + url, { accessToken, userID });
		return res;
	},
	register: async (name, email, password) => {
		const res = await axios.post(URI + "/register", {
			name,
			email,
			password,
		});
		return res;
	},
	getUser: async (token) => {
		console.log(token);
		const url = "/infor";
		const res = await axios.get(URI + url, {
			headers: { Authorization: token },
		});
		return res;
	},
	logout: async () => {
		const url = "/logout";
		const res = await axios.get(URI + url);
		return res;
	},
	getToken: async () => {
		try {
			const url = "/refresh_token";
			const res = await axios.post(URI + url, null);
			return res.data.access_token;
		} catch (e) {
			console.log(e);
		}
	},
	activeEmail: async (activation_token) => {
		const url = "/activation";
		const res = await axios.get(URI + url, { activation_token });
		return res;
	},
};

export default userApi;
