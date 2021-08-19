import React, { useEffect, useState } from "react";
import { getRecipes } from "../../Api";
import "../All.css";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { authStates, withAuth } from "../auth";
import Loader from "../loader";

const SingleRecipe = (props) => {
  const [recipes, setRecipes] = useState([]);
  let slug = parseInt(props.match.params.slug);

  useEffect(() => {
    async function fetchData() {
      let result = await getRecipes();
      setRecipes(result);
    }

    fetchData();
    return () => {};
  }, []);
  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }

  return (
    <div>
      {recipes
        .filter((recipe) => recipe.number === slug)
        .map((recipe) => {
          return (
            <Container maxWidth={"sm"}>
              <Card className="description">
                <h1>
                  <b>{recipe.name}</b>
                </h1>
                <div className="single">
                  <h6>
                    <b>Składniki:</b>
                  </h6>
                  <ul className="tips">
                    {recipe.composition.map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                  <h6>
                    <b> Sposób przygotowania:</b>
                  </h6>
                  {recipe.description}
                </div>
              </Card>
            </Container>
          );
        })}
    </div>
  );
};

export default withAuth(SingleRecipe);
