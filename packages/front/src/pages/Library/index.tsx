import { Container } from './styles'
import { useEffect, useState } from 'react'
import {
  deleteMoovyAPI,
  getAllMoovyAPI,
  postMoovyAPI,
} from '../../utils/moovyAPI'
import Box from '@mui/material/Box'
import { MovieCard } from '../../components/MovieCard'
import { AlertRemoved } from '../../components/AlertRemoved'
import { Movie } from '../../utils/interfaceMovie'
import { BigInfoMessage } from '../../components/BigInfoMessage'
import { DialogConfirmRemove } from '../../components/DialogConfirmRemove'

export function Library() {
  const [moviesInLibrary, setMoviesInLibrary] = useState<Movie[]>([])
  const [movieToConfirmRemove, setMovieToConfirmRemove] = useState<Movie>()
  const [lastRemovedMovie, setLastRemovedMovie] = useState<Movie>()

  function synchronizeMoviesInLibrary() {
    getAllMoovyAPI().then((res) => {
      if (!res) {
        setMoviesInLibrary([])
        return
      }
      const myMovies: Movie[] = res.map((movie) => {
        return {
          imdbID: movie.imdbID,
          title: movie.title,
          imdbRating: movie.imdbRating,
          imageSrc: movie.imageSrc,
          audioSrc: movie.audioSrc,
          isInLibrary: true,
        }
      })
      setMoviesInLibrary(myMovies)
    })
  }

  function handleConfirmRemove(movieToRemove: Movie) {
    setMovieToConfirmRemove(undefined)
    deleteMoovyAPI(movieToRemove.imdbID).then(() => {
      setLastRemovedMovie(movieToRemove)
      synchronizeMoviesInLibrary()
    })
  }

  function addMovieToLibrary(movieToAdd: Movie) {
    lastRemovedMovie === movieToAdd && setLastRemovedMovie(undefined)
    postMoovyAPI(movieToAdd).then(() => {
      synchronizeMoviesInLibrary()
    })
  }

  function handleDialogConfirm(
    eventType: 'cancel' | 'remove',
    targetMovie: Movie
  ) {
    eventType === 'cancel'
      ? setMovieToConfirmRemove(undefined)
      : handleConfirmRemove(targetMovie)
  }

  function handleMovieCard(eventType: 'add' | 'remove', targetMovie: Movie) {
    if (eventType === 'add') addMovieToLibrary(targetMovie)
    else {
      targetMovie.audioSrc === null
        ? handleConfirmRemove(targetMovie)
        : setMovieToConfirmRemove(targetMovie)
    }
  }

  useEffect(synchronizeMoviesInLibrary, [])

  return (
    <Container>
      {movieToConfirmRemove && (
        <DialogConfirmRemove
          onAction={handleDialogConfirm}
          targetMovie={movieToConfirmRemove}
        />
      )}
      {lastRemovedMovie && (
        <AlertRemoved
          removedMovie={lastRemovedMovie}
          onClickUndo={addMovieToLibrary}
        />
      )}
      <h1>Library</h1>
      <Box className="library__box-movie-cards">
        {moviesInLibrary[0] ? (
          moviesInLibrary.map((movie) => {
            return (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onAction={handleMovieCard}
              />
            )
          })
        ) : (
          <BigInfoMessage
            message="It looks like there are no movies in your library! Search for a
              movie you have watched and add it here!"
          />
        )}
      </Box>
    </Container>
  )
}
