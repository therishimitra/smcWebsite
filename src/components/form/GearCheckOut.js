import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



////////////////////////////////////API Magic//////////////////////////////////////////////////////
const gearList = []; 

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyn6GGT4mwqMtlaF'}).base('appYke0X4d4wy6GUx');

base('Gear').select({
    view: "All Gear 🔒"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        //console.log('Retrieved', record.get('Item'), record);
        gearList.push(record.get('Item'))
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
//console.log(gList)
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// This will be used to store input data
var userGear;

const embedStyle = {
  background: "transparent",
  border: ""
  
};

const iFrameGear =(
  <iframe class="airtable-embed" 
                src="https://airtable.com/embed/shrmH9r8B0Zd8LwcU?backgroundColor=red"
                frameborder="0"
                sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
                loading="lazy"
                onmousewheel=""
                width="100%" 
                height="533"
                style={embedStyle}
                
            />
);

export default function CourseSelectionInput() {
  const [isGear, setIsGear] = React.useState(false);
  const [gear, setGear] = React.useState([]);

  const handleChangeGear = (event) => {
    setIsGear(event.target.checked);
  };

  const gearInput = (
    <FormControl sx={{ m: 1, width: 400 }} variant="standard">
      <Autocomplete
        multiple
        freeSolo
        disableCloseOnSelect
        value={gear}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setGear({
              title: newValue
            });
          } else {
            setGear(newValue);
            userGear = newValue;
            console.log(userGear);
          }
        }}
        id="Search-for-course"
        options={gearList}
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              // thank fucking god this fucking works
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600]
                }
              }}
            />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Add Gear(s)" helperText="Available gear can be viewed below."/>
        )}
      ></Autocomplete>
      <br />
    </FormControl>
  );

  return (
    <Stack spacing={0}>
      
      <Box sx={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", textAlign: "left",
          m: 1,
          fontSize: 24,
          fontFamily: "Monospace",
          lineHeight: 2}}>
        <FormControl sx={{ m: 1, width: 400 }} variant="standard">
          <FormLabel component="legend">
            Need to checkout gear for the event?
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={isGear}
                onChange={handleChangeGear}
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600]
                  }
                }}
              />
            }
            label="Gear check-out"
          />
        </FormControl>
      </Box>
      
      {isGear && 
      <Box sx={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", justifyContent: 'center' }}>
        
        <Fade in={isGear}>{gearInput}</Fade>
        <Fade in={isGear}>{iFrameGear}</Fade>
        
      </Box>
      }
    </Stack>
  );
}
