import axios from "axios";
const URI = "http://localhost:3001/user";

const userApi = {
	login: async (username, password) => {
		try {
			const url = "/login";
			const res = await axios.post(
				URI + url,
				{
					email: username,
					password,
				},
				{ withCredentials: true }
			);
			if (res) return res;
		} catch (e) {
			console.log(e);
		}
	},
	loginFB: async (tokenId) => {
		const url = "/google_login";
		const res = await axios.post(URI + url, { tokenId });
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
		const res = await axios.post(URI + url, {});
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
};

export default userApi;
