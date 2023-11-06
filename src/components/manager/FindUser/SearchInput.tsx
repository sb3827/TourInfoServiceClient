import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

//input 스타일

type SearchInputProps = {}

const SearchInput: React.FC<SearchInputProps> = ({}) => {
  return (
    <div className="flex items-center w-1/2 p-2 ml-10 border rounded-2xl">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input className="w-full p-1 font-medium border-0 outline-0" />
    </div>
  )
}

export default SearchInput
