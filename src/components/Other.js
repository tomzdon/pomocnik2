import React from "react";
import { authStates, withAuth } from "../components/auth";
import Loader from "../components/loader";

const Other = (props) => {
  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }
  return (
    <div>
      <h1> Tutaj się coś wymyśli.</h1>
    </div>
  );
};

export default withAuth(Other);
