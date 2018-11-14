import * as React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: '#6600ff',
      main: '#3A277A',
      dark: '#00ff99'
    },
    secondary: {
      light: '#6ff9ff',
      main: '#00838D',
      dark: '#0095a8'
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
