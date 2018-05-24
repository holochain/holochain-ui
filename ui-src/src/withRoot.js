import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
  
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#d05ce3',
      main: '#9c27b0',
      dark: '#6a0080'
    },
    secondary: {
      light: '#6ff9ff',
      main: '#26cd6a',
      dark: '#0095a8'
    }
  }
});

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
