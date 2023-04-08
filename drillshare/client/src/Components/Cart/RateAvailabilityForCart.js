import React from 'react';
import {Grid, ButtonBase, Typography, Box, Divider} from '@mui/material';
import {styled} from '@mui/material/styles';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Session from 'react-session-api';

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
 * RateAvailabilityForCart
 * @param {rentObject} prop
 * @return {JSX.Element}
 * @constructor
 */
function RateAvailabilityForCart(prop) {
  const [cartItems] = React.useState(Session.get('cart'));
  // console.log('rate: ', prop);
  // console.log(prop);
  // const sessionCart = Session.get('cart');
  // console.log(sessionCart);
  // console.log('cartItems: ', cartItems);
  return (
    <div>
      <Box sx={{m: 3}}>

        <Typography color="#fefefe" variant="body1" gutterBottom>
          Hourly Rate: ${prop.prop.rateHourly}
        </Typography>
        <Typography color="#fefefe" variant="body1" gutterBottom>
          Daily Rate: ${prop.prop.rateDaily}
        </Typography>
        <Typography color="#fefefe" variant="body1" gutterBottom>
          Available For:
        </Typography>
      </Box>
    </div>
  );
}

export default RateAvailabilityForCart;
