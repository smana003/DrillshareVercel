import React from 'react';
import axios from 'axios';
import {Grid,
  ButtonBase,
  Typography,
  Box,
  Rating,
  ImageListItem} from '@mui/material';
import {styled} from '@mui/material/styles';
const URL = process.env.REACT_APP_URL;

/**
 * NameImage
 * @param {listing} prop
 * @return {JSX.Element}
 * @constructor
 */
function NameImage(prop) {
  console.log('image: ', prop);

  const [index, setIndex] = React.useState(0);
  const [owner, setOwner] = React.useState('');
  const [rating, setRating] = React.useState([]);
  const listings = prop.photos.img;

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  React.useEffect(() => {
    axios
        .get(`${URL}getUserById?_id=${prop.postOwner}`)
        .then((res) => {
          setOwner(res.data);
          axios.get(`${URL}getReviewsById?listing=${prop._id}`)
              .then((res) => {
                let sum = 0;
                res.data.forEach((e) => {
                  sum += e.rating;
                });
                const average = sum / res.data.length;
                setRating(average);
              })
              .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
  }, []);

  return (

    <Box sx={{m: 10}}>
      <Box>
        <Typography color="#fefefe" gutterBottom variant="h4" component="div">
          {prop.title}
        </Typography>

        <Typography color="#fefefe" gutterBottom variant="h6" component="div">
            Owned By: {owner} <Rating
            name="read-only"
            value={rating}
            readOnly
            precision={.5}/>
        </Typography>
      </Box>

      <Box textAlign="center">
        <ButtonBase sx={{
          width: 'auto', minHeight: '512px', objectFit: 'cover'}}>
          <Img alt="complex" src={prop.photos.img[index]}/>
        </ButtonBase>

        <Box textAlign="center">
          {listings.map((item, i) => {
            return (
              <ButtonBase sx={{width: 50, height: 50, margin: 1, border: 2}}>
                <Img
                  alt="complex"
                  src={prop.photos.img[i]}
                  // onClick={e => setIndex(i)}
                  onMouseEnter={(e) => setIndex(i)}
                />
              </ButtonBase>
            );
          })}
        </Box>
      </Box>


    </Box>
    // might to fix sizing for image depending on img size user puts in
  );
}

export default NameImage;
