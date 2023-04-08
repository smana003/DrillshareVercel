import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import {useLocation, useNavigate} from 'react-router-dom';
import {Container, Typography, Paper, Grid, Button} from '@mui/material';
import Payment from '../Components/Checkout/Payment';
import Shipping from '../Components/Checkout/Shipping';
import CartItem from '../Components/Checkout/CartItem';
import Price from '../Components/CheckoutCart/Price';
import GenericItem from '../localstate.helper';

const URL = process.env.REACT_APP_URL;

/**
 * Checkout
 * @return {JSX.Element}
 * @constructor
 */
const Checkout = () => {
  const subtotalStore = new GenericItem('subtotal', {'subtotal': 0});
  if (localStorage.getItem('subtotal') === null) {
    console.log(subtotalStore.init({'subtotal': 0}));
  } else {
    console.log(subtotalStore.initFromStorage());
  }
  console.log(Session.get('subtotal'));
  console.log(subtotalStore.initFromStorage());

  const navigate = useNavigate();
  const location = useLocation();
  // const listing = location.state;
  const [owner, setOwner] = React.useState('');

  const sessionSubTotal = Session.get('subtotal');
  const [subtotal, setSubtotal] = React.useState(
      sessionSubTotal > 0 ? 0 : subtotalStore.i['subtotal'],
  );
  const [total, setTotal] = React.useState(
      subtotal > 0 ? (subtotal * 1.08) : 0,
  );
  const [cartItems] = React.useState(
      (Session.get('cart') === null) ? [] : (Session.get('cart')),
  );
  // const days = Math.floor(
  //     (listing.returnDate.getTime() - listing.rentDate.getTime()) / 86400000,
  // );

  // const priceFormat = Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  // const total = days * listing.prop.rateDaily;

  // console.log('checkout: ', listing);

  // React.useEffect(() => {
  //   axios
  //       .get(`${URL}getUserById?_id=${listing.prop.postOwner}`)
  //       .then((res) => {
  //         setOwner(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((e) => console.log(e));
  // });

  const handleCheckout = () => {
    cartItems.map((item) => {
      const body = {
        renter: Session.get('token').id,
        listing: item._id,
        rentalStatus: 1,
      };
      console.log('body: ', body);
      axios
          .post(`${URL}updateListing`, body)
          .then((res) => {
            console.log(res.data);
            navigate('/');
            // window.location.reload(true)
          })
          .catch((e) => console.log(e));
    });
    localStorage.setItem('subtotal', null);
    Session.set('subtotal', null);
    localStorage.setItem('cart', null);
    Session.set('cart', null);
  };

  return (
    <Container>
      <Grid
        container
        sx={{mt: '50px'}}
        rowSpacing={1}
        columnSpacing={{xs: 1, sm: 2, md: 3}}
      >
        <Grid item xs={6}>
          <Payment />
        </Grid>
        <Grid item xs={6}>
          <Shipping />
        </Grid>

        <br></br>

        <Grid item xs={6}>
          <Price subtotal={subtotal} listing={subtotal} />
        </Grid>

        <Grid item xs={6}>
          <Paper sx={{}}>
            <br></br>
            <Typography align="center" variant="h4">
              Your Cart
            </Typography>
            <br></br>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{xs: 1, sm: 2, md: 3}}
              justifyContent="center"
            >
              {/* Cart Item*/}
              {cartItems.map((item) => (
                <Grid item>
                  <CartItem
                    // name={owner}
                    title={item.title}
                    image={item.photos.img[0]}
                    description={item.description}
                    DailyRate={item.rateDaily}
                  />
                </Grid>
              ))}
              {/* Cart Item*/}
            </Grid>

            <Grid container justifyContent="center">
              {/* <Typography sx={{ ml: 20, mr: "20px", mt: "10px" }}>
                Total: {totalPrice}
              </Typography> */}
              <Button
                id="checkout-button"
                sx={{mb: '25px', mt: '10px'}}
                variant="contained"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
