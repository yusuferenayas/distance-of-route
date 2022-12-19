import { IGeoData } from 'src/api'
import { calculateDistance } from '../distance'

const testArray: IGeoData[] = [
  {
    name: 'Paris',
    lat: 48.856614,
    long: 2.352222,
  },
  {
    name: 'Marseille',
    lat: 43.296482,
    long: 5.36978,
  },
]

describe('Example utils', () => {
  it('example function should always return true', () => {
    // arrange

    // act
    const res = calculateDistance(
      testArray[0].lat,
      testArray[0].long,
      testArray[1].lat,
      testArray[1].long
    )

    // assert
    expect(res).toEqual(660.4805742037269)
  })
})
