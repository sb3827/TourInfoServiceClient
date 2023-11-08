import React from 'react'

type BoxProps = {}

export const Box: React.FC<React.PropsWithChildren<BoxProps>> = ({children}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-16">
      {children}
    </div>
  )
}
