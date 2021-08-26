import React, { useState } from "react";
import Countdown from "react-countdown";
import { Container, Button, TextField } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { authStates, withAuth } from "../auth";
import Loader from "../loader";
import { Redirect } from "react-router-dom";
import useSound from "use-sound";
import beep from "../../assets/alarm.mp3";

const CounterDown = (props) => {
  const [start, setStart] = useState(false);
  const [value, setValue] = useState(0);
  const [play, { stop }] = useSound(beep);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      play();
      return "Czas minął";
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  const handleClick = () => {
    if (value > 0) {
      setStart((prev) => !prev);
    } else {
      return "Błędna wartość";
    }
  };

  const handleStop = () => {
    stop();
    setStart((prev) => !prev);
  };

  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }

  if (props.authState === authStates.LOGGED_OUT) {
    return <Redirect to="/logowanie"></Redirect>;
  }

  return (
    <Container className="timer" maxWidth="sm">
      <div className="text">
        <h2> Funkcja minutnika:</h2>
      </div>
      <Card className="list">
        <div>
          <label style={{ marginTop: "20px" }}>
            Wpisz czas do odliczenia w minutach
          </label>
          <br />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            name="czas"
            type="number"
            min="0"
          />
        </div>

        <div>
          {start && (
            <Countdown
              date={Date.now() + value * 60 * 1000}
              renderer={renderer}
            />
          )}
        </div>

        <div className="start">
          <Button onClick={handleClick} variant="contained" color="primary">
            Start
          </Button>
          <Button
            onClick={handleStop}
            style={{ marginLeft: "10px" }}
            variant="contained"
            color="primary"
          >
            Stop
          </Button>
        </div>
      </Card>
    </Container>
  );
};
export default withAuth(CounterDown);
