import React, {useState} from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import {Avatar, Box, Button, CardContent, CardHeader, Divider,
  Grid,
  Rating,
  TextareaAutosize, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericItem from '../../localstate.helper';
import UserSchema from '../../Models/User';
const URL = process.env.REACT_APP_URL;

const token = new GenericItem('token', UserSchema);
token.initFromStorage();
// console.log(Session.get('token').accessToken);
/**
 * ProductReview
 * @param {listing} prop
 * @return {JSX.Element}
 * @constructor
 * @description
 * shows the reviews / allows user to review
 */
function ProductReview(prop) {
  // gets the initial comment
  const [comment, setComment] = useState('');
  // get the initial star rating
  const [value, setValue] = useState(0);
  // set the reviews to show
  const [review, setReview] = useState([]);

  // get the date for review post
  const month = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const d = new Date();
  const monthName = month[d.getMonth()];
  const date = new Date().getDate();
  const year = new Date().getFullYear();

  React.useEffect(() => {
    axios
        .get(`${URL}getReviewsById?listing=${prop._id}`)
        .then((res) => {
          const reviews = [];
          res.data.forEach((e) => {
            reviews.push(e);
          });
          reviews.reverse();
          setReview(reviews);
        })
        .catch((e) => console.log(e));
  }, []);

  // to post a comment
  const postComment = () => {
    if (comment.length > 0 && value>0) {
      const review = {
        listing: prop._id,
        user: Session.get('token').username,
        comment: comment,
        rating: value,
        month: monthName,
        day: date,
        year: year,
      };

      axios.post(`${URL}createReview`, review)
          .then((res) => {
            axios.get(`${URL}getReviewsById?listing=${prop._id}`)
                .then((res) => {
                  const reviews = [];
                  res.data.forEach((e) => {
                    reviews.push(e);
                  });
                  reviews.reverse();
                  setReview(reviews);
                })
                .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      setComment('');
      setValue(0);
      document.getElementById('review-text-field').value = '';
      window.location.reload();
    } else {
      alert('Write a review and pick a rating to post!');
    }
  };

  const deleteReview = (review) => {
    // console.log('delete: ', review);
    axios.post(`${URL}deleteReviewById?_id=${review._id}`)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((e) => console.log(e));
  };

  return (
    <Box>
      <Divider sx={{mt: '20px', mb: '10px'}}/>
      <Box>
        <Typography color="#fefefe" gutterBottom variant="h4" component="div">
            Reviews
        </Typography>
        {/* If user logged in show box to review, else dont */}
        {Session.get('token').id === prop.postOwner ? (
          <div>
            Cannot Review Own Product
          </div>
          ) : (
            Session.get('token').accessToken ? (
              <Grid item container direction="column" xs={12} lg={5}>
                <Rating
                  name="simple-controlled"
                  value={value}
                  size="large"
                  sx={{mb: 2}}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={8}
                  id="review-text-field"
                  placeholder="Leave a Comment!"
                  onChange={(e) => setComment(e.target.value)}
                  style={{minHeight: '20px', maxWidth: '100%'}}>
                </TextareaAutosize>
                <Button variant="contained" onClick={postComment}
                  style={{maxWidth: '100%'}} sx={{mb: 5}}>
                Post Review
                </Button>
              </Grid>
            ) : (
              <Typography color="#fefefe" gutterBottom variant="h6"
                component="div">
              Login or signup to Review!
              </Typography>)
          )
        }
      </Box>
      {// mapping the new reviews and stars per review
        review.map((item, i)=>{
          return (
            <Box sx={{maxWidth: '512px'}}>
              <CardHeader avatar={
                <Avatar src="./ReviewImgs/avatarimg.png"/>}
              action={<Rating name="read-only"
                value={item.rating} readOnly />}
              title={item.user}
              subheader={item.month+' '+item.day+', '+item.year}/>
              <CardContent>
                <Typography variant="body2">
                  {item.comment}
                </Typography>
              </CardContent>
              {Session.get('token').username === item.user &&
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteReview(item)}>
                    Delete
                </Button>
              }
            </Box>
          );
        })}

    </Box>

  );
}

export default ProductReview;
