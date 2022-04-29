import { Container } from './styles'
import IconSearch from '@mui/icons-material/Search'

export function Library() {
  return (
    <Container>
      <h1>Library</h1>
      <div className="search__display-message">
        <h2>
          It looks like there are no movies in your library! Search for a movie
          you have watched and add it here!
        </h2>
        <IconSearch />
      </div>
    </Container>
  )
}
