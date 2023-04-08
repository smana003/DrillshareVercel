import React, {useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import {Grid, Modal, Typography, Box, Tooltip} from '@mui/material';
import Session from 'react-session-api';
import {useNavigate} from 'react-router-dom';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import GenericItem from '../../localstate.helper';

const URL = process.env.REACT_APP_URL;
const today = new Date();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

/**
 * RentButton
 * @param {listing} prop
 * @return {JSX.Element}
 * @constructor
 * @description
 * shows rent button depending on status of item
 */
function RentButton(prop) {
  const navigate = useNavigate();

  const [rentDate, setRentDate] = React.useState(null);
  const [returnDate, setReturnDate] = React.useState(null);
  const [rate, setRate] = React.useState('80');
  const [open, setOpen] = useState(false);
  const [cart, setCart] = React.useState([]);
  const [profileValid] = React.useState(
    (Session.get('token')['profileValid'] === false) ? true : false);
  const [optionsForDelivery, setOptionsForDelivery] = useState(null);

  // React.useEffect(() => {
  //
  // });

  const handleChange = (event) => {
    setRate(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const [listings] = React.useState([]);
  /**
  * refreshes Page
  */
  function refreshPage() {
    window.location.reload(false);
  }

  const sessionCart = (Session.get('cart') === null) ?
    [] : (Session.get('cart'));

  const handleCart = (listings) => {
    // const body = {
    //   renter: Session.get("token").id,
    //   listing: prop._id,
    //   rentalStatus: 1,
    // };
    // console.log('body: ', body)
    // axios.post(`${URL}updateListing`, body)
    //   .then((res) => {
    //     console.log(res.data);
    //     // window.location.reload(true)
    //   })
    //   .catch((e) => console.log(e));
    if (rentDate === null || returnDate === null || rate === '' ||
      optionsForDelivery === null) {
      alert('Fill in all the required fields.');
    } else {
      let count = 0;
      sessionCart.some((e) => {
        if (e._id === listings._id) {
          count++;
        }
      });

      if (count === 0) {
        setCart([...cart, prop]);

        console.log(listings);
        console.log('item added');
        // refreshPage();

        alert('item has been added to your cart!');
        const obj = {prop, rentDate, returnDate};
        // navigate('/cart', {state: obj});
        sessionCart.push(prop);
        console.log(sessionCart);

        localStorage.setItem('cart', JSON.stringify(sessionCart));

        Session.set('cart', sessionCart);

        console.log(rentDate);
        console.log(returnDate);
        const days = Math.floor(
            ((returnDate.getTime() - rentDate.getTime()) / 86400000),
        );
        const totalPrice = days * prop.rateDaily;
        console.log(totalPrice);

        const subtotal = new GenericItem('subtotal', {'subtotal': 0});
        if (localStorage.getItem('subtotal') === null) {
          console.log(subtotal.init({'subtotal': 0}));
        } else {
          console.log(subtotal.initFromStorage());
        }
        // console.log(subtotal.init({'subtotal': totalPrice}));
        subtotal.i['subtotal'] = subtotal.i['subtotal'] + totalPrice;
        console.log(subtotal.i['subtotal']);
        subtotal.updateStorage();
        console.log(subtotal.initFromStorage());
      } else {
        alert('Already in cart');
      }
    }
  };

  const handleRent = () => {
    // const body = {
    //   renter: Session.get("token").id,
    //   listing: prop._id,
    //   rentalStatus: 1,
    // };
    // console.log('body: ', body)
    // axios.post(`${URL}updateListing`, body)
    //   .then((res) => {
    //     console.log(res.data);
    //     // window.location.reload(true)
    //   })
    //   .catch((e) => console.log(e));

    if (rentDate === null || returnDate === null || rate === '' ||
      optionsForDelivery === null) {
      alert('Fill in all the required fields.');
    } else {
      let totalPrice = 0;
      let days = 0;

      days = Math.floor(
          ((returnDate.getTime() - rentDate.getTime()) / 86400000),
      );
      totalPrice = days * rate;
      console.log(totalPrice);
      // const subtotal = new GenericItem('subtotal', {'subtotal': 0});
      // console.log(subtotal.init({'subtotal': totalPrice}));

      const obj = {prop, rentDate, returnDate};
      navigate('/checkout', {state: obj});
    }
  };

  const handleReturn = () => {
    const body = {
      renter: '',
      listing: prop._id,
      rentalStatus: 0,
    };
    axios
        .post(`${URL}updateListing`, body)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    setOpen(false);
    alert('Your item is now in the return process!');
    navigate('/');
  };

  return (
    <div>
      <Grid item xs={12}>
        {prop.rentalStatus === 0 ? (
          <Grid direction="column" sx={{margin: 2}}>
            <Grid item sx={{margin: 1}}>
              <Box alignItems="center">
                <FormControl sx={{minWidth: '260px'}} fullwidth>
                  <InputLabel
                    id="delivery-or-pickup-select-checkout-field">
                    Delivery Method *
                  </InputLabel>
                  <Select
                    labelId="delivery-or-pickup-select-checkout-field"
                    id="delivery-or-pickup-simple-select"
                    value={optionsForDelivery}
                    label="Delivery Method"
                    required
                    sx={{textAlignLast: 'left'}}
                    onChange={(e) =>
                      setOptionsForDelivery(e.target.value)}
                  >
                    <MenuItem value={'Pickup Only'}>
                      Pickup
                    </MenuItem>
                    <MenuItem value={'Delivery Only'}>
                      Delivery
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item sx={{margin: 1}}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  id="start-date"
                  label="Rent On"
                  value={rentDate}
                  minDate={today}
                  onChange={(newValue) => {
                    setRentDate(newValue);
                  }}
                  renderInput={(params) => <TextField
                    {...params} required/>}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item sx={{margin: 1}}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Return On"
                  id="end-date"
                  value={returnDate}
                  minDate={rentDate}
                  onChange={(newValue) => {
                    setReturnDate(newValue);
                  }}
                  renderInput={(params) => <TextField
                    {...params} required/>}
                />
              </LocalizationProvider>
            </Grid>

            <Tooltip title={
              profileValid === false ?
                '' : <Typography fontSize={20}>
                  Please complete your profile to rent.
                </Typography>
            }>
              <span>
                <Button
                  id="rent-now"
                  variant="contained"
                  disableElevation
                  component="div"
                  onClick={handleRent}
                  disabled={profileValid}
                  style={profileValid ? {pointerEvents: 'none'} : {}}
                >
              Rent Now
                </Button>
              </span>
            </Tooltip>
          </Grid>
        ) : prop.currentRenter === Session.get('token').id ? (
          <div>
            <Button
              id="return-tool"
              variant="contained"
              disableElevation
              component="div"
              onClick={handleOpen}
            >
              Return
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{...style, width: 'fit-content'}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Do you want to return this item?
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2, mb: 2}}>
                  Selecting {'YES'} will begin the return process!
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    color="error"
                    disableElevation
                    onClick={handleClose}
                  >
                    NO, CANCEL
                  </Button>
                  <Button
                    id="confirm-return"
                    variant="contained"
                    color="success"
                    disableElevation
                    onClick={handleReturn}
                  >
                    YES
                  </Button>
                </Box>
              </Box>
            </Modal>
          </div>
        ) : (
          <Button variant="contained" disableElevation component="div">
            Currently Unavailable
          </Button>
        )}
      </Grid>
      <div>


        <Grid item xs={12}>
          {prop.rentalStatus === 0 ? (
            <div>
              <Tooltip title={
                profileValid === false ?
                  '' : <Typography fontSize={20}>
                    Please complete your profile to rent.
                  </Typography>
              }>
                <span>
                  <Button
                    variant="contained"
                    disableElevation
                    component="div"
                    onClick={() => handleCart(prop)}
                    disabled={profileValid}
                    style={profileValid ? {pointerEvents: 'none'} : {}}
                  >
                  Add To Cart
                  </Button>
                </span>
              </Tooltip>

            </div>
          ) : prop.currentRenter === Session.get('token').id ? (
            <div>
              <Typography
                variant="contained"
                disableElevation
                component="div"
              >
              </Typography>


            </div>
          ) : (
            <p/>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default RentButton;
