import {useState, useEffect} from 'react'
import {userCourse} from './../../../data/User/User'
import {ShowUserCourse} from './../../../api/MyPage/ShowUserInfo'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'

export const MyCourseBox = () => {
    const [CourseList, setCourseList] = useState<userCourse>()

    const userMno = useSelector((state: RootState) => state.login.mno) || 0

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userCourseData = await ShowUserCourse(userMno)
                setCourseList(userCourseData)
                console.log(userCourseData)
            } catch {
                console.error('error')
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <table className="table-fixed ">
                <thead className="justify-between">
                    <tr className="border-b">
                        <th className="px-20 border-r ">글번호</th>
                        <th className="px-20 border-r">제목</th>
                        <th className="px-20 border-r">작성자</th>
                        <th className="px-20 ">작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(CourseList) &&
                        CourseList.map((course: userCourse) => (
                            <tr className="">
                                <td className="">
                                    <a href="" className="cursor-pointer hover:underline">
                                        {course.bno}
                                    </a>
                                </td>
                                <td className="">
                                    <a
                                        href=""
                                        className="cursor-pointer hover:underline ">
                                        {course.title}
                                    </a>
                                </td>
                                <td className="">{course.writer}</td>
                                <td className="">{course.regdate}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
