const React = require('react')
const { Box, Flex, Text } = require('rebass')
const Group = require('reakit/Group').default
const { default: styled } = require('styled-components')
const { cloneDeep, set } = require('lodash')

const useCameraStore = require('../stores/camera').default

module.exports = Sidebar

function Sidebar (props) {
  const { selectedBeam, updateSelectedBeam } = props

  const updateBeamField = React.useCallback(
    (fieldName, value) => {
      console.log('updateBeamField', fieldName, value, selectedBeam)
      var nextBeam = cloneDeep(selectedBeam)
      set(nextBeam, fieldName, value)
      console.log('nextBeam', nextBeam)
      updateSelectedBeam(nextBeam)
    },
    [selectedBeam]
  )

  if (selectedBeam == null) return null

  console.log('selectedBeam', selectedBeam)

  return (
    <SidebarContainer>
      {JSON.stringify(selectedBeam, null, 2)}
      <ControlSection title='selected beam'>
        <InputControl
          updateField={updateBeamField}
          name='origin[0]'
          label='origin.x'
          value={selectedBeam.origin[0]}
          type='number'
        />
      </ControlSection>
    </SidebarContainer>
  )
}

const SidebarContainer = props => {
  const enableCameraControl = useCameraStore(state => state.enableControl)
  const disableCameraControl = useCameraStore(state => state.disableControl)

  const handleMouseOver = React.useCallback(ev => {
    disableCameraControl()
  }, [])
  const handleMouseOut = React.useCallback(ev => {
    enableCameraControl()
  }, [])

  return (
    <Flex
      flexDirection='column'
      css={{ width: '40em' }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      {...props}
    />
  )
}

const ControlSection = props => {
  const { title, children } = props

  return (
    <Box p={3}>
      <Text fontSize={3}>{title}</Text>
      <Box as={Group}>{children}</Box>
    </Box>
  )
}

const InputControl = props => {
  const { name, label, value, updateField, ...inputProps } = props

  const handleChange = React.useCallback(ev => {
    updateField(name, Number(ev.target.value))
  }, [])

  return (
    <ControlContainer>
      <label name={name}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        {...inputProps}
      />
    </ControlContainer>
  )
}

const ControlContainer = props => <Box {...props} />
