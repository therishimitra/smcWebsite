import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar'; //test

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyGJts1v9eIz3Dki'}).base('appqapwXvgL64Efox');
//({apiKey: 'keyn6GGT4mwqMtlaF'}).base('appYke0X4d4wy6GUx'); // real base

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" horizontal="center" {...props} />;
});

export default function EventID({error, setError, eventID, setEventID, goodID, setGoodID}) {

  const [successMsg, setSuccessMsg] = React.useState(false);

  const handleCheckID = () => {

    base('Events').find(eventID, function(err, record) {
      if (err) { 
        console.error(err); 
        setError(true);
        setGoodID(false);
      } else {
        setError(false);
        setGoodID(true);
        setSuccessMsg(true);
      }
      return; 
  
    });   
  };

  const handleRealClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMsg(false);
  }

  return (
    <Box m= "auto" sx={{ display: "flex", alignItems: "center"}} >
    <Grid container spacing={1}>
      <Grid item>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: 300 }
          }}
          noValidate
          autoComplete="off"
        >
          {error && (
            <TextField
              error
              label="Error"
              helperText="ID does not exist in the system :("
              value={eventID}
              size="small"
              onChange={(event) => {
                setEventID(event.target.value);
                console.log(event.target.value);
              }}
            />
          )}
          {!error && (
            <TextField
              label="Event Record ID"
              value={eventID}
              size="small"
              onChange={(event) => {
                setEventID(event.target.value);
                console.log(event.target.value);
              }}
            />
          )}
        </Box>
      </Grid>
      <Grid item alignItems="stretch" style={{ display: "flex" }}>
        <Box
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "left" }}
        >
          <Button variant="contained" onClick={handleCheckID}>
            confirm
          </Button>
          {successMsg && 
            <Snackbar open={successMsg} autoHideDuration={2000} onClose={handleRealClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert severity="success">Your booking record was found! Please fill up the form to make changes :)</Alert>
            </Snackbar>
          }
        </Box>
      </Grid>
    </Grid>
    </Box>
  );
}
