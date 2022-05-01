import { Global } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import { TopNavigation } from './layouts/TopNavigation'
import { Logo } from './layouts/Logo'
import { globalStyle } from './styles/global'
import { MoovyTheme } from './styles/theme'

export function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <ThemeProvider theme={MoovyTheme}>
        <Logo />
        <TopNavigation />
        <Outlet />
      </ThemeProvider>
    </>
  )
}
