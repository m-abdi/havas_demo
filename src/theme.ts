import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#304967',
    },
    secondary: {
      main: '#674e30',
    },
    info: {
      main: "#306467",
    }, 
    error: {
      main: red.A400,
    },
  },
});

export default theme;
