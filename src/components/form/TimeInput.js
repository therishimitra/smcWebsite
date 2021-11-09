import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";

// This will be used to store input data
var StartTime;
var EndTime;

function ISODateString(d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  if (d === null) return null;

  console.log(d.getUTCHours());
  if (d.getUTCHours() < 4) {
    return (
      d.getUTCFullYear() +
      "-" +
      pad(d.getUTCMonth() + 1) +
      "-" +
      pad(d.getUTCDate()) +
      "T" +
      pad(d.getUTCHours() + 20) +
      ":" +
      pad(d.getUTCMinutes()) +
      ":" +
      "00.000z"
    );
  } else {  
    return (
      d.getUTCFullYear() +
      "-" +
      pad(d.getUTCMonth() + 1) +
      "-" +
      pad(d.getUTCDate()) +
      "T" +
      pad(d.getUTCHours() - 4) +
      ":" +
      pad(d.getUTCMinutes()) +
      ":" +
      "00.000z"
    );
  }
}

export default function DateTimeValidation() {
  const [startValue, setSartValue] = React.useState(null);
  const [endValue, setEndValue] = React.useState(null);
  const [invalidTime, setInvalidTime] = React.useState(false);

  const TimeCheck = () => {
    if (StartTime > EndTime) setInvalidTime(true);
    else setInvalidTime(false);
    return (
      <div>
        {invalidTime && <p>Error: proposed end time shold exceed start time</p>}
      </div>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1}>
        <div>
          <FormControl sx={{ m: 1, width: 400 }}>
            <DateTimePicker
              clearable
              placeholder="Enter time"
              renderInput={(params) => <TextField {...params} />}
              label="Event start time"
              value={startValue}
              onChange={(newValue) => {
                setSartValue(newValue);
                StartTime = ISODateString(newValue);
                console.log(StartTime);
              }}
              minDateTime={new Date()}
            />
          </FormControl>
        </div>

        <div>
          <FormControl sx={{ m: 1, width: 400 }}>
            <DateTimePicker
              renderInput={(params) => <TextField {...params} />}
              label="Proposed end time"
              value={endValue}
              onChange={(newValue) => {
                setEndValue(newValue);
                EndTime = ISODateString(newValue);
                console.log(EndTime);
              }}
              minDate={new Date()}
              clearable={true}
            />
          </FormControl>
        </div>
      </Stack>
      <TimeCheck />
    </LocalizationProvider>
  );
}
