import styled from '@emotion/styled'

export const Container = styled.div`
  width: min(calc(100% - 4rem), 1080px);
  margin-inline: auto;

  .search__box-input {
    position: relative;
    width: min(100%, 43ch);
    margin-block: 1rem;

    & .MuiFormControl-root {
      width: 100%;
    }
  }

  .search__search-icon {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%) !important;
    color: ${({ theme }: any) => theme.palette.text.disabled};
  }

  .search__box-movie-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(258px, 1fr));
    gap: 1rem;
  }

  .search__display-message {
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
  }
`
