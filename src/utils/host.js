import { getCookie } from "./cookies"

export const baseUrl = 'https://pcmback-production.up.railway.app'
export const TOKEN = 'PCM_TOKEN'
const token = getCookie(TOKEN)
export const headers = {
  "Content-type": 'application/json; charset=utf-8',
  "Accept": 'application/json',
  "Authorization": token ? `Bearer ${token}` : ''
}