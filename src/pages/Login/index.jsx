import "./style.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import api from "../../services/api";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Redirect } from "react-router-dom";

toast.configure();

const notify = (erro) => {
  toast.error(`${erro}`, {
    position: toast.POSITION.TOP_CENTER,
  });
};

const schema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Senha precisa ter ao menos 8 caracteres, 1 letra maiuscula, 1 número e um caracter especial ex: %"
    ),
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // margin: theme.spacing(1),
      width: "45ch",
      display: "flex",
      flexDirection: "column",
      margin: "10px auto",
    },
  },
}));

export function Login({ authentication, setAuthentication, setUser2 }) {
  const classes = useStyles();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    api
      .post("/sessions", data)

      .then((response) => {
        console.log(response);
        const {
          data: { token },
          data: {
            user: { id },
          },
          data: {
            user: { name },
          },
        } = response;
        console.log(token);
        localStorage.setItem("@Kenziehub:token", JSON.stringify(token));
        localStorage.setItem("@Kenziehub:id", JSON.stringify(id));
        localStorage.setItem("@Kenziehub:name", JSON.stringify(name));

        setAuthentication(true);
        setUser2([response.data.user]);
        return history.push(`/home/${response.data.user.name}`);
      })
      .catch((err) => {
        notify("E-mail ou senha incorretos");
        console.log(err);
      });
  };

  if (authentication) {
    return <Redirect to="/home/:user" />;
  }

  return (
    <>
      <h1 className="tituloLogin">Faça seu Login </h1>
      <form
        className={classes.root}
        noValidate
        autoComplete="on"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p style={{ color: "white" }}>{errors.email?.message}</p>
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          type="email"
          {...register("email")}
        />
        <p style={{ color: "white" }}>{errors.password?.message}</p>
        <TextField
          id="outlined-basic"
          type="password"
          label="password"
          variant="outlined"
          {...register("password")}
        />

        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <p className="paragrafo">
          Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
        </p>
      </form>
    </>
  );
}
