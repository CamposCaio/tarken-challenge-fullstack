import { createTheme, Theme } from '@mui/material/styles'

const components: Theme['components'] = {
  MuiButton: {
    styleOverrides: {
      root: {
        // minWidth: '128px',
        // fontSize: '0.875rem',
        // height: '2.4rem',
        // borderRadius: '8px',
        // paddingInline: '1.5rem',
      },
    },
  },
}

export const MoovyTheme = createTheme({
  components,
  palette: {
    primary: {
      main: '#F2911B',
      dark: '#CA6F00',
      light: '#EEA246',
    },
    background: {
      default: '#DCE0E2',
    },
  },
})
