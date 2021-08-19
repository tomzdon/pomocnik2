import React, { useEffect, useState } from "react";
import { getVarious } from "../../Api";
import { Link } from "react-router-dom";
import How from "../How";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { authStates, withAuth } from "../auth";
import Loader from "../loader";

const Various = (props) => {
  const [various, setVarious] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let result = await getVarious();
      setVarious(result);
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
      <Container maxWidth={"sm"}>
        <Card className="list">
          <List component="nav" aria-label="main mailbox folders">
            {various.map((data, index) => (
              <Link key={index} to={"/funkcje/jak/inne/" + data.number}>
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

export default withAuth(Various);
