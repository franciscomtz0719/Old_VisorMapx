import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./containers/PrivateRoute";
import LandPage from "./vistas/pages/land-page/LandPage";
import "./scss/style.scss";
import { TheLayout as Lay } from "./containers/TheLayout";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./vistas/pages/login/Login"));
const Page404 = React.lazy(() => import("./vistas/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./vistas/pages/page500/Page500"));

class App extends Component {
  constructor(props) {
    super(props);

    // const {user}= useContext(AuthContext);
    let comprobador = localStorage.getItem("isAutehenticated") || "false";

    if (comprobador === "false") {
      comprobador = localStorage.setItem("isAutehenticated", false);
    } else {
      localStorage.setItem("isAutehenticated", true);
    }
  }

  render() {
    return (
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/landpage"
              name="Land Page"
              render={(props) => <LandPage {...props} />}
            />
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>        } /> */}
            <PrivateRoute
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
              component={Lay}
            />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
