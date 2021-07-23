import { Route, Router, Switch } from "react-router-dom";
import { Login } from "../pages/Login/index";
import { SignUp } from "../pages/SignUp/index";
import { Home } from "../pages/Home/index";
function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
