import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { spacing } from '@mui/system';


export default function Input(){
const [open, setOpen] = React.useState(false);
const [error, setError] = React.useState(false);
const [value, setValue] = React.useState(null);


const handleClickOpen = () => {
  setOpen(true);
};

  return (
    <div>
      <Box
        sx={{
          mx: 'auto',
          width: 150,
          p: 1,
          ml: 68, 
          textAlign: 'center',
          fontSize: 60,
          fontFamily: "Monospace",
          
        }}
      >
        <Button variant="contained" onClick={handleClickOpen}>
          SUBMIT
        </Button>
      </Box>
    </div>
  );
}
