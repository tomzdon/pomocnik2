import React, { useEffect, useState } from "react";
import { getVarious } from "../../Api";
import "../All.css";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import How from "../How";
import { authStates, withAuth } from "../auth";
import Loader from "../loader";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const SingleVarious = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [various, setVarious] = useState([]);
  let slug = parseInt(props.match.params.slug);

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
    <div>
      {various
        .filter((various) => various.number === slug)
        .map((various) => {
          return (
            <>
              <How />
              <Container maxWidth={"sm"}>
                <Card className="description">
                  <div>
                    <h1>{various.name}</h1>
                    <img width="400px" src={various.image} />
                    <h6 className="h6">Sposób przygotowania:</h6>
                    <div className="single">{various.description}</div>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <h6>Wartości zdrowotne:</h6>
                        <Typography paragraph>{various.values}</Typography>
                        <Typography paragraph>{various.values2}</Typography>
                      </CardContent>
                    </Collapse>
                  </div>
                </Card>
              </Container>
            </>
          );
        })}
    </div>
  );
};

export default withAuth(SingleVarious);
