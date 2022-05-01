import styled from '@emotion/styled'

export const Container = styled.div`
  width: min(calc(100% - 4rem), 1080px);
  margin-inline: auto;

  .library__box-movie-cards {
    padding-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(203px, 1fr));
    gap: 1rem;
  }
`
