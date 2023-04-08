import * as React from 'react';
import axios from 'axios';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Session from 'react-session-api';
import GenericItem, {_formatted} from '../localstate.helper';
import UserSchema from '../Models/User';

const URL = process.env.REACT_APP_URL;

/**
 * SignIn
 * @return {JSX.Element}
 * @constructor
 */
export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');


  /**
   * refreshPage
   */
  function refreshPage() {
    window.location.reload(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = {
      username: data.get('username'),
      password: data.get('password'),
    };

    const params = new URLSearchParams();
    params.append('username', login.username);
    params.append('password', login.password);
    // check if username and password are valid
    axios.post(URL + `auth/signin`, params).then((res) => {
      if (res.data) {
        const token = new GenericItem('token', UserSchema);
        console.log(token.init(res.data));
        navigate('/');
        refreshPage();
      } else {
        console.log('bad login');
      }
    }).catch((err) =>{
      // catch errors with username or password
      // console.log(err);
      const errorCode = String(err);
      if (errorCode.includes(404)) {
        alert('Username not found!');
      } else if (errorCode.includes(401)) {
        alert('Invalid Password!');
      } else {
        alert('Something went wrong. Try again!');
      }
    });
  };

  return (
    <div>
      {/* <Navbar></Navbar> */}
      <Container component="dark-mode" maxWidth="xs">
        <CssBaseline />
        <Box minHeight="100vh"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{mt: 1}}
          >
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{mt: 3, mb: 2}}
              id="log-in-button"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registration" variant="body2">
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
