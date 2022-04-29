import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { Container } from './styles'
import IconSearch from '@mui/icons-material/Search'
import MovieCard from '../../components/MovieCard'
import { useState } from 'react'

const apiKey = '70f95db1'

export interface Movie {
  imdbID: string
  Title: string
  imdbRating: string
  imageSrc: string
}

async function getMovieData(value: string) {
  const { data } = await axios.get(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${value}`
  )

  const IDs = data.Search?.map((obj: any) => obj.imdbID)
  const movies = new Array<Movie>(IDs?.length)

  for (let i = 0; i < IDs?.length; i++) {
    const resData = await axios.get<Movie>(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${IDs[i]}`
    )

    movies[i] = {
      imdbID: IDs[i],
      Title: resData.data.Title,
      imdbRating: resData.data.imdbRating,
      imageSrc: `http://img.omdbapi.com/?apikey=${apiKey}&i=${IDs[i]}&w=258`,
    }
  }
  return movies
}

export function Search() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchValue, setSearchValue] = useState('')

  function handleSearchMovie(value: string) {
    setSearchValue(value)
    getMovieData(value).then((res) => {
      setMovies(res)
      console.log(res)
    })
  }

  return (
    <Container>
      <h1>Search</h1>
      <Box
        component="form"
        sx={{
          position: 'relative',
          width: 'min(100%, 43ch)',
          my: '1rem',
          '& .MuiFormControl-root': {
            width: '100%',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={({ target }) => handleSearchMovie(target.value)}
          label="An amazing movie"
          variant="outlined"
        />
        <IconSearch className="search__search-icon" />
      </Box>

      <Box className="search__box-movie-cards">
        {movies[0] ? (
          movies.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                imageSrc={movie.imageSrc}
                title={movie.Title}
                rating={movie.imdbRating}
              />
            )
          })
        ) : (
          <div className="search__display-message">
            <h2>
              {searchValue
                ? "We couldn't find the movies you were lookin for :("
                : "It's a beautiful day today"}
            </h2>
            <IconSearch />
          </div>
        )}
      </Box>
    </Container>
  )
}
