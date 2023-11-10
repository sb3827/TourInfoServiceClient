import React, {FC, PropsWithChildren} from 'react'

//내부 박스 스타일

type SubBoxProps = {}

export const SubBox: FC<PropsWithChildren<SubBoxProps>> = ({children}) => {
    return (
        <div className="flex justify-center w-full mb-5">
            <div className="flex flex-col w-2/3 ">
                <div className="p-3 overflow-y-auto bg-white border border-gray-300 rounded-lg max-h-96">
                    {children}
                </div>
            </div>
        </div>
    )
}
