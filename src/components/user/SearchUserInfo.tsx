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
        <div className="flex items-center h-64 p-4 m-2 text-2xl border rounded-lg border--300 bg-slate-300">
            <div className="flex w-1/3 pr-4">
                <img src={profileImage} alt="" />
            </div>
            <div className="w-2/3">
                <div className="mb-4">{information}</div>
                <div className="mb-4">{id}</div>
            </div>
        </div>
    )
}
