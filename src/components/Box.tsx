import {FC, PropsWithChildren, HTMLAttributes} from 'react'

type BoxProps = {
    className?: string
}

export const Box: FC<PropsWithChildren<BoxProps>> = ({children, className}) => {
    const BoxStyle = `flex flex-col items-center justify-center w-full bg-gray-100 pt-14 ${className}`
    return <div className={BoxStyle}>{children}</div>
}
