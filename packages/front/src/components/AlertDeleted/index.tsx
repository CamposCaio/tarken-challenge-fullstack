import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { Movie } from '../../utils/interfaceMovie'
import { postMoovyAPI } from '../../utils/moovyAPI'
import { Container } from './styles'

interface Props {
  removedMovie: Movie
  onUndo?: (removedMovie: Movie) => void
}

export function AlertDeleted({ removedMovie, onUndo }: Props) {
  const [display, setDisplay] = useState(true)
  let timeoutID: NodeJS.Timeout

  function handleAddMovie() {
    postMoovyAPI(removedMovie).then((res) => {
      if (res) onUndo && onUndo(removedMovie)
    })
  }

  useEffect(() => {
    setDisplay(true)
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      setDisplay(false)
    }, 5000)
  }, [removedMovie])

  return display ? (
    <Container>
      <Alert
        className="library__alert-deleted"
        action={
          <Button onClick={handleAddMovie} color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        <b>{removedMovie.title}</b> was removed from your library.
      </Alert>
    </Container>
  ) : (
    <></>
  )
}
