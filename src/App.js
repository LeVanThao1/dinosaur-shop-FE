import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import io from "socket.io-client";
import "./App.scss";
import API from "./axios";
import {
	Footer,
	Header,
	Loading,
	PrivateRouter,
	Promotion,
	PublicRouter,
} from "./components";
import routes from "./configs/routes";
import NotFound from "./pages/NotFound";
import { setLogin, setUserInfo } from "./slice/auth.slice";
import { setCart } from "./slice/cart.slice";
import { setLikeList } from "./slice/likelist.slice";
import { setSeenList } from "./slice/seenlist.slice";
import { setToken } from "./slice/token.slice";
import { notifiError } from "./utils/notification";
import InfiniteCarousel from "react-leaf-carousel";
import ReactGa from "react-ga";
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
	const loading = useSelector((state) => state.loading);

	useEffect(() => {
		ReactGa.initialize("G-5FV85HQS7Z");
		ReactGa.pageview(window.location.pathname);
	}, []);

	useEffect(() => {
		const seenList = JSON.parse(localStorage.getItem("seenList"));
		const likeList = JSON.parse(localStorage.getItem("likeList"));
		dispatch(setSeenList(seenList ? seenList : []));
		dispatch(setLikeList(likeList ? likeList : []));
	}, []);

	useEffect(() => {
		const socketio = io("http://localhost:3001");
		setSocket(socketio);
		return () => socketio.disconnect();
	}, []);

	useEffect(() => {
		const firstLogin = localStorage.getItem("firstLogin");

		if (firstLogin) {
			dispatch(setLogin());
			API("user/refresh_token", "POST")
				.then((res) => {
					dispatch(setToken(res.data.access_token));
				})
				.catch((err) => notifiError("Error", err.response.data.msg));
		} else {
			const cart = JSON.parse(localStorage.getItem("cart"));
			dispatch(setCart({ cart: cart ? cart : [], type: false }));
		}
	}, [auth.isLogged, dispatch]);

	useEffect(() => {
		if (token) {
			API("user/infor", "GET", token)
				.then((res) => {
					dispatch(setUserInfo(res.data));
				})
				.catch((err) => notifiError("Error", err.response.data.msg));
		}
	}, [token, dispatch]);

	return (
		<Router>
			<div className="App">
				<Header />
				<Promotion />
				{loading && <Loading />}
				<div style={{ opacity: loading ? 0.2 : 1 }}>
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
												title={route.title}
											>
												<Suspense
													fallback={<Loading />}
												>
													<C socket={socket} />
												</Suspense>
											</PrivateRouter>
										) : (
											<PublicRouter
												isAuthenticated={auth.isLogged}
												title={route.title}
											>
												<Suspense
													fallback={<Loading />}
												>
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
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
