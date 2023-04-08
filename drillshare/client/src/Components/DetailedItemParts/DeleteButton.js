import React, {useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import {Grid, ButtonBase} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const URL = process.env.REACT_APP_URL;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

/**
 * DeleteButton
 * @param {listing} prop
 * @return {JSX.Element}
 * @constructor
 */
function DeleteButton(prop) {
  console.log('delete: ', prop);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log('DELETED');
    axios.post(`${URL}deleteListingById?_id=${prop._id}`)
        .then((res) => {
          console.log(res);
          navigate('/');
        })
        .catch((e) => console.log(e));
  };

  return (
    <div>
      <Grid item xs={12}>
        <Button id="delete-button" variant="contained"
          disableElevation onClick={handleOpen}>
          Delete Item
        </Button>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{...style, width: 'fit-content'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete this item?
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2, mb: 2}}>
            This item will be deleted across Drillshare!
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="success"
              disableElevation
              onClick={handleClose}
            >NO, CANCEL</Button>
            <Button
              id="confirm-delete"
              variant="outlined"
              color="error"
              disableElevation
              onClick={handleDelete}
            >YES, CONFIRM</Button>
          </Box>

        </Box>
      </Modal>

    </div>
  );
}

export default DeleteButton;
