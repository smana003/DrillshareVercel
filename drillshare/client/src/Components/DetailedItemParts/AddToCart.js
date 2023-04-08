import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {Grid, Typography} from '@mui/material';
import Session from 'react-session-api';
import {useNavigate} from 'react-router-dom';
import RentButton from './RentButton';
import GenericItem, {_formatted} from '../../localstate.helper';


const URL = process.env.REACT_APP_URL;


// const subtotal = new GenericItem('subtotal', {'subtotal': 0});
// console.log(subtotal.initFromStorage());

/**
 * AddToCart
 * @param {listing} prop
 * @return {JSX.Element}
 * @constructor
 */
export function AddToCart(prop) {
  const navigate = useNavigate();
  console.log('Cart: ', prop);

  const [rentDate] = React.useState(null);
  const [returnDate] = React.useState(null);
  const [rate, setRate] = React.useState('');
  const [cart, setCart] = React.useState([]);
  const [listings] = React.useState([]);
  /**
  * refreshes Page
  */
  function refreshPage() {
    window.location.reload(false);
  }
  const sessionCart = (Session.get('cart') === null) ?
    [] : (Session.get('cart'));


  // React.useEffect(() => {
  // axios
  //   .get(URL)
  //   .then((res) => {
  //    setListings(res.data.listings);
  //   })
  //   .catch((e) => console.log(e));
  //  }, []);
  // const handleCart = (listings) =>{

  // setCart([...cart,listings])
  // console.log("item added")
  // const obj = {prop, rentDate, returnDate};
  // navigate('/cart', {state: obj});
  // }

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

    let totalPrice = 0;
    const days = 0;
    // console.log(prop.rateDaily);
    console.log(rentDate);
    console.log(returnDate);
    if (typeof prop.returnDate !== 'undefined') {
      console.log('type is: ', typeof listings.returnDate);
      const days = Math.floor(
          ((listings.returnDate.getTime() -
          listings.rentDate.getTime()) / 86400000),
      );
      totalPrice = days * listings.rateDaily;
      console.log(totalPrice);
    }
    const subtotal = new GenericItem('subtotal', {'subtotal': 0});
    console.log(subtotal.init({'subtotal': totalPrice}));
    // console.log(subtotal.initFromStorage());

    //
    // if (Session.get('subtotal') !== "undefined"
    //   && Session.get('subtotal') !== 0) {
    //   // console.log(totalPrice);
    //   let val = Session.get('subtotal');
    //   console.log(val);
    //   localStorage.setItem('subtotal', val);
    //   // localStorage.setItem('subtotal', totalPrice.toString());
    //   Session.set('subtotal', totalPrice);
    // } else {
    //   console.log(totalPrice);
    //   let oldTotal = Session.get('subtotal');
    //   totalPrice = totalPrice + oldTotal;
    //   localStorage.setItem('subtotal', (totalPrice.toString()));
    //   Session.set('subtotal', totalPrice);
    // }
  };


  // const handleReturn = () => {
  // const body = {
  // renter: '',
  // listing: prop._id,
  // rentalStatus: 0,
  // };
  // axios
  //  .post(`${URL}updateListing`, body)
  // .then((res) => {
  // console.log(res.data);
  // })
  // .catch((e) => console.log(e));
  // };

  return (
    <div>


      <Grid item xs={12}>
        {prop.rentalStatus === 0 ? (
          <div>
            <Button
              variant="contained"
              disableElevation
              component="div"
              onClick={() => handleCart(listings)}
            >
              Add To Cart
            </Button>


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
  );
}

export default AddToCart;
