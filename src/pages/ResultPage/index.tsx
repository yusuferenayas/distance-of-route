import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { IDistanceResponse, useApiClient } from 'src/api'

import { splitArray } from 'src/utils/arrayHelper'
import Layout from 'src/components/Layout'
import { H2, P } from 'src/components/Typography'
import { IResultPageQuery } from './type'

import * as S from './styled'

const AboutPage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [distance, setDistance] = useState<IDistanceResponse | undefined>()
  const { query } = useRouter()
  const { cities, dateOfTrip, numberOfPassenger } = query as IResultPageQuery
  const { calculateDistance } = useApiClient()

  useEffect(() => {
    const fetchDistance = async () => {
      setLoading(true)
      const calculatedDistance = await calculateDistance(cities)

      if (calculatedDistance) {
        setDistance(calculatedDistance)
      }

      setLoading(false)
    }

    if (cities) {
      fetchDistance()
    }
  }, [query, calculateDistance, cities])

  const parsedCities = useMemo(() => splitArray(cities || []), [cities])

  return (
    <Layout>
      <S.ResultContainer>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <P>
              City of Origin: <b>{parsedCities.first}</b>
            </P>
            {parsedCities.between.map((cityName, index) => (
              <P key={cityName + index}>
                Intermediate City #{index}: <b>{cityName}</b>
              </P>
            ))}
            <P>
              City of Destination: <b>{parsedCities.last}</b>
            </P>
            <P>Date of trip: {new Date(dateOfTrip).toLocaleDateString()}</P>
            <P>Number of Passengers: {numberOfPassenger}</P>
            <H2>
              Total Distance:{' '}
              {distance
                ? `${distance.totalDistance}  ${distance.unit}`
                : 'Wrong Value'}
            </H2>
          </>
        )}
      </S.ResultContainer>
    </Layout>
  )
}

export default AboutPage
