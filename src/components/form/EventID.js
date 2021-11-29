import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function EventID() {
  const [error, setError] = React.useState(false);
  const [eventID, setEventID] = React.useState([]);

  const handleClickOpen = () => {
    setError(true);
  };

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
          <Button variant="contained" onClick={handleClickOpen}>
            confirm
          </Button>
        </Box>
      </Grid>
    </Grid>
    </Box>
  );
}
