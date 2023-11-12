import React, {FC, PropsWithChildren} from 'react'

//관리자 페이지에 사용하는 모든 컴포넌트 감싸주는 div

type BoxProps = {}

export const Box: FC<PropsWithChildren<BoxProps>> = ({children}) => {
    return (
        <div className="flex flex-col items-center justify-center w-full bg-gray-100 pt-14">
            {children}
        </div>
    )
}
