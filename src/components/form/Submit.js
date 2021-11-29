import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';
import NameInput from './NameInput'; 
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import AirtableAPI from "../AirtableAPI";

//create global variables here

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: '#e7dcc8',
  outline:0, 
  boxShadow: 20,
  p: 4,
  color: '#191b1d',
};


export default function BasicModal({userSelected, 
                                    sessionTitle,
                                    eventTypeSelected,
                                    facultySelected,
                                    usageSelected,
                                    roomTypeSelected,
                                    roomSelected,
                                    startTimeSelected,
                                    endTimeSelected,
                                    courseSelected,
                                    gearSelected,
                                    timeCorrect}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    <AirtableAPI/> 

    //set user count to 0 
  };

  const handleClear = () => {
    setOpen(true);
    <AirtableAPI/> 

    //called after everything is checked after everything has been checked  
  };


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        SUBMIT
      </Button>   

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submission Successful!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please check your inbox for booking confirmation.
          </Typography>

          

        </Box>

      </Modal>
    </div>
  );
}