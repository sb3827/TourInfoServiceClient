import {FC, PropsWithChildren, useState} from 'react'
import {Box, SearchInput, Button, SearchUserInfo} from '../../components/index'
import { UserSearchData } from "../../data/User/User";
import { getSearchUserInfo } from "../../api/UserSearch/UserSearch";

type UserSearchProps = {}

export const UserSearch: FC<UserSearchProps> = ({}) => {
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')

    // 검색 결과 데이터
    const [userInfoData, setUserInfoData] = useState<UserSearchData[] | null>(null)

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    async function onUserList(
        e?: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
    ) {
        //키보드로 입력이 들어왔는데 Enter가 아닌경우 return
        if (
            e?.type === 'keydown' &&
            (e as React.KeyboardEvent<HTMLInputElement>).key !== 'Enter'
        ) {
            return
        }

        try {
            const data = await getSearchUserInfo(searchValue)
            setUserInfoData(data)
            console.log(data);
        } catch (err) {
            console.log(err);
            alert('서버와 연결이 끊겼습니다.')
        }
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
                    {userInfoData && 
                    userInfoData.map((data: UserSearchData) => (
                      <SearchUserInfo userInfo = {data}  />
                    ))}


                        {/* <SearchUserInfo
                            name="홍희범"
                            profileImage="https://isplus.com/data/isp/image/2023/05/08/isp20230508000297.600x.0.jpg"
                            followingCount={30}
                            ReviewCount={20}
                            email="ghdgmlqja@navmer.com"
                        /> */}
                    </div>
                </div>
            </div>
        </Box>
    )
}
