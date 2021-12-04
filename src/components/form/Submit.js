import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';  
import NameInput from './NameInput'; 
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import AirtableAPI from "../AirtableAPI";
import { styled } from "@mui/styles";

const SubmitButton = styled(Button)({
  background: "linear-gradient(45deg, #ffd06a 30%, #fded2d 90%)",
  border: 0,
  borderRadius: 4,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px"
});


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

function CreateRecord(users,
                      sessionTitle,
                      eventTypeSelected,
                      facultySelected,
                      usageSelected,
                      roomTypeSelected,
                      roomSelected,
                      startTimeSelected,
                      endTimeSelected,
                      courseSelected,
                      gearSelected) {

  var Airtable = require('airtable');
  var base = new Airtable({apiKey: 'keyGJts1v9eIz3Dki'}).base('appqapwXvgL64Efox');

  base('Events').create([
    {
      "fields": {
        "Event Name": sessionTitle, //Need to be changed for a new record to be created
        "Start Time": startTimeSelected,
        "Proposed End Time": endTimeSelected,
        "🚪 Room(s)": roomSelected,
        "Class": [],
        "Event Type": eventTypeSelected,
        "Faculty": [],
        "Students": users,
        "Status": "Booked ✅"
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
  


}


export default function Submit({userSelected, setUserSelected,
                                sessionTitle, setSessionTitle,
                                eventTypeSelected, setEventTypeSelected,
                                facultySelected, setFacultySelected,
                                usageSelected, setUsageSelected,
                                roomTypeSelected, setRoomTypeSelected,
                                roomSelected, setRoomSelected,
                                startTimeSelected, setStartTimeSelected,
                                endTimeSelected, setEndTimeSelected,
                                courseSelected, setCourseSelected,
                                gearSelected, setGearSelected,

                                eventID, setEventID,
                                newEvent, setNewEvent,
                                updateEvent, setUpdateEvent,
                                CancelEvent, setCancelEvent,
                                timeCorrect,
                                setUserCount,
                                setAddCourse,
                                setAddGear
                                }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState(null);

  const handleSubmit = () => {
    setOpen(true);
    console.log(userSelected.id);
    var users = [];
    userSelected.forEach(function(obj){
        users.push(obj.id);
    })

    //<AirtableAPI/> 
    CreateRecord(
      users,
      sessionTitle,
      eventTypeSelected,
      facultySelected,
      usageSelected,
      roomTypeSelected,
      roomSelected,
      startTimeSelected,
      endTimeSelected,
      courseSelected,
      gearSelected);
      

    console.log("checking error");

  };

  const handleClear = () => {
    setOpen(true);
    //<AirtableAPI/> 

    //called after everything is checked after everything has been checked  
  };

  const handleClose = () => {
    // Clears all form fields
    // event record data
    setUserSelected();
    setSessionTitle();
    setEventTypeSelected();
    setFacultySelected();
    setUsageSelected();
    setRoomTypeSelected();
    setRoomSelected([]);
    setStartTimeSelected();
    setEndTimeSelected();
    setCourseSelected();
    setGearSelected();
    setEventID();

    // form actions
    setNewEvent();
    setUpdateEvent();
    setCancelEvent();

    // other display related variables
    setUserCount();
    setAddCourse();
    setAddGear();

    setOpen(false); 
  }


  return (
    <div>
      <formCompletionCheck/>
      <SubmitButton 
      variant="contained" 
      disabled={!(sessionTitle && roomTypeSelected && endTimeSelected && startTimeSelected)}
      onClick={handleSubmit}>
        SUBMIT
      </SubmitButton>   

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