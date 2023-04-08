import React from 'react';
import axios from 'axios';
import {Box, Grid} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';

const today = new Date();

/**
 * ChoicesMenu
 * @param {listing} props
 * @return {JSX.Element}
 * @constructor
 */
function ChoicesMenu(props) {
  console.log('rateasdasd:' + props);

  const [rentDate, setRentDate] = React.useState(null);
  const [returnDate, setReturnDate] = React.useState(null);
  const [rate, setRate] = React.useState('');

  const handleChange = (event) => {
    setRate(event.target.value);
  };

  return (
    <Box sx={{m: 3}}>
      <Grid direction="column" sx={{margin: 2}}>
        <Grid item sx={{margin: 1}}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Rent On"
              value={rentDate}
              minDate={today}
              onChange={(newValue) => {
                setRentDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item sx={{margin: 1}}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Return On"
              value={returnDate}
              minDate={rentDate}
              onChange={(newValue) => {
                setReturnDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item sx={{margin: 1}}>
          <FormControl style={{width: 260}}>
            <InputLabel id="demo-simple-select-label">Select a rate</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rate}
              label="Select a rate"
              defaultValue={props.rateDaily}
              onChange={handleChange}
            >
              <MenuItem value={props.rateHourly}>
                Hourly Rate: ${props.rateHourly}
              </MenuItem>
              <MenuItem value={props.rateDaily}>
                Daily Rate: ${props.rateDaily}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

      </Grid>
    </Box>

  );
}

export default ChoicesMenu;

ChoicesMenu.propTypes = {
  rateHourly: PropTypes.number,
  rateDaily: PropTypes.number,
};
