import React, { useState, useEffect } from "react";
import { getGroats } from "../../Api";
import { Link } from "react-router-dom";
import How from "../How";
import "../All.css";
import { Card } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { authStates, withAuth } from "../auth";
import Loader from "../loader";

const Groats = (props) => {
  const [groats, setGroats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let result = await getGroats();
      setGroats(result);
    }
    fetchData();
  }, []);
  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }
  return (
    <>
      <How />
      <Container maxWidth={"sm"}>
        <Card className="list">
          <List component="nav" aria-label="main mailbox folders">
            {groats.map((data, index) => (
              <Link key={index} to={"/funkcje/jak/kasze/" + data.number}>
                <ListItem button>
                  <ListItemText primary={data.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Card>
      </Container>
    </>
  );
};

export default withAuth(Groats);
