import React, {useState} from 'react';
import Home from './Pages/Home';
import Create from './Pages/Create';
import Search from './Pages/Search';
import DetailedItem from './Pages/DetailedItem';
import SignIn from './Pages/Login';
import SignUp from './Pages/Registeration';
import Profile from './Pages/Profile';
import Checkout from './Pages/Checkout';
import CheckoutCart from './Pages/CheckoutCart';
import './App.css';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import Navbar from './Components/navbar.component';
import '../src/Pages/pages.css';
import '../src/Components/components.css';
import Footer from './Components/Footer';
import {CssBaseline} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import GenericItem from './localstate.helper';
import UserSchema from './Models/User';
// import { makeStyles } from '@mui/material';
import {white} from '@mui/material/colors';
import Cart from './Pages/Cart';
import Session from 'react-session-api';
const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#005400',
      light: '#6db259',
      dark: '#005400',
    },

    secondary: {
      main: '#005500',
    },
  },

  shape: {
    borderRadius: '5px',
  },

  typography: {
    h1: {
      fontFamily: 'Playfair Display',
      fontWeight: 'bold',
    },

    h2: {
      fontFamily: 'Playfair Display',
      fontWeight: 'bold',
    },
    h: {
      fontFamily: 'Playfair Display',
      fontWeight: 'bold',
    },

    h4: {
      fontFamily: 'Playfair Display',
      fontWeight: 'bold',
    },

    h5: {
      fontFamily: 'Playfair Display',
      fontWeight: 'bold',
    },
    h6: {
      fontFamily: 'Playfair Display',
      fontWeight: 'bold',
    },
    body1: {
      fontFamily: 'Verdana',
    },
    body2: {
      fontFamily: 'Verdana',
    },
    subtitle1: {
      fontFamily: 'Verdana',
    },
    subtitle2: {
      fontFamily: 'Verdana',
    },

  },
});

const validateToken = function() {
  const token = new GenericItem('token', UserSchema);
  console.log(token.initFromStorage());
};

const createCart = function() {
  if (localStorage.getItem('cart') === null) {
    const cart = [];
    Session.set('cart', cart);
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'));
    Session.set('cart', cart);
  }
  console.log(Session.get('cart'));
  const subtotal = new GenericItem('subtotal', {'subtotal': 0});
  if (localStorage.getItem('subtotal') === null) {
    console.log(subtotal.init({'subtotal': 0}));
  } else {
    console.log(subtotal.initFromStorage());
  }
};

/**
 * Drillshare App
 * @return {App} {JSX.Element}
 * @constructor
 */
function App() {
  validateToken();
  createCart();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Navbar></Navbar>
          <CssBaseline />
          <Routes>
            <Route path="/registration" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/listing" element={<DetailedItem />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkoutcart" element={<CheckoutCart />} />
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />

          </Routes>

          <Footer></Footer>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
