import React from 'react'

type WaitInfoProps = {
  text: string
}

const WaitInfo: React.FC<WaitInfoProps> = ({text}) => {
  return (
    <div className="p-2">
      <span>{text}</span>
    </div>
  )
}

export default WaitInfo
