import {FC, PropsWithChildren, useEffect, useState} from 'react'
import {Box, SearchInput, Button, SearchUserInfo, BoardBox} from '../../components/index'
import {UserSearchData} from '../../data/User/User'
import {getSearchUserInfo} from '../../api/UserSearch/UserSearch'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {useSearchParams} from 'react-router-dom'

export const UserSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialSearch = searchParams.get('search') || ''

    //검색 값
    const [searchValue, setSearchValue] = useState<string>(initialSearch)

    // 검색 결과 데이터
    const [userInfoData, setUserInfoData] = useState<UserSearchData[] | null>(null)

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    const user = useSelector((state: RootState) => state.login.mno)!

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
            setSearchParams({search: searchValue})
            console.log(user)
            const data = await getSearchUserInfo(searchValue, user || null)
            setUserInfoData(data)
            console.log(data)
        } catch (error) {
            // 오류 처리
            console.error(error)
        }
    }
    useEffect(() => {
        onUserList()
    }, [])

    return (
        <Box>
            <SearchInput
                className="w-3/6 mb-4"
                value={searchValue}
                onChange={onChangeSearch}
                onKeyDown={onUserList}
            />
            <BoardBox>
                {userInfoData &&
                    userInfoData.map(
                        (data: UserSearchData) =>
                            !(data.mno == user) && <SearchUserInfo userInfo={data} />
                    )}
            </BoardBox>
        </Box>
    )
}
