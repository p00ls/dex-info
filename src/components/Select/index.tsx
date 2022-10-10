import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import ReactSelect, { MenuProps, OptionTypeBase } from 'react-select'
import styled from 'styled-components'

import Popout from './popout'

import { customStyles, customStylesMobile, customStylesTime } from './styles'

const MenuLabel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
`

const LabelBox = styled.div``

const LogoBox = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-right: 8px;
`

const CustomMenu = styled.div`
  background-color: white;
  position: absolute;
  border-radius: 16px;
  box-shadow: 0 4px 8px 0 rgba(47, 128, 237, 0.1), 0 0 0 0.5px var(--c-zircon);
  overflow: hidden;
  padding: 0;
  width: 180px;
  z-index: 5;
  margin-top: 10px;
  padding-top: 36px;
`

const FixedToggle = styled.div`
  position: absolute;
  height: 24px;
  z-index: 10;
  background-color: white;
  width: 100%;
  top: 8px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  & > input {
    margin-right: 8px;
  }
`

const addressStart = new RegExp('^0x')

const customFilter = (option, searchText) => {
  const isAddress = addressStart.test(searchText)
  if (isAddress) {
    return option.data.tokenAddress.toString().toLowerCase().includes(searchText.toString().toLowerCase())
  }
  return option.data.label.toString().toLowerCase().includes(searchText.toString().toLowerCase())
}

const DropdownIndicator = () => (
  <span role="img" aria-label={'viewer'} style={{ marginRight: '8px' }}>
    🔎
  </span>
)

const Menu = <OptionType extends OptionTypeBase, IsMulti extends boolean>({
  children,
  innerRef,
  innerProps,
}: MenuProps<OptionType, IsMulti>) => {
  const [capEth, setCapEth] = useState(false)
  return (
    <CustomMenu ref={innerRef} {...innerProps}>
      <FixedToggle>
        <input
          name="isGoing"
          type="checkbox"
          checked={capEth}
          onChange={() => {
            setCapEth(!capEth)
          }}
        />
        Hide Low Liquidity
      </FixedToggle>
      {children}
    </CustomMenu>
  )
}

const Select = ({
  options,
  onChange,
  setCapEth,
  capEth,
  tokenSelect = false,
  placeholder,
  ...rest
}: {
  options: any[]
  onChange: () => void
  setCapEth: any
  capEth: any
  tokenSelect: any
  placeholder: any
}) => {
  return tokenSelect ? (
    <ReactSelect
      placeholder={placeholder}
      isSearchable={true}
      onChange={onChange}
      options={options}
      value={placeholder}
      filterOption={customFilter}
      getOptionLabel={(option) =>
        (
          <MenuLabel>
            <LogoBox>{option.logo}</LogoBox>
            <LabelBox>{option.label}</LabelBox>
          </MenuLabel>
        ) as unknown as string
      }
      styles={isMobile ? customStylesMobile : customStyles}
      {...rest}
      components={{ DropdownIndicator, Menu }}
    />
  ) : (
    <ReactSelect
      placeholder={placeholder}
      isSearchable={true}
      onChange={onChange}
      options={options}
      styles={customStylesTime}
      {...rest}
    />
  )
}

export default Select

export { Popout }
