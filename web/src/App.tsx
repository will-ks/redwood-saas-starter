import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import PromiseRejectionHandler from 'react-promise-rejection-handler'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'
import theme from './data/theme'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <PromiseRejectionHandler>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <AuthProvider>
          <MantineProvider theme={theme}>
            <RedwoodApolloProvider useAuth={useAuth}>
              <ModalsProvider>
                <Routes />
              </ModalsProvider>
            </RedwoodApolloProvider>
          </MantineProvider>
        </AuthProvider>
      </RedwoodProvider>
    </PromiseRejectionHandler>
  </FatalErrorBoundary>
)

export default App
