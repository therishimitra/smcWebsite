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

// This will be used to store input data
var userCourse;

const courseList = [
  { key: 0, name: "Course1 😀" },
  { key: 1, name: "Course2 🎓" }
];

export default function CourseSelectionInput() {
  const [isCourse, setIsCourse] = React.useState(false);
  const [course, setCourse] = React.useState([]);

  const handleChangeCourse = (event) => {
    setIsCourse(event.target.checked);
  };

  const courseInput = (
    <FormControl sx={{ m: 1 }} variant="standard">
      <Autocomplete
        multiple
        freeSolo
        disableCloseOnSelect
        sx={{ width: 400 }}
        value={course}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setCourse({
              title: newValue
            });
          } else {
            setCourse(newValue);
            userCourse = newValue;
            console.log(userCourse);
          }
        }}
        id="Search-for-course"
        options={courseList}
        getOptionLabel={(option) => option.name}
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
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Select course(s)" />
        )}
      ></Autocomplete>
    </FormControl>
  );

  return (
    <Stack spacing={0}>
      <Box sx={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", textAlign: "left",
          m: 2,
          fontSize: 24,
          fontFamily: "Monospace",
          lineHeight: 2}}>
        <FormControl sx={{ m: 2, width: 500 }} variant="standard">
          <FormLabel component="legend">
            Is this time slot for a course assignment?
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={isCourse}
                onChange={handleChangeCourse}
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600]
                  }
                }}
              />
            }
            label="Course assignment"
          />
        </FormControl>
      </Box>
      <Box sx={{ justifyContent: 'center'}}>
       {isCourse && <Fade in={isCourse}>{courseInput}</Fade>}
       </Box>
    </Stack>
  );
}
