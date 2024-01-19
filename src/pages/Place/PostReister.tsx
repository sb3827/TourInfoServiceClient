import {FC, PropsWithChildren, useEffect, useRef, useState} from 'react'
import {Input, TextEditor, Button, Rating} from '../../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {useNavigate, useSearchParams} from 'react-router-dom'
import type {RatingRef, EditorRef} from '../../components'
import {
    deleteBoard,
    modifyPlaceBoard,
    placePostLoad,
    registPlaceBoard
} from '../../api/Board/board'
import {ImageReturnData, savePlaceBoardDTO} from '../../data/Board/BoardData'
import {RootState} from '../../store/rootReducer'
import {useSelector} from 'react-redux'

type PostRegisterProps = {
    isModify: boolean // true: 수정, false: 등록
}

// 장소 포스팅 등록
export const PostRegister: FC<PropsWithChildren<PostRegisterProps>> = props => {
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

    const [loadImg, setLoadImg] = useState<string[]>([])

    // 등록 onclick 함수
    function regist() {
        const title = titleRef.current?.value || ''
        const score = starRef.current?.getSelectedRating() as number
        const content = editorRef.current?.getEditor()?.editor?.data.get() as string

        // editor로 인해 upload 된 images
        const images = editorRef.current?.getImages || []

        ////
        const board: savePlaceBoardDTO = {
            bno: null,
            title: title,
            score: score,
            content: content,
            deleteImages: [],
            images: [],
            //STUB - place stub
            place: 1,
            writer: user
        }
        ////

        registPlaceBoard(board, images).then(res => {
            alert(`${res.bno}번 글 등록 완료!`)
            navigate(`/board/place/posting?bno=${res.bno}`)
        })
    }
    // 수정 onclick 함수
    function modify() {
        const title = titleRef.current?.value || ''
        const score = starRef.current?.getSelectedRating() as number
        const content = editorRef.current?.getEditor()?.editor?.data.get() as string

        // editor로 인해 upload 된 images
        let images = editorRef.current?.getImages || []
        images.push(...loadImg.map(src => ({ino: -1, src: src})))

        ////
        const board: savePlaceBoardDTO = {
            bno: parseInt(searchParams.get('bno')!),
            title: title,
            score: score,
            content: content,
            deleteImages: [],
            images: [],
            //STUB - place stub
            place: 1,
            writer: user
        }
        ////
        console.log(user)

        modifyPlaceBoard(board, images).then(res => {
            alert(`${res.bno}번 글 수정 완료!`)
            navigate(`/board/place/posting?bno=${res.bno}`)
        })
    }
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
    useEffect(() => {
        if (props.isModify) {
            console.log('modify page')
            loadPage()
        }
    }, [])

    // load page function
    async function loadPage() {
        const bno = searchParams.get('bno')!
        try {
            const data = await placePostLoad(parseInt(bno))
            if (data.isCourse) {
                // 코스정보 에러 처리(front)
                throw new Error('Not Found')
            }
            if (titleRef.current) {
                titleRef.current.value = data.title
            }
            setLoadImg(data.images)
            editorRef.current?.getEditor()?.editor?.data.set(data.content)
            starRef.current?.setSelectedRating(data.score)
            //TODO - 장소 정보 설정
        } catch (error) {
            //FIXME - 404 에러처리
            navigate(-1)
        }
    }

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
            <Input
                className="w-full my-2 border-black"
                size={70}
                placeholder="제목을 입력하세요"
                ref={titleRef}></Input>
            <div>장소 입력 부분 지도</div>
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
    )
}
