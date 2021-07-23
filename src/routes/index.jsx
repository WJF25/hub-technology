import { Route, Switch } from "react-router-dom";
import { Login } from "../pages/Login/index";
import { SignUp } from "../pages/SignUp/index";
import { Home } from "../pages/Home/index";
import { useEffect, useState } from "react";

function Routes() {
  const [authentication, setAuthentication] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("kenzieHub:token"));

    if (token) {
      return setAuthentication(true);
    }
  }, [authentication]);

  return (
    <div>
      <Switch>
        <Route path="/signup">
          <SignUp authentication={authentication} />
        </Route>
        <Route exact path="/login">
          <Login
            authentication={authentication}
            setAuthentication={setAuthentication}
          />
        </Route>
        <Route path="/home/:nome">
          <Home authentication={authentication} />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
