import React from 'react'
import SlideCalendar from '../components/slideCalendar';
import SlideMessage from '../components/slideMessage';
import NameInput from '../components/form/NameInput';
import EventDetailsInput from '../components/form/EventDetailsInput';
import RoomSelection from '../components/form/RoomSelection';
import TimeInput from '../components/form/TimeInput';
import GearCheckOut from '../components/form/GearCheckOut';
import CourseInput from '../components/form/CourseInput';
import OptionToUpdate from '../components/form/OptionToUpdate';
import FormActions from '../components/form/FormActions';
import EventID from '../components/form/EventID';

import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import Grow from '@mui/material/Grow';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomBtn from '../components/customBtn'
import FormLabel from "@mui/material/FormLabel";
import CommentIcon from '@mui/icons-material/Comment'; 
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Grid from '@mui/material/Grid';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Submit from '../components/form/Submit';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const peopleAllInfo = [];
const SMCpeople = [];
const facultyList = [];

const RecordingStudioRoomsList = [];
const RecordingStudioRoomsIDs = [];

const RehearsalRoomsList = [];
const RehearsalRoomsIDs = [];

const ECRoomsList = [];
const ECRoomsIDs = [];

///////////////////////////////////////////             ///////////////////////////////////////////
///////////////////////////////////////////  API CALLS  ///////////////////////////////////////////
///////////////////////////////////////////             ///////////////////////////////////////////

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyn6GGT4mwqMtlaF'}).base('appYke0X4d4wy6GUx');
var x=0;
///////////////////////Pulling records from SMC People///////////////////////
base('SMC People').select({
    view: "ALL PEOPLE"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      
      
      SMCpeople.push( {name: record.get('Person'), id: record.id});
      peopleAllInfo[x] = {id: record.id, name: record.get('Person'), roomAccess: record.get('Room Access'), gearAccess: record.get('Gear Access')} ;
      x=x+1;
      
      if(record.get('Role').includes('Faculty/Staff 🎓'))
      {
        facultyList.push(record.get('Person'));
      }

        //console.log(x,'Retrieved', record.get('Person'), record)
        //console.log(x,'Retrieved', record.get('Person'), record.get('Room Access'), record.get('Gear Access'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

//peopleAllInfo.forEach(element => console.log(element));

// console.log(peopleAllInfo[2].lendLevel)
console.log(peopleAllInfo[0])
//console.log((SMCpeople[0]))
//console.log(typeof(SMCpeople))
//console.log(peopleAllInfo[0].name)


/////////////////////////////////////////// Pulling Records from Rooms  ///////////////////////////////////////////

//Recording Studio:

base('Rooms').select({
    view: "Bookable Rooms 🔒 (Studio Booking Form)"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {

      RecordingStudioRoomsList.push( {key: record.id, name: record.get('Name') });
        
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

//Rehearsal Rooms:

base('Rooms').select({
    view: "Bookable Rooms 🔒 (Rehearsal Booking Form)"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        
      RehearsalRoomsList.push({key: record.id, name: record.get('Name') });
        
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});


//Edit and Collab:

base('Rooms').select({
    view: "Bookable Rooms 🔒 (Edit and Collab Booking Form)-devTeam"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        
        ECRoomsList.push({key: record.id, name: record.get('Name') });
        
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

//var userSelected;
//var disabledRoomTypes;

function Home() {

    // main input data
    const [userSelected, setUserSelected] = React.useState([]); 
    const [sessionTitle, setSessionTitle] = React.useState([]);
    const [eventTypeSelected, setEventTypeSelected] = React.useState([]);
    const [facultySelected, setFacultySelected] = React.useState([]);
    const [usageSelected, setUsageSelected] = React.useState([]);
    const [roomTypeSelected, setRoomTypeSelected] = React.useState([]);
    const [roomSelected, setRoomSelected] = React.useState([]); 
    const [startTimeSelected, setStartTimeSelected] = React.useState([]); 
    const [endTimeSelected, setEndTimeSelected] = React.useState([]); 
    const [courseSelected, setCourseSelected] = React.useState([]);
    const [gearSelected, setGearSelected] = React.useState([]); 

    // supportive input data
    const [userCount, setUserCount] = React.useState(0);
    const [disabledRoomTypes, setDisabledRoomTypes] = React.useState([]); 
    const [timeCorrect, setTimeCorrect] = React.useState(false);
    const [gearList, setGearList] = React.useState([]);

    // form action
    const [newEvent, setNewEvent] = React.useState(false);
    const [updateEvent, setUpdateEvent] = React.useState(false);
    const [CancelEvent, setCancelEvent] = React.useState(false);

    const nameInput = (
        <Paper sx={{ maxWidth: 700, width: "90%", my: 2, mx: 'auto', p: 2}}>
        <Box
        sx={{
          textAlign: "left",
          m: 2,
          fontSize: 22,
          lineHeight: 2
        }}
      >
        Who's booking?
        <br />
        <FormLabel component="legend">
            i.e. takes all responsibility!
          </FormLabel>
        </Box>
         <NameInput 
         peopleAllInfo={peopleAllInfo} 
         setUserSelected={setUserSelected} 
         setUserCount={setUserCount} 
         setDisabledRoomTypes={setDisabledRoomTypes}
         setGearList={setGearList}/>
        </Paper>  
        
    );
    
    const eventDetailsInput = (
        <Paper sx={{ maxWidth: 700, width: "90%", my: 2, mx: 'auto', p: 2 }}>
        <Box
        sx={{
          textAlign: "left",
          m: 2,
          fontSize: 22,
          lineHeight: 2
        }}
      >  Event Details
      </Box>

        <EventDetailsInput 
        facultyList = {facultyList}
        setSessionTitle={setSessionTitle}
        setEventTypeSelected={setEventTypeSelected}
        setFacultySelected={setFacultySelected}
        setUsageSelected={setUsageSelected}
        />
        <br />
        </Paper>
    );

    const roomInput = (
        <Paper sx={{ maxWidth: 700, width: "90%", my: 2, mx: 'auto', p: 2 }}>
        <Box
        sx={{
          textAlign: "left",
          m: 2,
          fontSize: 22,
          lineHeight: 2
        }}
        >  Room Selection
        <Grid container spacing={1}>
        <Grid item xs={1}>
        <Box sx={{fontSize: 20,lineHeight: 1.5}}>
        📌 
        </Box>
        </Grid>
        <Grid item xs={11}>
            <FormLabel component="legend">
            If the Edit & Collaboration Spaces is selected, option to add gear(s) to your booking will be available at the end of the form :)
            </FormLabel>
        </Grid>
        </Grid>
        </Box>
        <RoomSelection 
        roomOptionStudio={RecordingStudioRoomsList} 
        roomOptionRehearsal={RehearsalRoomsList} 
        roomOptionECspace={ECRoomsList} 
        disabledRoomTypes={disabledRoomTypes}
        setRoomTypeSelected={setRoomTypeSelected}
        setRoomSelected={setRoomSelected}
        />
        <br />
        </Paper>
    );

    const timeInput = (
        <Paper sx={{ maxWidth: 700, width: "90%", my: 2, mx: 'auto', p: 2 }}>
        <Box
        sx={{
          textAlign: "left",
          m: 2,
          fontSize: 22,
          lineHeight: 2
        }}
        >  Session Time
        <Grid container spacing={1}>
        <Grid item xs={1}>
        <Box sx={{fontSize: 20,lineHeight: 1.5}}>
        📌 
        </Box>
        </Grid>
        <Grid item xs={11}>
            <FormLabel component="legend">
            Based on the your chosen Session Time, we wil notify you with the availability of the room(s) selected above. 
            </FormLabel>
        </Grid>
        </Grid>
        </Box>
        <TimeInput 
        setStartTimeSelected={setStartTimeSelected}
        setEndTimeSelected={setEndTimeSelected}
        setTimeCorrect={setTimeCorrect}
        />
        <br />
         </Paper>
    );
    
    const courseInput = (
        <Paper sx={{ maxWidth: 700, width: "90%", my: 2, mx: 'auto', p: 2 }}>
        <CourseInput setCourseSelected={setCourseSelected}/>
        <br />
         </Paper>
    );

    const gearInput = (
        <Paper sx={{ maxWidth: 700, width: "90%", my: 2, mx: 'auto', p: 2 }}>
        <GearCheckOut 
        setGearSelected={setGearSelected}
        gearList={gearList}
        />
        <br />
         </Paper>
    );
    

    const SMChours = (
        <Paper variant="outlined" sx={{ maxWidth: 700, width: "90%", my: 2, mx: 'auto', p: 2 }}>
        <Box
        sx={{
          textAlign: "center",
          m: 1,
          fontSize: 22,
          lineHeight: 2
        }}
        >  
        SMC Hours & Availability
        </Box>
        <Box
        sx={{
          mt: -5,
          ml: 6,
          textAlign: "left",
          fontSize: 17,
          lineHeight: 2
        }}
        >  
        <br />
        <Grid container>
        <Grid item xs={7}>
        <b>Monday — Friday: </b><li>8:00 AM — Midnight</li>
        </Grid>
        <Grid item xs="auto">
        <b>Saturday & Sunday: </b><li>12:00 PM — Midnight</li>
        </Grid>
        </Grid>
        </Box>
        
         </Paper>
    );

    const formActions = (
      //<Paper sx={{ maxWidth: 700, width: "90%", my: 2, mx: 'auto', p: 2 }}>
      <Box m="auto" sx={{ maxWidth: 700, width: "90%"}}>
      <FormActions 
      setNewEvent={setNewEvent}
      setUpdateEvent={setUpdateEvent}
      setCancelEvent={setCancelEvent}
      />
      
      <br />
      </Box>
  );

    const requestEventID = (
        <Paper sx={{ maxWidth: 700, width: "90%", my: 2, mx: 'auto', p: 2 }}>
        <Box
        sx={{
          textAlign: "left",
          m: 1,
          fontSize: 20,
          lineHeight: 1.5
        }}
        > 
        <Grid container alignItems="flex-start" spacing={1}>
        <Grid item xs={1}>
        📌
        </Grid>
        <Grid item xs={11}>
            <FormLabel component="legend">
            Please enter the Event Record ID you recieved in the confirmation email before proceeding to the rest of the form.
            </FormLabel>
        </Grid>
        </Grid>
        </Box>
        <Box m= "auto" sx={{ my: 2,display: "flex", alignItems: "center"}} >
        <EventID />
        </Box>
         </Paper>
    );
    
    return(  

        <div>
            <SlideMessage/>
            <SlideCalendar/>
            
            <Fade in={true}>{SMChours}</Fade>
            
            <Fade in={true}>{formActions}</Fade>

            {(updateEvent) && <Grow in={(updateEvent)}>{requestEventID}</Grow>}
            {(CancelEvent) && <Grow in={(CancelEvent)}>{requestEventID}</Grow>}
            
            <Grow in={(newEvent || updateEvent || CancelEvent)}>{nameInput}</Grow>

            {(userCount > 0) && <Grow in={userCount > 0}>{eventDetailsInput}</Grow>}
            
            {(userCount > 0) && <Grow in={userCount > 0}>{roomInput}</Grow>}
   
            {(userCount > 0) && <Grow in={userCount > 0}>{timeInput}</Grow>}

            <Grow in={(newEvent || updateEvent || CancelEvent)}>{courseInput}</Grow>
            <Grow in={(newEvent || updateEvent || CancelEvent)}>{gearInput}</Grow>

            <div>
            {(newEvent || updateEvent || CancelEvent) &&
            <Submit
            userSelected={userSelected}
            sessionTitle={sessionTitle}
            eventTypeSelected={eventTypeSelected}
            facultySelected={facultySelected}
            usageSelected={usageSelected}
            roomTypeSelected={roomTypeSelected}
            roomSelected={roomSelected}
            startTimeSelected={startTimeSelected}
            endTimeSelected={endTimeSelected}
            courseSelected={courseSelected}
            gearSelected={gearSelected}
            timeCorrect={timeCorrect}
            setUserCount={setUserCount}
            />}
            <br />
            </div>
        
           
        </div>

 

    ) 
   
}

export default Home