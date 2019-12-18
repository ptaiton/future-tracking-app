import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

export const get = <T>(path: string) => {
  return axios
    .get<T>(`${BASE_URL}/${path}`)
    .then(response => response.data)
}

export const post = <T>(path: string, payload: any) => {
  return axios
    .post<T>(`${BASE_URL}/${path}`, payload)
    .then(response => response.data)
}