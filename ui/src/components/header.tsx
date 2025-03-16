import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CustomButtonLink } from './custom-button-link';

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <CustomButtonLink color="inherit" href='/'>The App</CustomButtonLink>
          </Typography>
          <CustomButtonLink color="inherit" href='/upload'>upload</CustomButtonLink>
          <CustomButtonLink color="inherit">Login</CustomButtonLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header