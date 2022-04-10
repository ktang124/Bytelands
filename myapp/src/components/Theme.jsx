import { ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#ff5d5d',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
            default: '#303031',
        },
      },
      spacing: 8,
  })

  theme.spacing(2);
  export default theme;