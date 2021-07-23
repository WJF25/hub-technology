import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const notify = (erro) => {
  toast.error(`${erro}`, {
    position: toast.POSITION.TOP_CENTER,
  });
};

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
  name: yup.string().required("Nome obrigatório").max(18),
  bio: yup.string(),
  contact: yup
    .string("Somente Números")
    .required("Celular obrigatório")
    .min(10)
    .matches(/(\d+)| /g),
  course_module: yup.string(),
});

export function SignUp({ authentication }) {
  const history = useHistory();
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    api
      .post("https://kenziehub.me/users", data)
      .then((response) => {
        history.push(`/login`);
      })
      .catch((err) => {
        notify("E-mail já existe");
        console.log(err);
      });
  };

  if (authentication) {
    return <Redirect to="/home/" />;
  }

  return (
    <>
      <h1>Faça seu Cadastro</h1>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
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
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          {...register("name")}
        />
        {errors.name?.message}
        <TextField
          id="outlined-basic"
          multiline
          rows={2}
          label="bio"
          variant="outlined"
          {...register("bio")}
        />
        {errors.bio?.message}
        <TextField
          id="outlined-basic"
          label="contact"
          variant="outlined"
          {...register("contact")}
        />
        {errors.contact?.message}
        <TextField
          id="outlined-basic"
          label="course_module"
          variant="outlined"
          {...register("course_module")}
        />
        {errors.course_module?.message}
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
        <p className="paragrafo">
          Já tem uma conta? <Link to="/login">Logar</Link>
        </p>
      </form>
    </>
  );
}
