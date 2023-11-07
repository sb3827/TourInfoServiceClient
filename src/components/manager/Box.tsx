import React from 'react'

type BoxProps = {
  children?: React.ReactNode
}

const Box: React.FC<BoxProps> = ({children}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-16">
      {children}
    </div>
  )
}

export default Box
