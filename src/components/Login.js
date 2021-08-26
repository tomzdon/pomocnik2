import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

import { authStates, withAuth } from "../components/auth";
import en from "../utils/i18n";
import Loader from "../components/loader";
import { signIn } from "../utils/firebase";
import { validateEmailPassword } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    name == "email"
      ? setValues({ email: value, password: values.password })
      : setValues({ email: values.email, password: value });

    setError(error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errorMsg = validateEmailPassword(values.email, values.password);

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    signIn(values.email, values.password)
      .then(() => {
        console.log("Signed In");
      })
      .catch((e) => {
        console.log("Error signing in", e);
        setError("Nieprawidłowy adres e-mail/hasło");
      });
  };

  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }

  if (props.authState === authStates.LOGGED_IN) {
    return <Redirect to="/"></Redirect>;
  }

  const errorMsg = error;
  return (
    <Container maxWidth="sm" className="cards">
      <Card className="list">
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                name="password"
                type="password"
                value={values.password}
                id="standard-error"
                label="Hasło:"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                name="email"
                type="email"
                value={values.email}
                id="standard-error"
                label="Adres e-mail:"
              />
            </Grid>
            <Grid item xs={12}>
              <p style={{ color: "red" }}>{error}</p>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                style={{ marginBottom: 20 }}
                variant="contained"
                color="primary"
              >
                Zaloguj
              </Button>
              <p>{en.FORM_FIELDS.LOGIN_ALT_TEXT}</p>
              <Link to="/rejestracja">Zarejestruj się</Link>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
};
export default withAuth(Login);
