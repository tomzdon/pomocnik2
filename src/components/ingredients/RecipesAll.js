import React, {useState, useEffect} from "react";
import {getRecipes} from "../../Api";
import {makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import {Card} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from 'react-router-dom'
import { authStates, withAuth } from "../auth";
import Loader from "../loader";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    icon: {
        color: "rgba(255, 255, 255, 0.54)",
    },
}));

const RecipesAll = (props) => {
    const [recipes, setRecipes] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            let result = await getRecipes();
            setRecipes(result);
        }

        fetchData().then();
    }, []);

    if (props.authState === authStates.INITIAL_VALUE) {
        return <Loader />;
      }

    return (
        <Container maxWidth="sm">
            <div className='text'>
            <h1 > Lista wszystkich przepisów: </h1>
            </div>
            <Card className="list">
                <List component="nav" aria-label="main mailbox folders">
                    {recipes &&
                    recipes.map((data, index) => {
                            return (
                                <Link key={index} to={"/funkcje/znajdz/przepisy/" + data.number}>
                                    <ListItem key={index} button>
                                        <ListItemText primary={data.name}/>
                                    </ListItem>
                                </Link>
                            )
                        }
                    )}
                </List>
            </Card>
        </Container>
    );
};

export default withAuth(RecipesAll);
