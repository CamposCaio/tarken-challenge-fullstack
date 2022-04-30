import styled from '@emotion/styled'

export const Container = styled.div`
  .movie-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  .movie-card__image {
    background-color: #eaeaea;
    height: 258px;
  }

  .movie-card__content-rating {
    position: absolute;
    top: 230px;
    right: 0.25rem;
    padding: 0 0.25rem;
    border-radius: 4px;
    font-size: 0.875rem;
    color: ${({ theme }: any) => theme.palette.primary.main};
    background-color: #fff;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .movie-card__content-title {
    color: ${({ theme }: any) => theme.palette.text.secondary};
    font-weight: 500;
    line-height: 125%;
  }

  .movie-card__content-star {
    font-size: 1rem;
  }
`
