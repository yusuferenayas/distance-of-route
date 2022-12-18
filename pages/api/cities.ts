import { NextApiRequest, NextApiResponse } from 'next'
import { geoData } from './data/geoData'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query
  const keyword = query.keyword as string

  if (!keyword || keyword?.length === 0) {
    return res.status(500).send('Please provide a search term!')
  } else {
    const foundCities = geoData
      .filter((city) => city.name.toLowerCase().includes(keyword.toLowerCase()))
      .map((city) => city.name)

    return res.status(200).json(foundCities)
  }
}
