import * as React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'dark',
    primary: {
      light: '#7986cb',
      main: '#3A277A',
      dark: '#303f9f',
      contrastText: '#fff'
    },
    secondary: {
      light: 'rgba(29, 169, 199, 1)',
      main: 'rgba(0, 131, 141, 1)',
      dark: 'rgba(16, 110, 131, 1)',
      contrastText: '#fff'
    }
  },
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: {
        // Some CSS
        borderRadius: 5,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px'
      }
    },
    MuiCardActions: {
      action: {
        color: 'white'
      }
    }
  }
})

function withRoot (Component: any) {
  function WithRoot (props: any) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }

  return WithRoot
}

export default withRoot
