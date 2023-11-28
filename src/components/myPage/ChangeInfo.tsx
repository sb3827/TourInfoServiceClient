import React, {FC} from 'react'

type ChangeInfoProps = {
    text: string
}

export const ChangeInfo: FC<ChangeInfoProps> = ({text}) => {
    return (
        <div className="flex flex-col">
            <p className="w-32">
                {text} <input type="text" className="mt-2 mb-8 rounded-md" />
            </p>
        </div>
    )
}
