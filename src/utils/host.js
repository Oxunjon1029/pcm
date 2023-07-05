import { getCookie } from "./cookies"

export const baseUrl = 'http://localhost:4000'
export const TOKEN = 'PCM_TOKEN'
const token = getCookie(TOKEN)
export const headers = {
  "Content-type": 'application/json; charset=utf-8',
  "Accept": 'application/json',
  "Authorization": token ? `Bearer ${token}` : ''
}