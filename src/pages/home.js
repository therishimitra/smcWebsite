import React from 'react'
import SlideCalendar from '../components/slideCalendar';
import SlideMessage from '../components/slideMessage';
import NameInput, { userNameList } from '../components/form/NameInput';
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



function Home() {

    const [userCount, setUserCount] = React.useState(0);

    const nameInput = (
        <Paper sx={{ maxWidth: 700, width: 700, my: 2, mx: 'auto', p: 2 }}>
         <NameInput count={userCount} setUserCount={setUserCount}/>
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