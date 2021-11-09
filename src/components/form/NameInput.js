import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import FormLabel from "@mui/material/FormLabel";



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
        console.log(x,'Retrieved', record.get('Person'), record.get('Room Access'), record.get('Lending Level'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////
// This will be used to store input data
var userValues = [];

var emojis = [
  "🎹",
  "😃",
  "😀",
  "😊",
  "😉",
  "😍",
  "😘",
  "📯",
  "🪕",
  "😙",
  "😜",
  "😝",
  "😛",
  "🎵",
  "🎺",
  "🥁",
  "🎻",
  "🎷",
  "😂",
  "🎸",
  "😪",
  "😋",
  "😷",
  "😎",
  "😴",
  "😵",
  "😲",
  "😈"
];

const userEmoji = [];
const userNameList = [];


function renderItem({ item, handleRemoveName }) {
  const emoji = userEmoji[userNameList.indexOf(item)];

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveName(item)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={emoji + " " + item} />
    </ListItem>
  );
}

const filter = createFilterOptions();

function NameInput({count, setUserCount}) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState(null);

  //const {handleSubmit} = useForm();

  const [nameInDisplay, setNameInDisplay] = React.useState(
    userNameList.slice(0, 3)
  );

  const handleAddName = () => {
    setNameInDisplay(userNameList);
  };

  const handleRemoveName = (item) => {
    setNameInDisplay((prev) => [...prev.filter((i) => i !== item)]);
    userNameList.splice(userNameList.indexOf(item), 1);
    userValues.splice(userValues.indexOf(item), 1);
    setUserCount(userNameList.length); // send data to home

    console.log(userNameList);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      setValue(null);
      setError(false);
    }
  };

  const handleChange = (event, newValue) => {
    if (typeof newValue === "string") {
      setValue({
        title: newValue
      });
    } else {
      setValue(newValue);
    }
    if (newValue != null) {
      if (userNameList.indexOf(newValue.name) > -1) {
        console.log(userNameList.indexOf(newValue));
        setError(true);
      } else {
        setError(false);
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        userEmoji.push(randomEmoji);
        handleClose();
        userValues.push(newValue);
        userNameList.push(newValue.name);
        setUserCount(userNameList.length); // send data to home

        console.log(userValues);
        console.log(userNameList);
        console.log(userNameList.length);
        handleAddName();
      }
  }
  };

  const nameInputDialog = (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Find your name</DialogTitle>
      <DialogContent>
        <Stack spacing={0} sx={{ width: 480 }}>
          <Autocomplete
            value={value}
            onChange={handleChange}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              return filtered;
            }}
            selectOnFocus
            clearOnBlur={true}
            handleHomeEndKeys
            id="Search-for-name"
            options={SMCpeople}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                // Value selected with enter, right from the input
                return option;
              } else return option.name; // Regular option
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            sx={{ width: 450 }}
            freeSolo
            renderInput={(params) => (
              <div>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <SearchRoundedIcon
                    sx={{ color: "action.active", mr: 1, my: 3.5 }}
                  />
                  {error && (
                    <TextField
                      {...params}
                      error
                      id="error"
                      label="Error"
                      helperText="This user has already been added"
                      size="small"
                      variant="standard"
                    />
                  )}
                  {!error && (
                    <TextField
                      {...params}
                      label="Search for name"
                      helperText="Please enter your name here :)"
                      size="small"
                      variant="standard"
                    />
                  )}
                </Box>
              </div>
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      <Box
        sx={{
          textAlign: "left",
          m: 2,
          fontSize: 24,
          fontFamily: "Monospace",
          lineHeight: 2
        }}
      >
        Who's booking?
        <br />
        <FormLabel component="legend">
            i.e. takes all responsibility!
          </FormLabel>
        <Button variant="contained" onClick={handleClickOpen}>
          +ADD
        </Button>
      </Box>
      {nameInputDialog}
      {userNameList.length !== 0 && (
        <Box sx={{ mt: 1, boxShadow: 2 }}>
          <Paper elevation={3} />
          <List>
            <TransitionGroup>
              {nameInDisplay.map((item) => (
                <Collapse key={item}>
                  {(userNameList.indexOf(item) !== 0) && <Divider />}
                  {renderItem({ item, handleRemoveName })}
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </Box>
      )}
    </div>
  );
}

export default NameInput;

export function nameEntered() {

  return userNameList.length
}
