import { ApiClient } from './ApiClient/client'
export * from './ApiClient/interface'

const apiClient = new ApiClient()

const useApiClient = () => {
  return apiClient
}

export { useApiClient }
