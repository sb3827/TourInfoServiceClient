import React from 'react'

type SubTitleProps = {
  children?: String
}

const SubTitle: React.FC<SubTitleProps> = ({children}) => {
  return <h2 className="w-2/3 p-4 text-lg font-semibold text-left">{children}</h2>
}

export default SubTitle
