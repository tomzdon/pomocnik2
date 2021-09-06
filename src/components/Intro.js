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
        <h1 className="wstep">Witamy w Mobilnej Książce Kucharskiej!</h1>
        <ul>
          Przed Tobą aplikacja, która służy jako niezastąpione narzędzie w kuchni.
        </ul>
        <ul>
          Znajdziesz tutaj funkcję do wyszukiwania przepisów za pomocą wybranych
          składników, zalecenia i porady odnośnie przygotowywania wielu produktów oraz
          minutnik.
        </ul>

        <br/>
        <br/>
      <ul>
        W trakcie gotowania pamiętaj o tym, że:
      </ul>
        <ul>
            1. Każdy rodzaj mięsa możesz zastąpić innym rodzajem mięsa (np.
            polędwicę wieprzową piersią z kurczaka).
        </ul>
        <ul>
            2. Możesz zmieniać ilość składników w przepisach zachowując ich
            proporcje.
        </ul>
        <ul>
            3. Nie obawiaj sie eksperymentować.
        </ul>
        <ul>
            4. Nie zawsze to co smaczne, musi pięknie wyglądać.
        </ul>
      </div>
    </>
  );
};

export default withAuth(Intro);
