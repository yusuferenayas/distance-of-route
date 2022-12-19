import { NextApiRequest, NextApiResponse } from 'next'
import { IDistanceRequest, IGeoData } from 'src/api'
import { calculateDistance } from 'src/utils/distance'
import { geoData } from './data/geoData'

const PROVIDE_ROUTE_MESSAGE = 'Please provide valid routes!'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query as IDistanceRequest
  const cityNames =
    typeof query.cityNames === 'string' ? [query.cityNames] : query.cityNames

  const cityCounts = cityNames?.length || 0

  if (!cityNames || cityCounts < 2) {
    return res.status(500).send(PROVIDE_ROUTE_MESSAGE)
  } else {
    const citiesOnRoute: IGeoData[] = []

    cityNames.forEach((routeCity) => {
      const foundCity = geoData.find(
        (city) => city.name.toLowerCase() === routeCity.toLowerCase()
      )

      if (foundCity) {
        citiesOnRoute.push(foundCity)
      }
    })

    if (citiesOnRoute.length < 2 || citiesOnRoute.length !== cityCounts) {
      return res.status(500).send(PROVIDE_ROUTE_MESSAGE)
    }

    let totalDistance = 0

    citiesOnRoute.forEach((cityOnRoute, index) => {
      if (citiesOnRoute[index + 1]) {
        const distanceBetweenRoutes = calculateDistance(
          cityOnRoute.lat,
          cityOnRoute.long,
          citiesOnRoute[index + 1].lat,
          citiesOnRoute[index + 1].long
        )
        totalDistance += distanceBetweenRoutes
      }
    })

    return res
      .status(200)
      .json({ totalDistance: totalDistance.toFixed(2), unit: 'km' })
  }
}
