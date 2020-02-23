import axios, { AxiosRequestConfig } from 'axios'
import { config } from '../services/config'
import { log } from '../services/log'

const BASE_URL = config.API_URL

export const get = <T>(path: string) => {
  log(`Request to ${path}`)
  return axios
    .get<T>(`${BASE_URL}/${path}`)
    .then(response => response.data)
}

export const post = <T>(path: string, payload: any, config?: AxiosRequestConfig) => {
  log(`Request to ${path}`)
  return axios
    .post<T>(`${BASE_URL}/${path}`, payload, config)
    .then(response => response.data)
}