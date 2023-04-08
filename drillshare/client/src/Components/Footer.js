import {Box, Container} from '@mui/material';
import React from 'react';

/**
 * Footer
 * @return {JSX.Element}
 * @constructor
 */
function Footer() {
  return (
    <Box>
      <Container>
        <Box textAlign="center" pt={{xs: 5, sm: 10}} pb={{xs: 5, sm: 10}}>
            &copy; {new Date().getFullYear()} Drillshare
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
