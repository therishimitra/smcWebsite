import React from 'react'
import SlideCalendar from '../components/slideCalendar';
import SlideMessage from '../components/slideMessage';
import NameInput from '../components/form/NameInput';
import nameEntered from '../components/form/NameInput';
import EventDetailsInput from '../components/form/EventDetailsInput';
import RoomSelection from '../components/form/RoomSelection';
import TimeInput from '../components/form/TimeInput';
import GearCheckOut from '../components/form/GearCheckOut';
import CourseInput from '../components/form/CourseInput';
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

var x = 0 //counting number of records pulled using x
const SMCpeople = [];
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyn6GGT4mwqMtlaF'}).base('appYke0X4d4wy6GUx');
base('SMC People').select({
    view: "ALL PEOPLE"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      
      
      SMCpeople.push( {name: record.get('Person'), id: x + 1});
      x = x + 1;
        
        //console.log(x,'Retrieved', record.get('Person'), record)
        //console.log(x,'Retrieved', record.get('Person'), record.get('Room Access'), record.get('Lending Level'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////

function Home() {

    const [userCount, setUserCount] = React.useState(0);

    const nameInput = (
        <Paper sx={{ maxWidth: 700, width: 700, my: 2, mx: 'auto', p: 2 }}>
         <NameInput SMCpeople={SMCpeople} setUserCount={setUserCount}/>
        </Paper>
    );

    const eventDetailsInput = (
        <Paper sx={{ maxWidth: 700, width: 700, my: 2, mx: 'auto', p: 2 }}>
        <Box
        sx={{
          textAlign: "left",
          m: 2,
          fontSize: 22,
          fontFamily: "Monospace",
          lineHeight: 2
        }}
      >  Event Details
      </Box>

        <EventDetailsInput />
        <br />
        </Paper>
    );

    const roomInput = (
        <Paper sx={{ maxWidth: 700, width: 700, my: 2, mx: 'auto', p: 2 }}>
        <Box
        sx={{
          textAlign: "left",
          m: 2,
          fontSize: 22,
          fontFamily: "Monospace",
          lineHeight: 2
        }}
        >  Room Selection
        </Box>
        <RoomSelection />
        <br />
        </Paper>
    );

    const timeInput = (
        <Paper sx={{ maxWidth: 700, width: 700, my: 2, mx: 'auto', p: 2 }}>
        <Box
        sx={{
          textAlign: "left",
          m: 2,
          fontSize: 22,
          fontFamily: "Monospace",
          lineHeight: 2
        }}
        >  Event Time
        </Box>
        <TimeInput />
        <br />
         </Paper>
    );
    
    const courseInput = (
        <Paper sx={{ maxWidth: 700, width: 700, my: 2, mx: 'auto', p: 2 }}>
        <CourseInput />
        <br />
         </Paper>
    );
    const gearInput = (
        <Paper sx={{ maxWidth: 700, width: 700, my: 2, mx: 'auto', p: 2 }}>
        <GearCheckOut />
         </Paper>
    );
    
    const test =() => {

        console.log(NameInput().global.length);
    };
    
    
    return(  

        <div>
            <SlideMessage/>
            <SlideCalendar/>
            
        
            <Fade in={true}>{nameInput}</Fade>
 
            {(userCount > 0) && <Fade in={userCount > 0}>{eventDetailsInput}</Fade>}
  
            {(userCount > 0) && <Fade in={userCount > 0}>{roomInput}</Fade>}
   
            {(userCount > 0) && <Fade in={userCount > 0}>{timeInput}</Fade>}

            <Fade in={true}>{courseInput}</Fade>

            <Fade in={true}>{gearInput}</Fade>

            
        </div>
            

    ) 
   
}

export default Home