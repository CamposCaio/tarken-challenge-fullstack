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
  let timeoutID: NodeJS.Timeout

  function handleUndo() {
    setDisplay(false)
    onClickUndo(removedMovie)
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
        action={
          <Button onClick={handleUndo} color="inherit" size="small">
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
