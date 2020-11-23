import React, { Suspense, useEffect } from "react";
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
import { setToken } from "./slice/user.slice";
import userApi from "./api/userApi";

const Components = {};

for (const c of routes) {
  Components[c.component] = React.lazy(() => import("./pages/" + c.component));
}

function App() {
  // const auth = {
  //   isLogged: true,
  // };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isLogged, token } = user;
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      // const getToken = async () => {
      //     const res = await axios.post('/user/refresh_token', null)
      //     dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
      // }
      const access_token = userApi.getToken();
      const action = setToken(access_token);
      dispatch(action);
    }
  }, [isLogged, dispatch]);

  useEffect(() => {
    // if (token) {
    // const getUser = () => {
    //   dispatch(dispatchLogin());
    //   return fetchUser(token).then((res) => {
    //     console.log(res);
    //     dispatch(dispatchGetUser(res));
    //   });
    // };
    // getUser();
    // }
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
                    <PrivateRouter isAuthenticated={user.isLogged}>
                      <Suspense fallback={<Loading />}>
                        <C />
                      </Suspense>
                    </PrivateRouter>
                  ) : (
                    <PublicRouter isAuthenticated={user.isLogged}>
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
