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
// import {createTheme, ThemeProvider} from '@mui/material/styles';
// import Navbar from '../Components/navbar.component';
// import SearchBar from '../Components/SearchBar';
// import SignIn from './Login';
import {useNavigate} from 'react-router-dom';

const URL = process.env.REACT_APP_URL;

/**
 * Copyright
 * @param {appinfo} props
 * @return {JSX.Element}
 * @constructor
 */
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit">DrillShare</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const inputProps = {
  color: 'white',
  height: '100px',
};

/**
 * Signup
 * @return {JSX.Element}
 * @constructor
 * @description
 * sign up for drillshare!
 */
const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: userName,
      password: password,
    };
    // console.log(user);

    axios.post(`${URL}auth/signup`, user)
        .then((res) => {
          console.log(res.data);
          if (res.data === 'ERROR') {
            alert('Fill in all required input');
          } else {
            alert('Account Created!');
            navigate('/login');
          }
        })
        .catch((e) => {
          const errorCode = String(e);
          if (errorCode.includes(400)) {
            alert('Username/Email already exists. Please use a different one.');
          }
        });
  };

  return (
    <div>
      {/* <Navbar>
        <div>
          <SearchBar></SearchBar>
        </div>
      </Navbar> */}

      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'main'}}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
                            Sign up
          </Typography>
          {/* <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            > */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                // id="filled-basic"
                // label="Filled"
                variant="filled"
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                InputProps={{
                  inputProps,
                }}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="userName"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={20}>
              <FormControlLabel
                required
                control={<Checkbox color="primary"/>}
                label="I accept terms and conditions"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            onClick={handleSubmit}
          >
                            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/Login" variant="body2">
                                    Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/* </Box> */}
        <Copyright sx={{mt: 5}}/>
      </Container>

    </div>
  );
};

export default SignUp;
