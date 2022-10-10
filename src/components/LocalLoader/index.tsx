import styled, { css, keyframes } from 'styled-components'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as LogoWhite } from '../../assets/logo_white.svg'
import { useDarkModeManager } from '../../contexts/LocalStorage'

const pulse = keyframes`
  0% { transform: scale(1); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
`

const Wrapper = styled.div.attrs(({ fill }: { fill?: boolean }) => ({ fill: fill?.toString() }))`
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  ${(props) =>
    props.fill
      ? css`
          height: 100vh;
        `
      : css`
          height: 180px;
        `}
`

const AnimatedImg = styled.div`
  animation: ${pulse} 800ms linear infinite;
  & > * {
    width: 72px;
  }
`

const LocalLoader = ({ fill }: { fill?: boolean }) => {
  const [darkMode] = useDarkModeManager()

  return (
    <Wrapper fill={fill}>
      <AnimatedImg>{darkMode ? <LogoWhite /> : <Logo />}</AnimatedImg>
    </Wrapper>
  )
}

export default LocalLoader
