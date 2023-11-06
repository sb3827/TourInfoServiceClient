import React from 'react'
import WaitUser from './WaitUser'
import SubBox from '../SubBox'

type WaitBoxProps = {}

const WaitBox: React.FC<WaitBoxProps> = ({}) => {
  return (
    <SubBox>
      <WaitUser />
      <WaitUser />
      <WaitUser />
    </SubBox>
  )
}

export default WaitBox
