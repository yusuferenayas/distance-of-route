export type ICitiesResponse = string[]
export type ICitiesRequest = { keyword: string }

export type IDistanceResponse = {
  totalDistance: string
  unit: string
}

export type IDistanceRequest = {
  cityNames: string[]
}

export interface IGeoData {
  name: string
  lat: number
  long: number
}
