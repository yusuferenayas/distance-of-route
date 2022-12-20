import React, { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import { Control, Controller } from 'react-hook-form'

import useDebounce from 'src/hooks/useDebounce'
import { ICitiesResponse, useApiClient } from 'src/api'

type Props = {
  name: string

  control: Control<any, any>
  optionsToFilter?: string[]
}

const AutoCompleteCity: React.FC<TextFieldProps & Props> = React.forwardRef(
  ({ name, control, optionsToFilter, ...textFieldProps }, ref) => {
    const { fetchCities } = useApiClient()
    const [options, setOptions] = useState<ICitiesResponse>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>('')
    const debouncedKeyword = useDebounce(keyword, 500)

    useEffect(() => {
      const fetchRoutes = async () => {
        const foundRouteOptions = await fetchCities(debouncedKeyword)
        setLoading(false)

        if (foundRouteOptions) {
          const generatedOptions = optionsToFilter?.[0]
            ? foundRouteOptions.filter(
                (option) => !optionsToFilter.includes(option)
              )
            : foundRouteOptions

          setOptions(generatedOptions)
        } else {
          setOptions([])
        }
      }

      if (debouncedKeyword) {
        fetchRoutes()
      }
    }, [debouncedKeyword, fetchCities, optionsToFilter])

    const handleOnChange = async (
      event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setLoading(true)

      const searchValue = event.currentTarget.value
      setKeyword(searchValue)
    }

    return (
      <Controller
        defaultValue={''}
        name={name}
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <Autocomplete
            onChange={(_, data) => onChange(data || '')}
            options={options}
            noOptionsText='No options, Please search for city of France.'
            renderInput={(params) => (
              <TextField
                {...textFieldProps}
                {...params}
                helperText={
                  textFieldProps.error
                    ? `${textFieldProps.label} is required.`
                    : ''
                }
                ref={ref}
                variant='outlined'
                fullWidth
                onChange={handleOnChange}
                placeholder='Search for routes...'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            {...props}
          />
        )}
      />
    )
  }
)

AutoCompleteCity.displayName = 'AutoCompleteCity'

export default AutoCompleteCity
