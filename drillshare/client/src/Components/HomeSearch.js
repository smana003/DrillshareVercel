import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './components.css';
import SearchIcon from '@mui/icons-material/Search';
import {Grid, Box, TextField, IconButton, Typography} from '@mui/material';
import Session from 'react-session-api';

const URL = process.env.REACT_APP_URL;

/**
 * HomeSearch
 * @return {JSX.Element}
 * @constructor
 */
function HomeSearch() {
  // state for searched item text
  const [search, setSearch] = React.useState('');

  // navigate to listing page
  const navigate = useNavigate();

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

  return (
    <>
      <Box sx={{height: '100px'}}></Box>
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

      <Box>
        <Grid container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{mt: '25px', display: {xs: 'none', md: 'flex'}}}>
          <Grid item xs={8}>
            <TextField
              fullWidth="flex"
              sx={{m: '15px'}}
              id="search"
              label="Search"
              variant="filled"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              color="text"
              onKeyPress= {(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </Grid>
          <Grid item >
            <IconButton id="enter" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{height: '40px'}}></Box>
            {/* <Typography align='center' variant='h4'>or</Typography> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default HomeSearch;
