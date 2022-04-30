import axios from 'axios'
import { Movie } from '../routes/Search'

export interface MoovyAPI {
  id: number
  imdbID: string
  title: string
  imdbRating: string
  imageSrc: string
  audioSrc?: string
  deleted: boolean
  createdAt: Date
  updatedAt: Date
}

export async function getMoovyAPI(imdbID: string) {
  try {
    const { data } = await axios.get<MoovyAPI>(
      `${import.meta.env.VITE_API_URL}/movie/${imdbID}`
    )
    return data
  } catch {
    return null
  }
}

export async function postMoovyAPI(movie: Movie) {
  try {
    return axios.post<MoovyAPI>(`${import.meta.env.VITE_API_URL}/movie`, {
      imdbID: movie.imdbID,
      title: movie.title,
      imdbRating: movie.imdbRating,
      imageSrc: movie.imageSrc,
    })
  } catch {
    return null
  }
}

export async function deleteMoovyAPI(imdbID: string) {
  try {
    const { data } = await axios.delete<MoovyAPI>(
      `${import.meta.env.VITE_API_URL}/movie/${imdbID}`
    )
    return data
  } catch {
    return null
  }
}
