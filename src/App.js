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
import io from "socket.io-client";
import { setCart } from "./slice/cart.slice";
import { Promotion, SlideRelated } from "./components";
import { setSeenList } from "./slice/seenlist.slice";
import { setLikeList } from "./slice/likelist.slice";
const Components = {};

for (const c of routes) {
  Components[c.component] = React.lazy(() => import("./pages/" + c.component));
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
      const getToken = async () => {
        const res = await axios.post(
          "http://localhost:3001/user/refresh_token",
          null
        );

        const action = setToken(res.data.access_token);

        dispatch(action);
      };
      getToken();
    } else {
      const cart = JSON.parse(localStorage.getItem("cart"));
      dispatch(setCart(cart ? cart : []));
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(setLogin());
        return userApi.getUser(token).then((res) => {
          const action = setUserInfo(res.data);
          dispatch(action);
          console.log(res.data.cart);
          dispatch(setCart(res.data.cart));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Promotion />
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
                    <PrivateRouter isAuthenticated={auth.isLogged}>
                      <Suspense fallback={<Loading />}>
                        <C socket={socket} />
                      </Suspense>
                    </PrivateRouter>
                  ) : (
                    <PublicRouter isAuthenticated={auth.isLogged}>
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
