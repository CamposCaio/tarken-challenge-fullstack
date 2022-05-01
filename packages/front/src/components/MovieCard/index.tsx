import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import IconStar from '@mui/icons-material/Star'
import { Container } from './styles'
import { Movie } from '../../utils/interfaceMovie'
import { deleteMoovyAPI, postMoovyAPI } from '../../utils/moovyAPI'
import { useState } from 'react'

interface MovieCardProps {
  movie: Movie
  onChange?: (targetMovie: Movie, eventType: 'added' | 'removed') => void
}

export function MovieCard({ movie, onChange }: MovieCardProps) {
  const [isInLibrary, setIsInLibrary] = useState(movie.isInLibrary)
  function handleRemoveMovie() {
    deleteMoovyAPI(movie.imdbID).then((res) => {
      if (res) {
        setIsInLibrary(false)
        onChange && onChange(movie, 'removed')
      }
    })
  }

  function handleAddMovie() {
    postMoovyAPI(movie).then((res) => {
      if (res) {
        setIsInLibrary(true)
        onChange && onChange(movie, 'added')
      }
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
            <Button onClick={handleRemoveMovie} size="small" color="error">
              Remove from library
            </Button>
          ) : (
            <Button onClick={handleAddMovie} size="small">
              Add to my library
            </Button>
          )}
        </CardActions>
      </Card>
    </Container>
  )
}
