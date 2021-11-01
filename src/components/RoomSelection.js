import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


// This will be used to store input data
var userEventType;

const eventTypes = [
  'Recording Session 🎤',
  'Student Project 🎬',
  'Meeting 🤝',
  'Rehearsal 🎼',
];

function getStyles(type, eventType, theme) {
  return {
    fontWeight:
      eventType.indexOf(type) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function RoomSelection() {
  const theme = useTheme();
  const [eventType, setEventType] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEventType(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    userEventType = value;
    console.log(userEventType);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Find an option</InputLabel>
        <Select
          labelId="event-multiple-selection"
          id="event-multiple-chip"
          multiple
          value={eventType}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Find an option" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {eventTypes.map((type) => (
            <MenuItem
              key={type}
              value={type}
              style={getStyles(type, eventType, theme)}
            >
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
