import React, { useEffect, useState } from "react";
import { getGroats } from "../../Api";
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

const SingleGroat = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [groats, setGroats] = useState([]);
  let slug = parseInt(props.match.params.slug);

  useEffect(() => {
    async function fetchData() {
      let result = await getGroats();
      setGroats(result);
    }

    fetchData();
    return () => {};
  }, []);
  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }
  return (
    <div>
      {groats
        .filter((groat) => groat.number === slug)
        .map((groat) => {
          return (
            <>
              <How />
              <Container maxWidth={"sm"}>
                <Card className="description">
                  <div>
                    <h1>{groat.name}</h1>
                    <img width="400px" src={groat.image} />
                    <h6 className="h6">Sposób przygotowania:</h6>
                    <div className="single">{groat.description}</div>
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
                        <Typography paragraph>
                          Pod względem wartości odżywczej kasze przewyższają
                          ryż, makaron i ziemniaki. Są bogatym źródłem skrobi,
                          która w organizmie rozkłada się powoli na glukozę -
                          paliwo potrzebne do pracy mózgu i wszystkich innych
                          komórek. 100 g ugotowanej kaszy manny pokrywa niemal
                          całkowicie dzienne zapotrzebowanie na węglowodany.
                        </Typography>

                        <Typography paragraph>
                          W skład kasz wchodzą witaminy z grupy B: B1 (tiamina),
                          B2 (ryboflawina), PP (niacyna), B6 (pirydoksyna), kwas
                          foliowy i witamina E. Sporo jest również składników
                          mineralnych, głównie potasu obniżającego ciśnienie,
                          żelaza zapobiegającego niedokrwistości oraz magnezu
                          korzystnie działającego na układ nerwowy i pracę
                          mięśni (w tym sercowego). Kasze są też całkiem dobrym
                          źródłem wapnia, miedzi, cynku, manganu i krzemu.
                        </Typography>

                        <h6>Kaszę powinni jeść:</h6>
                        <ul className="tips">
                          <li>
                            nadciśnieniowcy i cierpiący na choroby serca i
                            układu krążenia - kasze mają dużo potasu i bardzo
                            mało sodu (o ile w ogóle ich nie solimy),
                          </li>
                          <li>
                            osoby zagrożone anemią - np. kasza jaglana i
                            gryczana zawierają żelazo, kwas foliowy i witaminę E
                            zapobiegające niedokrwistości,
                          </li>
                          <li>
                            osoby żyjące w ciągłym napięciu i mające skłonności
                            do depresji - zawarte w ziarnach witaminy z grupy B
                            łagodzą objawy stresu, wspomagają pracę układu
                            nerwowego, poprawiają pamięć, polepszają nastrój,
                          </li>
                          <li>
                            diabetycy - kasze zawierają dużo skrobi, która
                            łagodnie podnosi poziom glukozy i insuliny we krwi,
                          </li>
                          <li>
                            dzieci, kobiety w ciąży i karmiące, osoby starsze,
                            rekonwalescenci - kasze gotowane na sypko lub
                            rozklejane są lekko strawne.
                          </li>
                        </ul>
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

export default withAuth(SingleGroat);
