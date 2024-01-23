import {useState, useEffect} from 'react'
import {userBoard} from './../../../data/User/User'
import {ShowUserBoard} from './../../../api/MyPage/ShowUserInfo'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export const MyPostBox = () => {
    const [BoardList, setBoardList] = useState<userBoard>()
    const userMno = useSelector((state: RootState) => state.login.mno) || 0

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userBoardData = await ShowUserBoard(userMno)
                setBoardList(userBoardData)
                console.log(userBoardData)
            } catch {
                console.error('error')
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <table className="w-full table-auto">
                <thead className="justify-between">
                    <tr className="">
                        <th className="px-20">글번호</th>
                        <th className="px-20">제목</th>
                        <th className="px-20">작성자</th>
                        <th className="px-20">작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(BoardList) &&
                        BoardList.map((board: userBoard) => (
                            <tr>
                                <td>
                                    <label
                                        onClick={() =>
                                            navigate(
                                                `/board/place/posting?bno=${board.bno}`
                                            )
                                        }
                                        className="cursor-pointer hover:underline">
                                        {board.bno}
                                    </label>
                                </td>
                                <td>
                                    <span
                                        onClick={() =>
                                            navigate(
                                                `/board/place/posting?bno=${board.bno}`
                                            )
                                        }
                                        className="cursor-pointer hover:underline">
                                        {board.title}
                                    </span>
                                </td>
                                <td>{board.writer}</td>
                                <td>{board.regdate}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
