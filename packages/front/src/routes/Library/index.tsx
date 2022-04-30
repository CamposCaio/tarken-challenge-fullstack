import { Container } from './styles'
import IconSearch from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import { getAllMoovyAPI } from '../../utils/moovyAPI'
import { Movie } from '../Search'
import Box from '@mui/material/Box'
import MovieCard from '../../components/MovieCard'

export function Library() {
  const [movies, setMovies] = useState<Movie[]>([])

  function removeMovie(imdbID: string) {
    setMovies(movies.filter((movie) => movie.imdbID !== imdbID))
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
      <h1>Library</h1>
      <Box className="library__box-movie-cards">
        {movies[0] ? (
          movies.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                movie={movie}
                onRemove={(imdbID) => removeMovie(imdbID)}
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
