import styled from 'styled-components'
import TokenLogo from '../TokenLogo'

const TokenWrapper = styled.div<{ sizeraw: number; margin: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-right: ${({ sizeraw, margin }) => margin && (sizeraw / 3 + 8).toString() + 'px'};
`

const HigherLogo = styled(TokenLogo)`
  z-index: 2;
  // background-color: white;
  border-radius: 50%;
`

const CoveredLogo = styled(TokenLogo)<{ sizeraw: number }>`
  position: absolute;
  left: ${({ sizeraw }) => (sizeraw / 2).toString() + 'px'};
  // background-color: white;
  border-radius: 50%;
`

export default function DoubleTokenLogo({
  a0,
  a1,
  size = 24,
  margin = false,
}: {
  a0: string
  a1: string
  size?: number
  margin?: boolean
}) {
  return (
    <TokenWrapper sizeraw={size} margin={margin}>
      <HigherLogo address={a0} size={size.toString() + 'px'} />
      <CoveredLogo address={a1} size={size.toString() + 'px'} sizeraw={size} />
    </TokenWrapper>
  )
}
