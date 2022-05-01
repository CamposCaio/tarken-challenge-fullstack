import styled from '@emotion/styled'

export const Container = styled.div`
  position: fixed;
  top: 1rem;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%) !important;
  width: min(calc(100% - 4rem), 43ch);
`
