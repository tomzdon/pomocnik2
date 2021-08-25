import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./All.css";
import { getRecipes } from "../Api";
import Recipes from "./ingredients/Recipes";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { authStates, withAuth } from "../components/auth";
import Loader from "./loader";
import { Redirect } from "react-router-dom";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Seek = (props) => {
  const [state, setState] = useState({
    Jajka: false,
    Ziemniaki: false,
    Brokul: false,
    Cebula: false,
    Czosnek: false,
    Kurczak: false,
    Wolowina: false,
    Wieprzowina: false,
    Mielone: false,
    Papryka: false,
    Marchew: false,
    MakaZiemniaczana: false,
    MakaPszenna: false,
    Twarog: false,
    SerZolty: false,
    SerFeta: false,
    PomidoryZpuszki: false,
    Cukinia: false,
    Kukurydza: false,
    FasolaCzerwona: false,
  });
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState(false);
  const [recipesShow, setRecipesShow] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let result = await getRecipes();
      setRecipes(result);
    }

    fetchData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    let helpTab = [];
    recipes.forEach((recipe) => {
      let count = 0;
      Object.entries(state).map((data) => {
        if (data[1] === true) {
          if (recipe.ingredients.indexOf(data[0]) > -1) {
            count++;
          }
          if (count >= 2 && helpTab.indexOf(recipe) < 0) {
            helpTab.push(recipe);
          }
        }
      });
    });
    if (helpTab.length < 1) {
      setAlert(true);
      setRecipesShow(helpTab);
    } else {
      setAlert(false);
      setRecipesShow(helpTab);
    }
    handleSort(helpTab);
  };

  const handleSort = (helpTab) => {
    let tab = [];
    Object.entries(state).map((data) => {
      if (data[1] === true) {
        tab.push(data);
      }
    });

    let tabSort = [];

    helpTab.forEach((element2, index) => {
      let count = 0;
      element2.ingredients.forEach((ingredient, index2) => {
        tab.forEach((element) => {
          if (ingredient == element[0]) {
            count++;
          }
        });
      });
      tabSort.push({ index: index, counter: count });
    });
    tabSort.sort((a, b) => b.counter - a.counter);

    let tabSorted = [];

    tabSort.forEach((element) => {
      tabSorted.push(helpTab[element.index]);
    });
    setRecipesShow(tabSorted);
  };
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setAlert(false);
  };
  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }

  if (props.authState === authStates.LOGGED_OUT) {
    return <Redirect to="/logowanie"></Redirect>;
  }

  return (
    <Container className="cards" maxWidth={"sm"}>
      <div className="text">
        <h2>
          Proszę wybrać składniki, z których zamierzasz stworzyć danie:
        </h2>
      </div>

      <FormGroup row>
        <Card className="ingre">
          <CardContent>
            <img
              className="photos"
              src="https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2104&q=80"
            />
            {/* te zdjecia powinny byc responsywne*/}

            <Typography className="typo" variant="h5" component="h2">
              Warzywa
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Brokul}
                      onChange={handleChange}
                      name="Brokul"
                    />
                  }
                  label="Brokuł"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Papryka}
                      onChange={handleChange}
                      name="Papryka"
                    />
                  }
                  label="Papryka"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Czosnek}
                      onChange={handleChange}
                      name="Czosnek"
                    />
                  }
                  label="Czosnek"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Cebula}
                      onChange={handleChange}
                      name="Cebula"
                    />
                  }
                  label="Cebula"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.PomidoryZpuszki}
                      onChange={handleChange}
                      name="PomidoryZpuszki"
                    />
                  }
                  label="Pomidory z puszki"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Cukinia}
                      onChange={handleChange}
                      name="Cukinia"
                    />
                  }
                  label="Cukinia"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Marchew}
                      onChange={handleChange}
                      name="Marchew"
                    />
                  }
                  label="Marchew"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Ziemniaki}
                      onChange={handleChange}
                      name="Ziemniaki"
                    />
                  }
                  label="Ziemniaki"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Kukurydza}
                      onChange={handleChange}
                      name="Kukurydza"
                    />
                  }
                  label="Kukurydza"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.FasolaCzerwona}
                      onChange={handleChange}
                      name="FasolaCzerwona"
                    />
                  }
                  label="Czerwona fasola"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className="ingre">
          <CardContent>
            <img
              className="photos"
              src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            />
            <Typography className="typo" variant="h5" component="h2">
              Mięso
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Wolowina}
                      onChange={handleChange}
                      name="Wolowina"
                    />
                  }
                  label="Wołowina"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Wieprzowina}
                      onChange={handleChange}
                      name="Wieprzowina"
                    />
                  }
                  label="Wieprzowina"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Kurczak}
                      onChange={handleChange}
                      name="Kurczak"
                    />
                  }
                  label="Pierś z kurczaka"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Mielone}
                      onChange={handleChange}
                      name="Mielone"
                    />
                  }
                  label="Mięso mielone"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className="ingre">
          <CardContent>
            <img
              className="photos"
              src="https://images.unsplash.com/photo-1591981131950-2ed961d0490e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            />
            <Typography className="typo" variant="h5" component="h2">
              Inne
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Jajka}
                      onChange={handleChange}
                      name="Jajka"
                    />
                  }
                  label="Jajka"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.SerZolty}
                      onChange={handleChange}
                      name="SerZolty"
                    />
                  }
                  label="Ser żółty"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.MakaPszenna}
                      onChange={handleChange}
                      name="MakaPszenna"
                    />
                  }
                  label="Mąka pszenna"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.MakaZiemniaczana}
                      onChange={handleChange}
                      name="MakaZiemniaczana"
                    />
                  }
                  label="Mąka ziemniaczana"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Twarog}
                      onChange={handleChange}
                      name="Twarog"
                    />
                  }
                  label="Twaróg"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.SerFeta}
                      onChange={handleChange}
                      name="SerFeta"
                    />
                  }
                  label="Ser feta"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </FormGroup>

      {recipesShow && <Recipes recipes={recipesShow} />}
      {alert && window.alert("Proszę zaznaczyć większą ilość składników")}

      <div className="buttons">
        <Button variant="contained" onClick={handleClick} color="primary">
          Wyszukaj przepisy
        </Button>
      </div>

      <div className="buttons">
        <Link to="/funkcje/znajdz/sosy">
          <Button variant="contained" color="primary">
            Sosy, które często wystepują w przepisach
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default withAuth(Seek);
