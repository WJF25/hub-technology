import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import "./enter.css";

export function Entrada() {
  const history = useHistory();
  const toLogin = () => {
    return history.push("/login");
  };

  const toSignUp = () => {
    return history.push("/signup");
  };

  return (
    <>
      <h1 className="tituloLogin">Kenzie Hub</h1>
      <p className="paragrafoEnt">
        Cadastre-se numa rede de Developers e mostreu seus jobs e também quais
        tecnologias tem conheciento.
      </p>
      <div className="containerButtonsEnt">
        <Button id="bt1" onClick={toLogin} variant="contained" color="primary">
          Login
        </Button>
        <Button id="bt2" onClick={toSignUp} variant="contained" color="primary">
          Cadastrar
        </Button>
      </div>
    </>
  );
}
