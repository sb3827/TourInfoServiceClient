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
        <div className="flex w-full text-2xl border rounded-lg border--300 bg-slate-300">
            <div className="w-1/2 h-44">
                <div>{name}</div>
                <div>{address}</div>
                <div>{information}</div>
            </div>
            <div className="w-1/2 h-44">
                <img src={imageUrl} alt="Image" />
            </div>
        </div>
    )
}
