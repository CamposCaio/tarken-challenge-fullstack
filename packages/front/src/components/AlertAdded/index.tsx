import Alert from '@mui/material/Alert'
import { useEffect, useState } from 'react'
import { Container } from './styles'

interface Props {
  movieTitle: string
}

export function AlertAdded({ movieTitle }: Props) {
  const [display, setDisplay] = useState(true)
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>()

  function handleClose() {
    setDisplay(false)
  }

  useEffect(() => {
    setDisplay(true)
    timeoutID && clearTimeout(timeoutID)
    setTimeoutID(
      setTimeout(() => {
        setDisplay(false)
      }, 5000)
    )
  }, [movieTitle])

  return display ? (
    <Container>
      <Alert onClose={handleClose}>
        <b>{movieTitle}</b> has been added to your library.
      </Alert>
    </Container>
  ) : (
    <></>
  )
}
