import React, {FC} from 'react'

//관리자 페이지에 사용하는 모든 컴포넌트 감싸주는 div

type BoxProps = {}

export const Box: FC<React.PropsWithChildren<BoxProps>> = ({children}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-16">
      {children}
    </div>
  )
}