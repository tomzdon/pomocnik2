import React, { useEffect, useState } from "react";
import { getPasta } from "../../Api";
import { Link } from "react-router-dom";
import How from "../How";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { authStates, withAuth } from "../auth";
import Loader from "../loader";

const Pasta = (props) => {
  const [pasta, setPasta] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let result = await getPasta();
      setPasta(result);
    }
    fetchData();
    return () => {};
  }, []);

  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }
  return (
    <>
      <How />
      <Container maxWidth="sm">
        <Card className="list">
          <List component="nav" aria-label="main mailbox folders">
            {pasta.map((data, index) => (
              <Link key={index} to={"/funkcje/jak/makarony/" + data.number}>
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

export default withAuth(Pasta);
