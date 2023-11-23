import {FC, PropsWithChildren, HTMLAttributes} from 'react'

type BoxProps = {}

//FIXME - 영현 className을 줘서 외부에서 className으로 수정 시키도록 고쳐 줘

export const Box: FC<PropsWithChildren<BoxProps>> = ({children}) => {
    return (
        <div className="flex flex-col items-center justify-center w-full bg-gray-100 pt-14">
            {children}
        </div>
    )
}
