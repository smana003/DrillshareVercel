import React from 'react';
import axios from 'axios';
import './pages.css';
import Session from 'react-session-api';
import { useNavigate } from 'react-router-dom';
import {
  Container, TextField, Typography, Box, Button,
  FormControl, MenuItem, Divider, Tooltip
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  Columns,
  Card,
  Media,
} from 'react-bulma-components';

const URL = process.env.REACT_APP_URL;

const style = {
  minWidth: '25%',
};

/**
 * Create
 * @return {JSX.Element}
 * @constructor
 * @description
 * Create a Listing Page
 */
const Create = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [model_num, setModel_num] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [rateHourly, setRateHourly] = React.useState('');
  const [rateDaily, setRateDaily] = React.useState('');
  // console.log(Session.get('token'));
  const [selectedImages, setSelectedImages] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  const [pickupOrDeliver, setPickupOrDeliver] = React.useState('');

  React.useEffect(() => {
    if (selectedImages) {
      setImageUrl(global.URL.createObjectURL(selectedImages));
    }
  }, [selectedImages]);

  const createListing = () => {
    if (name == '' || category == '' || model_num == '' || title == '' ||
      description == '' || rateDaily == '' || pickupOrDeliver == '' ||
      selectedImages === null) {
      alert('Please fill in all the fields!');
    } else {
      const tool = {
        name: name,
        category: category,
        model_num: model_num,
      };

      axios
        .post(`${URL}createTool`, tool)
        .then((res) => {
          const tool_id = res.data._id;
          const formData = new FormData();
          formData.append('postOwner', Session.get('token').id);
          formData.append('toolID', tool_id);
          formData.append('title', title);
          formData.append('description', description);
          formData.append('rateHourly', rateHourly);
          formData.append('rateDaily', rateDaily);

          const files = document.getElementById('image');
          // console.log("FILES: ", files.files);
          for (let i = 0; i < files.files.length; i++) {
            formData.append('image', files.files[i]);
          }

          axios
            .post(`${URL}createListing`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((res) => {
              console.log(res);
              navigate('/');
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Container>
      <Box bgcolor="primary" style={{ textAlign: 'center' }}>
        <div>
          <Typography variant="h4" color="#fefefe" sx={{ mt: 5 }}>
            Create an Item Listing!
          </Typography>
          <Typography color="#fefefe" variant="h5" sx={{ mt: 5, pt: 2.5 }}>
            Tool
          </Typography>
          <TextField
            sx={{ ...style }}
            required
            label="Name"
            margin="normal"
            size="small"
            value={name}
            className="tool-input"
            onChange={(e) => setName(e.target.value)}
            id="tool-name-input-field"
          />{' '}
          <Box sx={{ minWidth: 100, mt: 1 }}>
            <FormControl sx={{ width: 290 }}>
              <TextField
                select
                sx={{ ...style, textAlignLast: 'left' }}
                value={category}
                required
                size="small"
                label="Select a Category or Tool"
                onChange={(e) => setCategory(e.target.value)}
                className="tool-input"
                id="tool-category-input-field"
              >
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
                <Divider></Divider>
                <MenuItem value={'Other'}>Other</MenuItem>
              </TextField>
            </FormControl>
          </Box>
          <TextField
            sx={{ ...style }}
            required
            label="Model Number"
            margin="normal"
            size="small"
            value={model_num}
            className="tool-input"
            onChange={(e) => setModel_num(e.target.value)}
            id="tool-model-number-input-field"
          />{' '}
          <br />
          <Typography color="#fefefe" variant="h5">
            Listing
          </Typography>
          <TextField
            sx={{ ...style }}
            required
            label="Title"
            margin="normal"
            size="small"
            value={title}
            className="tool-input"
            onChange={(e) => setTitle(e.target.value)}
            id="tool-title-input-field"
          />{' '}
          <br />
          <TextField
            sx={{ ...style }}
            required
            multiline
            rows={4}
            label="Description"
            margin="normal"
            size="small"
            value={description}
            className="tool-input"
            onChange={(e) => setDescription(e.target.value)}
            id="tool-description-input-field"
          />{' '}
          <br />
          <TextField
            required
            type="number"
            label="Daily Rate"
            margin="normal"
            size="small"
            value={rateDaily}
            className="tool-input"
            onChange={(e) => setRateDaily(e.target.value)}
            id="tool-daily-rate-input-field"
          />{' '}
          <br />
          <Box sx={{ minWidth: 100 }}>
            <FormControl sx={{ width: 250 }}>
              <TextField
                select
                value={pickupOrDeliver}
                // label="Select One"
                sx={{ ...style, textAlignLast: 'left' }}
                required
                margin="normal"
                size="small"
                onChange={(e) => setPickupOrDeliver(e.target.value)}
                className="delivery-or-pickup"
                id="delivery-or-pickup-input-field"
                label='Select a Delivery Method'
              >
                <MenuItem value={'Pickup Only'}>
                  Pickup Only
                </MenuItem>
                <MenuItem value={'Delivery Only'}>
                  Delivery Only
                </MenuItem>
                <Divider></Divider>
                <MenuItem value={'Pickup and Delivery'}>
                  Pickup and Delivery
                </MenuItem>
              </TextField>
            </FormControl>
          </Box>
          <br />
          <Typography sx={{ mt: 1 }}>
            Select One or More Image(s)
          </Typography>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image"
            multiple
            type="file"
            name="image"
            className="tool-input"
            onChange={(e) => setSelectedImages(e.target.files[0])}
          />
          <label htmlFor="image">
            <Button
              sx={{ mt: 1 }}
              size="small"
              color="primary"
              variant="contained"
              component="span"
              endIcon={<PhotoCamera />}
            >
              Choose Image
            </Button>
          </label>{' '}
        </div>
        {imageUrl && selectedImages && (

          // <Box mt={2} textAlign="center">
          //   <Typography>Image(s) Selected:</Typography>
          //   <img src={imageUrl} alt={selectedImages.name}/>
          // </Box>

          <Container sx={{ mt: 6 }}>
            <Columns>
              {/* {imageUrl.map((item, i) => {*/}
              {/*    return (*/}
              {/*        <Columns.Column key={i} >*/}
              <Columns.Column >
                <Card style={{ width: 300, margin: 'auto', height: '100%' }}>
                  <Card.Image size="3by3" src={imageUrl} />
                  <Card.Content>
                    <Media>
                      {/* <Media.Item>*/}
                      {/*    <Heading size={4}>{imageUrl}</Heading>*/}
                      {/* </Media.Item>*/}
                    </Media>

                  </Card.Content>
                </Card>
              </Columns.Column>
              {/* );*/}
              {/* })}*/}
            </Columns>
          </Container>
        )}
        <br />
        <Tooltip disableFocusListener title={
          <Typography fontSize={12}>
            Currently does not save image files on host
          </Typography>
        }>
          <Button
            sx={{ mt: 5, mb: 5 }}
            variant="contained"
          // onClick={createListing}
          // id="create-new-listing-button"
          >
            Create Listing
          </Button>
        </Tooltip>

        {/* <Button
          sx={{ mt: 5, mb: 5 }}
          variant="contained"
          onClick={createListing}
          id="create-new-listing-button"
        >
          Create Listing
        </Button> */}

      </Box>
    </Container>
  );
};

export default Create;
