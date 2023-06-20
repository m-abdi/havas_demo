import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { responsiveFontSizes } from '@mui/material';
// Create a theme instance.
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Vazir',
  },
  palette: {
    primary: {
      main: '#365d8c',
    },
    secondary: {
      main: '#fcde67',
    },
    info: {
      main: '#68c5db',
    },
    error: {
      main: red.A400,
    },
  },
});

export default responsiveFontSizes(theme);
