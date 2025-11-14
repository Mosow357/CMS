import { Api } from './Api'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Cliente API para el servidor (server-side)
export const createApiClient = (token?: string) => {
  return new Api({
    baseUrl: API_URL,
    baseApiParams: {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    },
  })
}

// Cliente API por defecto (sin autenticación)
export const apiClient = createApiClient()
