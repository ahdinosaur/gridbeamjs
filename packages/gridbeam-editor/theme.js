const { assign } = Object

const mobileBreakpoint = '40em'
const tabletBreakpoint = '52em' // 768px
const desktopBreakpoint = '64em' // 1024px

var breakpoints = assign(
  [mobileBreakpoint, tabletBreakpoint, desktopBreakpoint],
  {
    mobile: mobileBreakpoint,
    tablet: tabletBreakpoint,
    desktop: desktopBreakpoint
  }
)

const mediaQueries = {
  mobile: `@media screen and (min-width: ${mobileBreakpoint})`,
  tablet: `@media screen and (min-width: ${tabletBreakpoint})`,
  desktop: `@media screen and (min-width: ${desktopBreakpoint})`
}

const space = [
  // http://tachyons.io/docs/layout/spacing/
  '0rem',
  '0.25rem',
  '0.5rem',
  '1rem',
  '2rem',
  '4rem',
  '8rem',
  '16rem',
  '32rem',
  '64rem'
]

const fontSizes = {
  // typographic scale because
  // http://spencermortensen.com/articles/typographic-scale/
  // and
  // https://blog.madewithenvy.com/responsive-typographic-scales-in-css-b9f60431d1c4
  //
  // px and pt values are based on a 1 em parent element with 16px (12pt) root size.
  // http://pxtoem.com/
  '-5': '0.50000em', // 8px, 6pt
  '-4': '0.57435em',
  '-3': '0.65975em',
  '-2': '0.75785em',
  '-1': '0.87055em',
  '0': '1.00000em', // 16px, 12pt
  '1': '1.14869em',
  '2': '1.31951em',
  '3': '1.51572em', // 24px, 18pt
  '4': '1.74110em',
  '5': '2.00000em', // 32px, 24pt
  '6': '2.29740em',
  '7': '2.63902em',
  '8': '3.03143em', // 48px, 36pt
  '9': '3.48220em',
  '10': '4.00000em', // 64px, 48pt
  '11': '4.59479em',
  '12': '5.27803em',
  '13': '6.06287em', // 96px, 52pt
  '14': '6.96440em',
  '15': '8.00000em', // 128px, 96pt
  '16': '9.18959em',
  '17': '10.55606em',
  '18': '12.12573em',
  '19': '13.92881em',
  '20': '16.00000em' // 256px, 192pt
  // continue with formula:
  //   multiplier ^ (step / interval)
  //   2 ^ (step / 5)
}

const colors = {
  success: '#28a745',
  info: '#17a2b8',
  warning: '#ffc107',
  danger: '#dc3545',
  white: '#fff',
  light: '#f8f9fa',
  muted: '#6c757d',
  dark: '#343a40'
}

const fonts = {
  body: 'system-ui, sans-serif',
  heading: 'inherit',
  monospace: 'monospace'
}

// https://styled-system.com/theme-specification
module.exports = {
  breakpoints,
  colors,
  fonts,
  fontSizes,
  mediaQueries,
  space
}

// TODO variants
//  - buttons
// TODO sizes
// TODO fontWeights
// TODO lineHeights
// TODO zIndices
