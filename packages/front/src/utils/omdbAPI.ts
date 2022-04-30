import axios from 'axios'

const OMDB_KEY = import.meta.env.VITE_OMDB_API_KEY
const OMDB_URL = import.meta.env.VITE_OMDB_API_URL
const OMDB_IMAGE_URL = import.meta.env.VITE_OMDB_API_IMAGE_URL

export interface OmdbMovie {
  imdbID: string
  Title: string
  imdbRating: string
  imageSrc: string
}

export async function searchOmdbAPI(Title: string) {
  const { data } = await axios.get(`${OMDB_URL}/?apikey=${OMDB_KEY}&s=${Title}`)

  return data.Search?.map((obj: OmdbMovie) => obj.imdbID)
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
