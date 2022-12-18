import { useMemo } from 'react'
import type { NextPage } from 'next'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

import Container from 'src/components/Container'
import Layout from 'src/components/Layout'
import AutoCompleteCity from 'src/components/AutoCompleteCity'

import { FormValuesType, defaultFormValues } from './type'
import * as S from './styled'

const HomePage: NextPage = () => {
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<FormValuesType>({
    defaultValues: defaultFormValues,
    reValidateMode: 'onChange',
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'intermediateCities',
  })

  const formValues = watch()

  const fieldsLength = useMemo(() => fields.length, [fields.length])
  const routeCities = useMemo(() => {
    const { cityOfOrigin, cityOfDestination, intermediateCities } = formValues

    return [
      cityOfOrigin,
      ...intermediateCities.map((city) => city.name),
      cityOfDestination,
    ].filter((name) => !!name)
  }, [formValues])

  const onSubmit = (data: FormValuesType) => {
    alert(JSON.stringify(data))
  }

  const handleAddCity = () => append({ name: '' })
  const handleRemoveCity = () => remove(fieldsLength - 1)

  return (
    <Layout>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormContainer>
            <S.FormElement>
              <AutoCompleteCity
                label='City of Origin'
                control={control}
                error={!!errors.cityOfOrigin}
                {...register('cityOfOrigin', { required: true })}
              />
            </S.FormElement>

            {fields.map((item, index) => (
              <S.FormElement key={index + item.id}>
                <AutoCompleteCity
                  label={`Intermediate City #${index + 1}`}
                  control={control}
                  error={!!errors.intermediateCities?.[index]?.name}
                  optionsToFilter={routeCities}
                  {...register(`intermediateCities.${index}.name`, {
                    required: true,
                  })}
                />
              </S.FormElement>
            ))}
            <S.FormElement>
              <Tooltip
                title={
                  fieldsLength === 5
                    ? 'You can add max 5 routes'
                    : 'Add Intermediate City'
                }
              >
                <span>
                  <IconButton
                    onClick={handleAddCity}
                    aria-label='add'
                    disabled={fieldsLength === 5}
                  >
                    <AddIcon />
                  </IconButton>
                </span>
              </Tooltip>
              {fieldsLength !== 0 && (
                <Tooltip title='Remove Intermediate City'>
                  <IconButton onClick={handleRemoveCity} aria-label='remove'>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </S.FormElement>
            <S.FormElement>
              <AutoCompleteCity
                label='City of Destination'
                control={control}
                error={!!errors.cityOfDestination}
                optionsToFilter={routeCities}
                {...register('cityOfDestination', { required: true })}
              />
            </S.FormElement>
            <S.FormElement>
              <Controller
                name='dateOfTrip'
                control={control}
                render={({ field: { onChange, ...restField } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      minDate={defaultFormValues.dateOfTrip}
                      label='Date of Trip'
                      onChange={(event) => {
                        onChange(event)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...register('dateOfTrip', {
                            required: true,
                            validate: (date) => dayjs(date).isAfter(dayjs()),
                          })}
                          error={!!errors.dateOfTrip}
                          helperText={
                            errors.dateOfTrip
                              ? 'Date of Trip is required and must be in future.'
                              : ''
                          }
                          fullWidth
                        />
                      )}
                      {...restField}
                    />
                  </LocalizationProvider>
                )}
              />
            </S.FormElement>
            <S.FormElement>
              <TextField
                label='Number of Passengers'
                variant='outlined'
                fullWidth
                type='number'
                error={!!errors.numberOfPassenger}
                helperText={
                  errors.numberOfPassenger ? 'Should be greater than 0' : ''
                }
                {...register('numberOfPassenger', { required: true, min: 1 })}
              />
            </S.FormElement>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={!isValid}
            >
              Calculate
            </Button>
          </S.FormContainer>
        </form>
      </Container>
    </Layout>
  )
}

export default HomePage
