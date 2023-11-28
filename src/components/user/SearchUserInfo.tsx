import React, {FC} from 'react'

type SearchResultProps = {
    profileImage: string
    information: string
    id: string
}

export const SearchUserInfo: FC<SearchResultProps> = ({
    profileImage,
    information,
    id
}) => {
    return (
        <div className="flex text-2xl border h-44 bg-slate-300">
            <div className="avatar">
                <div className="border-2 rounded-full ">
                    <img src={profileImage} />
                </div>
            </div>
            <div className="w-full h-full border-2">
                <div>{information}</div>
                <div>{id}</div>
            </div>
        </div>
    )
}
