import { FC, PropsWithChildren, useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { client } from './apollo/client'
import PinnedData from './components/PinnedData'
import { useGlobalChartData, useGlobalData } from './contexts/GlobalData'
import AccountPage from './pages/AccountPage'
import AllPairsPage from './pages/AllPairsPage'
import AllTokensPage from './pages/AllTokensPage'
import GlobalPage from './pages/GlobalPage'
import PairPage from './pages/PairPage'
import TokenPage from './pages/TokenPage'
import { isAddress } from './utils'

import GoogleAnalyticsReporter from './components/analytics/GoogleAnalyticsReporter'
import LocalLoader from './components/LocalLoader'
import SideNav from './components/SideNav'
import { PAIR_BLACKLIST, TOKEN_BLACKLIST } from './constants'
import { useLatestBlocks } from './contexts/Application'
import AccountLookup from './pages/AccountLookup'

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
`
const ContentWrapper = styled.div<{ open?: boolean }>`
  display: grid;
  grid-template-columns: ${({ open }) => (open ? '220px 1fr 200px' : '220px 1fr 64px')};

  @media screen and (max-width: 1400px) {
    grid-template-columns: 220px 1fr;
  }

  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr;
    max-width: 100vw;
    overflow: hidden;
    grid-gap: 0;
  }
`

const Right = styled.div<{ open?: boolean }>`
  position: fixed;
  right: 0;
  bottom: 0rem;
  z-index: 99;
  width: ${({ open }) => (open ? '220px' : '64px')};
  height: ${({ open }) => (open ? 'fit-content' : '64px')};
  overflow: auto;
  background-color: ${({ theme }) => theme.bg1};
  @media screen and (max-width: 1400px) {
    display: none;
  }
`

const Center = styled.div`
  height: 100%;
  z-index: 9999;
  transition: width 0.25s ease;
  background-color: ${({ theme }) => theme.onlyLight};
`

const WarningWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const WarningBanner = styled.div`
  background-color: #ff6871;
  padding: 1.5rem;
  color: white;
  width: 100%;
  text-align: center;
  font-weight: 500;
`

/**
 * Wrap the component with the header and sidebar pinned tab
 */
const LayoutWrapper: FC<PropsWithChildren<{ savedOpen?: boolean; setSavedOpen: (open: boolean) => void }>> = ({
  children,
  savedOpen,
  setSavedOpen,
}) => {
  return (
    <>
      <ContentWrapper open={savedOpen}>
        <SideNav />
        <Center id="center">{children}</Center>
        <Right open={savedOpen}>
          <PinnedData open={savedOpen} setSavedOpen={setSavedOpen} />
        </Right>
      </ContentWrapper>
    </>
  )
}

const BLOCK_DIFFERENCE_THRESHOLD = 30

const TokenComponent = ({ savedOpen, setSavedOpen }: { savedOpen: boolean; setSavedOpen: (open: boolean) => void }) => {
  const { tokenAddress } = useParams<{ tokenAddress: string }>()

  if (isAddress(tokenAddress.toLowerCase()) && !Object.keys(TOKEN_BLACKLIST).includes(tokenAddress.toLowerCase())) {
    return (
      <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
        <TokenPage address={tokenAddress.toLowerCase()} />
      </LayoutWrapper>
    )
  } else {
    return <Navigate to="/home" replace />
  }
}

const PairComponent = ({ savedOpen, setSavedOpen }: { savedOpen: boolean; setSavedOpen: (open: boolean) => void }) => {
  const { pairAddress } = useParams<{ pairAddress: string }>()

  if (isAddress(pairAddress.toLowerCase()) && !Object.keys(PAIR_BLACKLIST).includes(pairAddress.toLowerCase())) {
    return (
      <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
        <PairPage pairAddress={pairAddress.toLowerCase()} />
      </LayoutWrapper>
    )
  } else {
    return <Navigate to="/home" replace />
  }
}

const AccountComponent = ({
  savedOpen,
  setSavedOpen,
}: {
  savedOpen: boolean
  setSavedOpen: (open: boolean) => void
}) => {
  const { accountAddress } = useParams<{ accountAddress: string }>()

  if (isAddress(accountAddress.toLowerCase())) {
    return (
      <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
        <AccountPage account={accountAddress.toLowerCase()} />
      </LayoutWrapper>
    )
  } else {
    return <Navigate to="/home" replace />
  }
}

function App() {
  const [savedOpen, setSavedOpen] = useState(false)

  const globalData = useGlobalData()
  const globalChartData = useGlobalChartData()
  const [latestBlock, headBlock] = useLatestBlocks()

  // show warning
  const showWarning = headBlock && latestBlock ? headBlock - latestBlock > BLOCK_DIFFERENCE_THRESHOLD : false

  return (
    <ApolloProvider client={client}>
      <AppWrapper>
        {showWarning && (
          <WarningWrapper>
            <WarningBanner>
              {`Warning: The data on this site has only synced to Ethereum block ${latestBlock} (out of ${headBlock}). Please check back soon.`}
            </WarningBanner>
          </WarningWrapper>
        )}
        {globalData &&
        Object.keys(globalData).length > 0 &&
        globalChartData &&
        Object.keys(globalChartData).length > 0 ? (
          <BrowserRouter>
            <GoogleAnalyticsReporter />
            <Routes>
              <Route
                path="/token/:tokenAddress"
                element={<TokenComponent savedOpen={savedOpen} setSavedOpen={setSavedOpen} />}
              />
              <Route
                path="/pair/:pairAddress"
                element={<PairComponent savedOpen={savedOpen} setSavedOpen={setSavedOpen} />}
              />

              <Route
                path="/account/:accountAddress"
                element={<AccountComponent savedOpen={savedOpen} setSavedOpen={setSavedOpen} />}
              />
              <Route
                path="/home"
                element={
                  <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                    <GlobalPage />
                  </LayoutWrapper>
                }
              />
              <Route
                path="/tokens"
                element={
                  <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                    <AllTokensPage />
                  </LayoutWrapper>
                }
              />
              <Route
                path="/pairs"
                element={
                  <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                    <AllPairsPage />
                  </LayoutWrapper>
                }
              />
              <Route
                path="/accounts"
                element={
                  <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                    <AccountLookup />
                  </LayoutWrapper>
                }
              />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <LocalLoader fill />
        )}
      </AppWrapper>
    </ApolloProvider>
  )
}

export default App
