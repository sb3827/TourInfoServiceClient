import React from 'react'

//내부 박스 스타일

type SubBoxProps = {
  children?: React.ReactNode
}

const SubBox: React.FC<SubBoxProps> = ({children}) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-2/3 p-2">
        <div className="border border-black p-5 rounded-lg">{children}</div>
      </div>
    </div>
  )
}

export default SubBox
