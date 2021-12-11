import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import MuiAlert from '@mui/material/Alert';

import Snackbar from '@mui/material/Snackbar'; //test

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// This will be used to store input data
var StartTime;
var EndTime;
var unavailableRoom;

function ISODateString(d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  if (d === null) return null;

  console.log(d.getHours());

  return (
    d.getUTCFullYear() +
    "-" +
    pad(d.getUTCMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    "T" +
    pad(d.getHours()) +
    ":" +
    pad(d.getUTCMinutes()) +
    ":" +
    "00.000Z"
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" horizontal="center" {...props} />;
});

export default function DateTimeValidation({setTimeCorrect,
                                            setStartTimeSelected, 
                                            setEndTimeSelected,
                                            roomBookingRecord}) {
  const [startValue, setSartValue] = React.useState(null);
  const [endValue, setEndValue] = React.useState(null);
  const [invalidTime, setInvalidTime] = React.useState(false);
  const [invalidFormat, setInvalidFormat] = React.useState(false);
  const [roomUnavailable, setRoomUnavailable] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState(false);

  const handleFakeClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  }

  const handleRealClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMsg(false);
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

    if (StartTime === "NaN-NaN-NaNTNaN:NaN:00.000z" || EndTime === "NaN-NaN-NaNTNaN:NaN:00.000z") {
      setInvalidFormat(true);
      setTimeCorrect(false);
    } 
    else { 
      setInvalidFormat(false);    
      if (roomBookingRecord.length !== 0 && StartTime && EndTime) {

        var realEndTime = new Date(EndTime);
        realEndTime.setHours(realEndTime.getHours() + 1);
        realEndTime = realEndTime.toISOString();

        var conflictFound = false;
        
        for (var i = 0; !conflictFound && (i < roomBookingRecord.length); i++) {
          for (var j = 0; !conflictFound && (j < roomBookingRecord[i].eventStart.length); j++){

              // User selected time is covering and existing session 
              if ((StartTime < roomBookingRecord[i].eventStart[j]) && (realEndTime > roomBookingRecord[i].eventEnd[j])) {
                conflictFound = true;
                unavailableRoom = roomBookingRecord[i].name;
                break;
              } 
              // User selected start time is during an existing session 
              else if ((StartTime > roomBookingRecord[i].eventStart[j]) && (StartTime < roomBookingRecord[i].eventEnd[j])) {
                conflictFound = true;
                unavailableRoom = roomBookingRecord[i].name;
                break;
              }
              // User selected end time is during an existing session 
              else if ((realEndTime > roomBookingRecord[i].eventStart[j]) && (realEndTime < roomBookingRecord[i].eventEnd[j])) {
                conflictFound = true;
                unavailableRoom = roomBookingRecord[i].name;
                break;
              }
          }
        }

        if (conflictFound) {
          setRoomUnavailable(true);
          setSuccessMsg(false);
          setTimeCorrect(false);
        } else {
          setRoomUnavailable(false);
          setSuccessMsg(true);
          setTimeCorrect(true);
        }
        
      }
    }
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
                setTimeCorrect(false);
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
                setTimeCorrect(false);
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

      <Box justifyContent="center" alignItems="center">
        <br /><Button variant="contained" onClick={EndTimeCheck}>check availability</Button>
      </Box>
      <div>
        {invalidTime && 
          <Snackbar open={invalidTime} autoHideDuration={10} onClose={handleFakeClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="error">Proposed end time should not exceed start time!</Alert>
          </Snackbar>
        }
        {invalidFormat && 
          <Snackbar open={invalidFormat} autoHideDuration={10} onClose={handleFakeClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="error">Time format invalid!</Alert>
          </Snackbar>
        }
        {roomUnavailable && 
          <Snackbar open={roomUnavailable} autoHideDuration={10} onClose={handleFakeClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="error">{unavailableRoom} is not available at inputted time!</Alert>
          </Snackbar>
        }
        {successMsg && 
          <Snackbar open={successMsg} autoHideDuration={2000} onClose={handleRealClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="success">Room availability is good at inputted time</Alert>
          </Snackbar>
        }
      </div>
    </LocalizationProvider>

  );
}
