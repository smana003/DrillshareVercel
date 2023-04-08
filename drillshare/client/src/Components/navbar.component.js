
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import Session from 'react-session-api';
import SearchBar from './SearchBar';
import NavBarSearch from './NavBarSearch';
// import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import {green} from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {handleCart} from './DetailedItemParts/RentButton';
import Cart from '../Pages/Cart';
import {cartItems} from '../Pages/Cart';
import sessionCart from './DetailedItemParts/AddToCart';
const logout = () => {
  // localStorage.removeItem('token');
  localStorage.clear();
  Session.set('token', false);
};

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    console.log('Profile Valid: ' +
    JSON.stringify(Session.get('profileValid'), undefined, 2));
  };
  const [cartItems] = React.useState(
    (Session.get('cart') === null) ? [] : (Session.get('cart')),
  );

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            href="/"
            sx={{mr: 'flex', display: {xs: 'flex', md: 'flex'}}}
          >
            <img src={require('./logo-small.png')} />
          </Button>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}></Box>
          <Box
            sx={{
              flexGrow: 1,
              display: {xs: 'flex', md: 'none'},
            }}
          >
            <NavBarSearch />
            {/* <SearchBar /> */}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: {xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex'},
            }}
          >
            {localStorage.getItem('token') === null ? (
              <>
                <MenuItem key="Login" onClick={handleCloseUserMenu}>
                  <Button variant="text" href="/Login">
                    <Typography sx={{color: 'white'}} textAlign="center">
                      Login
                    </Typography>
                  </Button>
                </MenuItem>
              </>
            ) : (
              <>

                <MenuItem id="profile-option" key="Profile"
                  onClick={handleCloseUserMenu}>
                  <Button href="/cart" variant="text" >
                    <Badge badgeContent={cartItems.length} color="primary">
                      <ShoppingCartIcon sx={{color: 'white'}}
                        textAlign="center">
                      </ShoppingCartIcon>
                    </Badge>
                  </Button>
                </MenuItem>
              </>
            )}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: {xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex'},
            }}
            id="burger-button"
          >
            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>

              <MenuIcon />
            </IconButton>

            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {(Session.get('token'))['accessToken'] === false ? (
                <>

                  <MenuItem key="Login" onClick={handleCloseUserMenu}>
                    <Button variant="text" href="/Login">
                      <Typography sx={{color: 'primary.light'}}
                        textAlign="center">
                      Login
                      </Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem key="Register" onClick={handleCloseUserMenu}>
                    <Button variant="text" href="/Registration">
                      <Typography sx={{color: 'white'}} textAlign="center">
                        Register
                      </Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem/>
                </>
              ) : (
                <>
                  {Session.get('token')['profileValid'] === false ? (
                    <>
                      <Tooltip disableFocusListener title={
                        <Typography fontSize={20}>
                          You need to complete your profile first.
                        </Typography>
                      }>
                        <MenuItem key="Create" onClick={handleCloseUserMenu}
                          id="create-button">
                          <Button disabled variant="text" >
                            <Typography sx={{color: 'primary.dark'}}
                              textAlign="center">
                              Create
                            </Typography>
                          </Button>
                        </MenuItem>
                      </Tooltip>
                    </>
                ) : (
                  <>
                    <MenuItem key="Create" onClick={handleCloseUserMenu}
                      id="create-button">
                      <Button variant="text" href="/Create">
                        <Typography sx={{color: 'white'}} textAlign="center">
                        Create
                        </Typography>
                      </Button>
                    </MenuItem>
                  </>
                )}
                  <MenuItem key="Profile" onClick={handleCloseUserMenu}
                    id="profile-button">
                    <Button variant="text" href="/Profile">
                      <Typography sx={{color: 'primary.light'}}
                        textAlign="center">
                        Profile
                      </Typography>
                    </Button>
                  </MenuItem>

                  <MenuItem id="profile-option" key="Profile"
                    onClick={handleCloseUserMenu}>
                    <Button onClick={logout} variant="text" href="/">
                      <Typography sx={{color: 'primary.light'}}
                        textAlign="center">
                      Logout
                      </Typography>
                    </Button>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

/*

//  *
//  *
//  * WRITTEN IN MATERIAL UI
//  * BY SAKSHAM AND TREVOR
//  *
//  *
//  *
//  */

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import HomeIcon from "@mui/icons-material/Home";
// import Session from "react-session-api";
// import SearchBar from "./SearchBar";
// import { Link } from "@mui/material";

// const logout = () => {
//   localStorage.removeItem("token");
//   Session.set("token", false);
// };

// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar
//         title={<img src="./logo.png" />}
//         position="static"
//         color="primary"
//         enableColorOnDark
//       >
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//             href="/"
//           >
//             <HomeIcon />
//             <img src={require("./logo.png")} width="112" height="28" />
//           </IconButton>
//           <Box>
//             <SearchBar />
//           </Box>
//           <Typography
//             variant="h4"
//             component="div"
//             sx={{ flexGrow: 1 }}
//           ></Typography>

//           {localStorage.getItem("token") === null ? (
//             <>
//               <Button
//                 sx={{ marginLeft: 2 }}
//                 color="secondary"
//                 href="/Registration"
//                 variant="outlined"
//               >
//                 Register
//               </Button>

//               <Button
//                 color="secondary"
//                 href="/login"
//                 variant="contained"
//                 sx={{ marginLeft: 2 }}
//               >
//                 Login
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button color="inherit" href="/Create">
//                 Create
//               </Button>

//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 href="/Profile"
//                 sx={{ marginLeft: 2 }}
//               >
//                 User Profile
//               </Button>
//               <Button
//                 color="secondary"
//                 onClick={logout}
//                 href="/"
//                 sx={{ marginLeft: 2 }}
//                 variant="contained"
//               >
//                 Logout
//               </Button>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
