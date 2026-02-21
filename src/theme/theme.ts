import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1A5F7A', // Deep Trust Blue
      light: '#86B6BB',
    },
    secondary: {
      main: '#FF6B6B', // Emergency/Action Red
    },
    success: {
      main: '#00D2C1', // Modern Teal/Cyan (instead of the old green)
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h3: {
      fontWeight: 700,
    },
  },
});