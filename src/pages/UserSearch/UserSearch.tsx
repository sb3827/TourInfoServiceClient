import {FC, PropsWithChildren, useState} from 'react'
import {Box, SearchInput, Button, SearchUserInfo} from '../../components/index'

type UserSearchProps = {}

export const UserSearch: FC<UserSearchProps> = ({}) => {
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    return (
        <Box>
            <SearchInput
                className="w-4/6 mb-4"
                value={searchValue}
                onChange={onChangeSearch}
            />
            <div className="flex justify-center w-full h-screen">
                <div className="flex w-5/6 h-5/6">
                    <div className="w-full overflow-y-auto border rounded-lg border--300">
                        <SearchUserInfo profileImage="" information="정보" id="ID" />
                        <SearchUserInfo profileImage="" information="정보" id="ID" />
                        <SearchUserInfo profileImage="" information="정보" id="ID" />
                        <SearchUserInfo profileImage="" information="정보" id="ID" />
                        <SearchUserInfo profileImage="" information="정보" id="ID" />
                        <SearchUserInfo profileImage="" information="정보" id="ID" />
                    </div>
                </div>
            </div>
        </Box>
    )
}
