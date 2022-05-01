import { Container } from './styles'
import IconSearch from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import { getAllMoovyAPI } from '../../utils/moovyAPI'
import Box from '@mui/material/Box'
import { MovieCard } from '../../components/MovieCard'
import { AlertDeleted } from '../../components/AlertDeleted'
import { Movie } from '../../utils/interfaceMovie'

export function Library() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [removedMovie, setRemovedMovie] = useState<Movie>()

  function handleMovieCardChange(
    targetMovie: Movie,
    eventType: 'added' | 'removed'
  ) {
    if (eventType === 'added') {
      setMovies((movies) => [...movies, targetMovie])
      setRemovedMovie(undefined)
    } else {
      setMovies(movies.filter((movie) => movie.imdbID !== targetMovie.imdbID))
      setRemovedMovie(targetMovie)
    }
  }

  useEffect(() => {
    getAllMoovyAPI().then((res) => {
      if (!res) return
      const myMovies: Movie[] = res.map((movie) => {
        return {
          imdbID: movie.imdbID,
          title: movie.title,
          imdbRating: movie.imdbRating,
          imageSrc: movie.imageSrc,
          isInLibrary: true,
        }
      })
      setMovies(myMovies)
    })
  }, [])

  return (
    <Container>
      {removedMovie && (
        <AlertDeleted
          removedMovie={removedMovie}
          onUndo={(movie) => handleMovieCardChange(movie, 'added')}
        />
      )}
      <h1>Library</h1>
      <Box className="library__box-movie-cards">
        {movies[0] ? (
          movies.map((movie) => {
            return (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onChange={handleMovieCardChange}
              />
            )
          })
        ) : (
          <div className="library__display-message">
            <h2>
              It looks like there are no movies in your library! Search for a
              movie you have watched and add it here!
            </h2>
            <IconSearch />
          </div>
        )}
      </Box>
    </Container>
  )
}
