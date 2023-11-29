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
                className="w-3/6 mb-4"
                value={searchValue}
                onChange={onChangeSearch}
            />
            <div className="flex justify-center w-full h-screen">
                <div className="flex w-4/6 h-4/6">
                    <div className="w-full overflow-y-auto border rounded-lg border--300">
                        <SearchUserInfo
                            name="홍희범"
                            profileImage="https://isplus.com/data/isp/image/2023/05/08/isp20230508000297.600x.0.jpg"
                            followingCount={30}
                            ReviewCount={20}
                            email="ghdgmlqja@navmer.com"
                        />
                    </div>
                </div>
            </div>
        </Box>
    )
}
