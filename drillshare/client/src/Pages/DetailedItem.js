import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Description from '../Components/DetailedItemParts/Description';
import NameImage from '../Components/DetailedItemParts/NameImage';
import RateAvailabilty from '../Components/DetailedItemParts/RateAvailability';
import RentButton from '../Components/DetailedItemParts/RentButton';
import DeleteButton from '../Components/DetailedItemParts/DeleteButton';
import {
  Box,
  Divider,
  Grid,
  TextField,
  Typography,
  IconButton} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import Session from 'react-session-api';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Button from '@mui/material/Button';
import ProductReview from '../Components/DetailedItemParts/ProductReview';
import SearchIcon from '@mui/icons-material/Search';
import ItemSearch from '../Components/ItemSearch';
// theme for overall page
const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#30b55f',
    },

    text: {
      primary: '#ffff',
    },
  },
});

/**
 * DetailedItem
 * @param {listing} props
 * @return {JSX.Element}
 * @constructor
 */
function DetailedItem(props) {
  // navigate for user to login
  const navigate = useNavigate();
  const location = useLocation();
  const listing = location.state.listing;
  // const user = navigate.state.user;

  // console.log(listing);
  // console.log(Session.get('token'));
  // if user not logged in, they can log in
  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <Box sx={{minHeight: '100vh'}}>

      <Box>
        <ItemSearch/>
      </Box>


      <ThemeProvider theme={theme}>
        <Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="row"
          >
            {/* left section - top grid */}
            <Grid item xs={12} lg={4}>
              <NameImage {...listing} />
            </Grid>
            {/* middle section - top grid*/}
            <Grid item xs={12} lg={3} order={{xs: 3, lg: 2, minHeight: '60vh'}}>
              <Description {...listing} />
              <Divider sx={{mt: '20px', mb: '10px', m: 3}}/>
              <RateAvailabilty {...listing} />
            </Grid>
            {/* right section - top grid */}
            <Grid item xs={12} lg={3} order={{xs: 2, lg: 3}} sx={{p: 1}}>
              {Session.get('token').accessToken === false ? (
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    disableElevation
                    component="div"
                    onClick={redirectToLogin}>Login To Rent</Button>
                </Box>


              ) : (
                listing.postOwner === Session.get('token').id ? (
                  <Box textAlign="center">
                    <DeleteButton {...listing} />
                  </Box>

                ) : (
                  <Box>
                    <Box textAlign="center">
                      <RateAvailabilty {...listing} />
                      <RentButton {...listing} />
                    </Box>
                  </Box>


                )
              )}
            </Grid>
          </Grid>
          {/* product review section - bottom grid*/}
          <Grid container
            justifyContent="center">
            <Grid item xs={12} lg={9} sx={{m: 3}}>
              <ProductReview {...listing} />
            </Grid>
          </Grid>
        </Grid>

      </ThemeProvider>
    </Box>

  );
}

export default DetailedItem;
