import type { AppProps } from 'next/app'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'

import GlobalStyle from 'src/styles/globalStyles'
import { theme } from 'src/styles/styledTheme'
import SeoHeadTags from 'src/components/Head/SeoHeadTags'

import 'react-toastify/dist/ReactToastify.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <SeoHeadTags
        pageTitle='Distance of Route / France'
        description='Test project'
      />
      <Component {...pageProps} />
      <ToastContainer />
      <GlobalStyle />
    </StyledThemeProvider>
  )
}

export default MyApp
