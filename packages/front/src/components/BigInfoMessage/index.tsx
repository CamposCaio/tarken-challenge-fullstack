import IconSearch from '@mui/icons-material/Search'
import { Container } from './styles'

interface Props {
  message: string
}

export function BigInfoMessage({ message }: Props) {
  return (
    <Container>
      <h2>{message}</h2>
      <IconSearch />
    </Container>
  )
}
