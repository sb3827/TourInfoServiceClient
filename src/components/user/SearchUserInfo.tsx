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
        <div className="flex items-center text-2xl border rounded-lg h-44 border--300 bg-slate-300">
            <div className="flex w-1/3 h-full border-2">
                <img src={profileImage} alt="Image" />
            </div>
            <div className="w-2/3 h-full border-2">
                <div>{information}</div>
                <div>{id}</div>
            </div>
        </div>
    )
}
