export const splitArray = (array: string[]) => {
  const first = array.at(0)
  const last = array.at(-1)
  const between = array.slice(1, array.length - 1)

  return { first, last, between }
}
