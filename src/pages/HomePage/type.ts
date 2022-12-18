import dayjs from 'dayjs'

export type FormValuesType = {
  cityOfOrigin: string
  intermediateCities: { name: string }[]
  cityOfDestination: string
  numberOfPassenger: number
  dateOfTrip: Date
}

export const defaultFormValues: FormValuesType = {
  cityOfOrigin: '',
  intermediateCities: [],
  cityOfDestination: '',
  dateOfTrip: dayjs().add(1, 'day').toDate(),
  numberOfPassenger: 0,
}
