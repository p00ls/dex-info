import { useEffect } from 'react'
import ReactGA from 'react-ga'
import { useLocation } from 'react-router-dom'

// fires a GA pageview every time the route changes
const GoogleAnalyticsReporter = () => {
  const { pathname, search } = useLocation()
  useEffect(() => {
    ReactGA.pageview(`${pathname}${search}`)
  }, [pathname, search])
  return null
}

export default GoogleAnalyticsReporter
