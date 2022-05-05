import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import IconStar from '@mui/icons-material/Star'
import IconPlay from '@mui/icons-material/PlayArrow'
import IconStop from '@mui/icons-material/Stop'
import { Container } from './styles'
import { Movie } from '../../utils/interfaceMovie'
import { useEffect, useState } from 'react'

interface MovieCardProps {
  movie: Movie
  onAction: (eventType: 'add' | 'remove', targetMovie: Movie) => void
}

export function MovieCard({ movie, onAction }: MovieCardProps) {
  const [audio, setAudio] = useState<HTMLAudioElement>()
  const [isPlaying, setIsPlaying] = useState(false)
  function handleRemove() {
    onAction('remove', movie)
  }

  function handleAdd() {
    onAction('add', movie)
  }

  function handlePlayAudio() {
    if (!audio) return
    audio.play()
    setIsPlaying(true)
  }

  function handleStopAudio() {
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
  }

  useEffect(() => {
    if (!movie.audioSrc) return
    const audio = document.createElement('audio')
    document.body.appendChild(audio)
    const source = document.createElement('source')
    source.src = `${import.meta.env.VITE_API_URL}/audios/${movie.imdbID}`
    source.type = 'audio/mp4'
    audio.appendChild(source)
    setAudio(audio)
  }, [])

  return (
    <Container>
      <Card className="movie-card">
        {movie.isInLibrary && movie.audioSrc && (
          <Button
            title="Listen to your audio review"
            onClick={isPlaying ? handleStopAudio : handlePlayAudio}
            className="movie-card__container-play"
          >
            {isPlaying ? (
              <IconStop className="movie-card__play" />
            ) : (
              <IconPlay className="movie-card__play" />
            )}
          </Button>
        )}
        {movie.isInLibrary && !movie.audioSrc && (
          <div className="movie-card__record-on-app">
            Record a review on mobile app!
          </div>
        )}
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
