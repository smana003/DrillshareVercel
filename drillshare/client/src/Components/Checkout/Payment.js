import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import {useNavigate} from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  CardContent,
  Card,
  Grid,
} from '@mui/material';

const URL = process.env.REACT_APP_URL;

/**
 * Payment
 * @return {JSX.Element}
 * @constructor
 */
const Payment = () => {
  const [nameFirst, setFirstName] = React.useState('');
  const [nameLast, setLastName] = React.useState('');
  const [cc, setCC] = React.useState('');
  const [expDate, setExpDate] = React.useState('');
  const [authCode, setAuthCode] = React.useState('');

  React.useEffect(() => {
    axios.get(`${URL}getProfile?_id=${Session.get('token').id}`)
        .then((res) => {
          const profile = res.data.profile[0];
          setFirstName(profile.nameFirst);
          setLastName(profile.nameLast);
        })
        .catch((e) => console.log(e));

    axios.get(`${URL}getPayment?_id=${Session.get('token').id}`)
        .then((res) => {
          const cc = res.data.payment[0];
          setCC(cc.cardNumber);
          setAuthCode(cc.authCode);

          const newDate = new Date(cc.expDate);
          const month = newDate.getMonth();
          const year = newDate.getFullYear();
          setExpDate(month + '/' + year);
        })
        .catch((e) => console.log(e));
  });

  return (
    <>
      <Paper>
        <br></br>
        <Typography textAlign={'center'} variant="h4">
          Payment
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
              {cc}
            </Typography>
            <br></br>
            <Typography sx={{mb: 1.5}} color="text.secondary">
              Exp: {expDate} | CVV: {authCode}
            </Typography>
          </CardContent>
        </Card>

        <br></br>
      </Paper>
    </>
  );
};

export default Payment;
