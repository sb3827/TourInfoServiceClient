import {FC, PropsWithChildren, useEffect, useState} from 'react'
import {Title, TextBox, PlacePostMap, PlaceProps, DropIcon} from '../../components'
import {Reply} from '../Reply'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart, faStar, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import noImage from '../../assets/smallLogo.png'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {deleteBoard, deleteLike, placePostLoad, postLike} from '../../api/Board/board'
import BoardReportModal from '../../components/board/BoardReportModal'
import {BoardData} from '../../data/Board/BoardData'
import {getCookie} from '../../util/cookie'

type PostPlaceProps = {
    title?: string
}

export const PostPlace: FC<PropsWithChildren<PostPlaceProps>> = () => {
    const postText = ['수정', '신고', '삭제']
    const [enables, setEnables] = useState<boolean[]>([false, true, false])
    const [content, setContent] = useState<string>('')
    const [score, setScore] = useState<number>(5)
    const [likes, setLikes] = useState<number>(0)
    const [date, setDate] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [images, setImages] = useState<string[]>([''])
    const [writer, setWriter] = useState<string>()
    const [writerNo, setWriterNo] = useState<number>()
    const [place, setPlace] = useState<PlaceProps>({
        name: '서면 거리',
        lat: 35.1584,
        lng: 129.0583,
        roadAddress: '부산광역시 서구 중앙대로 678',
        localAddress: '부산광역시 서구 서면',
        engAddress: '678, Jungang-daero, Seo-gu, Busan'
    })
    const [report, setReport] = useState<boolean>(false)
    // user mno
    const user = useSelector((state: RootState) => state.login.mno)!
    // board bno
    const [searchParams] = useSearchParams()
    const bno = searchParams.get('bno')!

    // heart button state
    const [heart, setHeart] = useState<boolean>(false)
    function clickHeart() {
        try {
            if (!user) return
            if (heart) {
                setLikes(likes - 1)
                deleteLike(user, parseInt(bno))
            } else {
                postLike(user, parseInt(bno))
                setLikes(likes + 1)
            }
            setHeart(!heart)
        } catch (error) {
            if (heart) {
                setLikes(likes + 1)
            } else {
                setLikes(likes - 1)
            }
            setHeart(!heart)
        }
    }

    const navigate = useNavigate()
    // left arrow button
    function backPage() {
        // 뒤로가기 로직
        navigate(-1)
    }

    // report
    const nav = () => navigate(`/board/place/posting/modify?bno=${bno}`)
    const closeModal = () => {
        setReport(false)
    }
    const set = () => setReport(true)
    const boardData: BoardData = {
        bno: parseInt(bno),
        title: title,
        content: content,
        mno: writerNo as number,
        name: writer as string
    }
    const delPage = () => {
        try {
            deleteBoard(parseInt(bno))
            alert('삭제 성공')
            navigate('/board/place')
        } catch (error) {
            alert('삭제 실패')
        }
    }

    async function loadPage() {
        try {
            const data = await placePostLoad(
                parseInt(bno),
                getCookie('refreshToken') != undefined
            )
            console.log(data)
            if (data.isCourse) {
                // 코스정보 에러 처리(front)
                throw new Error('Not Found')
            }
            setWriterNo(data.writerDTO.mno)
            if (user === data.writerDTO.mno) {
                setEnables([true, false, true])
            }

            setTitle(data.title) // title
            setScore(data.score) // number of star
            setHeart(data.isLiked) // set isLiked
            console.log(data.isLiked)
            setLikes(data.likes) // number of likes
            // set write Date
            if (data.moddate == data.regdate) {
                setDate('작성일자: ' + data.regdate)
            } else {
                setDate('수정일자: ' + data.moddate)
            }
            setWriter(data.writerDTO.name) // writer
            // setImages
            if (data.images.length > 0) setImages(data.images)
            else setImages([noImage])
            // setPlace
            if (data.postingPlaceBoardDTOS.length > 0) {
                setPlace(data.postingPlaceBoardDTOS[0][0])
            }
            setContent(data.content) // content
        } catch (error) {
            navigate('/notfound')
        }
    }
    useEffect(() => {
        loadPage()
    }, [])

    return (
        <div className="w-1/2 mx-auto my-10">
            <div className="py-5 ">
                <div className="flex flex-col ">
                    <div className="flex items-center justify-between ">
                        <Title className="my-5 text-5xl">{title}</Title>
                        <div className="flex flex-row justify-end">
                            <div className="flex flex-col mx-2 text-gray-500">
                                <FontAwesomeIcon icon={faStar} size="xl" color="gold" />
                                {score}
                            </div>
                            <div className="flex flex-col mx-2 text-gray-500">
                                {heart && (
                                    <FontAwesomeIcon
                                        className="hover:cursor-pointer"
                                        icon={faHeart}
                                        size="xl"
                                        color="red"
                                        onClick={clickHeart}
                                    />
                                )}
                                {heart || (
                                    <FontAwesomeIcon
                                        className="hover:cursor-pointer"
                                        icon={faHeart}
                                        size="xl"
                                        style={{color: '#c2c2c2'}}
                                        onClick={clickHeart}
                                    />
                                )}
                                {likes}
                            </div>
                            <DropIcon
                                itemTexts={postText}
                                itemActions={[nav, set, delPage]}
                                itemEnabled={enables}>
                                <FontAwesomeIcon
                                    className="ml-2 hover:cursor-pointer"
                                    icon={faEllipsisVertical}
                                    size="xl"
                                />
                            </DropIcon>
                        </div>
                    </div>
                    <div className="flex justify-between w-full my-5">
                        <div>
                            <div className="flex flex-row justify-start">
                                작성자: {writer}
                            </div>
                            <div className="flex flex-row justify-end">{date.slice(0,16)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/*body*/}
                <div>
                    <PlacePostMap
                        className="w-full border-0 shadow-xl rounded-3xl"
                        place={place!}></PlacePostMap>
                </div>
                <div
                    id="board_box"
                    className="p-5 my-10 overflow-hidden shadow-xl rounded-3xl">
                    <TextBox data={content}></TextBox>
                </div>
            </div>
            <div>
                {/*footer*/}
                <Reply />
            </div>
            {report && (
                <BoardReportModal
                    boardData={boardData}
                    onCloseModal={closeModal}></BoardReportModal>
            )}
        </div>
    )
}
