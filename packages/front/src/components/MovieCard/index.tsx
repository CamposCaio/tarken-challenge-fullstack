import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import IconStar from '@mui/icons-material/Star'
import { Movie } from '../../routes/Search'
import { useState } from 'react'
import { deleteMoovyAPI, postMoovyAPI } from '../../utils/moovyAPI'
import { Container } from './styles'

interface Props {
  movie: Movie
}

export default function MovieCard({ movie }: Props) {
  const [isInLibrary, setIsInLibrary] = useState(movie.isInLibrary)

  function insertMovieInLibrary() {
    postMoovyAPI(movie).then((res) => {
      setIsInLibrary(res ? true : false)
    })
  }

  function removeMovieFromLibrary() {
    deleteMoovyAPI(movie.imdbID).then((res) => {
      setIsInLibrary(res ? true : false)
    })
  }

  return (
    <Container>
      <Card className="movie-card__card">
        <CardMedia
          className="movie-card__card-media"
          component="img"
          image={movie.imageSrc}
          height={300}
          alt="movie cover"
        />
        <CardContent>
          <Typography fontSize="1.2rem" color="text.secondary" gutterBottom>
            {movie.title}
          </Typography>
          <IconStar fontSize="small" color="primary" />
          {movie.imdbRating}
        </CardContent>
        <CardActions>
          {isInLibrary ? (
            <Button onClick={removeMovieFromLibrary} size="small" color="error">
              Remove from library
            </Button>
          ) : (
            <Button onClick={insertMovieInLibrary} size="small">
              Add to my library
            </Button>
          )}
        </CardActions>
      </Card>
    </Container>
  )
}
