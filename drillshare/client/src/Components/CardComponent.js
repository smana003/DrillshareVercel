import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './components.css';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Container,
  Chip,
} from '@mui/material';
import {FormControl} from '@mui/material';
import {MenuItem, Modal, Select} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
const _ = require('lodash');

// const URL = process.env.REACT_APP_URL;
const URL = `http://localhost:5000/api/`;

// styling for filter popup
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
/**
 * CardComponent
 * @return {JSX.Element}
 * @description
 * shows the cards and filter button on home page
 */
function CardComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;

  // state for listings
  const [listings, setListings] = React.useState([]);
  // state for price condition
  const [priceRange, setPriceRange] = React.useState('0,999');
  // state for renting condition
  const [isAvailability, setIsAvailability] = React.useState(-1);
  // state for category condition
  const [category, setCategory] = React.useState('None');
  // state for toolList
  const [toolList, setToolList] = React.useState([]);
  // state for opening and closing filter modal
  const [show, setShow] = React.useState(false);
  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  React.useEffect(() => {
    axios
        .get(URL)
        .then((res) => {
          console.log(res.data);
          setListings(res.data);
        })
        .catch((e) => console.log(e));
  }, []);

  const navigateListing = (listing) => {
    const obj = {listing, user};
    navigate('/listing', {state: obj});
  };
  // reset filter
  const resetFilter = () => {
    setPriceRange('0,999');
    setIsAvailability(-1);
    setCategory('None');
    setToolList([]);
  };
  // change price filter status
  const handleChangingPriceRange = (event) => {
    // console.log(event.target.value);
    setPriceRange(event.target.value);
  };
  // change price filter status
  const handleChangingAvailabilty = (event) => {
    // console.log(event.target.value);
    setIsAvailability(event.target.value);
  };
  // change category filter status
  const handleChangingCategory = (event) => {
    setCategory(event.target.value);
    axios.get(`${URL}getToolCategoryById?category=${event.target.value}`)
        .then((res) => {
          console.log(res.data);
          setToolList(res.data);
        })
        .catch((e) => console.log(e));
  };
  // filter tools array based on selection
  let filteredTools = [];

  const prices = priceRange.split(',');
  const first = parseInt(prices[0]);
  const second = parseInt(prices[1]);

  if (isAvailability === -1) {
    if (category === 'None') {
      filteredTools = _.filter(listings, function(o) {
        return (o.rateDaily >= first && o.rateDaily < second);
      });
    } else {
      filteredTools = _.filter(listings, function(o) {
        if (toolList.length !== 0) {
          let count = 0;
          let index = 0;
          toolList.some((e) => {
            if (e._id === o.toolID) {
              index = count;
            }
            count++;
          });
          return (o.rateDaily >= first && o.rateDaily < second) &&
          o.toolID === toolList[index]._id;
        }
      });
    }
  } else {
    if (category === 'None') {
      filteredTools = _.filter(listings, function(o) {
        return (o.rateDaily >= first && o.rateDaily < second) &&
        o.rentalStatus === isAvailability;
      });
    } else {
      filteredTools = _.filter(listings, function(o) {
        if (toolList.length !== 0) {
          let count = 0;
          let index = 0;
          toolList.some((e) => {
            if (e._id === o.toolID) {
              index = count;
            }
            count++;
          });
          return (o.rateDaily >= first && o.rateDaily < second) &&
          o.rentalStatus === isAvailability && o.toolID === toolList[index]._id;
        }
      });
    }
  }

  return (
    <Grid container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box sx={{mb: '100px', mt: '50px'}}>
        <Button variant="contained" onClick={handleOpen}>
          Adjust filters
        </Button>
        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="filter-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{...style, width: 400}}>
            <Typography id="filter-title" color="#fefefe"
              gutterBottom variant="h4" component="div">
              Filters
            </Typography>
            <Typography id="filter-price-range" color="#fefefe"
              gutterBottom variant="body1" component="div">
              Choose Price Range
            </Typography>
            <Box sx={{minWidth: 120}}>
              <FormControl sx={{width: 300, mb: 3}}>
                <Select
                  value={priceRange}
                  onChange={handleChangingPriceRange}
                >
                  <MenuItem value={'0,999'}>None</MenuItem>
                  <MenuItem value={'0,25'}>Less than $25 per day</MenuItem>
                  <MenuItem value={'25,50'}>Between $25-$49 per day</MenuItem>
                  <MenuItem value={'50,100'}>Between $50-$99 per day</MenuItem>
                  <MenuItem value={'100,999'}>More than $100 per day</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography id="filter-available-range" color="#fefefe"
              gutterBottom variant="body1" component="div">
              Choose Availability
            </Typography>
            <Box sx={{minWidth: 120}}>
              <FormControl sx={{width: 300, mb: 3}}>
                <Select
                  value={isAvailability}
                  onChange={handleChangingAvailabilty}
                >
                  <MenuItem value={-1}>None</MenuItem>
                  <MenuItem value={0}>Available for Rent</MenuItem>
                  <MenuItem value={1}>Not Available for Rent</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography id="filter-available-range" color="#fefefe"
              gutterBottom variant="body1" component="div">
              Choose Category
            </Typography>
            <Box sx={{minWidth: 120}}>
              <FormControl sx={{width: 300, mb: 3}}>
                <Select
                  value={category}
                  onChange={handleChangingCategory}
                >
                  <MenuItem value={'None'}>None</MenuItem>
                  <MenuItem value={'Air Compressors'}>Air Compressors</MenuItem>
                  <MenuItem value={'Chainsaw'}>Chainsaw</MenuItem>
                  <MenuItem value={'Circular Saws'}>Circular Saws</MenuItem>
                  <MenuItem value={'Drills'}>Drills</MenuItem>
                  <MenuItem value={'Hammer'}>Hammer</MenuItem>
                  <MenuItem value={'Gardening Tools'}>Gardening Tools</MenuItem>
                  <MenuItem value={'Ladders and Scaffolding'}>
                        Ladders and Scaffolding
                  </MenuItem>
                  <MenuItem value={'Miter Saws'}>Miter Saws</MenuItem>
                  <MenuItem value={'Mower'}>Mower</MenuItem>
                  <MenuItem value={'Nail Guns'}>Nail Guns</MenuItem>
                  <MenuItem value={'Outdoor Power Equipment'}>
                        Outdoor Power Equipment
                  </MenuItem>
                  <MenuItem value={'Painting Tools'}>Painting Tools</MenuItem>
                  <MenuItem value={'Plumbing Tools'}>Plumbing Tools</MenuItem>
                  <MenuItem value={'Power Sanders'}>Power Sanders</MenuItem>
                  <MenuItem value={'Safety Equipment'}>
                        Safety Equipment
                  </MenuItem>
                  <MenuItem value={'Saws'}>Saws</MenuItem>
                  <MenuItem value={'Tool Kit (Set of items)'}>
                        Tool Kit (Set of items)
                  </MenuItem>
                  <MenuItem value={'Water Damage Remediation'}>
                        Water Damage Remediation
                  </MenuItem>
                  <MenuItem value={'Welding and Soldering Tools'}>
                        Welding and Soldering Tools
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button variant="contained" onClick={resetFilter}>
              Reset Filters
            </Button>
          </Box>
        </Modal>
      </Box>
      {filteredTools.length === 0 ? (
        <Box textAlign="center">
          <Typography component="h1" variant="h5" sx={{mb: 5}}>
            Showing {filteredTools.length} items.
            Reset your filters to see more items.
          </Typography>
          <Button variant="contained" onClick={resetFilter}>
            Reset Filters
          </Button>
        </Box>
      ) : (
        <div>
          <Typography component="h1" variant="h5" sx={{mb: 5}}
            textAlign="center">
            Showing {filteredTools.length} items
          </Typography>
          <Grid container sx={{justifyContent: 'center',
            pr: '100px', pl: '100px'}}>
            {filteredTools.map((item) => (
              <Card
                variant="outlined"
                onClick={() => navigateListing(item)}
                sx={{
                  'maxWidth': 220,
                  'm': 2,
                  'marginLeft': '5',
                  'marginRight': '5',
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
            ))}
          </Grid>
        </div>
      )}


    </Grid>
  );
}

export default CardComponent;
