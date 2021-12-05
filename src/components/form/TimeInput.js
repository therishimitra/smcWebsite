import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import MuiAlert from '@mui/material/Alert';

import Snackbar from '@mui/material/Snackbar'; //test

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" horizontal="center" {...props} />;
});

export default function DateTimeValidation({setTimeCorrect,
                                            setStartTimeSelected, 
                                            setEndTimeSelected}) {
  const [startValue, setSartValue] = React.useState(null);
  const [endValue, setEndValue] = React.useState(null);
  const [invalidTime, setInvalidTime] = React.useState(false);
  const [invalidFormat, setInvalidFormat] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  }

  const EndTimeCheck = () => {
    

    if (StartTime > EndTime) {
      setInvalidTime(true);
      setTimeCorrect(false);
    }
    else {
      setInvalidTime(false);
      setTimeCorrect(true);
      setStartTimeSelected(StartTime);
      setEndTimeSelected(EndTime);
    }

    if (StartTime === "NaN-NaN-NaNTNaN:NaN:00.000z" || EndTime === "NaN-NaN-NaNTNaN:NaN:00.000z") setInvalidFormat(true);
    else setInvalidFormat(false);

      return (
        <div>
          {invalidTime && 
            <Snackbar open={invalidTime} autoHideDuration={10} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert severity="error">Proposed end time should not exceed start time!</Alert>
            </Snackbar>
          }
          {invalidFormat && 
            <Snackbar open={invalidFormat} autoHideDuration={10} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert severity="error">Time format invalid!</Alert>
            </Snackbar>
          }
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
              minDate={new Date()}
              minTime={new Date(0, 0, 0, 8)}
              maxTime={new Date(0, 0, 0, 23, 59)}
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
              minTimeMessage
              maxTimeMessage
              minDate={new Date()}
              minTime={new Date(0, 0, 0, 8)}
              maxTime={new Date(0, 0, 0, 23, 59)}
              clearable={true}
            />
          </FormControl>
        </div>
      </Stack>
      <EndTimeCheck />
    </LocalizationProvider>
  );
}
