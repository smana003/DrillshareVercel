import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import Navbar from '../Components/navbar.component';
import Session from 'react-session-api';
import {useNavigate} from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import {parseISO, format} from 'date-fns';
import RentedCard from '../Components/Profile/RentedCard';
import PostedCard from '../Components/Profile/PostedCard';
import {
  Form,
  Section,
  Columns,
  Heading,
  Card,
  Container,
  Button,
} from 'react-bulma-components';
import GenericItem from '../localstate.helper';
import UserSchema from '../Models/User';

const URL = process.env.REACT_APP_URL;

/**
 * Profile
 * @return {JSX.Element}
 * @constructor
 */
export default function Profile() {
  const navigate = useNavigate();

  const [nameFirst, setFirstName] = useState('');
  const [nameLast, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [driversLicence, setDriversLicence] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');

  const [cc, setCC] = useState('');
  const [cardType, setCardType] = useState('');
  const [expDate, setExpDate] = useState('');
  const [authCode, setAuthCode] = useState('');


  useEffect(() => {
    // const params = new URLSearchParams();
    // params.append('id', Session.get('token')['id']);
    // console.log(params)
    const getProfile = async () => {
      axios.get(`${URL}getProfile?_id=${Session.get('token').id}`)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              const profile = res.data.profile[0];
              setFirstName(profile.nameFirst);
              setLastName(profile.nameLast);
              setEmail(profile.email);
              setPhone(profile.phone);
              setDriversLicence(profile.driversLicence);
              setAddress(profile.address);
              setDob(format(parseISO(profile.dob), 'MM/dd/yyyy'));
              // setDob(profile.dob);
            } else {
              console.log('Couldn\'t get profile:' +
              Session.get('token')['id']);
            }
          });
    };

    const getPayment = async () => {
      axios.get(`${URL}getPayment?_id=${Session.get('token').id}`)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              const cc = res.data.payment[0];
              setCC(cc.cardNumber);
              setCardType(cc.creditcardType);
              // setExpDate(cc.expDate);
              setExpDate(format(Date.parse(cc.expDate), 'MM/dd'));
              setAuthCode(cc.authCode);
            } else {
              console.log('Couldn\'t get CC of ' + Session.get('token')['id']);
            }
          });
    };

    getProfile();
    getPayment();
    // const updatePayment = async () => {
    //   axios.post(`${URL}updatePayment?_id=${Session.get('token').id}`)
    //     .then((res) => {
    //       if (res.data) {
    //         const cc = res.data.payment[0];
    //         setCC(cc.cardNumber);
    //         setCardType(cc.creditcardType);
    //         setExpDate(cc.expDate);
    //         setAuthCode(cc.authCode);
    //       } else {
    //         console.log('Couldn\'t get CC of ' + Session.get('token')['id']);
    //       }
    //     });
    // };
  }, [], // [driversLicence, address, cc, expDate, authCode],
      // [
      //   nameFirst, nameLast, phone, driversLicence,
      //   address, cc, cardType, expDate, authCode,
      // ],
  );

  const updateToken = async () => {
    const tokenStore = new GenericItem('token', UserSchema);
    const token = tokenStore.initFromStorage();

    token.profileValid = !!((driversLicence) &&
    (address) && (cc) && (expDate) && (authCode));
    token.driversLicence = driversLicence;
    token.address = address;
    token.cc = cc;
    token.expDate = expDate;
    token.authCode = authCode;
    console.log(tokenStore.init(token));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    await updateToken();
    const params = new URLSearchParams();
    params.append('id', Session.get('token').id);
    params.append('nameFirst', nameFirst);
    params.append('nameLast', nameLast);
    params.append('email', email);
    params.append('phone', phone);
    params.append('driversLicence', driversLicence);
    params.append('address', address);
    params.append('dob', dob);

    axios.post(URL + `updateProfile`, params)
        .then((res) => {
          if (res.data) {
            navigate(0);// refesh the page
          } else {
            console.log('Update profile failed.');
          }
        });
  };

  const handleCCSubmit = async (event) => {
    event.preventDefault();

    await updateToken();
    const params = new URLSearchParams();
    params.append('cardNumber', cc);
    params.append('expDate', expDate);
    params.append('authCode', authCode);
    params.append('creditcardType', cardType);
    params.append('userid', Session.get('token')['id']);

    axios.post(URL + `updatePayment`, params)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            // navigate('/profile');
            navigate(0); // refesh the page
          } else {
            console.log(res.data);
            console.log('Update profile failed.');
          }
        });
  };
  return (
    <div>
      <Section style={{minHeight: '100%'}}>

        <Container mb={5}>
          <Card p={6} style={{margin: 'auto', height: '100%'}}>
            <Heading>
              Profile
            </Heading>
            <Heading subtitle>
              Update your profile details below.
            </Heading>
            <Container>
              <form onSubmit={handleProfileSubmit}>
                {/* Name*/}
                <Columns>
                  <Columns.Column>
                    <Form.Field>
                      <Form.Label textAlign="left">First name</Form.Label>
                      <Form.Control fullwidth>
                        <Form.Input
                          placeholder="Tom"
                          value={nameFirst || ''}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                        />
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                  <Columns.Column>
                    <Form.Label textAlign="left">Last name</Form.Label>
                    <Form.Control fullwidth>
                      <Form.Input
                        placeholder="Brady"
                        value={nameLast || ''}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </Form.Control>
                  </Columns.Column>

                </Columns>

                {/* driversLicence: String,*/}
                <Columns>
                  <Columns.Column>
                    <Form.Field>
                      <Form.Label textAlign={'left'}>
                        {'Driver\'s'} License
                      </Form.Label>
                      <Form.Control fullwidth>
                        <Form.Input
                          placeholder="L1234567"
                          value={driversLicence || ''}
                          onChange={(e) => {
                            setDriversLicence(e.target.value);
                          }}
                        />
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                  <Columns.Column>
                    {/* dob: Date,*/}
                    <Form.Field>
                      <Form.Label textAlign={'left'}>Birthday</Form.Label>
                      <Form.Control fullwidth>
                        <Form.Input
                          placeholder="01/01/1990"
                          value={dob || ''}
                          onChange={(e) => {
                            setDob(e.target.value);
                          }}
                        />
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                </Columns>

                <Columns>
                  <Columns.Column>
                    {/* phone: String,*/}
                    <Form.Field>
                      <Form.Label textAlign={'left'}>Phone</Form.Label>
                      <Form.Control fullwidth>
                        <Form.Input
                          placeholder="(123) 456-7890"
                          value={phone || ''}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                        />
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                  <Columns.Column>
                    {/* address: String,*/}
                    <Form.Field>
                      <Form.Label textAlign={'left'}>Address</Form.Label>
                      <Form.Control fullwidth>
                        <Form.Input
                          placeholder="123 Market St. San Francisco, CA 94117"
                          value={address || ''}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                </Columns>

                <Form.Field kind="group">
                  <Form.Control>
                    <Button color="link">Submit</Button>
                  </Form.Control>
                  <Form.Control>
                    <Button color="link" colorVariant="light">
                      Cancel
                    </Button>
                  </Form.Control>
                </Form.Field>
              </form>
            </Container>
          </Card>
        </Container>


      </Section>
      <Section style={{minHeight: '100%'}}>
        <Container mb={5}>
          <Card p={6} style={{margin: 'auto', height: '100%'}}>
            <Heading>
              Credit Card
            </Heading>
            <Heading subtitle>
              Update your payment information here.
            </Heading>
            <Container>

              <form onSubmit={handleCCSubmit}>

                <Columns>
                  <Columns.Column>
                    <Form.Field>
                      <Form.Label textAlign="left">Card Number</Form.Label>
                      <Form.Control fullwidth>
                        <Form.Input
                          placeholder="1234 1234 1234"
                          value={cc || ''}
                          onChange={(e) => {
                            return setCC(e.target.value);
                          }}
                        />
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>

                </Columns>

                <Columns>
                  <Columns.Column>
                    <Form.Field>
                      <Form.Label textAlign={'left'}>Exp. Date</Form.Label>
                      <Form.Control fullwidth>
                        <Form.Input
                          placeholder="01/25"
                          value={expDate || ''}
                          // value={format(new Date(expDate),
                          // 'MM/yy') || '02/29'}
                          onChange={(e) => {
                            return setExpDate(e.target.value);
                          }}
                        />
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                  <Columns.Column>
                    <Form.Field>
                      <Form.Label textAlign={'left'}>CVV</Form.Label>
                      <Form.Control fullwidth>
                        <Form.Input
                          placeholder="123"
                          value={authCode || ''}
                          onChange={(e) => {
                            return setAuthCode(e.target.value);
                          }}
                        />
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                  <Columns.Column>
                    <Form.Field>
                      <Form.Label textAlign={'left'}>Type</Form.Label>
                      <Form.Control fullwidth>
                        <Form.Select fullwidth
                          onChange={(e) => {
                            console.log(e.target.value);
                            return setCardType(e.target.value);
                          }}
                        >
                          <option value="Current">
                            {cardType}
                          </option>
                          {cardType !== 'Mastercard' &&
                            <option value="Mastercard">
                              Mastercard
                            </option>}
                          {cardType !== 'Visa' &&
                            <option value="Visa">
                              Visa
                            </option>}
                          {cardType !== 'Amex' &&
                            <option value="Amex">
                              Amex
                            </option>}
                        </Form.Select>
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                </Columns>

                <Form.Field kind="group">
                  <Form.Control>
                    <Button color="link">Submit</Button>
                  </Form.Control>
                  <Form.Control>
                    <Button color="link" colorVariant="light">
                      Cancel
                    </Button>
                  </Form.Control>
                </Form.Field>
              </form>

            </Container>
          </Card>
        </Container>

      </Section>
      <RentedCard></RentedCard>
      <PostedCard></PostedCard>
    </div>
  );
}
