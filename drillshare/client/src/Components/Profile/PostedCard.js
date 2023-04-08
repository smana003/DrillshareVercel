import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import {useLocation, useNavigate} from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import {parseISO, format} from 'date-fns';
import {
  Form,
  Section,
  Columns,
  Heading,
  Container,
  Icon,
  Block,
  Button,
  Input,
  Select,
  Field,
  Control,
  Label,
  Card,
  Media,
  Image,
  Content,
} from 'react-bulma-components';
import {Typography} from '@mui/material';

const URL = process.env.REACT_APP_URL;

/**
 * PostedCard
 * @return {JSX.Element}
 * @constructor
 */
export default function PostedCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;

  const navigateListing = (listing) => {
    const obj = {listing, user};
    navigate('/listing', {state: obj});
  };

  const [listings, setListings] = React.useState([]);

  useEffect(() => {
    // const params = new URLSearchParams();
    // params.append('postOwner', Session.get('token')['id']);

    axios
        .get(`${URL}getOwnedListings?_id=${Session.get('token').id}`)
        .then((res) => {
          if (res.data) {
            setListings(res.data);
            console.log(res.data);
          } else {
            console.log('listings failed: ' + Session.get('token')['id']);
          }
        });
  }, []);

  return (
    <div>
      <Section style={{minHeight: '100%'}}>
        <Container mb={5}>
          <Typography variant="h4" color="#fefefe">
            Owned Tools
          </Typography>
        </Container>
        <Container>
          <Columns>
            {listings.map((item, i) => {
              return (
                <Columns.Column key={i} onClick={(e) => navigateListing(item)}>
                  <Card style={{width: 300, margin: 'auto', height: '100%'}}>
                    <Card.Image size="4by3" src={item.photos.img[0]} />
                    <Card.Content>
                      <Media>
                        <Media.Item>
                          <Heading size={4}>{item.title}</Heading>
                        </Media.Item>
                      </Media>
                      <Content>
                        {item.description}
                        <br />
                        <br />
                      </Content>
                    </Card.Content>
                  </Card>
                </Columns.Column>
              );
            })}
          </Columns>
        </Container>
      </Section>
    </div>
  );
}
