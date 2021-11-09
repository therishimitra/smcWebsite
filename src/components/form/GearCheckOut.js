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
import SlideCalendar from '../slideCalendar';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// This will be used to store input data
var userGear;

const gearList = [
  "a gear 1",
  "a gear 2",
  "b gear 1",
  "b gear 2",
  "c gear 1",
  "c gear 2"
];


export default function CourseSelectionInput() {
  const [isGear, setIsGear] = React.useState(false);
  const [gear, setGear] = React.useState([]);

  const handleChangeGear = (event) => {
    setIsGear(event.target.checked);
  };

  const gearInput = (
    <FormControl sx={{ m: 3, width: 500 }} variant="standard">
      <Autocomplete
        multiple
        freeSolo
        disableCloseOnSelect
        sx={{ width: 480 }}
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
          <TextField {...params} variant="outlined" label="Add Gear(s)" />
        )}
      ></Autocomplete>
    </FormControl>
  );

  return (
    <Stack spacing={2}>
      
      <Box sx={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", textAlign: "left",
          m: 2,
          fontSize: 24,
          fontFamily: "Monospace",
          lineHeight: 2}}>
        <FormControl sx={{ m: 2, width: 500 }} variant="standard">
          <FormLabel component="legend">
            
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
            label="I need to check-out some gear for this event"
          />
          </FormLabel>
          
        </FormControl>
      </Box>
      
      <Box 
        sx={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", justifyContent: 'center' }}>
          <Fade in={isGear}>{gearInput}</Fade>
      </Box>
    </Stack>
  );
}
