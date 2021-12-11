import React from 'react'
import NameInput from '../components/form/NameInput';
import TimeInput from '../components/form/TimeInput';
import IndividualGearCheckOut from '../components/form/IndividualGearCheckOut';

import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Grow from '@mui/material/Grow';
import FormLabel from "@mui/material/FormLabel";

///////////////////////////////////////////             ///////////////////////////////////////////
///////////////////////////////////////////  API CALLS  ///////////////////////////////////////////
///////////////////////////////////////////             ///////////////////////////////////////////

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyGJts1v9eIz3Dki'}).base('appqapwXvgL64Efox');

const peopleAllInfo = [];

var x=0;
///////////////////////Pulling records from SMC People///////////////////////
base('SMC People').select({
    view: "ALL PEOPLE"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      
      peopleAllInfo[x] = {id: record.id, name: record.get('Person'), gearAccess: record.get('Gear Access')} ;
      x=x+1;

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


function Gear() {

    const [userSelected, setUserSelected] = React.useState([]); 
    const [gear, setGear] = React.useState([]);
    const [gearList, setGearList] = React.useState([]);
    const [startTimeSelected, setStartTimeSelected] = React.useState(""); 
    const [endTimeSelected, setEndTimeSelected] = React.useState(""); 

    const [timeCorrect, setTimeCorrect] = React.useState(false);
    const [userCount, setUserCount] = React.useState(0);

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
         setUserSelected={setUserSelected} userSelected={userSelected}
         setGearList={setGearList}
         setUserCount={setUserCount} 
         />
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
            Based on the your chosen Session Time, we wil notify you with the availability of the gear(s) selected above. 
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

    const gearInput = (
        <Paper sx={{ maxWidth: 700, width: "90%", my: 2, mx: 'auto', p: 2 }}>
        <IndividualGearCheckOut 
        gearList={gearList}
        gear={gear} setGear={setGear}
        />
        <br />
         </Paper>
    );

    return(  

        <div>

            <Grow in={true}>{nameInput}</Grow>
            <Grow in={true}>{timeInput}</Grow>
            <Grow in={true}>{gearInput}</Grow>

        </div>
    ) 
  
}

export default Gear