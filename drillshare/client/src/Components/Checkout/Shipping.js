import React from 'react';
import axios from 'axios';

import Session from 'react-session-api';
import {
  Typography,
  Paper,
  CardContent,
  Card,
} from '@mui/material';

const URL = process.env.REACT_APP_URL;

/**
 * Shipping
 * @return {JSX.Element}
 * @constructor
 */
const Shipping = () => {
  const [nameFirst, setFirstName] = React.useState('');
  const [nameLast, setLastName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [streetNum, setStreetNum] = React.useState('');
  const [streetName, setStreetName] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zip, setZip] = React.useState('');

  React.useEffect(() => {
    axios.get(`${URL}getProfile?_id=${Session.get('token').id}`)
        .then((res) => {
          console.log(res.data.profile[0]);
          const profile = res.data.profile[0];
          setFirstName(profile.nameFirst);
          setLastName(profile.nameLast);
          setAddress(profile.address);

          const newAddress = address.split(' ');
          console.log(newAddress);

          if (newAddress.length === 5) {
            setStreetNum(newAddress[0]);
            setStreetName(newAddress[1]);
            setCity(newAddress[2]);
            setState(newAddress[3]);
            setZip(newAddress[4]);
          } else if (newAddress.length === 6) {
            setStreetNum(newAddress[0]);
            setStreetName(newAddress[1] + ' ' + newAddress[2]);
            setCity(newAddress[3]);
            setState(newAddress[4]);
            setZip(newAddress[5]);
          }
        })
        .catch((e) => console.log(e));
  });


  return (
    <>
      <Paper>
        <br></br>
        <Typography textAlign={'center'} variant="h4">
          Delivery
        </Typography>

        <br></br>

        <Card
          sx={{
            marginBottom: '10px',
            marginLeft: '10px',
            marginRight: '10px',
            maxWidth: '100%',
            textAlign: 'center',
          }}
          variant="outlined"
        >
          <CardContent>
            <Typography gutterBottom>{nameFirst} {nameLast}</Typography>
            <Typography variant="h5" component="div">
              {streetNum} {streetName}
            </Typography>
            <Typography sx={{mb: 1.5}} color="text.secondary">
              {city} {state}<br></br>
              {zip}
            </Typography>
          </CardContent>
        </Card>
        <br></br>
      </Paper>
    </>
  );
};

export default Shipping;
