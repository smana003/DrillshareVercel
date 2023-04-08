import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  Divider,
  MenuItem,
  Card,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Payment from '../Components/Checkout/Payment';
import Shipping from '../Components/Checkout/Shipping';
import CartItem from '../Components/Checkout/CartItem';
import Price from '../Components/Checkout/Price';
import RateAvailability from '../Components/DetailedItemParts/RateAvailability';
import RateAvailabilityForCart
  from '../Components/Cart/RateAvailabilityForCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GenericItem from '../localstate.helper';

const URL = process.env.REACT_APP_URL;

/**
 * Cart
 * @param {items} item to be added
 * @return {JSX.Element}
 * @constructor
 */
const Cart = (item) => {
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
  const listing = location.state;
  const sessionSubTotal = Session.get('subtotal');
  const [listings, setListings] = React.useState([]);
  const [subtotal, setSubtotal] = React.useState(
      sessionSubTotal > 0 ? 0 : subtotalStore.i['subtotal'],
  );
  const [total, setTotal] = React.useState(
    subtotal > 0 ? (subtotal * 1.075) : 0,
  );
  /**
  * refreshes Page
  */
  function refreshPage() {
    window.location.reload(false);
  }
  console.log(Session.items());
  const [cartItems] = React.useState(
    (Session.get('cart') === null) ? [] : (Session.get('cart')),
  );


  const emptyCart = () => {
    // Session.set('cart', null);
    // localStorage.setItem('cart', null);

    localStorage.setItem('subtotal', null);
    Session.set('subtotal', null);

    localStorage.setItem('cart', null);
    Session.set('cart', null);
    // setSubtotal(null);
    // setListings(null);

    // navigate('/cart');
    refreshPage();
  };

  const handleCheckout = () => {
    // cartItems.map((item => {
    //   let body = {
    //     renter: Session.get('token').id,
    //     listing: item._id,
    //     rentalStatus: 1,
    //   };
    //   console.log('body: ', body);
    // axios
    //     .post(`${URL}updateListing`, body)
    //     .then((res) => {
    //       console.log(res.data);
    //       navigate('/');
    //       // window.location.reload(true)
    //     })
    //     .catch((e) => console.log(e));
    // }));
    const obj = {};
    navigate('/checkoutcart', {state: obj});
  };
  return (
    <Container >
      <Typography align="center" variant="h4" height="100px" sx={{mt: 3}}>Your
          Cart  <ShoppingCartIcon style={{fontSize: '30px'}}></ShoppingCartIcon>
      </Typography>

      <div>
        <Typography minHeight="70vh" display="flex" flexDirection="column">
          {cartItems.length === 0 ? (
      <>
        <Typography align="center" variant="h4" >
              Your Cart is Empty
        </Typography>
        <Button href="/" align="center" >
              Looking for an Item?
        </Button>
      </>
    ) : (
      <>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          {cartItems.map((item) => (

            <div>
              <Card sx={{m: 2}} style={{width: '200px'}}>

                {/* <div>{setSubtotal(getNewSubtotal(item.rateDaily))}</div> */}
                <br/>
                {/* <div>{console.log(item)}</div> */}
                {/* <CartItem maxHeight="100vh" display="flex"
                flexDirection="column" props={item}> </CartItem>*/}
                <CartItem
                  // name={owner}
                  title={item.title}
                  image={item.photos.img[0]}
                  description={item.description}
                  DailyRate={item.rateDaily}
                />
                <Button>
                  {/* <DeleteIcon>Remove</DeleteIcon>*/}
                </Button>
                {/* <RateAvailabilityForCart prop={item}>
                </RateAvailabilityForCart>*/}
              </Card>
              <Divider orientation="vertical" flexItem> </Divider>

            </div>

          ))}
          {/* <CartItem/> */}
          {/* <RateAvailabilityForCart></RateAvailabilityForCart> */}
          {/* <Divider></Divider> */}


          {/* <CartItem/> */}
          {/* <RateAvailabilityForCart></RateAvailabilityForCart> */}
          {/* <Divider></Divider> */}
          <br/>
          {/* <Typography style={{fontSize: '30px'}}>
          Total: ${total}</Typography> */}
          {/* <Typography style={{fontSize: '30px'}}>
          Total: ${console.log(subtotal)}</Typography> */}
        </Grid>
        <Typography style={{fontSize: '30px'}}>
          Subtotal: ${subtotal.toFixed(2)}</Typography>
        <Typography style={{fontSize: '30px'}}>
          Tax: ${(0.075 * subtotal).toFixed(2)}</Typography>
        <Typography style={{fontSize: '30px'}}>
          Total:    ${total.toFixed(2)}</Typography>
        <br/>
        <Button onClick={handleCheckout} style={{fontSize: '20px'}}
          variant="contained">Checkout</Button>
        <br/><br/><br/>
        <Button
          style={{fontSize: '20px'}}
          variant="contained"
          color={'error'}
          onClick={() => emptyCart()}
          startIcon={<DeleteIcon />}>
          Empty Cart
        </Button>
      </>
    )}
        </Typography>
      </div>


    </Container>
  );
};


export default Cart;
