import React from 'react';
import {Typography, Box} from '@mui/material';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#30b55f',
    },

    text: {
      primary: '#000000',
    },
  },
});

/**
 * RateAvailability
 * @param {rentObject} prop
 * @return {JSX.Element}
 * @constructor
 */
function RateAvailability(prop) {
  console.log('rate: ', prop);

  return (
    <Box sx={{m: 3}}>
      <Typography color="#fefefe" variant="h5" gutterBottom>
        ${prop.rateDaily} per day
      </Typography>
    </Box>
  );
}

export default RateAvailability;
