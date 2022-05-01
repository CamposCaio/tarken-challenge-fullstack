import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import IconStar from '@mui/icons-material/Star'
import { Container } from './styles'
import { Movie } from '../../utils/interfaceMovie'

interface MovieCardProps {
  movie: Movie
  onAction: (eventType: 'add' | 'remove', targetMovie: Movie) => void
}

export function MovieCard({ movie, onAction }: MovieCardProps) {
  function handleRemove() {
    onAction('remove', movie)
  }

  function handleAdd() {
    onAction('add', movie)
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
          {movie.isInLibrary ? (
            <Button onClick={handleRemove} size="small" color="error">
              Remove from library
            </Button>
          ) : (
            <Button onClick={handleAdd} size="small">
              Add to my library
            </Button>
          )}
        </CardActions>
      </Card>
    </Container>
  )
}
