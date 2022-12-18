import { NextApiRequest, NextApiResponse } from 'next'
import { IGeoData } from 'src/api'
import { geoData } from './data/geoData'

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  var p = 0.017453292519943295 // Math.PI / 180
  var c = Math.cos
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2

  return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
}

const PROVIDE_ROUTE_MESSAGE = 'Please provide routes!'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query
  const cityNames =
    typeof query.cityNames === 'string' ? [query.cityNames] : query.cityNames

  const cityCounts = cityNames?.length || 0

  if (!cityNames || cityCounts < 2) {
    return res.status(500).send(PROVIDE_ROUTE_MESSAGE)
  } else {
    const citiesOnRoute: IGeoData[] = []

    cityNames.forEach((routeCity) => {
      const foundCity = geoData.find((city) =>
        city.name.toLowerCase().includes(routeCity.toLowerCase())
      )

      if (foundCity) {
        citiesOnRoute.push(foundCity)
      }
    })

    if (citiesOnRoute.length < 2) {
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
