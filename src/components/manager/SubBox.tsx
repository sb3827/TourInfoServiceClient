import React from 'react'

//내부 박스 스타일

type SubBoxProps = {
  children?: React.ReactNode
}

const SubBox: React.FC<SubBoxProps> = ({children}) => {
  return (
    <div className="flex justify-center w-full mb-5">
      <div className="flex flex-col w-2/3 p-2">
        <div className="p-5 overflow-y-auto border rounded-lg max-h-96">{children}</div>
      </div>
    </div>
  )
}

export default SubBox
