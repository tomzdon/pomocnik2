import React from 'react';
import {Link} from "react-router-dom";


const Recipes = (props) => {


    return (
        <>
            <ul>
                {props.recipes && props.recipes.map((data, index) => (
                    <Link key={index} to={"/funkcje/znajdz/przepisy/" + data.number}>
                        <li>{data.name}</li>
                    </Link>))}
            </ul>
        </>
    )
}

export default Recipes