import React, { useContext, lazy } from "react";
import "./components/All.css";
import Register from "./components/Register";
import {Route, Switch} from "react-router-dom";
import Intro from "./components/Intro";
import Other from "./components/Other";
import Seek from "./components/Seek";
import How from "./components/How";
import {firebaseAuth} from "./provider/authProvider";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Vegetables from "./components/ingredients/Vegetables";
import SingleVege from "./components/ingredients/SingleVege";
import Pasta from "./components/ingredients/Pasta";
import SinglePasta from "./components/ingredients/SinglePasta";
import Various from "./components/ingredients/Various";
import SingleVarious from "./components/ingredients/SingleVarious";
import Recipes from "./components/ingredients/Recipes";
import SingleRecipe from "./components/ingredients/SingleRecipe";
import Groats from "./components/ingredients/Groats";
import SingleGroat from "./components/ingredients/SingleGroat";
import RecipesAll from "./components/ingredients/RecipesAll";
import Sauces from "./components/ingredients/Sauces";
import NavBar from "./components/Navbar";
import CounterDown from "./components/CounterDown";


const App = () => {

  return (
    <div className="all">
      <NavBar />
      <div>
        <Route exact path="/" component={Intro} />
        <Route exact path="/logowanie" component={Login} />
        <Route path="/rejestracja" component={Register} />
        <Switch>
          <Route exact path="/funkcje/znajdz" component={Seek} />
          <Route path="/inne" component={Other} />
          <Route
            exact
            path="/funkcje/znajdz/przepisy"
            component={RecipesAll}
          />
          <Route
            path="/funkcje/znajdz/przepisy/:slug/"
            component={SingleRecipe}
          />
          <Route exact path="/funkcje/jak" component={How} />
          <Route
            exact
            path="/funkcje/jak/warzywa"
            component={Vegetables}
          />
          <Route
            path="/funkcje/jak/warzywa/:slug"
            component={SingleVege}
          />
          <Route exact path="/funkcje/jak/makarony" component={Pasta} />
          <Route
            path="/funkcje/jak/makarony/:slug"
            component={SinglePasta}
          />
          <Route exact path="/funkcje/jak/inne" component={Various} />
          <Route
            path="/funkcje/jak/inne/:slug"
            component={SingleVarious}
          />
          <Route exact path="/funkcje/jak/kasze" component={Groats} />
          <Route
            path="/funkcje/jak/kasze/:slug"
            component={SingleGroat}
          />
          <Route exact path="/minutnik" component={CounterDown} />
          <Route exact path="/funkcje/znajdz/sosy" component={Sauces} /> 
        </Switch>
      </div>
    </div>
  );
};

export default App;
