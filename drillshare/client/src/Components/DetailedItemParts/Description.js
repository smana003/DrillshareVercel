import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {createTheme, ThemeProvider} from '@mui/material/styles';

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
 * Description
 * @param {listing} prop
 * @return {JSX.Element}
 * @constructor
 */
function Description(prop) {
  console.log('description: ', prop);

  return (
    <Box sx={{m: 3, pt: 12}}>
      <ThemeProvider theme={theme}>

        <Box textAlign="center" sx={{mb: 1}}>
          <Typography color="#fefefe" gutterBottom variant="h6" component="div">
            Product Information
          </Typography>
        </Box>

        <Typography
          gutterBottom
          variant="body2"
          component="div"
          color="#fefefe"
        >
          {prop.description}
        </Typography>
      </ThemeProvider>
    </Box>
  );
}

export default Description;
