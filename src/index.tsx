import { FC, ReactNode } from 'react'
import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import App from './App'
import ApplicationContextProvider from './contexts/Application'
import GlobalDataContextProvider from './contexts/GlobalData'
import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from './contexts/LocalStorage'
import PairDataContextProvider, { Updater as PairDataContextUpdater } from './contexts/PairData'
import TokenDataContextProvider, { Updater as TokenDataContextUpdater } from './contexts/TokenData'
import UserContextProvider from './contexts/User'
import ThemeProvider, { GlobalStyle } from './Theme'

// initialize GA
const GOOGLE_ANALYTICS_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID

if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
    gaOptions: {
      storage: 'none',
      storeGac: false,
    },
  })
  ReactGA.set({
    anonymizeIp: true,
    customBrowserType: !isMobile
      ? 'desktop'
      : 'web3' in window || 'ethereum' in window
      ? 'mobileWeb3'
      : 'mobileRegular',
  })
} else {
  ReactGA.initialize('test', { testMode: true, debug: true })
}

const ContextProviders: FC<{ children?: ReactNode }> = ({ children }) => (
  <LocalStorageContextProvider>
    <ApplicationContextProvider>
      <TokenDataContextProvider>
        <GlobalDataContextProvider>
          <PairDataContextProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </PairDataContextProvider>
        </GlobalDataContextProvider>
      </TokenDataContextProvider>
    </ApplicationContextProvider>
  </LocalStorageContextProvider>
)

function Updaters() {
  return (
    <>
      <LocalStorageContextUpdater />
      <PairDataContextUpdater />
      <TokenDataContextUpdater />
    </>
  )
}

ReactDOM.render(
  <ContextProviders>
    <Updaters />
    <ThemeProvider>
      <>
        <GlobalStyle />
        <App />
      </>
    </ThemeProvider>
  </ContextProviders>,
  document.getElementById('root')
)
