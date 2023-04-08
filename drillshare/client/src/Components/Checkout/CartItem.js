import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import useNavigate from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  CardContent,
  Card,
  Grid,
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import PropTypes from 'prop-types';

const URL = process.env.REACT_APP_URL;

/**
 * CartItem
 * @param {listing} props
 * @return {JSX.Element}
 * @constructor
 */
const CartItem = (props) => {
  console.log('PROPS: ', props);
  // console.log('PROPS: ', props);
  // console.log(props.props.title);
  // eslint-disable-next-line new-cap
  const USDollar = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <Card
      sx={{
        'marginBottom': '10px',
        'marginLeft': '10px',
        'marginRight': '10px',
        'maxWidth': '200px',
        'textAlign': 'center',
        'backgroundColor': 'secondary.dark',
        '&:hover': {
          backgroundColor: 'secondary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      variant="outlined"
    >
      <CardContent>
        <CardMedia component="img" image={props.image} alt="" />
        {/* <CardMedia component="img" image={props.image} alt="" />*/}
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {/* Owned By: {props.name}*/}
          {/* Owned By: {props.title}*/}
        </Typography>
        <Typography variant="h5" component="div">
          {/* {props.title}*/}
          {props.title}
        </Typography>
        <Typography sx={{mb: 1.5}} color="text.secondary">
          {/* {props.description}*/}
          {/* {props.description}*/}
        </Typography>
        <Typography variant="body2">
          Daily Rate: {USDollar.format(props.DailyRate)}
          {/* Daily Rate: {USDollar.format(props.rateDaily)}*/}
          {/* <br></br> Item Total: {props.TotalRate} */}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CartItem;

CartItem.propTypes = {
  props: PropTypes.object,
  image: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  DailyRate: PropTypes.number,
  rateDaily: PropTypes.number,
};
