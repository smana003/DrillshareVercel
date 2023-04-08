import React from 'react';
import './pages.css';
import CardComponent from '../Components/CardComponent';
import SearchBar from '../Components/SearchBar';
import {Box, Typography} from '@mui/material';
import NavBarSearch from '../Components/NavBarSearch';
import HomeSearch from '../Components/HomeSearch';


const URL = process.env.REACT_APP_URL;
const Home = ({}) => {
  return (

    <Box minHeight="100vh" display="flex" flexDirection="column">
      <HomeSearch/>
      <CardComponent />
    </Box>

  );
};

export default Home;
