
import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './components.css';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import {TextField, IconButton} from '@mui/material';
const URL = process.env.REACT_APP_URL;

/**
 * NavBarSearch
 * @return {JSX.Element}
 * @constructor
 */
function NavBarSearch() {
  const [search, setSearch] = React.useState('');

  const navigate = useNavigate();

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
      <TextField
        fullWidth="flex"
        sx={{mb: '10px', mt: '10px', ml: '100px'}}
        id="search"
        label="Search for a listing"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        color="secondary"
        onKeyPress= {(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />

      <IconButton id="enter" onClick={handleSearch} sx={{marginRight: '20px'}}>
        <SearchIcon />
      </IconButton>
    </>
  );
}

export default NavBarSearch;
