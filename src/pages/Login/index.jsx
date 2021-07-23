import "./style.css";
import { FiMail, FiKey } from "react-icons/fi";
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
import { Link } from "react-router-dom";

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

export function Login() {
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
      .post("https://kenziehub.me/sessions", data)
      .then((response) => {
        history.push(`/login/${data.name}`);
      })
      .catch((err) => {
        notify("E-mail ou senha incorreto");
        console.log(err);
      });
  };

  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          type="email"
          {...register("email")}
        />
        {errors.email?.message}
        <TextField
          id="outlined-basic"
          type="password"
          label="password"
          variant="outlined"
          {...register("password")}
        />
        {errors.password?.message}
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>
      <p className="paragrafo">
        Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
      </p>
    </>
  );
}
