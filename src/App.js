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
import userApi from "./api/userApi";
import axios from "axios";
import ProductDetail from "./pages/ProductDetail";
import Payment from "./pages/Payment";
import Shipping from "./pages/Shipping";
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
			API("user/refresh_token", "POST", null)
				.then((res) => {
					console.log(res);
					dispatch(setToken(res.data.access_token));
				})
				.catch((err) => notifiError("Error", err.response.data.msg));
		} else {
			const cart = JSON.parse(localStorage.getItem("cart"));
			dispatch(setCart(cart ? cart : []));
		}
	}, [auth.isLogged, dispatch]);

	useEffect(() => {
		if (token) {
			dispatch(setLogin());
			API("user/infor", "GET", null, token)
				.then((res) => {
					dispatch(setUserInfo(res.data));
					dispatch(setCart(res.data.cart));
				})
				.catch((err) => notifiError("Error", err.response.data.msg));
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
												<C />
											</Suspense>
										</PrivateRouter>
									) : (
										<PublicRouter
											isAuthenticated={auth.isLogged}
										>
											<Suspense fallback={<Loading />}>
												<C />
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
				<Shipping />
				<Footer />
			</div>
		</Router>
	);
}

export default App;
