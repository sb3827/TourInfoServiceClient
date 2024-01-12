import {FC, PropsWithChildren, useEffect, useRef} from 'react'
import {TextEditor, Input, Button, Rating, RatingRef, EditorRef} from '../../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMinus, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {coursePostLoad, deleteBoard} from '../../api/Board/board'
import {useDispatch} from 'react-redux'
import {addDay, deleteAll, deleteDay} from '../../store/slices/CourseSlice'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {CourseList} from '../../components/course/CourseRegist/CourseList'

type CourseRegisterProps = {
    isModify: boolean // true: 수정, false: 등록
}

export const CourseRegister: FC<PropsWithChildren<CourseRegisterProps>> = props => {
    //코스 등록시 추가적으로 로직 필요 -> 아래 콘솔보고 할것
    const day = useSelector((state: RootState) => state.course)
    console.log(day)

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

    // 등록 onclick 함수
    function regist() {
        console.log('title: ' + titleRef.current?.value)
        console.log('stared: ' + starRef.current?.getSelectedRating())
        console.log('content: ' + editorRef.current?.getEditor())
        console.log('images: ' + editorRef.current?.getImages)
    }
    // 수정 onclick 함수
    function modify() {}
    // 삭제 onclick 함수
    async function erase() {
        const bno = searchParams.get('bno') || '0'
        try {
            deleteBoard(parseInt(bno))
            alert('삭제 성공')
            navigate(-1)
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
            const data = await coursePostLoad(parseInt(bno))
            if (!data.isCourse) {
                // 코스정보 에러 처리(front)
                throw new Error('Not Found')
            }
            if (titleRef.current) {
                titleRef.current.value = data.title
            }
            editorRef.current?.getEditor()?.editor?.data.set(data.content)
            starRef.current?.setSelectedRating(data.score)
        } catch (error) {
            //NOTE - error 처리
            navigate(-1)
        }
    }

    useEffect(() => {
        //새로 고침시 초기화
        dispatch(deleteAll())

        if (props.isModify) {
            console.log('modify page')
            loadPage()
        }
    }, [])

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
                <div>장바구니 목록s: 해창씨 어서 해줘요</div>
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
                    <CourseList create={true} day={day} />
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
