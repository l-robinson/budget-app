import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { CustomButtonLink } from './custom-button-link';

function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <CustomButtonLink color='inherit' href='/' sx={{fontSize: '1.25em'}}>The App</CustomButtonLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header