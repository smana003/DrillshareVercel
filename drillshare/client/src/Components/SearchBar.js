import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './components.css';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const URL = process.env.REACT_APP_URL;

/**
 * SearchBar
 * @return {JSX.Element}
 * @constructor
 */
function SearchBar() {
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

  // <div className="search" position="absolute">
  // <div className="textInput">
  // <input
  // value={search}
  // type="text"
  // placeholder="Search for a Tool"
  // onChange={(e) => setSearch(e.target.value)}
  // />
  // <button onClick={handleSearch}>Search</button>
  // </div>
  // </div>


    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
      ></link>
      <div className="wrap">
        <div className="search">
          <input
            style={{height: '34px', width: '350px'}}
            type="text"
            value={search}
            className="searchTerm"
            placeholder="Search for a tool"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" onClick={handleSearch} className="searchButton">
            {' '}
            <SearchIcon></SearchIcon>
          </button>
        </div>
      </div>
    </div>

  // <SearchBar
  //   value={search}
  //   placeholder="Search for tool"
  //   onChange={handleSearch}
  // />

  );
}

export default SearchBar;
