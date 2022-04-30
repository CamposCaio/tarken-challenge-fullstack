import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Container } from './styles'
import IconSearch from '@mui/icons-material/Search'
import MovieCard from '../../components/MovieCard'
import { useEffect, useRef, useState } from 'react'
import { getMoovyAPI } from '../../utils/moovyAPI'
import {
  getImageSrcOmdbAPI,
  getOmdbAPI,
  searchOmdbAPI,
} from '../../utils/omdbAPI'

export interface Movie {
  imdbID: string
  title: string
  imdbRating: string
  imageSrc: string
  isInLibrary: boolean
}

async function getMovieData(searchTitle: string) {
  const imdbIDs = await searchOmdbAPI(searchTitle)

  const movies = new Array<Movie>(imdbIDs?.length)

  for (let i = 0; i < imdbIDs?.length; i++) {
    const movieInLibrary = await getMoovyAPI(imdbIDs[i])

    if (movieInLibrary) {
      movies[i] = {
        imdbID: imdbIDs[i],
        title: movieInLibrary.title,
        imdbRating: movieInLibrary.imdbRating,
        imageSrc: movieInLibrary.imageSrc,
        isInLibrary: !movieInLibrary.deleted,
      }
    } else {
      const movieOnOmdb = await getOmdbAPI(imdbIDs[i])

      movieOnOmdb &&
        (movies[i] = {
          imdbID: imdbIDs[i],
          title: movieOnOmdb.Title,
          imdbRating: movieOnOmdb.imdbRating,
          imageSrc: getImageSrcOmdbAPI(imdbIDs[i]),
          isInLibrary: false,
        })
    }
  }
  return movies
}

export function Search() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchValue, setSearchValue] = useState('')
  const searchValueRef = useRef('')

  useEffect(() => {
    searchValueRef.current = searchValue
    getMovieData(searchValue).then((res) => {
      searchValueRef.current === searchValue && setMovies(res)
    })
  }, [searchValue])

  return (
    <Container>
      <h1>Search</h1>
      <Box
        component="form"
        className="search__box-input"
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={({ target }) => setSearchValue(target.value)}
          label="An amazing movie"
          variant="outlined"
        />
        <IconSearch className="search__search-icon" />
      </Box>

      <Box className="search__box-movie-cards">
        {movies[0]
          ? movies.map((movie, index) => {
              return <MovieCard key={index} movie={movie} />
            })
          : searchValue && (
              <div className="search__display-message">
                <h2>We couldn't find the movies you were lookin for :(</h2>
                <IconSearch />
              </div>
            )}
      </Box>
    </Container>
  )
}
