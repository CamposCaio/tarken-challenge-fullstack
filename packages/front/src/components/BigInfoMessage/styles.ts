import styled from '@emotion/styled'

export const Container = styled.div`
  max-width: 43ch;
  text-align: center;
  margin-inline: auto;
  position: relative;
  color: ${({ theme }: any) => theme.palette.text.disabled};

  & svg {
    position: absolute;
    z-index: -1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) !important;
    font-size: 20rem;
    color: rgba(0, 0, 0, 0.05);
  }
`
