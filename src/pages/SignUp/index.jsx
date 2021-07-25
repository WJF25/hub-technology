import React from "react";
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
import "./style.css";

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
    .required("Celular é obrigatório")
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Senha precisa ter ao menos 8 caracteres, 1 letra maiuscula, 1 número e um caracter especial ex: %"
    ),
  name: yup.string().required("Nome obrigatório").max(28),
  bio: yup.string(),
  contact: yup
    .string("Somente Números")
    .required("Celular obrigatório")
    .min(10)
    .matches(/(\d+)| /g),
  course_module: yup.string().required("Curso e Módulo são obrigatótios"),
});

export function SignUp({ authentication }) {
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
      .post("https://kenziehub.me/users", data)
      .then((response) => {
        notify("Cadastro realizado com sucesso");
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
      <h1 className="tituloSignup">Faça seu Cadastro</h1>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <p style={{ color: "red" }}>{errors.email?.message}</p>
        <TextField
          style={{ color: " rgb(235, 255, 59)" }}
          id="outlined-basic"
          label="email"
          variant="outlined"
          {...register("email")}
        />
        <p style={{ color: "red" }}>{errors.password?.message}</p>
        <TextField
          id="outlined-basic"
          type="password"
          label="password"
          variant="outlined"
          {...register("password")}
        />
        <p style={{ color: "red" }}>{errors.name?.message}</p>
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          {...register("name")}
        />
        <p style={{ color: "red" }}>{errors.bio?.message}</p>
        <TextField
          id="outlined-basic"
          multiline
          rows={2}
          label="bio"
          variant="outlined"
          {...register("bio")}
        />
        <p style={{ color: "red" }}>{errors.contact?.message}</p>
        <TextField
          id="outlined-basic"
          label="contact"
          variant="outlined"
          {...register("contact")}
        />
        <p style={{ color: "red" }}>{errors.course_module?.message}</p>
        <TextField
          id="outlined-basic"
          label="course_module"
          variant="outlined"
          {...register("course_module")}
        />

        <Button id="bf" type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
        <p className="paragrafo">
          Já tem uma conta?{" "}
          <Link classname="linktologin" to="/login">
            Logar
          </Link>
        </p>
      </form>
    </>
  );
}
