import {FC, PropsWithChildren} from 'react'
import {SearchInput} from '../../components'
import React,{useState} from 'react'
import { Box } from '../../components'

type MainProps = {}


export const Main: FC<PropsWithChildren<MainProps>> = () => {
    
    const [searchValue,setSearchValue] = useState('');
    function onSearch(value: string) {
        setSearchValue(value)
        // 검색로직추가
    }



    return (
        <div className="flex flex-col justify-center h-screen ">
         <div className="mb-8 text-3xl font-bold text-center">Logo</div>
         <div>
            <SearchInput value='searchValue' className='mb-10' onChange={onSearch}></SearchInput>
         </div>
         <div>
            <label className="m-4 text-left block">
                MostLiked♥
            </label>
            <Box>MostLiked♥</Box>

            <label  className="m-4 text-left block">
                recently upload
            </label>
            <Box>recently upload</Box> 

            <label className="m-4 text-left block">
                most reply
            </label>
            <Box>most reply</Box> 

            <label className="m-4 text-left block">
                mostLikedCourse♥ 
            </label>
            <Box>mostLikedCourse♥</Box> 

            <label className="m-4 text-left block">
              follower posts
            </label>
            <Box>follower posts</Box>

            <label  className="m-4 text-left block">
                ads
            </label>
            <Box>ads</Box>

            
         </div>
        </div>
      );
      
      
      
}
