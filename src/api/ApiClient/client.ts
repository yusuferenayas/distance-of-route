import axios, { AxiosInstance } from 'axios'
import { apiRoutes } from 'src/constants/routes'
import { notifyError } from 'src/utils/notification'
import { ICitiesResponse } from './interface'

class ApiClient {
  axiosApi: AxiosInstance

  constructor() {
    const axiosApi = axios.create({
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
      timeout: 20000,
    })

    axiosApi.interceptors.response.use(
      (response) => response,
      (error) => {
        notifyError(error)
        return error
      }
    )

    this.axiosApi = axiosApi
  }

  fetchCities = async (keyword: string): Promise<ICitiesResponse | null> => {
    const response = await this.axiosApi.get<ICitiesResponse>(
      apiRoutes.fetchCities,
      { params: { keyword } }
    )

    return response?.data
  }
}

export { ApiClient }
