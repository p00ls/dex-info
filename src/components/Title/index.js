import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Flex } from 'rebass'
import Logo from '../../assets/logo_white.svg'
import Link from '../Link'
import { RowFixed } from '../Row'

import { useMedia } from 'react-use'
import { BasicLink } from '../Link'

const TitleWrapper = styled.div`
  text-decoration: none;
  z-index: 10;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`

const UniIcon = styled(Link)`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const Option = styled.div`
  font-weight: 500;
  font-size: 14px;
  opacity: ${({ activeText }) => (activeText ? 1 : 0.6)};
  color: ${({ theme }) => theme.white};
  display: flex;
  margin-left: 12px;
  :hover {
    opacity: 1;
  }
`

export default function Title() {
  const location = useLocation()
  const navigate = useNavigate()
  const below1080 = useMedia('(max-width: 1080px)')

  return (
    <TitleWrapper onClick={() => navigate('/')}>
      <Flex alignItems="center" style={{ justifyContent: 'space-between' }}>
        <RowFixed>
          <UniIcon id="link" onClick={() => navigate('/')}>
            <img width={'24px'} src={Logo} alt="logo" />
          </UniIcon>
          {/* {!below1080 && (
            <img width={'84px'} style={{ marginLeft: '24px', marginTop: '0px' }} src={Wordmark} alt="logo" />
          )} */}
        </RowFixed>
        {below1080 && (
          <RowFixed style={{ alignItems: 'flex-end' }}>
            <BasicLink to="/home">
              <Option activeText={location.pathname === '/home' ?? undefined}>Overview</Option>
            </BasicLink>
            <BasicLink to="/tokens">
              <Option
                activeText={
                  (location.pathname.split('/')[1] === 'tokens' || location.pathname.split('/')[1] === 'token') ??
                  undefined
                }
              >
                Tokens
              </Option>
            </BasicLink>
            <BasicLink to="/pairs">
              <Option
                activeText={
                  (location.pathname.split('/')[1] === 'pairs' || location.pathname.split('/')[1] === 'pair') ??
                  undefined
                }
              >
                Pairs
              </Option>
            </BasicLink>

            <BasicLink to="/accounts">
              <Option
                activeText={
                  (location.pathname.split('/')[1] === 'accounts' || location.pathname.split('/')[1] === 'account') ??
                  undefined
                }
              >
                Accounts
              </Option>
            </BasicLink>
          </RowFixed>
        )}
      </Flex>
    </TitleWrapper>
  )
}
