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
  onRemove?: (imdbID: any) => void
}

export default function MovieCard({ movie, onRemove }: Props) {
  const [isInLibrary, setIsInLibrary] = useState(movie.isInLibrary)

  function insertMovieInLibrary() {
    postMoovyAPI(movie).then((res) => {
      setIsInLibrary(res ? true : false)
    })
  }

  function removeMovieFromLibrary() {
    deleteMoovyAPI(movie.imdbID).then((res) => {
      if (res && onRemove) onRemove(movie.imdbID)
      // setIsInLibrary(res ? false : true)
    })
  }

  return (
    <Container>
      <Card className="movie-card">
        <CardMedia
          className="movie-card__image"
          component="img"
          image={movie.imageSrc}
          alt="movie cover"
        />
        <CardContent>
          <Typography className="movie-card__content-title">
            {movie.title}
          </Typography>
          <div className="movie-card__content-rating">
            <IconStar className="movie-card__content-star" />
            {movie.imdbRating}
          </div>
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
