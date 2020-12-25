import axios from "axios";
const URI = "http://localhost:3001/api";

const productApi = {
	getProducts: async () => {
		const url = "/products";
		const res = await axios.get(URI + url);
		return res.data;
	},

	getProductDetail: async (productId) => {
		const url = "/products/" + productId;
		const res = await axios.get(URI + url);
		console.log(res);
		return res.data;
	},
	getComment: async (productId) => {
		try {
			const url = `/product/${productId}/comment`;
			const res = await axios.get(URI + url);
			console.log(res);
			return res.data;
		} catch (e) {
			console.log(e.message);
		}
	},
	// loginFB: async (accessToken, userID) => {
	// 	const url = "/facebook_login";
	// 	const res = await axios.post(URI + url, { accessToken, userID });
	// 	return res;
	// },
	// register: async (name, email, password) => {
	// 	const res = await axios.post(URI + "/register", {
	// 		name,
	// 		email,
	// 		password,
	// 	});
	// 	return res;
	// },
	// getUser: async (token) => {
	// 	console.log(token);
	// 	const url = "/infor";
	// 	const res = await axios.get(URI + url, {
	// 		headers: { Authorization: token },
	// 	});
	// 	return res;
	// },
	// logout: async () => {
	// 	const url = "/logout";
	// 	const res = await axios.get(URI + url);
	// 	return res;
	// },
	// getToken: async () => {
	// 	try {
	// 		const url = "/refresh_token";
	// 		const res = await axios.post(URI + url, null);
	// 		return res.data.access_token;
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// },
	// activeEmail: async (activation_token) => {
	// 	const url = "/activation";
	// 	const res = await axios.post(URI + url, { activation_token });
	// 	return res;
	// },
};

export default productApi;
