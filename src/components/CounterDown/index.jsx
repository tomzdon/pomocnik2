import React, { useState } from "react";
import Countdown from "react-countdown";
import { Container, Button, TextField } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { authStates, withAuth } from "../auth";
import Loader from "../loader";

const CounterDown = (props) => {
  const [start, setStart] = useState(false);
  const [value, setValue] = useState(0);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return "Czas minął";
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  if (props.authState === authStates.INITIAL_VALUE) {
    return <Loader />;
  }
  return (
    <Container className="timer" maxWidth="sm">
      <div className="text">
        <h2> Funkcja minutnika:</h2>
      </div>
      <Card className="list">
        <div>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            name="czas"
            type="number"
            label="Wpisz czas do odliczenia w minutach"
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
          <Button
            onClick={() => setStart((prev) => !prev)}
            variant="contained"
            color="primary"
          >
            Start
          </Button>
        </div>
      </Card>
    </Container>
  );
};
export default withAuth(CounterDown);
