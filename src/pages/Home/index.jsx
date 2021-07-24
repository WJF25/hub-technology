import React from "react";
import "./home.css";
import { ExibitionCard } from "../../components/ExibitionCard/exibitionCard";
import { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
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
    elevation={0}
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

export function Home({ authentication, user2 }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { user } = useParams();

  //Posta na API a tecnologia
  const onSubmit = (data) => {
    let token = JSON.parse(localStorage.getItem("@kenziehub:token"));
    console.log(token);
    api
      .post("https://kenziehub.me/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("crinhado");
      })
      .catch((err) => {
        notify("Tecnologia já existe");
        console.log(err);
      });
  };
  //Colocar essa função no botão das listas criadas com o map das tecnologias
  const handleClickDelete = (data) => {
    const token = JSON.parse(localStorage.getItem("@kenziehub:token"));
    api
      .delete(`https://kenziehub.me/users/${data}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("crinhado");
      })
      .catch((err) => {
        notify("Erro ao Deletar, tente novamente mais tarde.");
        console.log(err);
      });
  };

  if (!authentication) {
    return <Redirect to="/login" />;
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
              <ListItemIcon>
                <FiLoader fontSize="20px" />
              </ListItemIcon>
              <ListItemText primary="Criar" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <FiEdit fontSize="20px" />
              </ListItemIcon>
              <ListItemText primary="Atualizar" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <FiBookOpen fontSize="20px" />
              </ListItemIcon>
              <ListItemText primary="Mostrar Todas" />
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

      <h1>Bem vindo {user}</h1>

      <form
        id="formTech"
        className={classes.root1}
        noValidate
        autoComplete="on"
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

        {/* <InputLabel id="status">Status</InputLabel>
        <p style={{ color: "red" }}>{errors.status?.message}</p>
        <Select variant="outlined" labelId="status" value="status">
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </Select> */}

        <Button type="submit" variant="contained" color="secondary">
          Cadastrar
        </Button>
      </form>
      {user2.map((item) => (
        <ExibitionCard
          key={item.id}
          nome={item.name}
          curso={item.course_module}
          tecnologia={item.techs}
          handleClickDelete={handleClickDelete}
        />
      ))}
    </div>
  );
}
