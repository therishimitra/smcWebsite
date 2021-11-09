import React from 'react'
import SlideCalendar from '../components/slideCalendar';
import SlideMessage from '../components/slideMessage';
import NameInput from '../components/form/NameInput';
import EventDetailsInput from '../components/form/EventDetailsInput';
import RoomSelection from '../components/form/RoomSelection';
import TimeInput from '../components/form/TimeInput';
import GearCheckOut from '../components/form/GearCheckOut';
import CourseInput from '../components/form/CourseInput';
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";


function home() {
    return(  

        <div>
            <SlideMessage/>
            <SlideCalendar/>
            
          
            <NameInput/>
            
            <Stack spacing={1}>
            <Box sx={{ mt: 10, boxShadow: 4 }}>
            <br />
            <EventDetailsInput />
            </Box>
            <br />
          
            <RoomSelection />
            <TimeInput />
            <GearCheckOut />
            <CourseInput />
            </Stack>
            
        </div>
            

    ) 
   
}

export default home