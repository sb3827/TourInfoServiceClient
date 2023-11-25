import React, {FC} from 'react'

type SearchResultProps = {
    name: string
    address: string
    information: string
    imageUrl: string
}

export const SearchInfo: FC<SearchResultProps> = ({
    name,
    address,
    information,
    imageUrl
}) => {
    return (
        <div className="p-4 m-2 text-2xl border rounded-lg border--300 bg-sky-200">
            <div className="w-1/2">
                <div>{name}</div>
                <div>{address}</div>
                <div>{information}</div>
            </div>
            <div className="w-1/2">
                <img src={imageUrl} alt="" />
            </div>
        </div>
    )
}
