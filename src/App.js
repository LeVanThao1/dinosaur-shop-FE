import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./configs/routes";
import {
	Loading,
	Footer,
	PrivateRouter,
	PublicRouter,
	Header,
} from "./components";
import NotFound from "./pages/NotFound";
import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./slice/token.slice";
import { setLogin, setUserInfo } from "./slice/auth.slice";
// import { setSocket } from "./slice/socket.slice";
import userApi from "./api/userApi";
import axios from "axios";
// import ProductDetail from "./components/ProductDetail";
import SlideRelated from "./components/SlideRelated";
// import ProductDetail from "./pages/ProductDetail";
// import Payment from "./components/Payment";
import io from "socket.io-client";

const Components = {};

for (const c of routes) {
	Components[c.component] = React.lazy(() =>
		import("./pages/" + c.component)
	);
}

function App() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const token = useSelector((state) => state.token);
	const [socket, setSocket] = useState(null);
	// const socket = useSelector((state) => state.socket);
	// const socket = io("http://localhost:3001", {
	// 	transports: ["websocket"],
	// 	upgrade: false,
	// });
	// socket.on("connection", () => {
	// 	dispatch(setSocket(socket));
	// 	console.log(`I'm connected with the back-end`);
	// });
	useEffect(() => {
		const socketio = io("http://localhost:3001");
		// const action = setSocket(socket);
		// dispatch(action);
		// console.log(socket);
		setSocket(socketio);
		// dispatch(setSocket(socket));
		return () => socketio.disconnect();
	}, []);

	useEffect(() => {
		const firstLogin = localStorage.getItem("firstLogin");

		if (firstLogin) {
			const getToken = async () => {
				const res = await axios.post(
					"http://localhost:3001/user/refresh_token",
					null
				);

				const action = setToken(res.data.access_token);

				dispatch(action);
			};
			getToken();
		}
	}, [auth.isLogged, dispatch]);

	useEffect(() => {
		if (token) {
			const getUser = () => {
				dispatch(setLogin());
				return userApi.getUser(token).then((res) => {
					const action = setUserInfo(res.data);
					dispatch(action);
				});
			};
			getUser();
		}
	}, [token, dispatch]);

	return (
		<Router>
			<div className="App">
				<Header />
				<Switch>
					{routes.map((route) => {
						const C = Components[route.component];
						return (
							<Route
								key={route.path}
								path={route.path}
								exact={true}
								render={() =>
									route.isProtected ? (
										<PrivateRouter
											isAuthenticated={auth.isLogged}
										>
											<Suspense fallback={<Loading />}>
												<C socket={socket} />
											</Suspense>
										</PrivateRouter>
									) : (
										<PublicRouter
											isAuthenticated={auth.isLogged}
										>
											<Suspense fallback={<Loading />}>
												<C socket={socket} />
											</Suspense>
										</PublicRouter>
									)
								}
							/>
						);
					})}
					<Route
						path="*"
						render={() => (
							<Suspense fallback={<Loading />}>
								<NotFound />
							</Suspense>
						)}
					></Route>
				</Switch>
				{/* <ProductDetail /> */}
				{/* <SlideRelated /> */}
				{/* <Payment /> */}
				<Footer />
			</div>
		</Router>
	);
}

export default App;
