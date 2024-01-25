import {FC, PropsWithChildren, useEffect, useMemo, useRef, useState} from 'react'
import {TextEditor, Input, Button, Rating, RatingRef, EditorRef} from '../../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMinus, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {
    coursePostLoad,
    deleteBoard,
    modifyCourseBoard,
    registCourseBoard
} from '../../api/Board/board'
import {useDispatch} from 'react-redux'
import {
    addDay,
    deleteAll,
    deleteDay,
    setCommonState
} from '../../store/slices/CourseSlice'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {CourseList} from '../../components/course/CourseRegist/CourseList'
import {saveCourseBoardDTO} from '../../data/Board/BoardData'
import noImage from '../../assets/smallLogo.png'

type CourseRegisterProps = {
    isModify: boolean // true: 수정, false: 등록
}

export const CourseRegister: FC<PropsWithChildren<CourseRegisterProps>> = props => {
    const day = useSelector((state: RootState) => state.course)
    //코스 등록시 추가적으로 로직 필요 -> 아래 콘솔보고 할것
    console.log('날짜 데이터 ' + day)

    const dispatch = useDispatch()

    // plus day box
    function daysPlus() {
        dispatch(addDay())
    }
    // minus day box
    function daysMinus() {
        dispatch(deleteDay())
    }

    const navigate = useNavigate()
    // left arrow button
    function backPage() {
        // 뒤로가기 로직
        navigate(-1)
    }

    // 자식 ref
    const titleRef = useRef<HTMLInputElement | null>(null)
    const starRef = useRef<RatingRef | null>(null)
    const editorRef = useRef<EditorRef | null>(null)
    const user = useSelector((state: RootState) => state.login.mno)!
    const course = useSelector((state: RootState) => state.course)!

    const [loadImg, setLoadImg] = useState<string[]>([])

    // 등록 onclick 함수
    function regist() {
        const title = titleRef.current?.value as string
        if (title == '') {
            alert('제목을 입력하세요')
            return
        }
        const score = starRef.current?.getSelectedRating() as number
        const content = editorRef.current?.getEditor()?.editor?.data.get() as string
        if (content == '') {
            alert('내용을 입력하세요')
            return
        }

        // editor로 인해 upload 된 images
        const images = editorRef.current?.getImages || []
        const placeList = course.map(daliyPlace => daliyPlace.map(place => place.pno))
        ////
        const board: saveCourseBoardDTO = {
            bno: null,
            title: title,
            score: score,
            content: content,
            deleteImages: [],
            images: [],
            coursePlaceList: placeList,
            writer: user
        }
        ////

        registCourseBoard(board, images).then(res => {
            alert(`${res.bno}번 글 등록 완료!`)
            navigate(`/board/course/posting?bno=${res.bno}`)
        })
    }
    // 수정 onclick 함수
    function modify() {
        const title = titleRef.current?.value as string
        if (title == '') {
            alert('제목을 입력하세요')
            return
        }
        const score = starRef.current?.getSelectedRating() as number
        const content = editorRef.current?.getEditor()?.editor?.data.get() as string
        if (content == '') {
            alert('내용을 입력하세요')
            return
        }

        // editor로 인해 upload 된 images
        let images = editorRef.current?.getImages || []
        const placeList = course.map(daliyPlace => daliyPlace.map(place => place.pno))
        images.push(...loadImg.map(src => ({ino: -1, src: src})))

        console.log(images)

        ////
        const board: saveCourseBoardDTO = {
            bno: parseInt(searchParams.get('bno')!),
            title: title,
            score: score,
            content: content,
            deleteImages: [],
            images: [],
            coursePlaceList: placeList,
            writer: user
        }
        ////

        modifyCourseBoard(board, images).then(res => {
            alert(`${res.bno}번 글 수정 완료!`)
            navigate(`/board/course/posting?bno=${res.bno}`)
        })
    }
    // 삭제 onclick 함수
    async function erase() {
        const bno = searchParams.get('bno') || '0'
        try {
            deleteBoard(parseInt(bno))
            alert('삭제 성공')
            navigate('board/course')
        } catch (error) {
            alert('삭제 실패')
            navigate(-1)
        }
    }

    const [searchParams] = useSearchParams()
    // load page function
    async function loadPage() {
        const bno = searchParams.get('bno')!
        try {
            const data = await coursePostLoad(parseInt(bno), user != null)
            if (data.writerDTO.mno !== user) navigate('/unauthorized')
            if (!data.isCourse) {
                // 코스정보 에러 처리(front)
                throw new Error('Not Found')
            }
            if (titleRef.current) {
                titleRef.current.value = data.title
            }
            setLoadImg(data.images)
            editorRef.current?.getEditor()?.editor?.data.set(data.content)
            starRef.current?.setSelectedRating(data.score)

            console.log(data)
            dispatch(
                setCommonState(
                    data.postingPlaceBoardDTOS.map(dailyPlace =>
                        dailyPlace.map(place => ({
                            pno: place.pno,
                            pname: place.name,
                            img: noImage
                        }))
                    )
                )
            )
        } catch (error) {
            navigate('/notFound')
        }
    }

    useEffect(() => {
        //새로 고침시 초기화
        dispatch(deleteAll())

        if (props.isModify) {
            if (!user) navigate('/unauthorized')
            loadPage()
        }
    }, [])

    const courseList = useMemo(() => <CourseList create={true} day={day} />, [day])

    return (
        <div className="w-3/4 mx-auto">
            <div className="flex justify-start my-6">
                <FontAwesomeIcon
                    className="hover:cursor-pointer"
                    icon={faArrowLeft}
                    size="2xl"
                    onClick={backPage}
                />
            </div>
            <div className="">
                <Input
                    className="w-full my-2 border-black"
                    size={70}
                    placeholder="제목을 입력하세요"
                    ref={titleRef}></Input>
                <div>
                    <div className="flex justify-end mb-2 ml-3">
                        <FontAwesomeIcon
                            className="mx-2 hover:cursor-pointer"
                            icon={faMinus}
                            size="xl"
                            onClick={daysMinus}
                        />
                        <FontAwesomeIcon
                            className="mx-2 hover:cursor-pointer"
                            icon={faPlus}
                            size="xl"
                            onClick={daysPlus}
                        />
                    </div>
                    {/* 테스트 코드 */}
                    {/* <CourseList create={true} day={day} /> */}
                    {courseList}
                </div>
                <div className="flex flex-row justify-end my-2">
                    <Rating ref={starRef} />
                </div>
                <div>
                    <TextEditor ref={editorRef}></TextEditor>
                </div>
                <div className="flex flex-row justify-end my-2 ml-6">
                    {props.isModify && (
                        <Button className="btn-error" value={'삭제'} onClick={erase} />
                    )}
                    {props.isModify && (
                        <Button className="btn-warning" value={'수정'} onClick={modify} />
                    )}
                    {props.isModify || (
                        <Button className="btn-success" value={'등록'} onClick={regist} />
                    )}
                </div>
            </div>
        </div>
    )
}
