import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var x=0 //counting number of records pulled using x
var arr = [];
const SMCpeople = [];
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyn6GGT4mwqMtlaF'}).base('appYke0X4d4wy6GUx');
base('SMC People').select({
    // Selecting the first 3 records in ALL PEOPLE:
    view: "ALL PEOPLE"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      //arr[x] =   record.get('Person');
      
      SMCpeople.push( {name: record.get('Person'), id: x + 1});
      x=x+1;
        
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

//console.log('arr',arr)
//console.log('len',arr.length)


//const People = [];
//const len = 208;
//console.log(arr.length)
//for (var idx = 0; idx < len; idx++) {
//  People.push( {name: arr[idx], id: idx + 1});
//}
console.log('People',SMCpeople)

// This will be used to store input data
const userValues = [];


//const SMCpeople = [
//  { name: 'Yilei Li', id: 1 },
//  { name: 'Rishi Mitra', id: 2 },
//  { name: 'Geethika', id: 3 },
//  { name: 'Devansh', id: 4 },
//  { name: 'Anna', id: 5 },
//]

const defaultValues = {
  name: "",
};

function DisplayUser () {
    return <ul>
      {userValues.map(({ id, name }) => (<li key={id}> {name}</li>))}
   </ul>
}

const filter = createFilterOptions();

function NameInput() {
  
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [formValues, setFormValues] = useState(defaultValues)
  //const {handleSubmit} = useForm();
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const { name, options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit= (event) => {
    event.preventDefault();
    console.log(formValues);
    handleClose();
    userValues.push(formValues);
  }

  return (
    <div>
      <form>
      
      <DialogTitle>Who's booking time?</DialogTitle>

      <DisplayUser/>

      <Button onClick={handleClickOpen}>+ADD</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Find your name</DialogTitle>
        <DialogContent>
            <Stack spacing={2} sx={{ width: 480 }}>
              <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setValue({
                    title: newValue,
                  });
                } else {
                  setValue(newValue);
                }
                if (newValue != null) {
                handleClose();
                userValues.push(newValue);
                DisplayUser();
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                if (filtered.length === 0) {
                  setError(true);
                } else {setError(false)}
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="Search-for-name"
              options={SMCpeople}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                // Regular option
                return option.name;
              }}
              renderOption={(props, option) => <li {...props}>{option.name}</li>}
              sx={{ width: 480 }}
              freeSolo
              renderInput={(params) => (
                <div>
                   <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                   <SearchRoundedIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                  {error &&
                  <TextField {...params} 
                  error 
                  id="error" 
                  label="Error" 
                  helperText="Your name was not found :(" 
                  size="small"
                  variant="standard" />}
                  {!error && 
                  <TextField {...params} 
                  label="Search for name" 
                  helperText="Please enter your name here :)" 
                  size="small"
                  variant="standard"/>}
                  </Box>
                  </div>
              )}
            />
          </Stack>
          <h3>or</h3>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 0.2, minWidth: 480}} variant='filled'>
              <InputLabel shrink id="dialog-select">Select from below</InputLabel>
              <Select
              multiple
              native
              name = "name"
              value={formValues.name}
              // @ts-ignore Typings are not considering `native`
              onChange={handleChange}
              label="Native"
              inputProps={{
                id: 'select-multiple-native',
              }}
            >
              {SMCpeople.map((user) => (
                <option key={user.name} value={user.name}>
                  {user.name}
                </option>
              ))}
            </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Ok</Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  );
}

export default NameInput
