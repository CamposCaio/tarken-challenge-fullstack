import styled from '@emotion/styled'

export const Container = styled.div`
  width: min(calc(100% - 4rem), 1080px);
  margin-inline: auto;

  .search__display-message {
    max-width: 43ch;
    margin-inline: auto;
    margin-top: 4rem;
    text-align: center;
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
  }
`
