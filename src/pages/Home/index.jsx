import React, { useEffect } from "react";
import "./home.css";
import { ExibitionCard } from "../../components/ExibitionCard/exibitionCard";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import api from "../../services/api";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FiMenu, FiSearch, FiEdit, FiBookOpen, FiLoader } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
    marginLeft: "20px",
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root1: {
    "& > *": {
      // margin: theme.spacing(1),
      width: "35ch",
      display: "flex",
      margin: "10px auto",
      flexDirection: "column",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginLeft: "20px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

toast.configure();

const notify = (erro) => {
  toast.error(`${erro}`, {
    position: toast.POSITION.TOP_CENTER,
  });
};

const schema = yup.object().shape({
  title: yup.string().required("Título é obrigatório"),
  status: yup.string().required("Status é obrigatório"),
});

export function Home({ authentication, user2, setUser2, setAuthentication }) {
  const classes = useStyles();

  const [token] = useState(
    JSON.parse(localStorage.getItem("@Kenziehub:token"))
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [rendery, setRendery] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (param) => {
    setRendery(param);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogOut = () => {
    localStorage.clear();
    setAuthentication(false);
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const user3 = JSON.parse(localStorage.getItem("@Kenziehub:name"));

  //Posta na API a tecnologia
  const onSubmit = (data) => {
    api
      .post("/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        notify("Sucesso Tech Cadastrada");
        reset();
      })
      .catch((err) => {
        notify("Tecnologia já existe");
        console.log(err);
      });
  };

  //Colocar essa função no botão das listas criadas com o map das tecnologias
  const handleClickDelete = (data, tek) => {
    api
      .delete(`users/techs/${data}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_) => {
        notify(`Tech ${tek} excluída com sucesso`);
        update();
      })
      .catch((err) => {
        toast.error("Erro ao Deletar, tente novamente mais tarde.");
        console.log(err);
      });
    setRendery("n");
  };

  const update = () => {
    const id = JSON.parse(localStorage.getItem("@Kenziehub:id"));

    api
      .get(`/users/${id}`)
      .then((response) => {
        setUser2([response.data]);
      })
      .catch((err) => console.log(err));
  };

  const updateTech = (data, itemId, tek) => {
    const edit = { status: data };

    api
      .put(`users/techs/${itemId}`, edit, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_) => {
        notify(`Tech ${tek} editada com sucesso`);
        update();
      })
      .catch((err) => {
        toast.error("Erro ao Editar, tente novamente mais tarde.");
        console.log(err);
      });
    setRendery("n");
  };

  useEffect(() => {
    if (user2) {
      update();
    }
    // eslint-disable-next-line
  }, [rendery]);

  if (!authentication) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            <FiMenu />
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <FiLoader fontSize="20px" />
              <button
                onClick={() => handleClick2(false)}
                className="buttonList"
              >
                Criar
              </button>
              <FiLoader fontSize="20px" />
            </StyledMenuItem>
            <StyledMenuItem>
              <FiBookOpen fontSize="20px" />
              <button onClick={() => handleClick2(true)} className="buttonList">
                Ver Todas
              </button>
              <FiBookOpen fontSize="20px" />
            </StyledMenuItem>
          </StyledMenu>
          <Typography className={classes.title} variant="h6" noWrap>
            Menu
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <FiSearch />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <h1 className="tituloHome">
        Bem vindo <span>{`${user3 ? user3 : null}`}</span>
      </h1>
      {!rendery && (
        <form
          id="formTech"
          className={classes.root1}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3>Cadastrar Nova Tech</h3>
          <p style={{ color: "red" }}>{errors.title?.message}</p>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            type="text"
            {...register("title")}
          />
          <p style={{ color: "red" }}>{errors.status?.message}</p>
          <TextField
            id="outlined-basic"
            label="Status"
            variant="outlined"
            type="text"
            {...register("status")}
          />

          <Button type="submit" variant="contained" color="secondary">
            Cadastrar
          </Button>
        </form>
      )}

      {rendery &&
        user2.map((item) => (
          <ExibitionCard
            key={item.id}
            nome={item.name}
            curso={item.course_module}
            tecnologia={item.techs}
            handleClickDelete={handleClickDelete}
            updateTech={updateTech}
          />
        ))}
      <Button
        type="submit"
        onClick={() => LogOut()}
        variant="contained"
        color="secondary"
      >
        Log Out
      </Button>
    </div>
  );
}
