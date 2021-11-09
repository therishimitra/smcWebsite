import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { pink } from "@mui/material/colors";
import _without from "lodash/without";
import Checkbox from "@mui/material/Checkbox";
import Fade from "@mui/material/Fade";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  inputLabel: {
    color: "gray",
    "&.Mui-focused": {
      color: pink[800]
    }
  },
  inputFocused: {},
  select: {
    color: "black",
    "&:before": {
      // changes the bottom textbox border when not focused
      borderColor: "gray"
    },
    "&:after": {
      // changes the bottom textbox border when clicked/focused.  thought it would be the same with input label
      borderColor: pink[800]
    }
  },
  outlinedInput: {
    color: "gray",
    "&:after": {
      borderColor: pink[800]
    }
  }
}));

// This will be used to store input data
var userRoomType;
var userRoomSelection;

const roomTypes = [
  "Recording Studio 🎙️",
  "Rehearsal Spaces 🎧",
  "Edit & Collaboration Spaces 🎒"
];

const roomOptionStudio = [
  { key: 0, name: "Studio Room1 😀" },
  { key: 1, name: "Studio Room2 🎓" }
];

const roomOptionRehearsal = [
  { key: 0, name: "Rehearsal Room1 😀" },
  { key: 1, name: "Rehearsal Room2 🎓" }
];

const roomOptionECspace = [
  { key: 0, name: "ECspace Room1 😀" },
  { key: 1, name: "ECspace Room2 🎓" }
];

function getStyles(type, eventType, theme) {
  return {
    fontWeight:
      eventType.indexOf(type) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function RoomSelectionInput() {
  const classes = useStyles();
  const theme = useTheme();
  const [roomType, setRoomType] = React.useState([]);
  const [room, setRoom] = React.useState([]);

  const [isStudio, setIsStudio] = React.useState(false);
  const [isRehearsal, setIsRehearsal] = React.useState(false);
  const [isECspace, setIsECspace] = React.useState(false);

  const handleChangeRoomType = (event) => {
    const {
      target: { value }
    } = event;
    setRoomType(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    userRoomType = value;
    console.log(userRoomType);

    if (userRoomType === "Recording Studio 🎙️") {
      setIsStudio(true);
      setIsRehearsal(false);
      setIsECspace(false);
      setRoom([]); // Clear user input
    } else if (userRoomType === "Rehearsal Spaces 🎧") {
      setIsStudio(false);
      setIsRehearsal(true);
      setIsECspace(false);
      setRoom([]); // Clear user input
    } else if (userRoomType === "Edit & Collaboration Spaces 🎒") {
      setIsStudio(false);
      setIsRehearsal(false);
      setIsECspace(true);
      setRoom([]); // Clear user input
    }
  };

  const handleChangeRoom = (event) => {
    const {
      target: { value }
    } = event;
    setRoom(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    userRoomSelection = value;
    console.log(userRoomSelection);
  };

  const handleDelete = (e, value) => {
    e.preventDefault();
    setRoom((current) => _without(current, value));
  };

  const roomSelectionStudio = (
    <FormControl sx={{ m: 1, width: 400 }}>
      <InputLabel className={classes.inputLabel}>
        Select studio room(s)
      </InputLabel>
      <Select
        labelId="event-multiple-selection"
        id="event-multiple-chip"
        value={room}
        onChange={handleChangeRoom}
        multiple
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label="Select studio room(s)"
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={(e) => handleDelete(e, value)}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {roomOptionStudio.map((option) => (
          <MenuItem
            key={option.key}
            value={option.name}
            style={getStyles(option.name, room, theme)}
          >
            <Checkbox
              checked={room.indexOf(option.name) > -1} 
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600]
                }
              }}
            />
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const roomSelectionRehearsal = (
    <FormControl sx={{ m: 1, width: 400 }}>
      <InputLabel id="demo-multiple-chip-label">
        Select rehearsal room(s)
      </InputLabel>
      <Select
        labelId="event-multiple-selection"
        id="event-multiple-chip"
        value={room}
        onChange={handleChangeRoom}
        multiple
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label="Select rehearsal room(s)"
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={(e) => handleDelete(e, value)}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {roomOptionRehearsal.map((option) => (
          <MenuItem
            key={option.key}
            value={option.name}
            style={getStyles(option.name, room, theme)}
          >
            <Checkbox
              checked={room.indexOf(option.name) > -1} // thank fucking god this fucking works
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600]
                }
              }}
            />
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const roomSelectionECspace = (
    <FormControl sx={{ m: 1, width: 400 }}>
      <InputLabel id="demo-multiple-chip-label">
        Select Edit & Collaboration room(s)
      </InputLabel>
      <Select
        labelId="event-multiple-selection"
        id="event-multiple-chip"
        value={room}
        onChange={handleChangeRoom}
        multiple
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label="Select Edit & Collaboration room(s)"
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={(e) => handleDelete(e, value)}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {roomOptionECspace.map((option) => (
          <MenuItem
            key={option.key}
            value={option.name}
            style={getStyles(option.name, room, theme)}
          >
            <Checkbox
              checked={room.indexOf(option.name) > -1} // thank fucking god this fucking works
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600]
                }
              }}
            />
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div>
      <Stack spacing={1}>
        <div>
          <FormControl sx={{ m: 1, width: 400 }}>
            <InputLabel className={classes.inputLabel}>Room Type</InputLabel>
            <Select
              className={classes.select}
              labelId="event-multiple-selection"
              id="event-multiple-chip"
              value={roomType}
              onChange={handleChangeRoomType}
              input={
                <OutlinedInput
                  className={classes.outlinedInput}
                  label="Room Type"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {roomTypes.map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  style={getStyles(type, roomType, theme)}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          {isStudio && <Fade in={isStudio}>{roomSelectionStudio}</Fade>}
          {isRehearsal && (
            <Fade in={isRehearsal}>{roomSelectionRehearsal}</Fade>
          )}
          {isECspace && <Fade in={isECspace}>{roomSelectionECspace}</Fade>}
        </div>
      </Stack>
    </div>
  );
}
