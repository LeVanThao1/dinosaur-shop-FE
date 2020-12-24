import axios from "axios";
const URI = "http://localhost:3001";
export default function API(endpoint, method, body, token) {
	return axios({
		method: method,
		url: `${URI}/${endpoint}`,
		data: body,
		headers: { Authorization: token },
	});
}
