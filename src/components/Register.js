import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import { authStates, withAuth } from "../components/auth";
import { createNewUser } from "../utils/firebase";
import Loader from "../components/loader";
import { validateEmailPassword } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const Register = (props) => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [values, setValues] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    name == "email"
      ? setValues({ email: value, password: values.password })
      : setValues({ email: values.email, password: value });

    console.log(values);
    setError(error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (error) {
      return;
    }

    //Validate email & password
    const errorMsg = validateEmailPassword(values.email, values.password);

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    createNewUser(values.email, values.password)
      .then(() => {
        console.log("Signed Up!");
      })
      .catch((e) => {
        console.log("Error signing up", e);
        if (e.code === "auth/email-already-in-use") {
          setError("Adres e-mail jest już w użyciu");
        }
      });
  };

  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }

  if (props.authState === authStates.LOGGED_IN) {
    return <Redirect to="/"></Redirect>;
  }

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
              <Grid item xs={12}>
                <p style={{ color: "red" }}>{error}</p>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                style={{ marginBottom: 20 }}
                variant="contained"
                color="primary"
              >
                Zarejestruj
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
};

export default withAuth(Register);
