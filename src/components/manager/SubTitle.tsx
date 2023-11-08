import React, {FC} from 'react'

//박스 위의 글 스타일
type SubTitleProps = {text: string}

export const SubTitle: FC<React.PropsWithChildren<SubTitleProps>> = ({
  children,
  text
}) => {
  return (
    <div className="flex items-center p-3 ">
      <h2 className="text-xl font-bold text-left">{text}</h2>
      {children}
    </div>
  )
}
