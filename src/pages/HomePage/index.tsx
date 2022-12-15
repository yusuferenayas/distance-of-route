import { useState } from 'react'
import type { NextPage } from 'next'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

import Container from 'src/components/Container'
import Layout from 'src/components/Layout'

import * as S from './styled'

const HomePage: NextPage = () => {
  const [value, setValue] = useState<Date | null>(new Date())

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  return (
    <Layout>
      <Container>
        <form>
          <S.FormContainer>
            <S.FormElement>
              <TextField label='City of Origin' variant='outlined' fullWidth />
            </S.FormElement>
            <S.FormElement>
              <TextField
                label='Intermediate City'
                variant='outlined'
                fullWidth
              />
            </S.FormElement>
            <S.FormElement>
              <TextField
                label='City of Destination'
                variant='outlined'
                fullWidth
              />
            </S.FormElement>
            <S.FormElement>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label='Date of the Trip'
                  inputFormat='MM/DD/YYYY'
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </S.FormElement>
            <S.FormElement>
              <TextField
                label='Number of Passengers'
                variant='outlined'
                fullWidth
                type='number'
              />
            </S.FormElement>
            <Button type='submit' fullWidth variant='contained'>
              Calculate
            </Button>
          </S.FormContainer>
        </form>
      </Container>
    </Layout>
  )
}

export default HomePage
