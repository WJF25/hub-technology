import { useHistory } from "react-router";

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
      <p>
        Cadastre-se numa rede de Developers e mostreu seus jobs e também quais
        tecnologias tem conheciento. Aqui você é encontrado facilmente.
      </p>
      <button onClick={toLogin}>Login</button>
      <button onClick={toSignUp}>Cadastrar</button>
    </>
  );
}
