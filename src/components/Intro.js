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
          Przed Tobą aplikacja, która służy jako niezastąpione narzędzie w kuchni.
        </ul>
        <ul>
          Znajdziesz tutaj funkcję do wyszukiwania przepisów za pomocą wybranych
          składników, zalecenia i porady odnośnie przygotowywania wielu produktów oraz
          minutnik.
        </ul>

        W trakcie gotowania pamiętaj o tym, że:
        <div>
        <ol>

          <li>
            Każdy rodzaj mięsa możesz zastąpić innym rodzajem mięsa (np.
            polędwicę wieprzową piersią z kurczaka).
          </li>
          <li>
            Możesz zmieniać ilość składników w przepisach zachowując ich
            proporcje.
          </li><li>
            Nie obawiaj sie eksperymentować.
          </li><li>
            Nie zawsze to co smaczne, musi pięknie wyglądać.
          </li>
        </ol>
      </div>
      </div>
    </>
  );
};

export default withAuth(Intro);
