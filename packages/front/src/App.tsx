import { Global } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import CustomTabPanel from './components/CustomTabPanel'
import { Logo } from './components/Logo'
import { globalStyle } from './styles/global'
import { MoovyTheme } from './styles/theme'

export function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <ThemeProvider theme={MoovyTheme}>
        <Logo />
        <CustomTabPanel />
        <Outlet />
      </ThemeProvider>
    </>
  )
}
