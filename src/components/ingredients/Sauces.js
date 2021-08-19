import React from "react";
import { Link } from "react-router-dom";
import { authStates, withAuth } from "../auth";
import Loader from "../loader";

const Sauces = (props) => {
  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }
  return (
    <div className="sauces">
      <h1> Jakiego sosu potrzebujesz do przepisu? </h1>
      <ul className="sauces">
        <Link to={"/funkcje/znajdz/przepisy/3"}>
          <li>Sos serowy</li>
        </Link>

        <Link to={"/funkcje/znajdz/przepisy/2"}>
          <li>Sos czosnkowy</li>
        </Link>

        <Link to={"/funkcje/znajdz/przepisy/6"}>
          <li>Sos winegret</li>
        </Link>

        <Link to={"/funkcje/znajdz/przepisy/8"}>
          <li>Sos tzaziki</li>
        </Link>
      </ul>
    </div>
  );
};

export default withAuth(Sauces);
