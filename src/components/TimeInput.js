import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";

// This will be used to store input data
var StartTime;
var EndTime;

function ISODateString(d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  if (d === null) return null

  if (d.getUTCHours() < 5) {
    return (
      d.getUTCFullYear() +
      "-" +
      pad(d.getUTCMonth() + 1) +
      "-" +
      pad(d.getUTCDate()) +
      "T" +
      pad(d.getUTCHours() + 19) +
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
      pad(d.getUTCHours() - 5) +
      ":" +
      pad(d.getUTCMinutes()) +
      ":" +
      "00.000z"
    );
  }
}



export default function DateTimeValidation() {
  const [startValue, setSartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());

  const TimeCheck = () => {
    var invalidTime;
    if (StartTime < EndTime) invalidTime = false
    else invalidTime = true;
    return <div>{invalidTime && <p>Error: proposed end time shold exceed start time</p>}</div>
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          toolbarPlaceholder = "Enter time"
          renderInput={(params) => <TextField {...params} />}
          label="Pick the start time"
          value={startValue}
          onChange={(newValue) => {
            setSartValue(newValue);
            StartTime = ISODateString(newValue);
          }}
          minDateTime={new Date()}
        />
        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Pick the end time"
          value={endValue}
          onChange={(newValue) => {
            setEndValue(newValue);
            EndTime = ISODateString(newValue);
          }}
          minDate={new Date()}
          clearable={true}
        />
      </Stack>
      <TimeCheck/>
    </LocalizationProvider>
  );
}

