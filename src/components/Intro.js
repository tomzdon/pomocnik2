import React from "react";
import { Redirect } from "react-router-dom";
import { authStates, withAuth } from "../components/auth";
import { signOut } from "../utils/firebase";
import Loader from "../components/loader";

const Intro = (props) => {
  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }

  if (props.authState === authStates.LOGGED_OUT) {
    return <Redirect to="/logowanie"></Redirect>;
  }
  return (
    <>
      <div className="intro">
        <h1 className="wstep">Witamy w pomocniku kulinarnym!</h1>
        <ul>
          Przed Tobą aplikacja, która służy jako niezastąpione wsparcie w
          kuchni.
        </ul>
        <ul>
          Znajdziesz tutaj funkcję do wyszukiwania przepisów za pomocą wybranych
          składników, zalecenia i porady odnośnie gotowania wielu produktów oraz
          narzędzie służące do odliczania czasu
        </ul>
        <ul>
          W trakcie gotowania pamiętaj o tym, że:
          <li>
            każdy rodzaj mięsa możesz zastąpić innym rodzajem mięsa (np.
            polędwicę wieprzową piersią z kurczaka)
          </li>
          <li>
            możesz zmieniać ilość składników w przepisach zachowując ich
            proporcje
          </li>
        </ul>
      </div>
    </>
  );
};

export default withAuth(Intro);
