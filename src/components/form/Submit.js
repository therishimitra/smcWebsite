import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';
import NameInput from './NameInput'; 
//import AirtableAPI from "../AirtableAPI";

////////////////////////////////////////////API//////////////////////////////////////////////////////////
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('appnYYXKxbNxYmalz');

base('Events').create([
  {
    "fields": {
      "Event Name": "TEST",
      "Start Time": "2021-11-23T14:00:00.000Z",
      "Proposed End Time": "2021-11-23T15:00:00.000Z",
      "🚪 Room(s)": [
        "124 SMC (Edit 4)"
      ],
      "Class": [
        "recvOZ6BIE4yb6y8q"
      ],
      "Event Type": "Class 📚",
      "Faculty": [
        "Faculty 1"
      ],
      "Students": [
        "recAXAHAZV2zjzm41"
      ],
      "Status": "Booked ✅"
    }
  },

  {"fields": {
    "Event Name": "TEST",
    "Start Time": "2021-11-23T14:30:00.000Z",
    "Proposed End Time": "2021-11-23T16:00:00.000Z",
    "🚪 Room(s)": [
      "104 SMC (Classroom)"
    ],
    "Class": [
      "recuBEQ8CyKCIW8JN"
    ],
    "Event Type": "Class 📚",
    "Faculty": [
      "rec2mdimTDkynR5qz"
    ],
    "Status": "Booked ✅",
    "Location": [
      "recAQPTqQbRmFc9Oe"
    ],
    "For a Class?": true,
    "Intent of Use": "Academic 🎓"
  }
}
], function(err, records) {
if (err) {
  console.error(err);
  return;
}
records.forEach(function (record) {
  console.log(record.getId());
});
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

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

          <Button variant="contained" onClick={handleClickOpen}>
          SUBMIT
          </Button> 
        </Box>
    


      </Modal>
    </div>
  );
}