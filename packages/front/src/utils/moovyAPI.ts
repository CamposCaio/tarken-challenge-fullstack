import axios from 'axios'
import { Movie } from './interfaceMovie'

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
      `${import.meta.env.VITE_API_URL}/movies/${imdbID}`
    )
    return data
  } catch {
    return null
  }
}

export async function getAllMoovyAPI() {
  try {
    const { data } = await axios.get<MoovyAPI[]>(
      `${import.meta.env.VITE_API_URL}/movies`
    )
    const onlyNotDeleted = data.filter((data) => {
      return !data.deleted
    })
    return onlyNotDeleted
  } catch {
    return null
  }
}

export async function postMoovyAPI(movie: Movie) {
  try {
    return axios.post<MoovyAPI>(`${import.meta.env.VITE_API_URL}/movies`, {
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
      `${import.meta.env.VITE_API_URL}/movies/${imdbID}`
    )
    return data
  } catch {
    return null
  }
}
