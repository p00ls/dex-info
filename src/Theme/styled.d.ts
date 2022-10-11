import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    customColor: string
    textColor: string

    panelColor: stromg
    backgroundColor: string

    concreteGray: string
    inputBackground: string
    shadowColor: string
    mercuryGray: string

    text1: string
    text2: string
    text3: string
    text4: string
    text5: string

    // special case text types
    white: string

    // backgrounds / greys
    bg1: string
    bg2: string
    bg3: string
    bg4: string
    bg5: string
    bg6: string

    //specialty colors
    modalBG: string
    advancedBG: string
    onlyLight: string
    divider: string

    //primary colors
    primary1: string
    primary2: string
    primary3: string
    primary4: string
    primary5: string

    // color text
    primaryText1: string

    // secondary colors
    secondary1: string
    secondary2: string
    secondary3: string

    shadow1: string

    // other
    red1: string
    green1: string
    yellow1: string
    yellow2: string
    link: string
    blue: string

    background: string

    // other
    flexRowNoWrap?: any
  }
}
