import { Route, Switch } from "react-router-dom";
import { Login } from "../pages/Login/index";
import { SignUp } from "../pages/SignUp/index";
import { Home } from "../pages/Home/index";
import { useEffect, useState } from "react";
import { Entrada } from "../pages/Entrada/enter";
import "./route.css";

function Routes() {
  const [authentication, setAuthentication] = useState(false);
  const [user2, setUser2] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));

    if (token) {
      return setAuthentication(true);
    }
  }, [authentication]);

  return (
    <div className="divPrincipal">
      <Switch>
        <Route exact path="/">
          <Entrada authentication={authentication} />
        </Route>
        <Route path="/signup">
          <SignUp authentication={authentication} />
        </Route>
        <Route exact path="/login">
          <Login
            authentication={authentication}
            setAuthentication={setAuthentication}
            setUser2={setUser2}
          />
        </Route>
        <Route path="/home/:user">
          <Home
            authentication={authentication}
            user2={user2}
            setUser2={setUser2}
            setAuthentication={setAuthentication}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
