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
 * @param {PaymentObject} prop
 * @return {JSX.Element}
 * @constructor
 */
const Payment = (prop) => {
  const taxRate = 0.075;
  const totalTax = taxRate * prop.subtotal;
  const netTotal = prop.subtotal + totalTax;

  // eslint-disable-next-line new-cap
  const USDollar = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <>
      <Paper>
        <br></br>
        <Typography textAlign={'center'} variant="h4">
          Total
        </Typography>
        <br></br>

        <Card
          sx={{
            marginBottom: '10px',
            marginLeft: '10px',
            marginRight: '10px',
            maxWidth: '100%',
          }}
          variant="outlined"
        >
          <CardContent>
            <Typography paddingLeft={'50px'} paddingRight={'50px'}>
              <Typography sx={{textAlign: 'center'}}>
                You are renting
                <Typography
                  display={'inline'}
                  sx={{fontSize: '18px', fontWeight: 'bold'}}
                  color={'secondary.light'}
                >
                  &nbsp;several tools&nbsp;
                </Typography>
                from
                <Typography
                  display={'inline'}
                  sx={{fontSize: '18px', fontWeight: 'bold'}}
                  color={'secondary.light'}
                >
                  &nbsp;multiple owners&nbsp;
                </Typography>
                {/* for*/}
                {/* <Typography*/}
                {/*  display={'inline'}*/}
                {/*  sx={{fontSize: '18px', fontWeight: 'bold'}}*/}
                {/*  color={'primary.light'}*/}
                {/* >*/}
                {/*  &nbsp;{USDollar.format
                  (prop.listing.rateDaily)} a day.&nbsp;*/}
                {/* </Typography>*/}
                Before tax, this will cost you {USDollar.format(prop.subtotal)}.
              </Typography>
              <br></br>
              <Typography textAlign={'center'} variant="h5">
                Subtotal
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{xs: 1, sm: 2, md: 3}}
              >
                <Grid item xs={6}>
                  <Typography paddingLeft={'50px'} sx={{textAlign: 'left'}}>
                    All rentals
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography paddingRight={'50px'} sx={{textAlign: 'right'}}>
                    {USDollar.format(prop.subtotal)}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography paddingLeft={'50px'} sx={{textAlign: 'left'}}>
                    Tax
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography paddingRight={'50px'} sx={{textAlign: 'right'}}>
                    {USDollar.format(totalTax)}
                  </Typography>
                </Grid>
              </Grid>
              <hr className="solid" />

              <br />
              <Typography
                variant="h4"
                sx={{fontWeight: 'bold', textAlign: 'center'}}
                color={'secondary.light'}
              >
                Your total: {USDollar.format(netTotal)}
              </Typography>
            </Typography>
          </CardContent>
        </Card>

        <br></br>
      </Paper>
    </>
  );
};

export default Payment;
