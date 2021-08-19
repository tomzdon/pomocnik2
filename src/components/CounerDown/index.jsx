import React, { useState } from "react";
import Countdown from "react-countdown";
import { Container, Button, TextField } from "@material-ui/core";
import { Card } from "@material-ui/core";

export const CounerDown = () => {
  const [start, setStart] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    let input = e.target.value;
    if (
      !input ||
      (input[input.length - 1].match("[0-9]") && input[0].match("[1-9]"))
    )
      setValue(input);
  };

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

  return (
    <Container maxWidth="md" style={{ marginTop: 50 }}>
      <Card className="list">
        <TextField
          value={value}
          onChange={handleChange}
          name="czas"
          type="number"
          label="Czas minutnika w sekundach"
        />
        <Button onClick={() => setStart((prev) => !prev)} variant="contained">
          Start
        </Button>
        {start && (
          <Countdown date={Date.now() + value * 1000} renderer={renderer} />
        )}
      </Card>
    </Container>
  );
};
