import { css } from '@emotion/react'
import { MoovyTheme } from './theme'

export const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    -webkit-font-smoothing: antialiased;
    background-color: ${MoovyTheme.palette.background.default};
    color: ${MoovyTheme.palette.text.primary};
  }

  body,
  input,
  textarea,
  select,
  button {
    font-family: 'Roboto', sans-serif;
    white-space: pre-line;
    line-height: 150%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    line-height: 125%;
  }

  h1 {
    line-height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
`
