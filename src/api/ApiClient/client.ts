import axios, { AxiosInstance } from 'axios'
import { apiRoutes } from 'src/constants/routes'
import { notifyError } from 'src/utils/notification'
import {
  ICitiesRequest,
  ICitiesResponse,
  IDistanceRequest,
  IDistanceResponse,
} from './interface'

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
        notifyError(error.response.data)
        return error
      }
    )

    this.axiosApi = axiosApi
  }

  fetchCities = async (keyword: string): Promise<ICitiesResponse | null> => {
    const response = await this.axiosApi.get<ICitiesResponse>(
      apiRoutes.fetchCities,
      { params: { keyword } as ICitiesRequest }
    )

    return response?.data
  }

  calculateDistance = async (
    cityNames: string[]
  ): Promise<IDistanceResponse | null> => {
    const response = await this.axiosApi.get<IDistanceResponse>(
      apiRoutes.fetchDistance,
      {
        params: { cityNames } as IDistanceRequest,
        paramsSerializer: { indexes: null },
      }
    )

    return response?.data
  }
}

export { ApiClient }
