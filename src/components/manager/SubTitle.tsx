import React, {FC, PropsWithChildren} from 'react'

//박스 위의 글 스타일
type SubTitleProps = {text: string; styles?: string}

export const SubTitle: FC<PropsWithChildren<SubTitleProps>> = ({
    children,
    text,
    styles
}) => {
    const buttonClass = `text-xl font-bold text-left ${styles}`
    return (
        <div className="flex items-center p-3 ">
            <h2 className={buttonClass}>{text}</h2>
            {children}
        </div>
    )
}
