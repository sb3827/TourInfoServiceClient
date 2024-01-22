import {FC, PropsWithChildren, useEffect, useState} from 'react'
import {
    Box,
    SearchInput,
    Button,
    SearchUserInfo,
    BoardBox,
    LoadingSppinner
} from '../../components/index'
import {UserSearchData} from '../../data/User/User'
import {getSearchUserInfo} from '../../api/UserSearch/UserSearch'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {useSearchParams} from 'react-router-dom'

export const UserSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialSearch = searchParams.get('search') || ''

    const [loading, setLoading] = useState<boolean>(false)

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
            setLoading(true)
            setSearchParams({search: searchValue})
            console.log(user)
            const data = await getSearchUserInfo(searchValue, user || null)
            setUserInfoData(data)
            console.log(data)
            setLoading(false)
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
            {loading && <LoadingSppinner />}
            <div className="flex justify-center w-full">
                <SearchInput
                    placeholder="유저 검색 (이름으로 검색)"
                    className="w-3/6 mb-4"
                    value={searchValue}
                    onChange={onChangeSearch}
                    onKeyDown={onUserList}
                />
                <Button
                    className="text-white bg-darkGreen"
                    value={'검색'}
                    onClick={onUserList}
                />
            </div>
            <BoardBox>
                {userInfoData ? (
                    userInfoData.map(
                        (data: UserSearchData) =>
                            !(data.mno == user) && <SearchUserInfo userInfo={data} />
                    )
                ) : (
                    <p className="flex items-center justify-center w-full h-full text-xl font-semibold">
                        검색 결과가 존재하지 않습니다...
                    </p>
                )}
            </BoardBox>
        </Box>
    )
}
