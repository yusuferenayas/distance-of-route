import { splitArray } from '../arrayHelper'

const testArray = [1, 2, 3]

describe('Example utils', () => {
  it('example function should always return true', () => {
    // arrange

    // act
    const res = splitArray(testArray)

    // assert
    expect(res).toEqual({ first: 1, last: 3, between: [2] })
  })
})
