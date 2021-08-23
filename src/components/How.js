import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./All.css";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { authStates, withAuth } from "./auth";
import Loader from "./loader";
import { Redirect } from "react-router-dom";

const How = (props) => {
  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }
  if (props.authState === authStates.LOGGED_OUT) {
    return <Redirect to="/logowanie"></Redirect>;
  }

  return (
    <>
      <div className="text">
        <h1> Co zamierzasz ugotować? </h1>
      </div>
      <Container className="cards" maxWidth="md">
        <Grid style={{ textAlign: "center" }} container spacing={1}>
          <Grid item md={2}></Grid>
          <Grid item md={2}>
            <div>
              <a href="/funkcje/jak/warzywa">
                <img
                  className="photo"
                  src="https://images.unsplash.com/photo-1557844352-761f2565b576?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                />
              </a>
              <br />
              <Link to="/funkcje/jak/warzywa">
                <Button style={{ marginTop: "10px" }} variant="success">
                  Warzywa
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid item md={2}>
            <div>
              <a href="/funkcje/jak/makarony">
                <img
                  className="photo"
                  src="https://images.unsplash.com/photo-1612966874574-e0a92ad2bc43?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTd8fHBhc3RhfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                />
              </a>
              <br />
              <Link to="/funkcje/jak/makarony">
                <Button style={{ marginTop: "10px" }} variant="success">
                  Makarony
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid item md={2}>
            <div>
              <a href="/funkcje/jak/kasze">
                <img
                  className="photo"
                  src="https://images.unsplash.com/photo-1437252611977-07f74518abd7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGJhcmxleSUyMGZvb2R8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                />
              </a>
              <br />
              <Link to="/funkcje/jak/kasze">
                <Button style={{ marginTop: "10px" }} variant="success">
                  Kasze
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid item md={2}>
            <div>
              <a href="/funkcje/jak/inne">
                <img
                  className="photo"
                  src="https://images.unsplash.com/photo-1504283165217-3679a64511fd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGVnZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                />
              </a>
              <br />
              <Link to="/funkcje/jak/inne">
                <Button style={{ marginTop: "10px" }} variant="success">
                  Inne
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default withAuth(How);
