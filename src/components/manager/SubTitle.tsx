import React from 'react'

//박스 위의 글 스타일
type SubTitleProps = {
  children?: String | React.ReactNode
}

const SubTitle: React.FC<SubTitleProps> = ({children}) => {
  return (
    <div className="w-2/3">
      <h2 className="flex items-center p-3 mt-5 ml-3 text-xl font-semibold text-left">
        {children}
      </h2>
    </div>
  )
}

export default SubTitle
