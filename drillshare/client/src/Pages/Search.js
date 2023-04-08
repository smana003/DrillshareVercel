/*eslint-disable */
import React from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import ItemSearch from '../Components/ItemSearch';
import HomeSearch from '../Components/HomeSearch';
import Session from 'react-session-api';

const Search = () => {
  const [listings, setListing] = React.useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  // state for searched item text
  const [search, setSearch] = React.useState('');

    // event handler, search backend for listings
    const handleSearch = () => {
      axios
          .get(`${URL}searchListing?title=${search}`)
          .then((res) => {
            if (res.data === 'No Results Found') {
              axios
                  .get(URL)
                  .then((res) => {
                    navigate('/', {state: res.data.listings});
                  })
                  .catch((e) => console.log(e));
            } else {
              navigate('/search', {state: res.data.listings});
            }
          })
          .catch((e) => console.log(e));
      setSearch('');
    };
  

  React.useEffect(() => {
    setListing(data);
  }, [data]);

  const navigateListing = (listing) => {
    console.log(listing);
    const obj = {listing, data};
    navigate('/listing', {state: obj});
  };


  return (
    
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box sx={{height: '100px'}}></Box>
      <Box>
      {(Session.get('token'))['accessToken'] === false ? (
                <>
                  <Typography color='primary.light'
                    align='center' variant="h2">
                    Welcome to Drillshare!
                  </Typography>
                  <Typography color='#d8d8d8'
                    align='center' variant="h4">
                    Search for an item to rent for your next project
                  </Typography>
                </>
              ) : (
                <>
                  <Typography color='primary.light' align='center' variant="h2">
                    Welcome back to Drillshare!
                  </Typography>
                  <Typography color='#d8d8d8'
                    align='center' variant="h6">
                    Search for an item to rent for your next project
                  </Typography>
                </>
              )}
        <ItemSearch/>
      </Box>
      <Box sx={{height: '280px'}}></Box>
      <Grid container sx={{ justifyContent:'center', pr: '100px', pl: '100px'}}>
        {listings.map((item) => (
          <Box sx={{justifyContent:'center'}}>
          <Card
            onClick={() => navigateListing(item)}
            variant="outlined"
            sx={{
              'maxWidth': 220,
              'm': 2,
              'marginLeft': 'flex',
              'marginRight': 'flex',
              ':hover': {
                cursor: 'pointer',
                boxShadow: 10,
              },
            }}
          >
            <CardMedia
              component="img"
              maxHeight="120px"
              image={item.photos.img[0]}
              alt=""
              sx={{

                'minWidth': 220,
                'minHeight': 220,
                'height': 'auto',
                'width': 'auto',
                // 'objectFit': 'contain', // add in to see diff
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {item.title}
              </Typography>
              <Chip color='primary' label={'$' +
                item.rateDaily.toString() + ' per day'} />
              </CardContent>

              <div></div>

            </Card>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Search;
