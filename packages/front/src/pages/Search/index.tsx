import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Container } from './styles'
import IconSearch from '@mui/icons-material/Search'
import { MovieCard } from '../../components/MovieCard'
import { useRef, useState } from 'react'
import { deleteMoovyAPI, postMoovyAPI } from '../../utils/moovyAPI'
import { searchOmdbAPI } from '../../utils/omdbAPI'
import CircularProgress from '@mui/material/CircularProgress'
import { Movie } from '../../utils/interfaceMovie'
import { BigInfoMessage } from '../../components/BigInfoMessage'
import { AlertRemoved } from '../../components/AlertRemoved'
import { DialogConfirmRemove } from '../../components/DialogConfirmRemove'
import { AlertAdded } from '../../components/AlertAdded'

export function Search() {
  const [matchedMovies, setMatchedMovies] = useState<Movie[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [showLoading, setShowLoading] = useState(false)
  const [movieToConfirmRemove, setMovieToConfirmRemove] = useState<Movie>()
  const [lastRemovedMovie, setLastRemovedMovie] = useState<Movie>()
  const [lastAddedMovieTitle, setLastAddedMovieTitle] = useState('')
  const searchValueRef = useRef('')

  function handleSearchValue(searchValue: string) {
    setShowLoading(true)
    setSearchValue(searchValue)
    searchValueRef.current = searchValue
    searchOmdbAPI(searchValue).then((movies) => {
      if (searchValueRef.current !== searchValue) return
      setShowLoading(false)
      setMatchedMovies(movies)
    })
  }

  function handleConfirmRemove(movieToRemove: Movie) {
    setMovieToConfirmRemove(undefined)
    deleteMoovyAPI(movieToRemove.imdbID).then(() => {
      setLastRemovedMovie(movieToRemove)
      setMatchedMovies((movies) =>
        movies.map((movie) => {
          if (movie.imdbID === movieToRemove.imdbID) movie.isInLibrary = false
          return movie
        })
      )
    })
  }

  function addMovieToLibrary(movieToAdd: Movie) {
    lastRemovedMovie === movieToAdd && setLastRemovedMovie(undefined)
    postMoovyAPI(movieToAdd).then(() => {
      setLastAddedMovieTitle(movieToAdd.title)
      setMatchedMovies((movies) =>
        movies.map((movie) => {
          if (movie.imdbID === movieToAdd.imdbID) movie.isInLibrary = true
          return movie
        })
      )
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
    eventType === 'add'
      ? addMovieToLibrary(targetMovie)
      : setMovieToConfirmRemove(targetMovie)
  }

  return (
    <Container>
      {lastAddedMovieTitle && <AlertAdded movieTitle={lastAddedMovieTitle} />}
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
      <h1>Search</h1>
      <Box
        component="form"
        className="search__box-input"
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={({ target }) => handleSearchValue(target.value)}
          label="An amazing movie"
          variant="outlined"
        />
        <IconSearch className="search__search-icon" />
      </Box>
      <Box className="search__box-movie-cards">
        {matchedMovies[0]
          ? matchedMovies.map((movie) => {
              return (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onAction={handleMovieCard}
                />
              )
            })
          : searchValue && (
              <BigInfoMessage message="We couldn't find the movies you were lookin for :(" />
            )}
        <CircularProgress
          sx={{ display: showLoading ? 'block' : 'none' }}
          className="search__loading"
        />
      </Box>
    </Container>
  )
}
