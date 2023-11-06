import React from 'react'

type BoxProps = {
  children?: React.ReactNode
}

const Box: React.FC<BoxProps> = ({children}) => {
  return <div>Box Component</div>
}

export default Box
