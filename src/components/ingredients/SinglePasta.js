import React, { useEffect, useState } from "react";
import { getPasta } from "../../Api";
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

const SinglePasta = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [pasta, setPasta] = useState([]);
  let slug = parseInt(props.match.params.slug);

  useEffect( () => {
    async function fetchData() {
      let result = await getPasta();
      setPasta(result);
    }
    fetchData();
  }, []);

  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }

  return (
    <div>
      {pasta
        .filter((pasta) => pasta.number === slug)
        .map((pasta) => {
          return (
            <>
              <How />
              <Container maxWidth={"sm"}>
                <Card className="description">
                  <div>
                    <h1>{pasta.name}</h1>
                    <img width="400px" src={pasta.image} />
                    <h6 className="h6">Sposób przygotowania:</h6>
                    <div className="single">{pasta.description}</div>
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
                        <h6>Wskazówki:</h6>
                        <Typography paragraph>{pasta.values}</Typography>
                        <Typography paragraph>
                          <ul className="tips">
                            <li>nie dodawaj oliwy do wody!</li>
                            <li>makaron wrzucaj jedynie do wrzącej wody!</li>
                            <li>
                              sól dorzuć dopiero wówczas, kiedy woda zacznie
                              wrzeć!
                            </li>
                            <li>nie gotuj makaronu na wolnym ogniu!</li>
                            <li>nie łam suchego makaronu w krótsze nitki!</li>
                            <li>
                              aby dowiedzieć się, czy makaron się ugotował po
                              prostu go ugryź i sprawdź!
                            </li>
                            <li>nie przepłukuj makaronu zimną wodą!</li>
                            <li>nie zwlekaj z podawaniem!</li>
                          </ul>
                        </Typography>
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

export default withAuth(SinglePasta);
