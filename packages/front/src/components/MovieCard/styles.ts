import styled from '@emotion/styled'

export const Container = styled.div`
  .movie-card {
    height: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  .movie-card__record-on-app {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    line-height: 100%;
    width: calc(100% - 2rem);
    text-align: center;
    left: 50%;
    top: 129px;
    transform: translate(-50%, -50%) !important;
  }

  .movie-card__container-play {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    left: 50%;
    top: 129px;
    height: 3rem;
    width: 3rem;
    min-width: 3rem;
    transform: translate(-50%, -50%) !important;
    border-radius: 1.5rem;
    background-color: #fff;
  }

  .movie-card__play {
    color: ${({ theme }: any) => theme.palette.primary.main};
    font-size: 2.5rem;
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
