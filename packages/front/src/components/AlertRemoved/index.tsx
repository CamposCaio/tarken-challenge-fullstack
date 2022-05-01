import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { Movie } from '../../utils/interfaceMovie'
import { Container } from './styles'

interface Props {
  removedMovie: Movie
  onClickUndo: (movieToReAdd: Movie) => void
}

export function AlertRemoved({ removedMovie, onClickUndo }: Props) {
  const [display, setDisplay] = useState(true)
  const [timeoutID, setTimeoutID] = useState<number>()

  function handleUndo() {
    setDisplay(false)
    onClickUndo(removedMovie)
  }

  useEffect(() => {
    setDisplay(true)
    timeoutID && clearTimeout(timeoutID)
    setTimeoutID(
      window.setTimeout(() => {
        setDisplay(false)
      }, 5000)
    )
  }, [removedMovie])

  return display ? (
    <Container>
      <Alert
        action={
          <Button onClick={handleUndo} color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        <b>{removedMovie.title}</b> has been removed from your library.
      </Alert>
    </Container>
  ) : (
    <></>
  )
}
