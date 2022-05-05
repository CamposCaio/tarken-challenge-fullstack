import axios from 'axios'
import { Movie } from './interfaceMovie'
import { getMoovyAPI } from './moovyAPI'

const OMDB_KEY = import.meta.env.VITE_OMDB_API_KEY
const OMDB_URL = import.meta.env.VITE_OMDB_API_URL
const OMDB_IMAGE_URL = import.meta.env.VITE_OMDB_API_IMAGE_URL

export interface OmdbMovie {
  imdbID: string
  Title: string
  imdbRating: string
  imageSrc: string
}

export async function searchOmdbAPI(Title: string): Promise<Movie[]> {
  try {
    const { data } = await axios.get(
      `${OMDB_URL}/?apikey=${OMDB_KEY}&s=${Title}`
    )

    const imdbIDs = data.Search?.map((obj: OmdbMovie) => obj.imdbID)

    const movies = new Array<Movie>(imdbIDs?.length)

    for (let i = 0; i < imdbIDs?.length; i++) {
      const movieInLibrary = await getMoovyAPI(imdbIDs[i])

      if (movieInLibrary) {
        movies[i] = {
          imdbID: imdbIDs[i],
          title: movieInLibrary.title,
          imdbRating: movieInLibrary.imdbRating,
          imageSrc: movieInLibrary.imageSrc,
          audioSrc: movieInLibrary.audioSrc,
          isInLibrary: !movieInLibrary.deleted,
        }
      } else {
        const movieOnOmdb = await getOmdbAPI(imdbIDs[i])
        movieOnOmdb &&
          (movies[i] = {
            imdbID: imdbIDs[i],
            title: movieOnOmdb.Title,
            imdbRating: movieOnOmdb.imdbRating,
            imageSrc: getImageSrcOmdbAPI(imdbIDs[i]),
            audioSrc: null,
            isInLibrary: false,
          })
      }
    }

    return movies
  } catch {
    return []
  }
}

export async function getOmdbAPI(imdbID: string) {
  try {
    const { data } = await axios.get<OmdbMovie>(
      `${OMDB_URL}/?apikey=${OMDB_KEY}&i=${imdbID}`
    )
    return data
  } catch {
    return null
  }
}

export function getImageSrcOmdbAPI(imdbID: string) {
  return `${OMDB_IMAGE_URL}/?apikey=${OMDB_KEY}&i=${imdbID}&w=258`
}
