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
const Components = {};

for (const c of routes) {
  Components[c.component] = React.lazy(() => import("./pages/" + c.component));
}

function App() {
  const auth = {
    isLogged: true,
  };
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
                    <PrivateRouter isAuthenticated={auth.isLogged}>
                      <Suspense fallback={<Loading />}>
                        <C />
                      </Suspense>
                    </PrivateRouter>
                  ) : (
                    <PublicRouter isAuthenticated={auth.isLogged}>
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
