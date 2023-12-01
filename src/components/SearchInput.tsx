import React, {FC} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

//input 스타일

type SearchInputProps = {
    value: string
    onChange: (value: string) => void
    className: string
}

export const SearchInput: FC<SearchInputProps> = ({value, onChange, className}) => {
    const inputStyle = `flex items-center ${className} p-2 ml-5 bg-white border border-gray-300 rounded-2xl`
    return (
        <div className={inputStyle}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
                className="w-full p-1 font-medium border-0 outline-0"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}
